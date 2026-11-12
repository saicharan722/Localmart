"use strict";

/* ============================================================
   LOCALMART - ICE CREAM & MORE
   ZEPTO / JIOMART STYLE
============================================================ */


/* ============================================================
   PRODUCTS
============================================================ */

const iceCreamTubsProducts = [
    {
        id: "tub-001",
        name: "Kwality Wall's Blushing Strawberry Ice Cream 700 ml (Carton)",
        category: "tubs",
        unit: "700 ml",
        price: 119,
        mrp: 125,
        discount: 5,
        rating: 4.3,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/strwaberryautomatic700mcarton-02.jpg.c0ac05ad59.jpg",
        description: "Creamy strawberry ice cream with a delicious fruity flavour."
    },

    {
        id: "tub-002",
        name: "Kwality Wall's Alphonso Mango Ice Cream Tub 700 ml",
        category: "tubs",
        unit: "700 ml",
        price: 166,
        mrp: 175,
        discount: 5,
        rating: 4.4,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/icehakz6ar2zgqfc02.jpg.e92b3cb82d.jpg",
        description: "Rich Alphonso mango flavoured ice cream."
    },

    {
        id: "tub-003",
        name: "Kwality Walls American Nuts Frozen Dessert 700 ml",
        category: "tubs",
        unit: "700 ml",
        price: 171,
        mrp: 180,
        discount: 5,
        rating: 4.3,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/americannutsautomatic700mlcarton-02.jpg.e80865b530.jpg",
        description: "Creamy frozen dessert loaded with crunchy nuts."
    },

    {
        id: "tub-004",
        name: "Kwality Walls Hawaiian Nuts Sundae Ice Cream 700 ml",
        category: "tubs",
        unit: "700 ml",
        price: 261,
        mrp: 275,
        discount: 5,
        rating: 4.4,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/kwalitywallshawaiiannuts700mltub-02.jpg.09ae40d2ff.jpg",
        description: "Premium sundae ice cream with delicious nuts."
    },

    {
        id: "tub-005",
        name: "Kwality Wall's Chocochip Ice Cream Tub 700 ml",
        category: "tubs",
        unit: "700 ml",
        price: 200,
        mrp: 210,
        discount: 5,
        rating: 4.4,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/icehakz6vmpnhdtf02.jpg.2a18c5882d.jpg",
        description: "Smooth chocolate ice cream with delicious chocolate chips."
    },

    {
        id: "tub-006",
        name: "Kwality Wall's Kesar Bhog Ice Cream 500 ml Tub",
        category: "tubs",
        unit: "500 ml",
        price: 238,
        mrp: 250,
        discount: 5,
        rating: 4.3,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/kwalitywallskesarbhogtub500ml-02.jpg.87961a51ad.jpg",
        description: "Rich and creamy kesar flavoured ice cream."
    },

    {
        id: "tub-007",
        name: "Kwality Wall's Butterscotch Ice Cream Tub 700 ml",
        category: "tubs",
        unit: "700 ml",
        price: 166,
        mrp: 175,
        discount: 5,
        rating: 4.4,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4915394551.jpg.30d1a59847.jpg",
        description: "Creamy butterscotch ice cream with a rich caramel flavour."
    },

    {
        id: "tub-008",
        name: "Kwality Wall's Alphonso Mango Ice Cream 700 ml",
        category: "tubs",
        unit: "700 ml",
        price: 138,
        mrp: 145,
        discount: 5,
        rating: 4.3,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4945746441.jpg.a836e892ae.jpg",
        description: "Smooth and creamy Alphonso mango ice cream."
    },

    {
        id: "tub-009",
        name: "Kwality Wall's Choco Brownie Fudge Ice Cream 700 ml",
        category: "tubs",
        unit: "700 ml",
        price: 280,
        mrp: 295,
        discount: 5,
        rating: 4.5,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/kwalitywallschocobrowniefrudgetub700ml-02.jpg.d505a085fb.jpg",
        description: "Decadent chocolate ice cream with brownie fudge."
    },

    {
        id: "tub-010",
        name: "Kwality Wall's Fruitang Blackcurrant Raisin Ice Cream 700 ml",
        category: "tubs",
        unit: "700 ml",
        price: 157,
        mrp: 165,
        discount: 5,
        rating: 4.2,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/blackcurrantautomatic700mlcarton-02.jpg.b388fec356.jpg",
        description: "Fruity blackcurrant ice cream with delicious raisin pieces."
    },

    {
        id: "tub-011",
        name: "Kwality Wall's Dazzli Tutti Frutti Ice Cream 700 ml (Carton)",
        category: "tubs",
        unit: "700 ml",
        price: 143,
        mrp: 150,
        discount: 5,
        rating: 4.2,
        reviews: 24000,
        brand: "Kwality Wall's",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/tuttifrutimanual700mlcarton-02.jpg.78d1c7e0b0.jpg",
        description: "Creamy tutti frutti ice cream with colourful fruit pieces."
    }
];





