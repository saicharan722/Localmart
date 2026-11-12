/* =========================================================
   LOCALMART - RESTAURANTS.JS
   100 Unique Restaurants
   Search + Veg + Non Veg + Top Rated +
   Fast Delivery + Offers + Under Rs 199
   ========================================================= */

const restaurants = [

    // ===================== 1 - 10 =====================

    {
        id: 1,
        name: "Paradise Biryani",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.8,
        reviews: "24K+",
        time: 28,
        distance: 2.1,
        price: 500,
        offer: "50% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1701579231349-d7459c40919d?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 2,
        name: "Pizza Hut",
        cuisine: "Pizza â€¢ Italian",
        rating: 4.6,
        reviews: "18K+",
        time: 25,
        distance: 1.3,
        price: 450,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 3,
        name: "Burger King",
        cuisine: "Burger â€¢ Fast Food",
        rating: 4.5,
        reviews: "16K+",
        time: 20,
        distance: 0.9,
        price: 350,
        offer: "30% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 4,
        name: "Chinese Wok",
        cuisine: "Chinese â€¢ Noodles",
        rating: 4.4,
        reviews: "12K+",
        time: 27,
        distance: 1.8,
        price: 400,
        offer: "FREE DELIVERY",
        veg: false,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 5,
        name: "Domino's Pizza",
        cuisine: "Pizza â€¢ Italian",
        rating: 4.7,
        reviews: "21K+",
        time: 24,
        distance: 1.5,
        price: 500,
        offer: "40% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 6,
        name: "KFC",
        cuisine: "Chicken â€¢ Fast Food",
        rating: 4.5,
        reviews: "19K+",
        time: 22,
        distance: 1.2,
        price: 600,
        offer: "20% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1670688866261-db6697858df8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2ZjJTIwYnVja2V0fGVufDB8fDB8fHww"
    },

    {
        id: 7,
        name: "McDonald's",
        cuisine: "Burger â€¢ Fast Food",
        rating: 4.6,
        reviews: "20K+",
        time: 19,
        distance: 1.0,
        price: 400,
        offer: "FREE DELIVERY",
        veg: false,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 8,
        name: "Subway",
        cuisine: "Sandwich â€¢ Healthy",
        rating: 4.4,
        reviews: "11K+",
        time: 18,
        distance: 0.9,
        price: 350,
        offer: "25% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 9,
        name: "Starbucks",
        cuisine: "Coffee â€¢ Cafe",
        rating: 4.8,
        reviews: "17K+",
        time: 16,
        distance: 0.7,
        price: 650,
        offer: "10% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 10,
        name: "Behrouz Biryani",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.9,
        reviews: "28K+",
        time: 30,
        distance: 2.8,
        price: 650,
        offer: "50% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80"
    },


    // ===================== 11 - 20 =====================

    {
        id: 11,
        name: "Meghana Foods",
        cuisine: "Biryani â€¢ Andhra",
        rating: 4.8,
        reviews: "22K+",
        time: 27,
        distance: 2.3,
        price: 650,
        offer: "40% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJpcnlhbml8ZW58MHx8MHx8fDA%3D"
    },

    {
        id: 12,
        name: "Pista House",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.7,
        reviews: "20K+",
        time: 29,
        distance: 3.0,
        price: 700,
        offer: "30% OFF",
        veg: false,
        image: "https://media.istockphoto.com/id/1410130688/photo/mutton-biryani-served-in-a-golden-dish-isolated-on-dark-background-side-view-indian-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=dgx9Uk9HkGNK3aNMp4OJgKHyV67Jmt0Eg2lJ7t8dOJg="
    },

    {
        id: 13,
        name: "Hotel Shadab",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.6,
        reviews: "18K+",
        time: 26,
        distance: 2.4,
        price: 550,
        offer: "20% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D"
    },

    {
        id: 14,
        name: "Chutneys",
        cuisine: "South Indian â€¢ Vegetarian",
        rating: 4.7,
        reviews: "16K+",
        time: 22,
        distance: 1.8,
        price: 450,
        offer: "FREE DELIVERY",
        veg: true,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 15,
        name: "Saravana Bhavan",
        cuisine: "South Indian â€¢ Veg",
        rating: 4.8,
        reviews: "19K+",
        time: 21,
        distance: 1.6,
        price: 380,
        offer: "25% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 16,
        name: "Cream Stone",
        cuisine: "Ice Cream â€¢ Desserts",
        rating: 4.9,
        reviews: "14K+",
        time: 18,
        distance: 1.2,
        price: 350,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 17,
        name: "Wow Momo",
        cuisine: "Momos â€¢ Chinese",
        rating: 4.5,
        reviews: "12K+",
        time: 20,
        distance: 1.7,
        price: 320,
        offer: "20% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 19,
        name: "Sweet Truth",
        cuisine: "Bakery â€¢ Cakes",
        rating: 4.8,
        reviews: "11K+",
        time: 19,
        distance: 1.3,
        price: 400,
        offer: "15% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 20,
        name: "Barbeque Nation",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.9,
        reviews: "26K+",
        time: 34,
        distance: 4.1,
        price: 1200,
        offer: "50% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80"
    },


    // ===================== 21 - 30 =====================

    {
        id: 21,
        name: "Bikanervala",
        cuisine: "North Indian â€¢ Sweets",
        rating: 4.7,
        reviews: "15K+",
        time: 24,
        distance: 2.0,
        price: 450,
        offer: "20% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 23,
        name: "Cafe Coffee Day",
        cuisine: "Cafe â€¢ Coffee",
        rating: 4.5,
        reviews: "10K+",
        time: 18,
        distance: 1.1,
        price: 500,
        offer: "15% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 25,
        name: "Empire Restaurant",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.7,
        reviews: "17K+",
        time: 28,
        distance: 2.8,
        price: 650,
        offer: "40% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1633945274309-2c16c9682a8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D"
    },


    {
        id: 27,
        name: "Andhra Spice",
        cuisine: "South Indian â€¢ Vegetarian",
        rating: 4.8,
        reviews: "16K+",
        time: 24,
        distance: 2.4,
        price: 480,
        offer: "35% OFF",
        veg: false,
        image: "https://media.istockphoto.com/id/1413124373/photo/indian-and-pakistani-spicy-food-lucknowi-dum-pukht-biryani-served-in-a-dish-isolated-on-dark.webp?a=1&b=1&s=612x612&w=0&k=20&c=Le2k9h-P4blDbrjElOKWPKw5fVEUJ1ga1-NIxegWDaU="
    },

    {
        id: 28,
        name: "Punjabi Dhaba",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.7,
        reviews: "14K+",
        time: 27,
        distance: 3.0,
        price: 550,
        offer: "20% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D"
    },

    {
        id: 29,
        name: "Bawarchi",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.9,
        reviews: "29K+",
        time: 30,
        distance: 3.5,
        price: 700,
        offer: "50% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 30,
        name: "Dindigul Thalappakatti",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.8,
        reviews: "19K+",
        time: 29,
        distance: 3.2,
        price: 680,
        offer: "40% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1701579231349-d7459c40919d?auto=format&fit=crop&w=900&q=80"
    },


    // ===================== 31 - 40 =====================

    {
        id: 31,
        name: "Oven Story Pizza",
        cuisine: "Pizza â€¢ Italian",
        rating: 4.7,
        reviews: "16K+",
        time: 24,
        distance: 2.0,
        price: 550,
        offer: "40% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 33,
        name: "Natural Ice Cream",
        cuisine: "Ice Cream â€¢ Desserts",
        rating: 4.8,
        reviews: "13K+",
        time: 18,
        distance: 1.4,
        price: 320,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 34,
        name: "Tea Time",
        cuisine: "Tea â€¢ Snacks",
        rating: 4.5,
        reviews: "9K+",
        time: 15,
        distance: 0.9,
        price: 180,
        offer: "FREE DELIVERY",
        veg: true,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 35,
        name: "Cafe Delight",
        cuisine: "Cafe â€¢ Continental",
        rating: 4.6,
        reviews: "8K+",
        time: 21,
        distance: 1.8,
        price: 480,
        offer: "20% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1506372023823-741c83b836fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZmZlfGVufDB8fDB8fHwwhttps://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80"
    },

    

    

    
    {
        id: 39,
        name: "Cake World",
        cuisine: "Bakery â€¢ Cakes",
        rating: 4.8,
        reviews: "14K+",
        time: 16,
        distance: 1.2,
        price: 380,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 40,
        name: "Juicy Corner",
        cuisine: "Juices â€¢ Beverages",
        rating: 4.6,
        reviews: "7K+",
        time: 15,
        distance: 0.9,
        price: 220,
        offer: "FREE DELIVERY",
        veg: true,
        image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80"
    },


    // ===================== 41 - 50 =====================

    

    {
        id: 42,
        name: "Royal Biryani",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.8,
        reviews: "15K+",
        time: 26,
        distance: 2.2,
        price: 450,
        offer: "30% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 43,
        name: "Green Leaf",
        cuisine: "South Indian â€¢ Vegetarian",
        rating: 4.7,
        reviews: "7K+",
        time: 20,
        distance: 1.4,
        price: 180,
        offer: "FREE DELIVERY",
        veg: true,
        image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 45,
        name: "Dosa Point",
        cuisine: "Dosa â€¢ South Indian",
        rating: 4.7,
        reviews: "12K+",
        time: 17,
        distance: 1.1,
        price: 160,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 46,
        name: "Hyderabad House",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.8,
        reviews: "18K+",
        time: 31,
        distance: 3.4,
        price: 600,
        offer: "40% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1701579231349-d7459c40919d?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 48,
        name: "The Noodle House",
        cuisine: "Chinese â€¢ Asian",
        rating: 4.6,
        reviews: "10K+",
        time: 22,
        distance: 2.0,
        price: 330,
        offer: "30% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 49,
        name: "Burger Garage",
        cuisine: "Burger â€¢ American",
        rating: 4.7,
        reviews: "11K+",
        time: 19,
        distance: 1.5,
        price: 299,
        offer: "FREE DELIVERY",
        veg: false,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
    },

    

    // ===================== 51 - 60 =====================

    {
        id: 51,
        name: "Tandoori Flames",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.7,
        reviews: "13K+",
        time: 28,
        distance: 2.5,
        price: 550,
        offer: "35% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 52,
        name: "Idli Express",
        cuisine: "South Indian â€¢ Vegetarian",
        rating: 4.6,
        reviews: "6K+",
        time: 14,
        distance: 0.7,
        price: 140,
        offer: "FREE DELIVERY",
        veg: true,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 54,
        name: "Biryani Blues",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.7,
        reviews: "14K+",
        time: 25,
        distance: 2.0,
        price: 430,
        offer: "30% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 55,
        name: "The Sandwich Co",
        cuisine: "Sandwich â€¢ Cafe",
        rating: 4.4,
        reviews: "5K+",
        time: 17,
        distance: 1.0,
        price: 180,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 56,
        name: "Pasta Palace",
        cuisine: "Pasta â€¢ Italian",
        rating: 4.6,
        reviews: "8K+",
        time: 24,
        distance: 2.1,
        price: 450,
        offer: "25% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 57,
        name: "Fried Chicken Hub",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.5,
        reviews: "10K+",
        time: 21,
        distance: 1.8,
        price: 380,
        offer: "40% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 58,
        name: "Chai & Snacks",
        cuisine: "Tea â€¢ Snacks",
        rating: 4.6,
        reviews: "7K+",
        time: 12,
        distance: 0.6,
        price: 150,
        offer: "FREE DELIVERY",
        veg: true,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 59,
        name: "Kebab Corner",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.8,
        reviews: "11K+",
        time: 27,
        distance: 2.6,
        price: 500,
        offer: "30% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80"
    },

    


    // ===================== 61 - 70 =====================

    {
        id: 61,
        name: "Royal Dosa",
        cuisine: "Dosa â€¢ South Indian",
        rating: 4.8,
        reviews: "10K+",
        time: 18,
        distance: 1.3,
        price: 170,
        offer: "25% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 62,
        name: "Spice Route",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.6,
        reviews: "9K+",
        time: 26,
        distance: 2.4,
        price: 480,
        offer: "30% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 63,
        name: "Pizza Corner",
        cuisine: "Pizza â€¢ Fast Food",
        rating: 4.5,
        reviews: "7K+",
        time: 20,
        distance: 1.6,
        price: 280,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 65,
        name: "Desi Tiffin",
        cuisine: "Indian â€¢ Meals",
        rating: 4.6,
        reviews: "5K+",
        time: 16,
        distance: 1.0,
        price: 180,
        offer: "FREE DELIVERY",
        veg: true,
        image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 66,
        name: "Chicken Point",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.5,
        reviews: "12K+",
        time: 29,
        distance: 2.7,
        price: 420,
        offer: "35% OFF",
        veg: false,
        image: "https://media.istockphoto.com/id/1437118828/photo/biryani-with-salan-raita-and-pickle.webp?a=1&b=1&s=612x612&w=0&k=20&c=TRkEGBtkyzALdFp79y3M2X4TygcLtPbSh1bfPHaDFyE="
    },

    

    

    {
        id: 69,
        name: "The Dessert Lab",
        cuisine: "Desserts â€¢ Bakery",
        rating: 4.9,
        reviews: "9K+",
        time: 15,
        distance: 1.1,
        price: 190,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80"
    },

    


    // ===================== 71 - 80 =====================

    {
        id: 71,
        name: "Annapurna Meals",
        cuisine: "South Indian â€¢ Vegetarian",
        rating: 4.8,
        reviews: "13K+",
        time: 20,
        distance: 1.5,
        price: 220,
        offer: "FREE DELIVERY",
        veg: true,
        image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80"
    },

    

    

    

    {
        id: 75,
        name: "Dosa Factory",
        cuisine: "South Indian â€¢ Vegetarian",
        rating: 4.7,
        reviews: "11K+",
        time: 16,
        distance: 1.0,
        price: 150,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 76,
        name: "Biryani Express",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.6,
        reviews: "12K+",
        time: 24,
        distance: 2.1,
        price: 390,
        offer: "30% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1701579231349-d7459c40919d?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 77,
        name: "Cafe Mocha",
        cuisine: "Coffee â€¢ Cafe",
        rating: 4.8,
        reviews: "9K+",
        time: 14,
        distance: 0.8,
        price: 180,
        offer: "FREE DELIVERY",
        veg: true,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 79,
        name: "Sweet Scoop",
        cuisine: "Ice Cream â€¢ Desserts",
        rating: 4.9,
        reviews: "10K+",
        time: 13,
        distance: 0.7,
        price: 160,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80"
    },

    


    // ===================== 81 - 90 =====================

    {
        id: 81,
        name: "South Feast",
        cuisine: "South Indian â€¢ Vegetarian",
        rating: 4.7,
        reviews: "8K+",
        time: 18,
        distance: 1.3,
        price: 199,
        offer: "20% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80"
    },

    
    {
        id: 83,
        name: "Cheesy Bites",
        cuisine: "Pizza â€¢ Snacks",
        rating: 4.5,
        reviews: "7K+",
        time: 21,
        distance: 1.6,
        price: 299,
        offer: "40% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
    },

    
    
    

    {
        id: 87,
        name: "Choco Heaven",
        cuisine: "Chocolate â€¢ Desserts",
        rating: 4.9,
        reviews: "8K+",
        time: 14,
        distance: 1.0,
        price: 190,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80"
    },

    

    {
        id: 89,
        name: "Fresh Juice Bar",
        cuisine: "Juices â€¢ Beverages",
        rating: 4.7,
        reviews: "5K+",
        time: 12,
        distance: 0.6,
        price: 150,
        offer: "20% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80"
    },

    

    // ===================== 91 - 100 =====================

    
    {
        id: 93,
        name: "Pizza Planet",
        cuisine: "Pizza â€¢ Italian",
        rating: 4.7,
        reviews: "13K+",
        time: 22,
        distance: 1.7,
        price: 399,
        offer: "BUY 1 GET 1",
        veg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 94,
        name: "Desi Burger",
        cuisine: "Burger â€¢ Indian",
        rating: 4.5,
        reviews: "8K+",
        time: 18,
        distance: 1.1,
        price: 180,
        offer: "30% OFF",
        veg: true,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
    },

    
    

    {
        id: 97,
        name: "Biryani Palace",
        cuisine: "Biryani â€¢ Hyderabadi",
        rating: 4.9,
        reviews: "21K+",
        time: 29,
        distance: 3.0,
        price: 550,
        offer: "50% OFF",
        veg: false,
        image: "https://images.unsplash.com/photo-1701579231349-d7459c40919d?auto=format&fit=crop&w=900&q=80"
    },

    

    
    

];


