/* ============================================================
   LOCALMART
   PACKAGED FOOD
   ZEPTO STYLE PRODUCT PAGE

   CATEGORIES:
   1. Noodles & Vermicelli
   2. Pasta & Soups
============================================================ */

"use strict";

/* ============================================================
   STORAGE
============================================================ */

const PACKAGED_CART_KEY = "localmartPackagedFoodCart";
const PACKAGED_WISHLIST_KEY = "localmartPackagedFoodWishlist";

/* ============================================================
   ZEPTO CDN IMAGE BASE
============================================================ */

const ZEPTO_CDN =
    "https://cdn.zeptonow.com/production/ik-seo/";


/* ============================================================
   NOODLES & VERMICELLI PRODUCTS
============================================================ */

const noodlesVermicelliProducts = [

    {
        id: "nv-001",
        name: "Maggi Double Masala Instant Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (95 g)",
        price: 18,
        mrp: 20,
        discount: 2,
        rating: 4.6,
        reviews: "84.9k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/9dcec406-4995-42b6-a907-47752d3c67fb/Maggi-Double-Masala-Instant-Noodles.jpeg"
    },

    {
        id: "nv-002",
        name: "MAGGI 2-Minute Instant Noodles | Masala Noodles | Made With Quality Spices",
        category: "noodles-vermicelli",
        unit: "1 pack (280 g or 300 g)",
        price: 59,
        mrp: 60,
        discount: 1,
        rating: 4.7,
        reviews: "567.4k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/6a339fdb-f63b-4e52-a315-e33f48d9fc09/MAGGI-2-Minute-Instant-Noodles-Masala-Noodles-Made-With-Quality-Spices.jpeg"
    },

    {
        id: "nv-003",
        name: "Yippee Magic Masala Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (280 g)",
        price: 49,
        mrp: 60,
        discount: 11,
        rating: 4.7,
        reviews: "211.5k",
        brand: "Yippee",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/1ec47281-a690-492b-85ad-5049a8be3014/Yippee-Magic-Masala-Noodles.jpg"
    },

    {
        id: "nv-004",
        name: "Wai Wai Ready to Eat Noodles, Chicken Masala Pack | 6 in 1",
        category: "noodles-vermicelli",
        unit: "1 pack (420 g)",
        price: 89,
        mrp: 90,
        discount: 1,
        rating: 4.7,
        reviews: "41.3k",
        brand: "Wai Wai",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-800-800%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/0b64a24a-09d0-490d-85c9-7f98b81d7c55/Wai-Wai-Ready-to-Eat-Noodles-Chicken-Masala-Pack-6-in-1.png"
    },

    {
        id: "nv-005",
        name: "Samyang Hot Chicken Flavor Ramen Carbonara Non-Veg",
        category: "noodles-vermicelli",
        unit: "1 pack (130 g)",
        price: 150,
        mrp: 150,
        discount: 0,
        rating: 4.7,
        reviews: "22.0k",
        brand: "Samyang",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/cde17a28-ccc7-4f1c-95a7-2c4e01b78ff5/Samyang-Hot-Chicken-Flavor-Ramen-Carbonara-Non-Veg.jpeg"
    },

    {
        id: "nv-006",
        name: "MAGGI 2-Minute Instant Noodles | Masala Noodles | Made With Quality Spices",
        category: "noodles-vermicelli",
        unit: "1 pack (140 g or 150 g)",
        price: 30,
        mrp: 30,
        discount: 0,
        rating: 4.9,
        reviews: "330.6k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/303ea0bd-52f5-491d-a854-cb9db77157d0/MAGGI-2-Minute-Instant-Noodles-Masala-Noodles-Made-With-Quality-Spices.jpeg"
    },

    {
        id: "nv-007",
        name: "Indomie Mi Goreng Fried Noodle Flavour",
        category: "noodles-vermicelli",
        unit: "1 pack (80 g)",
        price: 23,
        mrp: 23,
        discount: 0,
        rating: 4.6,
        reviews: "5.2k",
        brand: "Indomie",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1080-1080%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/6eb49968-a10c-40ea-b9a2-a17680113f34/Indomie-Mi-Goreng-Fried-Noodle-Flavour.jpeg"
    },

    {
        id: "nv-008",
        name: "Nissin Geki - Spicy Veg Korean Ramen Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (80 g)",
        price: 53,
        mrp: 60,
        discount: 7,
        rating: 4.6,
        reviews: "32.7k",
        brand: "Nissin",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1181-1181%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/3f48fc2f-281e-4684-bba0-422ef8b800b5/Nissin-Geki-Spicy-Veg-Korean-Ramen-Noodles.jpeg"
    },

    {
        id: "nv-009",
        name: "Maggi Veg Atta Noodles Made with Only Atta flour",
        category: "noodles-vermicelli",
        unit: "1 pack (290 g)",
        price: 108,
        mrp: 116,
        discount: 8,
        rating: 4.7,
        reviews: "41.4k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/a93e2220-c880-4076-b648-bef09c202c2b/Maggi-Veg-Atta-Noodles-Made-with-Only-Atta-flour.jpg"
    },

    {
        id: "nv-010",
        name: "Maggi Veg Atta Noodles Made with Only Atta flour",
        category: "noodles-vermicelli",
        unit: "1 pack (72.5 g)",
        price: 29,
        mrp: 30,
        discount: 1,
        rating: 4.6,
        reviews: "46.9k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-88%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/b89454e8-eaab-4e5b-95c3-635f786ad53a/Maggi-Veg-Atta-Noodles-Made-with-Only-Atta-flour.jpg"
    },

    {
        id: "nv-011",
        name: "MAGGI 2-Minute Special Masala Instant Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (70 or 75 g)",
        price: 20,
        mrp: 20,
        discount: 0,
        rating: 4.7,
        reviews: "76.8k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/34ed3254-5d46-410e-b924-599cccbb1c8a/MAGGI-2-Minute-Special-Masala-Instant-Noodles.jpeg"
    },

    {
        id: "nv-012",
        name: "Nissin Cup Noodles Mazedaar Masala",
        category: "noodles-vermicelli",
        unit: "1 pack (70 g)",
        price: 53,
        mrp: 60,
        discount: 7,
        rating: 4.6,
        reviews: "29.5k",
        brand: "Nissin",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-4500-4500%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/b96cfbd3-1dce-414e-b5e6-d391c24d36f7/Nissin-Cup-Noodles-Mazedaar-Masala.jpeg"
    },

    {
        id: "nv-013",
        name: "Nissin Cup Noodles Veggi Manchow",
        category: "noodles-vermicelli",
        unit: "1 pc (70 g)",
        price: 53,
        mrp: 60,
        discount: 7,
        rating: 4.8,
        reviews: "19.3k",
        brand: "Nissin",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1322-1322%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/9fc0ec6d-1d4f-4588-ad65-92ff3740ec83/Nissin-Cup-Noodles-Veggi-Manchow.jpg"
    },

    {
        id: "nv-014",
        name: "Maggi Masala Cuppa Noodles",
        category: "noodles-vermicelli",
        unit: "70.5 g",
        price: 54,
        mrp: 55,
        discount: 1,
        rating: 4.5,
        reviews: "14.4k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-2000-2000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/8aaae427-4ea4-4c65-ae47-b3c6803456ea/Maggi-Masala-Cuppa-Noodles.jpeg"
    },

    {
        id: "nv-015",
        name: "Nissin Cup Noodles Spiced Chicken",
        category: "noodles-vermicelli",
        unit: "1 pack (70 g)",
        price: 53,
        mrp: 60,
        discount: 7,
        rating: 4.6,
        reviews: "22.0k",
        brand: "Nissin",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-4500-4500%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/57977f15-158d-4ac7-8e42-6acfe88d9ac5/Nissin-Cup-Noodles-Spiced-Chicken.jpeg"
    },

    {
        id: "nv-016",
        name: "Slurrp Farm Instant Millet Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (60 g)",
        price: 45,
        mrp: 45,
        discount: 0,
        rating: 4.4,
        reviews: "1.2k",
        brand: "Slurrp Farm",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1500-1500%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/768528a8-4c9c-483c-93be-b6281f59d85d/Slurrp-Farm-Instant-Millet-Noodles.jpeg"
    },

    {
        id: "nv-017",
        name: "Indomie Special Chicken Flavour",
        category: "noodles-vermicelli",
        unit: "1 pack (75 g)",
        price: 22,
        mrp: 23,
        discount: 1,
        rating: 4.7,
        reviews: "2.9k",
        brand: "Indomie",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1080-1080%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/44c483bd-c89f-4877-b4f8-c02fc246503a/Indomie-Special-Chicken-Flavour.jpeg"
    },

    {
        id: "nv-018",
        name: "Gimi Michi Korean Spicy Ramen Instant Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (100 g)",
        price: 45,
        mrp: 65,
        discount: 20,
        rating: 4.4,
        reviews: "3.1k",
        brand: "Gimi Michi",
        image: ""
    },

    {
        id: "nv-019",
        name: "Maggi Chicken Instant Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (71 or 76 g)",
        price: 20,
        mrp: 20,
        discount: 0,
        rating: 4.4,
        reviews: "14.0k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-88%2Car-2400-2400%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/7049e75a-07ca-4aa8-8edf-fc9578e27d3a/Maggi-Chicken-Instant-Noodles-Combo.jpg"
    },

    {
        id: "nv-020",
        name: "Korean Kab's Jackpot 2x Hot and Spicy Instant Noodles Non Veg",
        category: "noodles-vermicelli",
        unit: "1 pack (100 g)",
        price: 40,
        mrp: 50,
        discount: 10,
        rating: 4.6,
        reviews: "2.8k",
        brand: "Korean Kab's",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-2000-2000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/278f6fc9-edd2-491e-a5df-ac6f600a4167/Korean-Kab-s-Jackpot-2x-Hot-and-Spicy-Instant-Noodles-Non-Veg.jpeg"
    },

    {
        id: "nv-021",
        name: "MTR Vermicelli Payasam",
        category: "noodles-vermicelli",
        unit: "1 pack (180 g)",
        price: 90,
        mrp: 90,
        discount: 0,
        rating: 4.7,
        reviews: "3.0k",
        brand: "MTR",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1500-1500%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/fe6c1acb-3d45-40cb-9c1c-96b89ff099dc/MTR-Vermicelli-Payasam-Combo.jpg"
    },

    {
        id: "nv-022",
        name: "MAGGI 2-Minute Instant Noodles | Masala Noodles | Made With Quality Spices",
        category: "noodles-vermicelli",
        unit: "1 pack (560 g or 600 g)",
        price: 120,
        mrp: 120,
        discount: 0,
        rating: 4.6,
        reviews: "126.7k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/6a339fdb-f63b-4e52-a315-e33f48d9fc09/MAGGI-2-Minute-Instant-Noodles-Masala-Noodles-Made-With-Quality-Spices.jpeg"
    },

    {
        id: "nv-023",
        name: "Samyang Korean Buldak Cream Carbonara Hot Chicken Flavor Ramen Non-Veg",
        category: "noodles-vermicelli",
        unit: "1 pack (140 g)",
        price: 150,
        mrp: 150,
        discount: 0,
        rating: 5.0,
        reviews: "7.2k",
        brand: "Samyang",
        image:
            ZEPTO_CDN +
            "tr%3Aw-88%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/6acdb5ad-627c-4765-8dd4-0896b4a9edfc/Samyang-Korean-Buldak-Cream-Carbonara-Hot-Chicken-Flavor-Ramen-Non-Veg.png"
    },

    {
        id: "nv-024",
        name: "Nissin Cup Noodles Spiced Chicken",
        category: "noodles-vermicelli",
        unit: "1 pc (45 g)",
        price: 40,
        mrp: 40,
        discount: 0,
        rating: 4.4,
        reviews: "3.8k",
        brand: "Nissin",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-4500-4500%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/57977f15-158d-4ac7-8e42-6acfe88d9ac5/Nissin-Cup-Noodles-Spiced-Chicken.jpeg"
    },

    {
        id: "nv-025",
        name: "Wai Wai Ready to Eat Noodles | Veg | 6 in 1",
        category: "noodles-vermicelli",
        unit: "1 pack (390 g or 420 g)",
        price: 89,
        mrp: 90,
        discount: 1,
        rating: 4.7,
        reviews: "26.0k",
        brand: "Wai Wai",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1080-1079%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/539a23bd-7f83-4101-9fa3-55e6b98d26f6/Wai-Wai-Ready-To-Eat-Noodles.png"
    },

    {
        id: "nv-026",
        name: "Nissin Geki - Spicy Kimchi Korean Ramen Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (80 g)",
        price: 53,
        mrp: 60,
        discount: 7,
        rating: 4.6,
        reviews: "21.1k",
        brand: "Nissin",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/967b6a7b-2b22-42d7-8b50-d063df199fc3/Nissin-Geki-Spicy-Kimchi-Korean-Ramen-Noodles.jpeg"
    },

    {
        id: "nv-027",
        name: "MAGGI Spicy Cheesy Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (76 g)",
        price: 25,
        mrp: 25,
        discount: 0,
        rating: 4.9,
        reviews: "8.4k",
        brand: "Maggi",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/7722d412-946e-4edc-b593-7fdf4d414877/MAGGI-Spicy-Cheesy-Noodles-Instant-Noodles.jpg"
    },

    {
        id: "nv-028",
        name: "Top Ramen Masala Instant Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (240 g)",
        price: 49,
        mrp: 53,
        discount: 4,
        rating: 4.5,
        reviews: "23.3k",
        brand: "Top Ramen",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/5c0d2893-45e3-42b8-9efc-0fa5e0e9b162/Top-Ramen-Masala-Instant-Noodles.jpeg"
    },

    {
        id: "nv-029",
        name: "Yippee Magic Masala Noodles",
        category: "noodles-vermicelli",
        unit: "1 pack (70 g or 72.6 g)",
        price: 15,
        mrp: 15,
        discount: 0,
        rating: 4.6,
        reviews: "27.8k",
        brand: "Yippee",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1500-1500%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/5086062c-cb93-4bf1-9cc7-883c7b7f471c/Yippee-Magic-Masala-Noodles.png"
    },

    {
        id: "nv-030",
        name: "Samyang Carbonara Buldak Hot Chicken Flavor Ramen Cup Non-Veg",
        category: "noodles-vermicelli",
        unit: "1 pc (80 g)",
        price: 134,
        mrp: 135,
        discount: 1,
        rating: 4.5,
        reviews: "285",
        brand: "Samyang",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr\\:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/48067d56-9be4-4c99-bdb7-78f6aace220a/Samyang-Carbonara-Buldak-Hot-Chicken-Flavor-Ramen-Cup-Non-Veg.png"
    },

    {
        id: "nv-031",
        name: "KOKA Oriental Instant Noodles Chicken",
        category: "noodles-vermicelli",
        unit: "1 pack (85 g)",
        price: 54,
        mrp: 55,
        discount: 1,
        rating: 4.8,
        reviews: "148",
        brand: "KOKA",
        image:
            ZEPTO_CDN +
            "tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/e0487637-e1a6-458a-9662-026af838d741/KOKA-Oriental-Instant-Noodles-Chicken.jpeg"
    }

];


