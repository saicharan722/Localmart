// ======================================
// WISHLIST PAGE
// ======================================

document.addEventListener("DOMContentLoaded", function () {
    renderWishlist();
    updateWishlistCount();
});

function getWishlistItems() {
    try {
        const primary = JSON.parse(localStorage.getItem("wishlist"));
        if (Array.isArray(primary)) return primary;
        const legacy = JSON.parse(localStorage.getItem("localmartWishlist"));
        return Array.isArray(legacy) ? legacy : [];
    } catch (error) {
        return [];
    }
}

function saveWishlistItems(items) {
    const data = Array.isArray(items) ? items : [];
    localStorage.setItem("wishlist", JSON.stringify(data));
    localStorage.setItem("localmartWishlist", JSON.stringify(data));
}

function renderWishlist() {
    const container = document.getElementById("wishlistContainer");
    if (!container) return;

    const wishlist = getWishlistItems();

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-heart fs-1 text-danger"></i>
                <h3 class="fw-bold mt-3">Your Wishlist is Empty</h3>
                <p class="text-muted">Save your favourite grocery essentials and order them anytime.</p>
                <a href="/" class="btn btn-success rounded-pill px-4">
                    <i class="bi bi-arrow-left me-2"></i>Back to Home
                </a>
            </div>
        `;
        return;
    }

    let html = "";

    wishlist.forEach(function (item, index) {
        const productName = item.name || "Product";
        const productCategory = item.category || "Grocery";
        const productPrice = item.price ? `₹${item.price}` : "Price on request";
        const productImage = item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";

        html += `
            <div class="card shadow-sm border-0 mb-4">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img
                            src="${productImage}"
                            class="img-fluid rounded-start wishlist-image"
                            alt="${productName}"
                            style="width:100%; height:220px; object-fit:cover;"
                            onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'"
                        >
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h4 class="fw-bold">${productName}</h4>
                                    <p class="text-muted mb-2">${productCategory}</p>
                                </div>
                                <button class="btn btn-outline-danger" onclick="removeFromWishlist(${index})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>

                            <div class="mb-2">
                                <span class="badge bg-success-subtle text-success-emphasis">In stock</span>
                            </div>

                            <div class="mb-2">
                                <strong>${productPrice}</strong>
                            </div>

                            ${item.description ? `<p class="text-muted">${item.description}</p>` : ""}

                            <div class="d-flex gap-2 flex-wrap mt-3">
                                <button class="btn btn-success" onclick="addWishlistToCart(${index})">
                                    <i class="bi bi-cart-plus me-1"></i>Add to Cart
                                </button>
                                <a href="/grocery/" class="btn btn-outline-success">Continue Shopping</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function removeFromWishlist(index) {
    let wishlist = getWishlistItems();
    if (!wishlist[index]) return;

    wishlist.splice(index, 1);
    saveWishlistItems(wishlist);
    renderWishlist();
    updateWishlistCount();
}

function addWishlistToCart(index) {
    let wishlist = getWishlistItems();
    const item = wishlist[index];
    if (!item) return;

    const cartItems = JSON.parse(localStorage.getItem("cart")) || JSON.parse(localStorage.getItem("localmartCart")) || [];
    const existing = cartItems.find(existingItem => existingItem.id === item.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cartItems.push({
            ...item,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("localmartCart", JSON.stringify(cartItems));
    alert(`${item.name} added to cart`);
}

function updateWishlistCount() {
    const wishlist = getWishlistItems();
    const element = document.getElementById("wishlistCount");
    if (element) {
        element.innerText = wishlist.length;
    }
}