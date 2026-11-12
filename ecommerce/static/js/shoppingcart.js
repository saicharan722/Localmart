/* =========================================================
   LOCALMART SHOPPING CART
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const CART_KEYS = [
        "localmartFashionCart",
        "localmartFashionMenCart"
    ];


    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    const cartSummary =
        document.getElementById("cartSummary");

    const cartItemCount =
        document.getElementById("cartItemCount");

    const navbarCartCount =
        document.getElementById("navbarCartCount");

    const totalMrp =
        document.getElementById("totalMrp");

    const totalDiscount =
        document.getElementById("totalDiscount");

    const totalAmount =
        document.getElementById("totalAmount");

    const clearCart =
        document.getElementById("clearCart");

    const checkoutBtn =
        document.getElementById("checkoutBtn");


    /* =====================================================
       STORAGE
    ===================================================== */

    function getCart() {

        try {

            return CART_KEYS.flatMap(function (key) {
                const items = JSON.parse(localStorage.getItem(key)) || [];
                return Array.isArray(items)
                    ? items.map(item => ({ ...item, _cartKey: key }))
                    : [];
            });

        } catch (error) {

            return [];

        }

    }


    function saveCart(cart) {

        CART_KEYS.forEach(function (key) {
            const items = cart
                .filter(item => item._cartKey === key)
                .map(({ _cartKey, ...item }) => item);
            localStorage.setItem(key, JSON.stringify(items));
        });

    }


    /* =====================================================
       PRICE
    ===================================================== */

    function formatPrice(price) {

        return "₹" +
            Number(price || 0)
                .toLocaleString("en-IN");

    }


    /* =====================================================
       UPDATE
    ===================================================== */

    function updateCart() {

        const cart =
            getCart();


        const itemCount =
            cart.reduce(
                function (total, item) {

                    return total +
                        Number(item.quantity || 0);

                },
                0
            );


        let mrp = 0;

        let sellingPrice = 0;


        cart.forEach(function (item) {

            const quantity =
                Number(item.quantity || 1);

            mrp +=
                Number(item.mrp || item.price) *
                quantity;

            sellingPrice +=
                Number(item.price || 0) *
                quantity;

        });


        const discount =
            Math.max(
                mrp - sellingPrice,
                0
            );


        if (cartItemCount) {

            cartItemCount.textContent =
                itemCount +
                (
                    itemCount === 1
                        ? " item"
                        : " items"
                );

        }


        if (navbarCartCount) {

            navbarCartCount.textContent =
                itemCount;

        }


        if (totalMrp) {

            totalMrp.textContent =
                formatPrice(mrp);

        }


        if (totalDiscount) {

            totalDiscount.textContent =
                "- " +
                formatPrice(discount);

        }


        if (totalAmount) {

            totalAmount.textContent =
                formatPrice(sellingPrice);

        }


        if (cart.length === 0) {

            cartItems.innerHTML = "";

            emptyCart.style.display =
                "block";

            cartSummary.style.display =
                "none";

            return;

        }


        emptyCart.style.display =
            "none";

        cartSummary.style.display =
            "block";


        renderCart(cart);

    }


    /* =====================================================
       RENDER
    ===================================================== */

    function renderCart(cart) {

        cartItems.innerHTML =
            cart.map(function (item) {

                const quantity =
                    Number(item.quantity || 1);


                return `

                    <div
                        class="cart-product"
                        data-id="${item.id}"
                    >

                        <div class="cart-product-image">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                                loading="lazy"
                            >

                        </div>


                        <div class="cart-product-details">

                            <div class="cart-product-top">

                                <div>

                                    <div class="cart-brand">
                                        ${item.brand || ""}
                                    </div>

                                    <div class="cart-product-name">
                                        ${item.name || ""}
                                    </div>

                                </div>


                                <button
                                    class="remove-cart-btn"
                                    data-remove="${item.id}"
                                    data-cart-key="${item._cartKey}"
                                    title="Remove item"
                                >

                                    <i class="bi bi-x-lg"></i>

                                </button>

                            </div>


                            <div class="cart-price">

                                <strong>
                                    ${formatPrice(item.price)}
                                </strong>

                                ${
                                    item.mrp
                                    ? `
                                        <del>
                                            ${formatPrice(item.mrp)}
                                        </del>
                                    `
                                    : ""
                                }

                            </div>


                            <div class="cart-bottom">

                                <div class="quantity-control">

                                    <button
                                        data-minus="${item.id}"
                                        data-cart-key="${item._cartKey}"
                                    >
                                        <i class="bi bi-dash"></i>
                                    </button>


                                    <span>
                                        ${quantity}
                                    </span>


                                    <button
                                        data-plus="${item.id}"
                                        data-cart-key="${item._cartKey}"
                                    >
                                        <i class="bi bi-plus"></i>
                                    </button>

                                </div>


                                <div class="item-total">

                                    ${formatPrice(
                                        Number(item.price) *
                                        quantity
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                `;

            }).join("");


        attachCartEvents();

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function attachCartEvents() {


        /* PLUS */

        document
            .querySelectorAll("[data-plus]")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        changeQuantity(
                            this.dataset.plus,
                            1,
                            this.dataset.cartKey
                        );

                    }
                );

            });


        /* MINUS */

        document
            .querySelectorAll("[data-minus]")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        changeQuantity(
                            this.dataset.minus,
                            -1,
                            this.dataset.cartKey
                        );

                    }
                );

            });


        /* REMOVE */

        document
            .querySelectorAll("[data-remove]")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        removeItem(
                            this.dataset.remove,
                            this.dataset.cartKey
                        );

                    }
                );

            });

    }


    /* =====================================================
       QUANTITY
    ===================================================== */

    function changeQuantity(
        productId,
        change,
        cartKey
    ) {

        const cart =
            getCart();


        const item =
            cart.find(
                item =>
                    String(item.id) ===
                    String(productId) &&
                    item._cartKey === cartKey
            );


        if (!item) {
            return;
        }


        item.quantity =
            Number(item.quantity || 1) +
            change;


        if (item.quantity <= 0) {

            const index =
                cart.indexOf(item);

            cart.splice(index, 1);

        }


        saveCart(cart);

        updateCart();

    }


    /* =====================================================
       REMOVE
    ===================================================== */

    function removeItem(productId, cartKey) {

        let cart =
            getCart();


        cart =
            cart.filter(
                item =>
                    String(item.id) !==
                    String(productId) ||
                    item._cartKey !== cartKey
            );


        saveCart(cart);

        updateCart();

        showToast(
            "Item removed from cart"
        );

    }


    /* =====================================================
       CLEAR
    ===================================================== */

    if (clearCart) {

        clearCart.addEventListener(
            "click",
            function () {

                if (
                    getCart().length === 0
                ) {
                    return;
                }


                if (
                    confirm(
                        "Remove all items from your cart?"
                    )
                ) {

                    CART_KEYS.forEach(key => localStorage.removeItem(key));

                    updateCart();

                }

            }
        );

    }


    /* =====================================================
       CHECKOUT
    ===================================================== */

    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            function () {

                const cart =
                    getCart();


                if (cart.length === 0) {

                    showToast(
                        "Your cart is empty"
                    );

                    return;

                }


                /*
                   Your existing LocalMart Razorpay
                   checkout can be connected here.
                */

                window.location.href =
                    "/checkout/";

            }
        );

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        let toast =
            document.getElementById(
                "cartToast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.id =
                "cartToast";

            toast.className =
                "cart-toast";

            document.body.appendChild(
                toast
            );

        }


        toast.innerHTML = `

            <i class="bi bi-check-circle-fill"></i>

            ${message}

        `;


        toast.classList.add("show");


        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2000
        );

    }


    /* =====================================================
       INITIAL
    ===================================================== */

    updateCart();

});