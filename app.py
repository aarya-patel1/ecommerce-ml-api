from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load ML models
chatbot_model = pickle.load(open("chatbot_model.pkl", "rb"))
fraud_model = pickle.load(open("fraud_detection.pkl", "rb"))
recommend_model = pickle.load(open("hybrid_recommend.pkl", "rb"))

@app.route("/")
def home():
    return "ML API is running"

@app.route("/predict_chatbot", methods=["POST"])
def predict_chatbot():
    data = request.json
    response = chatbot_model.predict([data["message"]])
    return jsonify({"response": response[0]})

@app.route("/predict_fraud", methods=["POST"])
def predict_fraud():
    data = request.json
    response = fraud_model.predict([data["features"]])
    return jsonify({"is_fraud": bool(response[0])})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    response = recommend_model.predict([data["user_id"]])
    return jsonify({"recommendations": response.tolist()})

    # Chatbot API
@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json.get('message')
    responses = ["Hello!", "How can I help you?", "Tell me more."]
    return jsonify({"response": random.choice(responses)})

# Recommendation API
@app.route('/recommend', methods=['GET'])
def recommend():
    products = ["Product A", "Product B", "Product C", "Product D"]
    return jsonify({"recommendations": random.sample(products, 2)})

# Fraud Detection API
@app.route('/fraud-check', methods=['POST'])
def fraud_check():
    transaction = request.json
    is_fraud = random.choice([True, False])
    return jsonify({"fraud": is_fraud})

if __name__ == "__main__":
    app.run(debug=True)
