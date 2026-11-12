const categories = [
    {
        title: "Refrigerators",
        subtitle: "Double door & frost-free",
        image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Washing Machines",
        subtitle: "Front load & top load",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaa0c8?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Air Conditioners",
        subtitle: "Energy efficient cooling",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Microwaves",
        subtitle: "Fast cooking & reheating",
        image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Vacuum Cleaners",
        subtitle: "Powerful home cleaning",
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Water Purifiers",
        subtitle: "Pure & safe drinking",
        image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Fans & Coolers",
        subtitle: "Beat the summer heat",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Kitchen Appliances",
        subtitle: "Mixers, toasters & more",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
    }
];

const products = [
    {
        brand: "Samsung",
        title: "8 Kg Fully Automatic Washing Machine",
        price: "₹24,999",
        oldPrice: "₹29,999",
        rating: "4.8",
        discount: "17% off",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaa0c8?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "LG",
        title: "1.5 Ton 5 Star Split AC",
        price: "₹39,999",
        oldPrice: "₹49,999",
        rating: "4.7",
        discount: "20% off",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Whirlpool",
        title: "300 L Frost-Free Refrigerator",
        price: "₹29,999",
        oldPrice: "₹35,999",
        rating: "4.6",
        discount: "16% off",
        image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Philips",
        title: "Air Purifier with HEPA Filter",
        price: "₹12,999",
        oldPrice: "₹15,999",
        rating: "4.9",
        discount: "18% off",
        image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Prestige",
        title: "20L Solo Microwave Oven",
        price: "₹8,499",
        oldPrice: "₹10,999",
        rating: "4.5",
        discount: "22% off",
        image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=800&q=80"
    },
    {
        brand: "Havells",
        title: "High Speed Mixer Grinder",
        price: "₹3,799",
        oldPrice: "₹4,999",
        rating: "4.4",
        discount: "24% off",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
    }
];

const categoryGrid = document.getElementById('categoryGrid');
const productsGrid = document.getElementById('productsGrid');

if (categoryGrid) {
    categoryGrid.innerHTML = categories.map(category => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="category-card h-100">
                <img src="${category.image}" alt="${category.title}">
                <div class="card-body">
                    <h5>${category.title}</h5>
                    <p>${category.subtitle}</p>
                </div>
            </div>
        </div>
    `).join('');
}

if (productsGrid) {
    productsGrid.innerHTML = products.map(product => `
        <div class="col-lg-4 col-md-6">
            <div class="product-card h-100">
                <img src="${product.image}" alt="${product.title}">
                <div class="card-body">
                    <span class="brand">${product.brand}</span>
                    <h5>${product.title}</h5>
                    <div class="price-row">
                        <span class="price">${product.price}</span>
                        <span class="old-price">${product.oldPrice}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-success">⭐ ${product.rating}</span>
                        <span class="badge bg-warning text-dark">${product.discount}</span>
                    </div>
                    <button class="btn btn-primary w-100">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}
