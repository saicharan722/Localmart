document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("paypal-button-container");

    const cartKeys = [
        "cart",
        "localmartFashionCart",
        "localmartFashionMenCart"
    ];

    function getCart() {
        const items = [];
        const seen = new Set();
        cartKeys.forEach(key => {
            try {
                const stored = JSON.parse(localStorage.getItem(key) || "[]");
                if (!Array.isArray(stored)) return;
                stored.forEach(item => {
                    const id = String(item.id ?? item.name ?? "product");
                    if (seen.has(`${key}:${id}`)) return;
                    seen.add(`${key}:${id}`);
                    items.push(item);
                });
            } catch (error) {
                console.error(`Unable to read ${key}:`, error);
            }
        });
        return items;
    }

    const cart = getCart();
    const checkoutItems = document.getElementById("checkoutItems");
    const subtotalElement = document.getElementById("checkoutSubtotal");
    const taxElement = document.getElementById("checkoutTax");
    const totalElement = document.getElementById("checkoutTotal");
    const subtotal = cart.reduce(
        (total, item) => total + Number(item.price || 0) * Number(item.quantity || 1),
        0
    );
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    if (checkoutItems) {
        checkoutItems.innerHTML = cart.length
            ? cart.map(item => `
                <div class="d-flex gap-3 align-items-center mb-3">
                    <img src="${item.image || ""}" alt="${item.name || "Product"}"
                         style="width:64px;height:64px;object-fit:cover;border-radius:8px"
                         onerror="this.style.display='none'">
                    <div class="flex-grow-1">
                        <strong>${item.name || "Product"}</strong>
                        <div class="text-muted small">Qty: ${Number(item.quantity || 1)}</div>
                    </div>
                    <strong>₹${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}</strong>
                </div>
            `).join("")
            : `<div class="alert alert-warning">Your cart is empty.</div>`;
    }

    if (subtotalElement) subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `₹${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `₹${total.toFixed(2)}`;

    if (!container || typeof paypal === "undefined") {
        return;
    }

    function customerDetails() {
        const cart = getCart();
        const restaurantNames = [...new Set(cart.map(item => String(item.restaurantName || item.restaurant_name || "").trim()).filter(Boolean))];
        return {
            customer_name: document.getElementById("customerName")?.value.trim() || "",
            customer_email: document.getElementById("customerEmail")?.value.trim() || "",
            customer_phone: document.getElementById("customerPhone")?.value.trim() || "",
            customer_address: document.getElementById("customerAddress")?.value.trim() || "",
            restaurant_name: restaurantNames.length === 1 ? restaurantNames[0] : ""
        };
    }

    function resetButton() {
        container.classList.remove("opacity-50");
    }

    paypal.Buttons({
        style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal" },
        onClick: function (data, actions) {
            const details = customerDetails();
            if (!details.customer_name || !details.customer_email || !details.customer_phone || !details.customer_address) {
                alert("Please enter all delivery details.");
                return actions.reject();
            }
            if (!getCart().length) {
                alert("Your cart is empty. Please add a product first.");
                return actions.reject();
            }
            return actions.resolve();
        },
        createOrder: async function () {
            const response = await fetch("/api/paypal/create-order/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...customerDetails(), cart: getCart() })
            });
            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || "Unable to create PayPal order.");
            }
            sessionStorage.setItem("localmartPaypalLocalOrder", data.local_order_id);
            return data.paypal_order_id;
        },
        onApprove: async function (data) {
            container.classList.add("opacity-50");
            const response = await fetch("/api/paypal/capture-order/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paypal_order_id: data.orderID,
                    local_order_id: sessionStorage.getItem("localmartPaypalLocalOrder")
                })
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                resetButton();
                throw new Error(result.message || "PayPal payment could not be completed.");
            }
            cartKeys.forEach(key => localStorage.removeItem(key));
            window.location.href = `/order/${encodeURIComponent(result.order_id)}/track/`;
        },
        onCancel: resetButton,
        onError: function (error) {
            resetButton();
            console.error("PayPal checkout error:", error);
            alert("PayPal payment failed. Please try again.");
        }
    }).render(container);
});
