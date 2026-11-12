from django.db import models
from django.utils.text import slugify


class ElectronicsCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    image = models.URLField(max_length=1000, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Electronics Categories"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class ElectronicsProduct(models.Model):
    GST_RATES = [(value, f"{value}%") for value in (0, 5, 12, 18, 28)]
    TAX_TREATMENTS = [(key, key.replace("_", " ").title()) for key in
                     ("taxable", "exempt", "zero_rated", "nil_rated")]
    PLACE_OF_SUPPLY_RULES = [("delivery_state", "Delivery state"), ("supplier_state", "Supplier GST registration state")]
    name = models.CharField(max_length=200)
    hsn_code = models.CharField(max_length=16, blank=True)
    gst_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tax_treatment = models.CharField(max_length=20, choices=TAX_TREATMENTS, default="taxable")
    tax_classification = models.CharField(max_length=120, blank=True)
    tax_effective_from = models.DateField(null=True, blank=True)
    price_includes_gst = models.BooleanField(default=False)
    gst_verified = models.BooleanField(default=False, help_text="Enable only after verifying this product's HSN and rate against current GST rules.")
    tax_source_reference = models.URLField(max_length=1000, blank=True, help_text="Official GST notification or CBIC rate reference used to verify this classification.")
    place_of_supply_rule = models.CharField(max_length=24, choices=PLACE_OF_SUPPLY_RULES, default="delivery_state")
    slug = models.SlugField(max_length=220, unique=True, blank=True)

    category = models.ForeignKey(
        ElectronicsCategory,
        on_delete=models.CASCADE,
        related_name="products"
    )

    brand = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    image = models.URLField(max_length=1000, blank=True, null=True)

    price = models.DecimalField(max_digits=12, decimal_places=2)

    discount_percentage = models.PositiveIntegerField(default=0)

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        default=0
    )

    reviews = models.PositiveIntegerField(default=0)
    stock = models.PositiveIntegerField(default=0)
    stock_unit = models.CharField(max_length=32, default="units")
    low_stock_threshold = models.PositiveIntegerField(default=5)
    product_type = models.CharField(max_length=120, blank=True)
    package_size = models.CharField(max_length=80, blank=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



    
    class Meta:
        ordering = ["-created_at"]

    @property
    def discounted_price(self):
        discount = (
            self.price *
            self.discount_percentage /
            100
        )

        return self.price - discount

    @property
    def in_stock(self):
        return self.stock > 0

    @property
    def stock_status(self):
        if self.stock <= 0:
            return "Out of stock"
        return "Low stock" if self.stock <= self.low_stock_threshold else "In stock"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
