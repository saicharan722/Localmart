from django.db import migrations, models
from django.utils.text import slugify


def populate_shop_slugs(apps, schema_editor):
    MerchantProfile = apps.get_model("merchants", "MerchantProfile")
    used = set()
    for profile in MerchantProfile.objects.all().order_by("pk"):
        base = slugify(profile.shop_name)[:200] or f"store-{profile.pk}"
        candidate = base
        suffix = 2
        while candidate in used:
            candidate = f"{base[:210]}-{suffix}"
            suffix += 1
        used.add(candidate)
        profile.slug = candidate
        profile.save(update_fields=["slug"])


class Migration(migrations.Migration):
    dependencies = [
        ("merchants", "0004_merchantprofile_location_confirmed"),
    ]

    operations = [
        migrations.AddField(
            model_name="merchantprofile",
            name="slug",
            # Add it without an index first. The following unique AlterField
            # creates the final B-tree and PostgreSQL LIKE indexes; creating
            # an index here makes PostgreSQL attempt the same LIKE index twice.
            field=models.SlugField(blank=True, db_index=False, max_length=220, null=True),
        ),
        migrations.RunPython(populate_shop_slugs, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="merchantprofile",
            name="slug",
            field=models.SlugField(blank=True, max_length=220, unique=True),
        ),
    ]
