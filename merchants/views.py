from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings
from django.core.cache import cache
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.shortcuts import render, redirect
from django.db.models import Sum, Count, F
from django.urls import reverse
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils import timezone
from store.models import Order as StoreOrder, OrderItem as StoreOrderItem
from django.views.decorators.http import require_http_methods
from decimal import Decimal, InvalidOperation
from datetime import timedelta
from functools import wraps
import hashlib
import logging
import json
import csv
import math
import re
from django.db import IntegrityError, models
from merchants.models import MerchantProfile

from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import MerchantProfile, MerchantProduct,MerchantCategory,MerchantOrder,MerchantOrderItem,MerchantNotification,MerchantCoupon,MerchantPayout,MerchantReview,MerchantSupportTicket
from .forms import MerchantPasswordResetRequestForm, MerchantSetPasswordForm

logger = logging.getLogger(__name__)


def merchant_api_required(view_func):
    @wraps(view_func)
    def wrapped(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Your merchant session has expired. Please log in again.",
                },
                status=401,
            )
        return view_func(request, *args, **kwargs)

    return wrapped


PASSWORD_RESET_GENERIC_MESSAGE = "If an account exists with that email address, a password reset link has been sent."

SKU_PATTERN = re.compile(r"^[A-Z0-9][A-Z0-9._-]{0,79}$")


def _validated_sku(value):
    """Normalize merchant SKUs and reject values outside the documented format."""
    sku = str(value or "").strip().upper()
    if not SKU_PATTERN.fullmatch(sku):
        return None
    return sku


def _consume_reset_limit(key, limit):
    """Count attempts in a one-hour cache window; cache keys contain no raw email."""
    try:
        if cache.add(key, 1, timeout=3600):
            return True
        count = cache.incr(key)
        return count <= limit
    except Exception:
        # Keep password recovery available if the cache backend is unavailable.
        logger.warning("Password-reset rate-limit cache unavailable")
        return True


def _reset_request_is_allowed(request, email):
    ip = request.META.get("REMOTE_ADDR", "unknown")
    email_hash = hashlib.sha256(email.casefold().encode("utf-8")).hexdigest()
    ip_hash = hashlib.sha256(ip.encode("utf-8")).hexdigest()
    email_allowed = _consume_reset_limit(f"merchant-reset:email:{email_hash}", 3)
    ip_allowed = _consume_reset_limit(f"merchant-reset:ip:{ip_hash}", 10)
    return email_allowed and ip_allowed


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
def merchant_forgot_password(request):
    form = MerchantPasswordResetRequestForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        email = form.cleaned_data["email"].strip()
        if _reset_request_is_allowed(request, email):
            profiles = MerchantProfile.objects.filter(
                owner__email__iexact=email,
                owner__is_active=True,
            ).select_related("owner")
            for profile in profiles:
                user = profile.owner
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                token = default_token_generator.make_token(user)
                reset_path = reverse("merchant_reset_password", kwargs={"uidb64": uidb64, "token": token})
                reset_url = request.build_absolute_uri(reset_path)
                if not settings.DEBUG and reset_url.startswith("http://"):
                    reset_url = "https://" + reset_url[len("http://"):]
                context = {
                    "merchant_name": user.get_short_name() or profile.shop_name,
                    "reset_url": reset_url,
                    "expires_minutes": max(1, settings.PASSWORD_RESET_TIMEOUT // 60),
                }
                text_body = render_to_string("emails/merchant-password-reset.txt", context)
                html_body = render_to_string("emails/merchant-password-reset.html", context)
                message = EmailMultiAlternatives(
                    subject="LocalMart Merchant Password Reset",
                    body=text_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[user.email],
                )
                message.attach_alternative(html_body, "text/html")
                try:
                    message.send(fail_silently=False)
                except Exception:
                    # Keep the response identical for known and unknown emails.
                    logger.exception("Merchant password-reset email could not be sent")
        return render(request, "merchant-password-reset-sent.html", {"message": PASSWORD_RESET_GENERIC_MESSAGE})
    return render(request, "merchant-forgot-password.html", {"form": form})


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
def merchant_reset_password(request, uidb64, token):
    User = get_user_model()
    try:
        user_id = force_str(urlsafe_base64_decode(uidb64))
        user = User._default_manager.get(pk=user_id, is_active=True)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    valid_link = bool(
        user
        and MerchantProfile.objects.filter(owner=user).exists()
        and default_token_generator.check_token(user, token)
    )
    if not valid_link:
        return render(request, "merchant-reset-password.html", {
            "valid_link": False,
            "error_message": "This password reset link is invalid or has expired. Request a new link to continue.",
        }, status=400)

    form = MerchantSetPasswordForm(request.POST or None, user=user)
    if request.method == "POST" and form.is_valid():
        user.set_password(form.cleaned_data["new_password1"])
        user.save(update_fields=["password"])
        return render(request, "merchant-password-reset-success.html")
    return render(request, "merchant-reset-password.html", {"valid_link": True, "form": form})


@login_required(login_url="merchant_login")
@ensure_csrf_cookie
def merchant_dashboard(request):
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        messages.error(request, "Merchant profile not found.")
        return redirect("merchant_login")
    if not merchant.is_approved:
        messages.error(request, "Your shop registration is waiting for admin approval.")
        return redirect("merchant_login")

    orders = MerchantOrder.objects.filter(merchant=merchant)
    # Merchant-store checkout currently records its paid checkout in the shared
    # store.Order table. Include those rows alongside legacy MerchantOrder rows
    # so the owning shop sees every order in one dashboard.
    local_orders = StoreOrder.objects.filter(merchant_profile=merchant)
    products = MerchantProduct.objects.filter(merchant=merchant)
    recent_orders = [{"id": o.id, "kind": "merchant", "number": o.order_number, "customer": o.customer_name,
        "email": o.customer_email,
        "time": timezone.localtime(o.created_at).strftime("%b %d, %Y"),
        "status": o.status.lower().replace(" ", "-"), "total": str(o.total), "sort": o.created_at.timestamp()} for o in orders]
    recent_orders.extend({"id": o.id, "kind": "local", "number": f"LM{o.id:05d}", "customer": o.customer_name,
        "email": o.customer_email,
        "time": timezone.localtime(o.created_at).strftime("%b %d, %Y"),
        "status": o.order_status.lower().replace(" ", "-"), "total": str(o.total_amount), "sort": o.created_at.timestamp()} for o in local_orders)
    recent_orders.sort(key=lambda row: row["sort"], reverse=True)
    dashboard_orders = [{key: value for key, value in row.items() if key != "sort"} for row in recent_orders]
    sales_by_product = {}
    for item in MerchantOrderItem.objects.filter(order__merchant=merchant, order__status__iexact="delivered"):
        row = sales_by_product.setdefault(item.name, {"name": item.name, "sold": 0, "revenue": Decimal("0")})
        row["sold"] += item.quantity
        row["revenue"] += item.price * item.quantity
    for item in StoreOrderItem.objects.filter(order__merchant_profile=merchant, order__order_status__iexact="Delivered"):
        row = sales_by_product.setdefault(item.name, {"name": item.name, "sold": 0, "revenue": Decimal("0")})
        row["sold"] += item.quantity
        row["revenue"] += item.price * item.quantity
    today = timezone.localdate()
    sales_chart = []
    for n in range(6, -1, -1):
        day = today - timedelta(days=n)
        amount = orders.filter(created_at__date=day, status__iexact="delivered").aggregate(v=Sum("total"))["v"] or 0
        amount += local_orders.filter(created_at__date=day, order_status__iexact="delivered").aggregate(v=Sum("total_amount"))["v"] or 0
        sales_chart.append({"date": day.strftime("%a"), "revenue": float(amount)})
    status_counts = {"delivered": 0, "processing": 0, "shipped": 0, "cancelled": 0}
    for status, count in orders.values_list("status").annotate(count=Count("id")):
        status = status.lower()
        if status in status_counts:
            status_counts[status] += count
        elif status in ("pending", "confirmed", "packed", "out for delivery"):
            status_counts["processing"] += count
    for status, count in local_orders.values_list("order_status").annotate(count=Count("id")):
        status = status.lower()
        if status == "delivered":
            status_counts["delivered"] += count
        elif status == "cancelled":
            status_counts["cancelled"] += count
        elif status in ("shipped", "out for delivery", "arriving soon"):
            status_counts["shipped"] += count
        else:
            status_counts["processing"] += count
    customer_emails = set(orders.values_list("customer_email", flat=True)) | set(local_orders.values_list("customer_email", flat=True))
    return render(request, "merchant-dashboard.html", {
        "merchant": merchant, "dashboard_orders": json.dumps(dashboard_orders),
        "dashboard_products": json.dumps(list(products.values("id", "name", "sku", "price", "stock", "is_active")), default=str),
        "top_products": json.dumps(sorted(sales_by_product.values(), key=lambda x: x["sold"], reverse=True)[:5], default=str),
        "sales_chart": json.dumps(sales_chart), "order_statuses": json.dumps(status_counts),
        "total_orders": orders.count() + local_orders.count(), "total_products": products.count(),
        "low_stock_count": products.filter(stock__lte=F("low_stock_threshold")).count(),
        "total_revenue": (orders.filter(status__iexact="delivered").aggregate(v=Sum("total"))["v"] or Decimal("0")) + (local_orders.filter(order_status__iexact="delivered").aggregate(v=Sum("total_amount"))["v"] or Decimal("0")),
        "customer_count": len(customer_emails),
        "currency_symbol": "₹" if merchant.currency == "INR" else merchant.currency + " ",
    })


@login_required(login_url="merchant_login")
def merchant_logout(request):
    from django.contrib.auth import logout
    logout(request)
    return redirect("merchant_login")


@merchant_api_required
def merchant_settings_api(request):
    if request.method != "PATCH":
        return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        return JsonResponse({"success": False, "message": "Merchant profile not found."}, status=404)
    if not merchant.is_approved:
        return JsonResponse({"success": False, "message": "Merchant approval required."}, status=403)
    previous_address = merchant.address.strip()
    previous_latitude, previous_longitude = merchant.latitude, merchant.longitude
    try:
        data = json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "message": "Invalid JSON data."}, status=400)
    shop_name = str(data.get("shop_name", merchant.shop_name)).strip()
    if not shop_name:
        return JsonResponse({"success": False, "message": "Shop name is required."}, status=400)
    merchant.shop_name = shop_name[:180]
    merchant.phone = str(data.get("phone", merchant.phone)).strip()[:30]
    merchant.address = str(data.get("address", merchant.address)).strip()
    merchant.logo = str(data.get("logo", merchant.logo)).strip()
    try:
        raw_latitude = data.get("latitude", merchant.latitude)
        raw_longitude = data.get("longitude", merchant.longitude)
        latitude = float(raw_latitude) if str(raw_latitude if raw_latitude is not None else "").strip() else None
        longitude = float(raw_longitude) if str(raw_longitude if raw_longitude is not None else "").strip() else None
        if latitude is not None and (not math.isfinite(latitude) or not -90 <= latitude <= 90):
            raise ValueError
        if longitude is not None and (not math.isfinite(longitude) or not -180 <= longitude <= 180):
            raise ValueError
    except (TypeError, ValueError):
        return JsonResponse({"success": False, "message": "Enter valid store latitude and longitude."}, status=400)
    if (latitude is None) != (longitude is None):
        return JsonResponse({"success": False, "message": "Enter both store coordinates together."}, status=400)
    address_changed = previous_address != merchant.address.strip()
    location_confirmed = data.get("location_confirmed") is True and latitude is not None and longitude is not None
    if address_changed and not location_confirmed:
        merchant.shop_name, merchant.phone = shop_name[:180], str(data.get("phone", merchant.phone)).strip()[:30]
        merchant.address = str(data.get("address", merchant.address)).strip()
        merchant.logo = str(data.get("logo", merchant.logo)).strip()
        merchant.location_confirmed = False
        merchant.save(update_fields=["shop_name", "phone", "address", "logo", "location_confirmed"])
        return JsonResponse({"success": True, "location_confirmed": False, "message": "Store details saved. Confirm the exact store pin on the map before customer routes are enabled."})
    merchant.latitude, merchant.longitude = latitude, longitude
    merchant.location_confirmed = location_confirmed or (not address_changed and merchant.location_confirmed and latitude == previous_latitude and longitude == previous_longitude)
    merchant.save(update_fields=["shop_name", "phone", "address", "logo", "latitude", "longitude", "location_confirmed"])
    return JsonResponse({"success": True, "location_confirmed": merchant.location_confirmed, "message": "Store settings saved."})


