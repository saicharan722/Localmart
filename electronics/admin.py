from django.contrib import admin

# Register your models here.
from .models import ElectronicsProduct


@admin.register(ElectronicsProduct)
class ElectronicsProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "product_type", "package_size", "stock", "stock_unit", "stock_status", "low_stock_threshold", "price", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("name", "brand", "product_type", "package_size")
