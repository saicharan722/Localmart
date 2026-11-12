/* ============================================================
   LOCALMART
   BREAKFAST & SAUCES
   ZEPTO-STYLE PRODUCT CATALOGUE
   CLEAN VERSION
   ============================================================ */


/* ============================================================
   PRODUCT DATA
   ============================================================ */

const breakfastSaucesProducts = [

    /* ========================================================
       HONEY & SPREADS
       ======================================================== */

    {
        id: "bs-002",
        name: "Kissan Mixed Fruit Jam",
        category: "Honey & Spreads",
        price: 89,
        mrp: 90,
        discount: 1,
        unit: "1 pc (200 g)",
        rating: 4.7,
        reviews: "98.3k",
        badge: "1OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8522e705-a615-4fa4-99c7-6ef237c532eb/Kissan-Mixed-Fruit-Jam.jpeg"
    },

    {
        id: "bs-012",
        name: "Dabur Honey Squeezy | Totally Pure | World's No.1 Honey Brand | Buy 1 Get 1 Free",
        category: "Honey & Spreads",
        price: 167,
        mrp: 249,
        discount: 82,
        unit: "2 x 225 g",
        rating: 4.7,
        reviews: "22.6k",
        badge: "82OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5c68bfed-e345-46ac-8044-6f96337c6f97/Dabur-Honey-Squeezy-Totally-Pure-World-s-No-1-Honey-Brand-Buy-1-Get-1-Free.png"
    },

    {
        id: "bs-018",
        name: "Dabur Honey | Totally Pure | World's No.1 Honey Brand | No Sugar Adulteration",
        category: "Honey & Spreads",
        price: 70,
        mrp: 70,
        discount: 0,
        unit: "1 pc (100 g)",
        rating: 4.7,
        reviews: "27.6k",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/169d3368-141a-443a-a23c-a423dfea52a2/Dabur-Honey-Totally-Pure-World-s-No-1-Honey-Brand-No-Sugar-Adulteration.jpg"
    },


    /* ========================================================
       PEANUT BUTTER
       ======================================================== */

    {
        id: "bs-004",
        name: "MyFitness 26g High Protein Chocolate Peanut Butter Spread - Crunchy",
        category: "Peanut Butter",
        price: 281,
        mrp: 319,
        discount: 38,
        unit: "1 pc (510 g)",
        rating: 4.6,
        reviews: "26.1k",
        badge: "38OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2250-2250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/74f6d346-8bd8-4d57-b2c2-a65dbd9cee84/MyFitness-26g-High-Protein-Chocolate-Peanut-Butter-Spread-Crunchy.jpeg"
    },

    {
        id: "bs-007",
        name: "Pintola All Natural Peanut Butter - Crunchy",
        category: "Peanut Butter",
        price: 156,
        mrp: 170,
        discount: 14,
        unit: "1 pc (350 g)",
        rating: 4.4,
        reviews: "14.8k",
        badge: "14OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e882db65-295a-45c4-ba7c-26483e86a1f3/Pintola-All-Natural-Peanut-Butter-Crunchy.jpg"
    },

    {
        id: "bs-013",
        name: "Disano Chocolate Peanut Butter Crunchy",
        category: "Peanut Butter",
        price: 100,
        mrp: 250,
        discount: 150,
        unit: "1 Pack (350 g)",
        rating: 4.6,
        reviews: "14.9k",
        badge: "150OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/53df7952-430b-4812-ac47-780238b7946f/Disano-Chocolate-Peanut-Butter-Crunchy.jpg"
    },

    {
        id: "bs-017",
        name: "Sundrop Peanut Butter with Honey | Crunchy | 23% Protein | Premium Roasted Peanuts",
        category: "Peanut Butter",
        price: 95,
        mrp: 99,
        discount: 4,
        unit: "1 pc (300 g)",
        rating: 4.6,
        reviews: "31.3k",
        badge: "4OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4c32bfdc-f5fe-4d00-9ef1-39e592e62d0c/Sundrop-Peanut-Butter-with-Honey-Crunchy-23-Protein-Premium-Roasted-Peanuts-No-Preservatives.jpeg"
    },


    /* ========================================================
       BREAKFAST CEREALS
       ======================================================== */

    {
        id: "bs-005",
        name: "Kellogg's Chocos, Moons and Stars Duet, Crunchy Bites and Chhota Laddoo | Pack of 7",
        category: "Breakfast Cereals",
        price: 63,
        mrp: 70,
        discount: 7,
        unit: "7 pack (140 g)",
        rating: 4.8,
        reviews: "71.7k",
        badge: "7OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d1f792a1-2698-478c-9258-56a117c92e7c/Kellogg-s-Chocos-Moons-and-Stars-Duet-Crunchy-Bites-and-Chhota-Laddoo-Pack-of-7.jpeg"
    },

    {
        id: "bs-010",
        name: "Kellogg's Multigrain Chocos Fills Double Chocolaty",
        category: "Breakfast Cereals",
        price: 90,
        mrp: 95,
        discount: 5,
        unit: "1 pack (150 g)",
        rating: 4.7,
        reviews: "14.0k",
        badge: "5OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4000-4000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/90fcc268-a170-4d92-8a97-1ef5b18ee9d6/Kellogg-s-Multigrain-Chocos-Fills-Double-Chocolaty.jpeg"
    },

    {
        id: "bc-001",
        name: "Kellogg's Corn Flakes Original | High in Iron | High in B Group Vitamins | Breakfast Cereals",
        category: "Breakfast Cereals",
        price: 20,
        mrp: 20,
        discount: 0,
        unit: "1 pack (55 g)",
        rating: 4.6,
        reviews: "2.3k",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1492-2100,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6cc3e6fa-3352-4367-bc3f-96875a71e627/Kellogg-s-Corn-Flakes-Original-High-in-Iron-High-in-B-Group-Vitamins-Breakfast-Cereals.jpeg"
    },

    {
        id: "bc-003",
        name: "Kellogg's Corn Flakes Real Strawberry | Power Breakfast | 7 Vitamins",
        category: "Breakfast Cereals",
        price: 163,
        mrp: 175,
        discount: 12,
        unit: "1 pack (300 g)",
        rating: 4.7,
        reviews: "4.0k",
        badge: "12OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/02262412-fafb-4d77-8cf3-165568386f2c/Kellogg-s-Corn-Flakes-Real-Strawberry-Power-Breakfast-7-Vitamins.jpeg"
    },

    {
        id: "bc-004",
        name: "Kellogg's Corn Flakes Almonds & Honey | Power Breakfast",
        category: "Breakfast Cereals",
        price: 180,
        mrp: 190,
        discount: 10,
        unit: "1 pack (300 g)",
        rating: 4.7,
        reviews: "4.7k",
        badge: "10OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b06cb9d7-dd47-421d-a6ed-0bc119d95205/Kellogg-s-Corn-Flakes-Almonds-Honey-Power-Breakfast.jpeg"
    },

    {
        id: "bc-006",
        name: "Kellogg's Multigrain Chocos | More Chocolatey | No-Maida",
        category: "Breakfast Cereals",
        price: 240,
        mrp: 280,
        discount: 40,
        unit: "1.05 kg",
        rating: 4.7,
        reviews: "1.9k",
        badge: "40OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/141ef03c-6043-431b-ac22-5532f154e18c/Kellogg-s-Multigrain-Chocos-More-Chocolatey-No-Maida.jpg"
    },

    {
        id: "bc-007",
        name: "Kellogg's Corn Flakes Original | Power Breakfast | 7 Vitamins",
        category: "Breakfast Cereals",
        price: 350,
        mrp: 490,
        discount: 140,
        unit: "1.15 kg",
        rating: 4.7,
        reviews: "3.8k",
        badge: "140OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d9b9c630-4caa-4500-83e2-6d30fe10f09c/Kellogg-s-Corn-Flakes-Original-Power-Breakfast-7-Vitamins.jpeg"
    },

    {
        id: "bc-010",
        name: "Kellogg's Corn Flakes Real Honey | Power Breakfast | 7 Vitamins",
        category: "Breakfast Cereals",
        price: 185,
        mrp: 185,
        discount: 0,
        unit: "1 pack (300 g)",
        rating: 4.6,
        reviews: "1.1k",
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dd5dd733-fb4a-4842-9c97-4af1119f510d/Kellogg-s-Corn-Flakes-Real-Honey-Power-Breakfast-7-Vitamins.jpeg"
    },


    /* ========================================================
       KETCHUP & SAUCES
       ======================================================== */

    {
        id: "ks-005",
        name: "Kissan Sweet & Spicy Sauce",
        category: "Ketchup & Sauces",
        price: 64,
        mrp: 80,
        discount: 16,
        unit: "1 pack (415 g)",
        rating: 4.5,
        reviews: 9900,
        badge: "16OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/98cb0a98-04e3-435b-9383-3666eb0f5663/Kissan-Sweet-Spicy-Sauce.jpg"
    },

    {
        id: "ks-006",
        name: "Dabur Hommade Tomato Puree",
        category: "Ketchup & Sauces",
        price: 21,
        mrp: 25,
        discount: 4,
        unit: "1 pc (200 g)",
        rating: 4.6,
        reviews: 13000,
        badge: "4OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/870c5350-e72a-48fd-97c4-e77212413932/Dabur-Hommade-Tomato-Puree.png"
    },

    {
        id: "ks-007",
        name: "9am Vinegar | Ideal for Noodles, Manchurian & Chinese Dishes",
        category: "Ketchup & Sauces",
        price: 38,
        mrp: 50,
        discount: 12,
        unit: "200 ml",
        rating: 4.8,
        reviews: 2000,
        badge: "12OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1254-1254,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4b886ecd-4fcf-43db-8e13-221a3dea5193/9am-Vinegar-Ideal-for-Noodles-Manchurian-Chinese-Dishes.png"
    },

    {
        id: "ks-008",
        name: "Ching's Secret Green Chilli Sauce | Bold And Flavourful",
        category: "Ketchup & Sauces",
        price: 56,
        mrp: 60,
        discount: 4,
        unit: "1 pc (190 g)",
        rating: 4.7,
        reviews: 18200,
        badge: "4OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1176-1176,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4114dbd9-e9a4-4f9c-831a-e29fd90a360f/Ching-s-Secret-Green-Chilli-Sauce-Bold-And-Flavourful.jpeg"
    },

    {
        id: "ks-009",
        name: "Knorr Sauce Pizza and Pasta",
        category: "Ketchup & Sauces",
        price: 58,
        mrp: 65,
        discount: 7,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: 30000,
        badge: "7OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/546f5462-cd27-46e4-bf91-619849ef65dc/Knorr-Sauce-Pizza-and-Pasta.jpg"
    },

    {
        id: "ks-010",
        name: "MasterChow Chilli Oil",
        category: "Ketchup & Sauces",
        price: 91,
        mrp: 149,
        discount: 58,
        unit: "1 Pc (90 g)",
        rating: 4.6,
        reviews: 999,
        badge: "58OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0fcb39d6-93be-4c45-b1b3-b411bb3f44f9/MasterChow-Chilli-Oil.jpeg"
    },

    {
        id: "ks-011",
        name: "Ching's Secret White Chilli Vinegar, With Green Jwala Chilli, Bold and Intense Flavour",
        category: "Ketchup & Sauces",
        price: 47,
        mrp: 50,
        discount: 3,
        unit: "1 pc (170 ml)",
        rating: 4.7,
        reviews: 11200,
        badge: "3OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ab429154-8c71-4b80-a83b-7cf49ead25e1/Ching-s-Secret-White-Chilli-Vinegar-With-Green-Jwala-Chilli-Bold-and-Intense-Flavour.jpeg"
    },

    {
        id: "ks-012",
        name: "MasterChow White Vinegar",
        category: "Ketchup & Sauces",
        price: 49,
        mrp: 60,
        discount: 11,
        unit: "1 pc (170 ml)",
        rating: 4.8,
        reviews: 10100,
        badge: "11OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5cd01443-7858-4f3d-b6e6-cb0517cba13f/MasterChow-White-Vinegar.jpg"
    },

    {
        id: "ks-013",
        name: "Ching's Secret Red Chilli Sauce | Bold | Fiery And Aromatic",
        category: "Ketchup & Sauces",
        price: 56,
        mrp: 60,
        discount: 4,
        unit: "1 pc (200 g)",
        rating: 4.7,
        reviews: 21600,
        badge: "4OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1176-1176,pr-true,f-auto,q-40,dpr-2/cms/product_variant/06c9649a-cccc-4091-b55f-fba4b48350c0/Ching-s-Secret-Red-Chilli-Sauce-Bold-Fiery-And-Aromatic.jpeg"
    },

    {
        id: "ks-014",
        name: "Knorr Schezwan Sauce",
        category: "Ketchup & Sauces",
        price: 63,
        mrp: 70,
        discount: 7,
        unit: "1 pack (200 g)",
        rating: 4.7,
        reviews: 14900,
        badge: "7OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/349d1cca-041f-464a-8392-5c5a328f9e19/Knorr-Schezwan-Sauce.jpg"
    },

    {
        id: "ks-015",
        name: "Maggi Hot & Sweet Tomato Chilli Sauce",
        category: "Ketchup & Sauces",
        price: 175,
        mrp: 190,
        discount: 15,
        unit: "1 pc (1 kg)",
        rating: 4.6,
        reviews: 11500,
        badge: "15OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5ef84cd1-7a0f-4a5e-956d-7798e38e88c3/Maggi-Hot-Sweet-Tomato-Chilli-Sauce.jpeg"
    },

    {
        id: "ks-016",
        name: "Winn White Vinegar",
        category: "Ketchup & Sauces",
        price: 28,
        mrp: 40,
        discount: 12,
        unit: "1 pc (200 ml)",
        rating: 4.7,
        reviews: 1200,
        badge: "12OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/804aed4e-4b19-4ddd-8d87-c2ab5ec30739/Winn-White-Vinegar.jpeg"
    },

    {
        id: "ks-017",
        name: "Troovy Tomato Sauce (Chemical-Free)",
        category: "Ketchup & Sauces",
        price: 190,
        mrp: 190,
        discount: 0,
        unit: "1 pc (340 g)",
        rating: 4.5,
        reviews: 1900,
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3768ba12-da49-4fa9-a073-e4b5b79a3ff4/Troovy-Tomato-Sauce-Chemical-Free-.png"
    },

    {
        id: "ks-018",
        name: "MasterChow Dark Soya Sauce",
        category: "Ketchup & Sauces",
        price: 49,
        mrp: 60,
        discount: 11,
        unit: "1 pc (210 g)",
        rating: 4.7,
        reviews: 7500,
        badge: "11OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fdf294d0-ef93-4f75-a8d5-68170d2e5a81/MasterChow-Dark-Soya-Sauce.jpg"
    },

    {
        id: "ks-019",
        name: "MasterChow 2x Spicy Sichuan Chilli Oil",
        category: "Ketchup & Sauces",
        price: 195,
        mrp: 295,
        discount: 100,
        unit: "1 pc (170 g)",
        rating: 4.7,
        reviews: 1400,
        badge: "100OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4688daac-f2ca-4062-8213-65ff59bd24d0/MasterChow-2x-Spicy-Sichuan-Chilli-Oil.png"
    },

    {
        id: "ks-020",
        name: "Maggi Hot & Sweet Tomato Chilli Sauce",
        category: "Ketchup & Sauces",
        price: 80,
        mrp: 80,
        discount: 0,
        unit: "1 pc (200 g)",
        rating: 4.7,
        reviews: 9000,
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c82f3f2b-7794-448b-a3aa-3213d21e7e8c/Maggi-Hot-Sweet-Tomato-Chilli-Sauce.jpeg"
    },

    {
        id: "ks-021",
        name: "Wingreens Farms Pizza & Pasta Sauce",
        category: "Ketchup & Sauces",
        price: 56,
        mrp: 70,
        discount: 14,
        unit: "1 pc (180 g)",
        rating: 4.7,
        reviews: 8300,
        badge: "14OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/28cba351-25e0-4de8-9794-ed3833cb7ab0/Wingreens-Farms-Pizza-Pasta-Sauce.jpeg"
    },

    {
        id: "ks-022",
        name: "Wingreens Farms Basil Pesto | Pesto Sauce | Pesto Dip",
        category: "Ketchup & Sauces",
        price: 157,
        mrp: 234,
        discount: 77,
        unit: "1 pc (150 g)",
        rating: 4.1,
        reviews: 358,
        badge: "77OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1706-1706,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4ed8bc40-1a4c-4e86-848f-58eb91d348f4/Wingreens-Farms-Basil-Pesto-Pesto-Sauce-Pesto-Dip.png"
    },

    {
        id: "ks-023",
        name: "MasterChow Red Chilli Sauce",
        category: "Ketchup & Sauces",
        price: 48,
        mrp: 60,
        discount: 12,
        unit: "1 pc (200 g)",
        rating: 4.7,
        reviews: 5800,
        badge: "12OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b4f62ef6-bec7-4226-bb0b-ff919b97dfe7/MasterChow-Red-Chilli-Sauce.jpg"
    },

    {
        id: "ks-024",
        name: "Knorr Korean Gochujang Sauce | Spicy-Umami-Sweet-Salty",
        category: "Ketchup & Sauces",
        price: 86,
        mrp: 93,
        discount: 7,
        unit: "1 pack (200 g)",
        rating: 4.4,
        reviews: 247,
        badge: "7OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6f1592c2-32df-4be6-950f-29177a36d6f6/Knorr-Korean-Gochujang-Sauce-Spicy-Umami-Sweet-Salty.jpg"
    },

    {
        id: "ks-025",
        name: "Kissan No-Onion No-Garlic Tomato Sauce",
        category: "Ketchup & Sauces",
        price: 120,
        mrp: 130,
        discount: 10,
        unit: "1 pack (850 g)",
        rating: 4.7,
        reviews: 8500,
        badge: "10OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1100-1100,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5fc59c5b-04aa-48e2-a324-1efea605b390/Kissan-No-Onion-No-Garlic-Tomato-Sauce.jpeg"
    },

    {
        id: "ks-026",
        name: "Veeba Chef's Choice Tomato Ketchup",
        category: "Ketchup & Sauces",
        price: 82,
        mrp: 120,
        discount: 38,
        unit: "1 pack (900 g)",
        rating: 4.7,
        reviews: 46300,
        badge: "38OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4500-4500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/dfda3acf-2ee2-4565-ba12-1fb998161b11/Veeba-Chef-s-Choice-Tomato-Ketchup.jpeg"
    },

    {
        id: "ks-027",
        name: "Kitchen Secret Aglio E Olio",
        category: "Ketchup & Sauces",
        price: 278,
        mrp: 299,
        discount: 21,
        unit: "1 pack (180 g)",
        rating: 4.5,
        reviews: 500,
        badge: "21OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/050bd8a2-5fe8-4f02-a450-46baa3193bf1/Kitchen-Secret-Aglio-E-Olio.png"
    },

    {
        id: "ks-028",
        name: "MasterChow Spicy Sichuan Chilli Oil",
        category: "Ketchup & Sauces",
        price: 189,
        mrp: 295,
        discount: 106,
        unit: "1 pc (170 g)",
        rating: 4.5,
        reviews: 1800,
        badge: "106OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6e01b9a5-8af1-4a1d-b7ad-cc2da49bd4dc/MasterChow-Spicy-Sichuan-Chilli-Oil.jpeg"
    },

    {
        id: "ks-029",
        name: "Kitchen Secret Basil Pesto",
        category: "Ketchup & Sauces",
        price: 345,
        mrp: 399,
        discount: 54,
        unit: "1 pack (185 g)",
        rating: 4.5,
        reviews: 500,
        badge: "54OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ec564a1b-063d-426c-8468-809b78665075/Kitchen-Secret-Basil-Pesto.png"
    },

    {
        id: "ks-030",
        name: "Little Joys Tomato Sauce | No preservatives | Made With Jaggery",
        category: "Ketchup & Sauces",
        price: 299,
        mrp: 299,
        discount: 0,
        unit: "1 pc",
        rating: 4.7,
        reviews: 166,
        badge: "",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7a64bf30-806b-4228-9440-76a7db30d358/Little-Joys-Tomato-Sauce-No-preservatives-Made-With-Jaggery.png"
    },

    {
        id: "ks-031",
        name: "Heinz Tomato Ketchup",
        category: "Ketchup & Sauces",
        price: 152,
        mrp: 165,
        discount: 13,
        unit: "1 pc (435 g)",
        rating: 4.6,
        reviews: 1800,
        badge: "13OFF",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1535-1535,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a941001e-256f-45b3-b4fe-d1afc4957704/Heinz-Tomato-Ketchup.jpeg"
    },


    /* ========================================================
       MUESLI & OATS
       ======================================================== */

    {
        id: "mo-001",
        name: "Yoga Bar High Protein Oats Dark Chocolate",
        category: "Muesli & Oats",
        price: 27,
        mrp: 50,
        discount: 23,
        unit: "1 pack (50 g)",
        rating: 4.5,
        reviews: 9800,
        brand: "Yoga Bar",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0fd16d77-844f-4817-9631-b5959665e1e7/Yoga-Bar-High-Protein-Oats-Dark-Chocolate.jpg",
        description: "High protein oats with delicious dark chocolate flavour."
    },

    {
        id: "mo-002",
        name: "Quaker Rolled Instant Oats | High Protein Breakfast Cereal",
        category: "Muesli & Oats",
        price: 85,
        mrp: 86,
        discount: 1,
        unit: "1 pack (400 g)",
        rating: 4.7,
        reviews: 57900,
        brand: "Quaker",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9e3095db-068b-4134-b65f-2870caf4989e/Quaker-Rolled-Instant-Oats-High-Protein-Breakfast-Cereal.jpg",
        description: "Rolled instant oats suitable for a wholesome breakfast."
    },

    {
        id: "mo-003",
        name: "Yoga Bar Wholegrain Breakfast Muesli - Dark Chocolate and Cranberry",
        category: "Muesli & Oats",
        price: 40,
        mrp: 40,
        discount: 0,
        unit: "1 pack (40 g)",
        rating: 4.6,
        reviews: 10500,
        brand: "Yoga Bar",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-3000-3000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0e2c0b0d-ce53-4360-95fc-f9812e99ead8/Yoga-Bar-Wholegrain-Breakfast-Muesli-Dark-Chocolate-and-Cranberry.jpg",
        description: "Wholegrain breakfast muesli with dark chocolate and cranberry."
    },

    {
        id: "mo-004",
        name: "Yoga Bar 23g High Protein Muesli Choco Almond & Cranberry, Added Probiotics, Fibre Rich, Omega - 3",
        category: "Muesli & Oats",
        price: 445,
        mrp: 890,
        discount: 445,
        unit: "1 pack (1 kg)",
        rating: 4.5,
        reviews: 2200,
        brand: "Yoga Bar",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/303a10a5-e402-48c0-b8da-698a93921a48/Yoga-Bar-23g-High-Protein-Muesli-Choco-Almond-Cranberry-Added-Probiotics-Fibre-Rich-Omega-3.jpg",
        description: "High protein muesli with chocolate, almonds, cranberry and added probiotics."
    },

    {
        id: "mo-005",
        name: "Saffola Oats, Instant Rolled Oats, Soft & Creamy Oats, Power of Protein, Iron & Fibre",
        category: "Muesli & Oats",
        price: 160,
        mrp: 205,
        discount: 45,
        unit: "1 pack (1 kg)",
        rating: 4.8,
        reviews: 9000,
        brand: "Saffola",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1501,pr-true,f-auto,q-40,dpr-2/cms/product_variant/2c2bc379-45ca-40e8-9ee9-c782db9e79b3/Saffola-Oats-Instant-Rolled-Oats-Soft-Creamy-Oats-Power-of-Protein-Iron-Fibre.jpg",
        description: "Soft and creamy instant rolled oats rich in protein, iron and fibre."
    },

    

    {
        id: "mo-007",
        name: "Kellogg's Millet Muesli with 84% Fruit, Seeds & Multigrain | Power Breakfast | No Maida | No Palm Oil",
        category: "Muesli & Oats",
        price: 343,
        mrp: 690,
        discount: 347,
        unit: "1 pack (1 kg)",
        rating: 4.9,
        reviews: 7500,
        brand: "Kellogg's",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c5bfe370-accb-4bf2-91f1-c221f7dee8aa/Kellogg-s-Millet-Muesli-with-84-Fruit-Seeds-Multigrain-Power-Breakfast-No-Maida-No-Palm-Oil.jpg",
        description: "Millet muesli with fruits, seeds and multigrains."
    },

    {
        id: "mo-008",
        name: "Alpino 25g High Protein Super Oats Chocolate with Almonds & Raisins | No Added Sugar & Salt",
        category: "Muesli & Oats",
        price: 489,
        mrp: 549,
        discount: 60,
        unit: "1 pack (1 kg)",
        rating: 4.7,
        reviews: 1600,
        brand: "Alpino",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/fdff61e4-801d-4dab-9388-e57f678a5ac7/Alpino-25g-High-Protein-Super-Oats-Chocolate-with-Almonds-Raisins-No-Added-Sugar-Salt.png",
        description: "High protein chocolate oats with almonds and raisins."
    },

    {
        id: "mo-009",
        name: "Kellogg's Muesli Fruit Nut & Seeds | 12 In 1 Power Breakfast | No Maida | No Palm Oil | India's No 1 Muesli",
        category: "Muesli & Oats",
        price: 347,
        mrp: 489,
        discount: 142,
        unit: "1 pack (750 g)",
        rating: 4.9,
        reviews: 18000,
        brand: "Kellogg's",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/490768da-4116-49a8-b597-68145d59d0c0/Kellogg-s-Muesli-Fruit-Nut-Seeds-12-In-1-Power-Breakfast-No-Maida-No-Palm-Oil-India-s-No-1-Muesli.jpg",
        description: "Fruit, nut and seed muesli with a 12-in-1 power breakfast blend."
    },

    {
        id: "mo-010",
        name: "Pintola High Protein Oats Dark Chocolate With Almonds Raisin Pumpkin And Chia Seeds",
        category: "Muesli & Oats",
        price: 269,
        mrp: 310,
        discount: 41,
        unit: "1 pack (400 g)",
        rating: 4.8,
        reviews: 10300,
        brand: "Pintola",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4168-4168,pr-true,f-auto,q-40,dpr-2/cms/product_variant/853ead3b-27aa-425f-b3bb-30ae462f6faf/Pintola-High-Protein-Oats-Dark-Chocolate-With-Almonds-Raisin-Pumpkin-And-Chia-Seeds.jpg",
        description: "High protein oats with dark chocolate, almonds, raisins, pumpkin and chia seeds."
    },

    {
        id: "mo-011",
        name: "Pintola High Protein Muesli Dark Chocolate & Cranberry, 25 g Protein, High Fibre, Trans Fat Free",
        category: "Muesli & Oats",
        price: 626,
        mrp: 710,
        discount: 84,
        unit: "1 pack (1 kg)",
        rating: 4.6,
        reviews: 1200,
        brand: "Pintola",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4167-4168,pr-true,f-auto,q-40,dpr-2/cms/product_variant/316c70a3-5b60-4c96-8240-8cefe15b9968/Pintola-High-Protein-Muesli-Dark-Chocolate-Cranberry-25-g-Protein-High-Fibre-Trans-Fat-Free.jpg",
        description: "High protein muesli with dark chocolate and cranberry."
    },

    {
        id: "mo-012",
        name: "Kwality Muesli Fruit N Nut Multigrain",
        category: "Muesli & Oats",
        price: 316,
        mrp: 699,
        discount: 383,
        unit: "1 pc (1 kg)",
        rating: 4.8,
        reviews: 3000,
        brand: "Kwality",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2500-2500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/adcbd566-55c4-4412-8a74-b723f46f2797/Kwality-Muesli-Fruit-N-Nut-Multigrain.jpeg",
        description: "Fruit and nut multigrain muesli for a wholesome breakfast."
    },

    {
        id: "mo-013",
        name: "Yoga Bar 26% High Protein Oats Filter Coffee, No Added Sugar, High Fibre, Added Probiotics",
        category: "Muesli & Oats",
        price: 416,
        mrp: 490,
        discount: 74,
        unit: "1 pack (1 kg)",
        rating: 4.4,
        reviews: 1300,
        brand: "Yoga Bar",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e0337099-0a99-4268-9bf9-7b8e1f471771/Yoga-Bar-26-High-Protein-Oats-Filter-Coffee-No-Added-Sugar-High-Fibre-Added-Probiotics.jpg",
        description: "High protein oats with filter coffee flavour and added probiotics."
    },

    {
        id: "mo-014",
        name: "Yoga Bar Muesli Fruits, Nuts & Seeds, Protein Rich, Millets, Strawberry & Raisins",
        category: "Muesli & Oats",
        price: 400,
        mrp: 890,
        discount: 490,
        unit: "1 pack (1 kg)",
        rating: 4.2,
        reviews: 1100,
        brand: "Yoga Bar",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8147a8b2-e233-4800-801a-498f5e02f044/Yoga-Bar-Muesli-Fruits-Nuts-Seeds-Protein-Rich-Millets-Strawberry-Raisins.jpg",
        description: "Protein-rich muesli with fruits, nuts, seeds, millets, strawberry and raisins."
    },

    {
        id: "mo-015",
        name: "True Elements Muesli Dark Chocolate",
        category: "Muesli & Oats",
        price: 415,
        mrp: 649,
        discount: 234,
        unit: "1 pack (1 kg)",
        rating: 4.6,
        reviews: 1000,
        brand: "True Elements",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/bd06df69-0ff4-4b2f-a3ec-b45ff866eb51/True-Elements-Muesli-Dark-Chocolate.jpeg",
        description: "Crunchy muesli with rich dark chocolate flavour."
    },

    {
        id: "mo-016",
        name: "Pintola 25g High Protein Muesli - Fruit & Nut - Naturally Sweetened",
        category: "Muesli & Oats",
        price: 600,
        mrp: 710,
        discount: 110,
        unit: "1 pack (1 kg)",
        rating: 4.9,
        reviews: 84,
        brand: "Pintola",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4168-4168,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c37db919-70ad-43e0-acb3-d76a5cb877cc/Pintola-25g-High-Protein-Muesli-Fruit-Nut-Naturally-Sweetened.jpg",
        description: "High protein fruit and nut muesli, naturally sweetened."
    },

    {
        id: "mo-017",
        name: "Yoga Bar 26% High Protein Oats Kesar Pista, No Added Sugar, High Fibre, Added Probiotics",
        category: "Muesli & Oats",
        price: 416,
        mrp: 490,
        discount: 74,
        unit: "1 pack (1 kg)",
        rating: 4.6,
        reviews: 741,
        brand: "Yoga Bar",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/39ea1f8c-b992-4ed2-9de8-bbf819099321/Yoga-Bar-26-High-Protein-Oats-Kesar-Pista-No-Added-Sugar-High-Fibre-Added-Probiotics.jpg",
        description: "High protein oats with kesar pista flavour, fibre and probiotics."
    },

    {
        id: "mo-018",
        name: "Yoga Bar Dark Chocolate Oats, High Protein and Fibre, Raisins, Pumpkin, Chia Seeds, Rich in Omega -3",
        category: "Muesli & Oats",
        price: 416,
        mrp: 490,
        discount: 74,
        unit: "1 pack (1 kg)",
        rating: 4.6,
        reviews: 640,
        brand: "Yoga Bar",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d79e239f-d7e6-4e0a-836d-21c3ab39641b/Yoga-Bar-Dark-Chocolate-Oats-High-Protein-and-Fibre-Raisins-Pumpkin-Chia-Seeds-Rich-in-Omega-3.jpg",
        description: "Dark chocolate oats with protein, fibre, raisins, pumpkin and chia seeds."
    },

    {
        id: "mo-019",
        name: "Alpino 27g High Protein Oats Dark Chocolate with Dry Fruit Nut & Seed Mix | No Refined Sugar & Salt",
        category: "Muesli & Oats",
        price: 519,
        mrp: 649,
        discount: 130,
        unit: "1 pack (1 kg)",
        rating: 4.5,
        reviews: 331,
        brand: "Alpino",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1050-1050,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c04009e5-6fce-4d2e-8b20-273b88ff9df9/Alpino-27g-High-Protein-Oats-Dark-Chocolate-with-Dry-Fruit-Nut-Seed-Mix-No-Refined-Sugar-Salt.jpg",
        description: "High protein dark chocolate oats with dry fruits, nuts and seeds."
    },

    {
        id: "mo-020",
        name: "MuscleBlaze Fit High Protein Muesli (Dark Chocolate & Cranberry, 1kg) | 22g Protein",
        category: "Muesli & Oats",
        price: 649,
        mrp: 749,
        discount: 100,
        unit: "1 pack (1 kg)",
        rating: 4.5,
        reviews: 671,
        brand: "MuscleBlaze",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/946376ec-7ce4-4404-929f-738a5a1db7fa/MuscleBlaze-Fit-High-Protein-Muesli-Dark-Chocolate-Cranberry-1kg-22g-Protein.png",
        description: "High protein muesli with dark chocolate and cranberry."
    },

    {
        id: "mo-021",
        name: "Saffola Oats, Instant Rolled Oats, Soft & Creamy Oats, Power of Protein, Iron & Fibre",
        category: "Muesli & Oats",
        price: 224,
        mrp: 252,
        discount: 28,
        unit: "1 kg + 300 g",
        rating: 4.8,
        reviews: 11300,
        brand: "Saffola",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f59b3092-4cfe-4c01-bb45-590b98b3c0d6/Saffola-Oats-Instant-Rolled-Oats-Soft-Creamy-Oats-Power-of-Protein-Iron-Fibre.png",
        description: "Instant rolled oats with protein, iron and fibre."
    }

];