@merchant_api_required
def merchant_location_preview_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required."}, status=405)
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        return JsonResponse({"error": "Merchant account required."}, status=403)
    if not merchant.is_approved:
        return JsonResponse({"error": "Approved merchant account required."}, status=403)
    try:
        data = json.loads(request.body.decode("utf-8"))
        address = str(data.get("address", "")).strip()
        from tracking.geocoding import geocode_address
        result = geocode_address(address)
    except Exception:
        result = None
    if not result:
        return JsonResponse({"error": "Unable to accurately locate this address. Please select the correct location on the map."}, status=422)
    return JsonResponse({"candidate": result, "confirmed": False})


@merchant_api_required
def merchant_dashboard_coupons_api(request):
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        return JsonResponse({"success": False, "message": "Merchant profile not found."}, status=404)
    if not merchant.is_approved:
        return JsonResponse({"success": False, "message": "Merchant approval required."}, status=403)
    if request.method == "GET":
        coupons = []
        for coupon in MerchantCoupon.objects.filter(merchant=merchant).order_by("-id"):
            discount_type = "percentage" if coupon.percentage else "fixed"
            coupons.append({"id": coupon.id, "code": coupon.code, "discount_type": discount_type,
                "discount_value": str(coupon.percentage or coupon.fixed_amount), "is_active": coupon.active,
                "expires_at": coupon.expires_at.isoformat() if coupon.expires_at else None})
        return JsonResponse({"success": True, "coupons": coupons, "count": len(coupons)})
    if request.method not in {"POST", "PATCH", "DELETE"}:
        return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    try:
        data = json.loads(request.body.decode("utf-8")) if request.body else {}
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "message": "Invalid JSON data."}, status=400)
    if request.method == "POST":
        code = str(data.get("code", "")).strip().upper()
        discount_type = str(data.get("discount_type", "percentage")).lower()
        try:
            value = Decimal(str(data.get("discount_value", "")))
            if not code or value <= 0 or discount_type not in {"percentage", "fixed"} or (discount_type == "percentage" and value > 100):
                raise ValueError
        except (InvalidOperation, TypeError, ValueError):
            return JsonResponse({"success": False, "message": "Enter a unique coupon code and a valid discount."}, status=400)
        if MerchantCoupon.objects.filter(merchant=merchant, code__iexact=code).exists():
            return JsonResponse({"success": False, "message": "This coupon code already exists."}, status=400)
        coupon = MerchantCoupon.objects.create(merchant=merchant, code=code,
            percentage=int(value) if discount_type == "percentage" else 0,
            fixed_amount=value if discount_type == "fixed" else 0, active=True)
        return JsonResponse({"success": True, "id": coupon.id}, status=201)
    try:
        coupon = MerchantCoupon.objects.get(id=data.get("coupon_id"), merchant=merchant)
    except (MerchantCoupon.DoesNotExist, TypeError, ValueError):
        return JsonResponse({"success": False, "message": "Coupon not found."}, status=404)
    if request.method == "DELETE":
        coupon.delete()
        return JsonResponse({"success": True})
    if "is_active" in data:
        coupon.active = bool(data["is_active"])
    if "code" in data:
        coupon.code = str(data["code"]).strip().upper()
    coupon.save()
    return JsonResponse({"success": True})


