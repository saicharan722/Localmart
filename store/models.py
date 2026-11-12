from django.db import models
from django.db.models import Q
from django.conf import settings
from merchants.models import MerchantProfile
from django.core.exceptions import ValidationError
from django.utils import timezone


class Coupon(models.Model):
    DISCOUNT_TYPES = [("percentage", "Percentage"), ("fixed", "Fixed amount")]
    CATEGORY_GROUPS = ("food", "grocery", "shopping", "electronics", "home_appliances")

    code = models.CharField(max_length=40, unique=True)
    description = models.CharField(max_length=240, blank=True)
    terms_and_conditions = models.TextField(blank=True)
    discount_type = models.CharField(max_length=12, choices=DISCOUNT_TYPES, default="fixed")
    discount_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    minimum_order_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    maximum_discount_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    starts_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    eligible_categories = models.JSONField(default=list, blank=True)
    applicable_products = models.JSONField(default=list, blank=True, help_text="Optional product references in source:id format, for example grocery:123.")
    minimum_eligible_quantity = models.PositiveIntegerField(default=0)
    first_order_only = models.BooleanField(default=False)
    exclude_discounted_products = models.BooleanField(default=False)
    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    per_customer_limit = models.PositiveIntegerField(null=True, blank=True)
    free_delivery = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("code",)

    def clean(self):
        self.code = (self.code or "").strip().upper()
        if self.discount_value < 0 or self.minimum_order_amount < 0:
            raise ValidationError("Coupon amounts cannot be negative.")
        if self.maximum_discount_amount is not None and self.maximum_discount_amount < 0:
            raise ValidationError({"maximum_discount_amount": "Maximum discount cannot be negative."})
        if self.discount_type == "percentage" and self.discount_value > 100:
            raise ValidationError({"discount_value": "Percentage discount cannot exceed 100%."})
        if self.expires_at and self.starts_at and self.expires_at <= self.starts_at:
            raise ValidationError({"expires_at": "Expiry must be after the start date."})
        invalid = set(self.eligible_categories or []) - set(self.CATEGORY_GROUPS)
        if invalid:
            raise ValidationError({"eligible_categories": f"Unsupported categories: {', '.join(sorted(invalid))}."})
        if self.free_delivery and self.discount_value:
            raise ValidationError("A free-delivery coupon must have a zero merchandise discount value.")

    def save(self, *args, **kwargs):
        self.code = (self.code or "").strip().upper()
        super().save(*args, **kwargs)

    def is_currently_valid(self, at=None):
        at = at or timezone.now()
        return self.is_active and not (self.starts_at and at < self.starts_at) and not (self.expires_at and at >= self.expires_at)

    def __str__(self):
        return self.code


