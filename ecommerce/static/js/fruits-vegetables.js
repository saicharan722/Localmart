/* =========================================================
   LOCALMART - FRUITS & VEGETABLES
   Zepto-style Product Catalogue
   ========================================================= */

"use strict";

/* =========================================================
   ZEpto CATEGORY IMAGES
   ========================================================= */

const fruitVegetableCategories = [
    {
        name: "All",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-120-120,pr-true,f-auto,q-40/cms/sub_category/102e9688-c220-4a0e-bc35-0f0b16de6ad1.png"
    },
    {
        name: "Fresh Vegetables",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-160-161,pr-true,f-auto,q-40/cms/sub_category/694c07e0-542b-49db-a596-b1f4f4935342.png"
    },
    
    
    {
        name: "Exotics & Premium",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-480-480,pr-true,f-auto,q-40/cms/sub_category/c82b4bac-d830-46e3-a6d3-ac8934abc9f5.png"
    },
   
    {
        name: "Organics & Hydroponics",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-480-480,pr-true,f-auto,q-40/cms/sub_category/8eaac110-0f14-47d3-b986-b024f107aba3.png"
    },
    {
        name: "Leafy, Herbs & Seasonings",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-160-161,pr-true,f-auto,q-40/cms/sub_category/63d60637-1717-4eb3-9df3-a9bfb6f05d49.png"
    },
    {
        name: "Flowers & Leaves",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-120-120,pr-true,f-auto,q-40/cms/sub_category/bd21967b-db0e-4cc5-9ea2-5ba1571d58d1.png"
    },
   
   
    {
        name: "Cuts & Sprouts",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-480-480,pr-true,f-auto,q-40/cms/sub_category/f3282f5f-6ab2-4998-977f-926d86bcbb56.png"
    },
    
    
];


/* =========================================================
   PRODUCTS
   ========================================================= */

