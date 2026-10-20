
// Store cart products
let cart = {};

// Select HTML elements
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Format price
function formatPrice(price) {
    return "Rs. " + price.toLocaleString("en-PK");
}

// Add product to cart
const addButtons = document.querySelectorAll(".add-button");

addButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        const id = button.dataset.id;
        const title = button.dataset.title;
        const price = Number(button.dataset.price);

        if (cart[id]) {
            cart[id].quantity++;
        } else {
            cart[id] = {
                title: title,
                price: price,
                quantity: 1
            };
        }

        updateCart();
    });
});

// Update cart count, products and total
function updateCart() {

    let count = 0;
    let total = 0;

    cartItems.innerHTML = "";

    for (let id in cart) {

        const product = cart[id];

        count = count + product.quantity;
        total = total + product.price * product.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h6>${product.title}</h6>
                    <p class="mb-0">
                        ${formatPrice(product.price)} each
                    </p>
                </div>

                <div class="quantity-controls">
                    <button type="button"
                        data-action="decrease"
                        data-id="${id}">−</button>

                    <span>${product.quantity}</span>

                    <button type="button"
                        data-action="increase"
                        data-id="${id}">+</button>
                </div>

                <strong>
                    ${formatPrice(product.price * product.quantity)}
                </strong>
            </div>
        `;
    }

    if (count === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    }

    cartCount.textContent = count;
    cartTotal.textContent = formatPrice(total);
}

// Increase or decrease quantity
cartItems.addEventListener("click", function (event) {

    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const id = button.dataset.id;
    const action = button.dataset.action;

    if (action === "increase") {
        cart[id].quantity++;
    } else if (action === "decrease") {
        cart[id].quantity--;

        if (cart[id].quantity === 0) {
            delete cart[id];
        }
    }

    updateCart();
});
