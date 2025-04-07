// Sticky header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});



// Cart functionality
const cartContainer = document.querySelector('.cart-container');
const cartCount = document.querySelector('.cart-count');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Update cart count display
function updateCartCount() {
  cartCount.textContent = cartItems.length;
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const product = {
      name: productCard.querySelector('h3').textContent,
      price: productCard.querySelector('.price').textContent,
      image: productCard.querySelector('img').src
    };
    
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    
    // Show added to cart notification
    const notification = document.getElementById('cart-notification');
    notification.textContent = 'Item added to cart';
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 2000);
  });
});

// Cart modal functionality
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');

// Open cart modal
cartContainer.addEventListener('click', () => {
  renderCartItems();
  cartModal.style.display = 'flex';
});

// Close cart modal
closeCart.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Close modal when clicking outside
cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = 'none';
  }
});

// Render cart items in modal
function renderCartItems() {
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    return;
  }

  let html = '';
  cartItems.forEach((item, index) => {
    html += `
      <div class="cart-item" style="display: flex; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px;">
        <div style="flex-grow: 1;">
          <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
          <p style="margin: 0; color: #ff6666;">${item.price}</p>
        </div>
        <button class="remove-item" data-index="${index}" style="background: none; border: none; color: #ff6666; cursor: pointer; font-size: 18px;">×</button>
      </div>
    `;
  });
  
  // Add subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + parseInt(item.price.replace(/[^0-9]/g, ''));
  }, 0);
  
  html += `
    <div style="margin-top: 20px; text-align: right;">
      <h3 style="margin: 0;">Subtotal: Rs.${subtotal}</h3>
    </div>
  `;
  
  cartItemsContainer.innerHTML = html;

  // Add event listeners to remove buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartCount();
      renderCartItems();
      
      // Show removal notification
      const notification = document.getElementById('cart-notification');
      notification.textContent = 'Item removed from cart';
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 2000);
    });
  });
}

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cartItems.length === 0) {
    alert('Your cart is empty');
    return;
  }
  
  alert('Proceeding to checkout!');
  // In a real implementation, this would redirect to checkout page
});

// Initialize cart count
updateCartCount();
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

//fraud detection
// Existing JS code here...

async function checkFraud() {
  const txnId = document.getElementById("txnInput").value.trim();
  const resultBox = document.getElementById("fraudResult");

  if (!txnId) {
    resultBox.textContent = "Please enter a transaction ID.";
    resultBox.style.color = "red";
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:5000/check_transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transaction_id: txnId }),
    });

    const data = await res.json();

    if (res.ok) {
      resultBox.textContent = data.is_fraud
        ? "\u26A0\uFE0F This transaction is fraudulent."
        : "\u2705 This transaction is safe.";
      resultBox.style.color = data.is_fraud ? "red" : "green";
    } else {
      resultBox.textContent = data.error || "Error checking transaction.";
      resultBox.style.color = "red";
    }
  } catch (err) {
    resultBox.textContent = "Server error.";
    resultBox.style.color = "red";
    console.error(err);
  }
}



//function fetchRecommendations() {
  //fetch("/recommend")
  //.then(response => response.json())
  //.then(data => {
    //  let recommendationsDiv = document.getElementById("recommendations");
      //recommendationsDiv.innerHTML = `<h3>Recommended:</h3><ul>${data.recommendations.map(item => `<li>${item}</li>`).join('')}</ul>`;
  //});
//}
//function checkFraud() {
  //let transactionDetails = document.getElementById("transaction-details").value;
//
  //fetch("/fraud-check", {
    //  method: "POST",
      //headers: { "Content-Type": "application/json" },
      //body: JSON.stringify({ transaction: transactionDetails })
  //})
  //.then(response => response.json())
  //.then(data => {
    //  document.getElementById("fraud-result").innerText = data.fraud 
      //    ? "🚨 Fraud detected!" 
        //  : "✅ Transaction is safe.";
  //});
//}
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