/* ============================================================
   PASTA & SOUPS PRODUCTS
============================================================ */

const pastaSoupsProducts = [

    {
        id: "ps-001",
        name: "Gustora Fusilli Pasta",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 92,
        mrp: 158,
        discount: 66,
        rating: 4.6,
        reviews: "325",
        brand: "Gustora",
        image: ""
    },

    {
        id: "ps-002",
        name: "Gustora Macroni Pasta",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 92,
        mrp: 158,
        discount: 66,
        rating: 4.7,
        reviews: "180",
        brand: "Gustora",
        image: ""
    },

    {
        id: "ps-003",
        name: "Pasta Zara Lasagne Pasta",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 270,
        mrp: 450,
        discount: 180,
        rating: 0,
        reviews: "0",
        brand: "Pasta Zara",
        image: ""
    },

    {
        id: "ps-004",
        name: "Barilla Pasta Penne Rigate Durum Wheat",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 229,
        mrp: 329,
        discount: 100,
        rating: 3.3,
        reviews: "23",
        brand: "Barilla",
        image: ""
    },

    {
        id: "ps-005",
        name: "Bragagnolo Spaghetti Pasta | Itlaian Wheat Bronze Cut Die Rough Surface",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 270,
        mrp: 450,
        discount: 180,
        rating: 0,
        reviews: "0",
        brand: "Bragagnolo",
        image: ""
    },

    {
        id: "ps-006",
        name: "Pasta Zara Authentic Italian Pasta | Spaghetti",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 152,
        mrp: 325,
        discount: 173,
        rating: 4.2,
        reviews: "28",
        brand: "Pasta Zara",
        image: ""
    },

    {
        id: "ps-007",
        name: "Bragagnolo Penne Pasta | Itlaian Wheat Bronze Cut Die Rough Surface",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 256,
        mrp: 450,
        discount: 194,
        rating: 0,
        reviews: "0",
        brand: "Bragagnolo",
        image: ""
    },

    {
        id: "ps-008",
        name: "Agnesi Penne Rigate Pasta N 19",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 239,
        mrp: 299,
        discount: 60,
        rating: 4.7,
        reviews: "26",
        brand: "Agnesi",
        image: ""
    },

    {
        id: "ps-009",
        name: "Bragagnolo Fusilli Pasta | Itlaian Wheat Bronze Cut Die Rough Surface",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 355,
        mrp: 450,
        discount: 95,
        rating: 0,
        reviews: "0",
        brand: "Bragagnolo",
        image: ""
    },

    {
        id: "ps-010",
        name: "Agnesi Spaghetti Pasta",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 247,
        mrp: 329,
        discount: 82,
        rating: 0,
        reviews: "0",
        brand: "Agnesi",
        image: ""
    },

    {
        id: "ps-011",
        name: "Gustora Farfalle Pasta",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 111,
        mrp: 177,
        discount: 66,
        rating: 4.3,
        reviews: "90",
        brand: "Gustora",
        image: ""
    },

    {
        id: "ps-012",
        name: "Keya Elbow Pasta | Durum Wheat | No Maida",
        category: "pasta-soups",
        unit: "1 pack (400 g)",
        price: 75,
        mrp: 140,
        discount: 65,
        rating: 4.7,
        reviews: "374",
        brand: "Keya",
        image: ""
    },

    {
        id: "ps-013",
        name: "Disano Fusilli Pasta | Pure Durum Wheat",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 78,
        mrp: 175,
        discount: 97,
        rating: 4.9,
        reviews: "34",
        brand: "Disano",
        image: ""
    },

    {
        id: "ps-014",
        name: "Pasta Zara Authentic Italian Pasta | Fusilli",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 221,
        mrp: 325,
        discount: 104,
        rating: 0,
        reviews: "0",
        brand: "Pasta Zara",
        image: ""
    },

    {
        id: "ps-015",
        name: "Pasta Zara Authentic Italian Pasta | Penne Rigate",
        category: "pasta-soups",
        unit: "1 pack (500 g)",
        price: 155,
        mrp: 325,
        discount: 170,
        rating: 0,
        reviews: "0",
        brand: "Pasta Zara",
        image: ""
    },

    {
        id: "ps-016",
        name: "Keya Fusilli Pasta|Durum Wheat|No Maida",
        category: "pasta-soups",
        unit: "1 pack (400 g)",
        price: 75,
        mrp: 140,
        discount: 65,
        rating: 4.6,
        reviews: "497",
        brand: "Keya",
        image: ""
    },

    {
        id: "ps-017",
        name: "Oleev Kitchen Multigrain Pasta Penne",
        category: "pasta-soups",
        unit: "1 pack (400 g)",
        price: 108,
        mrp: 199,
        discount: 91,
        rating: 4.6,
        reviews: "86",
        brand: "Oleev Kitchen",
        image: ""
    },

    {
        id: "ps-018",
        name: "MTR Instant Macaroni Elbow",
        category: "pasta-soups",
        unit: "850 g",
        price: 114,
        mrp: 127,
        discount: 13,
        rating: 0,
        reviews: "0",
        brand: "MTR",
        image: ""
    }

];


