// Check if the #featured-carousel section exists before running the script
document.addEventListener("DOMContentLoaded", function () {
    const carouselSection = document.getElementById("featured-carousel");
    if (carouselSection) {
        // Array of image sources for the carousel
        const images = [
            "img/GRimg1.jpg",
            "img/GRimg2.jpg",
            "img/GRimg3.jpg"
        ];

        // Initial image index
        let currentIndex = 0;

        // Target only the carousel image inside #featured-carousel
        const carouselImage = carouselSection.querySelector("#carousel-image");

        // Function to change the image
        function changeImage() {
            currentIndex = (currentIndex + 1) % images.length;
            carouselImage.src = images[currentIndex];
        }

        // Change image every 6.9 seconds
        setInterval(changeImage, 6900);
    }
});
// Function to filter products by category
function filterCategory(category) {
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        
        // Show all products if category is "all"
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });

    // Update active class on buttons
    const buttons = document.querySelectorAll('#shop-categories button');
    buttons.forEach(button => {
        if (button.textContent.toLowerCase() === category || category === 'all') {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}
let cart = [];
let cartTotal = 0;

// Toggle Cart Modal
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Add Product to Cart
function addToCart(productName, price) {
    const itemIndex = cart.findIndex(item => item.name === productName);
    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Clear Cart Items List
    cartItems.innerHTML = '';

    // Update Cart Total
    cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotalElement.innerHTML = `Total: $${cartTotal.toFixed(2)}`;

    // Update Cart Count
    cartCount.innerHTML = cart.reduce((total, item) => total + item.quantity, 0);

    // Populate Cart Items
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(listItem);
    });
}

// Checkout (simple alert for now)
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        alert('Thank you for your purchase!');
        cart = [];
        updateCart();
        toggleCart();
    }
}
