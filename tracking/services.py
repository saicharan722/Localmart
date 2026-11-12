from math import asin, cos, radians, sin, sqrt
from datetime import timedelta
import re
from django.conf import settings
from django.db import transaction
from django.utils import timezone
from django.db import connection
from store.models import Order
from merchants.models import MerchantProfile
from .models import DeliveryLocation, DeliveryNotification, DeliveryPartner, OrderDelivery, TrackingSession

STATUS_LABELS = dict(TrackingSession.STATUS_CHOICES)
STATUS_ORDER = ["placed", "confirmed", "preparing", "partner_assigned", "partner_at_store", "picked_up", "out_for_delivery", "arriving_soon", "delivered"]
GENERIC_STATUS_LABELS = dict(STATUS_LABELS)
GENERIC_STATUS_LABELS.update({"preparing": "Preparing", "partner_at_store": "Reached Pickup"})

FOOD_CATEGORY_MARKERS = (
    "food", "restaurant", "pizza", "burger", "south indian", "north indian",
    "indian", "chinese", "continental", "cuisine", "tea", "coffee", "juice",
    "beverage", "dessert", "bakery", "snack", "meal", "biryani", "thali",
    "dosa", "idli", "pasta", "sushi", "sandwich", "fast food", "grill",
)
STORE_CATEGORY_MARKERS = (
    "grocery", "groceries", "produce", "vegetable", "fruit", "dairy", "bread",
    "egg", "meat", "fish", "frozen", "pantry", "electronics", "mobile",
    "laptop", "computer", "appliance", "refrigerator", "fashion", "clothing",
    "footwear", "apparel", "beauty", "personal care", "stationery", "household", "snack",
)


def partner_contact_phone(partner):
    """Return a usable contact number; seeded demo placeholders are not phone numbers."""
    phone = str(getattr(partner, "phone", "") or "").strip()
    digits = re.sub(r"\D", "", phone)
    return phone if 7 <= len(digits) <= 15 else ""


def create_partner_notification(session, partner, notification_type):
    labels = {
        "assigned": ("New delivery assigned", "A delivery has been assigned to you."),
        "reassigned": ("Order reassigned", "This order is no longer assigned to you and may be offered to another partner."),
        "cancelled": ("Order cancelled", "This delivery has been cancelled."),
    }
    title, message = labels[notification_type]
    persisted_assignment = TrackingSession.objects.filter(pk=session.pk).values_list("assigned_at", flat=True).first()
    event_time = session.assigned_at or persisted_assignment or session.updated_at or timezone.now()
    event_key = f"{notification_type}:{session.pk}:{partner.pk}:{event_time.isoformat()}"
    notification, _ = DeliveryNotification.objects.get_or_create(
        event_key=event_key,
        defaults={
            "delivery_partner": partner,
            "order": session.order,
            "tracking": session,
            "notification_type": notification_type,
            "title": title,
            "message": message,
        },
    )
    return notification


def is_food_only_order(order):
    """Classify from existing line-item categories; mixed/unknown carts use store labels."""
    categories = [
        " ".join((value or "").lower().replace("_", " ").replace("-", " ").split())
        for value in order.items.values_list("category", flat=True)
    ]
    categories = [value for value in categories if value]
    if categories:
        def has_marker(category, markers):
            return any(marker in category for marker in markers)

        # Every non-empty line category must be food. Any known store category,
        # unknown category, or mixed basket safely uses store terminology.
        return all(
            has_marker(category, FOOD_CATEGORY_MARKERS)
            and not has_marker(category, STORE_CATEGORY_MARKERS)
            for category in categories
        )
    # Older restaurant orders may not have item category data. Don't infer food
    # for merchant-store orders, which also populate restaurant_name historically.
    return bool(order.restaurant_name and not order.merchant_profile_id)


def get_order_tracking_labels(order):
    labels = GENERIC_STATUS_LABELS.copy()
    if is_food_only_order(order):
        labels.update({
            "preparing": "Restaurant Preparing",
            "partner_at_store": "Partner Reached Restaurant",
        })
    else:
        labels.update({
            "preparing": "Store Preparing",
            "partner_at_store": "Partner Reached Store",
        })
    return labels