/* ============================================================
   COMBINE ALL PACKAGED FOOD PRODUCTS
============================================================ */

const allPackagedFoodProducts = [
    ...noodlesVermicelliProducts,
    ...pastaSoupsProducts
];


/* ============================================================
   UNIQUE PRODUCTS
============================================================ */

const uniquePackagedFoodProducts = [
    ...new Map(
        allPackagedFoodProducts.map(product => [
            product.id,
            product
        ])
    ).values()
];


/* ============================================================
   GLOBAL PRODUCTS
============================================================ */

window.noodlesVermicelliProducts =
    noodlesVermicelliProducts;

window.pastaSoupsProducts =
    pastaSoupsProducts;

window.packagedFoodProducts =
    uniquePackagedFoodProducts;


/* ============================================================
   DOM
============================================================ */

const productsGrid =
    document.getElementById("productsGrid") ||
    document.getElementById("productGrid");

const emptyProducts =
    document.getElementById("emptyProducts");

const packagedSearch =
    document.getElementById("packagedSearch");

const productCount =
    document.getElementById("productCount");

const sortProducts =
    document.getElementById("sortProducts");

const categoryContainer =
    document.getElementById("packagedFoodCategories") ||
    document.getElementById("categoryContainer");

const categoryPrev =
    document.getElementById("categoryPrev");

