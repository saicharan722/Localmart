from decimal import Decimal, ROUND_HALF_UP

from django.db import migrations, models


def backfill_completed_delivery_earnings(apps, schema_editor):
    TrackingSession = apps.get_model("tracking", "TrackingSession")
    OrderDelivery = apps.get_model("tracking", "OrderDelivery")
    rate = Decimal("10.00")
    for tracking in TrackingSession.objects.filter(status="delivered").select_related("order").iterator():
        total = Decimal(str(tracking.order.total_amount or "0"))
        earned = (total * rate / Decimal("100")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        record, created = OrderDelivery.objects.get_or_create(
            tracking_id=tracking.pk,
            defaults={
                "delivery_partner_id": tracking.partner_id,
                "assigned_at": tracking.assigned_at,
                "delivered_at": tracking.updated_at,
                "status": "delivered",
                "earning_amount": earned,
            },
        )
        if not created and record.earning_amount == 0:
            record.earning_amount = earned
            record.delivery_partner_id = record.delivery_partner_id or tracking.partner_id
            record.delivered_at = record.delivered_at or tracking.updated_at
            record.status = "delivered"
            record.save(update_fields=["earning_amount", "delivery_partner", "delivered_at", "status"])


class Migration(migrations.Migration):
    dependencies = [
        ("tracking", "0009_deliverypartner_is_active_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="orderdelivery",
            name="earning_amount",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.RunPython(backfill_completed_delivery_earnings, migrations.RunPython.noop),
    ]