const fruitsVegetablesProducts = [

    {
        id: 1001,
        name: "Banana Leaves",
        category: "Flowers & Leaves",
        unit: "2 pcs",
        price: 22,
        mrp: 40,
        discount: 45,
        rating: 4.5,
        reviews: 128,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-736-736,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0803e5be-495e-472c-a857-0ef029970a3b/Banana-Leaves.jpeg"
    },

    {
        id: 1002,
        name: "Assorted Roses",
        category: "Flowers & Leaves",
        unit: "100 g",
        price: 31,
        mrp: 66,
        discount: 53,
        rating: 4.4,
        reviews: 96,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1024-1024,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d9e5b071-2698-4102-a5c0-a9dba45e32e4/Assorted-Roses.jpeg"
    },

    {
        id: 1003,
        name: "Organically Grown Spinach",
        category: "Leafy, Herbs & Seasonings",
        unit: "100 g",
        price: 19.57,
        mrp: 60,
        discount: 67,
        rating: 4.6,
        reviews: 245,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-858-858,pr-true,f-auto,q-40,dpr-2/cms/product_variant/615032c7-9dcb-47b8-9947-35a42f8b9270/Organically-Grown-Spinach.jpeg"
    },

    {
        id: 1004,
        name: "Mushroom Button",
        category: "Fresh Vegetables",
        unit: "200 g",
        price: 63,
        mrp: 93,
        discount: 32,
        rating: 4.3,
        reviews: 184,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6900fabb-295e-4b88-898d-5a2cee7bc696/Mushroom-Button.jpeg"
    },

    {
        id: 1005,
        name: "Chilli Green",
        category: "Fresh Vegetables",
        unit: "100 g",
        price: 15,
        mrp: 33,
        discount: 55,
        rating: 4.5,
        reviews: 320,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/831b1429-cec1-4178-811c-3fa88bf689f1/Chilli-Green.jpeg"
    },

    {
        id: 1006,
        name: "Onion",
        category: "Fresh Vegetables",
        unit: "900 g - 1 kg",
        price: 50,
        mrp: 118,
        discount: 58,
        rating: 4.4,
        reviews: 540,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1024-1024,pr-true,f-auto,q-40,dpr-2/cms/product_variant/67e93080-1b79-4e17-89b5-a11cc3d0e527/Onion.jpeg"
    },

    {
        id: 1007,
        name: "Coriander Leaves",
        category: "Leafy, Herbs & Seasonings",
        unit: "100 g",
        price: 11,
        mrp: 20,
        discount: 45,
        rating: 4.6,
        reviews: 410,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8d42f6c5-4e11-436d-81c4-cc24a3b28bcc/Coriander-Leaves.jpeg"
    },

    {
        id: 1008,
        name: "Marigold Yellow Flower",
        category: "Flowers & Leaves",
        unit: "100 g",
        price: 14,
        mrp: 30,
        discount: 53,
        rating: 4.5,
        reviews: 112,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bad6c5c5-bfad-4f0f-9e22-eb5511344080/Marigold-Yellow-Flower.jpeg"
    },

    {
        id: 1009,
        name: "Banana Robusta",
        category: "Fresh Fruits",
        unit: "4 pcs",
        price: 31,
        mrp: 72,
        discount: 57,
        rating: 4.5,
        reviews: 630,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2ee02a46-99b9-4fc7-b389-0e881c02fe56/Banana-Robusta.jpeg"
    },

    {
        id: 1010,
        name: "Snacky Apple",
        category: "Fresh Fruits",
        unit: "2 pcs",
        price: 75,
        mrp: 119,
        discount: 37,
        rating: 4.6,
        reviews: 287,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-858-858,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a57eda5b-6a13-4cfd-a029-819dd98f0ebf/Snacky-Apple.png"
    },

    {
        id: 1011,
        name: "Carrot Local",
        category: "Fresh Vegetables",
        unit: "250 g",
        price: 23,
        mrp: 56,
        discount: 59,
        rating: 4.4,
        reviews: 230,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1224-1224,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c855754b-4adf-4a5a-ba70-35378eb6baca/Carrot-Local.png"
    },

    {
        id: 1012,
        name: "Ginger",
        category: "Leafy, Herbs & Seasonings",
        unit: "100 - 150 g",
        price: 23,
        mrp: 64,
        discount: 64,
        rating: 4.5,
        reviews: 310,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/08fd2def-a686-4a50-baff-2a88fb417f7b/Ginger.jpeg"
    },

    {
        id: 1013,
        name: "Betel Leaves (Paan)",
        category: "Leafy, Herbs & Seasonings",
        unit: "10 pcs",
        price: 24,
        mrp: 52,
        discount: 54,
        rating: 4.2,
        reviews: 84,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1024-1024,pr-true,f-auto,q-40,dpr-2/cms/product_variant/92faf9ac-b782-4826-8f01-35634fc8d3e1/Betel-Leaves-Paan-.jpeg"
    },

    {
        id: 1014,
        name: "Baby Orange (Mandarin)",
        category: "Fresh Fruits",
        unit: "3 pcs",
        price: 92,
        mrp: 139,
        discount: 34,
        rating: 4.5,
        reviews: 172,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-940-940,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1d6f53ed-eee9-417f-bea4-aed0a5a27910/Baby-Orange-Mandarin-.png"
    },

    {
        id: 1015,
        name: "Tomato Local",
        category: "Fresh Vegetables",
        unit: "500 g",
        price: 16,
        mrp: 50,
        discount: 68,
        rating: 4.4,
        reviews: 520,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1254-1254,pr-true,f-auto,q-40,dpr-2/cms/product_variant/07036b38-4e22-44c9-b7ac-8e0077efc3cc/Tomato-Local.png"
    },

    {
        id: 1016,
        name: "Organically Grown Sweet Corn",
        category: "Fresh Vegetables",
        unit: "1 pc",
        price: 19.8,
        mrp: 49,
        discount: 60,
        rating: 4.5,
        reviews: 142,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-697-697,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3fc9dc71-6807-42da-9c29-815dee1e0aa5/Organically-Grown-Sweet-Corn.jpeg"
    },

    {
        id: 1017,
        name: "Mosambi",
        category: "Fresh Fruits",
        unit: "2 pcs",
        price: 18,
        mrp: 54,
        discount: 67,
        rating: 4.4,
        reviews: 260,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/47f7d4e6-d223-45fc-b576-c0151bd73324/Mosambi.jpeg"
    },

    {
        id: 1018,
        name: "Potato",
        category: "Fresh Vegetables",
        unit: "900 g - 1 kg",
        price: 25,
        mrp: 55,
        discount: 55,
        rating: 4.5,
        reviews: 720,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2940-2940,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8d987d14-80ad-407a-9424-3fda999e1556/Potato.jpeg"
    },

    {
        id: 1019,
        name: "Coconut",
        category: "Fresh Fruits",
        unit: "1 pc",
        price: 43,
        mrp: 96,
        discount: 55,
        rating: 4.4,
        reviews: 340,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6c904c71-5ba8-4592-9cbb-cdec02924f82/Coconut.jpeg"
    },

    {
        id: 1020,
        name: "Organically Grown Garlic",
        category: "Fresh Vegetables",
        unit: "100 g",
        price: 47.3,
        mrp: 56,
        discount: 16,
        rating: 4.6,
        reviews: 184,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-937-937,pr-true,f-auto,q-40,dpr-2/cms/product_variant/11baeef4-7e45-446c-a906-d4732a18b7e2/Organically-Grown-Garlic.png"
    },

    {
        id: 1021,
        name: "Rose Flower Mix",
        category: "Flowers & Leaves",
        unit: "100 g",
        price: 29,
        mrp: 64,
        discount: 55,
        rating: 4.5,
        reviews: 98,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d8bcb3c6-6b9b-46bf-a763-2eca407668e6/Rose-Flower-Mix.jpeg"
    },

    {
        id: 1022,
        name: "Curry Leaves - Cleaned, without roots",
        category: "Leafy, Herbs & Seasonings",
        unit: "50 g",
        price: 9,
        mrp: 27,
        discount: 67,
        rating: 4.6,
        reviews: 390,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9f080e68-31d0-494e-81be-486f5a62619e/Curry-Leaves-Cleaned-without-roots.jpeg"
    },

    {
        id: 1023,
        name: "Custard Apple Semi Ripe",
        category: "Fresh Fruits",
        unit: "2 pcs (360 - 450 g)",
        price: 84,
        mrp: 167,
        discount: 50,
        rating: 4.3,
        reviews: 76,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1254-1254,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fa6acfce-a598-4f3e-aa28-eb94df49d743/Custard-Apple-Semi-Ripe.png"
    },

    {
        id: 1024,
        name: "Avial Mix",
        category: "Cuts & Sprouts",
        unit: "250 g",
        price: 66,
        mrp: 114,
        discount: 42,
        rating: 4.4,
        reviews: 91,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1254-1254,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ddce3f61-8816-4716-bb7f-5cfe75d1b970/Avial-Mix.png"
    },

    {
        id: 1025,
        name: "Pear Green Indian (Nashpati)",
        category: "Fresh Fruits",
        unit: "400 - 600 g",
        price: 68,
        mrp: 139,
        discount: 51,
        rating: 4.5,
        reviews: 164,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1254-1254,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f749f0c3-721a-415e-bc4a-af758f44c756/Pear-Green-Indian-Nashpati-.png"
    },

    {
        id: 1026,
        name: "Dragon Fruit Red",
        category: "Exotics & Premium",
        unit: "1 pc",
        price: 57,
        mrp: 106,
        discount: 46,
        rating: 4.5,
        reviews: 135,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f8263004-d030-47c4-91d7-64e68d4ff2f0/Dragon-Fruit-Red.jpg"
    },

    {
        id: 1027,
        name: "Beans Cowpea",
        category: "Fresh Vegetables",
        unit: "500 g",
        price: 44,
        mrp: 119,
        discount: 63,
        rating: 4.4,
        reviews: 120,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ea93f425-cd87-4d29-a7cb-05c59c970789/Beans-Cowpea.jpeg"
    },

    {
        id: 1028,
        name: "Banana Robusta",
        category: "Fresh Fruits",
        unit: "2 pcs",
        price: 19,
        mrp: 42,
        discount: 55,
        rating: 4.5,
        reviews: 305,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/eda4dbf5-b928-4737-bbee-f42af29b2ffa/Banana-Robusta.jpeg"
    },

    {
        id: 1029,
        name: "Organically Grown Coriander Leaves",
        category: "Organics & Hydroponics",
        unit: "100 g",
        price: 12.1,
        mrp: 30,
        discount: 60,
        rating: 4.6,
        reviews: 176,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-883-883,pr-true,f-auto,q-40,dpr-2/cms/product_variant/668319e0-9429-4f41-8c6e-adc3dca147eb/Organically-Grown-Coriander-Leaves.png"
    },

    {
        id: 1030,
        name: "Guava Thai",
        category: "Exotics & Premium",
        unit: "1 pc",
        price: 46,
        mrp: 84,
        discount: 45,
        rating: 4.4,
        reviews: 108,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/85ea6516-de09-455a-a332-cedcada09588/Guava-Thai.jpeg"
    },

    {
        id: 1031,
        name: "Banana Elaichi (Yelakki)",
        category: "Fresh Fruits",
        unit: "500 g",
        price: 70,
        mrp: 149,
        discount: 53,
        rating: 4.5,
        reviews: 221,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1024-1024,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cf8f80c4-1b42-46bc-a3cf-55360cd418e9/Banana-Elaichi-Yelakki-.jpeg"
    },

    {
        id: 1032,
        name: "Organically Grown Chilli Green",
        category: "Organics & Hydroponics",
        unit: "100 g",
        price: 16.5,
        mrp: 34,
        discount: 51,
        rating: 4.6,
        reviews: 148,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-937-937,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5a012ed0-ec43-4743-8a21-bf35c541ffbb/Organically-Grown-Chilli-Green.png"
    }
];













