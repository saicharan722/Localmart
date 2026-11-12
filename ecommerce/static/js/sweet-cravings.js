"use strict";

/*
    LOCALMART
    INDIAN SWEETS - JIOMART STYLE
*/


/* =========================================================
   PRODUCT DATA
========================================================= */

const indianSweetsProducts = [

    /* =========================
       TINNED & PACKED SWEETS
    ========================= */

    {
        id: "sweet-001",
        name: "Karachi Bakery Classic Soan Papdi 200 g",
        brand: "Karachi Bakery",
        category: "tinned-packed-sweets",
        unit: "200 g",
        price: 50,
        mrp: 100,
        rating: 4.4,
        reviews: 128,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004915861661.jpg.e6851b8567.jpg"
    },

    {
        id: "sweet-002",
        name: "Jabsons Peanut Gud Laddu 210 g",
        brand: "Jabsons",
        category: "tinned-packed-sweets",
        unit: "210 g",
        price: 114,
        mrp: 120,
        rating: 4.5,
        reviews: 96,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004915871381.jpg.0f605c7525.jpg"
    },

    {
        id: "sweet-003",
        name: "Vijaya Till Laddu 150 g",
        brand: "Vijaya",
        category: "ladoo",
        unit: "150 g",
        price: 55,
        mrp: 110,
        rating: 4.3,
        reviews: 72,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004915522101.jpg.563ec66566.jpg"
    },

    {
        id: "sweet-004",
        name: "Heritage Doodh Peda 200 g",
        brand: "Heritage",
        category: "tinned-packed-sweets",
        unit: "200 g",
        price: 105,
        mrp: 125,
        rating: 4.4,
        reviews: 115,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004909262611.jpg.1bff835bde.jpg"
    },

    {
        id: "sweet-005",
        name: "Jabsons Peanut Gud Chikki 240 g",
        brand: "Jabsons",
        category: "chikki",
        unit: "240 g",
        price: 114,
        mrp: 120,
        rating: 4.6,
        reviews: 141,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004915871391.jpg.5ce69910ad.jpg"
    },

    {
        id: "sweet-006",
        name: "Jabsons Sesame/Til Gud Laddu 210 g",
        brand: "Jabsons",
        category: "ladoo",
        unit: "210 g",
        price: 114,
        mrp: 120,
        rating: 4.5,
        reviews: 87,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004915871401.jpg.e2d0242c5a.jpg"
    },

    {
        id: "sweet-007",
        name: "Lal Dharwaad Peda 200 g",
        brand: "Lal",
        category: "tinned-packed-sweets",
        unit: "200 g",
        price: 125,
        mrp: 250,
        rating: 4.3,
        reviews: 64,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004913357141.jpg.689700bb4a.jpg"
    },

    {
        id: "sweet-008",
        name: "Jabsons Sesame Gud Chikki 240 g",
        brand: "Jabsons",
        category: "chikki",
        unit: "240 g",
        price: 114,
        mrp: 120,
        rating: 4.5,
        reviews: 92,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.p/ng/240chikkitilgudcoverpouchfront.png.e4b055ac1c.png"
    },

    {
        id: "sweet-009",
        name: "Balaji Foods Toffi Bar Chikki 200 g",
        brand: "Balaji Foods",
        category: "chikki",
        unit: "200 g",
        price: 51,
        mrp: 60,
        rating: 4.2,
        reviews: 58,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/balaji-foods-toffi-bar-chikki-200-g-0-20200801.jpg.a089f3c1a3.jpg"
    },

    {
        id: "sweet-010",
        name: "Lal Kaju Katli 200 g",
        brand: "Lal",
        category: "tinned-packed-sweets",
        unit: "200 g",
        price: 187,
        mrp: 375,
        rating: 4.5,
        reviews: 132,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004913357131.jpg.5429072c38.jpg"
    },

    {
        id: "sweet-011",
        name: "Balaji Foods Falli Laddu 200 g",
        brand: "Balaji Foods",
        category: "tinned-packed-sweets",
        unit: "200 g",
        price: 51,
        mrp: 60,
        rating: 4.2,
        reviews: 61,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/balaji-foods-falli-laddu-200-g-0-20200801.jpg.be0346a841.jpg"
    },

    {
        id: "sweet-012",
        name: "Karachi Bakery Mysore Pak 200 g",
        brand: "Karachi Bakery",
        category: "tinned-packed-sweets",
        unit: "200 g",
        price: 87,
        mrp: 175,
        rating: 4.4,
        reviews: 83,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004915861711.jpg.5025472b67.jpg"
    },

    {
        id: "sweet-013",
        name: "Amul Kaju Katri 200 g",
        brand: "Amul",
        category: "tinned-packed-sweets",
        unit: "200 g",
        price: 225,
        mrp: 250,
        rating: 4.5,
        reviews: 174,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004913207711.jpg.dd62bf61ec.jpg"
    },

    {
        id: "sweet-014",
        name: "Haldiram's Nagpur Gulab Jamun 1 kg",
        brand: "Haldiram's",
        category: "tinned-packed-sweets",
        unit: "1 Pack",
        price: 213,
        mrp: 225,
        rating: 4.6,
        reviews: 219,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004906172821.jpg.82a413a8ce.jpg"
    },

    {
        id: "sweet-015",
        name: "Sri Sri Palli Laddu 180 g",
        brand: "Sri Sri",
        category: "tinned-packed-sweets",
        unit: "180 g",
        price: 35,
        mrp: 70,
        rating: 4.2,
        reviews: 49,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004914325731.jpg.3246418fb2.jpg"
    },

    {
        id: "sweet-016",
        name: "Jabsons Peanut Gud Chikki/Brittle 50 g",
        brand: "Jabsons",
        category: "chikki",
        unit: "1 Pack",
        price: 19,
        mrp: 20,
        rating: 4.4,
        reviews: 76,
        deliveryTime: "24 mins",
        inStock: true,
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004947488181.jpg.0083ab0483.jpg"
    }

];


