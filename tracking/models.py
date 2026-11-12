from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from merchants.models import MerchantProfile


class DeliveryPartner(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="delivery_profile")
    phone = models.CharField(max_length=30, blank=True)
    photo_url = models.URLField(blank=True)
    vehicle = models.CharField(max_length=80, default="Delivery partner")
    vehicle_number = models.CharField(max_length=32, blank=True)
    license_number = models.CharField(max_length=50, blank=True)
    is_approved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_available = models.BooleanField(default=True)
    is_online = models.BooleanField(default=False)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    last_location_update = models.DateTimeField(null=True, blank=True)

    @property
    def name(self):
        return self.user.get_full_name() or self.user.get_username()

    @property
    def email(self):
        return self.user.email

    @property
    def vehicle_type(self):
        return self.vehicle

    @property
    def profile_image(self):
        return self.photo_url

    @property
    def partner_code(self):
        return f"DP-{self.pk:04d}" if self.pk else "DP-PENDING"

    def __str__(self):
        return self.user.get_full_name() or self.user.get_username()


class TrackingSession(models.Model):
    STATUS_CHOICES = [(value, label) for value, label in (
        ("placed", "Order Placed"), ("confirmed", "Order Confirmed"),
        ("preparing", "Restaurant Preparing"), ("partner_assigned", "Delivery Partner Assigned"), ("partner_at_store", "Partner Reached Restaurant"), ("picked_up", "Picked Up"),
        ("out_for_delivery", "Out for Delivery"), ("arriving_soon", "Arriving Soon"),
        ("delivered", "Delivered"), ("cancelled", "Cancelled"),
    )]
    order = models.OneToOneField("store.Order", on_delete=models.CASCADE, related_name="tracking")
    customer_email = models.EmailField(db_index=True)
    status = models.CharField(max_length=24, choices=STATUS_CHOICES, default="placed")
    partner = models.ForeignKey(DeliveryPartner, null=True, blank=True, on_delete=models.SET_NULL, related_name="deliveries")
    merchant = models.ForeignKey(MerchantProfile, null=True, blank=True, on_delete=models.SET_NULL, related_name="tracked_deliveries")
    assigned_at = models.DateTimeField(null=True, blank=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    rejected_partner_ids = models.JSONField(default=list, blank=True)
    customer_latitude = models.FloatField(null=True, blank=True)
    customer_longitude = models.FloatField(null=True, blank=True)
    customer_address = models.TextField(blank=True)
    customer_current_latitude = models.FloatField(null=True, blank=True)
    customer_current_longitude = models.FloatField(null=True, blank=True)
    customer_current_accuracy = models.FloatField(null=True, blank=True)
    customer_current_updated_at = models.DateTimeField(null=True, blank=True)
    merchant_name = models.CharField(max_length=180, default="LocalMart Store")
    merchant_address = models.TextField(blank=True)
    merchant_latitude = models.FloatField(null=True, blank=True)
    merchant_longitude = models.FloatField(null=True, blank=True)
    partner_latitude = models.FloatField(null=True, blank=True)
    partner_longitude = models.FloatField(null=True, blank=True)
    location_updated_at = models.DateTimeField(null=True, blank=True)
    eta_minutes = models.PositiveSmallIntegerField(null=True, blank=True, default=None)
    remaining_km = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if (self.customer_latitude is None) != (self.customer_longitude is None):
            raise ValidationError("Both customer coordinates must be provided together.")

    def __str__(self):
        return f"Tracking for order #{self.order_id}"


class DeliveryNotification(models.Model):
    TYPE_CHOICES = [
        ("assigned", "Order assigned"),
        ("reassigned", "Order reassigned"),
        ("cancelled", "Order cancelled"),
    ]

    delivery_partner = models.ForeignKey(DeliveryPartner, on_delete=models.CASCADE, related_name="notifications")
    order = models.ForeignKey("store.Order", on_delete=models.CASCADE, related_name="delivery_notifications")
    tracking = models.ForeignKey(TrackingSession, on_delete=models.CASCADE, related_name="notifications")
    notification_type = models.CharField(max_length=16, choices=TYPE_CHOICES)
    title = models.CharField(max_length=160)
    message = models.TextField()
    event_key = models.CharField(max_length=160, unique=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at", "-pk"]
        indexes = [models.Index(fields=["delivery_partner", "is_read", "-created_at"])]

    def __str__(self):
        return f"{self.title} for order #{self.order_id}"


class OrderDelivery(models.Model):
    STATUS_CHOICES = TrackingSession.STATUS_CHOICES
    tracking = models.OneToOneField(TrackingSession, on_delete=models.CASCADE, related_name="delivery_record")
    delivery_partner = models.ForeignKey(DeliveryPartner, null=True, blank=True, on_delete=models.SET_NULL, related_name="delivery_records")
    assigned_at = models.DateTimeField(null=True, blank=True)
    picked_up_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    earning_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=24, choices=STATUS_CHOICES, default="confirmed")


class DeliveryLocation(models.Model):
    delivery_partner = models.ForeignKey(DeliveryPartner, on_delete=models.CASCADE, related_name="location_history")
    delivery = models.ForeignKey(OrderDelivery, null=True, blank=True, on_delete=models.CASCADE, related_name="locations")
    latitude = models.FloatField()
    longitude = models.FloatField()
    accuracy = models.FloatField(null=True, blank=True)
    speed = models.FloatField(null=True, blank=True)
    device_timestamp = models.DateTimeField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-timestamp"]
        indexes = [models.Index(fields=["delivery_partner", "-timestamp"])]


class GeocodeCache(models.Model):
    address_key = models.CharField(max_length=64, unique=True)
    query = models.TextField()
    found = models.BooleanField(default=False)
    formatted_address = models.TextField(blank=True)
    area_name = models.CharField(max_length=240, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.formatted_address or self.query[:80]
