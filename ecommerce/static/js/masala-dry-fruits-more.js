/* ============================================================
   LOCALMART
   MASALA, DRY FRUITS & MORE
   ZEPTO-STYLE PRODUCT CAROUSEL
   ============================================================ */

const masalaProducts = [

    {
        id: "masala-001",
        name: "Maggi Masala-ae-Magic Sabzi Masala",
        category: "Powders & Pastes",
        price: 60,
        mrp: 60,
        discount: 0,
        unit: "1 pack (12 pcs)",
        rating: 4.8,
        reviews: "93.0k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/538c4965-ab80-483b-8426-e3898228adc3/Maggi-Masala-ae-Magic-Sabzi-Masala.jpeg"
    },

    {
        id: "masala-002",
        name: "BestValue Sugar",
        category: "Salt, Sugar & Jaggery",
        price: 75,
        mrp: 79,
        discount: 4,
        unit: "1 pack (1 kg)",
        rating: 4.8,
        reviews: "27.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5000-5000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a57d17a3-db5c-4214-8fdd-3347d5637275/BestValue-Sugar.png"
    },

    {
        id: "masala-003",
        name: "Daily Good Figs / Anjeer",
        category: "Dry Fruits & Nuts",
        price: 149,
        mrp: 230,
        discount: 81,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "16.1k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0b59d3fd-bc60-4320-92ff-5feeaa330659/Daily-Good-Figs-Anjeer.jpeg"
    },

    

    {
        id: "masala-005",
        name: "Daily Good Pumpkin Seeds",
        category: "Dates & Seeds",
        price: 209,
        mrp: 255,
        discount: 46,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "28.5k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3187d4d1-645f-4bbf-a7d9-9d5ff40aaf6e/Daily-Good-Pumpkin-Seeds.jpeg"
    },

    {
        id: "masala-006",
        name: "Daily Good Cashew | W400",
        category: "Dry Fruits & Nuts",
        price: 119,
        mrp: 180,
        discount: 61,
        unit: "1 pack (100 g)",
        rating: 4.9,
        reviews: "20.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3881-3881,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2ae44c8e-4524-4ac6-a235-ada97819368a/Daily-Good-Cashew-W400.jpeg"
    },

    {
        id: "masala-007",
        name: "Daily Good Chilli With Stem / Guntur With Stem",
        category: "Whole Spices & Seasonings",
        price: 65,
        mrp: 90,
        discount: 25,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "33.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7bf00949-ffd1-40e1-821c-0d1f03c917ab/Daily-Good-Chilli-With-Stem-Guntur-With-Stem.jpeg"
    },

    {
        id: "masala-008",
        name: "Daily Good Raisin",
        category: "Dry Fruits & Nuts",
        price: 65,
        mrp: 65,
        discount: 0,
        unit: "1 pack (100 g)",
        rating: 4.8,
        reviews: "16.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bb7de4d8-0882-45e0-ad7c-f08a3d27932b/Daily-Good-Raisin.jpeg"
    },

    {
        id: "masala-009",
        name: "Nutraj Anjeer/Fig",
        category: "Dry Fruits & Nuts",
        price: 372,
        mrp: 459,
        discount: 87,
        unit: "1 pack (250 g)",
        rating: 4.7,
        reviews: "6.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/30caa057-5f53-44e1-ad6f-c39c58af8cfc/Nutraj-Anjeer-Fig.jpeg"
    },

    {
        id: "masala-010",
        name: "Daily Good Pumpkin Seeds",
        category: "Dates & Seeds",
        price: 109,
        mrp: 130,
        discount: 21,
        unit: "1 pack (100 g)",
        rating: 4.6,
        reviews: "13.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1941-1941,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a4d8e07b-393c-4bd2-8796-da4b7dc99b7e/Daily-Good-Pumpkin-Seeds.jpeg"
    },

    {
        id: "masala-011",
        name: "Parry's White Label Sugar",
        category: "Salt, Sugar & Jaggery",
        price: 67,
        mrp: 80,
        discount: 13,
        unit: "1 pack (1 kg)",
        rating: 4.7,
        reviews: "165.7k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3603-3603,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d4419c0b-f573-4d4b-883e-b898e6b7f80f/Parry-s-White-Label-Sugar.jpg"
    },

    {
        id: "masala-012",
        name: "Daily Good Cashew | Kaju Broken",
        category: "Dry Fruits & Nuts",
        price: 119,
        mrp: 180,
        discount: 61,
        unit: "1 pack (100 g)",
        rating: 4.5,
        reviews: "18.5k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5a702240-31a6-4ba8-b83f-1c7a409c614a/Daily-Good-Cashew-Kaju-Broken.jpeg"
    },

    {
        id: "masala-013",
        name: "Daily Good Byadgi Chilli",
        category: "Whole Spices & Seasonings",
        price: 77,
        mrp: 155,
        discount: 78,
        unit: "1 pack (100 g)",
        rating: 4.9,
        reviews: "8.1k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/61c7456e-730a-4c0e-980c-7ab9134ab1d5/Daily-Good-Byadgi-Chilli.jpg"
    },

    {
        id: "masala-014",
        name: "MTR Chilli - Powder",
        category: "Powders & Pastes",
        price: 41,
        mrp: 60,
        discount: 19,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "5.2k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/367e5de6-c298-4ca1-b753-54cc2dee526c/MTR-Chilli-Powder.jpg"
    },

    {
        id: "masala-015",
        name: "MTR Masala - Puliogare Powder (Pouch)",
        category: "Powders & Pastes",
        price: 66,
        mrp: 80,
        discount: 14,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "5.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7100629d-b819-4f91-a6b9-a75b0e8a8b69/MTR-Masala-Puliogare-Powder-Pouch-.jpeg"
    },

    {
        id: "masala-016",
        name: "Nutraj Classic Green Cardamom | Elaichi | Pouch",
        category: "Whole Spices & Seasonings",
        price: 112,
        mrp: 120,
        discount: 8,
        unit: "1 pack (20 g)",
        rating: 4.6,
        reviews: "14.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/db0f87de-6b20-4557-b0b4-34eee7510063/Nutraj-Classic-Green-Cardamom-Elaichi-Pouch.jpeg"
    },

    {
        id: "masala-017",
        name: "Tata Salt | Free Flowing and Iodized Namak",
        category: "Salt, Sugar & Jaggery",
        price: 28,
        mrp: 32,
        discount: 4,
        unit: "1 pack (1 kg)",
        rating: 4.8,
        reviews: "486.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1c70221b-4440-4d55-87e7-46fcce72fefd/Tata-Salt-Free-Flowing-and-Iodized-Namak-Vacuum-Evaporated-Salt-in-Fresh.jpeg"
    },

    {
        id: "masala-018",
        name: "Daily Good Figs / Anjeer",
        category: "Dry Fruits & Nuts",
        price: 329,
        mrp: 535,
        discount: 206,
        unit: "1 pack (250 g)",
        rating: 4.5,
        reviews: "2.7k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/76cb3e06-5f6c-4b9f-a993-ab44d10fedb3/Daily-Good-Figs-Anjeer.jpeg"
    },

    {
        id: "masala-019",
        name: "Jivana Classic Sugar",
        category: "Salt, Sugar & Jaggery",
        price: 74,
        mrp: 75,
        discount: 1,
        unit: "1 pack (1 kg)",
        rating: 4.7,
        reviews: "25.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/06dd05f5-c90c-471e-aac9-e06c12e816d2/Jivana-Classic-Sugar.jpeg"
    },

    {
        id: "masala-020",
        name: "Daily Good Black Pepper / Kali Mirch",
        category: "Whole Spices & Seasonings",
        price: 79,
        mrp: 105,
        discount: 26,
        unit: "1 pack (50 g)",
        rating: 4.6,
        reviews: "10.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1979-1979,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d9b36745-57f3-4ce8-87fc-fa16bc3e6564/Daily-Good-Black-Pepper-Kali-Mirch.jpeg"
    },

    {
        id: "masala-021",
        name: "Aashirvaad Turmeric Powder | Haldi Powder",
        category: "Powders & Pastes",
        price: 28,
        mrp: 45,
        discount: 17,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "74.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a419fc43-ca2b-44af-8f69-356683fe1b9c/Aashirvaad-Turmeric-Powder-Haldi-Powder.jpeg"
    },

    {
        id: "masala-022",
        name: "Daily Good Makhana | Foxnuts / Phool Makhana",
        category: "Dry Fruits & Nuts",
        price: 155,
        mrp: 295,
        discount: 140,
        unit: "1 pack (100 g)",
        rating: 4.6,
        reviews: "32.0k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7c142d1f-9977-4d8d-8079-ad84ef66672a/Daily-Good-Makhana-Foxnuts-Phool-Makhana.jpeg"
    },

    {
        id: "masala-023",
        name: "Daily Good Dried Dates",
        category: "Dates & Seeds",
        price: 87,
        mrp: 140,
        discount: 53,
        unit: "1 pack (200 g)",
        rating: 4.4,
        reviews: "7.2k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3251-3251,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e52d1cd5-0ecc-4911-a9ba-d1a3638cd0e7/Daily-Good-Dried-Dates.jpeg"
    },

    {
        id: "masala-024",
        name: "Daily Good Til / Sesame Seeds | Black",
        category: "Dates & Seeds",
        price: 52,
        mrp: 95,
        discount: 43,
        unit: "1 pack (100 g)",
        rating: 4.9,
        reviews: "8.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dce477ce-6384-4fab-8577-56bdafb226de/Daily-Good-Til-Sesame-Seeds-Black.jpeg"
    },

    {
        id: "masala-025",
        name: "Daily Good Jaggery / Gur / Gud",
        category: "Salt, Sugar & Jaggery",
        price: 119,
        mrp: 170,
        discount: 51,
        unit: "1 pack (1 kg)",
        rating: 4.4,
        reviews: "5.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/46dd92f2-a9b4-4566-a511-16e26cce0b50/Daily-Good-Jaggery-Gur-Gud.jpeg"
    },

    {
        id: "masala-026",
        name: "BestValue Makhana",
        category: "Dry Fruits & Nuts",
        price: 102,
        mrp: 200,
        discount: 98,
        unit: "1 pack (100 g)",
        rating: 4.2,
        reviews: "6.7k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2048-2048,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0680b3c2-c5bc-49b8-9956-57ccefb6ca44/BestValue-Makhana.png"
    },

    {
        id: "masala-027",
        name: "Nutraj Raw Chia Seeds",
        category: "Dates & Seeds",
        price: 102,
        mrp: 299,
        discount: 197,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "11.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c898e370-9c43-4fd4-b461-ec6e38ff6825/Nutraj-Raw-Chia-Seeds.jpeg"
    },

    {
        id: "masala-028",
        name: "Aachi Chicken Masala Powder",
        category: "Powders & Pastes",
        price: 48,
        mrp: 60,
        discount: 12,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "16.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1359451f-2a52-4a48-939a-22807b9888f8/Aachi-Chicken-Masala-Powder.jpg"
    },

    {
        id: "masala-029",
        name: "Nutraj Cashew Nuts | Kaju",
        category: "Dry Fruits & Nuts",
        price: 496,
        mrp: 699,
        discount: 203,
        unit: "1 pack (500 g)",
        rating: 4.5,
        reviews: "9.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fcffd7b4-2e37-4094-a64c-a363d3d64d0b/Nutraj-Cashew-Nuts-Kaju.jpeg"
    },

    {
        id: "masala-030",
        name: "Happilo Premium Afghani Dried Anjeer",
        category: "Premium",
        price: 301,
        mrp: 375,
        discount: 74,
        unit: "1 pack (200 g)",
        rating: 4.4,
        reviews: "1.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c293079d-3f8e-454c-8ce8-f1e2ede37f83/Happilo-Premium-Afghani-Dried-Anjeer-Dried-Figs-Dry-Fruits.jpeg"
    },

    {
        id: "masala-031",
        name: "Khetika Dried Cranberry",
        category: "Dehydrated & Dried",
        price: 136,
        mrp: 249,
        discount: 113,
        unit: "1 pack (200 g)",
        rating: 4.5,
        reviews: "1.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/42e7988b-1b0a-4a55-a72c-acf6330d7c82/Khetika-Dried-Cranberry-High-Nutrient-Antioxidant-No-Added-Preservatives.jpeg"
    },

    {
        id: "masala-032",
        name: "Aachi Chilli Powder",
        category: "Powders & Pastes",
        price: 46,
        mrp: 50,
        discount: 4,
        unit: "1 pack (100 g)",
        rating: 4.9,
        reviews: "17.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/463b26b9-b7af-4aed-bc1d-f7671d165723/Aachi-Chilli-Powder.jpeg"
    },



/* ============================================================
   POWDERS & PASTES — ZEPTO PRODUCTS
   ============================================================ */

{
    id: "masala-033",
    name: "MTR Masala - Bisibelebath Powder",
    category: "Powders & Pastes",
    price: 83,
    mrp: 85,
    discount: 2,
    unit: "1 pack (100 g)",
    rating: 4.7,
    reviews: "3.1k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7d7c0d38-73db-4f26-8e10-590663960225/MTR-Masala-Bisibelebath-Powder.jpeg"
},

{
    id: "masala-034",
    name: "Eastern Kashmiri Red Chilli Powder | Since 1983",
    category: "Powders & Pastes",
    price: 79,
    mrp: 120,
    discount: 41,
    unit: "1 pack (100 g)",
    rating: 4.6,
    reviews: "2.8k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/34e5da2c-e273-45e8-ab55-c56563fc517e/Eastern-Kashmiri-Red-Chilli-Powder-Since-1983.jpg"
},

{
    id: "masala-035",
    name: "Aachi Black Pepper Powder",
    category: "Powders & Pastes",
    price: 80,
    mrp: 80,
    discount: 0,
    unit: "1 pack (50 g)",
    rating: 4.9,
    reviews: "4.7k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-600-600,pr-true,f-auto,q-40,dpr-2/inventory/product/cbb9375c-1d0e-4b7c-ac31-3bcf4ff84d31-1aU03ND1gwcXxvf7K1Z70xJo8ZF4Bh2Je/Aachi-Black-Pepper-Powder.jpeg"
},

{
    id: "masala-036",
    name: "Aachi Masala Garam",
    category: "Powders & Pastes",
    price: 54,
    mrp: 78,
    discount: 24,
    unit: "1 pack (100 g)",
    rating: 4.7,
    reviews: "6.6k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/50d9357a-bb8f-426d-a707-d0a5f35f579f/Aachi-Masala-Garam.jpeg"
},

{
    id: "masala-037",
    name: "Catch Jeera Powder Pouch",
    category: "Powders & Pastes",
    price: 58,
    mrp: 80,
    discount: 22,
    unit: "1 pack (100 g)",
    rating: 4.7,
    reviews: "13.1k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-500-500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/747de60a-6fe6-46cb-8b9a-d7caca3c24bc/Catch-Jeera-Powder-Pouch.jpg"
},

{
    id: "masala-038",
    name: "Aachi Masala Garam",
    category: "Powders & Pastes",
    price: 36,
    mrp: 36,
    discount: 0,
    unit: "1 pack (50 g)",
    rating: 4.7,
    reviews: "8.7k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-600-600,pr-true,f-auto,q-40,dpr-2/inventory/product/73e1a541-de8a-4f75-971c-7bcee304edf8-11anaGdB6fxiVJhhgHDtfUfnTAjaF4gKa/Aachi-Masala-Garam.jpeg"
},

{
    id: "masala-039",
    name: "Catch Turmeric Powder/Haldi",
    category: "Powders & Pastes",
    price: 31,
    mrp: 43,
    discount: 12,
    unit: "1 pack (100 g)",
    rating: 4.9,
    reviews: "46.6k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5541973c-116a-4d35-bd90-392e8dc350ef/Catch-Turmeric-Powder-Haldi.jpeg"
},

{
    id: "masala-040",
    name: "Catch Coriander Powder",
    category: "Powders & Pastes",
    price: 28,
    mrp: 46,
    discount: 18,
    unit: "1 pack (100 g)",
    rating: 4.8,
    reviews: "32.8k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1fed3291-cee3-4f66-b938-0896007c0350/Catch-Coriander-Powder.jpeg"
},

{
    id: "masala-041",
    name: "L.G Asafoetida Powder",
    category: "Powders & Pastes",
    price: 95,
    mrp: 102,
    discount: 7,
    unit: "1 pc (50 g)",
    rating: 4.8,
    reviews: "11.1k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1002-1002,pr-true,f-auto,q-40,dpr-2/cms/product_variant/67df821c-4473-45c7-bf51-c332770240ae/L-G-Asafoetida-Powder.jpeg"
},

{
    id: "masala-042",
    name: "MTR Rasam Powder",
    category: "Powders & Pastes",
    price: 81,
    mrp: 100,
    discount: 19,
    unit: "1 pack (100 g)",
    rating: 4.7,
    reviews: "1.8k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4167-4167,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1330bc0d-eeaa-4362-80eb-496f91f60c55/MTR-Rasam-Powder.jpeg"
},

{
    id: "masala-043",
    name: "Catch Ginger Garlic Paste",
    category: "Powders & Pastes",
    price: 28,
    mrp: 47,
    discount: 19,
    unit: "1 pack (200 g)",
    rating: 4.8,
    reviews: "52.6k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b172aec7-adce-4882-ba27-21e673596cef/Catch-Ginger-Garlic-Paste.jpeg"
},

{
    id: "masala-044",
    name: "Everest Garam Masala",
    category: "Powders & Pastes",
    price: 112,
    mrp: 112,
    discount: 0,
    unit: "1 pack (100 g)",
    rating: 4.8,
    reviews: "9.2k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/483e32a5-0168-4bcc-b8d9-60207959d39b/Everest-Garam-Masala.jpeg"
},

{
    id: "masala-045",
    name: "MTR Kashmiri Chilli Powder (Pouch)",
    category: "Powders & Pastes",
    price: 92,
    mrp: 120,
    discount: 28,
    unit: "1 pack (100 g)",
    rating: 4.7,
    reviews: "4.3k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9d69251a-caca-441f-bcc9-0dcfcda254af/MTR-Kashmiri-Chilli-Powder-Pouch-.jpeg"
},

{
    id: "masala-046",
    name: "Tata Sampann Kashmiri Red Chilli Powder With Natural Oils Kashmiri Lal Mirch Powder",
    category: "Powders & Pastes",
    price: 117,
    mrp: 135,
    discount: 18,
    unit: "1 pack (100 g)",
    rating: 4.7,
    reviews: "4.2k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/42924179-5fc8-45e0-9b9b-ff91100121c6/Tata-Sampann-Kashmiri-Red-Chilli-Powder-With-Natural-Oils-Kashmiri-Lal-Mirch-Powder.jpeg"
},

{
    id: "masala-047",
    name: "Everest Tandoori Chicken Masala",
    category: "Powders & Pastes",
    price: 104,
    mrp: 104,
    discount: 0,
    unit: "1 pack (100 g)",
    rating: 4.9,
    reviews: "4.2k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/29e591c0-eba3-49b6-b942-4cc014b3555f/Everest-Tandoori-Chicken-Masala.jpg"
},

{
    id: "masala-048",
    name: "L.G Asafoetida Powder",
    category: "Powders & Pastes",
    price: 187,
    mrp: 200,
    discount: 13,
    unit: "1 pc (100 g)",
    rating: 4.9,
    reviews: "3.2k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1202-1202,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b98846f0-9724-46dd-8d14-601ae647e3b8/L-G-Asafoetida-Powder.jpeg"
},

{
    id: "masala-049",
    name: "Aachi Masala Chicken Kabab / Chicken 65",
    category: "Powders & Pastes",
    price: 37,
    mrp: 40,
    discount: 3,
    unit: "1 pack (50 g)",
    rating: 4.8,
    reviews: "455",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1021-1021,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dc2d3349-a4fb-4bd4-81ac-b45dc43bd36a/Aachi-Masala-Chicken-Kabab-Chicken-65.jpeg"
},

{
    id: "masala-050",
    name: "Everest Chicken Masala",
    category: "Powders & Pastes",
    price: 94,
    mrp: 104,
    discount: 10,
    unit: "1 pack (100 g)",
    rating: 4.7,
    reviews: "9.5k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4aec40c7-1aaf-4728-849e-a63f4286a658/Everest-Chicken-Masala.jpg"
},

{
    id: "masala-051",
    name: "KILRR Tandoori Blast Chicken Masala",
    category: "Powders & Pastes",
    price: 70,
    mrp: 70,
    discount: 0,
    unit: "1 pack (20 g)",
    rating: 4.6,
    reviews: "540",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1a4e926a-3c1b-437b-804f-84c17d87dd97/KILRR-Tandoori-Blast-Chicken-Masala.png"
},

{
    id: "masala-052",
    name: "Everest Kashmiri Lal Chilli Powder",
    category: "Powders & Pastes",
    price: 99,
    mrp: 126,
    discount: 27,
    unit: "1 pack (100 g)",
    rating: 4.9,
    reviews: "22.6k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cb08c513-914c-4e0d-9b86-8a2cc8004f54/Everest-Kashmiri-Lal-Chilli-Powder.jpeg"
},

{
    id: "masala-053",
    name: "Aachi Chilli Powder",
    category: "Powders & Pastes",
    price: 46,
    mrp: 50,
    discount: 4,
    unit: "1 pack (100 g)",
    rating: 4.9,
    reviews: "17.6k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/463b26b9-b7af-4aed-bc1d-f7671d165723/Aachi-Chilli-Powder.jpeg"
},

{
    id: "masala-054",
    name: "Aachi Sambar Powder",
    category: "Powders & Pastes",
    price: 54,
    mrp: 60,
    discount: 6,
    unit: "1 pack (100 g)",
    rating: 4.7,
    reviews: "9.0k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d5a1c4aa-bacd-442e-bdbe-294c36b4f641/Aachi-Sambar-Powder.jpeg"
},

{
    id: "masala-055",
    name: "MDH Deggi Mirch Powder",
    category: "Powders & Pastes",
    price: 123,
    mrp: 125,
    discount: 2,
    unit: "1 pack (100 g)",
    rating: 4.8,
    reviews: "9.3k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/03f35bf4-1840-4b29-8820-4b8c298a1acd/MDH-Deggi-Mirch-Powder.jpeg"
},

{
    id: "masala-056",
    name: "Ching's Secret Schezwan Fried Rice Masala, Cooks in 4/5Mins, 5 Single Use Pouches",
    category: "Powders & Pastes",
    price: 48,
    mrp: 50,
    discount: 2,
    unit: "5 x 20 g",
    rating: 4.8,
    reviews: "12.7k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/21cbd5c1-97a3-457d-bb3c-41ad004d106b/Ching-s-Secret-Schezwan-Fried-Rice-Masala-Cooks-in-4-5Mins-5-Single-Use-Pouches.jpeg"
},

{
    id: "masala-057",
    name: "Everest Powder - Tea Masala",
    category: "Powders & Pastes",
    price: 69,
    mrp: 72,
    discount: 3,
    unit: "1 pack (50 g)",
    rating: 4.7,
    reviews: "1.8k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3750-3750,pr-true,f-auto,q-40,dpr-2/inventory/product/bc3b0709-4f8d-4596-9e65-4d6f8375af2f-19ccIiJyaYtV2sDe73h47AWmNgfJEsf7Q/Everest-Powder-Tea-Masala.jpeg"
},

{
    id: "masala-058",
    name: "MTR Foods Spice Hing Powder",
    category: "Powders & Pastes",
    price: 80,
    mrp: 99,
    discount: 19,
    unit: "1 pc (50 g)",
    rating: 4.7,
    reviews: "8.3k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-6250-6250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d0c20c1e-77cf-428b-8c0c-063e4329da76/MTR-Foods-Spice-Hing-Powder.jpeg"
},


/* ============================================================
   DRY FRUITS & NUTS — ZEPTO PRODUCTS
   ============================================================ */

{
    id: "masala-059",
    name: "Nutraj California Almond Kernels",
    category: "Dry Fruits & Nuts",
    price: 530,
    mrp: 799,
    discount: 269,
    unit: "1 pack (500 g)",
    rating: 4.5,
    reviews: "9.8k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4da16a88-0abf-4217-b139-44b45f2dbe9a/Nutraj-California-Almond-Kernels.jpeg"
},

{
    id: "masala-060",
    name: "Tata Sampann Totally Pure California Almonds/Badam Giri | Whole Premium Quality",
    category: "Dry Fruits & Nuts",
    price: 579,
    mrp: 775,
    discount: 196,
    unit: "1 pack (500 g)",
    rating: 4.7,
    reviews: "9.1k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a3821c4c-2c36-43b5-bbb7-99ad05161d01/Tata-Sampann-Totally-Pure-California-Almonds-Badam-Giri-Whole-Premium-Quality.jpg"
},

{
    id: "masala-061",
    name: "Daily Good Cashew | Kaju Split",
    category: "Dry Fruits & Nuts",
    price: 129,
    mrp: 195,
    discount: 66,
    unit: "1 pack (100 g)",
    rating: 4.5,
    reviews: "32.4k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cfde5140-6e37-4981-b365-b7b5c12d9b45/Daily-Good-Cashew-Kaju-Split.jpeg"
},

{
    id: "masala-062",
    name: "Wonderland Foods Cashew Nuts",
    category: "Dry Fruits & Nuts",
    price: 539,
    mrp: 770,
    discount: 231,
    unit: "1 pack (500 g)",
    rating: 4.3,
    reviews: "3.5k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-679-679,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7d23ccb8-9cab-4440-a638-42d5d5c35da2/Wonderland-Foods-Cashew-Nuts.jpeg"
},

{
    id: "masala-063",
    name: "Daily Good Walnut / Akhrot Broken Kernels",
    category: "Dry Fruits & Nuts",
    price: 159,
    mrp: 195,
    discount: 36,
    unit: "1 pack (100 g)",
    rating: 4.3,
    reviews: "15.9k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2609ebcc-f0e7-4a45-a8f9-09e6fbc614e0/Daily-Good-Walnut-Akhrot-Broken-Kernels.jpeg"
},

{
    id: "masala-064",
    name: "Tata Sampann Totally Pure Premium Cashews/Kaju | Whole",
    category: "Dry Fruits & Nuts",
    price: 589,
    mrp: 765,
    discount: 176,
    unit: "1 pack (500 g)",
    rating: 4.6,
    reviews: "3.6k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/38155f07-1b2b-4068-8df8-2dfacb261e42/Tata-Sampann-Totally-Pure-Premium-Cashews-Kaju-Whole.jpg"
},

{
    id: "masala-065",
    name: "Daily Good Walnut / Akhrot Broken Kernels",
    category: "Dry Fruits & Nuts",
    price: 309,
    mrp: 380,
    discount: 71,
    unit: "1 pack (200 g)",
    rating: 4.5,
    reviews: "12.1k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0636e802-fcce-430b-8145-61bde648c489/Daily-Good-Walnut-Akhrot-Broken-Kernels.jpeg"
},

{
    id: "masala-066",
    name: "Bolas Cashew Value Pack",
    category: "Dry Fruits & Nuts",
    price: 552,
    mrp: 749,
    discount: 197,
    unit: "1 pack (500 g)",
    rating: 4.3,
    reviews: "953",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/93c3d5a1-c21e-4464-b114-00f69630ba6c/Bolas-Cashew-Value-Pack.jpeg"
},

{
    id: "masala-067",
    name: "Khetika Premium Cashews | Kaju Whole | Unpolished | Rich in Fiber",
    category: "Dry Fruits & Nuts",
    price: 142,
    mrp: 199,
    discount: 57,
    unit: "1 pack (100 g)",
    rating: 4.5,
    reviews: "1.3k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3004c112-f6ff-499c-a71a-c9264b164a6a/Khetika-Premium-Cashews-Kaju-Whole-Unpolished-Rich-in-Fiber.jpeg"
},

{
    id: "masala-068",
    name: "Bolas Gold Almonds",
    category: "Dry Fruits & Nuts",
    price: 80,
    mrp: 110,
    discount: 30,
    unit: "1 pack (50 g)",
    rating: 5.0,
    reviews: "3.8k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/16105ef5-d02c-44bf-bd79-41cc1608b084/Bolas-Gold-Almonds.jpg"
},

{
    id: "masala-069",
    name: "Daily Good Cashew | Kaju Broken",
    category: "Dry Fruits & Nuts",
    price: 215,
    mrp: 340,
    discount: 125,
    unit: "1 pack (200 g)",
    rating: 4.7,
    reviews: "6.0k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4596-4596,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d1025d45-efbd-4244-b6a4-d162411dfdb6/Daily-Good-Cashew-Kaju-Broken.jpeg"
},

{
    id: "masala-070",
    name: "Farmley Mix Dry Fruits Panchmeva | Almonds | Cashews | Dates | Black Raisins | Green Raisins",
    category: "Dry Fruits & Nuts",
    price: 399,
    mrp: 549,
    discount: 150,
    unit: "1 pack (405 g)",
    rating: 4.6,
    reviews: "10.5k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/70500242-e9e8-484f-934d-7c14a492f36e/Farmley-Mix-Dry-Fruits-Panchmeva-Almonds-Cashews-Dates-Black-Raisins-Green-Raisins.jpeg"
},

{
    id: "masala-071",
    name: "Daily Good Raisin Black | Kismish | Seedless",
    category: "Dry Fruits & Nuts",
    price: 59,
    mrp: 110,
    discount: 51,
    unit: "1 pack (100 g)",
    rating: 4.6,
    reviews: "10.9k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3881-3881,pr-true,f-auto,q-40,dpr-2/cms/product_variant/df3f815e-637c-40ee-8b95-a84414e13e59/Daily-Good-Raisin-Black-Kismish-Seedless.jpeg"
},

{
    id: "masala-072",
    name: "Wonderland Foods Australian Almonds",
    category: "Dry Fruits & Nuts",
    price: 545,
    mrp: 699,
    discount: 154,
    unit: "1 pack (500 g)",
    rating: 4.2,
    reviews: "4.1k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5800-5800,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f678deae-338a-4562-939d-e3702eb0768f/Wonderland-Foods-Australian-Almonds.jpeg"
},

{
    id: "masala-073",
    name: "Happilo Premium Whole Cashew Nuts | Whole Kaju | Dry Fruits",
    category: "Dry Fruits & Nuts",
    price: 548,
    mrp: 650,
    discount: 102,
    unit: "1 pack (450 g)",
    rating: 4.6,
    reviews: "2.4k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fdc0562f-950c-4b09-b438-e84ae7605e72/Happilo-Premium-Whole-Cashew-Nuts-Whole-Kaju-Dry-Fruits.jpeg"
},

{
    id: "masala-074",
    name: "Daily Good Panchmeva Dry Fruit Mix",
    category: "Dry Fruits & Nuts",
    price: 199,
    mrp: 280,
    discount: 81,
    unit: "1 pack (200 g)",
    rating: 4.5,
    reviews: "14.5k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1941-1941,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d480914b-a6d1-4f13-a875-34265ed0bcfc/Daily-Good-Panchmeva-Dry-Fruit-Mix.jpeg"
},

{
    id: "masala-075",
    name: "Daily Good Cashew | W320",
    category: "Dry Fruits & Nuts",
    price: 115,
    mrp: 195,
    discount: 80,
    unit: "1 pack (100 g)",
    rating: 4.6,
    reviews: "26.6k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3881-3881,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c5fdc8e0-39cf-48e4-b491-f69d353216be/Daily-Good-Cashew-W320.jpeg"
},

{
    id: "masala-076",
    name: "Daily Good Raisin Golden | Kishmish",
    category: "Dry Fruits & Nuts",
    price: 120,
    mrp: 120,
    discount: 0,
    unit: "1 pack (200 g)",
    rating: 4.8,
    reviews: "42.0k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1181a199-320c-42b2-92d1-52aa0609190a/Daily-Good-Raisin-Golden-Kishmish.jpeg"
},

{
    id: "masala-077",
    name: "Daily Good Pistachios California Salted",
    category: "Dry Fruits & Nuts",
    price: 195,
    mrp: 210,
    discount: 15,
    unit: "1 pack (100 g)",
    rating: 4.5,
    reviews: "21.8k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-5000-5000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/123a33aa-23ba-4966-955e-53025147c9cc/Daily-Good-Pistachios-California-Salted.jpeg"
},

{
    id: "masala-078",
    name: "Daily Good Walnut / Akhrot Kernels",
    category: "Dry Fruits & Nuts",
    price: 205,
    mrp: 260,
    discount: 55,
    unit: "1 pack (100 g)",
    rating: 4.4,
    reviews: "9.7k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5c449b99-232c-404b-8e75-8336280d8c33/Daily-Good-Walnut-Akhrot-Kernels.jpeg"
},

{
    id: "masala-079",
    name: "Nutraj Anmol Premium Cashew Jumbo Pack",
    category: "Dry Fruits & Nuts",
    price: 823,
    mrp: 1499,
    discount: 676,
    unit: "1 pack (500 g)",
    rating: 4.3,
    reviews: "27",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1440-1440,pr-true,f-auto,q-40,dpr-2/cms/product_variant/56675d61-f3f0-4838-b1ae-28089cb25d90/Nutraj-Anmol-Premium-Cashew-Jumbo-Pack.jpeg"
},

{
    id: "masala-080",
    name: "Wonderland Foods Raw Cashew (PC)",
    category: "Dry Fruits & Nuts",
    price: 555,
    mrp: 979,
    discount: 424,
    unit: "1 pack (500 g)",
    rating: 3.9,
    reviews: "462",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/629664e4-6f0f-4da2-b2b4-89a21a3a384f/Wonderland-Foods-Raw-Cashew-PC-.jpeg"
},

{
    id: "masala-081",
    name: "Bolas Gold Cashew",
    category: "Dry Fruits & Nuts",
    price: 57,
    mrp: 110,
    discount: 53,
    unit: "1 pack (50 g)",
    rating: 4.5,
    reviews: "3.6k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/966f3248-5282-4424-b039-c1a635d6652c/Bolas-Gold-Cashew.jpg"
},

{
    id: "masala-082",
    name: "Daily Good Cashew | W400",
    category: "Dry Fruits & Nuts",
    price: 523,
    mrp: 855,
    discount: 332,
    unit: "1 pack (500 g)",
    rating: 4.4,
    reviews: "2.1k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3881-3881,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c7cbff5c-9774-464f-ac55-b94d94c621dc/Daily-Good-Cashew-W400.jpeg"
},

{
    id: "masala-083",
    name: "Daily Good Cashew | W400",
    category: "Dry Fruits & Nuts",
    price: 235,
    mrp: 360,
    discount: 125,
    unit: "1 pack (200 g)",
    rating: 4.7,
    reviews: "8.0k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3881-3881,pr-true,f-auto,q-40,dpr-2/cms/product_variant/03fbc3e3-401e-4050-a692-3f046bc9210a/Daily-Good-Cashew-W400.jpeg"
},

{
    id: "masala-084",
    name: "Nutraj Cashew Nuts | Kaju",
    category: "Dry Fruits & Nuts",
    price: 239,
    mrp: 399,
    discount: 160,
    unit: "1 pack (200 g)",
    rating: 4.5,
    reviews: "20.5k",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/04f25851-d20d-4bd5-bb27-b74f7b72df0a/Nutraj-Cashew-Nuts-Kaju.jpeg"
},
];

