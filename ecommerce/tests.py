from datetime import date, timedelta
from decimal import Decimal
import json
from unittest.mock import patch

from django.test import TestCase, override_settings
from django.urls import reverse
from django.contrib.auth.models import User

from ecommerce.gst import calculate_cart
from ecommerce.coupons import calculate_checkout_quote
from merchants.models import MerchantProduct, MerchantProfile
from store.models import Coupon, GSTCatalogProduct, Order, OrderItem


class CustomerSignupValidationTests(TestCase):
    def signup_data(self):
        return {
            "full_name": "Asha Customer",
            "email": "asha-customer@example.com",
            "mobile": "9876543210",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!",
        }

    def test_signup_rejects_non_letter_full_names(self):
        for full_name in ("Asha2 Customer", "Asha-Customer", "Asha_Customer"):
            with self.subTest(full_name=full_name):
                data = self.signup_data()
                data["full_name"] = full_name
                response = self.client.post(
                    reverse("api_signup"),
                    data=json.dumps(data),
                    content_type="application/json",
                )
                self.assertEqual(response.status_code, 400)
                self.assertEqual(
                    response.json()["error"],
                    "Full name can contain letters and spaces only.",
                )
        self.assertFalse(User.objects.filter(email="asha-customer@example.com").exists())

    def test_signup_rejects_mobile_with_letters_or_special_characters(self):
        for mobile in ("98765abc", "98765-43210", "+919876543210", "98765 43210"):
            with self.subTest(mobile=mobile):
                data = self.signup_data()
                data["mobile"] = mobile
                response = self.client.post(
                    reverse("api_signup"),
                    data=json.dumps(data),
                    content_type="application/json",
                )
                self.assertEqual(response.status_code, 400)
                self.assertEqual(
                    response.json()["error"],
                    "Mobile number can contain digits only.",
                )
        self.assertFalse(User.objects.filter(email="asha-customer@example.com").exists())


