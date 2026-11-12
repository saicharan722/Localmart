from django.contrib import admin
from .models import (
	MerchantActivity,
	MerchantCategory,
	MerchantCoupon,
	MerchantNotification,
	MerchantOrder,
	MerchantOrderItem,
	MerchantPayout,
	MerchantProduct,
	MerchantProductVariant,
	MerchantProfile,
	MerchantReview,
	MerchantSupportTicket,
)


@admin.register(MerchantProduct)
class MerchantProductAdmin(admin.ModelAdmin):
	list_display = ("name", "sku", "merchant", "product_type", "package_size", "stock", "stock_unit", "stock_status", "low_stock_threshold", "is_active")
	list_filter = ("merchant", "is_active")
	search_fields = ("name", "sku", "product_type", "package_size", "merchant__shop_name")


admin.site.register([
	MerchantProfile,
	MerchantCategory,
	MerchantProductVariant,
	MerchantOrder,
	MerchantOrderItem,
	MerchantCoupon,
	MerchantPayout,
	MerchantReview,
	MerchantSupportTicket,
	MerchantNotification,
	MerchantActivity,
])
