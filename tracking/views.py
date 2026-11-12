import json
import math
from datetime import datetime, timedelta, timezone as datetime_timezone
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP

from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, get_user_model, login as auth_login, logout as auth_logout
from django.contrib.auth.password_validation import validate_password
from django.contrib import messages
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie

from merchants.models import MerchantProfile
from store.models import Order
from .models import DeliveryNotification, DeliveryPartner, TrackingSession
from .models import DeliveryLocation, OrderDelivery
from .services import (
    GENERIC_STATUS_LABELS,
    assign_available_partner,
    assign_waiting_paid_orders,
    _distance_km,
    create_partner_notification,
    ensure_tracking_session,
    expire_unaccepted_deliveries,
    get_order_tracking_labels,
    get_tracking_timeline,
    is_food_only_order,
    partner_contact_phone,
    publish_tracking_update,
    serialize_tracking,
)
from django.db import transaction
from django.db.models import Q, Sum
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

STATUS_LABELS = GENERIC_STATUS_LABELS
STATUS_ORDER = ["placed", "confirmed", "preparing", "partner_assigned", "partner_at_store", "picked_up", "out_for_delivery", "arriving_soon", "delivered"]
ALLOWED_NEXT = {
    "placed": {"confirmed", "preparing", "cancelled"},
    "confirmed": {"preparing", "picked_up", "cancelled"},
    "preparing": {"partner_assigned", "cancelled"},
    "partner_assigned": {"partner_at_store", "picked_up", "cancelled"},
    "partner_at_store": {"picked_up", "cancelled"},
    "picked_up": {"out_for_delivery"},
    "out_for_delivery": {"arriving_soon", "delivered"},
    "arriving_soon": {"delivered"}, "delivered": set(), "cancelled": set(),
}


def drf_endpoint(methods):
    """Use DRF dispatch with existing cookie sessions or the project's JWT auth."""
    def decorate(view):
        view = permission_classes([IsAuthenticated])(view)
        view = authentication_classes([SessionAuthentication, JWTAuthentication])(view)
        return api_view(methods)(view)
    return decorate


def _session_email(request):
    return (request.user.email or "").strip().lower() if request.user.is_authenticated else ""


def _owned_tracking(request, order_id):
    email = _session_email(request)
    if not request.user.is_authenticated:
        return None
    access = Q(order__customer_user=request.user)
    if email:
        access |= Q(order__customer_user__isnull=True, customer_email__iexact=email)
    return TrackingSession.objects.select_related("order", "partner", "partner__user", "merchant").filter(order_id=order_id).filter(access | Q(merchant__owner=request.user, merchant__is_approved=True)).first()


def _customer_owns_order(request, order):
    if order.customer_user_id:
        return order.customer_user_id == request.user.id
    email = (request.user.email or "").strip().lower()
    return bool(email and order.customer_email.strip().lower() == email)


@ensure_csrf_cookie
def customer_tracking(request, order_id):
    if not request.user.is_authenticated:
        return redirect(f"/login/?next=/order/{order_id}/track/")
    session = _owned_tracking(request, order_id)
    if session is None:
        order = Order.objects.filter(pk=order_id, payment_status__iexact="paid").filter(Q(customer_user=request.user) | Q(customer_user__isnull=True, customer_email__iexact=_session_email(request))).first()
        if order:
            session = ensure_tracking_session(order)
    if session is None:
        return render(request, "tracking-not-found.html", status=404)
    # Retry assignment for already-paid orders whenever the customer revisits
    # tracking. This covers orders created before any partner came online.
    if session.order.payment_status.lower() == "paid" and not session.partner_id:
        session = ensure_tracking_session(session.order)
    labels = get_order_tracking_labels(session.order)
    return render(request, "order-tracking.html", {
        "tracking": session,
        "tracking_status_label": labels.get(session.status, session.status.title()),
        "tracking_timeline": get_tracking_timeline(session, labels),
        "pickup_type": "Restaurant" if is_food_only_order(session.order) else "Store",
    })


@drf_endpoint(["GET", "PATCH"])
@require_http_methods(["GET", "PATCH"])
def tracking_api(request, order_id):
    session = _owned_tracking(request, order_id)
    if session is None:
        return JsonResponse({"error": "Tracking session not found."}, status=404)
    if request.method == "PATCH":
        try:
            data = json.loads(request.body or b"{}")
            eta_value = data.get("eta_minutes", session.eta_minutes)
            eta = int(eta_value) if eta_value is not None else None
            distance = Decimal(str(data.get("remaining_km", session.remaining_km))) if data.get("remaining_km") is not None else session.remaining_km
        except (json.JSONDecodeError, UnicodeDecodeError, TypeError, ValueError, InvalidOperation):
            return JsonResponse({"error": "Invalid route metrics."}, status=400)
        session.eta_minutes = max(1, min(180, eta)) if eta is not None else None
        session.remaining_km = max(Decimal("0"), distance) if distance is not None else None
        session.save(update_fields=["eta_minutes", "remaining_km", "updated_at"])
        return JsonResponse({"success": True})
    return JsonResponse(serialize_tracking(session))


def _valid_coordinate(value, low, high):
    try:
        value = float(value)
    except (TypeError, ValueError):
        return None
    return value if math.isfinite(value) and low <= value <= high else None


def _partner_for_request(request):
    if not request.user.is_authenticated:
        return None
    try:
        partner = request.user.delivery_profile
        return partner if partner.is_approved and partner.is_active else None
    except DeliveryPartner.DoesNotExist:
        return None