/* =========================================================
   STORAGE
========================================================= */

const CART_KEY = "localmartGroceryCart";
const WISHLIST_KEY = "localmartGroceryWishlist";

let cart = JSON.parse(
    localStorage.getItem(CART_KEY) || localStorage.getItem("localmartIndianSweetsCart") || "[]"
);

let wishlist = JSON.parse(
    localStorage.getItem(WISHLIST_KEY) || localStorage.getItem("localmartIndianSweetsWishlist") || "[]"
).map(item => {
    if (item && typeof item === "object") return item;
    return indianSweetsProducts.find(product => String(product.id) === String(item)) || {
        id: item, name: "Saved grocery product", category: "Grocery",
        price: 0, mrp: 0, image: "", quantity: 1
    };
});
localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
localStorage.removeItem("localmartIndianSweetsWishlist");

let activeCategory = "all";
let searchText = "";
let maxPrice = 1000;
let stockOnly = false;


/* =========================================================
   DOM
========================================================= */

const productsGrid =
    document.getElementById("productsGrid");

const productCount =
    document.getElementById("productCount");

const selectedCategoryTitle =
    document.getElementById("selectedCategoryTitle");

const emptyState =
    document.getElementById("emptyState");

const sortProducts =
    document.getElementById("sortProducts");

const sweetSearch =
    document.getElementById("sweetSearch");

const clearSearch =
    document.getElementById("clearSearch");

const wishlistCount =
    document.getElementById("wishlistCount");

const cartCount =
    document.getElementById("cartCount");

const cartDrawer =
    document.getElementById("cartDrawer");

const drawerOverlay =
    document.getElementById("drawerOverlay");

const cartBody =
    document.getElementById("cartBody");

const cartEmpty =
    document.getElementById("cartEmpty");

const cartFooter =
    document.getElementById("cartFooter");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTotal =
    document.getElementById("cartTotal");

const cartItemSummary =
    document.getElementById("cartItemSummary");

const lmToast =
    document.getElementById("lmToast");


/* =========================================================
   HELPERS
========================================================= */

function saveCart() {
    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}


function saveWishlist() {
    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );
}


function formatPrice(value) {
    return "â‚¹" + Number(value).toLocaleString("en-IN");
}


