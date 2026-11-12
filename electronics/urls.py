from django.urls import path
from . import views

urlpatterns = [

    path(
        "",
        views.electronics_home,
        name="electronics"
    ),

    path(
        "home/",
        views.electronics_home,
        name="electronics_home"
    ),

    path(
        "product/<slug:slug>/",
        views.electronics_product_detail,
        name="electronics_product_detail"
    ),

    path(
        "cart/",
        views.electronics_cart,
        name="electronics_cart"
    ),

    path(
        "cart/add/<int:product_id>/",
        views.electronics_cart_add,
        name="electronics_cart_add"
    ),

    path(
        "cart/update/<int:product_id>/",
        views.electronics_cart_update,
        name="electronics_cart_update"
    ),

    path(
        "wishlist/",
        views.electronics_wishlist,
        name="electronics_wishlist"
    ),

    path(
        "wishlist/toggle/<int:product_id>/",
        views.electronics_wishlist_toggle,
        name="electronics_wishlist_toggle"
    ),

]