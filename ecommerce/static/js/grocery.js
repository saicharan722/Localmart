"use strict";

/* =====================================================
   GROCERY HOME CATEGORIES
===================================================== */

const groceryCategories = [

    {
        name: "Fruits & Vegetables",
        key: "fruits-vegetables",
        offer: "Fresh & Healthy",
        image:
            "https://cdn.zeptonow.com/production/cms/category/38047553-95f3-47c6-a1ff-4794e1227d3a.png?tr=f-webp,w-iw,h-iw,cm-extract,x-0,y-0",
        url: "/fruits-vegetables/"
    },

    {
        name: "Dairy, Bread & Eggs",
        key: "dairy-bread-eggs",
        offer: "Daily Essentials",
        image:
            "https://cdn.zeptonow.com/production/cms/category/474e6e58-1894-4378-86f1-168cc7266d1a.png?tr=f-webp,w-iw,h-iw,cm-extract,x-0,y-0",
        url: "/dairy-bread-eggs/"
    },

    {
        name: "Atta, Rice, Oil & Dals",
        key: "atta-rice-oil-dals",
        offer: "Staples",
        image:
            "https://cdn.zeptonow.com/production/cms/category/dc4a299d-521f-4a64-8205-c5ba8e1d13e3.png?tr=f-webp,w-iw,h-iw,cm-extract,x-0,y-0",
        url: "/atta-rice-oil-dals/"
    },

    

    {
        name: "Masala, Dry Fruits & More",
        key: "masala-dry-fruits-more",
        offer: "Spices & Dry Fruits",
        image:
            "https://cdn.zeptonow.com/production/cms/category/8d4d3977-5197-49d9-9867-8a670524e48b.png?tr=f-webp,w-iw,h-iw,cm-extract,x-0,y-0",
        url: "/masala-dry-fruits-more/"
    },

    {
        name: "Breakfast & Sauces",
        key: "breakfast-sauces",
        offer: "Breakfast Essentials",
        image:
            "https://cdn.zeptonow.com/production/cms/category/ab241d87-da5b-4830-b38f-1a6cd30d0d41.png?tr=f-webp,w-iw,h-iw,cm-extract,x-0,y-0",
        url: "/breakfast-sauces/"
    },

    

    

    {
        name: "Tea, Coffee & More",
        key: "tea-coffee",
        offer: "Hot Beverages",
        image:
            "https://cdn.zeptonow.com/production/cms/category/f078a8dc-a9b6-41a6-9c6f-721d4892b8ee.png?tr=f-webp,w-iw,h-iw,cm-extract,x-0,y-0",
        url: "/tea-coffee/"
    },

    {
        name: "Ice Creams & More",
        key: "ice-creams",
        offer: "Cool Treats",
        image:
            "https://cdn.zeptonow.com/production/cms/category/db346f5e-644f-426a-85af-92d707e086ac.png?tr=f-webp,w-iw,h-iw,cm-extract,x-0,y-0",
        url: "/ice-creams/"
    },

    

    {
        name: "Sweet Cravings",
        key: "sweet-cravings",
        offer: "Chocolates & Sweets",
        image:
            "https://cdn.zeptonow.com/production/cms/category/ec7b14c6-2640-4165-b3ae-68c09a249ae0.png?tr=f-webp,w-iw,h-iw,cm-extract,x-0,y-0",
        url: "/sweet-cravings/"
    },

    {
        name: "Cold Drinks & Juices",
        key: "cold-drinks",
        offer: "Refreshments",
        image:
            "https://cdn.zeptonow.com/production/cms/category/42360a5c-b732-4979-8a9b-4e6af192b6d9.png?tr=f-webp,w-iw,h-iw,cm-extract,x-0,y-0",
        url: "/cold-drinks/"
    },

    
];





/* =====================================================
   RENDER HOME CATEGORIES
===================================================== */

function renderGroceryCategories() {

    /*
       Main category container.

       Your HTML should contain:

       <div id="groceryCategories"></div>
    */

    const container =
        document.getElementById("groceryCategories");


    if (!container) {

        console.error(
            "ERROR: #groceryCategories container not found."
        );

        return;
    }


    /* =================================================
       GENERATE CATEGORY CARDS
    ================================================= */

    container.innerHTML = groceryCategories
        .map(category => {

            return `

                <article
                    class="category-card"
                    data-category="${category.key}"
                    data-url="${category.url}"
                    tabindex="0"
                    role="button"
                    aria-label="Open ${category.name}"
                >

                    <div class="category-image-wrapper">

                        <img
                            class="category-image"
                            src="${category.image}"
                            alt="${category.name}"
                            loading="lazy"
                            decoding="async"
                            onerror="this.onerror=null; this.src='https://via.placeholder.com/300x250?text=Grocery';"
                        >

                    </div>


                    <div class="category-name">
                        ${category.name}
                    </div>


                    <div class="category-offer">
                        ${category.offer}
                    </div>

                </article>

            `;

        })
        .join("");


    /* =================================================
       CATEGORY CLICK EVENTS
    ================================================= */

    const cards =
        container.querySelectorAll(".category-card");


    cards.forEach(card => {

        card.addEventListener(
            "click",
            function () {

                const url =
                    this.dataset.url;


                if (!url) {

                    console.warn(
                        "Category URL missing:",
                        this.dataset.category
                    );

                    return;
                }


                /*
                   Redirect to Django category page
                */

                window.location.href = url;

            }
        );


        /* =============================================
           KEYBOARD ACCESSIBILITY
        ============================================= */

        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    const url =
                        this.dataset.url;


                    if (url) {

                        window.location.href =
                            url;

                    }

                }

            }
        );

    });

}


