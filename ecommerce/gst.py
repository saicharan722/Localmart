import re
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from functools import lru_cache
from pathlib import Path
from types import SimpleNamespace

from django.conf import settings

from electronics.models import ElectronicsProduct
from merchants.models import MerchantProduct
from products.models import Product
from store.models import GSTCatalogProduct

CENT = Decimal("0.01")
ZERO = Decimal("0.00")
CHECKOUT_GST_RATE = Decimal("5.00")
SUPPLIER_STATE = getattr(settings, "GST_SUPPLIER_STATE", "Telangana")
INDIAN_STATES = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
UT_STATES = {"Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"}


def money(value):
    return Decimal(str(value)).quantize(CENT, rounding=ROUND_HALF_UP)


@lru_cache(maxsize=4)
def _static_catalog(source):
    """Load static category prices from their existing frontend catalog files."""
    static_dir = Path(__file__).resolve().parent / "static" / "js"
    category_files = {
        "food": ("cuisineMenus.js",),
        "grocery": (
            "atta-rice-oil-dals.js", "breakfast-sauces.js", "dairy-bread-eggs.js",
            "drinks-juices.js", "fruits-vegetables.js", "ice-cream-tubs.js",
            "masala-dry-fruits-more.js", "packaged-food.js", "sweet-cravings.js",
            "tea-coffee-more.js", "grocery.js",
        ),
        "fashion": ("fashion.js", "fashion-men.js", "fashion-women.js", "fashion-shared.js"),
        "shopping": ("fashion.js", "fashion-men.js", "fashion-women.js", "fashion-shared.js"),
    }
    catalog = {}
    for filename in category_files.get(source, ()):
        try:
            content = (static_dir / filename).read_text(encoding="utf-8")
        except OSError:
            continue
        for block in re.findall(r"\{[^{}]*\}", content, flags=re.DOTALL):
            product_id = re.search(r"\bid\s*:\s*(?:['\"]([^'\"]+)['\"]|(\d+))", block)
            name = re.search(r"\bname\s*:\s*(['\"])(.*?)\1", block, flags=re.DOTALL)
            price = re.search(r"\bprice\s*:\s*(\d+(?:\.\d+)?)", block)
            category = re.search(r"\bcategory\s*:\s*(['\"])(.*?)\1", block, flags=re.DOTALL)
            image = re.search(r"\bimage\s*:\s*(['\"])(.*?)\1", block, flags=re.DOTALL)
            if not (product_id and name and price):
                continue
            product_key = product_id.group(1) or product_id.group(2)
            key = (product_key, name.group(2).strip().casefold())
            catalog[key] = SimpleNamespace(
                pk=product_key,
                name=name.group(2).strip(),
                price=Decimal(price.group(1)),
                category=category.group(2).strip() if category else source.title(),
                image=image.group(2) if image else "",
                hsn_code="",
                tax_classification="",
                tax_effective_from=None,
                tax_source_reference="",
                place_of_supply_rule="delivery_state",
                supplier_state=SUPPLIER_STATE,
                price_includes_gst=False,
            )
    return catalog


def _fashion_product_for_line(submitted, key):
    """Resolve demo fashion products from the server-owned FASHION_PRODUCTS list.

    Older browser carts can contain a stale sale price or product name. Resolve
    the stable catalog ID and use its current server-side price instead of
    rejecting an otherwise valid cart item.
    """
    from ecommerce.views import FASHION_PRODUCTS

    lookup_key = key.rsplit(":", 1)[-1]
    product_data = next((
        item for item in FASHION_PRODUCTS
        if str(item.get("id", "")) == lookup_key
    ), None)
    if product_data is None:
        return None
    return SimpleNamespace(
        pk=lookup_key,
        name=product_data["name"],
        price=Decimal(str(product_data["price"])),
        category=product_data.get("category", "Fashion"),
        image=product_data.get("image", ""),
        hsn_code="",
        tax_classification="",
        tax_effective_from=None,
        tax_source_reference="",
        place_of_supply_rule="delivery_state",
        supplier_state=SUPPLIER_STATE,
        price_includes_gst=False,
    )