class CheckoutGSTTests(TestCase):
    def setUp(self):
        self.product = GSTCatalogProduct.objects.create(
            source="grocery",
            product_key="test-rice",
            name="Test rice",
            category="Grocery",
            price=Decimal("100.00"),
            hsn_code="1006",
            gst_rate=Decimal("5.00"),
            tax_treatment="taxable",
            gst_verified=True,
            tax_source_reference="https://cbic-gst.gov.in/gst-goods-services-rates.html",
        )

    def test_intra_state_supply_splits_gst(self):
        lines, totals = calculate_cart(
            [{"id": "test-rice", "gst_source": "grocery", "quantity": 2, "price": "0.01"}],
            "Telangana",
        )
        self.assertEqual(totals["subtotal"], Decimal("200.00"))
        self.assertEqual(totals["cgst_total"], Decimal("5.00"))
        self.assertEqual(totals["sgst_total"], Decimal("5.00"))
        self.assertEqual(totals["igst_total"], Decimal("0.00"))
        self.assertEqual(lines[0]["line_total"], Decimal("210.00"))

    def test_inter_state_supply_uses_igst(self):
        _, totals = calculate_cart(
            [{"id": "test-rice", "gst_source": "grocery", "quantity": 1}],
            "Karnataka",
        )
        self.assertEqual(totals["igst_total"], Decimal("5.00"))
        self.assertEqual(totals["cgst_total"], Decimal("0.00"))
        self.assertEqual(totals["sgst_total"], Decimal("0.00"))

    def test_exempt_item_does_not_generate_tax(self):
        self.product.tax_treatment = "exempt"
        self.product.gst_rate = Decimal("0.00")
        self.product.save()
        _, totals = calculate_cart(
            [{"id": "test-rice", "gst_source": "grocery", "quantity": 1}],
            "Telangana",
        )
        self.assertEqual(totals["gst_total"], Decimal("0.00"))
        self.assertEqual(totals["total"], Decimal("100.00"))

    def test_browser_price_is_ignored(self):
        lines, totals = calculate_cart(
            [{"id": "test-rice", "gst_source": "grocery", "quantity": 1, "price": "99999"}],
            "Telangana",
        )
        self.assertEqual(Decimal(lines[0]["price"]), Decimal("100.00"))
        self.assertEqual(totals["total"], Decimal("105.00"))

    def test_product_tax_rates_12_18_and_28_percent(self):
        for rate in ("12.00", "18.00", "28.00"):
            with self.subTest(rate=rate):
                self.product.gst_rate = Decimal(rate)
                self.product.save(update_fields=["gst_rate"])
                lines, totals = calculate_cart(
                    [{"id": "test-rice", "gst_source": "grocery", "quantity": 1}], "Telangana"
                )
                expected_tax = Decimal(rate).quantize(Decimal("0.01"))
                self.assertEqual(lines[0]["total_tax"], expected_tax)
                self.assertEqual(totals["total"], Decimal("100.00") + expected_tax)

    def test_inclusive_price_extracts_gst_without_adding_it_twice(self):
        self.product.price = Decimal("118.00")
        self.product.gst_rate = Decimal("18.00")
        self.product.price_includes_gst = True
        self.product.save()
        lines, totals = calculate_cart(
            [{"id": "test-rice", "gst_source": "grocery", "quantity": 1}], "Telangana"
        )
        self.assertEqual(lines[0]["taxable_value"], Decimal("100.00"))
        self.assertEqual(lines[0]["total_tax"], Decimal("18.00"))
        self.assertEqual(lines[0]["line_total"], Decimal("118.00"))
        self.assertEqual(totals["total"], Decimal("118.00"))

    def test_decimal_rounding_is_half_up(self):
        self.product.price = Decimal("0.10")
        self.product.save(update_fields=["price"])
        lines, _ = calculate_cart(
            [{"id": "test-rice", "gst_source": "grocery", "quantity": 1}], "Telangana"
        )
        self.assertEqual(lines[0]["total_tax"], Decimal("0.01"))

    def test_zero_rated_treatment_remains_distinct_from_exempt(self):
        self.product.tax_treatment = "zero_rated"
        self.product.gst_rate = Decimal("0.00")
        self.product.save()
        lines, totals = calculate_cart(
            [{"id": "test-rice", "gst_source": "grocery", "quantity": 1}], "Telangana"
        )
        self.assertEqual(lines[0]["tax_treatment"], "zero_rated")
        self.assertEqual(lines[0]["taxable_value"], Decimal("100.00"))
        self.assertEqual(totals["gst_total"], Decimal("0.00"))

    def test_supplier_state_place_of_supply_rule_uses_intra_state_tax(self):
        self.product.place_of_supply_rule = "supplier_state"
        self.product.save(update_fields=["place_of_supply_rule"])
        lines, totals = calculate_cart(
            [{"id": "test-rice", "gst_source": "grocery", "quantity": 1}], "Karnataka"
        )
        self.assertEqual(lines[0]["place_of_supply_state"], "Telangana")
        self.assertEqual(totals["cgst_total"], Decimal("2.50"))
        self.assertEqual(totals["sgst_total"], Decimal("2.50"))
        self.assertEqual(totals["igst_total"], Decimal("0.00"))

    def test_future_tax_rate_effective_date_is_not_used_early(self):
        self.product.tax_effective_from = date.today() + timedelta(days=1)
        self.product.save(update_fields=["tax_effective_from"])
        with self.assertRaisesMessage(ValueError, "not effective yet"):
            calculate_cart([{"id": "test-rice", "gst_source": "grocery", "quantity": 1}], "Telangana")

    def test_unverified_product_tax_profile_is_blocked(self):
        self.product.gst_verified = False
        self.product.save(update_fields=["gst_verified"])
        with self.assertRaisesMessage(ValueError, "not verified"):
            calculate_cart([{"id": "test-rice", "gst_source": "grocery", "quantity": 1}], "Telangana")

    def test_mixed_category_cart_calculates_each_products_rate(self):
        pizza = GSTCatalogProduct.objects.create(
            source="food", product_key="pizza", name="Pizza", category="Food",
            price=Decimal("200.00"), hsn_code="2106", gst_rate=Decimal("18.00"),
            tax_treatment="taxable", gst_verified=True,
            tax_source_reference="https://cbic-gst.gov.in/gst-goods-services-rates.html",
        )
        lines, totals = calculate_cart([
            {"id": "test-rice", "gst_source": "grocery", "quantity": 1},
            {"id": pizza.product_key, "gst_source": "food", "quantity": 1},
        ], "Telangana")
        self.assertEqual([line["gst_rate"] for line in lines], [Decimal("5.00"), Decimal("18.00")])
        self.assertEqual(totals["gst_total"], Decimal("41.00"))
        self.assertEqual(totals["total"], Decimal("341.00"))

    def test_namespaced_mens_fashion_item_uses_static_catalog_for_checkout(self):
        response = self.client.post(
            reverse("checkout_tax_preview"),
            data=json.dumps({
                "cart": [{
                    "id": "men:1",
                    "gst_source": "fashion",
                    "name": "Men Relaxed Fit Solid Cut Away Collar Casual Shirt",
                    "price": "499",
                    "quantity": 1,
                }],
                "customer_state": "Telangana",
            }),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200, response.content)
        self.assertEqual(response.json()["items"][0]["price"], "499.00")
        self.assertEqual(response.json()["totals"]["total"], "523.95")

    def test_order_item_tax_snapshot_survives_product_rate_change(self):
        line = calculate_cart(
            [{"id": "test-rice", "gst_source": "grocery", "quantity": 1}], "Telangana"
        )[0][0]
        order = Order.objects.create(customer_name="Tax buyer", customer_email="tax@example.com", total_amount=Decimal("105.00"))
        item = OrderItem.objects.create(
            order=order, name=line["name"], price=line["price"], quantity=line["quantity"],
            hsn_code=line["hsn_code"], gst_rate=line["gst_rate"], taxable_value=line["taxable_value"],
            total_tax=line["total_tax"], line_total=line["line_total"], tax_treatment=line["tax_treatment"],
        )
        self.product.gst_rate = Decimal("18.00")
        self.product.save(update_fields=["gst_rate"])
        item.refresh_from_db()
        self.assertEqual(item.gst_rate, Decimal("5.00"))
        self.assertEqual(item.total_tax, Decimal("5.00"))