def get_tracking_timeline(session, labels=None):
    labels = labels or get_order_tracking_labels(session.order)
    current_index = STATUS_ORDER.index(session.status) if session.status in STATUS_ORDER else -1
    timeline = [{
        "key": key,
        "label": labels[key],
        "complete": current_index >= 0 and index < current_index,
        "current": key == session.status,
    } for index, key in enumerate(STATUS_ORDER)]
    if session.status == "cancelled":
        timeline.append({"key": "cancelled", "label": "Cancelled", "complete": False, "current": True, "cancelled": True})
    return timeline


def serialize_tracking(session):
    partner = session.partner
    user = partner.user if partner else None
    labels = get_order_tracking_labels(session.order)
    food_order = labels["preparing"] == "Restaurant Preparing"
    return {
        "order_id": session.order_id,
        "order_number": f"LM{session.order_id:05d}",
        "status": session.status,
        "status_label": labels.get(session.status, session.status.title()),
        "timeline": get_tracking_timeline(session, labels),
        "pickup_type": "Restaurant" if food_order else "Store",
        "eta_minutes": session.eta_minutes,
        "remaining_km": float(session.remaining_km) if session.remaining_km is not None else None,
        "customer": {"latitude": session.customer_latitude, "longitude": session.customer_longitude, "address": session.customer_address},
        "customer_current_location": {"latitude": session.customer_current_latitude, "longitude": session.customer_current_longitude, "accuracy": session.customer_current_accuracy, "updated_at": session.customer_current_updated_at.isoformat() if session.customer_current_updated_at else None},
        "customer_location_confirmed": session.order.delivery_location_confirmed,
        "merchant": {"name": session.merchant.shop_name if session.merchant_id else session.merchant_name, "address": session.merchant.address if session.merchant_id else session.merchant_address, "latitude": session.merchant.latitude if session.merchant_id and session.merchant.location_confirmed else None, "longitude": session.merchant.longitude if session.merchant_id and session.merchant.location_confirmed else None, "location_confirmed": bool(session.merchant_id and session.merchant.location_confirmed)},
        "partner_location": _serialize_latest_location(session),
        "partner": {"id": partner.partner_code if partner else "", "name": (user.get_full_name() or user.get_username()) if user else "Finding your delivery partner", "phone": partner_contact_phone(partner) if partner else "", "photo_url": partner.photo_url if partner else "", "vehicle": partner.vehicle if partner else "", "vehicle_number": partner.vehicle_number if partner else ""},
        "order": {"customer_name": session.order.customer_name, "total": str(session.order.total_amount), "created_at": session.order.created_at.isoformat(), "items": list(session.order.items.values("name", "quantity", "price", "image"))},
        "updated_at": session.updated_at.isoformat(),
    }


def _serialize_latest_location(session):
    location = DeliveryLocation.objects.filter(delivery_partner_id=session.partner_id, delivery__tracking_id=session.pk).first() if session.partner_id else None
    return {"latitude": session.partner_latitude, "longitude": session.partner_longitude, "accuracy": location.accuracy if location else None, "speed": location.speed if location else None, "device_timestamp": location.device_timestamp.isoformat() if location and location.device_timestamp else None, "updated_at": location.timestamp.isoformat() if location else (session.location_updated_at.isoformat() if session.location_updated_at else None)}


def publish_tracking_update(session):
    session_id = session.pk
    if connection.in_atomic_block:
        transaction.on_commit(lambda: _publish_by_id(session_id))
    else:
        _publish_by_id(session_id)


def _publish_by_id(session_id):
    try:
        from asgiref.sync import async_to_sync
        from channels.layers import get_channel_layer
    except ImportError:
        return
    layer = get_channel_layer()
    if layer is None:
        return
    session = TrackingSession.objects.select_related("order", "partner", "partner__user", "merchant").get(pk=session_id)
    async_to_sync(layer.group_send)(f"order_tracking_{session.order_id}", {"type": "tracking.update", "data": serialize_tracking(session)})