/* ============================================================
   LOCALMART
   BREAKFAST & SAUCES
   HONEY & SPREADS PRODUCTS
   ZEPTO-STYLE PRODUCT DATA
============================================================ */

const additionalHoneySpreadProducts = [

    /* --------------------------------------------------------
       1. KISSAN MIXED FRUIT JAM
    -------------------------------------------------------- */
    {
        id: "hs-001",
        name: "Kissan Mixed Fruit Jam",
        category: "Honey & Spreads",
        price: 89,
        mrp: 90,
        discount: 1,
        unit: "1 pc (200 g)",
        rating: 4.7,
        reviews: "98.3k",
        badge: "1OFF",
        brand: "Kissan",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8522e705-a615-4fa4-99c7-6ef237c532eb/Kissan-Mixed-Fruit-Jam.jpeg",
        description: "Delicious mixed fruit jam for bread, toast and breakfast."
    },

    /* --------------------------------------------------------
       2. NUTELLA 180G
    -------------------------------------------------------- */
    {
        id: "hs-002",
        name: "Nutella Hazelnut Spread With Cocoa",
        category: "Honey & Spreads",
        price: 232,
        mrp: 239,
        discount: 7,
        unit: "1 pc (180 g)",
        rating: 4.7,
        reviews: "26.2k",
        badge: "7OFF",
        brand: "Nutella",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3c46b5f4-e069-49fa-8c2d-e7ed7253f564/Nutella-Hazelnut-Spread-With-Cocoa.jpeg",
        description: "Creamy hazelnut spread with cocoa, perfect for toast and snacks."
    },

    /* --------------------------------------------------------
       3. DABUR HONEY SQUEEZY
    -------------------------------------------------------- */
    {
        id: "hs-003",
        name: "Dabur Honey Squeezy | Totally Pure | World's No.1 Honey Brand | Buy 1 Get 1 Free",
        category: "Honey & Spreads",
        price: 167,
        mrp: 249,
        discount: 82,
        unit: "2 x 225 g",
        rating: 4.7,
        reviews: "22.6k",
        badge: "82OFF",
        brand: "Dabur",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5c68bfed-e345-46ac-8044-6f96337c6f97/Dabur-Honey-Squeezy-Totally-Pure-World-s-No-1-Honey-Brand-Buy-1-Get-1-Free.png",
        description: "Pure honey in a convenient squeezy pack."
    },

    /* --------------------------------------------------------
       4. DABUR HONEY 100G
    -------------------------------------------------------- */
    {
        id: "hs-004",
        name: "Dabur Honey | Totally Pure | World's No.1 Honey Brand | No Sugar Adulteration",
        category: "Honey & Spreads",
        price: 70,
        mrp: 70,
        discount: 0,
        unit: "1 pc (100 g)",
        rating: 4.7,
        reviews: "27.6k",
        badge: "",
        brand: "Dabur",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/169d3368-141a-443a-a23c-a423dfea52a2/Dabur-Honey-Totally-Pure-World-s-No-1-Honey-Brand-No-Sugar-Adulteration.jpg",
        description: "Totally pure Dabur honey for everyday use."
    },

    /* --------------------------------------------------------
       5. HELLMANN'S EGGLESS MAYONNAISE
    -------------------------------------------------------- */
    {
        id: "hs-005",
        name: "Hellmann's Eggless Mayonnaise World's No.1 Mayonnaise Brand",
        category: "Honey & Spreads",
        price: 40,
        mrp: 40,
        discount: 0,
        unit: "1 pack (85 g)",
        rating: 4.7,
        reviews: "36.3k",
        badge: "",
        brand: "Hellmann's",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/69278821-aef9-42eb-b01f-f7bdc5722876/Hellmann-s-Eggless-Mayonnaise-World-s-No-1-Mayonnaise-Brand.jpg",
        description: "Creamy eggless mayonnaise for sandwiches, burgers and snacks."
    },

    /* --------------------------------------------------------
       6. NUTELLA 350G
    -------------------------------------------------------- */
    {
        id: "hs-006",
        name: "Nutella Hazelnut Spread With Cocoa",
        category: "Honey & Spreads",
        price: 379,
        mrp: 399,
        discount: 20,
        unit: "1 pc (350 g)",
        rating: 4.7,
        reviews: "11.8k",
        badge: "20OFF",
        brand: "Nutella",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/01725fa9-f3c5-4579-8f6e-cca752482c9c/Nutella-Hazelnut-Spread-With-Cocoa.jpeg",
        description: "Rich hazelnut and cocoa spread in a 350 g jar."
    },

    /* --------------------------------------------------------
       7. WINGREENS PREMIUM VEG MAYO
    -------------------------------------------------------- */
    {
        id: "hs-007",
        name: "Wingreens Farms Premium Veg Mayo | Veg Mayonnaise | Sandwich Spread",
        category: "Honey & Spreads",
        price: 45,
        mrp: 70,
        discount: 25,
        unit: "180 g",
        rating: 4.6,
        reviews: "16.1k",
        badge: "25OFF",
        brand: "Wingreens Farms",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/14c7d2d6-9411-499f-b116-593b84a2b62c/Wingreens-Farms-Premium-Veg-Mayo-Veg-Mayonnaise-Sandwich-Spread.jpeg",
        description: "Creamy vegetarian mayonnaise and sandwich spread."
    },

    /* --------------------------------------------------------
       8. DR. OETKER VEG MAYONNAISE
    -------------------------------------------------------- */
    {
        id: "hs-008",
        name: "Dr. Oetker Fun Foods Veg Mayonnaise Original",
        category: "Honey & Spreads",
        price: 45,
        mrp: 49,
        discount: 4,
        unit: "1 pack (100 g)",
        rating: 4.8,
        reviews: "8.9k",
        badge: "4OFF",
        brand: "Dr. Oetker",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a5c25106-c1f3-4fcd-8ee9-16ba915ea152/Dr-Oetker-Fun-Foods-Veg-Mayonnaise-Original.jpeg",
        description: "Smooth and creamy original vegetarian mayonnaise."
    },

    /* --------------------------------------------------------
       9. MAPRO MIXED FRUIT JAM
    -------------------------------------------------------- */
    {
        id: "hs-009",
        name: "Mapro Mixed Fruit Jam Tub",
        category: "Honey & Spreads",
        price: 24,
        mrp: 25,
        discount: 1,
        unit: "1 pc (90 g)",
        rating: 4.6,
        reviews: "9.1k",
        badge: "1OFF",
        brand: "Mapro",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1275-1275,pr-true,f-auto,q-40,dpr-2/cms/product_variant/b351e44f-b500-4145-91b0-714db685bfba/Mapro-Mixed-Fruit-Jam-Tub.png",
        description: "Sweet and fruity mixed fruit jam in a convenient tub."
    },

    /* --------------------------------------------------------
       10. ORGANIC INDIA HIMALAYAN HONEY
    -------------------------------------------------------- */
    {
        id: "hs-010",
        name: "A Tata Product - Organic India Himalayan Multi Floral Honey | Rich In Nutrients | Antioxidants",
        category: "Honey & Spreads",
        price: 200,
        mrp: 235,
        discount: 35,
        unit: "1 pc (250 g)",
        rating: 4.5,
        reviews: "4.8k",
        badge: "35OFF",
        brand: "Organic India",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3d8183d2-40b9-434f-bd50-98e2811854ad/A-Tata-Product-Organic-India-Himalayan-Multi-Floral-Honey-Rich-In-Nutrients-Antioxidants.jpeg",
        description: "Himalayan multi-floral honey rich in nutrients and antioxidants."
    },

    /* --------------------------------------------------------
       11. WINGREENS TANDOORI MAYO
    -------------------------------------------------------- */
    {
        id: "hs-011",
        name: "Wingreens Farms Tandoori Mayo | Veg Mayonnaise Tandoori | Sandwich Spread",
        category: "Honey & Spreads",
        price: 60,
        mrp: 70,
        discount: 10,
        unit: "1 pack (180 g)",
        rating: 4.6,
        reviews: "12.6k",
        badge: "10OFF",
        brand: "Wingreens Farms",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/90120b90-fc89-465f-9322-a2d986fc9ff0/Wingreens-Farms-Tandoori-Mayo-Veg-Mayonnaise-Tandoori-Sandwich-Spread.jpeg",
        description: "Tandoori flavoured vegetarian mayonnaise and sandwich spread."
    },

    /* --------------------------------------------------------
       12. HERSHEY'S COCOA SPREAD
    -------------------------------------------------------- */
    {
        id: "hs-012",
        name: "Hershey's Spread - Cocoa Jar",
        category: "Honey & Spreads",
        price: 158,
        mrp: 175,
        discount: 17,
        unit: "1 pc (150 g)",
        rating: 4.6,
        reviews: "4.2k",
        badge: "17OFF",
        brand: "Hershey's",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/7ff93977-849e-4f16-8edd-3cd582e84fce/Hershey-s-Spread-Cocoa-Jar.jpg",
        description: "Smooth cocoa spread for toast, bread and desserts."
    },

    /* --------------------------------------------------------
       13. VEEBA TANDOORI MAYONNAISE
    -------------------------------------------------------- */
    {
        id: "hs-013",
        name: "Veeba Tandoori Mayonnaise | Veg",
        category: "Honey & Spreads",
        price: 86,
        mrp: 105,
        discount: 19,
        unit: "1 pc (250 g)",
        rating: 4.8,
        reviews: "13.5k",
        badge: "19OFF",
        brand: "Veeba",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-4500-4500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/27d1e672-4a03-41d3-8336-5475acc50f37/Veeba-Tandoori-Mayonnaise-Veg.jpg",
        description: "Creamy vegetarian tandoori mayonnaise."
    },

    /* --------------------------------------------------------
       14. DABUR HONEY 250G
    -------------------------------------------------------- */
    {
        id: "hs-014",
        name: "Dabur Honey | Totally Pure | World's No.1 Honey Brand | No Sugar Adulteration",
        category: "Honey & Spreads",
        price: 118,
        mrp: 125,
        discount: 7,
        unit: "1 pc (250 g)",
        rating: 4.6,
        reviews: "36.2k",
        badge: "7OFF",
        brand: "Dabur",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/6bcd7d19-007e-446e-914a-03893bdab9e1/Dabur-Honey-Totally-Pure-World-s-No-1-Honey-Brand-No-Sugar-Adulteration.jpg",
        description: "Pure Dabur honey in a convenient 250 g pack."
    },

    /* --------------------------------------------------------
       15. HERSHEY'S COCOA ALMOND SPREAD
    -------------------------------------------------------- */
    {
        id: "hs-015",
        name: "Hershey's Spread - Cocoa With Almond Jar",
        category: "Honey & Spreads",
        price: 158,
        mrp: 175,
        discount: 17,
        unit: "1 pc (150 g)",
        rating: 4.5,
        reviews: "5.2k",
        badge: "17OFF",
        brand: "Hershey's",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4a468c3e-1343-4ca7-a0fc-496da64e38ad/Hershey-s-Spread-Cocoa-With-Almond-Jar.jpg",
        description: "Cocoa spread blended with delicious almond flavour."
    },

    /* --------------------------------------------------------
       16. LITTLE JOYS CHOCOLATE SPREAD
    -------------------------------------------------------- */
    {
        id: "hs-016",
        name: "Little Joys Chocolate Spread | Sweetened With Jaggery | Rich Hazelnut | Cocoa",
        category: "Honey & Spreads",
        price: 499,
        mrp: 499,
        discount: 0,
        unit: "1 pc (300 g)",
        rating: 4.5,
        reviews: 260,
        badge: "",
        brand: "Little Joys",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f31b36d2-3995-456b-bd08-252b2871139d/Little-Joys-Chocolate-Spread-Sweetened-With-Jaggery-Rich-Hazelnut-Cocoa.png",
        description: "Rich hazelnut and cocoa chocolate spread sweetened with jaggery."
    },

    /* --------------------------------------------------------
       17. BEANLY CHOCO HAZELNUT SPREAD
    -------------------------------------------------------- */
    {
        id: "hs-017",
        name: "Beanly Choco Hazelnut Spread With Breadsticks",
        category: "Honey & Spreads",
        price: 99,
        mrp: 133,
        discount: 34,
        unit: "1 pack (52 g)",
        rating: 4.3,
        reviews: 416,
        badge: "34OFF",
        brand: "Beanly",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/62e6e0dc-834f-4c66-b997-9368a94fce18/Beanly-Choco-Hazelnut-Spread-With-Breadsticks.png",
        description: "Choco hazelnut spread served with crunchy breadsticks."
    },

    /* --------------------------------------------------------
       18. HELLMANN'S SMOKY TANDOORI MAYO
    -------------------------------------------------------- */
    {
        id: "hs-018",
        name: "Hellmann's Smoky Tandoori Mayo",
        category: "Honey & Spreads",
        price: 42,
        mrp: 50,
        discount: 8,
        unit: "1 pack (85 g)",
        rating: 4.6,
        reviews: "7.3k",
        badge: "8OFF",
        brand: "Hellmann's",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4ff548f3-9db7-4689-809e-9b9d426f329e/Hellmann-s-Smoky-Tandoori-Mayo.jpg",
        description: "Creamy smoky tandoori mayonnaise for sandwiches and snacks."
    },



// ============================================================
// PEANUT BUTTER
// ============================================================

{
    id: "pb-001",
    name: "MyFitness 26g High Protein Chocolate Peanut Butter Spread - Crunchy",
    category: "Peanut Butter",
    price: 281,
    mrp: 319,
    discount: 38,
    unit: "1 pc (510 g)",
    rating: 4.6,
    reviews: "26.1k",
    badge: "38OFF",
    brand: "MyFitness",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2250-2250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/74f6d346-8bd8-4d57-b2c2-a65dbd9cee84/MyFitness-26g-High-Protein-Chocolate-Peanut-Butter-Spread-Crunchy.jpeg",
    description: "High protein chocolate peanut butter spread with a crunchy texture."
},

{
    id: "pb-002",
    name: "Pintola All Natural Peanut Butter - Crunchy",
    category: "Peanut Butter",
    price: 156,
    mrp: 170,
    discount: 14,
    unit: "1 pc (350 g)",
    rating: 4.4,
    reviews: "14.8k",
    badge: "14OFF",
    brand: "Pintola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e882db65-295a-45c4-ba7c-26483e86a1f3/Pintola-All-Natural-Peanut-Butter-Crunchy.jpg",
    description: "All natural crunchy peanut butter made with roasted peanuts."
},

{
    id: "pb-003",
    name: "Sundrop Peanut Butter with Honey | Crunchy | 23% Protein | Premium Roasted Peanuts | No Preservatives",
    category: "Peanut Butter",
    price: 95,
    mrp: 99,
    discount: 4,
    unit: "1 pc (300 g)",
    rating: 4.6,
    reviews: "31.3k",
    badge: "4OFF",
    brand: "Sundrop",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4c32bfdc-f5fe-4d00-9ef1-39e592e62d0c/Sundrop-Peanut-Butter-with-Honey-Crunchy-23-Protein-Premium-Roasted-Peanuts-No-Preservatives.jpeg",
    description: "Crunchy peanut butter with honey and roasted peanuts."
},

{
    id: "pb-004",
    name: "Disano Chocolate Peanut Butter Creamy",
    category: "Peanut Butter",
    price: 100,
    mrp: 250,
    discount: 150,
    unit: "1 pc (350 g)",
    rating: 4.5,
    reviews: "3.4k",
    badge: "150OFF",
    brand: "Disano",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/e7ca0374-b7ee-46c9-92f0-02af122cab65/Disano-Chocolate-Peanut-Butter-Creamy.jpg",
    description: "Creamy chocolate peanut butter spread."
},

{
    id: "pb-005",
    name: "Pintola Dark Chocolate Creamy Peanut Butter",
    category: "Peanut Butter",
    price: 168,
    mrp: 180,
    discount: 12,
    unit: "1 pc (350 g)",
    rating: 4.6,
    reviews: "14.1k",
    badge: "12OFF",
    brand: "Pintola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ae9d6375-bf72-41c8-9246-fce038cd8a28/Pintola-Dark-Chocolate-Creamy-Peanut-Butter.png",
    description: "Creamy peanut butter with rich dark chocolate flavour."
},

{
    id: "pb-006",
    name: "MyFitness All Natural Peanut Butter Crunchy Spread | No Sugar, High Protein",
    category: "Peanut Butter",
    price: 281,
    mrp: 319,
    discount: 38,
    unit: "1 pack (510 g)",
    rating: 4.4,
    reviews: "3.4k",
    badge: "38OFF",
    brand: "MyFitness",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2250-2250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8fa1f472-8d8c-47f2-b7ea-afdf10331929/MyFitness-All-Natural-Peanut-Butter-Crunchy-Spread-No-Sugar-High-Protein.jpeg",
    description: "Natural crunchy peanut butter with no added sugar and high protein."
},

{
    id: "pb-007",
    name: "Pintola All Natural Peanut Butter Crunchy",
    category: "Peanut Butter",
    price: 388,
    mrp: 430,
    discount: 42,
    unit: "1 pc (1 kg)",
    rating: 4.4,
    reviews: "7.0k",
    badge: "42OFF",
    brand: "Pintola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/47de5eac-f850-4d90-b84e-570d56fe2d96/Pintola-All-Natural-Peanut-Butter-Crunchy.png",
    description: "Large 1 kg pack of natural crunchy peanut butter."
},

{
    id: "pb-008",
    name: "MyFitness Chocolate Peanut Butter Crunchy Spread | High Protein",
    category: "Peanut Butter",
    price: 148,
    mrp: 159,
    discount: 11,
    unit: "1 pc (210 g or 227 g)",
    rating: 4.6,
    reviews: "10.5k",
    badge: "11OFF",
    brand: "MyFitness",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d8b9e307-ad09-4382-a2b0-c11494f10c57/MyFitness-Chocolate-Peanut-Butter-Crunchy-Spread-High-Protein.jpg",
    description: "Crunchy chocolate peanut butter spread with high protein."
},

{
    id: "pb-009",
    name: "MyFitness 28g High Protein Chocolate Peanut Butter Spread - Smooth",
    category: "Peanut Butter",
    price: 281,
    mrp: 319,
    discount: 38,
    unit: "1 pc (510 g)",
    rating: 4.6,
    reviews: "4.0k",
    badge: "38OFF",
    brand: "MyFitness",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2250-2250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/09c21612-d865-4354-8a28-8b3107b886c9/MyFitness-28g-High-Protein-Chocolate-Peanut-Butter-Spread-Smooth.jpeg",
    description: "Smooth chocolate peanut butter spread with high protein."
},

{
    id: "pb-010",
    name: "Pintola Dark Chocolate Crunchy Peanut Butter",
    category: "Peanut Butter",
    price: 169,
    mrp: 180,
    discount: 11,
    unit: "1 pc (350 g)",
    rating: 4.5,
    reviews: "3.0k",
    badge: "11OFF",
    brand: "Pintola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/76b2fb42-9b88-4238-8228-97d62fcf0a09/Pintola-Dark-Chocolate-Crunchy-Peanut-Butter.png",
    description: "Crunchy peanut butter blended with dark chocolate."
},

{
    id: "pb-011",
    name: "Disano Chocolate Peanut Butter Crunchy",
    category: "Peanut Butter",
    price: 275,
    mrp: 550,
    discount: 275,
    unit: "1 pc (924 g)",
    rating: 4.6,
    reviews: "3.4k",
    badge: "275OFF",
    brand: "Disano",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/458cb1bb-dd26-4222-a7df-6c0d8f58f9e7/Disano-Chocolate-Peanut-Butter-Crunchy.jpg",
    description: "Crunchy chocolate peanut butter in a large value pack."
},

{
    id: "pb-012",
    name: "DiSano Natural Peanut Butter - Crunchy, Unsweetened, 28.3% Protein, No Added Sugar, Peanut",
    category: "Peanut Butter",
    price: 249,
    mrp: 500,
    discount: 251,
    unit: "1 pc (1 kg)",
    rating: 4.5,
    reviews: "2.1k",
    badge: "251OFF",
    brand: "Disano",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3c29d943-146d-4889-8873-273ddd24455d/DiSano-Natural-Peanut-Butter-Crunchy-Unsweetened-28-3-Protein-No-Added-Sugar-Peanut.jpg",
    description: "Natural unsweetened crunchy peanut butter with 28.3% protein."
},

{
    id: "pb-013",
    name: "MuscleBlaze Chocolate Peanut Butter (Crunchy)",
    category: "Peanut Butter",
    price: 429,
    mrp: 529,
    discount: 100,
    unit: "1 pc (1 kg)",
    rating: 4.6,
    reviews: "1.7k",
    badge: "100OFF",
    brand: "MuscleBlaze",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9376426e-5acf-49c8-bb67-382fbe41908a/MuscleBlaze-Chocolate-Peanut-Butter-Crunchy-.jpeg",
    description: "Crunchy chocolate peanut butter in a 1 kg pack."
},

{
    id: "pb-014",
    name: "Pintola All Natural Peanut Butter Creamy",
    category: "Peanut Butter",
    price: 389,
    mrp: 430,
    discount: 41,
    unit: "1 pc (1 kg)",
    rating: 4.5,
    reviews: "2.7k",
    badge: "41OFF",
    brand: "Pintola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/af9ddf04-9133-404e-8aaa-a57f3f70e485/Pintola-All-Natural-Peanut-Butter-Creamy.jpg",
    description: "Creamy all-natural peanut butter made from roasted peanuts."
},

{
    id: "pb-015",
    name: "Pintola Crunchy High Protein Peanut Butter Dark Chocolate",
    category: "Peanut Butter",
    price: 611,
    mrp: 699,
    discount: 88,
    unit: "1 pc (1 kg)",
    rating: 4.4,
    reviews: "1.4k",
    badge: "88OFF",
    brand: "Pintola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/99c82fbf-e20b-4727-8f00-a51dc8feb7ec/Pintola-Crunchy-High-Protein-Peanut-Butter-Dark-Chocolate.jpg",
    description: "High protein crunchy peanut butter with dark chocolate."
},

{
    id: "pb-016",
    name: "MyFitness Chocolate Peanut Butter Crispy Spread | High Protein",
    category: "Peanut Butter",
    price: 278,
    mrp: 319,
    discount: 41,
    unit: "1 pc (510 g)",
    rating: 4.6,
    reviews: "4.0k",
    badge: "41OFF",
    brand: "MyFitness",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2250-2250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/8eb8d2de-d70f-4a87-a45f-2dc6082bdc24/MyFitness-Chocolate-Peanut-Butter-Crispy-Spread-High-Protein.jpeg",
    description: "Crispy chocolate peanut butter spread with high protein."
},

{
    id: "pb-017",
    name: "Alpino Natural Peanut Butter Crunch (Unsweetened)",
    category: "Peanut Butter",
    price: 365,
    mrp: 419,
    discount: 54,
    unit: "1 pc (1 kg)",
    rating: 4.6,
    reviews: "651",
    badge: "54OFF",
    brand: "Alpino",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1700-1700,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0dcf1668-1b0e-4631-bdc7-3a8507bea4b1/Alpino-Natural-Peanut-Butter-Crunch-Unsweetened-.png",
    description: "Natural unsweetened crunchy peanut butter."
},

{
    id: "pb-018",
    name: "Sundrop Peanut Butter | Crunchy | With 26% Protein | Premium Roasted Peanuts | No Preservatives",
    category: "Peanut Butter",
    price: 138,
    mrp: 149,
    discount: 11,
    unit: "1 pc (462 g)",
    rating: 4.6,
    reviews: "6.9k",
    badge: "11OFF",
    brand: "Sundrop",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a844813c-9b43-41ed-86e3-d0c63b2fe17e/Sundrop-Peanut-Butter-Crunchy-With-26-Protein-Premium-Roasted-Peanuts-No-Preservatives.jpeg",
    description: "Crunchy peanut butter with 26% protein and roasted peanuts."
},

{
    id: "pb-019",
    name: "Pintola High Protein Dark Chocolate Peanut Butter - Creamy",
    category: "Peanut Butter",
    price: 349,
    mrp: 375,
    discount: 26,
    unit: "1 pc (510 g)",
    rating: 4.5,
    reviews: "2.7k",
    badge: "26OFF",
    brand: "Pintola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/df149ec9-d54a-4027-b015-fa7d8f1b06bb/Pintola-High-Protein-Dark-Chocolate-Peanut-Butter-Creamy.jpg",
    description: "Creamy high protein dark chocolate peanut butter."
},

{
    id: "pb-020",
    name: "MyFitness 26g High Protein Chocolate Peanut Butter Spread - Crunchy",
    category: "Peanut Butter",
    price: 522,
    mrp: 669,
    discount: 147,
    unit: "1 pc (1.2 kg)",
    rating: 4.6,
    reviews: "4.5k",
    badge: "147OFF",
    brand: "MyFitness",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1080-1080,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cefb3d83-8e96-4ac6-8395-75e0c2c1206e/MyFitness-26g-High-Protein-Chocolate-Peanut-Butter-Spread-Crunchy.jpg",
    description: "Large 1.2 kg pack of high protein crunchy chocolate peanut butter."
},

{
    id: "pb-021",
    name: "Pintola High Protein All Natural Peanut Butter Unsweetened 37% Protein (Crunchy)",
    category: "Peanut Butter",
    price: 615,
    mrp: 749,
    discount: 134,
    unit: "1 pc (1 kg)",
    rating: 3.7,
    reviews: "97",
    badge: "134OFF",
    brand: "Pintola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5883df0e-6ad4-4afa-b9d6-23243e8bccc0/Pintola-High-Protein-All-Natural-Peanut-Butter-Unsweetened-37-Protein-Crunchy-.jpg",
    description: "High protein natural unsweetened crunchy peanut butter."
},

{
    id: "pb-022",
    name: "Pintola Dark Chocolate Creamy Peanut Butter",
    category: "Peanut Butter",
    price: 443,
    mrp: 475,
    discount: 32,
    unit: "1 pc (1 kg)",
    rating: 4.3,
    reviews: "250",
    badge: "32OFF",
    brand: "Pintola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1150-1150,pr-true,f-auto,q-40,dpr-2/cms/product_variant/12bd390a-d8c0-4693-b16c-642a3480a96e/Pintola-Dark-Chocolate-Creamy-Peanut-Butter.jpg",
    description: "Creamy dark chocolate peanut butter in a 1 kg pack."
},

{
    id: "pb-023",
    name: "Saffola Peanut Butter with Jaggery, Crunchy",
    category: "Peanut Butter",
    price: 119,
    mrp: 140,
    discount: 21,
    unit: "1 pc (350 g)",
    rating: 4.7,
    reviews: "6.8k",
    badge: "21OFF",
    brand: "Saffola",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/17a085b8-c324-4837-8805-a2b24daf9d75/Saffola-Peanut-Butter-with-Jaggery-Crunchy.jpeg",
    description: "Crunchy peanut butter blended with jaggery."
},

{
    id: "pb-024",
    name: "Disano Peanut Butter - Crunchy, 26% Protein, No Trans Fat & Preservatives",
    category: "Peanut Butter",
    price: 200,
    mrp: 450,
    discount: 250,
    unit: "1 pc (924 g)",
    rating: 4.7,
    reviews: "5.9k",
    badge: "250OFF",
    brand: "Disano",
    image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ac6bf0e1-33e4-468c-8bb6-1d47075c213b/Disano-Peanut-Butter-Crunchy-26-Protein-No-Trans-Fat-Preservatives.jpg",
    description: "Crunchy peanut butter with 26% protein and no trans fat."
}


];



