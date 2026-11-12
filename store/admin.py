from django.contrib import admin
from django import forms
from django.db.models import Sum
from django.contrib import messages
from django.test import RequestFactory
import json
from .models import (Coupon, GSTCatalogProduct, Order, OrderItem, ReturnPolicy,
                     OrderCancellation, Refund, ReturnRequest,
                     ReplacementRequest, OrderStatusHistory)


def _workflow_action(modeladmin, request, queryset, request_type, status):
    from ecommerce.views import admin_order_request_action
    factory = RequestFactory()
    succeeded = 0
    for record in queryset:
        synthetic = factory.post("/admin-api/order-requests/", data=json.dumps({"status": status}), content_type="application/json")
        synthetic.user = request.user
        response = admin_order_request_action(synthetic, request_type, record.pk)
        if response.status_code < 300:
            succeeded += 1
        else:
            try:
                detail = json.loads(response.content).get("message", "")
            except (ValueError, TypeError):
                detail = ""
            modeladmin.message_user(request, f"Request #{record.pk}: {detail or 'could not be updated.'}", level=messages.WARNING)
    modeladmin.message_user(request, f"Updated {succeeded} {request_type} request(s).", level=messages.SUCCESS if succeeded else messages.WARNING)


class CouponAdminForm(forms.ModelForm):
    eligible_categories = forms.MultipleChoiceField(
        choices=(
            ("food", "Food"),
            ("grocery", "Grocery"),
            ("shopping", "Shopping / Fashion"),
            ("electronics", "Electronics"),
            ("home_appliances", "Home Appliances"),
        ),
        required=False,
        widget=forms.CheckboxSelectMultiple,
        help_text="Leave all unchecked to allow every category.",
    )

    class Meta:
        model = Coupon
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.is_bound:
            self.initial["eligible_categories"] = self.instance.eligible_categories or []

    def clean(self):
        cleaned = super().clean()
        if "eligible_categories" in cleaned:
            self.instance.eligible_categories = list(cleaned["eligible_categories"])
        return cleaned


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    form = CouponAdminForm
    list_display = ("code", "discount_type", "discount_value", "minimum_order_amount", "free_delivery", "is_active", "starts_at", "expires_at", "usage_limit", "successful_redemptions", "discount_given", "remaining_capacity")
    list_filter = ("is_active", "discount_type", "free_delivery", "first_order_only")
    search_fields = ("code", "description")

    @admin.display(description="Paid redemptions")
    def successful_redemptions(self, obj):
        return obj.orders.filter(payment_status__iexact="Paid").count()

    @admin.display(description="Discount given")
    def discount_given(self, obj):
        return obj.orders.filter(payment_status__iexact="Paid").aggregate(total=Sum("coupon_discount"))["total"] or 0

    @admin.display(description="Remaining capacity")
    def remaining_capacity(self, obj):
        if obj.usage_limit is None:
            return "Unlimited"
        return max(0, obj.usage_limit - self.successful_redemptions(obj))


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("source_product_id", "catalog_source", "hsn_code", "tax_classification", "tax_effective_from", "tax_source_reference", "gst_rate", "cgst_rate", "sgst_rate", "igst_rate", "tax_treatment", "price_includes_gst", "supplier_state", "place_of_supply_state", "place_of_supply_rule", "original_line_amount", "discount_amount", "coupon_discount_amount", "delivery_charge_share", "taxable_value", "cgst_amount", "sgst_amount", "igst_amount", "total_tax", "line_total")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "customer_name", "coupon_code", "total_amount", "payment_method", "payment_status", "order_status", "created_at")
    list_filter = ("payment_status", "order_status")
    search_fields = ("customer_name", "customer_email", "restaurant_name", "id")
    readonly_fields = ("created_at", "payment_method", "invoice_number", "supplier_legal_name", "supplier_address", "supplier_gstin", "coupon", "coupon_code", "subtotal", "discount_total", "coupon_discount", "delivery_charges", "delivery_discount", "delivery_tax", "delivery_taxable", "delivery_cgst", "delivery_sgst", "delivery_igst", "other_charges", "taxable_total", "cgst_total", "sgst_total", "igst_total", "gst_total", "supplier_state", "customer_state", "razorpay_order_id")
    inlines = (OrderItemInline,)


@admin.register(GSTCatalogProduct)
class GSTCatalogProductAdmin(admin.ModelAdmin):
    list_display = ("name", "source", "product_key", "product_type", "package_size", "stock", "stock_unit", "stock_status", "low_stock_threshold", "hsn_code", "gst_rate", "is_active")
    list_filter = ("source", "category", "stock_configured", "is_active")
    search_fields = ("name", "product_key", "hsn_code", "product_type")
    list_editable = ("stock", "stock_unit", "low_stock_threshold", "is_active")

    @admin.display(description="Stock status")
    def stock_status(self, obj):
        if not obj.stock_configured:
            return "Not configured"
        if obj.stock <= 0:
            return "Out of stock"
        if obj.stock <= obj.low_stock_threshold:
            return "Low stock"
        return "In stock"


@admin.register(ReturnPolicy)
class ReturnPolicyAdmin(admin.ModelAdmin):
    list_display = ("category", "returns_allowed", "return_window_days", "replacements_allowed", "replacement_window_days", "inspection_required", "updated_at")
    list_filter = ("returns_allowed", "replacements_allowed", "inspection_required")
    search_fields = ("category", "customer_instructions")


