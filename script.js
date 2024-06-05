let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
    window.open('signup.html', '_blank');
};

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartContainer = document.querySelector('.shopping-cart');

    // Function to update the cart display
    const updateCartDisplay = () => {
        cartContainer.innerHTML = '';
        if(cart.length ===0){
            cartContainer.innerHTML = '<p class="empty-cart-message">Cart is empty</p>'
            return;
        }

        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartContainer.innerHTML += `
                <div class="box">
                    <i class="fa-solid fa-trash" data-name="${item.name}"></i>
                    <img src="${item.image}" alt="">
                    <div class="content">
                        <h3>${item.name}</h3>
                        <span class="price">NGN ${item.price}/-</span>
                        <span class="quantity">Qty: ${item.quantity}</span>
                    </div>
                </div>
            `;
        });

        cartContainer.innerHTML += `<div class="total">total: NGN ${total}/- </div><a href="payment.html" class="btn" id="pay-btn">Checkout</a>`;
    };

    // Function to add item to cart
    const addToCart = (name, price, image) => {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price: parseFloat(price), image, quantity: 1 });
        }

        updateCartDisplay();
    };

    // Event listener for add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            const image = button.getAttribute('data-image');

            addToCart(name, price, image);
        });
    });

    // Event listener for remove buttons
    cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-trash')) {
            const name = e.target.getAttribute('data-name');
            const itemIndex = cart.findIndex(item => item.name === name);
            if (itemIndex !== -1) {
                cart.splice(itemIndex, 1);
            }
            updateCartDisplay();
        }
    });
    // Initially display the cart as empty
    updateCartDisplay();
});