def _product_for_line(submitted, merchant):
    source = str(submitted.get("gst_source", submitted.get("catalog_source", ""))).lower()
    key = str(submitted.get("id", ""))
    product = None
    if source == "electronics" and key.isdigit():
        product = ElectronicsProduct.objects.filter(pk=int(key), is_active=True).first()
    elif source == "home_appliances" and key.isdigit():
        product = Product.objects.filter(pk=int(key)).first()
    elif source == "merchant":
        product = MerchantProduct.objects.filter(
            pk=submitted.get("merchant_product_id"), merchant=merchant, is_active=True
        ).first()
    elif source in ("food", "grocery", "fashion", "shopping"):
        product = GSTCatalogProduct.objects.filter(source=source, product_key=key, is_active=True).first()
        if product is None and source == "fashion" and ":" in key:
            product = GSTCatalogProduct.objects.filter(
                source=source, product_key=key.rsplit(":", 1)[-1], is_active=True
            ).first()
        if product is None and submitted.get("name"):
            product = GSTCatalogProduct.objects.filter(
                source=source, name__iexact=str(submitted["name"]).strip(), is_active=True
            ).first()
        if product is None and source in {"food", "grocery", "fashion", "shopping"}:
            static_catalog = _static_catalog(source)
            product_keys = [key]
            if source in {"fashion", "shopping"} and ":" in key:
                product_keys.append(key.rsplit(":", 1)[-1])
            product_name = str(submitted.get("name", "")).strip().casefold()
            static_product = next(
                (static_catalog.get((product_key, product_name)) for product_key in product_keys
                 if static_catalog.get((product_key, product_name)) is not None),
                None,
            )
            if static_product is not None:
                try:
                    submitted_price = money(submitted.get("price", ""))
                except (InvalidOperation, TypeError, ValueError):
                    submitted_price = None
                if submitted_price == money(static_product.price):
                    product = static_product
        if product is None and source in {"fashion", "shopping"}:
            product = _fashion_product_for_line(submitted, key)
    else:
        raise ValueError(f"{submitted.get('name', 'A cart item')} has no valid catalog source.")
    if product is None:
        raise ValueError(f"{submitted.get('name', 'A cart item')} needs an active product record before checkout.")
    return source, product


def _verified_tax_profile(product):
    # Use a product's verified GST setup when an administrator has supplied
    # one. Existing, unverified catalog entries keep the project's historic
    # 5% checkout fallback so existing carts remain payable.
    hsn = str(getattr(product, "hsn_code", "") or "").strip()
    if getattr(product, "gst_verified", False) and getattr(product, "gst_rate", None) is not None:
        rate = money(product.gst_rate)
        treatment = str(getattr(product, "tax_treatment", "taxable") or "taxable")
        if treatment not in {"taxable", "exempt", "zero_rated", "nil_rated"}:
            treatment = "taxable"
        return rate, treatment, hsn
    return CHECKOUT_GST_RATE, "taxable", hsn


def _money_for_price(amount, rate, treatment, includes_gst):
    """Return taxable base and tax from an exclusive or inclusive selling price."""
    if treatment != "taxable":
        return (ZERO if treatment == "exempt" else amount), ZERO
    if includes_gst:
        taxable = money(amount / (Decimal("1") + rate / Decimal("100")))
        return taxable, money(amount - taxable)
    return amount, money(amount * rate / Decimal("100"))