const frozenVegSnacksProducts = [
    {
        id: "fvs-001",
        name: "ITC Master Chef Veg Burger Patty 540 g",
        brand: "ITC Master Chef",
        category: "frozen-veg-snacks",
        unit: "540 g",
        price: 125,
        mrp: 250,
        rating: 4.3,
        reviews: 5100,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004929289771.jpg.c7a94ca45b.jpg"
    },
    {
        id: "fvs-002",
        name: "ITC Master Chef Chilli Garlic Potato Shots 500 g",
        brand: "ITC Master Chef",
        category: "frozen-veg-snacks",
        unit: "500 g",
        price: 115,
        mrp: 230,
        rating: 4.4,
        reviews: 17400,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/89060651697561.jpg.123f8e5a3c.jpg"
    },
    {
        id: "fvs-003",
        name: "Hyfun French Fries 1.5 kg",
        brand: "Hyfun",
        category: "frozen-veg-snacks",
        unit: "1.5 kg",
        price: 318,
        mrp: 400,
        rating: 4.4,
        reviews: 18400,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004931769011.jpg.85238baffe.jpg"
    },
    {
        id: "fvs-004",
        name: "McCain Smiles Value Pack 750 g",
        brand: "McCain",
        category: "frozen-veg-snacks",
        unit: "750 g",
        price: 210,
        mrp: 281,
        rating: 4.5,
        reviews: 32100,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004909836021.jpg.3df089ba69.jpg"
    },
    {
        id: "fvs-005",
        name: "McCain Aloo Tikki 400 g",
        brand: "McCain",
        category: "frozen-veg-snacks",
        unit: "400 g",
        price: 128,
        mrp: 135,
        rating: 4.4,
        reviews: 28600,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004904393821.jpg.92753ba30e.jpg"
    },
    {
        id: "fvs-006",
        name: "McCain Potato Cheese Shotz 400 g",
        brand: "McCain",
        category: "frozen-veg-snacks",
        unit: "400 g",
        price: 182,
        mrp: 272,
        rating: 4.5,
        reviews: 19800,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004911109481.jpg.00f8f9e0d5.jpg"
    },
    {
        id: "fvs-007",
        name: "ITC Master Chef Veggie Pizza Pocket 340 g",
        brand: "ITC Master Chef",
        category: "frozen-veg-snacks",
        unit: "340 g",
        price: 128,
        mrp: 185,
        rating: 4.3,
        reviews: 11200,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4915865641.jpg.15b53ac71e.jpg"
    },
    {
        id: "fvs-008",
        name: "McCain French Fries 420 g",
        brand: "McCain",
        category: "frozen-veg-snacks",
        unit: "420 g",
        price: 99,
        mrp: 129,
        rating: 4.5,
        reviews: 38600,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900688411.jpg.21f04502ac.jpg"
    },
    {
        id: "fvs-009",
        name: "McCain Smiles 415 g",
        brand: "McCain",
        category: "frozen-veg-snacks",
        unit: "415 g",
        price: 148,
        mrp: 156,
        rating: 4.5,
        reviews: 24100,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900688421.jpg.6bf94a5d90.jpg"
    },
    {
        id: "fvs-010",
        name: "Hyfun Veg Paradise Regular Base Pizza 240 g",
        brand: "Hyfun",
        category: "frozen-veg-snacks",
        unit: "240 g",
        price: 139,
        mrp: 220,
        rating: 4.2,
        reviews: 8400,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004942997831.jpg.fee047ecde.jpg"
    },
    {
        id: "fvs-011",
        name: "Wow! Momo Corn & Cheese Momos 10 pcs",
        brand: "Wow! Momo",
        category: "frozen-veg-snacks",
        unit: "10 Pieces",
        price: 165,
        mrp: 195,
        rating: 4.3,
        reviews: 9700,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004936919781.jpg.ed9cb821a3.jpg"
    },
    {
        id: "fvs-012",
        name: "McCain Chilli Garlic Potato Bites 420 g",
        brand: "McCain",
        category: "frozen-veg-snacks",
        unit: "420 g",
        price: 122,
        mrp: 163,
        rating: 4.4,
        reviews: 16300,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900688431.jpg.f2c4932f8b.jpg"
    },
    {
        id: "fvs-013",
        name: "McCain Masala Fries 420 g",
        brand: "McCain",
        category: "frozen-veg-snacks",
        unit: "420 g",
        price: 153,
        mrp: 180,
        rating: 4.4,
        reviews: 7400,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004910710071.jpg.46583b8271.jpg"
    },
    {
        id: "fvs-014",
        name: "McCain Cheesy Pizza Fingers 250 g",
        brand: "McCain",
        category: "frozen-veg-snacks",
        unit: "250 g",
        price: 180,
        mrp: 215,
        rating: 4.3,
        reviews: 7800,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004936577111.jpg.6c7946bab3.jpg"
    },
    {
        id: "fvs-015",
        name: "McCain Veggie Fingers 400 g",
        brand: "McCain",
        category: "frozen-veg-snacks",
        unit: "400 g",
        price: 171,
        mrp: 180,
        rating: 4.3,
        reviews: 12100,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004911601221.jpg.8124fe1497.jpg"
    },
    {
        id: "fvs-016",
        name: "Amul Happy Treats French Fries 1.25 kg",
        brand: "Amul",
        category: "frozen-veg-snacks",
        unit: "1.25 kg",
        price: 185,
        mrp: 215,
        rating: 4.4,
        reviews: 13600,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004914174661.jpg.2df6c7d7bf.jpg"
    }
];


