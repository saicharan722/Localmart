/* =========================================================
   LOCALMART
   TEA, COFFEE & MORE
   ZEPTO STYLE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   STORAGE
========================================================= */

const TEA_COFFEE_CART_KEY =
    "localmartGroceryCart";

const TEA_COFFEE_WISHLIST_KEY =
    "localmartGroceryWishlist";


/* =========================================================
   ZEPTO CATEGORY DATA
========================================================= */

const teaCoffeeCategories = [

    {
        id: "top-picks",
        name: "Top Picks",
        slug: "top-picks",
        url: "https://www.zepto.com/cn/tea-coffee-more/top-picks/cid/d7e98d87-6850-4cf9-a37c-e4fa34ae302c/scid/e6763c2d-0bf3-4332-82e4-0c8df1c94cad",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-120-120,pr-true,f-auto,q-40/cms/sub_category/168.png"
    },

    {
        id: "tea",
        name: "Tea",
        slug: "tea",
        url: "https://www.zepto.com/cn/tea-coffee-more/tea/cid/d7e98d87-6850-4cf9-a37c-e4fa34ae302c/scid/3c1856d3-7dd9-4657-8b14-4f47046c9369",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-120-120,pr-true,f-auto,q-40/cms/sub_category/9ebc0e20-2f4a-4703-ac92-8912059869bd.png"
    },

    {
        id: "coffee",
        name: "Coffee",
        slug: "coffee",
        url: "https://www.zepto.com/cn/tea-coffee-more/coffee/cid/d7e98d87-6850-4cf9-a37c-e4fa34ae302c/scid/0055bf0a-f578-4fa7-8b98-0c6e446bbe29",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-980-980,pr-true,f-auto,q-40/cms/sub_category/a4d0523d-5d4d-49f4-87cc-82b6e3922d2a.jpeg"
    },

    {
        id: "kids-nutrition",
        name: "Kids' Nutrition",
        slug: "kids-nutrition",
        url: "https://www.zepto.com/cn/tea-coffee-more/kids-nutrition/cid/d7e98d87-6850-4cf9-a37c-e4fa34ae302c/scid/96c21453-96e3-420c-91d3-33c8c5bf856d",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-1078-1078,pr-true,f-auto,q-40/cms/sub_category/9806f197-58c8-4ba2-9791-f354953d645a.jpeg"
    },

    {
        id: "adult-nutrition",
        name: "Adult Nutrition",
        slug: "adult-nutrition",
        url: "https://www.zepto.com/cn/tea-coffee-more/adult-nutrition/cid/d7e98d87-6850-4cf9-a37c-e4fa34ae302c/scid/2d6c7591-3d62-4fd2-930d-87da8fc5f81d",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-120-120,pr-true,f-auto,q-40/cms/sub_category/a77b7303-e606-40e7-8599-76c5d52527ee.png"
    },

    {
        id: "green-herbal-tea",
        name: "Green & Herbal Tea",
        slug: "green-herbal-tea",
        url: "https://www.zepto.com/cn/tea-coffee-more/green-herbal-tea/cid/d7e98d87-6850-4cf9-a37c-e4fa34ae302c/scid/d9d62fba-e97d-4d9d-88a9-c226f116e976",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-120-120,pr-true,f-auto,q-40/cms/sub_category/fcdaa042-2f7b-485b-9748-ff7cfefbd19b.png"
    },

    

    {
        id: "premium-coffee",
        name: "Premium Coffee",
        slug: "premium-coffee",
        url: "https://www.zepto.com/cn/tea-coffee-more/premium-coffee/cid/d7e98d87-6850-4cf9-a37c-e4fa34ae302c/scid/e309b308-3f59-4fcc-b664-851539e62b50",
        image: "https://cdn.zeptonow.com/production/tr:w-90,ar-2352-2352,pr-true,f-auto,q-40/cms/sub_category/a978e22e-fe3c-4b55-a417-945df09aa650.jpeg"
    },

   

];


/* =========================================================
   PRODUCT DATA
========================================================= */

const teaCoffeeProducts = [

    {
        id: "tc001",
        name: "Horlicks Nutrition Drink Jar | Superfoods",
        brand: "Horlicks",
        category: "adult-nutrition",
        price: 109,
        mrp: 110,
        unit: "1 pack (200 g)",
        rating: 4.8,
        reviews: "956",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-88%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/d13a707a-91ce-4211-b7b9-07da47509b1c/Horlicks-Nutrition-Drink-Jar.jpeg",
        topPick: true
    },

    
    {
        id: "tc003",
        name: "Continental Xtra Instant Coffee | Sachet",
        brand: "Continental",
        category: "coffee",
        price: 96,
        mrp: null,
        unit: "1 pack (48 x 1.3 g)",
        rating: 4.8,
        reviews: "6.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1254-1254%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/ab24a175-6676-465d-8c33-038737839dfd/Continental-Xtra-Instant-Coffee-Sachet.png",
        topPick: true
    },

    {
        id: "tc004",
        name: "Nescafe Cafe Style Iced Latte Cold Coffee",
        brand: "Nescafe",
        category: "cold-coffee-iced-tea",
        price: 49,
        mrp: 50,
        unit: "1 pc (170 ml)",
        rating: 4.6,
        reviews: "44.2k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/7148ada7-3b7d-444f-b5c7-ad9dd69c86f3/Nescafe-Cafe-Style-Iced-Latte-Cold-Coffee.jpeg",
        topPick: true
    },

    
    

    {
        id: "tc007",
        name: "PediaSure Chocolate Drink Mix | For 7+ years Kids",
        brand: "PediaSure",
        category: "kids-nutrition",
        price: 541,
        mrp: 650,
        unit: "1 pack (400 g)",
        rating: 4.8,
        reviews: "1.7k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1500-1500%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/bad791e9-559a-40c0-be54-870d7ab804d0/PediaSure-Chocolate-Drink-Mix-For-7-years-Kids-Combo.jpg",
        topPick: true
    },

    
    {
        id: "tc011",
        name: "BRU Instant Coffee",
        brand: "BRU",
        category: "coffee",
        price: 130,
        mrp: 140,
        unit: "1 pack (50 g)",
        rating: 4.9,
        reviews: "12.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/c68db333-fe84-48e3-81aa-4a0fb047c99a/BRU-Instant-Coffee.jpg",
        topPick: true
    },

   

    {
        id: "tc013",
        name: "Brooke Bond Red Label Natural Care Tea",
        brand: "Brooke Bond",
        category: "tea",
        price: 535,
        mrp: 660,
        unit: "1 pack (1 kg)",
        rating: 4.9,
        reviews: "4.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/1c849cd8-2bd0-4a4b-8800-68c7553c6cd5/Brooke-Bond-Red-Label-Natural-Care-Tea.jpg",
        topPick: true
    },

    
    {
        id: "tc017",
        name: "Davidoff Rich Aroma Instant Coffee | 10/12 Intensity",
        brand: "Davidoff",
        category: "premium-coffee",
        price: 699,
        mrp: 949,
        unit: "1 pc (100 g)",
        rating: 4.7,
        reviews: "4.0k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-88%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/f868e5fa-d9b8-47f6-b8f0-1fe2d60f094f/Davidoff-Rich-Aroma-Instant-Coffee-10-12-Intensity.jpg",
        topPick: true
    },

    

];