class CheckoutCouponTests(TestCase):
    def setUp(self):
        self.product = GSTCatalogProduct.objects.create(
            source="grocery",
            product_key="coupon-test-rice",
            name="Coupon test rice",
            category="Grocery",
            price=Decimal("1000.00"),
            hsn_code="1006",
            gst_rate=Decimal("5.00"),
            tax_treatment="taxable",
            gst_verified=True,
            tax_source_reference="https://cbic-gst.gov.in/gst-goods-services-rates.html",
        )
        self.cart = [{"id": self.product.product_key, "gst_source": "grocery", "quantity": 1}]

    def make_coupon(self, **overrides):
        fields = {
            "code": "TESTCOUPON",
            "discount_type": "fixed",
            "discount_value": Decimal("50.00"),
            "minimum_order_amount": Decimal("0.00"),
            "maximum_discount_amount": Decimal("50.00"),
            "eligible_categories": ["grocery"],
            "is_active": True,
        }
        fields.update(overrides)
        return Coupon.objects.create(**fields)

    @override_settings(LOCALMART_DELIVERY_CHARGE="40.00")
    def test_percent_coupon_caps_discount_and_recalculates_gst(self):
        coupon = self.make_coupon(
            discount_type="percentage",
            discount_value=Decimal("10.00"),
            maximum_discount_amount=Decimal("50.00"),
            minimum_order_amount=Decimal("500.00"),
        )
        lines, totals, _ = calculate_checkout_quote(self.cart, "Telangana", coupon.code, customer_email="buyer@example.com")
        self.assertEqual(totals["coupon_discount"], Decimal("50.00"))
        self.assertEqual(totals["taxable_total"], Decimal("990.00"))
        self.assertEqual(totals["gst_total"], Decimal("49.50"))
        self.assertEqual(totals["delivery_charges"], Decimal("40.00"))
        self.assertEqual(totals["total"], Decimal("1039.50"))
        self.assertEqual(lines[0]["coupon_discount_amount"], Decimal("50.00"))

    @override_settings(LOCALMART_DELIVERY_CHARGE="40.00")
    def test_fixed_discount_is_capped_at_eligible_value(self):
        self.product.price = Decimal("20.00")
        self.product.save(update_fields=["price"])
        coupon = self.make_coupon(discount_value=Decimal("100.00"), maximum_discount_amount=Decimal("100.00"))
        lines, totals, _ = calculate_checkout_quote(self.cart, "Telangana", coupon.code)
        self.assertEqual(totals["coupon_discount"], Decimal("20.00"))
        self.assertEqual(lines[0]["line_total"], Decimal("2.00"))
        self.assertEqual(totals["total"], Decimal("42.00"))

    @override_settings(LOCALMART_DELIVERY_CHARGE="40.00")
    def test_coupon_reduces_taxable_value_for_inclusive_price(self):
        self.product.price = Decimal("105.00")
        self.product.price_includes_gst = True
        self.product.save(update_fields=["price", "price_includes_gst"])
        coupon = self.make_coupon(discount_value=Decimal("10.00"), maximum_discount_amount=Decimal("10.00"))
        lines, totals, _ = calculate_checkout_quote(self.cart, "Telangana", coupon.code)
        self.assertEqual(lines[0]["line_total"], Decimal("97.00"))
        self.assertEqual(lines[0]["taxable_value"], Decimal("130.48"))  # 90.48 merchandise + 40.00 allocated delivery
        self.assertEqual(totals["total"], Decimal("137.00"))

    @override_settings(LOCALMART_DELIVERY_CHARGE="40.00")
    def test_free_delivery_waives_fee_and_recomputes_delivery_tax(self):
        self.product.price = Decimal("100.00")
        self.product.save(update_fields=["price"])
        coupon = self.make_coupon(
            code="FREESHIPTEST",
            discount_value=Decimal("0.00"),
            maximum_discount_amount=None,
            free_delivery=True,
        )
        _, totals, _ = calculate_checkout_quote(self.cart, "Telangana", coupon.code)
        self.assertEqual(totals["delivery_charges"], Decimal("40.00"))
        self.assertEqual(totals["delivery_discount"], Decimal("40.00"))
        self.assertEqual(totals["gst_total"], Decimal("5.00"))
        self.assertEqual(totals["total"], Decimal("105.00"))

    def test_coupon_minimum_and_category_rules_are_enforced(self):
        coupon = self.make_coupon(minimum_order_amount=Decimal("1200.00"))
        with self.assertRaisesMessage(ValueError, "Add items worth"):
            calculate_checkout_quote(self.cart, "Telangana", coupon.code)
        self.make_coupon(code="SHOPONLY", eligible_categories=["shopping"])
        with self.assertRaisesMessage(ValueError, "does not apply"):
            calculate_checkout_quote(self.cart, "Telangana", "SHOPONLY")

    def test_invalid_coupon_is_rejected(self):
        with self.assertRaisesMessage(ValueError, "not valid"):
            calculate_checkout_quote(self.cart, "Telangana", "NOTREAL")

    def test_coupon_apply_and_remove_endpoints_return_updated_quotes(self):
        coupon = self.make_coupon()
        payload = {
            "cart": self.cart,
            "customer_state": "Telangana",
            "customer_email": "api-coupon@example.com",
            "coupon_code": coupon.code,
        }
        applied = self.client.post(
            reverse("checkout_coupon_apply"), data=json.dumps(payload), content_type="application/json"
        )
        self.assertEqual(applied.status_code, 200, applied.content)
        self.assertEqual(applied.json()["coupon"]["code"], coupon.code)
        self.assertEqual(applied.json()["totals"]["coupon_discount"], "50.00")

        removed = self.client.post(
            reverse("checkout_coupon_remove"), data=json.dumps(payload), content_type="application/json"
        )
        self.assertEqual(removed.status_code, 200, removed.content)
        self.assertIsNone(removed.json()["coupon"])
        self.assertEqual(removed.json()["totals"]["coupon_discount"], "0.00")

    def test_migration_seeds_demo_coupon_codes(self):
        self.assertSetEqual(
            set(Coupon.objects.filter(code__in=["WELCOME10", "SAVE50", "SAVE100", "FREESHIP"]).values_list("code", flat=True)),
            {"WELCOME10", "SAVE50", "SAVE100", "FREESHIP"},
        )

    @override_settings(LOCALMART_DELIVERY_CHARGE="40.00")
    @patch("ecommerce.views.client.order.create", return_value={"id": "order_coupon_test"})
    def test_razorpay_amount_uses_server_coupon_quote(self, _gateway_create):
        self.product.price = Decimal("1000.00")
        self.product.save(update_fields=["price"])
        coupon = self.make_coupon()
        response = self.client.post(
            reverse("create_razorpay_order"),
            data=json.dumps({
                "customer_name": "Test Buyer",
                "customer_email": "coupon-order@example.com",
                "customer_address": "1 Test Street",
                "customer_state": "Telangana",
                "customer_latitude": 17.385,
                "customer_longitude": 78.4867,
                "delivery_location_confirmed": True,
                "coupon_code": coupon.code,
                "cart": [{**self.cart[0], "price": 1, "gst_rate": 28, "hsn_code": "9999", "coupon_discount": 999999}],
            }),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200, response.content)
        payload = response.json()
        self.assertEqual(payload["amount"], 103950)
        order = Order.objects.get(pk=payload["local_order_id"])
        self.assertEqual(order.coupon_code, coupon.code)
        self.assertEqual(order.coupon_discount, Decimal("50.00"))
        self.assertEqual(order.delivery_charges, Decimal("40.00"))
        self.assertEqual(order.total_amount, Decimal("1039.50"))
        self.assertEqual(order.items.get().gst_rate, Decimal("5.00"))
        self.assertEqual(order.items.get().hsn_code, "1006")
        self.assertEqual(
            order.total_amount,
            sum((item.line_total for item in order.items.all()), Decimal("0.00"))
            + order.delivery_charges - order.delivery_discount + order.other_charges,
        )

    @patch("ecommerce.views.send_order_confirmation_email")
    @patch("ecommerce.views.ensure_tracking_session")
    @patch("ecommerce.views.client.order.fetch", return_value={"amount": 12345})
    @patch("ecommerce.views.client.utility.verify_payment_signature")
    def test_payment_verification_is_idempotent_and_checks_amount(
        self, _verify_signature, _fetch_order, _tracking, send_email
    ):
        order = Order.objects.create(
            customer_name="Test Buyer",
            customer_email="verify@example.com",
            total_amount=Decimal("123.45"),
            payment_id="order_verify_test",
            razorpay_order_id="order_verify_test",
        )
        payload = {
            "razorpay_order_id": "order_verify_test",
            "razorpay_payment_id": "pay_verify_test",
            "razorpay_signature": "valid-signature",
            "local_order_id": order.pk,
        }
        first = self.client.post(reverse("verify_payment"), data=json.dumps(payload), content_type="application/json")
        second = self.client.post(reverse("verify_payment"), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(first.status_code, 200, first.content)
        self.assertEqual(second.status_code, 200, second.content)
        self.assertTrue(second.json()["already_verified"])
        self.assertEqual(send_email.call_count, 1)
        self.assertEqual(Order.objects.count(), 1)

    @patch("ecommerce.views.client.order.fetch", return_value={"amount": 1})
    @patch("ecommerce.views.client.utility.verify_payment_signature")
    def test_payment_amount_mismatch_does_not_mark_order_paid(self, _verify_signature, _fetch_order):
        order = Order.objects.create(
            customer_name="Test Buyer",
            customer_email="mismatch@example.com",
            total_amount=Decimal("123.45"),
            payment_id="order_mismatch_test",
            razorpay_order_id="order_mismatch_test",
        )
        response = self.client.post(
            reverse("verify_payment"),
            data=json.dumps({
                "razorpay_order_id": "order_mismatch_test",
                "razorpay_payment_id": "pay_mismatch_test",
                "razorpay_signature": "valid-signature",
                "local_order_id": order.pk,
            }),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        order.refresh_from_db()
        self.assertEqual(order.payment_status, "Pending")

    @patch("ecommerce.views.send_order_confirmation_email")
    @patch("ecommerce.views.ensure_tracking_session")
    @patch("ecommerce.views.client.order.fetch", return_value={"amount": 14700})
    @patch("ecommerce.views.client.utility.verify_payment_signature")
    @patch("ecommerce.views.client.order.create", return_value={"id": "order_stock_retry"})
    def test_payment_retry_does_not_deduct_stock_twice(
        self, _create_gateway, _verify, _fetch, _tracking, _email
    ):
        owner = User.objects.create_user(username="gst-merchant", email="gst-merchant@example.com", password="pass")
        merchant = MerchantProfile.objects.create(
            owner=owner, shop_name="Verified Shop", gst_state="Telangana", is_approved=True,
        )
        product = MerchantProduct.objects.create(
            merchant=merchant, name="Verified item", sku="GST-ITEM", price=Decimal("100.00"), stock=5,
            hsn_code="1006", gst_rate=Decimal("5.00"), tax_treatment="taxable", gst_verified=True,
            tax_source_reference="https://cbic-gst.gov.in/gst-goods-services-rates.html",
        )
        session = self.client.session
        session["merchant_store_cart"] = {"merchant_id": merchant.pk, "items": {str(product.pk): 1}}
        session.save()
        created = self.client.post(reverse("create_razorpay_order"), data=json.dumps({
            "customer_name": "Test Buyer", "customer_email": "stock-buyer@example.com",
            "customer_address": "1 Test Street", "customer_state": "Telangana",
            "customer_latitude": 17.385, "customer_longitude": 78.4867,
            "delivery_location_confirmed": True,
            "cart": [{"id": f"merchant:{merchant.pk}:{product.pk}", "merchant_id": merchant.pk,
                      "merchant_product_id": product.pk, "gst_source": "merchant", "quantity": 1}],
        }), content_type="application/json")
        self.assertEqual(created.status_code, 200, created.content)
        product.refresh_from_db()
        self.assertEqual(product.stock, 4)
        order_id = created.json()["local_order_id"]
        payment_data = {
            "razorpay_order_id": "order_stock_retry", "razorpay_payment_id": "pay_stock_retry",
            "razorpay_signature": "valid-signature", "local_order_id": order_id,
        }
        first = self.client.post(reverse("verify_payment"), data=json.dumps(payment_data), content_type="application/json")
        second = self.client.post(reverse("verify_payment"), data=json.dumps(payment_data), content_type="application/json")
        self.assertEqual(first.status_code, 200, first.content)
        self.assertEqual(second.status_code, 200, second.content)
        product.refresh_from_db()
        self.assertEqual(product.stock, 4)
        self.assertEqual(Order.objects.count(), 1)