@admin.register(OrderCancellation)
class OrderCancellationAdmin(admin.ModelAdmin):
    list_display = ("order", "reason", "status", "requested_at", "reviewed_at")
    list_filter = ("status", "reason", "requested_at")
    search_fields = ("order__id", "order__customer_email", "order__customer_name")
    readonly_fields = ("order", "requested_by", "reason", "details", "status", "requested_at", "reviewed_at")
    actions = ("approve_cancellations", "reject_cancellations")

    @admin.action(description="Approve selected cancellations")
    def approve_cancellations(self, request, queryset):
        _workflow_action(self, request, queryset, "cancellation", "approved")

    @admin.action(description="Reject selected cancellations")
    def reject_cancellations(self, request, queryset):
        _workflow_action(self, request, queryset, "cancellation", "rejected")


@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ("order", "amount", "status", "payment_id", "refund_id", "created_at", "completed_at")
    list_filter = ("status", "created_at")
    search_fields = ("order__customer_email", "payment_id", "refund_id", "idempotency_key")
    readonly_fields = tuple(field.name for field in Refund._meta.fields)
    actions = ("retry_failed_refunds",)

    @admin.action(description="Safely retry selected failed refunds")
    def retry_failed_refunds(self, request, queryset):
        from ecommerce.refunds import retry_failed_refund
        for refund in queryset.filter(status="failed"):
            try:
                result = retry_failed_refund(refund.pk)
                self.message_user(request, f"Refund #{refund.pk}: retry is {result.status}.", level=messages.SUCCESS)
            except Exception as error:
                self.message_user(request, f"Refund #{refund.pk}: {error}", level=messages.ERROR)


@admin.register(ReturnRequest)
class ReturnRequestAdmin(admin.ModelAdmin):
    list_display = ("order", "order_item", "reason", "status", "requested_at", "updated_at")
    list_filter = ("status", "reason", "requested_at")
    search_fields = ("order__customer_email", "order_item__name", "description")
    readonly_fields = ("order", "order_item", "requested_by", "reason", "description", "evidence_photo", "status", "requested_at", "updated_at")
    actions = ("approve_returns", "reject_returns", "mark_inspection", "accept_returns")

    @admin.action(description="Approve selected returns")
    def approve_returns(self, request, queryset):
        _workflow_action(self, request, queryset, "return", "approved")

    @admin.action(description="Reject selected returns")
    def reject_returns(self, request, queryset):
        _workflow_action(self, request, queryset, "return", "rejected")

    @admin.action(description="Mark received returns as inspection pending")
    def mark_inspection(self, request, queryset):
        _workflow_action(self, request, queryset, "return", "inspection_pending")

    @admin.action(description="Accept inspected returns and start eligible refund")
    def accept_returns(self, request, queryset):
        _workflow_action(self, request, queryset, "return", "accepted")


@admin.register(ReplacementRequest)
class ReplacementRequestAdmin(admin.ModelAdmin):
    list_display = ("order", "order_item", "reason", "status", "replacement_available", "requested_at", "updated_at")
    list_filter = ("status", "reason", "replacement_available", "requested_at")
    search_fields = ("order__customer_email", "order_item__name", "description")
    readonly_fields = ("order", "order_item", "requested_by", "reason", "description", "evidence_photo", "replacement_available", "replacement_stock_reserved", "status", "requested_at", "updated_at")
    actions = ("approve_replacements", "reject_replacements", "schedule_pickup", "mark_picked_up", "mark_inspection", "confirm_replacement", "mark_dispatched", "mark_delivered", "complete_replacements")

    @admin.action(description="Approve and reserve selected replacements")
    def approve_replacements(self, request, queryset):
        _workflow_action(self, request, queryset, "replacement", "approved")

    @admin.action(description="Reject selected replacements")
    def reject_replacements(self, request, queryset):
        _workflow_action(self, request, queryset, "replacement", "rejected")

    @admin.action(description="Schedule pickup")
    def schedule_pickup(self, request, queryset):
        _workflow_action(self, request, queryset, "replacement", "pickup_scheduled")

    @admin.action(description="Mark picked up")
    def mark_picked_up(self, request, queryset):
        _workflow_action(self, request, queryset, "replacement", "picked_up")

    @admin.action(description="Mark inspection pending")
    def mark_inspection(self, request, queryset):
        _workflow_action(self, request, queryset, "replacement", "inspection_pending")

    @admin.action(description="Confirm like-for-like replacement")
    def confirm_replacement(self, request, queryset):
        _workflow_action(self, request, queryset, "replacement", "replacement_confirmed")

    @admin.action(description="Mark dispatched")
    def mark_dispatched(self, request, queryset):
        _workflow_action(self, request, queryset, "replacement", "dispatched")

    @admin.action(description="Mark delivered")
    def mark_delivered(self, request, queryset):
        _workflow_action(self, request, queryset, "replacement", "delivered")

    @admin.action(description="Complete selected replacements")
    def complete_replacements(self, request, queryset):
        _workflow_action(self, request, queryset, "replacement", "completed")


@admin.register(OrderStatusHistory)
class OrderStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ("order", "event_type", "from_status", "to_status", "actor", "created_at")
    list_filter = ("event_type", "created_at")
    search_fields = ("order__id", "note", "order__customer_email")
    readonly_fields = tuple(field.name for field in OrderStatusHistory._meta.fields)