/* =========================================================
   TEA PRODUCTS
   LOCALMART - ZEPTO STYLE
========================================================= */

const teaProducts = [

    {
        id: "tea-001",
        name: "Teabox Sammvaad Kadak Chai | Premium Black Tea (Ctc) Straight From Assam | Bold Strong And Aromatic",
        brand: "Teabox",
        category: "tea",
        price: 169,
        mrp: null,
        unit: "1 pack (250 g)",
        rating: 4.5,
        reviews: "162",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/df82b42b-5ca7-426d-aa39-6821d2500579/Teabox-Sammvaad-Kadak-Chai-Premium-Black-Tea-Ctc-Straight-From-Assam-Bold-Strong-And-Aromatic.png",
        topPick: false
    },

    {
        id: "tea-002",
        name: "Marvel Premium Tea | Assam & Darjeeling Premium Leaves Unique Blend Chai Patti",
        brand: "Marvel",
        category: "tea",
        price: 319,
        mrp: 580,
        unit: "1 pack (1 kg)",
        rating: 4.8,
        reviews: "1.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0a801ab2-e759-48f2-8bcf-e7b7cb2f0315/Marvel-Premium-Tea-Assam-Darjeeling-Premium-Leaves-Unique-Blend-Chai-Patti.jpeg",
        topPick: false
    },

    {
        id: "tea-003",
        name: "Tata Tea Chakra Gold Care Premium Tea",
        brand: "Tata Tea",
        category: "tea",
        price: 400,
        mrp: 470,
        unit: "1 pack (500 g)",
        rating: 4.8,
        reviews: "569",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/55b50021-7f27-4575-adff-6e4ccfb9f367/Tata-Tea-Chakra-Gold-Care-Premium-Tea.jpeg",
        topPick: false
    },

    {
        id: "tea-004",
        name: "Society OMT Elaichi Instant Tea Premix Jar",
        brand: "Society",
        category: "tea",
        price: 240,
        mrp: 300,
        unit: "1 pc (500 g)",
        rating: 4.5,
        reviews: "534",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1100-1100,pr-true,f-auto,q-40,dpr-2/cms/product_variant/74f7a2cc-7907-4e13-8515-b3dd63ef5a2c/Society-OMT-Elaichi-Instant-Tea-Premix-Jar.jpg",
        topPick: false
    },

    {
        id: "tea-005",
        name: "Cup-Ji Masala Chai",
        brand: "Cup-Ji",
        category: "tea",
        price: 68,
        mrp: 100,
        unit: "1 pc (28 g)",
        rating: 4.7,
        reviews: "99",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2250-2250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6b21d167-3e31-4420-bf88-6696a0467e0a/Cup-Ji-Masala-Chai.jpeg",
        topPick: false
    },

    {
        id: "tea-006",
        name: "Brooke Bond Red Label Tea",
        brand: "Brooke Bond",
        category: "tea",
        price: 145,
        mrp: 150,
        unit: "1 pack (250 g)",
        rating: 4.7,
        reviews: "46.3k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0f7d5611-84a6-41f1-914c-2ae73adb8b37/Brooke-Bond-Red-Label-Tea.jpg",
        topPick: false
    },

    {
        id: "tea-007",
        name: "Brooke Bond Red Label Tea",
        brand: "Brooke Bond",
        category: "tea",
        price: 545,
        mrp: 580,
        unit: "1 pack (1 kg)",
        rating: 4.8,
        reviews: "6.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/15b0906b-4d42-4fe0-b3e6-0daad9351ca9/Brooke-Bond-Red-Label-Tea.jpg",
        topPick: false
    },

    {
        id: "tea-008",
        name: "Brooke Bond Red Label Natural Care Tea",
        brand: "Brooke Bond",
        category: "tea",
        price: 535,
        mrp: 660,
        unit: "1 pack (1 kg)",
        rating: 4.9,
        reviews: "4.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1c849cd8-2bd0-4a4b-8800-68c7553c6cd5/Brooke-Bond-Red-Label-Natural-Care-Tea.jpg",
        topPick: false
    },

    {
        id: "tea-009",
        name: "Lipton Darjeeling Long Leaf Loose Tea",
        brand: "Lipton",
        category: "tea",
        price: 520,
        mrp: null,
        unit: "1 pack (250 g)",
        rating: 4.7,
        reviews: "545",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3dc408e4-8445-484a-9cfd-709edb181333/Lipton-Darjeeling-Long-Leaf-Loose-Tea.jpeg",
        topPick: false
    },

    {
        id: "tea-010",
        name: "Taj Mahal Tea | Rich And Flavourful Chai",
        brand: "Taj Mahal",
        category: "tea",
        price: 709,
        mrp: 770,
        unit: "1 pack (1 kg)",
        rating: 4.8,
        reviews: "4.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6d6085b5-d05f-4856-bfdd-9c74e17e4c60/Taj-Mahal-Tea-Rich-And-Flavourful-Chai.jpg",
        topPick: false
    },

    {
        id: "tea-011",
        name: "Tata Tea Gold with 15% Long Leaves",
        brand: "Tata Tea",
        category: "tea",
        price: 407,
        mrp: 590,
        unit: "1 pack (1 kg)",
        rating: 5.0,
        reviews: "5.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b6fd9236-c975-4d84-858c-040032123a20/Tata-Tea-Gold-with-15-Long-Leaves.jpeg",
        topPick: false
    },

    {
        id: "tea-012",
        name: "Brooke Bond Red Label Tea",
        brand: "Brooke Bond",
        category: "tea",
        price: 45,
        mrp: null,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "19.7k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c22ccac4-5f7b-4fe8-9a44-967a565ec475/Brooke-Bond-Red-Label-Tea.jpeg",
        topPick: false
    },

    {
        id: "tea-013",
        name: "Taj Mahal Tea | Rich And Flavourful Chai",
        brand: "Taj Mahal",
        category: "tea",
        price: 220,
        mrp: null,
        unit: "1 pack (250 g)",
        rating: 4.8,
        reviews: "19.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d7191a6b-a85c-4e4a-ba5a-ad7d928c5e5c/Taj-Mahal-Tea-Rich-And-Flavourful-Chai.jpg",
        topPick: false
    },

    {
        id: "tea-014",
        name: "Brooke Bond Red Label Natural Care Tea",
        brand: "Brooke Bond",
        category: "tea",
        price: 179,
        mrp: 180,
        unit: "1 pack (250 g)",
        rating: 4.8,
        reviews: "24.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c171441b-d1e4-46b2-a9aa-66cc6335a0f2/Brooke-Bond-Red-Label-Natural-Care-Tea.jpg",
        topPick: false
    },

    {
        id: "tea-015",
        name: "Wagh Bakri Premium Leaf Tea | Kadak Rich Taste",
        brand: "Wagh Bakri",
        category: "tea",
        price: 590,
        mrp: 620,
        unit: "1 pack (1 kg)",
        rating: 4.8,
        reviews: "8.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f12c4b04-e1ea-49e3-a99e-d20cd42a09f9/Wagh-Bakri-Premium-Leaf-Tea-Kadak-Rich-Taste.jpg",
        topPick: false
    },

    {
        id: "tea-016",
        name: "Tata Tea Gold with 15% Long Leaves",
        brand: "Tata Tea",
        category: "tea",
        price: 160,
        mrp: null,
        unit: "1 pack (250 g)",
        rating: 4.8,
        reviews: "22.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a8ae8d61-4355-406d-b830-292a01fba628/Tata-Tea-Gold-with-15-Long-Leaves.jpeg",
        topPick: false
    },

    {
        id: "tea-017",
        name: "Tata Tea Gold Care | Masala Tea",
        brand: "Tata Tea",
        category: "tea",
        price: 517,
        mrp: 630,
        unit: "1 pack (1 kg)",
        rating: 4.7,
        reviews: "1.5k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ffccfc7d-e08c-4a5b-96ed-f3b9787fbe33/Tata-Tea-Gold-Care-Masala-Tea.jpg",
        topPick: false
    },

    {
        id: "tea-018",
        name: "Taj Mahal Tea | Rich And Flavourful Chai",
        brand: "Taj Mahal",
        category: "tea",
        price: 389,
        mrp: 410,
        unit: "1 pack (500 g)",
        rating: 4.8,
        reviews: "10.5k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c524b88f-9366-49eb-882e-b35595693440/Taj-Mahal-Tea-Rich-And-Flavourful-Chai.jpeg",
        topPick: false
    }

];


