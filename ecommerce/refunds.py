from decimal import Decimal

import razorpay
from django.conf import settings
from django.db import transaction
from django.db.models import Sum
from django.utils import timezone

from store.models import Order, OrderStatusHistory, Refund


class RefundError(ValueError):
    pass


def is_razorpay_order(order):
    if (order.payment_method or "").casefold() == "razorpay":
        return True
    # Older verified LocalMart orders predate payment_method; verification
    # replaces the Razorpay order ID stored at checkout with the captured ID.
    return bool(order.razorpay_order_id and order.payment_id and order.payment_id != order.razorpay_order_id)


def _settle_paid_refunds(order):
    total = order.refunds.filter(status="completed").aggregate(value=Sum("amount"))["value"] or Decimal("0.00")
    if total >= order.total_amount:
        order.payment_status = "Refunded"
    elif total > 0:
        order.payment_status = "Partially Refunded"
    order.save(update_fields=("payment_status",))


def unrefunded_balance(order):
    reserved = order.refunds.filter(status__in=("pending", "processing", "completed")).aggregate(value=Sum("amount"))["value"] or Decimal("0.00")
    return max(Decimal(order.total_amount) - reserved, Decimal("0.00"))


def _client():
    if not settings.RAZORPAY_KEY_ID or not settings.RAZORPAY_KEY_SECRET:
        raise RefundError("Razorpay refund credentials are not configured.")
    return razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


def create_refund_record(*, order, amount, reason, idempotency_key, cancellation=None, return_request=None, order_item=None):
    amount = Decimal(str(amount)).quantize(Decimal("0.01"))
    if amount <= 0:
        raise RefundError("Refund amount must be greater than zero.")
    with transaction.atomic():
        locked_order = Order.objects.select_for_update().get(pk=order.pk)
        if locked_order.payment_status.casefold() not in ("paid", "partially refunded") or not locked_order.payment_id or not is_razorpay_order(locked_order):
            raise RefundError("Only verified, paid Razorpay orders can be refunded.")
        existing = Refund.objects.filter(idempotency_key=idempotency_key).first()
        if existing:
            return existing, False
        reserved = Refund.objects.filter(order=locked_order, status__in=("pending", "processing", "completed")).aggregate(total=Sum("amount"))["total"] or Decimal("0.00")
        if reserved + amount > locked_order.total_amount:
            raise RefundError("Refund requests cannot exceed the amount paid.")
        refund = Refund.objects.create(
            order=locked_order,
            order_item=order_item,
            cancellation=cancellation,
            return_request=return_request,
            payment_id=locked_order.payment_id,
            idempotency_key=idempotency_key,
            amount=amount,
            reason=reason[:300],
        )
        return refund, True


