"use strict";

/*
=========================================================
 LOCALMART — WOMEN'S FASHION
 Complete JavaScript for fashion-women.html

 Matched HTML IDs:
 - fashionWomenSearch
 - fashionWomenCategories
 - fashionWomenProducts
 - productCount
 - sortProducts
 - emptyProducts
 - emptyClearFilters
 - clearFilters
 - navbarWishlistCount
 - navbarCartCount

 Features:
 - 36 Women's Fashion products
 - Myntra product image URLs
 - Category navigation
 - Search
 - Category filters
 - Brand filters
 - Price filters
 - Discount filters
 - Color filters
 - Sorting
 - Wishlist
 - Cart
 - Quantity controls
 - Quick view
 - Toast messages
 - Responsive-safe event handling
=========================================================
*/


/* =========================================================
   STORAGE KEYS
========================================================= */

const WOMEN_CART_KEY = "localmartWomenFashionCart";
const WOMEN_WISHLIST_KEY = "localmartWomenFashionWishlist";


/* =========================================================
   36 WOMEN'S PRODUCTS
========================================================= */

const womenProducts = [

    {
        id: "women-001",
        brand: "all about you",
        name: "Pink & Red Ombre Pure Chiffon Saree",
        category: ["Sarees", "Fusion Sarees"],
        price: 899,
        mrp: 2499,
        rating: 4.4,
        reviews: 128,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/25473154/2023/10/13/ea29d1b0-091c-402c-9fe5-2e87e28e77a61697213153459allaboutyouPinkRedOmbrePureChiffonSaree1.jpg",
        description: "Elegant pink and red ombre chiffon saree for stylish occasions."
    },

    {
        id: "women-002",
        brand: "KALINI",
        name: "Women Printed Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 749,
        mrp: 1999,
        rating: 4.3,
        reviews: 96,
        color: "Blue",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/MAY/5/CkwEldZo_37f5c65e218b41f6b358b4876d2cc3d2.jpg",
        description: "Beautiful printed saree with an elegant traditional look."
    },

    {
        id: "women-003",
        brand: "Sangria",
        name: "Women Ethnic Printed Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 999,
        mrp: 2799,
        rating: 4.2,
        reviews: 84,
        color: "Red",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/27568520/2024/2/14/21092a53-8b26-4395-96bf-7bed76865bd31707855992933Sarees1.jpg",
        description: "Classic ethnic printed saree designed for everyday elegance."
    },

    {
        id: "women-004",
        brand: "KALINI",
        name: "Women Dola Silk Bandhani Print Saree",
        category: ["Sarees", "Party Wear", "Printed Sarees"],
        price: 1199,
        mrp: 2999,
        rating: 4.5,
        reviews: 142,
        color: "Green",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/34337987/2025/6/2/554d9758-8cea-4dc0-982c-adc3aa5f4c071748863775302-Kalini-Women-Dola-Silk-Bandhani-Print-Zari-border-Saree-6917-1.jpg",
        description: "Dola silk Bandhani print saree with zari border."
    },

    {
        id: "women-005",
        brand: "Anouk",
        name: "Women Floral Printed Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 899,
        mrp: 2499,
        rating: 4.1,
        reviews: 71,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/SEPTEMBER/10/0a09f1720f9a40e2b84e0ff15481f3d1.jpg",
        description: "Contemporary floral saree for modern festive styling."
    },

    {
        id: "women-006",
        brand: "Sangria",
        name: "Women Embellished Saree",
        category: ["Sarees", "Party Wear"],
        price: 1299,
        mrp: 3499,
        rating: 4.4,
        reviews: 103,
        color: "Blue",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/JUNE/25/nxfU89Qv_e2208245b7934dde90eb971d42809306.jpg",
        description: "Elegant embellished saree perfect for parties and celebrations."
    },

    {
        id: "women-007",
        brand: "KALINI",
        name: "Women Ethnic Motifs Printed Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 799,
        mrp: 2199,
        rating: 4.5,
        reviews: 118,
        color: "Green",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/32008867/2025/6/15/4b09090f-3704-4bf0-9837-59f6791ad6551749980540040-KALINI-Ethnic-Motifs-Printed-Saree-901749980539581-1.jpg",
        description: "Ethnic motifs printed saree with a graceful traditional finish."
    },

    {
        id: "women-008",
        brand: "Mitera",
        name: "Women Designer Saree",
        category: ["Sarees", "Party Wear"],
        price: 1099,
        mrp: 2999,
        rating: 4.3,
        reviews: 92,
        color: "Red",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/JANUARY/12/UPhig85Z_95a991a384af43dbb30b456fe78e786a.jpg",
        description: "Designer-inspired saree for festive and special occasions."
    },

    {
        id: "women-009",
        brand: "Anouk",
        name: "Women Contemporary Saree",
        category: ["Sarees", "Fusion Sarees"],
        price: 1399,
        mrp: 3999,
        rating: 4.2,
        reviews: 64,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/JULY/29/uN4q4usX_8c5e7f592f09486798d504aae9fd79de.jpg",
        description: "Modern contemporary saree designed for fashionable looks."
    },

    {
        id: "women-010",
        brand: "KALINI",
        name: "Kalamkari Art Silk Block Print Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 1199,
        mrp: 2999,
        rating: 4.6,
        reviews: 151,
        color: "Red",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/27214066/2024/1/29/25f22eaa-c9e8-422e-be02-2eddbe59332d1706510055234KALINIKalamkariArtSilkBlockPrintSaree1.jpg",
        description: "Traditional Kalamkari-inspired art silk saree."
    },

    {
        id: "women-011",
        brand: "Sangria",
        name: "Women Woven Design Saree",
        category: ["Sarees", "Party Wear"],
        price: 1499,
        mrp: 3999,
        rating: 4.4,
        reviews: 86,
        color: "Green",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/JULY/3/2THVHDGM_e7a280cc9cf04dedb56796bf7214343d.jpg",
        description: "Rich woven design saree for festive occasions."
    },

    {
        id: "women-012",
        brand: "Mitera",
        name: "Women Floral Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 899,
        mrp: 2499,
        rating: 4.2,
        reviews: 75,
        color: "Blue",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2024/AUGUST/21/d5Zsfqre_5442743fdf904583a6e1cb3f197ea458.jpg",
        description: "Floral saree with a lightweight and elegant appearance."
    },

    {
        id: "women-013",
        brand: "KALINI",
        name: "Women Printed Ethnic Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 699,
        mrp: 1999,
        rating: 4.3,
        reviews: 112,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/JULY/14/vMamXFQf_ea92241d8c304f54b3bdaf49d3fcc666.jpg",
        description: "Stylish printed ethnic saree for everyday and festive wear."
    },

    {
        id: "women-014",
        brand: "Mitera",
        name: "Black Satin Dyed Embellished Saree",
        category: ["Sarees", "Party Wear"],
        price: 1599,
        mrp: 4499,
        rating: 4.5,
        reviews: 134,
        color: "Black",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/24456494/2023/8/11/46043bb3-f056-4fb6-9331-d63e8d6b60481691755391006MiteraWomensBlackSatinDyedEmbellishedSaree1.jpg",
        description: "Black satin saree with an embellished finish."
    },

    {
        id: "women-015",
        brand: "Silk Land",
        name: "Yellow & Turquoise Blue Ethnic Motifs Saree",
        category: ["Sarees", "Fusion Sarees"],
        price: 1299,
        mrp: 3599,
        rating: 4.4,
        reviews: 98,
        color: "Blue",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/19281772/2023/6/28/e5c6142f-3aa3-48be-b389-69605ddfb23a1687949649193-Silk-Land-Yellow--Turquoise-Blue-Ethnic-Motifs-Zari-Art-Silk-12.jpg",
        description: "Beautiful silk saree featuring ethnic motifs and zari details."
    },

    {
        id: "women-016",
        brand: "Kasee",
        name: "Solid Embroidered Pure Silk Saree",
        category: ["Sarees", "Party Wear"],
        price: 1799,
        mrp: 4999,
        rating: 4.6,
        reviews: 109,
        color: "Green",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/30477068/2025/4/10/0b84e148-4872-4ab8-b407-4122f99fdb3b1744295215639-kasee-Solid-Embroidered-Pure-Silk-Saree-9711744295214978-1.jpg",
        description: "Pure silk saree with solid design and embroidery."
    },

    {
        id: "women-017",
        brand: "Anouk",
        name: "Women Party Wear Saree",
        category: ["Sarees", "Party Wear"],
        price: 1199,
        mrp: 2999,
        rating: 4.2,
        reviews: 83,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/SEPTEMBER/15/ca0917de184343988b199bc24b3e7414.jpg",
        description: "Elegant party wear saree for celebrations."
    },

    {
        id: "women-018",
        brand: "Silk Land",
        name: "Floral Ready-to-Wear Chanderi Saree",
        category: ["Sarees", "Fusion Sarees"],
        price: 1399,
        mrp: 3999,
        rating: 4.5,
        reviews: 124,
        color: "Blue",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/31345775/2024/12/14/e2f400f9-0654-4033-bdfc-86f487872c011734185510255-Silk-Land-Floral-Ready-to-Wear-Chanderi-Saree-76717341855095-1.jpg",
        description: "Floral ready-to-wear Chanderi saree with a premium finish."
    },

    {
        id: "women-019",
        brand: "KALINI",
        name: "Women Printed Chanderi Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 999,
        mrp: 2799,
        rating: 4.3,
        reviews: 88,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2024/DECEMBER/7/YkldkSAq_ccc91b07a8ea4c2ba85e993991c2e09a.jpg",
        description: "Printed Chanderi saree with a sophisticated ethnic look."
    },

    {
        id: "women-020",
        brand: "KALINI",
        name: "Woven Design Pure Georgette Saree",
        category: ["Sarees", "Party Wear"],
        price: 1299,
        mrp: 3499,
        rating: 4.5,
        reviews: 117,
        color: "Green",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/33945310/2025/5/19/b7009629-9ef1-4a46-adce-edaa8a14bcc41747662822203-KALINI-Woven-Design-Pure-Georgette-Saree-5321747662821726-1.jpg",
        description: "Pure georgette woven saree with an elegant drape."
    },

    {
        id: "women-021",
        brand: "Silk Land",
        name: "Kalamkari Printed Ready-to-Wear Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 1199,
        mrp: 2999,
        rating: 4.4,
        reviews: 103,
        color: "Red",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/31345764/2024/12/14/31934815-662f-4ab6-af33-36ca3ba464ce1734185480183-Silk-Land-Kalamkari-Printed-Ready-to-Wear-Chanderi-Saree-630-1.jpg",
        description: "Kalamkari printed ready-to-wear Chanderi saree."
    },

    {
        id: "women-022",
        brand: "Sangria",
        name: "Women Embroidered Saree",
        category: ["Sarees", "Party Wear"],
        price: 1499,
        mrp: 3999,
        rating: 4.3,
        reviews: 91,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/JUNE/28/byCWmGZg_467de74b24dc41e4b8bdde3c6e64fbce.jpg",
        description: "Elegant embroidered saree designed for celebrations."
    },

    {
        id: "women-023",
        brand: "KALINI",
        name: "Women Festive Printed Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 899,
        mrp: 2499,
        rating: 4.4,
        reviews: 76,
        color: "Green",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/SEPTEMBER/15/a8850d25688f45ff8a1b134a948dfec8.jpg",
        description: "Festive printed saree with a beautiful traditional appearance."
    },

    {
        id: "women-024",
        brand: "Mitera",
        name: "Women Designer Woven Saree",
        category: ["Sarees", "Party Wear"],
        price: 1599,
        mrp: 4499,
        rating: 4.5,
        reviews: 129,
        color: "Blue",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/JULY/17/TbltlKnL_b16d2f2d9cb0442ca7f7ea2ffca23cb9.jpg",
        description: "Designer woven saree with a premium festive appearance."
    },

    {
        id: "women-025",
        brand: "Sangria",
        name: "Women Printed Party Wear Saree",
        category: ["Sarees", "Party Wear", "Printed Sarees"],
        price: 1099,
        mrp: 2999,
        rating: 4.2,
        reviews: 82,
        color: "Red",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/JULY/18/G23CkCld_014e58c458484b5fb735017cde711ff1.jpg",
        description: "Printed party wear saree for stylish festive occasions."
    },

    {
        id: "women-026",
        brand: "Anouk",
        name: "Women Floral Designer Saree",
        category: ["Sarees", "Fusion Sarees", "Printed Sarees"],
        price: 999,
        mrp: 2799,
        rating: 4.3,
        reviews: 94,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/SEPTEMBER/2/ONQ7HZ9T_96e0204450e147db84187f5b0f9d453f.jpg",
        description: "Floral designer saree combining contemporary and traditional styling."
    },

    {
        id: "women-027",
        brand: "Silk Land",
        name: "Floral Zari Tissue Mysore Silk Saree",
        category: ["Sarees", "Party Wear"],
        price: 1899,
        mrp: 4999,
        rating: 4.7,
        reviews: 173,
        color: "Green",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/21574700/2023/1/30/b236eed3-b326-406b-920d-88c7f5cb491f1675069295566-Silk-Land-Floral-Zari-Tissue-Mysore-Silk-Saree-5161675069294-1.jpg",
        description: "Premium Mysore silk saree with floral zari tissue detailing."
    },

    {
        id: "women-028",
        brand: "KALINI",
        name: "Women Ethnic Motifs Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 849,
        mrp: 2299,
        rating: 4.4,
        reviews: 107,
        color: "Red",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/JULY/21/WaRxgSiN_e03a4226c0e247dea5e216debf93645d.jpg",
        description: "Elegant ethnic motifs saree for traditional styling."
    },

    {
        id: "women-029",
        brand: "Mitera",
        name: "Women Festive Saree",
        category: ["Sarees", "Party Wear"],
        price: 1399,
        mrp: 3999,
        rating: 4.5,
        reviews: 98,
        color: "Blue",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/SEPTEMBER/14/45f1468f718d42ccbcfab76e68e4d308.jpg",
        description: "Festive saree with a sophisticated designer finish."
    },

    {
        id: "women-030",
        brand: "Silk Land",
        name: "Floral Print Ready-To-Wear Chanderi Saree",
        category: ["Sarees", "Fusion Sarees", "Printed Sarees"],
        price: 1299,
        mrp: 3499,
        rating: 4.4,
        reviews: 114,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/31345727/2024/12/14/01fb5031-a43e-4e90-b39a-512fb7f40f4f1734185182821-Silk-Land-Women-Floral-Print-Ready-To-Wear-Chanderi-Saree-68-1.jpg",
        description: "Floral print ready-to-wear Chanderi saree."
    },

    {
        id: "women-031",
        brand: "Sangria",
        name: "Women Printed Designer Saree",
        category: ["Sarees", "Printed Sarees"],
        price: 899,
        mrp: 2499,
        rating: 4.2,
        reviews: 69,
        color: "Green",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/MAY/28/loMYjIuP_0163601c7e2047af9d1b2f92cadbd299.jpg",
        description: "Stylish printed saree suitable for modern ethnic outfits."
    },

    {
        id: "women-032",
        brand: "KALINI",
        name: "Women Ethnic Woven Saree",
        category: ["Sarees", "Fusion Sarees"],
        price: 999,
        mrp: 2799,
        rating: 4.3,
        reviews: 87,
        color: "Blue",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/AUGUST/17/35dc676e650a4b068c2797dd84041fbf.jpg",
        description: "Ethnic woven saree with a refined traditional look."
    },

    {
        id: "women-033",
        brand: "Silk Land",
        name: "Beige Pink Woven Design Zari Tussar Saree",
        category: ["Sarees", "Party Wear"],
        price: 1799,
        mrp: 4999,
        rating: 4.6,
        reviews: 145,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/17781762/2022/12/7/63cfc823-a7a7-436e-b9b7-048c5dbc4e311670411684346SilkLandBeigePinkWovenDesignZariJuteSilkTussarSaree1.jpg",
        description: "Premium beige and pink woven Tussar saree with zari work."
    },

    {
        id: "women-034",
        brand: "Anouk",
        name: "Women Traditional Designer Saree",
        category: ["Sarees", "Party Wear"],
        price: 1199,
        mrp: 3299,
        rating: 4.3,
        reviews: 78,
        color: "Red",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2024/DECEMBER/23/IK5Atx53_a6e605c5c2d44a4482d7f27ad1e7c174.jpg",
        description: "Traditional designer saree for festive styling."
    },

    {
        id: "women-035",
        brand: "KALINI",
        name: "Women Elegant Ethnic Saree",
        category: ["Sarees", "Fusion Sarees"],
        price: 899,
        mrp: 2499,
        rating: 4.4,
        reviews: 95,
        color: "Green",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/SEPTEMBER/14/38e947c81ca94f88801b8feed1745288.jpg",
        description: "Elegant ethnic saree with a contemporary finish."
    },

    {
        id: "women-036",
        brand: "Mitera",
        name: "Women Printed Festive Saree",
        category: ["Sarees", "Printed Sarees", "Party Wear"],
        price: 1099,
        mrp: 2999,
        rating: 4.5,
        reviews: 121,
        color: "Pink",
        image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2026/AUGUST/10/2oHcU0cp_82f41c4f346f4f499c505db9672983fa.jpg",
        description: "Printed festive saree designed for elegant occasions."
    }

];


