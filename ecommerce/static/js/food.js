document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const container = document.getElementById("restaurantContainer");
    const countElement = document.getElementById("restaurantCount");
    const searchInput = document.getElementById("restaurantSearch");
    const filterButtons = document.querySelectorAll("[data-filter]");

    if (!container) {
        console.error("restaurantContainer not found!");
        return;
    }

    if (typeof restaurants === "undefined") {
        console.error("restaurants.js is not loaded!");
        return;
    }

    console.log("Restaurants loaded:", restaurants.length);

    function renderRestaurantOffersCarousel() {
        const carousel = document.getElementById("foodCarousel");
        const slidesContainer = document.getElementById("foodCarouselInner");
        const indicatorsContainer = document.getElementById("foodCarouselIndicators");
        if (!carousel || !slidesContainer || !indicatorsContainer) return;

        const offers = restaurants.filter(restaurant => restaurant.offer).slice(0, 8);
        if (!offers.length) {
            carousel.closest(".hero-section")?.remove();
            return;
        }

        slidesContainer.innerHTML = offers.map((restaurant, index) => `
            <div class="carousel-item${index === 0 ? " active" : ""}">
                <img class="hero-img" src="${restaurant.image}" alt="${restaurant.name} offer" loading="${index === 0 ? "eager" : "lazy"}"
                     onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=85'">
                <div class="hero-offer-overlay"></div>
                <div class="carousel-caption hero-offer-caption">
                    <span class="hero-offer-kicker">LOCALMART RESTAURANT DEAL</span>
                    <h1>${restaurant.offer}</h1>
                    <h2>${restaurant.name}</h2>
                    <p>${restaurant.cuisine}</p>
                    <a href="#restaurants" class="btn btn-warning btn-lg">Explore Restaurants</a>
                </div>
            </div>
        `).join("");

        indicatorsContainer.innerHTML = offers.map((restaurant, index) => `
            <button type="button" data-bs-target="#foodCarousel" data-bs-slide-to="${index}"
                    class="${index === 0 ? "active" : ""}" aria-label="Offer ${index + 1}: ${restaurant.name}"
                    ${index === 0 ? 'aria-current="true"' : ""}></button>
        `).join("");

        if (window.bootstrap?.Carousel) {
            const instance = bootstrap.Carousel.getOrCreateInstance(carousel, { interval: 5200, ride: "carousel", pause: "hover" });
            instance.cycle();
        }
    }

    renderRestaurantOffersCarousel();


    /* =====================================================
       STATE
    ===================================================== */
let currentFilter = "all";
let currentCategory = "all";
let searchText = "";

