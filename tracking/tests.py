import json

from django.contrib.auth import get_user_model
from django.contrib.admin.sites import AdminSite
from django.test import RequestFactory
from django.test import TestCase
from django.urls import reverse

from store.models import Order
from .admin import TrackingSessionAdmin
from .models import DeliveryNotification, DeliveryPartner, TrackingSession
from .services import assign_available_partner, create_partner_notification


class PartnerAccountFlowTests(TestCase):
    def registration_data(self):
        return {
            "name": "Test Rider", "email": "rider@example.test", "phone": "9876543210",
            "vehicle": "Scooter", "vehicle_number": "AP 01 AB 1234",
            "license_number": "DL-TEST-1234", "password": "Valid-Pass-704!",
            "confirm_password": "Valid-Pass-704!",
        }

    def test_registration_waits_for_admin_approval(self):
        response = self.client.post(reverse("partner_register"), self.registration_data())
        self.assertEqual(response.status_code, 200)
        user = get_user_model().objects.get(email="rider@example.test")
        partner = user.delivery_profile
        self.assertFalse(partner.is_approved)
        self.assertFalse(partner.is_online)
        self.assertFalse(partner.is_available)

    def test_registration_rejects_non_digit_mobile_numbers(self):
        for phone in ("98765-43210", "+919876543210", "98765abc"):
            with self.subTest(phone=phone):
                data = self.registration_data()
                data["phone"] = phone
                response = self.client.post(reverse("partner_register"), data)
                self.assertContains(response, "Mobile number can contain digits only.")
        self.assertFalse(get_user_model().objects.filter(email="rider@example.test").exists())

    def test_registration_rejects_non_letter_name_and_vehicle_type(self):
        for field, value in (("name", "Test Rider2"), ("name", "Test-Rider"), ("vehicle", "Bike 2"), ("vehicle", "E-bike")):
            with self.subTest(field=field, value=value):
                data = self.registration_data()
                data[field] = value
                response = self.client.post(reverse("partner_register"), data)
                if field == "name":
                    self.assertContains(response, "Full name can contain letters and spaces only.")
                else:
                    self.assertContains(response, "Vehicle type can contain letters and spaces only.")
        self.assertFalse(get_user_model().objects.filter(email="rider@example.test").exists())

    def test_pending_partner_cannot_log_in_until_approved(self):
        user = get_user_model().objects.create_user(
            username="pending@example.test", email="pending@example.test", password="Valid-Pass-704!",
        )
        DeliveryPartner.objects.create(user=user, phone="9876543210", vehicle="Scooter", license_number="DL-123")
        response = self.client.post(reverse("partner_login"), {
            "email": "pending@example.test", "password": "Valid-Pass-704!",
        })
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "waiting for LocalMart admin approval")

        user.delivery_profile.is_approved = True
        user.delivery_profile.save(update_fields=["is_approved"])
        response = self.client.post(reverse("partner_login"), {
            "email": "pending@example.test", "password": "Valid-Pass-704!",
        })
        self.assertRedirects(response, reverse("delivery_dashboard_alias"))