/* =========================================================
   LOCALMART - RESTAURANT LOGIC
   ========================================================= */

let activeFilter = "all";
let searchText = "";


/* =========================================================
   GET CONTAINER
   ========================================================= */

function getRestaurantContainer() {
    return document.getElementById("restaurantContainer");
}


/* =========================================================
   RESTAURANT COUNT
   ========================================================= */

function updateRestaurantCount(count) {

    const countElement =
        document.getElementById("restaurantCount");

    if (countElement) {
        countElement.textContent = count;
    }
}


/* =========================================================
   FILTER RESTAURANTS
   ========================================================= */

function getFilteredRestaurants() {

    let filtered = restaurants.slice();


    /* SEARCH */

    if (searchText) {

        filtered = filtered.filter(function (res) {

            const searchData = (
                res.name + " " +
                res.cuisine + " " +
                res.offer
            ).toLowerCase();

            return searchData.includes(searchText);

        });

    }


    /* FILTER */

    switch (activeFilter) {

        case "veg":

            filtered = filtered.filter(function (res) {
                return res.veg === true;
            });

            break;


        case "nonveg":

            filtered = filtered.filter(function (res) {
                return res.veg === false;
            });

            break;


        case "toprated":

            filtered = filtered.filter(function (res) {
                return Number(res.rating) >= 4.7;
            });

            break;


        case "fast":

            filtered = filtered.filter(function (res) {
                return Number(res.time) <= 20;
            });

            break;


        case "offers":

            filtered = filtered.filter(function (res) {
                return res.offer &&
                       res.offer.trim() !== "";
            });

            break;


        case "under199":

            filtered = filtered.filter(function (res) {
                return Number(res.price) < 199;
            });

            break;


        case "all":
        default:

            break;

    }


    return filtered;
}