def ensure_tracking_session(order):
    with transaction.atomic():
        session, _ = TrackingSession.objects.select_for_update(of=("self",)).get_or_create(
            order=order,
            defaults={
                "customer_email": order.customer_email,
                "customer_address": order.delivery_address,
                "merchant": order.merchant_profile,
                "merchant_name": order.restaurant_name or (order.merchant_profile.shop_name if order.merchant_profile_id else "LocalMart Store"),
                "status": "confirmed" if order.payment_status.lower() == "paid" else "placed",
            },
        )
        merchant = session.merchant if session.merchant_id else order.merchant_profile
        if merchant is None and order.restaurant_name:
            exact_matches = list(MerchantProfile.objects.filter(is_approved=True, shop_name__iexact=order.restaurant_name).order_by("pk")[:2])
            merchant = exact_matches[0] if len(exact_matches) == 1 else None
            if merchant:
                order.merchant_profile = merchant
                order.save(update_fields=["merchant_profile"])
        if merchant is None and not order.restaurant_name:
            approved_merchants = list(MerchantProfile.objects.filter(is_approved=True).order_by("pk")[:2])
            merchant = approved_merchants[0] if len(approved_merchants) == 1 else None
        if merchant:
            if merchant.address and merchant.latitude is None:
                try:
                    from .geocoding import geocode_address
                    candidate = geocode_address(merchant.address)
                    if candidate:
                        merchant.latitude, merchant.longitude = candidate["latitude"], candidate["longitude"]
                        merchant.save(update_fields=["latitude", "longitude"])
                except Exception:
                    pass
            session.merchant = merchant
            session.merchant_name = merchant.shop_name
            session.merchant_address = merchant.address
            session.merchant_latitude = merchant.latitude if merchant.location_confirmed else None
            session.merchant_longitude = merchant.longitude if merchant.location_confirmed else None
            session.save(update_fields=["merchant", "merchant_name", "merchant_address", "merchant_latitude", "merchant_longitude", "updated_at"])
        elif order.restaurant_name:
            session.merchant_name = order.restaurant_name
            session.merchant_address = ""
            session.merchant_latitude = session.merchant_longitude = None
            session.save(update_fields=["merchant_name", "merchant_address", "merchant_latitude", "merchant_longitude", "updated_at"])
        if order.payment_status.lower() == "paid":
            if order.delivery_address and order.delivery_latitude is None:
                from .geocoding import geocode_address
                try:
                    result = geocode_address(order.delivery_address)
                except Exception:
                    result = None
                if result:
                    order.delivery_latitude, order.delivery_longitude = result["latitude"], result["longitude"]
                    order.customer_latitude, order.customer_longitude = result["latitude"], result["longitude"]
                    order.delivery_location_confirmed = False
                    order.save(update_fields=["delivery_latitude", "delivery_longitude", "customer_latitude", "customer_longitude", "delivery_location_confirmed"])
                    session.customer_latitude, session.customer_longitude = result["latitude"], result["longitude"]
                    session.customer_address = order.delivery_address
                    session.save(update_fields=["customer_latitude", "customer_longitude", "customer_address", "updated_at"])
            elif order.delivery_latitude is not None:
                session.customer_latitude, session.customer_longitude = order.delivery_latitude, order.delivery_longitude
                session.customer_address = order.delivery_address
                session.save(update_fields=["customer_latitude", "customer_longitude", "customer_address", "updated_at"])
            if session.status in {"placed", "confirmed"}:
                session.status = "preparing"
                session.save(update_fields=["status", "updated_at"])
                order.order_status = STATUS_LABELS["preparing"]
                order.save(update_fields=["order_status"])
            OrderDelivery.objects.get_or_create(tracking=session, defaults={"status": session.status})
            if not session.partner_id:
                assign_available_partner(session)
        publish_tracking_update(session)
    return session


