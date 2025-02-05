document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the checked-out items from localStorage (not the cart)
    let order = JSON.parse(localStorage.getItem('order')) || [];

    if (order.length === 0) {
        document.getElementById('order-details').innerHTML = '<p>No items found in your order.</p>';
        document.getElementById('total-amount').innerText = '0';
        return;
    }

    // Display order details
    const orderDetailsContainer = document.getElementById('order-details');
    let totalAmount = 0;

    order.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Rs. ${item.price} x ${item.quantity}</p>
            <p>Total: Rs. ${item.price * item.quantity}</p>
        `;
        orderDetailsContainer.appendChild(orderItem);

        // Update total amount
        totalAmount += item.price * item.quantity;
    });

    // Display total amount
    const totalAmountElement = document.getElementById('total-amount');
    if (totalAmountElement) {
        totalAmountElement.innerText = totalAmount;
    }

    // Go back to products page
    const goBackBtn = document.getElementById('go-back-btn');
    goBackBtn.addEventListener('click', () => {
        window.location.href = 'products-page-1.html';  // Redirect to product listing page
    });
});