/* =========================================================
   GROCERY CART
   ========================================================= */

const GROCERY_CART_KEY = "localmartGroceryCart";
const WISHLIST_KEY = "localmartGroceryWishlist";

let currentCategory = "All";
let currentProducts = [...fruitsVegetablesProducts];


/* =========================================================
   GROCERY CART HELPERS
   ========================================================= */

function getGroceryCart() {
    try {
        const cart = JSON.parse(
            localStorage.getItem(GROCERY_CART_KEY)
        );

        return Array.isArray(cart) ? cart : [];

    } catch (error) {
        console.error("Grocery cart read error:", error);
        return [];
    }
}


function saveGroceryCart(cart) {

    try {

        localStorage.setItem(
            GROCERY_CART_KEY,
            JSON.stringify(cart)
        );

        window.dispatchEvent(
            new Event("groceryCartUpdated")
        );

    } catch (error) {

        console.error(
            "Grocery cart save error:",
            error
        );
    }
}


/* =========================================================
   ADD TO GROCERY CART
   ========================================================= */

function addToGroceryCart(id) {

    const product = fruitsVegetablesProducts.find(
        item =>
            Number(item.id) === Number(id)
    );

    if (!product) {

        console.error(
            "Grocery product not found:",
            id
        );

        return;
    }


    const cart = getGroceryCart();


    const existingItem = cart.find(
        item =>
            Number(item.id) === Number(product.id)
    );


    if (existingItem) {

        existingItem.quantity =
            Number(existingItem.quantity || 1) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            category:
                product.category || "Fresh Fruits & Vegetables",

            unit:
                product.unit || "",

            price:
                Number(product.price) || 0,

            mrp:
                Number(product.mrp) || 0,

            discount:
                Number(product.discount) || 0,

            rating:
                Number(product.rating) || 0,

            reviews:
                Number(product.reviews) || 0,

            quantity: 1,

            image:
                product.image || ""

        });
    }


    saveGroceryCart(cart);

    updateGroceryCartCount();


    showToast(
        `${product.name} added to Grocery Cart 🛒`
    );


    console.log(
        "Grocery cart:",
        getGroceryCart()
    );
}