const coffeeProducts = [
    {
        id: "coffee-001",
        name: "Moccona Premium Dark Roast Classic Dark Roast Instant Coffee",
        category: "coffee",
        price: 1139,
        mrp: 1199,
        unit: "1 pc (100 g)",
        rating: 4.0,
        reviews: 34,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1024-1024%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/c1f6c249-4e7a-42a9-b695-bb5b707bb11f/Moccona-Premium-Dark-Roast-Classic-Dark-Roast-Instant-Coffee.jpeg"
    },

    

    

    

    

    {
        id: "coffee-008",
        name: "Tata Coffee Gold Absolutely Pure Instant Coffee",
        category: "coffee",
        price: 523,
        mrp: 679,
        unit: "1 pc (90 g)",
        rating: 4.8,
        reviews: 253,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/a079bfd9-31aa-47ce-b649-79b9f4078018/Tata-Coffee-Gold-Absolutely-Pure-Instant-Coffee.jpg"
    },

    {
        id: "coffee-009",
        name: "Nescafe Sunrise Instant Coffee Powder by Nescafe with Free Mug",
        category: "coffee",
        price: 290,
        mrp: 320,
        unit: "1 pack (90 g)",
        rating: 4.3,
        reviews: 44,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/938c9435-e536-4d1b-808d-b9cd95d8e2a2/Nescafe-Sunrise-Instant-Coffee-Powder-by-Nescafe-with-Free-Mug.jpg"
    },

    
    {
        id: "coffee-017",
        name: "Rage Coffee Dark Chocolate Flavour - Premium Arabica Instant Coffee",
        category: "coffee",
        price: 279,
        mrp: 399,
        unit: "1 pc (50 g)",
        rating: 4.5,
        reviews: 256,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/6ba7d158-e6dd-4727-ae6a-35fefc3bdb9e/Rage-Coffee-Dark-Chocolate-Flavour-Premium-Arabica-Instant-Coffee.jpeg"
    },

    
];

