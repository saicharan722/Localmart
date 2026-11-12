/* =========================================================
   LOCALMART WISHLIST
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const WISHLIST_KEYS = [
        "localmartFashionWishlist",
        "localmartFashionMenWishlist"
    ];

    const CART_KEY =
        "localmartFashionMenCart";

    const CART_KEYS = [
        "localmartFashionCart",
        CART_KEY
    ];


    const wishlistContainer =
        document.getElementById("wishlistProducts");

    const emptyWishlist =
        document.getElementById("emptyWishlist");

    const wishlistToolbar =
        document.getElementById("wishlistToolbar");

    const wishlistItemCount =
        document.getElementById("wishlistItemCount");

    const navbarWishlistCount =
        document.getElementById("navbarWishlistCount");

    const navbarCartCount =
        document.getElementById("navbarCartCount");

    const clearWishlist =
        document.getElementById("clearWishlist");

    const searchInput =
        document.getElementById("wishlistSearch");


    /* =====================================================
       STORAGE
    ===================================================== */

    function getWishlist() {

        try {

            const savedWishlist = WISHLIST_KEYS.flatMap(function (key) {
                const items = JSON.parse(localStorage.getItem(key)) || [];
                return Array.isArray(items)
                    ? items.map(item => ({ item, key }))
                    : [];
            });

            const savedProducts = JSON.parse(
                localStorage.getItem("localmartFashionMenProducts")
            ) || [];

            return savedWishlist
                .map(function (entry) {
                    const item = entry.item;
                    if (item && typeof item === "object") {
                        return { ...item, _wishlistKey: entry.key };
                    }

                    const product = savedProducts.find(
                        product => String(product.id) === String(item)
                    );

                    return product
                        ? { ...product, _wishlistKey: entry.key }
                        : null;
                })
                .filter(Boolean);

        } catch (error) {

            return [];

        }
    }


    function saveWishlist(wishlist) {

        const womenItems = wishlist
            .filter(item => item._wishlistKey === "localmartFashionWishlist")
            .map(({ _wishlistKey, ...item }) => item);
        const menItems = wishlist
            .filter(item => item._wishlistKey === "localmartFashionMenWishlist")
            .map(item => item.id);

        localStorage.setItem(
            "localmartFashionWishlist",
            JSON.stringify(womenItems)
        );
        localStorage.setItem(
            "localmartFashionMenWishlist",
            JSON.stringify(menItems)
        );

    }


    function getCart() {

        try {

            return CART_KEYS.flatMap(function (key) {
                const items = JSON.parse(localStorage.getItem(key)) || [];
                return Array.isArray(items) ? items : [];
            });

        } catch (error) {

            return [];

        }
    }


    function saveCart(cart) {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       FORMAT PRICE
    ===================================================== */

    function formatPrice(price) {

        return "₹" +
            Number(price || 0)
                .toLocaleString("en-IN");

    }


    /* =====================================================
       UPDATE COUNTS
    ===================================================== */

    function updateCounts() {

        const wishlist =
            getWishlist();

        const cart = getCart();


        const cartCount =
            cart.reduce(
                function (total, item) {

                    return total +
                        Number(item.quantity || 0);

                },
                0
            );


        if (navbarWishlistCount) {

            navbarWishlistCount.textContent =
                wishlist.length;

        }


        if (navbarCartCount) {

            navbarCartCount.textContent =
                cartCount;

        }


        if (wishlistItemCount) {

            wishlistItemCount.textContent =
                wishlist.length +
                (
                    wishlist.length === 1
                        ? " item"
                        : " items"
                );

        }

    }


    /* =====================================================
       ADD TO CART
    ===================================================== */

    function addToCart(productId) {

        const wishlist =
            getWishlist();

        const product =
            wishlist.find(
                item =>
                    String(item.id) ===
                    String(productId)
            );


        if (!product) {
            return;
        }


        const cartKey = product._wishlistKey === "localmartFashionWishlist"
            ? "localmartFashionCart"
            : CART_KEY;
        const cart = JSON.parse(
            localStorage.getItem(cartKey) || "[]"
        );


        const existing =
            cart.find(
                item =>
                    String(item.id) ===
                    String(productId)
            );


        if (existing) {

            existing.quantity =
                Number(existing.quantity || 0) + 1;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                brand: product.brand,

                price: Number(product.price),

                mrp: Number(product.mrp || 0),

                discount:
                    Number(product.discount || 0),

                image: product.image,

                quantity: 1

            });

        }


        localStorage.setItem(cartKey, JSON.stringify(cart));

        updateCounts();

        showToast(
            "Product added to cart"
        );

    }


    /* =====================================================
       REMOVE ITEM
    ===================================================== */

    function removeFromWishlist(productId) {

        let wishlist =
            getWishlist();


        wishlist =
            wishlist.filter(
                item =>
                    String(item.id) !==
                    String(productId)
            );


        saveWishlist(wishlist);

        renderWishlist();

        updateCounts();

        showToast(
            "Removed from wishlist"
        );

    }


    /* =====================================================
       MOVE TO CART
    ===================================================== */

    function moveToCart(productId) {

        addToCart(productId);

        removeFromWishlist(productId);

    }


    /* =====================================================
       RENDER WISHLIST
    ===================================================== */

    function renderWishlist() {

        let wishlist =
            getWishlist();


        /* SEARCH */

        const searchTerm =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        if (searchTerm) {

            wishlist =
                wishlist.filter(
                    item => {

                        const text = (

                            item.name +
                            " " +
                            item.brand

                        ).toLowerCase();


                        return text.includes(
                            searchTerm
                        );

                    }
                );

        }


        /* EMPTY */

        if (wishlist.length === 0) {

            wishlistContainer.innerHTML = "";

            emptyWishlist.style.display =
                "block";

            wishlistToolbar.style.display =
                getWishlist().length
                    ? "flex"
                    : "none";

            return;
        }


        emptyWishlist.style.display =
            "none";

        wishlistToolbar.style.display =
            "flex";


        /* CARDS */

        wishlistContainer.innerHTML =
            wishlist.map(function (product) {

                return `

                    <div
                        class="wishlist-card"
                        data-id="${product.id}"
                    >

                        <div class="wishlist-image-wrapper">

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                loading="lazy"
                            >


                            <button
                                class="remove-wishlist"
                                data-remove-id="${product.id}"
                                title="Remove from wishlist"
                            >

                                <i class="bi bi-heart-fill"></i>

                            </button>


                            ${
                                product.discount
                                ? `
                                    <span class="wishlist-discount">
                                        ${product.discount}% OFF
                                    </span>
                                `
                                : ""
                            }

                        </div>


                        <div class="wishlist-info">

                            <div class="wishlist-brand">
                                ${product.brand || ""}
                            </div>


                            <div class="wishlist-name">
                                ${product.name || ""}
                            </div>


                            <div class="wishlist-price">

                                <strong>
                                    ${formatPrice(product.price)}
                                </strong>

                                ${
                                    product.mrp
                                    ? `
                                        <del>
                                            ${formatPrice(product.mrp)}
                                        </del>
                                    `
                                    : ""
                                }

                                ${
                                    product.discount
                                    ? `
                                        <span>
                                            ${product.discount}% off
                                        </span>
                                    `
                                    : ""
                                }

                            </div>


                            <div class="wishlist-actions">

                                <button
                                    class="move-cart-btn"
                                    data-cart-id="${product.id}"
                                >

                                    <i class="bi bi-bag-plus"></i>

                                    Add to Cart

                                </button>


                                <button
                                    class="remove-btn"
                                    data-remove-id="${product.id}"
                                >

                                    <i class="bi bi-trash3"></i>

                                </button>

                            </div>

                        </div>

                    </div>

                `;

            }).join("");


        attachEvents();

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function attachEvents() {

        document
            .querySelectorAll(
                "[data-remove-id]"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        removeFromWishlist(
                            this.dataset.removeId
                        );

                    }
                );

            });


        document
            .querySelectorAll(
                "[data-cart-id]"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        moveToCart(
                            this.dataset.cartId
                        );

                    }
                );

            });

    }


    /* =====================================================
       CLEAR WISHLIST
    ===================================================== */

    if (clearWishlist) {

        clearWishlist.addEventListener(
            "click",
            function () {

                if (
                    getWishlist().length === 0
                ) {
                    return;
                }


                if (
                    confirm(
                        "Remove all products from your wishlist?"
                    )
                ) {

                    localStorage.removeItem(
                        WISHLIST_KEY
                    );

                    renderWishlist();

                    updateCounts();

                    showToast(
                        "Wishlist cleared"
                    );

                }

            }
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderWishlist
        );

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        let toast =
            document.getElementById(
                "wishlistToast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.id =
                "wishlistToast";

            toast.className =
                "localmart-toast";

            document.body.appendChild(
                toast
            );

        }


        toast.innerHTML = `

            <i class="bi bi-check-circle-fill"></i>

            <span>
                ${message}
            </span>

        `;


        toast.classList.add("show");


        clearTimeout(
            window.wishlistToastTimer
        );


        window.wishlistToastTimer =
            setTimeout(
                function () {

                    toast.classList.remove(
                        "show"
                    );

                },
                2200
            );

    }


    /* =====================================================
       INITIAL
    ===================================================== */

    renderWishlist();

    updateCounts();

});