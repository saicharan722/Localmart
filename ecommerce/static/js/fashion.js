/* =====================================================
   LOCALMART FASHION JS
===================================================== */

"use strict";


const FASHION_CART_KEY =
    "localmartFashionCart";

const FASHION_WISHLIST_KEY =
    "localmartFashionWishlist";


let fashionCart = [];
let fashionWishlist = [];



/* =====================================================
   LOAD DATA
===================================================== */

function loadFashionData() {

    try {

        const savedCart =
            localStorage.getItem(
                FASHION_CART_KEY
            );

        const savedWishlist =
            localStorage.getItem(
                FASHION_WISHLIST_KEY
            );


        fashionCart =
            savedCart
                ? JSON.parse(savedCart)
                : [];


        fashionWishlist =
            savedWishlist
                ? JSON.parse(savedWishlist)
                : [];


        if (!Array.isArray(fashionCart)) {
            fashionCart = [];
        }

        if (!Array.isArray(fashionWishlist)) {
            fashionWishlist = [];
        }

    } catch (error) {

        console.error(
            "Fashion storage error:",
            error
        );

        fashionCart = [];
        fashionWishlist = [];

    }

}


/* =====================================================
   SAVE DATA
===================================================== */

function saveFashionData() {

    localStorage.setItem(
        FASHION_CART_KEY,
        JSON.stringify(fashionCart)
    );

    localStorage.setItem(
        FASHION_WISHLIST_KEY,
        JSON.stringify(fashionWishlist)
    );

}



/* =====================================================
   COUNTS
===================================================== */

function updateFashionCounts() {

    const cartCount =
        fashionCart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );


    const wishlistCount =
        fashionWishlist.length;


    const cartElement =
        document.getElementById(
            "fashionCartCount"
        );


    const wishlistElement =
        document.getElementById(
            "fashionWishlistCount"
        );


    if (cartElement) {
        cartElement.textContent =
            cartCount;
    }


    if (wishlistElement) {
        wishlistElement.textContent =
            wishlistCount;
    }

}



/* =====================================================
   CART
===================================================== */

function openFashionCart() {

    document
        .getElementById("fashionCart")
        ?.classList.add("active");


    document
        .getElementById("fashionOverlay")
        ?.classList.add("active");


    renderFashionCart();

}


function closeFashionCart() {

    document
        .getElementById("fashionCart")
        ?.classList.remove("active");


    document
        .getElementById("fashionOverlay")
        ?.classList.remove("active");

}


function renderFashionCart() {

    const body =
        document.getElementById(
            "fashionCartBody"
        );


    const totalElement =
        document.getElementById(
            "fashionCartTotal"
        );


    if (!body) return;


    if (fashionCart.length === 0) {

        body.innerHTML = `

            <div
                style="
                    text-align:center;
                    padding:60px 20px;
                    color:#777;
                "
            >

                <i
                    class="bi bi-bag"
                    style="
                        font-size:50px;
                        display:block;
                        margin-bottom:15px;
                    "
                ></i>

                <strong>
                    Your bag is empty
                </strong>

                <p>
                    Add some fashion products
                    to continue shopping.
                </p>

            </div>

        `;

        if (totalElement) {
            totalElement.textContent = "₹0";
        }

        return;
    }


    let total = 0;


    body.innerHTML =
        fashionCart.map(item => {

            const price =
                Number(item.price || 0);

            const quantity =
                Number(item.quantity || 1);


            total +=
                price * quantity;


            return `

                <div
                    style="
                        display:flex;
                        gap:12px;
                        padding:15px 0;
                        border-bottom:1px solid #eee;
                    "
                >

                    <img
                        src="${item.image || ""}"
                        alt="${item.name || ""}"
                        style="
                            width:75px;
                            height:90px;
                            object-fit:cover;
                            background:#f5f5f5;
                        "
                    >


                    <div style="flex:1">

                        <strong
                            style="
                                display:block;
                                font-size:13px;
                            "
                        >
                            ${item.name || "Product"}
                        </strong>


                        <span
                            style="
                                display:block;
                                margin-top:5px;
                                color:#777;
                                font-size:11px;
                            "
                        >
                            ₹${price}
                        </span>


                        <div
                            style="
                                display:flex;
                                align-items:center;
                                gap:10px;
                                margin-top:10px;
                            "
                        >

                            <button
                                type="button"
                                onclick="
                                    changeFashionQuantity(
                                        '${item.id}',
                                        -1
                                    )
                                "
                            >
                                −
                            </button>

                            <span>
                                ${quantity}
                            </span>

                            <button
                                type="button"
                                onclick="
                                    changeFashionQuantity(
                                        '${item.id}',
                                        1
                                    )
                                "
                            >
                                +
                            </button>

                        </div>

                    </div>

                </div>

            `;

        }).join("");


    if (totalElement) {

        totalElement.textContent =
            `₹${total.toFixed(0)}`;

    }

}


function changeFashionQuantity(
    productId,
    change
) {

    const item =
        fashionCart.find(
            product =>
                String(product.id) ===
                String(productId)
        );


    if (!item) return;


    item.quantity =
        Number(item.quantity || 1) +
        change;


    if (item.quantity <= 0) {

        fashionCart =
            fashionCart.filter(
                product =>
                    String(product.id) !==
                    String(productId)
            );

    }


    saveFashionData();

    updateFashionCounts();

    renderFashionCart();

}



/* =====================================================
   WISHLIST
===================================================== */

function openFashionWishlist() {

    showFashionToast(
        `You have ${fashionWishlist.length} wishlist item${fashionWishlist.length === 1 ? "" : "s"}`
    );

}


