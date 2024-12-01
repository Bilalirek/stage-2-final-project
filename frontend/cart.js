function showCarts(carts) {
    let items = "";
    let totalPrice = 0;
    carts.forEach(cart => {
        const product = cart.attachedProduct;
        const itemTotal = product.Price * cart.Quantity;
        totalPrice += itemTotal;
        items += `
        <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${product.ImageLink}" alt="${product.ProductName}">
                </div>
                <div class="cart-item-details">
                    <p class="product-name">${product.ProductName}</p>
                    <p class="product-price">$${product.Price}</p>
                    <p class="quantity-text">Quantity:<span id="itemQuantity ">${cart.Quantity
            }</span></p>
                    <p class="total-price">$${(product.Price * cart.Quantity).toFixed(2)}</p>
                   <button onclick="removeitem(${cart.CartDetailID})" data-cart-id="${cart.CartDetailID}">Remove item</button>

                </div>
            </div>
    `;
    });

    document.getElementById("cart-summary").innerHTML = items;
    document.getElementById("CartTotal").textContent = `Total: $${totalPrice.toFixed(2)}`;
};

function loadCart() {
    const customerId = localStorage.getItem('customerId');
    axios
        .post("http://localhost:3000/cart/get-user-carts", { customerId })
        .then((response) => {
            showCarts(response.data.carts);
        })
        .catch((error) => console.error(error));
}

function ContinueShopping() {
    window.location = "http://localhost/myshop/index.html";
}

function removeitem(Cart) {
    axios
        .post("http://localhost:3000/cart/remove-from-cart", {
            Cart,
        })
        .then((response) => {
            window.location.href = "http://localhost/myshop/view-cart.html";
        })
        .catch((error) => console.error(error));
}
function checkOut() {
    const customerId = localStorage.getItem('customerId');

    if (!customerId) {
        alert('You need to log in to checkout.');
        return;
    }

    axios.post("http://localhost:3000/cart/checkout", { customerId })
        .then((response) => {
            if (response.data.success) {
                // Display a success message
                alert('Checkout successful! A confirmation email with your order details has been sent.');
                window.location.href = "http://localhost/myshop/index.html";
            } else {
                // Display the error message
                alert('Checkout failed: ' + response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error during checkout:', error);
            alert('An error occurred during checkout. ' + error?.response?.data?.message);
        });
}



window.onload = function () {
    loadCart();
};