def _save_partner_location(request, session, data):
    partner = _partner_for_request(request)
    if not partner or session.partner_id != partner.id:
        return JsonResponse({"error": "Only the assigned delivery partner can share this location."}, status=403)
    if not session.accepted_at:
        return JsonResponse({"error": "Accept the delivery before sharing GPS."}, status=409)
    if session.status in {"delivered", "cancelled"}:
        return JsonResponse({"error": "This delivery is already complete."}, status=409)
    lat = _valid_coordinate(data.get("latitude"), -90, 90)
    lng = _valid_coordinate(data.get("longitude"), -180, 180)
    accuracy = _valid_coordinate(data.get("accuracy"), 0, 5000) if data.get("accuracy") is not None else None
    speed = _valid_coordinate(data.get("speed"), 0, 100) if data.get("speed") is not None else None
    if lat is None or lng is None:
        return JsonResponse({"error": "Valid latitude and longitude are required."}, status=400)
    if data.get("accuracy") is not None and accuracy is None:
        return JsonResponse({"error": "GPS accuracy must be between 0 and 5000 metres."}, status=400)
    if data.get("speed") is not None and speed is None:
        return JsonResponse({"error": "GPS speed must be between 0 and 100 metres per second."}, status=400)
    updated_at = timezone.now()
    device_timestamp = None
    if data.get("device_timestamp_ms") is not None:
        try:
            milliseconds = float(data["device_timestamp_ms"])
            if not math.isfinite(milliseconds):
                raise ValueError
            device_timestamp = datetime.fromtimestamp(milliseconds / 1000, tz=datetime_timezone.utc)
            if device_timestamp > updated_at + timedelta(minutes=5) or device_timestamp < updated_at - timedelta(days=1):
                raise ValueError
        except (TypeError, ValueError, OverflowError, OSError):
            return JsonResponse({"error": "Invalid device GPS timestamp."}, status=400)
    session.partner_latitude, session.partner_longitude = lat, lng
    session.location_updated_at = updated_at
    if data.get("eta_minutes") is not None:
        try:
            session.eta_minutes = max(1, min(180, int(data["eta_minutes"])))
        except (TypeError, ValueError):
            pass
    if data.get("remaining_km") is not None:
        try:
            session.remaining_km = max(Decimal("0"), Decimal(str(data["remaining_km"])))
        except (InvalidOperation, ValueError):
            pass
    partner.latitude, partner.longitude = lat, lng
    partner.last_location_update = updated_at
    partner.save(update_fields=["latitude", "longitude", "last_location_update"])
    session.save()
    if session.status == "out_for_delivery" and session.order.delivery_location_confirmed and session.order.delivery_latitude is not None and session.order.delivery_longitude is not None:
        distance_to_customer = _distance_km(lat, lng, session.order.delivery_latitude, session.order.delivery_longitude)
        if distance_to_customer <= max(0.05, float(getattr(settings, "DELIVERY_ARRIVING_SOON_DISTANCE_KM", 0.5))):
            session.status = "arriving_soon"
            session.remaining_km = Decimal(str(round(distance_to_customer, 2)))
            session.order.order_status = get_order_tracking_labels(session.order)["arriving_soon"]
            session.order.save(update_fields=["order_status"])
            session.save(update_fields=["status", "remaining_km", "updated_at"])
            OrderDelivery.objects.filter(tracking=session).update(status="arriving_soon")
    delivery = getattr(session, "delivery_record", None)
    DeliveryLocation.objects.create(delivery_partner=partner, delivery=delivery, latitude=lat, longitude=lng, accuracy=accuracy, speed=speed, device_timestamp=device_timestamp)
    publish_tracking_update(session)
    return JsonResponse({"success": True, "updated_at": updated_at.isoformat()})


@drf_endpoint(["POST"])
@require_http_methods(["POST"])
@login_required(login_url="partner_login")
def partner_location_api(request, order_id):
    session = get_object_or_404(TrackingSession, order_id=order_id, partner=_partner_for_request(request))
    try:
        data = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)
    return _save_partner_location(request, session, data)


@drf_endpoint(["POST"])
@require_http_methods(["POST"])
@login_required(login_url="partner_login")
def partner_live_location_api(request):
    try:
        data = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)
    partner = _partner_for_request(request)
    if not partner:
        return JsonResponse({"error": "Delivery partner account required."}, status=403)
    session = TrackingSession.objects.filter(order_id=data.get("order_id"), partner=partner).first()
    if not session:
        return JsonResponse({"error": "No active delivery assigned to this account for that order."}, status=404)
    return _save_partner_location(request, session, data)


@drf_endpoint(["POST"])
@require_http_methods(["POST"])
@login_required(login_url="partner_login")
def partner_availability_api(request):
    partner = _partner_for_request(request)
    if not partner:
        return JsonResponse({"error": "Delivery partner account required."}, status=403)
    try:
        data = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)
    if not isinstance(data.get("is_online"), bool):
        return JsonResponse({"error": "is_online must be true or false."}, status=400)
    online = data["is_online"]
    if online and (not partner.is_approved or not partner.is_active):
        return JsonResponse({"error": "Your partner account is not approved or is inactive."}, status=403)
    if not online and not partner.is_available:
        active_sessions = list(TrackingSession.objects.filter(partner=partner).exclude(status__in=["delivered", "cancelled"]))
        if any(session.accepted_at for session in active_sessions):
            return JsonResponse({"error": "Finish your accepted delivery before going offline."}, status=409)
        for session in active_sessions:
            create_partner_notification(session, partner, "reassigned")
            rejected = list(session.rejected_partner_ids or [])
            if partner.pk not in rejected:
                rejected.append(partner.pk)
            session.partner = None
            session.assigned_at = None
            session.rejected_partner_ids = rejected
            session.status = "preparing"
            session.save(update_fields=["partner", "assigned_at", "rejected_partner_ids", "status", "updated_at"])
            OrderDelivery.objects.filter(tracking=session).update(delivery_partner=None, assigned_at=None, status="preparing")
            session.order.order_status = get_order_tracking_labels(session.order)["preparing"]
            session.order.save(update_fields=["order_status"])
            publish_tracking_update(session)
    partner.is_online = online
    partner.save(update_fields=["is_online"])
    if online:
        assign_waiting_paid_orders()
    else:
        assign_waiting_paid_orders()
    return JsonResponse({"success": True, "is_online": partner.is_online, "is_available": partner.is_available})


