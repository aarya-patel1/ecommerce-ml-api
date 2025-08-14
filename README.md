# AI-Powered E-Commerce Platform

This project is a **mini AI-powered online store** that integrates multiple Machine Learning features, including:
- **Chatbot** for customer interaction
- **Fraud Detection** for secure transactions
- **Product Recommendation System** for personalized shopping
- Basic **frontend interface** for user interaction
- **Flask API** backend for ML model serving

---

## 🚀 Features

### 1. AI Chatbot
- Handles FAQs from a CSV (`faq.csv`)
- Uses a trained NLP model (`chatbot_model.pkl`)
- Accessible via the frontend chat widget

### 2. Fraud Detection
- Predicts fraudulent transactions using transaction data
- Model trained from `fraud_data.csv`
- Integrated into checkout process

### 3. Product Recommendations
- Hybrid recommendation system (`hybrid_recommend.pkl`)
- Suggests items based on user history and product similarity

### 4. Full-Stack Integration
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Flask API (`app.py`)
- **Database:** MySQL (example schema in `ecommerce_users.sql`)

---

## 📂 Project Structure
.
├── app.py # Main Flask API entry point
├── chatbot.py # Chatbot logic
├── checkout_integration.py # Checkout flow + fraud detection integration
├── fraud_detection_service.py # Fraud detection logic
├── save_model.py # Model saving utility
├── chatbot.ipynb # Chatbot model training
├── fraud_detection.ipynb # Fraud detection model training
├── recommedations.ipynb # Recommendation model training
├── chatbot_model.pkl
├── fraud_detection_model.pkl
├── hybrid_recommend.pkl
├── ecommerce_dataset.csv
├── fraud_data.csv
├── faq.csv
├── ecommerce_users.sql
├── index.html
├── styles.css
├── script.js
├── script_fixed.js
├── test_chatbot.py
├── test_fraud_detection.py
├── requirements.txt
└── package.json



---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/aarya-patel1/ecommerce-ml-api.git
cd ecommerce-ml-api

📊 Machine Learning Models
Model	File	Description
Chatbot	chatbot_model.pkl	NLP model trained on FAQ data
Fraud Detection	fraud_detection_model.pkl	Binary classifier for fraud prediction
Recommendations	hybrid_recommend.pkl	Suggests products

📌 API Endpoints
Method	Endpoint	Description
POST	/chatbot	Send message to chatbot
POST	/fraud-detect	Check transaction for fraud
GET	/recommendations/<user>	Get product recommendations

🛠 Tech Stack

Frontend: HTML, CSS, JavaScript
Backend: Python (Flask)
Database: MySQL
ML Models: Scikit-learn, Pandas, NumPy

👩‍💻 Author

Aarya Patel



