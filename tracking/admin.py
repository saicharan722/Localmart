from django.contrib import admin
from django.utils import timezone
from .models import DeliveryLocation, DeliveryNotification, DeliveryPartner, OrderDelivery, TrackingSession
from .services import create_partner_notification


@admin.register(DeliveryPartner)
class DeliveryPartnerAdmin(admin.ModelAdmin):
    list_display = ("user", "phone", "vehicle", "vehicle_number", "is_approved", "is_active", "is_online", "is_available", "last_location_update")
    list_filter = ("is_approved", "is_active", "is_online", "is_available")
    search_fields = ("user__username", "user__email", "user__first_name", "phone", "license_number", "vehicle_number")
    actions = ("approve_partners", "deactivate_partners")

    @admin.action(description="Approve selected partner applications")
    def approve_partners(self, request, queryset):
        queryset.update(is_approved=True, is_active=True)

    @admin.action(description="Deactivate selected delivery partners")
    def deactivate_partners(self, request, queryset):
        queryset.update(is_active=False, is_online=False, is_available=False)

    def has_delete_permission(self, request, obj=None):
        # Deactivation preserves links from completed and in-flight deliveries.
        return False


@admin.register(TrackingSession)
class TrackingSessionAdmin(admin.ModelAdmin):
    list_display = ("order", "customer_email", "merchant", "status", "partner", "accepted_at", "updated_at")
    list_filter = ("status",)
    search_fields = ("customer_email", "order__id")

    def save_model(self, request, obj, form, change):
        previous = None
        if change:
            previous = TrackingSession.objects.filter(pk=obj.pk).values("partner_id", "status").first()
        if previous and previous["partner_id"] != obj.partner_id:
            if obj.partner_id:
                obj.assigned_at = timezone.now()
                obj.accepted_at = None
                if obj.status not in {"delivered", "cancelled"}:
                    obj.status = "partner_assigned"
            elif obj.status == "partner_assigned":
                obj.assigned_at = None
                obj.accepted_at = None
                obj.status = "preparing"
        super().save_model(request, obj, form, change)
        if not previous:
            return
        if previous["partner_id"] != obj.partner_id:
            if previous["partner_id"]:
                old_partner = DeliveryPartner.objects.filter(pk=previous["partner_id"]).first()
                if old_partner:
                    create_partner_notification(obj, old_partner, "reassigned")
            if obj.partner_id:
                create_partner_notification(obj, obj.partner, "assigned")
        if previous["status"] != "cancelled" and obj.status == "cancelled" and obj.partner_id:
            create_partner_notification(obj, obj.partner, "cancelled")


@admin.register(DeliveryNotification)
class DeliveryNotificationAdmin(admin.ModelAdmin):
    list_display = ("title", "delivery_partner", "order", "notification_type", "is_read", "created_at")
    list_filter = ("notification_type", "is_read", "created_at")
    search_fields = ("delivery_partner__user__username", "order__id", "title")
    readonly_fields = ("delivery_partner", "order", "tracking", "notification_type", "title", "message", "event_key", "created_at")

    def has_add_permission(self, request):
        return False


@admin.register(OrderDelivery)
class OrderDeliveryAdmin(admin.ModelAdmin):
    list_display = ("tracking", "delivery_partner", "assigned_at", "picked_up_at", "delivered_at", "status")
    list_filter = ("status",)


@admin.register(DeliveryLocation)
class DeliveryLocationAdmin(admin.ModelAdmin):
    list_display = ("delivery_partner", "delivery", "latitude", "longitude", "accuracy", "speed", "device_timestamp", "timestamp")
    readonly_fields = ("delivery_partner", "delivery", "latitude", "longitude", "accuracy", "speed", "device_timestamp", "timestamp")

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