/* =========================================================
   BACKWARD COMPATIBILITY
   ========================================================= */

function addToCart(id) {

    addToGroceryCart(id);

}


/* =========================================================
   WISHLIST
   ========================================================= */

function getWishlist() {

    try {

        const wishlist =
            JSON.parse(
                localStorage.getItem(WISHLIST_KEY)
            );

        if (!Array.isArray(wishlist)) return [];

        const normalized = wishlist.map(item => {
            if (item && typeof item === "object") return item;
            return fruitsVegetablesProducts.find(
                product => String(product.id) === String(item)
            ) || {
                id: item,
                name: "Saved grocery product",
                category: "Fresh Fruits & Vegetables",
                price: 0,
                mrp: 0,
                unit: "",
                image: "",
                quantity: 1
            };
        });
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(normalized));
        return normalized;

    } catch (error) {

        console.error(
            "Wishlist read error:",
            error
        );

        return [];
    }
}


function saveWishlist(wishlist) {

    try {

        localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(wishlist)
);

    } catch (error) {

        console.error(
            "Wishlist save error:",
            error
        );
    }
}


function isWishlisted(id) {

    const wishlist = getWishlist();

    return wishlist.some(
        item =>
            Number(item && typeof item === "object" ? item.id : item) === Number(id)
    );
}