/* ============================================================
   DATES & SEEDS — UNIQUE ZEPTO PRODUCT IMAGES
   ============================================================ */

const datesSeedsProducts = [

    {
        id: "masala-085",
        name: "Daily Good Sunflower Seeds",
        category: "Dates & Seeds",
        price: 119,
        mrp: 160,
        unit: "1 pack (200 g)",
        rating: 4.6,
        reviews: "20.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/94b39948-fbd8-4004-bb5a-ff62954bd736/Daily-Good-Sunflower-Seeds.jpeg"
    },

    {
        id: "masala-086",
        name: "Khari Foods Premium Pumpkin Seeds Raw",
        category: "Dates & Seeds",
        price: 195,
        mrp: 199,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "1.2k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1040029e-ac55-4c84-a21f-e0e2a4a54cb6/Khari-Foods-Premium-Pumpkin-Seeds-Raw.jpg"
    },

    {
        id: "masala-087",
        name: "Tata Sampann Truly Premium Pumpkin Seeds",
        category: "Dates & Seeds",
        price: 206,
        mrp: 229,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "1.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/975b225e-8c1f-4674-b02e-3f3829c3431f/Tata-Sampann-Truly-Premium-Pumpkin-Seeds.jpg"
    },

    {
        id: "masala-088",
        name: "TMI COLMAN Kimia Dates",
        category: "Dates & Seeds",
        price: 199,
        mrp: 279,
        unit: "1 pack (450 g)",
        rating: 4.3,
        reviews: "9.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dd354467-ddfd-4147-ae2a-dd5700796937/TMI-COLMAN-Kimia-Dates.jpg"
    },

    {
        id: "masala-089",
        name: "Daily Good Flax Seeds (Alsi Seeds)",
        category: "Dates & Seeds",
        price: 55,
        mrp: 105,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "27.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8154af2d-b8af-40c2-b820-256b5eb9543e/Daily-Good-Flax-Seeds-Alsi-Seeds-.jpeg"
    },

    {
        id: "masala-090",
        name: "Daily Good Chia Seeds",
        category: "Dates & Seeds",
        price: 95,
        mrp: 200,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "28.1k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-840-840,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a538c0d7-524d-4e3f-b434-9ffa029a31ef/Daily-Good-Chia-Seeds.jpeg"
    },

    {
        id: "masala-091",
        name: "Farmley Seed Mix Superfood Rich In Protein - Pumpkin, Watermelon, Sunflower, Flax, Chia Seeds",
        category: "Dates & Seeds",
        price: 159,
        mrp: 219,
        unit: "1 pack (200 g)",
        rating: 4.9,
        reviews: "10.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3125-3125,pr-true,f-auto,q-40,dpr-2/cms/product_variant/49a17e61-78fc-45b0-b940-0f9ea4dcbbef/Farmley-Seed-Mix-Superfood-Rich-In-Protein-Pumpkin-Watermelon-Sunflower-Flax-Chia-Seeds.jpeg"
    },

    {
        id: "masala-092",
        name: "Lion Qyno Deseeded Dates Cup",
        category: "Dates & Seeds",
        price: 153,
        mrp: 172,
        unit: "1 pack (500 g)",
        rating: 4.7,
        reviews: "5.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ab3ad763-71cc-4b32-9bbc-147fa92b4702/Lion-Qyno-Deseeded-Dates-Cup.jpeg"
    },

    {
        id: "masala-093",
        name: "Tata Sampann Premium Kalmi Dates",
        category: "Dates & Seeds",
        price: 266,
        mrp: 279,
        unit: "1 pack (200 g)",
        rating: 4.5,
        reviews: "993",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/68b7f46f-58af-4744-b137-96f629c70b40/Tata-Sampann-Premium-Kalmi-Dates-Rich-In-Fibre-Naturally-Sweet-Naturally-Low-Fat-Food.jpeg"
    },

    {
        id: "masala-094",
        name: "Wonderland Foods Ajwa Dates",
        category: "Dates & Seeds",
        price: 259,
        mrp: 599,
        unit: "1 pack (200 g)",
        rating: 4.3,
        reviews: "1.2k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6363be7e-f833-4e32-901c-fbdb359bb63a/Wonderland-Foods-Ajwa-Dates.jpeg"
    },

    {
        id: "masala-095",
        name: "Farmley Premium Natural Chia Seeds Rich in Protein & Fiber",
        category: "Dates & Seeds",
        price: 137,
        mrp: 299,
        unit: "1 pack (250 g)",
        rating: 4.7,
        reviews: "24.0k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3125-3125,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b223b891-750e-48b5-ab4e-cf46c58d03b9/Farmley-Premium-Natural-Chia-Seeds-Rich-in-Protein-Fiber.jpg"
    },

    {
        id: "masala-096",
        name: "TMI COLMAN Pumpkin Seed",
        category: "Dates & Seeds",
        price: 67,
        mrp: 105,
        unit: "1 pack (100 g)",
        rating: 4.5,
        reviews: "4.5k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f293afaf-b067-4c24-98c1-8be897cb9ae1/TMI-COLMAN-Pumpkin-Seed.jpg"
    },

    {
        id: "masala-097",
        name: "Happilo Premium Kalmi Dates",
        category: "Dates & Seeds",
        price: 301,
        mrp: 365,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "362",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5dc7a229-443c-456a-9db6-70658ce38c2f/Happilo-Premium-Kalmi-Dates-Naturally-Sweet-Khajur-No-Added-Sugar.jpeg"
    },

    {
        id: "masala-098",
        name: "Lion Deseeded Dates",
        category: "Dates & Seeds",
        price: 94,
        mrp: 94,
        unit: "1 pack (250 g)",
        rating: 4.5,
        reviews: "14.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/32ad2fde-5b0b-43b7-9120-672995652403/Lion-Deseeded-Dates.jpeg"
    },

    {
        id: "masala-099",
        name: "Happilo Roasted & Salted Pumpkin Seeds",
        category: "Dates & Seeds",
        price: 248,
        mrp: 295,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "963",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3e6b4468-aac6-4efe-964c-9259f927236d/Happilo-Roasted-Salted-Pumpkin-Seeds-Dry-Fruits.jpeg"
    },

   

    {
        id: "masala-101",
        name: "Khari Foods Black Afghan Dates",
        category: "Dates & Seeds",
        price: 133,
        mrp: 149,
        unit: "1 pack (200 g)",
        rating: 4.3,
        reviews: "6.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cff92856-8ba3-48f5-8755-fe6b2f56c876/Khari-Foods-Black-Afghan-Dates-Instant-Energy-Khajur-Dry-Fruit-Khajoor.jpg"
    },

    {
        id: "masala-102",
        name: "Khetika Super Seeds Mix",
        category: "Dates & Seeds",
        price: 119,
        mrp: 225,
        unit: "1 pack (200 g)",
        rating: 4.5,
        reviews: "4.0k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3670-4375,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1d65ef26-89fd-4019-96a3-082ad223ab80/Khetika-Super-Seeds-Mix-52g-Protein-High-in-Dietary-Fibre-Chia-Flax-Mixed-Seeds.jpg"
    },

    {
        id: "masala-103",
        name: "Lion Arabian Dates",
        category: "Dates & Seeds",
        price: 146,
        mrp: 150,
        unit: "1 pack (250 g)",
        rating: 4.5,
        reviews: "23.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/19a9d2ab-c8fb-42eb-a4c0-53f80fb2def8/Lion-Arabian-Dates.jpeg"
    },

    {
        id: "masala-104",
        name: "Lion Arabian Dates",
        category: "Dates & Seeds",
        price: 284,
        mrp: 284,
        unit: "2 x 500 g",
        rating: 4.3,
        reviews: "11.0k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2f748d81-9620-43c2-9f11-229f7fae9aeb/Lion-Arabian-Dates.jpeg"
    },

    {
        id: "masala-105",
        name: "Wonderland Foods Medjool Dates",
        category: "Dates & Seeds",
        price: 349,
        mrp: 599,
        unit: "1 pack (200 g)",
        rating: 4.3,
        reviews: "1.1k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b3006b0e-1273-4a1e-b475-51831e46f49f/Wonderland-Foods-Medjool-Dates.jpeg"
    },

    {
        id: "masala-106",
        name: "Farmley Premium Pumpkin Seeds AAA Grade",
        category: "Dates & Seeds",
        price: 215,
        mrp: 329,
        unit: "1 pack (250 g)",
        rating: 4.8,
        reviews: "6.2k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-6250-6250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0ed4eb57-2faa-4e9b-b21e-2a5a5666392b/Farmley-Premium-Pumpkin-Seeds-AAA-Grade.jpg"
    },

    {
        id: "masala-107",
        name: "Khari Foods Premium Medjool Dates",
        category: "Dates & Seeds",
        price: 430,
        mrp: 499,
        unit: "1 pack (200 g)",
        rating: 3.9,
        reviews: "282",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3e4360c4-8326-48c3-a12f-8033a20f4f9c/Khari-Foods-Premium-Medjool-Dates-Energy-Boost-Khajur-Dry-Fruit-Soft-Khajoor.jpeg"
    },

    {
        id: "masala-108",
        name: "Daily Good Dried Dates",
        category: "Dates & Seeds",
        price: 206,
        mrp: 345,
        unit: "1 pack (500 g)",
        rating: 4.5,
        reviews: "2.7k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ae121106-eed9-4ad3-8d40-187a63ba044c/Daily-Good-Dried-Dates.jpeg"
    },

    {
        id: "masala-109",
        name: "Nutraj Flax Seeds",
        category: "Dates & Seeds",
        price: 50,
        mrp: 199,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: "6.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7a7508e0-8185-4fd2-8466-06f993a4fca4/Nutraj-Flax-Seeds.jpeg"
    },

    {
        id: "masala-110",
        name: "Nutraj Kalmi Dates",
        category: "Dates & Seeds",
        price: 492,
        mrp: 695,
        unit: "1 pack (500 g)",
        rating: 4.2,
        reviews: "556",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,q-40,dpr-2/cms/product_variant/968a560d-0c89-4d54-9a53-00588856ffd0/Nutraj-Kalmi-Dates.jpeg"
    }

];