@merchant_api_required
def merchant_products_api(request):
    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        return JsonResponse({"success": False, "message": "Merchant profile not found."}, status=404)
    if not merchant.is_approved:
        return JsonResponse({"success": False, "message": "Merchant approval required."}, status=403)
    if request.method == "GET":
        return JsonResponse({"success": True, "products": list(MerchantProduct.objects.filter(merchant=merchant).values("id", "name", "sku", "description", "image", "price", "compare_at_price", "stock", "stock_unit", "product_type", "package_size", "low_stock_threshold", "is_active", "category_id"))})
    if request.method != "POST":
        return JsonResponse({"success": False, "message": "Method not allowed."}, status=405)
    try:
        data = json.loads(request.body.decode("utf-8"))
        name, sku = str(data.get("name", "")).strip(), _validated_sku(data.get("sku"))
        price, stock = Decimal(str(data.get("price", ""))), int(data.get("stock", 0))
        stock_unit = str(data.get("stock_unit", "units")).strip()[:32] or "units"
        if not name or sku is None or price < 0 or stock < 0:
            raise ValueError
    except (ValueError, TypeError, InvalidOperation, json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"success": False, "message": "Enter a name, a valid SKU (letters, numbers, dot, underscore, or hyphen; up to 80 characters), non-negative price, and valid stock."}, status=400)
    if MerchantProduct.objects.filter(merchant=merchant, sku__iexact=sku).exists():
        return JsonResponse({"success": False, "message": "That SKU is already in use."}, status=400)
    try:
        product = MerchantProduct.objects.create(merchant=merchant, name=name, sku=sku, price=price, stock=stock, stock_unit=stock_unit,
            image=str(data.get("image", "")).strip(), description=str(data.get("description", "")))
    except IntegrityError:
        return JsonResponse({"success": False, "message": "That SKU is already in use."}, status=400)
    return JsonResponse({"success": True, "product": {"id": product.id, "name": product.name}}, status=201)



@merchant_api_required
def product_api(request, product_id):
    """
    Get, update, or delete one product belonging to the
    currently logged-in merchant.
    """

    try:
        merchant = request.user.merchant_profile
    except MerchantProfile.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Merchant profile not found."
            },
            status=404
        )

    if not merchant.is_approved:
        return JsonResponse(
            {
                "success": False,
                "message": "Your shop registration is waiting for admin approval."
            },
            status=403
        )

    try:
        product = MerchantProduct.objects.select_related(
            "category"
        ).get(
            id=product_id,
            merchant=merchant
        )
    except MerchantProduct.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Product not found."
            },
            status=404
        )

    # -----------------------------------------
    # GET PRODUCT
    # -----------------------------------------

    if request.method == "GET":

        return JsonResponse({
            "success": True,
            "product": {
                "id": product.id,
                "name": product.name,
                "sku": product.sku,
                "description": product.description,
                "image": product.image,
                "price": str(product.price),
                "compare_at_price": (
                    str(product.compare_at_price)
                    if product.compare_at_price is not None
                    else None
                ),
                "stock": product.stock,
                "stock_unit": product.stock_unit,
                "low_stock_threshold": product.low_stock_threshold,
                "is_low_stock": product.is_low_stock,
                "is_active": product.is_active,
                "category_id": (
                    product.category.id
                    if product.category
                    else None
                ),
                "category": (
                    product.category.name
                    if product.category
                    else None
                ),
                "created_at": product.created_at.isoformat(),
                "updated_at": product.updated_at.isoformat(),
            }
        })

    # -----------------------------------------
    # DELETE PRODUCT
    # -----------------------------------------

    if request.method == "DELETE":

        product_name = product.name

        product.delete()

        return JsonResponse({
            "success": True,
            "message": f"{product_name} deleted successfully.",
            "product_id": product_id
        })

    # -----------------------------------------
    # UPDATE PRODUCT
    # -----------------------------------------

    if request.method in ["PUT", "PATCH"]:

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )
        except (json.JSONDecodeError, UnicodeDecodeError):

            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        if "name" in data:
            product.name = str(
                data["name"]
            ).strip()

        if "sku" in data:
            sku = _validated_sku(data["sku"])
            if sku is None:
                return JsonResponse(
                    {"success": False, "message": "Enter a valid SKU using letters, numbers, dot, underscore, or hyphen (up to 80 characters)."},
                    status=400
                )
            if MerchantProduct.objects.filter(
                merchant=merchant,
                sku__iexact=sku,
            ).exclude(pk=product.pk).exists():
                return JsonResponse(
                    {"success": False, "message": "That SKU is already in use."},
                    status=400
                )
            product.sku = sku

        if "description" in data:
            product.description = str(
                data["description"]
            )

        if "image" in data:
            product.image = str(
                data["image"]
            ).strip()

        if "price" in data:
            try:
                product.price = data["price"]
            except (TypeError, ValueError):
                return JsonResponse(
                    {
                        "success": False,
                        "message": "Invalid price."
                    },
                    status=400
                )

        if "compare_at_price" in data:

            value = data["compare_at_price"]

            if value in ["", None]:
                product.compare_at_price = None
            else:
                try:
                    product.compare_at_price = value
                except (TypeError, ValueError):
                    return JsonResponse(
                        {
                            "success": False,
                            "message": "Invalid compare-at price."
                        },
                        status=400
                    )

        if "stock" in data:

            try:
                stock = int(data["stock"])

                if stock < 0:
                    raise ValueError

                product.stock = stock

            except (TypeError, ValueError):

                return JsonResponse(
                    {
                        "success": False,
                        "message": "Stock must be a valid non-negative number."
                    },
                    status=400
                )

        if "stock_unit" in data:
            product.stock_unit = str(data["stock_unit"]).strip()[:32] or "units"

        if "low_stock_threshold" in data:

            try:
                threshold = int(
                    data["low_stock_threshold"]
                )

                if threshold < 0:
                    raise ValueError

                product.low_stock_threshold = threshold

            except (TypeError, ValueError):

                return JsonResponse(
                    {
                        "success": False,
                        "message": "Invalid low-stock threshold."
                    },
                    status=400
                )

        if "is_active" in data:
            product.is_active = bool(
                data["is_active"]
            )

        if "category_id" in data:

            category_id = data["category_id"]

            if category_id in ["", None]:
                product.category = None

            else:
                try:
                    category_id = int(category_id)

                    category = merchant.categories.get(
                        id=category_id
                    )

                    product.category = category

                except (
                    ValueError,
                    TypeError,
                    MerchantCategory.DoesNotExist
                ):

                    return JsonResponse(
                        {
                            "success": False,
                            "message": "Invalid product category."
                        },
                        status=400
                    )

        try:
            product.save()
        except IntegrityError:
            return JsonResponse(
                {"success": False, "message": "That SKU is already in use."},
                status=400
            )

        return JsonResponse({
            "success": True,
            "message": "Product updated successfully.",
            "product": {
                "id": product.id,
                "name": product.name,
                "sku": product.sku,
                "description": product.description,
                "image": product.image,
                "price": str(product.price),
                "compare_at_price": (
                    str(product.compare_at_price)
                    if product.compare_at_price is not None
                    else None
                ),
                "stock": product.stock,
                "low_stock_threshold": product.low_stock_threshold,
                "is_low_stock": product.is_low_stock,
                "is_active": product.is_active,
                "category_id": (
                    product.category.id
                    if product.category
                    else None
                ),
                "category": (
                    product.category.name
                    if product.category
                    else None
                ),
            }
        })

    # -----------------------------------------
    # METHOD NOT ALLOWED
    # -----------------------------------------

    return JsonResponse(
        {
            "success": False,
            "message": "Method not allowed."
        },
        status=405
    )