/* ============================================================
   LOCALMART
   BATTER & MIXES PRODUCTS
   ZEPTO-STYLE PRODUCT DATA
============================================================ */

const batterMixesProducts = [

    // 1. iD Fresh Idli & Dosa Batter - 1kg
    {
        id: "bm-001",
        name: "iD Fresh Idli & Dosa Batter",
        category: "Batter & Mixes",
        price: 99,
        mrp: 99,
        discount: 0,
        unit: "1 pack (1 kg)",
        rating: 4.5,
        reviews: "130.5k",
        badge: "",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/57253b4d-1964-4b01-8c26-87ada955acd3/iD-Fresh-Idli-Dosa-Batter.jpg",
        description: "Fresh Idli & Dosa Batter"
    },

    // 2. iD Fresh Idli & Dosa Batter - 2kg
    {
        id: "bm-002",
        name: "iD Fresh Idli & Dosa Batter",
        category: "Batter & Mixes",
        price: 139,
        mrp: 172,
        discount: 33,
        unit: "1 pack (2 kg)",
        rating: 4.5,
        reviews: "90.2k",
        badge: "33OFF",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f22b6577-1dc5-4bdf-a1af-417d6a5cc417/iD-Fresh-Idli-Dosa-Batter.jpg",
        description: "Fresh Idli & Dosa Batter"
    },

    // 3. Daily Good Idly & Dosa Batter - 1kg
    {
        id: "bm-003",
        name: "Daily Good Idly & Dosa Batter",
        category: "Batter & Mixes",
        price: 65,
        mrp: 80,
        discount: 15,
        unit: "1 pack (1 kg)",
        rating: 4.5,
        reviews: "54.9k",
        badge: "15OFF",
        brand: "Daily Good",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1592,pr-true,f-auto,q-40,dpr-2/cms/product_variant/efbad9d5-e79b-484a-9c19-4654343f2c96/Daily-Good-Idly-Dosa-Batter.jpeg",
        description: "Idly & Dosa Batter"
    },

    // 4. Khetika Fresh Idli Dosa Batter - 1kg
    {
        id: "bm-004",
        name: "Khetika Fresh Idli Dosa Batter",
        category: "Batter & Mixes",
        price: 59,
        mrp: 89,
        discount: 30,
        unit: "1 pack (1 kg)",
        rating: 4.2,
        reviews: "50.7k",
        badge: "30OFF",
        brand: "Khetika",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/3a9c615f-9678-48cc-9c4c-bafdaed68011/Khetika-Fresh-Idli-Dosa-Batter.png",
        description: "Fresh Idli Dosa Batter"
    },

    // 5. iD Fresh Idli & Dosa Batter - 500g
    {
        id: "bm-005",
        name: "iD Fresh Idli & Dosa Batter",
        category: "Batter & Mixes",
        price: 67,
        mrp: 68,
        discount: 1,
        unit: "1 pack (500 g)",
        rating: 4.8,
        reviews: "61.7k",
        badge: "1OFF",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/d878b438-e975-410d-85ba-6f0a524efc10/iD-Fresh-Idli-Dosa-Batter.jpg",
        description: "Fresh Idli & Dosa Batter"
    },

    // 6. Daily Good Idly & Dosa Batter - 500g
    {
        id: "bm-006",
        name: "Daily Good Idly And Dosa Batter",
        category: "Batter & Mixes",
        price: 40,
        mrp: 50,
        discount: 10,
        unit: "1 pack (500 g)",
        rating: 4.3,
        reviews: "9.8k",
        badge: "10OFF",
        brand: "Daily Good",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2250-2250,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0d914c97-b2c1-44b4-89ad-5381a140d3df/Daily-Good-Idly-And-Dosa-Batter.jpeg",
        description: "Idly & Dosa Batter"
    },

    // 7. Khetika Ragi Idli Dosa Millet Batter - 500g
    {
        id: "bm-007",
        name: "Khetika Ragi Idli Dosa Millet Batter",
        category: "Batter & Mixes",
        price: 42,
        mrp: 79,
        discount: 37,
        unit: "1 pack (500 g)",
        rating: 4.2,
        reviews: "6.9k",
        badge: "37OFF",
        brand: "Khetika",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f96864c4-8da9-46af-81ce-474cd42f6707/Khetika-Ragi-Idli-Dosa-Millet-Batter.png",
        description: "Ragi Idli Dosa Millet Batter"
    },

    // 8. MTR Minute Fresh Dosa Batter - 850g
    {
        id: "bm-008",
        name: "MTR Minute Fresh Dosa Batter",
        category: "Batter & Mixes",
        price: 91,
        mrp: 105,
        discount: 14,
        unit: "1 pack (850 g)",
        rating: 4.5,
        reviews: "6.1k",
        badge: "14OFF",
        brand: "MTR",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/efd80ff0-b7fb-4fe5-8d88-82596d04991d/MTR-Minute-Fresh-Dosa-Batter.jpeg",
        description: "Fresh Dosa Batter"
    },

    // 9. Nandini Idli Dosa Batter - 900g
    {
        id: "bm-009",
        name: "Nandini Idli Dosa Batter",
        category: "Batter & Mixes",
        price: 80,
        mrp: 80,
        discount: 0,
        unit: "1 pack (900 g)",
        rating: 4.3,
        reviews: "2.9k",
        badge: "",
        brand: "Nandini",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0645a9cf-318f-4106-961a-0d5a72cb60c1/Nandini-Idli-Dosa-batter.jpeg",
        description: "Idli Dosa Batter"
    },

    // 10. MTR Minute Fresh Idli Batter - 750g
    {
        id: "bm-010",
        name: "MTR Minute Fresh Idli Batter",
        category: "Batter & Mixes",
        price: 96,
        mrp: 105,
        discount: 9,
        unit: "1 pack (750 g)",
        rating: 4.8,
        reviews: "1.9k",
        badge: "9OFF",
        brand: "MTR",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1021-1021,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1f6551a4-f684-4901-86b9-7487f45f27e1/MTR-Minute-Fresh-Idli-Batter.jpeg",
        description: "Fresh Idli Batter"
    },

    // 11. MTR Minute Fresh Red Rice Dosa Batter - 850g
    {
        id: "bm-011",
        name: "MTR Minute Fresh Red Rice Dosa Batter",
        category: "Batter & Mixes",
        price: 105,
        mrp: 120,
        discount: 15,
        unit: "1 pack (850 g)",
        rating: 4.5,
        reviews: "1.5k",
        badge: "15OFF",
        brand: "MTR",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2400-2400,pr-true,f-auto,q-40,dpr-2/cms/product_variant/30552688-3a24-49f8-9995-4bd3887b1912/MTR-Minute-Fresh-Red-Rice-Dosa-Batter.jpeg",
        description: "Red Rice Dosa Batter"
    },

    // 12. Rishta Multi Grain Idli Dosa Batter - 800g
    {
        id: "bm-012",
        name: "Rishta Multi Grain Idli Dosa Batter",
        category: "Batter & Mixes",
        price: 120,
        mrp: 120,
        discount: 0,
        unit: "1 pack (800 g)",
        rating: 4.4,
        reviews: "1.9k",
        badge: "",
        brand: "Rishta",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1500-1500,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c85f7e06-5acf-4a37-a130-e227bda7e4eb/Rishta-Multi-Grain-Idli-Dosa-Batter.jpeg",
        description: "Multi Grain Idli Dosa Batter"
    },

    // 13. Asal Batter - 1kg
    {
        id: "bm-013",
        name: "Asal Batter",
        category: "Batter & Mixes",
        price: 79,
        mrp: 95,
        discount: 16,
        unit: "1 pack (1 kg)",
        rating: 4.4,
        reviews: "24.1k",
        badge: "16OFF",
        brand: "Asal",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2048-1150,pr-true,f-auto,q-40,dpr-2/cms/product_variant/503e9ca9-bc75-42ba-bfd9-993fc996c0e6/Asal-Batter.png",
        description: "Fresh Batter"
    },

    // 14. iD Fresh Protein Idly Dosa Batter - 1kg
    {
        id: "bm-014",
        name: "iD Fresh Protein Idly Dosa Batter",
        category: "Batter & Mixes",
        price: 112,
        mrp: 150,
        discount: 38,
        unit: "1 pack (1 kg)",
        rating: 3.5,
        reviews: "577",
        badge: "38OFF",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1435-1435,pr-true,f-auto,q-40,dpr-2/cms/product_variant/aa2b027e-8f80-442a-a986-13ce970c8b33/iD-Fresh-Protein-Idly-Dosa-Batter.jpg",
        description: "Protein Idly Dosa Batter"
    },

    // 15. Nandini Idli Dosa Batter - 450g
    {
        id: "bm-015",
        name: "Nandini Idli Dosa Batter",
        category: "Batter & Mixes",
        price: 40,
        mrp: 40,
        discount: 0,
        unit: "1 pack (450 g)",
        rating: 4.5,
        reviews: "4.2k",
        badge: "",
        brand: "Nandini",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1684-1684,pr-true,f-auto,q-40,dpr-2/cms/product_variant/0c1a6c76-884d-4abb-976f-8e4165effa7a/Nandini-Idli-Dosa-batter.png",
        description: "Idli Dosa Batter"
    },

    // 16. iD Fresh Mallige Idli Batter - 500g
    {
        id: "bm-016",
        name: "iD Fresh Mallige Idli Batter",
        category: "Batter & Mixes",
        price: 69,
        mrp: 69,
        discount: 0,
        unit: "1 pack (500 g)",
        rating: 4.0,
        reviews: "746",
        badge: "",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/073a7d61-f244-43ce-a391-859c5411b3c7/iD-Fresh-Mallige-Idli-Batter.jpeg",
        description: "Mallige Idli Batter"
    },

    // 17. iD Fresh Protein-Rich Idly & Dosa Batter - 500g
    {
        id: "bm-017",
        name: "iD Fresh Protein-Rich | 75g Protein | Idly & Dosa Batter",
        category: "Batter & Mixes",
        price: 95,
        mrp: 95,
        discount: 0,
        unit: "1 pack (500 g)",
        rating: 4.1,
        reviews: "4.9k",
        badge: "",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/84375139-f5b3-430c-99ad-28fd759695f4/iD-Fresh-Protein-Rich-75g-Protein-Idly-Dosa-Batter.jpg",
        description: "Protein-Rich Idly & Dosa Batter"
    },

    // 18. iD Fresh High Fibre Brown Rice & Oats Batter - 500g
    {
        id: "bm-018",
        name: "iD Fresh High Fibre Brown Rice & Oats Batter",
        category: "Batter & Mixes",
        price: 90,
        mrp: 90,
        discount: 0,
        unit: "1 pack (500 g)",
        rating: 3.9,
        reviews: "290",
        badge: "",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/f89d21c1-96db-46d9-b143-976a5470d109/iD-Fresh-High-Fibre-Brown-Rice-Oats-Batter.jpg",
        description: "High Fibre Brown Rice & Oats Batter"
    },

    // 19. iD Fresh Multigrain Idly & Dosa Batter - 500g
    {
        id: "bm-019",
        name: "iD Fresh Multigrain Idly & Dosa Batter",
        category: "Batter & Mixes",
        price: 86,
        mrp: 100,
        discount: 14,
        unit: "1 pack (500 g)",
        rating: 4.1,
        reviews: "2.2k",
        badge: "14OFF",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/c809912c-61bb-4665-afcb-d0b52994bc97/iD-Fresh-Multigrain-Idly-Dosa-Batter.jpg",
        description: "Multigrain Idly & Dosa Batter"
    },

    // 20. MTR Fresh Dosa Batter 6 Dosa Pack - 425g
    {
        id: "bm-020",
        name: "MTR Fresh Dosa Batter 6 Dosa Pack",
        category: "Batter & Mixes",
        price: 63,
        mrp: 70,
        discount: 7,
        unit: "1 pc (425 g)",
        rating: 4.1,
        reviews: "21",
        badge: "7OFF",
        brand: "MTR",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1600-1600,pr-true,f-auto,q-40,dpr-2/cms/product_variant/adf25a4b-6cf5-41d2-b643-958afd9ed9b6/MTR-Fresh-Dosa-Batter-6-Dosa-Pack.jpg",
        description: "Fresh Dosa Batter 6 Dosa Pack"
    },

    // 21. Khetika Ragi Idli Dosa Millet Batter - 1kg
    {
        id: "bm-021",
        name: "Khetika Ragi Idli Dosa Millet Batter",
        category: "Batter & Mixes",
        price: 92,
        mrp: 125,
        discount: 33,
        unit: "1 pack (1 kg)",
        rating: 4.6,
        reviews: "3.1k",
        badge: "33OFF",
        brand: "Khetika",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/cedce550-8988-46f4-a31c-9166d220565a/Khetika-Ragi-Idli-Dosa-Millet-Batter.png",
        description: "Ragi Idli Dosa Millet Batter"
    },

    // 22. iD Moong Chilla Batter - 500g
    {
        id: "bm-022",
        name: "iD Moong Chilla Batter",
        category: "Batter & Mixes",
        price: 64,
        mrp: 79,
        discount: 15,
        unit: "1 pack (500 g)",
        rating: 3.9,
        reviews: "599",
        badge: "15OFF",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2050-2050,pr-true,f-auto,q-40,dpr-2/cms/product_variant/a03eacb8-81e3-42fe-b2a2-df3cc362d476/iD-Moong-Chilla-Batter.png",
        description: "Moong Chilla Batter"
    },

    // 23. iD Fresh Organic Batter - 500g
    {
        id: "bm-023",
        name: "iD Fresh Organic Batter",
        category: "Batter & Mixes",
        price: 70,
        mrp: 85,
        discount: 15,
        unit: "1 pack (500 g)",
        rating: 4.2,
        reviews: "323",
        badge: "15OFF",
        brand: "iD Fresh",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1284-1284,pr-true,f-auto,q-40,dpr-2/cms/product_variant/00434148-a0ce-4824-9359-c0ce16aa2133/iD-Fresh-Organic-Batter.png",
        description: "Organic Fresh Batter"
    },

    // 24. MTR Minute Fresh Dosa Batter - 1.5kg
    {
        id: "bm-024",
        name: "MTR Minute Fresh Dosa Batter",
        category: "Batter & Mixes",
        price: 140,
        mrp: 170,
        discount: 30,
        unit: "1.5 kg",
        rating: 4.6,
        reviews: "178",
        badge: "30OFF",
        brand: "MTR",
        image: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-2000-2000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/5d28dc5a-bb06-43c5-9272-d20803007e70/MTR-Minute-Fresh-Dosa-Batter.jpeg",
        description: "Fresh Dosa Batter"
    }
];




 breakfastSaucesProducts.push(...batterMixesProducts);


