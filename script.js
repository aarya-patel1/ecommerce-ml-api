// Sticky header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

// Cart functionality
const cartContainer = document.querySelector('.cart-container');
const cartCount = document.querySelector('.cart-count');
let cartItems = 0;

cartContainer.addEventListener('click', () => {
  cartItems++;
  cartCount.textContent = cartItems;
});

// "See More" button functionality
const seeMoreBtn = document.querySelector('.see-more-btn');
const productGrid = document.querySelector('.product-grid');

seeMoreBtn.addEventListener('click', () => {
  // Load additional products dynamically
  const newProducts = [
    {
      image: 'https://i.pinimg.com/736x/40/97/67/409767c04787f0cdfe408c44aa74e2db.jpg',
      name: 'Oxidised chandbali',
      price: 'Rs.156'
    },
    {
      image: 'https://img.ltwebstatic.com/images3_pi/2021/05/14/16209895197eef42136539c28be82b0436e26709e5_thumbnail_405x552.jpg',
      name: 'Black Ankle Strap heels          ',
      price: 'Rs.500'
    },
    {
      image: 'https://parijanofficial.com/cdn/shop/products/IMG_0385.jpg?v=1675126132&width=540',
      name: 'Quarter Zip Sweater           ',
      price: 'Rs.2,500'
    },
    {
      image: 'https://i.pinimg.com/736x/32/e4/a5/32e4a5f5f2be9c6fb0f11a43be5523bb.jpg',
      name: "oversized t-shirt            ",
      price: 'Rs.700'
    }
    
    
  ];

  newProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;

    const productName = document.createElement('h3');
    productName.textContent = product.name;

    const productPrice = document.createElement('p');
    productPrice.classList.add('price');
    productPrice.textContent = product.price;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('add-to-cart');
    addToCartBtn.textContent = 'Add to Cart';

    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartBtn);

    productGrid.appendChild(productCard);
  });

  seeMoreBtn.style.display = 'none';
});

// Filter and sort functionality
const filterOptions = document.querySelectorAll('.filter-option');
const sortOptions = document.querySelectorAll('.sort-option');
const productCards = document.querySelectorAll('.product-card');

filterOptions.forEach(option => {
  option.addEventListener('click', () => {
    const filterValue = option.dataset.filter;
    productCards.forEach(card => {
      if (filterValue === 'all' || card.classList.contains(filterValue)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

sortOptions.forEach(option => {
  option.addEventListener('click', () => {
    const sortValue = option.dataset.sort;
    const sortedProducts = Array.from(productCards).sort((a, b) => {
      const priceA = parseFloat(a.querySelector('.price').textContent.slice(1));
      const priceB = parseFloat(b.querySelector('.price').textContent.slice(1));
      return sortValue === 'asc' ? priceA - priceB : priceB - priceA;
    });

    sortedProducts.forEach(card => {
      productGrid.appendChild(card);
    });
  });
});

const authModal = document.getElementById('authModal');
const authButton = document.getElementById('authButton');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');

// Show/Hide Modal
authButton.addEventListener('click', () => {
    authModal.style.display = 'flex';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});

// Close modal when clicking outside
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

// Switch between login and signup forms
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Form submission handling
document.getElementById('loginFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login submitted');
});

document.getElementById('signupFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup submitted');
});
const nav = document.querySelector('nav ul');
document.querySelector('.logo').addEventListener('click', () => {
  nav.classList.toggle('active');
});