/* =========================================================
   PAGE STATE
========================================================= */

let currentCategory = "all";
let currentSearch = "";
let currentSort = "popular";
let wishlistMode = false;

let cart = getStorage(WOMEN_CART_KEY);
let wishlist = getStorage(WOMEN_WISHLIST_KEY);

let quickProductId = null;
let toastTimer = null;


/* =========================================================
   STORAGE
========================================================= */

function getStorage(key) {

    try {

        const value = localStorage.getItem(key);

        if (!value) {
            return [];
        }

        const parsed = JSON.parse(value);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        console.warn("LocalMart storage read error:", error);

        return [];

    }

}


function saveStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.warn("LocalMart storage save error:", error);

    }

}


/* =========================================================
   DOM HELPERS
========================================================= */

function byId(id) {

    return document.getElementById(id);

}


function safeListener(element, event, handler) {

    if (element) {

        element.addEventListener(
            event,
            handler
        );

    }

}


function setText(id, value) {

    const element = byId(id);

    if (element) {

        element.textContent = value;

    }

}


/* =========================================================
   PRODUCT HELPERS
========================================================= */

function getDiscount(product) {

    if (
        !product ||
        !Number.isFinite(Number(product.mrp)) ||
        Number(product.mrp) <= 0
    ) {

        return 0;

    }

    return Math.round(
        ((Number(product.mrp) - Number(product.price)) /
            Number(product.mrp)) * 100
    );

}