def merchant_login(request):
    # Already logged-in approved merchant
    if (
        request.user.is_authenticated
        and request.session.get("merchant_authenticated")
        and getattr(request.user, "merchant_profile", None)
        and request.user.merchant_profile.is_approved
    ):
        return redirect("merchant_dashboard")

    error = ""

    if request.method == "POST":

        # IMPORTANT:
        # Your merchant-login.html uses name="email"
        login_value = request.POST.get("email", "").strip()
        password = request.POST.get("password", "")

        print("\n========================================")
        print("        MERCHANT LOGIN")
        print("========================================")
        print("LOGIN VALUE:", repr(login_value))
        print("PASSWORD RECEIVED:", bool(password))
        print("PASSWORD LENGTH:", len(password))

        if not login_value or not password:
            print("LOGIN FAILED: EMPTY LOGIN DATA")
            error = "Please enter your shop name/email and password."
            return render(
                request,
                "merchant-login.html",
                {
                    "error": error,
                    "active_tab": "login",
                },
            )

        # -------------------------------------------------
        # FIND MERCHANT
        # Username OR email OR shop name
        # -------------------------------------------------

        merchant = (
            MerchantProfile.objects
            .select_related("owner")
            .filter(owner__username__iexact=login_value)
            .first()
        )

        if merchant:
            print("MERCHANT FOUND BY USERNAME")

        if merchant is None:
            merchant = (
                MerchantProfile.objects
                .select_related("owner")
                .filter(owner__email__iexact=login_value)
                .first()
            )

            if merchant:
                print("MERCHANT FOUND BY EMAIL")

        if merchant is None:
            merchant = (
                MerchantProfile.objects
                .select_related("owner")
                .filter(shop_name__iexact=login_value)
                .first()
            )

            if merchant:
                print("MERCHANT FOUND BY SHOP NAME")

        # -------------------------------------------------
        # MERCHANT NOT FOUND
        # -------------------------------------------------

        if merchant is None:
            print("LOGIN FAILED: MERCHANT NOT FOUND")

            error = "Invalid shop name/email or password."

            return render(
                request,
                "merchant-login.html",
                {
                    "error": error,
                    "active_tab": "login",
                },
            )

        # -------------------------------------------------
        # GET OWNER USER
        # -------------------------------------------------

        user = merchant.owner

        print("----------------------------------------")
        print("SHOP:", merchant.shop_name)
        print("USERNAME:", user.username)
        print("EMAIL:", user.email)
        print("APPROVED:", merchant.is_approved)
        print("ACTIVE:", user.is_active)
        print("----------------------------------------")

        # -------------------------------------------------
        # APPROVAL CHECK
        # -------------------------------------------------

        if not merchant.is_approved:

            print("LOGIN BLOCKED: MERCHANT NOT APPROVED")

            error = (
                "Your shop registration is waiting for admin approval."
            )

            return render(
                request,
                "merchant-login.html",
                {
                    "error": error,
                    "active_tab": "login",
                },
            )

        # -------------------------------------------------
        # ACTIVE CHECK
        # -------------------------------------------------

        if not user.is_active:

            print("LOGIN BLOCKED: USER INACTIVE")

            error = (
                "Your merchant account is inactive. Please contact admin."
            )

            return render(
                request,
                "merchant-login.html",
                {
                    "error": error,
                    "active_tab": "login",
                },
            )

        # -------------------------------------------------
        # AUTHENTICATE USING REAL USERNAME
        # -------------------------------------------------

        authenticated_user = authenticate(
            request=request,
            username=user.username,
            password=password,
        )

        print("AUTHENTICATED USER:", authenticated_user)

        # -------------------------------------------------
        # PASSWORD FAILED
        # -------------------------------------------------

        if authenticated_user is None:

            print("LOGIN FAILED: PASSWORD AUTHENTICATION FAILED")

            error = "Invalid shop name/email or password."

            return render(
                request,
                "merchant-login.html",
                {
                    "error": error,
                    "active_tab": "login",
                },
            )

        # -------------------------------------------------
        # DJANGO LOGIN
        # -------------------------------------------------

        auth_login(request, authenticated_user)

        print("DJANGO LOGIN SUCCESS")

        # -------------------------------------------------
        # MERCHANT SESSION
        # -------------------------------------------------

        request.session["merchant_authenticated"] = True

        request.session["merchant_id"] = merchant.id

        request.session["merchant_shop_name"] = merchant.shop_name

        request.session["merchant_email"] = user.email

        request.session["merchant_profile"] = {
            "shop_name": merchant.shop_name,
            "owner_name": user.first_name,
            "email": user.email,
        }

        # -------------------------------------------------
        # REMEMBER ME
        # -------------------------------------------------

        if request.POST.get("remember_me"):
            request.session.set_expiry(60 * 60 * 24 * 30)
            print("REMEMBER ME: 30 DAYS")
        else:
            request.session.set_expiry(0)
            print("REMEMBER ME: SESSION ONLY")

        # -------------------------------------------------
        # SUCCESS
        # -------------------------------------------------

        print("----------------------------------------")
        print("MERCHANT LOGIN SUCCESS")
        print("MERCHANT ID:", merchant.id)
        print("SHOP:", merchant.shop_name)
        print("USERNAME:", authenticated_user.username)
        print("EMAIL:", authenticated_user.email)
        print("REDIRECT: merchant_dashboard")
        print("----------------------------------------")

        return redirect("merchant_dashboard")

    # -----------------------------------------------------
    # GET REQUEST
    # -----------------------------------------------------

    return render(
        request,
        "merchant-login.html",
        {
            "error": error,
            "active_tab": "login",
        },
    )







@merchant_api_required
def order_status_api(request, order_id):
    """
    Get or update the status of a merchant order.
    """

    # ---------------------------------------------------------
    # Get merchant profile
    # ---------------------------------------------------------
    try:
        merchant = request.user.merchant_profile

    except MerchantProfile.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Merchant profile not found."
            },
            status=404
        )

    # ---------------------------------------------------------
    # Merchant approval check
    # ---------------------------------------------------------
    if not merchant.is_approved:
        return JsonResponse(
            {
                "success": False,
                "message": (
                    "Your shop registration is waiting "
                    "for admin approval."
                )
            },
            status=403
        )

    # ---------------------------------------------------------
    # Get only this merchant's order
    # ---------------------------------------------------------
    try:
        order = MerchantOrder.objects.get(
            id=order_id,
            merchant=merchant
        )

    except MerchantOrder.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Order not found."
            },
            status=404
        )

    # =========================================================
    # GET - Return current order status
    # =========================================================
    if request.method == "GET":

        return JsonResponse(
            {
                "success": True,
                "order": {
                    "id": order.id,
                    "status": order.status,
                    "created_at": (
                        order.created_at.isoformat()
                        if order.created_at
                        else None
                    ),
                    "updated_at": (
                        order.updated_at.isoformat()
                        if hasattr(order, "updated_at")
                        and order.updated_at
                        else None
                    ),
                }
            }
        )

    # =========================================================
    # PUT / PATCH - Update order status
    # =========================================================
    if request.method in ["PUT", "PATCH"]:

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        new_status = str(
            data.get("status", "")
        ).strip()

        if not new_status:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Order status is required."
                },
                status=400
            )

        # -----------------------------------------------------
        # Allowed merchant order statuses
        # -----------------------------------------------------
        allowed_statuses = [
            "Pending",
            "Confirmed",
            "Processing",
            "Packed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
            "Returned",
        ]

        # Case-insensitive matching
        status_map = {
            status.lower(): status
            for status in allowed_statuses
        }

        normalized_status = status_map.get(
            new_status.lower()
        )

        if normalized_status is None:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid order status.",
                    "allowed_statuses": allowed_statuses,
                },
                status=400
            )

        # -----------------------------------------------------
        # Update order
        # -----------------------------------------------------
        old_status = order.status

        order.status = normalized_status
        order.save(
            update_fields=["status"]
        )

        return JsonResponse(
            {
                "success": True,
                "message": (
                    f"Order #{order.id} status updated "
                    f"from {old_status} to {normalized_status}."
                ),
                "order": {
                    "id": order.id,
                    "status": order.status,
                }
            }
        )

    # =========================================================
    # Unsupported HTTP method
    # =========================================================
    return JsonResponse(
        {
            "success": False,
            "message": "Method not allowed."
        },
        status=405
    )





