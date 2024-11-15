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
    // Select all product cards
    const products = document.querySelectorAll('.product-card-detailed');

    products.forEach(product => {
        // Check if the product matches the selected category
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'flex'; // Display matching products
        } else {
            product.style.display = 'none'; // Hide non-matching products
        }
    });
}

// Add event listeners to category buttons
document.querySelectorAll('#shop-categories button').forEach(button => {
    button.addEventListener('click', () => {
        // Pass the button's text content (category) to the filter function
        const category = button.textContent.toLowerCase();
        filterCategory(category);
    });
});


// Toggle Cart Modal
let cart = [];

// Add Product to Cart
function addToCart(productName, price, image) {
    const itemIndex = cart.findIndex(item => item.name === productName);
    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ name: productName, price: price, image: image, quantity: 1 });
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
    let cartTotal = 0;

    cart.forEach(item => {
        cartTotal += item.price * item.quantity;
        const listItem = document.createElement('div');
        listItem.classList.add('cart-item');
        
        // Image Element
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        
        // Info Section
        const info = document.createElement('div');
        info.classList.add('cart-item-info');
        info.innerHTML = `<strong>${item.name}</strong> - $${item.price.toFixed(2)} x ${item.quantity}`;
        
        // Controls Section
        const controls = document.createElement('div');
        controls.classList.add('cart-item-controls');
        
        const addButton = document.createElement('button');
        addButton.innerText = '+';
        addButton.onclick = () => updateQuantity(item.name, item.quantity + 1);
        
        const removeButton = document.createElement('button');
        removeButton.innerText = '-';
        removeButton.onclick = () => updateQuantity(item.name, item.quantity - 1);
        
        controls.appendChild(addButton);
        controls.appendChild(removeButton);
        
        // Append Sections
        listItem.appendChild(img);
        listItem.appendChild(info);
        listItem.appendChild(controls);
        cartItems.appendChild(listItem);
    });

    // Update Cart Count and Total
    cartTotalElement.innerHTML = `Total: $${cartTotal.toFixed(2)}`;
    cartCount.innerHTML = cart.reduce((total, item) => total + item.quantity, 0);
}

// Update Quantity of Items
function updateQuantity(productName, newQuantity) {
    const itemIndex = cart.findIndex(item => item.name === productName);
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1); // Remove item if quantity is zero
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        updateCart();
    }
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

// Toggle Cart Modal Display
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'none' ? 'block' : 'none';
}



// Close Cart Modal When Clicking Outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal');
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
};

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel .product");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
            slide.classList.add("active");
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}