// ============================================================
// CATEGORY FILTER
// ============================================================

function getBatterMixesProducts() {
    return batterMixesProducts.filter(
        product => product.category === "Batter & Mixes"
    );
}



/* ============================================================
   ADD THESE PRODUCTS TO YOUR MAIN PRODUCT ARRAY
============================================================ */

/*
   If your existing file already has:

   const breakfastSaucesProducts = [
       ...
   ];

   then add the products above into that array.

   OR, if breakfastSaucesProducts is already declared,
   use this:
*/

breakfastSaucesProducts.push(...additionalHoneySpreadProducts);


/* ============================================================
   UPDATE MUESLI / HONEY / PEANUT BUTTER COUNTS
============================================================ */

const honeySpreadProducts =
    breakfastSaucesProducts.filter(
        product => product.category === "Honey & Spreads"
    );

console.log(
    `Honey & Spreads products: ${honeySpreadProducts.length}`
);


/* ============================================================
   OPTIONAL: MAKE THEM AVAILABLE GLOBALLY
============================================================ */

window.additionalHoneySpreadProducts = additionalHoneySpreadProducts;

window.honeySpreadProducts = honeySpreadProducts;

window.breakfastSaucesProducts = breakfastSaucesProducts;
window.groceryProducts = breakfastSaucesProducts;