@merchant_api_required
def analytics_api(request):
    """
    Merchant analytics API.

    Returns:
    - Total orders
    - Total revenue
    - Pending orders
    - Completed orders
    - Cancelled orders
    - Total products
    - Active products
    - Low-stock products
    - Recent orders
    """

    # ---------------------------------------------------------
    # Get merchant profile
    # ---------------------------------------------------------
    try:
        merchant = request.user.merchant_profile

    except MerchantProfile.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Merchant profile not found."
            },
            status=404
        )

    # ---------------------------------------------------------
    # Approval check
    # ---------------------------------------------------------
    if not merchant.is_approved:
        return JsonResponse(
            {
                "success": False,
                "message": (
                    "Your shop registration is waiting "
                    "for admin approval."
                )
            },
            status=403
        )

    # ---------------------------------------------------------
    # Merchant orders
    # ---------------------------------------------------------
    orders = MerchantOrder.objects.filter(
        merchant=merchant
    )

    total_orders = orders.count()

    pending_orders = orders.filter(
        status__in=[
            "Pending",
            "Confirmed",
            "Processing",
            "Packed",
        ]
    ).count()

    completed_orders = orders.filter(
        status="Delivered"
    ).count()

    cancelled_orders = orders.filter(
        status="Cancelled"
    ).count()

    shipped_orders = orders.filter(
        status__in=[
            "Shipped",
            "Out for Delivery",
        ]
    ).count()

    # ---------------------------------------------------------
    # Revenue
    # ---------------------------------------------------------
    revenue_result = orders.filter(
        status__in=[
            "Confirmed",
            "Processing",
            "Packed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
        ]
    ).aggregate(
        total=Sum("total")
    )

    total_revenue = revenue_result["total"] or 0

    # ---------------------------------------------------------
    # Products
    # ---------------------------------------------------------
    products = MerchantProduct.objects.filter(
        merchant=merchant
    )

    total_products = products.count()

    active_products = products.filter(
        is_active=True
    ).count()

    inactive_products = products.filter(
        is_active=False
    ).count()

    low_stock_products = products.filter(
        stock__lte=models.F("low_stock_threshold")
    ).count()

    out_of_stock_products = products.filter(
        stock=0
    ).count()

    # ---------------------------------------------------------
    # Recent orders
    # ---------------------------------------------------------
    recent_orders = orders.order_by(
        "-created_at"
    )[:10]

    recent_order_data = []

    for order in recent_orders:

        recent_order_data.append(
            {
                "id": order.id,
                "status": order.status,
                "total_amount": str(
                    getattr(
                        order,
                        "total",
                        0
                    )
                ),
                "created_at": (
                    order.created_at.isoformat()
                    if order.created_at
                    else None
                ),
            }
        )

    # ---------------------------------------------------------
    # Response
    # ---------------------------------------------------------
    return JsonResponse(
        {
            "success": True,

            "merchant": {
                "id": merchant.id,
                "shop_name": merchant.shop_name,
                "email": merchant.owner.email,
            },

            "analytics": {
                "total_orders": total_orders,
                "pending_orders": pending_orders,
                "completed_orders": completed_orders,
                "cancelled_orders": cancelled_orders,
                "shipped_orders": shipped_orders,

                "total_revenue": str(
                    total_revenue
                ),

                "total_products": total_products,
                "active_products": active_products,
                "inactive_products": inactive_products,
                "low_stock_products": low_stock_products,
                "out_of_stock_products": out_of_stock_products,
            },

            "recent_orders": recent_order_data,
        }
    )





@merchant_api_required
def notifications_api(request):
    """
    Merchant notifications API.

    GET:
        Returns the merchant's notifications.

    PATCH / PUT:
        Marks a notification as read.

    POST:
        Creates a notification for the merchant.
    """

    # ---------------------------------------------------------
    # Get merchant profile
    # ---------------------------------------------------------
    try:
        merchant = request.user.merchant_profile

    except MerchantProfile.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Merchant profile not found."
            },
            status=404
        )

    # ---------------------------------------------------------
    # Approval check
    # ---------------------------------------------------------
    if not merchant.is_approved:
        return JsonResponse(
            {
                "success": False,
                "message": (
                    "Your shop registration is waiting "
                    "for admin approval."
                )
            },
            status=403
        )

    # ---------------------------------------------------------
    # Get notifications
    # ---------------------------------------------------------
    notifications = MerchantNotification.objects.filter(
        merchant=merchant
    ).order_by("-created_at")

    # =========================================================
    # GET
    # =========================================================
    if request.method == "GET":

        notification_data = []

        for notification in notifications[:50]:

            notification_data.append(
                {
                    "id": notification.id,
                    "title": getattr(
                        notification,
                        "title",
                        ""
                    ),
                    "message": getattr(
                        notification,
                        "message",
                        ""
                    ),
                    "type": getattr(
                        notification,
                        "notification_type",
                        "info"
                    ),
                    "is_read": getattr(
                        notification,
                        "is_read",
                        False
                    ),
                    "created_at": (
                        notification.created_at.isoformat()
                        if notification.created_at
                        else None
                    ),
                }
            )

        unread_count = notifications.filter(
            is_read=False
        ).count()

        return JsonResponse(
            {
                "success": True,
                "count": len(notification_data),
                "unread_count": unread_count,
                "notifications": notification_data,
            }
        )

    # =========================================================
    # PATCH / PUT
    # Mark notification as read
    # =========================================================
    if request.method in ["PATCH", "PUT"]:

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        notification_id = data.get(
            "notification_id"
        )

        if not notification_id:
            return JsonResponse(
                {
                    "success": False,
                    "message": "notification_id is required."
                },
                status=400
            )

        try:
            notification = MerchantNotification.objects.get(
                id=notification_id,
                merchant=merchant
            )

        except MerchantNotification.DoesNotExist:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Notification not found."
                },
                status=404
            )

        notification.is_read = True
        notification.save(
            update_fields=["is_read"]
        )

        return JsonResponse(
            {
                "success": True,
                "message": "Notification marked as read.",
                "notification_id": notification.id,
            }
        )

    # =========================================================
    # POST
    # =========================================================
    if request.method == "POST":

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        title = str(
            data.get("title", "")
        ).strip()

        message = str(
            data.get("message", "")
        ).strip()

        notification_type = str(
            data.get(
                "notification_type",
                "info"
            )
        ).strip()

        if not title or not message:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Title and message are required."
                },
                status=400
            )

        notification = MerchantNotification.objects.create(
            merchant=merchant,
            title=title,
            message=message,
            notification_type=notification_type,
            is_read=False
        )

        return JsonResponse(
            {
                "success": True,
                "message": "Notification created successfully.",
                "notification": {
                    "id": notification.id,
                    "title": notification.title,
                    "message": notification.message,
                    "type": notification.notification_type,
                    "is_read": notification.is_read,
                    "created_at": (
                        notification.created_at.isoformat()
                        if notification.created_at
                        else None
                    ),
                }
            },
            status=201
        )

    # =========================================================
    # Unsupported method
    # =========================================================
    return JsonResponse(
        {
            "success": False,
            "message": "Method not allowed."
        },
        status=405
    )