const iceCreamSticksProducts = [

    {
        id: "stick-001",
        name: "Kwality Walls Magnum Almonds Ice Cream 62 g",
        brand: "Kwality Walls",
        category: "sticks-cones-cups",
        unit: "62 g",
        price: 76,
        mrp: 80,
        discount: 5,
        rating: 4.7,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/1.jpg.c7339d40ed.jpg",
        description: "Kwality Walls Magnum Almonds Ice Cream"
    },

    {
        id: "stick-002",
        name: "Kwality Walls Black Forest Feast Ice Cream 70 ml",
        brand: "Kwality Walls",
        category: "sticks-cones-cups",
        unit: "70 ml",
        price: 40,
        mrp: 45,
        discount: 11,
        rating: 4.7,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.p/ng/8909106045095.01previewdownload.png.88ed4fb80a.png",
        description: "Kwality Walls Black Forest Feast Ice Cream"
    },

    {
        id: "stick-003",
        name: "Magnum Pistachio Ice Cream 61 g",
        brand: "Magnum",
        category: "sticks-cones-cups",
        unit: "61 g",
        price: 86,
        mrp: 90,
        discount: 4,
        rating: 4.7,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/01.jpg.e00b1c3daf.jpg",
        description: "Magnum Pistachio Ice Cream"
    },

    {
        id: "stick-004",
        name: "Kwality Walls Magnum Caramel Pop Ice Cream 75 ml",
        brand: "Kwality Walls",
        category: "sticks-cones-cups",
        unit: "75 ml",
        price: 67,
        mrp: 70,
        discount: 4,
        rating: 4.7,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/caramelpopblinkit-1500x150002-01.jpg.b163050fdf.jpg",
        description: "Kwality Walls Magnum Caramel Pop Ice Cream"
    },

    {
        id: "stick-005",
        name: "Kwality Walls Magnum Brownie Ice Cream 61 g",
        brand: "Kwality Walls",
        category: "sticks-cones-cups",
        unit: "61 g",
        price: 76,
        mrp: 80,
        discount: 5,
        rating: 4.7,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/01.jpg.9f6bdea6aa.jpg",
        description: "Kwality Walls Magnum Brownie Ice Cream"
    },

    {
        id: "stick-006",
        name: "Kwality Wall's Slow Churned Chocolate Ice Cream 700 ml",
        brand: "Kwality Walls",
        category: "sticks-cones-cups",
        unit: "700 ml",
        price: 138,
        mrp: 145,
        discount: 5,
        rating: 4.7,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/chocolateautomatic700mlcarton-02.jpg.2bce5a4271.jpg",
        description: "Kwality Wall's Slow Churned Chocolate Ice Cream"
    },

    {
        id: "stick-007",
        name: "Kwality Walls Magnum Choco Truffle Ice Cream 63 g",
        brand: "Kwality Walls",
        category: "sticks-cones-cups",
        unit: "63 g",
        price: 66,
        mrp: 70,
        discount: 6,
        rating: 4.7,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/1.jpg.ede9ad0775.jpg",
        description: "Kwality Walls Magnum Choco Truffle Ice Cream"
    },

    {
        id: "stick-008",
        name: "Kwality Walls Kulfeez Malai Kulfi Ice Cream 49 g",
        brand: "Kwality Walls",
        category: "sticks-cones-cups",
        unit: "49 g",
        price: 27,
        mrp: 30,
        discount: 10,
        rating: 4.7,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004946149241.jpg.277004a8f7.jpg",
        description: "Kwality Walls Kulfeez Malai Kulfi Ice Cream"
    },

    {
        id: "stick-009",
        name: "Kwality Walls Kulfeez Kesar Pista Kulfi Ice Cream 66 g",
        brand: "Kwality Walls",
        category: "sticks-cones-cups",
        unit: "66 g",
        price: 38,
        mrp: 40,
        discount: 5,
        rating: 4.7,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004946148131.jpg.5265ec58bd.jpg",
        description: "Kwality Walls Kulfeez Kesar Pista Kulfi Ice Cream"
    }

];



const frozenVegetablesProducts = [

    {
        id: "fv-001",
        name: "Trimurti Kings Sweet Corn Frozen 500 g",
        brand: "Trimurti Kings",
        category: "frozen-vegetables",
        unit: "500 g",
        price: 51,
        mrp: 110,
        discount: 54,
        rating: 4.5,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004904491851.jpg.ca47e9af4d.jpg",
        description: "Trimurti Kings Sweet Corn Frozen"
    },

    {
        id: "fv-002",
        name: "Trimurti King's Premium Frozen Sweet Corn 1 kg",
        brand: "Trimurti King's",
        category: "frozen-vegetables",
        unit: "1 kg",
        price: 99,
        mrp: 200,
        discount: 51,
        rating: 4.5,
        reviews: 0,
        deliveryTime: "24 mins",
        image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004904491841.jpg.11e3e19032.jpg",
        description: "Trimurti King's Premium Frozen Sweet Corn"
    }

];




/* ============================================================
   ALL PRODUCTS
============================================================ */

const iceCreamProducts = [
    ...iceCreamTubsProducts,
    ...iceCreamSticksProducts,
    ...frozenVegSnacksProducts,
    ...frozenVegetablesProducts


];


/* ============================================================
   CATEGORIES
============================================================ */

const iceCreamCategories = [

    {
        id: "frozen-veg-snacks",
        name: "Frozen Veg Snacks",
        image: "https://cdn1.jiomartjcp.com/v2/jiomart-fynd/jio-pd/original/category/pictures/square-logo/original/9TTvopvss-frozen-veg-snacks-20251103.png"
    },

    {
        id: "sticks-cones-cups",
        name: "Sticks, Cones & Cups",
        image: "https://cdn1.jiomartjcp.com/v2/jiomart-fynd/jio-pd/original/products/pictures/item/free/original/FBsI-fjVI8-sticks-cones-cups-20250711.png"
    },

    {
        id: "tubs",
        name: "Tubs",
        image: "https://cdn1.jiomartjcp.com/v2/jiomart-fynd/jio-pd/original/products/pictures/item/free/original/pBxXVPyGcS-tubs-20250711.png"
    },

    {
        id: "frozen-vegetables",
        name: "Frozen Vegetables",
        image: "https://cdn1.jiomartjcp.com/v2/jiomart-fynd/jio-pd/original/category/pictures/square-logo/original/Ntoic97Ev-frozen-vegetables-20200520.png"
    },

    

];




/* ============================================================
   STORAGE
============================================================ */

const CART_KEY = "localmartGroceryCart";
const WISHLIST_KEY = "localmartGroceryWishlist";

let cart = loadJSON(CART_KEY, loadJSON("localmartIceCreamTubsCart", []));
let wishlist = loadJSON(WISHLIST_KEY, loadJSON("localmartIceCreamTubsWishlist", [])).map(item => {
    if (item && typeof item === "object") return item;
    return iceCreamProducts.find(product => String(product.id) === String(item)) || {
        id: item, name: "Saved grocery product", category: "Grocery",
        price: 0, mrp: 0, image: "", quantity: 1
    };
});
localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
localStorage.removeItem("localmartIceCreamTubsWishlist");

let currentCategory = "tubs";
let currentSort = "relevance";
let currentSearch = "";

let selectedBrand = "all";
let selectedPrice = "all";


/* ============================================================
   HELPERS
============================================================ */