function getDiscount(product) {

    if (
        !product.mrp ||
        Number(product.mrp) <= Number(product.price)
    ) {
        return 0;
    }

    return Math.round(
        (
            (Number(product.mrp) - Number(product.price)) /
            Number(product.mrp)
        ) * 100
    );
}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function showToast(message) {

    if (!lmToast) {
        return;
    }

    lmToast.textContent = message;

    lmToast.classList.add("show");

    clearTimeout(window.localmartToastTimer);

    window.localmartToastTimer =
        setTimeout(() => {
            lmToast.classList.remove("show");
        }, 1800);
}


function normalizeBrand(value) {

    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

    let result = [...indianSweetsProducts];


    /* CATEGORY */

    if (activeCategory !== "all") {

        result = result.filter(
            product =>
                product.category === activeCategory
        );
    }


    /* SEARCH */

    if (searchText) {

        const query =
            searchText.toLowerCase().trim();

        result = result.filter(product => {

            return (
                product.name
                    .toLowerCase()
                    .includes(query) ||

                product.brand
                    .toLowerCase()
                    .includes(query) ||

                product.category
                    .toLowerCase()
                    .includes(query) ||

                product.unit
                    .toLowerCase()
                    .includes(query)
            );

        });
    }


    /* PRICE */

    result = result.filter(
        product =>
            Number(product.price) <= Number(maxPrice)
    );


    /* STOCK */

    if (stockOnly) {

        result = result.filter(
            product =>
                product.inStock === true
        );
    }


    /* CATEGORY CHECKBOXES */

    const selectedCategories = [
        ...document.querySelectorAll(
            '#categoryFilters input[type="checkbox"]:checked'
        )
    ].map(input => input.value);


    if (selectedCategories.length) {

        result = result.filter(
            product =>
                selectedCategories.includes(
                    product.category
                )
        );
    }


    /* BRAND CHECKBOXES */

    const selectedBrands = [
        ...document.querySelectorAll(
            '#brandFilters input[type="checkbox"]:checked'
        )
    ].map(input =>
        normalizeBrand(input.value)
    );


    if (selectedBrands.length) {

        result = result.filter(product =>
            selectedBrands.includes(
                normalizeBrand(product.brand)
            )
        );
    }


    /* RATING */

    const ratingFilters = [
        ...document.querySelectorAll(
            ".rating-filter:checked"
        )
    ].map(input =>
        Number(input.value)
    );


    if (ratingFilters.length) {

        const minimumRating =
            Math.max(...ratingFilters);

        result = result.filter(
            product =>
                Number(product.rating) >= minimumRating
        );
    }


    return result;
}


/* =========================================================
   SORT
========================================================= */