class DeliveryNotificationTests(TestCase):
    def setUp(self):
        user_model = get_user_model()
        self.admin = user_model.objects.create_superuser(
            username="notification-admin", email="admin@example.test", password="Admin-Pass-704!",
        )
        self.partner_user = user_model.objects.create_user(
            username="notification-rider", email="rider@example.test", password="Rider-Pass-704!",
        )
        self.partner = DeliveryPartner.objects.create(
            user=self.partner_user, is_approved=True, is_active=True, is_available=True, is_online=True,
        )
        self.order = Order.objects.create(
            customer_name="Taylor Customer", customer_email="customer@example.test",
            delivery_address="12 Market Street", total_amount="845.50", payment_status="Paid",
        )
        self.session = TrackingSession.objects.create(
            order=self.order, customer_email=self.order.customer_email, status="preparing",
        )

    def create_partner(self, username):
        user = get_user_model().objects.create_user(
            username=username, email=f"{username}@example.test", password="Rider-Pass-704!",
        )
        return DeliveryPartner.objects.create(
            user=user, is_approved=True, is_active=True, is_available=True, is_online=True,
        )

    def test_automatic_assignment_creates_one_notification(self):
        assigned = assign_available_partner(self.session)
        self.assertEqual(assigned, self.partner)
        self.assertEqual(DeliveryNotification.objects.filter(delivery_partner=self.partner).count(), 1)
        create_partner_notification(self.session, self.partner, "assigned")
        self.assertEqual(DeliveryNotification.objects.filter(delivery_partner=self.partner).count(), 1)

    def test_manual_reassignment_and_cancellation_notify_correct_partners(self):
        replacement = self.create_partner("replacement-rider")
        self.client.force_login(self.admin)
        assign_url = reverse("assign_delivery_partner_api", args=[self.order.pk])

        first = self.client.post(assign_url, data=json.dumps({"partner_id": self.partner.pk}), content_type="application/json")
        self.assertEqual(first.status_code, 200)
        second = self.client.post(assign_url, data=json.dumps({"partner_id": replacement.pk}), content_type="application/json")
        self.assertEqual(second.status_code, 200)
        self.assertTrue(DeliveryNotification.objects.filter(delivery_partner=self.partner, notification_type="reassigned").exists())
        self.assertTrue(DeliveryNotification.objects.filter(delivery_partner=replacement, notification_type="assigned").exists())

        cancelled = self.client.post(
            reverse("tracking_status_api", args=[self.order.pk]),
            data=json.dumps({"status": "cancelled"}), content_type="application/json",
        )
        self.assertEqual(cancelled.status_code, 200)
        self.assertTrue(DeliveryNotification.objects.filter(delivery_partner=replacement, notification_type="cancelled").exists())

    def test_notification_api_is_partner_scoped_and_supports_read_actions(self):
        own = create_partner_notification(self.session, self.partner, "assigned")
        other_partner = self.create_partner("other-rider")
        other_order = Order.objects.create(
            customer_name="Other Customer", customer_email="other@example.test", total_amount="10.00",
        )
        other_tracking = TrackingSession.objects.create(order=other_order, customer_email=other_order.customer_email)
        other = create_partner_notification(other_tracking, other_partner, "assigned")
        self.client.force_login(self.partner_user)
        url = reverse("delivery_notifications_api")

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["unread_count"], 1)
        self.assertEqual(payload["notifications"][0]["customer"], "Taylor Customer")
        self.assertEqual(payload["notifications"][0]["address"], "12 Market Street")
        self.assertEqual(payload["notifications"][0]["amount"], "845.50")

        forbidden = self.client.post(url, data=json.dumps({"notification_id": other.pk}), content_type="application/json")
        self.assertEqual(forbidden.status_code, 404)
        marked = self.client.post(url, data=json.dumps({"notification_id": own.pk}), content_type="application/json")
        self.assertEqual(marked.status_code, 200)
        self.assertEqual(marked.json()["unread_count"], 0)
        self.assertTrue(DeliveryNotification.objects.get(pk=other.pk).is_read is False)

    def test_dashboard_history_and_order_detail_render(self):
        assigned = assign_available_partner(self.session)
        self.assertEqual(assigned, self.partner)
        self.client.force_login(self.partner_user)

        dashboard = self.client.get(reverse("delivery_dashboard_alias"))
        self.assertContains(dashboard, "data-notification-center")
        history = self.client.get(reverse("partner_dashboard_page", args=["notifications"]))
        self.assertContains(history, "data-notification-history")
        details = self.client.get(reverse("partner_notification_order", args=[self.order.pk]))
        self.assertContains(details, "Taylor Customer")
        self.assertContains(details, "12 Market Street")
        self.assertContains(details, "845.50")
        self.assertTrue(DeliveryNotification.objects.get(delivery_partner=self.partner).is_read)

    def test_direct_admin_assignment_and_cancellation_create_notifications(self):
        request = RequestFactory().post("/admin/tracking/trackingsession/")
        request.user = self.admin
        model_admin = TrackingSessionAdmin(TrackingSession, AdminSite())
        session = TrackingSession.objects.get(pk=self.session.pk)
        session.partner = self.partner
        model_admin.save_model(request, session, form=None, change=True)
        session.refresh_from_db()
        self.assertEqual(session.status, "partner_assigned")
        self.assertIsNotNone(session.assigned_at)
        self.assertTrue(DeliveryNotification.objects.filter(delivery_partner=self.partner, notification_type="assigned").exists())

        replacement = self.create_partner("admin-replacement-rider")
        session.partner = replacement
        model_admin.save_model(request, session, form=None, change=True)
        self.assertTrue(DeliveryNotification.objects.filter(delivery_partner=self.partner, notification_type="reassigned").exists())
        self.assertTrue(DeliveryNotification.objects.filter(delivery_partner=replacement, notification_type="assigned").exists())

        session.status = "cancelled"
        model_admin.save_model(request, session, form=None, change=True)
        self.assertTrue(DeliveryNotification.objects.filter(delivery_partner=replacement, notification_type="cancelled").exists())
