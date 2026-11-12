from django.shortcuts import render,redirect


def wishlist(request):
    return render(request, "wishlist.html")


def toggle_wishlist(request, product_id):
    return redirect("wishlist")