@merchant_api_required
def coupons_api(request):
    """
    Merchant coupons API.

    GET:
        Return all coupons belonging to the logged-in merchant.

    POST:
        Create a new coupon.

    PATCH / PUT:
        Update a coupon.

    DELETE:
        Delete a coupon.
    """

    # ---------------------------------------------------------
    # Get merchant
    # ---------------------------------------------------------
    try:
        merchant = request.user.merchant_profile

    except MerchantProfile.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Merchant profile not found."
            },
            status=404
        )

    # ---------------------------------------------------------
    # Approval check
    # ---------------------------------------------------------
    if not merchant.is_approved:
        return JsonResponse(
            {
                "success": False,
                "message": (
                    "Your shop registration is waiting "
                    "for admin approval."
                )
            },
            status=403
        )

    # =========================================================
    # GET - List coupons
    # =========================================================
    if request.method == "GET":

        coupons = MerchantCoupon.objects.filter(
            merchant=merchant
        ).order_by("-created_at")

        coupon_data = []

        for coupon in coupons:

            coupon_data.append(
                {
                    "id": coupon.id,
                    "code": coupon.code,
                    "description": getattr(
                        coupon,
                        "description",
                        ""
                    ),
                    "discount_type": getattr(
                        coupon,
                        "discount_type",
                        ""
                    ),
                    "discount_value": str(
                        getattr(
                            coupon,
                            "discount_value",
                            0
                        )
                    ),
                    "minimum_order_amount": str(
                        getattr(
                            coupon,
                            "minimum_order_amount",
                            0
                        )
                    ),
                    "maximum_discount_amount": (
                        str(
                            coupon.maximum_discount_amount
                        )
                        if getattr(
                            coupon,
                            "maximum_discount_amount",
                            None
                        ) is not None
                        else None
                    ),
                    "usage_limit": getattr(
                        coupon,
                        "usage_limit",
                        None
                    ),
                    "used_count": getattr(
                        coupon,
                        "used_count",
                        0
                    ),
                    "is_active": getattr(
                        coupon,
                        "is_active",
                        True
                    ),
                    "start_date": (
                        coupon.start_date.isoformat()
                        if getattr(
                            coupon,
                            "start_date",
                            None
                        )
                        else None
                    ),
                    "end_date": (
                        coupon.end_date.isoformat()
                        if getattr(
                            coupon,
                            "end_date",
                            None
                        )
                        else None
                    ),
                    "created_at": (
                        coupon.created_at.isoformat()
                        if getattr(
                            coupon,
                            "created_at",
                            None
                        )
                        else None
                    ),
                }
            )

        return JsonResponse(
            {
                "success": True,
                "count": len(coupon_data),
                "coupons": coupon_data,
            }
        )

    # =========================================================
    # POST - Create coupon
    # =========================================================
    if request.method == "POST":

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        code = str(
            data.get("code", "")
        ).strip().upper()

        if not code:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Coupon code is required."
                },
                status=400
            )

        # -----------------------------------------------------
        # Prevent duplicate coupon codes for same merchant
        # -----------------------------------------------------
        if MerchantCoupon.objects.filter(
            merchant=merchant,
            code__iexact=code
        ).exists():
            return JsonResponse(
                {
                    "success": False,
                    "message": "This coupon code already exists."
                },
                status=400
            )

        discount_type = str(
            data.get(
                "discount_type",
                "percentage"
            )
        ).strip().lower()

        allowed_discount_types = [
            "percentage",
            "fixed",
        ]

        if discount_type not in allowed_discount_types:
            return JsonResponse(
                {
                    "success": False,
                    "message": (
                        "Invalid discount type. "
                        "Use percentage or fixed."
                    )
                },
                status=400
            )

        try:
            discount_value = data.get(
                "discount_value",
                0
            )

            if discount_value in ["", None]:
                raise ValueError

            discount_value = float(
                discount_value
            )

            if discount_value < 0:
                raise ValueError

            if (
                discount_type == "percentage"
                and discount_value > 100
            ):
                return JsonResponse(
                    {
                        "success": False,
                        "message": (
                            "Percentage discount "
                            "cannot exceed 100."
                        )
                    },
                    status=400
                )

        except (TypeError, ValueError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid discount value."
                },
                status=400
            )

        # -----------------------------------------------------
        # Optional fields
        # -----------------------------------------------------
        description = str(
            data.get(
                "description",
                ""
            )
        ).strip()

        try:
            minimum_order_amount = float(
                data.get(
                    "minimum_order_amount",
                    0
                ) or 0
            )

            if minimum_order_amount < 0:
                raise ValueError

        except (TypeError, ValueError):
            return JsonResponse(
                {
                    "success": False,
                    "message": (
                        "Invalid minimum order amount."
                    )
                },
                status=400
            )

        try:
            usage_limit = data.get(
                "usage_limit"
            )

            if usage_limit in ["", None]:
                usage_limit = None
            else:
                usage_limit = int(
                    usage_limit
                )

                if usage_limit < 0:
                    raise ValueError

        except (TypeError, ValueError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid usage limit."
                },
                status=400
            )

        is_active = data.get(
            "is_active",
            True
        )

        coupon = MerchantCoupon.objects.create(
            merchant=merchant,
            code=code,
            description=description,
            discount_type=discount_type,
            discount_value=discount_value,
            minimum_order_amount=minimum_order_amount,
            usage_limit=usage_limit,
            is_active=bool(is_active)
        )

        return JsonResponse(
            {
                "success": True,
                "message": "Coupon created successfully.",
                "coupon": {
                    "id": coupon.id,
                    "code": coupon.code,
                    "discount_type": coupon.discount_type,
                    "discount_value": str(
                        coupon.discount_value
                    ),
                    "is_active": coupon.is_active,
                }
            },
            status=201
        )

    # =========================================================
    # PATCH / PUT - Update coupon
    # =========================================================
    if request.method in ["PATCH", "PUT"]:

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        coupon_id = data.get("coupon_id")

        if not coupon_id:
            return JsonResponse(
                {
                    "success": False,
                    "message": "coupon_id is required."
                },
                status=400
            )

        try:
            coupon = MerchantCoupon.objects.get(
                id=coupon_id,
                merchant=merchant
            )

        except MerchantCoupon.DoesNotExist:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Coupon not found."
                },
                status=404
            )

        if "code" in data:
            new_code = str(
                data["code"]
            ).strip().upper()

            if not new_code:
                return JsonResponse(
                    {
                        "success": False,
                        "message": "Coupon code cannot be empty."
                    },
                    status=400
                )

            duplicate = MerchantCoupon.objects.filter(
                merchant=merchant,
                code__iexact=new_code
            ).exclude(
                id=coupon.id
            ).exists()

            if duplicate:
                return JsonResponse(
                    {
                        "success": False,
                        "message": (
                            "Another coupon already uses "
                            "this code."
                        )
                    },
                    status=400
                )

            coupon.code = new_code

        if "description" in data:
            coupon.description = str(
                data["description"]
            ).strip()

        if "discount_type" in data:

            discount_type = str(
                data["discount_type"]
            ).strip().lower()

            if discount_type not in [
                "percentage",
                "fixed",
            ]:
                return JsonResponse(
                    {
                        "success": False,
                        "message": "Invalid discount type."
                    },
                    status=400
                )

            coupon.discount_type = discount_type

        if "discount_value" in data:

            try:
                value = float(
                    data["discount_value"]
                )

                if value < 0:
                    raise ValueError

                if (
                    coupon.discount_type == "percentage"
                    and value > 100
                ):
                    raise ValueError

                coupon.discount_value = value

            except (TypeError, ValueError):
                return JsonResponse(
                    {
                        "success": False,
                        "message": "Invalid discount value."
                    },
                    status=400
                )

        if "minimum_order_amount" in data:

            try:
                value = float(
                    data["minimum_order_amount"]
                    or 0
                )

                if value < 0:
                    raise ValueError

                coupon.minimum_order_amount = value

            except (TypeError, ValueError):
                return JsonResponse(
                    {
                        "success": False,
                        "message": (
                            "Invalid minimum order amount."
                        )
                    },
                    status=400
                )

        if "usage_limit" in data:

            try:
                value = data["usage_limit"]

                if value in ["", None]:
                    coupon.usage_limit = None

                else:
                    value = int(value)

                    if value < 0:
                        raise ValueError

                    coupon.usage_limit = value

            except (TypeError, ValueError):
                return JsonResponse(
                    {
                        "success": False,
                        "message": "Invalid usage limit."
                    },
                    status=400
                )

        if "is_active" in data:
            coupon.is_active = bool(
                data["is_active"]
            )

        coupon.save()

        return JsonResponse(
            {
                "success": True,
                "message": "Coupon updated successfully.",
                "coupon": {
                    "id": coupon.id,
                    "code": coupon.code,
                    "discount_type": coupon.discount_type,
                    "discount_value": str(
                        coupon.discount_value
                    ),
                    "is_active": coupon.is_active,
                }
            }
        )

    # =========================================================
    # DELETE - Delete coupon
    # =========================================================
    if request.method == "DELETE":

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            data = {}

        coupon_id = data.get(
            "coupon_id"
        )

        if not coupon_id:

            coupon_id = request.GET.get(
                "coupon_id"
            )

        if not coupon_id:
            return JsonResponse(
                {
                    "success": False,
                    "message": "coupon_id is required."
                },
                status=400
            )

        try:
            coupon = MerchantCoupon.objects.get(
                id=coupon_id,
                merchant=merchant
            )

        except MerchantCoupon.DoesNotExist:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Coupon not found."
                },
                status=404
            )

        coupon_code = coupon.code

        coupon.delete()

        return JsonResponse(
            {
                "success": True,
                "message": (
                    f"Coupon {coupon_code} deleted successfully."
                ),
                "coupon_id": coupon_id,
            }
        )

    # =========================================================
    # Unsupported method
    # =========================================================
    return JsonResponse(
        {
            "success": False,
            "message": "Method not allowed."
        },
        status=405
    )




