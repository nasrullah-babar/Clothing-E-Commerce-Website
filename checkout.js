document.addEventListener('DOMContentLoaded', function () {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const confirmPayBtn = document.querySelector('.confirm-pay-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const paymentForm = document.getElementById('payment-form');

    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;

    // Function to display the cart items on the checkout page
    function displayCheckoutItems() {
        checkoutItemsContainer.innerHTML = ''; // Clear any existing items
        total = 0; // Reset total before recalculating
        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('checkout-item');
            itemDiv.innerHTML = `
                <p>${item.name}</p>
                <p>${item.price}</p>
            `;
            checkoutItemsContainer.appendChild(itemDiv);
            total += parseFloat(item.price.replace('$', ''));
        });
        checkoutTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Function to handle confirm payment
    confirmPayBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Validate payment form
        if (paymentForm.checkValidity()) {
            alert("Payment successful!");

            // Clear cart from localStorage
            localStorage.removeItem('cartItems');

            // Redirect to homepage (index.html)
            window.location.href = 'index.html';
        } else {
            alert("Please fill in all fields correctly.");
        }
    });

    // Function to clear the cart
    clearCartBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to clear the cart?')) {
            localStorage.removeItem('cartItems');
            cartItems = [];
            displayCheckoutItems(); // Reset the checkout items and total
        }
    });

    // Display the checkout items on page load
    displayCheckoutItems();
    const menuBtn = document.getElementById('menu-btn');
    const menuSidebar = document.getElementById('menu-sidebar');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    // Display the checkout items on page load
    menuBtn.addEventListener('click', function () {
        menuSidebar.style.left = '0';
        menuBtn.style.display = 'none'; // Hide menu button
    });

    closeMenuBtn.addEventListener('click', function () {
        menuSidebar.style.left = '-250px';
        menuBtn.style.display = 'block'; // Show menu button
    });
});