const categoryNext =
    document.getElementById("categoryNext");

const cartBtn =
    document.getElementById("cartBtn");

const cartCount =
    document.getElementById("cartCount");

const wishlistBtn =
    document.getElementById("wishlistBtn");

const wishlistCount =
    document.getElementById("wishlistCount");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartContent =
    document.getElementById("cartContent");

const cartEmpty =
    document.getElementById("cartEmpty");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const lmToast =
    document.getElementById("lmToast");


/* ============================================================
   STATE
============================================================ */

let currentCategory =
    "noodles-vermicelli";

let currentSearch = "";

let currentSort =
    "default";


/* ============================================================
   SAFE JSON
============================================================ */

function safeJSONParse(value, fallback) {

    try {

        const parsed =
            JSON.parse(value);

        return parsed ?? fallback;

    } catch (error) {

        return fallback;

    }
}


/* ============================================================
   CART
============================================================ */

function getCart() {

    return safeJSONParse(
        localStorage.getItem(
            PACKAGED_CART_KEY
        ),
        []
    );
}


function saveCart(cart) {

    localStorage.setItem(
        PACKAGED_CART_KEY,
        JSON.stringify(cart)
    );

    updateCartUI();
}


/* ============================================================
   WISHLIST
============================================================ */

function getWishlist() {

    return safeJSONParse(
        localStorage.getItem(
            PACKAGED_WISHLIST_KEY
        ),
        []
    );
}