function sortProductsList(products) {

    const sorted = [...products];

    if (!sortProducts) {
        return sorted;
    }

    switch (sortProducts.value) {

        case "price-low":

            sorted.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

            break;


        case "price-high":

            sorted.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

            break;


        case "discount":

            sorted.sort(
                (a, b) =>
                    getDiscount(b) -
                    getDiscount(a)
            );

            break;


        case "rating":

            sorted.sort(
                (a, b) =>
                    Number(b.rating) -
                    Number(a.rating)
            );

            break;
    }

    return sorted;
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const discount =
        getDiscount(product);

    const wishlistActive =
        wishlist.some(item => String(typeof item === "object" ? item.id : item) === String(product.id));

    const cartItem =
        cart.find(
            item =>
                item.id === product.id
        );

    const quantity =
        cartItem
            ? Number(cartItem.quantity)
            : 0;


    return `
        <article
            class="product-card"
            data-product-id="${escapeHTML(product.id)}"
        >

            <div class="product-image-box">

                ${
                    discount > 0
                    ?
                    `
                    <span class="discount-badge">
                        ${discount}% OFF
                    </span>
                    `
                    :
                    ""
                }


                <button
                    type="button"
                    class="product-wishlist ${
                        wishlistActive ? "active" : ""
                    }"
                    onclick="toggleWishlist('${product.id}')"
                    aria-label="Add to wishlist"
                    title="${
                        wishlistActive
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }"
                >
                    <i class="bi ${
                        wishlistActive
                            ? "bi-heart-fill"
                            : "bi-heart"
                    }"></i>
                </button>


                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                    onerror="this.classList.add('image-error')"
                >

            </div>


            <div class="product-info">

                <div class="product-add-row">

                    <span class="product-unit">
                        ${escapeHTML(product.unit)}
                    </span>


                    ${
                        quantity > 0
                        ?
                        `
                        <div class="qty-control">

                            <button
                                type="button"
                                onclick="changeQuantity(
                                    '${product.id}',
                                    -1
                                )"
                                aria-label="Decrease quantity"
                            >
                                âˆ’
                            </button>

                            <span>
                                ${quantity}
                            </span>

                            <button
                                type="button"
                                onclick="changeQuantity(
                                    '${product.id}',
                                    1
                                )"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>

                        </div>
                        `
                        :
                        `
                        <button
                            type="button"
                            class="add-btn"
                            onclick="addToCart('${product.id}')"
                        >
                            ADD
                        </button>
                        `
                    }

                </div>


                <div class="product-name">
                    ${escapeHTML(product.name)}
                </div>


                <div class="price-row">

                    <strong class="sale-price">
                        ${formatPrice(product.price)}
                    </strong>


                    ${
                        Number(product.mrp) >
                        Number(product.price)
                        ?
                        `
                        <span class="mrp">
                            ${formatPrice(product.mrp)}
                        </span>
                        `
                        :
                        ""
                    }

                </div>


                <div class="product-delivery">

                    <i class="bi bi-lightning-charge-fill"></i>

                    <span>
                        ${escapeHTML(product.deliveryTime)}
                    </span>

                </div>


                ${
                    Number(product.rating) > 0
                    ?
                    `
                    <div class="product-rating">

                        <span class="rating">
                            ${Number(product.rating).toFixed(1)} â˜…
                        </span>

                        <span class="reviews">
                            ${Number(
                                product.reviews
                            ).toLocaleString("en-IN")}
                            ratings
                        </span>

                    </div>
                    `
                    :
                    ""
                }

            </div>

        </article>
    `;
}


/* =========================================================
   DISPLAY PRODUCTS
========================================================= */

function displayProducts() {

    if (!productsGrid) {
        return;
    }


    let products =
        getFilteredProducts();


    products =
        sortProductsList(products);


    if (productCount) {

        productCount.textContent =
            `${products.length} Product${
                products.length !== 1
                    ? "s"
                    : ""
            }`;
    }


    if (selectedCategoryTitle) {

        if (searchText) {

            selectedCategoryTitle.textContent =
                `Search results for "${searchText}"`;

        } else {

            const activeButton =
                document.querySelector(
                    ".sweet-category.active"
                );

            selectedCategoryTitle.textContent =
                activeButton
                    ? activeButton.innerText.trim()
                    : "Indian Sweets";
        }
    }


    if (!products.length) {

        productsGrid.innerHTML = "";

        if (emptyState) {
            emptyState.style.display = "block";
        }

        return;
    }


    if (emptyState) {
        emptyState.style.display = "none";
    }


    productsGrid.innerHTML =
        products
            .map(createProductCard)
            .join("");
}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id) {

    const index = wishlist.findIndex(item => String(typeof item === "object" ? item.id : item) === String(id));


    if (index === -1) {

        const product = indianSweetsProducts.find(item => String(item.id) === String(id));
        if (product) wishlist.push({ ...product, quantity: 1 });

        showToast("Added to wishlist");

    } else {

        wishlist.splice(index, 1);

        showToast("Removed from wishlist");
    }


    saveWishlist();

    updateWishlistCount();

    displayProducts();
}


function updateWishlistCount() {

    if (!wishlistCount) {
        return;
    }

    wishlistCount.textContent =
        wishlist.length;
}


const wishlistBtn =
    document.getElementById("wishlistBtn");


if (wishlistBtn) {

    wishlistBtn.addEventListener(
        "click",
        () => {

            if (!wishlist.length) {

                showToast(
                    "Your wishlist is empty"
                );

                return;
            }


            const firstWishlistProduct =
                indianSweetsProducts.find(
                    product =>
                        wishlist.some(item => String(typeof item === "object" ? item.id : item) === String(product.id))
                );


            if (
                firstWishlistProduct &&
                sweetSearch
            ) {

                sweetSearch.value =
                    firstWishlistProduct.name;

                searchText =
                    firstWishlistProduct.name;

                if (clearSearch) {

                    clearSearch.style.display =
                        "block";
                }

                displayProducts();
            }

        }
    );
}