@merchant_api_required
def payouts_api(request):
    """
    Merchant payouts API.

    GET:
        Returns payout history and current payout balance.

    POST:
        Creates a payout request.

    PATCH / PUT:
        Updates a payout request status when permitted.
    """

    # ---------------------------------------------------------
    # Get merchant profile
    # ---------------------------------------------------------
    try:
        merchant = request.user.merchant_profile

    except MerchantProfile.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Merchant profile not found."
            },
            status=404
        )

    # ---------------------------------------------------------
    # Approval check
    # ---------------------------------------------------------
    if not merchant.is_approved:
        return JsonResponse(
            {
                "success": False,
                "message": (
                    "Your shop registration is waiting "
                    "for admin approval."
                )
            },
            status=403
        )

    # =========================================================
    # GET - Payout history
    # =========================================================
    if request.method == "GET":

        payouts = MerchantPayout.objects.filter(
            merchant=merchant
        ).order_by("-created_at")

        payout_data = []

        for payout in payouts[:50]:

            payout_data.append(
                {
                    "id": payout.id,
                    "amount": str(
                        getattr(
                            payout,
                            "amount",
                            0
                        )
                    ),
                    "status": getattr(
                        payout,
                        "status",
                        "Pending"
                    ),
                    "transaction_id": getattr(
                        payout,
                        "transaction_id",
                        None
                    ),
                    "payment_method": getattr(
                        payout,
                        "payment_method",
                        None
                    ),
                    "created_at": (
                        payout.created_at.isoformat()
                        if getattr(
                            payout,
                            "created_at",
                            None
                        )
                        else None
                    ),
                    "processed_at": (
                        payout.processed_at.isoformat()
                        if getattr(
                            payout,
                            "processed_at",
                            None
                        )
                        else None
                    ),
                }
            )

        return JsonResponse(
            {
                "success": True,

                "balance": str(
                    merchant.payout_balance or 0
                ),

                "count": len(payout_data),

                "payouts": payout_data,
            }
        )

    # =========================================================
    # POST - Create payout request
    # =========================================================
    if request.method == "POST":

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        # -----------------------------------------------------
        # Get requested amount
        # -----------------------------------------------------
        try:
            amount = data.get("amount")

            if amount in ["", None]:
                raise ValueError

            from decimal import Decimal

            amount = Decimal(
                str(amount)
            )

            if amount <= 0:
                raise ValueError

        except (TypeError, ValueError, ArithmeticError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Enter a valid payout amount."
                },
                status=400
            )

        # -----------------------------------------------------
        # Check available balance
        # -----------------------------------------------------
        if amount > merchant.payout_balance:

            return JsonResponse(
                {
                    "success": False,
                    "message": (
                        "Payout amount cannot exceed "
                        "your available balance."
                    ),
                    "available_balance": str(
                        merchant.payout_balance
                    ),
                },
                status=400
            )

        # -----------------------------------------------------
        # Prevent multiple pending requests
        # -----------------------------------------------------
        pending_exists = MerchantPayout.objects.filter(
            merchant=merchant,
            status__in=[
                "Pending",
                "Processing",
            ]
        ).exists()

        if pending_exists:
            return JsonResponse(
                {
                    "success": False,
                    "message": (
                        "You already have a payout "
                        "request being processed."
                    )
                },
                status=400
            )

        # -----------------------------------------------------
        # Create payout request
        # -----------------------------------------------------
        payout = MerchantPayout.objects.create(
            merchant=merchant,
            amount=amount,
            status="Pending"
        )

        return JsonResponse(
            {
                "success": True,
                "message": (
                    "Payout request submitted successfully."
                ),
                "payout": {
                    "id": payout.id,
                    "amount": str(
                        payout.amount
                    ),
                    "status": payout.status,
                    "created_at": (
                        payout.created_at.isoformat()
                        if payout.created_at
                        else None
                    ),
                }
            },
            status=201
        )

    # =========================================================
    # PATCH / PUT
    # =========================================================
    if request.method in ["PATCH", "PUT"]:

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        payout_id = data.get(
            "payout_id"
        )

        if not payout_id:
            return JsonResponse(
                {
                    "success": False,
                    "message": "payout_id is required."
                },
                status=400
            )

        try:
            payout = MerchantPayout.objects.get(
                id=payout_id,
                merchant=merchant
            )

        except MerchantPayout.DoesNotExist:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Payout not found."
                },
                status=404
            )

        # -----------------------------------------------------
        # Merchants should not directly approve payouts.
        # -----------------------------------------------------
        return JsonResponse(
            {
                "success": False,
                "message": (
                    "Payout status can only be changed "
                    "by an administrator."
                )
            },
            status=403
        )

    # =========================================================
    # Unsupported method
    # =========================================================
    return JsonResponse(
        {
            "success": False,
            "message": "Method not allowed."
        },
        status=405
    )







@merchant_api_required
def reviews_api(request):
    """
    Merchant reviews API.

    GET:
        Returns reviews belonging to this merchant.

    PATCH / PUT:
        Allows the merchant to respond to a review.

    POST:
        Creates a merchant review response/record when supported.
    """

    # ---------------------------------------------------------
    # Get merchant profile
    # ---------------------------------------------------------
    try:
        merchant = request.user.merchant_profile

    except MerchantProfile.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Merchant profile not found."
            },
            status=404
        )

    # ---------------------------------------------------------
    # Approval check
    # ---------------------------------------------------------
    if not merchant.is_approved:
        return JsonResponse(
            {
                "success": False,
                "message": (
                    "Your shop registration is waiting "
                    "for admin approval."
                )
            },
            status=403
        )

    # =========================================================
    # GET - Merchant reviews
    # =========================================================
    if request.method == "GET":

        reviews = MerchantReview.objects.filter(
            merchant=merchant
        ).order_by("-created_at")

        review_data = []

        total_rating = 0
        rating_count = 0

        for review in reviews[:100]:

            rating = getattr(
                review,
                "rating",
                0
            )

            try:
                rating_number = float(rating)
            except (TypeError, ValueError):
                rating_number = 0

            if rating_number:
                total_rating += rating_number
                rating_count += 1

            review_data.append(
                {
                    "id": review.id,

                    "customer_name": getattr(
                        review,
                        "customer_name",
                        getattr(
                            review,
                            "user_name",
                            "Customer"
                        )
                    ),

                    "rating": rating,

                    "review": getattr(
                        review,
                        "review",
                        getattr(
                            review,
                            "comment",
                            ""
                        )
                    ),

                    "response": getattr(
                        review,
                        "merchant_response",
                        getattr(review, "reply", "")
                    ),

                    "is_responded": bool(
                        getattr(
                            review,
                            "merchant_response",
                            getattr(review, "reply", "")
                        )
                    ),

                    "created_at": (
                        review.created_at.isoformat()
                        if getattr(
                            review,
                            "created_at",
                            None
                        )
                        else None
                    ),
                }
            )

        average_rating = (
            round(
                total_rating / rating_count,
                2
            )
            if rating_count
            else 0
        )

        return JsonResponse(
            {
                "success": True,
                "count": len(review_data),
                "average_rating": average_rating,
                "reviews": review_data,
            }
        )

    # =========================================================
    # PATCH / PUT - Respond to review
    # =========================================================
    if request.method in ["PATCH", "PUT"]:

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        review_id = data.get(
            "review_id"
        )

        if not review_id:
            return JsonResponse(
                {
                    "success": False,
                    "message": "review_id is required."
                },
                status=400
            )

        try:
            review = MerchantReview.objects.get(
                id=review_id,
                merchant=merchant
            )

        except MerchantReview.DoesNotExist:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Review not found."
                },
                status=404
            )

        response_text = str(
            data.get(
                "merchant_response",
                ""
            )
        ).strip()

        if not response_text:
            return JsonResponse(
                {
                    "success": False,
                    "message": (
                        "Merchant response cannot be empty."
                    )
                },
                status=400
            )

        review.reply = response_text
        review.save(update_fields=["reply"])

        return JsonResponse(
            {
                "success": True,
                "message": "Review response saved successfully.",
                "review": {
                    "id": review.id,
                    "merchant_response": review.reply,
                }
            }
        )

    # =========================================================
    # Unsupported method
    # =========================================================
    return JsonResponse(
        {
            "success": False,
            "message": "Method not allowed."
        },
        status=405
    )