const wholeSpicesSeasoningsProducts = [
    {
        id: "masala-111",
        name: "Daily Good Cardamom Green",
        category: "Whole Spices & Seasonings",
        price: 129,
        mrp: 150,
        unit: "1 pack (25 g)",
        rating: 4.6,
        reviews: "9.1k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3153-3153,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a753a51d-64ef-456f-a91a-0b8d9f3608b7/Daily-Good-Cardamom-Green.jpeg"
    },

    {
        id: "masala-112",
        name: "Daily Good Khus Khus | Poppy Seeds",
        category: "Whole Spices & Seasonings",
        price: 109,
        mrp: 125,
        unit: "1 pack (50 g)",
        rating: 4.6,
        reviews: "10.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0871efae-fb6c-4cfd-b0b8-c1c2b0bf5785/Daily-Good-Khus-Khus-Poppy-Seeds.jpeg"
    },

    {
        id: "masala-113",
        name: "TMI COLMAN Green Cardamom | Elaichi",
        category: "Whole Spices & Seasonings",
        price: 109,
        mrp: 135,
        unit: "1 pack (25 g)",
        rating: 4.6,
        reviews: "9.1k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/55181703-0f57-4f3a-853b-c39231bf418a/TMI-COLMAN-Green-Cardamom-Elaichi-.jpg"
    },

    {
        id: "masala-114",
        name: "Daily Good Mustard / Rai / Sarso Small",
        category: "Whole Spices & Seasonings",
        price: 21,
        mrp: 40,
        unit: "1 pack (100 g)",
        rating: 4.9,
        reviews: "23.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1941-1941,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8f2f4543-5a6b-4e78-b18a-1bfa20f3c234/Daily-Good-Mustard-Rai-Sarso-Small.jpeg"
    },

    {
        id: "masala-115",
        name: "Daily Good Saunf / Fennel",
        category: "Whole Spices & Seasonings",
        price: 49,
        mrp: 95,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "16.3k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1941-1941,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3177337e-461f-49c6-a33e-667161365868/Daily-Good-Saunf-Fennel.jpg"
    },

    {
        id: "masala-116",
        name: "Daily Good Chilli Stemless / Guntur Stemless",
        category: "Whole Spices & Seasonings",
        price: 70,
        mrp: 110,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "12.5k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/148bfe4b-4b8e-4dbf-b5ff-7ae313c1d800/Daily-Good-Chilli-Stemless-Guntur-Stemless.jpeg"
    },

    {
        id: "masala-117",
        name: "Daily Good Till | Sesame | Natural Til",
        category: "Whole Spices & Seasonings",
        price: 33,
        mrp: 70,
        unit: "1 pack (100 g)",
        rating: 4.6,
        reviews: "25.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8d13188a-daa5-49ce-970b-1696e9f20128/Daily-Good-Till-Sesame-Natural-Til.jpeg"
    },

    

    {
        id: "masala-119",
        name: "Daily Good Chilli Stemless",
        category: "Whole Spices & Seasonings",
        price: 32,
        mrp: 50,
        unit: "1 pack (50 g)",
        rating: 4.7,
        reviews: "6.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1979-1979,pr-true,f-auto,q-40,dpr-2/cms/product_variant/04ae4371-e12e-44c7-bbd9-77af1de2c565/Daily-Good-Chilli-Stemless.jpeg"
    },

    {
        id: "masala-120",
        name: "Daily Good Shahjeera / Caraway Seeds",
        category: "Whole Spices & Seasonings",
        price: 195,
        mrp: 195,
        unit: "1 pack (100 g)",
        rating: 4.6,
        reviews: "2.2k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/98c6dbe5-4dea-4e63-960e-2199ba009c7d/Daily-Good-Shahjeera-Caraway-Seeds.jpeg"
    },

    {
        id: "masala-121",
        name: "Surya Jeera / Cumin Whole",
        category: "Whole Spices & Seasonings",
        price: 49,
        mrp: 64,
        unit: "1 pack (100 g)",
        rating: 4.8,
        reviews: "2.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1800-1800,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bcbac1af-e902-46cd-be6a-0c9b47a20d42/Surya-Jeera-Cumin-Whole.jpg"
    },

    {
        id: "masala-122",
        name: "Aashirvaad Cumin/Jeera Seeds | Whole",
        category: "Whole Spices & Seasonings",
        price: 52,
        mrp: 75,
        unit: "1 pack (100 g)",
        rating: 4.8,
        reviews: "15.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2560-2560,pr-true,f-auto,q-40,dpr-2/cms/product_variant/474f3d07-650a-4d4d-9834-40561c3ab35f/Aashirvaad-Cumin-Jeera-Seeds-Whole.jpeg"
    },

    {
        id: "masala-123",
        name: "Daily Good Khus Khus | Poppy Seeds",
        category: "Whole Spices & Seasonings",
        price: 206,
        mrp: 250,
        unit: "1 pack (100 g)",
        rating: 4.6,
        reviews: "4.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/54c8aa47-96c2-4b55-a425-1879eddd1f03/Daily-Good-Khus-Khus-Poppy-Seeds.jpeg"
    },

    {
        id: "masala-124",
        name: "Daily Good Cassia - Taj",
        category: "Whole Spices & Seasonings",
        price: 35,
        mrp: 65,
        unit: "1 pack (50 g)",
        rating: 4.6,
        reviews: "8.0k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,q-40,dpr-2/cms/product_variant/48929935-7a7f-4688-85e1-9234e56cdead/Daily-Good-Cassia-Taj.jpeg"
    },

    {
        id: "masala-125",
        name: "Nutraj Classic Green Cardamom | Elaichi | Pouch",
        category: "Whole Spices & Seasonings",
        price: 246,
        mrp: 300,
        unit: "1 pack (50 g)",
        rating: 4.8,
        reviews: "2.2k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1611-1611,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5a39c7b5-e9bb-4b74-9e67-4163a3d6cc21/Nutraj-Classic-Green-Cardamom-Elaichi-Pouch.jpeg"
    },

    {
        id: "masala-126",
        name: "Badshah Jeera Whole",
        category: "Whole Spices & Seasonings",
        price: 45,
        mrp: 65,
        unit: "1 pack (100 g)",
        rating: 4.9,
        reviews: "9.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/544b1691-59cd-4eea-a71e-a3228fbc2989/Badshah-Jeera-Whole.jpeg"
    },

    {
        id: "masala-127",
        name: "Daily Good Ajwain Whole",
        category: "Whole Spices & Seasonings",
        price: 34,
        mrp: 70,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "15.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/aae72f42-72f3-4690-98b0-59e91f1b1851/Daily-Good-Ajwain-Whole.jpeg"
    },

    {
        id: "masala-128",
        name: "Nutraj Classic Kalonji (Kala Jeera) - Pouch",
        category: "Whole Spices & Seasonings",
        price: 37,
        mrp: 60,
        unit: "1 pack (100 g)",
        rating: 4.5,
        reviews: "2.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/59d1330f-50af-4c6a-94be-4e057676d7dd/Nutraj-Classic-Kalonji-Kala-Jeera-Pouch.jpg"
    },

    {
        id: "masala-129",
        name: "ZOFF Green Cardamom Whole - Elaichi",
        category: "Whole Spices & Seasonings",
        price: 132,
        mrp: 220,
        unit: "1 pack (25 g)",
        rating: 4.7,
        reviews: "13.8k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2dadf0ef-b6ee-4e1a-a70a-5adfa9f01106/ZOFF-Green-Cardamom-Whole-Elaichi.jpg"
    },

    {
        id: "masala-130",
        name: "Daily Good Cardamom - Elaichi Green",
        category: "Whole Spices & Seasonings",
        price: 275,
        mrp: 275,
        unit: "1 pack (50 g)",
        rating: 4.5,
        reviews: "2.9k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3153-3153,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3e7c7441-82a9-4fbc-a76d-7a7b9db75a96/Daily-Good-Cardamom-Elaichi-Green.jpeg"
    },

    {
        id: "masala-131",
        name: "Daily Good Cloves / Lavang / Laung",
        category: "Whole Spices & Seasonings",
        price: 41,
        mrp: 50,
        unit: "1 pack (20 g)",
        rating: 4.6,
        reviews: "9.7k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-925-925,pr-true,f-auto,q-40,dpr-2/cms/product_variant/039e5fbc-8154-4c3b-8de9-b3b95410b33b/Daily-Good-Cloves-Lavang-Laung.jpeg"
    },

    {
        id: "masala-132",
        name: "Daily Good Mustard / Rai / Sarso Yellow",
        category: "Whole Spices & Seasonings",
        price: 25,
        mrp: 35,
        unit: "1 pack (100 g)",
        rating: 4.8,
        reviews: "6.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/07ea20b0-b4a8-408a-be75-1396ec832113/Daily-Good-Mustard-Rai-Sarso-Yellow.jpeg"
    },

    {
        id: "masala-133",
        name: "Daily Good Kalonji (Nigella Seeds)",
        category: "Whole Spices & Seasonings",
        price: 51,
        mrp: 60,
        unit: "1 pack (100 g)",
        rating: 4.7,
        reviews: "9.5k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b7fd1681-f2b3-483b-b8e8-01c1c6853138/Daily-Good-Kalonji-Nigella-Seeds-.jpeg"
    },

    {
        id: "masala-134",
        name: "Nutraj Classic Safed Til | Sesame Seeds | Natural",
        category: "Whole Spices & Seasonings",
        price: 28,
        mrp: 50,
        unit: "1 pack (100 g)",
        rating: 4.5,
        reviews: "8.6k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8e73e758-2901-4db4-aeea-fb85669fe882/Nutraj-Classic-Safed-Til-Sesame-Seeds-Natural.jpeg"
    },

    {
        id: "masala-135",
        name: "Daily Good Till | Sesame | Nylon White",
        category: "Whole Spices & Seasonings",
        price: 38,
        mrp: 70,
        unit: "1 pack (100 g)",
        rating: 4.8,
        reviews: "6.5k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/273d9454-487b-4dec-aa14-09f9a420ad8f/Daily-Good-Till-Sesame-Nylon-White.jpeg"
    },

    {
        id: "masala-136",
        name: "TMI COLMAN Jeera Sabut/Cumin Whole",
        category: "Whole Spices & Seasonings",
        price: 52,
        mrp: 60,
        unit: "1 pack (100 g)",
        rating: 4.8,
        reviews: "33.0k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4334aa27-017c-44eb-a905-c6f268a75907/TMI-COLMAN-Jeera-Sabut-Cumin-Whole.jpeg"
    },

    {
        id: "masala-137",
        name: "Snapin Oregano Seasoning",
        category: "Whole Spices & Seasonings",
        price: 9,
        mrp: 10,
        unit: "1 pack (10 g)",
        rating: 4.7,
        reviews: "7.4k",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-945-945,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0a3e2c4b-e841-460c-bf85-062d8d35d920/Snapin-Oregano-Seasoning.jpeg"
    },

    
];
/* ============================================================
   LOCALMART
   SALT, SUGAR & JAGGERY
   ZEPTO-STYLE PRODUCT CATALOGUE
   32 PRODUCTS | UNIQUE IMAGES | UNIQUE IDS
   ============================================================ */