document.querySelectorAll(".food-item").forEach(function (item) {
    item.classList.remove("active-category");
});


    /* =====================================================
       RENDER RESTAURANTS
    ===================================================== */
    function renderRestaurants() {

        let filteredRestaurants = restaurants.filter(function (res) {

            /* SEARCH */

            const searchMatch =
                searchText === "" ||
                res.name.toLowerCase().includes(searchText) ||
                res.cuisine.toLowerCase().includes(searchText);

            if (!searchMatch) {
                return false;
            }

// Category Filter
/* CATEGORY FILTER */

if (currentCategory !== "all") {

    const cuisine = res.cuisine
        .split("•")[0]
        .trim()
        .toLowerCase();

    const category = currentCategory
        .trim()
        .toLowerCase();

    if (!String(res.cuisine || "").toLowerCase().replace(/[^a-z0-9]/g, "").includes(category.replace(/[^a-z0-9]/g, ""))) {
        return false;
    }

}

            /* FILTER */

            switch (currentFilter) {

                case "veg":
                    return res.veg === true;

                case "nonveg":
                    return res.veg === false;

                case "toprated":
                    return parseFloat(res.rating) >= 4.7;

                case "fast":
                    return parseInt(res.time) <= 20;

                case "offers":
                    return res.offer && res.offer.trim() !== "";

                case "under199": {

                    const price =
                        parseInt(
                            String(res.price).replace(/[^\d]/g, "")
                        );

                    return price < 199;
                }

                case "all":
                default:
                    return true;
            }

        });


        /* =================================================
           NO RESULTS
        ================================================= */

        if (filteredRestaurants.length === 0) {

            container.innerHTML = `
                <div class="col-12">

                    <div class="text-center py-5">

                        <i
                            class="bi bi-search fs-1 text-muted">
                        </i>

                        <h4 class="mt-3">
                            No restaurants found
                        </h4>

                        <p class="text-muted">
                            Try another restaurant, food or filter.
                        </p>

                        <button
                            type="button"
                            class="btn btn-success"
                            id="clearFiltersBtn">

                            Clear Filters

                        </button>

                    </div>

                </div>
            `;

            updateRestaurantCount(0);

            const clearButton =
                document.getElementById("clearFiltersBtn");

            if (clearButton) {

                clearButton.addEventListener(
                    "click",
                    clearFilters
                );
            }

            return;
        }


        /* =================================================
           BUILD RESTAURANT CARDS
        ================================================= */

        let html = "";

        filteredRestaurants.forEach(function (res) {

            html += `

<div class="col-lg-4 col-md-6 col-12 mb-4">

                    <div class="card restaurant-card h-100 shadow-sm">

                        <!-- IMAGE -->

                        <div class="position-relative">

                            <img
                                src="${res.image}"
                                class="card-img-top restaurant-img"
                                alt="${res.name}"
                                loading="lazy"
                                onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'"
                            >

                            ${
                                res.offer
                                    ? `
                                        <span class="offer-badge">
                                            ${res.offer}
                                        </span>
                                      `
                                    : ""
                            }


                            <!-- VEG / NON VEG -->

                            <span
                                class="food-type-badge ${
                                    res.veg ? "veg" : "nonveg"
                                }">

                                ${
                                    res.veg
                                        ? "● Veg"
                                        : "● Non-Veg"
                                }

                            </span>

                        </div>


                        <!-- CARD BODY -->

                        <div class="card-body d-flex flex-column">

                            <h5 class="fw-bold mb-1">

                                ${res.name}

                            </h5>


                            <p class="text-muted small mb-2">

                                ${res.cuisine}

                            </p>


                            <!-- RATING -->

                            <div
                                class="d-flex justify-content-between align-items-center mb-2">

                                <span class="rating-badge">

                                    ⭐ ${res.rating}

                                </span>

                                <small class="text-muted">

                                    ${res.reviews}

                                    reviews

                                </small>

                            </div>


                            <!-- TIME + DISTANCE -->

                            <div
                                class="d-flex justify-content-between small mb-2">

                                <span>

                                    <i class="bi bi-clock"></i>

                                    ${res.time}

                                </span>


                                <span>

                                    <i class="bi bi-geo-alt"></i>

                                    ${res.distance}

                                </span>

                            </div>


                            <!-- PRICE -->

                            <div
                                class="fw-bold text-success mb-3">

                                ₹${res.price} for two

                            </div>


                            <!-- VIEW MENU -->

                            <button
                                type="button"
                                class="btn btn-success w-100 mt-auto view-menu-btn"
                                data-id="${res.id}">

                                <i class="bi bi-shop me-1"></i>

                                View Menu

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });


        /* =================================================
           INSERT CARDS
        ================================================= */

        container.innerHTML = html;

        updateRestaurantCount(filteredRestaurants.length);


        /* =================================================
           VIEW MENU EVENTS
        ================================================= */

        const menuButtons =
            document.querySelectorAll(".view-menu-btn");

        menuButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const restaurantId =
                    Number(this.dataset.id);

                const selectedRestaurant =
                    restaurants.find(function (res) {

                        return res.id === restaurantId;

                    });


                if (!selectedRestaurant) {
                    return;
                }


                /* SAVE SELECTED RESTAURANT */

                localStorage.setItem(
                    "selectedRestaurant",
                    JSON.stringify(selectedRestaurant)
                );


                console.log(
                    "Selected restaurant:",
                    selectedRestaurant
                );


                


window.location.href = `/restaurant/${restaurantId}/`;                

            });

        });

    }


    /* =====================================================
       UPDATE COUNT
    ===================================================== */

    function updateRestaurantCount(count) {

        if (countElement) {

            countElement.textContent = count;

        }

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                searchText =
                    this.value
                        .trim()
                        .toLowerCase();

                renderRestaurants();

            }
        );

    }


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                currentFilter =
                    this.dataset.filter;


                /* REMOVE ACTIVE */

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove("active");

                        btn.classList.remove(
                            "btn-success"
                        );

                        btn.classList.add(
                            "btn-outline-success"
                        );

                    }
                );


                /* ADD ACTIVE */

                this.classList.add("active");

                this.classList.remove(
                    "btn-outline-success"
                );

                this.classList.add(
                    "btn-success"
                );


                renderRestaurants();

            }
        );

    });


    /* =====================================================
       CLEAR FILTERS
    ===================================================== */

    function clearFilters() {

        currentFilter = "all";
        currentCategory = "all";
        searchText = "";

        document.querySelectorAll(".food-item").forEach(function (item) {
            item.classList.remove("active-category");
            item.setAttribute("aria-pressed", "false");
        });


        if (searchInput) {

            searchInput.value = "";

        }


        filterButtons.forEach(
            function (button) {

                button.classList.remove("active");

                button.classList.remove(
                    "btn-success"
                );

                button.classList.add(
                    "btn-outline-success"
                );

            }
        );


        const allButton =
            document.querySelector(
                '[data-filter="all"]'
            );

        if (allButton) {

            allButton.classList.add("active");

            allButton.classList.remove(
                "btn-outline-success"
            );

            allButton.classList.add(
                "btn-success"
            );

        }


        renderRestaurants();

    }


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    renderRestaurants();


    /* =====================================================
       CATEGORY SLIDER
    ===================================================== */

function setupCategorySlider() {

    const wrapper = document.getElementById("categoryWrapper");
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");

    if (!wrapper) return;

    if (leftBtn) {

        leftBtn.addEventListener("click", () => {

            wrapper.scrollBy({
                left: -400,
                behavior: "smooth"
            });

        });

    }

    if (rightBtn) {

        rightBtn.addEventListener("click", () => {

            wrapper.scrollBy({
                left: 400,
                behavior: "smooth"
            });

        });

    }

    const items = document.querySelectorAll(".food-item");

    items.forEach(item => {

        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute("aria-pressed", "false");

        const activateCategory = function () {
            const selectedCategory = item.dataset.category || "all";
            currentCategory = currentCategory === selectedCategory ? "all" : selectedCategory;

            items.forEach(categoryItem => {
                const isActive = categoryItem.dataset.category === currentCategory;
                categoryItem.classList.toggle("active-category", isActive);
                categoryItem.setAttribute("aria-pressed", String(isActive));
            });

            renderRestaurants();
        };

        item.addEventListener("click", activateCategory);
        item.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activateCategory();
            }
        });

    });

}

setupCategorySlider();
    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "Food page initialized successfully."
    );

    console.log(
        "Total restaurants:",
        restaurants.length
    );

});




/* =====================================================
   CATEGORY FILTER
===================================================== */