function saveWishlist(wishlist) {

    localStorage.setItem(
        PACKAGED_WISHLIST_KEY,
        JSON.stringify(wishlist)
    );

    updateWishlistUI();
}


/* ============================================================
   ESCAPE HTML
============================================================ */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ============================================================
   PRODUCT LOOKUP
============================================================ */

function getProductById(id) {

    return uniquePackagedFoodProducts.find(
        product =>
            product.id === id
    );
}


/* ============================================================
   IMAGE ERROR
============================================================ */

function handleProductImageError(img) {

    if (!img) return;

    const productName =
        img.dataset.productName ||
        "Product image";

    console.error(
        "Zepto CDN image failed:",
        img.src
    );

    img.onerror = null;

    img.style.display = "none";

    const wrapper =
        img.closest(
            ".product-image-wrapper"
        );

    if (wrapper) {

        wrapper.classList.add(
            "image-load-error"
        );

        if (
            !wrapper.querySelector(
                ".image-error-placeholder"
            )
        ) {

            wrapper.insertAdjacentHTML(
                "beforeend",
                `
                <div class="image-error-placeholder">
                    <i class="bi bi-image"></i>
                    <span>
                        ${escapeHTML(productName)}
                    </span>
                </div>
                `
            );
        }
    }
}


/* ============================================================
   DISCOUNT %
============================================================ */

