(function () {
    "use strict";

    const CART_KEY = "localmartGroceryCart";
    const WISHLIST_KEY = "localmartGroceryWishlist";
    const PAGE_SEARCH_SELECTOR = [
        "#productSearch",
        "#globalSearch",
        "#grocerySearch",
        "#attaRiceOilDalsSearch",
        "#masalaSearch",
        "#searchInput",
        ".search-input",
        "#teaCoffeeSearch",
        "#iceCreamSearch",
        "#sweetSearch",
        "#drinkSearch",
        "#drinksSearch",
        "[data-grocery-search]"
    ].join(", ");
    const SEARCHABLE_CARD_SELECTOR = [
        ".category-card",
        ".product-card",
        ".fv-product-card",
        ".zepto-product-card",
        ".atta-rice-oil-dals-product-card"
    ].join(", ");
    const SEARCH_GRID_SELECTOR = [
        "#groceryCategories",
        "#productsGrid",
        "#productGrid",
        "#attaRiceOilDalsProducts",
        "#masalaProductsGrid"
    ].join(", ");

    function readList(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch (error) {
            return [];
        }
    }

    function updateCounts() {
        const cartCount = document.getElementById("cartCount");
        const wishlistCount = document.getElementById("wishlistCount");
        if (cartCount) {
            const count = readList(CART_KEY).reduce(
                (sum, item) => sum + Number(item && item.quantity || 1), 0
            );
            cartCount.textContent = String(count);
        }
        if (wishlistCount) wishlistCount.textContent = String(readList(WISHLIST_KEY).length);
    }

    function initializePageSearch(searchInput) {
        const grids = Array.from(document.querySelectorAll(SEARCH_GRID_SELECTOR));
        if (!searchInput || grids.length === 0) return;

        const pageSearch = document.querySelector(PAGE_SEARCH_SELECTOR);
        const searchMessages = new Map();
        let query = "";

        function filterGrid(grid) {
            const cards = Array.from(grid.children).filter(
                item => item.matches(SEARCHABLE_CARD_SELECTOR)
            );
            let visibleCount = 0;

            cards.forEach(function (card) {
                if (!card.hasAttribute("data-grocery-search-original-hidden")) {
                    card.dataset.grocerySearchOriginalHidden = String(card.hidden);
                }
                const originalHidden =
                    card.dataset.grocerySearchOriginalHidden === "true";
                const searchableText = [
                    card.textContent,
                    ...Array.from(card.querySelectorAll("img[alt]"), image => image.alt)
                ].join(" ").toLocaleLowerCase();
                const matches = !query || searchableText.includes(query);
                card.hidden = originalHidden || !matches;
                if (!card.hidden) visibleCount += 1;
            });

            let message = searchMessages.get(grid);
            if (!message) {
                message = document.createElement("p");
                message.className = "grocery-nav-search-message";
                message.setAttribute("role", "status");
                message.textContent = "No matching products or categories found.";
                grid.insertAdjacentElement("afterend", message);
                searchMessages.set(grid, message);
            }
            message.hidden = !query || (cards.length > 0 && visibleCount > 0);
        }

        function applySearch(value) {
            query = value.trim().toLocaleLowerCase();

            if (pageSearch && pageSearch !== searchInput) {
                pageSearch.value = value;
                pageSearch.dispatchEvent(new Event("input", { bubbles: true }));
                pageSearch.dispatchEvent(new Event("keyup", { bubbles: true }));
            }

            grids.forEach(filterGrid);
        }

        grids.forEach(function (grid) {
            new MutationObserver(function () {
                filterGrid(grid);
            }).observe(grid, { childList: true });
        });

        searchInput.addEventListener("input", function () {
            applySearch(searchInput.value);
        });

        const categoryGrid = document.getElementById("groceryCategories");
        const searchForm = document.getElementById("groceryNavSearchForm");
        if (categoryGrid && searchForm) {
            searchForm.addEventListener("submit", function (event) {
                const exactMatch = Array.from(
                    categoryGrid.querySelectorAll(".category-card")
                ).find(card =>
                    card.querySelector(".category-name")?.textContent
                        .trim()
                        .toLocaleLowerCase() === query
                );
                if (exactMatch && exactMatch.dataset.url) {
                    event.preventDefault();
                    window.location.href = exactMatch.dataset.url;
                }
            });
        }
    }

    function initializeGroceryChrome() {
        updateCounts();

        const toggle = document.getElementById("groceryNavToggle");
        const actions = document.getElementById("groceryNavActions");
        if (toggle && actions) {
            toggle.addEventListener("click", function () {
                const open = actions.classList.toggle("open");
                toggle.setAttribute("aria-expanded", String(open));
            });
        }

        const searchForm = document.getElementById("groceryNavSearchForm");
        const navSearch = document.getElementById("groceryNavSearch");
        if (searchForm && navSearch) {
            initializePageSearch(navSearch);
            searchForm.addEventListener("submit", function (event) {
                event.preventDefault();
                const query = navSearch.value.trim();
                if (!query) navSearch.focus();
            });
        }

        const newsletter = document.getElementById("groceryNewsletterForm");
        if (newsletter) {
            newsletter.addEventListener("submit", function (event) {
                event.preventDefault();
                const button = newsletter.querySelector("button");
                if (button) {
                    button.textContent = "Thanks!";
                    button.disabled = true;
                }
            });
        }
    }

    window.addEventListener("storage", updateCounts);
    window.addEventListener("groceryCartUpdated", updateCounts);
    window.addEventListener("groceryWishlistUpdated", updateCounts);
    document.addEventListener("DOMContentLoaded", initializeGroceryChrome);
})();
