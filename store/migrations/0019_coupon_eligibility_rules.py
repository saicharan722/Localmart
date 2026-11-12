from django.db import migrations, models


def seed_demo_coupons(apps, schema_editor):
    Coupon = apps.get_model("store", "Coupon")
    offers = [
        ("WELCOME50", "percentage", "50.00", "100.00", "199.00", [], "Welcome offer: 50% off up to ₹100."),
        ("SAVE100", "fixed", "100.00", None, "499.00", [], "Save ₹100 on orders above ₹499."),
        ("GROCERY10", "percentage", "10.00", "75.00", "299.00", ["grocery"], "Save 10% on grocery orders, up to ₹75."),
        ("FOOD20", "percentage", "20.00", "150.00", "299.00", ["food"], "Save 20% on eligible food orders, up to ₹150."),
        ("ELECTRO500", "fixed", "500.00", None, "5000.00", ["electronics"], "Save ₹500 on eligible electronics orders."),
        ("HOMEAPPLIANCE10", "percentage", "10.00", "1000.00", "5000.00", ["home_appliances"], "Save 10% on home appliances, up to ₹1,000."),
    ]
    for code, kind, value, maximum, minimum, categories, description in offers:
        Coupon.objects.get_or_create(
            code=code,
            defaults={
                "discount_type": kind,
                "discount_value": value,
                "maximum_discount_amount": maximum,
                "minimum_order_amount": minimum,
                "eligible_categories": categories,
                "description": description,
                "terms_and_conditions": description,
                "is_active": True,
            },
        )


class Migration(migrations.Migration):
    dependencies = [("store", "0018_gstcatalogproduct_low_stock_threshold_and_more")]

    operations = [
        migrations.AddField("coupon", "description", models.CharField(blank=True, max_length=240)),
        migrations.AddField("coupon", "terms_and_conditions", models.TextField(blank=True)),
        migrations.AddField("coupon", "applicable_products", models.JSONField(blank=True, default=list, help_text="Optional product references in source:id format, for example grocery:123.")),
        migrations.AddField("coupon", "minimum_eligible_quantity", models.PositiveIntegerField(default=0)),
        migrations.AddField("coupon", "first_order_only", models.BooleanField(default=False)),
        migrations.AddField("coupon", "exclude_discounted_products", models.BooleanField(default=False)),
        migrations.AddField("order", "coupon_eligible_subtotal", models.DecimalField(decimal_places=2, default=0, max_digits=12)),
        migrations.RunPython(seed_demo_coupons, migrations.RunPython.noop),
    ]