/* =========================================================
   RENDER RESTAURANTS
   ========================================================= */

function renderRestaurants() {

    const container =
        getRestaurantContainer();


    if (!container) {

        console.error(
            "ERROR: #restaurantContainer not found"
        );

        return;

    }


    const filteredRestaurants =
        getFilteredRestaurants();


    /* NO RESULTS */

    if (filteredRestaurants.length === 0) {

        container.innerHTML = `

            <div class="col-12">

                <div class="text-center py-5">

                    <div style="font-size:60px;">
                        ðŸ˜•
                    </div>

                    <h4 class="mt-3">
                        No restaurants found
                    </h4>

                    <p class="text-muted">
                        Try another search or filter.
                    </p>

                </div>

            </div>

        `;

        updateRestaurantCount(0);

        return;

    }


    /* BUILD CARDS */

    /* =========================================================
   BUILD RESTAURANT CARDS
   ========================================================= */

let html = "";

filteredRestaurants.forEach(function (res) {

    html += `
    
<div class="col-12 col-sm-6 col-lg-4 mb-4">
            <div class="restaurant-card h-100">

                <!-- IMAGE -->
                <div class="restaurant-image">

                    <img
                        src="${res.image}"
                        alt="${res.name}"
                        loading="lazy"
                        onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'"
                    >

                    <!-- OFFER -->
                    ${
                        res.offer
                        ? `<span class="offer-badge">${res.offer}</span>`
                        : ""
                    }

                    <!-- VEG / NON VEG -->
                    <span class="food-type-badge ${res.veg ? "veg" : "nonveg"}">
                        ${res.veg ? "â— Veg" : "â— Non-Veg"}
                    </span>

                </div>


                <!-- CARD CONTENT -->
                <div class="restaurant-content">

                    <h5 class="restaurant-name">
                        ${res.name}
                    </h5>

                    <p class="restaurant-cuisine">
                        ${res.cuisine}
                    </p>


                    <div class="restaurant-meta">

                        <span class="rating-badge">
                            â­ ${res.rating}
                        </span>

                        <span class="reviews">
                            ${res.reviews}
                        </span>

                    </div>


                    <div class="restaurant-details">

                        <span>
                            <i class="bi bi-clock"></i>
                            ${res.time} mins
                        </span>

                        <span>
                            <i class="bi bi-geo-alt"></i>
                            ${res.distance} km
                        </span>

                    </div>


                    <div class="restaurant-price">
                        ₹${res.price} for two
                    </div>


                    <button
                        type="button"
                        class="btn btn-success w-100 view-menu-btn"
                        data-id="${res.id}">

                        <i class="bi bi-shop me-1"></i>
                        View Menu

                    </button>

                </div>

            </div>

        </div>

    `;

});


container.innerHTML = html;

updateRestaurantCount(filteredRestaurants.length);

    /* INSERT CARDS */

    container.innerHTML = html;


    /* UPDATE COUNT */

    updateRestaurantCount(
        filteredRestaurants.length
    );

}


