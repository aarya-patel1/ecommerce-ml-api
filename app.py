from flask import Flask, request, jsonify
import pickle  # or joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = pickle.load(open("model.pkl", "rb"))

@app.route("/")
def home():
    return "ML API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    prediction = model.predict(np.array(data["features"]).reshape(1, -1))
    return jsonify({"prediction": prediction.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