function loadJSON(key, fallback) {

    try {

        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        const parsed = JSON.parse(value);

        return Array.isArray(parsed)
            ? parsed
            : fallback;

    } catch (error) {

        console.warn("LocalStorage error:", key, error);

        return fallback;
    }
}


function money(value) {

    return "₹" +
        Number(value).toLocaleString("en-IN");
}


function getProduct(id) {

    return iceCreamProducts.find(
        product => product.id === id
    );
}


function getCartItem(id) {

    return cart.find(
        item => item.id === id
    );
}


function calculateDiscount(price, mrp) {

    if (!mrp || mrp <= price) {
        return 0;
    }

    return Math.round(
        ((mrp - price) / mrp) * 100
    );
}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function parseReviewCount(value) {

    const text = String(value)
        .toLowerCase()
        .replace(/,/g, "")
        .trim();

    if (text.endsWith("k")) {
        return parseFloat(text) * 1000;
    }

    if (text.endsWith("m")) {
        return parseFloat(text) * 1000000;
    }

    return parseFloat(text) || 0;
}


/* ============================================================
   CATEGORY NAME
============================================================ */

function getCategoryName(id) {

    const category = iceCreamCategories.find(
        item => item.id === id
    );

    return category
        ? category.name
        : "Ice Cream & Frozen";
}


/* ============================================================
   CATEGORY IMAGE
============================================================ */

function categoryImageHTML(category) {

    if (!category.image) {

        return `
            <div class="category-image">
                <span class="category-emoji">🍨</span>
            </div>
        `;
    }

    return `
        <div class="category-image">

            <img
                src="${escapeHTML(category.image)}"
                alt="${escapeHTML(category.name)}"
                loading="lazy"
                decoding="async"
                onerror="this.style.display='none'; this.parentElement.classList.add('image-error');"
            >

        </div>
    `;
}


/* ============================================================
   RENDER CATEGORIES
============================================================ */

function renderCategories() {

    const container =
        document.getElementById("categoryScroll");

    if (!container) {
        return;
    }

    container.innerHTML =
        iceCreamCategories.map(category => {

            const active =
                currentCategory === category.id
                    ? "active"
                    : "";

            return `
                <button
                    type="button"
                    class="category-item ${active}"
                    data-category="${escapeHTML(category.id)}"
                    aria-label="${escapeHTML(category.name)}"
                >

                    ${categoryImageHTML(category)}

                    <span class="category-name">
                        ${escapeHTML(category.name)}
                    </span>

                </button>
            `;

        }).join("");
}


/* ============================================================
   PRODUCT IMAGE
============================================================ */

function getFallbackEmoji(product) {

    const name =
        String(product.name).toLowerCase();

    if (
        name.includes("chocolate") ||
        name.includes("brownie") ||
        name.includes("choco")
    ) {
        return "🍫";
    }

    if (name.includes("vanilla")) {
        return "🍦";
    }

    if (name.includes("butterscotch")) {
        return "🍨";
    }

    if (
        name.includes("berry") ||
        name.includes("fruit") ||
        name.includes("currant") ||
        name.includes("strawberry")
    ) {
        return "🍓";
    }

    if (
        name.includes("mango") ||
        name.includes("aamras")
    ) {
        return "🥭";
    }

    if (
        name.includes("kesar") ||
        name.includes("kulfi")
    ) {
        return "🍨";
    }

    return "🍦";
}


function productImageHTML(product) {

    const image =
        typeof product.image === "string"
            ? product.image.trim()
            : "";

    const fallback =
        getFallbackEmoji(product);

    if (!image) {

        return `
            <div class="product-fallback">
                ${fallback}
            </div>
        `;
    }

    return `
        <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(product.name)}"
            class="product-image"
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
        >

        <div
            class="product-fallback"
            style="display:none;"
        >
            ${fallback}
        </div>
    `;
}


/* ============================================================
   IMAGE FALLBACKS
============================================================ */

function bindImageFallbacks() {

    document
        .querySelectorAll(".product-image")
        .forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    this.style.display = "none";

                    const fallback =
                        this.nextElementSibling;

                    if (fallback) {
                        fallback.style.display = "flex";
                    }

                },
                { once: true }
            );
        });


    document
        .querySelectorAll(".cart-product-image")
        .forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    this.style.display = "none";

                    const fallback =
                        this.nextElementSibling;

                    if (fallback) {
                        fallback.style.display = "flex";
                    }

                },
                { once: true }
            );
        });
}


/* ============================================================
   FILTER PRODUCTS
============================================================ */

function applyFilters(products) {

    let filtered = [...products];


    /* BRAND */

    if (selectedBrand !== "all") {

        filtered =
            filtered.filter(
                product =>
                    product.brand === selectedBrand
            );
    }


    /* PRICE */

    if (selectedPrice === "under-100") {

        filtered =
            filtered.filter(
                product => product.price < 100
            );

    } else if (selectedPrice === "100-200") {

        filtered =
            filtered.filter(
                product =>
                    product.price >= 100 &&
                    product.price <= 200
            );

    } else if (selectedPrice === "200-300") {

        filtered =
            filtered.filter(
                product =>
                    product.price > 200 &&
                    product.price <= 300
            );

    } else if (selectedPrice === "above-300") {

        filtered =
            filtered.filter(
                product => product.price > 300
            );
    }


    return filtered;
}


/* ============================================================
   RENDER PRODUCTS
============================================================ */