function formatPrice(value) {

    return Number(value || 0).toLocaleString(
        "en-IN"
    );

}


function getProductById(id) {

    return womenProducts.find(
        product => String(product.id) === String(id)
    );

}


/* =========================================================
   CATEGORY DATA
========================================================= */

const womenCategories = [

    {
        value: "all",
        label: "All",
        icon: "bi-grid"
    },

    {
        value: "Sarees",
        label: "Sarees",
        icon: "bi-stars"
    },

    {
        value: "Fusion Sarees",
        label: "Fusion Sarees",
        icon: "bi-magic"
    },

    {
        value: "Party Wear",
        label: "Party Wear",
        icon: "bi-gem"
    },

    {
        value: "Printed Sarees",
        label: "Printed Sarees",
        icon: "bi-flower1"
    }

];


/* =========================================================
   RENDER CATEGORY BAR
========================================================= */

function renderCategories() {

    const container = byId(
        "fashionWomenCategories"
    );

    if (!container) {
        return;
    }

    container.innerHTML = womenCategories
        .map(category => {

            const active =
                category.value === currentCategory &&
                !wishlistMode
                    ? "active"
                    : "";

            return `
                <button
                    type="button"
                    class="women-category-pill category-pill ${active}"
                    data-category="${escapeHTML(category.value)}"
                >
                    <i class="bi ${escapeHTML(category.icon)}"></i>
                    <span>${escapeHTML(category.label)}</span>
                </button>
            `;

        })
        .join("");

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

    let products = [...womenProducts];


    /* -----------------------------------------------------
       WISHLIST MODE
    ----------------------------------------------------- */

    if (wishlistMode) {

        products = products.filter(
            product =>
                wishlist.includes(product.id)
        );

        return sortProductsList(products);

    }


    /* -----------------------------------------------------
       CATEGORY BAR
    ----------------------------------------------------- */

    if (
        currentCategory &&
        currentCategory !== "all"
    ) {

        products = products.filter(
            product =>
                Array.isArray(product.category) &&
                product.category.includes(
                    currentCategory
                )
        );

    }


    /* -----------------------------------------------------
       SEARCH
    ----------------------------------------------------- */

    const searchTerm =
        currentSearch
            .trim()
            .toLowerCase();

    if (searchTerm) {

        products = products.filter(product => {

            const searchableText = [

                product.brand,

                product.name,

                product.color,

                ...(product.category || []),

                product.description

            ]
                .join(" ")
                .toLowerCase();

            return searchableText.includes(
                searchTerm
            );

        });

    }


    /* -----------------------------------------------------
       CATEGORY CHECKBOXES
    ----------------------------------------------------- */

    const selectedCategories =
        Array.from(
            document.querySelectorAll(
                ".category-filter:checked"
            )
        ).map(
            input => input.value
        );

    if (selectedCategories.length) {

        products = products.filter(product =>

            selectedCategories.some(
                category =>
                    product.category.includes(category)
            )

        );

    }


    /* -----------------------------------------------------
       BRAND CHECKBOXES
    ----------------------------------------------------- */

    const selectedBrands =
        Array.from(
            document.querySelectorAll(
                ".brand-filter:checked"
            )
        ).map(
            input =>
                input.value.toLowerCase()
        );

    if (selectedBrands.length) {

        products = products.filter(product =>

            selectedBrands.includes(
                product.brand.toLowerCase()
            )

        );

    }


    /* -----------------------------------------------------
       PRICE CHECKBOXES
    ----------------------------------------------------- */

    const selectedPrices =
        Array.from(
            document.querySelectorAll(
                ".price-filter:checked"
            )
        ).map(
            input => input.value
        );

    if (selectedPrices.length) {

        products = products.filter(product => {

            return selectedPrices.some(range => {

                const [min, max] =
                    range.split("-").map(Number);

                const price =
                    Number(product.price);

                if (max === 5000) {

                    return price >= min &&
                           price <= max;

                }

                return price >= min &&
                       price < max;

            });

        });

    }


    /* -----------------------------------------------------
       DISCOUNT CHECKBOXES
    ----------------------------------------------------- */

    const selectedDiscounts =
        Array.from(
            document.querySelectorAll(
                ".discount-filter:checked"
            )
        ).map(
            input =>
                Number(input.value)
        );

    if (selectedDiscounts.length) {

        products = products.filter(product => {

            const discount =
                getDiscount(product);

            return selectedDiscounts.some(
                minimum =>
                    discount >= minimum
            );

        });

    }


    /* -----------------------------------------------------
       COLOR CHECKBOXES
    ----------------------------------------------------- */

    const selectedColors =
        Array.from(
            document.querySelectorAll(
                ".color-filter:checked"
            )
        ).map(
            input =>
                input.value.toLowerCase()
        );

    if (selectedColors.length) {

        products = products.filter(product =>

            selectedColors.includes(
                String(product.color).toLowerCase()
            )

        );

    }


    return sortProductsList(products);

}