/* ============================================================
   MUESLI & OATS CATEGORY DATA
   ============================================================ */

const muesliOatsProducts =
    breakfastSaucesProducts.filter(
        product =>
            product.category === "Muesli & Oats"
    );


function getMuesliOatsProducts() {

    return muesliOatsProducts.filter(
        product =>
            product.category === "Muesli & Oats"
    );

}


/* ============================================================
   LOCALMART COMPATIBILITY
   ============================================================ */

const groceryProducts =
    breakfastSaucesProducts;


/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

function formatBreakfastPrice(price) {

    const numericPrice =
        Number(price) || 0;

    return `₹${numericPrice.toLocaleString("en-IN")}`;
}


function getBreakfastDiscount(product) {

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
   REVIEW COUNT FORMATTER
   ============================================================ */

function formatReviewCount(count) {

    if (
        count === null ||
        count === undefined ||
        count === ""
    ) {
        return "0";
    }


    if (typeof count === "string") {

        const value =
            count.trim();

        if (
            value !== "" &&
            isNaN(value)
        ) {
            return value;
        }
    }


    const numericCount =
        Number(count);


    if (isNaN(numericCount)) {
        return String(count);
    }


    if (numericCount >= 100000) {

        return (
            (numericCount / 100000)
                .toFixed(1)
                .replace(".0", "") +
            "L"
        );
    }


    if (numericCount >= 1000) {

        return (
            (numericCount / 1000)
                .toFixed(1)
                .replace(".0", "") +
            "k"
        );
    }


    return numericCount.toString();
}


/* ============================================================
   IMAGE ERROR HANDLER
   ============================================================ */

function handleBreakfastImageError(img) {

    if (!img) {
        return;
    }


    if (
        img.dataset.fallbackUsed ===
        "true"
    ) {
        return;
    }


    img.dataset.fallbackUsed =
        "true";


    img.src =
        "data:image/svg+xml;charset=UTF-8," +
        `<svg xmlns="http://www.w3.org/2000/svg"
              width="500"
              height="500"
              viewBox="0 0 500 500">

            <rect
                width="500"
                height="500"
                fill="#f7f7f7"
            />

            <rect
                x="70"
                y="70"
                width="360"
                height="360"
                rx="20"
                fill="#ffffff"
                stroke="#eeeeee"
            />

            <text
                x="250"
                y="245"
                text-anchor="middle"
                font-family="Arial,sans-serif"
                font-size="34"
                font-weight="700"
                fill="#555"
            >
                LocalMart
            </text>

            <text
                x="250"
                y="285"
                text-anchor="middle"
                font-family="Arial,sans-serif"
                font-size="20"
                fill="#999"
            >
                Product Image
            </text>

        </svg>`;


    img.alt =
        "LocalMart product image";
}


/* ============================================================
   CART
   ============================================================ */

let breakfastCart = [];


try {

    breakfastCart =
        JSON.parse(
            localStorage.getItem(
                "localmartGroceryCart"
            ) || localStorage.getItem(
                "breakfastCart"
            )
        ) || [];


    if (
        !Array.isArray(
            breakfastCart
        )
    ) {
        breakfastCart = [];
    }

} catch (error) {

    console.warn(
        "Unable to read breakfastCart from localStorage.",
        error
    );

    breakfastCart = [];
}


/* ============================================================
   WISHLIST
   ============================================================ */

let breakfastWishlist = [];


try {

    breakfastWishlist =
        JSON.parse(
            localStorage.getItem(
                "localmartGroceryWishlist"
            ) || localStorage.getItem(
                "breakfastWishlist"
            )
        ) || [];


    if (
        !Array.isArray(
            breakfastWishlist
        )
    ) {
        breakfastWishlist = [];
    }

    breakfastWishlist = breakfastWishlist.map(item => {
        if (item && typeof item === "object") return item;
        return breakfastSaucesProducts.find(product => String(product.id) === String(item)) || {
            id: item, name: "Saved grocery product", category: "Grocery",
            price: 0, mrp: 0, image: "", quantity: 1
        };
    });
    localStorage.setItem("localmartGroceryWishlist", JSON.stringify(breakfastWishlist));
    localStorage.removeItem("breakfastWishlist");

} catch (error) {

    console.warn(
        "Unable to read breakfastWishlist from localStorage.",
        error
    );

    breakfastWishlist = [];
}


/* ============================================================
   ADD TO CART
   ============================================================ */

function addBreakfastToCart(productId) {

    const product =
        breakfastSaucesProducts.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {

        console.error(
            "LocalMart: Product not found:",
            productId
        );

        return;
    }


    const existingItem =
        breakfastCart.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (existingItem) {

        existingItem.quantity =
            Number(
                existingItem.quantity || 0
            ) + 1;

    } else {

        breakfastCart.push({

            ...product,

            quantity: 1

        });

    }


    localStorage.setItem(
        "localmartGroceryCart",
        JSON.stringify(
            breakfastCart
        )
    );


    updateBreakfastCartCount();


    refreshBreakfastProducts();


    if (
        typeof window.renderBreakfastCart ===
        "function"
    ) {

        window.renderBreakfastCart();

    }


    if (
        typeof window.updateCartCount ===
        "function"
    ) {

        window.updateCartCount();

    }


    showBreakfastToast(
        `${product.name} added to cart`
    );
}


/* ============================================================
   REMOVE FROM CART
   ============================================================ */

function removeBreakfastFromCart(productId) {

    breakfastCart =
        breakfastCart.filter(
            item =>
                String(item.id) !==
                String(productId)
        );


    localStorage.setItem(
        "localmartGroceryCart",
        JSON.stringify(
            breakfastCart
        )
    );


    updateBreakfastCartCount();


    refreshBreakfastProducts();


    if (
        typeof window.renderBreakfastCart ===
        "function"
    ) {

        window.renderBreakfastCart();

    }


    if (
        typeof window.updateCartCount ===
        "function"
    ) {

        window.updateCartCount();

    }
}


/* ============================================================
   UPDATE QUANTITY
   ============================================================ */

function updateBreakfastQuantity(
    productId,
    change
) {

    const item =
        breakfastCart.find(
            product =>
                String(product.id) ===
                String(productId)
        );


    if (!item) {
        return;
    }


    const amount =
        Number(change) || 0;


    item.quantity =
        Number(
            item.quantity || 0
        ) + amount;


    if (
        item.quantity <= 0
    ) {

        breakfastCart =
            breakfastCart.filter(
                product =>
                    String(product.id) !==
                    String(productId)
            );

    }


    localStorage.setItem(
        "localmartGroceryCart",
        JSON.stringify(
            breakfastCart
        )
    );


    updateBreakfastCartCount();


    refreshBreakfastProducts();


    if (
        typeof window.renderBreakfastCart ===
        "function"
    ) {

        window.renderBreakfastCart();

    }


    if (
        typeof window.updateCartCount ===
        "function"
    ) {

        window.updateCartCount();

    }
}


/* ============================================================
   GET CART QUANTITY
   ============================================================ */

function getBreakfastCartQuantity(
    productId
) {

    const item =
        breakfastCart.find(
            product =>
                String(product.id) ===
                String(productId)
        );


    return item
        ? Number(
            item.quantity || 0
        )
        : 0;
}


/* ============================================================
   WISHLIST
   ============================================================ */

function toggleBreakfastWishlist(
    productId
) {

    const normalizedId =
        String(productId);


    const index =
        breakfastWishlist.findIndex(
            item =>
                String(typeof item === "object" ? item.id : item) ===
                normalizedId
        );


    if (index === -1) {

        const product = breakfastSaucesProducts.find(item => String(item.id) === normalizedId);
        if (product) breakfastWishlist.push({ ...product, quantity: 1 });

    } else {

        breakfastWishlist.splice(
            index,
            1
        );

    }


    localStorage.setItem(
        "localmartGroceryWishlist",
        JSON.stringify(
            breakfastWishlist
        )
    );


    refreshBreakfastProducts();
}


/* ============================================================
   TOAST
   ============================================================ */

function showBreakfastToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.breakfastToastTimer
    );


    window.breakfastToastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            1800
        );
}


