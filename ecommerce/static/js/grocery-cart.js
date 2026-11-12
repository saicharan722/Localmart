document.addEventListener("DOMContentLoaded", function () {

    const GROCERY_CART_KEY = "localmartGroceryCart";
    const GROCERY_CART_KEYS = [
        GROCERY_CART_KEY,
        "localmartCart",
        "breakfastCart",
        "localmartDrinksJuicesCart",
        "localmartIceCreamTubsCart",
        "localmartMasalaCart",
        "localmartPackagedFoodCart",
        "localmartIndianSweetsCart",
        "localmartTeaCoffeeMoreCart"
    ];

    const cartContainer =
        document.getElementById("cartContainer");

    const subtotalElement =
        document.getElementById("subtotal");

    const taxElement =
        document.getElementById("tax");

    const totalElement =
        document.getElementById("grandTotal");

    const cartCountElement =
        document.getElementById("cartCount");

    const cartItemCountElement =
        document.getElementById("cartItemCount");

    const checkoutButton =
        document.getElementById("checkoutBtn");

    const toast =
        document.getElementById("lmToast");


    /* =========================
       CHECK CART CONTAINER
    ========================= */

    if (!cartContainer) {

        console.error(
            "Grocery Cart: #cartContainer not found."
        );

        return;
    }


    /* =========================
       GET GROCERY CART
    ========================= */

    function getCart() {

        try {

            const teaCoffeeProducts = JSON.parse(
                localStorage.getItem("localmartTeaCoffeeMoreProducts") || "[]"
            );
            const merged = [];
            const indexById = new Map();
            GROCERY_CART_KEYS.forEach(key => {
                const saved = JSON.parse(localStorage.getItem(key) || "[]");
                if (!Array.isArray(saved)) return;
                saved.forEach(item => {
                    const id = String(item.id ?? item.name ?? `${key}-${merged.length}`);
                    const teaProduct = teaCoffeeProducts.find(
                        product => String(product.id) === id
                    );
                    const normalized = teaProduct
                        ? {
                            ...teaProduct,
                            ...item,
                            price: Number(item.price) > 0 ? item.price : teaProduct.price,
                            image: item.image || teaProduct.image
                        }
                        : item;
                    const existing = indexById.get(id);
                    if (existing) {
                        existing.quantity = Number(existing.quantity || 1) + Number(normalized.quantity || 1);
                    } else {
                        const copy = { ...normalized, quantity: Number(normalized.quantity || 1) };
                        indexById.set(id, copy);
                        merged.push(copy);
                    }
                });
            });
            return merged;

        } catch (error) {

            console.error(
                "Error reading Grocery Cart:",
                error
            );

            return [];
        }
    }


    /* =========================
       SAVE GROCERY CART
    ========================= */

    function saveCart(cart) {

        try {

            localStorage.setItem(
                GROCERY_CART_KEY,
                JSON.stringify(cart)
            );

            GROCERY_CART_KEYS
                .filter(key => key !== GROCERY_CART_KEY)
                .forEach(key => localStorage.removeItem(key));


            window.dispatchEvent(
                new CustomEvent(
                    "groceryCartUpdated"
                )
            );


            return true;

        } catch (error) {

            console.error(
                "Error saving Grocery Cart:",
                error
            );

            return false;
        }
    }


    /* =========================
       ESCAPE HTML
    ========================= */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =========================
       FORMAT PRICE
    ========================= */

    function formatPrice(value) {

        return "₹" +
            Number(value || 0).toFixed(2);
    }


    /* =========================
       TOAST
    ========================= */

    function showToast(message) {

        if (!toast) {

            console.log(message);

            return;
        }


        toast.textContent =
            message;


        toast.style.display =
            "block";


        clearTimeout(
            window.groceryToastTimer
        );


        window.groceryToastTimer =
            setTimeout(
                function () {

                    toast.style.display =
                        "none";

                },
                2500
            );
    }


    /* =========================
       UPDATE CART COUNTS
    ========================= */

    function updateCounts() {

        const cart =
            getCart();


        const quantity =
            cart.reduce(
                function (total, item) {

                    return total +
                        Number(
                            item.quantity || 0
                        );

                },
                0
            );


        if (cartCountElement) {

            cartCountElement.textContent =
                quantity;

        }


        if (cartItemCountElement) {

            cartItemCountElement.textContent =
                `${quantity} ${
                    quantity === 1
                        ? "item"
                        : "items"
                }`;

        }
    }


    /* =========================
       UPDATE SUMMARY
    ========================= */

    function updateSummary() {

        const cart =
            getCart();


        let subtotal = 0;


        cart.forEach(
            function (item) {

                const price =
                    Number(
                        item.price || 0
                    );


                const quantity =
                    Number(
                        item.quantity || 1
                    );


                subtotal +=
                    price * quantity;
            }
        );


        const tax =
            subtotal * 0.05;


        const total =
            subtotal + tax;


        if (subtotalElement) {

            subtotalElement.textContent =
                formatPrice(subtotal);

        }


        if (taxElement) {

            taxElement.textContent =
                formatPrice(tax);

        }


        if (totalElement) {

            totalElement.textContent =
                formatPrice(total);

        }
    }


    /* =========================
       EMPTY CART
    ========================= */

    function renderEmptyCart() {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">

                    <i class="bi bi-cart-x"></i>

                </div>


                <h4>
                    Your Grocery Cart is Empty
                </h4>


                <p>
                    Add vegetables, fruits,
                    dairy and daily essentials
                    to your cart.
                </p>


                <a
                    href="/grocery/"
                    class="btn btn-success rounded-pill px-4 mt-2"
                >

                    <i class="bi bi-arrow-left me-2"></i>

                    Start Grocery Shopping

                </a>

            </div>

        `;


        updateSummary();

        updateCounts();


        if (checkoutButton) {

            checkoutButton.disabled =
                true;

            checkoutButton.style.opacity =
                "0.55";

            checkoutButton.style.cursor =
                "not-allowed";
        }
    }


    /* =========================
       RENDER CART
    ========================= */

    function renderCart() {

        const cart =
            getCart();


        updateCounts();


        if (cart.length === 0) {

            renderEmptyCart();

            return;
        }


        if (checkoutButton) {

            checkoutButton.disabled =
                false;

            checkoutButton.style.opacity =
                "1";

            checkoutButton.style.cursor =
                "pointer";
        }


        let html = "";


        cart.forEach(
            function (item, index) {

                const name =
                    escapeHTML(
                        item.name ||
                        "Grocery Product"
                    );


                const category =
                    escapeHTML(
                        item.category ||
                        ""
                    );


                const unit =
                    escapeHTML(
                        item.unit ||
                        ""
                    );


                const image =
                    escapeHTML(
                        item.image ||
                        ""
                    );


                const price =
                    Number(
                        item.price || 0
                    );


                const mrp =
                    Number(
                        item.mrp || 0
                    );


                const quantity =
                    Math.max(
                        1,
                        Number(
                            item.quantity || 1
                        )
                    );


                const discount =
                    Number(
                        item.discount || 0
                    );


                const rating =
                    Number(
                        item.rating || 0
                    );


                const reviews =
                    Number(
                        item.reviews || 0
                    );


                const itemTotal =
                    price * quantity;


                html += `

                    <div
                        class="cart-item"
                        data-index="${index}"
                    >

                        <div class="row align-items-center g-3">


                            <!-- IMAGE -->

                            <div
                                class="col-4 col-md-2"
                            >

                                <div class="cart-image-box">

                                    ${
                                        image
                                        ?
                                        `
                                        <img
                                            src="${image}"
                                            alt="${name}"
                                            loading="lazy"
                                            onerror="
                                                this.style.display='none';
                                            "
                                        >
                                        `
                                        :
                                        `
                                        <i
                                            class="bi bi-image text-muted fs-2"
                                        ></i>
                                        `
                                    }

                                </div>

                            </div>


                            <!-- DETAILS -->

                            <div
                                class="col-8 col-md-4"
                            >

                                <div class="product-name">

                                    ${name}

                                </div>


                                ${
                                    category
                                    ?
                                    `
                                    <div class="product-category">

                                        ${category}

                                    </div>
                                    `
                                    :
                                    ""
                                }


                                ${
                                    unit
                                    ?
                                    `
                                    <div class="product-unit">

                                        ${unit}

                                    </div>
                                    `
                                    :
                                    ""
                                }


                                <div
                                    class="d-flex flex-wrap gap-2 mt-2"
                                >

                                    ${
                                        rating > 0
                                        ?
                                        `
                                        <span class="rating">

                                            <i class="bi bi-star-fill"></i>

                                            ${rating.toFixed(1)}

                                        </span>
                                        `
                                        :
                                        ""
                                    }


                                    ${
                                        reviews > 0
                                        ?
                                        `
                                        <span
                                            class="small text-muted"
                                        >

                                            ${reviews.toLocaleString()}
                                            reviews

                                        </span>
                                        `
                                        :
                                        ""
                                    }


                                    ${
                                        discount > 0
                                        ?
                                        `
                                        <span class="discount">

                                            ${discount}% OFF

                                        </span>
                                        `
                                        :
                                        ""
                                    }

                                </div>

                            </div>


                            <!-- PRICE -->

                            <div
                                class="col-6 col-md-2"
                            >

                                <div
                                    class="small text-muted"
                                >

                                    Price

                                </div>


                                <div class="current-price">

                                    ${formatPrice(price)}

                                </div>


                                ${
                                    mrp > price
                                    ?
                                    `
                                    <div class="mrp">

                                        ${formatPrice(mrp)}

                                    </div>
                                    `
                                    :
                                    ""
                                }

                            </div>


                            <!-- QUANTITY -->

                            <div
                                class="col-6 col-md-2"
                            >

                                <div
                                    class="small text-muted mb-1"
                                >

                                    Quantity

                                </div>


                                <div class="quantity-control">

                                    <button
                                        type="button"
                                        onclick="changeQuantity(${index}, -1)"
                                        aria-label="Decrease quantity"
                                    >

                                        −

                                    </button>


                                    <span
                                        class="quantity-number"
                                    >

                                        ${quantity}

                                    </span>


                                    <button
                                        type="button"
                                        onclick="changeQuantity(${index}, 1)"
                                        aria-label="Increase quantity"
                                    >

                                        +

                                    </button>

                                </div>

                            </div>


                            <!-- TOTAL -->

                            <div
                                class="col-12 col-md-2 text-md-end"
                            >

                                <div
                                    class="small text-muted"
                                >

                                    Item Total

                                </div>


                                <div
                                    class="fw-bold"
                                    style="font-size:18px;"
                                >

                                    ${formatPrice(itemTotal)}

                                </div>


                                <button
                                    type="button"
                                    class="remove-btn"
                                    onclick="removeItem(${index})"
                                >

                                    <i
                                        class="bi bi-trash me-1"
                                    ></i>

                                    Remove

                                </button>

                            </div>


                        </div>

                    </div>

                `;
            }
        );


        cartContainer.innerHTML =
            html;


        updateSummary();

        updateCounts();
    }


    /* =========================
       CHANGE QUANTITY
    ========================= */

    function changeQuantity(
        index,
        change
    ) {

        const cart =
            getCart();


        if (!cart[index]) {
            return;
        }


        const currentQuantity =
            Math.max(
                1,
                Number(
                    cart[index].quantity || 1
                )
            );


        const newQuantity =
            currentQuantity + change;


        if (newQuantity <= 0) {

            const name =
                cart[index].name ||
                "Product";


            cart.splice(
                index,
                1
            );


            saveCart(cart);

            renderCart();


            showToast(
                `${name} removed from Grocery Cart`
            );


            return;
        }


        cart[index].quantity =
            newQuantity;


        saveCart(cart);

        renderCart();
    }


    /* =========================
       REMOVE ITEM
    ========================= */

    function removeItem(index) {

        const cart =
            getCart();


        if (!cart[index]) {
            return;
        }


        const name =
            cart[index].name ||
            "Product";


        cart.splice(
            index,
            1
        );


        saveCart(cart);

        renderCart();


        showToast(
            `${name} removed from Grocery Cart`
        );
    }


    /* =========================
       CLEAR GROCERY CART
    ========================= */

    function clearCart() {

        GROCERY_CART_KEYS.forEach(key => localStorage.removeItem(key));


        updateCounts();

        updateSummary();

        renderCart();


        showToast(
            "Grocery Cart cleared"
        );
    }


    /* =========================
       CHECKOUT
    ========================= */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                const currentCart =
                    getCart();


                if (
                    currentCart.length === 0
                ) {

                    showToast(
                        "Your Grocery Cart is empty!"
                    );

                    return;
                }

                // Checkout reads the shared key, so persist any merged category carts first.
                saveCart(currentCart);


                /*
                 * IMPORTANT:
                 * Grocery checkout must use
                 * the Grocery checkout route.
                 *
                 * Change this URL if your
                 * urls.py uses another name/path.
                 */

                window.location.href =
                    "/grocery/checkout/";

            }
        );
    }


    /* =========================
       GROCERY CART EVENT
    ========================= */

    window.addEventListener(
        "groceryCartUpdated",
        function () {

            renderCart();

        }
    );


    /* =========================
       LOCAL STORAGE EVENT
    ========================= */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                GROCERY_CART_KEY
            ) {

                renderCart();

            }
        }
    );


    /* =========================
       EXPOSE FUNCTIONS
    ========================= */

    window.changeQuantity =
        changeQuantity;


    window.removeItem =
        removeItem;


    window.clearGroceryCart =
        clearCart;


    window.getGroceryCart =
        getCart;


    window.updateGroceryCartCount =
        updateCounts;


    /* =========================
       INITIAL RENDER
    ========================= */

    renderCart();

});