/* =========================================================
   SORT
========================================================= */

function sortProductsList(products) {

    const sorted = [...products];

    switch (currentSort) {

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


        case "popular":

            sorted.sort(
                (a, b) =>
                    Number(b.reviews) -
                    Number(a.reviews)
            );

            break;


        case "recommended":

        default:

            sorted.sort(
                (a, b) => {

                    const scoreA =
                        Number(a.rating) * 100 +
                        Number(a.reviews);

                    const scoreB =
                        Number(b.rating) * 100 +
                        Number(b.reviews);

                    return scoreB - scoreA;

                }
            );

            break;

    }

    return sorted;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const grid = byId(
        "fashionWomenProducts"
    );

    if (!grid) {

        console.error(
            "LocalMart Women's Fashion: #fashionWomenProducts not found."
        );

        return;

    }

    const products =
        getFilteredProducts();


    /* -----------------------------------------------------
       PRODUCT COUNT
    ----------------------------------------------------- */

    setText(
        "productCount",
        `${products.length} items`
    );


    /* -----------------------------------------------------
       EMPTY STATE
    ----------------------------------------------------- */

    const emptyState =
        byId("emptyProducts");


    if (!products.length) {

        grid.innerHTML = "";

        if (emptyState) {

            emptyState.classList.remove(
                "d-none"
            );

        }

        return;

    }


    if (emptyState) {

        emptyState.classList.add(
            "d-none"
        );

    }


    /* -----------------------------------------------------
       RESULT TEXT
    ----------------------------------------------------- */

    const heading =
        document.querySelector(
            ".women-products-toolbar h2"
        );

    if (heading) {

        heading.textContent =
            wishlistMode
                ? "My Wishlist"
                : currentCategory === "all"
                    ? "Sarees for Women"
                    : `${currentCategory} for Women`;

    }


    /* -----------------------------------------------------
       RENDER CARDS
    ----------------------------------------------------- */

    grid.innerHTML = products
        .map(createProductCard)
        .join("");


    /* -----------------------------------------------------
       IMAGE ERROR FALLBACK
    ----------------------------------------------------- */

    grid.querySelectorAll(
        "img[data-product-image]"
    ).forEach(image => {

        image.addEventListener(
            "error",
            function () {

                this.style.display = "none";

                const wrapper =
                    this.closest(
                        ".women-product-image"
                    );

                if (wrapper) {

                    wrapper.classList.add(
                        "image-error"
                    );

                    const fallback =
                        wrapper.querySelector(
                            ".image-fallback"
                        );

                    if (fallback) {

                        fallback.style.display =
                            "flex";

                    }

                }

            },
            {
                once: true
            }
        );

    });

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const discount =
        getDiscount(product);

    const isWishlisted =
        wishlist.includes(product.id);


    return `

        <article
            class="women-product-card"
            data-product-id="${escapeHTML(product.id)}"
        >

            <div class="women-product-image">

                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                    data-product-image
                    referrerpolicy="no-referrer"
                >

                <div
                    class="image-fallback"
                    style="display:none;"
                >
                    <i class="bi bi-image"></i>
                </div>


                ${
                    discount > 0
                        ? `
                            <span class="product-discount">
                                ${discount}% OFF
                            </span>
                        `
                        : ""
                }


                <button
                    type="button"
                    class="product-wishlist-btn ${
                        isWishlisted
                            ? "active"
                            : ""
                    }"
                    data-action="wishlist"
                    data-product-id="${escapeHTML(product.id)}"
                    aria-label="${
                        isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }"
                >

                    <i class="bi ${
                        isWishlisted
                            ? "bi-heart-fill"
                            : "bi-heart"
                    }"></i>

                </button>


                <button
                    type="button"
                    class="quick-view-btn"
                    data-action="quick-view"
                    data-product-id="${escapeHTML(product.id)}"
                >

                    <i class="bi bi-eye"></i>

                    Quick View

                </button>

            </div>


            <div class="women-product-info">

                <div class="product-brand">
                    ${escapeHTML(product.brand)}
                </div>

                <h3 class="product-name">
                    ${escapeHTML(product.name)}
                </h3>


                <div class="product-rating">

                    <span class="rating-badge">

                        ${Number(product.rating).toFixed(1)}

                        <i class="bi bi-star-fill"></i>

                    </span>

                    <span class="review-count">
                        (${Number(product.reviews).toLocaleString("en-IN")})
                    </span>

                </div>


                <div class="product-price-row">

                    <span class="product-price">
                        ₹${formatPrice(product.price)}
                    </span>

                    <span class="product-mrp">
                        ₹${formatPrice(product.mrp)}
                    </span>

                    ${
                        discount > 0
                            ? `
                                <span class="product-offer">
                                    ${discount}% off
                                </span>
                            `
                            : ""
                    }

                </div>


                <div class="product-actions">

                    <button
                        type="button"
                        class="add-cart-btn"
                        data-action="add-cart"
                        data-product-id="${escapeHTML(product.id)}"
                    >

                        <i class="bi bi-bag-plus"></i>

                        Add to Cart

                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(productId) {

    const product =
        getProductById(productId);

    if (!product) {
        return;
    }


    const index =
        wishlist.indexOf(productId);


    if (index >= 0) {

        wishlist.splice(index, 1);

        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(productId);

        showToast(
            "Added to wishlist ❤️"
        );

    }


    saveStorage(
        WOMEN_WISHLIST_KEY,
        wishlist
    );
    if (window.localmartFashionSync) window.localmartFashionSync("wishlist_toggle", "women", product);


    updateCounts();


    renderProducts();

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

    const product =
        getProductById(productId);

    if (!product) {
        return;
    }


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

            mrp: Number(product.mrp),

            image: product.image,

            quantity: 1

        });

    }


    saveStorage(
        WOMEN_CART_KEY,
        cart
    );
    if (window.localmartFashionSync) window.localmartFashionSync("add", "women", product);


    updateCounts();

    renderCart();

    showToast(
        `${product.name} added to cart`
    );

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeCartItem(productId) {

    cart =
        cart.filter(
            item =>
                String(item.id) !==
                String(productId)
        );


    saveStorage(
        WOMEN_CART_KEY,
        cart
    );


    updateCounts();

    renderCart();

    showToast(
        "Product removed from cart"
    );

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            product =>
                String(product.id) ===
                String(productId)
        );

    if (!item) {
        return;
    }


    item.quantity =
        Number(item.quantity || 0) +
        Number(change);


    if (item.quantity <= 0) {

        removeCartItem(productId);

        return;

    }


    saveStorage(
        WOMEN_CART_KEY,
        cart
    );


    updateCounts();

    renderCart();

}


/* =========================================================
   CART QUANTITY
========================================================= */

function getCartQuantity() {

    return cart.reduce(
        (total, item) =>
            total +
            Number(item.quantity || 0),
        0
    );

}


/* =========================================================
   UPDATE NAVBAR COUNTS
========================================================= */

function updateCounts() {

    const cartQuantity =
        getCartQuantity();


    setText(
        "navbarCartCount",
        cartQuantity
    );


    setText(
        "navbarWishlistCount",
        wishlist.length
    );

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const cartItems =
        byId("cartItems");


    if (!cartItems) {
        return;
    }


    const cartEmpty =
        byId("cartEmpty");

    const cartFooter =
        byId("cartFooter");

    const cartTotal =
        byId("cartTotal");

    const drawerCartCount =
        byId("drawerCartCount");


    if (drawerCartCount) {

        drawerCartCount.textContent =
            getCartQuantity();

    }


    if (!cart.length) {

        cartItems.innerHTML = "";

        if (cartEmpty) {

            cartEmpty.style.display =
                "block";

        }

        if (cartFooter) {

            cartFooter.style.display =
                "none";

        }

        return;

    }


    if (cartEmpty) {

        cartEmpty.style.display =
            "none";

    }


    if (cartFooter) {

        cartFooter.style.display =
            "block";

    }


    cartItems.innerHTML =
        cart.map(item => `

            <div
                class="cart-item"
                data-cart-id="${escapeHTML(item.id)}"
            >

                <div class="cart-item-image">

                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}"
                        loading="lazy"
                        referrerpolicy="no-referrer"
                    >

                </div>


                <div class="cart-item-details">

                    <strong>
                        ${escapeHTML(item.brand || "")}
                    </strong>

                    <div class="cart-item-name">
                        ${escapeHTML(item.name)}
                    </div>

                    <div class="cart-item-price">
                        ₹${formatPrice(item.price)}
                    </div>


                    <div class="cart-quantity">

                        <button
                            type="button"
                            data-cart-action="decrease"
                            data-product-id="${escapeHTML(item.id)}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span>
                            ${Number(item.quantity)}
                        </span>

                        <button
                            type="button"
                            data-cart-action="increase"
                            data-product-id="${escapeHTML(item.id)}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    type="button"
                    class="cart-remove-btn"
                    data-cart-action="remove"
                    data-product-id="${escapeHTML(item.id)}"
                    aria-label="Remove product"
                >

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `).join("");


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(item.price) *
                Number(item.quantity || 0),
            0
        );


    if (cartTotal) {

        cartTotal.textContent =
            `₹${formatPrice(total)}`;

    }

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

    const drawer =
        byId("cartDrawer");

    const overlay =
        byId("cartOverlay");


    if (!drawer) {

        showToast(
            "Cart page is available from the navbar"
        );

        return;

    }


    drawer.classList.add(
        "open"
    );


    if (overlay) {

        overlay.classList.add(
            "show"
        );

    }


    document.body.style.overflow =
        "hidden";


    renderCart();

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const drawer =
        byId("cartDrawer");

    const overlay =
        byId("cartOverlay");


    if (drawer) {

        drawer.classList.remove(
            "open"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "show"
        );

    }


    document.body.style.overflow =
        "";

}


/* =========================================================
   QUICK VIEW
========================================================= */

function openQuickView(productId) {

    const product =
        getProductById(productId);

    if (!product) {
        return;
    }


    quickProductId =
        productId;


    const modalElement =
        byId("quickViewModal");


    /*
       If your HTML does not have a quick-view modal,
       simply show a toast instead of throwing an error.
    */

    if (!modalElement) {

        showToast(
            product.name
        );

        return;

    }


    const image =
        byId("quickViewImage");

    const brand =
        byId("quickViewBrand");

    const name =
        byId("quickViewName");

    const price =
        byId("quickViewPrice");

    const mrp =
        byId("quickViewMrp");

    const discount =
        byId("quickViewDiscount");

    const rating =
        byId("quickViewRating");

    const description =
        byId("quickViewDescription");


    if (image) {

        image.src =
            product.image;

        image.alt =
            product.name;

    }


    if (brand) {

        brand.textContent =
            product.brand;

    }


    if (name) {

        name.textContent =
            product.name;

    }


    if (price) {

        price.textContent =
            `₹${formatPrice(product.price)}`;

    }


    if (mrp) {

        mrp.textContent =
            `₹${formatPrice(product.mrp)}`;

    }


    if (discount) {

        discount.textContent =
            `${getDiscount(product)}% OFF`;

    }


    if (rating) {

        rating.innerHTML =
            `${Number(product.rating).toFixed(1)}
             <i class="bi bi-star-fill"></i>
             (${Number(product.reviews).toLocaleString("en-IN")})`;

    }


    if (description) {

        description.textContent =
            product.description;

    }


    if (
        window.bootstrap &&
        window.bootstrap.Modal
    ) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );

        modal.show();

    } else {

        modalElement.classList.add(
            "show"
        );

        modalElement.style.display =
            "block";

        modalElement.removeAttribute(
            "aria-hidden"
        );

    }

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        byId("womenToast");

    const toastMessage =
        byId("toastMessage");


    if (!toast || !toastMessage) {

        console.log(
            "LocalMart:",
            message
        );

        return;

    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearAllFilters() {

    document
        .querySelectorAll(
            ".category-filter, .brand-filter, .price-filter, .discount-filter, .color-filter"
        )
        .forEach(
            checkbox => {
                checkbox.checked = false;
            }
        );


    currentCategory =
        "all";

    wishlistMode =
        false;


    renderCategories();

    renderProducts();

}


/* =========================================================
   SEARCH
========================================================= */

function handleSearch(value) {

    currentSearch =
        String(value || "");

    wishlistMode =
        false;

    renderCategories();

    renderProducts();

}


/* =========================================================
   SHOW WISHLIST
========================================================= */

function showWishlist() {

    if (!wishlist.length) {

        showToast(
            "Your wishlist is empty"
        );

        return;

    }


    wishlistMode =
        true;


    renderCategories();

    renderProducts();

    showToast(
        `${wishlist.length} wishlist product${
            wishlist.length === 1
                ? ""
                : "s"
        }`
    );

}


/* =========================================================
   EVENT BINDING
========================================================= */

function bindEvents() {


    /* -----------------------------------------------------
       SEARCH
    ----------------------------------------------------- */

    const search =
        byId("fashionWomenSearch");

    safeListener(
        search,
        "input",
        event => {

            handleSearch(
                event.target.value
            );

        }
    );


    /* -----------------------------------------------------
       SORT
    ----------------------------------------------------- */

    const sort =
        byId("sortProducts");

    safeListener(
        sort,
        "change",
        event => {

            currentSort =
                event.target.value;

            renderProducts();

        }
    );


    /* -----------------------------------------------------
       CLEAR FILTERS
    ----------------------------------------------------- */

    const clearFilters =
        byId("clearFilters");

    safeListener(
        clearFilters,
        "click",
        clearAllFilters
    );


    const emptyClearFilters =
        byId("emptyClearFilters");

    safeListener(
        emptyClearFilters,
        "click",
        clearAllFilters
    );


    /* -----------------------------------------------------
       CHECKBOX FILTERS
    ----------------------------------------------------- */

    document
        .querySelectorAll(
            ".category-filter, .brand-filter, .price-filter, .discount-filter, .color-filter"
        )
        .forEach(
            checkbox => {

                safeListener(
                    checkbox,
                    "change",
                    () => {

                        wishlistMode =
                            false;

                        renderCategories();

                        renderProducts();

                    }
                );

            }
        );


    /* -----------------------------------------------------
       CATEGORY BAR
       Event delegation means it still works if categories
       are generated dynamically.
    ----------------------------------------------------- */

    document.addEventListener(
        "click",
        event => {

            const categoryButton =
                event.target.closest(
                    ".category-pill"
                );


            if (!categoryButton) {
                return;
            }


            const category =
                categoryButton.dataset.category;


            if (!category) {
                return;
            }


            currentCategory =
                category;

            wishlistMode =
                false;


            renderCategories();

            renderProducts();

        }
    );


    /* -----------------------------------------------------
       PRODUCT GRID
       Event delegation for dynamically generated cards.
    ----------------------------------------------------- */

    const productGrid =
        byId("fashionWomenProducts");


    safeListener(
        productGrid,
        "click",
        event => {

            const actionElement =
                event.target.closest(
                    "[data-action]"
                );


            if (!actionElement) {
                return;
            }


            const action =
                actionElement.dataset.action;

            const productId =
                actionElement.dataset.productId;


            if (!productId) {
                return;
            }


            if (action === "wishlist") {

                toggleWishlist(
                    productId
                );

            }


            if (action === "add-cart") {

                addToCart(
                    productId
                );

            }


            if (action === "quick-view") {

                openQuickView(
                    productId
                );

            }

        }
    );


    /* -----------------------------------------------------
       CART ITEMS
    ----------------------------------------------------- */

    const cartItems =
        byId("cartItems");


    safeListener(
        cartItems,
        "click",
        event => {

            const actionElement =
                event.target.closest(
                    "[data-cart-action]"
                );


            if (!actionElement) {
                return;
            }


            const action =
                actionElement.dataset.cartAction;

            const productId =
                actionElement.dataset.productId;


            if (!productId) {
                return;
            }


            if (action === "increase") {

                changeQuantity(
                    productId,
                    1
                );

            }


            if (action === "decrease") {

                changeQuantity(
                    productId,
                    -1
                );

            }


            if (action === "remove") {

                removeCartItem(
                    productId
                );

            }

        }
    );


    /* -----------------------------------------------------
       CART OPEN
    ----------------------------------------------------- */

    safeListener(
        byId("navbarCartLink"),
        "click",
        event => {

            /*
             Keep normal Django /cart/ navigation if there
             is no drawer on this page.
            */

            if (byId("cartDrawer")) {

                event.preventDefault();

                openCart();

            }

        }
    );


    /* -----------------------------------------------------
       CART CLOSE BUTTONS
    ----------------------------------------------------- */

    [
        "closeCart",
        "cartClose",
        "closeCartDrawer"
    ].forEach(id => {

        safeListener(
            byId(id),
            "click",
            closeCart
        );

    });


    safeListener(
        byId("cartOverlay"),
        "click",
        closeCart
    );


    /* -----------------------------------------------------
       ADD CART BUTTONS OUTSIDE PRODUCT GRID
    ----------------------------------------------------- */

    document.addEventListener(
        "click",
        event => {

            const addButton =
                event.target.closest(
                    "[data-add-cart]"
                );


            if (!addButton) {
                return;
            }


            const productId =
                addButton.dataset.addCart;


            if (productId) {

                addToCart(
                    productId
                );

            }

        }
    );


    /* -----------------------------------------------------
       WISHLIST NAV
    ----------------------------------------------------- */

    safeListener(
        byId("navbarWishlistLink"),
        "click",
        event => {

            /*
             If there is no wishlist drawer/page-specific
             implementation, show the wishlist on this page.
            */

            event.preventDefault();

            showWishlist();

        }
    );


    /* -----------------------------------------------------
       QUICK VIEW ADD TO CART
    ----------------------------------------------------- */

    safeListener(
        byId("quickCartBtn"),
        "click",
        () => {

            if (quickProductId) {

                addToCart(
                    quickProductId
                );

            }

        }
    );


    /* -----------------------------------------------------
       QUICK VIEW WISHLIST
    ----------------------------------------------------- */

    safeListener(
        byId("quickWishlistBtn"),
        "click",
        () => {

            if (quickProductId) {

                toggleWishlist(
                    quickProductId
                );

            }

        }
    );


    /* -----------------------------------------------------
       ESCAPE KEY
    ----------------------------------------------------- */

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

}


/* =========================================================
   INITIALIZE PAGE
========================================================= */

function initWomenFashionPage() {

    const productGrid =
        byId("fashionWomenProducts");


    /*
       This is the most important check.

       Your HTML uses #fashionWomenProducts.
       If this element exists, products will render.
    */

    if (!productGrid) {

        console.error(
            "LocalMart Women's Fashion: #fashionWomenProducts is missing from fashion-women.html."
        );

        return;

    }


    /* Set default sorting */

    const sort =
        byId("sortProducts");

    if (sort) {

        sort.value =
            currentSort;

    }


    /* Render categories */

    renderCategories();


    /* Bind events */

    bindEvents();


    /* Update navbar */

    updateCounts();


    /* Render cart if drawer exists */

    renderCart();


    /* Render 36 products */

    renderProducts();
    if (window.localmartFashionSync) {
        cart.forEach(item => window.localmartFashionSync("sync", "women", item, {quantity: Number(item.quantity || 1)}));
        wishlist.forEach(id => {
            const product = getProductById(id);
            if (product) window.localmartFashionSync("sync", "women", product, {wishlisted: true});
        });
    }


    console.log(
        `LocalMart Women's Fashion loaded: ${womenProducts.length} products`
    );

}


/* =========================================================
   DOM READY
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initWomenFashionPage,
        {
            once: true
        }
    );

} else {

    initWomenFashionPage();

}

