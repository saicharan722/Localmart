/* =========================================================
   LOCALMART CHECKOUT + RAZORPAY PAYMENT
========================================================= */

function getCheckoutCart() {
    const serverCart = Array.isArray(window.electronicsCheckoutCart)
        ? window.electronicsCheckoutCart
        : [];
    const cartKeys = new Set([
        "cart",
        "localmartGroceryCart",
        "localmartCart",
        "breakfastCart",
        "localmartDrinksJuicesCart",
        "localmartIceCreamTubsCart",
        "localmartMasalaCart",
        "localmartPackagedFoodCart",
        "localmartIndianSweetsCart",
        "localmartTeaCoffeeMoreCart",
        "localmartFashionCart",
        "localmartFashionMenCart"
    ]);
    // Read category-specific cart arrays too; several food and grocery pages
    // still save under their own localStorage key.
    Object.keys(localStorage).forEach(key => {
        if (!/cart/i.test(key)) return;
        try {
            if (Array.isArray(JSON.parse(localStorage.getItem(key) || "null"))) {
                cartKeys.add(key);
            }
        } catch (_) { /* Ignore non-cart storage values. */ }
    });

    const browserCart = [...cartKeys].flatMap(function (key) {
        try {
            const items = JSON.parse(localStorage.getItem(key) || "[]");
            if (!Array.isArray(items)) return [];
            const keySource = /grocery|supermarket|pantry|breakfast|drink|juice|icecream|masala|packagedfood|sweet|tea|coffee/i.test(key)
                ? "grocery"
                : /fashion|shopping|men|women|watch|footwear|clothing/i.test(key)
                    ? "fashion"
                    : /electronics|appliance/i.test(key)
                        ? (/appliance/i.test(key) ? "home_appliances" : "electronics")
                        : /food|restaurant|pizza|meal/i.test(key) ? "food" : null;
            const inferSource = item => {
                const declared = String(item.gst_source || item.catalog_source || item.source || "").toLowerCase();
                if (["food", "grocery", "fashion", "shopping", "electronics", "home_appliances", "merchant"].includes(declared)) return declared;
                if (keySource) return keySource;
                const text = `${item.category || ""} ${item.name || item.product_name || ""}`.toLowerCase();
                if (/grocery|supermarket|pantry|vegan|dairy|bread|egg|milk|rice|masala|packaged food|sweets|tea|coffee|juice|ice cream/i.test(text)) return "grocery";
                if (/fashion|clothing|shirt|trouser|dress|footwear|shoe|watch|apparel|men.s fashion|women.s fashion/i.test(text)) return "fashion";
                if (/electronics|mobile|phone|laptop|television|computer|headphone/i.test(text)) return "electronics";
                if (/appliance|refrigerator|washing machine|air conditioner|microwave/i.test(text)) return "home_appliances";
                if (item.restaurantName || item.restaurant_name || /food|pizza|burger|restaurant|meal/i.test(text)) return "food";
                return "";
            };
            return items.map(item => ({...item, id: item.id ?? item.product_id ?? item.item_id,
                gst_source: inferSource(item)}));
        } catch (error) {
            console.error(`Unable to read ${key}:`, error);
            return [];
        }
    });

    // Session-backed products are authoritative. Add browser cart products
    // unless the same catalog line is already present in the session payload.
    const lineKey = item => [
        String(item.name || item.product_name || "").trim().toLowerCase(),
        String(item.category || "").trim().toLowerCase(),
        String(item.restaurantName || item.restaurant_name || "").trim().toLowerCase(),
        String(item.price ?? "")
    ].join("|");
    const knownLines = new Set(serverCart.map(lineKey));
    const additionalBrowserItems = browserCart.filter(item => {
        if (!item || typeof item !== "object") return false;
        const key = lineKey(item);
        if (knownLines.has(key)) return false;
        knownLines.add(key);
        return true;
    });

    return [...serverCart, ...additionalBrowserItems];
}

function getCsrfToken() {
    const match = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : "";
}

function getCheckoutRestaurantName(cart) {
    const values = (cart || []).map(item => String(item.restaurantName || item.restaurant_name || "").trim());
    const names = [...new Set(values.filter(Boolean))];
    if (names.length && values.some(name => !name)) return "Multiple restaurants";
    if (names.length === 1) return names[0];
    if (names.length > 1) return "Multiple restaurants";
    return "";
}