def submit_refund(refund_id):
    """Submit once to Razorpay; leave ambiguous timeouts processing for webhook reconciliation."""
    with transaction.atomic():
        refund = Refund.objects.select_for_update().select_related("order").get(pk=refund_id)
        if refund.status in ("completed", "processing"):
            return refund
        if refund.status != "pending":
            raise RefundError("Only a pending refund can be submitted.")
        order = Order.objects.select_for_update().get(pk=refund.order_id)
        if order.payment_status.casefold() not in ("paid", "partially refunded") or order.payment_id != refund.payment_id or not is_razorpay_order(order):
            refund.status = "rejected"
            refund.gateway_reference = {"error": "Payment is not a verified payment for this order."}
            refund.save(update_fields=("status", "gateway_reference", "updated_at"))
            raise RefundError("The saved payment is not verified for this order.")
        refund.status = "processing"
        refund.save(update_fields=("status", "updated_at"))

    try:
        client = _client()
        payment = client.payment.fetch(refund.payment_id)
        if str(payment.get("order_id", "")) != str(order.razorpay_order_id):
            raise RefundError("Razorpay payment does not belong to the saved order.")
        if payment.get("status") != "captured":
            raise RefundError("Razorpay has not confirmed this payment as captured.")
        captured = int(payment.get("amount", 0))
        amount_refunded = int(payment.get("amount_refunded", 0))
        requested_paise = int(refund.amount * 100)
        exceeds_captured = False
        with transaction.atomic():
            locked = Refund.objects.select_for_update().get(pk=refund.pk)
            other_reserved = Refund.objects.filter(order=order, status__in=("pending", "processing")).exclude(pk=locked.pk).aggregate(total=Sum("amount"))["total"] or Decimal("0.00")
            if requested_paise + amount_refunded + int(other_reserved * 100) > captured:
                locked.status = "rejected"
                locked.gateway_reference = {"error": "Refund would exceed Razorpay's captured balance."}
                locked.save(update_fields=("status", "gateway_reference", "updated_at"))
                exceeds_captured = True
        if exceeds_captured:
            raise RefundError("The refund would exceed the captured payment amount.")
        response = client.payment.refund(refund.payment_id, {
            "amount": requested_paise,
            "notes": {"localmart_refund_id": str(refund.pk), "reason": refund.reason[:200]},
        })
        gateway_status = str(response.get("status", "pending")).lower()
        with transaction.atomic():
            locked = Refund.objects.select_for_update().get(pk=refund.pk)
            locked.refund_id = response.get("id") or locked.refund_id
            locked.gateway_reference = response
            locked.status = "completed" if gateway_status == "processed" else "processing"
            if locked.status == "completed":
                locked.completed_at = timezone.now()
            locked.save(update_fields=("refund_id", "gateway_reference", "status", "completed_at", "updated_at"))
            if locked.status == "completed":
                order = Order.objects.select_for_update().get(pk=locked.order_id)
                _settle_paid_refunds(order)
                if locked.return_request_id:
                    from store.models import ReturnRequest
                    ReturnRequest.objects.filter(pk=locked.return_request_id).update(status="completed", completed_at=timezone.now())
        return locked
    except RefundError as error:
        reason = str(error)
        if "credentials are not configured" in reason:
            Refund.objects.filter(pk=refund.pk).update(status="failed", gateway_reference={"error": reason})
            return Refund.objects.get(pk=refund.pk)
        if any(part in reason for part in ("does not belong", "not confirmed", "exceed the captured")):
            Refund.objects.filter(pk=refund.pk).update(status="rejected", gateway_reference={"error": reason})
            return Refund.objects.get(pk=refund.pk)
        raise
    except Exception as error:
        # A timeout can happen after Razorpay accepted the refund; never blindly resubmit it.
        Refund.objects.filter(pk=refund.pk).update(gateway_reference={"submission_error": str(error)[:500]})
        return Refund.objects.get(pk=refund.pk)


def retry_failed_refund(refund_id):
    failed = Refund.objects.select_related("order").get(pk=refund_id)
    if failed.status != "failed":
        raise RefundError("Only a gateway-confirmed failed refund can be retried.")
    if failed.refund_id:
        gateway_refund = _client().refund.fetch(failed.refund_id)
        if str(gateway_refund.get("status", "")).lower() != "failed":
            raise RefundError("Razorpay has not confirmed that the earlier refund failed.")
    retry, _ = create_refund_record(
        order=failed.order,
        order_item=failed.order_item,
        cancellation=failed.cancellation,
        return_request=failed.return_request,
        amount=failed.amount,
        reason=failed.reason,
        idempotency_key=f"retry:{failed.pk}:{timezone.now().timestamp()}",
    )
    return submit_refund(retry.pk)


def record_gateway_refund_event(refund_id, status, payload, local_refund_id=None):
    if status not in ("completed", "failed"):
        return None
    with transaction.atomic():
        refund = Refund.objects.select_for_update().filter(refund_id=refund_id).first()
        if refund is None and str(local_refund_id or "").isdigit():
            refund = Refund.objects.select_for_update().filter(pk=int(local_refund_id)).first()
        if refund is None:
            return None
        if refund.status == "completed":
            return refund
        if refund_id and not refund.refund_id:
            refund.refund_id = refund_id
        refund.status = status
        refund.gateway_reference = payload
        if status == "completed":
            refund.completed_at = timezone.now()
        refund.save(update_fields=("status", "gateway_reference", "completed_at", "updated_at"))
        if status == "completed":
            order = Order.objects.select_for_update().get(pk=refund.order_id)
            _settle_paid_refunds(order)
            if refund.return_request_id:
                from store.models import ReturnRequest
                ReturnRequest.objects.filter(pk=refund.return_request_id).update(status="completed", completed_at=timezone.now())
        return refund
