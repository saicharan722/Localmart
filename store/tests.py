import hashlib
import hmac
import json
from decimal import Decimal
from unittest.mock import Mock, patch

from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings
from django.urls import reverse

from ecommerce.refunds import RefundError, create_refund_record, submit_refund
from store.models import Order, OrderCancellation, Refund


class OrderWorkflowTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="buyer", email="buyer@example.com", password="secret"
        )
        self.order = self.make_order()
        self.client.force_login(self.user)
        session = self.client.session
        session["user"] = {"email": self.user.email}
        session.save()

    def make_order(self, **kwargs):
        values = dict(
            customer_name="Buyer", customer_email="buyer@example.com",
            total_amount=Decimal("100.00"), payment_status="Pending",
            order_status="Placed",
        )
        values.update(kwargs)
        return Order.objects.create(**values)

    def test_unpaid_order_cancellation_is_idempotently_recorded_and_no_gateway_refund(self):
        with patch("ecommerce.views.submit_refund") as gateway:
            response = self.client.post(
                reverse("request_order_cancellation", args=[self.order.pk]),
                {"reason": "mistake"},
            )
        self.assertEqual(response.status_code, 200)
        self.order.refresh_from_db()
        self.assertEqual(self.order.order_status.casefold(), "cancelled")
        self.assertEqual(OrderCancellation.objects.filter(order=self.order).count(), 1)
        gateway.assert_not_called()
        repeated = self.client.post(
            reverse("request_order_cancellation", args=[self.order.pk]),
            {"reason": "changed_mind"},
        )
        self.assertEqual(repeated.status_code, 409)

    def test_delivered_order_cannot_be_cancelled(self):
        self.order.order_status = "Delivered"
        self.order.save(update_fields=["order_status"])
        response = self.client.post(
            reverse("request_order_cancellation", args=[self.order.pk]),
            {"reason": "changed_mind"},
        )
        self.assertEqual(response.status_code, 409)
        self.assertFalse(OrderCancellation.objects.filter(order=self.order).exists())

    def test_another_customer_cannot_access_order_actions(self):
        other = get_user_model().objects.create_user(
            username="other", email="other@example.com", password="secret"
        )
        self.client.force_login(other)
        session = self.client.session
        session["user"] = {"email": other.email}
        session.save()
        response = self.client.post(
            reverse("request_order_cancellation", args=[self.order.pk]),
            {"reason": "changed_mind"},
        )
        self.assertEqual(response.status_code, 403)

    def test_refund_idempotency_and_captured_payment_ceiling(self):
        self.order.payment_status = "Paid"
        self.order.payment_method = "Razorpay"
        self.order.payment_id = "pay_test_1"
        self.order.razorpay_order_id = "order_test_1"
        self.order.save()
        refund, created = create_refund_record(
            order=self.order, amount="60.00", reason="return",
            idempotency_key="return:1",
        )
        same, created_again = create_refund_record(
            order=self.order, amount="60.00", reason="return",
            idempotency_key="return:1",
        )
        self.assertTrue(created)
        self.assertFalse(created_again)
        self.assertEqual(same.pk, refund.pk)
        with self.assertRaises(RefundError):
            create_refund_record(
                order=self.order, amount="41.00", reason="extra",
                idempotency_key="return:2",
            )
        self.assertEqual(Refund.objects.filter(order=self.order).count(), 1)

    def test_partial_refunds_continue_after_first_refund_is_confirmed(self):
        self.order.payment_status = "Partially Refunded"
        self.order.payment_method = "Razorpay"
        self.order.payment_id = "pay_test_2"
        self.order.razorpay_order_id = "order_test_2"
        self.order.save()
        refund, created = create_refund_record(
            order=self.order, amount="40.00", reason="item return",
            idempotency_key="return:partial-1",
        )
        self.assertTrue(created)
        self.assertEqual(refund.amount, Decimal("40.00"))

    @override_settings(RAZORPAY_KEY_ID="key_test", RAZORPAY_KEY_SECRET="secret")
    def test_only_gateway_processed_response_completes_refund(self):
        self.order.payment_status = "Paid"
        self.order.payment_method = "Razorpay"
        self.order.payment_id = "pay_test_3"
        self.order.razorpay_order_id = "order_test_3"
        self.order.save()
        refund, _ = create_refund_record(
            order=self.order, amount="25.00", reason="approved cancellation",
            idempotency_key="cancel:test",
        )
        gateway = Mock()
        gateway.payment.fetch.return_value = {
            "order_id": "order_test_3", "status": "captured",
            "amount": 10000, "amount_refunded": 0,
        }
        gateway.payment.refund.return_value = {"id": "rfnd_test_3", "status": "pending"}
        with patch("ecommerce.refunds._client", return_value=gateway):
            result = submit_refund(refund.pk)
        self.assertEqual(result.status, "processing")
        gateway.payment.refund.assert_called_once()

    @override_settings(RAZORPAY_WEBHOOK_SECRET="test-webhook-secret")
    def test_refund_webhook_rejects_invalid_signature(self):
        body = json.dumps({"event": "refund.processed", "payload": {}}).encode()
        response = self.client.post(
            reverse("razorpay_refund_webhook"), data=body,
            content_type="application/json", HTTP_X_RAZORPAY_SIGNATURE="invalid",
        )
        self.assertEqual(response.status_code, 400)

    @override_settings(RAZORPAY_WEBHOOK_SECRET="test-webhook-secret")
    def test_verified_refund_webhook_is_idempotent(self):
        self.order.payment_status = "Paid"
        self.order.payment_method = "Razorpay"
        self.order.payment_id = "pay_test_4"
        self.order.razorpay_order_id = "order_test_4"
        self.order.save()
        refund, _ = create_refund_record(
            order=self.order, amount="20.00", reason="approved cancellation",
            idempotency_key="cancel:webhook",
        )
        payload = {"event": "refund.processed", "payload": {"refund": {"entity": {
            "id": "rfnd_webhook_1", "notes": {"localmart_refund_id": str(refund.pk)},
        }}}}
        body = json.dumps(payload).encode()
        signature = hmac.new(b"test-webhook-secret", body, hashlib.sha256).hexdigest()
        url = reverse("razorpay_refund_webhook")
        for _ in range(2):
            response = self.client.generic(
                "POST", url, body, content_type="application/json",
                HTTP_X_RAZORPAY_SIGNATURE=signature,
            )
            self.assertEqual(response.status_code, 200)
            self.assertFalse(response.json().get("ignored", False))
        refund.refresh_from_db()
        self.assertEqual(refund.status, "completed")
        self.order.refresh_from_db()
        self.assertEqual(self.order.payment_status, "Partially Refunded")