const saltSugarJaggeryProducts = [

    // =========================================================
    // 01. BESTVALUE SUGAR
    // =========================================================
    
    // =========================================================
    // 04. DAILY GOOD JAGGERY 1 KG
    // =========================================================
    
    // =========================================================
    // 05. AASHIRVAAD IODISED SALT
    // =========================================================
    {
        id: "ssj-005",
        name: "Aashirvaad Iodised Salt",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 22,
        mrp: 32,
        discount: 10,
        discountPercent: 31,
        unit: "1 kg",
        rating: 4.9,
        reviews: 117000,
        badge: "₹10 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1364-1364,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bb085024-b25a-4f5e-8eaf-d48b8a282c58/Aashirvaad-Iodised-Salt.jpeg"
    },

    // =========================================================
    // 06. CONSCIOUS FOOD RAW SUGAR
    // =========================================================
    {
        id: "ssj-006",
        name: "Conscious Food Raw Sugar Natural Unprocessed",
        category: "Salt, Sugar & Jaggery",
        type: "Sugar",
        price: 166,
        mrp: 190,
        discount: 24,
        discountPercent: 13,
        unit: "1 kg",
        rating: 4.6,
        reviews: 1300,
        badge: "₹24 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f42f6c32-e9a4-4759-8b12-babd8454e5eb/Conscious-Food-Raw-Sugar-Natural-Unprocessed.jpeg"
    },

    // =========================================================
    // 07. SAFE HARVEST KHANDSARI SUGAR
    // =========================================================
    {
        id: "ssj-007",
        name: "Safe Harvest Pesticide-Free Khandsari Sugar",
        category: "Salt, Sugar & Jaggery",
        type: "Sugar",
        price: 152,
        mrp: 179,
        discount: 27,
        discountPercent: 15,
        unit: "1 kg",
        rating: 4.7,
        reviews: 971,
        badge: "₹27 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-800-800,pr-true,f-auto,q-40,dpr-2/cms/product_variant/23b54d99-530a-4185-981c-3511cc98054c/Safe-Harvest-Pesticide-Free-Khandsari-Sugar-Artisanal-No-Artificial-Flavors.jpeg"
    },

    // =========================================================
    // 08. AASHIRVAAD CRYSTAL SALT
    // =========================================================
    {
        id: "ssj-008",
        name: "Aashirvaad Crystal Salt | Iodised",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 20,
        mrp: 22,
        discount: 2,
        discountPercent: 9,
        unit: "1 kg",
        rating: 4.7,
        reviews: 15000,
        badge: "₹2 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1364-1364,pr-true,f-auto,q-40,dpr-2/cms/product_variant/322c8368-d84d-421e-9d79-61e74bf3e5fb/Aashirvaad-Crystal-Salt-Iodised.jpeg"
    },

    // =========================================================
    // 09. TATA HIMALAYAN ROCK PINK SALT
    // =========================================================
    {
        id: "ssj-009",
        name: "Tata Himalayan Rock Pink Salt Pouch",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 104,
        mrp: 120,
        discount: 16,
        discountPercent: 13,
        unit: "1 kg",
        rating: 4.8,
        reviews: 32100,
        badge: "₹16 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/97fa1bb7-ac6f-4750-9d9f-f8b832ffecef/Tata-Himalayan-Rock-Pink-Salt-Pouch-Premium-Sendha-Namak-With-Natural-Trace-Minerals-Low-Sodium-Crystal-Salt.jpg"
    },

    // =========================================================
    // 10. DAILY GOOD BROWN SUGAR
    // =========================================================
    {
        id: "ssj-010",
        name: "Daily Good Brown Sugar",
        category: "Salt, Sugar & Jaggery",
        type: "Sugar",
        price: 90,
        mrp: 120,
        discount: 30,
        discountPercent: 25,
        unit: "1 kg",
        rating: 4.4,
        reviews: 2500,
        badge: "₹30 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2252-2252,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b3d6ee44-3634-4eb4-8d05-b65e72827d13/Daily-Good-Brown-Sugar.jpeg"
    },

    // =========================================================
    // 11. ORGANIC TATTVA ORGANIC SUGAR
    // =========================================================
    {
        id: "ssj-011",
        name: "Organic Tattva Organic Sugar",
        category: "Salt, Sugar & Jaggery",
        type: "Sugar",
        price: 149,
        mrp: 160,
        discount: 11,
        discountPercent: 7,
        unit: "1 kg",
        rating: 4.7,
        reviews: 385,
        badge: "₹11 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7a7e4789-ac78-4684-937c-e35496cb01e7/Organic-Tattva-Organic-Sugar.jpeg"
    },

    // =========================================================
    // 12. TATA SALT CRYSTAL
    // =========================================================
    {
        id: "ssj-012",
        name: "Tata Salt Crystal",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 22,
        mrp: 22,
        discount: 0,
        discountPercent: 0,
        unit: "1 kg",
        rating: 4.9,
        reviews: 61900,
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7460909f-aca5-4994-b3e4-d9d4b758ba45/Tata-Salt-Crystal.jpeg"
    },

    // =========================================================
    // 13. PARRY'S SUPERFINE SUGAR
    // =========================================================
    {
        id: "ssj-013",
        name: "Parry's Superfine Sugar",
        category: "Salt, Sugar & Jaggery",
        type: "Sugar",
        price: 75,
        mrp: 85,
        discount: 10,
        discountPercent: 12,
        unit: "1 kg",
        rating: 4.9,
        reviews: 311,
        badge: "₹10 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/10ad9c44-8cc2-4a54-b890-5b62d769ad5e/Parry-s-Superfine-Sugar.jpeg"
    },

    // =========================================================
    // 14. CONSCIOUS FOOD SUGARCANE JAGGERY
    // =========================================================
    {
        id: "ssj-014",
        name: "Conscious Food Sugarcane Jaggery | Gud | Natural",
        category: "Salt, Sugar & Jaggery",
        type: "Jaggery",
        price: 165,
        mrp: 199,
        discount: 34,
        discountPercent: 17,
        unit: "925 g",
        rating: 4.2,
        reviews: 733,
        badge: "₹34 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c95d8265-f168-47ef-a2e8-24133cb09d5c/Conscious-Food-Sugarcane-Jaggery-Gud-Natural.jpeg"
    },

    // =========================================================
    // 15. TATA SALT LITE
    // =========================================================
    {
        id: "ssj-015",
        name: "Tata Salt Lite | 15% Low Sodium Iodized Salt",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 55,
        mrp: 55,
        discount: 0,
        discountPercent: 0,
        unit: "1 kg",
        rating: 4.8,
        reviews: 26200,
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1279c778-fb6f-4005-9b3f-23aaf6582467/Tata-Salt-Lite-15-Low-Sodium-Iodized-Salt.jpeg"
    },

    // =========================================================
    // 16. TATA SALT SUPERLITE
    // =========================================================
    {
        id: "ssj-016",
        name: "Tata Salt Superlite With 30% Low Sodium",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 75,
        mrp: 75,
        discount: 0,
        discountPercent: 0,
        unit: "1 kg",
        rating: 4.7,
        reviews: 4600,
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/86b3d35e-1e41-473e-aea3-e0f5c66dc279/Tata-Salt-Superlite-With-30-Low-Sodium.jpeg"
    },

    // =========================================================
    // 17. CATCH PREMIUM PINK ROCK SALT
    // =========================================================
    {
        id: "ssj-017",
        name: "Catch Premium Iodized Pink Rock Salt",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 92,
        mrp: 130,
        discount: 38,
        discountPercent: 29,
        unit: "1 kg",
        rating: 5.0,
        reviews: 4900,
        badge: "₹38 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/419314ad-240d-44fa-97c6-bbb73e729360/Catch-Premium-Iodized-Pink-Rock-Salt.jpeg"
    },

    // =========================================================
    // 18. 24 MANTRA ORGANIC ROCK SALT
    // =========================================================
    {
        id: "ssj-018",
        name: "24 Mantra Organic Himalayan Rock Salt",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 102,
        mrp: 130,
        discount: 28,
        discountPercent: 22,
        unit: "1 kg",
        rating: 3.8,
        reviews: 181,
        badge: "₹28 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/61d7e82b-690e-480c-a478-b8493bc2661c/24-Mantra-Organic-Himalayan-Rock-Salt.jpeg"
    },

    // =========================================================
    // 19. RAJDHANI SENDHA NAMAK
    // =========================================================
    {
        id: "ssj-019",
        name: "Rajdhani Sendha Namak | Himalayan Pink Salt",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 95,
        mrp: 120,
        discount: 25,
        discountPercent: 21,
        unit: "1 kg",
        rating: 4.6,
        reviews: 187,
        badge: "₹25 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/41f3ad26-93f5-446b-9e5d-935378e0dfa2/Rajdhani-Sendha-Namak-Himalayan-Pink-Salt.jpeg"
    },

    // =========================================================
    // 20. DAILY GOOD PINK SALT
    // =========================================================
    {
        id: "ssj-020",
        name: "Daily Good Pink Salt",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 70,
        mrp: 125,
        discount: 55,
        discountPercent: 44,
        unit: "1 kg",
        rating: 4.8,
        reviews: 1200,
        badge: "₹55 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ac0fe0d1-e950-4811-b970-946bc3cbbe62/Daily-Good-Pink-Salt.jpeg"
    },

    // =========================================================
    // 21. ANNAPURNA PINK ROCK SALT
    // =========================================================
    {
        id: "ssj-021",
        name: "Annapurna Pink Rock Salt",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 77,
        mrp: 99,
        discount: 22,
        discountPercent: 22,
        unit: "1 kg",
        rating: 4.7,
        reviews: 1200,
        badge: "₹22 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ca821ce9-2033-40d2-b835-0870409c610f/Annapurna-Pink-Rock-Salt.jpeg"
    },

    // =========================================================
    // 22. NATURELAND ORGANICS PINK ROCK SALT
    // =========================================================
    {
        id: "ssj-022",
        name: "Natureland Organics Himalayan Pink Rock Salt",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 66,
        mrp: 98,
        discount: 32,
        discountPercent: 33,
        unit: "1 kg",
        rating: 4.6,
        reviews: 944,
        badge: "₹32 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/614d2fc3-8a5d-4eaf-8c56-dc0b69a69d82/Natureland-Organics-Himalayan-Pink-Rock-Salt.jpg"
    },

    // =========================================================
    // 23. DAILY GOOD JAGGERY 500G
    // =========================================================
    {
        id: "ssj-023",
        name: "Daily Good Jaggery / Gur / Gud",
        category: "Salt, Sugar & Jaggery",
        type: "Jaggery",
        price: 69,
        mrp: 90,
        discount: 21,
        discountPercent: 23,
        unit: "500 g",
        rating: 4.5,
        reviews: 23100,
        badge: "₹21 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4827ba53-a984-4a2b-ab3e-627987025a18/Daily-Good-Jaggery-Gur-Gud.jpeg"
    },

    // =========================================================
    // 24. TATA SALT IRON HEALTH
    // =========================================================
    {
        id: "ssj-024",
        name: "Tata Salt Iron Health",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 35,
        mrp: 35,
        discount: 0,
        discountPercent: 0,
        unit: "1 kg",
        rating: 4.6,
        reviews: 3500,
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6fcca77c-d588-46f9-b0c3-a2911e1cac28/Tata-Salt-Iron-Health.jpg"
    },

    // =========================================================
    // 25. ANNAPURNA IODIZED CRYSTAL SALT
    // =========================================================
    {
        id: "ssj-025",
        name: "Annapurna Iodized Crystal Salt | Kal Uppu",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 19,
        mrp: 22,
        discount: 3,
        discountPercent: 14,
        unit: "1 kg",
        rating: 4.8,
        reviews: 3400,
        badge: "₹3 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d915f178-bed2-485e-9f93-a84d06221dc2/Annapurna-Iodized-Crystal-Salt-Kal-Uppu.jpeg"
    },

    // =========================================================
    // 26. PARRY'S JAGGERY POWDER
    // =========================================================
    {
        id: "ssj-026",
        name: "Parry's Jaggery Powder",
        category: "Salt, Sugar & Jaggery",
        type: "Jaggery",
        price: 59,
        mrp: 65,
        discount: 6,
        discountPercent: 9,
        unit: "500 g",
        rating: 4.7,
        reviews: 40300,
        badge: "₹6 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3603-3603,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dd67cf9c-a461-4000-a161-78f677a02b02/Parry-s-Jaggery-Powder.jpg"
    },

    // =========================================================
    // 27. AASHIRVAAD IRON SHAKTI SALT
    // =========================================================
    {
        id: "ssj-027",
        name: "Aashirvaad Iron Shakti Salt | Packed with Iron-Boosters",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 28,
        mrp: 30,
        discount: 2,
        discountPercent: 7,
        unit: "1 kg",
        rating: 4.7,
        reviews: 1400,
        badge: "₹2 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e7a635a8-e280-449e-a910-3355750269e9/Aashirvaad-Iron-Shakti-Salt-Packed-with-Iron-Boosters.jpeg"
    },

    // =========================================================
    // 28. DAILY GOOD POWDERED SUGAR
    // =========================================================
    {
        id: "ssj-028",
        name: "Daily Good Powdered Sugar",
        category: "Salt, Sugar & Jaggery",
        type: "Sugar",
        price: 47,
        mrp: 75,
        discount: 28,
        discountPercent: 37,
        unit: "500 g",
        rating: 4.2,
        reviews: 7900,
        badge: "₹28 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2027-2027,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8ceb2a06-22e6-4e56-b572-8d988ee1ecc5/Daily-Good-Powdered-Sugar.jpeg"
    },

    // =========================================================
    // 29. ORGANIC TATTVA BROWN SUGAR
    // =========================================================
    {
        id: "ssj-029",
        name: "Organic Tattva Brown Sugar",
        category: "Salt, Sugar & Jaggery",
        type: "Sugar",
        price: 137,
        mrp: 185,
        discount: 48,
        discountPercent: 26,
        unit: "1 kg",
        rating: 5.0,
        reviews: 1400,
        badge: "₹48 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/156b1865-6ded-4488-bdfe-181dbd314ba7/Organic-Tattva-Brown-Sugar.jpg"
    },

    // =========================================================
    // 30. JUST ORGANIK HIMALAYAN PINK SALT
    // =========================================================
    {
        id: "ssj-030",
        name: "Just Organik Himalayan Pink Salt",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 111,
        mrp: 130,
        discount: 19,
        discountPercent: 15,
        unit: "1 kg",
        rating: 4.2,
        reviews: 69,
        badge: "₹19 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3f1b7ecf-0a71-4812-9e2c-0edc16fff7e7/Just-Organik-Just-Organik-Himalayan-Pink-Salt.jpg"
    },

    // =========================================================
    // 31. TWO BROTHERS PINK HIMALAYAN ROCK SALT
    // =========================================================
    {
        id: "ssj-031",
        name: "Two Brothers Pink Himalayan Rock Salt / Sendha Namak",
        category: "Salt, Sugar & Jaggery",
        type: "Salt",
        price: 91,
        mrp: 95,
        discount: 4,
        discountPercent: 4,
        unit: "1 kg",
        rating: 4.8,
        reviews: 110,
        badge: "₹4 OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3867edc0-6772-4f33-b084-857b0608ee86/Two-Brothers-Pink-Himalayan-Rock-Salt-Sendha-Namak.jpg"
    },

    // =========================================================
    // 32. TATA SALT PINK SALT
    // =========================================================
   

];