function renderProducts() {

    const grid =
        document.getElementById("productsGrid");

    if (!grid) {
        return;
    }


    let products;


    /* CATEGORY */

    if (currentCategory === "all") {

        products = [...iceCreamProducts];

    } else {

        products =
            iceCreamProducts.filter(
                product =>
                    product.category === currentCategory
            );
    }


    /* SEARCH */

    if (currentSearch.trim()) {

        const query =
            currentSearch
                .trim()
                .toLowerCase();

        products =
            products.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(query)

                ||

                product.brand
                    .toLowerCase()
                    .includes(query)

                ||

                product.category
                    .toLowerCase()
                    .includes(query)

            );
    }


    /* FILTERS */

    products =
        applyFilters(products);


    /* SORT */

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
                    b.rating - a.rating
            );

            break;


        default:

            products.sort(
                (a, b) =>
                    parseReviewCount(b.reviews) -
                    parseReviewCount(a.reviews)
            );

            break;
    }


    /* RENDER */

    grid.innerHTML =
        products
            .map(renderProductCard)
            .join("");


    bindImageFallbacks();


    /* COUNT */

    const count =
        document.getElementById("productCount");

    if (count) {

        count.textContent =
            products.length +
            (
                products.length === 1
                    ? " product"
                    : " products"
            );
    }


    /* TITLE */

    const title =
        document.getElementById(
            "selectedCategoryTitle"
        );

    if (title) {

        title.textContent =
            getCategoryName(currentCategory);
    }


    /* EMPTY */

    const empty =
        document.getElementById("emptyState");

    if (empty) {

        empty.style.display =
            products.length
                ? "none"
                : "block";
    }


    updateFilterButtonState();
}


/* ============================================================
   PRODUCT CARD
============================================================ */

function renderProductCard(product) {

    const discount =
        calculateDiscount(
            product.price,
            product.mrp
        );


    const cartItem =
        getCartItem(product.id);


    const quantity =
        cartItem
            ? Number(cartItem.quantity)
            : 0;


    const wished =
        wishlist.some(item => String(typeof item === "object" ? item.id : item) === String(product.id));


    let action;


    if (quantity > 0) {

        action = `
            <div class="qty-control">

                <button
                    type="button"
                    class="qty-btn"
                    data-action="decrease"
                    data-id="${escapeHTML(product.id)}"
                    aria-label="Decrease quantity"
                >
                    −
                </button>

                <span>
                    ${quantity}
                </span>

                <button
                    type="button"
                    class="qty-btn"
                    data-action="increase"
                    data-id="${escapeHTML(product.id)}"
                    aria-label="Increase quantity"
                >
                    +
                </button>

            </div>
        `;

    } else {

        action = `
            <button
                type="button"
                class="add-btn"
                data-action="add"
                data-id="${escapeHTML(product.id)}"
            >
                ADD
            </button>
        `;
    }


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
                    class="wishlist-btn ${wished ? "active" : ""}"
                    data-action="wishlist"
                    data-id="${escapeHTML(product.id)}"
                    aria-label="Add to wishlist"
                >

                    <i class="bi ${
                        wished
                            ? "bi-heart-fill"
                            : "bi-heart"
                    }"></i>

                </button>


                ${productImageHTML(product)}

            </div>


            <div class="product-info">


                <div class="product-brand">
                    ${escapeHTML(product.brand)}
                </div>


                <h3 class="product-name">
                    ${escapeHTML(product.name)}
                </h3>


                <div class="product-unit">
                    ${escapeHTML(product.unit)}
                </div>


                <div class="product-rating">

                    <span class="rating-box">

                        <i class="bi bi-star-fill"></i>

                        ${product.rating}

                    </span>


                    <span class="review-count">

                        (${parseReviewCount(product.reviews).toLocaleString("en-IN")})

                    </span>

                </div>


                <div class="product-bottom">


                    <div class="price-area">

                        <span class="product-price">
                            ${money(product.price)}
                        </span>


                        ${
                            product.mrp > product.price
                                ? `
                                    <span class="product-mrp">
                                        ${money(product.mrp)}
                                    </span>
                                `
                                : ""
                        }

                    </div>


                    ${action}

                </div>

            </div>

        </article>
    `;
}


/* ============================================================
   CART
============================================================ */

function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}


function addToCart(id) {

    const product =
        getProduct(id);

    if (!product) {
        return;
    }


    const existing =
        getCartItem(id);


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


    saveCart();

    renderProducts();

    renderCart();

    updateCounts();

    showToast(
        "Added to cart"
    );
}


function increaseQuantity(id) {

    const item =
        getCartItem(id);

    if (!item) {
        return;
    }


    item.quantity =
        Number(item.quantity) + 1;


    saveCart();

    renderProducts();

    renderCart();

    updateCounts();
}


function decreaseQuantity(id) {

    const item =
        getCartItem(id);

    if (!item) {
        return;
    }


    item.quantity =
        Number(item.quantity) - 1;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    cartItem.id !== id
            );
    }


    saveCart();

    renderProducts();

    renderCart();

    updateCounts();
}


/* ============================================================
   WISHLIST
============================================================ */

function saveWishlist() {

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );
}


function toggleWishlist(id) {

    const index = wishlist.findIndex(item => String(typeof item === "object" ? item.id : item) === String(id));


    if (index >= 0) {

        wishlist.splice(index, 1);

        showToast(
            "Removed from wishlist"
        );

    } else {

        const product = getProduct(id);
        if (product) wishlist.push({ ...product, quantity: 1 });

        showToast(
            "Added to wishlist"
        );
    }


    saveWishlist();

    renderProducts();

    updateCounts();
}


/* ============================================================
   COUNTS
============================================================ */

function updateCounts() {

    const cartTotal =
        cart.reduce(
            (total, item) =>
                total +
                Number(item.quantity),
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {
        cartCount.textContent =
            cartTotal;
    }


    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    if (wishlistCount) {
        wishlistCount.textContent =
            wishlist.length;
    }


    const summary =
        document.getElementById(
            "cartItemSummary"
        );


    if (summary) {

        summary.textContent =
            cartTotal +
            (
                cartTotal === 1
                    ? " item"
                    : " items"
            );
    }
}


/* ============================================================
   CART ITEM
============================================================ */

function renderCartItem(item) {

    const image =
        item.image &&
        String(item.image).trim();


    return `
        <div class="cart-item">

            <div class="cart-item-image">

                ${
                    image

                        ? `
                            <img
                                src="${escapeHTML(image)}"
                                alt="${escapeHTML(item.name)}"
                                class="cart-product-image"
                                loading="lazy"
                                decoding="async"
                                referrerpolicy="no-referrer"
                            >

                            <span
                                class="cart-image-fallback"
                                style="display:none;"
                            >
                                🍨
                            </span>
                        `

                        : `
                            <span>
                                🍨
                            </span>
                        `
                }

            </div>


            <div class="cart-item-details">

                <div class="cart-item-name">
                    ${escapeHTML(item.name)}
                </div>


                <div class="cart-item-unit">
                    ${escapeHTML(item.unit)}
                </div>


                <div class="cart-item-price">
                    ${money(item.price)}
                </div>


                <div class="cart-item-actions">

                    <button
                        type="button"
                        data-action="cart-decrease"
                        data-id="${escapeHTML(item.id)}"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        data-action="cart-increase"
                        data-id="${escapeHTML(item.id)}"
                    >
                        +
                    </button>

                </div>

            </div>

        </div>
    `;
}


/* ============================================================
   RENDER CART
============================================================ */

function renderCart() {

    const body =
        document.getElementById(
            "cartBody"
        );

    if (!body) {
        return;
    }


    const empty =
        document.getElementById(
            "cartEmpty"
        );


    const footer =
        document.getElementById(
            "cartFooter"
        );


    if (!cart.length) {

        body.innerHTML = "";


        if (empty) {
            empty.style.display = "flex";
        }


        if (footer) {
            footer.style.display = "none";
        }


        updateCartTotals(0);

        updateCounts();

        return;
    }


    if (empty) {
        empty.style.display = "none";
    }


    if (footer) {
        footer.style.display = "block";
    }


    body.innerHTML =
        cart
            .map(renderCartItem)
            .join("");


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(item.price) *
                Number(item.quantity),
            0
        );


    updateCartTotals(total);

    updateCounts();

    bindImageFallbacks();
}


/* ============================================================
   CART TOTALS
============================================================ */

function updateCartTotals(total) {

    const subtotal =
        document.getElementById(
            "cartSubtotal"
        );


    if (subtotal) {
        subtotal.textContent =
            money(total);
    }


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (cartTotal) {
        cartTotal.textContent =
            money(total);
    }
}


/* ============================================================
   OPEN CART
============================================================ */

function openCart() {

    renderCart();


    const drawer =
        document.getElementById(
            "cartDrawer"
        );


    const overlay =
        document.getElementById(
            "drawerOverlay"
        );


    if (drawer) {

        drawer.classList.add(
            "open"
        );
    }


    if (overlay) {

        overlay.classList.add(
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

function closeCart() {

    const drawer =
        document.getElementById(
            "cartDrawer"
        );


    const overlay =
        document.getElementById(
            "drawerOverlay"
        );


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


    document.body.classList.remove(
        "cart-open"
    );
}


/* ============================================================
   TOAST
============================================================ */

let toastTimeout;


function showToast(message) {

    const toast =
        document.getElementById(
            "lmToast"
        );

    if (!toast) {
        return;
    }


    toast.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>${escapeHTML(message)}</span>
    `;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );
}