/* =========================================================
   WISHLIST TOGGLE
   ========================================================= */

function toggleWishlist(id) {

    const product =
        fruitsVegetablesProducts.find(
            item =>
                Number(item.id) === Number(id)
        );

    if (!product) return;


    let wishlist = getWishlist();


    const index =
        wishlist.findIndex(
            item =>
                Number(item && typeof item === "object" ? item.id : item) === Number(id)
        );


    if (index !== -1) {

        wishlist.splice(index, 1);

        showToast(
            `${product.name} removed from wishlist`
        );

    } else {

        wishlist.push({

            id: product.id,

            name: product.name,

            category:
                product.category || "Fresh Fruits & Vegetables",

            price:
                Number(product.price) || 0,

            mrp:
                Number(product.mrp) || 0,

            unit:
                product.unit || "",

            image:
                product.image || "",

            rating:
                Number(product.rating) || 0,

            reviews:
                Number(product.reviews) || 0

        });


        showToast(
            `${product.name} added to wishlist ❤️`
        );
    }


    saveWishlist(wishlist);

    updateWishlistCount();

    renderProducts(currentProducts);
}


/* =========================================================
   PRICE FORMAT
   ========================================================= */

function formatPrice(price) {

    const number =
        Number(price) || 0;

    return "₹" +
        number.toFixed(
            Number.isInteger(number) ? 0 : 2
        );
}


/* =========================================================
   STAR RATING
   ========================================================= */

function generateStars(rating) {

    const rounded =
        Math.round(Number(rating) || 0);

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars +=
            i <= rounded
                ? "★"
                : "☆";
    }

    return stars;
}


/* =========================================================
   CATEGORY BAR
   ========================================================= */

function renderCategories() {

    const container =
        document.getElementById(
            "categoryContainer"
        );

    if (!container) {

        console.warn(
            "categoryContainer not found"
        );

        return;
    }


    container.innerHTML = "";


    fruitVegetableCategories.forEach(
        category => {

            const button =
                document.createElement("button");


            button.type = "button";


            button.className =
                "fv-category" +
                (
                    currentCategory === category.name
                        ? " active"
                        : ""
                );


            button.dataset.category =
                category.name;


            button.innerHTML = `

                <div class="fv-category-image">

                    <img
                        src="${category.image}"
                        alt="${category.name}"
                        loading="lazy"
                        onerror="
                            this.onerror=null;
                            this.style.display='none';
                        "
                    >

                </div>

                <span>
                    ${category.name}
                </span>

            `;


            container.appendChild(button);

        }
    );
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

    const wished =
        isWishlisted(product.id);


    const rating =
        Number(product.rating) || 4.5;


    const reviews =
        Number(product.reviews) || 0;


    const discount =
        Number(product.discount) || 0;


    return `

        <article
            class="product-card fv-product-card"
            data-id="${product.id}"
        >

            <div class="product-image-wrapper">

                ${
                    discount > 0
                        ? `
                            <span class="discount-badge">
                                ${discount}% OFF
                            </span>
                        `
                        : ""
                }


                <button
                    type="button"
                    class="wishlist-btn ${
                        wished ? "active" : ""
                    }"
                    data-action="wishlist"
                    data-id="${product.id}"
                    aria-label="Wishlist"
                >

                    <i class="bi ${
                        wished
                            ? "bi-heart-fill"
                            : "bi-heart"
                    }"></i>

                </button>


                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                    onerror="
                        this.onerror=null;
                        this.src='https://via.placeholder.com/300x300?text=Product';
                    "
                >

            </div>


            <div class="product-content">

                <div class="product-category">

                    ${product.category || "Fresh"}

                </div>


                <h3 class="product-name">

                    ${product.name}

                </h3>


                <div class="product-unit">

                    ${product.unit || ""}

                </div>


                <div class="rating">

                    <span class="rating-stars">

                        ${generateStars(rating)}

                    </span>

                    <span class="rating-value">

                        ${rating}

                    </span>

                    <span class="rating-count">

                        (${reviews})

                    </span>

                </div>


                <div class="price-row">

                    <div>

                        <span class="price">

                            ${formatPrice(product.price)}

                        </span>


                        ${
                            product.mrp
                                ? `
                                    <span class="mrp">

                                        ${formatPrice(product.mrp)}

                                    </span>
                                `
                                : ""
                        }

                    </div>


                    <button
                        type="button"
                        class="add-cart-btn"
                        data-action="add"
                        data-id="${product.id}"
                    >

                        <i class="bi bi-cart-plus"></i>

                        ADD

                    </button>

                </div>

            </div>

        </article>

    `;
}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts(products) {

    const productsGrid =
        document.getElementById(
            "productsGrid"
        );


    if (!productsGrid) {

        console.error(
            "productsGrid element not found"
        );

        return;
    }


    if (
        !Array.isArray(products) ||
        products.length === 0
    ) {

        productsGrid.innerHTML = `

            <div class="empty-products">

                <i class="bi bi-basket"></i>

                <strong>
                    No products found
                </strong>

                <span>
                    Try another category or search.
                </span>

            </div>

        `;


        updateProductCount(0);

        return;
    }


    productsGrid.innerHTML =
        products
            .map(createProductCard)
            .join("");


    updateProductCount(
        products.length
    );
}