/* ============================================================
   CHECK WISHLIST
   ============================================================ */

function isBreakfastWishlisted(
    productId
) {

    const normalizedId =
        String(productId);


    return breakfastWishlist.some(
        item =>
            String(typeof item === "object" ? item.id : item) ===
            normalizedId
    );
}


/* ============================================================
   CART COUNT
   ============================================================ */

function updateBreakfastCartCount() {

    const count =
        breakfastCart.reduce(
            (
                total,
                item
            ) => {

                return (
                    total +
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );


    const elements =
        document.querySelectorAll(
            "#cartCount, .cart-count, [data-cart-count]"
        );


    elements.forEach(
        element => {

            element.textContent =
                count;

        }
    );
}


/* ============================================================
   SEARCH
   ============================================================ */

function searchBreakfastProducts(
    searchTerm
) {

    const term =
        String(
            searchTerm || ""
        )
            .toLowerCase()
            .trim();


    if (!term) {

        return [
            ...breakfastSaucesProducts
        ];

    }


    return breakfastSaucesProducts.filter(
        product => {

            const name =
                String(
                    product.name || ""
                ).toLowerCase();


            const category =
                String(
                    product.category || ""
                ).toLowerCase();


            const brand =
                String(
                    product.brand || ""
                ).toLowerCase();


            const type =
                String(
                    product.type || ""
                ).toLowerCase();


            const subcategory =
                String(
                    product.subcategory || ""
                ).toLowerCase();


            const unit =
                String(
                    product.unit || ""
                ).toLowerCase();


            return (
                name.includes(term) ||
                category.includes(term) ||
                brand.includes(term) ||
                type.includes(term) ||
                subcategory.includes(term) ||
                unit.includes(term)
            );

        }
    );
}


/* ============================================================
   SORT
   ============================================================ */

function sortBreakfastProducts(
    products,
    sortType
) {

    const sorted =
        Array.isArray(products)
            ? [...products]
            : [];


    switch (sortType) {

        case "price-low":

            sorted.sort(
                (a, b) =>
                    Number(a.price || 0) -
                    Number(b.price || 0)
            );

            break;


        case "price-high":

            sorted.sort(
                (a, b) =>
                    Number(b.price || 0) -
                    Number(a.price || 0)
            );

            break;


        case "rating":

            sorted.sort(
                (a, b) =>
                    Number(b.rating || 0) -
                    Number(a.rating || 0)
            );

            break;


        case "discount":

            sorted.sort(
                (a, b) =>
                    getBreakfastDiscount(b) -
                    getBreakfastDiscount(a)
            );

            break;


        case "name":

            sorted.sort(
                (a, b) =>
                    String(a.name || "")
                        .localeCompare(
                            String(b.name || "")
                        )
            );

            break;


        default:
            break;

    }


    return sorted;
}


/* ============================================================
   PRODUCT CARD
   ============================================================ */

function createBreakfastProductCard(
    product
) {

    const discount =
        getBreakfastDiscount(
            product
        );


    const wished =
        isBreakfastWishlisted(
            product.id
        );


    const quantity =
        getBreakfastCartQuantity(
            product.id
        );


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "zepto-product-card";


    card.dataset.productId =
        product.id;


    const safeName =
        String(
            product.name || ""
        )
            .replace(
                /"/g,
                "&quot;"
            );


    card.innerHTML = `

        <div class="zepto-product-image-box">

            ${
                discount > 0
                    ? `
                        <span class="zepto-discount-badge">
                            ${discount}% OFF
                        </span>
                    `
                    : ""
            }


            <button
                type="button"
                class="zepto-wishlist-btn ${
                    wished ? "active" : ""
                }"
                onclick="
                    toggleBreakfastWishlist(
                        '${product.id}'
                    )
                "
                aria-label="Add to wishlist"
            >
                ${
                    wished
                        ? "♥"
                        : "♡"
                }
            </button>


            <img
                src="${product.image}"
                alt="${safeName}"
                loading="lazy"
                decoding="async"
                onerror="
                    handleBreakfastImageError(this)
                "
            >

        </div>


        <div class="zepto-product-info">


            <h3
                class="zepto-product-name"
                title="${safeName}"
            >
                ${product.name}
            </h3>


            <div class="zepto-product-unit">
                ${product.unit || ""}
            </div>


            <div class="zepto-rating">

                <span>★</span>

                <strong>
                    ${Number(
                        product.rating || 0
                    ).toFixed(1)}
                </strong>

                <small>
                    (${formatReviewCount(
                        product.reviews
                    )})
                </small>

            </div>


            <div class="zepto-price-row">

                <div class="zepto-price">

                    <strong>
                        ${formatBreakfastPrice(
                            product.price
                        )}
                    </strong>

                    ${
                        Number(product.mrp) >
                        Number(product.price)
                            ? `
                                <del>
                                    ${formatBreakfastPrice(
                                        product.mrp
                                    )}
                                </del>
                            `
                            : ""
                    }

                </div>


                ${
                    quantity === 0

                        ? `

                            <button
                                type="button"
                                class="zepto-add-btn"
                                onclick="
                                    addBreakfastToCart(
                                        '${product.id}'
                                    )
                                "
                            >
                                ADD
                            </button>

                        `

                        : `

                            <div class="quantity-control">

                                <button
                                    type="button"
                                    onclick="
                                        updateBreakfastQuantity(
                                            '${product.id}',
                                            -1
                                        )
                                    "
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>

                                <span>
                                    ${quantity}
                                </span>

                                <button
                                    type="button"
                                    onclick="
                                        updateBreakfastQuantity(
                                            '${product.id}',
                                            1
                                        )
                                    "
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>

                            </div>

                        `
                }

            </div>

        </div>
    `;


    return card;
}


/* ============================================================
   DISPLAY PRODUCTS
   ============================================================ */

function renderBreakfastProducts(
    products = breakfastSaucesProducts
) {

    const container =
        document.getElementById(
            "productsGrid"
        );


    const noProducts =
        document.getElementById(
            "noProducts"
        );


    const resultCount =
        document.getElementById(
            "resultCount"
        );


    if (!container) {

        console.warn(
            "LocalMart: #productsGrid not found."
        );

        return;
    }


    const productList =
        Array.isArray(products)
            ? products
            : [];


    if (resultCount) {

        resultCount.textContent =
            `${productList.length} ${
                productList.length === 1
                    ? "product"
                    : "products"
            }`;

    }


    container.innerHTML =
        "";


    if (
        productList.length === 0
    ) {

        if (noProducts) {

            noProducts.classList.add(
                "show"
            );

        }


        updateBreakfastCartCount();

        return;
    }


    if (noProducts) {

        noProducts.classList.remove(
            "show"
        );

    }


    const fragment =
        document.createDocumentFragment();


    productList.forEach(
        product => {

            fragment.appendChild(
                createBreakfastProductCard(
                    product
                )
            );

        }
    );


    container.appendChild(
        fragment
    );


    updateBreakfastCartCount();
}


/* ============================================================
   APPLY SEARCH + SORT
   ============================================================ */

function refreshBreakfastProducts() {

    const searchInput =
        document.querySelector(
            "#groceryNavSearch, #searchInput, #productSearch, .search-input"
        );


    const sortSelect =
        document.querySelector(
            "#sortSelect, #sortProducts"
        );


    const searchTerm =
        searchInput
            ? searchInput.value
            : "";


    const sortType =
        sortSelect
            ? sortSelect.value
            : "";


    let products =
        searchBreakfastProducts(
            searchTerm
        );


    products =
        sortBreakfastProducts(
            products,
            sortType
        );


    renderBreakfastProducts(
        products
    );
}


/* ============================================================
   CATEGORY FILTER
   ============================================================ */

function filterBreakfastByCategory(
    category
) {

    const normalizedCategory =
        String(
            category || ""
        )
            .toLowerCase()
            .trim();


    if (
        !normalizedCategory ||
        normalizedCategory === "all" ||
        normalizedCategory === "all products"
    ) {

        refreshBreakfastProducts();

        return;
    }


    const filtered =
        breakfastSaucesProducts.filter(
            product =>
                String(
                    product.category || ""
                )
                    .toLowerCase()
                    .trim() ===
                normalizedCategory
        );


    renderBreakfastProducts(
        filtered
    );
}


/* ============================================================
   DOM READY
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ----------------------------------------------------
           SEARCH
        ---------------------------------------------------- */

        const searchInput =
            document.querySelector(
                "#groceryNavSearch, #searchInput, #productSearch, .search-input"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    refreshBreakfastProducts();

                }
            );

        }


        /* ----------------------------------------------------
           SORT
        ---------------------------------------------------- */

        const sortSelect =
            document.querySelector(
                "#sortSelect, #sortProducts"
            );


        if (sortSelect) {

            sortSelect.addEventListener(
                "change",
                function () {

                    refreshBreakfastProducts();

                }
            );

        }


        /* ----------------------------------------------------
           INITIAL RENDER
        ---------------------------------------------------- */

        renderBreakfastProducts();


        /* ----------------------------------------------------
           INITIAL CART COUNT
        ---------------------------------------------------- */

        updateBreakfastCartCount();

    }
);