const kidsNutritionProducts = [

    {
        id: "kids-001",
        name: "Horlicks Nutrition Drink Jar | Superfoods",
        category: "kids-nutrition",
        price: 109,
        mrp: 110,
        unit: "1 pack (200 g)",
        rating: 4.8,
        reviews: 956,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-88%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/d13a707a-91ce-4211-b7b9-07da47509b1c/Horlicks-Nutrition-Drink-Jar.jpeg"
    },

    {
        id: "kids-002",
        name: "PediaSure Chocolate Drink Mix | For 7+ years Kids",
        category: "kids-nutrition",
        price: 541,
        mrp: 650,
        unit: "1 pack (400 g)",
        rating: 4.8,
        reviews: 1700,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1500-1500%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/bad791e9-559a-40c0-be54-870d7ab804d0/PediaSure-Chocolate-Drink-Mix-For-7-years-Kids-Combo.jpg"
    },

    {
        id: "kids-003",
        name: "Gritzo Supermilk Growth+ (Formerly Height+) (13+ Years Boys) | Double Chocolate",
        category: "kids-nutrition",
        price: 899,
        mrp: null,
        unit: "1 pc (400 g)",
        rating: 4.5,
        reviews: 678,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/a9f84bdc-5fb5-426c-8703-36a240fb9b22/Gritzo-Supermilk-Growth-Formerly-Height-13-Years-Boys-Double-Chocolate.jpeg"
    },

    {
        id: "kids-004",
        name: "PediaSure Scientifically Designed Vanilla Drink Mix| For 2 - 6 years Kids",
        category: "kids-nutrition",
        price: 674,
        mrp: 720,
        unit: "1 pack (375 g)",
        rating: 4.6,
        reviews: 1300,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-2000-2000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/0234e702-253b-4d37-a219-94014831cbcb/PediaSure-Scientifically-Designed-Vanilla-Drink-Mix-For-2-6-years-Kids.jpg"
    },

    {
        id: "kids-005",
        name: "Gritzo Supermilk Growth+ (Formerly Height+) (13+ Years Girls) | Double Chocolate",
        category: "kids-nutrition",
        price: 899,
        mrp: null,
        unit: "1 pc (400 g)",
        rating: 4.5,
        reviews: 554,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/1f853c9a-d1d9-401f-9233-17a6f34e6847/Gritzo-Supermilk-Growth-Formerly-Height-13-Years-Girls-Double-Chocolate.jpeg"
    },

    {
        id: "kids-006",
        name: "Gritzo Supermilk Growth+ (Formerly Height+) (7-12 Years Boys) |Double Chocolate",
        category: "kids-nutrition",
        price: 849,
        mrp: 899,
        unit: "1 pc (400 g)",
        rating: 4.8,
        reviews: 564,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/7ae88e55-3894-43ab-a743-5efceb93249a/Gritzo-Supermilk-Growth-Formerly-Height-7-12-Years-Boys-Double-Chocolate.jpeg"
    },

    

    {
        id: "kids-008",
        name: "Nestle Nangrow Vanilla Drink Mix | For 2 - 6 years Kids",
        category: "kids-nutrition",
        price: 595,
        mrp: null,
        unit: "1 pack (400 g)",
        rating: 4.8,
        reviews: 1200,
        image: "https://cdn.zeptonow.com/production/tr%3Aw-100%2Car-100-100%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/b8dfaea7-085a-4cf1-8060-943d0e49a278.jpeg"
    },

    {
        id: "kids-009",
        name: "Little Joys Nutrimix For Kids 2-6 Years | Vanilla Flavour",
        category: "kids-nutrition",
        price: 649,
        mrp: null,
        unit: "1 pack (350 g)",
        rating: 4.3,
        reviews: 261,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-403%2Car-3000-3000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/c5a692f0-d9f0-474b-809c-e3b762643544/Little-Joys-Nutrimix-For-Kids-2-6-Years-Vanilla-Flavour.jpg"
    },

    {
        id: "kids-010",
        name: "Little Joys Chocolate Nutrimix 13+| 12 G Protein",
        category: "kids-nutrition",
        price: 748,
        mrp: 749,
        unit: "1 pack (350 g)",
        rating: 4.4,
        reviews: 41,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-403%2Car-1500-1500%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/3cd9cdc2-6ba0-449d-8dc4-d5579bba7eb5/Little-Joys-Chocolate-Nutrimix-13-12-G-Protein.jpg"
    },

    {
        id: "kids-011",
        name: "Gritzo Supermilk Overall Growth | 2-6y Boy & Girl | 6g Protein Powder | Double Chocolate",
        category: "kids-nutrition",
        price: 748,
        mrp: 749,
        unit: "1 pack (400 g)",
        rating: 4.7,
        reviews: 106,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-88%2Car-2000-2000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/b9faf1b5-a774-479f-afda-dc95ad1fdfff/Gritzo-Supermilk-Overall-Growth-2-6y-Boy-Girl-6g-Protein-Powder-Double-Chocolate.png"
    },

    {
        id: "kids-012",
        name: "PediaSure Vanilla Drink Mix | For 7+ years Kids",
        category: "kids-nutrition",
        price: 541,
        mrp: 650,
        unit: "1 pack (400 g)",
        rating: 4.6,
        reviews: 816,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-88%2Car-1123-1123%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/cab085ae-8980-4164-8d7c-f8ea86ad4dca/PediaSure-Vanilla-Drink-Mix-For-7-years-Kids.jpg"
    },

    {
        id: "kids-013",
        name: "Little Joys Nutrimix For Kids 7-12 Years | Vanilla Flavour",
        category: "kids-nutrition",
        price: 699,
        mrp: null,
        unit: "1 pack (350 g)",
        rating: 4.3,
        reviews: 143,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-403%2Car-3000-3000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/8837a6af-ea3e-429e-bd12-801a7ff26236/Little-Joys-Nutrimix-For-Kids-7-12-Years-Vanilla-Flavour.jpg"
    },

    

    {
        id: "kids-015",
        name: "Little Joys Nutrimix Chocolate Drink Mix | For 2 - 6 Years Kids",
        category: "kids-nutrition",
        price: 649,
        mrp: null,
        unit: "1 pc (350 g)",
        rating: 4.8,
        reviews: 2500,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-403%2Car-3000-3000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/7c5e8054-46aa-4327-a4fb-857d04228620/Little-Joys-Nutrimix-Chocolate-Drink-Mix-For-2-6-Years-Kids.jpg"
    },

    {
        id: "kids-016",
        name: "Nestle LACTOGROW Nutritious Milk Drink Powder",
        category: "kids-nutrition",
        price: 348,
        mrp: 385,
        unit: "1 pack (400 g)",
        rating: 4.7,
        reviews: 1400,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1200-1200%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/fe3a49e9-bc93-4336-97a0-0e1103d9809d/Nestle-LACTOGROW-Nutritious-Milk-Drink-Powder.jpeg"
    },

    {
        id: "kids-017",
        name: "Little Joys Nutrimix For Kids 2-6 Years | Chocolate Flavour",
        category: "kids-nutrition",
        price: 1499,
        mrp: null,
        unit: "1 pc (1 kg)",
        rating: 5.0,
        reviews: 98,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-403%2Car-3000-3000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/53b7c757-e5eb-4f2b-8e47-b883bf7c4efb/Little-Joys-Nutrimix-For-Kids-2-6-Years-Chocolate-Flavour.jpg"
    },

    {
        id: "kids-018",
        name: "Horlicks Nutrition Drink Pouch | Superfoods",
        category: "kids-nutrition",
        price: 350,
        mrp: 415,
        unit: "1 pack (800 g)",
        rating: 4.9,
        reviews: 780,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr%3Aw-470%2Car-1000-1000%2Cpr-true%2Cf-auto%2Cq-40%2Cdpr-2/cms/product_variant/b04ec1f4-1135-4d9e-bb04-b174658b5eeb/Horlicks-Nutrition-Drink-Pouch-Superfoods.jpeg"
    }

];