def assign_available_partner(session):
    """Claim one online partner with an atomic availability update; never double-book."""
    with transaction.atomic():
        session = TrackingSession.objects.select_for_update(of=("self",)).select_related("order", "partner").get(pk=session.pk)
        if session.partner_id or session.status in {"delivered", "cancelled"}:
            return session.partner
        active_partner_ids = TrackingSession.objects.filter(partner_id__isnull=False).exclude(status__in=["delivered", "cancelled"]).values_list("partner_id", flat=True)
        rejected_ids = session.rejected_partner_ids or []
        eligible = DeliveryPartner.objects.filter(
            is_approved=True, is_active=True, is_available=True, is_online=True,
        ).exclude(user__username__startswith="localmart_demo_rider_").exclude(pk__in=active_partner_ids).exclude(pk__in=rejected_ids).select_related("user")
        for _ in range(5):
            candidates = list(eligible)
            if not candidates:
                return None
            pickup = (session.merchant_latitude, session.merchant_longitude)
            freshness = timezone.now() - timedelta(seconds=getattr(settings, "DELIVERY_GPS_FRESHNESS_SECONDS", 180))
            located = [p for p in candidates if pickup[0] is not None and pickup[1] is not None
                       and p.latitude is not None and p.longitude is not None
                       and p.last_location_update and p.last_location_update >= freshness]
            if located:
                partner = min(located, key=lambda p: _distance_km(pickup[0], pickup[1], p.latitude, p.longitude))
            else:
                # No fresh GPS: deterministic fallback among approved available partners.
                partner = min(candidates, key=lambda p: (p.last_location_update is None, -p.last_location_update.timestamp() if p.last_location_update else 0, p.pk))
            partner_id = partner.pk
            changed = eligible.filter(pk=partner_id).update(is_available=False)
            if not changed:
                continue
            session.partner = partner
            session.status = "partner_assigned"
            session.assigned_at = timezone.now()
            session.save(update_fields=["partner", "status", "assigned_at", "updated_at"])
            record, _ = OrderDelivery.objects.get_or_create(tracking=session)
            record.delivery_partner = partner
            record.assigned_at = session.assigned_at
            record.status = session.status
            record.save()
            session.order.order_status = "Delivery Partner Assigned"
            session.order.save(update_fields=["order_status"])
            create_partner_notification(session, partner, "assigned")
            publish_tracking_update(session)
            return partner
        return None


def _distance_km(lat1, lon1, lat2, lon2):
    """Great-circle distance used only to choose the nearest fresh partner GPS."""
    lat1, lon1, lat2, lon2 = map(radians, (lat1, lon1, lat2, lon2))
    dlat, dlon = lat2 - lat1, lon2 - lon1
    value = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    return 6371 * 2 * asin(sqrt(value))


def assign_waiting_paid_orders():
    """Assign available partners to older paid orders that were waiting in queue."""
    while True:
        waiting = TrackingSession.objects.filter(
            order__payment_status__iexact="Paid",
            partner__isnull=True,
        ).exclude(status__in=["delivered", "cancelled"]).order_by("created_at", "pk").first()
        if not waiting:
            return
        if not assign_available_partner(waiting):
            return


def expire_unaccepted_deliveries():
    """Release and reassign a paid delivery if its partner does not accept in time."""
    timeout = max(15, int(getattr(settings, "DELIVERY_ACCEPTANCE_TIMEOUT_SECONDS", 60)))
    cutoff = timezone.now() - timedelta(seconds=timeout)
    stale_ids = list(TrackingSession.objects.filter(
        status="partner_assigned", accepted_at__isnull=True, assigned_at__lt=cutoff,
    ).values_list("pk", flat=True))
    for session_id in stale_ids:
        with transaction.atomic():
            session = TrackingSession.objects.select_for_update(of=("self",)).select_related("order").filter(pk=session_id).first()
            if not session or session.status != "partner_assigned" or session.accepted_at or not session.assigned_at or session.assigned_at >= cutoff:
                continue
            old_partner_id = session.partner_id
            old_partner = DeliveryPartner.objects.filter(pk=old_partner_id).first() if old_partner_id else None
            if old_partner:
                create_partner_notification(session, old_partner, "reassigned")
            rejected = list(session.rejected_partner_ids or [])
            if old_partner_id and old_partner_id not in rejected:
                rejected.append(old_partner_id)
            session.partner = None
            session.assigned_at = None
            session.accepted_at = None
            session.rejected_partner_ids = rejected
            session.status = "preparing"
            session.save(update_fields=["partner", "assigned_at", "accepted_at", "rejected_partner_ids", "status", "updated_at"])
            OrderDelivery.objects.filter(tracking=session).update(delivery_partner=None, assigned_at=None, status="preparing")
            if old_partner_id:
                DeliveryPartner.objects.filter(pk=old_partner_id).update(is_available=True)
            labels = get_order_tracking_labels(session.order)
            session.order.order_status = labels["preparing"]
            session.order.save(update_fields=["order_status"])
            publish_tracking_update(session)
        assign_available_partner(session)
