// ======================================
// Restaurant Details
// ======================================

const restaurant = JSON.parse(
    localStorage.getItem("selectedRestaurant")
) || {
    id: 1,
    name: "Pizza Hut",
    cuisine: "Pizza â€¢ Italian",
    rating: "4.7",
    price: "₹400 for two",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
};

// Header

const restaurantName = document.getElementById("restaurantName");
const restaurantCuisine = document.getElementById("restaurantCuisine");
const restaurantImage = document.getElementById("restaurantImage");

if (restaurantName)
    restaurantName.innerText = restaurant.name;

if (restaurantCuisine)
    restaurantCuisine.innerText = restaurant.cuisine;

if (restaurantImage)
    restaurantImage.src = restaurant.image;


// ======================================
// Cuisine Menu
// ======================================

const customCuisineMenus = {
    Pizza: [
        { id: 5001, name: "Margherita Pizza", category: "Pizza", price: 249, veg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800", description: "Classic tomato, mozzarella and basil pizza." },
        { id: 5002, name: "Farmhouse Pizza", category: "Pizza", price: 349, veg: true, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800", description: "Loaded with fresh vegetables and melted cheese." },
        { id: 5003, name: "Chicken Tikka Pizza", category: "Pizza", price: 399, veg: false, image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800", description: "Tandoori chicken, peppers and mozzarella." }
    ],
    Burger: [
        { id: 5011, name: "Classic Veg Burger", category: "Burgers", price: 149, veg: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800", description: "Crispy vegetable patty with fresh lettuce and sauce." },
        { id: 5012, name: "Cheese Burger", category: "Burgers", price: 199, veg: true, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=800", description: "Grilled patty, cheese and house burger sauce." },
        { id: 5013, name: "Chicken Burger", category: "Burgers", price: 229, veg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800", description: "Crispy chicken burger with lettuce and mayo." }
    ],
    Dosa: [
        { id: 5021, name: "Masala Dosa", category: "South Indian", price: 149, veg: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800", description: "Crisp dosa filled with spiced potato masala." },
        { id: 5022, name: "Plain Dosa", category: "South Indian", price: 99, veg: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800", description: "Golden, crisp dosa served with chutneys and sambar." },
        { id: 5023, name: "Idli Sambar", category: "South Indian", price: 89, veg: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800", description: "Soft steamed idlis with sambar and coconut chutney." }
    ],
    Tea: [
        { id: 5031, name: "Masala Chai", category: "Tea", price: 35, veg: true, image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800", description: "Strong Indian tea simmered with milk and warming spices." },
        { id: 5032, name: "Ginger Tea", category: "Tea", price: 40, veg: true, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800", description: "Freshly brewed tea with ginger and milk." },
        { id: 5033, name: "Cardamom Tea", category: "Tea", price: 40, veg: true, image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800", description: "Fragrant tea brewed with crushed cardamom." },
        { id: 5034, name: "Iced Lemon Tea", category: "Tea", price: 89, veg: true, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800", description: "Chilled black tea with lemon and a touch of sweetness." }
    ],
    Coffee: [
        { id: 5041, name: "Cappuccino", category: "Coffee", price: 129, veg: true, image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800", description: "Espresso topped with steamed milk and silky foam." },
        { id: 5042, name: "Cafe Latte", category: "Coffee", price: 139, veg: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800", description: "Smooth espresso blended with steamed milk." },
        { id: 5043, name: "Americano", category: "Coffee", price: 109, veg: true, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800", description: "Espresso diluted with hot water for a rich, bold cup." },
        { id: 5044, name: "Cold Coffee", category: "Coffee", price: 149, veg: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800", description: "Chilled blended coffee finished with a creamy layer." }
    ],
    Juices: [
        { id: 5051, name: "Fresh Orange Juice", category: "Juices", price: 99, veg: true, image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800", description: "Freshly squeezed orange juice served chilled." },
        { id: 5052, name: "Watermelon Juice", category: "Juices", price: 89, veg: true, image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800", description: "Refreshing watermelon juice made to order." },
        { id: 5053, name: "Mango Juice", category: "Juices", price: 109, veg: true, image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800", description: "Sweet mango juice blended fresh and served cold." },
        { id: 5054, name: "Mixed Fruit Juice", category: "Juices", price: 119, veg: true, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800", description: "A fresh blend of seasonal fruits." }
    ]
};

const cuisineParts = String(restaurant.cuisine || "")
    .split(/[•|]|â€¢/)
    .map(part => part.trim())
    .filter(Boolean);
const cuisineAliases = {
    "chicken": "Fast Food",
    "chinese": "Fast Food",
    "noodles": "Fast Food",
    "south indian": "Dosa",
    "cafe": "Coffee",
    "coffee": "Coffee",
    "tea": "Tea",
    "juices": "Juices",
    "juice": "Juices",
    "north indian": "Tandoori",
    "indian": "Tandoori",
    "desserts": "Bakery",
    "cakes": "Bakery",
    "sweets": "Bakery",
    "chocolate": "Bakery",
    "sandwich": "Sandwiches",
    "sandwiches": "Sandwiches",
    "momo": "Momos",
    "momos": "Momos",
    "bakery": "Bakery"
};
const exactCuisine = cuisineParts.find(part => Array.isArray(cuisineMenus[part]));
const mainCuisine = cuisineParts[0] || "";
const normalizedMainCuisine = mainCuisine.toLowerCase();
const alias = cuisineAliases[normalizedMainCuisine];

if (Array.isArray(cuisineMenus[restaurant.name])) {
    menuItems = cuisineMenus[restaurant.name];
} else if (customCuisineMenus[mainCuisine]) {
    menuItems = customCuisineMenus[mainCuisine];
} else if (customCuisineMenus[normalizedMainCuisine[0]?.toUpperCase() + normalizedMainCuisine.slice(1)]) {
    menuItems = customCuisineMenus[normalizedMainCuisine[0].toUpperCase() + normalizedMainCuisine.slice(1)];
} else if (exactCuisine) {
    menuItems = cuisineMenus[exactCuisine];
} else if (alias && customCuisineMenus[alias]) {
    menuItems = customCuisineMenus[alias];
} else if (alias && Array.isArray(cuisineMenus[alias])) {
    menuItems = cuisineMenus[alias];
} else {
        menuItems = cuisineMenus[mainCuisine] || cuisineMenus["Fast Food"] || [];
}

let filtered = [...menuItems];


// ======================================
// Render Menu
// ======================================

function renderMenu() {

    const container =
        document.getElementById("menuContainer");

    if (!container) return;

    if (filtered.length === 0) {

        container.innerHTML = `

        <div class="col-12">

            <div class="alert alert-warning text-center">

                <h4>No menu available</h4>

                <p>
                    This restaurant has no menu items.
                </p>

            </div>

        </div>

        `;

        return;
    }

    let html = "";

    filtered.forEach(item => {

        html += `

        <div class="col-lg-6 col-md-6 mb-4">

            <div class="card shadow-sm border-0 h-100">

                <div class="row g-0">

                    <div class="col-4">

                        <img
                            src="${item.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'}"
                            alt="${item.name}"
                            class="img-fluid rounded-start h-100"
                            style="object-fit:cover;"
                            loading="lazy"
                            onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'">

                    </div>

                    <div class="col-8">

                        <div class="card-body">

                            <h5>${item.name}</h5>

                            <p class="text-muted mb-1">
                                ${item.category}
                            </p>

                            ${item.veg
                                ? '<span class="badge bg-success">Veg</span>'
                                : '<span class="badge bg-danger">Non Veg</span>'
                            }

                            <h5 class="text-success mt-2">
                                ₹${item.price}
                            </h5>

                            <div class="d-flex align-items-center gap-2 mt-3">

                                <button
                                    class="btn btn-outline-secondary"
                                    onclick="changeQty(${item.id},-1)">

                                    -

                                </button>

                                <span id="qty${item.id}">
                                    0
                                </span>

                                <button
                                    class="btn btn-outline-secondary"
                                    onclick="changeQty(${item.id},1)">

                                    +

                                </button>

                                <button
                                    class="btn btn-success ms-auto"
                                    onclick="addToCart(${item.id})">

                                    Add

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    container.innerHTML = html;

}

renderMenu();


// ======================================
// Search
// ======================================

const search =
    document.getElementById("menuSearch");

if (search) {

    search.addEventListener("keyup", function () {

        const txt =
            this.value.toLowerCase();

        filtered = menuItems.filter(item =>

            item.name.toLowerCase().includes(txt) ||

            item.category.toLowerCase().includes(txt)

        );

        renderMenu();

    });

}


// ======================================
// Quantity
// ======================================

const qty = {};

function changeQty(id, value) {

    qty[id] = (qty[id] || 0) + value;

    if (qty[id] < 0)
        qty[id] = 0;

    const span =
        document.getElementById("qty" + id);

    if (span)
        span.innerText = qty[id];

}


// ======================================
// Cart
// ======================================

function addToCart(id) {

    const item =
        menuItems.find(x => x.id === id);

    if (!item) return;

    const quantity =
        qty[id] > 0 ? qty[id] : 1;

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existing =
        cart.find(p => p.id === item.id && p.restaurantId === restaurant.id);

    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({

            ...item,

            restaurantId: restaurant.id,

            restaurantName: restaurant.name,

            quantity

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

    alert(`${item.name} added to cart`);

}


// ======================================
// WISHLIST
// ======================================

function toggleWishlist(id) {

    const item = menuItems.find(x => x.id === id);

    if (!item) {
        console.error("Wishlist item not found:", id);
        return;
    }

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const existingIndex =
        wishlist.findIndex(x => x.id === item.id);

    if (existingIndex !== -1) {

        // Remove from wishlist
        wishlist.splice(existingIndex, 1);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert(`${item.name} removed from wishlist`);

    } else {

        // Add to wishlist
        wishlist.push({

            ...item,

            restaurantId: restaurant.id,

            restaurantName: restaurant.name,

            restaurantCuisine: restaurant.cuisine,

            restaurantRating: restaurant.rating,

            restaurantImage: restaurant.image

        });

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert(`${item.name} added to wishlist`);

    }

    updateWishlistCount();
}


// ======================================
// WISHLIST COUNT
// ======================================

function updateWishlistCount() {

    const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const count = wishlist.length;

    const wishlistCount =
        document.getElementById("wishlistCount");

    if (wishlistCount) {
        wishlistCount.innerText = count;
    }

}


// Initial wishlist count
updateWishlistCount();


// ======================================
// Floating Cart
// ======================================

function updateCart() {



    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const totalQty =
        cart.reduce((sum, item) => sum + item.quantity, 0);

    const topBadge =
        document.getElementById("cartCount");

    const badge =
document.getElementById("floatingCount");

    if (topBadge)
        topBadge.innerText = totalQty;

    if (badge)
        badge.innerText = totalQty;
}


function goToCart() {
    window.location.href = "/cart/";
}
