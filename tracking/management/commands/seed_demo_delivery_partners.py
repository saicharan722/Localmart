"""Create explicitly fictional partners and assign them to paid demo orders."""

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db import transaction

from store.models import Order
from tracking.models import DeliveryPartner, TrackingSession
from tracking.services import assign_available_partner, ensure_tracking_session


class Command(BaseCommand):
    help = "Create fictional demo delivery partners and assign unassigned paid orders."

    def handle(self, *args, **options):
        names = [
            ("Aarav", "Demo Rider"),
            ("Diya", "Demo Rider"),
            ("Kabir", "Demo Rider"),
            ("Mira", "Demo Rider"),
            ("Ishaan", "Demo Rider"),
            ("Anaya", "Demo Rider"),
        ]
        User = get_user_model()
        created_count = 0
        for index, (first_name, last_name) in enumerate(names, start=1):
            username = f"localmart_demo_rider_{index}"
            user, user_created = User.objects.get_or_create(
                username=username,
                defaults={
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": f"demo-rider-{index}@example.invalid",
                },
            )
            if user_created:
                user.set_unusable_password()
                user.save(update_fields=["password"])
            partner, partner_created = DeliveryPartner.objects.get_or_create(
                user=user,
                defaults={
                    "phone": f"DEMO-NOT-A-PHONE-{index}",
                    "vehicle": "Demo bicycle",
                    "vehicle_number": f"DEMO-{index:03d}",
                    "is_online": True,
                    "is_available": True,
                    # GPS stays empty until a real partner device sends it.
                },
            )
            created_count += int(partner_created)
            if partner_created:
                self.stdout.write(f"Created {partner.partner_code}: {partner.name}")

        assigned = []
        # Assign the demo pool to the most recently placed paid orders first;
        # older historical/test orders should not consume the demo riders.
        paid_orders = Order.objects.filter(payment_status__iexact="Paid").order_by("-created_at")
        target_orders = list(paid_orders[:len(names)])
        demo_partners = DeliveryPartner.objects.filter(user__username__startswith="localmart_demo_rider_")
        active_partner_ids = set(
            TrackingSession.objects.filter(partner__in=demo_partners)
            .exclude(status__in=["delivered", "cancelled"])
            .values_list("partner_id", flat=True)
        )
        # Keep demo riders eligible for future assignments only when they do
        # not already have an active delivery. Never release an active rider.
        for partner in demo_partners:
            if partner.pk not in active_partner_ids:
                DeliveryPartner.objects.filter(pk=partner.pk).update(
                    is_online=True, is_available=True
                )
        with transaction.atomic():
            for order in target_orders:
                session = ensure_tracking_session(order)
                if session.partner_id or session.status in {"delivered", "cancelled"}:
                    continue
                partner = assign_available_partner(session)
                if partner:
                    assigned.append((order.pk, partner.partner_code, partner.name))

        self.stdout.write(self.style.SUCCESS(f"Demo partner profiles created: {created_count}"))
        if assigned:
            for order_id, code, name in assigned:
                self.stdout.write(self.style.SUCCESS(f"Assigned order #{order_id} to {name} ({code})"))
        else:
            self.stdout.write("No eligible unassigned paid orders were available.")
        self.stdout.write(
            self.style.WARNING(
                "These are fictional demo profiles with unusable passwords and no GPS. "
                "They cannot sign in or provide live tracking; replace them with real partner accounts."
            )
        )