const greenHerbalTeaProducts = [
    {
        id: "ght-001",
        name: "Tencha Ceremonial Classic Matcha Japanese Green Tea",
        category: "green-herbal-tea",
        price: 413,
        mrp: 599,
        discount: 186,
        unit: "1 pc (25 g)",
        rating: 4.6,
        reviews: 71,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ef0e0e03-1db6-435b-bc1b-4376816a58da/Tencha-Ceremonial-Classic-Matcha-Japanese-Green-Tea.jpeg"
    },
    {
        id: "ght-002",
        name: "Blue Tea Butterfly Pea Flower Herbal Tea | Zipper",
        category: "green-herbal-tea",
        price: 288,
        mrp: 299,
        discount: 11,
        unit: "1 pack (20 pcs)",
        rating: 4.7,
        reviews: 65,
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4f6329ab-74e0-486c-aee3-4f112f9e78c4/Blue-Tea-Butterfly-Pea-Flower-Herbal-Tea-Zipper.jpg"
    },
    
];

window.greenHerbalTeaProducts = greenHerbalTeaProducts;



teaCoffeeProducts.push(...teaProducts);
teaCoffeeProducts.push(...coffeeProducts);
teaCoffeeProducts.push(...kidsNutritionProducts );
teaCoffeeProducts.push(...greenHerbalTeaProducts  );


/* =========================================================
   STATE
========================================================= */

let currentCategory = "top-picks";

let currentProducts = [...teaCoffeeProducts];

const savedTeaCart = loadStorage(TEA_COFFEE_CART_KEY, []);
const legacyTeaCart = loadStorage("localmartTeaCoffeeMoreCart", []);
const savedTeaWishlist = loadStorage(TEA_COFFEE_WISHLIST_KEY, []);
const legacyTeaWishlist = loadStorage("localmartTeaCoffeeMoreWishlist", []);

let cart = savedTeaCart.length ? savedTeaCart : legacyTeaCart;
let wishlist = savedTeaWishlist.length ? savedTeaWishlist : legacyTeaWishlist;

cart = cart.map(item => {
    if (item && typeof item === "object") {
        return { ...item, quantity: Number(item.quantity || 1) };
    }
    const itemId = typeof item === "object" ? item.id : item;
    const product = teaCoffeeProducts.find(product => product.id === itemId);
    return product
        ? { ...product, quantity: 1 }
        : null;
}).filter(Boolean);

wishlist = wishlist.map(item => {
    if (item && typeof item === "object") return item;
    const itemId = typeof item === "object" ? item.id : item;
    const product = teaCoffeeProducts.find(product => product.id === itemId);
    return product
        ? { ...product }
        : { id: itemId, name: "Saved grocery product", category: "Grocery", price: 0, mrp: 0, image: "", quantity: 1 };
});

saveCart();
saveWishlist();
localStorage.setItem(
    "localmartTeaCoffeeMoreProducts",
    JSON.stringify(teaCoffeeProducts)
);


/* =========================================================
   STORAGE HELPERS
========================================================= */

function loadStorage(key, fallback) {

    try {

        const data =
            localStorage.getItem(key);

        return data
            ? JSON.parse(data)
            : fallback;

    } catch (error) {

        console.error(
            "Storage error:",
            error
        );

        return fallback;
    }
}


function saveCart() {

    localStorage.setItem(
        TEA_COFFEE_CART_KEY,
        JSON.stringify(cart)
    );
}


function saveWishlist() {

    localStorage.setItem(
        TEA_COFFEE_WISHLIST_KEY,
        JSON.stringify(wishlist)
    );
}


/* =========================================================
   IMAGE NORMALIZER
========================================================= */

function normalizeZeptoImage(url) {

    return String(url || "")
        .replace(/\\:/g, ":")
        .replace(/%3A/gi, ":");
}


/* =========================================================
   IMAGE ERROR HANDLER
========================================================= */

function handleProductImageError(img) {

    if (!img) return;

    img.style.display = "none";

    const fallback =
        img.parentElement?.querySelector(
            ".product-fallback"
        );

    if (fallback) {
        fallback.style.display = "flex";
    }
}


function handleCartImageError(img) {

    if (!img) return;

    img.style.display = "none";

    const fallback =
        img.parentElement?.querySelector(
            ".cart-item-fallback"
        );

    if (fallback) {
        fallback.style.display = "flex";
    }
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
   CATEGORY RENDER
========================================================= */

function renderCategories() {

    const container =
        document.getElementById(
            "teaCoffeeCategories"
        );

    if (!container) return;

    container.innerHTML =
        teaCoffeeCategories.map(category => {

            const active =
                category.id === currentCategory
                    ? "active"
                    : "";

            return `
                <div
                    class="category-item ${active}"
                    data-category="${escapeHTML(category.id)}"
                    title="${escapeHTML(category.name)}"
                >

                    <div class="category-image">

                        <img
                            src="${escapeHTML(
                                normalizeZeptoImage(category.image)
                            )}"
                            alt="${escapeHTML(category.name)}"
                            loading="lazy"
                            onerror="this.style.display='none'"
                        >

                    </div>

                    <span class="category-name">
                        ${escapeHTML(category.name)}
                    </span>

                </div>
            `;

        }).join("");

    container
        .querySelectorAll(".category-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    selectCategory(
                        item.dataset.category
                    );

                }
            );

        });
}


