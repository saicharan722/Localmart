from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0001_initial"),
        ("tracking", "0010_orderdelivery_earning_amount"),
    ]

    operations = [
        migrations.CreateModel(
            name="DeliveryNotification",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("notification_type", models.CharField(choices=[("assigned", "Order assigned"), ("reassigned", "Order reassigned"), ("cancelled", "Order cancelled")], max_length=16)),
                ("title", models.CharField(max_length=160)),
                ("message", models.TextField()),
                ("event_key", models.CharField(max_length=160, unique=True)),
                ("is_read", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("delivery_partner", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="notifications", to="tracking.deliverypartner")),
                ("order", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="delivery_notifications", to="store.order")),
                ("tracking", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="notifications", to="tracking.trackingsession")),
            ],
            options={
                "ordering": ["-created_at", "-pk"],
                "indexes": [models.Index(fields=["delivery_partner", "is_read", "-created_at"], name="tracking_de_deliver_a97c73_idx")],
            },
        ),
    ]