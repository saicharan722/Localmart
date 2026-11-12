from django.urls import path
from . import views

urlpatterns = [
    path("dashboard/", views.merchant_dashboard, name="merchant_dashboard"),
    path("logout/", views.merchant_logout, name="merchant_logout"),
    path("api/products/", views.merchant_products_api, name="merchant_products_api"),
    path("api/products/<int:product_id>/", views.product_api, name="merchant_product_api"),
    path("api/orders/<int:order_id>/status/", views.order_status_api, name="merchant_order_status_api"),
    path("api/analytics/", views.analytics_api, name="merchant_analytics_api"),
    path("api/notifications/", views.notifications_api, name="merchant_notifications_api"),
    path("api/coupons/", views.coupons_api, name="merchant_coupons_api"),
    path("api/payouts/", views.payouts_api, name="merchant_payouts_api"),
    path("api/reviews/", views.reviews_api, name="merchant_reviews_api"),
    path("api/support/", views.support_api, name="merchant_support_api"),
    path("api/settings/", views.merchant_settings_api, name="merchant_settings_api"),
    path("api/dashboard-coupons/", views.merchant_dashboard_coupons_api, name="merchant_dashboard_coupons_api"),
    path("api/orders/export/", views.export_orders_csv, name="merchant_export_orders"),
    path(
        "login/",
        views.merchant_login,
        name="merchant_login"
    ),
]
