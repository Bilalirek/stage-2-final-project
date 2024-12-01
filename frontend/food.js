// products.js

// This function handles smooth scrolling to the top of the page
function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Fetch all products from the server when the page loads


// Fetch all products from the server
function fetchAllProducts() {
    axios.get("http://localhost:3000/products/food")
        .then(response => {
            if (response.data.success) {
                displayProducts(response.data.products);
                isLoggedin();
            } else {
                alert("No products found");
            }
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
}

// Display the list of products on the page
function displayProducts(products) {
    const productListDiv = document.querySelector(".product-list");
    productListDiv.innerHTML = ""; // Clear existing products

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        productDiv.innerHTML = `
        <img src="${product.ImageLink}" alt="${product.ProductName}">
        <h3>${product.ProductName}</h3>
        <p>${product.Description}</p>
        <p id="price-cart">Price: $${product.Price}</p>
        <button class="foodButtons" data-product-id="${product.ProductID}" onclick="addToCart(${product.ProductID})">Add to Cart</button>
    `;


        productListDiv.appendChild(productDiv);
    });
}

function searchFood() {
    let searchedfood = document.getElementById("searchFood").value.trim();

    if (!searchedfood) {
        alert('Please enter a search term.');
        return;
    }

    axios.post("http://localhost:3000/products/searchfood", { query: searchedfood })
        .then(response => {
            if (response.data.success) {
                displayProducts(response.data.products);
                isLoggedin();
            } else {
                alert("No products found");
            }
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
}

function signOut() {
    localStorage.removeItem('customerId');
    window.location.href = "http://localhost/myshop/food.html";
}
function updateAccount() {
    window.location.href = "http://localhost/myshop/login-signin.html";
}

function isLoggedin() {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
        document.getElementById("accountDiv").style.display = 'none'
    }

    else {
        const OrderNow = document.getElementsByClassName('OrderNow');
        const viewcart = document.getElementsByClassName('ViewCart');

        // Iterate over the HTMLCollection and hide each element
        for (let i = 0; i < OrderNow.length; i++) {
            OrderNow[i].style.display = 'none';
        }
        for (let i = 0; i < viewcart.length; i++) {
            viewcart[i].style.display = 'flex';
        }
        const productButtons = document.getElementsByClassName('foodButtons');

        for (let i = 0; i < productButtons.length; i++) {
            productButtons[i].style.display = 'inline';
        }
    }


}





// Add a product to the cart (you can expand this to handle the cart functionality)
function addToCart(ProductID) {
    const customerId = localStorage.getItem('customerId');
    axios
        .post("http://localhost:3000/products/add-to-cart", {
            customerId, quantity: 1, ProductID
        })
        .then((response) => {
            alert(`Product added to cart!`);
        })
        .catch((error) => console.error(error));
}

window.onload = function () {
    fetchAllProducts();
    isLoggedin();
};