/* ============================================================
   SEARCH
============================================================ */

function setupSearch() {

    const input =
        document.getElementById("groceryNavSearch") ||
        document.getElementById("iceCreamSearch");


    const suggestions =
        document.getElementById(
            "searchSuggestions"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        function () {

            currentSearch =
                this.value;


            renderSearchSuggestions();

            renderProducts();
        }
    );


    input.addEventListener(
        "focus",
        function () {

            renderSearchSuggestions();
        }
    );
}


function renderSearchSuggestions() {

    const input =
        document.getElementById("groceryNavSearch") ||
        document.getElementById("iceCreamSearch");


    const suggestions =
        document.getElementById(
            "searchSuggestions"
        );


    if (!input || !suggestions) {
        return;
    }


    const query =
        input.value
            .trim()
            .toLowerCase();


    if (!query) {

        suggestions.innerHTML = "";

        suggestions.style.display =
            "none";

        return;
    }


    const matches =
        iceCreamProducts
            .filter(product =>
                product.name
                    .toLowerCase()
                    .includes(query)
                ||
                product.brand
                    .toLowerCase()
                    .includes(query)
            )
            .slice(0, 6);


    if (!matches.length) {

        suggestions.innerHTML = `
            <div class="suggestion-empty">
                No products found
            </div>
        `;

        suggestions.style.display =
            "block";

        return;
    }


    suggestions.innerHTML =
        matches
            .map(product => `
                <button
                    type="button"
                    class="search-suggestion-item"
                    data-suggestion="${escapeHTML(product.name)}"
                >

                    <i class="bi bi-search"></i>

                    <span>
                        ${escapeHTML(product.name)}
                    </span>

                </button>
            `)
            .join("");


    suggestions.style.display =
        "block";
}


function setupClearSearch() {

    const button =
        document.getElementById(
            "clearSearch"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            const input =
                document.getElementById(
                    "iceCreamSearch"
                );


            currentSearch = "";


            if (input) {

                input.value = "";

                input.focus();
            }


            const suggestions =
                document.getElementById(
                    "searchSuggestions"
                );


            if (suggestions) {

                suggestions.innerHTML = "";

                suggestions.style.display =
                    "none";
            }


            renderProducts();
        }
    );
}


/* ============================================================
   FILTER BUTTONS
============================================================ */

function getAvailableBrands() {

    return [
        ...new Set(
            iceCreamProducts
                .map(product => product.brand)
                .filter(Boolean)
        )
    ].sort();
}


