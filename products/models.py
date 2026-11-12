from decimal import Decimal

from django.db import models


# =========================================================
# CATEGORY MODEL
# =========================================================

class Category(models.Model):

    name = models.CharField(
        max_length=150,
        unique=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

# =========================================================
# PRODUCT MODEL
# =========================================================

class Product(models.Model):
    GST_RATES = [(value, f"{value}%") for value in (0, 5, 12, 18, 28)]
    TAX_TREATMENTS = [(key, key.replace("_", " ").title()) for key in
                     ("taxable", "exempt", "zero_rated", "nil_rated")]
    PLACE_OF_SUPPLY_RULES = [("delivery_state", "Delivery state"), ("supplier_state", "Supplier GST registration state")]

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )

    name = models.CharField(
        max_length=255
    )
    hsn_code = models.CharField(max_length=16, blank=True)
    gst_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tax_treatment = models.CharField(max_length=20, choices=TAX_TREATMENTS, default="taxable")
    tax_classification = models.CharField(max_length=120, blank=True)
    tax_effective_from = models.DateField(null=True, blank=True)
    price_includes_gst = models.BooleanField(default=False)
    gst_verified = models.BooleanField(default=False, help_text="Enable only after verifying this product's HSN and rate against current GST rules.")
    tax_source_reference = models.URLField(max_length=1000, blank=True, help_text="Official GST notification or CBIC rate reference used to verify this classification.")
    place_of_supply_rule = models.CharField(max_length=24, choices=PLACE_OF_SUPPLY_RULES, default="delivery_state")

    brand = models.CharField(
        max_length=150,
        blank=True,
        default=""
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        default=0
    )

    discount = models.PositiveIntegerField(
        default=0
    )

    stock = models.PositiveIntegerField(
        default=0
    )
    stock_unit = models.CharField(max_length=32, default="units")
    low_stock_threshold = models.PositiveIntegerField(default=5)
    product_type = models.CharField(max_length=120, blank=True)
    package_size = models.CharField(max_length=80, blank=True)

    image = models.URLField(
        max_length=1000,
        blank=True,
        default=""
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name

    @property
    def stock_status(self):
        if self.stock <= 0:
            return "Out of stock"
        return "Low stock" if self.stock <= self.low_stock_threshold else "In stock"

    @property
    def discounted_price(self):
        return (self.price * (100 - self.discount) / 100).quantize(Decimal("0.01"))