/* ============================================================
   GLOBAL ACCESS
   ============================================================ */

window.breakfastSaucesProducts =
    breakfastSaucesProducts;

window.muesliOatsProducts =
    muesliOatsProducts;

window.groceryProducts =
    groceryProducts;

window.getMuesliOatsProducts =
    getMuesliOatsProducts;

window.formatBreakfastPrice =
    formatBreakfastPrice;

window.getBreakfastDiscount =
    getBreakfastDiscount;

window.formatReviewCount =
    formatReviewCount;

window.handleBreakfastImageError =
    handleBreakfastImageError;

window.addBreakfastToCart =
    addBreakfastToCart;

window.removeBreakfastFromCart =
    removeBreakfastFromCart;

window.updateBreakfastQuantity =
    updateBreakfastQuantity;

window.getBreakfastCartQuantity =
    getBreakfastCartQuantity;

window.toggleBreakfastWishlist =
    toggleBreakfastWishlist;

window.isBreakfastWishlisted =
    isBreakfastWishlisted;

window.updateBreakfastCartCount =
    updateBreakfastCartCount;

window.searchBreakfastProducts =
    searchBreakfastProducts;

window.sortBreakfastProducts =
    sortBreakfastProducts;

window.renderBreakfastProducts =
    renderBreakfastProducts;