/* ============================================================
   MAKE PRODUCTS AVAILABLE GLOBALLY
   ============================================================ */

window.saltSugarJaggeryProducts = saltSugarJaggeryProducts;


/* ============================================================
   OPTIONAL CATEGORY ALIAS
   If your existing page expects `groceryProducts`
   ============================================================ */

if (!window.groceryProducts) {
    window.groceryProducts = [];
}

window.groceryProducts = [
    ...window.groceryProducts.filter(
        product => product.category !== "Salt, Sugar & Jaggery"
    ),
    ...saltSugarJaggeryProducts
];


/* ============================================================
   PRODUCT COUNT
   ============================================================ */

console.log(
    "LocalMart Salt, Sugar & Jaggery loaded:",
    saltSugarJaggeryProducts.length,
    "products"
);

/* ============================================================
   COMBINE MAIN PRODUCTS + NEW DATES & SEEDS
   Removes the old 5 Dates & Seeds products
   and replaces them with all 26 new products.
   ============================================================ */

const allMasalaProducts = [
    ...masalaProducts.filter(
        product => product.category !== "Dates & Seeds"
    ),
    ...datesSeedsProducts,
    ...wholeSpicesSeasoningsProducts,
    ...saltSugarJaggeryProducts

];

console.log(
    "LocalMart Masala Products:",
    allMasalaProducts.length
);

