from django.contrib import admin

# Register your models here.
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "product_type", "package_size", "stock", "stock_unit", "stock_status", "low_stock_threshold", "price")
    list_filter = ("category",)
    search_fields = ("name", "brand", "product_type", "package_size")