/* =========================================================
   SEARCH
   ========================================================= */

function setupSearch() {

    const searchInput =
        document.getElementById("restaurantSearch");


    if (!searchInput) {

        console.warn(
            "restaurantSearch input not found"
        );

        return;

    }


    searchInput.addEventListener(
        "input",
        function () {

            searchText =
                this.value
                    .trim()
                    .toLowerCase();

            renderRestaurants();

        }
    );

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

function setupFilters() {

    const filterButtons =
        document.querySelectorAll(
            "[data-filter]"
        );


    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    activeFilter =
                        this.dataset.filter;


                    /* Reset buttons */

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                            btn.classList.remove(
                                "btn-success"
                            );

                            btn.classList.add(
                                "btn-outline-success"
                            );

                        }
                    );


                    /* Active button */

                    this.classList.add(
                        "active"
                    );

                    this.classList.remove(
                        "btn-outline-success"
                    );

                    this.classList.add(
                        "btn-success"
                    );


                    renderRestaurants();

                }
            );

        }
    );

}


/* =========================================================
   VIEW MENU
   ========================================================= */

function setupMenuButtons() {

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".view-menu-btn"
                );


            if (!button) {
                return;
            }


            const id =
                Number(button.dataset.id);


            const restaurant =
                restaurants.find(
                    function (item) {

                        return item.id === id;

                    }
                );


            if (!restaurant) {

                console.error(
                    "Restaurant not found:",
                    id
                );

                return;

            }


            /* SAVE SELECTED RESTAURANT */

            localStorage.setItem(
                "selectedRestaurant",
                JSON.stringify(restaurant)
            );


            console.log(
                "Selected restaurant:",
                restaurant
            );


            /*
               Change this URL if your Django
               restaurant detail URL is different.
            */

            window.location.href =
                `/restaurant/${restaurant.id}/`;

        }
    );

}


/* =========================================================
   CATEGORY SLIDER
   ========================================================= */

function setupCategorySlider() {

    const wrapper =
        document.getElementById(
            "categoryWrapper"
        );

    const leftBtn =
        document.getElementById(
            "leftBtn"
        );

    const rightBtn =
        document.getElementById(
            "rightBtn"
        );


    if (!wrapper) {
        return;
    }


    if (leftBtn) {

        leftBtn.addEventListener(
            "click",
            function () {

                wrapper.scrollBy({
                    left: -400,
                    behavior: "smooth"
                });

            }
        );

    }


    if (rightBtn) {

        rightBtn.addEventListener(
            "click",
            function () {

                wrapper.scrollBy({
                    left: 400,
                    behavior: "smooth"
                });

            }
        );

    }

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "================================="
        );

        console.log(
            "LocalMart Restaurants Loaded"
        );

        console.log(
            "Total restaurants:",
            restaurants.length
        );

        console.log(
            "================================="
        );


        /* Check 100 restaurants */

        if (restaurants.length !== 100) {

            console.warn(
                "Expected 100 restaurants, found:",
                restaurants.length
            );

        }


        renderRestaurants();

        setupSearch();

        setupFilters();

        setupMenuButtons();

        setupCategorySlider();

    }
);