/* =========================================================
   CATEGORY SELECTION
========================================================= */

function selectCategory(categoryId) {

    currentCategory = categoryId;

    const category =
        teaCoffeeCategories.find(
            item => item.id === categoryId
        );

    if (!category) return;

    renderCategories();

    applyProducts();

    const title =
        document.getElementById(
            "selectedCategoryTitle"
        );

    if (title) {

        title.textContent =
            category.name;

    }

    document
        .querySelector(".products-section")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}


/* =========================================================
   PRODUCT FILTER
========================================================= */

function applyProducts() {

    const searchInput =
        document.getElementById(
            "teaCoffeeSearch"
        );

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    let products;

    if (currentCategory === "top-picks") {

        products =
            teaCoffeeProducts.filter(
                product => product.topPick === true
            );

    } else {

        products =
            teaCoffeeProducts.filter(
                product =>
                    product.category ===
                    currentCategory
            );
    }

    if (search) {

        products =
            products.filter(product => {

                const text =
                    `${product.name}
                    ${product.brand}
                    ${product.category}
                    ${product.unit}`.toLowerCase();

                return text.includes(search);

            });
    }

    currentProducts = products;

    applySorting();

    renderProducts();
}


/* =========================================================
   SORT
========================================================= */

function applySorting() {

    const sort =
        document.getElementById(
            "sortProducts"
        )?.value || "relevance";

    if (sort === "price-low") {

        currentProducts.sort(
            (a, b) =>
                a.price - b.price
        );

    } else if (sort === "price-high") {

        currentProducts.sort(
            (a, b) =>
                b.price - a.price
        );

    } else if (sort === "rating") {

        currentProducts.sort(
            (a, b) =>
                b.rating - a.rating
        );
    }
}


/* =========================================================
   PRODUCT IMAGE / FALLBACK
========================================================= */