/* =========================================================
   CART
========================================================= */

function addToCart(id) {

    const product =
        indianSweetsProducts.find(
            item =>
                item.id === id
        );


    if (!product) {
        return;
    }


    if (product.inStock === false) {

        showToast(
            "Product is currently unavailable"
        );

        return;
    }


    const existing =
        cart.find(
            item =>
                item.id === id
        );


    if (existing) {

        existing.quantity =
            Number(existing.quantity) + 1;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });
    }


    saveCart();

    updateCartCount();

    displayProducts();

    renderCart();

    showToast(
        `${product.name} added to cart`
    );
}


function changeQuantity(id, amount) {

    const item =
        cart.find(
            cartItem =>
                cartItem.id === id
        );


    if (!item) {
        return;
    }


    item.quantity =
        Number(item.quantity) +
        Number(amount);


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    cartItem.id !== id
            );
    }


    saveCart();

    updateCartCount();

    renderCart();

    displayProducts();
}


function updateCartCount() {

    if (!cartCount) {
        return;
    }


    const totalQuantity =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(item.quantity || 0),
            0
        );


    cartCount.textContent =
        totalQuantity;
}


/* =========================================================
   CART RENDER
========================================================= */

function renderCart() {

    if (
        !cartBody ||
        !cartEmpty ||
        !cartFooter
    ) {
        return;
    }


    if (!cart.length) {

        cartBody.innerHTML = "";

        cartEmpty.style.display =
            "flex";

        cartFooter.style.display =
            "none";

        if (cartItemSummary) {

            cartItemSummary.textContent =
                "0 items";
        }

        return;
    }


    cartEmpty.style.display =
        "none";

    cartFooter.style.display =
        "block";


    let subtotal = 0;
    let totalItems = 0;


    cartBody.innerHTML =
        cart.map(item => {

            const product =
                indianSweetsProducts.find(
                    p =>
                        p.id === item.id
                );


            if (!product) {
                return "";
            }


            const quantity =
                Number(item.quantity);


            subtotal +=
                Number(product.price) *
                quantity;


            totalItems +=
                quantity;


            return `

                <div class="cart-item">

                    <div class="cart-item-image">

                        <img
                            src="${escapeHTML(
                                product.image
                            )}"
                            alt="${escapeHTML(
                                product.name
                            )}"
                            loading="lazy"
                            onerror="this.style.display='none'"
                        >

                    </div>


                    <div class="cart-item-info">

                        <h4>
                            ${escapeHTML(
                                product.name
                            )}
                        </h4>


                        <p>
                            ${escapeHTML(
                                product.unit
                            )}
                        </p>


                        <div class="cart-item-bottom">

                            <span class="cart-item-price">
                                ${formatPrice(
                                    product.price *
                                    quantity
                                )}
                            </span>


                            <div class="cart-qty">

                                <button
                                    type="button"
                                    onclick="changeQuantity(
                                        '${product.id}',
                                        -1
                                    )"
                                >
                                    âˆ’
                                </button>


                                <span>
                                    ${quantity}
                                </span>


                                <button
                                    type="button"
                                    onclick="changeQuantity(
                                        '${product.id}',
                                        1
                                    )"
                                >
                                    +
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            `;

        }).join("");


    if (cartItemSummary) {

        cartItemSummary.textContent =
            `${totalItems} item${
                totalItems !== 1
                    ? "s"
                    : ""
            }`;
    }


    if (cartSubtotal) {

        cartSubtotal.textContent =
            formatPrice(subtotal);
    }


    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(subtotal);
    }
}


/* =========================================================
   CART OPEN / CLOSE
========================================================= */

function openCart() {

    if (!cartDrawer) {
        return;
    }


    cartDrawer.classList.add("open");


    if (drawerOverlay) {

        drawerOverlay.classList.add("show");
    }


    document.body.style.overflow =
        "hidden";


    renderCart();
}


