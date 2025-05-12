document.addEventListener('DOMContentLoaded', function () {
    // Sample product data
    const productData = [
        { id: 1, name: 'HUMBLE IN VICTORY', price: '$65.00', mainImg: 'humbleinvictory.webp', category: 'hoodies' },
        { id: 2, name: 'EIGHT DENIM PANTS', price: '$45.00', mainImg: 'eightdenimpant.webp', category: 'pants' },
        { id: 3, name: 'LUCAS - STRAIGHT', price: '$50.00', mainImg: 'lucaspant1.webp', category: 'pants' },
        { id: 4, name: 'DMX TRIBUTE', price: '$55.00', mainImg: 'dmxtribute1.webp', category: 'sweatshirts' },
        { id: 5, name: 'SKULL', price: '$70.00', mainImg: 'skulltee.webp', category: 't-shirts' },
        { id: 6, name: 'VICTORY RUN', price: '$40.00', mainImg: 'victoryruntee.webp', category: 't-shirts' },
        { id: 7, name: 'HUNGER', price: '$75.00', mainImg: 'hunger.webp', category: 'hoodies' },
        { id: 8, name: 'ELEVATION OF MIND', price: '$60.00', mainImg: 'elevationofmindhoodie.webp', category: 'pants' },
        { id: 9, name: 'SCARFACE', price: '$70.00', mainImg: 'scarfacetee.webp', category: 't-shirts' },
        { id: 10, name: 'ANARCHY', price: '$40.00', mainImg: 'anarchytee.webp', category: 't-shirts' },
        { id: 11, name: 'BLACK RHINESTONE', price: '$75.00', mainImg: 'blackrhinstone.webp', category: 'hoodies' },
        { id: 12, name: 'BROKE BUT NOT BROKEN', price: '$60.00', mainImg: 'broketee.webp', category: 'hoodies' }
    ];

 
    const productGallery = document.querySelector('.product-gallery');
    const filterBtn = document.getElementById('filter-btn');
    const categorySelect = document.getElementById('category');
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const menuBtn = document.getElementById('menu-btn');
    const menuSidebar = document.getElementById('menu-sidebar');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.dataset.productName; // Retrieve the product name from data attributes
            const productPrice = parseFloat(this.dataset.productPrice); // Get price from data attribute
            const productImage = this.dataset.productImage;
    
            // Get the cart items from localStorage
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
            // Check if the product already exists in the cart
            const existingProduct = cartItems.find(item => item.name === productName);
    
            if (existingProduct) {
                // If the product is already in the cart, increase the quantity
                existingProduct.quantity++;
            } else {
                // If it's a new product, add it to the cart
                cartItems.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
    
            // Save the updated cart items back to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
            // Optionally, show a confirmation message or update the cart UI
            alert(`${productName} has been added to your cart!`);
        });
    });
    // Retrieve the cart from localStorage, or initialize an empty cart if none exists
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let filteredProducts = productData;

    // Function to display the product cards
    function displayProducts(products) {
        productGallery.innerHTML = ''; // Clear current products
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.mainImg}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productGallery.appendChild(productCard);

            // Add the observer to each product card
            observeProductCard(productCard);
        });
    }

    // Set up Intersection Observer for product cards animation on scroll
    function observeProductCard(productCard) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show'); // Add 'show' class to trigger animation
                    observer.unobserve(entry.target); // Stop observing the element once it's in view
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the product card is in view
        observer.observe(productCard);
    }

    // Function to filter products by category
    filterBtn.addEventListener('click', function() {
        const category = categorySelect.value;
        filteredProducts = category === 'all' ? productData : productData.filter(p => p.category === category);
        displayProducts(filteredProducts);
    });

    // Function to add products to the cart
    window.addToCart = function(productId) {
        const product = productData.find(p => p.id === productId);
        cart.push(product);
        // Save the updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));
        updateCart();
    }

    // Function to update the cart sidebar with cart items
    function updateCart() {
        cartItems.innerHTML = ''; // Clear current cart items
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = ` 
                <p>${item.name}</p>
                <p>${item.price}</p>
            `;
            cartItems.appendChild(cartItem);
            total += parseFloat(item.price.replace('$', '')); // Update total price
        });
        cartTotal.textContent = `$${total.toFixed(2)}`; // Display total
        document.getElementById('checkout-btn').addEventListener('click', function() {
            // Redirect to the checkout page (make sure the URL is correct)
        window.location.href = 'checkout.html'; // Replace 'checkout.html' with the actual URL of your checkout page
        });
    }

    // Toggle the cart sidebar visibility
    cartBtn.addEventListener('click', function() {
        cartSidebar.style.right = '0'; // Open the cart sidebar
        cartBtn.style.display = 'none'; // Hide the cart button
    });

    closeCartBtn.addEventListener('click', function() {
        cartSidebar.style.right = '-350px'; // Close the cart sidebar
        cartBtn.style.display = 'block'; // Show the cart button
    });

    // Toggle the menu sidebar visibility
    menuBtn.addEventListener('click', function () {
        menuSidebar.style.left = '0';
        menuBtn.style.display = 'none'; // Hide menu button
    });

    closeMenuBtn.addEventListener('click', function () {
        menuSidebar.style.left = '-250px';
        menuBtn.style.display = 'block'; // Show menu button
    });

    // Function to clear the cart
    clearCartBtn.addEventListener('click', function() {
        cart = []; // Empty the cart array
        localStorage.removeItem('cartItems'); // Remove cart from localStorage
        updateCart(); // Update the cart UI
    });

    // Display initial products
    displayProducts(filteredProducts);

    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    
    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';  
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = 'block';  
        setTimeout(showSlides, 3000); // Change image every 3 seconds
    }

    showSlides(); // Initial call to start the slideshow

    // Initially update the cart based on `localStorage`
    updateCart();
});