@drf_endpoint(["GET"])
@require_http_methods(["GET"])
def partner_location_read_api(request, partner_id):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Sign in is required."}, status=401)
    session = TrackingSession.objects.filter(partner_id=partner_id).filter(Q(order__customer_user=request.user) | Q(order__customer_user__isnull=True, customer_email__iexact=(request.user.email or ""))).select_related("partner").first()
    if not session:
        return JsonResponse({"error": "Delivery partner location not found."}, status=404)
    location = DeliveryLocation.objects.filter(delivery_partner_id=partner_id, delivery__tracking=session).first()
    if location:
        return JsonResponse({"latitude": location.latitude, "longitude": location.longitude, "accuracy": location.accuracy, "speed": location.speed, "device_timestamp": location.device_timestamp.isoformat() if location.device_timestamp else None, "timestamp": location.timestamp.isoformat()})
    return JsonResponse({"latitude": session.partner_latitude, "longitude": session.partner_longitude, "timestamp": session.location_updated_at.isoformat() if session.location_updated_at else None})


@drf_endpoint(["POST"])
@require_http_methods(["POST"])
@login_required(login_url="login")
def accept_delivery_api(request, order_id):
    partner = _partner_for_request(request)
    if not partner:
        return JsonResponse({"error": "Delivery partner account required."}, status=403)
    session = get_object_or_404(TrackingSession, order_id=order_id, partner=partner)
    if session.status != "partner_assigned" or session.status in {"delivered", "cancelled"}:
        return JsonResponse({"error": "This delivery is no longer active."}, status=400)
    if session.accepted_at:
        return JsonResponse({"success": True, "accepted_at": session.accepted_at.isoformat()})
    timeout = max(15, int(getattr(settings, "DELIVERY_ACCEPTANCE_TIMEOUT_SECONDS", 60)))
    if not session.assigned_at or session.assigned_at < timezone.now() - timedelta(seconds=timeout):
        expire_unaccepted_deliveries()
        return JsonResponse({"error": "This delivery offer expired. Check for another assignment."}, status=409)
    if not session.accepted_at:
        session.accepted_at = timezone.now()
        session.save(update_fields=["accepted_at", "updated_at"])
    partner.is_online = True
    partner.save(update_fields=["is_online"])
    return JsonResponse({"success": True, "accepted_at": session.accepted_at.isoformat()})


@drf_endpoint(["POST"])
@require_http_methods(["POST"])
@login_required(login_url="partner_login")
def reject_delivery_api(request, order_id):
    partner = _partner_for_request(request)
    if not partner:
        return JsonResponse({"error": "Approved delivery partner account required."}, status=403)
    with transaction.atomic():
        session = TrackingSession.objects.select_for_update().select_related("order").filter(order_id=order_id, partner=partner).first()
        if not session or session.status != "partner_assigned" or session.accepted_at:
            return JsonResponse({"error": "This delivery can no longer be declined."}, status=409)
        create_partner_notification(session, partner, "reassigned")
        rejected = list(session.rejected_partner_ids or [])
        if partner.pk not in rejected:
            rejected.append(partner.pk)
        session.partner = None
        session.assigned_at = None
        session.rejected_partner_ids = rejected
        session.status = "preparing"
        session.save(update_fields=["partner", "assigned_at", "rejected_partner_ids", "status", "updated_at"])
        OrderDelivery.objects.filter(tracking=session).update(delivery_partner=None, assigned_at=None, status="preparing")
        partner.is_available = True
        partner.save(update_fields=["is_available"])
        session.order.order_status = get_order_tracking_labels(session.order)["preparing"]
        session.order.save(update_fields=["order_status"])
        publish_tracking_update(session)
    assign_available_partner(session)
    return JsonResponse({"success": True})


@drf_endpoint(["POST"])
@require_http_methods(["POST"])
def customer_location_api(request, order_id):
    session = _owned_tracking(request, order_id)
    if session is None or not _customer_owns_order(request, session.order):
        return JsonResponse({"error": "Tracking session not found."}, status=404)
    try:
        data = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)
    address = str(data.get("address", "")).strip()[:1000]
    lat = _valid_coordinate(data.get("latitude"), -90, 90) if data.get("latitude") is not None else session.customer_latitude
    lng = _valid_coordinate(data.get("longitude"), -180, 180) if data.get("longitude") is not None else session.customer_longitude
    if lat is None or lng is None:
        return JsonResponse({"error": "Valid device GPS coordinates are required."}, status=400)
    accuracy = _valid_coordinate(data.get("accuracy"), 0, 5000) if data.get("accuracy") is not None else None
    session.customer_current_latitude, session.customer_current_longitude = lat, lng
    session.customer_current_accuracy = accuracy
    session.customer_current_updated_at = timezone.now()
    session.save(update_fields=["customer_current_latitude", "customer_current_longitude", "customer_current_accuracy", "customer_current_updated_at", "updated_at"])
    publish_tracking_update(session)
    return JsonResponse({"success": True, "delivery_address_unchanged": True})


@drf_endpoint(["POST"])
def confirm_customer_location_api(request, order_id):
    session = _owned_tracking(request, order_id)
    if session is None or not _customer_owns_order(request, session.order):
        return JsonResponse({"error": "Tracking session not found."}, status=404)
    try:
        data = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)
    address = str(data.get("address") or session.order.delivery_address or "").strip()[:1000]
    if not address:
        return JsonResponse({"error": "Add a delivery address before confirming its location."}, status=400)
    if data.get("latitude") is None or data.get("longitude") is None:
        try:
            from .geocoding import geocode_address
            result = geocode_address(address)
        except Exception:
            result = None
        if not result:
            return JsonResponse({"error": "Unable to accurately locate this address. Please select the correct location on the map.", "not_found": True}, status=422)
        return JsonResponse({"candidate": result, "confirmed": False})
    lat = _valid_coordinate(data.get("latitude"), -90, 90)
    lng = _valid_coordinate(data.get("longitude"), -180, 180)
    if lat is None or lng is None:
        return JsonResponse({"error": "Confirm a valid point on the map."}, status=400)
    session.order.delivery_address = address
    session.order.delivery_latitude, session.order.delivery_longitude = lat, lng
    session.order.customer_latitude, session.order.customer_longitude = lat, lng
    session.order.delivery_location_confirmed = True
    session.order.save(update_fields=["delivery_address", "delivery_latitude", "delivery_longitude", "customer_latitude", "customer_longitude", "delivery_location_confirmed"])
    session.customer_address, session.customer_latitude, session.customer_longitude = address, lat, lng
    session.save(update_fields=["customer_address", "customer_latitude", "customer_longitude", "updated_at"])
    publish_tracking_update(session)
    return JsonResponse({"success": True, "confirmed": True})


