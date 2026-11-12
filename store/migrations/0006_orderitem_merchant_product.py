from django.db import migrations, models
import django.db.models.deletion


def add_merchant_product_column_if_missing(apps, schema_editor):
    """Handle databases where this column was created before migration 0006 ran."""
    OrderItem = apps.get_model("store", "OrderItem")
    table_name = OrderItem._meta.db_table
    column_name = "merchant_product_id"

    with schema_editor.connection.cursor() as cursor:
        columns = {
            column.name
            for column in schema_editor.connection.introspection.get_table_description(
                cursor, table_name
            )
        }

    if column_name not in columns:
        field = models.ForeignKey(
            blank=True,
            null=True,
            on_delete=django.db.models.deletion.SET_NULL,
            related_name="order_items",
            to="merchants.merchantproduct",
        )
        OrderItem.add_to_class("merchant_product", field)
        schema_editor.add_field(OrderItem, field)


def leave_merchant_product_column_in_place(apps, schema_editor):
    # The column may have existed before this migration, so it isn't safe to
    # remove it when rolling the migration back.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("merchants", "0006_alter_merchantproduct_image_and_more"),
        ("store", "0005_alter_orderitem_image"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[
                migrations.RunPython(
                    add_merchant_product_column_if_missing,
                    leave_merchant_product_column_in_place,
                ),
            ],
            state_operations=[
                migrations.AddField(
                    model_name="orderitem",
                    name="merchant_product",
                    field=models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="order_items",
                        to="merchants.merchantproduct",
                    ),
                ),
            ],
        ),
    ]