function closeCart() {

    if (cartDrawer) {

        cartDrawer.classList.remove(
            "open"
        );
    }


    if (drawerOverlay) {

        drawerOverlay.classList.remove(
            "show"
        );
    }


    document.body.style.overflow =
        "";
}


const cartBtn =
    document.getElementById("cartBtn");


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        openCart
    );
}


const closeCartBtn =
    document.getElementById("closeCart");


if (closeCartBtn) {

    closeCartBtn.addEventListener(
        "click",
        closeCart
    );
}


if (drawerOverlay) {

    drawerOverlay.addEventListener(
        "click",
        closeCart
    );
}


/* =========================================================
   SEARCH
========================================================= */

if (sweetSearch) {

    sweetSearch.addEventListener(
        "input",
        function () {

            searchText =
                this.value.trim();


            if (clearSearch) {

                clearSearch.style.display =
                    searchText
                        ? "block"
                        : "none";
            }


            showSuggestions();

            displayProducts();
        }
    );
}


if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            if (sweetSearch) {
                sweetSearch.value = "";
            }

            searchText = "";


            clearSearch.style.display =
                "none";


            const suggestions =
                document.getElementById(
                    "searchSuggestions"
                );


            if (suggestions) {

                suggestions.innerHTML =
                    "";

                suggestions.style.display =
                    "none";
            }


            displayProducts();
        }
    );
}


/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

function showSuggestions() {

    const box =
        document.getElementById(
            "searchSuggestions"
        );


    if (!box) {
        return;
    }


    if (!searchText) {

        box.innerHTML = "";

        box.style.display =
            "none";

        return;
    }


    const query =
        searchText.toLowerCase();


    const matches =
        indianSweetsProducts
            .filter(product => {

                return (
                    product.name
                        .toLowerCase()
                        .includes(query) ||

                    product.brand
                        .toLowerCase()
                        .includes(query)
                );

            })
            .slice(0, 6);


    if (!matches.length) {

        box.innerHTML = "";

        box.style.display =
            "none";

        return;
    }


    box.innerHTML =
        matches
            .map(product => `

                <div
                    class="suggestion-item"
                    onclick="selectSuggestion(
                        '${product.id}'
                    )"
                >

                    <i class="bi bi-search"></i>

                    <span>
                        ${escapeHTML(
                            product.name
                        )}
                    </span>

                </div>

            `)
            .join("");


    box.style.display =
        "block";
}


function selectSuggestion(id) {

    const product =
        indianSweetsProducts.find(
            item =>
                item.id === id
        );


    if (!product) {
        return;
    }


    if (sweetSearch) {

        sweetSearch.value =
            product.name;
    }


    searchText =
        product.name;


    const box =
        document.getElementById(
            "searchSuggestions"
        );


    if (box) {

        box.style.display =
            "none";
    }


    if (clearSearch) {

        clearSearch.style.display =
            "block";
    }


    displayProducts();
}


document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".search-box"
            )
        ) {

            const box =
                document.getElementById(
                    "searchSuggestions"
                );


            if (box) {

                box.style.display =
                    "none";
            }
        }
    }
);


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

document
    .querySelectorAll(".sweet-category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".sweet-category"
                    )
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                activeCategory =
                    button.dataset.category ||
                    "all";


                displayProducts();
            }
        );

    });


/* =========================================================
   CATEGORY SCROLL
========================================================= */

const categoryScroll =
    document.getElementById(
        "sweetCategories"
    );


const categoryPrev =
    document.getElementById(
        "categoryPrev"
    );


const categoryNext =
    document.getElementById(
        "categoryNext"
    );


if (categoryPrev && categoryScroll) {

    categoryPrev.addEventListener(
        "click",
        () => {

            categoryScroll.scrollBy({
                left: -300,
                behavior: "smooth"
            });

        }
    );
}


if (categoryNext && categoryScroll) {

    categoryNext.addEventListener(
        "click",
        () => {

            categoryScroll.scrollBy({
                left: 300,
                behavior: "smooth"
            });

        }
    );
}


/* =========================================================
   SORT
========================================================= */

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        displayProducts
    );
}