function getDiscountPercentage(product) {

    if (
        !product ||
        !product.mrp ||
        product.mrp <= product.price
    ) {
        return 0;
    }

    return Math.round(
        (
            (product.mrp - product.price) /
            product.mrp
        ) * 100
    );
}


/* ============================================================
   FILTER PRODUCTS
============================================================ */

function getFilteredProducts() {

    let products =
        uniquePackagedFoodProducts.filter(
            product =>
                product.category ===
                currentCategory
        );

    if (currentSearch) {

        const search =
            currentSearch.toLowerCase();

        products =
            products.filter(product =>
                [
                    product.name,
                    product.brand,
                    product.unit
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(search)
            );
    }

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
                    getDiscountPercentage(b) -
                    getDiscountPercentage(a)
            );

            break;


        case "name":

            products.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

            break;


        default:

            break;
    }

    return products;
}


/* ============================================================
   PRODUCT CARD
============================================================ */

function createProductCard(product) {

    const cart =
        getCart();

    const cartItem =
        cart.find(
            item =>
                item.id === product.id
        );

    const quantity =
        cartItem
            ? Number(
                cartItem.quantity
            ) || 1
            : 0;


    const wishlist =
        getWishlist();

    const isWishlisted =
        wishlist.includes(
            product.id
        );


    const discount =
        getDiscountPercentage(
            product
        );


    const hasRating =
        Number(product.rating) > 0;


    const imageHTML =
        product.image
            ? `
                <img
                    class="product-image"
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    data-product-name="${escapeHTML(product.name)}"
                    loading="lazy"
                    onerror="handleProductImageError(this)"
                >
            `
            : `
                <div class="image-error-placeholder">
                    <i class="bi bi-image"></i>
                    <span>
                        ${escapeHTML(product.name)}
                    </span>
                </div>
            `;


    return `
        <article
            class="product-card"
            data-product-id="${escapeHTML(product.id)}"
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
                        isWishlisted
                            ? "active"
                            : ""
                    }"
                    onclick="toggleWishlist('${product.id}')"
                    aria-label="Wishlist"
                >
                    <i class="bi ${
                        isWishlisted
                            ? "bi-heart-fill"
                            : "bi-heart"
                    }"></i>
                </button>


                ${imageHTML}

            </div>


            <div class="product-info">

                <h3
                    class="product-name"
                    title="${escapeHTML(product.name)}"
                >
                    ${escapeHTML(product.name)}
                </h3>


                <div class="product-unit">
                    ${escapeHTML(product.unit)}
                </div>


                ${
                    hasRating
                        ? `
                            <div class="product-rating">

                                <span class="rating-box">
                                    <i class="bi bi-star-fill"></i>
                                    ${product.rating}
                                </span>

                                <span class="review-count">
                                    (${escapeHTML(product.reviews)})
                                </span>

                            </div>
                        `
                        : `
                            <div class="product-rating no-rating">
                                <span>
                                    No ratings yet
                                </span>
                            </div>
                        `
                }


                <div class="product-bottom">

                    <div class="price-area">

                        <span class="product-price">
                            ₹${product.price}
                        </span>

                        ${
                            product.mrp > product.price
                                ? `
                                    <span class="product-mrp">
                                        ₹${product.mrp}
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    ${
                        quantity > 0
                            ? `
                                <div class="qty-control">

                                    <button
                                        type="button"
                                        onclick="changeCartQuantity('${product.id}', -1)"
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>

                                    <span>
                                        ${quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onclick="changeCartQuantity('${product.id}', 1)"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>

                                </div>
                            `
                            : `
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

            </div>

        </article>
    `;
}


/* ============================================================
   RENDER PRODUCTS
============================================================ */

function renderProducts() {

    if (!productsGrid) {

        console.warn(
            "productsGrid/productGrid not found"
        );

        return;
    }


    const products =
        getFilteredProducts();


    productsGrid.innerHTML = "";


    if (productCount) {

        productCount.textContent =
            `${products.length} products`;
    }


    if (!products.length) {

        if (emptyProducts) {

            emptyProducts.style.display =
                "block";
        }

        return;
    }


    if (emptyProducts) {

        emptyProducts.style.display =
            "none";
    }


    productsGrid.innerHTML =
        products
            .map(createProductCard)
            .join("");
}


/* ============================================================
   ADD TO CART
============================================================ */

function addToCart(id) {

    const product =
        getProductById(id);

    if (!product) return;


    const cart =
        getCart();


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

            name: product.name,

            price: product.price,

            mrp: product.mrp,

            unit: product.unit,

            image: product.image,

            quantity: 1
        });
    }


    saveCart(cart);

    renderProducts();

    showToast(
        `${product.name} added to cart`
    );
}


