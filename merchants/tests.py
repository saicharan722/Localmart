import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from types import SimpleNamespace

from ecommerce.views import _create_order_with_inventory, _restore_order_inventory, _validate_merchant_store_checkout_lines
from .models import MerchantCategory, MerchantProduct, MerchantProfile
from store.models import Order


User = get_user_model()


class PublicMerchantStoreTests(TestCase):
    def setUp(self):
        self.owner_a = User.objects.create_user(username="merchant-a", password="test-password")
        self.owner_b = User.objects.create_user(username="merchant-b", password="test-password")
        self.store_a = MerchantProfile.objects.create(
            owner=self.owner_a,
            shop_name="Ramesh General Stores",
            address="Main Road",
            is_approved=True,
        )
        self.store_b = MerchantProfile.objects.create(
            owner=self.owner_b,
            shop_name="Other Local Store",
            is_approved=True,
        )
        self.pending_owner = User.objects.create_user(username="pending-merchant", password="test-password")
        self.pending_store = MerchantProfile.objects.create(
            owner=self.pending_owner,
            shop_name="Pending Shop",
        )
        self.category_a = MerchantCategory.objects.create(merchant=self.store_a, name="Dairy")
        self.category_b = MerchantCategory.objects.create(merchant=self.store_b, name="Snacks")
        self.milk = MerchantProduct.objects.create(
            merchant=self.store_a,
            category=self.category_a,
            name="Fresh Milk",
            sku="MILK-1",
            description="Daily dairy product",
            price="52.00",
            compare_at_price="60.00",
            stock=8,
        )
        self.other_product = MerchantProduct.objects.create(
            merchant=self.store_b,
            category=self.category_b,
            name="Other Merchant Chips",
            sku="CHIPS-1",
            price="25.00",
            stock=9,
        )
        MerchantProduct.objects.create(
            merchant=self.store_a,
            name="Inactive Item",
            sku="INACTIVE-1",
            price="10.00",
            stock=9,
            is_active=False,
        )
        MerchantProduct.objects.create(
            merchant=self.store_a,
            name="Out of Stock Item",
            sku="EMPTY-1",
            price="10.00",
            stock=0,
        )

    def test_home_only_lists_approved_stores_and_uses_real_shop_url(self):
        response = self.client.get(reverse("index"))
        self.assertContains(response, "Ramesh General Stores")
        self.assertContains(response, reverse("merchant_store", args=[self.store_a.slug]))
        self.assertNotContains(response, "Pending Shop")

    def test_public_store_shows_only_own_active_in_stock_products(self):
        response = self.client.get(reverse("merchant_store", args=[self.store_a.slug]))
        self.assertEqual(response.status_code, 200)
        self.assertIn("csrftoken", response.cookies)
        self.assertContains(response, "Fresh Milk")
        self.assertNotContains(response, "Other Merchant Chips")
        self.assertNotContains(response, "Inactive Item")
        self.assertNotContains(response, "Out of Stock Item")
        self.assertContains(response, reverse("merchant_store_cart", args=[self.store_a.slug]))

    def test_search_and_category_filter_stay_within_store(self):
        response = self.client.get(
            reverse("merchant_store", args=[self.store_a.slug]),
            {"q": "milk", "category": self.category_a.pk},
        )
        self.assertContains(response, "Fresh Milk")
        self.assertNotContains(response, "Other Merchant Chips")

    def test_pending_store_is_not_public_and_approval_makes_it_public(self):
        url = reverse("merchant_store", args=[self.pending_store.slug])
        self.assertEqual(self.client.get(url).status_code, 404)
        self.pending_store.is_approved = True
        self.pending_store.save(update_fields=["is_approved"])
        self.assertEqual(self.client.get(url).status_code, 200)

    def test_cart_and_wishlist_actions_are_scoped_to_store_products(self):
        add_url = reverse("merchant_store_cart_add", args=[self.store_a.slug, self.milk.pk])
        response = self.client.post(add_url)
        self.assertEqual(response.status_code, 200, response.content)
        self.assertEqual(response.json()["count"], 1)
        add_more = self.client.post(add_url, data=json.dumps({"action": "increase"}), content_type="application/json")
        self.assertEqual(add_more.json()["quantity"], 2)
        cart_page = self.client.get(reverse("merchant_store_cart", args=[self.store_a.slug]))
        self.assertEqual(cart_page.status_code, 200)
        self.assertContains(cart_page, "Fresh Milk")
        self.assertContains(cart_page, "₹104.00")
        decrease = self.client.post(add_url, data=json.dumps({"action": "decrease"}), content_type="application/json")
        self.assertEqual(decrease.json()["quantity"], 1)
        removed = self.client.post(add_url, data=json.dumps({"action": "remove"}), content_type="application/json")
        self.assertEqual(removed.json()["count"], 0)
        self.assertEqual(
            self.client.post(reverse("merchant_store_cart_add", args=[self.store_a.slug, self.other_product.pk])).status_code,
            404,
        )
        wishlist_url = reverse("merchant_store_wishlist_toggle", args=[self.store_a.slug, self.milk.pk])
        self.assertTrue(self.client.post(wishlist_url).json()["active"])
        self.assertFalse(self.client.post(wishlist_url).json()["active"])

    def test_admin_delete_requires_admin_and_removes_store_catalog(self):
        delete_url = reverse("admin_delete_merchant", args=[self.store_a.pk])
        pending_delete_url = reverse("admin_delete_merchant", args=[self.pending_store.pk])
        self.assertEqual(self.client.post(delete_url).status_code, 403)

        admin_user = User.objects.create_user(
            username="delete-admin", password="test-password", is_staff=True,
        )
        self.client.force_login(admin_user)
        session = self.client.session
        session["admin_authenticated"] = True
        session.save()
        pending_response = self.client.post(pending_delete_url)
        self.assertEqual(pending_response.status_code, 400)
        self.assertTrue(MerchantProfile.objects.filter(pk=self.pending_store.pk).exists())
        response = self.client.post(delete_url)

        self.assertEqual(response.status_code, 200)
        self.assertFalse(MerchantProfile.objects.filter(pk=self.store_a.pk).exists())
        self.assertFalse(MerchantProduct.objects.filter(pk=self.milk.pk).exists())
        self.assertTrue(User.objects.filter(pk=self.owner_a.pk).exists())
        self.assertEqual(self.client.get(reverse("merchant_store", args=[self.store_a.slug])).status_code, 404)

    def test_checkout_uses_database_price_for_merchant_items(self):
        session = self.client.session
        session["merchant_store_cart"] = {
            "merchant_id": self.store_a.pk,
            "items": {str(self.milk.pk): 2},
        }
        session.save()
        checkout = self.client.get(reverse("checkout"))
        self.assertEqual(checkout.status_code, 200)
        cart = json.loads(checkout.context["electronics_checkout_cart"])
        merchant_line = next(item for item in cart if item.get("merchant_product_id") == self.milk.pk)
        self.assertEqual(merchant_line["price"], float(self.milk.price))
        self.assertEqual(merchant_line["quantity"], 2)

        merchant_line["price"] = 0.01
        request = SimpleNamespace(session={
            "merchant_store_cart": {
                "merchant_id": self.store_a.pk,
                "items": {str(self.milk.pk): 2},
            },
        })
        verified_cart, verified_merchant = _validate_merchant_store_checkout_lines(request, [merchant_line])
        verified_line = verified_cart[0]
        self.assertEqual(verified_merchant, self.store_a)
        self.assertEqual(verified_line["price"], str(self.milk.price))

    def test_placing_merchant_order_reduces_and_reports_remaining_stock(self):
        order = _create_order_with_inventory(
            {
                "customer_name": "Test Customer",
                "customer_email": "customer@example.com",
                "merchant_profile": self.store_a,
                "total_amount": "109.20",
                "payment_id": "razorpay-stock-test",
            },
            [{
                "merchant_product_id": self.milk.pk,
                "name": self.milk.name,
                "category": "Merchant Store",
                "price": str(self.milk.price),
                "quantity": 2,
                "image": "",
            }],
            self.store_a,
        )

        self.milk.refresh_from_db()
        self.assertEqual(self.milk.stock, 6)
        self.assertEqual(order.items.get().merchant_product, self.milk)
        self.assertTrue(order.items.get().stock_deducted)

        self.client.force_login(self.owner_a)
        response = self.client.get(reverse("merchant_products_api"))
        stock = next(
            product["stock"]
            for product in response.json()["products"]
            if product["id"] == self.milk.pk
        )
        self.assertEqual(stock, 6)

    def test_cancelled_order_restores_reserved_stock_once(self):
        order = _create_order_with_inventory(
            {"customer_name": "Test Customer", "customer_email": "customer@example.com",
             "merchant_profile": self.store_a, "total_amount": "52.00", "payment_id": "restore-test"},
            [{"merchant_product_id": self.milk.pk, "name": self.milk.name,
              "price": str(self.milk.price), "quantity": 3}],
            self.store_a,
        )
        self.milk.refresh_from_db()
        self.assertEqual(self.milk.stock, 5)
        self.assertEqual(_restore_order_inventory(order), 1)
        self.assertEqual(_restore_order_inventory(order), 0)
        self.milk.refresh_from_db()
        self.assertEqual(self.milk.stock, 8)
        self.assertFalse(order.items.get().stock_deducted)

    def test_razorpay_failure_releases_only_the_checkout_sessions_reservation(self):
        order = _create_order_with_inventory(
            {"customer_name": "Test Customer", "customer_email": "customer@example.com",
             "merchant_profile": self.store_a, "total_amount": "52.00",
             "razorpay_order_id": "rzp-stock-failure", "payment_id": "rzp-stock-failure"},
            [{"merchant_product_id": self.milk.pk, "name": self.milk.name,
              "price": str(self.milk.price), "quantity": 2}],
            self.store_a,
        )
        session = self.client.session
        session["pending_inventory_orders"] = [order.pk]
        session.save()
        response = self.client.post(
            reverse("razorpay_payment_failed"),
            data=json.dumps({"local_order_id": order.pk, "razorpay_order_id": "rzp-stock-failure"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.milk.refresh_from_db()
        order.refresh_from_db()
        self.assertEqual(self.milk.stock, 8)
        self.assertEqual(order.payment_status, "Failed")
        self.assertFalse(order.items.get().stock_deducted)

    def test_multiple_products_are_reserved_and_restored(self):
        second_product = MerchantProduct.objects.create(
            merchant=self.store_a, name="Rice", sku="RICE-1", price="50.00", stock=20,
        )
        order = _create_order_with_inventory(
            {"customer_name": "Test Customer", "customer_email": "customer@example.com",
             "merchant_profile": self.store_a, "total_amount": "152.00", "payment_id": "multi-stock-test"},
            [{"merchant_product_id": self.milk.pk, "name": self.milk.name, "price": "52.00", "quantity": 1},
             {"merchant_product_id": second_product.pk, "name": second_product.name, "price": "50.00", "quantity": 2}],
            self.store_a,
        )
        self.milk.refresh_from_db()
        second_product.refresh_from_db()
        self.assertEqual((self.milk.stock, second_product.stock), (7, 18))
        self.assertEqual(order.items.filter(stock_deducted=True).count(), 2)
        _restore_order_inventory(order)
        self.milk.refresh_from_db()
        second_product.refresh_from_db()
        self.assertEqual((self.milk.stock, second_product.stock), (8, 20))

    def test_order_cannot_overdraw_merchant_stock(self):
        with self.assertRaises(ValueError):
            _create_order_with_inventory(
                {
                    "customer_name": "Test Customer",
                    "customer_email": "customer@example.com",
                    "merchant_profile": self.store_a,
                    "total_amount": "468.00",
                    "payment_id": "razorpay-stock-overdraw-test",
                },
                [{
                    "merchant_product_id": self.milk.pk,
                    "name": self.milk.name,
                    "price": str(self.milk.price),
                    "quantity": 9,
                }],
                self.store_a,
            )

        self.milk.refresh_from_db()
        self.assertEqual(self.milk.stock, 8)
        self.assertFalse(Order.objects.filter(payment_id="razorpay-stock-overdraw-test").exists())

    def test_merchant_can_edit_product_sku_without_reusing_another_sku(self):
        self.client.force_login(self.owner_a)
        url = reverse("merchant_product_api", args=[self.milk.pk])

        response = self.client.patch(
            url,
            data=json.dumps({"sku": "MILK-UPDATED"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.milk.refresh_from_db()
        self.assertEqual(self.milk.sku, "MILK-UPDATED")

        duplicate_response = self.client.patch(
            url,
            data=json.dumps({"sku": "INACTIVE-1"}),
            content_type="application/json",
        )
        self.assertEqual(duplicate_response.status_code, 400)
        self.milk.refresh_from_db()
        self.assertEqual(self.milk.sku, "MILK-UPDATED")

    def test_sku_validation_and_product_ownership(self):
        self.client.force_login(self.owner_a)
        create_url = reverse("merchant_products_api")
        valid = self.client.post(create_url, data=json.dumps({
            "name": "Valid SKU Product", "sku": "  rice.new_01  ", "price": "10.00", "stock": 20,
        }), content_type="application/json")
        self.assertEqual(valid.status_code, 201)
        created = MerchantProduct.objects.get(pk=valid.json()["product"]["id"])
        self.assertEqual(created.sku, "RICE.NEW_01")

        duplicate_create = self.client.post(create_url, data=json.dumps({
            "name": "Duplicate SKU Product", "sku": "rice.new_01", "price": "10.00", "stock": 1,
        }), content_type="application/json")
        self.assertEqual(duplicate_create.status_code, 400)

        invalid = self.client.post(create_url, data=json.dumps({
            "name": "Bad SKU Product", "sku": "bad sku", "price": "10.00", "stock": 1,
        }), content_type="application/json")
        self.assertEqual(invalid.status_code, 400)

        self.client.force_login(self.owner_b)
        cross_merchant_edit = self.client.patch(
            reverse("merchant_product_api", args=[self.milk.pk]),
            data=json.dumps({"sku": "STOLEN-SKU"}),
            content_type="application/json",
        )
        self.assertEqual(cross_merchant_edit.status_code, 404)
        self.milk.refresh_from_db()
        self.assertEqual(self.milk.sku, "MILK-1")

    def test_unauthenticated_merchant_api_returns_json_401(self):
        response = self.client.get(reverse("merchant_products_api"))

        self.assertEqual(response.status_code, 401)
        self.assertEqual(response["Content-Type"], "application/json")
        self.assertEqual(
            response.json()["message"],
            "Your merchant session has expired. Please log in again.",
        )

    def merchant_registration_data(self):
        return {
            "shop_name": "Community Market",
            "owner_name": "Asha Owner",
            "email": "new-merchant@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!",
            "mobile": "9876543210",
        }

    def test_registration_rejects_non_letter_shop_and_owner_names(self):
        for field, value, message in (
            ("shop_name", "Market 24", "Shop name can contain letters and spaces only."),
            ("shop_name", "Market-Shop", "Shop name can contain letters and spaces only."),
            ("owner_name", "Asha2 Owner", "Owner name can contain letters and spaces only."),
            ("owner_name", "Asha_Owner", "Owner name can contain letters and spaces only."),
        ):
            with self.subTest(field=field, value=value):
                data = self.merchant_registration_data()
                data[field] = value
                response = self.client.post(reverse("merchant_register"), data)
                self.assertContains(response, message)
        self.assertFalse(User.objects.filter(email="new-merchant@example.com").exists())

    def test_registration_rejects_mobile_with_letters_or_special_characters(self):
        for mobile in ("98765 43210", "98765-43210", "+919876543210", "98765abc"):
            with self.subTest(mobile=mobile):
                data = self.merchant_registration_data()
                data["mobile"] = mobile
                response = self.client.post(reverse("merchant_register"), data)
                self.assertContains(response, "Mobile number can contain digits only.")
        self.assertFalse(User.objects.filter(email="new-merchant@example.com").exists())

    def test_registration_approval_dashboard_product_and_public_store_flow(self):
        registration = self.client.post(reverse("merchant_register"), {
            "shop_name": "New Community Market",
            "owner_name": "Asha Owner",
            "email": "asha-market@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!",
            "mobile": "9876543210",
        })
        self.assertEqual(registration.status_code, 302)
        merchant_user = User.objects.get(email="asha-market@example.com")
        merchant = MerchantProfile.objects.get(owner=merchant_user)
        self.assertFalse(merchant.is_approved)
        self.assertNotContains(self.client.get(reverse("index")), "New Community Market")

        admin_user = User.objects.create_user(
            username="store-admin", password="test-password", is_staff=True,
        )
        self.client.force_login(admin_user)
        admin_session = self.client.session
        admin_session["admin_authenticated"] = True
        admin_session.save()
        approval = self.client.post(reverse("admin_approve_merchant", args=[merchant.pk]))
        self.assertEqual(approval.status_code, 200)
        merchant.refresh_from_db()
        self.assertTrue(merchant.is_approved)
        self.assertContains(self.client.get(reverse("index")), "New Community Market")

        self.client.force_login(merchant_user)
        product_response = self.client.post(
            reverse("merchant_products_api"),
            data=json.dumps({
                "name": "Merchant Dashboard Oats",
                "sku": "OATS-NEW",
                "price": "88.00",
                "stock": 12,
            }),
            content_type="application/json",
        )
        self.assertEqual(product_response.status_code, 201)
        store_response = self.client.get(reverse("merchant_store", args=[merchant.slug]))
        self.assertContains(store_response, "Merchant Dashboard Oats")