function productVisual(product) {

    const image =
        normalizeZeptoImage(
            product.image
        );

    const icon =
        product.category.includes("coffee")
            ? "bi-cup-hot"
            : product.category.includes("tea")
                ? "bi-cup-hot"
                : "bi-box-seam";

    return `
        <div class="product-visual">

            ${
                image
                    ? `
                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(product.name)}"
                            class="product-image"
                            loading="lazy"
                            onerror="handleProductImageError(this)"
                        >
                    `
                    : ""
            }

            <div
                class="product-fallback"
                style="${image
                    ? "display:none;"
                    : "display:flex;"
                }"
            >

                <i class="bi ${icon} fallback-icon"></i>

                <strong>
                    ${escapeHTML(product.brand)}
                </strong>

                <span>
                    ${escapeHTML(product.category)}
                </span>

            </div>

        </div>
    `;
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function renderProductCard(product) {

    const cartItem =
        cart.find(
            item =>
                item.id === product.id
        );

    const quantity =
        cartItem
            ? cartItem.quantity
            : 0;

    const isWishlisted = wishlist.some(item =>
        String(typeof item === "object" ? item.id : item) ===
        String(product.id)
    );

    const discount =
        product.mrp > product.price
            ? Math.round(
                (
                    (product.mrp - product.price)
                    / product.mrp
                ) * 100
            )
            : 0;

    return `
        <article
            class="product-card"
            data-id="${escapeHTML(product.id)}"
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
                    class="wishlist-btn ${
                        isWishlisted
                            ? "active"
                            : ""
                    }"
                    type="button"
                    aria-label="Wishlist"
                    onclick="toggleWishlist('${escapeHTML(product.id)}')"
                >
                    <i class="bi bi-heart"></i>
                </button>

                ${productVisual(product)}

            </div>


            <div class="product-info">

                <div class="product-brand">
                    ${escapeHTML(product.brand)}
                </div>

                <div
                    class="product-name"
                    title="${escapeHTML(product.name)}"
                >
                    ${escapeHTML(product.name)}
                </div>

                <div class="product-unit">
                    ${escapeHTML(product.unit)}
                </div>

                <div class="product-rating">

                    <span class="rating-box">
                        ${product.rating}
                        <i class="bi bi-star-fill"></i>
                    </span>

                    <span class="review-count">
                        (${escapeHTML(product.reviews)})
                    </span>

                </div>


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
                                        onclick="changeCartQuantity(
                                            '${escapeHTML(product.id)}',
                                            -1
                                        )"
                                    >
                                        −
                                    </button>

                                    <span>
                                        ${quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onclick="changeCartQuantity(
                                            '${escapeHTML(product.id)}',
                                            1
                                        )"
                                    >
                                        +
                                    </button>

                                </div>
                            `
                            : `
                                <button
                                    class="add-btn"
                                    type="button"
                                    onclick="addToCart(
                                        '${escapeHTML(product.id)}'
                                    )"
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


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const grid =
        document.getElementById(
            "productsGrid"
        );

    const empty =
        document.getElementById(
            "emptyState"
        );

    const count =
        document.getElementById(
            "productCount"
        );

    if (!grid) return;

    if (count) {

        count.textContent =
            `${currentProducts.length} ${
                currentProducts.length === 1
                    ? "product"
                    : "products"
            }`;
    }

    if (!currentProducts.length) {

        grid.innerHTML = "";

        if (empty) {
            empty.style.display =
                "block";
        }

        return;
    }

    if (empty) {
        empty.style.display =
            "none";
    }

    grid.innerHTML =
        currentProducts
            .map(renderProductCard)
            .join("");
}


/* =========================================================
   CART
========================================================= */

function addToCart(productId) {

    const product =
        teaCoffeeProducts.find(
            item =>
                item.id === productId
        );

    if (!product) return;

    const existing =
        cart.find(
            item =>
                item.id === productId
        );

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    updateCartUI();

    renderProducts();

    showToast(
        `${product.name} added to cart`
    );
}


function changeCartQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            cartItem =>
                cartItem.id === productId
        );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    cartItem.id !== productId
            );
    }

    saveCart();

    updateCartUI();

    renderProducts();
}


/* =========================================================
   CART UI
========================================================= */

function updateCartUI() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );

    const itemCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    if (cartCount) {

        cartCount.textContent =
            itemCount;
    }

    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;
    }

    renderCartItems();
}


/* =========================================================
   CART ITEMS
========================================================= */

function renderCartItems() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const empty =
        document.getElementById(
            "emptyCart"
        );

    const subtotalElement =
        document.getElementById(
            "cartSubtotal"
        );

    const summary =
        document.getElementById(
            "cartItemSummary"
        );

    const checkout =
        document.getElementById(
            "checkoutBtn"
        );

    if (!container) return;

    if (!cart.length) {

        container.innerHTML = "";

        if (empty) {
            empty.style.display =
                "flex";
        }

        if (subtotalElement) {
            subtotalElement.textContent =
                "₹0";
        }

        if (summary) {
            summary.textContent =
                "0 items";
        }

        if (checkout) {
            checkout.disabled = true;
        }

        return;
    }

    if (empty) {
        empty.style.display =
            "none";
    }

    let subtotal = 0;

    let totalItems = 0;

    container.innerHTML =
        cart.map(item => {

            const product =
                teaCoffeeProducts.find(
                    product =>
                        product.id === item.id
                );

            if (!product) {
                return "";
            }

            subtotal +=
                product.price *
                item.quantity;

            totalItems +=
                item.quantity;

            const image =
                normalizeZeptoImage(
                    product.image
                );

            return `
                <div class="cart-item">

                    <div class="cart-item-image">

                        ${
                            image
                                ? `
                                    <img
                                        src="${escapeHTML(image)}"
                                        alt="${escapeHTML(product.name)}"
                                        loading="lazy"
                                        onerror="handleCartImageError(this)"
                                    >
                                `
                                : ""
                        }

                        <div
                            class="cart-item-fallback"
                            style="${image
                                ? "display:none;"
                                : "display:flex;"
                            }"
                        >
                            <i class="bi bi-cup-hot"></i>
                        </div>

                    </div>


                    <div class="cart-item-details">

                        <h4>
                            ${escapeHTML(product.name)}
                        </h4>

                        <p>
                            ${escapeHTML(product.unit)}
                        </p>

                        <span class="cart-item-price">
                            ₹${product.price}
                        </span>


                        <div class="cart-item-actions">

                            <div class="cart-qty">

                                <button
                                    type="button"
                                    onclick="changeCartQuantity(
                                        '${escapeHTML(product.id)}',
                                        -1
                                    )"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    type="button"
                                    onclick="changeCartQuantity(
                                        '${escapeHTML(product.id)}',
                                        1
                                    )"
                                >
                                    +
                                </button>

                            </div>


                            <button
                                class="cart-remove"
                                type="button"
                                onclick="removeFromCart(
                                    '${escapeHTML(product.id)}'
                                )"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>
            `;

        }).join("");


    if (subtotalElement) {

        subtotalElement.textContent =
            `₹${subtotal.toLocaleString("en-IN")}`;

    }

    if (summary) {

        summary.textContent =
            `${totalItems} ${
                totalItems === 1
                    ? "item"
                    : "items"
            }`;

    }

    if (checkout) {

        checkout.disabled = false;
    }
}


/* =========================================================
   REMOVE CART
========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );

    saveCart();

    updateCartUI();

    renderProducts();

    showToast(
        "Removed from cart"
    );
}


/* =========================================================
   CART DRAWER
========================================================= */

function openCart() {

    document
        .getElementById(
            "cartDrawer"
        )
        ?.classList.add("open");

    document
        .getElementById(
            "cartOverlay"
        )
        ?.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


function closeCart() {

    document
        .getElementById(
            "cartDrawer"
        )
        ?.classList.remove("open");

    document
        .getElementById(
            "cartOverlay"
        )
        ?.classList.remove("show");

    document.body.style.overflow =
        "";
}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(productId) {

    const index = wishlist.findIndex(item =>
        String(typeof item === "object" ? item.id : item) ===
        String(productId)
    );

    const product =
        teaCoffeeProducts.find(
            item =>
                item.id === productId
        );

    if (index >= 0) {

        wishlist.splice(
            index,
            1
        );

        showToast(
            "Removed from wishlist"
        );

    } else {

        if (product) {
            wishlist.push({
                ...product,
                quantity: 1
            });
        }

        showToast(
            `${product?.name || "Product"} added to wishlist`
        );
    }

    saveWishlist();

    updateCartUI();

    renderProducts();
}


/* =========================================================
   SEARCH
========================================================= */

function handleSearch() {

    const input =
        document.getElementById(
            "teaCoffeeSearch"
        );

    const clear =
        document.getElementById(
            "clearSearch"
        );

    if (!input) return;

    if (clear) {

        clear.classList.toggle(
            "show",
            input.value.length > 0
        );
    }

    applyProducts();

    renderSuggestions(
        input.value.trim()
    );
}


/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

function renderSuggestions(search) {

    const container =
        document.getElementById(
            "searchSuggestions"
        );

    if (!container) return;

    if (!search) {

        container.classList.remove(
            "show"
        );

        return;
    }

    const results =
        teaCoffeeProducts
            .filter(product => {

                const text =
                    `${product.name} ${product.brand}`
                        .toLowerCase();

                return text.includes(
                    search.toLowerCase()
                );

            })
            .slice(0, 6);


    if (!results.length) {

        container.classList.remove(
            "show"
        );

        return;
    }


    container.innerHTML =
        results.map(product => `

            <div
                class="suggestion-item"
                data-id="${escapeHTML(product.id)}"
            >

                <i class="bi bi-search"></i>

                <span>
                    ${escapeHTML(product.name)}
                </span>

            </div>

        `).join("");


    container.classList.add(
        "show"
    );


    container
        .querySelectorAll(
            ".suggestion-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    const input =
                        document.getElementById(
                            "teaCoffeeSearch"
                        );

                    const product =
                        teaCoffeeProducts.find(
                            p =>
                                p.id ===
                                item.dataset.id
                        );

                    if (input && product) {

                        input.value =
                            product.name;
                    }

                    container.classList.remove(
                        "show"
                    );

                    applyProducts();

                }
            );

        });
}


/* =========================================================
   BRAND SEARCH
========================================================= */

function searchBrand(brand) {

    const input =
        document.getElementById(
            "teaCoffeeSearch"
        );

    if (input) {

        input.value =
            brand;

        input.focus();
    }

    applyProducts();

    document
        .querySelector(
            ".products-section"
        )
        ?.scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================================================
   RESET
========================================================= */

function resetProducts() {

    const input =
        document.getElementById(
            "teaCoffeeSearch"
        );

    if (input) {

        input.value =
            "";
    }

    currentCategory =
        "top-picks";

    renderCategories();

    const title =
        document.getElementById(
            "selectedCategoryTitle"
        );

    if (title) {

        title.textContent =
            "Top Picks";
    }

    applyProducts();
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "lmToast"
        );

    if (!toast) return;

    const text =
        toast.querySelector(
            "span"
        );

    if (text) {

        text.textContent =
            message;
    }

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
   LOCATION
========================================================= */

function getLocation() {

    const locationText =
        document.getElementById(
            "locationText"
        );

    if (!locationText) return;

    if (!navigator.geolocation) {

        locationText.textContent =
            "Select your location";

        return;
    }

    navigator.geolocation.getCurrentPosition(

        () => {

            locationText.textContent =
                "Location detected";

        },

        () => {

            locationText.textContent =
                "Select your location";

        },

        {
            timeout: 5000
        }
    );
}


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "LocalMart Tea, Coffee & More JS loaded"
        );

        console.log(
            "Products:",
            teaCoffeeProducts.length
        );

        console.log(
            "Categories:",
            teaCoffeeCategories.length
        );


        renderCategories();

        applyProducts();

        updateCartUI();

        getLocation();


        /* =================================================
           SEARCH
        ================================================= */

        const searchInput =
            document.getElementById(
                "teaCoffeeSearch"
            );

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                handleSearch
            );

        }


        /* =================================================
           CLEAR SEARCH
        ================================================= */

        const clearSearch =
            document.getElementById(
                "clearSearch"
            );

        if (clearSearch) {

            clearSearch.addEventListener(
                "click",
                () => {

                    if (searchInput) {

                        searchInput.value =
                            "";
                    }

                    clearSearch.classList.remove(
                        "show"
                    );

                    document
                        .getElementById(
                            "searchSuggestions"
                        )
                        ?.classList.remove(
                            "show"
                        );

                    applyProducts();

                }
            );

        }


        /* =================================================
           SORT
        ================================================= */

        document
            .getElementById(
                "sortProducts"
            )
            ?.addEventListener(
                "change",
                () => {

                    applySorting();

                    renderProducts();

                }
            );


        /* =================================================
           CART BUTTON
        ================================================= */

        document
            .getElementById(
                "cartBtn"
            )
            ?.addEventListener(
                "click",
                openCart
            );


        /* =================================================
           MOBILE CART
        ================================================= */

        document
            .getElementById(
                "mobileCartBtn"
            )
            ?.addEventListener(
                "click",
                () => {

                    openCart();

                }
            );


        /* =================================================
           CLOSE CART
        ================================================= */

        document
            .getElementById(
                "closeCart"
            )
            ?.addEventListener(
                "click",
                closeCart
            );


        document
            .getElementById(
                "cartOverlay"
            )
            ?.addEventListener(
                "click",
                closeCart
            );


        /* =================================================
           CATEGORY ARROWS
        ================================================= */

        const categoryScroller =
            document.getElementById(
                "teaCoffeeCategories"
            );


        document
            .getElementById(
                "categoryPrev"
            )
            ?.addEventListener(
                "click",
                () => {

                    categoryScroller?.scrollBy({
                        left: -350,
                        behavior: "smooth"
                    });

                }
            );


        document
            .getElementById(
                "categoryNext"
            )
            ?.addEventListener(
                "click",
                () => {

                    categoryScroller?.scrollBy({
                        left: 350,
                        behavior: "smooth"
                    });

                }
            );


        /* =================================================
           MOBILE MENU
        ================================================= */

        document
            .getElementById(
                "mobileMenuBtn"
            )
            ?.addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "mobileNav"
                        )
                        ?.classList.toggle(
                            "show"
                        );

                }
            );


        /* =================================================
           CHECKOUT
        ================================================= */

        document
            .getElementById(
                "checkoutBtn"
            )
            ?.addEventListener(
                "click",
                () => {

                    if (!cart.length) {

                        showToast(
                            "Your cart is empty"
                        );

                        return;
                    }

                    window.location.href =
                        "/grocery/checkout/";

                }
            );


        /* =================================================
           CLOSE SEARCH SUGGESTIONS
        ================================================= */

        document.addEventListener(
            "click",
            event => {

                const searchBox =
                    document.querySelector(
                        ".search-box"
                    );

                if (
                    searchBox &&
                    !searchBox.contains(
                        event.target
                    )
                ) {

                    document
                        .getElementById(
                            "searchSuggestions"
                        )
                        ?.classList.remove(
                            "show"
                        );

                }

            }
        );

    }
);


/* =========================================================
   GLOBALS
========================================================= */

window.selectCategory =
    selectCategory;

window.addToCart =
    addToCart;

window.changeCartQuantity =
    changeCartQuantity;

window.removeFromCart =
    removeFromCart;

window.toggleWishlist =
    toggleWishlist;

window.searchBrand =
    searchBrand;

window.resetProducts =
    resetProducts;

window.openCart =
    openCart;

window.closeCart =
    closeCart;

window.handleProductImageError =
    handleProductImageError;

window.handleCartImageError =
    handleCartImageError;

window.teaCoffeeProducts =
    teaCoffeeProducts;

window.teaCoffeeCategories =
    teaCoffeeCategories;

