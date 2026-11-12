import json
from decimal import Decimal, InvalidOperation

from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render

from .models import ElectronicsCategory, ElectronicsProduct


# =========================================================
# HELPERS
# =========================================================

def get_electronics_cart(request):
    return request.session.get("electronics_cart", {})


def save_electronics_cart(request, cart):
    request.session["electronics_cart"] = cart
    request.session.modified = True


def get_electronics_wishlist(request):
    return request.session.get("electronics_wishlist", [])


def save_electronics_wishlist(request, wishlist):
    request.session["electronics_wishlist"] = wishlist
    request.session.modified = True


# =========================================================
# ELECTRONICS HOME
# =========================================================

def electronics_home(request):

    products = ElectronicsProduct.objects.filter(
        is_active=True
    ).select_related("category")

    categories = ElectronicsCategory.objects.all()

    brands = (
        ElectronicsProduct.objects
        .filter(is_active=True)
        .values_list("brand", flat=True)
        .distinct()
        .order_by("brand")
    )

    search = request.GET.get("search", "").strip()
    category = request.GET.get("category", "").strip()
    brand = request.GET.get("brand", "").strip()
    price = request.GET.get("price", "").strip()
    min_price = request.GET.get("min_price", "").strip()
    max_price = request.GET.get("max_price", "").strip()
    rating = request.GET.get("rating", "").strip()
    availability = request.GET.get("availability", "").strip()
    discount = request.GET.get("discount", "").strip()
    sort = request.GET.get("sort", "popular").strip()

    price_error = ""

    # Search
    if search:
        products = products.filter(
            name__icontains=search
        ) | products.filter(
            brand__icontains=search
        ) | products.filter(
            description__icontains=search
        )

        products = products.distinct()

    # Category
    if category:
        products = products.filter(
            category__slug=category
        )

    # Brand
    if brand:
        products = products.filter(
            brand__iexact=brand
        )

    # Price presets
    if price == "under-5000":
        products = products.filter(
            price__lte=5000
        )

    elif price == "5000-10000":
        products = products.filter(
            price__gte=5000,
            price__lte=10000
        )

    elif price == "10000-25000":
        products = products.filter(
            price__gte=10000,
            price__lte=25000
        )

    elif price == "25000-50000":
        products = products.filter(
            price__gte=25000,
            price__lte=50000
        )

    elif price == "above-50000":
        products = products.filter(
            price__gte=50000
        )

    # Custom minimum price
    if min_price:
        try:
            products = products.filter(
                price__gte=Decimal(min_price)
            )
        except InvalidOperation:
            price_error = "Please enter a valid minimum price."

    # Custom maximum price
    if max_price:
        try:
            products = products.filter(
                price__lte=Decimal(max_price)
            )
        except InvalidOperation:
            price_error = "Please enter a valid maximum price."

    # Rating
    if rating:
        try:
            products = products.filter(
                rating__gte=Decimal(rating)
            )
        except InvalidOperation:
            pass

    # Availability
    if availability == "in-stock":
        products = products.filter(stock__gt=0)

    elif availability == "out-of-stock":
        products = products.filter(stock=0)

    # Discount
    if discount:
        try:
            products = products.filter(
                discount_percentage__gte=int(discount)
            )
        except ValueError:
            pass

    # Sorting
    if sort == "price-low":
        products = products.order_by("price")

    elif sort == "price-high":
        products = products.order_by("-price")

    elif sort == "rating":
        products = products.order_by("-rating")

    elif sort == "discount":
        products = products.order_by("-discount_percentage")

    elif sort == "newest":
        products = products.order_by("-created_at")

    else:
        products = products.order_by("-rating", "-reviews")

    # Count before pagination
    product_count = products.count()

    # Pagination
    paginator = Paginator(products, 20)

    page_number = request.GET.get("page")

    page_obj = paginator.get_page(page_number)

    # Cart
    cart = get_electronics_cart(request)

    cart_count = sum(
        int(quantity)
        for quantity in cart.values()
    )

    # Wishlist
    wishlist = get_electronics_wishlist(request)

    wishlist_ids = set()

    for product_id in wishlist:
        try:
            wishlist_ids.add(int(product_id))
        except (ValueError, TypeError):
            pass

    wishlist_count = len(wishlist_ids)

    # Preserve filters for pagination
    query_params = request.GET.copy()

    if "page" in query_params:
        query_params.pop("page")

    filter_query = query_params.urlencode()

    context = {
        "products": page_obj.object_list,
        "page_obj": page_obj,

        "categories": categories,
        "brands": brands,

        "product_count": product_count,

        "cart_count": cart_count,
        "wishlist_count": wishlist_count,
        "wishlist_ids": wishlist_ids,

        "search": search,
        "selected_category": category,
        "selected_brand": brand,
        "selected_price": price,
        "selected_min_price": min_price,
        "selected_max_price": max_price,
        "selected_rating": rating,
        "selected_availability": availability,
        "selected_discount": discount,
        "selected_sort": sort,

        "price_error": price_error,

        "filter_query": filter_query,
    }

    return render(
        request,
        "electronics/electronics.html",
        context
    )


