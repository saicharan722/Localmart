/* =========================================================
   LOCALMART - MEN'S FASHION
   Complete Myntra/Flipkart Style Product System
   40 Men's Casual Shirts
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       STORAGE
    ===================================================== */

    const CART_KEY = "localmartFashionMenCart";
    const WISHLIST_KEY = "localmartFashionMenWishlist";


    /* =====================================================
       PRODUCT DATA
    ===================================================== */

    const menProducts = [

        {
            id: 1,
            brand: "The Indian Garage Co.",
            name: "Men Relaxed Fit Solid Cut Away Collar Casual Shirt",
            category: "Solid Shirts",
            price: 499,
            mrp: 1999,
            discount: 75,
            rating: 4.2,
            reviews: 1250,
            color: "Black",
            sizes: ["S", "M", "L", "XL", "XXL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/d/c/4/l-0924-shwfyd-05-01-the-indian-garage-co-original-imahaar3wfpkz7fk.jpeg?q=70"
        },

        {
            id: 2,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Checkered Casual Shirt",
            category: "Checked Shirts",
            price: 505,
            mrp: 2199,
            discount: 77,
            rating: 4.2,
            reviews: 980,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/p/b/p/m-0822-sh375-01-the-indian-garage-co-original-imagmnrggv8qghgg.jpeg?q=70"
        },

        {
            id: 3,
            brand: "The Indian Garage Co.",
            name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
            category: "Checked Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.2,
            reviews: 1450,
            color: "Blue",
            sizes: ["S", "M", "L", "XL", "XXL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/7/d/8/xl-0721-sh95-10-the-indian-garage-co-original-imagg22ghsgdnrw2.jpeg?q=70"
        },

        {
            id: 4,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Checkered Casual Shirt",
            category: "Checked Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.1,
            reviews: 1120,
            color: "Grey",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/o/l/u/-original-imaggyeuuryw3cy4.jpeg?q=70"
        },

        {
            id: 5,
            brand: "RED TAPE",
            name: "Men Relaxed Fit Striped Button Down Collar Casual Shirt",
            category: "Striped Shirts",
            price: 498,
            mrp: 4999,
            discount: 90,
            rating: 4.3,
            reviews: 780,
            color: "White",
            sizes: ["M", "L", "XL", "XXL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/n/u/b/-original-imahq63phfvyquam.jpeg?q=70"
        },

        {
            id: 6,
            brand: "The Indian Garage Co.",
            name: "Men Slim Fit Solid Spread Collar Casual Shirt",
            category: "Solid Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.2,
            reviews: 1640,
            color: "Green",
            sizes: ["S", "M", "L", "XL", "XXL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/7/q/3/xl-1121-shpo131-01-the-indian-garage-co-original-imagg22jhg9fmbfj.jpeg?q=70"
        },

        {
            id: 7,
            brand: "LEVI'S",
            name: "Men Slim Fit Solid Button Down Collar Casual Shirt",
            category: "Solid Shirts",
            price: 959,
            mrp: 2399,
            discount: 60,
            rating: 4.4,
            reviews: 530,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/0/p/f/-original-imahjhtrnesb2wps.jpeg?q=70"
        },

        {
            id: 8,
            brand: "THE BEAR HOUSE",
            name: "Men Slim Fit Striped Button Down Collar Casual Shirt",
            category: "Striped Shirts",
            price: 507,
            mrp: 2495,
            discount: 79,
            rating: 4.2,
            reviews: 910,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/y/u/w/-resized-original-imahfxynyeqn83sa.jpeg?q=70"
        },

        {
            id: 9,
            brand: "The Souled Store",
            name: "Men Regular Fit Checkered Button Down Collar Casual Shirt",
            category: "Checked Shirts",
            price: 1213,
            mrp: 1799,
            discount: 32,
            rating: 4.3,
            reviews: 430,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/g/i/f/-original-imahpsnmn5trxtff.jpeg?q=70"
        },

        {
            id: 10,
            brand: "HIGHLANDER",
            name: "Men Slim Fit Striped Slim Collar Casual Shirt",
            category: "Striped Shirts",
            price: 413,
            mrp: 1799,
            discount: 77,
            rating: 4.2,
            reviews: 2200,
            color: "Blue",
            sizes: ["S", "M", "L", "XL", "XXL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/1/m/4/s-hlsh014817-highlander-original-imagqnygdznvgfch.jpeg?q=70"
        },

        {
            id: 11,
            brand: "HIGHLANDER",
            name: "Men Slim Fit Solid Spread Collar Casual Shirt",
            category: "Solid Shirts",
            price: 399,
            mrp: 999,
            discount: 60,
            rating: 4.1,
            reviews: 870,
            color: "White",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/o/y/m/-original-imah872kj9gr2fhf.jpeg?q=70"
        },

        {
            id: 12,
            brand: "RARE RABBIT",
            name: "Men Regular Fit Floral Print Casual Shirt",
            category: "Printed Shirts",
            price: 1459,
            mrp: 3999,
            discount: 63,
            rating: 4.3,
            reviews: 620,
            color: "Green",
            sizes: ["M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/0/t/u/-resized-original-imahggffwpgquzps.jpeg?q=70"
        },

        {
            id: 13,
            brand: "RED TAPE",
            name: "Men Relaxed Fit Striped Button Down Collar Casual Shirt",
            category: "Striped Shirts",
            price: 498,
            mrp: 4999,
            discount: 90,
            rating: 4.3,
            reviews: 780,
            color: "White",
            sizes: ["M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/b/2/l/m-rfs6471m-red-tape-original-imahnzzy93uf5w2v.jpeg?q=70"
        },

        {
            id: 14,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Striped Cut Away Collar Casual Shirt",
            category: "Striped Shirts",
            price: 482,
            mrp: 2099,
            discount: 77,
            rating: 4.2,
            reviews: 930,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/j/h/d/s-1122-shcsoxyd-08-02-the-indian-garage-co-original-imagmnrgz6vp5dfa.jpeg?q=70"
        },

        {
            id: 15,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Striped Cut Away Collar Casual Shirt",
            category: "Striped Shirts",
            price: 482,
            mrp: 2099,
            discount: 77,
            rating: 4.2,
            reviews: 930,
            color: "Navy Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/l/o/t/-original-imaheycf4b58hgkq.jpeg?q=70"
        },

        {
            id: 16,
            brand: "The Indian Garage Co.",
            name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
            category: "Checked Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.2,
            reviews: 1450,
            color: "Grey",
            sizes: ["S", "M", "L", "XL", "XXL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/v/a/k/-original-imaghgdyq7r5yzza.jpeg?q=70"
        },

        {
            id: 17,
            brand: "RARE RABBIT",
            name: "Men Slim Fit Solid Spread Collar Casual Shirt",
            category: "Solid Shirts",
            price: 1403,
            mrp: 3999,
            discount: 64,
            rating: 4.3,
            reviews: 510,
            color: "Black",
            sizes: ["M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/c/0/e/-resized-original-imahggfdrct55gz3.jpeg?q=70"
        },

        {
            id: 18,
            brand: "The Indian Garage Co.",
            name: "Men Slim Fit Checkered Cut Away Collar Casual Shirt",
            category: "Checked Shirts",
            price: 487,
            mrp: 1949,
            discount: 75,
            rating: 4.2,
            reviews: 890,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/c/f/w/m-1223-shbcyd-05-01-the-indian-garage-co-original-imahfpxu5enrhkpn.jpeg?q=70"
        },

        {
            id: 19,
            brand: "CANTABIL",
            name: "Men Regular Fit Checkered Spread Collar Casual Shirt",
            category: "Checked Shirts",
            price: 562,
            mrp: 2999,
            discount: 81,
            rating: 4.1,
            reviews: 340,
            color: "Grey",
            sizes: ["M", "L", "XL", "XXL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/h/m/k/-original-imahq2usjprxp7vk.jpeg?q=70"
        },

        {
            id: 20,
            brand: "RED TAPE",
            name: "Men Relaxed Fit Striped Button Down Collar Casual Shirt",
            category: "Striped Shirts",
            price: 506,
            mrp: 4999,
            discount: 89,
            rating: 4.2,
            reviews: 720,
            color: "Blue",
            sizes: ["M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/k/a/q/-original-imahqfqstjzfhezx.jpeg?q=70"
        },

        {
            id: 21,
            brand: "The Indian Garage Co.",
            name: "Men Slim Fit Solid Spread Collar Casual Shirt",
            category: "Solid Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.2,
            reviews: 1640,
            color: "Green",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/o/a/q/-resized-original-imahesy9bnnyyw7u.jpeg?q=70"
        },

        {
            id: 22,
            brand: "WROGN",
            name: "Men Slim Fit Solid Casual Shirt",
            category: "Solid Shirts",
            price: 629,
            mrp: 2099,
            discount: 70,
            rating: 4.3,
            reviews: 920,
            color: "Black",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/3/b/z/-original-imahqqr6qgdzfk4d.jpeg?q=70"
        },

        {
            id: 23,
            brand: "The Indian Garage Co.",
            name: "Men Slim Fit Solid Spread Collar Casual Shirt",
            category: "Solid Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.2,
            reviews: 1640,
            color: "White",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/p/a/x/-original-imagnggpehp6a5gf.jpeg?q=70"
        },

        {
            id: 24,
            brand: "The Indian Garage Co.",
            name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
            category: "Checked Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.2,
            reviews: 1450,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/g/g/y/-resized-original-imahf8h3fzkdbjnj.jpeg?q=70"
        },

        {
            id: 25,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Solid Cut Away Collar Casual Shirt",
            category: "Solid Shirts",
            price: 528,
            mrp: 2299,
            discount: 77,
            rating: 4.2,
            reviews: 760,
            color: "White",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/i/o/5/-original-imahfpwehq5r2hge.jpeg?q=70"
        },

        {
            id: 26,
            brand: "HIGHLANDER",
            name: "Men Slim Fit Striped Cut Away Collar Casual Shirt",
            category: "Striped Shirts",
            price: 612,
            mrp: 2449,
            discount: 75,
            rating: 4.2,
            reviews: 650,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/s/w/i/s-hlsh030010-highlander-original-imahp9haqcn32ab5.jpeg?q=70"
        },

        {
            id: 27,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Solid Cut Away Collar Casual Shirt",
            category: "Solid Shirts",
            price: 449,
            mrp: 1799,
            discount: 75,
            rating: 4.2,
            reviews: 850,
            color: "Green",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/r/n/d/xl-0622-sh278-01-the-indian-garage-co-original-imagmnhr5syhjfj8.jpeg?q=70"
        },

        {
            id: 28,
            brand: "HIGHLANDER",
            name: "Men Slim Fit Solid Cut Away Collar Casual Shirt",
            category: "Solid Shirts",
            price: 440,
            mrp: 2099,
            discount: 79,
            rating: 4.1,
            reviews: 540,
            color: "Black",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/m/d/6/-original-imahq5t5mrmhwuzj.jpeg?q=70"
        },

        {
            id: 29,
            brand: "Urbano Fashion",
            name: "Men Regular Fit Solid Spread Collar Casual Shirt",
            category: "Solid Shirts",
            price: 456,
            mrp: 1599,
            discount: 71,
            rating: 4.2,
            reviews: 430,
            color: "Navy Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/y/z/d/s-shirtsolreg-01-navy-urbano-fashion-original-imahfz8uwrkczmdh.jpeg?q=70"
        },

        {
            id: 30,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Striped Casual Shirt",
            category: "Striped Shirts",
            price: 482,
            mrp: 2099,
            discount: 77,
            rating: 4.2,
            reviews: 930,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/5/j/u/-resized-original-imaheyc7fheqz79r.jpeg?q=70"
        },

        {
            id: 31,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Checkered Casual Shirt",
            category: "Checked Shirts",
            price: 462,
            mrp: 1849,
            discount: 75,
            rating: 4.2,
            reviews: 1050,
            color: "Grey",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/h/d/e/-resized-original-imaheyc6snbhv4e9.jpeg?q=70"
        },

        {
            id: 32,
            brand: "HIGHLANDER",
            name: "Men Slim Fit Checkered Cut Away Collar Casual Shirt",
            category: "Checked Shirts",
            price: 448,
            mrp: 1949,
            discount: 77,
            rating: 4.2,
            reviews: 720,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/c/b/j/l-hlsh015305-highlander-original-imagugp5zzc46pvv.jpeg?q=70"
        },

        {
            id: 33,
            brand: "The Indian Garage Co.",
            name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
            category: "Checked Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.2,
            reviews: 1450,
            color: "Grey",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/g/q/8/-original-imagngzfpdnr7wea.jpeg?q=70"
        },

        {
            id: 34,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Checkered Spread Collar Casual Shirt",
            category: "Checked Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.2,
            reviews: 1120,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/q/f/5/-resized-original-imaheyc5nqgnnk8n.jpeg?q=70"
        },

        {
            id: 35,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Striped Casual Shirt",
            category: "Striped Shirts",
            price: 482,
            mrp: 2099,
            discount: 77,
            rating: 4.2,
            reviews: 930,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/5/j/u/-resized-original-imaheyc7fheqz79r.jpeg?q=70"
        },

        {
            id: 36,
            brand: "The Indian Garage Co.",
            name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
            category: "Checked Shirts",
            price: 437,
            mrp: 1749,
            discount: 75,
            rating: 4.2,
            reviews: 1450,
            color: "Grey",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/z/2/c/-resized-original-imahesy9hhgep6hj.jpeg?q=70"
        },

        {
            id: 37,
            brand: "THE BEAR HOUSE",
            name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
            category: "Checked Shirts",
            price: 729,
            mrp: 2599,
            discount: 71,
            rating: 4.3,
            reviews: 510,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/i/e/f/m-tbh-tuan-ol-the-bear-house-original-imahg87buaajtkzc.jpeg?q=70"
        },

        {
            id: 38,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Striped Cut Away Collar Casual Shirt",
            category: "Striped Shirts",
            price: 482,
            mrp: 2099,
            discount: 77,
            rating: 4.2,
            reviews: 930,
            color: "Blue",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/r/e/4/-original-imagnp3hv9hcthf2.jpeg?q=70"
        },

        {
            id: 39,
            brand: "HIGHLANDER",
            name: "Men Slim Fit Solid Cut Away Collar Casual Shirt",
            category: "Solid Shirts",
            price: 662,
            mrp: 2649,
            discount: 75,
            rating: 4.2,
            reviews: 650,
            color: "Black",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/o/j/u/s-hlsh030108-highlander-original-imahp9gvznyzejzk.jpeg?q=70"
        },

        {
            id: 40,
            brand: "The Indian Garage Co.",
            name: "Men Regular Fit Checkered Casual Shirt",
            category: "Checked Shirts",
            price: 462,
            mrp: 1849,
            discount: 75,
            rating: 4.2,
            reviews: 1050,
            color: "Grey",
            sizes: ["S", "M", "L", "XL"],
            image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/h/d/e/-resized-original-imaheyc6snbhv4e9.jpeg?q=70"
        }

    ];


    /* =====================================================
       DOM ELEMENTS
    ===================================================== */
 const productContainer = document.getElementById("fashionProducts");
const searchInput = document.getElementById("fashionSearch");
const categoryContainer = document.getElementById("fashionCategories");
const sortSelect = document.getElementById("sortProducts");

    const categoryFilters =
        document.querySelectorAll(".category-filter");

    const brandFilters =
        document.querySelectorAll(".brand-filter");

    const colorFilters =
        document.querySelectorAll(".color-filter");

    const sizeFilters =
        document.querySelectorAll(".size-filter");

    const discountFilters =
        document.querySelectorAll('input[name="discount"]');

    const ratingFilters =
        document.querySelectorAll('input[name="rating"]');

    const priceRangeFilters =
        document.querySelectorAll('input[name="priceRange"]');

    const brandSearch =
        document.getElementById("brandSearch");

    const minPriceInput =
        document.getElementById("minPrice");

    const maxPriceInput =
        document.getElementById("maxPrice");

    const applyPriceButton =
        document.getElementById("applyPrice");

    const activeFiltersContainer =
        document.getElementById("activeFilters");

    const noProducts =
        document.getElementById("noProducts");

    const resetNoProducts =
        document.getElementById("resetNoProducts");

    const mobileFilterBtn =
        document.getElementById("mobileFilterBtn");

    const mobileSortBtn =
        document.getElementById("mobileSortBtn");

    const filterSidebar =
        document.getElementById("filterSidebar");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartDrawer =
        document.getElementById("fashionCartDrawer");

    const closeCartButton =
        document.getElementById("closeCart");

    const cartItemsContainer =
        document.getElementById("fashionCartItems");

    const emptyCart =
        document.getElementById("emptyFashionCart");

    const cartDrawerFooter =
        document.getElementById("cartDrawerFooter");

    const drawerCartCount =
        document.getElementById("drawerCartCount");

    const cartTotalElement =
        document.getElementById("fashionCartTotal");

    const checkoutButton =
        document.getElementById("fashionCheckoutBtn");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!productContainer) {
    console.error(
        "LocalMart: #fashionProducts not found. Add <div id=\"fashionProducts\"></div> to fashion-men.html"
    );
    return;
}


    /* =====================================================
       STATE
    ===================================================== */

    let currentProducts = [...menProducts];

    let currentSearch = "";

    let currentSort =
        sortSelect
            ? sortSelect.value || "recommended"
            : "recommended";

    let selectedMinPrice = null;

    let selectedMaxPrice = null;


    /* =====================================================
       STORAGE HELPERS
    ===================================================== */

    function getCart() {

        try {

            const data =
                JSON.parse(
                    localStorage.getItem(CART_KEY)
                );

            return Array.isArray(data)
                ? data
                : [];

        } catch (error) {

            return [];

        }
    }


    function saveCart(cart) {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

        updateCartCount();
        renderCart();

    }


    function getWishlist() {

        try {

            const data =
                JSON.parse(
                    localStorage.getItem(WISHLIST_KEY)
                );

            return Array.isArray(data)
                ? data.map(Number)
                : [];

        } catch (error) {

            return [];

        }
    }


    function saveWishlist(wishlist) {

        localStorage.setItem(
            WISHLIST_KEY,
            JSON.stringify(wishlist)
        );

        updateWishlistCount();

    }


    /* =====================================================
       PRICE FORMAT
    ===================================================== */

    function formatPrice(price) {

        return "₹" +
            Number(price || 0)
                .toLocaleString("en-IN");

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       STAR RATING
    ===================================================== */

    function renderStars(rating) {

        const value =
            Number(rating || 0);

        let html = "";

        for (let i = 1; i <= 5; i++) {

            if (value >= i) {

                html +=
                    '<i class="bi bi-star-fill"></i>';

            } else if (value >= i - 0.5) {

                html +=
                    '<i class="bi bi-star-half"></i>';

            } else {

                html +=
                    '<i class="bi bi-star"></i>';

            }

        }

        return `
            <span class="rating-stars">
                ${html}
            </span>
            <span class="rating-number">
                ${value.toFixed(1)}
            </span>
        `;

    }


    /* =====================================================
       GET CHECKED VALUES
    ===================================================== */

    function getCheckedValues(selector) {

        return Array.from(
            document.querySelectorAll(
                `${selector}:checked`
            )
        ).map(
            input => input.value
        );

    }


    /* =====================================================
       APPLY FILTERS
    ===================================================== */

    function applyFilters() {

        let products =
            [...menProducts];


        /* -----------------------------------------------
           SEARCH
        ----------------------------------------------- */

        const search =
            currentSearch
                .trim()
                .toLowerCase();

        if (search) {

            products =
                products.filter(product => {

                    return (

                        product.name
                            .toLowerCase()
                            .includes(search)

                        ||

                        product.brand
                            .toLowerCase()
                            .includes(search)

                        ||

                        product.category
                            .toLowerCase()
                            .includes(search)

                    );

                });

        }


        /* -----------------------------------------------
           CATEGORY
        ----------------------------------------------- */

        const selectedCategories =
            getCheckedValues(".category-filter");

        if (selectedCategories.length) {

            products =
                products.filter(product =>
                    selectedCategories.includes(
                        product.category
                    )
                );

        }


        /* -----------------------------------------------
           BRAND
        ----------------------------------------------- */

        const selectedBrands =
            getCheckedValues(".brand-filter");

        if (selectedBrands.length) {

            products =
                products.filter(product =>
                    selectedBrands.includes(
                        product.brand
                    )
                );

        }


        /* -----------------------------------------------
           COLOR
        ----------------------------------------------- */

        const selectedColors =
            getCheckedValues(".color-filter");

        if (selectedColors.length) {

            products =
                products.filter(product =>
                    selectedColors.includes(
                        product.color
                    )
                );

        }


        /* -----------------------------------------------
           SIZE
        ----------------------------------------------- */

        const selectedSizes =
            getCheckedValues(".size-filter");

        if (selectedSizes.length) {

            products =
                products.filter(product =>

                    selectedSizes.some(size =>
                        product.sizes.includes(size)
                    )

                );

        }


        /* -----------------------------------------------
           DISCOUNT
        ----------------------------------------------- */

        const selectedDiscounts =
            getCheckedValues(
                'input[name="discount"]'
            );

        if (selectedDiscounts.length) {

            products =
                products.filter(product =>

                    selectedDiscounts.some(
                        discount =>
                            product.discount >=
                            Number(discount)
                    )

                );

        }


        /* -----------------------------------------------
           RATING
        ----------------------------------------------- */

        const selectedRatings =
            getCheckedValues(
                'input[name="rating"]'
            );

        if (selectedRatings.length) {

            products =
                products.filter(product =>

                    selectedRatings.some(
                        rating =>
                            product.rating >=
                            Number(rating)
                    )

                );

        }


        /* -----------------------------------------------
           PRICE RADIO
        ----------------------------------------------- */

        const selectedPriceRanges =
            getCheckedValues(
                'input[name="priceRange"]'
            );

        if (selectedPriceRanges.length) {

            products =
                products.filter(product => {

                    return selectedPriceRanges.some(
                        range => {

                            const value =
                                Number(product.price);

                            switch (range) {

                                case "0-500":
                                    return value <= 500;

                                case "500-1000":
                                    return (
                                        value > 500 &&
                                        value <= 1000
                                    );

                                case "1000-1500":
                                    return (
                                        value > 1000 &&
                                        value <= 1500
                                    );

                                case "1500-2000":
                                    return (
                                        value > 1500 &&
                                        value <= 2000
                                    );

                                case "2000+":
                                    return value > 2000;

                                default:
                                    return true;

                            }

                        }
                    );

                });

        }


        /* -----------------------------------------------
           CUSTOM PRICE
        ----------------------------------------------- */

        if (
            selectedMinPrice !== null &&
            selectedMinPrice !== ""
        ) {

            products =
                products.filter(product =>
                    product.price >=
                    Number(selectedMinPrice)
                );

        }

        if (
            selectedMaxPrice !== null &&
            selectedMaxPrice !== ""
        ) {

            products =
                products.filter(product =>
                    product.price <=
                    Number(selectedMaxPrice)
                );

        }


        /* -----------------------------------------------
           SORT
        ----------------------------------------------- */

        switch (currentSort) {

            case "price-low":

                products.sort(
                    (a, b) =>
                        a.price - b.price
                );

                break;


            case "price-high":

                products.sort(
                    (a, b) =>
                        b.price - a.price
                );

                break;


            case "rating":

                products.sort(
                    (a, b) =>
                        (b.rating || 0) -
                        (a.rating || 0)
                );

                break;


            case "discount":

                products.sort(
                    (a, b) =>
                        (b.discount || 0) -
                        (a.discount || 0)
                );

                break;


            case "new":

            case "newest":

                products.sort(
                    (a, b) =>
                        b.id - a.id
                );

                break;


            case "popularity":

                products.sort(
                    (a, b) =>
                        (b.reviews || 0) -
                        (a.reviews || 0)
                );

                break;


            default:

                products.sort(
                    (a, b) =>
                        a.id - b.id
                );

        }


        currentProducts =
            products;


        renderProducts();
        renderActiveFilters();

    }


    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        const wishlist =
            getWishlist();

        const isWishlisted =
            wishlist.includes(
                Number(product.id)
            );


        return `

            
                <div class="fashion-product-item">
            >

                <div
                    class="product-card h-100"
                    data-product-id="${product.id}"
                >

                    <!-- IMAGE -->

                    <div class="product-image-wrapper">

                        <img
                            src="${escapeHTML(product.image)}"
                            alt="${escapeHTML(product.name)}"
                            class="product-image"
                            loading="lazy"
                            onerror="
                                this.onerror=null;
                                this.src='https://via.placeholder.com/500x650?text=LocalMart';
                            "
                        >

                        ${
                            product.discount
                                ? `
                                    <span class="discount-badge">
                                        ${product.discount}% OFF
                                    </span>
                                `
                                : ""
                        }


                        <!-- WISHLIST -->

                        <button
                            type="button"
                            class="
                                wishlist-btn
                                ${isWishlisted ? "active" : ""}
                            "
                            data-wishlist="${product.id}"
                            aria-label="Add to wishlist"
                        >

                            <i
                                class="
                                    bi
                                    ${
                                        isWishlisted
                                            ? "bi-heart-fill"
                                            : "bi-heart"
                                    }
                                "
                            ></i>

                        </button>

                    </div>


                    <!-- INFORMATION -->

                    <div class="product-info">

                        <div class="product-brand">

                            ${escapeHTML(
                                product.brand
                            )}

                        </div>


                        <div
                            class="product-name"
                            title="${escapeHTML(
                                product.name
                            )}"
                        >

                            ${escapeHTML(
                                product.name
                            )}

                        </div>


                        <!-- RATING -->

                        <div class="product-rating">

                            ${renderStars(
                                product.rating
                            )}

                            ${
                                product.reviews
                                    ? `
                                        <span
                                            class="text-muted small ms-1"
                                        >
                                            (
                                            ${Number(
                                                product.reviews
                                            ).toLocaleString("en-IN")}
                                            )
                                        </span>
                                    `
                                    : ""
                            }

                        </div>


                        <!-- PRICE -->

                        <div class="price-row">

                            <span class="product-price">

                                ${formatPrice(
                                    product.price
                                )}

                            </span>


                            <span class="product-mrp">

                                ${formatPrice(
                                    product.mrp
                                )}

                            </span>


                            ${
                                product.discount
                                    ? `
                                        <span
                                            class="product-discount"
                                        >
                                            ${product.discount}% off
                                        </span>
                                    `
                                    : ""
                            }

                        </div>


                        <!-- ADD TO BAG -->

                        <button
                            type="button"
                            class="add-cart-btn"
                            data-cart="${product.id}"
                        >

                            <i class="bi bi-bag-plus"></i>

                            Add to Bag

                        </button>

                    </div>

                </div>

            </div>

        `;

    }


    /* =====================================================
       RENDER PRODUCTS
    ===================================================== */

    function renderProducts() {

        if (!currentProducts.length) {

            productContainer.innerHTML = "";

            if (noProducts) {

                noProducts.classList.remove(
                    "d-none"
                );

            } else {

                productContainer.innerHTML = `
                    <div class="col-12 text-center py-5">

                        <i
                            class="bi bi-search"
                            style="font-size:48px;color:#999;"
                        ></i>

                        <h5 class="mt-3">
                            No products found
                        </h5>

                        <p class="text-muted">
                            Try changing your filters or search.
                        </p>

                    </div>
                `;

            }

            return;
        }


        if (noProducts) {

            noProducts.classList.add(
                "d-none"
            );

        }


        productContainer.innerHTML =
            currentProducts
                .map(createProductCard)
                .join("");


        attachProductEvents();

    }


    /* =====================================================
       PRODUCT EVENTS
    ===================================================== */

    function attachProductEvents() {


        /* -----------------------------------------------
           WISHLIST
        ----------------------------------------------- */

        productContainer
            .querySelectorAll(
                "[data-wishlist]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();

                        const id =
                            Number(
                                button.dataset.wishlist
                            );

                        toggleWishlist(id);

                    }
                );

            });


        /* -----------------------------------------------
           CART
        ----------------------------------------------- */

        productContainer
            .querySelectorAll(
                "[data-cart]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();

                        const id =
                            Number(
                                button.dataset.cart
                            );

                        addToCart(id);

                    }
                );

            });

    }


    /* =====================================================
       WISHLIST
    ===================================================== */

    function toggleWishlist(productId) {

        let wishlist =
            getWishlist();


        if (
            wishlist.includes(
                Number(productId)
            )
        ) {

            wishlist =
                wishlist.filter(
                    id =>
                        Number(id) !==
                        Number(productId)
                );

            showToast(
                "Removed from wishlist",
                "secondary"
            );

        } else {

            wishlist.push(
                Number(productId)
            );

            showToast(
                "Added to wishlist ❤️",
                "success"
            );

        }


        saveWishlist(
            wishlist
        );
        const wishlistProduct = menProducts.find(item => Number(item.id) === Number(productId));
        if (wishlistProduct && window.localmartFashionSync) window.localmartFashionSync("wishlist_toggle", "men", wishlistProduct);

        renderProducts();

    }


    /* =====================================================
       ADD TO CART
    ===================================================== */

    function addToCart(productId) {

        const product =
            menProducts.find(
                item =>
                    Number(item.id) ===
                    Number(productId)
            );


        if (!product) {
            return;
        }


        const cart =
            getCart();


        const existing =
            cart.find(
                item =>
                    Number(item.id) ===
                    Number(productId)
            );


        if (existing) {

            existing.quantity =
                Number(
                    existing.quantity || 1
                ) + 1;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                brand: product.brand,

                price: product.price,

                mrp: product.mrp,

                discount: product.discount,

                image: product.image,

                quantity: 1

            });

        }


        saveCart(cart);
        if (window.localmartFashionSync) window.localmartFashionSync("add", "men", product);


        showToast(
            `${product.brand} - ${product.name} added to the shared cart`,
            "success"
        );

    }


    /* =====================================================
       UPDATE CART COUNT
    ===================================================== */

    function updateCartCount() {

        const cart =
            getCart();


        const count =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.quantity || 1
                    ),
                0
            );


        const elements =
            document.querySelectorAll(
                `
                #navbarCartCount,
                #cartCount,
                .cart-count,
                [data-cart-count]
                `
            );


        elements.forEach(
            element => {

                element.textContent =
                    count;

                element.style.display =
                    count > 0
                        ? ""
                        : "none";

            }
        );


        if (drawerCartCount) {

            drawerCartCount.textContent =
                count;

        }

    }


    /* =====================================================
       UPDATE WISHLIST COUNT
    ===================================================== */

    function updateWishlistCount() {

        const wishlist =
            getWishlist();


        const elements =
            document.querySelectorAll(
                `
                #navbarWishlistCount,
                #wishlistCount,
                .wishlist-count,
                [data-wishlist-count]
                `
            );


        elements.forEach(
            element => {

                element.textContent =
                    wishlist.length;

                element.style.display =
                    wishlist.length > 0
                        ? ""
                        : "none";

            }
        );

    }


    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        if (!cartItemsContainer) {
            return;
        }


        const cart =
            getCart();


        updateCartCount();


        if (!cart.length) {

            cartItemsContainer.innerHTML =
                "";

            if (emptyCart) {

                emptyCart.style.display =
                    "";

            }

            if (cartDrawerFooter) {

                cartDrawerFooter.style.display =
                    "none";

            }

            return;

        }


        if (emptyCart) {

            emptyCart.style.display =
                "none";

        }


        if (cartDrawerFooter) {

            cartDrawerFooter.style.display =
                "";

        }


        cartItemsContainer.innerHTML =
            cart.map(
                item => `

                    <div
                        class="cart-item"
                        data-cart-item="${item.id}"
                    >

                        <div class="cart-item-image">

                            <img
                                src="${escapeHTML(
                                    item.image
                                )}"
                                alt="${escapeHTML(
                                    item.name
                                )}"
                                onerror="
                                    this.onerror=null;
                                    this.src='https://via.placeholder.com/120x150?text=LocalMart';
                                "
                            >

                        </div>


                        <div class="cart-item-details">

                            <div
                                class="cart-item-brand"
                            >
                                ${escapeHTML(
                                    item.brand || ""
                                )}
                            </div>


                            <div
                                class="cart-item-name"
                            >
                                ${escapeHTML(
                                    item.name
                                )}
                            </div>


                            <div
                                class="cart-item-price"
                            >
                                ${formatPrice(
                                    item.price
                                )}
                            </div>


                            <div
                                class="cart-quantity"
                            >

                                <button
                                    type="button"
                                    class="quantity-btn"
                                    data-decrease="${item.id}"
                                >
                                    −
                                </button>

                                <span>
                                    ${Number(
                                        item.quantity || 1
                                    )}
                                </span>

                                <button
                                    type="button"
                                    class="quantity-btn"
                                    data-increase="${item.id}"
                                >
                                    +
                                </button>

                            </div>


                            <button
                                type="button"
                                class="remove-cart-btn"
                                data-remove-cart="${item.id}"
                            >
                                <i class="bi bi-trash"></i>
                                Remove
                            </button>

                        </div>

                    </div>

                `
            ).join("");


        /* -----------------------------------------------
           TOTAL
        ----------------------------------------------- */

        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    Number(item.price || 0) *
                    Number(item.quantity || 1),
                0
            );


        if (cartTotalElement) {

            cartTotalElement.textContent =
                formatPrice(total);

        }


        /* -----------------------------------------------
           CART EVENTS
        ----------------------------------------------- */

        cartItemsContainer
            .querySelectorAll(
                "[data-increase]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        changeCartQuantity(
                            Number(
                                button.dataset.increase
                            ),
                            1
                        );

                    }
                );

            });


        cartItemsContainer
            .querySelectorAll(
                "[data-decrease]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        changeCartQuantity(
                            Number(
                                button.dataset.decrease
                            ),
                            -1
                        );

                    }
                );

            });


        cartItemsContainer
            .querySelectorAll(
                "[data-remove-cart]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        removeFromCart(
                            Number(
                                button.dataset.removeCart
                            )
                        );

                    }
                );

            });

    }


    /* =====================================================
       CHANGE CART QUANTITY
    ===================================================== */

    function changeCartQuantity(
        productId,
        amount
    ) {

        const cart =
            getCart();


        const item =
            cart.find(
                product =>
                    Number(product.id) ===
                    Number(productId)
            );


        if (!item) {
            return;
        }


        item.quantity =
            Number(
                item.quantity || 1
            ) + amount;


        if (item.quantity <= 0) {

            const updatedCart =
                cart.filter(
                    product =>
                        Number(product.id) !==
                        Number(productId)
                );

            saveCart(updatedCart);

        } else {

            saveCart(cart);

        }

    }


    /* =====================================================
       REMOVE CART ITEM
    ===================================================== */

    function removeFromCart(productId) {

        const cart =
            getCart();


        const updatedCart =
            cart.filter(
                item =>
                    Number(item.id) !==
                    Number(productId)
            );


        saveCart(
            updatedCart
        );


        showToast(
            "Item removed from bag",
            "secondary"
        );

    }


    /* =====================================================
       OPEN CART
    ===================================================== */

    function openCart() {

        if (!cartDrawer) {
            return;
        }


        cartDrawer.classList.add(
            "open"
        );


        if (cartOverlay) {

            cartOverlay.classList.add(
                "active"
            );

        }


        document.body.classList.add(
            "cart-open"
        );


        renderCart();

    }


    /* =====================================================
       CLOSE CART
    ===================================================== */

    function closeCart() {

        if (cartDrawer) {

            cartDrawer.classList.remove(
                "open"
            );

        }


        if (cartOverlay) {

            cartOverlay.classList.remove(
                "active"
            );

        }


        document.body.classList.remove(
            "cart-open"
        );

    }


    /* =====================================================
       CART EVENTS
    ===================================================== */

    if (closeCartButton) {

        closeCartButton.addEventListener(
            "click",
            closeCart
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCart
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeCart();

            }

        }
    );


    /* =====================================================
       CART NAVBAR LINKS
    ===================================================== */

    document
        .querySelectorAll(
            `
            #navbarCartLink,
            [data-open-cart]
            `
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    window.location.href = element.href;

                }
            );

        });


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                currentSearch =
                    searchInput.value;

                applyFilters();

            }
        );

    }


    /* =====================================================
       SORT
    ===================================================== */

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            () => {

                currentSort =
                    sortSelect.value;

                applyFilters();

            }
        );

    }


    /* =====================================================
       CHECKBOX FILTER EVENTS
    ===================================================== */

    [
        ...categoryFilters,
        ...brandFilters,
        ...colorFilters,
        ...sizeFilters,
        ...discountFilters,
        ...ratingFilters,
        ...priceRangeFilters
    ].forEach(input => {

        input.addEventListener(
            "change",
            applyFilters
        );

    });


    /* =====================================================
       BRAND SEARCH
    ===================================================== */

    if (brandSearch) {

        brandSearch.addEventListener(
            "input",
            () => {

                const search =
                    brandSearch.value
                        .trim()
                        .toLowerCase();


                document
                    .querySelectorAll(
                        ".brand-filter"
                    )
                    .forEach(input => {

                        const label =
                            input.closest(
                                "label"
                            );


                        const text =
                            (
                                label
                                    ? label.textContent
                                    : input.value
                            )
                            .toLowerCase();


                        if (
                            !search ||
                            text.includes(search)
                        ) {

                            if (label) {
                                label.style.display =
                                    "";
                            }

                        } else {

                            if (label) {
                                label.style.display =
                                    "none";
                            }

                        }

                    });

            }
        );

    }


    /* =====================================================
       CUSTOM PRICE
    ===================================================== */

    if (applyPriceButton) {

        applyPriceButton.addEventListener(
            "click",
            () => {

                selectedMinPrice =
                    minPriceInput
                        ? minPriceInput.value
                        : null;

                selectedMaxPrice =
                    maxPriceInput
                        ? maxPriceInput.value
                        : null;


                if (
                    selectedMinPrice &&
                    selectedMaxPrice &&
                    Number(selectedMinPrice) >
                    Number(selectedMaxPrice)
                ) {

                    showToast(
                        "Minimum price cannot exceed maximum price",
                        "warning"
                    );

                    return;

                }


                applyFilters();

            }
        );

    }


    /* =====================================================
       ACTIVE FILTER CHIPS
    ===================================================== */

    function renderActiveFilters() {

        if (!activeFiltersContainer) {
            return;
        }


        const filters = [];


        /* Category */

        document
            .querySelectorAll(
                ".category-filter:checked"
            )
            .forEach(input => {

                filters.push({
                    type: "checkbox",
                    selector: ".category-filter",
                    value: input.value,
                    label: input.value
                });

            });


        /* Brand */

        document
            .querySelectorAll(
                ".brand-filter:checked"
            )
            .forEach(input => {

                filters.push({
                    type: "checkbox",
                    selector: ".brand-filter",
                    value: input.value,
                    label: input.value
                });

            });


        /* Color */

        document
            .querySelectorAll(
                ".color-filter:checked"
            )
            .forEach(input => {

                filters.push({
                    type: "checkbox",
                    selector: ".color-filter",
                    value: input.value,
                    label: input.value
                });

            });


        /* Size */

        document
            .querySelectorAll(
                ".size-filter:checked"
            )
            .forEach(input => {

                filters.push({
                    type: "checkbox",
                    selector: ".size-filter",
                    value: input.value,
                    label: "Size " + input.value
                });

            });


        /* Discount */

        document
            .querySelectorAll(
                'input[name="discount"]:checked'
            )
            .forEach(input => {

                filters.push({
                    type: "checkbox",
                    selector: 'input[name="discount"]',
                    value: input.value,
                    label: input.value + "%+ Off"
                });

            });


        /* Rating */

        document
            .querySelectorAll(
                'input[name="rating"]:checked'
            )
            .forEach(input => {

                filters.push({
                    type: "checkbox",
                    selector: 'input[name="rating"]',
                    value: input.value,
                    label: input.value + "★ & above"
                });

            });


        /* Price */

        document
            .querySelectorAll(
                'input[name="priceRange"]:checked'
            )
            .forEach(input => {

                filters.push({
                    type: "checkbox",
                    selector: 'input[name="priceRange"]',
                    value: input.value,
                    label: input.parentElement
                        ? input.parentElement.textContent.trim()
                        : input.value
                });

            });


        /* Custom Price */

        if (
            selectedMinPrice !== null &&
            selectedMinPrice !== ""
        ) {

            filters.push({
                type: "custom",
                label:
                    "Min " +
                    formatPrice(selectedMinPrice)
            });

        }


        if (
            selectedMaxPrice !== null &&
            selectedMaxPrice !== ""
        ) {

            filters.push({
                type: "custom",
                label:
                    "Max " +
                    formatPrice(selectedMaxPrice)
            });

        }


        if (!filters.length) {

            activeFiltersContainer.innerHTML =
                "";

            return;

        }


        activeFiltersContainer.innerHTML =
            filters.map(
                filter => `

                    <span
                        class="active-filter-chip"
                        data-filter-value="${escapeHTML(
                            filter.value || ""
                        )}"
                        data-filter-selector="${escapeHTML(
                            filter.selector || ""
                        )}"
                        data-filter-type="${filter.type}"
                    >

                        ${escapeHTML(
                            filter.label
                        )}

                        <button
                            type="button"
                            class="active-filter-remove"
                            aria-label="Remove filter"
                        >
                            ×
                        </button>

                    </span>

                `
            ).join("");


        activeFiltersContainer
            .querySelectorAll(
                ".active-filter-remove"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const chip =
                            button.closest(
                                ".active-filter-chip"
                            );


                        if (!chip) {
                            return;
                        }


                        const type =
                            chip.dataset.filterType;


                        if (
                            type === "custom"
                        ) {

                            selectedMinPrice =
                                null;

                            selectedMaxPrice =
                                null;


                            if (minPriceInput) {
                                minPriceInput.value =
                                    "";
                            }

                            if (maxPriceInput) {
                                maxPriceInput.value =
                                    "";
                            }

                        } else {

                            const selector =
                                chip.dataset
                                    .filterSelector;

                            const value =
                                chip.dataset
                                    .filterValue;


                            document
                                .querySelectorAll(
                                    selector
                                )
                                .forEach(input => {

                                    if (
                                        input.value ===
                                        value
                                    ) {

                                        input.checked =
                                            false;

                                    }

                                });

                        }


                        applyFilters();

                    }
                );

            });

    }


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    function resetFilters() {

        document
            .querySelectorAll(
                `
                .category-filter,
                .brand-filter,
                .color-filter,
                .size-filter,
                input[name="discount"],
                input[name="rating"],
                input[name="priceRange"]
                `
            )
            .forEach(input => {

                input.checked =
                    false;

            });


        if (searchInput) {

            searchInput.value =
                "";

        }


        if (brandSearch) {

            brandSearch.value =
                "";

        }


        if (minPriceInput) {

            minPriceInput.value =
                "";

        }


        if (maxPriceInput) {

            maxPriceInput.value =
                "";

        }


        document
            .querySelectorAll(
                ".brand-filter"
            )
            .forEach(input => {

                const label =
                    input.closest(
                        "label"
                    );

                if (label) {

                    label.style.display =
                        "";

                }

            });


        selectedMinPrice =
            null;

        selectedMaxPrice =
            null;

        currentSearch =
            "";


        if (sortSelect) {

            sortSelect.value =
                "recommended";

            currentSort =
                "recommended";

        }


        applyFilters();

    }


    if (resetNoProducts) {

        resetNoProducts.addEventListener(
            "click",
            resetFilters
        );

    }


    /* =====================================================
       MOBILE FILTER
    ===================================================== */

    if (mobileFilterBtn) {

        mobileFilterBtn.addEventListener(
            "click",
            () => {

                if (filterSidebar) {

                    filterSidebar.classList.toggle(
                        "mobile-filter-open"
                    );

                }

            }
        );

    }


    /* =====================================================
       MOBILE SORT
    ===================================================== */

    if (mobileSortBtn) {

        mobileSortBtn.addEventListener(
            "click",
            () => {

                if (sortSelect) {

                    sortSelect.focus();

                    sortSelect.click();

                }

            }
        );

    }


    /* =====================================================
       CHECKOUT
    ===================================================== */

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            () => {

                const cart =
                    getCart();


                if (!cart.length) {

                    showToast(
                        "Your bag is empty",
                        "warning"
                    );

                    return;

                }


                /*
                   If Django checkout URL exists,
                   use it. Otherwise display message.
                */

                if (
                    window.location.pathname.includes(
                        "/fashion/"
                    )
                ) {

                    window.location.href =
                        "/checkout/";

                } else {

                    showToast(
                        "Proceeding to checkout...",
                        "success"
                    );

                }

            }
        );

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(
        message,
        type = "success"
    ) {

        let container =
            document.getElementById(
                "localmartToastContainer"
            );


        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.id =
                "localmartToastContainer";


            container.style.position =
                "fixed";

            container.style.top =
                "85px";

            container.style.right =
                "20px";

            container.style.zIndex =
                "999999";

            container.style.pointerEvents =
                "none";


            document.body.appendChild(
                container
            );

        }


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            `alert alert-${type} shadow-sm mb-2`;


        toast.style.minWidth =
            "280px";

        toast.style.maxWidth =
            "380px";

        toast.style.borderRadius =
            "10px";

        toast.style.pointerEvents =
            "auto";

        toast.style.transition =
            "all 0.3s ease";


        let icon =
            "bi-check-circle-fill";


        if (type === "warning") {

            icon =
                "bi-exclamation-triangle-fill";

        }

        if (type === "secondary") {

            icon =
                "bi-info-circle-fill";

        }

        if (type === "danger") {

            icon =
                "bi-x-circle-fill";

        }


        toast.innerHTML = `

            <i
                class="bi ${icon} me-2"
            ></i>

            ${escapeHTML(message)}

        `;


        container.appendChild(
            toast
        );


        setTimeout(
            () => {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateX(20px)";


                setTimeout(
                    () => {

                        toast.remove();

                    },
                    300
                );

            },
            2200
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateCartCount();

    updateWishlistCount();

    localStorage.setItem(
        "localmartFashionMenProducts",
        JSON.stringify(menProducts)
    );

    renderCart();

    applyFilters();
    if (window.localmartFashionSync) {
        getCart().forEach(item => {
            const product = menProducts.find(product => Number(product.id) === Number(item.id)) || item;
            window.localmartFashionSync("sync", "men", product, {quantity: Number(item.quantity || 1)});
        });
        getWishlist().forEach(id => {
            const product = menProducts.find(item => Number(item.id) === Number(id));
            if (product) window.localmartFashionSync("sync", "men", product, {wishlisted: true});
        });
    }


    /* =====================================================
       GLOBAL ACCESS
    ===================================================== */

    window.menProducts =
        menProducts;

    window.localmartMenProducts =
        menProducts;

    window.addMenProductToCart =
        addToCart;

    window.toggleMenWishlist =
        toggleWishlist;

    window.openFashionMenCart =
        () => { window.location.href = "/fashion/cart/"; };

    window.closeFashionMenCart =
        closeCart;

    window.resetFashionMenFilters =
        resetFilters;


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        `LocalMart Men's Fashion loaded: ${menProducts.length} products`
    );

});