class Order(models.Model):
    supplier_state = models.CharField(max_length=80, default="Telangana")
    supplier_legal_name = models.CharField(max_length=220, blank=True)
    supplier_address = models.TextField(blank=True)
    supplier_gstin = models.CharField(max_length=15, blank=True)
    invoice_number = models.CharField(max_length=40, blank=True, db_index=True)
    customer_state = models.CharField(max_length=80, blank=True)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    discount_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    taxable_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    cgst_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    sgst_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    igst_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    gst_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    delivery_charges = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    delivery_tax = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    other_charges = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    delivery_taxable = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    delivery_cgst = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    delivery_sgst = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    delivery_igst = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    delivery_discount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    coupon = models.ForeignKey(Coupon, null=True, blank=True, on_delete=models.SET_NULL, related_name="orders")
    coupon_code = models.CharField(max_length=40, blank=True)
    coupon_discount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    coupon_eligible_subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    razorpay_order_id = models.CharField(max_length=200, blank=True, db_index=True)
    customer_name = models.CharField(max_length=200)
    customer_email = models.EmailField()
    customer_gstin = models.CharField(max_length=15, blank=True)
    customer_user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name="localmart_orders")
    delivery_address = models.TextField(blank=True)
    customer_latitude = models.FloatField(null=True, blank=True)
    customer_longitude = models.FloatField(null=True, blank=True)
    delivery_latitude = models.FloatField(null=True, blank=True)
    delivery_longitude = models.FloatField(null=True, blank=True)
    delivery_location_confirmed = models.BooleanField(default=False)
    restaurant_name = models.CharField(max_length=180, blank=True)
    merchant_profile = models.ForeignKey(MerchantProfile, null=True, blank=True, on_delete=models.SET_NULL, related_name="localmart_orders")
    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    payment_method = models.CharField(max_length=30, blank=True)

    payment_id = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )

    payment_status = models.CharField(
        max_length=50,
        default="Pending"
    )

    order_status = models.CharField(
        max_length=50,
        default="Placed"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=("invoice_number",),
            condition=~Q(invoice_number=""),
            name="unique_nonempty_localmart_invoice_number",
        )]

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    merchant_product = models.ForeignKey(
        "merchants.MerchantProduct",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="order_items",
    )

    name = models.CharField(max_length=200)

    category = models.CharField(
        max_length=100,
        blank=True
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    image = models.URLField(
        max_length=1000,
        blank=True
    )

    hsn_code = models.CharField(max_length=16, blank=True)
    source_product_id = models.CharField(max_length=180, blank=True)
    catalog_source = models.CharField(max_length=30, blank=True)
    tax_classification = models.CharField(max_length=120, blank=True)
    tax_effective_from = models.DateField(null=True, blank=True)
    tax_source_reference = models.URLField(max_length=1000, blank=True)
    gst_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    cgst_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    sgst_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    igst_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    price_includes_gst = models.BooleanField(default=False)
    original_line_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_treatment = models.CharField(max_length=20, default="taxable")
    supplier_state = models.CharField(max_length=80, default="Telangana")
    place_of_supply_state = models.CharField(max_length=80, blank=True)
    place_of_supply_rule = models.CharField(max_length=24, blank=True)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    taxable_value = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    cgst_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    sgst_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    igst_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_tax = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    line_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    coupon_discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    delivery_charge_share = models.DecimalField(max_digits=12, decimal_places=2, default=0)



    # False until inventory is successfully deducted.
    stock_deducted = models.BooleanField(default=False)



    def __str__(self):
        return self.name


class ReturnPolicy(models.Model):
    """Staff-configurable cancellation and post-delivery policy by category."""
    category = models.CharField(max_length=100, unique=True)
    returns_allowed = models.BooleanField(default=False)
    return_window_days = models.PositiveSmallIntegerField(null=True, blank=True)
    replacements_allowed = models.BooleanField(default=False)
    replacement_window_days = models.PositiveSmallIntegerField(null=True, blank=True)
    inspection_required = models.BooleanField(default=True)
    customer_instructions = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("category",)

    def __str__(self):
        return self.category


class OrderCancellation(models.Model):
    REASONS = [(key, label) for key, label in (
        ("mistake", "Ordered by mistake"), ("incorrect_item", "Incorrect item"),
        ("changed_mind", "Changed my mind"), ("delayed", "Delayed delivery"), ("other", "Other"),
    )]
    STATUSES = [(key, label) for key, label in (
        ("requested", "Requested"), ("approved", "Approved"), ("rejected", "Rejected"),
    )]
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="cancellation")
    requested_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    reason = models.CharField(max_length=24, choices=REASONS)
    details = models.TextField(blank=True)
    status = models.CharField(max_length=16, choices=STATUSES, default="requested", db_index=True)
    review_note = models.TextField(blank=True)
    requested_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Cancellation for order #{self.order_id} ({self.status})"


class ReturnRequest(models.Model):
    REASONS = [(key, label) for key, label in (
        ("damaged", "Damaged product"), ("defective", "Defective product"),
        ("wrong_item", "Wrong item"), ("missing_item", "Missing item"), ("other", "Other"),
    )]
    STATUSES = [(key, label) for key, label in (
        ("requested", "Requested"), ("approved", "Approved"), ("rejected", "Rejected"),
        ("pickup_scheduled", "Pickup scheduled"), ("picked_up", "Picked up"),
        ("received", "Received"), ("inspection_pending", "Inspection pending"),
        ("accepted", "Accepted"), ("refund_processing", "Refund processing"), ("completed", "Completed"),
    )]
    ACTIVE_STATUSES = ("requested", "approved", "pickup_scheduled", "picked_up", "received", "inspection_pending", "accepted", "refund_processing")
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="return_requests")
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name="return_requests")
    requested_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    reason = models.CharField(max_length=24, choices=REASONS)
    description = models.TextField(blank=True)
    evidence_photo = models.ImageField(upload_to="order_returns/", null=True, blank=True)
    status = models.CharField(max_length=24, choices=STATUSES, default="requested", db_index=True)
    review_note = models.TextField(blank=True)
    pickup_tracking = models.CharField(max_length=120, blank=True)
    requested_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=("order_item",), condition=Q(status__in=("requested", "approved", "pickup_scheduled", "picked_up", "received", "inspection_pending", "accepted", "refund_processing")), name="unique_active_return_per_order_item")]
        ordering = ("-requested_at",)

    def __str__(self):
        return f"Return for {self.order_item} ({self.status})"