function createFilterPanel() {

    if (
        document.getElementById(
            "iceCreamFilterPanel"
        )
    ) {
        return;
    }


    const panel =
        document.createElement("div");


    panel.id =
        "iceCreamFilterPanel";


    panel.className =
        "ice-cream-filter-panel";


    panel.innerHTML = `

        <div class="filter-panel-header">

            <div>

                <h3>
                    Filters
                </h3>

                <span>
                    Filter ice creams
                </span>

            </div>

            <button
                type="button"
                id="closeIceCreamFilters"
            >
                <i class="bi bi-x-lg"></i>
            </button>

        </div>


        <div class="filter-panel-body">


            <!-- BRAND -->

            <div class="filter-group">

                <h4>
                    Brands
                </h4>

                <div
                    class="filter-options"
                    id="brandFilterOptions"
                ></div>

            </div>


            <!-- PRICE -->

            <div class="filter-group">

                <h4>
                    Price
                </h4>

                <div
                    class="filter-options"
                    id="priceFilterOptions"
                >

                    <label class="filter-option">

                        <input
                            type="radio"
                            name="icePrice"
                            value="all"
                            checked
                        >

                        <span>
                            All Prices
                        </span>

                    </label>


                    <label class="filter-option">

                        <input
                            type="radio"
                            name="icePrice"
                            value="under-100"
                        >

                        <span>
                            Under ₹100
                        </span>

                    </label>


                    <label class="filter-option">

                        <input
                            type="radio"
                            name="icePrice"
                            value="100-200"
                        >

                        <span>
                            ₹100 - ₹200
                        </span>

                    </label>


                    <label class="filter-option">

                        <input
                            type="radio"
                            name="icePrice"
                            value="200-300"
                        >

                        <span>
                            ₹200 - ₹300
                        </span>

                    </label>


                    <label class="filter-option">

                        <input
                            type="radio"
                            name="icePrice"
                            value="above-300"
                        >

                        <span>
                            Above ₹300
                        </span>

                    </label>

                </div>

            </div>

        </div>


        <div class="filter-panel-footer">

            <button
                type="button"
                class="filter-reset-btn"
                id="resetIceCreamFilters"
            >
                Clear All
            </button>


            <button
                type="button"
                class="filter-apply-btn"
                id="applyIceCreamFilters"
            >
                Apply Filters
            </button>

        </div>

    `;


    document.body.appendChild(panel);


    renderBrandOptions();


    panel
        .querySelector(
            "#closeIceCreamFilters"
        )
        .addEventListener(
            "click",
            closeFilterPanel
        );


    panel
        .querySelector(
            "#resetIceCreamFilters"
        )
        .addEventListener(
            "click",
            resetFilters
        );


    panel
        .querySelector(
            "#applyIceCreamFilters"
        )
        .addEventListener(
            "click",
            applyFilterPanel
        );
}


function renderBrandOptions() {

    const container =
        document.getElementById(
            "brandFilterOptions"
        );


    if (!container) {
        return;
    }


    const brands =
        getAvailableBrands();


    container.innerHTML = `

        <label class="filter-option">

            <input
                type="radio"
                name="iceBrand"
                value="all"
                ${selectedBrand === "all" ? "checked" : ""}
            >

            <span>
                All Brands
            </span>

        </label>

    `;


    brands.forEach(brand => {

        container.innerHTML += `

            <label class="filter-option">

                <input
                    type="radio"
                    name="iceBrand"
                    value="${escapeHTML(brand)}"
                    ${
                        selectedBrand === brand
                            ? "checked"
                            : ""
                    }
                >

                <span>
                    ${escapeHTML(brand)}
                </span>

            </label>

        `;

    });
}


function openFilterPanel() {

    createFilterPanel();


    const panel =
        document.getElementById(
            "iceCreamFilterPanel"
        );


    if (panel) {

        renderBrandOptions();

        panel.classList.add("show");
    }
}


function closeFilterPanel() {

    const panel =
        document.getElementById(
            "iceCreamFilterPanel"
        );


    if (panel) {

        panel.classList.remove(
            "show"
        );
    }
}


function applyFilterPanel() {

    const brand =
        document.querySelector(
            'input[name="iceBrand"]:checked'
        );


    const price =
        document.querySelector(
            'input[name="icePrice"]:checked'
        );


    selectedBrand =
        brand
            ? brand.value
            : "all";


    selectedPrice =
        price
            ? price.value
            : "all";


    closeFilterPanel();

    renderProducts();


    const active =
        selectedBrand !== "all" ||
        selectedPrice !== "all";


    showToast(
        active
            ? "Filters applied"
            : "All filters cleared"
    );
}


function resetFilters() {

    selectedBrand = "all";
    selectedPrice = "all";


    document
        .querySelectorAll(
            'input[name="iceBrand"]'
        )
        .forEach(input => {

            input.checked =
                input.value === "all";
        });


    document
        .querySelectorAll(
            'input[name="icePrice"]'
        )
        .forEach(input => {

            input.checked =
                input.value === "all";
        });


    renderProducts();
}


function updateFilterButtonState() {

    const brandButton =
        document.getElementById(
            "brandFilterBtn"
        );


    const priceButton =
        document.getElementById(
            "priceFilterBtn"
        );


    if (brandButton) {

        brandButton.classList.toggle(
            "active",
            selectedBrand !== "all"
        );
    }


    if (priceButton) {

        priceButton.classList.toggle(
            "active",
            selectedPrice !== "all"
        );
    }
}


function setupFilters() {

    createFilterPanel();


    const brandButton =
        document.getElementById(
            "brandFilterBtn"
        );


    const priceButton =
        document.getElementById(
            "priceFilterBtn"
        );


    const allButton =
        document.getElementById(
            "allFiltersBtn"
        );


    if (brandButton) {

        brandButton.addEventListener(
            "click",
            openFilterPanel
        );
    }


    if (priceButton) {

        priceButton.addEventListener(
            "click",
            openFilterPanel
        );
    }


    if (allButton) {

        allButton.addEventListener(
            "click",
            openFilterPanel
        );
    }
}


/* ============================================================
   SORT
============================================================ */

function setupSort() {

    const select =
        document.getElementById(
            "sortProducts"
        );


    if (!select) {
        return;
    }


    select.addEventListener(
        "change",
        function () {

            currentSort =
                this.value;

            renderProducts();
        }
    );
}


/* ============================================================
   CATEGORY SELECT
============================================================ */