# =========================================================
# PRODUCT DETAIL
# =========================================================

def electronics_product_detail(request, slug):

    product = get_object_or_404(
        ElectronicsProduct,
        slug=slug,
        is_active=True
    )

    cart = get_electronics_cart(request)

    cart_count = sum(
        int(quantity)
        for quantity in cart.values()
    )

    wishlist = get_electronics_wishlist(request)

    wishlist_ids = set()

    for product_id in wishlist:
        try:
            wishlist_ids.add(int(product_id))
        except (ValueError, TypeError):
            pass

    context = {
        "product": product,
        "cart_count": cart_count,
        "wishlist_count": len(wishlist_ids),
        "wishlist_ids": wishlist_ids,
    }

    return render(
        request,
        "electronics/electronics-product-detail.html",
        context
    )


# =========================================================
# CART PAGE
# =========================================================

def electronics_cart(request):
    return redirect("cart")


# =========================================================
# ADD TO CART
# =========================================================

def electronics_cart_add(request, product_id):

    if request.method != "POST":
        return JsonResponse(
            {
                "success": False,
                "message": "POST request required."
            },
            status=405
        )

    product = get_object_or_404(
        ElectronicsProduct,
        id=product_id,
        is_active=True
    )

    if product.stock <= 0:
        return JsonResponse({
            "success": False,
            "message": "Product is out of stock."
        })

    cart = get_electronics_cart(request)

    key = str(product.id)

    current_quantity = int(
        cart.get(key, 0)
    )

    if current_quantity >= product.stock:
        return JsonResponse({
            "success": False,
            "message": "Maximum available quantity reached.",
            "quantity": current_quantity,
        })

    current_quantity += 1

    cart[key] = current_quantity

    save_electronics_cart(
        request,
        cart
    )

    cart_count = sum(
        int(quantity)
        for quantity in cart.values()
    )

    return JsonResponse({
        "success": True,
        "quantity": current_quantity,
        "cart_count": cart_count,
        "message": f"{product.name} added to cart.",
    })


# =========================================================
# UPDATE CART
# =========================================================

def electronics_cart_update(request, product_id):

    if request.method != "POST":
        return JsonResponse(
            {
                "success": False,
                "message": "POST request required."
            },
            status=405
        )

    product = get_object_or_404(
        ElectronicsProduct,
        id=product_id,
        is_active=True
    )

    cart = get_electronics_cart(request)

    key = str(product.id)

    current_quantity = int(
        cart.get(key, 0)
    )

    try:
        data = json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        data = request.POST

    action = data.get("action")

    if action == "increase":

        if current_quantity >= product.stock:
            return JsonResponse({
                "success": False,
                "quantity": current_quantity,
                "cart_count": sum(
                    int(q)
                    for q in cart.values()
                ),
                "message": "Maximum stock reached."
            })

        current_quantity += 1

    elif action == "decrease":

        current_quantity -= 1

    elif action == "remove":

        cart.pop(key, None)
        current_quantity = 0

    else:

        quantity = data.get("quantity")

        try:
            current_quantity = int(quantity)
        except (TypeError, ValueError):
            return JsonResponse({
                "success": False,
                "message": "Invalid quantity."
            })

    if current_quantity <= 0:

        cart.pop(key, None)

        current_quantity = 0

    else:

        if current_quantity > product.stock:
            current_quantity = product.stock

        cart[key] = current_quantity

    save_electronics_cart(
        request,
        cart
    )

    cart_count = sum(
        int(quantity)
        for quantity in cart.values()
    )

    return JsonResponse({
        "success": True,
        "quantity": current_quantity,
        "cart_count": cart_count,
    })


# =========================================================
# WISHLIST PAGE
# =========================================================

def electronics_wishlist(request):

    wishlist = get_electronics_wishlist(request)

    product_ids = []

    for product_id in wishlist:
        try:
            product_ids.append(int(product_id))
        except (ValueError, TypeError):
            pass

    products = ElectronicsProduct.objects.filter(
        id__in=product_ids,
        is_active=True
    )

    cart = get_electronics_cart(request)

    cart_count = sum(
        int(quantity)
        for quantity in cart.values()
    )

    context = {
        "wishlist_products": products,
        "wishlist_count": len(product_ids),
        "cart_count": cart_count,
    }

    return render(
        request,
        "electronics/electronics-wishlist.html",
        context
    )


# =========================================================
# TOGGLE WISHLIST
# =========================================================

def electronics_wishlist_toggle(
    request,
    product_id
):

    if request.method != "POST":
        return JsonResponse(
            {
                "success": False,
                "message": "POST request required."
            },
            status=405
        )

    product = get_object_or_404(
        ElectronicsProduct,
        id=product_id,
        is_active=True
    )

    wishlist = get_electronics_wishlist(request)

    key = str(product.id)

    if key in wishlist:

        wishlist.remove(key)
        added = False

    else:

        wishlist.append(key)
        added = True

    save_electronics_wishlist(
        request,
        wishlist
    )

    return JsonResponse({
        "success": True,
        "added": added,
        "wishlist_count": len(wishlist),
    })