class ReplacementRequest(models.Model):
    STATUSES = [(key, label) for key, label in (
        ("requested", "Requested"), ("approved", "Approved"), ("pickup_scheduled", "Pickup scheduled"),
        ("picked_up", "Picked up"), ("inspection_pending", "Inspection pending"),
        ("replacement_confirmed", "Replacement confirmed"), ("dispatched", "Dispatched"),
        ("delivered", "Delivered"), ("rejected", "Rejected"), ("completed", "Completed"),
    )]
    ACTIVE_STATUSES = ("requested", "approved", "pickup_scheduled", "picked_up", "inspection_pending", "replacement_confirmed", "dispatched")
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="replacement_requests")
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name="replacement_requests")
    requested_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    reason = models.CharField(max_length=24, choices=ReturnRequest.REASONS)
    description = models.TextField(blank=True)
    evidence_photo = models.ImageField(upload_to="order_replacements/", null=True, blank=True)
    status = models.CharField(max_length=24, choices=STATUSES, default="requested", db_index=True)
    replacement_available = models.BooleanField(default=False)
    replacement_stock_reserved = models.BooleanField(default=False)
    review_note = models.TextField(blank=True)
    tracking_reference = models.CharField(max_length=120, blank=True)
    requested_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=("order_item",), condition=Q(status__in=("requested", "approved", "pickup_scheduled", "picked_up", "inspection_pending", "replacement_confirmed", "dispatched")), name="unique_active_replacement_per_item")]
        ordering = ("-requested_at",)


class Refund(models.Model):
    STATUSES = [(key, label) for key, label in (
        ("pending", "Pending"), ("processing", "Processing"), ("completed", "Completed"),
        ("failed", "Failed"), ("rejected", "Rejected"),
    )]
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="refunds")
    order_item = models.ForeignKey(OrderItem, null=True, blank=True, on_delete=models.SET_NULL, related_name="refunds")
    cancellation = models.ForeignKey(OrderCancellation, null=True, blank=True, on_delete=models.SET_NULL, related_name="refunds")
    return_request = models.ForeignKey(ReturnRequest, null=True, blank=True, on_delete=models.SET_NULL, related_name="refunds")
    payment_id = models.CharField(max_length=200)
    refund_id = models.CharField(max_length=200, blank=True, unique=True, null=True)
    idempotency_key = models.CharField(max_length=200, unique=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    reason = models.CharField(max_length=300)
    status = models.CharField(max_length=16, choices=STATUSES, default="pending", db_index=True)
    gateway_reference = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [models.CheckConstraint(condition=Q(amount__gt=0), name="refund_amount_positive")]
        ordering = ("-created_at",)

    def __str__(self):
        return f"Refund {self.refund_id or self.pk} for order #{self.order_id}"


class OrderStatusHistory(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="status_history")
    event_type = models.CharField(max_length=32, default="order_status")
    from_status = models.CharField(max_length=40, blank=True)
    to_status = models.CharField(max_length=40)
    note = models.TextField(blank=True)
    actor = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("created_at",)

    def __str__(self):
        return f"Order #{self.order_id}: {self.from_status} → {self.to_status}"


class GSTCatalogProduct(models.Model):
    """Admin-maintained tax and price record for static catalog products."""
    SOURCE_CHOICES = [(key, key.replace("_", " ").title()) for key in
                      ("food", "grocery", "fashion", "shopping", "electronics", "home_appliances")]
    TREATMENT_CHOICES = [(key, key.title()) for key in
                         ("taxable", "exempt", "zero_rated", "nil_rated")]
    RATE_CHOICES = [(value, f"{value}%") for value in (0, 5, 12, 18, 28)]
    PLACE_OF_SUPPLY_RULES = [("delivery_state", "Delivery state"), ("supplier_state", "Supplier GST registration state")]

    source = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    product_key = models.CharField(max_length=180)
    name = models.CharField(max_length=220)
    category = models.CharField(max_length=100, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    hsn_code = models.CharField(max_length=16, blank=True)
    gst_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tax_classification = models.CharField(max_length=120, blank=True)
    tax_effective_from = models.DateField(null=True, blank=True)
    price_includes_gst = models.BooleanField(default=False)
    gst_verified = models.BooleanField(default=False, help_text="Enable only after verifying this product's HSN and rate against current GST rules.")
    tax_source_reference = models.URLField(max_length=1000, blank=True, help_text="Official GST notification or CBIC rate reference used to verify this classification.")
    place_of_supply_rule = models.CharField(max_length=24, choices=PLACE_OF_SUPPLY_RULES, default="delivery_state")
    tax_treatment = models.CharField(max_length=20, choices=TREATMENT_CHOICES, default="taxable")
    product_type = models.CharField(max_length=120, blank=True)
    package_size = models.CharField(max_length=80, blank=True)
    stock = models.PositiveIntegerField(default=0)
    stock_unit = models.CharField(max_length=32, default="units")
    low_stock_threshold = models.PositiveIntegerField(default=5)
    stock_configured = models.BooleanField(default=False, help_text="Enable after entering the real available stock and stock unit.")
    is_active = models.BooleanField(default=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=("source", "product_key"), name="unique_gst_catalog_product")]

    @property
    def stock_status(self):
        if not self.stock_configured:
            return "Not configured"
        if self.stock <= 0:
            return "Out of stock"
        return "Low stock" if self.stock <= self.low_stock_threshold else "In stock"

    def __str__(self):
        return f"{self.source}: {self.name}"
