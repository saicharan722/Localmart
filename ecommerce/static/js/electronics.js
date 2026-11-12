const electronics = [

{
    brand: "Apple",
    title: "Premium Smartphone",
    price: "₹1,29,999",
    oldPrice: "₹1,39,999",
    rating: "4.9",
    discount: "10",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
},

{
    brand: "Samsung",
    title: "Android Flagship Phone",
    price: "₹1,19,999",
    oldPrice: "₹1,29,999",
    rating: "4.8",
    discount: "8",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
},

{
    brand: "Dell",
    title: "Business Laptop",
    price: "₹89,999",
    oldPrice: "₹99,999",
    rating: "4.7",
    discount: "10",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
},

{
    brand: "HP",
    title: "HP Pavilion Laptop",
    price: "₹74,999",
    oldPrice: "₹84,999",
    rating: "4.6",
    discount: "12",
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
},

{
    brand: "Sony",
    title: "Wireless Headphones",
    price: "₹24,999",
    oldPrice: "₹29,999",
    rating: "4.8",
    discount: "17",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
},

{
    brand: "LG",
    title: "Smart 4K TV",
    price: "₹59,999",
    oldPrice: "₹69,999",
    rating: "4.7",
    discount: "15",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80"
},

{
    brand: "Canon",
    title: "Mirrorless Camera",
    price: "₹67,999",
    oldPrice: "₹74,999",
    rating: "4.8",
    discount: "9",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
},

{
    brand: "Apple",
    title: "Smart Watch",
    price: "₹39,999",
    oldPrice: "₹45,999",
    rating: "4.9",
    discount: "13",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80"
}

];

const container = document.getElementById("electronicsProducts");

if (container) {

    let html = "";

    electronics.forEach(product => {

        html += `

        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

            <div class="card product-card border-0 shadow h-100">

                <div class="position-relative">

                    <img src="${product.image}"
                         class="card-img-top"
                         alt="${product.title}"
                         style="height:220px;object-fit:cover;">

                    <span class="badge bg-danger position-absolute top-0 start-0 m-2">
                        ${product.discount}% OFF
                    </span>

                    <button class="btn btn-light wishlist-btn position-absolute top-0 end-0 m-2">
                        <i class="bi bi-heart"></i>
                    </button>

                </div>

                <div class="card-body">

                    <small class="text-success fw-bold">
                        ${product.brand}
                    </small>

                    <h5 class="mt-2">
                        ${product.title}
                    </h5>

                    <p class="mb-2">
                        ⭐ ${product.rating}
                    </p>

                    <h4 class="text-danger">
                        ${product.price}
                    </h4>

                    <small class="text-muted text-decoration-line-through">
                        ${product.oldPrice}
                    </small>

                    <button class="btn btn-success w-100 mt-3">
                        <i class="bi bi-cart-plus"></i>
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>

        `;

    });

    container.innerHTML = html;

}