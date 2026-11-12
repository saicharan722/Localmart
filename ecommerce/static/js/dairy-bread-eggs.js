/* =====================================================
   LOCALMART GROCERY STATE
===================================================== */

const GROCERY_CART_KEY = "localmartGroceryCart";
const GROCERY_WISHLIST_KEY = "localmartGroceryWishlist";

/* Compatibility */
const CART_KEY = GROCERY_CART_KEY;
const WISHLIST_KEY = GROCERY_WISHLIST_KEY;

/* IMPORTANT:
   Declare ONCE only.
*/
var cart = [];
var wishlist = [];


/* =========================================================
   LOCALMART
   DAIRY, BREAD & EGGS
========================================================= */
console.log("=== DAIRY JS LOADED ===");
(function () {

    "use strict";


    /* =====================================================
       STORAGE KEYS
    ===================================================== */

   


    /* =====================================================
       SUBCATEGORIES
    ===================================================== */

    const subcategories = [

        {
            id: "milk",
            name: "Milk",
            icon: "🥛",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-120-121,pr-true,f-auto,q-40/cms/sub_category/87.png"
        },

        {
            id: "breads-buns",
            name: "Breads & Buns",
            icon: "🍞",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-120-121,pr-true,f-auto,q-40/cms/sub_category/85.png"
        },

        {
            id: "fresh-bakery",
            name: "Fresh Bakery",
            icon: "🥐",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-2450-2450,pr-true,f-auto,q-40/cms/sub_category/fee22698-b755-4f69-af5f-f1d479cd8273.jpeg"
        },

        
        {
            id: "curd-probiotic",
            name: "Curd & Probiotic Drink",
            icon: "🥛",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-2940-2940,pr-true,f-auto,q-40/cms/sub_category/c01a48b0-d9d2-475d-9c59-ec6724c21c87.jpeg"
        },

        {
            id: "batters-mixes",
            name: "Batters & Mixes",
            icon: "🥣",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-120-121,pr-true,f-auto,q-40/cms/sub_category/86.png"
        },

        

        {
            id: "paneer-cream",
            name: "Paneer & Cream",
            icon: "🧀",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-120-121,pr-true,f-auto,q-40/cms/sub_category/82.png"
        },

        

        {
            id: "butter",
            name: "Butter",
            icon: "🧈",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-120-121,pr-true,f-auto,q-40/cms/sub_category/80.png"
        },

        {
            id: "cheese",
            name: "Cheese",
            icon: "🧀",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-120-121,pr-true,f-auto,q-40/cms/sub_category/81.png"
        },

        {
            id: "indian-breads",
            name: "Indian Breads",
            icon: "🫓",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-120-120,pr-true,f-auto,q-40/cms/sub_category/6bf860c3-6236-4873-90d3-9734aa399b16.png"
        },

        
        {
            id: "vegan-drinks",
            name: "Vegan Drinks",
            icon: "🌱",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-120-120,pr-true,f-auto,q-40/cms/sub_category/e577078b-9dba-4e2c-88a4-d8119d75b2d1.png"
        },

        {
            id: "milk-drinks",
            name: "Milk Drinks",
            icon: "🥤",
            image:
                "https://cdn.zeptonow.com/production/tr:w-90,ar-120-120,pr-true,f-auto,q-40/cms/sub_category/1583a2dc-e86c-4da1-ba83-ee577f4616ad.png"
        }

    ];


    /* =====================================================
       PRODUCT DATA
    ===================================================== */

    const dairyProducts = [

        {
            id: "dairy-001",
            name: "Nandini Toned Fresh Milk | Pouch",
            brand: "Nandini",
            unit: "500 ml",
            price: 24,
            mrp: 24,
            rating: 4.6,
            reviews: 85000,
            category: "Milk",
            type: "toned",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5d7be35e-9747-4630-836c-731984f41be6/Nandini-Toned-Fresh-Milk-Pouch.jpeg"
        },

        {
            id: "dairy-002",
            name: "Nandini Standardized Fresh Milk | Pouch",
            brand: "Nandini",
            unit: "1 L",
            price: 52,
            mrp: 52,
            rating: 4.6,
            reviews: 64000,
            category: "Milk",
            type: "standardized",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1344-1346,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c15d3868-a954-4d04-b4e7-8b78820053a9/Nandini-Standardized-Fresh-Milk-Pouch.png"
        },

        {
            id: "dairy-003",
            name: "Nandini Standardized Fresh Milk | Pouch",
            brand: "Nandini",
            unit: "500 ml",
            price: 27,
            mrp: 27,
            rating: 4.6,
            reviews: 52000,
            category: "Milk",
            type: "standardized",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-732-733,pr-true,f-auto,q-40,dpr-2/cms/product_variant/365b30e7-ec79-4f83-99d4-89377f6775c6/Nandini-Standardized-Fresh-Milk-Pouch.png"
        },

        {
            id: "dairy-004",
            name: "Heritage Toned Fresh Milk | Pouch",
            brand: "Heritage",
            unit: "500 ml",
            price: 27,
            mrp: 28,
            rating: 4.5,
            reviews: 47000,
            category: "Milk",
            type: "toned",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/58207565-7da6-44ce-bed6-860ecd56ba23/Heritage-Toned-Fresh-Milk-Pouch.jpeg"
        },

        {
            id: "dairy-005",
            name: "Nandini Toned Fresh Milk | Pouch",
            brand: "Nandini",
            unit: "1 L",
            price: 46,
            mrp: 48,
            rating: 4.6,
            reviews: 72000,
            category: "Milk",
            type: "toned",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2416-2416,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c777890c-d1ef-4b31-9a6c-226e6e3f2fca/Nandini-Toned-Fresh-Milk-Pouch.jpeg"
        },

        {
            id: "dairy-006",
            name: "Amul Gold Full Cream Fresh Milk | Pouch",
            brand: "Amul",
            unit: "500 ml",
            price: 34,
            mrp: 36,
            rating: 4.7,
            reviews: 1500000,
            category: "Milk",
            type: "fullcream",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1c44f728-7e7e-4f59-9248-5569a3b36672/Amul-Gold-Full-Cream-Fresh-Milk-Pouch.jpeg"
        },

        {
            id: "dairy-007",
            name: "Arokya Toned Fresh Milk | Pouch",
            brand: "Arokya",
            unit: "500 ml",
            price: 26,
            mrp: 27,
            rating: 4.5,
            reviews: 35000,
            category: "Milk",
            type: "toned",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c090fe1e-83c1-4f7b-a854-59f569975224/Arokya-Toned-Fresh-Milk-Pouch.jpeg"
        },

        {
            id: "dairy-008",
            name: "Nandini Goodlife Toned UHT Milk (Fino Pouch)",
            brand: "Nandini",
            unit: "500 ml",
            price: 32,
            mrp: 34,
            rating: 4.5,
            reviews: 28000,
            category: "Milk",
            type: "uht toned",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1350-1350,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ee03a2cd-f776-4bd0-a594-49faebe20c8b/Nandini-Goodlife-Toned-UHT-Milk-Fino-Pouch-.jpg"
        },

        {
            id: "dairy-009",
            name: "Akshayakalpa Amrutha - A2 Farm Organic Cow Fresh Milk | Pouch",
            brand: "Akshayakalpa",
            unit: "500 ml",
            price: 56,
            mrp: 60,
            rating: 4.7,
            reviews: 17000,
            category: "Milk",
            type: "organic a2",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/59f6e1e5-e501-43a7-8d2b-d5b2ec4d270d/Akshayakalpa-Amrutha-A2-Farm-Organic-Cow-Fresh-Milk-Pouch.jpg"
        },

        {
            id: "dairy-010",
            name: "Amul Taaza Toned Fresh Milk | Pouch",
            brand: "Amul",
            unit: "500 ml",
            price: 29,
            mrp: 30,
            rating: 4.6,
            reviews: 640000,
            category: "Milk",
            type: "toned",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2e8a0f88-1038-4fd3-8093-7085a49b473c/Amul-Taaza-Toned-Fresh-Milk-Pouch.jpeg"
        },

        {
            id: "dairy-011",
            name: "Heritage Full Cream Fresh Milk | Pouch",
            brand: "Heritage",
            unit: "475 ml / 500 ml",
            price: 37,
            mrp: 39,
            rating: 4.5,
            reviews: 31000,
            category: "Milk",
            type: "fullcream",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/928a91a3-c1e2-4a99-835b-037b72ad2d00/Heritage-Full-Cream-Fresh-Milk-Pouch.jpeg"
        },

        {
            id: "dairy-012",
            name: "Akshayakalpa Amrutha A2 Pasteurized Organic Fresh Milk | Pouch",
            brand: "Akshayakalpa",
            unit: "500 ml",
            price: 50,
            mrp: 55,
            rating: 4.7,
            reviews: 14000,
            category: "Milk",
            type: "organic a2",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2ebc8ab5-2df8-4e59-a11c-46f435e07e62/Akshayakalpa-Amrutha-A2-Pasteurized-Organic-Fresh-Milk-Pouch.jpg"
        },

        {
            id: "dairy-013",
            name: "Heritage Special Long Life Toned Milk",
            brand: "Heritage",
            unit: "450 ml",
            price: 33,
            mrp: 34,
            rating: 4.4,
            reviews: 19000,
            category: "Milk",
            type: "toned long life",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/446d908b-8b03-47c7-878d-9c0b1986feee/Heritage-Special-Long-Life-Toned-Milk-Pouch-.jpeg"
        },

        {
            id: "dairy-014",
            name: "Akshayakalpa Organic Pasteurized Cow Fresh Milk | Pouch",
            brand: "Akshayakalpa",
            unit: "500 ml",
            price: 48,
            mrp: 52,
            rating: 4.7,
            reviews: 12000,
            category: "Milk",
            type: "organic",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7f064ecf-ec6d-4ceb-8203-85a7204343e1/Akshayakalpa-Organic-Pasteurized-Cow-Fresh-Milk-Pouch.jpg"
        },

        {
            id: "dairy-015",
            name: "Godrej Jersey Full Cream Milk",
            brand: "Godrej Jersey",
            unit: "490 ml / 500 ml",
            price: 35,
            mrp: 38,
            rating: 4.5,
            reviews: 22000,
            category: "Milk",
            type: "fullcream",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4500-4500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2cde8a41-aab0-4b45-8be3-d3b469c0490f/Godrej-Jersey-Full-Cream-Milk.jpeg"
        },

        {
            id: "dairy-016",
            name: "Arokya Standardized Fresh Milk | Pouch",
            brand: "Arokya",
            unit: "500 ml",
            price: 32,
            mrp: 34,
            rating: 4.5,
            reviews: 18000,
            category: "Milk",
            type: "standardized",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e9ebfed2-9058-4eaa-950b-1c24c4e85bf5/Arokya-Standardized-Fresh-Milk-Pouch.jpeg"
        },

        {
            id: "dairy-017",
            name: "Nandini Goodlife Milk UHT (Pouch Brik)",
            brand: "Nandini",
            unit: "500 ml",
            price: 36,
            mrp: 38,
            rating: 4.5,
            reviews: 16000,
            category: "Milk",
            type: "uht",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/82e9dc66-09b6-44d7-852d-87e62a6f18b0/Nandini-Goodlife-Milk-UHT-Pouch-Brik-.jpeg"
        },

        {
            id: "dairy-018",
            name: "Akshayakalpa Organic Farm Fresh Milk | Pouch",
            brand: "Akshayakalpa",
            unit: "500 ml",
            price: 50,
            mrp: 54,
            rating: 4.6,
            reviews: 13000,
            category: "Milk",
            type: "organic",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/80b42a82-f3e6-4741-8339-139137d14a4f/Akshayakalpa-Organic-Farm-Fresh-Milk-Pouch.jpg"
        },

        {
            id: "dairy-019",
            name: "Nandini Samrudhi Pasteurised Full Cream Fresh Milk | Pouch",
            brand: "Nandini",
            unit: "500 ml",
            price: 28,
            mrp: 30,
            rating: 4.6,
            reviews: 42000,
            category: "Milk",
            type: "fullcream",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b049056a-f21e-4a0c-a294-7c0126bdb5c2/Nandini-Samrudhi-Pasteurised-Full-Cream-Fresh-Milk-Pouch.jpg"
        },

        {
            id: "dairy-020",
            name: "Country Delight Cow Fresh Milk | Pouch",
            brand: "Country Delight",
            unit: "450 ml",
            price: 46,
            mrp: 48,
            rating: 4.6,
            reviews: 38000,
            category: "Milk",
            type: "cow",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e7f38d06-117c-469b-ab0a-a67cdabf6ac5/Country-Delight-Cow-Fresh-Milk-Pouch.jpeg"
        },

        {
            id: "dairy-021",
            name: "Nandini Goodlife Toned Milk UHT (Tetra Pack Brick)",
            brand: "Nandini",
            unit: "1 L",
            price: 70,
            mrp: 75,
            rating: 4.5,
            reviews: 17000,
            category: "Milk",
            type: "uht toned",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-645-631,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5fa30726-7a84-4821-8910-bbd9cc7f413a/Nandini-Goodlife-Toned-Milk-UHT-Tetra-Pack-Brick-.png"
        },

        {
            id: "dairy-022",
            name: "Nandini Goodlife Slim Skimmed Milk UHT",
            brand: "Nandini",
            unit: "500 ml",
            price: 37,
            mrp: 40,
            rating: 4.5,
            reviews: 15000,
            category: "Milk",
            type: "skimmed uht",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6962ed05-02b8-47d3-84b5-923096ece102/Nandini-Goodlife-Slim-Skimmed-Milk-UHT-Tetra-Pack-.jpeg"
        },

        {
            id: "dairy-023",
            name: "Sid's Farm Tested Cow Milk",
            brand: "Sid's Farm",
            unit: "500 ml",
            price: 44,
            mrp: 46,
            rating: 4.7,
            reviews: 11000,
            category: "Milk",
            type: "cow premium",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5401-5401,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fc00f08e-8956-493d-8454-728c18b2d7ea/Sid-s-Farm-Tested-Cow-Milk-No-Antibiotics-No-Hormones-No-Preservatives-.jpg"
        },

        {
            id: "dairy-024",
            name: "Godrej Jersey Toned Milk - 14g Protein",
            brand: "Godrej Jersey",
            unit: "490 ml / 500 ml",
            price: 26,
            mrp: 27,
            rating: 4.5,
            reviews: 9000,
            category: "Milk",
            type: "toned protein",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2628e100-b459-40bf-a041-c17d2410ef6e/Godrej-Jersey-Toned-Milk-14g-Protein.png"
        },

        {
            id: "dairy-025",
            name: "Amul Taaza Homogenised Toned Milk",
            brand: "Amul",
            unit: "1 L",
            price: 77,
            mrp: 80,
            rating: 4.6,
            reviews: 450000,
            category: "Milk",
            type: "toned tetra",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6aa4c577-ebeb-4647-bb58-dcb9b07541ac/Amul-Taaza-Homogenised-Toned-Milk-Tetra-Pack-.jpeg"
        },

        {
            id: "dairy-026",
            name: "Sid's Farm Tested Toned Milk",
            brand: "Sid's Farm",
            unit: "500 ml",
            price: 36,
            mrp: 38,
            rating: 4.7,
            reviews: 8500,
            category: "Milk",
            type: "toned premium",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5401-5401,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5c45a95b-1fd6-44ab-8137-c40dcafb4a08/Sid-s-Farm-Tested-Toned-Milk-No-Antibiotics-No-Hormones-No-Preservatives-.jpg"
        },

        {
            id: "dairy-027",
            name: "Sid's Farm Tested Skim Milk",
            brand: "Sid's Farm",
            unit: "500 ml",
            price: 32,
            mrp: 34,
            rating: 4.6,
            reviews: 7000,
            category: "Milk",
            type: "skimmed premium",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5401-5401,pr-true,f-auto,q-40,dpr-2/cms/product_variant/acd2138b-471e-4ffb-8453-c120cbfbe2d2/Sid-s-Farm-Tested-Skim-Milk-No-Antibiotics-No-Hormones-No-Preservatives-.jpg"
        },

        {
            id: "dairy-028",
            name: "Heritage Nourish+ Fresh Milk | 18g Protein",
            brand: "Heritage",
            unit: "500 ml",
            price: 28,
            mrp: 30,
            rating: 4.5,
            reviews: 6000,
            category: "Milk",
            type: "protein",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/933e23dd-cfde-4ed3-87dd-ca3cc6d1cbad/Heritage-Nourish-Fresh-Milk-18g-Protein-Pouch.jpeg"
        },

        {
            id: "dairy-029",
            name: "Amul Gold Homogenised Standardised Milk",
            brand: "Amul",
            unit: "1 L",
            price: 83,
            mrp: 86,
            rating: 4.7,
            reviews: 320000,
            category: "Milk",
            type: "fullcream tetra",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dbeabd64-f310-49c8-9032-e25fc098ea86/Amul-Gold-Homogenised-Standardised-Milk-Tetra-Pack-.jpeg"
        },

        {
            id: "dairy-030",
            name: "Amul Slim Trim Skimmed Milk",
            brand: "Amul",
            unit: "1 L",
            price: 85,
            mrp: 88,
            rating: 4.6,
            reviews: 210000,
            category: "Milk",
            type: "skimmed tetra",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7951a63f-8b0d-40c4-9a78-1c104b9ab404/Amul-Slim-Trim-Skimmed-Milk-Tetra-Pack-.jpeg"
        },

        {
            id: "dairy-031",
            name: "Amulya Dairy Whitener",
            brand: "Amul",
            unit: "500 g",
            price: 255,
            mrp: 270,
            rating: 4.6,
            reviews: 95000,
            category: "Milk",
            type: "dairy whitener",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4916e415-07ab-4ef5-b05d-eda73aff1461/Amulya-Dairy-Whitener-Pouch-.jpeg"
        },

        {
            id: "dairy-032",
            name: "Sid's Farm Tested A2 Buffalo Milk",
            brand: "Sid's Farm",
            unit: "500 ml",
            price: 63,
            mrp: 68,
            rating: 4.7,
            reviews: 5000,
            category: "Milk",
            type: "a2 buffalo",
            image:
                "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5401-5401,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ed2a312a-63c8-477d-9326-80daa64dba85/Sid-s-Farm-Tested-A2-Buffalo-Milk-No-Antibiotics-No-Hormones-No-Preservatives-.jpg"
        }

    ];



/* =====================================================
   BREADS & BUNS PRODUCTS
===================================================== */

const breadProducts = [

    {
        id: "bread-001",
        name: "Modern - Zero Maida Whole Wheat Bread",
        brand: "Modern",
        unit: "1 pack (400 g / 430 g)",
        price: 64,
        mrp: 65,
        rating: 4.6,
        reviews: 203000,
        category: "Breads & Buns",
        type: "whole wheat zero maida",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e2ae57bc-8f79-44c3-9421-a2c40c0110ae/Modern-Zero-Maida-Whole-Wheat-Bread.jpg"
    },

    {
        id: "bread-002",
        name: "The Health Factory Whole Wheat Bread | Zero Maida | Source of Protein & Fibre",
        brand: "The Health Factory",
        unit: "1 pack (350 g)",
        price: 63,
        mrp: 65,
        rating: 4.7,
        reviews: 114600,
        category: "Breads & Buns",
        type: "whole wheat zero maida protein fibre",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/12217d9a-cbdf-4479-b639-60a97582e5a7/The-Health-Factory-Whole-Wheat-Bread-Zero-Maida-Source-of-Protein-Fibre.jpg"
    },

    {
        id: "bread-003",
        name: "English Oven Milk Bread",
        brand: "English Oven",
        unit: "1 pack (400 g)",
        price: 60,
        mrp: 60,
        rating: 4.6,
        reviews: 44600,
        category: "Breads & Buns",
        type: "milk bread white",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fadb99d9-2998-4dde-90fc-e396e1360dac/English-Oven-Milk-Bread.jpg"
    },

    {
        id: "bread-004",
        name: "Modern Milk Plus Bread",
        brand: "Modern",
        unit: "1 pack (350 g)",
        price: 55,
        mrp: 55,
        rating: 4.6,
        reviews: 34300,
        category: "Breads & Buns",
        type: "milk bread",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/010a308f-36fc-49b3-b376-07dd30b92d49/Modern-Milk-Plus-Bread.jpeg"
    },

    {
        id: "bread-005",
        name: "Modern Sandwich Supreme White Bread",
        brand: "Modern",
        unit: "1 pack (400 g)",
        price: 60,
        mrp: 60,
        rating: 4.7,
        reviews: 132400,
        category: "Breads & Buns",
        type: "white sandwich bread",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e7cc4b4d-2371-4316-8b60-b66054215754/Modern-Sandwich-Supreme-White-Bread.jpeg"
    },

    {
        id: "bread-006",
        name: "English Oven Zero Maida Atta Bread | High Fibre",
        brand: "English Oven",
        unit: "1 pack (400 g)",
        price: 65,
        mrp: 65,
        rating: 4.6,
        reviews: 70300,
        category: "Breads & Buns",
        type: "atta whole wheat zero maida high fibre",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/597b5a2c-8a47-4587-b2b6-fc1f222cd919/English-Oven-Zero-Maida-Atta-Bread-High-Fibre.jpg"
    },

    {
        id: "bread-007",
        name: "Britannia Pure Whole Wheat Bread (No Maida)",
        brand: "Britannia",
        unit: "1 pack (400 g / 450 g)",
        price: 65,
        mrp: 65,
        rating: 4.6,
        reviews: 67900,
        category: "Breads & Buns",
        type: "whole wheat no maida",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fabea29f-a6e2-4824-b49a-47552a6c4f42/Britannia-Pure-Whole-Wheat-Bread-No-Maida-.png"
    },

    {
        id: "bread-008",
        name: "English Oven Premium White Bread | No Palm Oil",
        brand: "English Oven",
        unit: "1 pack (350 g)",
        price: 49,
        mrp: 50,
        rating: 4.8,
        reviews: 191500,
        category: "Breads & Buns",
        type: "white bread no palm oil",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2250-2250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/292484af-5b66-436e-80c6-2d9c93c9b823/English-Oven-Premium-White-bread-No-Palm-Oil.jpg"
    },

    {
        id: "bread-009",
        name: "The Health Factory Whole Wheat Bread | Zero Maida | Source of Protein & Fibre",
        brand: "The Health Factory",
        unit: "1 pack (250 g)",
        price: 55,
        mrp: 55,
        rating: 4.4,
        reviews: 42500,
        category: "Breads & Buns",
        type: "whole wheat zero maida protein fibre",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ca3c098d-7a2b-4453-8513-464d0442cee1/The-Health-Factory-Whole-Wheat-Bread-Zero-Maida-Source-of-Protein-Fibre.jpg"
    },

    {
        id: "bread-010",
        name: "Britannia Milk Slice White Bread",
        brand: "Britannia",
        unit: "1 pack (400 g)",
        price: 60,
        mrp: 60,
        rating: 4.4,
        reviews: 29500,
        category: "Breads & Buns",
        type: "milk white bread",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b026242a-fe5e-4c16-aa2d-b3dd06f10d9a/Britannia-Milk-Slice-White-Bread.jpeg"
    },

    {
        id: "bread-011",
        name: "Iyengars Bakery Special Bread",
        brand: "Iyengars Bakery",
        unit: "1 pack (400 g)",
        price: 72,
        mrp: 72,
        rating: 4.4,
        reviews: 1400,
        category: "Breads & Buns",
        type: "bakery bread",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/02567280-a862-4b71-9c4b-c8d55d26c157/Iyengars-Bakery-Special-Bread.jpeg"
    },

    {
        id: "bread-012",
        name: "Theobroma Zero Maida Whole Wheat Bread | No Preservatives | No Palm Oil",
        brand: "Theobroma",
        unit: "1 pack (350 g)",
        price: 61,
        mrp: 70,
        rating: 4.3,
        reviews: 5100,
        category: "Breads & Buns",
        type: "whole wheat zero maida no preservatives no palm oil",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5000-5000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/be1b20c0-c788-4235-b995-f686bdb2f661/Theobroma-Zero-Maida-Whole-Wheat-Bread-No-Preservatives-No-Palm-Oil.jpg"
    },

    {
        id: "bread-013",
        name: "Britannia Multigrain Bread (No Maida)",
        brand: "Britannia",
        unit: "1 pack (400 g)",
        price: 63,
        mrp: 70,
        rating: 4.3,
        reviews: 6500,
        category: "Breads & Buns",
        type: "multigrain no maida",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/92242837-a473-47c9-a3a6-51e55a059a1d/Britannia-Multigrain-Bread-No-Maida-.jpeg"
    },

    {
        id: "bread-014",
        name: "Britannia Vitarich Sandwich Premium White Bread",
        brand: "Britannia",
        unit: "1 pack (400 g)",
        price: 60,
        mrp: 60,
        rating: 4.6,
        reviews: 26900,
        category: "Breads & Buns",
        type: "premium white sandwich bread",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/54ddb77b-8b7d-48f5-acf8-97b352e4e845/Britannia-Vitarich-Sandwich-Premium-White-Bread.jpeg"
    },

    {
        id: "bread-015",
        name: "Modern Baker's Loaf: High Protein Bread",
        brand: "Modern",
        unit: "1 pack (350 g)",
        price: 86,
        mrp: 95,
        rating: 4.9,
        reviews: 2000,
        category: "Breads & Buns",
        type: "high protein bread",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d36c3262-0690-4854-a3cf-9c7f4d98c484/Modern-Baker-s-Loaf-High-Protein-Bread.jpg"
    },

    {
        id: "bread-016",
        name: "Britannia Breads Bombay Pav",
        brand: "Britannia",
        unit: "1 pack (250 g)",
        price: 45,
        mrp: 45,
        rating: 4.2,
        reviews: 6900,
        category: "Breads & Buns",
        type: "pav bread",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d27a3504-ea44-4ecc-9d4e-e2594688be9d/Britannia-Breads-Bombay-Pav.jpeg"
    },

    {
        id: "bread-017",
        name: "Modern Multigrain Bread - 13 Grains & Seeds (Zero Maida)",
        brand: "Modern",
        unit: "1 pack (400 g)",
        price: 70,
        mrp: 70,
        rating: 4.6,
        reviews: 32500,
        category: "Breads & Buns",
        type: "multigrain grains seeds zero maida",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c9c102e5-467a-4eb4-9612-e96c947f99c1/Modern-Multigrain-Bread-13-Grains-Seeds-Zero-Maida-.jpeg"
    },

    {
        id: "bread-018",
        name: "Britannia Pav",
        brand: "Britannia",
        unit: "1 pack (200 g)",
        price: 38,
        mrp: 40,
        rating: 4.6,
        reviews: 24300,
        category: "Breads & Buns",
        type: "pav bun",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8435a5b0-7d46-4304-ab81-67916ff38810/Britannia-Pav.jpeg"
    },

    {
        id: "bread-019",
        name: "Protein Chef Double Protein Bread (64g Protein), Multigrain Bread",
        brand: "Protein Chef",
        unit: "1 pack (270 g)",
        price: 99,
        mrp: 99,
        rating: 4.2,
        reviews: 9400,
        category: "Breads & Buns",
        type: "double protein multigrain",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2001-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d6fd0701-61ac-40d5-948f-97d62e4df1c3/Protein-Chef-Double-Protein-Bread-64g-Protein-Multigrain-Bread.jpeg"
    },

    {
        id: "bread-020",
        name: "Protein Chef 42 G Protein Multigrain Bread | 5 Superfoods | No Maida",
        brand: "Protein Chef",
        unit: "1 pack (270 g)",
        price: 69,
        mrp: 75,
        rating: 4.3,
        reviews: 18600,
        category: "Breads & Buns",
        type: "protein multigrain superfoods no maida",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2001-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e8a3afe5-f5a8-4edc-8a91-5745a6e44c31/Protein-Chef-42-G-Protein-Multigrain-Bread-5-Superfoods-No-Maida.jpeg"
    },

    {
        id: "bread-021",
        name: "Modern Butter Crust Milk Bread",
        brand: "Modern",
        unit: "1 pack (350 g)",
        price: 72,
        mrp: 90,
        rating: 4.8,
        reviews: 102,
        category: "Breads & Buns",
        type: "butter crust milk bread",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bbc7f0ea-c94f-457a-aad6-0beb9d85e3d7/Modern-Butter-Crust-Milk-Bread.jpeg"
    },

    {
        id: "bread-022",
        name: "The Health Factory Milk Bread | Zero Maida | Source of Calcium & Fibre | Whole Wheat Bread",
        brand: "The Health Factory",
        unit: "1 pack (250 g)",
        price: 60,
        mrp: 65,
        rating: 4.3,
        reviews: 24000,
        category: "Breads & Buns",
        type: "milk bread zero maida calcium fibre whole wheat",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fb912786-b9b4-4c30-a796-682e9dc56ca8/The-Health-Factory-Milk-Bread-Zero-Maida-Source-of-Calcium-Fibre-Whole-Wheat-Bread.jpg"
    },

    {
        id: "bread-023",
        name: "Britannia Sweet Bun",
        brand: "Britannia",
        unit: "1 pack (250 g)",
        price: 35,
        mrp: 35,
        rating: 4.6,
        reviews: 7900,
        category: "Breads & Buns",
        type: "sweet bun",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2b3289ef-c5ee-40bc-b571-84c2e5e7a5ea/Britannia-Sweet-Bun.jpeg"
    },

    {
        id: "bread-024",
        name: "Naturbaked Zero Maida Whole Wheat Bread | No Added Preservatives | Clean Label",
        brand: "Naturbaked",
        unit: "1 pack (300 g)",
        price: 56,
        mrp: 60,
        rating: 4.4,
        reviews: 5700,
        category: "Breads & Buns",
        type: "zero maida whole wheat clean label no preservatives",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f6e706c5-9277-406c-944a-fee8c82bb3de/Naturbaked-Zero-Maida-Whole-Wheat-Bread-No-Added-Preservatives-Clean-Label.jpg"
    },

    {
        id: "bread-025",
        name: "English Oven Burger Bun",
        brand: "English Oven",
        unit: "1 pack (200 g)",
        price: 40,
        mrp: 40,
        rating: 4.3,
        reviews: 34200,
        category: "Breads & Buns",
        type: "burger bun",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0ab77d44-033e-492e-921e-5cd4e6baae4f/English-Oven-Burger-Bun.jpeg"
    },

    {
        id: "bread-026",
        name: "The Health Factory Bombay Pav | Zero Maida | Whole Wheat Pav",
        brand: "The Health Factory",
        unit: "1 pack (4 pcs)",
        price: 40,
        mrp: 40,
        rating: 4.3,
        reviews: 27300,
        category: "Breads & Buns",
        type: "bombay pav zero maida whole wheat",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e28d5d02-0eee-496f-9391-424792352b6b/The-Health-Factory-Bombay-Pav-Zero-Maida-Whole-Wheat-Pav.jpg"
    },

    {
        id: "bread-027",
        name: "The Health Factory Classic Sourdough | Zero Maida | No Added Sugar | No Added Yeast",
        brand: "The Health Factory",
        unit: "1 pack (330 g)",
        price: 105,
        mrp: 120,
        rating: 3.7,
        reviews: 2300,
        category: "Breads & Buns",
        type: "sourdough zero maida no sugar no yeast",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b08b5a6e-f09f-47b0-9691-ead9f848f07f/The-Health-Factory-Classic-Sourdough-Zero-Maida-No-Added-Sugar-No-Added-Yeast.jpg"
    },

    {
        id: "bread-028",
        name: "The Health Factory Milk Bread | Zero Maida | Source of Calcium & Fibre | Whole Wheat Bread",
        brand: "The Health Factory",
        unit: "1 pack (350 g)",
        price: 80,
        mrp: 89,
        rating: 4.3,
        reviews: 53,
        category: "Breads & Buns",
        type: "milk bread zero maida calcium fibre whole wheat",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cac24ca6-9103-47d6-b29d-46ec11c5b295/The-Health-Factory-Milk-Bread-Zero-Maida-Source-of-Calcium-Fibre-Whole-Wheat-Bread.jpg"
    },

    {
        id: "bread-029",
        name: "The Baker's Dozen Zero Maida Ragi Bread | Atta Bread (Not Brown) | Sandwich Bread | Healthy Bread",
        brand: "The Baker's Dozen",
        unit: "1 pack (240 g)",
        price: 60,
        mrp: 60,
        rating: 4.8,
        reviews: 2500,
        category: "Breads & Buns",
        type: "ragi atta healthy zero maida sandwich",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6792d37e-38f4-482b-897f-1e43994548e0/The-Baker-s-Dozen-Zero-Maida-Ragi-Bread-Atta-Bread-Not-Brown-Sandwich-Bread-Healthy-Bread.jpg"
    },

    {
        id: "bread-030",
        name: "Baker's Loaf Zero Preservatives Multigrain Bread",
        brand: "Baker's Loaf",
        unit: "1 pack (350 g)",
        price: 81,
        mrp: 90,
        rating: 4.6,
        reviews: 1500,
        category: "Breads & Buns",
        type: "multigrain zero preservatives",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/90bef253-23b4-48be-9215-4f131cbef7fc/Baker-s-Loaf-Zero-Preservatives-Multigrain-Bread.jpeg"
    },

    {
        id: "bread-031",
        name: "The Baker's Dozen Fourgrain Sourdough Bread | High Protein | Whole Wheat | Clean Label | Artisan",
        brand: "The Baker's Dozen",
        unit: "1 pack (380 g)",
        price: 209,
        mrp: 235,
        rating: 4.1,
        reviews: 968,
        category: "Breads & Buns",
        type: "fourgrain sourdough high protein whole wheat artisan",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e8662f86-5384-41e0-b52e-401e50b8739b/The-Baker-s-Dozen-Fourgrain-Sourdough-Bread-High-Protein-Whole-Wheat-Clean-Label-Artisan.jpg"
    },

    {
        id: "bread-032",
        name: "The Baker's Dozen Zero Maida Country Sourdough | Whole Wheat Bread | Artisan Loaf | Clean Label",
        brand: "The Baker's Dozen",
        unit: "1 pack (330 g)",
        price: 143,
        mrp: 159,
        rating: 4.1,
        reviews: 2600,
        category: "Breads & Buns",
        type: "country sourdough whole wheat zero maida artisan clean label",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ea4c96f4-6fc3-4b2a-b359-0400c86252cd/The-Baker-s-Dozen-Zero-Maida-Country-Sourdough-Whole-Wheat-Bread-Artisan-Loaf-Clean-Label.jpg"
    }


];



const bakeryProducts = [

    {
        id: "bakery-001",
        name: "Smoor Moist Banana Walnut Cake",
        brand: "Smoor",
        price: 90,
        mrp: 90,
        unit: "1 pack (90 g)",
        rating: 4.0,
        reviews: 613,
        category: "Fresh Bakery",
        type: "banana walnut cake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2085,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4ce438b1-cdd7-4965-8139-9f99cd716032/Smoor-Moist-Banana-Walnut-Cake.jpeg",
        pvid: "4bd18bdf-1d8b-4ff8-a3d3-6d4345f1ed33"
    },

    {
        id: "bakery-002",
        name: "The Health Factory Mini Cakes Berry Blast | Zero Maida | Tea Cake | Eggless",
        brand: "The Health Factory",
        price: 50,
        mrp: 70,
        unit: "1 pack (70 g)",
        rating: 4.3,
        reviews: 4700,
        category: "Fresh Bakery",
        type: "berry mini cake zero maida eggless",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0c22ad3a-e718-4da7-ae1f-a605b9c07200/The-Health-Factory-Mini-Cakes-Berry-Blast-Zero-Maida-Tea-Cake-Eggless.jpg",
        pvid: "dd8ea980-3220-4ea9-a856-7aad8e484688"
    },

    {
        id: "bakery-003",
        name: "The Health Factory Mini Cakes Rich Vanilla | Zero Maida | Tea Cake | Eggless",
        brand: "The Health Factory",
        price: 53,
        mrp: 60,
        unit: "1 pack (70 g)",
        rating: 4.1,
        reviews: 3200,
        category: "Fresh Bakery",
        type: "vanilla mini cake zero maida eggless",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/07f840ec-6d29-4d2e-9ca2-44c88bca77be/The-Health-Factory-Mini-Cakes-Rich-Vanilla-Zero-Maida-Tea-Cake-Eggless.jpg",
        pvid: "4d1817a7-f032-4e8c-8da6-fdc152248152"
    },

    {
        id: "bakery-004",
        name: "Cakezone Double Chocolate Brownie | Zero Palm Oil | Freshly Baked",
        brand: "Cakezone",
        price: 59,
        mrp: 79,
        unit: "1 pack (85 g)",
        rating: 4.5,
        reviews: 1600,
        category: "Fresh Bakery",
        type: "double chocolate brownie",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1350-1350,pr-true,f-auto,q-40,dpr-2/cms/product_variant/459cc0d7-2ba4-4959-8db4-1fe2cca6e7f4/Cakezone-Double-Chocolate-Brownie-Zero-Palm-Oil-Freshly-Baked.jpeg",
        pvid: "1cf6ec5d-ac8c-4a60-9d2e-944bbd1f69da"
    },

    {
        id: "bakery-005",
        name: "Theobroma Chocolate Chip Cookies | Soft Baked | No Palm Oil | No Preservatives",
        brand: "Theobroma",
        price: 210,
        mrp: 295,
        unit: "1 pack (140 g)",
        rating: 4.6,
        reviews: 249,
        category: "Fresh Bakery",
        type: "chocolate chip cookies soft baked",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8790048f-09bd-4cae-9615-f0f163a02441/Theobroma-Chocolate-Chip-Cookies-Soft-Baked-No-Palm-Oil-No-Preservatives.jpeg",
        pvid: "6f242d3c-5ab7-4d97-8f75-0fc958f52e16"
    },

    {
        id: "bakery-006",
        name: "Theobroma Eggless Walnut Brownie | No Palm Oil | No Preservatives",
        brand: "Theobroma",
        price: 91,
        mrp: 95,
        unit: "1 pack (65 g)",
        rating: 3.7,
        reviews: 238,
        category: "Fresh Bakery",
        type: "eggless walnut brownie",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6d0b1b91-c660-490f-acc4-09eabce34035/Theobroma-Eggless-Walnut-Brownie-No-Palm-Oil-No-Preservatives.jpeg",
        pvid: "66c731f9-40f2-4186-8895-3c30ffa011a3"
    },

    {
        id: "bakery-007",
        name: "Smoor Traditional Mawa Cake",
        brand: "Smoor",
        price: 83,
        mrp: 90,
        unit: "1 pack (90 g)",
        rating: 4.4,
        reviews: 90,
        category: "Fresh Bakery",
        type: "mawa cake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2085,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f48fe767-1b3b-4c29-ae55-9862d6c4bd0d/Smoor-Traditional-Mawa-Cake.jpeg",
        pvid: "80bcd4a9-2b6e-4096-b877-9be114789548"
    },

    {
        id: "bakery-008",
        name: "Smoor Whole Wheat Fruit & Nut Cake",
        brand: "Smoor",
        price: 121,
        mrp: 130,
        unit: "1 pack (90 g)",
        rating: 3.3,
        reviews: 30,
        category: "Fresh Bakery",
        type: "whole wheat fruit nut cake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2621-2388,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0f7427ad-b248-4571-8e6c-85e622c1d39c/Smoor-Whole-Wheat-Fruit-Nut-Cake.jpeg",
        pvid: "e399dfd4-2d12-4385-98bb-30bb648dcf0d"
    },

    {
        id: "bakery-009",
        name: "Cake Tale Brownie Chocochip Ambient",
        brand: "Cake Tale",
        price: 104,
        mrp: 109,
        unit: "1 pack (75 g)",
        rating: 3.8,
        reviews: 221,
        category: "Fresh Bakery",
        type: "chocochip brownie",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-457-400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1ae6f1f6-0f4b-4f55-8881-91e7f1a1871c/Cake-Tale-Brownie-Chocochip-Ambient.jpeg",
        pvid: "815fcea1-4dfe-4c4c-b167-4ccb4b1392ee"
    },

    {
        id: "bakery-010",
        name: "Cake Tale Muffin Vanilla Chocochip",
        brand: "Cake Tale",
        price: 134,
        mrp: 139,
        unit: "1 pack (150 g)",
        rating: 4.0,
        reviews: 249,
        category: "Fresh Bakery",
        type: "vanilla chocochip muffin",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2184-2046,pr-true,f-auto,q-40,dpr-2/cms/product_variant/05a36f33-bd0a-4348-922b-4cc351cf0b43/Cake-Tale-Muffin-Vanilla-Chocochip.jpeg",
        pvid: "54490aa6-1ead-4db7-8ef4-0a03d0adec91"
    },

    {
        id: "bakery-011",
        name: "Smoor New York Style Chocolate Chip Cookies",
        brand: "Smoor",
        price: 110,
        mrp: 110,
        unit: "1 pack (80 g)",
        rating: 4.8,
        reviews: 123,
        category: "Fresh Bakery",
        type: "chocolate chip cookies",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1881-2200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a2c12789-5319-47e8-9dcb-19d2c495b2f9/Smoor-New-York-Style-Chocolate-Chip-Cookies.jpeg",
        pvid: "119e4fa3-da4a-4d36-a9ba-3fb290f07edf"
    },

    {
        id: "bakery-012",
        name: "Cake Tale Barcake Fruit & Nutty",
        brand: "Cake Tale",
        price: 60,
        mrp: 65,
        unit: "1 pack (75 g)",
        rating: 3.5,
        reviews: 1000,
        category: "Fresh Bakery",
        type: "fruit nut barcake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1499-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dc31e8d4-a049-4b03-ab36-26bd40319d10/Cake-Tale-Barcake-Fruit-Nutty.jpeg",
        pvid: "7af974e6-f488-4209-95e5-3bb346ef2d17"
    },

    {
        id: "bakery-013",
        name: "Cake Tale Barcake Vanilla Chocochip",
        brand: "Cake Tale",
        price: 164,
        mrp: 179,
        unit: "1 pack (200 g)",
        rating: 4.1,
        reviews: 144,
        category: "Fresh Bakery",
        type: "vanilla chocochip barcake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ee323e9e-a87c-4d3b-83de-c2eb12d84fa8/Cake-Tale-Barcake-Vanilla-Chocochip.jpeg",
        pvid: "8eeeac7c-2c53-4573-8d49-c0e5bea617bc"
    },

    {
        id: "bakery-014",
        name: "Theobroma Double Choco Chip Cookies | Soft Baked | No Palm Oil | No Preservatives",
        brand: "Theobroma",
        price: 286,
        mrp: 307,
        unit: "1 pack (140 g)",
        rating: 4.1,
        reviews: 72,
        category: "Fresh Bakery",
        type: "double chocolate chip cookies",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2d42bc85-b3ee-421c-9bb2-7339b6a68e6e/Theobroma-Double-Choco-Chip-Cookies-Soft-Baked-No-Plam-Oil-No-Preservatives.jpeg",
        pvid: "493767a7-78a8-41bd-92ef-5d138a29a041"
    },

    {
        id: "bakery-015",
        name: "The Health Factory Pound Cake Fruit & Nut | Zero Maida | Tea Cake | Eggless",
        brand: "The Health Factory",
        price: 126,
        mrp: 170,
        unit: "1 pack (165 g)",
        rating: 4.5,
        reviews: 23,
        category: "Fresh Bakery",
        type: "fruit nut pound cake eggless",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/758d8c7a-dbb3-4f91-86df-97ec97333196/The-Health-Factory-Pound-Cake-Fruit-Nut-Zero-Maida-Tea-Cake-Eggless.jpg",
        pvid: "c7a61914-a031-4919-9aee-6f72755bf83f"
    },

    {
        id: "bakery-016",
        name: "Cake Tale Barcake Chocochip",
        brand: "Cake Tale",
        price: 61,
        mrp: 69,
        unit: "1 pack (75 g)",
        rating: 4.0,
        reviews: 219,
        category: "Fresh Bakery",
        type: "chocochip barcake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dc7d5c17-99dd-4a3d-adbd-2671b2dd167d/Cake-Tale-Barcake-Chocochip.jpeg",
        pvid: "4c5de6b3-fdba-499d-8a8b-5eacb94a89c2"
    },

    {
        id: "bakery-017",
        name: "Theobroma Sweet Sesame Crackers | No Preservatives | No Palm Oil",
        brand: "Theobroma",
        price: 138,
        mrp: 148,
        unit: "1 pack (100 g)",
        rating: 4.4,
        reviews: 27,
        category: "Fresh Bakery",
        type: "sweet sesame crackers",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/975887a9-66a7-430a-869d-27e8872f7577/Theobroma-Sweet-Sesame-Crackers-No-Preservatives-No-Palm-Oil.jpeg",
        pvid: "b8e39242-2309-462e-bf23-82229b5e228e"
    },

    {
        id: "bakery-018",
        name: "Cakezone Marbel Cake | Zero Palm Oil | Freshly Baked",
        brand: "Cakezone",
        price: 90,
        mrp: 129,
        unit: "1 pack (180 g)",
        rating: 4.2,
        reviews: 381,
        category: "Fresh Bakery",
        type: "marble cake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1350-1350,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0f87347e-0032-4976-9c88-d1a49eb7012e/Cakezone-Marbel-Cake-Zero-Palm-Oil-Freshly-Baked.jpeg",
        pvid: "1ec2f5c0-2778-43a3-b936-f45f9c2bc406"
    },

    {
        id: "bakery-019",
        name: "Cakezone Date & Raisin Cake | Zero Palm Oil | Freshly Baked",
        brand: "Cakezone",
        price: 90,
        mrp: 129,
        unit: "1 pack (180 g)",
        rating: 4.2,
        reviews: 774,
        category: "Fresh Bakery",
        type: "date raisin cake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1350-1350,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ebe2c204-ec18-490f-bbd9-b7ede92fc4ad/Cakezone-Date-Raisin-Cake-Zero-Palm-Oil-Freshly-Baked.jpeg",
        pvid: "1fa2df15-7325-40cc-ad2c-e8bf29b1c5ee"
    },

    {
        id: "bakery-020",
        name: "Theobroma Big Cookie Oats & Raisins Cookie | No Palm Oil | No Preservatives",
        brand: "Theobroma",
        price: 73,
        mrp: 85,
        unit: "1 pack (65 g)",
        rating: 4.0,
        reviews: 0,
        category: "Fresh Bakery",
        type: "oats raisin cookie",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6361ed38-dcac-42bb-94ca-e7789e5821c3/Theobroma-Big-Cookie-Oats-Raisins-Cookie-No-Palm-Oil-No-Preservatives.png",
        pvid: "e476f0d2-2046-4266-bf95-8cba2459d272"
    },

    {
        id: "bakery-021",
        name: "The Health Factory Mini Cakes Roasted Almonds | Zero Maida | Tea Cake | Eggless",
        brand: "The Health Factory",
        price: 50,
        mrp: 70,
        unit: "1 pack (70 g)",
        rating: 4.1,
        reviews: 6000,
        category: "Fresh Bakery",
        type: "roasted almond mini cake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/981f0107-f8be-4d88-b683-1a6336317868/The-Health-Factory-Mini-Cakes-Roasted-Almonds-Zero-Maida-Tea-Cake-Eggless.jpg",
        pvid: "0023d4f5-e003-4afe-bbbf-3482662b0650"
    },

    {
        id: "bakery-022",
        name: "Cakezone Choco Fudge Brownie | Zero Palm Oil | Freshly Baked",
        brand: "Cakezone",
        price: 15,
        mrp: 30,
        unit: "1 pack (40 g)",
        rating: 4.6,
        reviews: 5400,
        category: "Fresh Bakery",
        type: "choco fudge brownie",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1350-1350,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8b19df01-084e-47eb-8ce0-3005c839260e/Cakezone-Choco-Fudge-Brownie-Zero-Palm-Oil-Freshly-Baked.jpeg",
        pvid: "38d8f8f4-7461-47db-89cf-c3f2b608e7c1"
    },

    {
        id: "bakery-023",
        name: "Smoor Classic Vanilla Sponge Cake",
        brand: "Smoor",
        price: 79,
        mrp: 85,
        unit: "1 pack (90 g)",
        rating: 4.3,
        reviews: 154,
        category: "Fresh Bakery",
        type: "vanilla sponge cake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2167-2297,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8da0018a-61de-4302-92c4-3f5498f3deb7/Smoor-Classic-Vanilla-Sponge-Cake.jpeg",
        pvid: "f0912ca7-7f85-40b3-87c2-45c70cd5df69"
    },

    {
        id: "bakery-024",
        name: "Theobroma Big Cookie Chocolate Chip Cookie | No Palm Oil | No Preservatives",
        brand: "Theobroma",
        price: 98,
        mrp: 105,
        unit: "1 pack (60 g)",
        rating: 4.6,
        reviews: 490,
        category: "Fresh Bakery",
        type: "chocolate chip cookie",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0436f6db-ad29-4bc1-b245-440674d076dc/Theobroma-Big-Cookie-Chocolate-Chip-Cookie-No-Palm-Oil-No-Preservatives.jpeg",
        pvid: "a3ec9bb8-50da-487b-9e62-f42d0d62e3ef"
    },

    {
        id: "bakery-025",
        name: "Theobroma Eggless Choco Chip Brownie | No Palm Oil | No Preservatives",
        brand: "Theobroma",
        price: 91,
        mrp: 95,
        unit: "1 pack (65 g)",
        rating: 3.4,
        reviews: 642,
        category: "Fresh Bakery",
        type: "choco chip brownie",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/573cac59-9f65-40a5-999e-c66eda5d8b1c/Theobroma-Eggless-Choco-Chip-Brownie-No-Palm-Oil-No-Preservatives.jpg",
        pvid: "3863b80b-0ae0-431d-9739-48fe2010c2f4"
    },

    {
        id: "bakery-026",
        name: "Smoor Intense Chocolate Tea Cake",
        brand: "Smoor",
        price: 85,
        mrp: 85,
        unit: "1 pack (90 g)",
        rating: 4.2,
        reviews: 184,
        category: "Fresh Bakery",
        type: "chocolate tea cake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2085,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9d354167-07ec-46c2-a8b4-52c7eb636662/Smoor-Intense-Chocolate-Tea-Cake.jpeg",
        pvid: "9303a0f4-23d3-443f-8dc1-0fe53224a308"
    },

    {
        id: "bakery-027",
        name: "Smoor Fudgy Chocolate Brownie",
        brand: "Smoor",
        price: 111,
        mrp: 120,
        unit: "1 pack (80 g)",
        rating: 3.9,
        reviews: 22,
        category: "Fresh Bakery",
        type: "fudgy chocolate brownie",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-1716,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8ca1fe6f-6759-4c12-a62d-dff01328deb7/Smoor-Fudgy-Chocolate-Brownie.jpeg",
        pvid: "3309b14e-5621-447e-bf0a-0d34028e0215"
    },

    {
        id: "bakery-028",
        name: "Cakezone Walnut Brownie | Zero Palm Oil | Freshly Baked",
        brand: "Cakezone",
        price: 55,
        mrp: 79,
        unit: "1 pack (80 g)",
        rating: 4.3,
        reviews: 980,
        category: "Fresh Bakery",
        type: "walnut brownie",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1350-1350,pr-true,f-auto,q-40,dpr-2/cms/product_variant/52532a47-becd-4bba-aa7c-a2320cd997a8/Cakezone-Walnut-Brownie-Zero-Palm-Oil-Freshly-Baked.jpeg",
        pvid: "26d612f9-00bc-49d8-b0a0-9fa678430bf8"
    },

    {
        id: "bakery-029",
        name: "Theobroma Eggless Dense Chocolate Cake | No Palm Oil",
        brand: "Theobroma",
        price: 198,
        mrp: 225,
        unit: "1 pack (200 g)",
        rating: 4.0,
        reviews: 0,
        category: "Fresh Bakery",
        type: "dense chocolate cake",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0c50f323-432c-48d4-adb0-a65eb9a01e11/Theobroma-Eggless-Dense-Chocolate-Cake-No-Palm-Oil.png",
        pvid: "178dfee4-8706-436c-a4fc-388bef4d5bad"
    },

    {
        id: "bakery-030",
        name: "Smoor Double Chocolate Chip Cookies",
        brand: "Smoor",
        price: 111,
        mrp: 120,
        unit: "1 pack (80 g)",
        rating: 4.2,
        reviews: 80,
        category: "Fresh Bakery",
        type: "double chocolate cookies",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1881-2027,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f5dce3ff-3439-492f-a55d-b6e1d2a5b3ef/Smoor-Double-Chocolate-Chip-Cookies.jpeg",
        pvid: "de88e1ce-78d3-4cea-b5eb-a1c693539bb0"
    },

    {
        id: "bakery-031",
        name: "Theobroma Butter Palmiers",
        brand: "Theobroma",
        price: 94,
        mrp: 100,
        unit: "1 pack (50 g)",
        rating: 3.6,
        reviews: 50,
        category: "Fresh Bakery",
        type: "butter palmiers pastry",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-720-720,pr-true,f-auto,q-40,dpr-2/cms/product_variant/764ddbdc-ec1a-44a8-861a-9b2335e25d9a/Theobroma-Butter-Palmiers.jpeg",
        pvid: "6f1ba314-5673-4d43-a4c7-8b8e2220244b"
    }


];

/* =====================================================
   CURD & PROBIOTIC DRINK PRODUCTS
===================================================== */

const curdProducts = [

    {
        id: "curd-001",
        name: "Nandini Thick Curd Pouch",
        brand: "Nandini",
        unit: "500 g",
        price: 27,
        mrp: 28,
        rating: 4.7,
        reviews: 383300,
        category: "Curd & Probiotic Drink",
        type: "thick curd pouch",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c988b6fc-df0e-49b2-bd03-ac1e2b020a53/Nandini-Thick-Curd-Pouch.jpeg"
    },

    {
        id: "curd-002",
        name: "Milky Mist Greek Yogurt",
        brand: "Milky Mist",
        unit: "100 g",
        price: 52,
        mrp: 55,
        rating: 4.6,
        reviews: 44300,
        category: "Curd & Probiotic Drink",
        type: "greek yogurt",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8644550e-4941-4a5b-9c37-4cb8fc327ed6/Milky-Mist-Greek-Yogurt.jpg"
    },

    {
        id: "curd-003",
        name: "Amul Curd Pouch",
        brand: "Amul",
        unit: "900 g",
        price: 54,
        mrp: 54,
        rating: 4.7,
        reviews: 112000,
        category: "Curd & Probiotic Drink",
        type: "curd pouch",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/51a782b5-37c1-4caf-93a2-87d3aceab3d3/Amul-Curd-Pouch.jpeg"
    },

    {
        id: "curd-004",
        name: "Milky Mist Fruit Yogurt Blueberry",
        brand: "Milky Mist",
        unit: "100 g",
        price: 40,
        mrp: 40,
        rating: 4.6,
        reviews: 12400,
        category: "Curd & Probiotic Drink",
        type: "fruit yogurt blueberry",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/91a60df8-5561-4e83-aaf0-9dc5f503d45d/Milky-Mist-Fruit-Yogurt-Blueberry.jpeg"
    },

    {
        id: "curd-005",
        name: "Akshayakalpa Artisanal Organic Set Curd Cup",
        brand: "Akshayakalpa",
        unit: "1 kg",
        price: 163,
        mrp: 163,
        rating: 4.5,
        reviews: 2100,
        category: "Curd & Probiotic Drink",
        type: "organic set curd",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1024-1024,pr-true,f-auto,q-40,dpr-2/cms/product_variant/88b2618a-76c6-4fd0-96c2-763ae0401b76/Akshayakalpa-Artisanal-Organic-Set-Curd-Cup.jpg"
    },

    {
        id: "curd-006",
        name: "Milky Mist Set Curd Tub",
        brand: "Milky Mist",
        unit: "1 L",
        price: 134,
        mrp: 145,
        rating: 4.7,
        reviews: 8200,
        category: "Curd & Probiotic Drink",
        type: "set curd tub",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/77ad647c-a016-4d41-97ed-65f00bab387f/Milky-Mist-Set-Curd-Tub.jpeg"
    },

    {
        id: "curd-007",
        name: "Heritage Total Curd Tub",
        brand: "Heritage",
        unit: "1 kg",
        price: 116,
        mrp: 120,
        rating: 4.6,
        reviews: 28700,
        category: "Curd & Probiotic Drink",
        type: "curd tub",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b6b64d81-7add-4669-9ce6-d46c5a65564f/Heritage-Total-Curd-Tub.jpeg"
    },

    {
        id: "curd-008",
        name: "Heritage Sampurna A2 Curd Tub",
        brand: "Heritage",
        unit: "1 kg",
        price: 116,
        mrp: 155,
        rating: 4.5,
        reviews: 8400,
        category: "Curd & Probiotic Drink",
        type: "a2 curd",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2560-2560,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9c2293c6-2fc4-4683-941a-74f99e771a95/Heritage-Sampurna-A2-Curd-Tub.jpeg"
    },

    {
        id: "curd-009",
        name: "Milky Mist Probiotic Curd Tub",
        brand: "Milky Mist",
        unit: "1 kg",
        price: 125,
        mrp: 150,
        rating: 4.4,
        reviews: 6300,
        category: "Curd & Probiotic Drink",
        type: "probiotic curd",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/83a9f0d4-0c84-47ad-89c9-e7ea52d2dca2/Milky-Mist-Probiotic-Curd-Tub.jpeg"
    },

    {
        id: "curd-010",
        name: "Heritage Total Curd Pouch",
        brand: "Heritage",
        unit: "1 kg",
        price: 72,
        mrp: 72,
        rating: 4.8,
        reviews: 35400,
        category: "Curd & Probiotic Drink",
        type: "curd pouch",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2918-2918,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b025527e-fee1-4147-86bb-d6a64253b816/Heritage-Total-Curd-Pouch.png"
    },

    {
        id: "curd-011",
        name: "Milky Mist Skyr",
        brand: "Milky Mist",
        unit: "100 g",
        price: 71,
        mrp: 75,
        rating: 4.4,
        reviews: 3900,
        category: "Curd & Probiotic Drink",
        type: "skyr yogurt",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/aea43b6b-4706-4a7d-bfbc-a5c7e86b10bb/Milky-Mist-Skyr.jpg"
    },

    {
        id: "curd-012",
        name: "Amul Masti Set Curd Tub",
        brand: "Amul",
        unit: "1 kg",
        price: 130,
        mrp: 130,
        rating: 4.7,
        reviews: 28700,
        category: "Curd & Probiotic Drink",
        type: "set curd tub",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b33e588e-6fd8-40b6-9289-a0cd100f57a6/Amul-Masti-Set-Curd-Tub.jpeg"
    },

    {
        id: "curd-013",
        name: "Milky Mist Greek Yogurt",
        brand: "Milky Mist",
        unit: "700 g",
        price: 322,
        mrp: 350,
        rating: 4.5,
        reviews: 4700,
        category: "Curd & Probiotic Drink",
        type: "greek yogurt",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/eb8bbec9-dcac-4bd5-89a0-65f890d7e1a6/Milky-Mist-Greek-Yogurt.jpg"
    },

    {
        id: "curd-014",
        name: "Sid's Farm Family Tub Curd",
        brand: "Sid's Farm",
        unit: "1 kg",
        price: 123,
        mrp: 145,
        rating: 4.3,
        reviews: 1100,
        category: "Curd & Probiotic Drink",
        type: "family curd tub",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5401-5401,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c933763b-4474-40e1-a32c-f617d29a1c12/Sid-s-Farm-Family-Tub-Curd-Made-From-Tested-Milk-No-Antibiotics-No-Hormones-No-Preservatives-.jpeg"
    },

    {
        id: "curd-015",
        name: "Country Delight Homestyle Curd",
        brand: "Country Delight",
        unit: "1 kg",
        price: 115,
        mrp: 135,
        rating: 4.0,
        reviews: 5200,
        category: "Curd & Probiotic Drink",
        type: "homestyle curd",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4167-4167,pr-true,f-auto,q-40,dpr-2/cms/product_variant/01ce251a-96d5-4e08-a340-8c703e9eddfd/Country-Delight-Homestyle-Curd.jpg"
    },

    {
        id: "curd-016",
        name: "Milky Mist Skyr",
        brand: "Milky Mist",
        unit: "700 g",
        price: 360,
        mrp: 380,
        rating: 4.1,
        reviews: 2100,
        category: "Curd & Probiotic Drink",
        type: "skyr yogurt",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ef88fd78-6ae0-47e0-862b-5dbd5312b81b/Milky-Mist-Skyr.jpg"
    },

    {
        id: "curd-017",
        name: "Milky Mist Curd Pouch",
        brand: "Milky Mist",
        unit: "400 g",
        price: 42,
        mrp: 45,
        rating: 4.7,
        reviews: 12400,
        category: "Curd & Probiotic Drink",
        type: "curd pouch",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/01182c5b-545f-4726-98e7-15c22592cdec/Milky-Mist-Curd-Pouch.jpeg"
    },

    {
        id: "curd-018",
        name: "Akshayakalpa Artisanal Organic Set Curd Cup",
        brand: "Akshayakalpa",
        unit: "400 g",
        price: 80,
        mrp: 80,
        rating: 4.5,
        reviews: 1800,
        category: "Curd & Probiotic Drink",
        type: "organic set curd",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ca62e0a6-c6e3-4293-bf11-494d69d5853e/Akshayakalpa-Artisanal-Organic-Set-Curd-Cup.jpg"
    },

    {
        id: "curd-019",
        name: "Epigamia Greek Yogurt Blueberry",
        brand: "Epigamia",
        unit: "85 g",
        price: 60,
        mrp: 60,
        rating: 4.5,
        reviews: 7200,
        category: "Curd & Probiotic Drink",
        type: "greek yogurt blueberry",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4b88c53c-5bb2-417b-bf3c-0a035aba1955/Epigamia-Greek-Yogurt-Blueberry.jpg"
    },

    {
        id: "curd-020",
        name: "Heritage Total Curd Pouch",
        brand: "Heritage",
        unit: "450 / 500 g",
        price: 35,
        mrp: 38,
        rating: 4.9,
        reviews: 29100,
        category: "Curd & Probiotic Drink",
        type: "curd pouch",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dc87689b-6dd4-4f51-9d4d-fd052fbd3708/Heritage-Total-Curd-Pouch.jpg"
    },

    {
        id: "curd-021",
        name: "Hatsun Curd Pouch",
        brand: "Hatsun",
        unit: "500 g",
        price: 37,
        mrp: 37,
        rating: 4.9,
        reviews: 8900,
        category: "Curd & Probiotic Drink",
        type: "curd pouch",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f235a1ee-7bcb-4fba-b6e3-02c41961198c/Hatsun-Curd-Pouch.jpeg"
    },

    {
        id: "curd-022",
        name: "Amul Curd Pouch",
        brand: "Amul",
        unit: "450 g",
        price: 28,
        mrp: 28,
        rating: 4.7,
        reviews: 43200,
        category: "Curd & Probiotic Drink",
        type: "curd pouch",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8b83ba16-78ab-4266-aef0-a7522f73fffc/Amul-Curd-Pouch.jpeg"
    },

    {
        id: "curd-023",
        name: "Milky Mist Fruit Yogurt Mango",
        brand: "Milky Mist",
        unit: "100 g",
        price: 40,
        mrp: 40,
        rating: 4.5,
        reviews: 6200,
        category: "Curd & Probiotic Drink",
        type: "fruit yogurt mango",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8b2202b2-f396-4dfa-b163-1e94f68d0013/Milky-Mist-Fruit-Yogurt-Mango.jpeg"
    },

    {
        id: "curd-024",
        name: "Epigamia Lactose Free Cup Curd",
        brand: "Epigamia",
        unit: "400 g",
        price: 100,
        mrp: 100,
        rating: 4.6,
        reviews: 3200,
        category: "Curd & Probiotic Drink",
        type: "lactose free curd",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dd08334e-9198-4394-b57b-595a6a3a46b1/Epigamia-Lactose-Free-Cup-Curd.jpeg"
    },

    {
        id: "curd-025",
        name: "Akshayakalpa Organic Probiotic Curd Pouch",
        brand: "Akshayakalpa",
        unit: "500 g",
        price: 58,
        mrp: 58,
        rating: 4.7,
        reviews: 2400,
        category: "Curd & Probiotic Drink",
        type: "organic probiotic curd",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0fba30da-6c22-4081-af60-f802beeaab4a/Akshayakalpa-Organic-Probiotic-Curd-Pouch.jpg"
    },

    {
        id: "curd-026",
        name: "Epigamia No Added Sugar Mixed Berry Yogurt",
        brand: "Epigamia",
        unit: "85 g",
        price: 70,
        mrp: 70,
        rating: 4.3,
        reviews: 2700,
        category: "Curd & Probiotic Drink",
        type: "mixed berry yogurt",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6aa4f461-1230-4e5b-9638-43b7a949470e/Epigamia-No-Added-Sugar-Mixed-Berry-Yogurt.jpg"
    },

    {
        id: "curd-027",
        name: "Heritage Total Curd Tub",
        brand: "Heritage",
        unit: "400 g",
        price: 50,
        mrp: 55,
        rating: 4.7,
        reviews: 12400,
        category: "Curd & Probiotic Drink",
        type: "curd tub",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9b52a4eb-4049-49ff-a002-74fc9c59d488/Heritage-Total-Curd-Tub.jpeg"
    },

    {
        id: "curd-028",
        name: "Epigamia Greek Yogurt - Alphonso Mango",
        brand: "Epigamia",
        unit: "85 g",
        price: 60,
        mrp: 60,
        rating: 4.3,
        reviews: 4100,
        category: "Curd & Probiotic Drink",
        type: "greek yogurt mango",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/76f57a62-a793-4a35-816f-6a8f91b4a8b5/Epigamia-Greek-Yogurt-Alphonso-Mango.jpg"
    },

    {
        id: "curd-029",
        name: "Akshayakalpa Amrutha A2 Organic Curd Pouch",
        brand: "Akshayakalpa",
        unit: "500 g",
        price: 70,
        mrp: 70,
        rating: 4.7,
        reviews: 1800,
        category: "Curd & Probiotic Drink",
        type: "a2 organic curd",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5b141bbb-8a08-4c34-82c7-15ddc3fc5a1e/Akshayakalpa-Amrutha-A2-Organic-Curd-Pouch.jpg"
    },

    {
        id: "curd-030",
        name: "Epigamia Greek Yogurt - Natural",
        brand: "Epigamia",
        unit: "85 g",
        price: 45,
        mrp: 60,
        rating: 4.5,
        reviews: 6800,
        category: "Curd & Probiotic Drink",
        type: "natural greek yogurt",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d7ddbec8-fc31-4402-80c6-fd2b7f718c5a/Epigamia-Greek-Yogurt-Natural.jpg"
    },

    {
        id: "curd-031",
        name: "Godrej Jersey Curd Tub",
        brand: "Godrej Jersey",
        unit: "1 kg",
        price: 82,
        mrp: 110,
        rating: 4.5,
        reviews: 4300,
        category: "Curd & Probiotic Drink",
        type: "curd tub",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2904-2904,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7ed8076b-7659-45da-8301-8ed2fc13a815/Godrej-Jersey-Curd-Tub.jpeg"
    },

    {
        id: "curd-032",
        name: "Milky Mist Fruit Yogurt Strawberry",
        brand: "Milky Mist",
        unit: "100 g",
        price: 40,
        mrp: 40,
        rating: 4.6,
        reviews: 7100,
        category: "Curd & Probiotic Drink",
        type: "fruit yogurt strawberry",
        image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2c92d940-dbc1-4d1a-a7a2-8b151cbefac5/Milky-Mist-Fruit-Yogurt-Strawberry.jpeg"
    }

];

const battersMixesProducts = [

    {
        id: "batter-001",
        name: "iD Fresh Idli & Dosa Batter",
        price: 99,
        mrp: 99,
        unit: "1 pack (1 kg)",
        rating: 4.5,
        reviews: "129.9k",
        discount: 0,
        category: "Batters & Mixes",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/57253b4d-1964-4b01-8c26-87ada955acd3/iD-Fresh-Idli-Dosa-Batter.jpg"
    },

    {
        id: "batter-002",
        name: "iD Fresh Idli & Dosa Batter",
        price: 139,
        mrp: 172,
        unit: "1 pack (2 kg)",
        rating: 4.5,
        reviews: "89.5k",
        discount: 33,
        category: "Batters & Mixes",
        badge: "33 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f22b6577-1dc5-4bdf-a1af-417d6a5cc417/iD-Fresh-Idli-Dosa-Batter.jpg"
    },

    {
        id: "batter-003",
        name: "Daily Good Idly & Dosa Batter",
        price: 65,
        mrp: 80,
        unit: "1 pack (1 kg)",
        rating: 4.4,
        reviews: "54.5k",
        discount: 15,
        category: "Batters & Mixes",
        badge: "15 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1592,pr-true,f-auto,q-40,dpr-2/cms/product_variant/efbad9d5-e79b-484a-9c19-4654343f2c96/Daily-Good-Idly-Dosa-Batter.jpeg"
    },

    {
        id: "batter-004",
        name: "Khetika Fresh Idli Dosa Batter",
        price: 48,
        mrp: 89,
        unit: "1 pack (1 kg)",
        rating: 4.2,
        reviews: "50.0k",
        discount: 41,
        category: "Batters & Mixes",
        badge: "41 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3a9c615f-9678-48cc-9c4c-bafdaed68011/Khetika-Fresh-Idli-Dosa-Batter.png"
    },

    {
        id: "batter-005",
        name: "Asal Batter",
        price: 79,
        mrp: 95,
        unit: "1 pack (1 kg)",
        rating: 4.5,
        reviews: "24.0k",
        discount: 16,
        category: "Batters & Mixes",
        badge: "16 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2048-1150,pr-true,f-auto,q-40,dpr-2/cms/product_variant/503e9ca9-bc75-42ba-bfd9-993fc996c0e6/Asal-Batter.png"
    },

    {
        id: "batter-006",
        name: "iD Fresh Idli & Dosa Batter",
        price: 67,
        mrp: 68,
        unit: "1 pack (500 g)",
        rating: 4.4,
        reviews: "61.2k",
        discount: 1,
        category: "Batters & Mixes",
        badge: "1 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d878b438-e975-410d-85ba-6f0a524efc10/iD-Fresh-Idli-Dosa-Batter.jpg"
    },

    {
        id: "batter-007",
        name: "Khetika Ragi Idli Dosa Millet Batter",
        price: 92,
        mrp: 125,
        unit: "1 pack (1 kg)",
        rating: 4.4,
        reviews: "3.1k",
        discount: 33,
        category: "Batters & Mixes",
        badge: "33 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cedce550-8988-46f4-a31c-9166d220565a/Khetika-Ragi-Idli-Dosa-Millet-Batter.png"
    },

    {
        id: "batter-008",
        name: "Nandini Idli Dosa Batter",
        price: 40,
        mrp: 40,
        unit: "1 pack (450 g)",
        rating: 4.4,
        reviews: "4.2k",
        discount: 0,
        category: "Batters & Mixes",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1684-1684,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0c1a6c76-884d-4abb-976f-8e4165effa7a/Nandini-Idli-Dosa-batter.png"
    },

    {
        id: "batter-009",
        name: "Daily Good Idly And Dosa Batter",
        price: 40,
        mrp: 50,
        unit: "1 pack (500 g)",
        rating: 4.7,
        reviews: "9.7k",
        discount: 10,
        category: "Batters & Mixes",
        badge: "10 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2250-2250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0d914c97-b2c1-44b4-89ad-5381a140d3df/Daily-Good-Idly-And-Dosa-Batter.jpeg"
    },

    {
        id: "batter-010",
        name: "iD Fresh Multigrain Idly & Dosa Batter",
        price: 86,
        mrp: 100,
        unit: "1 pack (500 g)",
        rating: 4.1,
        reviews: "2.2k",
        discount: 14,
        category: "Batters & Mixes",
        badge: "14 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c809912c-61bb-4665-afcb-d0b52994bc97/iD-Fresh-Multigrain-Idly-Dosa-Batter.jpg"
    },

    {
        id: "batter-011",
        name: "iD Fresh Appam Batter Pouch",
        price: 75,
        mrp: 90,
        unit: "1 pc (500 g)",
        rating: 3.7,
        reviews: "516",
        discount: 15,
        category: "Batters & Mixes",
        badge: "15 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/22a1a1b9-131f-4e49-93ad-2db7cf0e821b/iD-Fresh-Appam-Batter-Pouch.jpeg"
    },

    {
        id: "batter-012",
        name: "Khetika Ragi Idli Dosa Millet Batter",
        price: 41,
        mrp: 79,
        unit: "1 pack (500 g)",
        rating: 4.5,
        reviews: "6.7k",
        discount: 38,
        category: "Batters & Mixes",
        badge: "38 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f96864c4-8da9-46af-81ce-474cd42f6707/Khetika-Ragi-Idli-Dosa-Millet-Batter.png"
    },

    {
        id: "batter-013",
        name: "MTR Minute Fresh Dosa Batter",
        price: 91,
        mrp: 105,
        unit: "1 pack (850 g)",
        rating: 4.7,
        reviews: "6.0k",
        discount: 14,
        category: "Batters & Mixes",
        badge: "14 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/efd80ff0-b7fb-4fe5-8d88-82596d04991d/MTR-Minute-Fresh-Dosa-Batter.jpeg"
    },

    {
        id: "batter-014",
        name: "Nandini Idli Dosa Batter",
        price: 80,
        mrp: 80,
        unit: "1 pack (900 g)",
        rating: 4.4,
        reviews: "2.9k",
        discount: 0,
        category: "Batters & Mixes",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0645a9cf-318f-4106-961a-0d5a72cb60c1/Nandini-Idli-Dosa-batter.jpeg"
    },

    {
        id: "batter-015",
        name: "MTR Minute Fresh Idli Batter",
        price: 96,
        mrp: 105,
        unit: "1 pack (750 g)",
        rating: 4.7,
        reviews: "1.9k",
        discount: 9,
        category: "Batters & Mixes",
        badge: "9 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1021-1021,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1f6551a4-f684-4901-86b9-7487f45f27e1/MTR-Minute-Fresh-Idli-Batter.jpeg"
    },

    {
        id: "batter-016",
        name: "iD Fresh Peanut Chutney",
        price: 50,
        mrp: 50,
        unit: "1 pack (120 g)",
        rating: 4.3,
        reviews: "8.7k",
        discount: 0,
        category: "Batters & Mixes",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/41a85a37-7446-42e5-a4e0-b01739f15f61/iD-Fresh-Peanut-Chutney.png"
    },

    {
        id: "batter-017",
        name: "Rishta Multi Grain Idli Dosa Batter",
        price: 120,
        mrp: 120,
        unit: "1 pack (800 g)",
        rating: 4.4,
        reviews: "1.9k",
        discount: 0,
        category: "Batters & Mixes",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c85f7e06-5acf-4a37-a130-e227bda7e4eb/Rishta-Multi-Grain-Idli-Dosa-Batter.jpeg"
    },

    {
        id: "batter-018",
        name: "Khetika Moong Chilla Batter",
        price: 76,
        mrp: 79,
        unit: "1 pack (500 g)",
        rating: 3.9,
        reviews: "731",
        discount: 3,
        category: "Batters & Mixes",
        badge: "3 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e35546d7-e22b-40bd-b45d-19719d86e83a/Khetika-Moong-Chilla-Batter.jpg"
    },

    {
        id: "batter-019",
        name: "iD Fresh Liquid Sambar (Heat & Eat)",
        price: 100,
        mrp: 100,
        unit: "1 pack (350 g)",
        rating: 4.4,
        reviews: "3.5k",
        discount: 0,
        category: "Batters & Mixes",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/84f5efb6-55a9-4129-9ce1-43947a4288f4/iD-Fresh-Liquid-Sambar-Heat-Eat-.jpg"
    },

    {
        id: "batter-020",
        name: "Khetika Peanut Chutney",
        price: 45,
        mrp: 49,
        unit: "1 pack (120 g)",
        rating: 3.9,
        reviews: "1.3k",
        discount: 4,
        category: "Batters & Mixes",
        badge: "4 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2667-2667,pr-true,f-auto,q-40,dpr-2/cms/product_variant/38ca777e-6217-4186-91d4-27b53ac1be59/Khetika-Peanut-Chutney.jpeg"
    },

    {
        id: "batter-021",
        name: "Khetika Tomato Chutney",
        price: 42,
        mrp: 49,
        unit: "1 pack (120 g)",
        rating: 4.1,
        reviews: "1.7k",
        discount: 7,
        category: "Batters & Mixes",
        badge: "7 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/19b63aae-bad9-4516-add2-9a0e252845f3/Khetika-Tomato-Chutney.jpeg"
    },

    {
        id: "batter-022",
        name: "iD Fresh Green Chilli Thecha",
        price: 24,
        mrp: 30,
        unit: "1 pack (60 g)",
        rating: 4.1,
        reviews: "421",
        discount: 6,
        category: "Batters & Mixes",
        badge: "6 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bcf17447-2f18-4843-b714-cb726271d74e/iD-Fresh-Green-Chilli-Thecha.jpg"
    },

    {
        id: "batter-023",
        name: "iD Fresh Protein Idly Dosa Batter",
        price: 128,
        mrp: 150,
        unit: "1 pack (1 kg)",
        rating: 3.6,
        reviews: "559",
        discount: 22,
        category: "Batters & Mixes",
        badge: "22 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1435-1435,pr-true,f-auto,q-40,dpr-2/cms/product_variant/aa2b027e-8f80-442a-a986-13ce970c8b33/iD-Fresh-Protein-Idly-Dosa-Batter.jpg"
    },

    {
        id: "batter-024",
        name: "iD Fresh Protein-Rich | 75g Protein | Idly & Dosa Batter",
        price: 95,
        mrp: 95,
        unit: "1 pack (500 g)",
        rating: 3.8,
        reviews: "4.9k",
        discount: 0,
        category: "Batters & Mixes",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/84375139-f5b3-430c-99ad-28fd759695f4/iD-Fresh-Protein-Rich-75g-Protein-Idly-Dosa-Batter.jpg"
    },

    {
        id: "batter-025",
        name: "iD Moong Chilla Batter",
        price: 64,
        mrp: 79,
        unit: "1 pack (500 g)",
        rating: 4.6,
        reviews: "581",
        discount: 15,
        category: "Batters & Mixes",
        badge: "15 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2050-2050,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a03eacb8-81e3-42fe-b2a2-df3cc362d476/iD-Moong-Chilla-Batter.png"
    },

    {
        id: "batter-026",
        name: "iD Fresh Ragi Millet Idly & Dosa Batter",
        price: 69,
        mrp: 74,
        unit: "1 pack (500 g)",
        rating: 4.5,
        reviews: "4.2k",
        discount: 5,
        category: "Batters & Mixes",
        badge: "5 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bf3f294b-94fe-4071-a267-4309f9cdf52e/iD-Fresh-Ragi-Millet-Idly-Dosa-Batter.jpeg"
    },

    {
        id: "batter-027",
        name: "iD Fresh Organic Batter",
        price: 69,
        mrp: 85,
        unit: "1 pack (500 g)",
        rating: 4.0,
        reviews: "313",
        discount: 16,
        category: "Batters & Mixes",
        badge: "16 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1284-1284,pr-true,f-auto,q-40,dpr-2/cms/product_variant/00434148-a0ce-4824-9359-c0ce16aa2133/iD-Fresh-Organic-Batter.png"
    },

    {
        id: "batter-028",
        name: "iD Fresh Coconut Chutney",
        price: 50,
        mrp: 50,
        unit: "1 pack (120 g)",
        rating: 4.3,
        reviews: "15.6k",
        discount: 0,
        category: "Batters & Mixes",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e04e0ad0-f1d5-4d0d-a515-ea1eb4ffe86d/iD-Fresh-Coconut-Chutney.png"
    },

    {
        id: "batter-029",
        name: "MTR Minute Fresh Dosa Batter",
        price: 130,
        mrp: 150,
        unit: "1.5 kg",
        rating: 4.3,
        reviews: "170",
        discount: 20,
        category: "Batters & Mixes",
        badge: "20 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5d28dc5a-bb06-43c5-9272-d20803007e70/MTR-Minute-Fresh-Dosa-Batter.jpeg"
    },

    {
        id: "batter-030",
        name: "Aashirvaad Fresh Peanut Chutney",
        price: 45,
        mrp: 49,
        unit: "1 pack (120 g)",
        rating: 4.5,
        reviews: "101",
        discount: 4,
        category: "Batters & Mixes",
        badge: "4 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2587837c-bb74-4f5f-98f8-4dc8c1d6319c/Aashirvaad-Fresh-Peanut-Chutney.png"
    },

    {
        id: "batter-031",
        name: "Rishta Idli Dosa Batter",
        price: 120,
        mrp: 120,
        unit: "1 pack (1 kg)",
        rating: 4.3,
        reviews: "7.9k",
        discount: 0,
        category: "Batters & Mixes",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cb23c939-e285-4779-b455-443577b99689/Rishta-Idli-Dosa-Batter.png"
    },

    {
        id: "batter-032",
        name: "iD Fresh High Fibre Brown Rice & Oats Batter",
        price: 64,
        mrp: 90,
        unit: "1 pack (500 g)",
        rating: 3.9,
        reviews: "259",
        discount: 26,
        category: "Batters & Mixes",
        badge: "26 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f89d21c1-96db-46d9-b143-976a5470d109/iD-Fresh-High-Fibre-Brown-Rice-Oats-Batter.jpg"
    }
];

const paneerCreamProducts = [

    {
        id: "paneer-001",
        name: "Milky Mist Paneer",
        price: 100,
        mrp: 140,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "125.3k",
        discount: 40,
        badge: "₹40 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bdabbe58-cf0e-422c-b7d1-b811fa13bdf7/Milky-Mist-Paneer.jpeg"
    },

    {
        id: "paneer-002",
        name: "Amul Fresh Malai Paneer",
        price: 105,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "389.1k",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2d9f45c4-2852-435f-bd71-4bb608d19aa5/Amul-Fresh-Malai-Paneer.jpg"
    },

    {
        id: "paneer-003",
        name: "Akshayakalpa Organic Malai Paneer",
        price: 145,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.5,
        reviews: "11.7k",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/279e1e55-56c9-412b-b6a0-9d75a0eb5696/Akshayakalpa-Organic-Malai-Paneer.jpg"
    },

    {
        id: "paneer-004",
        name: "Nandini Fresh Paneer (Pouch)",
        price: 96,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "49.6k",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1024-1024,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1c185b87-7475-4210-bc4b-f57c8e58a7ba/Nandini-Fresh-Paneer-Pouch-.png"
    },

    {
        id: "paneer-005",
        name: "Milky Mist High Protein Paneer",
        price: 147,
        mrp: 165,
        unit: "1 pack (200 g)",
        rating: 4.5,
        reviews: "31.3k",
        discount: 18,
        badge: "₹18 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8cd95c47-e10f-42a2-aa78-4e2a767c875d/Milky-Mist-High-Protein-Paneer.jpg"
    },

    {
        id: "paneer-006",
        name: "Nandini High Protein Medium Fat Paneer",
        price: 85,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.8,
        reviews: "178",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4500-4500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e5dd0554-8bcf-4625-b872-9990cab93710/Nandini-High-Protein-Medium-Fat-Paneer.jpeg"
    },

    {
        id: "paneer-007",
        name: "Akshayakalpa Organic High Protein Paneer",
        price: 173,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.9,
        reviews: "2.2k",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/969a5fbc-83d6-421e-bb5e-eae2010014c1/Akshayakalpa-Organic-High-Protein-Paneer.jpg"
    },

    {
        id: "paneer-008",
        name: "Heritage Fresh Paneer",
        price: 101,
        mrp: 120,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "81.8k",
        discount: 19,
        badge: "₹19 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3381e20b-dea2-44a2-9c5f-a0884fdbe524/Heritage-Fresh-Paneer.jpeg"
    },

    {
        id: "paneer-009",
        name: "Mother Dairy Fresh Paneer",
        price: 92,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "132.7k",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b9951a58-c554-4879-9390-8e61187770b5/Mother-Dairy-Fresh-Paneer.jpg"
    },

    {
        id: "paneer-010",
        name: "Country Delight 40g Protein Taaza Paneer",
        price: 115,
        mrp: 130,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "6.2k",
        discount: 15,
        badge: "₹15 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3750-3750,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e66f5290-066b-4269-a388-e6d9c9d80829/Country-Delight-40g-Protein-Taaza-Paneer.jpg"
    },

    {
        id: "paneer-011",
        name: "Desi Farms Low Fat Paneer",
        price: 89,
        mrp: 96,
        unit: "1 pack (200 g)",
        rating: 3.7,
        reviews: "33.1k",
        discount: 7,
        badge: "₹7 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0deae81e-f86e-4762-b3d5-72e8c5daf451/Desi-Farms-Low-Fat-Paneer.jpg"
    },

    {
        id: "paneer-012",
        name: "Nandini Fresh Paneer (Pouch)",
        price: 211,
        mrp: null,
        unit: "1 pack (500 g)",
        rating: 4.5,
        reviews: "14.4k",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1244-1244,pr-true,f-auto,q-40,dpr-2/cms/product_variant/29637d2c-7f0c-428b-b27c-3b45e21af33b/Nandini-Fresh-Paneer-Pouch-.png"
    },

    {
        id: "paneer-013",
        name: "Sid's Farm Malai Paneer",
        price: 141,
        mrp: 150,
        unit: "1 pack (200 g)",
        rating: 4.5,
        reviews: "8.1k",
        discount: 9,
        badge: "₹9 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9505e593-06c2-45cd-86be-ff40327aa378/Sid-s-Farm-Malai-Paneer.jpeg"
    },

    {
        id: "paneer-014",
        name: "iD Fresh Soft & Creamy Paneer",
        price: 145,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.5,
        reviews: "11.1k",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fd04f128-dfd4-432c-a189-5e22c8d78f28/iD-Fresh-Soft-Creamy-Paneer.jpeg"
    },

    {
        id: "paneer-015",
        name: "Milky Mist Paneer",
        price: 295,
        mrp: 350,
        unit: "1 pack (500 g)",
        rating: 4.6,
        reviews: "22.7k",
        discount: 55,
        badge: "₹55 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f17bdc30-cee6-4233-811a-2b545b195889/Milky-Mist-Paneer.jpeg"
    },

    {
        id: "paneer-016",
        name: "Hatsun Fresh Paneer",
        price: 130,
        mrp: 140,
        unit: "1 pack (200 g)",
        rating: 4.8,
        reviews: "11.0k",
        discount: 10,
        badge: "₹10 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a5c06025-44b3-4b48-b225-8dd595110374/Hatsun-Fresh-Paneer.jpeg"
    },

    {
        id: "paneer-017",
        name: "Godrej Jersey Super Soft Paneer",
        price: 103,
        mrp: 120,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "24.9k",
        discount: 17,
        badge: "₹17 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1554ddd4-4e8a-4d56-9302-b13d10853902/Godrej-Jersey-Super-Soft-Paneer.png"
    },

    {
        id: "paneer-018",
        name: "Desi Farms High Protein Paneer",
        price: 130,
        mrp: 140,
        unit: "1 pack (200 g)",
        rating: 3.1,
        reviews: "2.4k",
        discount: 10,
        badge: "₹10 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3a646716-0efb-479a-ace7-8ee90b069f3c/Desi-Farms-High-Protein-Paneer.jpeg"
    },

    {
        id: "paneer-019",
        name: "Milky Mist Pure Cream",
        price: 80,
        mrp: 100,
        unit: "1 pack (250 ml)",
        rating: 4.5,
        reviews: "5.0k",
        discount: 20,
        badge: "₹20 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/221b75a5-3e00-422e-808c-c084e8fb3e05/Milky-Mist-Pure-Cream.jpeg"
    },

    {
        id: "paneer-020",
        name: "Namdhari's Dairy Tales A2 Paneer",
        price: 124,
        mrp: 145,
        unit: "1 pack (200 g)",
        rating: 4.5,
        reviews: "1.9k",
        discount: 21,
        badge: "₹21 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3646-4961,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f11e4f0f-d267-4aad-a86c-836eb66fd7f0/Namdhari-s-Dairy-Tales-A2-Paneer.jpeg"
    },

    {
        id: "paneer-021",
        name: "Desi farms Buffalo Malai Paneer",
        price: 114,
        mrp: 124,
        unit: "1 pack (200 g)",
        rating: 3.1,
        reviews: "1.5k",
        discount: 10,
        badge: "₹10 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b5956199-3943-4378-ae75-f72369c881b9/Desi-farms-Buffalo-Malai-Paneer.jpg"
    },

    {
        id: "paneer-022",
        name: "Amul Khoa",
        price: 94,
        mrp: 95,
        unit: "1 pack (200 g)",
        rating: 4.4,
        reviews: "14.3k",
        discount: 1,
        badge: "₹1 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7ace5ba4-a0c5-4510-9d9c-744a2747cb3c/Amul-Khoa.jpeg"
    },

    {
        id: "paneer-023",
        name: "Namdhari's Dairy Tales Paneer",
        price: 109,
        mrp: 120,
        unit: "1 pack (200 g)",
        rating: 4.3,
        reviews: "7.9k",
        discount: 11,
        badge: "₹11 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1997-1997,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b92a736f-ca06-49ba-be6c-0a580b7bacdc/Namdhari-s-Dairy-Tales-Paneer.png"
    },

    {
        id: "paneer-024",
        name: "Heritage Nourish High Protein Paneer",
        price: 115,
        mrp: 160,
        unit: "1 pack (240 g)",
        rating: 4.2,
        reviews: "3.6k",
        discount: 45,
        badge: "₹45 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b5197090-f697-421a-a094-95ed7bdcc0e2/Heritage-Nourish-High-Protein-Paneer.jpeg"
    },

    {
        id: "paneer-025",
        name: "Health On Plants Classic Tofu",
        price: 140,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.0,
        reviews: "629",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/68f1a41f-f3ac-4e46-aad0-be62ff5fea5f/Health-On-Plants-Classic-Tofu.jpeg"
    },

    {
        id: "paneer-026",
        name: "Milky Mist High Protein Paneer",
        price: 297,
        mrp: 410,
        unit: "1 pack (500 g)",
        rating: 4.5,
        reviews: "294",
        discount: 113,
        badge: "₹113 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/aa439f54-8853-4355-b909-4f72801e7a45/Milky-Mist-High-Protein-Paneer.jpeg"
    },

    {
        id: "paneer-027",
        name: "Milky Mist Khova Mawa",
        price: 115,
        mrp: 120,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "7.7k",
        discount: 5,
        badge: "₹5 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/97be2666-0dce-4d78-ad18-7c0f076517ef/Milky-Mist-Khova-Mawa.jpeg"
    },

    {
        id: "paneer-028",
        name: "Milky Mist Briyas Tofu",
        price: 69,
        mrp: 99,
        unit: "1 pack (200 g)",
        rating: 4.4,
        reviews: "16.7k",
        discount: 30,
        badge: "₹30 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0abae820-9f2c-4acd-beb5-60890f02e528/Milky-Mist-Briyas-Tofu-.jpeg"
    },

    {
        id: "paneer-029",
        name: "Health On Plants Tandoori Tofu",
        price: 185,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.2,
        reviews: "154",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5379-5380,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f6505f74-2322-4bfe-833e-38c3c3b69db8/Health-On-Plants-Tandoori-Tofu.jpeg"
    },

    {
        id: "paneer-030",
        name: "Health On Plants Smoked Tofu",
        price: 185,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.5,
        reviews: "125",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5379-5380,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5c4d9591-0bcd-468f-9d76-d856a431fbf3/Health-On-Plants-Smoked-Tofu.jpg"
    },

    {
        id: "paneer-031",
        name: "Gowardhan Paneer Pouch",
        price: 260,
        mrp: 325,
        unit: "1 pack (500 g)",
        rating: 4.5,
        reviews: "12.8k",
        discount: 65,
        badge: "₹65 OFF",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/28a43e31-8a1b-4001-aa1e-7d54ca229ce9/Gowardhan-Paneer-Pouch.jpeg"
    },

    {
        id: "paneer-032",
        name: "Dlecta Dairy Fresh Cream",
        price: 69,
        mrp: null,
        unit: "1 pack (200 ml)",
        rating: 4.7,
        reviews: "25.9k",
        discount: 0,
        badge: "",
        category: "Paneer & Cream",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/81cf2cca-f52e-46d0-9243-f5c1dddd4828/Dlecta-Dairy-Fresh-Cream.jpeg"
    }

];

const butterProducts = [

    {
        id: "butter-001",
        name: "Nandini Cooking Butter Unsalted",
        price: 323,
        mrp: 330,
        unit: "1 pack (500 g)",
        rating: 4.8,
        reviews: "7.0k",
        discount: "₹7OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cc8bef0a-c750-48da-80a2-d0ae278cc42e/Nandini-Cooking-Butter-Unsalted.jpeg"
    },

    {
        id: "butter-002",
        name: "Amul Unsalted Cooking Butter",
        price: 65,
        mrp: null,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "27.9k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/238198ac-e000-47e7-a0e4-3b0c3b98cb34/Amul-Unsalted-Cooking-Butter.jpeg"
    },

    {
        id: "butter-003",
        name: "Amul Garlic & Herbs Buttery Spread",
        price: 74,
        mrp: 75,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "46.6k",
        discount: "₹1OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d2ba7227-a1c2-4881-b613-dac4c8501e8e/Amul-Garlic-Herbs-Buttery-Spread.jpeg"
    },

    {
        id: "butter-004",
        name: "Nutralite Doodhshakti Probiotic Butter Spread",
        price: 290,
        mrp: 305,
        unit: "1 pack (500 g)",
        rating: 4.8,
        reviews: "2.7k",
        discount: "₹15OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4500-4500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a35446b7-dc5b-4c2b-b0cc-05c5b84d9490/Nutralite-Doodhshakti-Probiotic-Butter-Spread.jpg"
    },

    {
        id: "butter-005",
        name: "Nutralite Doodhshakti Probiotic Butter Spread Tub",
        price: 309,
        mrp: 325,
        unit: "1 pack (500 g)",
        rating: 4.7,
        reviews: "1.2k",
        discount: "₹16OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/da08e31d-4a7e-4ddf-9226-34decc29cb12/Nutralite-Doodhshakti-Probiotic-Butter-Spread-Tub.jpg"
    },

    {
        id: "butter-006",
        name: "Delicious Fat Spread - Cholesterol Free",
        price: 117,
        mrp: null,
        unit: "1 pack (500 g)",
        rating: 4.7,
        reviews: "42.6k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a7da26d1-33d9-4d69-8c41-7d614bf57ac9/Delicious-Fat-Spread-Cholesterol-Free.jpeg"
    },

    {
        id: "butter-007",
        name: "Milky Mist Cooking Butter Unsalted",
        price: 381,
        mrp: 400,
        unit: "1 pack (500 g)",
        rating: 4.7,
        reviews: "1.8k",
        discount: "₹19OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5acce062-beb2-4aa3-a8bc-d07b6752ee58/Milky-Mist-Cooking-Butter-Unsalted.jpeg"
    },

    {
        id: "butter-008",
        name: "Nandini Salted Butter",
        price: 70,
        mrp: null,
        unit: "100 g",
        rating: 4.6,
        reviews: "109",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/05160c55-20e6-4873-9023-76deb6ac5361/Nandini-Salted-Butter-.png"
    },

    {
        id: "butter-009",
        name: "Delicious Fat Spread - Cholesterol Free",
        price: 25,
        mrp: null,
        unit: "1 pack (100 g)",
        rating: 4.6,
        reviews: "92.6k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9a6ce510-2ce2-4760-bf45-3f09629d2471/Delicious-Fat-Spread-Cholesterol-Free.jpeg"
    },

    {
        id: "butter-010",
        name: "Milky Mist Cooking Butter Unsalted",
        price: 80,
        mrp: 85,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "11.6k",
        discount: "₹5OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3233a87c-f6dc-4aab-84ec-637d91cbcad9/Milky-Mist-Cooking-Butter-Unsalted.jpeg"
    },

    {
        id: "butter-011",
        name: "Milky Mist Table Butter",
        price: 83,
        mrp: 85,
        unit: "1 pack (100 g)",
        rating: 4.6,
        reviews: "2.7k",
        discount: "₹2OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d5ed3a6f-0f74-4135-bfdc-0f2876f79b3e/Milky-Mist-Table-Butter.jpeg"
    },

    {
        id: "butter-012",
        name: "Nutralite Doodhshakti Probiotic Butter Spread",
        price: 63,
        mrp: null,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "7.1k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5400-5400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1c0a82c6-6c88-46cb-bc54-144aebd7aa2e/Nutralite-Doodhshakti-Probiotic-Butter-Spread.jpg"
    },

    {
        id: "butter-013",
        name: "Nutralite Activ Plant Based Buttery Spread - Garlic & Herbs",
        price: 56,
        mrp: 97,
        unit: "1 pack (100 g)",
        rating: 4.4,
        reviews: "706",
        discount: "₹41OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f6593a15-86dc-4125-b4a1-d894440bea2b/Nutralite-Activ-Plant-Based-Buttery-Spread-Garlic-Herbs.jpeg"
    },

    {
        id: "butter-014",
        name: "Amul Butter Chiplet",
        price: 635,
        mrp: null,
        unit: "1 pack (50 x 20 g)",
        rating: 3.6,
        reviews: "234",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cf822ce2-2fa7-46e4-9ba9-2ea00d7e1902/Amul-Butter-Chiplet.jpeg"
    },

    {
        id: "butter-015",
        name: "Nutralite Activ Plant Based Buttery Spread - Olive",
        price: 76,
        mrp: 97,
        unit: "1 pack (100 g)",
        rating: 4.5,
        reviews: "668",
        discount: "₹21OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8d096165-27be-4ba5-9687-1648434ffd12/Nutralite-Activ-Plant-Based-Buttery-Spread-Olive.jpeg"
    },

    {
        id: "butter-016",
        name: "Nutralite Active Fat Spread Omega 3",
        price: 57,
        mrp: 62,
        unit: "1 pack (100 g)",
        rating: 4.6,
        reviews: "3.0k",
        discount: "₹5OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/474bd979-f513-4e87-841e-5fb9b784dcf2/Nutralite-Active-Fat-Spread-Omega-3.jpg"
    },

    {
        id: "butter-017",
        name: "Milky Mist Table Butter Tub",
        price: 156,
        mrp: 165,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "150",
        discount: "₹9OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cbc99615-b1c3-4cc8-b771-c92279c7647e/Milky-Mist-Table-Butter-Tub.jpeg"
    },

    {
        id: "butter-018",
        name: "Akshayakalpa Organic Unsalted Cooking Butter",
        price: 217,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "375",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f3aeee09-d3dc-47c7-8e9a-0ba1742d81f9/Akshayakalpa-Organic-Unsalted-Cooking-Butter.jpg"
    },

    {
        id: "butter-019",
        name: "Akshayakalpa Organic Salted Table Butter",
        price: 217,
        mrp: 227,
        unit: "1 pack (200 g)",
        rating: 4.0,
        reviews: "168",
        discount: "₹10OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e27bbf74-950d-41e9-9e77-2aa0a8bdf55c/Akshayakalpa-Organic-Salted-Table-Butter.jpg"
    },

    {
        id: "butter-020",
        name: "Amul Safed Makkhan",
        price: 70,
        mrp: null,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "7.7k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b9b5e430-c1d5-4c73-b993-d5e88b1f87d6/Amul-Safed-Makkhan.jpg"
    },

    {
        id: "butter-021",
        name: "Nutralite Yummy Spread | Low Cholesterol",
        price: 130,
        mrp: 145,
        unit: "1 pack (500 g)",
        rating: 4.6,
        reviews: "380",
        discount: "₹15OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4500-4500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0cba7627-c6b1-4108-8845-78025b94999c/Nutralite-Yummy-Spread-Low-Cholesterol.jpeg"
    },

    {
        id: "butter-022",
        name: "Amul Salted Butter",
        price: 63,
        mrp: null,
        unit: "1 pack (100 g)",
        rating: 4.8,
        reviews: "825.3k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e15c0b10-0367-4675-a5ab-6da2abf9bee1/Amul-Salted-Butter.jpeg"
    },

    {
        id: "butter-023",
        name: "Amul Salted Butter",
        price: 310,
        mrp: null,
        unit: "1 pack (500 g)",
        rating: 4.7,
        reviews: "149.6k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/229b297f-d894-457d-9c8b-34aa86df6b88/Amul-Salted-Butter.jpeg"
    },

    {
        id: "butter-024",
        name: "Amul Salted Butter (Chiplets)",
        price: 80,
        mrp: null,
        unit: "1 pack (10 x 10 g)",
        rating: 4.9,
        reviews: "98.7k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bc145179-e4da-45db-a10c-7c19dff04176/Amul-Salted-Butter-Chiplets-.jpeg"
    },

    {
        id: "butter-025",
        name: "Nandini Table Butter Salted (Carton)",
        price: 310,
        mrp: null,
        unit: "1 pack (500 g)",
        rating: 5.0,
        reviews: "637",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/67852270-e3eb-42fb-ba57-eb02b223115a/Nandini-Table-Butter-Salted-Carton-.jpg"
    },

    {
        id: "butter-026",
        name: "Amul Salted Butter",
        price: 130,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.8,
        reviews: "107.9k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a9d3d8d2-ffe9-48d9-90dd-c76defed76dd/Amul-Salted-Butter.jpeg"
    },

    {
        id: "butter-027",
        name: "Amul Unsalted Cooking Butter",
        price: 320,
        mrp: null,
        unit: "1 pack (500 g)",
        rating: 4.7,
        reviews: "9.4k",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9803afd6-4c0e-4e79-b255-4937a303d97f/Amul-Unsalted-Cooking-Butter.jpeg"
    },

    {
        id: "butter-028",
        name: "Heritage Table Butter",
        price: 52,
        mrp: 62,
        unit: "1 pack (100 g)",
        rating: 4.9,
        reviews: "2.4k",
        discount: "₹10OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3508-3508,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c7773daa-1eca-445e-abb8-691c507721d1/Heritage-Table-Butter.jpg"
    },

    {
        id: "butter-029",
        name: "Milky Mist Butter Chiplet",
        price: 81,
        mrp: 90,
        unit: "1 pack (10 x 10 g)",
        rating: 4.7,
        reviews: "3.5k",
        discount: "₹9OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7d87c6fd-c971-4b6b-91e7-a3a9892f6f1a/Milky-Mist-Butter-Chiplet.png"
    },

    {
        id: "butter-030",
        name: "Nandini Unsalted Butter",
        price: 135,
        mrp: null,
        unit: "200 g",
        rating: 4.8,
        reviews: "285",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0a755b2e-850e-4f11-bd9f-3f664a14b8c7/Nandini-Unsalted-Butter-.jpeg"
    },

    {
        id: "butter-031",
        name: "Akshayakalpa Organic Unsalted Cooking Butter",
        price: 105,
        mrp: 114,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "406",
        discount: "₹9OFF",
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1df4a574-e884-4c74-a061-f708a2d5572a/Akshayakalpa-Organic-Unsalted-Cooking-Butter.jpg"
    },

    {
        id: "butter-032",
        name: "Akshayakalpa Organic Salted Table Butter",
        price: 118,
        mrp: null,
        unit: "1 pack (100 g)",
        rating: 4.5,
        reviews: "119",
        discount: null,
        category: "Butter",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5c274a7d-7d40-468e-b8f7-261013ea55bb/Akshayakalpa-Organic-Salted-Table-Butter.jpg"
    }

];

const cheeseProducts = [

    {
        id: "cheese-001",
        name: "Amul Cheese Slices",
        price: 137,
        mrp: 145,
        unit: "1 pack (200 g)",
        rating: 4.8,
        reviews: "57.6k",
        discount: 8,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/263afa34-4a15-4e5d-b891-d3126b1b3019/Amul-Cheese-Slices.jpeg"
    },

    {
        id: "cheese-002",
        name: "Milky Mist Cheese- Slices",
        price: 124,
        mrp: 165,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "13.7k",
        discount: 41,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d4b7222b-1b8e-43f6-a79d-c4163297812b/Milky-Mist-Cheese-Slices.jpeg"
    },

    {
        id: "cheese-003",
        name: "Amul Diced Cheese Blend",
        price: 122,
        mrp: 125,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "126.8k",
        discount: 3,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f913a533-609f-4f95-bdd1-eb28f8a6b49c/Amul-Diced-Cheese-Blend.jpeg"
    },

    {
        id: "cheese-004",
        name: "Amul Processed Cheese Cubes",
        price: 128,
        mrp: 135,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "92.2k",
        discount: 7,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e5a4d2d8-29fb-48a3-b922-4a410de75143/Amul-Processed-Cheese-Cubes.jpeg"
    },

    {
        id: "cheese-005",
        name: "Go Cheese Slices",
        price: 98,
        mrp: 160,
        unit: "1 pack (200 g)",
        rating: 4.9,
        reviews: "38.3k",
        discount: 62,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dc94ead5-16ea-4786-8404-1371dc1c8912/Go-Cheese-Slices.jpg"
    },

    {
        id: "cheese-006",
        name: "Dlecta Pure Mozzarella Shreds Cheese",
        price: 101,
        mrp: 119,
        unit: "1 pack (140 g)",
        rating: 4.6,
        reviews: "37.3k",
        discount: 18,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4620c00f-471a-4ebe-8ca7-3327aa4dd048/Dlecta-Pure-Mozzarella-Shreds-Cheese.jpeg"
    },

    {
        id: "cheese-007",
        name: "Kodai Cheese - Parmesan Cheese",
        price: 368,
        mrp: 490,
        unit: "1 pack (200 g)",
        rating: 4.0,
        reviews: "31",
        discount: 122,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-375-499,pr-true,f-auto,q-40,dpr-2/inventory/product/0da18d83-5a1f-4d7b-a797-e0f589c5ace2-3778c421-4dea-4dd5-833f-ef5fdbdd832d/Kodai-Cheese-Parmesan-Cheese.jpeg"
    },

    {
        id: "cheese-008",
        name: "Akshayakalpa Organic Artisanal Mild Cheddar Cheese 200 Gms",
        price: 329,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 3.8,
        reviews: "86",
        discount: 0,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7b57d0f1-65ce-4286-838c-305ae612a555/Akshayakalpa-Organic-Artisanal-Mild-Cheddar-Cheese-200-Gms.jpg"
    },

    {
        id: "cheese-009",
        name: "Nutoras Cheese Smoked Cheddar | Smoky, Sharp, Rich",
        price: 257,
        mrp: 265,
        unit: "1 pack (200 g)",
        rating: null,
        reviews: null,
        discount: 8,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f5ab6a54-9a4c-4524-bed7-0f611bd242f4/Nutoras-Cheese-Smoked-Cheddar-Smoky-Sharp-Rich.png"
    },

    {
        id: "cheese-010",
        name: "Dlecta Real Cheddar Cheese Slices",
        price: 208,
        mrp: 219,
        unit: "1 pack (200 g)",
        rating: 4.3,
        reviews: "2.1k",
        discount: 11,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/de911d2f-48e2-4a7f-932e-e2bd36d38a0c/Dlecta-Real-Cheddar-Cheese-Slices.jpeg"
    },

    {
        id: "cheese-011",
        name: "Dlecta Cheese Slices",
        price: 119,
        mrp: 189,
        unit: "1 pack (200 g)",
        rating: 4.9,
        reviews: "28.8k",
        discount: 70,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d0300ae5-923e-441c-a396-4bfe165db49c/Dlecta-Cheese-Slices.png"
    },

    {
        id: "cheese-012",
        name: "Milky Mist Cheese- Slices",
        price: 71,
        mrp: 90,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "19.2k",
        discount: 19,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/97cb9c70-79d6-4eec-bc5c-70e6e39706fa/Milky-Mist-Cheese-Slices.jpeg"
    },

    {
        id: "cheese-013",
        name: "AMEZO Parmesan Cheese",
        price: 495,
        mrp: 550,
        unit: "1 pack (200 g)",
        rating: 3.9,
        reviews: "59",
        discount: 55,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1375-1375,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9cd42c14-f080-4eeb-b9f1-26b21979b20e/AMEZO-Parmesan-Cheese.jpeg"
    },

    {
        id: "cheese-014",
        name: "Amul Cheese Slices",
        price: 82,
        mrp: null,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "87.7k",
        discount: 0,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bb505416-f814-4270-b756-2fadcc289816/Amul-Cheese-Slices.jpeg"
    },

    {
        id: "cheese-015",
        name: "Kodai Cheese - Feta",
        price: 340,
        mrp: 380,
        unit: "1 pack (200 g)",
        rating: null,
        reviews: null,
        discount: 40,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2048-2048,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8becce22-921c-4111-8420-aa49dc28f32c/Kodai-Cheese-Feta.png"
    },

    {
        id: "cheese-016",
        name: "Amul Processed Cheese Block",
        price: 128,
        mrp: 129,
        unit: "1 pack (200 g)",
        rating: 4.8,
        reviews: "65.2k",
        discount: 1,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/458eaddf-af1d-4255-aa6f-10ca177f2331/Amul-Processed-Cheese-Block.jpeg"
    },

    {
        id: "cheese-017",
        name: "Milky Mist Mozzarella Diced Pizza Cheese",
        price: 125,
        mrp: 160,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "2.7k",
        discount: 35,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f4f3ccf6-56c2-4dd7-9932-da756835c69a/Milky-Mist-Mozzarella-Diced-Pizza-Cheese.jpeg"
    },

    {
        id: "cheese-018",
        name: "Dlecta Pure Mozzarella Cheese Pizza Block",
        price: 120,
        mrp: 169,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "34.4k",
        discount: 49,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/40e60300-664c-4045-8944-32b22028f24f/Dlecta-Pure-Mozzarella-Cheese-Pizza-Block.jpeg"
    },

    {
        id: "cheese-019",
        name: "Kodai - Goat Cheese",
        price: 420,
        mrp: 470,
        unit: "1 pack (200 g)",
        rating: null,
        reviews: null,
        discount: 50,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e9dc5e50-99e7-489c-8a2f-b2fffe890a22/Kodai-Goat-Cheese.jpg"
    },

    {
        id: "cheese-020",
        name: "Kodai Cheese - Gouda",
        price: 350,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: null,
        reviews: null,
        discount: 0,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d0599d2a-6ef9-4bb4-9685-37155bc358d9/Kodai-Cheese-Gouda.jpg"
    },

    {
        id: "cheese-021",
        name: "Heritage Cheese Slices",
        price: 124,
        mrp: 145,
        unit: "1 pack (200 g)",
        rating: 4.8,
        reviews: "2.0k",
        discount: 21,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/26646600-7928-49b9-8907-159f52bc96fe/Heritage-Cheese-Slices.jpg"
    },

    {
        id: "cheese-022",
        name: "Kodai Cheese - Cheddar",
        price: 350,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: null,
        reviews: null,
        discount: 0,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3072-3072,pr-true,f-auto,q-40,dpr-2/cms/product_variant/75063b5a-154c-4888-ba0a-ca255870ac4b/Kodai-Cheese-Cheddar.jpg"
    },

    {
        id: "cheese-023",
        name: "Amul Cheese Spread Yummy Plain",
        price: 108,
        mrp: 115,
        unit: "1 pc (200 g)",
        rating: 4.7,
        reviews: "18.4k",
        discount: 7,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/93b5df20-2fb1-4181-a1be-62ca07465fce/Amul-Cheese-Spread-Yummy-Plain.jpeg"
    },

    {
        id: "cheese-024",
        name: "Dlecta Cream Cheese",
        price: 189,
        mrp: null,
        unit: "1 pc (150 g)",
        rating: 4.5,
        reviews: "4.5k",
        discount: 0,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b567d569-46ed-417b-a16e-2ee952e2ccb2/Dlecta-Cream-Cheese.jpeg"
    },

    {
        id: "cheese-025",
        name: "Milky Mist High Protein Cheddar Cheese",
        price: 157,
        mrp: 230,
        unit: "1 pack (200 g)",
        rating: 4.4,
        reviews: "175",
        discount: 73,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/61dfbd27-de59-4238-bf4d-c894eb507639/Milky-Mist-High-Protein-Cheddar-Cheese.jpeg"
    },

    {
        id: "cheese-026",
        name: "Kodai Cheese - Stirred Curd Mozzarella",
        price: 316,
        mrp: 375,
        unit: "1 pack (200 g)",
        rating: null,
        reviews: null,
        discount: 59,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/aebaa72e-6068-45ad-92c7-2a86442559bf/Kodai-Cheese-Stirred-Curd-Mozzarella.jpg"
    },

    {
        id: "cheese-027",
        name: "Amul Pizza Cheese Mozzarella Diced",
        price: 511,
        mrp: 550,
        unit: "1 pack (1 kg)",
        rating: 4.7,
        reviews: "2.8k",
        discount: 39,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e10d2787-96d0-4945-9b8d-7f76cc48b113/Amul-Pizza-Cheese-Mozzarella-Diced.jpeg"
    },

    {
        id: "cheese-028",
        name: "AMEZO Edam Cheese",
        price: 475,
        mrp: 550,
        unit: "1 pack (200 g)",
        rating: null,
        reviews: null,
        discount: 75,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1375-1375,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b0c48033-99a9-43a0-aef2-ee50f07fb310/AMEZO-Edam-Cheese.jpeg"
    },

    {
        id: "cheese-029",
        name: "Go Cheese Pizza Blend (Mozzarella + Cheddar)",
        price: 119,
        mrp: 159,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "23.3k",
        discount: 40,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1490-1497,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f3f5af40-dd94-4f5b-8b19-9c272c846978/Go-Cheese-Pizza-Blend-Mozzarella-Cheddar-.jpg"
    },

    {
        id: "cheese-030",
        name: "Dlecta Chilli Cheese Slices | Pack Of 10",
        price: 129,
        mrp: 179,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "1.8k",
        discount: 50,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/031e9030-d51a-4037-ac5c-3d9a7a676faa/Dlecta-Chilli-Cheese-Slices-Pack-Of-10.jpeg"
    },

    {
        id: "cheese-031",
        name: "Britannia Cheese Slice",
        price: 130,
        mrp: 150,
        unit: "1 Pack (180 g)",
        rating: 4.7,
        reviews: "5.9k",
        discount: 20,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1082-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/caeb5711-4648-43c1-b83c-a051c3fb0c2e/Britannia-Cheese-Slice.jpg"
    },

    {
        id: "cheese-032",
        name: "Nandini Processed Cheese- Slices",
        price: 135,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "381",
        discount: 0,
        category: "Cheese",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1254-1254,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d9d4e8f8-12b7-4863-b81b-52b95be57b4b/Nandini-Processed-Cheese-Slices.png"
    }


];


const indianBreadsProducts = [

    {
        id: "indian-bread-001",
        name: "iD Fresh Protein-Rich Chapati 1.0 Piece",
        price: 99,
        mrp: 100,
        unit: "1 pack (8 pcs)",
        rating: 3.8,
        reviews: "2.0k",
        discount: "₹1OFF",
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2050-2050,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2e42f72b-a825-4cca-a4a8-b630571e48ca/iD-Fresh-Protein-Rich-Chapati-1-0-Piece.jpeg"
    },

    {
        id: "indian-bread-002",
        name: "The Baker's Dozen Zero Maida Chapati | Ready to Eat | Ready to Cook | Wheat Roti | Clean Label",
        price: 50,
        mrp: 55,
        unit: "1 pack (6pcs)",
        rating: 4.2,
        reviews: "4.3k",
        discount: "₹5OFF",
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/54c4a13f-3e84-44b3-b3f0-f394533b3ddf/The-Baker-s-Dozen-Zero-Maida-Chapati-Ready-to-Eat-Ready-to-Cook-Wheat-Roti-Clean-Label.jpg"
    },

    {
        id: "indian-bread-003",
        name: "Aashirvaad Chapati made from Atta | No Added Preservatives",
        price: 65,
        mrp: 77,
        unit: "1 pack (400 g)",
        rating: 4.5,
        reviews: "6.0k",
        discount: "₹12OFF",
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/487f08cf-cc40-458f-985a-3f4483ed9c30/Aashirvaad-Chapati-made-from-Atta-No-Added-Preservatives.jpg"
    },

    {
        id: "indian-bread-004",
        name: "iD Whole Wheat Chapati",
        price: 49,
        mrp: null,
        unit: "1 pack (6 pcs)",
        rating: 4.3,
        reviews: "1.8k",
        discount: null,
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4e1b6349-0e04-4899-b9dc-a7c40f3a8d9f/iD-Whole-Wheat-Chapati.jpg"
    },

    {
        id: "indian-bread-005",
        name: "iD Malabar Parota",
        price: 49,
        mrp: null,
        unit: "1 pack (2 pcs)",
        rating: 4.4,
        reviews: "4.7k",
        discount: null,
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1081-1081,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a83413c4-d62f-4f1b-b3c8-82d9b18095d9/iD-Malabar-Parota.jpg"
    },

    {
        id: "indian-bread-006",
        name: "The Baker's Dozen Malabar Parota Zero Palm Oil | Ready To Eat | Ready To Cook | Wheat Paratha",
        price: 59,
        mrp: 65,
        unit: "1 pack (3 x 70 g)",
        rating: 4.0,
        reviews: "3.0k",
        discount: "₹6OFF",
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7e6aea88-d0b0-4ebd-9e64-304b962e792d/The-Baker-s-Dozen-Malabar-Parota-Zero-Palm-Oil-Ready-To-Eat-Ready-To-Cook-Wheat-Paratha.jpg"
    },

    {
        id: "indian-bread-007",
        name: "iD Wheat Laccha Parota",
        price: 49,
        mrp: null,
        unit: "1 pack (2 pcs)",
        rating: 4.3,
        reviews: "1.7k",
        discount: null,
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1081-1081,pr-true,f-auto,q-40,dpr-2/cms/product_variant/03a28d71-3aae-497c-99ca-b1d211fbcd49/iD-Wheat-Laccha-Parota.jpg"
    },

    {
        id: "indian-bread-008",
        name: "English Oven Kulcha Bread",
        price: 40,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "4.2k",
        discount: null,
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bbd0d62f-9973-4a4d-888b-00a146eed0b8/English-Oven-Kulcha-Bread.jpeg"
    },

    {
        id: "indian-bread-009",
        name: "iD Fresh Mini Malabar Parota",
        price: 94,
        mrp: 110,
        unit: "1 pack (10 x 40 g)",
        rating: 4.5,
        reviews: "645",
        discount: "₹16OFF",
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5f918c95-b58f-4fc4-8fc6-553af8676252/iD-Fresh-Mini-Malabar-Parota.jpg"
    },

    {
        id: "indian-bread-010",
        name: "The Health Factory Kulcha Bread | Zero Maida | Whole Wheat Bread",
        price: 55,
        mrp: null,
        unit: "1 pack (210 g)",
        rating: 4.2,
        reviews: "2.6k",
        discount: null,
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/12d94c82-85e0-4858-9bd8-f3df9e58bc08/The-Health-Factory-Kulcha-Bread-Zero-Maida-Whole-Wheat-Bread.jpg"
    },

    {
        id: "indian-bread-011",
        name: "The Baker's Dozen Zero Maida Protein Chapati",
        price: 46,
        mrp: 65,
        unit: "1 pack (140 g)",
        rating: 2.2,
        reviews: "169",
        discount: "₹19OFF",
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/40b3d809-98fd-40f1-92a4-545892b24232/The-Baker-s-Dozen-Zero-Maida-Protein-Chapati.jpg"
    },

    {
        id: "indian-bread-012",
        name: "Britannia Kulcha",
        price: 45,
        mrp: null,
        unit: "1 pack (200 g)",
        rating: 4.4,
        reviews: "1.7k",
        discount: null,
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e9651e71-56a1-49cb-8472-f32b41bda233/Britannia-Kulcha.jpg"
    },

    {
        id: "indian-bread-013",
        name: "Ammamma's Methi Chapati",
        price: 84,
        mrp: 94,
        unit: "1 pack (10 pcs)",
        rating: 4.3,
        reviews: "5.8k",
        discount: "₹10OFF",
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/tr:w-0.98,h-0.98,f-auto/cms/product_variant/0750f084-d9dd-4fba-8ce1-7355188959dd.jpeg"
    },

    {
        id: "indian-bread-014",
        name: "Modern Whole Wheat Parota",
        price: 99,
        mrp: null,
        unit: "1 pack (425 g)",
        rating: 4.1,
        reviews: "22",
        discount: null,
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1931c83a-3baf-4c98-b7f5-f78b7406e592/Modern-Whole-Wheat-Parota.jpeg"
    },

    {
        id: "indian-bread-015",
        name: "Britannia Atta Kulcha Bread (5 pcs)",
        price: 45,
        mrp: null,
        unit: "1 pack (250 g)",
        rating: 4.5,
        reviews: "10.7k",
        discount: null,
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9eecc8d1-46d7-4c91-81da-5225c6f43bca/Britannia-Atta-Kulcha-Bread-5-pcs-.jpeg"
    },

    {
        id: "indian-bread-016",
        name: "Modern Classic Malabar Parota",
        price: 84,
        mrp: 90,
        unit: "1 pack (425 g)",
        rating: null,
        reviews: null,
        discount: "₹6OFF",
        category: "Indian Breads",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5f2e0922-a36c-49e4-aa88-f60dd0b02687/Modern-Classic-Malabar-Parota.jpeg"
    }


];

const veganDrinkProducts = [

    {
        id: "vegan-001",
        name: "Sofit Chocolate Soy Milk",
        price: 138,
        mrp: 155,
        unit: "1 pc (1 L)",
        rating: 4.3,
        reviews: "3.0k",
        discount: 17,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0ac9c848-54d7-414d-b498-cbe2e7f6cfd2/Sofit-Chocolate-Soy-Milk.jpg"
    },

    {
        id: "vegan-002",
        name: "Sofit Soya Milk Drink",
        price: 138,
        mrp: 155,
        unit: "1 pc (1 L)",
        rating: 4.3,
        reviews: "2.9k",
        discount: 17,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a9d4e05e-fcf2-44e6-9021-683f4f89e36a/Sofit-Soya-Milk-Drink.jpg"
    },

    {
        id: "vegan-003",
        name: "RAW Pressery Almond Bevarage Plain (Unsweetened) Lactose Free Vegan Drink",
        price: 246,
        mrp: 289,
        unit: "1 pc (1 L)",
        rating: 4.1,
        reviews: "1.7k",
        discount: 43,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f60910c1-a2c7-483c-8406-6064418c3db9/RAW-Pressery-Almond-Bevarage-Plain-Unsweetened-Lactose-Free-Vegan-Drink.jpg"
    },

    {
        id: "vegan-004",
        name: "So Good High Protein Soy Plant Based Beverage - 1 L",
        price: 123,
        mrp: 165,
        unit: "1 pc (1 L)",
        rating: 4.3,
        reviews: "1.8k",
        discount: 42,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/861e8a45-b20a-4720-af34-4fd54da151fa/So-Good-High-Protein-Soy-Plant-Based-Beverage-1-L.jpeg"
    },

    {
        id: "vegan-005",
        name: "Alt Co. Oat Drink",
        price: 237,
        mrp: 266,
        unit: "1 pc (1 L)",
        rating: 4.0,
        reviews: "2.2k",
        discount: 29,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-9920-9920,pr-true,f-auto,q-40,dpr-2/cms/product_variant/26dc4d79-97b1-4796-8d2b-88060add98c3/Alt-Co-Oat-Drink.jpeg"
    },

    {
        id: "vegan-006",
        name: "Alt Co. Almond Milk",
        price: 226,
        mrp: 266,
        unit: "1 pc (1 L)",
        rating: 4.0,
        reviews: "1.3k",
        discount: 40,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b02171d7-22f4-4904-abbb-8f167f3d7e22/Alt-Co-Almond-Milk.jpeg"
    },

    {
        id: "vegan-007",
        name: "So Good Plant Based Almond Milk",
        price: 235,
        mrp: 275,
        unit: "1 pc (1 L)",
        rating: 4.3,
        reviews: "1.8k",
        discount: 40,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-900-900,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1a781ca6-e969-4cc8-bfbc-bd45c0dac43b/So-Good-Plant-Based-Almond-Milk.jpeg"
    },

    {
        id: "vegan-008",
        name: "So Good Plant Based Soy Beverage",
        price: 138,
        mrp: 145,
        unit: "1 pc (1 L)",
        rating: 4.3,
        reviews: "2.1k",
        discount: 7,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/520f412e-0a0a-435c-9a27-f400be614fa6/So-Good-Plant-Based-Soy-Beverage.jpeg"
    },

    {
        id: "vegan-009",
        name: "Sofit Kesar Pista Soy Milk",
        price: 138,
        mrp: 155,
        unit: "1 pc (1 L)",
        rating: 4.4,
        reviews: "1.0k",
        discount: 17,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/834b443e-1b84-43c0-a8b0-469af7f7da47/Sofit-Kesar-Pista-Soy-Milk.jpg"
    },

    {
        id: "vegan-010",
        name: "Sofit Unsweetened Almond Milk Drink",
        price: 199,
        mrp: 299,
        unit: "1 pc (1 L)",
        rating: 4.1,
        reviews: "942",
        discount: 100,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7fa38dd8-3b4d-4c85-90e1-b5e10e32514e/Sofit-Unsweetened-Almond-Milk-Drink.jpg"
    },

    {
        id: "vegan-011",
        name: "RAW Pressery Almond Bevarage Cacao Chocolate Flavoured Almond Drink Lactose Free Vegan Drink",
        price: 247,
        mrp: 289,
        unit: "1 pc (1 L)",
        rating: 3.5,
        reviews: "370",
        discount: 42,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ac022412-70d8-4539-b7d0-352ab17b5106/RAW-Pressery-Almond-Bevarage-Cacao-Chocolate-Flavoured-Almond-Drink-Lactose-Free-Vegan-Drink.jpg"
    },

    {
        id: "vegan-012",
        name: "137 Degrees Imported Almond Milk Unsweetened",
        price: 475,
        mrp: null,
        unit: "1 pc (1 L)",
        rating: 4.5,
        reviews: "23",
        discount: 0,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/658ce871-ef98-4624-86ed-c4d55cf3136c/137-Degrees-Imported-Almond-Milk-Unsweetened.jpeg"
    },

    {
        id: "vegan-013",
        name: "So Good High Protein Almond Plant Based Beverage",
        price: 234,
        mrp: 300,
        unit: "1 pc (1 L)",
        rating: 3.8,
        reviews: "60",
        discount: 66,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/309bd5c1-af83-4d24-a6ee-00b34b94dc94/So-Good-High-Protein-Almond-Plant-Based-Beverage.jpg"
    },

    {
        id: "vegan-014",
        name: "So Good Regular Oat Milk",
        price: 235,
        mrp: 275,
        unit: "1 pc (1 L)",
        rating: 4.1,
        reviews: "902",
        discount: 40,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/744a51d6-763d-4a22-a2c5-fa91d66f41bd/So-Good-Regular-Oat-Milk.jpeg"
    },

    {
        id: "vegan-015",
        name: "Only Earth Organic Oats Unsweetened Beverage",
        price: 229,
        mrp: 279,
        unit: "1 pc (1 L)",
        rating: 4.5,
        reviews: "556",
        discount: 50,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0a58d011-0577-408c-a5fc-14cbba7dd03e/Only-Earth-Organic-Oats-Unsweetened-Beverage.jpeg"
    },

    {
        id: "vegan-016",
        name: "Bagrry's Almond Milk",
        price: 219,
        mrp: 311,
        unit: "1 pc (1 L)",
        rating: 3.9,
        reviews: "69",
        discount: 92,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/95fb2ef2-5c1d-4cfe-8b38-c29375507bfb/Bagrry-s-Almond-Milk.jpeg"
    },

    {
        id: "vegan-017",
        name: "Bagrry's Oats And Nut Drink Vegan No Added Sugar",
        price: 265,
        mrp: 350,
        unit: "1 pc (1 L)",
        rating: 3.4,
        reviews: "28",
        discount: 85,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/eb74227e-46d3-4221-9d71-166389cae0f2/Bagrry-s-Oats-And-Nut-Drink-Vegan-No-Added-Sugar.jpeg"
    },

    {
        id: "vegan-018",
        name: "Bagrry's Plant Based Oat Drink",
        price: 226,
        mrp: 311,
        unit: "1 pc (1 L)",
        rating: 2.8,
        reviews: "65",
        discount: 85,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/80201080-2cba-4aef-8a68-64893167cf78/Bagrry-s-Plant-Based-Oat-Drink.jpeg"
    },

    {
        id: "vegan-019",
        name: "So Good High Protein Oat Plant based Beverage",
        price: 240,
        mrp: 300,
        unit: "1 pc (1 L)",
        rating: null,
        reviews: null,
        discount: 60,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4a5bbda3-65ad-465c-badb-94dd7f28692f/So-Good-High-Protein-Oat-Plant-based-Beverage.jpeg"
    },

    {
        id: "vegan-020",
        name: "Sofit Vanilla Soy Milk",
        price: 37,
        mrp: 40,
        unit: "1 pc (180 ml)",
        rating: 4.7,
        reviews: "2.2k",
        discount: 3,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a0ef72f5-f123-4ef9-abf6-6e325a55feec/Sofit-Vanilla-Soy-Milk.jpg"
    },

    {
        id: "vegan-021",
        name: "So Good Caramel Oat Drink",
        price: 246,
        mrp: 267,
        unit: "1 pc (1 L)",
        rating: 4.2,
        reviews: "167",
        discount: 21,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8757ba1a-1679-4e98-b41e-9d8c24b3be79/So-Good-Caramel-Oat-Drink.jpg"
    },

    {
        id: "vegan-022",
        name: "Sofit Soya Milk Drink",
        price: 37,
        mrp: 40,
        unit: "1 pc (180 ml or 190 ml)",
        rating: 4.7,
        reviews: "2.5k",
        discount: 3,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0e4bd953-15e2-487f-841f-7da668e38066/Sofit-Soya-Milk-Drink.jpg"
    },

    {
        id: "vegan-023",
        name: "So Good Almond Milk",
        price: 70,
        mrp: null,
        unit: "1 pc (200 ml)",
        rating: 4.5,
        reviews: "3.0k",
        discount: 0,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8e893d4e-da86-4130-bd54-ee18940dbe95/So-Good-Almond-Milk.jpeg"
    },

    {
        id: "vegan-024",
        name: "Sofit Chocolate Soya Milk",
        price: 37,
        mrp: 40,
        unit: "1 pc (180 ml or 190 ml)",
        rating: 4.6,
        reviews: "3.1k",
        discount: 3,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fdab149e-cb4b-4a0b-ab82-c390c9b4b734/Sofit-Chocolate-Soya-Milk.jpg"
    },

    {
        id: "vegan-025",
        name: "So Good Vanilla Almond Milk",
        price: 70,
        mrp: null,
        unit: "1 pc (200 ml)",
        rating: 4.3,
        reviews: "1.2k",
        discount: 0,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/faf12541-0e73-4a77-be9e-c593e7190ba4/So-Good-Vanilla-Almond-Milk.jpeg"
    },

    {
        id: "vegan-026",
        name: "Sofit Unsweetened Almond Milk",
        price: 80,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.2,
        reviews: "569",
        discount: 0,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/af586bdc-03f2-4b36-84aa-4f0ec66aece5/Sofit-Unsweetened-Almond-Milk.jpg"
    },

    {
        id: "vegan-027",
        name: "So Good Plant Based Oat Beverage",
        price: 67,
        mrp: null,
        unit: "1 pc (200 ml)",
        rating: 4.4,
        reviews: "343",
        discount: 0,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e9b9b8e7-53b4-4021-8e68-3082ef67f6d2/So-Good-Plant-Based-Oat-Beverage.jpeg"
    },

    {
        id: "vegan-028",
        name: "So Good Caramel Oat Milk",
        price: 67,
        mrp: null,
        unit: "1 pc (200 ml)",
        rating: 4.3,
        reviews: "107",
        discount: 0,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/762d0bc1-092f-4940-b9f3-158b4d96125e/So-Good-Caramel-Oat-Milk.jpeg"
    },

    {
        id: "vegan-029",
        name: "Only Earth Organic Coconut Drink",
        price: 196,
        mrp: 279,
        unit: "1 pc (1 L)",
        rating: 3.9,
        reviews: "403",
        discount: 83,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/86e85ad0-01e9-4b38-bb4e-ee28f193fe4e/Only-Earth-Organic-Coconut-Drink.jpeg"
    },

    {
        id: "vegan-030",
        name: "So Good Vanilla Almond Milk",
        price: 267,
        mrp: null,
        unit: "1 pc (1 L)",
        rating: 3.9,
        reviews: "487",
        discount: 0,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8475ae5c-abec-4f99-9372-5432335768eb/So-Good-Vanilla-Almond-Milk.jpeg"
    },

    {
        id: "vegan-031",
        name: "Alt Co. Oat Milk",
        price: 66,
        mrp: 69,
        unit: "1 pc (180 ml)",
        rating: 4.5,
        reviews: "2.4k",
        discount: 3,
        category: "Vegan Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8d726c18-35de-4548-acfd-e6ebd481a9f3/Alt-Co-Oat-Milk.jpeg"
    }


];

const milkDrinksProducts = [

    {
        id: "milk-001",
        name: "Amul Protein Shake Blueberry",
        price: 59,
        mrp: 60,
        unit: "1 pc (200 ml)",
        rating: 4.6,
        reviews: "7.8k",
        discount: 1,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bfcf3049-0f61-4f8f-b89a-ebb0b8658612/Amul-Protein-Shake-Blueberry.jpeg"
    },

    {
        id: "milk-002",
        name: "Amul Masti Spiced Buttermilk",
        price: 15,
        mrp: null,
        unit: "1 pc (200 ml)",
        rating: 4.8,
        reviews: "177.9k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ac60106a-46a2-45d3-8ee4-4ab67aad41cd/Amul-Masti-Spiced-Buttermilk.jpeg"
    },

    {
        id: "milk-003",
        name: "Smoodh Chocolate Milk Drink | Pet",
        price: 17,
        mrp: 20,
        unit: "1 pc (150 ml or 180 ml)",
        rating: 4.6,
        reviews: "48.7k",
        discount: 3,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1024-1024,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3116691f-1b11-4aa6-8549-d9d5838b7590/Smoodh-Chocolate-Milk-Drink-Pet.jpeg"
    },

    {
        id: "milk-004",
        name: "Cavin's Vanilla Milkshake, Rich & Creamy",
        price: 40,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.6,
        reviews: "17.0k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7803a874-d62f-4bc4-b24c-90b5ad16eff6/Cavin-s-Vanilla-Milkshake-Rich-Creamy.jpeg"
    },

    {
        id: "milk-005",
        name: "Cavin's Chocolate Milkshake, Rich & Creamy",
        price: 40,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.8,
        reviews: "24.3k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ad95c1be-74ea-4370-99c3-fbdf58b72a15/Cavin-s-Chocolate-Milkshake-Rich-Creamy.jpeg"
    },

    {
        id: "milk-006",
        name: "Cavin's Belgian Chocolate Milkshake",
        price: 40,
        mrp: null,
        unit: "1 pack (170 ml)",
        rating: 4.5,
        reviews: "5.3k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b3f81a5b-d83c-48e0-be6e-c5d76a4a37ee/Cavin-s-Belgian-Chocolate-Milkshake.jpeg"
    },

    {
        id: "milk-007",
        name: "Cavin's Strawberry Milkshake, Rich & Creamy",
        price: 40,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.6,
        reviews: "16.5k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b45f7f03-f64a-41af-afc9-dfc6e6a01470/Cavin-s-Strawberry-Milkshake-Rich-Creamy.jpeg"
    },

    {
        id: "milk-008",
        name: "Smoodh Chocolate and Hazelnut Milk Drink",
        price: 17,
        mrp: 20,
        unit: "1 pc (150 ml)",
        rating: 4.8,
        reviews: "21.5k",
        discount: 3,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3125-3125,pr-true,f-auto,q-40,dpr-2/cms/product_variant/51ccb6f1-e7fa-47e8-8f4c-648834bdca6e/Smoodh-Chocolate-and-Hazelnut-Milk-Drink.jpeg"
    },

    {
        id: "milk-009",
        name: "Cavin's Badam Milkshake | Rich Almond Flavour, Ready to Drink",
        price: 51,
        mrp: 60,
        unit: "1 pc (170 ml)",
        rating: 4.5,
        reviews: "4.0k",
        discount: 9,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d960c5d4-7a1a-4fd0-a711-65f11db2103e/Cavin-s-Badam-Milkshake-Rich-Almond-Flavour-Ready-to-Drink.jpeg"
    },

    {
        id: "milk-010",
        name: "Hershey's Chocolate Milkshake",
        price: 37,
        mrp: 40,
        unit: "1 pc (180 ml)",
        rating: 4.5,
        reviews: "32.0k",
        discount: 3,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/043b0254-d236-4202-aa7c-4703aca8eb5d/Hershey-s-Chocolate-Milkshake.jpeg"
    },

    {
        id: "milk-011",
        name: "Amul Masti Spiced Buttermilk",
        price: 65,
        mrp: 70,
        unit: "1 pc (1 L)",
        rating: 4.7,
        reviews: "43.3k",
        discount: 5,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4ee5cec8-e570-416f-bad9-cd578928bf5c/Amul-Masti-Spiced-Buttermilk.jpeg"
    },

    {
        id: "milk-012",
        name: "Smoodh Kesar Badam",
        price: 18,
        mrp: 20,
        unit: "1 pc (150 ml)",
        rating: 4.8,
        reviews: "8.9k",
        discount: 2,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f26f188e-8cb4-4e8b-8dc3-c983c11ea4df/Smoodh-Kesar-Badam.jpeg"
    },

    {
        id: "milk-013",
        name: "Nestle Milo Health Chocolate Drink with Millets",
        price: 43,
        mrp: 45,
        unit: "1 pc (180 ml)",
        rating: 4.6,
        reviews: "3.2k",
        discount: 2,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1686595a-a326-4496-ae01-5110afbf9159/Nestle-Milo-Health-Chocolate-Drink-with-Millets.jpeg"
    },

    {
        id: "milk-014",
        name: "Epigamia Turbo Coffee Protein Milkshake",
        price: 99,
        mrp: 141,
        unit: "1 pc (250 ml)",
        rating: 4.7,
        reviews: "3.0k",
        discount: 42,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a6056653-f53b-413e-a890-770efdba26fa/Epigamia-Turbo-Coffee-Protein-Milkshake.jpeg"
    },

    {
        id: "milk-015",
        name: "Sunfeast Dark Fantasy Chocolate Milkshake With Belgian Chocolate",
        price: 26,
        mrp: 30,
        unit: "1 pc (150 ml)",
        rating: 4.6,
        reviews: "11.5k",
        discount: 4,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2520-2520,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1d052a31-e9ea-4fb7-83c8-ca7130914ba9/Sunfeast-Dark-Fantasy-Chocolate-Milkshake-With-Belgian-Chocolate.jpeg"
    },

    {
        id: "milk-016",
        name: "Cavin's Kaju Butterscotch Milkshake, Rich & Creamy",
        price: 40,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.6,
        reviews: "8.9k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/20bfffcf-c3e1-4d45-a8e3-0b8489b48ac3/Cavin-s-Kaju-Butterscotch-Milkshake-Rich-Creamy.jpg"
    },

    {
        id: "milk-017",
        name: "Amul Kool Badam Flavoured Milk Drink",
        price: 24,
        mrp: 25,
        unit: "1 pc (180 ml)",
        rating: 4.6,
        reviews: "42.0k",
        discount: 1,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e17ddbfb-a38a-42fa-811d-9366a9d76120/Amul-Kool-Badam-Flavoured-Milk-Drink.jpeg"
    },

    {
        id: "milk-018",
        name: "Smoodh Toffee Caramel Milk | Flavoured Milk Drink",
        price: 18,
        mrp: 20,
        unit: "1 pc (150 ml)",
        rating: 4.8,
        reviews: "15.4k",
        discount: 2,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4167-4167,pr-true,f-auto,q-40,dpr-2/cms/product_variant/87f32e78-541b-4023-9e09-0071f3b3c543/Smoodh-Toffee-Caramel-Milk-Flavoured-Milk-Drink.jpeg"
    },

    {
        id: "milk-019",
        name: "Hershey's Strawberry Milkshake",
        price: 33,
        mrp: 40,
        unit: "1 pc (180 ml)",
        rating: 4.4,
        reviews: "10.6k",
        discount: 7,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a990ec0e-4d4e-4267-a184-47648df25dcb/Hershey-s-Strawberry-Milkshake.jpeg"
    },

    {
        id: "milk-020",
        name: "Hershey's Cookies and Cream Milkshake",
        price: 37,
        mrp: 40,
        unit: "1 pc (180 ml)",
        rating: 4.4,
        reviews: "10.8k",
        discount: 3,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1431d23e-fa7f-4711-8929-80f2b54b6feb/Hershey-s-Cookies-and-Cream-Milkshake.jpeg"
    },

    {
        id: "milk-021",
        name: "Akshayakalpa Organic Plain Buttermilk",
        price: 27,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.5,
        reviews: "2.3k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1083-1083,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1f99d2a9-996c-483f-9f4b-2a87a5f32e16/Akshayakalpa-Organic-Plain-Buttermilk.jpeg"
    },

    {
        id: "milk-022",
        name: "Amul Gold Kool Classic Badam Flavoured Milk",
        price: 25,
        mrp: 30,
        unit: "1 pc (180 ml)",
        rating: 4.5,
        reviews: "10.6k",
        discount: 5,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0835290e-ebf9-4709-b781-b6f9aceff1ad/Amul-Gold-Kool-Classic-Badam-Flavoured-Milk.jpeg"
    },

    {
        id: "milk-023",
        name: "Amul Kool Cafe Milk Bottle",
        price: 29,
        mrp: 30,
        unit: "1 pc (200 ml)",
        rating: 4.2,
        reviews: "3.8k",
        discount: 1,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-500-500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b463d77a-ee20-4a93-91ec-a37b0a033c9d/Amul-Kool-Cafe-Milk-Bottle.jpeg"
    },

    {
        id: "milk-024",
        name: "Akshayakalpa Organic Spiced Buttermilk",
        price: 27,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.5,
        reviews: "2.2k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1083-1083,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ae860aaa-5c4a-48a4-80dd-2550da8e0854/Akshayakalpa-Organic-Spiced-Buttermilk.jpeg"
    },

    {
        id: "milk-025",
        name: "Creambell Kesar Badam Milkshake",
        price: 30,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.8,
        reviews: "15.3k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/24368c05-053c-4667-b11a-534214a16493/Creambell-Kesar-Badam-Milkshake.jpeg"
    },

    {
        id: "milk-026",
        name: "Amul Lassi",
        price: 20,
        mrp: null,
        unit: "1 pack (200 ml)",
        rating: 4.5,
        reviews: "93.8k",
        discount: 0,
        category: "Milk Drinks",
        variant: "Rose",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4121a8ce-247e-4c08-9817-48bda45ad7b6/Amul-Lassi.jpeg"
    },

    {
        id: "milk-027",
        name: "Amul Kool Elaichi Drink | Flavoured Milk Drink",
        price: 25,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.6,
        reviews: "22.4k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2c36e5ad-77c0-4a37-949f-f2e1437c18fe/Amul-Kool-Elaichi-Drink-Flavoured-Milk-Drink.jpeg"
    },

    {
        id: "milk-028",
        name: "Amul Kool Rose Milk Drink | Flavoured Beverage",
        price: 25,
        mrp: null,
        unit: "1 pc (180 ml)",
        rating: 4.9,
        reviews: "18.9k",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-500-500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/af4c4016-e7fc-4eaf-bfe3-6e01fbca0ffc/Amul-Kool-Rose-Milk-Drink-Flavoured-Beverage.jpeg"
    },

    {
        id: "milk-029",
        name: "Epigamia Turbo Chocolate Protein Milkshake",
        price: 99,
        mrp: 141,
        unit: "1 pc (250 ml)",
        rating: 4.3,
        reviews: "7.6k",
        discount: 42,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/61e19166-a4c6-4277-ad8b-2521ede1ebef/Epigamia-Turbo-Chocolate-Protein-Milkshake.jpeg"
    },

    {
        id: "milk-030",
        name: "Amul Kool Cafe Milk 'N' Coffee Tin",
        price: 34,
        mrp: 35,
        unit: "1 pc (200 ml)",
        rating: 4.8,
        reviews: "41.6k",
        discount: 1,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/19c0c575-6534-4bed-944f-acb9754edc6c/Amul-Kool-Cafe-Milk-N-Coffee-Tin.jpeg"
    },

    {
        id: "milk-031",
        name: "Hitkary Thandai Paan Mix Drink Mix",
        price: 147,
        mrp: null,
        unit: "1 pc (200 g)",
        rating: 4.7,
        reviews: "83",
        discount: 0,
        category: "Milk Drinks",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/af09d0e9-a53f-4d77-b7cd-06e58b8dcc97/Hitkary-Thandai-Paan-Mix-Drink-Mix.jpeg"
    },

    


    




];





    





/* =====================================================
   STATE
===================================================== */
const GROCERY_CART_KEY = "localmartGroceryCart";
const GROCERY_WISHLIST_KEY = "localmartGroceryWishlist";



let activeCategory = "Milk Drinks";
let activeFilter = "all";
let searchTerm = "";
let sortType = "recommended";







const allDairyProducts = [
    ...dairyProducts,
    ...breadProducts,
    ...bakeryProducts,
    ...curdProducts,
    ...battersMixesProducts,
    ...paneerCreamProducts,
    ...butterProducts,
    ...cheeseProducts ,
    ...indianBreadsProducts,
    ... veganDrinkProducts,
    ...milkDrinksProducts
];









/* Make product arrays available globally for debugging */
window.dairyProducts = dairyProducts;
window.breadProducts = breadProducts;
window.bakeryProducts = bakeryProducts;
window.curdProducts = curdProducts;
window.battersMixesProducts = battersMixesProducts;
window.paneerCreamProducts  =paneerCreamProducts ;
window.butterProducts  =butterProducts ;
window.cheeseProducts  =cheeseProducts ;
window.indianBreadsProducts  =indianBreadsProducts ;
window.veganDrinkProducts   =veganDrinkProducts  ;
window.milkDrinksProducts    =milkDrinksProducts   ;


window.allDairyProducts = allDairyProducts;

    /* =====================================================
       DOM READY
    ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        loadCart();
        wishlist = loadWishlist();

        renderSubcategories();

        renderExploreCategories();

        renderProducts();

        updateCartUI();

        updateWishlistUI();

        setupEvents();

    });


    function loadCart() {

    try {

        const savedCart =
            localStorage.getItem(GROCERY_CART_KEY);

        if (!savedCart) {
            cart = [];
            return;
        }

        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {

            cart = parsedCart;

        } else {

            cart = [];

        }

    } catch (error) {

        console.error(
            "LocalMart cart load error:",
            error
        );

        cart = [];
    }
}


    function saveCart() {

    try {

        localStorage.setItem(
            GROCERY_CART_KEY,
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "LocalMart cart save error:",
            error
        );

    }
}








function addToGroceryCart(productId) {

    const product = findGroceryProduct(productId);

    if (!product) {
        console.error("Product not found:", productId);
        return;
    }

    const existingItem = cart.find(
        item => String(item.id) === String(productId)
    );

    if (existingItem) {

        existingItem.quantity =
            (Number(existingItem.quantity) || 0) + 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    updateGroceryCartCount();

    if (typeof renderCart === "function") {
        renderCart();
    }

    if (typeof showToast === "function") {
        showToast(`${product.name} added to cart`);
    }
}

window.addToGroceryCart = addToGroceryCart;






    function loadWishlist() {

        try {

            const saved =
                localStorage.getItem(WISHLIST_KEY);

            if (!saved) {
                return [];
            }

            const parsed =
                JSON.parse(saved);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            return [];

        }

    }


    function saveWishlist() {

        try {

            localStorage.setItem(
                WISHLIST_KEY,
                JSON.stringify(wishlist)
            );

        } catch (error) {

            console.warn(
                "Wishlist save error:",
                error
            );

        }

    }


    /* =====================================================
       RENDER SUBCATEGORIES
    ===================================================== */

    function renderSubcategories() {

        const wrapper =
            document.getElementById(
                "subcategoryWrapper"
            );

        if (!wrapper) {
            return;
        }


        wrapper.innerHTML =
            subcategories.map(
                category => {

                    const active =
                        category.name === activeCategory
                            ? "active"
                            : "";


                    return `

                        <button
                            type="button"
                            class="subcategory-card ${active}"
                            onclick="filterCategory('${escapeAttribute(category.name)}')"
                            title="${escapeHTML(category.name)}"
                        >

                            <div class="subcategory-image">

                                <img
                                    src="${category.image}"
                                    alt="${escapeHTML(category.name)}"
                                    loading="lazy"
                                    onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=&quot;font-size:34px&quot;>${category.icon}</span>';"
                                >

                            </div>

                            <div class="subcategory-name">
                                ${escapeHTML(category.name)}
                            </div>

                        </button>

                    `;

                }
            ).join("");

    }


    /* =====================================================
       EXPLORE CATEGORIES
    ===================================================== */

    function renderExploreCategories() {

        const container =
            document.getElementById(
                "categoryExploreGrid"
            );

        if (!container) {
            return;
        }


        container.innerHTML =
            subcategories.map(
                category => {

                    const productCount =
    allDairyProducts.filter(
        product =>
            product.category === category.name
    ).length;


                    const countText =
                        productCount > 0
                            ? `${productCount} products`
                            : "Explore category";


                    return `

                        <button
                            type="button"
                            class="explore-category"
                            onclick="filterCategory('${escapeAttribute(category.name)}')"
                        >

                            <div class="explore-icon">
                                ${category.icon}
                            </div>

                            <h3>
                                ${escapeHTML(category.name)}
                            </h3>

                            <span>
                                ${countText}
                            </span>

                        </button>

                    `;

                }
            ).join("");

    }


    /* =====================================================
       FILTER CATEGORY
    ===================================================== */

    window.filterCategory =
        function (category) {

            activeCategory = category;

            activeFilter = "all";

            searchTerm = "";

            const search =
                document.getElementById(
                    "globalSearch"
                );

            if (search) {
                search.value = "";
            }


            const heading =
                document.getElementById(
                    "productsHeading"
                );


            const productsInCategory =
    allDairyProducts.filter(
        product =>
            product.category === category
    );


            if (productsInCategory.length > 0) {

                if (heading) {
                    heading.textContent =
                        category;
                }

                renderProducts();

            } else {

                /*
                    Only Milk products were supplied
                    in the catalogue.

                    Other categories remain ready
                    for future product data.
                */

                if (heading) {
                    heading.textContent =
                        category;
                }

                renderProducts();

            }


            renderSubcategories();

            updateFilterButtons();

            window.scrollTo({
                top:
                    document.querySelector(
                        ".products-toolbar"
                    )?.offsetTop - 90 || 0,
                behavior: "smooth"
            });

        };


    /* =====================================================
       GET FILTERED PRODUCTS
    ===================================================== */

    function getFilteredProducts() {

       let products =
    allDairyProducts.filter(
        product =>
            product.category === activeCategory
    );


        /* SEARCH */

        if (searchTerm.trim()) {

            const term =
                searchTerm
                    .toLowerCase()
                    .trim();


            products =
                products.filter(
                    product => {

                        const searchable = [

                            product.name,

                            product.brand,

                            product.unit,

                            product.type,

                            product.category

                        ]
                            .join(" ")
                            .toLowerCase();


                        return searchable.includes(term);

                    }
                );

        }


        /* FILTER */

        switch (activeFilter) {

            case "under50":

                products =
                    products.filter(
                        product =>
                            product.price < 50
                    );

                break;


            case "rating4":

                products =
                    products.filter(
                        product =>
                            product.rating >= 4
                    );

                break;


            case "discount10":

                products =
                    products.filter(
                        product =>
                            getDiscount(product) >= 10
                    );

                break;


            case "organic":

                products =
                    products.filter(
                        product =>
                            product.type
                                .toLowerCase()
                                .includes("organic")
                    );

                break;


            case "toned":

                products =
                    products.filter(
                        product =>
                            product.type
                                .toLowerCase()
                                .includes("toned")
                    );

                break;


            case "fullcream":

                products =
                    products.filter(
                        product =>
                            product.type
                                .toLowerCase()
                                .includes("fullcream")
                    );

                break;

        }


        /* SORT */

        switch (sortType) {

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
                        b.rating - a.rating
                );

                break;


            case "discount":

                products.sort(
                    (a, b) =>
                        getDiscount(b) -
                        getDiscount(a)
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


    /* =====================================================
       RENDER PRODUCTS
    ===================================================== */

    function renderProducts() {

        const grid =
            document.getElementById(
                "productGrid"
            );

        const empty =
            document.getElementById(
                "emptyProducts"
            );

        const count =
            document.getElementById(
                "productsCount"
            );


        if (!grid) {
            return;
        }


        const products =
            getFilteredProducts();


        if (count) {

            count.textContent =
                `${products.length} product${products.length !== 1 ? "s" : ""}`;

        }


        if (!products.length) {

            grid.innerHTML = "";

            if (empty) {
                empty.hidden = false;
            }

            return;

        }


        if (empty) {
            empty.hidden = true;
        }


        grid.innerHTML =
            products.map(
                renderProductCard
            ).join("");

    }


    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function renderProductCard(product) {

        const discount =
            getDiscount(product);


        const isWishlisted = Array.isArray(wishlist)
    ? wishlist.some(item =>
        typeof item === "object"
            ? String(item.id) === String(product.id)
            : String(item) === String(product.id)
      )
    : false;


        const quantity =
            getCartQuantity(
                product.id
            );


        const reviews =
            formatReviews(
                product.reviews
            );


        const cartControl =
            quantity > 0

                ? `

                    <div class="quantity-control">

                        <button
                            type="button"
                            onclick="changeQuantity('${product.id}', -1)"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span class="quantity-value">
                            ${quantity}
                        </span>

                        <button
                            type="button"
                            onclick="changeQuantity('${product.id}', 1)"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                `

                : `

                    <button
                        type="button"
                        class="add-button"
                        onclick="addToGroceryCart('${product.id}')"
                    >
                        ADD
                    </button>

                `;


        return `

            <article
                class="product-card"
                data-product-id="${product.id}"
            >

                <div class="product-image-container">

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
                        class="wishlist-button ${isWishlisted ? "active" : ""}"
                        onclick="toggleWishlist('${product.id}')"
                        aria-label="Wishlist"
                    >
                        ${isWishlisted ? "♥" : "♡"}
                    </button>


                    <img
                        class="product-image"
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        onerror="handleImageError(this)"
                    >


                    <button
                        type="button"
                        class="quick-view-button"
                        onclick="openProductModal('${product.id}')"
                    >
                        Quick View
                    </button>

                </div>


                <div class="product-info">

                    <div class="product-brand">
                        ${escapeHTML(product.brand)}
                    </div>


                    <div
                        class="product-name"
                        onclick="openProductModal('${product.id}')"
                        title="${escapeHTML(product.name)}"
                    >
                        ${escapeHTML(product.name)}
                    </div>


                    <div class="product-unit">
                        ${escapeHTML(product.unit)}
                    </div>


                    <div class="product-rating-row">

    ${
        product.rating != null
            ? `
                <span class="rating">
                    <span class="rating-star">★</span>
                    ${Number(product.rating).toFixed(1)}
                </span>
            `
            : `
                <span class="rating">
                    <span class="rating-star">★</span>
                    New
                </span>
            `
    }

    <span class="rating-count">
        (${reviews})
    </span>

</div>


<div class="price-row">

    <strong class="product-price">
        ₹${Number(product.price || 0).toFixed(0)}
    </strong>

    ${
        product.mrp != null &&
        Number(product.mrp) > Number(product.price || 0)
            ? `
                <span class="product-mrp">
                    ₹${Number(product.mrp).toFixed(0)}
                </span>
            `
            : ""
    }

</div>


                    <div class="add-button-container">

                        ${cartControl}

                    </div>

                </div>

            </article>

        `;

    }


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    window.handleImageError =
        function (image) {

            image.onerror = null;

            image.style.display = "none";

            const parent =
                image.parentElement;

            if (!parent) {
                return;
            }


            const fallback =
                document.createElement(
                    "div"
                );


            fallback.style.cssText = `

                width:100%;
                height:100%;
                display:grid;
                place-items:center;
                font-size:55px;
                background:#f7faf8;

            `;


            fallback.textContent = "🥛";

            parent.insertBefore(
                fallback,
                image
            );

        };


    /* =====================================================
       ADD TO CART
    ===================================================== */

    window.addToCart =
        function (productId) {

            const product =
                dairyProducts.find(
                    item =>
                        item.id === productId
                );


            if (!product) {
                return;
            }


            const existing =
                cart.find(
                    item =>
                        item.id === productId
                );


            if (existing) {

                existing.quantity += 1;

            } else {

                cart.push({

                    id: product.id,

                    name: product.name,

                    brand: product.brand,

                    unit: product.unit,

                    price: product.price,

                    mrp: product.mrp,

                    image: product.image,

                    quantity: 1

                });

            }


            saveCart();

            updateCartUI();

            renderProducts();

            showToast(
                `${product.name} added to cart`
            );

        };


    /* =====================================================
       CHANGE QUANTITY
    ===================================================== */

    window.changeQuantity =
        function (productId, amount) {

            const item =
                cart.find(
                    product =>
                        product.id ===
                        productId
                );


            if (!item) {

                if (amount > 0) {
                    addToCart(productId);
                }

                return;

            }


            item.quantity += amount;


            if (item.quantity <= 0) {

                cart =
                    cart.filter(
                        product =>
                            product.id !==
                            productId
                    );

            }


            saveCart();

            updateCartUI();

            renderProducts();

            renderCart();

        };


    /* =====================================================
       CART QUANTITY
    ===================================================== */

    function getCartQuantity(productId) {

        const item =
            cart.find(
                product =>
                    product.id ===
                    productId
            );


        return item
            ? item.quantity
            : 0;

    }


    /* =====================================================
       UPDATE CART UI
    ===================================================== */

    function updateCartUI() {

        const count =
            document.getElementById(
                "cartCount"
            );


        const label =
            document.getElementById(
                "cartItemsLabel"
            );


        const totalItems =
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );


        if (count) {

            count.textContent =
                totalItems;

        }


        if (label) {

            label.textContent =
                `${totalItems} item${totalItems !== 1 ? "s" : ""}`;

        }

    }


    /* =====================================================
       OPEN CART
    ===================================================== */

    window.openCart =
        function () {

            const sidebar =
                document.getElementById(
                    "cartSidebar"
                );

            const overlay =
                document.getElementById(
                    "cartOverlay"
                );


            if (sidebar) {
                sidebar.classList.add(
                    "active"
                );
            }


            if (overlay) {
                overlay.classList.add(
                    "active"
                );
            }


            renderCart();

        };


    /* =====================================================
       CLOSE CART
    ===================================================== */

    function closeCart() {

        const sidebar =
            document.getElementById(
                "cartSidebar"
            );

        const overlay =
            document.getElementById(
                "cartOverlay"
            );


        if (sidebar) {
            sidebar.classList.remove(
                "active"
            );
        }


        if (overlay) {
            overlay.classList.remove(
                "active"
            );
        }

    }


    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        const body =
            document.getElementById(
                "cartBody"
            );


        const subtotalElement =
            document.getElementById(
                "cartSubtotal"
            );


        const totalElement =
            document.getElementById(
                "cartTotal"
            );


        if (!body) {
            return;
        }


        if (!cart.length) {

            body.innerHTML = `

                <div class="empty-cart">

                    <div class="empty-cart-icon">
                        🛒
                    </div>

                    <h3>
                        Your cart is empty
                    </h3>

                    <p>
                        Add some fresh dairy products
                        to get started.
                    </p>

                </div>

            `;


            if (subtotalElement) {
                subtotalElement.textContent =
                    "₹0";
            }


            if (totalElement) {
                totalElement.textContent =
                    "₹0";
            }


            return;

        }


        body.innerHTML =
            cart.map(
                item => `

                    <div
                        class="cart-item"
                        data-cart-id="${item.id}"
                    >

                        <img
                            class="cart-item-image"
                            src="${item.image}"
                            alt="${escapeHTML(item.name)}"
                            onerror="handleImageError(this)"
                        >


                        <div class="cart-item-info">

                            <div class="cart-item-name">
                                ${escapeHTML(item.name)}
                            </div>


                            <div class="cart-item-unit">
                                ${escapeHTML(item.unit)}
                            </div>


                            <div class="cart-item-bottom">

                                <strong class="cart-item-price">
                                    ₹${item.price * item.quantity}
                                </strong>


                                <div class="cart-quantity">

                                    <button
                                        type="button"
                                        onclick="changeQuantity('${item.id}', -1)"
                                    >
                                        −
                                    </button>

                                    <span>
                                        ${item.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onclick="changeQuantity('${item.id}', 1)"
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                `
            ).join("");


        const subtotal =
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0
            );


        if (subtotalElement) {

            subtotalElement.textContent =
                `₹${subtotal}`;

        }


        if (totalElement) {

            totalElement.textContent =
                `₹${subtotal}`;

        }

    }


    /* =====================================================
       WISHLIST
    ===================================================== */

    window.toggleWishlist =
        function (productId) {

            // Read the shared key at click time so the Dairy page always
            // updates the same list consumed by /grocery/wishlist/.
            wishlist = loadWishlist();

            const product =
                allDairyProducts.find(
                    item =>
                        String(item.id) === String(productId)
                );


            if (!product) {
                return;
            }


            const index =
                wishlist.findIndex(
                    item => String(item && typeof item === "object" ? item.id : item) === String(product.id)
                );

            let toastMessage;

            if (index >= 0) {

                wishlist.splice(
                    index,
                    1
                );

                toastMessage = "Removed from wishlist";

            } else {

                wishlist.push({
                    ...product,
                    price: Number(product.price || 0),
                    mrp: Number(product.mrp || product.price || 0),
                    image: product.image || "",
                    quantity: 1
                });

                toastMessage = "Added to wishlist ♥";

            }


            saveWishlist();

            window.dispatchEvent(new Event("groceryWishlistUpdated"));

            updateWishlistUI();

            renderProducts();

            showToast(toastMessage);

        };


    /* =====================================================
       WISHLIST UI
    ===================================================== */

    function updateWishlistUI() {

        const count =
            document.getElementById(
                "wishlistCount"
            );


        if (count) {

            count.textContent =
                wishlist.length;

        }

    }


    window.scrollToWishlist =
        function () {

            const first =
                dairyProducts.find(
                    product =>
                        wishlist.includes(
                            product.id
                        )
                );


            if (!first) {

                showToast(
                    "Your wishlist is empty"
                );

                return;

            }


            openProductModal(
                first.id
            );

        };


    /* =====================================================
       PRODUCT MODAL
    ===================================================== */

    window.openProductModal =
        function (productId) {

            const product =
                dairyProducts.find(
                    item =>
                        item.id ===
                        productId
                );


            if (!product) {
                return;
            }


            const overlay =
                document.getElementById(
                    "productModalOverlay"
                );


            const content =
                document.getElementById(
                    "modalProductContent"
                );


            const discount =
                getDiscount(product);


            if (!content) {
                return;
            }


            content.innerHTML = `

                <div>

                    <img
                        class="modal-image"
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                        onerror="handleImageError(this)"
                    >

                </div>


                <div>

                    <div class="modal-brand">
                        ${escapeHTML(product.brand)}
                    </div>


                    <h2 class="modal-title">
                        ${escapeHTML(product.name)}
                    </h2>


                    <div class="modal-unit">
                        ${escapeHTML(product.unit)}
                    </div>


                    <div class="modal-rating">
                        ★ ${product.rating.toFixed(1)}
                        &nbsp; · &nbsp;
                        ${formatReviews(product.reviews)} reviews
                    </div>


                    <p class="modal-description">

                        Fresh ${escapeHTML(product.brand)}
                        dairy product suitable for
                        everyday household use.
                        Check the pack label for
                        storage and consumption details.

                    </p>


                    <div class="modal-price-row">

                        <strong class="modal-price">
                            ₹${product.price}
                        </strong>


                        ${
                            product.mrp > product.price

                            ? `
                                <span class="modal-mrp">
                                    ₹${product.mrp}
                                </span>

                                <span class="modal-discount">
                                    ${discount}% OFF
                                </span>
                            `

                            : ""

                        }

                    </div>


                    <button
                        type="button"
                        class="modal-add"
                        onclick="addToCart('${product.id}'); closeProductModal();"
                    >
                        Add to Cart
                    </button>

                </div>

            `;


            if (overlay) {

                overlay.classList.add(
                    "active"
                );

            }

            document.body.style.overflow =
                "hidden";

        };


    /* =====================================================
       CLOSE PRODUCT MODAL
    ===================================================== */

    window.closeProductModal =
        function () {

            const overlay =
                document.getElementById(
                    "productModalOverlay"
                );


            if (overlay) {

                overlay.classList.remove(
                    "active"
                );

            }


            document.body.style.overflow =
                "";

        };


    /* =====================================================
       SEARCH
    ===================================================== */

    function setupSearch() {

        const search =
            document.getElementById(
                "globalSearch"
            );


        const clear =
            document.getElementById(
                "clearSearch"
            );


        if (!search) {
            return;
        }


        search.addEventListener(
            "input",
            function () {

                searchTerm =
                    this.value;


                if (clear) {

                    clear.style.display =
                        searchTerm
                            ? "block"
                            : "none";

                }


                renderProducts();

            }
        );


        if (clear) {

            clear.addEventListener(
                "click",
                function () {

                    search.value = "";

                    searchTerm = "";

                    clear.style.display =
                        "none";

                    renderProducts();

                    search.focus();

                }
            );

        }

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function setupEvents() {

        setupSearch();


        /* SORT */

        const sort =
            document.getElementById(
                "sortProducts"
            );


        if (sort) {

            sort.addEventListener(
                "change",
                function () {

                    sortType =
                        this.value;

                    renderProducts();

                }
            );

        }


        /* FILTERS */

        document
            .querySelectorAll(
                ".filter-chip"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        function () {

                            activeFilter =
                                this.dataset.filter;

                            updateFilterButtons();

                            renderProducts();

                        }
                    );

                }
            );


        /* CLEAR FILTER */

        const clearFilters =
            document.getElementById(
                "clearFilters"
            );


        if (clearFilters) {

            clearFilters.addEventListener(
                "click",
                function () {

                    activeFilter = "all";

                    updateFilterButtons();

                    renderProducts();

                }
            );

        }


        /* MOBILE FILTER */

        const mobileFilter =
            document.getElementById(
                "mobileFilterButton"
            );


        const filterBar =
            document.getElementById(
                "filterBar"
            );


        if (
            mobileFilter &&
            filterBar
        ) {

            mobileFilter.addEventListener(
                "click",
                function () {

                    filterBar.classList.toggle(
                        "show-mobile"
                    );

                }
            );

        }


        /* CATEGORY SCROLL */

        const categoryScroll =
            document.getElementById(
                "scrollCategoriesRight"
            );


        const categoryWrapper =
            document.getElementById(
                "subcategoryWrapper"
            );


        if (
            categoryScroll &&
            categoryWrapper
        ) {

            categoryScroll.addEventListener(
                "click",
                function () {

                    categoryWrapper.scrollBy({

                        left: 400,

                        behavior: "smooth"

                    });

                }
            );

        }


        /* CART CLOSE */

        const closeButton =
            document.getElementById(
                "closeCart"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeCart
            );

        }


        /* OVERLAY */

        const overlay =
            document.getElementById(
                "cartOverlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeCart
            );

        }


        /* MODAL OVERLAY */

        const modalOverlay =
            document.getElementById(
                "productModalOverlay"
            );


        if (modalOverlay) {

            modalOverlay.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        modalOverlay
                    ) {

                        closeProductModal();

                    }

                }
            );

        }


        /* ESC KEY */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeCart();

                    closeProductModal();

                }

            }
        );

    }


    /* =====================================================
       FILTER BUTTON UI
    ===================================================== */

    function updateFilterButtons() {

        document
            .querySelectorAll(
                ".filter-chip"
            )
            .forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.filter ===
                        activeFilter
                    );

                }
            );

    }


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    window.resetProductFilters =
        function () {

            activeFilter = "all";

            searchTerm = "";

            sortType = "recommended";


            const search =
                document.getElementById(
                    "globalSearch"
                );


            if (search) {
                search.value = "";
            }


            const sort =
                document.getElementById(
                    "sortProducts"
                );


            if (sort) {

                sort.value =
                    "recommended";

            }


            updateFilterButtons();

            renderProducts();

        };


    /* =====================================================
       DISCOUNT
    ===================================================== */

    function getDiscount(product) {

        if (
            !product.mrp ||
            product.mrp <= product.price
        ) {

            return 0;

        }


        return Math.round(
            (
                (
                    product.mrp -
                    product.price
                )
                /
                product.mrp
            ) * 100
        );

    }


    /* =====================================================
       REVIEW FORMAT
    ===================================================== */

    function formatReviews(number) {

        if (number >= 1000000) {

            return (
                number / 1000000
            ).toFixed(
                number >= 10000000
                    ? 0
                    : 1
            ) + "M";

        }


        if (number >= 1000) {

            return (
                number / 1000
            ).toFixed(
                number >= 10000
                    ? 0
                    : 1
            ) + "K";

        }


        return String(number);

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        const container =
            document.getElementById(
                "toastContainer"
            );


        if (!container) {
            return;
        }


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "toast";


        toast.textContent =
            message;


        container.appendChild(
            toast
        );


        setTimeout(
            function () {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateY(8px)";


                setTimeout(
                    function () {

                        toast.remove();

                    },
                    250
                );

            },
            2200
        );

    }


    /* =====================================================
       LOCATION
    ===================================================== */

    window.showLocationMessage =
        function () {

            const location =
                prompt(
                    "Enter your delivery location:"
                );


            if (
                location &&
                location.trim()
            ) {

                const element =
                    document.getElementById(
                        "deliveryLocation"
                    );


                if (element) {

                    element.textContent =
                        location.trim();

                }


                localStorage.setItem(
                    "localmart_location",
                    location.trim()
                );

            }

        };


    function loadSavedLocation() {

        const saved =
            localStorage.getItem(
                "localmart_location"
            );


        const element =
            document.getElementById(
                "deliveryLocation"
            );


        if (
            saved &&
            element
        ) {

            element.textContent =
                saved;

        }

    }


    loadSavedLocation();


    /* =====================================================
       CHECKOUT
    ===================================================== */

    window.checkoutCart =
        function () {

            if (!cart.length) {

                showToast(
                    "Your cart is empty"
                );

                return;

            }


            /*
                Change this URL to your Django
                checkout URL when your backend
                checkout page is ready.
            */

            const checkoutUrl =
                "/checkout/";


            window.location.href =
                checkoutUrl;

        };


    /* =====================================================
       HTML ESCAPING
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    function escapeAttribute(value) {

        return String(value)
            .replace(
                /'/g,
                "\\'"
            )
            .replace(
                /"/g,
                "&quot;"
            );

    }


    /* =====================================================
       PUBLIC API
       Useful if another LocalMart JS file needs access.
    ===================================================== */

    window.LocalMartDairy = {

        products: dairyProducts,

        categories: subcategories,

        getCart: function () {
            return cart;
        },

        getWishlist: function () {
            return wishlist;
        },

        refresh: function () {

            renderProducts();

            updateCartUI();

            updateWishlistUI();

        }

    };


})();


