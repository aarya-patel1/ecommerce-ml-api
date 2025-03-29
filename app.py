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

if __name__ == "__main__":
    app.run(debug=True)