/* =========================================================
   PRICE FILTER
========================================================= */

const priceRange =
    document.getElementById(
        "priceRange"
    );


const priceValue =
    document.getElementById(
        "priceValue"
    );


if (priceRange) {

    priceRange.addEventListener(
        "input",
        function () {

            maxPrice =
                Number(this.value);


            if (priceValue) {

                priceValue.textContent =
                    formatPrice(maxPrice);
            }


            displayProducts();
        }
    );
}


/* =========================================================
   STOCK FILTER
========================================================= */

const stockFilter =
    document.getElementById(
        "stockFilter"
    );


if (stockFilter) {

    stockFilter.addEventListener(
        "change",
        function () {

            stockOnly =
                this.checked;

            displayProducts();
        }
    );
}


/* =========================================================
   CATEGORY / BRAND / RATING FILTERS
========================================================= */

document
    .querySelectorAll(
        '#categoryFilters input[type="checkbox"],' +
        '#brandFilters input[type="checkbox"],' +
        '.rating-filter'
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            displayProducts
        );

    });


/* =========================================================
   CLEAR FILTERS
========================================================= */

const clearFilters =
    document.getElementById(
        "clearFilters"
    );


if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    '.filters-sidebar input[type="checkbox"]'
                )
                .forEach(input => {

                    input.checked =
                        false;
                });


            if (priceRange) {

                priceRange.value =
                    1000;
            }


            maxPrice = 1000;


            if (priceValue) {

                priceValue.textContent =
                    "â‚¹1000";
            }


            activeCategory =
                "all";


            document
                .querySelectorAll(
                    ".sweet-category"
                )
                .forEach(button =>
                    button.classList.remove(
                        "active"
                    )
                );


            const allCategory =
                document.querySelector(
                    '.sweet-category[data-category="all"]'
                );


            if (allCategory) {

                allCategory.classList.add(
                    "active"
                );
            }


            displayProducts();
        }
    );
}


/* =========================================================
   RESET PRODUCTS
========================================================= */

const resetProducts =
    document.getElementById(
        "resetProducts"
    );


if (resetProducts) {

    resetProducts.addEventListener(
        "click",
        () => {

            if (sweetSearch) {
                sweetSearch.value = "";
            }


            searchText = "";


            if (clearSearch) {

                clearSearch.style.display =
                    "none";
            }


            if (clearFilters) {

                clearFilters.click();

            } else {

                displayProducts();
            }

        }
    );
}


/* =========================================================
   MOBILE FILTER
========================================================= */

const mobileFilterBtn =
    document.getElementById(
        "mobileFilterBtn"
    );


const filtersSidebar =
    document.querySelector(
        ".filters-sidebar"
    );


const filterOverlay =
    document.getElementById(
        "filterOverlay"
    );


if (
    mobileFilterBtn &&
    filtersSidebar &&
    filterOverlay
) {

    mobileFilterBtn.addEventListener(
        "click",
        () => {

            filtersSidebar.classList.add(
                "open"
            );

            filterOverlay.classList.add(
                "show"
            );

            document.body.style.overflow =
                "hidden";
        }
    );


    filterOverlay.addEventListener(
        "click",
        () => {

            filtersSidebar.classList.remove(
                "open"
            );

            filterOverlay.classList.remove(
                "show"
            );

            document.body.style.overflow =
                "";
        }
    );
}


/* =========================================================
   CHECKOUT
========================================================= */

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            if (!cart.length) {

                showToast(
                    "Your cart is empty"
                );

                return;
            }


            window.location.href =
                "/checkout/";
        }
    );
}


/* =========================================================
   INITIAL LOAD
========================================================= */

updateWishlistCount();

updateCartCount();

renderCart();

displayProducts();


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "LocalMart Indian Sweets JS loaded"
);

console.log(
    `Total Products: ${indianSweetsProducts.length}`
);

console.log(
    `Tinned & Packed Sweets: ${
        indianSweetsProducts.filter(
            product =>
                product.category ===
                "tinned-packed-sweets"
        ).length
    }`
);

console.log(
    `Cart items: ${cart.length}`
);

console.log(
    `Wishlist items: ${wishlist.length}`
);