/* ============================================================
   REMOVE FROM CART
============================================================ */

function removeFromCart(id) {

    let cart =
        getCart();


    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    saveCart(cart);

    renderProducts();

    renderCart();
}


/* ============================================================
   CHANGE CART QUANTITY
============================================================ */

function changeCartQuantity(
    id,
    change
) {

    const cart =
        getCart();


    const item =
        cart.find(
            product =>
                product.id === id
        );


    if (!item) return;


    item.quantity =
        Number(item.quantity) +
        change;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;
    }


    saveCart(cart);

    renderProducts();

    renderCart();
}


/* ============================================================
   SET CART QUANTITY
============================================================ */

function setCartQuantity(
    id,
    quantity
) {

    const cart =
        getCart();


    const item =
        cart.find(
            product =>
                product.id === id
        );


    if (!item) return;


    item.quantity =
        Math.max(
            1,
            Number(quantity) || 1
        );


    saveCart(cart);

    renderProducts();

    renderCart();
}


/* ============================================================
   CART COUNT
============================================================ */

function getCartItemCount() {

    return getCart().reduce(
        (total, item) =>
            total +
            Number(
                item.quantity || 0
            ),
        0
    );
}


/* ============================================================
   CART TOTAL
============================================================ */

function getCartTotal() {

    return getCart().reduce(
        (total, item) =>
            total +
            Number(
                item.price || 0
            ) *
            Number(
                item.quantity || 0
            ),
        0
    );
}


/* ============================================================
   UPDATE CART UI
============================================================ */

function updateCartUI() {

    const count =
        getCartItemCount();


    if (cartCount) {

        cartCount.textContent =
            count;

        cartCount.style.display =
            count > 0
                ? "flex"
                : "none";
    }


    if (cartTotal) {

        cartTotal.textContent =
            `₹${getCartTotal()}`;
    }
}


/* ============================================================
   RENDER CART
============================================================ */

function renderCart() {

    if (!cartContent) return;


    const cart =
        getCart();


    if (!cart.length) {

        cartContent.innerHTML = `
            <div class="cart-empty">

                <i class="bi bi-cart-x"></i>

                <p>
                    Your cart is empty
                </p>

            </div>
        `;


        if (cartEmpty) {

            cartEmpty.style.display =
                "block";
        }


        updateCartUI();

        return;
    }


    if (cartEmpty) {

        cartEmpty.style.display =
            "none";
    }


    cartContent.innerHTML =
        cart
            .map(item => {

                const subtotal =
                    Number(item.price) *
                    Number(item.quantity);


                return `
                    <div
                        class="cart-item"
                        data-id="${escapeHTML(item.id)}"
                    >

                        <div class="cart-item-image">

                            ${
                                item.image
                                    ? `
                                        <img
                                            src="${escapeHTML(item.image)}"
                                            alt="${escapeHTML(item.name)}"
                                            loading="lazy"
                                            onerror="this.style.display='none'"
                                        >
                                    `
                                    : `
                                        <div class="cart-no-image">
                                            <i class="bi bi-image"></i>
                                        </div>
                                    `
                            }

                        </div>


                        <div class="cart-item-details">

                            <h4>
                                ${escapeHTML(item.name)}
                            </h4>


                            <span>
                                ${escapeHTML(item.unit || "")}
                            </span>


                            <strong>
                                ₹${item.price}
                            </strong>


                            <div class="cart-qty">

                                <button
                                    type="button"
                                    onclick="changeCartQuantity('${item.id}', -1)"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    type="button"
                                    onclick="changeCartQuantity('${item.id}', 1)"
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <div class="cart-item-total">
                            ₹${subtotal}
                        </div>


                        <button
                            type="button"
                            class="cart-remove"
                            onclick="removeFromCart('${item.id}')"
                            aria-label="Remove item"
                        >
                            <i class="bi bi-trash"></i>
                        </button>

                    </div>
                `;
            })
            .join("");


    updateCartUI();
}


/* ============================================================
   OPEN CART
============================================================ */

function openCart() {

    renderCart();


    if (cartDrawer) {

        cartDrawer.classList.add(
            "open"
        );
    }


    if (cartOverlay) {

        cartOverlay.classList.add(
            "show"
        );
    }


    document.body.classList.add(
        "cart-open"
    );
}


/* ============================================================
   CLOSE CART
============================================================ */

function closeCartDrawer() {

    if (cartDrawer) {

        cartDrawer.classList.remove(
            "open"
        );
    }


    if (cartOverlay) {

        cartOverlay.classList.remove(
            "show"
        );
    }


    document.body.classList.remove(
        "cart-open"
    );
}


/* ============================================================
   WISHLIST
============================================================ */

