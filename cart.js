document.addEventListener('DOMContentLoaded', () => {
    // Check if the cart count element exists
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) {
        console.error('Cart count element not found!');
        return;
    }

    // Log the cart count element to confirm
    console.log('Cart count element found:', cartCountElement);

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    if (addToCartButtons.length === 0) {
        console.error("No Add to Cart buttons found!");
        return;
    }

    // Add event listeners to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            const productName = event.target.getAttribute('data-name');
            const productPrice = event.target.getAttribute('data-price');

            console.log(`Adding product: ${productName}, ID: ${productId}, Price: ${productPrice}`);

            if (!productId || !productName || !productPrice) {
                console.error("Product information is missing from the button.");
                return;
            }

            const product = {
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                quantity: 1,
            };

            // Add the product to the cart
            addToCart(product);
        });
    });

    // Function to handle "Buy Now" functionality
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const action = urlParams.get('action');

    if (action === 'buyNow' && productId) {
        handleBuyNow(productId);
    }

    // Function to handle the Buy Now action
    function handleBuyNow(productId) {
        // Define all available products
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

        // Find the product by ID
        const product = products.find(p => p.id === productId);
        if (product) {
            addToCart(product);
            // Redirect to the cart page after adding the product to the cart
            setTimeout(() => {
                window.location.href = 'cart.html';  // Redirect to cart page
            }, 500); // Delay to ensure cart is updated before redirect
        } else {
            console.error('Product not found');
        }
    }

    // Function to add product to cart
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Log the cart before adding the product
        console.log('Cart before adding:', cart);

        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(product);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Log the updated cart
        console.log('Cart after adding:', cart);

        // Update cart count after adding the product
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }

    // Function to update the cart count
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        console.log('Retrieved cart from localStorage:', cart);

        // Calculate the total number of items in the cart
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        console.log('Total items in cart:', totalItems);

        // Update the cart count in the navbar
        if (cartCountElement) {
            console.log('Updating cart count element:', cartCountElement);
            cartCountElement.textContent = totalItems;
        }
    }

    // Initial call to update cart count when the page is loaded
    updateCartCount();
});