function selectCategory(category) {

    currentCategory =
        category || "all";


    currentSearch = "";


    const search =
        document.getElementById("groceryNavSearch") ||
        document.getElementById("iceCreamSearch");


    if (search) {
        search.value = "";
    }


    renderCategories();

    renderProducts();


    const products =
        document.getElementById(
            "productsGrid"
        );


    if (products) {

        products.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


/* Compatibility function */

function selectIceCreamCategory(category) {

    selectCategory(category);
}


/* ============================================================
   CATEGORY SCROLLER
============================================================ */

function setupCategoryScroller() {

    const container =
        document.getElementById(
            "categoryScroll"
        );


    const previous =
        document.getElementById(
            "categoryPrev"
        );


    const next =
        document.getElementById(
            "categoryNext"
        );


    if (!container) {
        return;
    }


    if (previous) {

        previous.addEventListener(
            "click",
            function () {

                container.scrollBy({
                    left: -350,
                    behavior: "smooth"
                });

            }
        );
    }


    if (next) {

        next.addEventListener(
            "click",
            function () {

                container.scrollBy({
                    left: 350,
                    behavior: "smooth"
                });

            }
        );
    }
}


/* ============================================================
   MOBILE MENU
============================================================ */

function setupMobileMenu() {

    const button =
        document.getElementById(
            "mobileMenuBtn"
        );


    const nav =
        document.getElementById(
            "mobileNav"
        );


    if (!button || !nav) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            nav.classList.toggle(
                "show"
            );

        }
    );
}


/* ============================================================
   MOBILE CART
============================================================ */

function setupMobileCart() {

    const button =
        document.getElementById(
            "mobileCartBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            openCart();

        }
    );
}


/* ============================================================
   MAIN CLICK HANDLER
============================================================ */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (button) {

            const action =
                button.dataset.action;


            const id =
                button.dataset.id;


            switch (action) {

                case "add":

                    addToCart(id);

                    break;


                case "increase":

                    increaseQuantity(id);

                    break;


                case "decrease":

                    decreaseQuantity(id);

                    break;


                case "wishlist":

                    toggleWishlist(id);

                    break;


                case "cart-increase":

                    increaseQuantity(id);

                    break;


                case "cart-decrease":

                    decreaseQuantity(id);

                    break;
            }

            return;
        }


        /* SEARCH SUGGESTION */

        const suggestion =
            event.target.closest(
                "[data-suggestion]"
            );


        if (suggestion) {

            const value =
                suggestion.dataset.suggestion;


            const input =
                document.getElementById(
                    "iceCreamSearch"
                );


            if (input) {

                input.value =
                    value;

                currentSearch =
                    value;
            }


            const suggestions =
                document.getElementById(
                    "searchSuggestions"
                );


            if (suggestions) {

                suggestions.innerHTML = "";

                suggestions.style.display =
                    "none";
            }


            renderProducts();

            return;
        }


        /* CATEGORY */

        const categoryButton =
            event.target.closest(
                "[data-category]"
            );


        if (categoryButton) {

            selectCategory(
                categoryButton.dataset.category
            );

            return;
        }


        /* CART */

        if (
            event.target.closest(
                "#cartBtn"
            )
        ) {

            openCart();

            return;
        }


        if (
            event.target.closest(
                "#closeCart"
            )
        ) {

            closeCart();

            return;
        }


        if (
            event.target.closest(
                "#drawerOverlay"
            )
        ) {

            closeCart();

            return;
        }


        /* CLOSE SEARCH */

        if (
            !event.target.closest(
                ".search-box"
            )
        ) {

            const suggestions =
                document.getElementById(
                    "searchSuggestions"
                );


            if (suggestions) {

                suggestions.style.display =
                    "none";
            }
        }

    }
);


/* ============================================================
   RESET PRODUCTS
============================================================ */

function resetProducts() {

    currentCategory = "tubs";
    currentSearch = "";

    selectedBrand = "all";
    selectedPrice = "all";

    currentSort = "relevance";


    const search =
        document.getElementById(
            "iceCreamSearch"
        );


    if (search) {
        search.value = "";
    }


    const sort =
        document.getElementById(
            "sortProducts"
        );


    if (sort) {
        sort.value = "relevance";
    }


    renderCategories();

    renderProducts();

    showToast(
        "Showing Tubs"
    );
}


/* ============================================================
   ESC KEY
============================================================ */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCart();

            closeFilterPanel();
        }
    }
);


/* ============================================================
   CHECKOUT
============================================================ */

function setupCheckout() {

    const button =
        document.getElementById(
            "checkoutBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

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
   INITIALIZATION
============================================================ */

function initializeIceCreamPage() {

    renderCategories();

    renderProducts();

    renderCart();

    updateCounts();

    setupSearch();

    setupClearSearch();

    setupSort();

    setupFilters();

    setupCategoryScroller();

    setupMobileMenu();

    setupMobileCart();

    setupCheckout();


    console.log(
        "LocalMart Ice Cream & More JS loaded"
    );


    console.log(
        "Total Products:",
        iceCreamProducts.length
    );


    console.log(
        "Tubs:",
        iceCreamTubsProducts.length
    );


    console.log(
        "Sticks:",
        iceCreamSticksProducts.length
    );


    console.log(
        "Categories:",
        iceCreamCategories.length
    );
}


/* ============================================================
   DOM READY
============================================================ */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeIceCreamPage
    );

} else {

    initializeIceCreamPage();
}


/* ============================================================
   GLOBALS
============================================================ */

window.iceCreamProducts =
    iceCreamProducts;

window.iceCreamTubsProducts =
    iceCreamTubsProducts;

window.iceCreamSticksProducts =
    iceCreamSticksProducts;

window.iceCreamCategories =
    iceCreamCategories;

window.openIceCreamCart =
    openCart;

window.closeIceCreamCart =
    closeCart;

window.addIceCreamToCart =
    addToCart;

window.toggleIceCreamWishlist =
    toggleWishlist;

window.selectIceCreamCategory =
    selectIceCreamCategory;

window.selectCategory =
    selectCategory;

window.resetProducts =
    resetProducts;
