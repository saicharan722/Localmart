"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const CART_KEY = "localmartGroceryCart";
    const WISHLIST_KEY = "localmartGroceryWishlist";

    let activeCategory = "all";
    let searchText = "";
    let maxPrice = 500;

    let selectedBrands = [];
    let selectedDiscounts = [];
    let selectedRatings = [];
    let stockOnly = false;


    /* =========================================================
       PRODUCTS
    ========================================================= */

    const drinksJuicesProducts = [

        {
            id: "dj-001",
            name: "Paper Boat Swing Plus Zesty Pomegranate Juice",
            unit: "1.2 L",
            price: 92,
            mrp: 160,
            brand: "Paper Boat",
            category: "juices",
            rating: 4.6,
            reviews: 1200,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004942307711.jpg.86a9cffc10.jpg"
        },

        {
            id: "dj-002",
            name: "B Natural Select Tender Coconut Water",
            unit: "750 ml",
            price: 75,
            mrp: 150,
            brand: "B Natural",
            category: "packaged-water",
            rating: 4.5,
            reviews: 980,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4936351331.jpg.23582836c3.jpg"
        },

        {
            id: "dj-003",
            name: "Ensure Chocolate Powder",
            unit: "375 g",
            price: 741,
            mrp: 780,
            brand: "Ensure",
            category: "nutritional-drinks",
            rating: 4.6,
            reviews: 850,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004907407061.jpg.96872be909.jpg"
        },

        {
            id: "dj-004",
            name: "B Natural Mixed Fruit No Added Sugar Juice",
            unit: "750 ml",
            price: 76,
            mrp: 152,
            brand: "B Natural",
            category: "juices",
            rating: 4.5,
            reviews: 720,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4945697842.jpg.3c7aed5de3.jpg"
        },

        {
            id: "dj-005",
            name: "Real Fruit Power Vitamin Boost Guava Juice",
            unit: "1 L",
            price: 91,
            mrp: 150,
            brand: "Real",
            category: "juices",
            rating: 4.5,
            reviews: 1100,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004928619601.jpg.8f02c3e407.jpg"
        },

        {
            id: "dj-006",
            name: "Paper Boat Swing Plus Zesty Pomegranate Juice",
            unit: "600 ml",
            price: 38,
            mrp: 40,
            brand: "Paper Boat",
            category: "juices",
            rating: 4.5,
            reviews: 650,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004928623011.jpg.99621d9674.jpg"
        },

        {
            id: "dj-007",
            name: "B Natural Mixed Fruit Juice",
            unit: "1 L",
            price: 76,
            mrp: 152,
            brand: "B Natural",
            category: "juices",
            rating: 4.5,
            reviews: 1300,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4902499711.jpg.5e3a0a6d4b.jpg"
        },

        {
            id: "dj-008",
            name: "B Natural Litchi Juice",
            unit: "1 L",
            price: 76,
            mrp: 152,
            brand: "B Natural",
            category: "juices",
            rating: 4.4,
            reviews: 800,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4900019781.jpg.897f595344.jpg"
        },

        {
            id: "dj-009",
            name: "Erzl Electrolyte Orange Drink",
            unit: "200 ml",
            price: 39,
            mrp: 42,
            brand: "Erzl",
            category: "energy-drinks",
            rating: 4.3,
            reviews: 210,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004947678501.jpg.5480900f70.jpg"
        },

        {
            id: "dj-010",
            name: "Tang Mango Instant Drink Mix",
            unit: "500 g",
            price: 129,
            mrp: 150,
            brand: "Tang",
            category: "syrups-powders-mixes",
            rating: 4.6,
            reviews: 1900,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900051131.jpg.10895d9393.jpg"
        },

        {
            id: "dj-011",
            name: "Pediasure Vanilla Flavored Nutrition Drink",
            unit: "375 g",
            price: 684,
            mrp: 720,
            brand: "Pediasure",
            category: "nutritional-drinks",
            rating: 4.7,
            reviews: 1600,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004910612101.jpg.c545e6d3fe.jpg"
        },

        {
            id: "dj-012",
            name: "B Natural No Added Sugar Guava Juice",
            unit: "750 ml",
            price: 76,
            mrp: 152,
            brand: "B Natural",
            category: "juices",
            rating: 4.5,
            reviews: 650,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4945697852.jpg.8f03d54c24.jpg"
        },

        {
            id: "dj-013",
            name: "B Natural Guava Gush Fruit Drink",
            unit: "1 L",
            price: 76,
            mrp: 152,
            brand: "B Natural",
            category: "juices",
            rating: 4.4,
            reviews: 700,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4902499671.jpg.76ab216b16.jpg"
        },

        {
            id: "dj-014",
            name: "Paper Boat Nata De Coco Lychee Fruit Beverage",
            unit: "250 ml",
            price: 38,
            mrp: 40,
            brand: "Paper Boat",
            category: "flavoured-water",
            rating: 4.5,
            reviews: 500,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004943549401.jpg.09581f8175.jpg"
        },

        {
            id: "dj-015",
            name: "Fast & Up Reload Orange Rush Energy Drink",
            unit: "500 ml",
            price: 66,
            mrp: 70,
            brand: "Fast & Up",
            category: "energy-drinks",
            rating: 4.5,
            reviews: 340,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004943582091.jpg.d7c3b41218.jpg"
        },

        {
            id: "dj-016",
            name: "Red Bull Energy Drink",
            unit: "250 ml",
            price: 115,
            mrp: 125,
            brand: "Red Bull",
            category: "energy-drinks",
            rating: 4.7,
            reviews: 2500,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4900050911.jpg.9e335c40e9.jpg"
        },

        {
            id: "dj-017",
            name: "Real Fruit Power Vitamin Boost Mixed Fruit Juice",
            unit: "1 L",
            price: 91,
            mrp: 150,
            brand: "Real",
            category: "juices",
            rating: 4.5,
            reviews: 1000,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004928619581.jpg.64fd76ed04.jpg"
        },

        {
            id: "dj-018",
            name: "Amul Pro Chocolate Drink",
            unit: "500 g",
            price: 135,
            mrp: 180,
            brand: "Amul",
            category: "nutritional-drinks",
            rating: 4.6,
            reviews: 800,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.p/ng/01heroimageamulpromaltbeveragepouch500g.png.6383cbb233.png"
        },

        {
            id: "dj-019",
            name: "Pediasure Chocolate Flavored Nutrition Drink",
            unit: "375 g",
            price: 684,
            mrp: 720,
            brand: "Pediasure",
            category: "nutritional-drinks",
            rating: 4.7,
            reviews: 1200,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004910612091.jpg.73ea320c3b.jpg"
        },


        /* =========================
           COLD DRINKS
        ========================= */

        {
            id: "dj-020",
            name: "Thums Up X Force Drink",
            unit: "300 ml",
            price: 38,
            mrp: 40,
            brand: "Thums Up",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 900,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004945697911.jpg.a472f9cb13.jpg"
        },

        {
            id: "dj-023",
            name: "Mountain Dew Soft Drink",
            unit: "2.25 L",
            price: 75,
            mrp: 100,
            brand: "Mountain Dew",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 1200,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900052011.jpg.6d563cf8d2.jpg"
        },

        {
            id: "dj-024",
            name: "Jameson Non-Alcoholic Ginger Ale Carbonated Water",
            unit: "250 ml",
            price: 95,
            mrp: 100,
            brand: "Jameson",
            category: "cold-drinks",
            rating: 4.3,
            reviews: 180,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004943585371.jpg.769f736242.jpg"
        },

        {
            id: "dj-026",
            name: "Pepsi",
            unit: "2.25 L",
            price: 65,
            mrp: 90,
            brand: "Pepsi",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 1500,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900041761.jpg.cc0b107134.jpg"
        },

        {
            id: "dj-037",
            name: "Fanta Orange",
            unit: "750 ml",
            price: 37,
            mrp: 40,
            brand: "Fanta",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 1100,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004910859331.jpg.f252356c33.jpg"
        },

        {
            id: "dj-038",
            name: "7 Up Lemon Flavour Soft Drink",
            unit: "2.25 L",
            price: 65,
            mrp: 90,
            brand: "7 Up",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 950,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900052001.jpg.7fa5e9d88f.jpg"
        },

        {
            id: "dj-039",
            name: "Sprite",
            unit: "750 ml",
            price: 37,
            mrp: 40,
            brand: "Sprite",
            category: "cold-drinks",
            rating: 4.6,
            reviews: 1300,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004910859341.jpg.0553119c65.jpg"
        },

        {
            id: "dj-044",
            name: "Appy Fizz",
            unit: "600 ml",
            price: 38,
            mrp: 40,
            brand: "Appy Fizz",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 1000,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004913764331.jpg.a268174d91.jpg"
        },

        {
            id: "dj-050",
            name: "Thums Up",
            unit: "2.25 L",
            price: 83,
            mrp: 90,
            brand: "Thums Up",
            category: "cold-drinks",
            rating: 4.6,
            reviews: 1800,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900051341.jpg.8b42a99a3f.jpg"
        },

        {
            id: "dj-053",
            name: "Campa Lemon",
            unit: "2 L",
            price: 53,
            mrp: 80,
            brand: "Campa",
            category: "cold-drinks",
            rating: 4.3,
            reviews: 500,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004936960131.jpg.24152b9020.jpg"
        },

        {
            id: "dj-063",
            name: "Mirinda Orange",
            unit: "2.25 L",
            price: 65,
            mrp: 90,
            brand: "Mirinda",
            category: "cold-drinks",
            rating: 4.4,
            reviews: 900,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900041771.jpg.7d08e1066a.jpg"
        },

        {
            id: "dj-067",
            name: "Coca Cola",
            unit: "300 ml",
            price: 38,
            mrp: 40,
            brand: "Coca Cola",
            category: "cold-drinks",
            rating: 4.6,
            reviews: 1600,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004908093411.jpg.0258261deb.jpg"
        },

        {
            id: "dj-070",
            name: "Pepsi Black Zero Sugar",
            unit: "300 ml",
            price: 38,
            mrp: 40,
            brand: "Pepsi",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 800,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004943573011.jpg.628f244713.jpg"
        },

        {
            id: "dj-083",
            name: "Coca Cola",
            unit: "750 ml",
            price: 37,
            mrp: 40,
            brand: "Coca Cola",
            category: "cold-drinks",
            rating: 4.6,
            reviews: 1200,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004910859321.jpg.7d5d8a5630.jpg"
        },

        
        {
            id: "dj-088",
            name: "Coca-Cola No Sugar Soft Drink 250 ml (Pack of 8)",
            unit: "2000 ml",
            price: 144,
            mrp: 160,
            brand: "Coca Cola",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 650,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004916963961.jpg.2f87190e86.jpg"
        },

        {
            id: "dj-089",
            name: "Limca Lime N Lemon Soft Drink",
            unit: "300 ml",
            price: 38,
            mrp: 40,
            brand: "Limca",
            category: "cold-drinks",
            rating: 4.4,
            reviews: 600,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900051351.jpg.61cf94907b.jpg"
        },

        {
            id: "dj-090",
            name: "Pepsi Can",
            unit: "300 ml",
            price: 35,
            mrp: 40,
            brand: "Pepsi",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 500,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900012291.jpg.81f7338328.jpg"
        },

        {
            id: "dj-091",
            name: "Mirinda Orange",
            unit: "300 ml",
            price: 38,
            mrp: 40,
            brand: "Mirinda",
            category: "cold-drinks",
            rating: 4.4,
            reviews: 450,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/4900041731.jpg.b37037aa7f.jpg"
        },

        {
            id: "dj-092",
            name: "Absolut Mixers Lime & Mint Carbonated Fruit Drink",
            unit: "250 ml",
            price: 95,
            mrp: 100,
            brand: "Absolut Mixers",
            category: "cold-drinks",
            rating: 4.3,
            reviews: 300,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004944074391.jpg.745e50d4dc.jpg"
        },

        {
            id: "dj-093",
            name: "Coca Cola Zero Sugar",
            unit: "750 ml",
            price: 38,
            mrp: 40,
            brand: "Coca Cola",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 600,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004928623771.jpg.45e7ead7a3.jpg"
        },

        {
            id: "dj-094",
            name: "Sprite",
            unit: "300 ml",
            price: 38,
            mrp: 40,
            brand: "Sprite",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 700,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/sprite-300-ml-can-0-20210923.jpg.444a5804a4.jpg"
        },

        {
            id: "dj-095",
            name: "Sprite Zero Sugar Carbonated Water",
            unit: "300 ml",
            price: 36,
            mrp: 40,
            brand: "Sprite",
            category: "cold-drinks",
            rating: 4.4,
            reviews: 400,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004943150331.jpg.31f1cd3a63.jpg"
        },

        {
            id: "dj-096",
            name: "Sprite Lemon-Lime Flavoured Soft Drink (600 ml+140 ml Free)",
            unit: "740 ml",
            price: 33,
            mrp: 35,
            brand: "Sprite",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 350,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004900018001.jpg.e12091532e.jpg"
        },

        {
            id: "dj-097",
            name: "Limca",
            unit: "250 ml",
            price: 19,
            mrp: 20,
            brand: "Limca",
            category: "cold-drinks",
            rating: 4.4,
            reviews: 300,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004913736741.jpg.bca25d8faf.jpg"
        },

        {
            id: "dj-098",
            name: "Coolberg Non Alcoholic Cranberry Beer",
            unit: "330 ml",
            price: 81,
            mrp: 109,
            brand: "Coolberg",
            category: "cold-drinks",
            rating: 4.3,
            reviews: 400,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/coolberg-non-alcoholic-cranberry-beer-330-ml-0-20211026.jpg.49e5f7ec4f.jpg"
        },

        {
            id: "dj-099",
            name: "Coolberg Non Alcoholic Malt Beer",
            unit: "330 ml",
            price: 81,
            mrp: 109,
            brand: "Coolberg",
            category: "cold-drinks",
            rating: 4.3,
            reviews: 350,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/coolberg-non-alcoholic-malt-beer-330-ml-0-20211026.jpg.dfb7d33b6a.jpg"
        },

        {
            id: "dj-100",
            name: "Coolberg Non Alcoholic Mint Beer",
            unit: "330 ml",
            price: 81,
            mrp: 109,
            brand: "Coolberg",
            category: "cold-drinks",
            rating: 4.3,
            reviews: 300,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/coolberg-non-alcoholic-mint-beer-330-ml-0-20211026.jpg.5d7e970bf6.jpg"
        },

        {
            id: "dj-101",
            name: "Coca-Cola No Sugar Soft Drink 250 ml Pack of 8",
            unit: "2000 ml",
            price: 144,
            mrp: 160,
            brand: "Coca Cola",
            category: "cold-drinks",
            rating: 4.5,
            reviews: 650,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004916963961.jpg.2f87190e86.jpg"
        },

        {
            id: "dj-102",
            name: "Predator Energy Drink",
            unit: "300 ml",
            price: 57,
            mrp: 60,
            brand: "Predator",
            category: "energy-drinks",
            rating: 4.4,
            reviews: 500,
            inStock: true,
            image: "https://cdn1.jiomartjcp.com/v2/catalog-cloud/jiomar/t.resize%28w:300%29/images/othe/egurhk/.j/pg/0000000004936805601.jpg.4707a20b23.jpg"
        }

    ];


    /* =========================================================
       DOM
    ========================================================= */

    const grid =
        document.getElementById("productsGrid");

    const productCount =
        document.getElementById("productCount");

    const searchInput =
        document.getElementById("groceryNavSearch") ||
        document.getElementById("drinkSearch") ||
        document.getElementById("drinksSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const suggestions =
        document.getElementById("searchSuggestions");

    const sortSelect =
        document.getElementById("sortProducts");

    const priceFilter =
        document.getElementById("priceFilter");

    const priceValue =
        document.getElementById("priceValue");

    const emptyState =
        document.getElementById("emptyState");

    const emptyReset =
        document.getElementById("emptyReset");

    const stockFilter =
        document.getElementById("stockFilter");

    const wishlistCount =
        document.getElementById("wishlistCount");

    const cartCount =
        document.getElementById("cartCount");

    const cartDrawer =
        document.getElementById("cartDrawer");

    const drawerOverlay =
        document.getElementById("drawerOverlay");

    const cartBody =
        document.getElementById("cartBody");

    const cartEmpty =
        document.getElementById("cartEmpty");

    const cartFooter =
        document.getElementById("cartFooter");

    const cartSubtotal =
        document.getElementById("cartSubtotal");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartItemSummary =
        document.getElementById("cartItemSummary");

    const toast =
        document.getElementById("lmToast");


    /* =========================================================
       STORAGE
    ========================================================= */

    function getCart() {
        try {
            return JSON.parse(
                localStorage.getItem(CART_KEY) || localStorage.getItem("localmartDrinksJuicesCart")
            ) || [];
        } catch {
            return [];
        }
    }


    function saveCart(cart) {
        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );
    }


    function getWishlist() {
        try {
            const shared = localStorage.getItem(WISHLIST_KEY);
            const wishlist = JSON.parse(shared || localStorage.getItem("localmartDrinksJuicesWishlist") || "[]");
            if (!shared && wishlist.length) {
                localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
                localStorage.removeItem("localmartDrinksJuicesWishlist");
            }
            return Array.isArray(wishlist) ? wishlist : [];
        } catch {
            return [];
        }
    }


    function saveWishlist(wishlist) {
        localStorage.setItem(
            WISHLIST_KEY,
            JSON.stringify(wishlist)
        );
    }


    /* =========================================================
       HELPERS
    ========================================================= */

    function escapeHTML(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    function getDiscount(product) {

        if (
            !product.mrp ||
            product.mrp <= product.price
        ) {
            return 0;
        }

        return Math.round(
            ((product.mrp - product.price) /
                product.mrp) * 100
        );
    }


    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 1800);
    }


    /* =========================================================
       CATEGORY FILTER
    ========================================================= */

    function filterByCategory(category) {

        activeCategory = category || "all";

        console.log(
            "Selected category:",
            activeCategory
        );

        document
            .querySelectorAll(".jm-drinks-category-card")
            .forEach(card => {

                const cardCategory =
                    card.dataset.category || "all";

                card.classList.toggle(
                    "active",
                    cardCategory === activeCategory
                );
            });


        /* Also update sidebar category checkboxes */

        document
            .querySelectorAll(".category-filter")
            .forEach(input => {

                input.checked =
                    activeCategory !== "all" &&
                    input.value === activeCategory;
            });


        displayProducts();
    }


    /* =========================================================
       CATEGORY CLICK
       ONLY ONE HANDLER
    ========================================================= */

    document.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".jm-drinks-category-card"
                );

            if (!card) return;

            event.preventDefault();

            const category =
                card.dataset.category || "all";

            filterByCategory(category);
        }
    );


    /* =========================================================
       CATEGORY ARROWS
    ========================================================= */

    const drinksCategoryContainer =
        document.getElementById(
            "drinksJuicesCategories"
        );

    const drinksCategoryPrev =
        document.getElementById(
            "drinksCategoryPrev"
        );

    const drinksCategoryNext =
        document.getElementById(
            "drinksCategoryNext"
        );


    drinksCategoryPrev?.addEventListener(
        "click",
        () => {

            drinksCategoryContainer?.scrollBy({
                left: -350,
                behavior: "smooth"
            });
        }
    );


    drinksCategoryNext?.addEventListener(
        "click",
        () => {

            drinksCategoryContainer?.scrollBy({
                left: 350,
                behavior: "smooth"
            });
        }
    );


    /* =========================================================
       FILTER PRODUCTS
    ========================================================= */

    function getFilteredProducts() {

        let products =
            [...drinksJuicesProducts];


        /* CATEGORY */

        if (activeCategory !== "all") {

            products =
                products.filter(product =>

                    String(product.category)
                        .trim()
                        .toLowerCase() ===

                    String(activeCategory)
                        .trim()
                        .toLowerCase()
                );
        }


        /* SEARCH */

        const query =
            searchInput?.value
                ?.trim()
                .toLowerCase() || "";


        if (query) {

            products =
                products.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(query)

                    ||

                    product.brand
                        .toLowerCase()
                        .includes(query)
                );
        }


        /* BRAND */

        if (selectedBrands.length) {

            products =
                products.filter(product =>
                    selectedBrands.includes(
                        product.brand
                    )
                );
        }


        /* DISCOUNT */

        if (selectedDiscounts.length) {

            products =
                products.filter(product => {

                    const discount =
                        getDiscount(product);

                    return selectedDiscounts.some(
                        value =>
                            discount >= value
                    );
                });
        }


        /* RATING */

        if (selectedRatings.length) {

            products =
                products.filter(product => {

                    return selectedRatings.some(
                        value =>
                            product.rating >= value
                    );
                });
        }


        /* PRICE */

        if (maxPrice < 500) {

            products =
                products.filter(
                    product =>
                        product.price <= maxPrice
                );
        }


        /* STOCK */

        if (stockOnly) {

            products =
                products.filter(
                    product =>
                        product.inStock !== false
                );
        }


        /* SORT */

        if (sortSelect) {

            const sort =
                sortSelect.value;

            if (sort === "price-low") {

                products.sort(
                    (a, b) =>
                        a.price - b.price
                );
            }

            else if (sort === "price-high") {

                products.sort(
                    (a, b) =>
                        b.price - a.price
                );
            }

            else if (sort === "rating") {

                products.sort(
                    (a, b) =>
                        b.rating - a.rating
                );
            }

            else if (sort === "discount") {

                products.sort(
                    (a, b) =>
                        getDiscount(b) -
                        getDiscount(a)
                );
            }
        }


        return products;
    }


    /* =========================================================
       PRODUCT CARD
    ========================================================= */

    function productCard(product) {

        const cart =
            getCart();

        const wishlist =
            getWishlist();


        const cartItem =
            cart.find(
                item =>
                    item.id === product.id
            );


        const wished =
            wishlist.some(
                item =>
                    item.id === product.id
            );


        const discount =
            getDiscount(product);


        const imageHTML =
            product.image

                ? `
                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        onerror="this.closest('.product-image').classList.add('image-error'); this.style.display='none';"
                    >
                  `

                : `
                    <div class="image-placeholder">
                        Product Image
                    </div>
                  `;


        const buttonHTML =
            cartItem

                ? `
                    <div class="qty-control">

                        <button
                            type="button"
                            data-action="decrease"
                            data-id="${product.id}"
                        >
                            −
                        </button>

                        <span>
                            ${cartItem.quantity}
                        </span>

                        <button
                            type="button"
                            data-action="increase"
                            data-id="${product.id}"
                        >
                            +
                        </button>

                    </div>
                  `

                : `
                    <button
                        type="button"
                        class="add-btn"
                        data-action="add"
                        data-id="${product.id}"
                    >
                        ADD
                    </button>
                  `;


        return `

            <article
                class="product-card"
                data-product-id="${product.id}"
            >

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


                <div class="product-image">
                    ${imageHTML}
                </div>


                <div class="product-content">

                    <div class="product-brand">
                        ${escapeHTML(product.brand)}
                    </div>

                    <div class="product-name">
                        ${escapeHTML(product.name)}
                    </div>

                    <div class="product-unit">
                        ${escapeHTML(product.unit)}
                    </div>


                    <div class="product-rating">

                        <span class="rating-box">
                            ★ ${product.rating}
                        </span>

                        <span class="rating-count">
                            (${product.reviews.toLocaleString()})
                        </span>

                    </div>


                    <div class="price-row">

                        <strong class="product-price">
                            ₹${product.price}
                        </strong>

                        ${
                            product.mrp >
                            product.price
                                ? `
                                    <span class="product-mrp">
                                        ₹${product.mrp}
                                    </span>
                                  `
                                : ""
                        }

                        ${
                            discount > 0
                                ? `
                                    <span class="product-discount">
                                        ${discount}% OFF
                                    </span>
                                  `
                                : ""
                        }

                    </div>


                    <div class="delivery-text">
                        <i class="bi bi-lightning-charge-fill"></i>
                        Delivery in 10-30 mins
                    </div>


                    <div class="add-area">
                        ${buttonHTML}
                    </div>

                </div>

            </article>
        `;
    }


    /* =========================================================
       DISPLAY PRODUCTS
    ========================================================= */

    function displayProducts() {

        if (!grid) return;

        const products =
            getFilteredProducts();


        if (productCount) {

            productCount.textContent =
                `${products.length} Products`;
        }


        if (!products.length) {

            grid.innerHTML = "";

            if (emptyState) {
                emptyState.style.display =
                    "block";
            }

            return;
        }


        if (emptyState) {
            emptyState.style.display =
                "none";
        }


        grid.innerHTML =
            products
                .map(productCard)
                .join("");


        console.log(
            "Category:",
            activeCategory,
            "| Products:",
            products.length
        );
    }


    /* =========================================================
       SEARCH
    ========================================================= */

    searchInput?.addEventListener(
        "input",
        event => {

            searchText =
                event.target.value.trim();


            if (clearSearch) {

                clearSearch.style.display =
                    searchText
                        ? "block"
                        : "none";
            }


            displaySuggestions();
            displayProducts();
        }
    );


    clearSearch?.addEventListener(
        "click",
        () => {

            if (searchInput) {
                searchInput.value = "";
            }

            searchText = "";

            clearSearch.style.display =
                "none";

            if (suggestions) {
                suggestions.style.display =
                    "none";
            }

            displayProducts();
        }
    );


    function displaySuggestions() {

        if (!suggestions) return;

        if (!searchText) {

            suggestions.style.display =
                "none";

            return;
        }


        const query =
            searchText.toLowerCase();


        const matches =
            drinksJuicesProducts
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

            suggestions.style.display =
                "none";

            return;
        }


        suggestions.innerHTML =
            matches
                .map(product => `

                    <div
                        class="suggestion-item"
                        data-suggestion-id="${product.id}"
                    >

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <small>
                            ${escapeHTML(product.brand)}
                        </small>

                    </div>

                `)
                .join("");


        suggestions.style.display =
            "block";
    }


    suggestions?.addEventListener(
        "click",
        event => {

            const item =
                event.target.closest(
                    ".suggestion-item"
                );

            if (!item) return;


            const product =
                drinksJuicesProducts.find(
                    p =>
                        p.id ===
                        item.dataset
                            .suggestionId
                );


            if (!product) return;


            searchInput.value =
                product.name;

            searchText =
                product.name;


            suggestions.style.display =
                "none";


            displayProducts();
        }
    );


    /* =========================================================
       BRAND FILTER
    ========================================================= */

    document
        .querySelectorAll(".brand-filter")
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    selectedBrands =
                        [
                            ...document.querySelectorAll(
                                ".brand-filter:checked"
                            )
                        ]
                        .map(input =>
                            input.value
                        );

                    displayProducts();
                }
            );
        });


    /* =========================================================
       DISCOUNT FILTER
    ========================================================= */

    document
        .querySelectorAll(".discount-filter")
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    selectedDiscounts =
                        [
                            ...document.querySelectorAll(
                                ".discount-filter:checked"
                            )
                        ]
                        .map(input =>
                            Number(input.value)
                        );

                    displayProducts();
                }
            );
        });


    /* =========================================================
       RATING FILTER
    ========================================================= */

    document
        .querySelectorAll(".rating-filter")
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    selectedRatings =
                        [
                            ...document.querySelectorAll(
                                ".rating-filter:checked"
                            )
                        ]
                        .map(input =>
                            Number(input.value)
                        );

                    displayProducts();
                }
            );
        });


    /* =========================================================
       SIDEBAR CATEGORY CHECKBOX
    ========================================================= */

    document
        .querySelectorAll(".category-filter")
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    const checked =
                        [
                            ...document.querySelectorAll(
                                ".category-filter:checked"
                            )
                        ]
                        .map(input =>
                            input.value
                        );


                    if (checked.length === 1) {

                        filterByCategory(
                            checked[0]
                        );

                    } else {

                        filterByCategory(
                            "all"
                        );
                    }
                }
            );
        });


    /* =========================================================
       PRICE
    ========================================================= */

    priceFilter?.addEventListener(
        "input",
        event => {

            maxPrice =
                Number(
                    event.target.value
                );


            if (priceValue) {

                priceValue.textContent =
                    maxPrice >= 500
                        ? "₹500+"
                        : `₹${maxPrice}`;
            }


            displayProducts();
        }
    );


    /* =========================================================
       STOCK
    ========================================================= */

    stockFilter?.addEventListener(
        "change",
        event => {

            stockOnly =
                event.target.checked;

            displayProducts();
        }
    );


    /* =========================================================
       SORT
    ========================================================= */

    sortSelect?.addEventListener(
        "change",
        displayProducts
    );


    /* =========================================================
       CART
    ========================================================= */

    function addToCart(id) {

        const product =
            drinksJuicesProducts.find(
                p => p.id === id
            );


        if (!product) return;


        const cart =
            getCart();


        const existing =
            cart.find(
                item => item.id === id
            );


        if (existing) {

            existing.quantity += 1;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });
        }


        saveCart(cart);

        updateCartUI();

        displayProducts();


        showToast(
            `${product.name} added to cart`
        );
    }


    function changeQuantity(id, amount) {

        const cart =
            getCart();


        const item =
            cart.find(
                item =>
                    item.id === id
            );


        if (!item) return;


        item.quantity += amount;


        if (item.quantity <= 0) {

            const index =
                cart.findIndex(
                    item =>
                        item.id === id
                );

            cart.splice(index, 1);
        }


        saveCart(cart);

        updateCartUI();

        displayProducts();
    }


    /* =========================================================
       WISHLIST
    ========================================================= */

    function toggleWishlist(id) {

        const product =
            drinksJuicesProducts.find(
                p => p.id === id
            );


        if (!product) return;


        let wishlist =
            getWishlist();


        const exists =
            wishlist.some(
                item =>
                    item.id === id
            );


        if (exists) {

            wishlist =
                wishlist.filter(
                    item =>
                        item.id !== id
                );

            showToast(
                "Removed from wishlist"
            );

        } else {

            wishlist.push(product);

            showToast(
                "Added to wishlist"
            );
        }


        saveWishlist(wishlist);

        updateWishlistCount();

        displayProducts();
    }

    // Product cards use inline onclick handlers, which resolve functions on window.
    window.toggleWishlist = toggleWishlist;


    /* =========================================================
       PRODUCT BUTTON EVENTS
    ========================================================= */

    grid?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-action]"
                );


            if (!button) return;


            const action =
                button.dataset.action;

            const id =
                button.dataset.id;


            if (action === "add") {
                addToCart(id);
            }


            if (action === "increase") {
                changeQuantity(id, 1);
            }


            if (action === "decrease") {
                changeQuantity(id, -1);
            }


            if (action === "wishlist") {
                toggleWishlist(id);
            }
        }
    );


    /* =========================================================
       WISHLIST COUNT
    ========================================================= */

    function updateWishlistCount() {

        if (!wishlistCount) return;

        wishlistCount.textContent =
            getWishlist().length;
    }


    /* =========================================================
       CART UI
    ========================================================= */

    function updateCartUI() {

        const cart =
            getCart();


        const totalItems =
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );


        const subtotal =
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0
            );


        if (cartCount) {
            cartCount.textContent =
                totalItems;
        }


        if (cartItemSummary) {

            cartItemSummary.textContent =
                `${totalItems} item${
                    totalItems === 1
                        ? ""
                        : "s"
                }`;
        }


        if (cartSubtotal) {
            cartSubtotal.textContent =
                `₹${subtotal}`;
        }


        if (cartTotal) {
            cartTotal.textContent =
                `₹${subtotal}`;
        }


        if (!cart.length) {

            if (cartBody) {
                cartBody.innerHTML = "";
            }

            if (cartEmpty) {
                cartEmpty.style.display =
                    "flex";
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


        if (!cartBody) return;


        cartBody.innerHTML =
            cart
                .map(item => `

                    <div class="cart-item">

                        <div class="cart-item-image">

                            ${
                                item.image

                                    ? `
                                        <img
                                            src="${escapeHTML(item.image)}"
                                            alt="${escapeHTML(item.name)}"
                                        >
                                      `

                                    : `
                                        <span>
                                            Image
                                        </span>
                                      `
                            }

                        </div>


                        <div class="cart-item-info">

                            <div class="cart-item-name">
                                ${escapeHTML(item.name)}
                            </div>

                            <div class="cart-item-price">
                                ₹${item.price}
                            </div>


                            <div class="cart-qty">

                                <button
                                    data-cart-action="decrease"
                                    data-id="${item.id}"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    data-cart-action="increase"
                                    data-id="${item.id}"
                                >
                                    +
                                </button>

                            </div>

                        </div>

                    </div>

                `)
                .join("");
    }


    cartBody?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-cart-action]"
                );


            if (!button) return;


            const amount =
                button.dataset.cartAction ===
                "increase"
                    ? 1
                    : -1;


            changeQuantity(
                button.dataset.id,
                amount
            );
        }
    );


    /* =========================================================
       CART DRAWER
    ========================================================= */

    function openCart() {

        cartDrawer?.classList.add(
            "active"
        );

        drawerOverlay?.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";
    }


    function closeCart() {

        cartDrawer?.classList.remove(
            "active"
        );

        drawerOverlay?.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";
    }


    document
        .getElementById("cartBtn")
        ?.addEventListener(
            "click",
            openCart
        );


    document
        .getElementById("closeCart")
        ?.addEventListener(
            "click",
            closeCart
        );


    drawerOverlay?.addEventListener(
        "click",
        closeCart
    );


    /* =========================================================
       WISHLIST BUTTON
    ========================================================= */

    document
        .getElementById("wishlistBtn")
        ?.addEventListener(
            "click",
            () => {

                const wishlist =
                    getWishlist();


                if (!wishlist.length) {

                    showToast(
                        "Your wishlist is empty"
                    );

                    return;
                }


                showToast(
                    `${wishlist.length} item${
                        wishlist.length === 1
                            ? ""
                            : "s"
                    } in wishlist`
                );
            }
        );


    /* =========================================================
       RESET
    ========================================================= */

    function resetAllFilters() {

        activeCategory = "all";
        searchText = "";
        maxPrice = 500;

        selectedBrands = [];
        selectedDiscounts = [];
        selectedRatings = [];

        stockOnly = false;


        if (searchInput) {
            searchInput.value = "";
        }


        if (priceFilter) {
            priceFilter.value = "500";
        }


        if (priceValue) {
            priceValue.textContent =
                "₹500+";
        }


        if (sortSelect) {
            sortSelect.value =
                "relevance";
        }


        if (stockFilter) {
            stockFilter.checked =
                false;
        }


        document
            .querySelectorAll(
                ".category-filter, .brand-filter, .discount-filter, .rating-filter"
            )
            .forEach(input => {
                input.checked = false;
            });


        document
            .querySelectorAll(
                ".jm-drinks-category-card"
            )
            .forEach(card => {

                card.classList.toggle(
                    "active",
                    card.dataset.category === "all"
                );
            });


        if (clearSearch) {
            clearSearch.style.display =
                "none";
        }


        if (suggestions) {
            suggestions.style.display =
                "none";
        }


        displayProducts();
    }


    document
        .getElementById("resetFilters")
        ?.addEventListener(
            "click",
            resetAllFilters
        );


    emptyReset?.addEventListener(
        "click",
        resetAllFilters
    );


    /* =========================================================
       MOBILE FILTER
    ========================================================= */

    const mobileFilterBtn =
        document.getElementById(
            "mobileFilterBtn"
        );

    const filterSidebar =
        document.getElementById(
            "filterSidebar"
        );

    const filterOverlay =
        document.getElementById(
            "filterOverlay"
        );


    mobileFilterBtn?.addEventListener(
        "click",
        () => {

            filterSidebar?.classList.add(
                "active"
            );

            filterOverlay?.classList.add(
                "active"
            );
        }
    );


    filterOverlay?.addEventListener(
        "click",
        () => {

            filterSidebar?.classList.remove(
                "active"
            );

            filterOverlay?.classList.remove(
                "active"
            );
        }
    );


    /* =========================================================
       CHECKOUT
    ========================================================= */

    document
        .getElementById("checkoutBtn")
        ?.addEventListener(
            "click",
            () => {

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


    /* =========================================================
       INITIAL
    ========================================================= */

    updateWishlistCount();
    updateCartUI();

    /* Make "Drinks & Juices" active initially */

    document
        .querySelectorAll(
            ".jm-drinks-category-card"
        )
        .forEach(card => {

            card.classList.toggle(
                "active",
                card.dataset.category === "all"
            );
        });


    displayProducts();


    console.log(
        "LocalMart Drinks & Juices loaded"
    );

    console.log(
        "Total products:",
        drinksJuicesProducts.length
    );

    console.log(
        "Cold Drinks:",
        drinksJuicesProducts.filter(
            product =>
                product.category ===
                "cold-drinks"
        ).length
    );

});
