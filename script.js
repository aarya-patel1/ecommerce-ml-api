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
document.getElementById("join-us-btn").addEventListener("click", function() {
  document.getElementById("auth-modal").style.display = "flex";
  document.getElementById("modal-title").textContent = "Login";
  document.getElementById("toggle-auth").innerHTML = "Don't have an account? <a href='#' id='show-signup'>Sign Up</a>";
});

document.getElementById("close-modal").addEventListener("click", function() {
  document.getElementById("auth-modal").style.display = "none";
});

document.addEventListener("click", function(event) {
  if (event.target.id === "auth-modal") {
      document.getElementById("auth-modal").style.display = "none";
  }
});

document.addEventListener("click", function(event) {
  if (event.target.id === "show-signup") {
      event.preventDefault();
      document.getElementById("modal-title").textContent = "Sign Up";
      document.getElementById("toggle-auth").innerHTML = "Already have an account? <a href='#' id='show-login'>Log in</a>";
  } else if (event.target.id === "show-login") {
      event.preventDefault();
      document.getElementById("modal-title").textContent = "Login";
      document.getElementById("toggle-auth").innerHTML = "Don't have an account? <a href='#' id='show-signup'>Sign Up</a>";
  }
});
// "See More" button functionality
const seeMoreBtn = document.querySelector('.see-more-btn');
const productGrid = document.querySelector('.product-grid');

seeMoreBtn.addEventListener('click', () => {
  const newProducts = [
    { image: 'https://i.pinimg.com/736x/40/97/67/409767c04787f0cdfe408c44aa74e2db.jpg', name: 'Oxidised Chandbali', price: 'Rs.156' },
    { image: 'https://img.ltwebstatic.com/images3_pi/2021/05/14/16209895197eef42136539c28be82b0436e26709e5_thumbnail_405x552.jpg', name: 'Black Ankle Strap Heels', price: 'Rs.500' },
    { image: 'https://parijanofficial.com/cdn/shop/products/IMG_0385.jpg?v=1675126132&width=540', name: 'Quarter Zip Sweater', price: 'Rs.2,500' },
    { image: 'https://i.pinimg.com/736x/32/e4/a5/32e4a5f5f2be9c6fb0f11a43be5523bb.jpg', name: 'Oversized T-Shirt', price: 'Rs.700' }
  ];

  newProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;

    productGrid.appendChild(productCard);
  });

  seeMoreBtn.style.display = 'none';
});

// Filter and Sort Functionality
const filterOptions = document.querySelectorAll('.filter-option');
const sortOptions = document.querySelectorAll('.sort-option');
const productCards = document.querySelectorAll('.product-card');

filterOptions.forEach(option => {
  option.addEventListener('click', () => {
    const filterValue = option.dataset.filter;
    productCards.forEach(card => {
      card.style.display = (filterValue === 'all' || card.classList.contains(filterValue)) ? 'block' : 'none';
    });
  });
});

sortOptions.forEach(option => {
  option.addEventListener('click', () => {
    const sortValue = option.dataset.sort;
    const sortedProducts = [...productCards].sort((a, b) => {
      const priceA = parseFloat(a.querySelector('.price').textContent.replace('Rs.', ''));
      const priceB = parseFloat(b.querySelector('.price').textContent.replace('Rs.', ''));
      return sortValue === 'asc' ? priceA - priceB : priceB - priceA;
    });

    sortedProducts.forEach(card => productGrid.appendChild(card));
  });
});

// Authentication Modal
const authModal = document.getElementById('authModal');
const authButton = document.getElementById('authButton');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');

authButton.addEventListener('click', () => {
  authModal.style.display = 'flex';
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
});

authModal.addEventListener('click', (e) => {
  if (e.target === authModal) authModal.style.display = 'none';
});

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

// Form Submission
['loginFormElement', 'signupFormElement'].forEach(id => {
  document.getElementById(id).addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(`${id} submitted`);
  });
});

// Navbar Toggle
const nav = document.querySelector('nav ul');
document.querySelector('.logo').addEventListener('click', () => {
  nav.classList.toggle('active');
});

const API_URL = "https://ecommerce-ml-api-2.onrender.com"; // Make sure this is correct
async function getChatbotResponse(message) {
  try {
    console.log("Sending message:", message);
    
    const response = await fetch(`${API_BASE_URL}/predict_chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return errorData.response || "Our chatbot service is currently unavailable. Please try again later.";
    }

    const data = await response.json();
    console.log("Received response:", data);
    return data.response;
    
  } catch (error) {
    console.error("Network Error:", error);
    return "We're having trouble connecting to the chatbot. Please check your connection and try again.";
  }
}

function toggleChatbot() {
  const chatbot = document.getElementById("chatbot");
  chatbot.style.display = chatbot.style.display === "none" ? "block" : "none";
}

async function sendMessage() {
  
  const userInput = document.getElementById('userInput').value;
  const messagesDiv = document.querySelector('.messages');

  if (!userInput) return;



  // Display user message
  messagesDiv.innerHTML += `<div>User: ${userInput}</div>`;

  // Get response from chatbot API
  const botResponse = await getChatbotResponse(userInput);
  
  // Display bot response
  messagesDiv.innerHTML += `<div>Bot: ${botResponse}</div>`;
  
  document.getElementById('userInput').value = ''; // Clear input
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
}



function fetchRecommendations() {
  fetch("/recommend")
  .then(response => response.json())
  .then(data => {
      let recommendationsDiv = document.getElementById("recommendations");
      recommendationsDiv.innerHTML = `<h3>Recommended:</h3><ul>${data.recommendations.map(item => `<li>${item}</li>`).join('')}</ul>`;
  });
}
function checkFraud() {
  let transactionDetails = document.getElementById("transaction-details").value;

  fetch("/fraud-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transaction: transactionDetails })
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById("fraud-result").innerText = data.fraud 
          ? "🚨 Fraud detected!" 
          : "✅ Transaction is safe.";
  });
}
// Handle Login & Signup
document.getElementById("auth-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;
  const modalTitle = document.getElementById("modal-title").textContent;

  if (modalTitle === "Sign Up") {
      if (localStorage.getItem(email)) {
          alert("User already exists!");
      } else {
          localStorage.setItem(email, password);
          alert("Signup successful! Please log in.");
          document.getElementById("modal-title").textContent = "Login";
      }
  } else {
      const storedPassword = localStorage.getItem(email);
      if (storedPassword && storedPassword === password) {
          alert("Login successful!");
          localStorage.setItem("loggedInUser", email);
          document.getElementById("auth-modal").style.display = "none";
      } else {
          alert("Invalid email or password.");
      }
  }
});