@require_http_methods(["POST"])
@ensure_csrf_cookie
def geocode_checkout_address_api(request):
    try:
        data = json.loads(request.body or b"{}")
        address = str(data.get("address", "")).strip()[:1000]
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)
    if not address:
        return JsonResponse({"error": "Enter your full delivery address."}, status=400)
    try:
        from .geocoding import geocode_address
        candidate = geocode_address(address)
    except Exception:
        candidate = None
    if not candidate:
        return JsonResponse({"error": "Unable to accurately locate this address. Please place the exact delivery pin on the map."}, status=422)
    return JsonResponse({"candidate": candidate, "confirmed": False})


@require_http_methods(["POST"])
@ensure_csrf_cookie
def reverse_geocode_location_api(request):
    """Return a cached readable label for coordinates submitted after consent."""
    try:
        data = json.loads(request.body or b"{}")
        latitude = float(data.get("latitude"))
        longitude = float(data.get("longitude"))
    except (json.JSONDecodeError, UnicodeDecodeError, TypeError, ValueError):
        return JsonResponse({"error": "Valid GPS coordinates are required."}, status=400)
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        return JsonResponse({"error": "GPS coordinates are out of range."}, status=400)
    try:
        from .geocoding import reverse_geocode
        result = reverse_geocode(latitude, longitude)
    except Exception:
        result = None
    if not result:
        return JsonResponse({"error": "Your location was detected, but its address could not be looked up."}, status=503)
    return JsonResponse({"location": result})


@require_http_methods(["POST"])
@ensure_csrf_cookie
def location_suggestions_api(request):
    """Search places explicitly requested by the customer; never infer a location."""
    try:
        data = json.loads(request.body or b"{}")
        query = str(data.get("query", "")).strip()[:160]
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid search request."}, status=400)
    if len(query) < 3:
        return JsonResponse({"suggestions": []})
    try:
        from .geocoding import search_places
        suggestions = search_places(query, limit=5)
    except Exception:
        suggestions = []
    return JsonResponse({"suggestions": suggestions})


@require_http_methods(["POST"])
@ensure_csrf_cookie
def update_home_location_api(request):
    """Keep a customer's explicitly detected/selected place in their session."""
    try:
        data = json.loads(request.body or b"{}")
        latitude = float(data.get("latitude"))
        longitude = float(data.get("longitude"))
    except (json.JSONDecodeError, UnicodeDecodeError, TypeError, ValueError):
        return JsonResponse({"error": "Valid location coordinates are required."}, status=400)
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        return JsonResponse({"error": "Location coordinates are out of range."}, status=400)
    request.session["localmart_location"] = {
        "latitude": latitude,
        "longitude": longitude,
        "address": str(data.get("address", "")).strip()[:1000],
        "area_name": str(data.get("areaName", data.get("area_name", ""))).strip()[:240],
        "city": str(data.get("city", "")).strip()[:120],
        "state": str(data.get("state", "")).strip()[:120],
        "postcode": str(data.get("postcode", "")).strip()[:20],
        "country": str(data.get("country", "")).strip()[:100],
        "accuracy": data.get("accuracy") if isinstance(data.get("accuracy"), (int, float)) and 0 <= data.get("accuracy") <= 100000 else None,
        "source": "address" if data.get("source") == "address" else "gps",
        "timestamp": timezone.now().isoformat(),
    }
    request.session.modified = True
    return JsonResponse({"success": True})