let checkoutMap = null, checkoutMarker = null, checkoutPin = null;
let checkoutQuoteReady = false;
function initCheckoutDeliveryPin() {
    const address = document.getElementById("customerAddress"), mapElement = document.getElementById("checkoutDeliveryMap");
    const locate = document.getElementById("locateCheckoutAddress"), confirm = document.getElementById("confirmCheckoutPin"), note = document.getElementById("checkoutPinNote"), pay = document.getElementById("payButton");
    if (!address || !mapElement || !locate || !confirm) return;
    if (pay) pay.disabled = false;
    if (window.L) {
        checkoutMap = L.map(mapElement).setView([0, 0], 2);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom:19,referrerPolicy:"strict-origin-when-cross-origin",attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(checkoutMap);
        checkoutMap.on("click", event => setCheckoutPin(event.latlng, "Map point selected. Confirm this as your delivery destination."));
        // Use a saved homepage location only to center the map. It is never
        // treated as a confirmed delivery pin and never replaces typed address.
        if (!address.value.trim()) {
            try {
                const saved = JSON.parse(localStorage.getItem("localmart.homeLocation") || "null");
                const lat = Number(saved?.latitude), lng = Number(saved?.longitude);
                if (Number.isFinite(lat) && lat >= -90 && lat <= 90 && Number.isFinite(lng) && lng >= -180 && lng <= 180) {
                    checkoutMap.setView([lat, lng], 13);
                    note.textContent = "Map centered on your saved location. Enter your delivery address, select the exact point, and confirm it before payment.";
                }
            } catch (_) { /* The map still works when browser storage is unavailable. */ }
        }
        setTimeout(() => checkoutMap.invalidateSize(), 150);
    } else note.textContent = "Map library could not load. Please reload this page before payment.";
    function setCheckoutPin(point, message) {
        checkoutPin = {latitude:Number(point.lat), longitude:Number(point.lng)};
        if (checkoutMarker) checkoutMarker.setLatLng([checkoutPin.latitude, checkoutPin.longitude]);
        else checkoutMarker = L.marker([checkoutPin.latitude, checkoutPin.longitude], {draggable:true}).addTo(checkoutMap);
        checkoutMarker.off("dragend").on("dragend", event => {const p=event.target.getLatLng();checkoutPin={latitude:p.lat,longitude:p.lng};note.textContent="Pin moved. Confirm the exact delivery point.";confirm.disabled=false;});
        checkoutMap.setView([checkoutPin.latitude,checkoutPin.longitude],17,{animate:true});
        note.textContent=message;confirm.disabled=false;
        if(pay)pay.disabled=false;
    }
    address.addEventListener("input",()=>{checkoutPin=null;window.LOCALMART_CHECKOUT_DELIVERY=null;confirm.disabled=true;if(pay)pay.disabled=false;note.textContent="Address changed. Locate and confirm its delivery pin again.";});
    locate.addEventListener("click",async()=>{const value=address.value.trim();if(!value){address.focus();return;}locate.disabled=true;note.textContent="Looking up delivery address…";try{const csrf=document.cookie.split(";").map(v=>v.trim()).find(v=>v.startsWith("csrftoken="))?.slice(10)||"";const response=await fetch("/api/geocode/address/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":csrf},body:JSON.stringify({address:value})});const data=await response.json();if(!response.ok)throw new Error(data.error||"Address lookup failed");setCheckoutPin({lat:data.candidate.latitude,lng:data.candidate.longitude},`Found ${data.candidate.address}. Check the point and move it to your exact entrance if needed.`);}catch(error){note.textContent=`${error.message} You can also use your GPS to center the map, then select your delivery point.`;}finally{locate.disabled=false;}});
    confirm.addEventListener("click",()=>{if(!checkoutPin||!address.value.trim())return;window.LOCALMART_CHECKOUT_DELIVERY={...checkoutPin,address:address.value.trim()};confirm.disabled=true;if(pay)pay.disabled=false;note.textContent="Delivery pin confirmed. You can now continue to payment.";});
    document.getElementById("centerCheckoutOnGps")?.addEventListener("click",()=>{if(!navigator.geolocation){note.textContent="This device does not provide GPS.";return;}navigator.geolocation.getCurrentPosition(position=>setCheckoutPin({lat:position.coords.latitude,lng:position.coords.longitude},"Current GPS shown. Confirm only if this is your delivery entrance."),()=>{note.textContent="GPS permission was denied. Locate your address or select the point on the map.";},{enableHighAccuracy:true,timeout:15000,maximumAge:30000});});
}