function toggleFashionWishlist(
    product
) {

    const index =
        fashionWishlist.findIndex(
            item =>
                String(item.id) ===
                String(product.id)
        );


    if (index >= 0) {

        fashionWishlist.splice(
            index,
            1
        );

        showFashionToast(
            "Removed from wishlist"
        );

    } else {

        fashionWishlist.push(
            product
        );

        showFashionToast(
            "Added to wishlist"
        );

    }


    saveFashionData();

    updateFashionCounts();

}



/* =====================================================
   PROFILE
===================================================== */

function openFashionProfile() {

    showFashionToast(
        "Profile section"
    );

}



/* =====================================================
   CHECKOUT
===================================================== */

function fashionCheckout() {

    if (fashionCart.length === 0) {

        showFashionToast(
            "Your bag is empty"
        );

        return;
    }


    showFashionToast(
        "Checkout is ready"
    );

}



/* =====================================================
   SEARCH
===================================================== */

function setupFashionSearch() {

    const input =
        document.getElementById(
            "fashionSearch"
        );


    const results =
        document.getElementById(
            "fashionSearchResults"
        );


    if (!input || !results) return;


    input.addEventListener(
        "input",
        function () {

            const query =
                this.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                results.style.display =
                    "none";

                results.innerHTML =
                    "";

                return;
            }


            const categories = [

                {
                    name: "Men",
                    url: "/fashion/"
                },

                {
                    name: "Women",
                    url: "/fashion/women/"
                },

                {
                    name: "Kids",
                    url: "/fashion/kids/"
                },

                {
                    name: "Watches",
                    url: "/fashion/watches/"
                },

                {
                    name: "Footwear",
                    url: "/fashion/footwear/"
                }

            ];


            const matches =
                categories.filter(
                    category =>
                        category.name
                            .toLowerCase()
                            .includes(query)
                );


            if (matches.length === 0) {

                results.innerHTML = `

                    <div
                        style="
                            padding:15px;
                            color:#777;
                            font-size:12px;
                        "
                    >
                        No category found
                    </div>

                `;

            } else {

                results.innerHTML =
                    matches.map(
                        category => `

                            <a
                                href="${category.url}"
                                style="
                                    display:block;
                                    padding:13px 15px;
                                    text-decoration:none;
                                    color:#282c3f;
                                    font-size:13px;
                                    border-bottom:1px solid #eee;
                                "
                            >
                                ${category.name}
                            </a>

                        `
                    ).join("");

            }


            results.style.display =
                "block";

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.closest(
                    ".fashion-search"
                )
            ) {

                results.style.display =
                    "none";

            }

        }
    );

}



/* =====================================================
   MOBILE MENU
===================================================== */

function setupFashionMobileMenu() {

    const button =
        document.getElementById(
            "fashionMobileMenu"
        );


    const menu =
        document.getElementById(
            "fashionMobileNav"
        );


    if (!button || !menu) return;


    button.addEventListener(
        "click",
        function () {

            menu.classList.toggle(
                "active"
            );

        }
    );

}


function setupFashionCatalogActions() {
    document.querySelectorAll(".add-to-bag").forEach(button => {
        button.addEventListener("click", async () => {
            const response = await fetch(`/fashion/cart/add/${button.dataset.productId}/`);
            if (!response.ok) return;
            const data = await response.json();
            const count = document.getElementById("fashionCartCount");
            if (count) count.textContent = data.count;
            showFashionToast("Added to bag");
        });
    });

    document.querySelectorAll(".product-wishlist").forEach(button => {
        button.addEventListener("click", async () => {
            const response = await fetch(`/fashion/wishlist/toggle/${button.dataset.productId}/`);
            if (!response.ok) return;
            const data = await response.json();
            const count = document.getElementById("fashionWishlistCount");
            if (count) count.textContent = data.count;
            button.classList.toggle("active", data.active);
            button.querySelector("i").className = data.active ? "bi bi-heart-fill" : "bi bi-heart";
            showFashionToast(data.active ? "Added to wishlist" : "Removed from wishlist");
        });
    });
}


function setupFashionOfferCarousel() {
    const carousel = document.getElementById("fashionOfferCarousel");
    if (!carousel) return;
    const contentSlides = carousel.querySelectorAll(".offer-slide");
    const imageSlides = carousel.querySelectorAll(".offer-slide-image");
    const dots = carousel.querySelectorAll(".carousel-dots button");
    let current = 0;

    const showSlide = index => {
        current = (index + contentSlides.length) % contentSlides.length;
        contentSlides.forEach((slide, i) => slide.classList.toggle("active", i === current));
        imageSlides.forEach((slide, i) => slide.classList.toggle("active", i === current));
        dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    };

    carousel.querySelector(".carousel-prev")?.addEventListener("click", () => showSlide(current - 1));
    carousel.querySelector(".carousel-next")?.addEventListener("click", () => showSlide(current + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));
    setInterval(() => showSlide(current + 1), 5000);
}



/* =====================================================
   TOAST
===================================================== */

let fashionToastTimer;


function showFashionToast(
    message
) {

    const toast =
        document.getElementById(
            "fashionToast"
        );


    if (!toast) return;


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        fashionToastTimer
    );


    fashionToastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}



/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadFashionData();

        updateFashionCounts();

        setupFashionSearch();

        setupFashionMobileMenu();

        setupFashionCatalogActions();

        setupFashionOfferCarousel();

        document
            .getElementById("navbarCartLink")
            ?.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = this.href;
            });

        renderFashionCart();

    }
);


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.openFashionCart =
    openFashionCart;

window.closeFashionCart =
    closeFashionCart;

window.openFashionWishlist =
    openFashionWishlist;

window.openFashionProfile =
    openFashionProfile;

window.changeFashionQuantity =
    changeFashionQuantity;

window.fashionCheckout =
    fashionCheckout;

window.toggleFashionWishlist =
    toggleFashionWishlist;