def calculate_cart(cart, customer_state, merchant=None):
    """Resolve database prices and verified tax data; never trust browser totals."""
    result = []
    totals = {key: ZERO for key in (
        "subtotal", "discount_total", "taxable_total", "cgst_total", "sgst_total",
        "igst_total", "gst_total", "total",
    )}
    for submitted in cart:
        if not isinstance(submitted, dict):
            raise ValueError("The cart contains an invalid item.")
        try:
            quantity = int(submitted.get("quantity", 1))
        except (TypeError, ValueError):
            raise ValueError("Product quantity is invalid.")
        if quantity < 1 or quantity > 99:
            raise ValueError("Product quantities must be between 1 and 99.")
        source, product = _product_for_line(submitted, merchant)
        rate, treatment, hsn = _verified_tax_profile(product)

        if source == "electronics":
            unit_price, original_unit_price = money(product.discounted_price), money(product.price)
        elif source == "home_appliances":
            unit_price, original_unit_price = money(product.discounted_price), money(product.price)
        else:
            unit_price = money(product.price)
            original_unit_price = money(getattr(product, "compare_at_price", None) or product.price) if source == "merchant" else unit_price
        if source in ("electronics", "home_appliances") and getattr(product, "stock", quantity) < quantity:
            raise ValueError(f"Insufficient stock for {product.name}.")

        # Add the requested 5% to the listed merchandise subtotal.
        unit_price_includes_gst = bool(getattr(product, "price_includes_gst", False))
        original_line = money(original_unit_price * quantity)
        line_amount = money(unit_price * quantity)
        product_discount = money(max(original_line - line_amount, ZERO))
        taxable, tax = _money_for_price(line_amount, rate, treatment, unit_price_includes_gst)

        if source == "merchant":
            supplier_state = (merchant.gst_state or "").strip() if merchant else ""
            if not supplier_state:
                supplier_state = SUPPLIER_STATE
        else:
            supplier_state = str(getattr(product, "supplier_state", "") or SUPPLIER_STATE).strip()
        customer = str(customer_state).strip()
        if not supplier_state or not customer:
            raise ValueError(f"Supplier and delivery states are required to determine GST for {product.name}.")
        place_rule = str(getattr(product, "place_of_supply_rule", "delivery_state"))
        if place_rule not in {"delivery_state", "supplier_state"}:
            raise ValueError(f"{product.name} needs a valid place-of-supply rule before checkout.")
        place_of_supply_state = customer if place_rule == "delivery_state" else supplier_state
        intra = supplier_state.casefold() == place_of_supply_state.casefold()
        cgst = money(tax / 2) if intra else ZERO
        sgst = money(tax - cgst) if intra else ZERO
        igst = tax if not intra else ZERO
        category = getattr(product, "category", "")
        category = str(category) if category else ""
        line_total = line_amount if unit_price_includes_gst else money(line_amount + tax)
        line = {
            **submitted,
            "name": product.name,
            "category": category,
            "price": unit_price,
            "quantity": quantity,
            "original_line_amount": original_line,
            "product_discount_amount": product_discount,
            "discount_amount": product_discount,
            "price_includes_gst": unit_price_includes_gst,
            "line_amount": line_amount,
            "hsn_code": hsn,
            "tax_classification": getattr(product, "tax_classification", ""),
            "tax_effective_from": getattr(product, "tax_effective_from", None),
            "tax_source_reference": getattr(product, "tax_source_reference", ""),
            "gst_rate": rate,
            "tax_treatment": treatment,
            "taxable_value": taxable,
            "supplier_state": supplier_state,
            "customer_state": customer,
            "place_of_supply_state": place_of_supply_state,
            "place_of_supply_rule": place_rule,
            "cgst_rate": money(rate / 2) if intra else ZERO,
            "sgst_rate": money(rate / 2) if intra else ZERO,
            "igst_rate": rate if not intra else ZERO,
            "cgst_amount": cgst,
            "sgst_amount": sgst,
            "igst_amount": igst,
            "total_tax": tax,
            "line_total": line_total,
            "image": getattr(product, "image", "") or submitted.get("image", "") or "",
        }
        result.append(line)
        totals["subtotal"] += original_line
        totals["discount_total"] += product_discount
        totals["taxable_total"] += taxable
        totals["cgst_total"] += cgst
        totals["sgst_total"] += sgst
        totals["igst_total"] += igst
        totals["gst_total"] += tax
        totals["total"] += line_total
    return result, {key: money(value) for key, value in totals.items()}
