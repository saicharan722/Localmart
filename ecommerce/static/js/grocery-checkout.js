"use strict";

/*
    LocalMart Grocery Checkout

    Grocery Cart Key:
    localmartGroceryCart
*/

const GROCERY_CHECKOUT_CART_KEY = "localmartGroceryCart";

const GROCERY_GST_RATE = 0.05;


/* =========================================================
   GET GROCERY CART
========================================================= */

function getGroceryCheckoutCart() {

    try {

        const storedCart =
            localStorage.getItem(GROCERY_CHECKOUT_CART_KEY);

        if (!storedCart) {
            return [];
        }

        const cart = JSON.parse(storedCart);

        return Array.isArray(cart) ? cart : [];

    } catch (error) {

        console.error(
            "Grocery checkout cart error:",
            error
        );

        return [];

    }
}


/* =========================================================
   SAVE GROCERY CART
========================================================= */

function saveGroceryCheckoutCart(cart) {

    try {

        localStorage.setItem(
            GROCERY_CHECKOUT_CART_KEY,
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Unable to save Grocery Cart:",
            error
        );

    }

}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatGroceryPrice(amount) {

    return "₹" + Number(amount || 0).toFixed(2);

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeGroceryHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   RENDER GROCERY CHECKOUT ITEMS
========================================================= */

function renderGroceryCheckout() {

    const cart =
        getGroceryCheckoutCart();

    const itemsContainer =
        document.getElementById("checkoutItems");

    const subtotalElement =
        document.getElementById("checkoutSubtotal");

    const taxElement =
        document.getElementById("checkoutTax");

    const totalElement =
        document.getElementById("checkoutTotal");

    const payButton =
        document.getElementById("payButton");


    if (!itemsContainer) {

        console.error(
            "#checkoutItems not found"
        );

        return;

    }


    /* EMPTY CART */

    if (!cart.length) {

        itemsContainer.innerHTML = `

            <div class="text-center py-4">

                <i
                    class="bi bi-cart-x"
                    style="
                        font-size:48px;
                        color:#14a94a;
                    ">
                </i>

                <h6 class="fw-bold mt-3">
                    Your Grocery Cart is Empty
                </h6>

                <p class="text-muted small mb-3">
                    Add grocery products before checkout.
                </p>

                <a
                    href="/grocery/"
                    class="btn btn-success">

                    Continue Shopping

                </a>

            </div>

        `;


        if (subtotalElement) {
            subtotalElement.textContent = "₹0.00";
        }

        if (taxElement) {
            taxElement.textContent = "₹0.00";
        }

        if (totalElement) {
            totalElement.textContent = "₹0.00";
        }

        if (payButton) {
            payButton.disabled = true;
        }

        return;

    }


    let subtotal = 0;


    /* =====================================================
       BUILD PRODUCT LIST
    ===================================================== */

    itemsContainer.innerHTML = cart.map(function (item) {

        const price =
            Number(item.price || 0);

        const quantity =
            Number(item.quantity || 1);

        const itemTotal =
            price * quantity;

        subtotal += itemTotal;


        const image =
            item.image || "";


        return `

            <div
                class="grocery-checkout-item"
                style="
                    display:flex;
                    align-items:center;
                    gap:12px;
                    padding:12px 0;
                    border-bottom:1px solid #eeeeee;
                ">

                <div
                    style="
                        width:70px;
                        height:70px;
                        min-width:70px;
                        background:#f8f8f8;
                        border-radius:10px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        overflow:hidden;
                    ">

                    ${
                        image
                        ?
                        `
                        <img
                            src="${escapeGroceryHTML(image)}"
                            alt="${escapeGroceryHTML(item.name || "Product")}"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:contain;
                                padding:5px;
                            "
                            onerror="
                                this.style.display='none';
                            "
                        >
                        `
                        :
                        `
                        <i
                            class="bi bi-image text-muted"
                            style="font-size:25px;">
                        </i>
                        `
                    }

                </div>


                <div
                    style="
                        flex:1;
                        min-width:0;
                    ">

                    <div
                        style="
                            font-size:14px;
                            font-weight:600;
                            line-height:1.35;
                        ">

                        ${escapeGroceryHTML(
                            item.name || "Grocery Product"
                        )}

                    </div>


                    <div
                        style="
                            font-size:12px;
                            color:#777;
                            margin-top:3px;
                        ">

                        ${escapeGroceryHTML(
                            item.unit || ""
                        )}

                    </div>


                    <div
                        style="
                            font-size:12px;
                            color:#666;
                            margin-top:4px;
                        ">

                        Qty: ${quantity}

                    </div>

                </div>


                <div
                    style="
                        font-size:14px;
                        font-weight:700;
                        white-space:nowrap;
                    ">

                    ${formatGroceryPrice(itemTotal)}

                </div>

            </div>

        `;

    }).join("");


    /* =====================================================
       GST
    ===================================================== */

    const gst =
        subtotal * GROCERY_GST_RATE;


    /* =====================================================
       TOTAL
    ===================================================== */

    const total =
        subtotal + gst;


    if (subtotalElement) {

        subtotalElement.textContent =
            formatGroceryPrice(subtotal);

    }


    if (taxElement) {

        taxElement.textContent =
            formatGroceryPrice(gst);

    }


    if (totalElement) {

        totalElement.textContent =
            formatGroceryPrice(total);

    }


    if (payButton) {

        payButton.disabled = false;

    }


    console.log(
        "Grocery Checkout Items:",
        cart
    );

    console.log(
        "Grocery Subtotal:",
        subtotal
    );

    console.log(
        "Grocery GST:",
        gst
    );

    console.log(
        "Grocery Total:",
        total
    );

}


/* =========================================================
   GET CHECKOUT TOTAL
========================================================= */

function getGroceryCheckoutTotal() {

    const cart =
        getGroceryCheckoutCart();

    let subtotal = 0;


    cart.forEach(function (item) {

        const price =
            Number(item.price || 0);

        const quantity =
            Number(item.quantity || 1);

        subtotal +=
            price * quantity;

    });


    const gst =
        subtotal * GROCERY_GST_RATE;


    return {
        subtotal: subtotal,
        gst: gst,
        total: subtotal + gst
    };

}


/* =========================================================
   VALIDATE CUSTOMER DETAILS
========================================================= */

function validateGroceryCustomerDetails() {

    const name =
        document.getElementById("customerName");

    const email =
        document.getElementById("customerEmail");

    const phone =
        document.getElementById("customerPhone");

    const address =
        document.getElementById("customerAddress");


    if (!name || !email || !phone || !address) {

        alert(
            "Please complete the delivery details."
        );

        return false;

    }


    if (!name.value.trim()) {

        alert(
            "Please enter your full name."
        );

        name.focus();

        return false;

    }


    if (!email.value.trim()) {

        alert(
            "Please enter your email."
        );

        email.focus();

        return false;

    }


    if (!phone.value.trim()) {

        alert(
            "Please enter your phone number."
        );

        phone.focus();

        return false;

    }


    if (!address.value.trim()) {

        alert(
            "Please enter your delivery address."
        );

        address.focus();

        return false;

    }


    return true;

}


/* =========================================================
   CREATE RAZORPAY ORDER
========================================================= */

async function createGroceryRazorpayOrder() {

    const cart =
        getGroceryCheckoutCart();


    if (!cart.length) {

        alert(
            "Your Grocery Cart is empty."
        );

        return;

    }


    if (!validateGroceryCustomerDetails()) {

        return;

    }


    const totals =
        getGroceryCheckoutTotal();


    const customerName =
        document
            .getElementById("customerName")
            .value
            .trim();


    const customerEmail =
        document
            .getElementById("customerEmail")
            .value
            .trim();


    const customerPhone =
        document
            .getElementById("customerPhone")
            .value
            .trim();


    const customerAddress =
        document
            .getElementById("customerAddress")
            .value
            .trim();

    const deliveryPin = window.LOCALMART_CHECKOUT_DELIVERY;
    if (!deliveryPin || deliveryPin.address !== customerAddress) {
        alert("Locate your delivery address and confirm the exact map pin before payment.");
        return;
    }


    const payButton =
        document.getElementById("payButton");


    /* Disable button while processing */

    if (payButton) {

        payButton.disabled = true;

        payButton.innerHTML = `

            <span
                class="spinner-border spinner-border-sm me-2">
            </span>

            Processing...

        `;

    }


    try {

        /*
            Send the Grocery Cart to Django.
        */

        const response =
            await fetch(
                "/api/create-razorpay-order/",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "X-CSRFToken":
                            getGroceryCSRFToken()

                    },

                    body: JSON.stringify({

                        cart: cart,

                        customer_name:
                            customerName,

                        customer_email:
                            customerEmail,

                        customer_phone:
                            customerPhone,

                        customer_address:
                            customerAddress,

                        customer_latitude:
                            deliveryPin.latitude,

                        customer_longitude:
                            deliveryPin.longitude,

                        delivery_location_confirmed:
                            true,

                        cart_type:
                            "grocery"

                    })

                }
            );


        const data =
            await response.json();


        console.log(
            "Razorpay order response:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Unable to create payment order."
            );

        }


        if (!data.order_id) {

            throw new Error(
                "Razorpay Order ID was not returned."
            );

        }


        openGroceryRazorpay(
            data,
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            totals
        );


    } catch (error) {

        console.error(
            "Grocery payment error:",
            error
        );


        alert(
            error.message ||
            "Something went wrong while starting payment."
        );


        resetGroceryPayButton();

    }

}