@merchant_api_required
def support_api(request):
    """
    Merchant support API.

    GET:
        Return the merchant's support tickets.

    POST:
        Create a new support ticket.

    PATCH / PUT:
        Add a reply/update to an existing ticket.
    """

    # ---------------------------------------------------------
    # Get merchant profile
    # ---------------------------------------------------------
    try:
        merchant = request.user.merchant_profile

    except MerchantProfile.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Merchant profile not found."
            },
            status=404
        )

    # ---------------------------------------------------------
    # Approval check
    # ---------------------------------------------------------
    if not merchant.is_approved:
        return JsonResponse(
            {
                "success": False,
                "message": (
                    "Your shop registration is waiting "
                    "for admin approval."
                )
            },
            status=403
        )

    # =========================================================
    # GET - List support tickets
    # =========================================================
    if request.method == "GET":

        tickets = MerchantSupportTicket.objects.filter(
            merchant=merchant
        ).order_by("-created_at")

        ticket_data = []

        for ticket in tickets[:50]:

            ticket_data.append(
                {
                    "id": ticket.id,

                    "subject": getattr(
                        ticket,
                        "subject",
                        ""
                    ),

                    "message": getattr(ticket, "message", getattr(ticket, "description", "")),

                    "category": getattr(
                        ticket,
                        "category",
                        "General"
                    ),

                    "priority": getattr(
                        ticket,
                        "priority",
                        "Normal"
                    ),

                    "status": getattr(
                        ticket,
                        "status",
                        "Open"
                    ),

                    "response": getattr(
                        ticket,
                        "admin_response",
                        getattr(
                            ticket,
                            "response",
                            ""
                        )
                    ),

                    "created_at": (
                        ticket.created_at.isoformat()
                        if getattr(
                            ticket,
                            "created_at",
                            None
                        )
                        else None
                    ),

                    "updated_at": (
                        ticket.updated_at.isoformat()
                        if getattr(
                            ticket,
                            "updated_at",
                            None
                        )
                        else None
                    ),
                }
            )

        return JsonResponse(
            {
                "success": True,
                "count": len(ticket_data),
                "tickets": ticket_data,
            }
        )

    # =========================================================
    # POST - Create support ticket
    # =========================================================
    if request.method == "POST":

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        subject = str(
            data.get(
                "subject",
                ""
            )
        ).strip()

        message = str(
            data.get(
                "message",
                ""
            )
        ).strip()

        category = str(
            data.get(
                "category",
                "General"
            )
        ).strip()

        priority = str(
            data.get(
                "priority",
                "Normal"
            )
        ).strip()

        if not subject:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Support ticket subject is required."
                },
                status=400
            )

        if not message:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Support ticket message is required."
                },
                status=400
            )

        allowed_priorities = [
            "Low",
            "Normal",
            "High",
            "Urgent",
        ]

        if priority not in allowed_priorities:
            priority = "Normal"

        ticket = MerchantSupportTicket.objects.create(
            merchant=merchant, subject=subject, description=message, status="open"
        )

        return JsonResponse(
            {
                "success": True,
                "message": "Support ticket created successfully.",
                "ticket": {
                    "id": ticket.id,
                    "subject": ticket.subject,
                    "message": ticket.description,
                    "category": "General",
                    "priority": "Normal",
                    "status": ticket.status,
                    "created_at": (
                        ticket.created_at.isoformat()
                        if ticket.created_at
                        else None
                    ),
                }
            },
            status=201
        )

    # =========================================================
    # PATCH / PUT - Update ticket
    # =========================================================
    if request.method in ["PATCH", "PUT"]:

        import json

        try:
            data = json.loads(
                request.body.decode("utf-8")
            )

        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse(
                {
                    "success": False,
                    "message": "Invalid JSON data."
                },
                status=400
            )

        ticket_id = data.get(
            "ticket_id"
        )

        if not ticket_id:
            return JsonResponse(
                {
                    "success": False,
                    "message": "ticket_id is required."
                },
                status=400
            )

        try:
            ticket = MerchantSupportTicket.objects.get(
                id=ticket_id,
                merchant=merchant
            )

        except MerchantSupportTicket.DoesNotExist:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Support ticket not found."
                },
                status=404
            )

        # -----------------------------------------------------
        # Merchant can add additional information/message
        # -----------------------------------------------------
        if "message" in data:

            new_message = str(
                data["message"]
            ).strip()

            if new_message:
                ticket.description = new_message

        # -----------------------------------------------------
        # Merchant can change priority
        # -----------------------------------------------------
        if "priority" in data:

            priority = str(
                data["priority"]
            ).strip()

            allowed_priorities = [
                "Low",
                "Normal",
                "High",
                "Urgent",
            ]

            # Ticket priority is not stored by this model.

        # -----------------------------------------------------
        # Merchant should not close admin-controlled tickets
        # -----------------------------------------------------
        ticket.save()

        return JsonResponse(
            {
                "success": True,
                "message": "Support ticket updated successfully.",
                "ticket": {
                    "id": ticket.id,
                    "subject": ticket.subject,
                    "message": ticket.description,
                    "category": "General",
                    "priority": "Normal",
                    "status": ticket.status,
                }
            }
        )

    # =========================================================
    # Unsupported method
    # =========================================================
    return JsonResponse(
        {
            "success": False,
            "message": "Method not allowed."
        },
        status=405
    )


















@login_required(login_url="merchant_login")
def export_orders_csv(request):
    """
    Export the logged-in merchant's orders as a CSV file.
    """

    # ---------------------------------------------------------
    # Get merchant profile
    # ---------------------------------------------------------
    try:
        merchant = request.user.merchant_profile

    except MerchantProfile.DoesNotExist:
        return JsonResponse(
            {
                "success": False,
                "message": "Merchant profile not found."
            },
            status=404
        )

    # ---------------------------------------------------------
    # Approval check
    # ---------------------------------------------------------
    if not merchant.is_approved:
        return JsonResponse(
            {
                "success": False,
                "message": (
                    "Your shop registration is waiting "
                    "for admin approval."
                )
            },
            status=403
        )

    # ---------------------------------------------------------
    # Only allow GET
    # ---------------------------------------------------------
    if request.method != "GET":
        return JsonResponse(
            {
                "success": False,
                "message": "Method not allowed."
            },
            status=405
        )

    # ---------------------------------------------------------
    # Get this merchant's orders
    # ---------------------------------------------------------
    orders = MerchantOrder.objects.filter(
        merchant=merchant
    ).order_by("-created_at")

    # ---------------------------------------------------------
    # Create CSV response
    # ---------------------------------------------------------
    response = HttpResponse(
        content_type="text/csv; charset=utf-8"
    )

    response["Content-Disposition"] = (
        'attachment; filename="localmart_merchant_orders.csv"'
    )

    writer = csv.writer(response)

    # ---------------------------------------------------------
    # CSV header
    # ---------------------------------------------------------
    writer.writerow(
        [
            "Order ID",
            "Customer Name",
            "Customer Email",
            "Customer Phone",
            "Order Status",
            "Payment Status",
            "Total Amount",
            "Created At",
        ]
    )

    # ---------------------------------------------------------
    # Orders
    # ---------------------------------------------------------
    for order in orders:

        writer.writerow(
            [
                order.id,

                getattr(
                    order,
                    "customer_name",
                    ""
                ),

                getattr(
                    order,
                    "customer_email",
                    ""
                ),

                getattr(
                    order,
                    "customer_phone",
                    ""
                ),

                getattr(
                    order,
                    "status",
                    ""
                ),

                getattr(
                    order,
                    "payment_status",
                    ""
                ),

                str(
                    getattr(
                        order,
                        "total_amount",
                        0
                    )
                ),

                (
                    order.created_at.strftime(
                        "%Y-%m-%d %H:%M:%S"
                    )
                    if getattr(
                        order,
                        "created_at",
                        None
                    )
                    else ""
                ),
            ]
        )

    return response
