from datetime import timedelta
from decimal import Decimal

from django.conf import settings
from django.db.models import Q
from django.utils import timezone

from store.models import Coupon, Order

from .gst import CENT, ZERO, calculate_cart, money


CATEGORY_SOURCE_MAP = {
    "food": "food",
    "grocery": "grocery",
    "fashion": "shopping",
    "shopping": "shopping",
    "electronics": "electronics",
    "home_appliances": "home_appliances",
    "merchant": "",
}


def delivery_charge():
    return money(getattr(settings, "LOCALMART_DELIVERY_CHARGE", "0.00"))


def coupon_usage_count(coupon, customer_email="", customer_user=None):
    now = timezone.now()
    reserved_since = now - timedelta(minutes=30)
    orders = Order.objects.filter(coupon=coupon).filter(
        Q(payment_status__iexact="Paid")
        | Q(payment_status__iexact="Pending", created_at__gte=reserved_since)
    )
    if coupon.usage_limit is not None and orders.count() >= coupon.usage_limit:
        raise ValueError("This coupon has reached its usage limit.")
    if coupon.per_customer_limit is not None:
        customer_orders = orders.none()
        if customer_user is not None and getattr(customer_user, "is_authenticated", False):
            customer_orders = customer_orders | orders.filter(customer_user=customer_user)
        if customer_email:
            customer_orders = customer_orders | orders.filter(customer_email__iexact=customer_email.strip())
        if customer_orders.distinct().count() >= coupon.per_customer_limit:
            raise ValueError("You have already used this coupon the maximum number of times.")


def get_checkout_coupon(code, customer_email="", customer_user=None, check_usage=True):
    code = str(code or "").strip().upper()
    if not code:
        return None
    if "," in code:
        raise ValueError("Only one coupon can be used per order.")
    coupon = Coupon.objects.filter(code=code).first()
    if coupon is None:
        raise ValueError("That coupon code is not valid.")
    now = timezone.now()
    if not coupon.is_currently_valid(now):
        raise ValueError("This coupon is not active yet or has expired.")
    if coupon.first_order_only:
        completed = Order.objects.filter(payment_status__iexact="Paid")
        identity_parts = []
        if customer_user is not None and getattr(customer_user, "is_authenticated", False):
            identity_parts.append(Q(customer_user=customer_user))
        if customer_email:
            identity_parts.append(Q(customer_email__iexact=customer_email.strip()))
        if not identity_parts:
            raise ValueError("Sign in or enter your email to check first-order eligibility.")
        identity = identity_parts[0]
        for part in identity_parts[1:]:
            identity |= part
        completed = completed.filter(identity)
        if completed.exists():
            raise ValueError("This coupon is available on your first completed order only.")
    if check_usage:
        coupon_usage_count(coupon, customer_email, customer_user)
    return coupon


def _eligible_group(line):
    source = str(line.get("gst_source", "")).lower()
    if source != "merchant":
        return CATEGORY_SOURCE_MAP.get(source, "")
    category = str(line.get("category", "")).casefold()
    terms_by_group = {
        "food": ("food", "restaurant", "meal"),
        "grocery": ("grocery", "supermarket", "market", "dairy", "produce", "pantry"),
        "shopping": ("fashion", "shopping", "clothing", "apparel"),
        "electronics": ("electronics", "mobile", "computer"),
        "home_appliances": ("appliance", "home appliance"),
    }
    return next((group for group, terms in terms_by_group.items() if any(term in category for term in terms)), "")


def _allocate_proportionally(amount, lines, weight_for_line):
    amount = money(amount)
    weights = [max(ZERO, money(weight_for_line(line))) for line in lines]
    total_weight = sum(weights, ZERO)
    if amount <= ZERO or total_weight <= ZERO:
        return [ZERO for _ in lines]
    cents = int(amount * 100)
    raw = [Decimal(cents) * weight / total_weight for weight in weights]
    allocated = [int(value) for value in raw]
    remainder = cents - sum(allocated)
    order = sorted(range(len(lines)), key=lambda index: raw[index] - allocated[index], reverse=True)
    for index in order[:remainder]:
        allocated[index] += 1
    return [Decimal(value) / 100 for value in allocated]