/* =========================================================
   OPEN RAZORPAY
========================================================= */

function openGroceryRazorpay(
    orderData,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    totals
) {

    if (
        typeof Razorpay === "undefined"
    ) {

        alert(
            "Razorpay Checkout could not be loaded."
        );

        resetGroceryPayButton();

        return;

    }


    const options = {

        key:
            typeof razorpayKey !== "undefined"
            ? razorpayKey
            : "",


        amount:
            orderData.amount ||
            Math.round(totals.total * 100),


        currency:
            orderData.currency || "INR",


        name:
            "LocalMart",


        description:
            "LocalMart Grocery Order",


        order_id:
            orderData.order_id,


        prefill: {

            name:
                customerName,

            email:
                customerEmail,

            contact:
                customerPhone

        },


        notes: {

            order_type:
                "Grocery",

            delivery_address:
                customerAddress

        },


        theme: {

            color:
                "#14a94a"

        },


        handler:
            function (paymentResponse) {

                verifyGroceryPayment(
                    paymentResponse,
                    customerName,
                    customerEmail,
                    customerPhone,
                    customerAddress
                );

            },


        modal: {

            ondismiss:
                function () {

                    resetGroceryPayButton();

                }

        }

    };


    const razorpay =
        new Razorpay(options);


    razorpay.on(
        "payment.failed",
        function (response) {

            console.error(
                "Razorpay payment failed:",
                response
            );


            alert(
                "Payment failed. Please try again."
            );


            resetGroceryPayButton();

        }
    );


    razorpay.open();

}