/* =========================================================
   PRODUCT COUNT
   ========================================================= */

function updateProductCount(count) {

    document
        .querySelectorAll(
            "[data-product-count], #productsCount"
        )
        .forEach(element => {

            element.textContent =
                `${count} products`;

        });
}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function filterCategory(category) {

    currentCategory =
        category || "All";


    if (currentCategory === "All") {

        currentProducts =
            [...fruitsVegetablesProducts];

    } else {

        currentProducts =
            fruitsVegetablesProducts.filter(
                product =>
                    product.category ===
                    currentCategory
            );
    }


    renderCategories();

    renderProducts(
        currentProducts
    );
}


/* =========================================================
   SEARCH
   ========================================================= */

function searchProducts(query) {

    const value =
        String(query || "")
            .trim()
            .toLowerCase();


    let products =
        [...fruitsVegetablesProducts];


    if (currentCategory !== "All") {

        products =
            products.filter(
                product =>
                    product.category ===
                    currentCategory
            );
    }


    if (value) {

        products =
            products.filter(
                product => {

                    const name =
                        String(
                            product.name || ""
                        ).toLowerCase();


                    const category =
                        String(
                            product.category || ""
                        ).toLowerCase();


                    return (
                        name.includes(value) ||
                        category.includes(value)
                    );

                }
            );
    }


    currentProducts =
        products;


    renderProducts(
        products
    );
}


/* =========================================================
   SORT PRODUCTS
   ========================================================= */

function sortProducts(value) {

    const products =
        [...currentProducts];


    switch (value) {

        case "price-low":

            products.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

            break;


        case "price-high":

            products.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

            break;


        case "discount":

            products.sort(
                (a, b) =>
                    Number(b.discount || 0) -
                    Number(a.discount || 0)
            );

            break;


        case "rating":

            products.sort(
                (a, b) =>
                    Number(b.rating || 0) -
                    Number(a.rating || 0)
            );

            break;


        case "name":

            products.sort(
                (a, b) =>
                    String(a.name).localeCompare(
                        String(b.name)
                    )
            );

            break;


        default:

            break;
    }


    currentProducts =
        products;


    renderProducts(
        products
    );
}


/* =========================================================
   GROCERY CART COUNT
   ========================================================= */

function updateGroceryCartCount() {

    const cart =
        getGroceryCart();


    const count =
        cart.reduce(
            (total, item) =>
                total +
                Number(item.quantity || 0),
            0
        );


    document
        .querySelectorAll(
            "#cartCount, [data-cart-count]"
        )
        .forEach(element => {

            element.textContent =
                count;


            element.style.display =
                count > 0
                    ? ""
                    : "none";

        });


    console.log(
        "Grocery Cart Count:",
        count
    );
}


/* =========================================================
   WISHLIST COUNT
   ========================================================= */