// Shared counter used by the page-level storage event handlers below.
function updateGroceryWishlistCount() {
    let savedWishlist = [];
    try {
        const parsed = JSON.parse(
            localStorage.getItem(GROCERY_WISHLIST_KEY) || "[]"
        );
        if (Array.isArray(parsed)) savedWishlist = parsed;
    } catch (error) {
        console.warn("Could not read the grocery wishlist count", error);
    }

    const countElement = document.getElementById("wishlistCount");
    if (countElement) countElement.textContent = String(savedWishlist.length);
}








document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateGroceryCartCount();

        updateGroceryWishlistCount();

        renderCart();

    }
);


window.addEventListener(
    "groceryCartUpdated",
    function() {

        updateGroceryCartCount();

        renderCart();

    }
);


window.addEventListener(
    "groceryWishlistUpdated",
    function() {

        updateGroceryWishlistCount();

    }
);


window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === GROCERY_CART_KEY ||
            event.key === GROCERY_WISHLIST_KEY
        ) {

            updateGroceryCartCount();

            updateGroceryWishlistCount();

        }

    }
);




window.addToGroceryCart = function (productId) {

    const product = allDairyProducts.find(
        item => String(item.id) === String(productId)
    );

    if (!product) {
        console.error("Product not found:", productId);
        return;
    }

    const existing = cart.find(
        item => String(item.id) === String(product.id)
    );

    if (existing) {

        existing.quantity =
            Number(existing.quantity || 0) + 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            category: product.category || "",
            brand: product.brand || "",
            unit: product.unit || "",
            price: Number(product.price || 0),
            mrp: Number(product.mrp || product.price || 0),
            discount: Number(product.discount || 0),
            image: product.image || "",
            rating: Number(product.rating || 0),
            reviews: Number(product.reviews || 0),
            quantity: 1
        });
    }

    localStorage.setItem(
        GROCERY_CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();

    showToast(
        `${product.name} added to Grocery Cart`
    );
};