@drf_endpoint(["GET", "POST"])
@require_http_methods(["GET", "POST"])
def tracking_status_api(request, order_id):
    if request.method == "GET":
        session = _owned_tracking(request, order_id)
        labels = get_order_tracking_labels(session.order) if session else STATUS_LABELS
        return JsonResponse({"status": session.status, "status_label": labels.get(session.status, session.status)} if session else {"error": "Tracking session not found."}, status=200 if session else 404)
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Sign in is required."}, status=401)
    session = get_object_or_404(TrackingSession.objects.select_related("partner", "partner__user"), order_id=order_id)
    is_partner = bool(session.partner_id and session.partner.user_id == request.user.id)
    is_staff = request.user.is_staff
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        merchant = None
    is_merchant = bool(merchant and session.merchant_id == merchant.id and merchant.is_approved)
    if not (is_partner or is_staff or is_merchant):
        return JsonResponse({"error": "You cannot update this delivery."}, status=403)
    try:
        data = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)
    next_status = data.get("status")
    if is_merchant and not is_staff and next_status not in {"confirmed", "preparing"}:
        return JsonResponse({"error": "Merchants can confirm orders or mark them as preparing."}, status=403)
    if is_partner and next_status in {"partner_at_store", "picked_up", "out_for_delivery", "arriving_soon", "delivered"} and not session.accepted_at:
        return JsonResponse({"error": "Accept the assigned delivery first."}, status=409)
    if next_status not in ALLOWED_NEXT.get(session.status, set()):
        return JsonResponse({"error": "That status transition is not allowed."}, status=400)
    session.status = next_status
    labels = get_order_tracking_labels(session.order)
    session.order.order_status = labels[next_status]
    session.order.save(update_fields=["order_status"])
    session.save(update_fields=["status", "updated_at"])
    if next_status == "cancelled" and session.partner_id:
        create_partner_notification(session, session.partner, "cancelled")
    delivery, _ = OrderDelivery.objects.get_or_create(tracking=session)
    delivery.status = next_status
    if next_status == "picked_up" and not delivery.picked_up_at:
        delivery.picked_up_at = timezone.now()
    if next_status in {"delivered", "cancelled"}:
        if next_status == "delivered":
            if not delivery.delivered_at:
                delivery.delivered_at = timezone.now()
                delivery.delivery_partner = session.partner
                earning_percent = Decimal(str(getattr(settings, "DELIVERY_PARTNER_EARNING_PERCENT", "10.00")))
                order_total = Decimal(str(session.order.total_amount or "0"))
                delivery.earning_amount = (order_total * earning_percent / Decimal("100")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        another_active_delivery = TrackingSession.objects.filter(partner_id=session.partner_id).exclude(pk=session.pk).exclude(status__in=["delivered", "cancelled"]).exists()
        if not another_active_delivery:
            DeliveryPartner.objects.filter(pk=session.partner_id).update(is_available=True)
    delivery.save()
    publish_tracking_update(session)
    if next_status in {"delivered", "cancelled"}:
        assign_waiting_paid_orders()
    return JsonResponse({"success": True, "status": session.status, "status_label": labels[session.status]})


@login_required(login_url="partner_login")
@ensure_csrf_cookie
def partner_dashboard(request):
    try:
        partner = request.user.delivery_profile
    except DeliveryPartner.DoesNotExist:
        return render(request, "tracking-not-found.html", {"message": "This account is not registered as a delivery partner."}, status=403)
    if not partner.is_approved or not partner.is_active:
        return render(request, "delivery-partner-pending.html", {"delivery_partner": partner}, status=403)
    expire_unaccepted_deliveries()
    today = timezone.localdate()
    sessions = TrackingSession.objects.filter(partner=partner)
    return render(request, "delivery-partner-live.html", {
        "delivery_partner": partner,
        "completed_today": sessions.filter(status="delivered", updated_at__date=today).count(),
        "pending_count": sessions.exclude(status__in=["delivered", "cancelled"]).count(),
        "today_count": sessions.filter(created_at__date=today).count(),
    })


@login_required(login_url="partner_login")
@ensure_csrf_cookie
def partner_dashboard_page(request, section):
    allowed_sections = {"deliveries", "pending", "active", "completed", "earnings", "profile", "notifications", "settings"}
    if section not in allowed_sections:
        return render(request, "tracking-not-found.html", {"message": "Partner dashboard page not found."}, status=404)
    try:
        partner = request.user.delivery_profile
    except DeliveryPartner.DoesNotExist:
        return render(request, "tracking-not-found.html", {"message": "This account is not registered as a delivery partner."}, status=403)
    if not partner.is_approved or not partner.is_active:
        return render(request, "delivery-partner-pending.html", {"delivery_partner": partner}, status=403)
    if request.method == "POST" and section == "profile":
        name = request.POST.get("name", "").strip()[:150]
        phone = request.POST.get("phone", "").strip()[:30]
        vehicle = request.POST.get("vehicle", "").strip()[:80]
        vehicle_number = request.POST.get("vehicle_number", "").strip()[:32]
        photo_url = request.POST.get("photo_url", "").strip()
        license_number = request.POST.get("license_number", "").strip()[:50]
        if not name or not phone or not vehicle:
            return render(request, "delivery-partner-section.html", {"section": section, "delivery_partner": partner, "error": "Name, phone, and vehicle type are required."}, status=400)
        if photo_url:
            from django.core.validators import URLValidator
            try:
                URLValidator()(photo_url)
            except ValidationError:
                return render(request, "delivery-partner-section.html", {"section": section, "delivery_partner": partner, "error": "Enter a valid profile photo URL."}, status=400)
        partner.user.first_name = name
        partner.user.save(update_fields=["first_name"])
        partner.phone, partner.vehicle = phone, vehicle
        partner.vehicle_number, partner.photo_url, partner.license_number = vehicle_number, photo_url, license_number
        partner.save(update_fields=["phone", "vehicle", "vehicle_number", "photo_url", "license_number"])
        return redirect("partner_dashboard_page", section="profile")
    sessions = list(TrackingSession.objects.filter(partner=partner).select_related("order", "merchant").prefetch_related("order__items").order_by("-updated_at"))
    active_sessions = [item for item in sessions if item.status not in {"delivered", "cancelled"}]
    pending_sessions = [item for item in active_sessions if not item.accepted_at]
    completed_sessions = [item for item in sessions if item.status == "delivered"]
    completed_ids = [item.pk for item in completed_sessions]
    earning_records = {
        record.tracking_id: record
        for record in OrderDelivery.objects.filter(tracking_id__in=completed_ids)
    }
    earning_percent = Decimal(str(getattr(settings, "DELIVERY_PARTNER_EARNING_PERCENT", "10.00")))
    earning_rows = []
    for item in completed_sessions:
        record = earning_records.get(item.pk)
        amount = record.earning_amount if record else (Decimal(str(item.order.total_amount or "0")) * earning_percent / Decimal("100")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        earning_rows.append({
            "tracking": item,
            "status_label": get_order_tracking_labels(item.order)[item.status],
            "items": list(item.order.items.all()),
            "earning_amount": amount,
            "completed_at": record.delivered_at if record and record.delivered_at else item.updated_at,
        })
    total_earnings = sum((row["earning_amount"] for row in earning_rows), Decimal("0.00"))
    today = timezone.localdate()
    context = {
        "section": section,
        "delivery_partner": partner,
        "sessions": sessions,
        "active_sessions": active_sessions,
        "pending_sessions": pending_sessions,
        "completed_sessions": completed_sessions,
        "active_tracking": active_sessions[0] if active_sessions else None,
        "today_count": sum(item.created_at.date() == today for item in sessions),
        "completed_today": sum(item.status == "delivered" and item.updated_at.date() == today for item in sessions),
        "status_labels": {item.pk: get_order_tracking_labels(item.order) for item in sessions},
        "timelines": {item.pk: get_tracking_timeline(item) for item in sessions},
        "delivery_rows": [{"tracking": item, "status_label": get_order_tracking_labels(item.order)[item.status]} for item in sessions],
        "active_rows": [{"tracking": item, "status_label": get_order_tracking_labels(item.order)[item.status]} for item in active_sessions],
        "pending_rows": [{"tracking": item, "status_label": get_order_tracking_labels(item.order)[item.status], "items": list(item.order.items.all())} for item in pending_sessions],
        "pending_count": len(pending_sessions),
        "earning_rows": earning_rows,
        "total_earnings": total_earnings,
        "earning_percent": earning_percent,
        "active_timeline": get_tracking_timeline(active_sessions[0]) if active_sessions else [],
        "active_status_label": get_order_tracking_labels(active_sessions[0].order)[active_sessions[0].status] if active_sessions else "",
        "notification_count": DeliveryNotification.objects.filter(delivery_partner=partner, is_read=False).count(),
    }
    return render(request, "delivery-partner-section.html", context)


@drf_endpoint(["GET"])
@login_required(login_url="partner_login")
@require_http_methods(["GET"])
def partner_orders_api(request):
    partner = _partner_for_request(request)
    if not partner:
        return JsonResponse({"error": "Delivery partner account required."}, status=403)
    expire_unaccepted_deliveries()
    sessions = TrackingSession.objects.filter(partner=partner).exclude(status__in=["delivered", "cancelled"]).select_related("order", "merchant")
    today = timezone.localdate()
    partner_sessions = TrackingSession.objects.filter(partner=partner)
    earning_records = OrderDelivery.objects.filter(delivery_partner=partner, status="delivered")
    total_earnings = earning_records.aggregate(total=Sum("earning_amount"))["total"] or Decimal("0.00")
    today_earnings = earning_records.filter(delivered_at__date=today).aggregate(total=Sum("earning_amount"))["total"] or Decimal("0.00")
    recent = partner_sessions.filter(status="delivered").select_related("order").order_by("-updated_at")[:5]
    timeout = max(15, int(getattr(settings, "DELIVERY_ACCEPTANCE_TIMEOUT_SECONDS", 60)))
    orders = [{"order_id": s.order_id, "number": f"LM{s.order_id:05d}", "status": s.status, "status_label": get_order_tracking_labels(s.order)[s.status], "timeline": get_tracking_timeline(s), "accepted": bool(s.accepted_at), "accept_by": (s.assigned_at + timedelta(seconds=timeout)).isoformat() if s.assigned_at and not s.accepted_at else None, "customer": s.order.customer_name, "destination": f"{s.order.delivery_latitude},{s.order.delivery_longitude}" if s.order.delivery_latitude is not None and s.order.delivery_longitude is not None else "", "destination_confirmed": s.order.delivery_location_confirmed, "destination_address": s.order.delivery_address or "Delivery address needs confirmation", "total": str(s.order.total_amount), "pickup": f"{s.merchant.latitude},{s.merchant.longitude}" if s.merchant_id and s.merchant.latitude is not None and s.merchant.longitude is not None else (f"{s.merchant_latitude},{s.merchant_longitude}" if s.merchant_latitude is not None and s.merchant_longitude is not None else ""), "pickup_confirmed": bool(s.merchant_id and s.merchant.location_confirmed), "pickup_address": s.merchant.address if s.merchant_id else s.merchant_address, "pickup_name": s.merchant.shop_name if s.merchant_id else s.merchant_name, "pickup_type": "Restaurant" if is_food_only_order(s.order) else "Store", "created_at": s.created_at.isoformat(), "partner_latitude": s.partner_latitude if s.partner_latitude is not None else partner.latitude, "partner_longitude": s.partner_longitude if s.partner_longitude is not None else partner.longitude, "partner_location_updated_at": s.location_updated_at.isoformat() if s.location_updated_at else (partner.last_location_update.isoformat() if partner.last_location_update else None), "items": list(s.order.items.values("name", "quantity"))} for s in sessions]
    recent_data = [{"number": f"LM{s.order_id:05d}", "status": "Delivered", "total": str(s.order.total_amount), "created_at": s.updated_at.isoformat(), "category": (s.order.items.values_list("category", flat=True).first() or "Order")} for s in recent]
    return JsonResponse({"partner": _serialize_partner(partner), "is_online": partner.is_online, "stats": {"today": partner_sessions.filter(created_at__date=today).count(), "completed_today": partner_sessions.filter(status="delivered", updated_at__date=today).count(), "active": sessions.filter(accepted_at__isnull=False).count(), "pending": sessions.filter(accepted_at__isnull=True).count(), "completed_total": partner_sessions.filter(status="delivered").count(), "earned_today": str(today_earnings), "earned_total": str(total_earnings), "earning_percent": str(getattr(settings, "DELIVERY_PARTNER_EARNING_PERCENT", "10.00"))}, "recent": recent_data, "orders": orders})


@login_required(login_url="partner_login")
@ensure_csrf_cookie
def partner_notification_order_page(request, order_id):
    partner = _partner_for_request(request)
    if not partner:
        return render(request, "tracking-not-found.html", {"message": "Approved delivery partner account required."}, status=403)
    notification = DeliveryNotification.objects.filter(
        delivery_partner=partner, order_id=order_id,
    ).select_related("order", "tracking").order_by("-created_at", "-pk").first()
    if not notification:
        return render(request, "tracking-not-found.html", {"message": "Order notification not found."}, status=404)
    DeliveryNotification.objects.filter(delivery_partner=partner, order_id=order_id, is_read=False).update(is_read=True)
    return render(request, "delivery-partner-order.html", {
        "delivery_partner": partner,
        "notification": notification,
        "tracking": notification.tracking,
        "order": notification.order,
        "items": notification.order.items.all(),
        "status_label": get_order_tracking_labels(notification.order).get(notification.tracking.status, notification.tracking.status.title()),
    })


@login_required(login_url="partner_login")
@require_http_methods(["GET", "POST"])
def partner_notifications_api(request):
    partner = _partner_for_request(request)
    if not partner:
        return JsonResponse({"error": "Approved delivery partner account required."}, status=403)
    notifications = DeliveryNotification.objects.filter(delivery_partner=partner).select_related("order", "tracking")
    if request.method == "POST":
        try:
            data = json.loads(request.body or b"{}")
        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse({"error": "Invalid JSON."}, status=400)
        if data.get("mark_all") is True:
            notifications.filter(is_read=False).update(is_read=True)
        else:
            try:
                notification_id = int(data.get("notification_id"))
            except (TypeError, ValueError):
                return JsonResponse({"error": "A notification ID is required."}, status=400)
            if not notifications.filter(pk=notification_id).update(is_read=True):
                return JsonResponse({"error": "Notification not found."}, status=404)
    items = list(notifications.order_by("-created_at", "-pk")[:100])
    result = [{
        "id": item.pk,
        "type": item.notification_type,
        "title": item.title,
        "message": item.message,
        "order_id": item.order_id,
        "customer": item.order.customer_name,
        "address": item.order.delivery_address or "Delivery address not entered",
        "amount": str(item.order.total_amount),
        "assigned_at": item.tracking.assigned_at.isoformat() if item.tracking.assigned_at else None,
        "created_at": item.created_at.isoformat(),
        "is_read": item.is_read,
        "order_url": reverse("partner_notification_order", args=[item.order_id]),
    } for item in items]
    return JsonResponse({
        "notifications": result,
        "unread_count": notifications.filter(is_read=False).count(),
    })


@drf_endpoint(["POST"])
@login_required(login_url="partner_login")
@require_http_methods(["POST"])
def partner_profile_location_api(request):
    partner = _partner_for_request(request)
    if not partner:
        return JsonResponse({"error": "Approved delivery partner account required."}, status=403)
    try:
        data = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)
    latitude = _valid_coordinate(data.get("latitude"), -90, 90)
    longitude = _valid_coordinate(data.get("longitude"), -180, 180)
    if latitude is None or longitude is None:
        return JsonResponse({"error": "Valid GPS coordinates are required."}, status=400)
    partner.latitude, partner.longitude = latitude, longitude
    partner.last_location_update = timezone.now()
    partner.save(update_fields=["latitude", "longitude", "last_location_update"])
    return JsonResponse({"success": True, "updated_at": partner.last_location_update.isoformat()})


@drf_endpoint(["GET"])
@login_required(login_url="login")
@require_http_methods(["GET"])
def merchant_deliveries_api(request):
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        return JsonResponse({"error": "Merchant account required."}, status=403)
    if not merchant.is_approved:
        return JsonResponse({"error": "Approved merchant account required."}, status=403)
    expire_unaccepted_deliveries()
    sessions = TrackingSession.objects.filter(merchant=merchant).exclude(status__in=["delivered", "cancelled"]).select_related("order", "partner", "partner__user")
    deliveries = [{"order_id": s.order_id, "number": f"LM-{s.order_id:06d}", "customer": s.order.customer_name, "status": s.status, "status_label": get_order_tracking_labels(s.order)[s.status], "status_url": reverse("tracking_status_api", args=[s.order_id]), "partner_id": s.partner_id, "partner_name": (s.partner.user.get_full_name() or s.partner.user.get_username()) if s.partner else "Unassigned", "partner_phone": partner_contact_phone(s.partner) if s.partner else "", "partner_vehicle": s.partner.vehicle if s.partner else "", "partner_vehicle_number": s.partner.vehicle_number if s.partner else "", "partner_location": f"{s.partner_latitude:.5f}, {s.partner_longitude:.5f}" if s.partner_latitude is not None else "Waiting for GPS", "partner_latitude": s.partner_latitude, "partner_longitude": s.partner_longitude, "customer_latitude": s.order.delivery_latitude if s.order.delivery_location_confirmed else None, "customer_longitude": s.order.delivery_longitude if s.order.delivery_location_confirmed else None, "merchant_latitude": s.merchant.latitude if s.merchant_id and s.merchant.location_confirmed else None, "merchant_longitude": s.merchant.longitude if s.merchant_id and s.merchant.location_confirmed else None, "total": str(s.order.total_amount)} for s in sessions]
    active_partner_ids = set(TrackingSession.objects.filter(partner_id__isnull=False).exclude(status__in=["delivered", "cancelled"]).values_list("partner_id", flat=True))
    available = list(DeliveryPartner.objects.filter(is_approved=True, is_active=True, is_available=True, is_online=True).exclude(user__username__startswith="localmart_demo_rider_").exclude(pk__in=active_partner_ids).select_related("user"))
    partners_by_id = {p.pk: p for p in available}
    partners = [{
        "id": p.id,
        "name": p.user.get_full_name() or p.user.get_username(),
        "available": p.pk not in active_partner_ids and p.is_available and p.is_online,
    } for p in partners_by_id.values()]
    return JsonResponse({"deliveries": deliveries, "partners": partners})


@login_required(login_url="login")
@ensure_csrf_cookie
def merchant_deliveries_page(request):
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        return render(request, "tracking-not-found.html", {"message": "A merchant account is required to manage deliveries."}, status=403)
    if not merchant.is_approved:
        return render(request, "tracking-not-found.html", {"message": "An approved merchant account is required."}, status=403)
    return render(request, "merchant-deliveries.html", {"merchant": merchant})


@drf_endpoint(["POST"])
@login_required(login_url="login")
@require_http_methods(["POST"])
def assign_partner_api(request, order_id):
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        merchant = None
    session = TrackingSession.objects.filter(order_id=order_id).first()
    if not session:
        return JsonResponse({"error": "Delivery session not found."}, status=404)
    if not request.user.is_staff and (merchant is None or session.merchant_id != merchant.id or not merchant.is_approved):
        return JsonResponse({"error": "You cannot assign this delivery."}, status=403)
    try:
        data = json.loads(request.body or b"{}")
        partner = DeliveryPartner.objects.select_related("user").exclude(user__username__startswith="localmart_demo_rider_").get(pk=data.get("partner_id"), is_approved=True, is_active=True, is_available=True, is_online=True)
    except (json.JSONDecodeError, UnicodeDecodeError, DeliveryPartner.DoesNotExist, TypeError, ValueError):
        return JsonResponse({"error": "Select an available delivery partner."}, status=400)
    with transaction.atomic():
        session = TrackingSession.objects.select_for_update().select_related("order", "partner").get(pk=session.pk)
        if session.status in {"delivered", "cancelled"}:
            return JsonResponse({"error": "This order is already closed."}, status=409)
        if session.partner_id == partner.pk:
            return JsonResponse({"success": True, "partner": partner.user.get_full_name() or partner.user.get_username()})
        active = TrackingSession.objects.filter(partner=partner).exclude(pk=session.pk).exclude(status__in=["delivered", "cancelled"]).exists()
        if active:
            return JsonResponse({"error": "That partner already has an active delivery."}, status=409)
        claimed = DeliveryPartner.objects.filter(pk=partner.pk, is_available=True, is_online=True).update(is_available=False)
        if not claimed:
            return JsonResponse({"error": "That partner was just assigned to another order."}, status=409)
        previous_partner = session.partner
        session.partner = partner
        session.status = "partner_assigned"
        session.assigned_at = timezone.now()
        session.accepted_at = None
        session.save(update_fields=["partner", "status", "assigned_at", "accepted_at", "updated_at"])
        delivery, _ = OrderDelivery.objects.get_or_create(tracking=session)
        delivery.delivery_partner, delivery.assigned_at, delivery.status = partner, session.assigned_at, session.status
        delivery.save()
        session.order.order_status = STATUS_LABELS[session.status]
        session.order.save(update_fields=["order_status"])
        if previous_partner:
            create_partner_notification(session, previous_partner, "reassigned")
            DeliveryPartner.objects.filter(pk=previous_partner.pk).update(is_available=True)
        create_partner_notification(session, partner, "assigned")
        publish_tracking_update(session)
    return JsonResponse({"success": True, "partner": partner.user.get_full_name() or partner.user.get_username()})


@drf_endpoint(["GET", "POST"])
@login_required(login_url="login")
@require_http_methods(["GET", "POST"])
def assign_delivery_api(request, order_id):
    session = TrackingSession.objects.filter(order_id=order_id).first()
    if not session:
        return JsonResponse({"error": "Tracking session not found."}, status=404)
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        merchant = None
    if not request.user.is_staff and (not merchant or not merchant.is_approved or session.merchant_id != merchant.id):
        return JsonResponse({"error": "You cannot assign a partner to this order."}, status=403)
    if request.method == "GET":
        return JsonResponse({"partner": _serialize_partner(session.partner) if session.partner_id else None})
    if session.partner_id:
        return JsonResponse({"success": True, "partner": _serialize_partner(session.partner)})
    partner = assign_available_partner(session)
    if not partner:
        return JsonResponse({"error": "No online delivery partners are currently available."}, status=409)
    publish_tracking_update(session)
    return JsonResponse({"success": True, "partner": _serialize_partner(partner)})


def _serialize_partner(partner):
    return {"id": partner.partner_code, "name": partner.name, "phone": partner_contact_phone(partner), "email": partner.email, "vehicle_type": partner.vehicle, "vehicle_number": partner.vehicle_number, "profile_image": partner.photo_url}


def partner_register(request):
    if request.user.is_authenticated:
        return redirect("delivery_dashboard_alias") if hasattr(request.user, "delivery_profile") else redirect("partner_login")
    if request.method == "POST":
        data = request.POST
        email = data.get("email", "").strip().lower()
        phone = data.get("phone", "").strip()
        full_name = data.get("name", "").strip()
        vehicle = data.get("vehicle", "").strip()
        password = data.get("password", "")
        User = get_user_model()
        error = ""
        try:
            validate_email(email)
        except ValidationError:
            error = "Enter a valid email address."
        if not error and (not full_name or not phone):
            error = "Enter your name and phone number."
        if not error and not all(character.isalpha() or character == " " for character in full_name):
            error = "Full name can contain letters and spaces only."
        if not error and (not phone.isascii() or not phone.isdigit()):
            error = "Mobile number can contain digits only."
        if not error and User.objects.filter(email__iexact=email).exists():
            error = "An account with this email already exists."
        if not error and password != data.get("confirm_password"):
            error = "The passwords do not match."
        if not error:
            try:
                validate_password(password)
            except ValidationError as exc:
                error = " ".join(exc.messages)
        if not error and (not vehicle or not data.get("license_number", "").strip()):
            error = "Vehicle type and driving license number are required."
        if not error and not all(character.isalpha() or character == " " for character in vehicle):
            error = "Vehicle type can contain letters and spaces only."
        if error:
            return render(request, "delivery-partner-register.html", {"error": error, "form": data})
        username = email
        user = User.objects.create_user(username=username, email=email, password=password, first_name=full_name[:150])
        DeliveryPartner.objects.create(user=user, phone=phone, photo_url=data.get("photo_url", "").strip(), vehicle=vehicle[:80], vehicle_number=data.get("vehicle_number", "").strip()[:32], license_number=data.get("license_number", "").strip()[:50], is_approved=False, is_active=True, is_available=False, is_online=False)
        return render(request, "delivery-partner-pending.html", {"new_registration": True})
    return render(request, "delivery-partner-register.html")


def partner_login(request):
    if request.user.is_authenticated:
        if hasattr(request.user, "delivery_profile"):
            return redirect("delivery_dashboard_alias")
    error = ""
    if request.method == "POST":
        email = request.POST.get("email", "").strip().lower()
        User = get_user_model()
        candidate = User.objects.filter(email__iexact=email).first()
        user = authenticate(request, username=candidate.get_username(), password=request.POST.get("password", "")) if candidate else None
        if not user:
            error = "Email or password is incorrect."
        else:
            try:
                profile = user.delivery_profile
            except DeliveryPartner.DoesNotExist:
                profile = None
            if not profile:
                error = "This account is not registered as a delivery partner."
            elif not profile.is_approved:
                error = "Your application is waiting for LocalMart admin approval."
            elif not profile.is_active:
                error = "Your delivery partner account is inactive. Contact LocalMart support."
            else:
                auth_login(request, user)
                return redirect("delivery_dashboard_alias")
    return render(request, "delivery-partner-login.html", {"error": error})


@login_required(login_url="partner_login")
def partner_logout(request):
    try:
        partner = request.user.delivery_profile
        partner.is_online = False
        partner.save(update_fields=["is_online"])
    except DeliveryPartner.DoesNotExist:
        pass
    auth_logout(request)
    return redirect("partner_login")