document.addEventListener("DOMContentLoaded", function () {

    initCheckoutDeliveryPin();

    /* -----------------------------------------------------
       GET ELEMENTS
    ----------------------------------------------------- */

    const checkoutItems =
        document.getElementById("checkoutItems");

    const subtotalElement =
        document.getElementById("checkoutSubtotal");

    const taxElement =
        document.getElementById("checkoutTax");

    const totalElement =
        document.getElementById("checkoutTotal");

    const payButton =
        document.getElementById("payButton");


    /* -----------------------------------------------------
       GET CART
    ----------------------------------------------------- */

    let cart = [];

    try {

        cart = getCheckoutCart();

    } catch (error) {

        console.error(
            "Cart JSON parsing error:",
            error
        );

        cart = [];
    }


    console.log(
        "Checkout cart:",
        cart
    );


    /* -----------------------------------------------------
       CHECK CART
    ----------------------------------------------------- */

    if (
        !Array.isArray(cart) ||
        cart.length === 0
    ) {

        if (checkoutItems) {

            checkoutItems.innerHTML = `
                <div class="alert alert-warning">
                    <i class="bi bi-cart-x me-2"></i>
                    Your cart is empty.
                </div>
            `;
        }

        if (payButton) {
            payButton.disabled = true;
        }

        return;
    }


    /* -----------------------------------------------------
       CALCULATE CART TOTAL
    ----------------------------------------------------- */

    let subtotal = 0;

    let html = "";


    cart.forEach(function (item) {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        /* -------------------------------------------------
           PRODUCT IMAGE
        ------------------------------------------------- */

        const image =
            item.image ||
            "/static/images/default-food.jpg";


        /* -------------------------------------------------
           PRODUCT NAME
        ------------------------------------------------- */

        const productName =
            item.name ||
            "Product";


        /* -------------------------------------------------
           CATEGORY
        ------------------------------------------------- */

        const category =
            item.category ||
            "";


        /* -------------------------------------------------
           RESTAURANT
        ------------------------------------------------- */

        const restaurant =
            item.restaurant_name || "";


        /* -------------------------------------------------
           PRODUCT HTML
        ------------------------------------------------- */

        html += `

            <div class="card border-0 shadow-sm mb-3">

                <div class="card-body">

                    <div class="d-flex
                                gap-3
                                align-items-center">

                        <!-- Product Image -->

                        <img
                            src="${image}"
                            alt="${productName}"
                            style="
                                width:80px;
                                height:80px;
                                object-fit:cover;
                                border-radius:10px;
                            "
                            onerror="
                                this.onerror=null;
                                this.src='/static/images/default-food.jpg';
                            "
                        >


                        <!-- Product Details -->

                        <div class="flex-grow-1">

                            <h6 class="fw-bold mb-1">
                                ${productName}
                            </h6>


                            ${
                                restaurant
                                ? `
                                    <small class="text-success">

                                        <i class="bi bi-shop me-1"></i>

                                        ${restaurant}

                                    </small>
                                `
                                : ""
                            }


                            ${
                                category
                                ? `
                                    <div class="text-muted small mt-1">

                                        ${category}

                                    </div>
                                `
                                : ""
                            }


                            <div class="mt-1">

                                ₹${price.toFixed(2)}

                                ×

                                ${quantity}

                            </div>

                        </div>


                        <!-- Item Total -->

                        <div class="text-end">

                            <strong class="text-success">

                                ₹${itemTotal.toFixed(2)}

                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        `;
    });


    /* -----------------------------------------------------
       DISPLAY CART
    ----------------------------------------------------- */

    if (checkoutItems) {

        checkoutItems.innerHTML = html;

    }


    /* -----------------------------------------------------
       CHECKOUT TOTAL
    ----------------------------------------------------- */


    /* -----------------------------------------------------
       GRAND TOTAL
    ----------------------------------------------------- */

    let total = subtotal;


    console.log(
        "Subtotal:",
        subtotal
    );

    console.log(
        "Total:",
        total
    );


    /* -----------------------------------------------------
       UPDATE SUMMARY
    ----------------------------------------------------- */

    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" + subtotal.toFixed(2);

    }




    if (totalElement) {

        totalElement.innerText =
            "₹" + total.toFixed(2);

    }

    const initialTax = Number((subtotal * 0.05).toFixed(2));
    if (taxElement) taxElement.textContent = `\u20b9${initialTax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `\u20b9${(subtotal + initialTax).toFixed(2)}`;

    const stateSelect = document.getElementById("customerState");
    const couponInput = document.getElementById("couponCode");
    const applyCouponButton = document.getElementById("applyCoupon");
    const removeCouponButton = document.getElementById("removeCoupon");
    const couponMessage = document.getElementById("couponMessage");
    const couponRow = document.getElementById("checkoutCouponRow");
    const checkoutSummaryMessage = document.getElementById("checkoutSummaryMessage");
    const readyPayButtonHtml = payButton?.innerHTML || "";
    let appliedCoupon = window.checkoutAppliedCouponCode ? {code: window.checkoutAppliedCouponCode} : null;
    let couponRequestPending = false;
    if (couponInput) couponInput.value = appliedCoupon?.code || "";
    const performCheckoutSummary = async (couponCode = appliedCoupon?.code || "", action = "preview") => {
        checkoutQuoteReady = false;
        if (payButton) payButton.disabled = true;
        if (checkoutSummaryMessage) {
            checkoutSummaryMessage.textContent = "Updating order total…";
            checkoutSummaryMessage.classList.remove("text-danger");
        }
        totalElement.innerText = "Calculating…";
        const endpoint = action === "apply" ? "/api/checkout/coupon/apply/" : action === "remove" ? "/api/checkout/coupon/remove/" : "/api/checkout-tax-preview/";
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-CSRFToken": getCsrfToken()},
            body: JSON.stringify({
                cart: getCheckoutCart(),
                customer_state: stateSelect?.value || window.checkoutDefaultState || "Telangana",
                customer_email: document.getElementById("customerEmail")?.value.trim() || "",
                coupon_code: couponCode,
            })
        });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Unable to update your order summary.");
        const productDiscount = Number(data.totals.discount_total || 0);
        subtotal = Number(data.totals.subtotal || 0);
        total = Number(data.totals.total);
        if (!Number.isFinite(total)) throw new Error("Unable to calculate the final order total.");
        totalElement.textContent = `\u20b9${total.toFixed(2)}`;
        document.getElementById("checkoutTotalLabel").textContent = "Grand Total";
        const totalTax = Number(data.totals.gst_total || 0) + Number(data.totals.delivery_tax || 0);
        taxElement.textContent = `\u20b9${totalTax.toFixed(2)}`;
        document.getElementById("checkoutProductDiscount").textContent = `−₹${productDiscount.toFixed(2)}`;
        document.getElementById("checkoutProductDiscountRow").classList.toggle("d-none", productDiscount <= 0);
        appliedCoupon = data.coupon || null;
        if (couponInput) couponInput.value = appliedCoupon?.code || "";
        if (removeCouponButton) removeCouponButton.classList.toggle("d-none", !appliedCoupon);
        if (applyCouponButton) applyCouponButton.disabled = Boolean(appliedCoupon);
        const deliveryCharge = Number(data.totals.delivery_charges || 0);
        document.getElementById("checkoutDelivery").innerText = deliveryCharge <= 0 ? "FREE" : "₹" + deliveryCharge.toFixed(2);
        const deliveryDiscount = Number(data.totals.delivery_discount || 0);
        document.getElementById("checkoutDeliveryDiscount").innerText = "−₹" + deliveryDiscount.toFixed(2);
        document.getElementById("checkoutDeliveryDiscountRow").classList.toggle("d-none", deliveryDiscount <= 0);
        const otherCharges = Number(data.totals.other_charges || 0);
        document.getElementById("checkoutOtherCharges").textContent = `₹${otherCharges.toFixed(2)}`;
        document.getElementById("checkoutOtherChargesRow").classList.toggle("d-none", otherCharges <= 0);
        couponRow.classList.toggle("d-none", !appliedCoupon);
        document.getElementById("checkoutCouponName").textContent = appliedCoupon?.code || "";
        document.getElementById("checkoutCouponDiscount").innerText = "−₹" + Number(data.totals.coupon_discount || 0).toFixed(2);
        if (appliedCoupon?.free_delivery) document.getElementById("checkoutCouponDiscount").innerText = "Free delivery";
        subtotalElement.innerText = "₹" + subtotal.toFixed(2);
        totalElement.innerText = "₹" + total.toFixed(2);
        const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
        checkoutItems.innerHTML = data.items.map(item => `<div class="card border-0 shadow-sm mb-3"><div class="card-body">
            <div class="d-flex justify-content-between gap-3"><div><strong>${escapeHTML(item.name)}</strong>
            <div class="small text-muted">${escapeHTML(item.category)}</div>
            <div class="small">\u20b9${Number(item.price).toFixed(2)} \u00d7 ${Number(item.quantity)}</div></div>
            <strong class="text-success">\u20b9${Number(item.line_total).toFixed(2)}</strong></div></div></div>`).join("");
        checkoutItems.querySelectorAll(".card").forEach((card, index) => {
            const item = data.items[index];
            if (!item) return;
            const row = card.querySelector(".card-body > .d-flex");
            if (!row) return;
            row.classList.add("align-items-center", "gap-3");
            row.firstElementChild?.classList.add("min-w-0", "flex-grow-1");
            row.lastElementChild?.classList.add("text-nowrap");
            const image = document.createElement("img");
            image.src = item.image || "/static/images/default-food.jpg";
            image.alt = item.name || "Product image";
            image.loading = "lazy";
            image.style.cssText = "width:72px;height:72px;flex:0 0 72px;object-fit:cover;border-radius:10px";
            image.onerror = () => { image.onerror = null; image.src = "/static/images/default-food.jpg"; };
            row.prepend(image);
        });
        checkoutQuoteReady = true;
        if (checkoutSummaryMessage) {
            checkoutSummaryMessage.textContent = "";
            checkoutSummaryMessage.classList.remove("text-danger");
        }
        if (payButton) {
            payButton.innerHTML = readyPayButtonHtml;
            payButton.disabled = false;
        }
    };
    let checkoutSummaryPromise = null;
    const refreshCheckoutSummary = (couponCode = appliedCoupon?.code || "", action = "preview") => {
        const request = performCheckoutSummary(couponCode, action);
        checkoutSummaryPromise = request;
        request.then(
            () => { if (checkoutSummaryPromise === request) checkoutSummaryPromise = null; },
            () => { if (checkoutSummaryPromise === request) checkoutSummaryPromise = null; }
        );
        return request;
    };
    applyCouponButton?.addEventListener("click", async () => {
        if (couponRequestPending) return;
        const code = couponInput.value.trim().toUpperCase();
        couponMessage.textContent = "";
        couponMessage.className = "small mt-2";
        couponRequestPending = true;
        applyCouponButton.disabled = true;
        applyCouponButton.textContent = "Applying…";
        try {
            await refreshCheckoutSummary(code, "apply");
            couponMessage.textContent = `${appliedCoupon.code} applied! You saved ₹${Number(appliedCoupon.discount || 0).toFixed(2)}.`;
            couponMessage.classList.add("text-success");
        } catch (error) {
            couponMessage.textContent = error.message;
            couponMessage.classList.add("text-danger");
            try { await refreshCheckoutSummary(appliedCoupon?.code || ""); } catch (_) { /* Keep the coupon error visible. */ }
        } finally {
            couponRequestPending = false;
            applyCouponButton.textContent = "Apply";
            applyCouponButton.disabled = Boolean(appliedCoupon);
        }
    });
    removeCouponButton?.addEventListener("click", async () => {
        if (couponRequestPending) return;
        couponMessage.textContent = "";
        couponRequestPending = true;
        removeCouponButton.disabled = true;
        try {
            await refreshCheckoutSummary("", "remove");
            couponMessage.textContent = "Coupon removed.";
            couponMessage.className = "small mt-2 text-muted";
        } catch (error) {
            couponMessage.textContent = error.message;
            couponMessage.className = "small mt-2 text-danger";
        } finally {
            couponRequestPending = false;
            removeCouponButton.disabled = false;
        }
    });
    const showCheckoutSummaryError = error => {
        checkoutQuoteReady = false;
        if (checkoutSummaryMessage) {
            checkoutSummaryMessage.textContent = `Unable to update the order total: ${error.message} Select “Retry total update” to try again.`;
            checkoutSummaryMessage.classList.add("text-danger");
        }
        const amountFromRow = id => Number((document.getElementById(id)?.textContent || "").replace(/[^0-9.-]/g, "")) || 0;
        const estimatedTaxable = Math.max(0,
            Number(subtotal || 0)
            - amountFromRow("checkoutProductDiscount")
            - amountFromRow("checkoutCouponDiscount")
        );
        const estimatedTax = Number((estimatedTaxable * 0.05).toFixed(2));
        const estimatedTotal = Math.max(0,
            Number(subtotal || 0)
            - amountFromRow("checkoutProductDiscount")
            - amountFromRow("checkoutCouponDiscount")
            + amountFromRow("checkoutDelivery")
            - amountFromRow("checkoutDeliveryDiscount")
            + amountFromRow("checkoutOtherCharges")
            + estimatedTax
        );
        totalElement.textContent = `\u20b9${estimatedTotal.toFixed(2)}`;
        document.getElementById("checkoutTotalLabel").textContent = "Estimated Total";
        taxElement.textContent = `\u20b9${estimatedTax.toFixed(2)}`;
        checkoutItems?.querySelector("#checkoutSummaryWarning")?.remove();
        if (payButton) {
            payButton.disabled = false;
            payButton.innerHTML = '<i class="bi bi-arrow-clockwise me-2"></i>Retry total update';
        }
    };
    stateSelect?.addEventListener("change", () => refreshCheckoutSummary().catch(showCheckoutSummaryError));
    if (stateSelect?.value) refreshCheckoutSummary().catch(showCheckoutSummaryError);

    const offersElement = document.getElementById("checkoutCouponOffers");
    const viewOffersButton = document.getElementById("viewCheckoutCoupons");
    const escapeCouponHtml = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
    const loadCouponOffers = async () => {
        if (!offersElement) return;
        offersElement.innerHTML = '<div class="text-muted small">Loading eligible offers…</div>';
        try {
            const response = await fetch("/api/coupons/available/", {
                method: "POST",
                headers: {"Content-Type": "application/json", "X-CSRFToken": getCsrfToken()},
                body: JSON.stringify({cart: getCheckoutCart(), customer_state: stateSelect?.value || "", customer_email: document.getElementById("customerEmail")?.value.trim() || ""}),
            });
            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data.message || "Could not load coupons.");
            if (!data.coupons.length) { offersElement.innerHTML = '<p class="text-muted mb-0">No active coupons are available right now.</p>'; return; }
            const categoryNames = {food:"Food",grocery:"Grocery",shopping:"Shopping",electronics:"Electronics",home_appliances:"Home Appliances"};
            offersElement.innerHTML = data.coupons.map(offer => {
                const discount = offer.free_delivery ? "Free delivery" : offer.discount_type === "percentage" ? `${Number(offer.discount_value)}% off${offer.maximum_discount ? ` up to ₹${Number(offer.maximum_discount).toFixed(2)}` : ""}` : `₹${Number(offer.discount_value).toFixed(2)} off`;
                const categories = (offer.eligible_categories || []).map(value => categoryNames[value] || value).join(", ") || "All categories";
                const expiry = offer.expires_at ? ` · Expires ${new Date(offer.expires_at).toLocaleDateString()}` : "";
                const restrictions = [offer.first_order_only ? "First order only" : "", offer.usage_limit ? `Global limit ${offer.usage_limit}` : "", offer.per_customer_limit ? `${offer.per_customer_limit} per customer` : "", Number(offer.minimum_eligible_quantity) ? `Min ${offer.minimum_eligible_quantity} eligible items` : "", (offer.applicable_products || []).length ? "Selected products only" : ""].filter(Boolean).join(" · ");
                const eligibility = offer.eligible ? `<span class="badge text-bg-success">Eligible · save ₹${Number(offer.discount).toFixed(2)}</span>` : `<span class="badge text-bg-secondary">${escapeCouponHtml(offer.reason)}</span>`;
                return `<article class="border rounded-3 p-3 mb-2"><div class="d-flex justify-content-between gap-2"><div><strong class="text-success">${escapeCouponHtml(offer.code)}</strong><div class="small fw-semibold">${escapeCouponHtml(discount)}</div></div>${eligibility}</div><p class="small text-muted my-2">${escapeCouponHtml(offer.description || "Coupon offer")} · Min order ₹${Number(offer.minimum_order).toFixed(2)} · ${escapeCouponHtml(categories)}${expiry}${restrictions ? ` · ${escapeCouponHtml(restrictions)}` : ""}</p>${offer.terms ? `<p class="small text-muted mb-2">${escapeCouponHtml(offer.terms)}</p>` : ""}<button type="button" class="btn btn-sm btn-outline-success" data-apply-offer="${escapeCouponHtml(offer.code)}" ${offer.eligible ? "" : "disabled"}>Apply</button></article>`;
            }).join("");
        } catch (error) { offersElement.innerHTML = `<div class="alert alert-warning mb-0">${escapeCouponHtml(error.message)}</div>`; }
    };
    viewOffersButton?.addEventListener("click", loadCouponOffers);
    offersElement?.addEventListener("click", event => {
        const button = event.target.closest("[data-apply-offer]");
        if (!button) return;
        couponInput.value = button.dataset.applyOffer;
        document.querySelector("#checkoutCouponsModal .btn-close")?.click();
        applyCouponButton?.click();
    });


    /* -----------------------------------------------------
       PAYMENT BUTTON
    ----------------------------------------------------- */

    if (payButton) {

        payButton.addEventListener(
            "click",
            async function () {

                /* -----------------------------------------
                   ALWAYS GET FRESH CART
                ----------------------------------------- */

                let latestCart = [];

                try {

                    latestCart = getCheckoutCart();

                } catch (error) {

                    console.error(
                        "Unable to read cart:",
                        error
                    );

                    latestCart = [];

                }


                console.log(
                    "Latest cart before payment:",
                    latestCart
                );


                /* -----------------------------------------
                   CHECK LATEST CART
                ----------------------------------------- */

                if (
                    !Array.isArray(latestCart) ||
                    latestCart.length === 0
                ) {

                    alert(
                        "Your cart is empty. Please add a product first."
                    );

                    return;
                }

                if (!stateSelect?.value) { alert("Select your delivery state."); return; }
                if (!checkoutQuoteReady) {
                    try {
                        await (checkoutSummaryPromise || refreshCheckoutSummary());
                    } catch (error) {
                        showCheckoutSummaryError(error);
                        alert(`Unable to update the order total: ${error.message}`);
                        return;
                    }
                    if (!checkoutQuoteReady) return;
                }


                /* -----------------------------------------
                   START PAYMENT
                ----------------------------------------- */

                startPayment(
                    subtotal,
                    total,
                    latestCart,
                    appliedCoupon?.code || ""
                );

            }
        );

    }

});


/* =========================================================
   START RAZORPAY PAYMENT
========================================================= */

async function startPayment(
    subtotal,
    total,
    cart,
    couponCode = ""
) {

    /* -----------------------------------------------------
       DEBUG
    ----------------------------------------------------- */

    console.log(
        "Cart received by startPayment:",
        cart
    );


    /* -----------------------------------------------------
       CHECK CART
    ----------------------------------------------------- */

    if (
        !Array.isArray(cart) ||
        cart.length === 0
    ) {

        console.error(
            "Cart is empty:",
            cart
        );

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }


    console.log(
        "Cart before payment:",
        cart
    );


    /* -----------------------------------------------------
       CUSTOMER DETAILS
    ----------------------------------------------------- */

    const customerName =
        document
            .getElementById("customerName")
            ?.value
            .trim() || "";


    const customerEmail =
        document
            .getElementById("customerEmail")
            ?.value
            .trim() || "";


    const customerPhone =
        document
            .getElementById("customerPhone")
            ?.value
            .trim() || "";


    const customerAddress =
        document
            .getElementById("customerAddress")
            ?.value
            .trim() || "";
    const customerState = document.getElementById("customerState")?.value || "";

    const restaurantName = getCheckoutRestaurantName(cart);
    const deliveryPin = window.LOCALMART_CHECKOUT_DELIVERY;


    /* -----------------------------------------------------
       VALIDATE CUSTOMER DETAILS
    ----------------------------------------------------- */

    if (
        !customerName ||
        !customerEmail ||
        !customerPhone ||
        !customerAddress
    ) {

        alert(
            "Please enter all delivery details."
        );

        return;
    }

    if (!deliveryPin || deliveryPin.address !== customerAddress) {
        alert("Locate your delivery address and confirm the exact map pin before payment.");
        return;
    }
    /* -----------------------------------------------------
       PAYMENT BUTTON
    ----------------------------------------------------- */

    const payButton =
        document.getElementById("payButton");


    if (!payButton) {

        console.error(
            "Payment button #payButton not found."
        );

        return;
    }


    /* -----------------------------------------------------
       DISABLE BUTTON
    ----------------------------------------------------- */

    payButton.disabled = true;


    payButton.innerHTML = `
        <i class="bi bi-hourglass-split me-2"></i>
        Creating Payment...
    `;


    try {

        /* -------------------------------------------------
           CREATE RAZORPAY ORDER
        ------------------------------------------------- */

        const response =
            await fetch(
                "/api/create-razorpay-order/",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

    customer_name: customerName,

    customer_email: customerEmail,

    phone: customerPhone,

    address: customerAddress,

    customer_address: customerAddress,
    customer_state: customerState,
    coupon_code: couponCode,

    customer_latitude: deliveryPin.latitude,

    customer_longitude: deliveryPin.longitude,

    delivery_location_confirmed: true,

    restaurant_name: restaurantName,

    cart: cart,

})

                }
            );


        /* -------------------------------------------------
           READ RESPONSE SAFELY
        ------------------------------------------------- */

        let data;

        try {

            data =
                await response.json();

        } catch (jsonError) {

            console.error(
                "Invalid JSON response:",
                jsonError
            );

            throw new Error(
                "Server returned an invalid response."
            );
        }


        console.log(
            "Razorpay order response:",
            data
        );


        /* -------------------------------------------------
           API ERROR
        ------------------------------------------------- */

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                `Unable to create Razorpay order. HTTP ${response.status}`
            );

        }


        /* -------------------------------------------------
           CHECK RAZORPAY DATA
        ------------------------------------------------- */

        if (!data.key_id) {

            throw new Error(
                "Razorpay key ID was not returned by server."
            );

        }


        if (!data.order_id) {

            throw new Error(
                "Razorpay order ID was not returned by server."
            );

        }


        if (!data.amount) {

            throw new Error(
                "Payment amount was not returned by server."
            );

        }




console.log("========== PAYMENT DEBUG ==========");
console.log("Cart:", cart);
console.log("Subtotal:", subtotal);
console.log("Total:", total);
console.log("Razorpay amount:", data.amount);
console.log("Razorpay order ID:", data.order_id);
console.log("Razorpay key:", data.key_id);
console.log("Currency:", data.currency);
console.log("==================================");



        /* -------------------------------------------------
           RAZORPAY OPTIONS
        ------------------------------------------------- */

        const options = {

            key:
                data.key_id,

            amount:
                data.amount,

            currency:
                data.currency || "INR",

            name:
                "LocalMart",

            description:
                "LocalMart Order",

            order_id:
                data.order_id,


            /* ---------------------------------------------
               CUSTOMER
            --------------------------------------------- */

            prefill: {

                name:
                    customerName,

                email:
                    customerEmail,

                contact:
                    customerPhone

            },


            /* ---------------------------------------------
               NOTES
            --------------------------------------------- */

            notes: {

                address:
                    customerAddress

            },


            /* ---------------------------------------------
               THEME
            --------------------------------------------- */

            theme: {

                color:
                    "#00A651"

            },


            /* ---------------------------------------------
               SUCCESS
            --------------------------------------------- */

            handler:
                async function(paymentResponse) {

                    console.log(
                        "Razorpay payment response:",
                        paymentResponse
                    );


                    await verifyPayment(

                        paymentResponse,

                        data.local_order_id

                    );

                },

                

            /* ---------------------------------------------
               MODAL CLOSED
            --------------------------------------------- */

            modal: {

                ondismiss:
                    async function() {

                        console.log(
                            "Razorpay payment window closed."
                        );

                        try {
                            await fetch("/api/razorpay-payment-failed/", {
                                method: "POST",
                                headers: {"Content-Type": "application/json", "X-CSRFToken": getCsrfToken()},
                                body: JSON.stringify({local_order_id: data.local_order_id, razorpay_order_id: data.order_id})
                            });
                        } catch (failureError) {
                            console.error("Unable to release the dismissed payment reservation:", failureError);
                        }


                        payButton.disabled =
                            false;


                        payButton.innerHTML = `
                            <i class="bi bi-credit-card me-2"></i>
                            Pay Securely
                        `;

                    }

            }

        };


        /* -------------------------------------------------
           CREATE RAZORPAY INSTANCE
        ------------------------------------------------- */

        if (
            typeof Razorpay ===
            "undefined"
        ) {

            throw new Error(
                "Razorpay SDK is not loaded."
            );

        }


        const razorpay =
            new Razorpay(options);


        /* -------------------------------------------------
           PAYMENT FAILED
        ------------------------------------------------- */

        razorpay.on("payment.failed", async function (response) {

    console.error(
        "========== RAZORPAY PAYMENT FAILED =========="
    );

    console.error(
        JSON.stringify(response, null, 2)
    );

    console.error(
        "Description:",
        response?.error?.description
    );

    try {
        await fetch("/api/razorpay-payment-failed/", {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-CSRFToken": getCsrfToken()},
            body: JSON.stringify({local_order_id: data.local_order_id, razorpay_order_id: data.order_id})
        });
    } catch (failureError) {
        console.error("Unable to release the failed payment inventory reservation:", failureError);
    }

    alert(
        response?.error?.description ||
        "Payment failed. Please try another payment method."
    );

    payButton.disabled = false;

    payButton.innerHTML = `
        <i class="bi bi-credit-card me-2"></i>
        Pay Securely
    `;
});

        /* -------------------------------------------------
           OPEN RAZORPAY
        ------------------------------------------------- */

        razorpay.open();

    }


    catch(error) {

        console.error(
            "Payment error:",
            error
        );


        alert(
            error.message ||
            "Something went wrong while creating payment."
        );


        payButton.disabled =
            false;


        payButton.innerHTML = `
            <i class="bi bi-credit-card me-2"></i>
            Pay Securely
        `;

    }

}


/* =========================================================
   VERIFY RAZORPAY PAYMENT
========================================================= */

async function verifyPayment(
    paymentResponse,
    localOrderId
) {

    console.log(
        "Starting payment verification..."
    );


    try {

        /* -------------------------------------------------
           VERIFY PAYMENT
        ------------------------------------------------- */

        const response =
            await fetch(
                "/api/verify-payment/",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        razorpay_payment_id:
                            paymentResponse
                                .razorpay_payment_id,

                        razorpay_order_id:
                            paymentResponse
                                .razorpay_order_id,

                        razorpay_signature:
                            paymentResponse
                                .razorpay_signature,

                        customer_address:
                            document.getElementById("customerAddress")?.value.trim() || "",

                        local_order_id:
                            localOrderId

                    })

                }
            );


        /* -------------------------------------------------
           READ RESPONSE
        ------------------------------------------------- */

        let data;

        try {

            data =
                await response.json();

        } catch (jsonError) {

            throw new Error(
                "Invalid payment verification response."
            );

        }


        console.log(
            "Payment verification response:",
            data
        );


        /* -------------------------------------------------
           VERIFY ERROR
        ------------------------------------------------- */

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Payment verification failed."
            );

        }


        /* -------------------------------------------------
           PAYMENT SUCCESS
        ------------------------------------------------- */

        console.log(
            "Payment verified successfully."
        );


        /* -------------------------------------------------
           CLEAR CART
        ------------------------------------------------- */

        [
            "cart",
            "localmartFashionCart",
            "localmartFashionMenCart"
        ].forEach(key => localStorage.removeItem(key));

        localStorage.removeItem("localmartCart");
        localStorage.removeItem("localmartWishlist");


        /* -------------------------------------------------
           SAVE ORDER ID
        ------------------------------------------------- */

        if (localOrderId) {

            localStorage.setItem(
                "lastOrderId",
                localOrderId
            );

        }


        /* -------------------------------------------------
           REDIRECT
        ------------------------------------------------- */

        window.location.href = localOrderId ? `/order/${encodeURIComponent(localOrderId)}/track/` : "/order-success/";

    }


    catch(error) {

        console.error(
            "Payment verification error:",
            error
        );


        alert(
            error.message ||
            "Payment verification failed. Please contact support."
        );

    }

}