window.refreshBreakfastProducts =
    refreshBreakfastProducts;

window.filterBreakfastByCategory =
    filterBreakfastByCategory;


/* ============================================================
   ZEPTO STYLE CATEGORY CAROUSEL
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const categoryNav =
            document.getElementById(
                "categoryNav"
            );


        const categoryPrev =
            document.getElementById(
                "categoryPrev"
            );


        const categoryNext =
            document.getElementById(
                "categoryNext"
            );


        if (!categoryNav) {
            return;
        }


        /* ----------------------------------------------------
           PREVIOUS
        ---------------------------------------------------- */

        if (categoryPrev) {

            categoryPrev.addEventListener(
                "click",
                function () {

                    categoryNav.scrollBy({

                        left: -300,

                        behavior: "smooth"

                    });

                }
            );

        }


        /* ----------------------------------------------------
           NEXT
        ---------------------------------------------------- */

        if (categoryNext) {

            categoryNext.addEventListener(
                "click",
                function () {

                    categoryNav.scrollBy({

                        left: 300,

                        behavior: "smooth"

                    });

                }
            );

        }


        /* ----------------------------------------------------
           CATEGORY CLICK
        ---------------------------------------------------- */

        const categoryCards =
            document.querySelectorAll(
                ".top-category-card"
            );


        categoryCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {


                        categoryCards.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        card.classList.add(
                            "active"
                        );


                        const category =
                            card.dataset.category ||
                            card.getAttribute(
                                "data-category"
                            );


                        /* ------------------------------------
                           Existing LocalMart compatibility
                        ------------------------------------ */

                        if (
                            typeof window.selectCategory ===
                            "function"
                        ) {

                            window.selectCategory(
                                category
                            );

                        }

                        else if (
                            typeof window.filterByCategory ===
                            "function"
                        ) {

                            window.filterByCategory(
                                category
                            );

                        }

                        else {

                            filterBreakfastByCategory(
                                category
                            );

                        }


                        /* ------------------------------------
                           Active category text
                        ------------------------------------ */

                        const activeCategory =
                            document.getElementById(
                                "activeCategory"
                            );


                        if (activeCategory) {

                            activeCategory.textContent =
                                category;

                        }


                        /* ------------------------------------
                           Breadcrumb
                        ------------------------------------ */

                        const breadcrumbCategory =
                            document.getElementById(
                                "breadcrumbCategory"
                            );


                        if (breadcrumbCategory) {

                            breadcrumbCategory.textContent =
                                category;

                        }


                        /* ------------------------------------
                           Page title
                        ------------------------------------ */

                        const categoryTitle =
                            document.getElementById(
                                "categoryTitle"
                            );


                        if (categoryTitle) {

                            categoryTitle.textContent =
                                "Buy " +
                                category +
                                " Online";

                        }


                        /* ------------------------------------
                           Scroll products to top
                        ------------------------------------ */

                        const productContent =
                            document.querySelector(
                                ".product-content"
                            );


                        if (productContent) {

                            window.scrollTo({

                                top:
                                    productContent.offsetTop -
                                    90,

                                behavior:
                                    "smooth"

                            });

                        }

                    }
                );

            }
        );

    }
);


/* ============================================================
   PRODUCT / ID VALIDATION
   ============================================================ */

(function validateBreakfastCatalogue() {

    const ids =
        breakfastSaucesProducts.map(
            product =>
                String(product.id)
        );


    const duplicateIds =
        ids.filter(
            (id, index) =>
                ids.indexOf(id) !== index
        );


    const imageUrls =
        breakfastSaucesProducts
            .map(product => product.image)
            .filter(Boolean);


    const duplicateImages =
        imageUrls.filter(
            (url, index) =>
                imageUrls.indexOf(url) !== index
        );


    if (
        duplicateIds.length
    ) {

        console.warn(
            "LocalMart duplicate product IDs:",
            [
                ...new Set(
                    duplicateIds
                )
            ]
        );

    }


    if (
        duplicateImages.length
    ) {

        console.warn(
            "LocalMart duplicate product images:",
            [
                ...new Set(
                    duplicateImages
                )
            ]
        );

    }


    console.log(
        "LocalMart unique product IDs:",
        new Set(ids).size
    );


    console.log(
        "LocalMart unique product images:",
        new Set(imageUrls).size
    );

})();


/* ============================================================
   DEBUG
   ============================================================ */

console.log(
    `LocalMart Breakfast & Sauces loaded: ${breakfastSaucesProducts.length} products`
);

console.log(
    "Muesli & Oats:",
    muesliOatsProducts.length
);

console.log(
    "Breakfast Cereals:",
    breakfastSaucesProducts.filter(
        product =>
            product.category ===
            "Breakfast Cereals"
    ).length
);

console.log(
    "Ketchup & Sauces:",
    breakfastSaucesProducts.filter(
        product =>
            product.category ===
            "Ketchup & Sauces"
    ).length
);

console.log(
    "Honey & Spreads:",
    breakfastSaucesProducts.filter(
        product =>
            product.category ===
            "Honey & Spreads"
    ).length
);

console.log(
    "Peanut Butter:",
    breakfastSaucesProducts.filter(
        product =>
            product.category ===
            "Peanut Butter"
    ).length
);
