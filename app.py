from flask import Flask, request,  render_template,jsonify, redirect, url_for, flash
from flask_cors import CORS
import pickle
import pandas as pd
from difflib import get_close_matches
import re
from fuzzywuzzy import fuzz
from flask_mysqldb import MySQL
import MySQLdb.cursors


app = Flask(__name__)

# Load ML models for other services
try:
    fraud_model = pickle.load(open("fraud_detection.pkl", "rb"))
    recommend_model = pickle.load(open("hybrid_recommend.pkl", "rb"))
except FileNotFoundError:
    print("Warning: ML model files not found. Some features may not work.")
    fraud_model = None
    recommend_model = None

@app.route("/")
def home():
    return "ML API is running"

@app.route("/test_connection")
def test_connection():
    return jsonify({
        "status": "connected",
        "faq_loaded": not faq.empty,
        "faq_count": len(faq)
    })

@app.route("/predict_fraud", methods=["POST"])
def predict_fraud():
    if not fraud_model:
        return jsonify({"error": "Fraud detection service unavailable"}), 503
    try:
        data = request.get_json()
        if not data or "features" not in data:
            return jsonify({"error": "Missing required parameters"}), 400
        response = fraud_model.predict([data["features"]])
        return jsonify({"is_fraud": bool(response[0])})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/recommend", methods=["POST"])
def recommend():
    if not recommend_model:
        return jsonify({"error": "Recommendation service unavailable"}), 503
    try:
        data = request.get_json()
        if not data or "user_id" not in data:
            return jsonify({"error": "Missing required parameters"}), 400
        response = recommend_model.predict([data["user_id"]])
        return jsonify({"recommendations": response.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Load the FAQ data
try:
    faq = pd.read_csv('frontend (2)/frontend/faq.csv')
    print("FAQ data loaded successfully")
except FileNotFoundError:
    print("Error: FAQ data file not found")
    faq = pd.DataFrame(columns=["Question", "Answer"])

# Chatbot Function
def clean_text(text):
    """Normalize text for better matching"""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    return text

def get_response(user_input):
    user_input = clean_text(user_input)
    print(f"\nUser question: '{user_input}'")
    
    # Handle return policy questions directly
    if 'return' in user_input and ('policy' in user_input or 'exchange' in user_input):
        return """Our return policy:
1. Items can be returned within 30 days of purchase
2. Items must be in original condition with tags attached
3. Refunds will be processed within 5-7 business days
4. Contact support@trendaura.com for any return queries"""
    
    # Split FAQ into actual questions and product info
    questions = faq[faq["Question"].str.contains(r'\?')]  # Questions contain question marks
    products = faq[~faq["Question"].str.contains(r'\?')]  # Products don't
    
    # First try exact match on questions only
    exact_match = questions[questions["Question"].apply(clean_text) == user_input]
    if not exact_match.empty:
        print("Exact FAQ match found")
        return exact_match["Answer"].values[0]
    
    # Then try fuzzy matching on questions
    best_match = None
    best_score = 0
    for _, row in questions.iterrows():
        question = clean_text(row["Question"])
        score = fuzz.token_set_ratio(user_input, question)
        if score > best_score:
            best_score = score
            best_match = row
    
    if best_score > 70:  # Good enough match threshold
        print(f"Fuzzy FAQ match found (score: {best_score}): '{best_match['Question']}'")
        return best_match["Answer"]
    
    # Fallback to product search if no FAQ match
    for _, row in products.iterrows():
        product = clean_text(row["Question"])
        if user_input in product:
            print(f"Product match found: '{row['Question']}'")
            return f"About {row['Question']}: {row['Answer']}"
    
    return "I couldn't find an answer to your question. For product info, try being more specific. For general questions, try rephrasing."

@app.route("/chatbot", methods=["POST", "OPTIONS"])
def predict_chatbot():
    if request.method == "OPTIONS":
        response = jsonify({"status": "ok"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "*")
        return response
        
    response = jsonify({"response": get_response(request.json["message"])})
    response.headers.add("Access-Control-Allow-Origin", "*")
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"response": "Please provide a message parameter"}), 400
            
        user_message = data["message"].strip()
        if not user_message:
            return jsonify({"response": "Message cannot be empty"}), 400
        
        bot_response = get_response(user_message)
        return jsonify({"response": bot_response})
        
    except Exception as e:
        print("Chatbot Error:", str(e))
        return jsonify({
            "response": "Sorry, I encountered an error processing your request",
            "error": str(e)
        }), 500
    
@app.route('/signup', methods=['POST'])
def signup():
    fullname = request.form['fullname']
    email = request.form['email']
    password = request.form['password']
    confirm = request.form['confirm']

    if password != confirm:
        return "Passwords do not match"

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    account = cursor.fetchone()

    if account:
        return "Email already exists"

    cursor.execute('INSERT INTO users (full_name, email, password) VALUES (%s, %s, %s)', (fullname, email, password))
    mysql.connection.commit()
    cursor.close()

    return redirect(url_for('index'))  # go back to index page after signup


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users WHERE email = %s AND password = %s', (email, password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        session['user'] = user[1]  # storing full_name or email in session
        return redirect(url_for('index'))
    else:
        return "Invalid login credentials"
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(debug=True)
