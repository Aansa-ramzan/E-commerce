document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Retrieve the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const action = urlParams.get('action');

    // If action is 'buyNow' and productId is present, add the product to the cart
    if (action === 'buyNow' && productId) {
        handleBuyNow(productId);
    }

    // Function to handle 'Buy Now' action
    function handleBuyNow(productId) {
        // Define the available products (this could be dynamic in a real app)
        const products = [
            { id: '1', name: 'Black & White Sneakers', price: 3300 },
            { id: '2', name: 'Black Sneakers', price: 3100 },
            { id: '3', name: 'Black Sneakers', price: 3600 },
            { id: '4', name: 'White Sneakers', price: 3300 },
            { id: '5', name: 'Off-White Sneakers', price: 3500 },
            { id: '6', name: 'Black & Off-White Sneakers', price: 3300 },
            { id: '7', name: 'White Sneakers', price: 3300 },
            { id: '8', name: 'White & Green Sneakers', price: 3400 },
            { id: '9', name: 'Black Sneakers', price: 3800 },
            { id: '10', name: 'White & Black Sneakers', price: 3800 },
            { id: '11', name: 'White & Black Sneakers', price: 3500 },
            { id: '12', name: 'Black Sneakers', price: 3800 }
        ];

        // Find the product by productId
        const product = products.find(p => p.id === productId);

        if (product) {
            // Add product to the cart
            addToCart(product);
        } else {
            console.error('Product not found');
        }
    }

    // Function to add product to the cart
    function addToCart(product) {
        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // If the product exists, increase the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart
            product.quantity = 1; // Set initial quantity
            cart.push(product);
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count (optional: if you have a cart icon or counter in the header)
        updateCartCount();

        // Redirect to cart page
        window.location.href = 'cart.html';
    }

    // Function to update cart count (e.g., in the navbar)
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.innerText = totalItems;
        }
    }

    // Function to display cart items on the page
    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';  // Clear existing cart items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            document.getElementById('total-price').innerText = 'Rs. 0';
            return;
        }

        let totalPrice = 0;

        // Display each cart item with checkbox for checkout
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Rs. ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <label>
                    <input type="checkbox" class="select-for-checkout" data-id="${item.id}" /> Select for Checkout
                </label>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;  // Calculate total price
        });

        // Display the total price
        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.innerText = `Rs. ${totalPrice}`;
        }
    }

    // Call displayCartItems on page load
    displayCartItems();

    // Handle checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        // Get all selected checkboxes
        const selectedItems = Array.from(document.querySelectorAll('.select-for-checkout:checked'));
        
        if (selectedItems.length === 0) {
            alert("Please select at least one product to checkout.");
            return;
        }

        // Get the IDs of selected items
        const selectedIds = selectedItems.map(checkbox => checkbox.getAttribute('data-id'));

        // Filter out selected items from the cart (only keep checked items)
        const selectedCartItems = cart.filter(item => selectedIds.includes(item.id));

        // Save selected items to the 'order' array in localStorage
        localStorage.setItem('order', JSON.stringify(selectedCartItems));

        // Remove selected items from the cart (those that were checked)
        cart = cart.filter(item => !selectedIds.includes(item.id));

        // Update the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Re-display the updated cart items
        displayCartItems();

        // Update the cart count
        updateCartCount();

        // Optionally: Redirect to a checkout page or show confirmation
        alert("Checkout successful! Selected items have been removed from the cart.");
        window.location.href = 'order-confirmation.html'; // Redirect to order confirmation page
    });

    // Remove item from cart functionality
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function (event) {
            if (event.target && event.target.classList.contains('remove-btn')) {
                const productId = event.target.getAttribute('data-id');
                removeFromCart(productId);
            }
        });
    }

    // Function to remove product from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);  // Remove the item
        localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
        displayCartItems();  // Re-render cart
        updateCartCount();  // Update cart count
    }
});