console.log(
    "Dates & Seeds Products:",
    datesSeedsProducts.length
);










/* ============================================================
   CAROUSEL RENDERER
   ============================================================ */

/* ============================================================
   CAROUSEL RENDERER
   ============================================================ */

function renderMasalaCarousel(products = allMasalaProducts) {

    const grid =
        document.getElementById("masalaProductsGrid");

    if (!grid) {
        console.error("masalaProductsGrid not found");
        return;
    }

    grid.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("article");

        card.className = "zepto-product-card";

        card.dataset.productId = product.id;

        const discountPercent =
            product.mrp > product.price
                ? Math.round(
                    ((product.mrp - product.price) / product.mrp) * 100
                )
                : 0;

        card.innerHTML = `

            <div class="zepto-product-image-box">

                ${
                    discountPercent > 0
                        ? `
                            <span class="zepto-discount-badge">
                                ${discountPercent}% OFF
                            </span>
                          `
                        : ""
                }

                <button
                    class="zepto-wishlist-btn"
                    onclick="toggleMasalaWishlist('${product.id}')"
                    aria-label="Wishlist"
                >
                    ♡
                </button>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    class="zepto-product-image"
                    onerror="
                        this.onerror=null;
                        this.src='https://via.placeholder.com/300x300?text=Product';
                    "
                >

            </div>

            <div class="zepto-product-info">

                <h3
                    class="zepto-product-name"
                    title="${product.name}"
                >
                    ${product.name}
                </h3>

                <div class="zepto-product-unit">
                    ${product.unit}
                </div>

                <div class="zepto-rating">

                    <span>★</span>

                    <strong>
                        ${product.rating}
                    </strong>

                    <small>
                        (${product.reviews})
                    </small>

                </div>

                <div class="zepto-price-row">

                    <div class="zepto-price">

                        <strong>
                            ₹${product.price}
                        </strong>

                        ${
                            product.mrp > product.price
                                ? `
                                    <del>
                                        ₹${product.mrp}
                                    </del>
                                  `
                                : ""
                        }

                    </div>

                    <button
                        class="zepto-add-btn"
                        onclick="addMasalaToCart('${product.id}')"
                    >
                        ADD
                    </button>

                </div>

            </div>

        `;

        grid.appendChild(card);
    });

    updateMasalaProductCount(products.length);

    updateMasalaWishlistButtons();

    /* ========================================================
       FORCE HORIZONTAL CAROUSEL
       ======================================================== */

    grid.style.display = "flex";
    grid.style.flexDirection = "row";
    grid.style.flexWrap = "nowrap";
    grid.style.gap = "14px";
    grid.style.overflowX = "auto";
    grid.style.overflowY = "hidden";
    grid.style.width = "100%";
    grid.style.maxWidth = "100%";
    grid.style.scrollBehavior = "smooth";

    grid.querySelectorAll(".zepto-product-card").forEach(card => {

        card.style.flex = "0 0 220px";
        card.style.width = "220px";
        card.style.minWidth = "220px";
        card.style.maxWidth = "220px";

    });
}