def apply_coupon_to_quote(lines, base_totals, coupon=None, delivery_amount=None):
    """Apply configured demo coupons as invoice discounts and recompute GST."""
    delivery_amount = delivery_charge() if delivery_amount is None else money(delivery_amount)
    lines = [dict(line) for line in lines]
    totals = dict(base_totals)
    net_cart_value = money(sum((money(line["price"]) * int(line["quantity"]) for line in lines), ZERO))
    coupon_discount = ZERO
    delivery_discount = ZERO
    eligible_subtotal = ZERO

    if coupon:
        if net_cart_value < money(coupon.minimum_order_amount):
            raise ValueError(
                f"Add items worth ₹{money(coupon.minimum_order_amount):.2f} to use {coupon.code}."
            )
        allowed_groups = set(coupon.eligible_categories or Coupon.CATEGORY_GROUPS)
        configured_products = {str(value).strip().casefold() for value in (coupon.applicable_products or [])}
        eligible = []
        for line in lines:
            group = _eligible_group(line)
            if group and group not in allowed_groups:
                continue
            if not group and coupon.eligible_categories:
                continue
            if coupon.exclude_discounted_products and money(line.get("product_discount_amount", ZERO)) > ZERO:
                continue
            if configured_products:
                source = str(line.get("gst_source", line.get("catalog_source", ""))).casefold()
                product_id = str(line.get("merchant_product_id") or line.get("id") or "").casefold()
                if not configured_products.intersection({f"{source}:{product_id}", product_id}):
                    continue
            eligible.append(line)
        eligible_value = money(sum((money(line["price"]) * int(line["quantity"]) for line in eligible), ZERO))
        eligible_subtotal = eligible_value
        if not eligible:
            raise ValueError(f"{coupon.code} does not apply to the categories in your cart.")
        if eligible_value < money(coupon.minimum_order_amount):
            missing = money(coupon.minimum_order_amount) - eligible_value
            raise ValueError(f"Add ₹{missing:.2f} more in eligible items to use {coupon.code}.")
        eligible_quantity = sum(int(line["quantity"]) for line in eligible)
        if eligible_quantity < coupon.minimum_eligible_quantity:
            missing_quantity = coupon.minimum_eligible_quantity - eligible_quantity
            raise ValueError(f"Add {missing_quantity} more eligible item(s) to use {coupon.code}.")

        if coupon.free_delivery:
            if delivery_amount <= ZERO:
                raise ValueError("There is no delivery charge for this order to waive.")
            delivery_discount = delivery_amount
        else:
            if coupon.discount_type == "percentage":
                coupon_discount = money(eligible_value * Decimal(coupon.discount_value) / Decimal("100"))
            else:
                coupon_discount = min(money(coupon.discount_value), eligible_value)
            if coupon.maximum_discount_amount is not None:
                coupon_discount = min(coupon_discount, money(coupon.maximum_discount_amount))
            coupon_discount = min(coupon_discount, eligible_value)

            allocations = _allocate_proportionally(
                coupon_discount,
                eligible,
                lambda line: Decimal(line["price"]) * int(line["quantity"]),
            )
            for line, allocated in zip(eligible, allocations):
                line["coupon_discount_amount"] = allocated

    coupon_discount = money(coupon_discount)
    delivery_total = money(delivery_amount - delivery_discount)
    other_charges = money(getattr(settings, "LOCALMART_OTHER_CHARGES", "0.00"))
    delivery_taxable_total = ZERO
    delivery_tax_total = ZERO
    delivery_cgst_total = ZERO
    delivery_sgst_total = ZERO
    delivery_igst_total = ZERO
    delivery_mode = getattr(settings, "LOCALMART_DELIVERY_GST_MODE", "allocated")
    if delivery_mode == "allocated":
        delivery_weight = lambda line: max(
            ZERO,
            Decimal(line["price"]) * int(line["quantity"])
            - money(line.get("coupon_discount_amount", ZERO)),
        )
        if sum((delivery_weight(line) for line in lines), ZERO) <= ZERO:
            delivery_weight = lambda line: Decimal(line["price"]) * int(line["quantity"])
        delivery_allocations = _allocate_proportionally(delivery_total, lines, delivery_weight)
    elif delivery_mode == "excluded":
        delivery_allocations = [ZERO for _ in lines]
    else:
        raise ValueError("LOCALMART_DELIVERY_GST_MODE must be 'allocated' or 'excluded'.")
    for line, delivery_share in zip(lines, delivery_allocations):
        line_discount = money(line.get("coupon_discount_amount", ZERO))
        line_base = money(Decimal(line["price"]) * int(line["quantity"]))
        treatment = line["tax_treatment"]
        merchandise_net = max(ZERO, line_base - line_discount)
        rate = Decimal(line["gst_rate"])
        if treatment == "taxable" and line.get("price_includes_gst"):
            merchandise_taxable = money(merchandise_net / (Decimal("1") + rate / Decimal("100")))
            merchandise_tax = money(merchandise_net - merchandise_taxable)
            delivery_tax = money(delivery_share * rate / Decimal("100"))
            taxable = money(merchandise_taxable + delivery_share)
            tax = money(merchandise_tax + delivery_tax)
        else:
            taxable = money(merchandise_net + delivery_share) if treatment in ("taxable", "zero_rated") else ZERO
            tax = money(taxable * rate / Decimal("100")) if treatment == "taxable" else ZERO
            delivery_tax = ZERO
            if treatment == "taxable" and line.get("price_includes_gst"):
                delivery_tax = money(delivery_share * rate / Decimal("100"))
        supplier_state = str(line.get("supplier_state") or totals.get("supplier_state", "Telangana"))
        customer_state = str(line.get("place_of_supply_state") or totals.get("customer_state", ""))
        intra = supplier_state.strip().casefold() == customer_state.strip().casefold()
        delivery_taxable = delivery_share if treatment == "taxable" else ZERO
        delivery_tax_total += delivery_tax
        delivery_taxable_total += delivery_taxable
        cgst = money(tax / 2) if intra else ZERO
        sgst = tax - cgst if intra else ZERO
        igst = tax if not intra else ZERO
        if intra:
            delivery_cgst_total += money(delivery_tax / 2)
            delivery_sgst_total += delivery_tax - money(delivery_tax / 2)
        else:
            delivery_igst_total += delivery_tax
        line.update({
            "taxable_value": taxable,
            "cgst_amount": cgst,
            "sgst_amount": sgst,
            "igst_amount": igst,
            "total_tax": tax,
            "line_total": money(merchandise_net + delivery_tax if line.get("price_includes_gst") else merchandise_net + tax),
            "line_amount": line_base,
            "product_discount_amount": money(line.get("product_discount_amount", ZERO)),
            "coupon_discount_amount": line_discount,
            "delivery_charge_share": delivery_share,
            "delivery_taxable_value": delivery_taxable,
            "delivery_tax": delivery_tax,
        })

    totals.update({
        "coupon_discount": coupon_discount,
        "coupon_eligible_subtotal": eligible_subtotal,
        "delivery_charges": delivery_amount,
        "delivery_discount": delivery_discount,
        "delivery_total": delivery_total,
        "delivery_taxable": delivery_taxable_total,
        "delivery_tax": delivery_tax_total,
        "delivery_cgst": delivery_cgst_total,
        "delivery_sgst": delivery_sgst_total,
        "delivery_igst": delivery_igst_total,
        "taxable_total": ZERO,
        "cgst_total": ZERO,
        "sgst_total": ZERO,
        "igst_total": ZERO,
        "gst_total": ZERO,
        "total": ZERO,
    })
    for line in lines:
        totals["taxable_total"] += money(line["taxable_value"])
        totals["cgst_total"] += money(line["cgst_amount"])
        totals["sgst_total"] += money(line["sgst_amount"])
        totals["igst_total"] += money(line["igst_amount"])
        totals["gst_total"] += money(line["total_tax"])
        totals["total"] += money(line["line_total"])
    totals["total"] += totals["delivery_total"] + other_charges
    totals["other_charges"] = other_charges
    for field in ("coupon_discount", "coupon_eligible_subtotal", "delivery_charges", "delivery_discount", "delivery_total", "delivery_taxable", "delivery_tax", "delivery_cgst", "delivery_sgst", "delivery_igst", "other_charges", "taxable_total", "cgst_total", "sgst_total", "igst_total", "gst_total", "total"):
        totals[field] = money(totals[field])
    return lines, totals


def calculate_checkout_quote(cart, customer_state, coupon_code="", merchant=None,
                             customer_email="", customer_user=None):
    lines, base_totals = calculate_cart(cart, customer_state, merchant)
    coupon = get_checkout_coupon(coupon_code, customer_email, customer_user) if coupon_code else None
    base_totals["customer_state"] = customer_state
    lines, totals = apply_coupon_to_quote(lines, base_totals, coupon)
    return lines, totals, coupon