function updateWishlistCount() {

    const wishlist =
        getWishlist();


    const count =
        wishlist.length;


    document
        .querySelectorAll(
            "#wishlistCount, [data-wishlist-count]"
        )
        .forEach(element => {

            element.textContent =
                count;


            element.style.display =
                count > 0
                    ? ""
                    : "none";

        });
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "fvToast"
        );


    if (!toast) {

        toast =
            document.createElement("div");


        toast.id =
            "fvToast";


        toast.className =
            "fv-toast";


        document.body.appendChild(
            toast
        );
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.fvToastTimer
    );


    window.fvToastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );
}


/* =========================================================
   PRODUCT
   ========================================================= */

function openProduct(id) {

    const product =
        fruitsVegetablesProducts.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!product) return;


    console.log(
        "Product selected:",
        product
    );
}


/* =========================================================
   RESET
   ========================================================= */

function resetProducts() {

    currentCategory =
        "All";


    currentProducts =
        [...fruitsVegetablesProducts];


    const search =
        document.getElementById(
            "productSearch"
        );


    if (search) {

        search.value = "";

    }


    const sort =
        document.getElementById(
            "sortProducts"
        );


    if (sort) {

        sort.value = "default";

    }


    renderCategories();


    renderProducts(
        currentProducts
    );
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {


        /* CATEGORY */

        const categoryButton =
            event.target.closest(
                ".fv-category"
            );


        if (categoryButton) {

            filterCategory(
                categoryButton.dataset.category
            );

            return;
        }


        /* ADD TO GROCERY CART */

        const addButton =
            event.target.closest(
                '[data-action="add"]'
            );


        if (addButton) {

            event.preventDefault();

            event.stopPropagation();


            addToGroceryCart(
                addButton.dataset.id
            );


            return;
        }


        /* WISHLIST */

        const wishlistButton =
            event.target.closest(
                '[data-action="wishlist"]'
            );


        if (wishlistButton) {

            event.preventDefault();

            event.stopPropagation();


            toggleWishlist(
                wishlistButton.dataset.id
            );


            return;
        }


        /* PRODUCT CARD */

        const card =
            event.target.closest(
                ".fv-product-card"
            );


        if (card) {

            if (
                event.target.closest(
                    "button"
                )
            ) {

                return;
            }


            openProduct(
                card.dataset.id
            );
        }

    }
);


/* =========================================================
   SEARCH EVENTS
   ========================================================= */

document.addEventListener(
    "input",
    function(event) {

        if (
            event.target.id ===
            "productSearch"
        ) {

            searchProducts(
                event.target.value
            );
        }

    }
);


/* =========================================================
   SORT EVENTS
   ========================================================= */

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target.id ===
            "sortProducts"
        ) {

            sortProducts(
                event.target.value
            );
        }

    }
);


/* =========================================================
   CART / WISHLIST STORAGE EVENTS
   ========================================================= */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key ===
            GROCERY_CART_KEY
        ) {

            updateGroceryCartCount();
        }


        if (
            event.key ===
            WISHLIST_KEY
        ) {

            updateWishlistCount();

            renderProducts(
                currentProducts
            );
        }

    }
);


window.addEventListener(
    "groceryCartUpdated",
    function() {

        updateGroceryCartCount();

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeFruitsVegetables() {

    console.log(
        "LocalMart Fruits & Vegetables loaded"
    );


    console.log(
        "Products:",
        fruitsVegetablesProducts.length
    );


    console.log(
        "Grocery Cart:",
        getGroceryCart()
    );


    renderCategories();


    renderProducts(
        fruitsVegetablesProducts
    );


    updateGroceryCartCount();


    updateWishlistCount();

}


/* =========================================================
   DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeFruitsVegetables
    );

} else {

    initializeFruitsVegetables();

}


/* =========================================================
   GLOBAL ACCESS
   ========================================================= */

window.fruitsVegetablesProducts =
    fruitsVegetablesProducts;

window.fruitVegetableCategories =
    fruitVegetableCategories;

window.addToGroceryCart =
    addToGroceryCart;

window.addToCart =
    addToGroceryCart;

window.toggleWishlist =
    toggleWishlist;

window.filterCategory =
    filterCategory;

window.searchProducts =
    searchProducts;

window.sortProducts =
    sortProducts;

window.resetProducts =
    resetProducts;

window.getGroceryCart =
    getGroceryCart;

window.updateGroceryCartCount =
    updateGroceryCartCount;

window.updateWishlistCount =
    updateWishlistCount;