/* ============================================================
   PRODUCT COUNT
   ============================================================ */

function updateMasalaProductCount(count) {

    const countElement =
        document.getElementById("productCount");

    if (countElement) {
        countElement.textContent =
            `${count} products`;
    }
}


/* ============================================================
   CATEGORY FILTER
   ============================================================ */
/* ============================================================
   CATEGORY FILTER
   ============================================================ */

function showMasalaCategory(category) {

    const title =
        document.getElementById("categoryTitle");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageSubtitle =
        document.getElementById("pageSubtitle");

    let filtered = [];

    /* ========================================================
       TOP PICKS
       ======================================================== */

    if (
        !category ||
        category === "top-picks"
    ) {

        filtered = allMasalaProducts;

        if (title) {
            title.textContent = "Top Picks";
        }

        if (pageTitle) {
            pageTitle.textContent =
                "Masala, Dry Fruits & More";
        }

        if (pageSubtitle) {
            pageSubtitle.textContent =
                "Spices, dry fruits, seeds, sugar and more";
        }

    }

    /* ========================================================
       DATES & SEEDS
       IMPORTANT:
       Use datesSeedsProducts directly.
       ======================================================== */

    else if (category === "dates-seeds") {

        filtered = datesSeedsProducts;

        if (title) {
            title.textContent =
                "Dates & Seeds";
        }

        if (pageTitle) {
            pageTitle.textContent =
                "Dates & Seeds";
        }

        if (pageSubtitle) {
            pageSubtitle.textContent =
                `${datesSeedsProducts.length} products available`;
        }

        console.log(
            "Showing Dates & Seeds:",
            datesSeedsProducts.length
        );
    }

    /* ========================================================
       OTHER CATEGORIES
       ======================================================== */

    else {

        const categoryMap = {

            "powders-pastes":
                "Powders & Pastes",

            "dry-fruits":
                "Dry Fruits & Nuts",

            "whole-spices":
                "Whole Spices & Seasonings",

            "salt-sugar":
                "Salt, Sugar & Jaggery",

            "dehydrated":
                "Dehydrated & Dried",

            "premium":
                "Premium"

        };

        const categoryName =
            categoryMap[category];

        filtered =
            allMasalaProducts.filter(
                product =>
                    product.category === categoryName
            );

        if (title) {
            title.textContent =
                categoryName || "Masala";
        }

        if (pageTitle) {
            pageTitle.textContent =
                categoryName || "Masala";
        }

        if (pageSubtitle) {
            pageSubtitle.textContent =
                `${filtered.length} products available`;
        }
    }

    /* ========================================================
       RENDER
       ======================================================== */

    renderMasalaCarousel(filtered);

    /* ========================================================
       ACTIVE CATEGORY
       ======================================================== */

    document
        .querySelectorAll(".zepto-category-card")
        .forEach(card => {

            card.classList.remove("active");

            if (
                card.dataset.category === category ||
                (
                    !category &&
                    card.dataset.category === "top-picks"
                )
            ) {

                card.classList.add("active");

            }

        });
}
/* ============================================================
   SEARCH
   ============================================================ */