/* =====================================================
   RENDER SIDEBAR CATEGORIES
   Optional support if #categorySidebar exists
===================================================== */

function renderCategorySidebar() {

    const sidebar =
        document.getElementById("categorySidebar");


    if (!sidebar) {

        return;
    }


    sidebar.innerHTML = `

        <button
            type="button"
            class="sidebar-category active"
            data-category="all"
        >
            <span>🛒</span>
            <span>All Categories</span>
        </button>

    `;


    groceryCategories.forEach(category => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "sidebar-category";


        button.dataset.category =
            category.key;


        button.innerHTML = `

            <span class="sidebar-category-icon">

                <img
                    src="${category.image}"
                    alt=""
                    loading="lazy"
                >

            </span>

            <span>
                ${category.name}
            </span>

        `;


        button.addEventListener(
            "click",
            function () {

                const url =
                    category.url;


                if (url) {

                    window.location.href =
                        url;

                }

            }
        );


        sidebar.appendChild(button);

    });

}


/* =====================================================
   SUPPORT OLD #categoryOptions CONTAINER
===================================================== */

function setupCategoryOptionsCompatibility() {

    const oldContainer =
        document.getElementById("categoryOptions");


    const newContainer =
        document.getElementById("groceryCategories");


    /*
       If the HTML still uses:

       #categoryOptions

       automatically render categories there.
    */

    if (
        oldContainer &&
        !newContainer
    ) {

        oldContainer.id =
            "groceryCategories";

    }

}


/* =====================================================
   IMAGE ERROR HANDLING
===================================================== */

function setupCategoryImageFallback() {

    const container =
        document.getElementById("groceryCategories");


    if (!container) {

        return;
    }


    container
        .querySelectorAll(".category-image")
        .forEach(image => {

            image.addEventListener(
                "error",
                function () {

                    if (
                        this.dataset.fallbackApplied
                    ) {

                        return;

                    }


                    this.dataset.fallbackApplied =
                        "true";


                    this.src =
                        "https://via.placeholder.com/300x250?text=Grocery";

                }
            );

        });

}


/* =====================================================
   CATEGORY SEARCH / FILTER SUPPORT
===================================================== */

function filterGroceryCategories(searchText) {

    const container =
        document.getElementById(
            "groceryCategories"
        );


    if (!container) {

        return;
    }


    const search =
        String(searchText || "")
            .trim()
            .toLowerCase();


    const cards =
        container.querySelectorAll(
            ".category-card"
        );


    cards.forEach(card => {

        const categoryName =
            card
                .querySelector(".category-name")
                ?.textContent
                .toLowerCase() || "";


        const categoryOffer =
            card
                .querySelector(".category-offer")
                ?.textContent
                .toLowerCase() || "";


        const matches =
            !search ||
            categoryName.includes(search) ||
            categoryOffer.includes(search);


        card.style.display =
            matches ? "" : "block";

    });

}


/* =====================================================
   GLOBAL CATEGORY DATA ACCESS
===================================================== */

window.groceryCategories =
    groceryCategories;


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           First make sure the correct
           container exists.
        */

        setupCategoryOptionsCompatibility();


        /*
           Render main categories.
        */

        renderGroceryCategories();


        /*
           Render optional sidebar.
        */

        renderCategorySidebar();


        /*
           Add image fallback.
        */

        setupCategoryImageFallback();


        console.log(
            `Grocery categories loaded: ${groceryCategories.length}`
        );

    }
);



document.addEventListener("DOMContentLoaded", function () {

    const heroSlides =
        document.getElementById("groceryHeroSlides");

    const heroIndicators =
        document.getElementById("groceryHeroIndicators");

    if (!heroSlides || !heroIndicators) {
        return;
    }

    if (
        typeof groceryCategories === "undefined" ||
        !groceryCategories.length
    ) {
        return;
    }


    groceryCategories.forEach((category, index) => {

        /*
         * INDICATOR
         */

        const indicator = document.createElement("button");

        indicator.type = "button";

        indicator.setAttribute(
            "data-bs-target",
            "#groceryHeroCarousel"
        );

        indicator.setAttribute(
            "data-bs-slide-to",
            index
        );

        indicator.setAttribute(
            "aria-label",
            `${category.name} slide`
        );

        if (index === 0) {

            indicator.classList.add("active");

            indicator.setAttribute(
                "aria-current",
                "true"
            );
        }

        heroIndicators.appendChild(indicator);


        /*
         * SLIDE
         */

        const slide = document.createElement("div");

        slide.className =
            `carousel-item ${index === 0 ? "active" : ""}`;


        slide.innerHTML = `

            <div class="grocery-hero-slide">

                <!-- LEFT CONTENT -->

                <div class="grocery-hero-content">

                    <div class="grocery-hero-brand">
                        <i class="bi bi-shop"></i>
                        LOCALMART GROCERY
                    </div>

                    <h1>
                        ${category.name}
                    </h1>

                    <p class="grocery-hero-offer">
                        ${category.offer}
                    </p>

                    <p class="grocery-hero-description">
                        Fresh quality products delivered
                        quickly to your doorstep.
                    </p>

                    <a
                        href="${category.url}"
                        class="grocery-hero-shop-btn"
                    >
                        Shop Now

                        <i class="bi bi-arrow-right"></i>
                    </a>

                </div>


                <!-- RIGHT IMAGE -->

                <div class="grocery-hero-image">

                    <img
                        src="${category.image}"
                        alt="${category.name}"
                        loading="${index === 0 ? "eager" : "lazy"}"
                        onerror="this.style.display='none'"
                    >

                </div>

            </div>

        `;

        heroSlides.appendChild(slide);

    });

});