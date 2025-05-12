let currentIndex = 0;
const images = document.querySelectorAll('#carousel img');
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];


const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const menuBtn = document.getElementById('menu-btn');
const menuSidebar = document.getElementById('menu-sidebar');
const closeMenuBtn = document.getElementById('close-menu-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

const products = [
    { id: 1, name: 'HUMBLE IN VICTORY', price: '$65.00', mainImg: 'humbleinvictory.webp', category: 'hoodies' },
    { id: 2, name: 'EIGHT DENIM PANTS', price: '$45.00', mainImg: 'eightdenimpant.webp', category: 'pants' },
    { id: 3, name: 'LUCAS - STRAIGHT', price: '$50.00', mainImg: 'lucaspant1.webp', category: 'pants' },
    { id: 4, name: 'DMX TRIBUTE', price: '$55.00', mainImg: 'dmxtribute1.webp', category: 'sweatshirts' },
    { id: 5, name: 'SKULL', price: '$70.00', mainImg: 'skulltee.webp', category: 'shirts' },
    { id: 6, name: 'VICTORY RUN', price: '$40.00', mainImg: 'victoryruntee.webp', category: 'shirts' },
    { id: 7, name: 'HUNGER', price: '$75.00', mainImg: 'hunger.webp', category: 'hoodies' }
];

function renderProducts(filterCategory = "all") {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    const filteredProducts = products.filter(
        (product) => filterCategory === "all" || product.category === filterCategory
    );

    filteredProducts.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        productItem.innerHTML = `
            <img src="./images/${product.mainImg}" alt="${product.name}" />
            <h4>${product.name}</h4>
            <p>${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productItem);
    });
}


function filterProducts(category) {
    renderProducts(category);
}


renderProducts();


function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <p>${item.name}</p>
                <p>${item.price}</p>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += parseFloat(item.price.replace('$', '')); 
        document.getElementById('checkout-btn').addEventListener('click', function() {
        window.location.href = 'checkout.html';
        });
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem('cartItems', JSON.stringify(cart));
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

clearCartBtn.addEventListener('click', function () {
    cart = [];
    localStorage.removeItem('cartItems');
    updateCart();
});


cartBtn.addEventListener('click', function () {
    cartSidebar.style.right = '0';
    cartBtn.style.display = 'none';
});

closeCartBtn.addEventListener('click', function () {
    cartSidebar.style.right = '-350px'; 
    cartBtn.style.display = 'block'; 
});


menuBtn.addEventListener('click', function () {
    menuSidebar.style.left = '0';
    menuBtn.style.display = 'none'; 
});

closeMenuBtn.addEventListener('click', function () {
    menuSidebar.style.left = '-250px';
    menuBtn.style.display = 'block'; 
});

function showNextImage() {
    images[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.remove('hidden');
}
setInterval(showNextImage, 3000);


document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.textContent = `Thank you for contacting us!`;
    document.body.appendChild(confirmation);
    setTimeout(() => confirmation.remove(), 2000);
    document.getElementById('contactForm').reset();
});

function displayProducts() {
    const productGallery = document.querySelector('.product-gallery');
    productGallery.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="./images/${product.mainImg}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGallery.appendChild(productCard);
    });
}

displayProducts();

updateCart();