function searchMasalaProducts(searchTerm) {

    const term =
        String(searchTerm || "")
            .trim()
            .toLowerCase();

    if (!term) {

        renderMasalaCarousel(
            masalaProducts
        );

        return;
    }

    const results =
        masalaProducts.filter(product =>

            product.name
                .toLowerCase()
                .includes(term)

            ||

            product.category
                .toLowerCase()
                .includes(term)

            ||

            product.unit
                .toLowerCase()
                .includes(term)

        );

    renderMasalaCarousel(results);

    const searchStatus =
        document.getElementById("searchStatus");

    const searchTermElement =
        document.getElementById("searchTerm");

    if (searchStatus) {

        searchStatus.style.display =
            "block";
    }

    if (searchTermElement) {

        searchTermElement.textContent =
            `"${searchTerm}"`;
    }
}


/* ============================================================
   SORT
   ============================================================ */

function sortMasalaProducts(value) {

    let sorted =
        [...masalaProducts];

    switch (value) {

        case "price-low":

            sorted.sort(
                (a, b) =>
                    a.price - b.price
            );

            break;

        case "price-high":

            sorted.sort(
                (a, b) =>
                    b.price - a.price
            );

            break;

        case "rating":

            sorted.sort(
                (a, b) =>
                    b.rating - a.rating
            );

            break;

        case "discount":

            sorted.sort(
                (a, b) =>
                    b.discount - a.discount
            );

            break;

        default:
            break;
    }

    renderMasalaCarousel(sorted);
}


/* ============================================================
   WISHLIST
   ============================================================ */

function getMasalaWishlist() {

    try {

        const saved = JSON.parse(localStorage.getItem("localmartGroceryWishlist") || localStorage.getItem("localmartMasalaWishlist") || "[]");
        const products = Array.isArray(saved) ? saved.map(item => {
            if (item && typeof item === "object") return item;
            return allMasalaProducts.find(product => String(product.id) === String(item)) || {
                id: item, name: "Saved grocery product", category: "Grocery",
                price: 0, mrp: 0, image: "", quantity: 1
            };
        }) : [];
        if (!localStorage.getItem("localmartGroceryWishlist") && products.length) {
            localStorage.setItem("localmartGroceryWishlist", JSON.stringify(products));
            localStorage.removeItem("localmartMasalaWishlist");
        }
        return products;

    } catch {

        return [];
    }
}


function saveMasalaWishlist(list) {

    localStorage.setItem(
        "localmartGroceryWishlist",
        JSON.stringify(list)
    );
}


function toggleMasalaWishlist(productId) {

    const wishlist =
        getMasalaWishlist();

    const normalizedId = String(productId);
    const index = wishlist.findIndex(item => String(typeof item === "object" ? item.id : item) === normalizedId);

    if (index === -1) {

        const product = allMasalaProducts.find(item => String(item.id) === normalizedId);
        if (product) wishlist.push({ ...product, quantity: 1 });

        showMasalaToast(
            "Added to wishlist ❤️"
        );

    } else {

        wishlist.splice(index, 1);

        showMasalaToast(
            "Removed from wishlist"
        );
    }

    saveMasalaWishlist(wishlist);

    updateMasalaWishlistButtons();
}


function updateMasalaWishlistButtons() {

    const wishlist =
        getMasalaWishlist();

    document
        .querySelectorAll(
            ".zepto-wishlist-btn"
        )
        .forEach(button => {

            const card =
                button.closest(
                    ".zepto-product-card"
                );

            if (!card) return;

            const id =
                card.dataset.productId;

            if (wishlist.some(item => String(typeof item === "object" ? item.id : item) === String(id))) {

                button.classList.add("active");

                button.textContent =
                    "♥";

            } else {

                button.classList.remove("active");

                button.textContent =
                    "♡";
            }
        });
}


/* ============================================================
   CART
   ============================================================ */

function getMasalaCart() {

    try {

        const saved = JSON.parse(localStorage.getItem("localmartGroceryCart") || localStorage.getItem("localmartCart") || "[]");
        return Array.isArray(saved) ? saved : [];

    } catch {

        return [];
    }
}


function saveMasalaCart(cart) {

    localStorage.setItem(
        "localmartGroceryCart",
        JSON.stringify(cart)
    );
}


function addMasalaToCart(productId) {

    const product =
        masalaProducts.find(
            item =>
                item.id === productId
        );

    if (!product) return;

    let cart =
        getMasalaCart();

    const existing =
        cart.find(
            item =>
                item.id === productId
        );

    if (existing) {

        existing.quantity =
            (existing.quantity || 1) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            mrp: product.mrp,

            image: product.image,

            unit: product.unit,

            quantity: 1

        });
    }

    saveMasalaCart(cart);

    updateMasalaCartCount();

    showMasalaToast(
        `${product.name} added to cart`
    );

    if (typeof renderCart === "function") {
        renderCart();
    }

    if (typeof updateCartUI === "function") {
        updateCartUI();
    }
}


/* ============================================================
   CART COUNT
   ============================================================ */

function updateMasalaCartCount() {

    const cart =
        getMasalaCart();

    const count =
        cart.reduce(
            (total, item) =>
                total + (item.quantity || 1),
            0
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    if (cartCount) {

        cartCount.textContent =
            count;

        cartCount.style.display =
            count > 0
                ? "flex"
                : "none";
    }

    const cartItemsCount =
        document.getElementById(
            "cartItemsCount"
        );

    if (cartItemsCount) {

        cartItemsCount.textContent =
            count;
    }
}


/* ============================================================
   TOAST
   ============================================================ */

function showMasalaToast(message) {

    const toast =
        document.getElementById(
            "localmartToast"
        );

    if (!toast) return;

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        window.masalaToastTimer
    );

    window.masalaToastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2200);
}


/* ============================================================
   INITIALIZE
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderMasalaCarousel();

        updateMasalaCartCount();

        updateMasalaWishlistButtons();


        /* Search */

        const searchInput =
            document.getElementById(
                "masalaSearch"
            );

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                event => {

                    searchMasalaProducts(
                        event.target.value
                    );

                }
            );
        }


        /* Sort */

        const sortSelect =
            document.getElementById(
                "sortProducts"
            );

        if (sortSelect) {

            sortSelect.addEventListener(
                "change",
                event => {

                    sortMasalaProducts(
                        event.target.value
                    );

                }
            );
        }


        /* Clear search */

        const clearSearch =
            document.getElementById(
                "clearSearchButton"
            );

        if (clearSearch) {

            clearSearch.addEventListener(
                "click",
                () => {

                    if (searchInput)
                        searchInput.value = "";

                    const status =
                        document.getElementById(
                            "searchStatus"
                        );

                    if (status)
                        status.style.display =
                            "none";

                    renderMasalaCarousel();

                }
            );
        }


        /* Clear header search */

        const clearHeaderSearch =
            document.getElementById(
                "clearMasalaSearch"
            );

        if (clearHeaderSearch) {

            clearHeaderSearch.addEventListener(
                "click",
                () => {

                    if (searchInput)
                        searchInput.value = "";

                    renderMasalaCarousel();

                }
            );
        }

    }
);

/* ============================================================
TOP PICKS CATEGORY CAROUSEL
============================================================ */

document.addEventListener("DOMContentLoaded", function () {


const carousel =
    document.getElementById("categoryCarousel");

const prevButton =
    document.getElementById("categoryPrev");

const nextButton =
    document.getElementById("categoryNext");


if (!carousel) return;


if (prevButton) {

    prevButton.addEventListener("click", function () {

        carousel.scrollBy({
            left: -350,
            behavior: "smooth"
        });

    });

}


if (nextButton) {

    nextButton.addEventListener("click", function () {

        carousel.scrollBy({
            left: 350,
            behavior: "smooth"
        });

    });

}


/*
 * Active category card
 */

const categoryCards =
    document.querySelectorAll(
        ".zepto-category-card"
    );


categoryCards.forEach(function (card) {

    card.addEventListener("click", function () {

        categoryCards.forEach(function (item) {

            item.classList.remove("active");

        });

        card.classList.add("active");

    });

});


});



/* ============================================================
   DATES & SEEDS — SHOW ALL PRODUCTS
   ============================================================ */

function renderDatesSeedsProducts() {

    const container =
        document.getElementById("masalaProductsGrid") ||
        document.getElementById("groceryProducts");

    if (!container) {
        console.error("Dates & Seeds container not found");
        return;
    }

    // IMPORTANT:
    // Always use the complete Dates & Seeds array.
    const products = datesSeedsProducts;

    console.log("Dates & Seeds products:", products.length);

    container.innerHTML = products.map((product, index) => {

        const discount =
            product.mrp > product.price
                ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
                : 0;

        return `
            <div class="zepto-product-card"
                 data-product-id="${product.id}"
                 data-category="Dates & Seeds">

                <div class="product-image-wrapper">

                    ${discount > 0 ? `
                        <span class="discount-badge">
                            ${discount}% OFF
                        </span>
                    ` : ""}

                    <button
                        class="wishlist-btn"
                        onclick="toggleMasalaWishlist('${product.id}')"
                        aria-label="Add to wishlist">
                        ♡
                    </button>

                    <img
                        class="product-image"
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='${product.image}'"
                    >

                </div>

                <div class="product-info">

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <div class="product-unit">
                        ${product.unit}
                    </div>

                    <div class="product-rating">
                        <span class="rating-star">★</span>
                        <span>${product.rating}</span>
                        <span class="review-count">
                            (${product.reviews})
                        </span>
                    </div>

                    <div class="product-price-row">

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

                    <button
                        class="add-to-cart-btn"
                        onclick="addMasalaToCart('${product.id}')">
                        ADD
                    </button>

                </div>

            </div>
        `;

    }).join("");

    // Force horizontal scrolling with ALL products
    container.style.display = "flex";
    container.style.flexWrap = "nowrap";
    container.style.overflowX = "auto";
    container.style.overflowY = "hidden";
    container.style.gap = "14px";
    container.style.width = "100%";

    container.querySelectorAll(".zepto-product-card").forEach(card => {
        card.style.flex = "0 0 220px";
        card.style.width = "220px";
        card.style.minWidth = "220px";
    });
}