function toggleWishlist(id) {

    const wishlist =
        getWishlist();


    const index =
        wishlist.indexOf(id);


    if (index === -1) {

        wishlist.push(id);

        showToast(
            "Added to wishlist ❤️"
        );

    } else {

        wishlist.splice(
            index,
            1
        );

        showToast(
            "Removed from wishlist"
        );
    }


    saveWishlist(wishlist);

    renderProducts();
}


/* ============================================================
   WISHLIST UI
============================================================ */

function updateWishlistUI() {

    if (!wishlistCount) return;


    const count =
        getWishlist().length;


    wishlistCount.textContent =
        count;


    wishlistCount.style.display =
        count > 0
            ? "flex"
            : "none";
}


/* ============================================================
   SHOW WISHLIST
============================================================ */

function showWishlist() {

    const wishlist =
        getWishlist();


    if (!wishlist.length) {

        showToast(
            "Your wishlist is empty"
        );

        return;
    }


    currentSearch = "";


    const products =
        uniquePackagedFoodProducts.filter(
            product =>
                wishlist.includes(
                    product.id
                )
        );


    if (!productsGrid) return;


    productsGrid.innerHTML =
        products
            .map(createProductCard)
            .join("");


    if (productCount) {

        productCount.textContent =
            `${products.length} wishlist products`;
    }
}


/* ============================================================
   SEARCH
============================================================ */

if (packagedSearch) {

    packagedSearch.addEventListener(
        "input",
        function () {

            currentSearch =
                this.value.trim();

            renderProducts();
        }
    );
}


/* ============================================================
   SORT
============================================================ */

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        function () {

            currentSort =
                this.value;

            renderProducts();
        }
    );
}


/* ============================================================
   CATEGORY
============================================================ */

function selectPackagedCategory(
    category
) {

    currentCategory =
        category;

    currentSearch = "";


    if (packagedSearch) {

        packagedSearch.value = "";
    }


    renderProducts();
}


window.selectPackagedCategory =
    selectPackagedCategory;


/* ============================================================
   CATEGORY BUTTONS
============================================================ */

if (categoryContainer) {

    categoryContainer.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-category]"
                );


            if (!button) return;


            const category =
                button.dataset.category;


            if (!category) return;


            selectPackagedCategory(
                category
            );
        }
    );
}


/* ============================================================
   CATEGORY SCROLL
============================================================ */

if (categoryPrev) {

    categoryPrev.addEventListener(
        "click",
        function () {

            if (categoryContainer) {

                categoryContainer.scrollBy({
                    left: -350,
                    behavior: "smooth"
                });
            }
        }
    );
}


if (categoryNext) {

    categoryNext.addEventListener(
        "click",
        function () {

            if (categoryContainer) {

                categoryContainer.scrollBy({
                    left: 350,
                    behavior: "smooth"
                });
            }
        }
    );
}


/* ============================================================
   CART BUTTON
============================================================ */

if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        openCart
    );
}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartDrawer
    );
}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartDrawer
    );
}


/* ============================================================
   ESC KEY → CLOSE CART
============================================================ */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCartDrawer();
        }
    }
);


/* ============================================================
   WISHLIST BUTTON
============================================================ */

if (wishlistBtn) {

    wishlistBtn.addEventListener(
        "click",
        showWishlist
    );
}


/* ============================================================
   CHECKOUT
============================================================ */

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            const cart =
                getCart();


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


/* ============================================================
   TOAST
============================================================ */

function showToast(message) {

    if (!lmToast) {

        console.log(message);

        return;
    }


    lmToast.textContent =
        message;


    lmToast.classList.add(
        "show"
    );


    clearTimeout(
        window.localMartToastTimer
    );


    window.localMartToastTimer =
        setTimeout(
            function () {

                lmToast.classList.remove(
                    "show"
                );

            },
            2200
        );
}


/* ============================================================
   GLOBAL FUNCTIONS
============================================================ */

window.addToCart =
    addToCart;

window.removeFromCart =
    removeFromCart;

window.changeCartQuantity =
    changeCartQuantity;

window.setCartQuantity =
    setCartQuantity;

window.toggleWishlist =
    toggleWishlist;

window.openCart =
    openCart;

window.closeCartDrawer =
    closeCartDrawer;

window.renderProducts =
    renderProducts;

window.renderCart =
    renderCart;

window.handleProductImageError =
    handleProductImageError;

window.showWishlist =
    showWishlist;


/* ============================================================
   INITIALIZE
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "LocalMart Packaged Food JS loaded"
        );

        console.log(
            "Total Products:",
            uniquePackagedFoodProducts.length
        );

        console.log(
            "Noodles & Vermicelli:",
            noodlesVermicelliProducts.length
        );

        console.log(
            "Pasta & Soups:",
            pastaSoupsProducts.length
        );

        console.log(
            "Current Category:",
            currentCategory
        );


        renderProducts();

        updateCartUI();

        updateWishlistUI();
    }
);

