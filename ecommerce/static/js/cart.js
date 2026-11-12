// ======================================
// CART PAGE
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const cartContainer =
        document.getElementById("cartItems") ||
        document.getElementById("cartContainer");

    const subtotalElement =
        document.getElementById("subtotal");

    const taxElement =
        document.getElementById("tax");

    const totalElement =
        document.getElementById("grandTotal") ||
        document.getElementById("total");
    const serverSubtotal = Number(cartContainer.dataset.serverSubtotal || 0);
    const serverCount = Number(cartContainer.dataset.serverCount || 0);
    const serverTaxCart = JSON.parse(document.getElementById("sharedCartTaxItems")?.textContent || "[]");
    let cartTaxRequestId = 0;
    let appliedCartCouponCode = window.localmartCartCoupon?.code || "";
    const cartCouponInput = document.getElementById("cartCouponCode");
    const cartCouponMessage = document.getElementById("cartCouponMessage");
    const cartCouponApplyButton = document.getElementById("cartApplyCoupon");
    const cartCouponRemoveButton = document.getElementById("cartRemoveCoupon");
    if (cartCouponInput) cartCouponInput.value = appliedCartCouponCode;

    // Put session backed products and browser saved products in one item list.
    const sharedCartPage = document.querySelector(".fashion-cart-page");
    const originalCartColumn = cartContainer.closest(".col-lg-8");
    const serverFashionProductIds = new Set(
        Array.from(document.querySelectorAll(".fashion-cart-item")).flatMap(item => {
            const source = item.querySelector('input[name="source"]')?.value;
            const productId = item.querySelector('input[name="product_id"]')?.value;
            return source === "fashion" && productId ? [productId] : [];
        })
    );
    if (sharedCartPage && originalCartColumn) {
        sharedCartPage.appendChild(cartContainer);
        sharedCartPage.classList.add("col-lg-8");
        originalCartColumn.replaceWith(sharedCartPage);
    }


    if (!cartContainer) {
        console.error("Cart container not found!");
        return;
    }


    // ======================================
    // LOAD CART
    // ======================================

    // Import the old food and grocery browser carts into the one cart key.
    // Keep a source-qualified id so products from different catalogs cannot collide.
    const legacyCartKeys = [
        "cart", "localmartGroceryCart", "localmartCart", "breakfastCart",
        "localmartDrinksJuicesCart", "localmartIceCreamTubsCart", "localmartMasalaCart",
        "localmartPackagedFoodCart", "localmartIndianSweetsCart", "localmartTeaCoffeeMoreCart",
        "localmartFashionCart", "localmartFashionMenCart"
    ];
    // Category pages have accumulated several cart key names over time. Include
    // any additional cart arrays saved by those pages so the shared cart can
    // show items from categories that are not in the legacy list above.
    Object.keys(localStorage).forEach(key => {
        if (!/cart/i.test(key) || legacyCartKeys.includes(key)) return;
        try {
            if (Array.isArray(JSON.parse(localStorage.getItem(key) || "null"))) {
                legacyCartKeys.push(key);
            }
        } catch (_) { /* Ignore unrelated or invalid storage values. */ }
    });
    let cart = [];
    const seen = new Map();
    const inferGstSource = (item, storageKey) => {
        const declared = String(item.gst_source || item.catalog_source || item.source || "").toLowerCase();
        if (["food", "grocery", "fashion", "shopping", "electronics", "home_appliances", "merchant"].includes(declared)) return declared;
        if (declared === "appliances") return "home_appliances";
        const key = String(storageKey || "").toLowerCase();
        if (/fashion|shopping|men|women|watch|footwear|clothing/.test(key)) return "fashion";
        if (/electronics/.test(key)) return "electronics";
        if (/appliance/.test(key)) return "home_appliances";
        if (/grocery|supermarket|pantry|breakfast|drink|juice|icecream|masala|packagedfood|sweet|tea|coffee/.test(key)) return "grocery";
        if (/food|restaurant|pizza|meal/.test(key)) return "food";
        const details = `${item.category || ""} ${item.name || item.product_name || ""}`.toLowerCase();
        if (/grocery|supermarket|pantry|vegan|dairy|bread|egg|milk|rice|masala|packaged food|sweets|tea|coffee|juice|ice cream/.test(details)) return "grocery";
        if (/fashion|clothing|shirt|trouser|dress|footwear|shoe|watch|apparel|men.s fashion|women.s fashion/.test(details)) return "fashion";
        if (/electronics|mobile|phone|laptop|television|computer|headphone/.test(details)) return "electronics";
        if (/appliance|refrigerator|washing machine|air conditioner|microwave/.test(details)) return "home_appliances";
        if (item.restaurantName || item.restaurant_name || /food|pizza|burger|restaurant|meal/.test(details)) return "food";
        return "";
    };
    legacyCartKeys.forEach(key => {
        try {
            const saved = JSON.parse(localStorage.getItem(key) || "[]");
            if (!Array.isArray(saved)) return;
            saved.forEach(item => {
                if (!item || typeof item !== "object") return;
                const productId = String(item.id ?? item.productId ?? item.product_id ?? item.item_id ?? item.name ?? cart.length);
                const catalog = /women/i.test(key) ? "women" : /men/i.test(key) ? "men" : "";
                if (catalog && serverFashionProductIds.has(`${catalog}:${productId}`)) return;
                const id = String(item.cartId || `${key}:${productId}`);
                const previous = seen.get(id);
                if (previous) {
                    previous.quantity = Number(previous.quantity || 1) + Number(item.quantity || 1);
                } else {
                    const normalized = { ...item, id: item.id ?? item.productId ?? item.product_id ?? item.item_id, gst_source: inferGstSource(item, key), cartId: id, quantity: Math.max(1, Number(item.quantity || 1)) };
                    seen.set(id, normalized);
                    cart.push(normalized);
                }
            });
        } catch (error) {
            console.warn(`Could not read legacy cart ${key}`, error);
        }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    legacyCartKeys.filter(key => key !== "cart").forEach(key => localStorage.setItem(key, "[]"));


    // ======================================
    // RENDER CART
    // ======================================

    function renderCart() {

        const legacyCartSection = cartContainer.closest(".row");

        if (cart.length === 0) {

            if (serverCount > 0) {
                cartContainer.innerHTML = `
                    <div class="alert alert-light border mb-0">
                        Your category items are listed above and included in this order summary.
                    </div>
                `;
                if (legacyCartSection) legacyCartSection.hidden = false;
                updateSummary();
                return;
            }

            if (legacyCartSection) legacyCartSection.hidden = false;

            cartContainer.innerHTML = `

                <div class="text-center py-5">

                    <i class="bi bi-cart-x fs-1 text-muted"></i>

                    <h4 class="fw-bold mt-3">
                        Your Cart is Empty
                    </h4>

                    <p class="text-muted">
                        Looks like you haven't added anything yet.
                    </p>

                </div>

            `;

            updateSummary();

            return;
        }

        if (legacyCartSection) legacyCartSection.hidden = false;


        let html = "";


        cart.forEach((item, index) => {

            const itemTotal =
                Number(item.price) * Number(item.quantity);
            const isGroceryItem =
                item.gst_source === "grocery";


            html += `

            <div class="card mb-4 shadow-sm border-0">

                <div class="card-body">

                    <!-- RESTAURANT DETAILS -->

                    <div class="d-flex align-items-center mb-3 pb-3 border-bottom">

                        <div>

                            <h5 class="fw-bold mb-1">

                                <i class="bi bi-shop text-success me-2"></i>

                                ${isGroceryItem ? "Shop" : item.restaurantName || "Restaurant"}
                            </h5>

                            <div class="text-muted small">

                                ${isGroceryItem ? "" : item.restaurantCuisine || ""}

                            </div>

                        </div>

                    </div>


                    <!-- RESTAURANT META -->

                    ${isGroceryItem ? "" : `<div class="d-flex flex-wrap gap-3 mb-3 small">

                        ${
                            item.restaurantRating
                            ? `
                            <span class="badge bg-success">

                                ⭐ ${item.restaurantRating}

                            </span>
                            `
                            : ""
                        }


                        ${
                            item.restaurantTime
                            ? `
                            <span class="text-muted">

                                <i class="bi bi-clock me-1"></i>

                                ${item.restaurantTime}

                            </span>
                            `
                            : ""
                        }


                        ${
                            item.restaurantDistance
                            ? `
                            <span class="text-muted">

                                <i class="bi bi-geo-alt me-1"></i>

                                ${item.restaurantDistance}

                            </span>
                            `
                            : ""
                        }

                    </div>`}


                    <!-- FOOD ITEM -->

                    <div class="row align-items-center">

                        <!-- IMAGE -->

                        <div class="col-md-2 col-4">

                            <img
                                src="${item.image}"
                                class="img-fluid rounded"
                                style="
                                    width:120px;
                                    height:100px;
                                    object-fit:cover;
                                "
                                onerror="
                                    this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500'
                                "
                            >

                        </div>


                        <!-- ITEM DETAILS -->

                        <div class="col-md-4 col-8">

                            <h5 class="fw-bold mb-1">

                                ${item.name}

                            </h5>


                            <p class="text-muted mb-1">

                                ${item.category || ""}

                            </p>


                            ${isGroceryItem ? "" : `
                            ${
                                item.veg === true
                                ? `
                                <span class="badge bg-success">

                                    ● Veg

                                </span>
                                `
                                : `
                                <span class="badge bg-danger">

                                    ● Non-Veg

                                </span>
                                `
                            }
                            `}


                            ${
                                item.description
                                ? `
                                <p class="small text-muted mt-2 mb-0">

                                    ${item.description}

                                </p>
                                `
                                : ""
                            }

                        </div>


                        <!-- PRICE -->

                        <div class="col-md-2 mt-3 mt-md-0">

                            <small class="text-muted">
                                Price
                            </small>

                            <h5 class="fw-bold text-success">

                                ₹${Number(item.price).toFixed(2)}

                            </h5>

                        </div>


                        <!-- QUANTITY -->

                        <div class="col-md-2 mt-3 mt-md-0">

                            <small class="text-muted d-block mb-1">

                                Quantity

                            </small>


                            <div class="d-flex align-items-center">

                                <button
                                    class="btn btn-sm btn-outline-secondary"
                                    onclick="changeCartQuantity(${index}, -1)">

                                    −

                                </button>


                                <span class="mx-3 fw-bold">

                                    ${item.quantity}

                                </span>


                                <button
                                    class="btn btn-sm btn-outline-secondary"
                                    onclick="changeCartQuantity(${index}, 1)">

                                    +

                                </button>

                            </div>

                        </div>


                        <!-- TOTAL + DELETE -->

                        <div class="col-md-2 mt-3 mt-md-0 text-md-end">

                            <small class="text-muted">
                                Item Total
                            </small>

                            <h5 class="fw-bold">

                                ₹${itemTotal.toFixed(2)}

                            </h5>


                            <button
                                class="btn btn-sm btn-outline-danger"
                                onclick="removeCartItem(${index})">

                                <i class="bi bi-trash me-1"></i>

                                Remove

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            `;

        });


        cartContainer.innerHTML = html;

        updateSummary();

    }


    // ======================================
    // CHANGE QUANTITY
    // ======================================

    window.changeCartQuantity = function (index, change) {

        if (!cart[index]) return;


        cart[index].quantity =
            Number(cart[index].quantity) + change;


        if (cart[index].quantity <= 0) {

            cart.splice(index, 1);

        }


        saveCart();

    };


    // ======================================
    // REMOVE ITEM
    // ======================================

    window.removeCartItem = function (index) {

        if (!cart[index]) return;


        const itemName = cart[index].name;


        cart.splice(index, 1);


        saveCart();


        console.log(
            `${itemName} removed from cart`
        );

    };


    // ======================================
    // SAVE CART
    // ======================================

    function saveCart() {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
        legacyCartKeys.filter(key => key !== "cart").forEach(key => localStorage.setItem(key, "[]"));
        window.dispatchEvent(new CustomEvent("localmartCartUpdated", { detail: { count: cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0) } }));

        renderCart();

    }


    // ======================================
    // ORDER SUMMARY
    // ======================================

    function updateSummary() {

        let subtotal = serverSubtotal;


        cart.forEach(item => {

            subtotal +=
                Number(item.price) *
                Number(item.quantity);

        });


        const tax = Number((subtotal * 0.05).toFixed(2));
        const total = subtotal + tax;

        const countElement = document.getElementById("sharedCartCount");
        if (countElement) {
            const count = serverCount + cart.reduce(
                (sum, item) => sum + Number(item.quantity || 0),
                0
            );
            countElement.textContent = `${count} item${count === 1 ? "" : "s"} across categories`;
        }


        if (subtotalElement) {

            subtotalElement.innerText =
                `₹${subtotal.toFixed(2)}`;

        }


        if (taxElement) taxElement.textContent = `\u20b9${tax.toFixed(2)}`;

        if (totalElement) {

            totalElement.innerText =
                `₹${total.toFixed(2)}`;

        }

        refreshCartTaxSummary();

    }

    async function refreshCartTaxSummary() {
        const requestId = ++cartTaxRequestId;
        const seenLines = new Set();
        const quoteCart = [...serverTaxCart, ...cart].filter(item => {
            const key = [item.gst_source || "", item.id || "", item.name || "", item.price || ""].join("|");
            if (seenLines.has(key)) return false;
            seenLines.add(key);
            return Boolean(item.gst_source);
        });
        if (!quoteCart.length) {
            if (appliedCartCouponCode) {
                const csrf = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/)?.[1] || "";
                fetch("/api/checkout/coupon/remove/", {method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":decodeURIComponent(csrf)},body:JSON.stringify({cart:[]})}).catch(() => {});
                appliedCartCouponCode = "";
                if (cartCouponInput) cartCouponInput.value = "";
                if (cartCouponRemoveButton) cartCouponRemoveButton.hidden = true;
                document.getElementById("cartCouponDiscountRow").hidden = true;
                document.getElementById("cartAppliedCoupon").hidden = true;
            }
            return;
        }
        const csrf = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/)?.[1] || "";
        try {
            const response = await fetch("/api/checkout-tax-preview/", {
                method: "POST",
                headers: {"Content-Type": "application/json", "X-CSRFToken": decodeURIComponent(csrf)},
                body: JSON.stringify({cart: quoteCart, customer_state: cartContainer.dataset.gstState || "Telangana", customer_email: window.localmartCartCoupon?.email || "", coupon_code: appliedCartCouponCode}),
            });
            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data.message || "GST is calculated at checkout.");
            if (requestId !== cartTaxRequestId) return;
            const totals = data.totals;
            const tax = Number(totals.gst_total || 0) + Number(totals.delivery_tax || 0);
            const quotedTotal = Number(totals.total);
            if (!Number.isFinite(tax) || !Number.isFinite(quotedTotal)) throw new Error("Tax quote is unavailable.");
            subtotalElement.textContent = `₹${Number(totals.subtotal || 0).toFixed(2)}`;
            if (taxElement) taxElement.textContent = `\u20b9${tax.toFixed(2)}`;
            if (totalElement) totalElement.textContent = `\u20b9${quotedTotal.toFixed(2)}`;
            const productDiscount = Number(totals.discount_total || 0);
            const productDiscountRow = document.getElementById("cartProductDiscountRow");
            productDiscountRow.hidden = productDiscount <= 0;
            document.getElementById("cartProductDiscount").textContent = `−₹${productDiscount.toFixed(2)}`;
            const coupon = data.coupon;
            const couponDiscount = Number(totals.coupon_discount || 0);
            document.getElementById("cartCouponDiscountRow").hidden = !coupon || (couponDiscount <= 0 && !coupon.free_delivery);
            document.getElementById("cartCouponDiscount").textContent = coupon?.free_delivery ? "Free delivery" : `−₹${couponDiscount.toFixed(2)}`;
            document.getElementById("cartDeliveryCharge").textContent = Number(totals.delivery_total || 0) <= 0 ? "FREE" : `₹${Number(totals.delivery_total).toFixed(2)}`;
            const otherCharges = Number(totals.other_charges || 0);
            document.getElementById("cartOtherChargesRow").hidden = otherCharges <= 0;
            document.getElementById("cartOtherCharges").textContent = `₹${otherCharges.toFixed(2)}`;
            appliedCartCouponCode = coupon?.code || "";
            if (cartCouponInput) cartCouponInput.value = appliedCartCouponCode;
            if (cartCouponRemoveButton) cartCouponRemoveButton.hidden = !coupon;
            const appliedLabel = document.getElementById("cartAppliedCoupon");
            appliedLabel.hidden = !coupon;
            appliedLabel.textContent = coupon ? `${coupon.code} applied · you save ₹${couponDiscount.toFixed(2)}${coupon.free_delivery ? " plus delivery" : ""}` : "";
        } catch (error) {
            if (requestId !== cartTaxRequestId) return;
            if (appliedCartCouponCode) {
                try {
                    const response = await fetch("/api/checkout/coupon/remove/", {method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":decodeURIComponent(csrf)},body:JSON.stringify({cart:quoteCart,customer_state:cartContainer.dataset.gstState || "Telangana",customer_email:window.localmartCartCoupon?.email || ""})});
                    if (response.ok) { appliedCartCouponCode = ""; if (cartCouponInput) cartCouponInput.value = ""; if (cartCouponMessage) { cartCouponMessage.textContent = `${error.message} The saved coupon was removed because it no longer applies.`; cartCouponMessage.className = "small mt-2 text-danger"; } await refreshCartTaxSummary(); return; }
                } catch (_) { /* The quote will be rechecked at checkout. */ }
            }
            // Keep the local 5% estimate shown by updateSummary when the
            // server quote is unavailable; checkout/payment still validates
            // the authoritative order total on the server.
        }
    }

    const getCartQuotePayload = () => {
        const seenLines = new Set();
        const quoteCart = [...serverTaxCart, ...cart].filter(item => {
            const key = [item.gst_source || "", item.id || "", item.name || "", item.price || ""].join("|");
            if (seenLines.has(key)) return false;
            seenLines.add(key);
            return Boolean(item.gst_source);
        });
        return {cart:quoteCart,customer_state:cartContainer.dataset.gstState || "Telangana",customer_email:window.localmartCartCoupon?.email || ""};
    };
    const showCartCouponError = (message, success = false) => { if (!cartCouponMessage) return; cartCouponMessage.textContent = message; cartCouponMessage.className = `small mt-2 ${success ? "text-success" : "text-danger"}`; };
    let cartCouponSubmitting = false;
    const applyCartCoupon = async requestedCode => {
        if (cartCouponSubmitting) return false;
        const code = String(requestedCode ?? cartCouponInput.value).trim().toUpperCase();
        if (!code) { showCartCouponError("Enter a coupon code first."); return false; }
        cartCouponSubmitting = true;
        if (cartCouponApplyButton) { cartCouponApplyButton.disabled = true; cartCouponApplyButton.textContent = "Applying…"; }
        try {
            const response = await fetch("/api/checkout/coupon/apply/", {method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":decodeURIComponent(document.cookie.match(/(?:^|; )csrftoken=([^;]+)/)?.[1] || "")},body:JSON.stringify({...getCartQuotePayload(),coupon_code:code})});
            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data.success) throw new Error(data.message || "Could not apply this coupon.");
            appliedCartCouponCode = data.coupon?.code || "";
            const totals = data.totals;
            subtotalElement.textContent = `₹${Number(totals.subtotal || 0).toFixed(2)}`;
            if (taxElement) taxElement.textContent = `₹${(Number(totals.gst_total || 0) + Number(totals.delivery_tax || 0)).toFixed(2)}`;
            if (totalElement) totalElement.textContent = `₹${Number(totals.total).toFixed(2)}`;
            await refreshCartTaxSummary();
            showCartCouponError(`${data.coupon.code} applied! You saved ₹${Number(data.coupon.discount || 0).toFixed(2)}.`, true);
            return true;
        } catch (error) {
            showCartCouponError(error.message || "Could not apply this coupon.");
            return false;
        } finally {
            cartCouponSubmitting = false;
            if (cartCouponApplyButton) { cartCouponApplyButton.disabled = false; cartCouponApplyButton.textContent = "Apply"; }
        }
    };
    cartCouponApplyButton?.addEventListener("click", () => applyCartCoupon(cartCouponInput.value));
    cartCouponRemoveButton?.addEventListener("click", async () => {
        cartCouponRemoveButton.disabled = true;
        try {
            const response = await fetch("/api/checkout/coupon/remove/", {method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":decodeURIComponent(document.cookie.match(/(?:^|; )csrftoken=([^;]+)/)?.[1] || "")},body:JSON.stringify(getCartQuotePayload())});
            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data.message || "Could not remove this coupon.");
            appliedCartCouponCode = "";
            await refreshCartTaxSummary();
            showCartCouponError("Coupon removed.", true);
        } catch (error) { showCartCouponError(error.message); }
        finally { cartCouponRemoveButton.disabled = false; }
    });
    const couponOffersElement = document.getElementById("cartCouponOffers");
    const escapeCouponText = value => String(value ?? "").replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[character]));
    document.getElementById("cartViewCoupons")?.addEventListener("click", async () => {
        couponOffersElement.innerHTML = '<div class="text-muted small">Loading eligible offers…</div>';
        try {
            const response = await fetch("/api/coupons/available/", {method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":decodeURIComponent(document.cookie.match(/(?:^|; )csrftoken=([^;]+)/)?.[1] || "")},body:JSON.stringify(getCartQuotePayload())});
            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data.message || "Could not load coupons.");
            if (!data.coupons.length) { couponOffersElement.innerHTML = '<p class="text-muted mb-0">No active coupons are available right now.</p>'; return; }
            const categoryNames = {food:"Food",grocery:"Grocery",shopping:"Shopping",electronics:"Electronics",home_appliances:"Home Appliances"};
            couponOffersElement.innerHTML = data.coupons.map(offer => {
                const discount = offer.free_delivery ? "Free delivery" : offer.discount_type === "percentage" ? `${Number(offer.discount_value)}% off${offer.maximum_discount ? ` up to ₹${Number(offer.maximum_discount).toFixed(2)}` : ""}` : `₹${Number(offer.discount_value).toFixed(2)} off`;
                const categories = (offer.eligible_categories || []).map(value => categoryNames[value] || value).join(", ") || "All categories";
                const restrictions = [offer.first_order_only ? "First order only" : "", offer.usage_limit ? `Global limit ${offer.usage_limit}` : "", offer.per_customer_limit ? `${offer.per_customer_limit} per customer` : "", Number(offer.minimum_eligible_quantity) ? `Min ${offer.minimum_eligible_quantity} eligible items` : "", (offer.applicable_products || []).length ? "Selected products only" : ""].filter(Boolean).join(" · ");
                const eligibility = offer.eligible ? `<span class="badge text-bg-success">Eligible · save ₹${Number(offer.discount).toFixed(2)}</span>` : `<span class="badge text-bg-secondary">${escapeCouponText(offer.reason)}</span>`;
                const expiry = offer.expires_at ? ` · Expires ${new Date(offer.expires_at).toLocaleDateString()}` : "";
                return `<article class="border rounded-3 p-3 mb-2"><div class="d-flex justify-content-between gap-2"><div><strong class="text-success">${escapeCouponText(offer.code)}</strong><div class="small fw-semibold">${escapeCouponText(discount)}</div></div>${eligibility}</div><p class="small text-muted my-2">${escapeCouponText(offer.description || "Coupon offer")} · Min order ₹${Number(offer.minimum_order).toFixed(2)} · ${escapeCouponText(categories)}${expiry}${restrictions ? ` · ${escapeCouponText(restrictions)}` : ""}</p>${offer.terms ? `<p class="small text-muted mb-2">${escapeCouponText(offer.terms)}</p>` : ""}<button type="button" class="btn btn-sm btn-outline-success" data-cart-offer="${escapeCouponText(offer.code)}" ${offer.eligible ? "" : "disabled"}>Apply</button></article>`;
            }).join("");
            couponOffersElement.querySelectorAll("[data-cart-offer]").forEach(button => button.addEventListener("click", async () => {
                const code = button.dataset.cartOffer;
                const feedback = document.getElementById("cartCouponModalFeedback");
                button.disabled = true;
                button.textContent = "Applying…";
                if (feedback) { feedback.textContent = "Checking coupon…"; feedback.className = "small mb-3 text-muted"; }
                const applied = await applyCartCoupon(code);
                if (applied) {
                    window.bootstrap?.Modal.getOrCreateInstance(document.getElementById("cartCouponsModal"))?.hide();
                } else if (feedback) {
                    feedback.textContent = cartCouponMessage?.textContent || "This coupon could not be applied. Please review your cart and try again.";
                    feedback.className = "alert alert-danger py-2 mb-3";
                }
                button.disabled = false;
                button.textContent = "Apply";
            }));
        } catch (error) { couponOffersElement.innerHTML = `<div class="alert alert-warning mb-0">${escapeCouponText(error.message)}</div>`; }
    });


    // ======================================
    // INITIAL RENDER
    // ======================================

    renderCart();

});



// ==========================================
// PLACE ORDER
// ==========================================

function placeOrder() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    // Load existing orders

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];


    // Create order

    const order = {

        orderId:
            "LM" +
            Date.now(),

        date:
            new Date().toLocaleString(),

        status:
            "Order Placed",

        items:
            cart.map(item => ({
                ...item
            }))

    };


    // Add new order

    orders.unshift(order);


    // Save orders

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    // Clear cart

    localStorage.removeItem("cart");


    // Go to orders

    window.location.href =
        "/orders/";

}


function goToCheckout() {
    window.location.href = "/checkout/";
}
