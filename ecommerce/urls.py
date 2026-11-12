from django.contrib import admin
from django.urls import path, re_path
from . import views
from django.urls import include, path
from wishlist import views as wishlist_views
from merchants import views as merchant_api_views
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import include


urlpatterns = [
    path("", include("tracking.urls")),

    # =========================================================
    # ADMIN
    # =========================================================

    path(
        "admin/",
        admin.site.urls
    ),


    # =========================================================
    # HOME / USER PAGES
    # =========================================================

    path(
        "",
        views.home,
        name="index"
    ),

    path(
        "login/",
        views.login,
        name="login"
    ),

    path("logout/", views.logout, name="logout"),

    path(
        "signup/",
        views.signup,
        name="signup"
    ),

    path(
        "forgot-password/",
        views.forgot_password,
        name="forgot_password"
    ),

    path(
        "reset-password/<uidb64>/<token>/",
        views.user_reset_password,
        name="user_reset_password",
    ),

    path("store/<slug:slug>/", views.merchant_store, name="merchant_store"),
    path("store/<slug:slug>/cart/", views.merchant_store_cart, name="merchant_store_cart"),
    path("store/<slug:slug>/cart/add/<int:product_id>/", views.merchant_store_cart_add, name="merchant_store_cart_add"),
    path("store/<slug:slug>/wishlist/toggle/<int:product_id>/", views.merchant_store_wishlist_toggle, name="merchant_store_wishlist_toggle"),


    # =========================================================
    # MAIN CATEGORY PAGES
    # =========================================================

    path(
        "food/",
        views.food,
        name="food"
    ),

    path(
        "grocery/",
        views.grocery_home,
        name="grocery"
    ),

    
    path('fashion/', views.fashion, name='fashion'),

    path(
        "fashion/cart/add/<str:product_id>/",
        views.fashion_add_to_cart,
        name="fashion_add_to_cart"
    ),

    path("fashion/cart/", views.shoppingcart, name="fashion_cart"),
    path("fashion/shopping/api/", views.fashion_shopping_api, name="fashion_shopping_api"),
    path("fashion/wishlist/", views.wishlist, name="fashion_wishlist"),

    path(
        "fashion/wishlist/toggle/<str:product_id>/",
        views.fashion_toggle_wishlist,
        name="fashion_toggle_wishlist"
    ),

    re_path(
        r"^fashion/cart/(?P<product_id>[^/]+)/(?P<change>-?\d+)/$",
        views.fashion_cart_action,
        name="fashion_cart_action"
    ),

# Fashion Categories
    path(
        'fashion/women/',
        views.fashion_women,
        name='fashion_women'
    ),

    path(
        'fashion/men/',
        views.fashion_men,
        name='fashion_men'
    ),

    path(
        'fashion/kids/',
        views.fashion_kids,
        name='fashion_kids'
    ),


path(
        'fashion/watches/',
        views.fashion_watches,
        name='fashion_watches'
    ),

    path(
        'fashion/footwear/',
        views.fashion_footwear,
        name='fashion_footwear'
    ),

    path(
        'fashion/eyewear/',
        views.fashion_eyewear,
        name='fashion_eyewear'
    ),



    path(
        "stationery/",
        views.stationery,
        name="stationery"
    ),



path(
        "electronics/",
        include("electronics.urls")
    ),


path(
    "electronics/wishlist/",
    wishlist_views.wishlist,
    name="electronics_wishlist",
),


path(
    "electronics/cart/",
    views.electronics_cart,
    name="electronics_cart",
),


path(
    "product/<int:product_id>/",
    views.product_detail,
    name="product_detail",
),


path(
    "cart/add/<int:product_id>/",
    views.add_to_cart,
    name="add_to_cart",
),


    path(
        "home-appliances/",
        views.home_appliances,
        name="home_appliances"
    ),

    path(
        "home-appliances/cart/",
        views.home_appliances_cart,
        name="home_appliances_cart"
    ),

    path(
        "home-appliances/cart/add/<int:product_id>/",
        views.home_appliances_cart_add,
        name="home_appliances_cart_add"
    ),

    path(
        "home-appliances/cart/update/<int:product_id>/",
        views.home_appliances_cart_update,
        name="home_appliances_cart_update"
    ),

    path(
        "home-appliances/wishlist/",
        views.home_appliances_wishlist,
        name="home_appliances_wishlist"
    ),

    path(
        "home-appliances/wishlist/toggle/<int:product_id>/",
        views.home_appliances_wishlist_toggle,
        name="home_appliances_wishlist_toggle"
    ),

path(
        "shoppingwishlist/",
        views.shoppingwishlist,
        name="shoppingwishlist"
    ),

path(
    "wishlist/",
    include("wishlist.urls")
),




    # =====================================================
    # SHOPPING CART
    # =====================================================

    path(
        "shoppingcart/",
        views.shoppingcart,
        name="shoppingcart"
    ),


    # =========================================================
    # FOOD / GENERAL SHOPPING
    # =========================================================

    path(
        "wishlist/",
        views.shoppingwishlist,
        name="wishlist"
    ),

    # Food Cart
    path(
        "cart/item/",
        views.cart_item_action,
        name="cart_item_action"
    ),

    path(
        "cart/",
        views.cart,
        name="cart"
    ),

    # Food My Orders
    path(
        "my-orders/",
        views.orders,
        name="my_orders"
    ),

    path(
        "shopping-my-orders/",
        views.shopping_my_orders,
        name="shopping_my_orders"
    ),

    path(
        "orders/<int:order_id>/download/",
        views.download_order_pdf,
        name="download_order_pdf"
    ),
    path("orders/<int:order_id>/cancel/", views.request_order_cancellation, name="request_order_cancellation"),
    path("orders/<int:order_id>/items/<int:item_id>/return/", views.request_order_return, name="request_order_return"),
    path("orders/<int:order_id>/items/<int:item_id>/replace/", views.request_order_replacement, name="request_order_replacement"),
    path("admin-api/order-requests/<str:request_type>/<int:request_id>/", views.admin_order_request_action, name="admin_order_request_action"),
    path("api/razorpay/refunds/webhook/", views.razorpay_refund_webhook, name="razorpay_refund_webhook"),


    # =========================================================
    # GROCERY CART
    # =========================================================

    path(
        "grocery/cart/",
        views.grocery_cart,
        name="grocery_cart"
    ),

    # Grocery Checkout
    path(
        "grocery/checkout/",
        views.grocery_checkout,
        name="grocery_checkout"
    ),

    # Grocery My Orders
    path(
        "grocery/orders/",
        views.grocery_orders,
        name="grocery_orders"
    ),


    # =========================================================
    # MERCHANT
    # =========================================================

    path(
        "merchant/login/",
        views.merchant_login,
        name="merchant_login"
    ),

    path(
        "merchant/forgot-password/",
        merchant_api_views.merchant_forgot_password,
        name="merchant_forgot_password",
    ),
    path(
        "merchant/reset-password/<uidb64>/<token>/",
        merchant_api_views.merchant_reset_password,
        name="merchant_reset_password",
    ),

    path(
        "merchant/register/",
        views.merchant_register,
        name="merchant_register"
    ),

    path(
        "merchant/dashboard/",
        views.merchant_dashboard,
        name="merchant_dashboard"
    ),

    path(
        "merchant/logout/",
        views.merchant_logout,
        name="merchant_logout"
    ),


path(
    "merchant/api/products/",
    merchant_api_views.merchant_products_api,
    name="merchant_products_api"
),

path(
    "merchant/api/products/<int:product_id>/",
    merchant_api_views.product_api,
    name="merchant_product_api"
),


path("merchant/api/orders/<int:order_id>/status/", 
    merchant_api_views.order_status_api,
     name="merchant_order_status_api"),


     
    path("merchant/api/analytics/", merchant_api_views.analytics_api, name="merchant_analytics_api"),
    path("merchant/api/notifications/", merchant_api_views.notifications_api, name="merchant_notifications_api"),
    path("merchant/api/coupons/", merchant_api_views.coupons_api, name="merchant_coupons_api"),
    path("merchant/api/payouts/", merchant_api_views.payouts_api, name="merchant_payouts_api"),
    path("merchant/api/reviews/", merchant_api_views.reviews_api, name="merchant_reviews_api"),
    path("merchant/api/support/", merchant_api_views.support_api, name="merchant_support_api"),
    path("merchant/api/settings/", merchant_api_views.merchant_settings_api, name="merchant_settings_api"),
    path("merchant/api/location-preview/", merchant_api_views.merchant_location_preview_api, name="merchant_location_preview_api"),
    path("merchant/api/dashboard-coupons/", merchant_api_views.merchant_dashboard_coupons_api, name="merchant_dashboard_coupons_api"),
    path("merchant/export/orders.csv", merchant_api_views.export_orders_csv, name="merchant_orders_export"),


    # =========================================================
    # ADMIN LOGIN
    # =========================================================

    path(
        "admin-login/",
        views.admin_login,
        name="admin_login"
    ),

    path(
        "admin-forgot-password/",
        views.admin_forgot_password,
        name="admin_forgot_password"
    ),

    path(
        "admin-reset-password/<uidb64>/<token>/",
        views.admin_reset_password,
        name="admin_reset_password",
    ),

    path(
        "admin-dashboard/",
        views.admin_dashboard,
        name="admin_dashboard"
    ),

    path("admin-api/profile/", views.admin_profile_update, name="admin_profile_update"),

    path("admin-logout/", views.admin_logout, name="admin_logout"),
    path("admin-export-report/", views.admin_export_report, name="admin_export_report"),
    path("admin-api/merchants/<int:merchant_id>/approve/", views.admin_approve_merchant, name="admin_approve_merchant"),
    path("admin-api/merchants/<int:merchant_id>/delete/", views.admin_delete_merchant, name="admin_delete_merchant"),
    path("admin-api/merchant-approvals/", views.admin_merchant_approvals_api, name="admin_merchant_approvals_api"),
    path("admin-api/products/", views.admin_products_api, name="admin_products_api"),
    path("admin-api/products/<int:product_id>/", views.admin_products_api, name="admin_product_api"),
    path("admin-api/merchant-products/", views.admin_merchant_products_api, name="admin_merchant_products_api"),
    path("admin-api/merchant-products/<int:product_id>/", views.admin_merchant_products_api, name="admin_merchant_product_api"),
    path("admin-api/categories/", views.admin_categories_api, name="admin_categories_api"),
    path("admin-api/categories/<int:category_id>/", views.admin_categories_api, name="admin_category_api"),
    path("admin-api/customers/", views.admin_customers_api, name="admin_customers_api"),
    path("admin-api/orders/", views.admin_orders_api, name="admin_orders_api"),
    path("admin-api/coupons/", views.admin_coupons_api, name="admin_coupons_api"),
    path("admin-api/coupons/<int:coupon_id>/", views.admin_coupons_api, name="admin_coupon_api"),
    path("admin-api/checkout-coupons/", views.admin_checkout_coupons_api, name="admin_checkout_coupons_api"),
    path("admin-api/reviews/", views.admin_reviews_api, name="admin_reviews_api"),
    path("admin-api/reviews/<int:review_id>/", views.admin_reviews_api, name="admin_review_api"),
    path("admin-api/payouts/", views.admin_payouts_api, name="admin_payouts_api"),
    path("admin-api/payouts/<int:payout_id>/", views.admin_payouts_api, name="admin_payout_api"),


    # =========================================================
    # JWT AUTH API
    # =========================================================

    path(
        "api/auth/signup/",
        views.SignupAPIView.as_view(),
        name="api_signup"
    ),

    path(
        "api/auth/login/",
        views.LoginAPIView.as_view(),
        name="api_login"
    ),

    path(
        "api/auth/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),


    # =========================================================
    # GOOGLE LOGIN
    # =========================================================

    path(
        "google/login/",
        views.google_login,
        name="google_login"
    ),

    path(
        "google/callback/",
        views.google_callback,
        name="google_callback"
    ),


    # =========================================================
    # RESTAURANT
    # =========================================================

    path(
        "restaurant/<int:id>/",
        views.restaurant_menu,
        name="restaurant_menu"
    ),


    # =========================================================
    # FOOD CHECKOUT / PAYMENT
    # =========================================================

    path(
        "checkout/",
        views.checkout,
        name="checkout"
    ),

    path("api/checkout-tax-preview/", views.checkout_tax_preview, name="checkout_tax_preview"),
    path("api/cart-tax-preview/", views.cart_tax_preview, name="cart_tax_preview"),
    path("api/checkout/coupon/apply/", views.checkout_coupon_apply, name="checkout_coupon_apply"),
    path("api/checkout/coupon/remove/", views.checkout_coupon_remove, name="checkout_coupon_remove"),
    path("api/coupons/available/", views.available_coupons, name="available_coupons"),

    path(
        "api/create-razorpay-order/",
        views.create_razorpay_order,
        name="create_razorpay_order"
    ),

    path(
        "api/paypal/create-order/",
        views.create_paypal_order,
        name="create_paypal_order"
    ),

    path(
        "api/paypal/capture-order/",
        views.capture_paypal_order,
        name="capture_paypal_order"
    ),

    path(
        "api/verify-payment/",
        views.verify_payment,
        name="verify_payment"
    ),
    path("api/razorpay-payment-failed/", views.record_razorpay_failure, name="razorpay_payment_failed"),

    path(
        "verify-payment/",
        views.verify_payment,
        name="verify_payment_page"
    ),

    path(
        "order-success/",
        views.order_success,
        name="order_success"
    ),


    # =========================================================
    # GROCERY SUB-CATEGORIES
    # =========================================================

    path(
        "fruits-vegetables/",
        views.fruits_vegetables,
        name="fruits_vegetables"
    ),

    path(
        "dairy-bread-eggs/",
        views.dairy_bread_eggs,
        name="dairy_bread_eggs"
    ),

    path(
        "atta-rice-oil-dals/",
        views.atta_rice_oil_dals,
        name="atta_rice_oil_dals"
    ),

    path(
        "meats-fish-eggs/",
        views.meats_fish_eggs,
        name="meats_fish_eggs"
    ),

    path(
        "masala-dry-fruits-more/",
        views.masala_dry_fruits_more,
        name="masala_dry_fruits_more"
    ),

    path(
        "breakfast-sauces/",
        views.breakfast_sauces,
        name="breakfast_sauces"
    ),

    path(
        "tea-coffee/",
        views.tea_coffee,
        name="tea_coffee"
    ),


    # =========================================================
    # ICE CREAMS
    # =========================================================

    path(
        "ice-creams/",
        views.ice_cream_tubs,
        name="ice_creams"
    ),

    path(
        "ice-cream-tubs/",
        views.ice_cream_tubs,
        name="ice_cream_tubs"
    ),


    # =========================================================
    # OTHER GROCERY CATEGORIES
    # =========================================================

    path(
        "frozen-food/",
        views.frozen_food,
        name="frozen_food"
    ),

    path(
        "sweet-cravings/",
        views.sweet_cravings,
        name="sweet_cravings"
    ),

    path(
        "cold-drinks/",
        views.cold_drinks,
        name="cold_drinks"
    ),

    path(
        "munchies/",
        views.munchies,
        name="munchies"
    ),

    path(
        "biscuits/",
        views.biscuits,
        name="biscuits"
    ),



path(
    "grocery/wishlist/",
    views.grocery_wishlist,
    name="grocery_wishlist"
),


# Grocery Cart / Checkout / Orders
path("grocery/cart/", views.grocery_cart, name="grocery_cart"),
path("grocery/checkout/", views.grocery_checkout, name="grocery_checkout"),
path("grocery/orders/", views.grocery_orders, name="grocery_orders"),








]