/* =========================================================
   VERIFY PAYMENT
========================================================= */

async function verifyGroceryPayment(
    paymentResponse,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress
) {

    try {

        const response =
            await fetch(
                "/api/verify-payment/",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "X-CSRFToken":
                            getGroceryCSRFToken()

                    },

                    body: JSON.stringify({

                        razorpay_payment_id:
                            paymentResponse.razorpay_payment_id,

                        razorpay_order_id:
                            paymentResponse.razorpay_order_id,

                        razorpay_signature:
                            paymentResponse.razorpay_signature,

                        customer_name:
                            customerName,

                        customer_email:
                            customerEmail,

                        customer_phone:
                            customerPhone,

                        customer_address:
                            customerAddress,

                        order_type:
                            "grocery"

                    })

                }
            );


        const data =
            await response.json();


        console.log(
            "Payment verification:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Payment verification failed."
            );

        }


        /*
            Payment successful.
            Clear ONLY Grocery Cart.
        */

        localStorage.removeItem(
            GROCERY_CHECKOUT_CART_KEY
        );


        /*
            Notify other Grocery pages.
        */

        window.dispatchEvent(
            new Event("groceryCartUpdated")
        );


        /*
            Redirect to order success.
        */

        if (
            data.redirect_url
        ) {

            window.location.href =
                data.redirect_url;

            return;

        }


        window.location.href = data.order_id ? `/order/${encodeURIComponent(data.order_id)}/track/` : "/order-success/";


    } catch (error) {

        console.error(
            "Payment verification error:",
            error
        );


        alert(
            error.message ||
            "Payment verification failed."
        );


        resetGroceryPayButton();

    }

}


/* =========================================================
   GET CSRF TOKEN
========================================================= */

function getGroceryCSRFToken() {

    const cookieValue =
        document.cookie
            .split("; ")
            .find(
                row =>
                    row.startsWith("csrftoken=")
            );


    if (!cookieValue) {

        return "";

    }


    return decodeURIComponent(
        cookieValue.split("=")[1]
    );

}


/* =========================================================
   RESET PAY BUTTON
========================================================= */

function resetGroceryPayButton() {

    const payButton =
        document.getElementById("payButton");


    if (!payButton) {

        return;

    }


    payButton.disabled = false;


    payButton.innerHTML = `

        <i class="bi bi-shield-check me-2"></i>

        Pay Securely

    `;

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "LocalMart Grocery Checkout JS loaded"
        );

        console.log(
            "Grocery Cart Key:",
            GROCERY_CHECKOUT_CART_KEY
        );

        renderGroceryCheckout();


        const payButton =
            document.getElementById("payButton");


        if (payButton) {

            payButton.addEventListener(
                "click",
                createGroceryRazorpayOrder
            );

        }

    }
);


/* =========================================================
   UPDATE IF GROCERY CART CHANGES
========================================================= */

window.addEventListener(
    "groceryCartUpdated",
    function () {

        renderGroceryCheckout();

    }
);


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.getGroceryCheckoutCart =
    getGroceryCheckoutCart;

window.renderGroceryCheckout =
    renderGroceryCheckout;

window.getGroceryCheckoutTotal =
    getGroceryCheckoutTotal;

window.createGroceryRazorpayOrder =
    createGroceryRazorpayOrder;
