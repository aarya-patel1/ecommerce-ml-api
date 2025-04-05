import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from flask import Flask, request, jsonify, send_from_directory

import logging
import joblib

# Create a logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the dataset
data = pd.read_csv('frontend/ecommerce_dataset.csv')
data_encoded = pd.get_dummies(data, columns=['Category', 'Stock_Availability'])
data_encoded = data_encoded.drop(['Product_ID', 'Name', 'Reviews'], axis=1)
data_encoded['Fraud'] = ((data_encoded['Price'] > 300) & (data_encoded['Rating'] < 3)).astype(int)

# Prepare features and target
X = data_encoded.drop('Fraud', axis=1)
y = data_encoded['Fraud']

# Train the model
model = RandomForestClassifier()
model.fit(X, y)

# Save the model
joblib.dump(model, 'fraud_detection_model.pkl')

# Create Flask app
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    logger.info("Received a request for fraud prediction.")
    transaction_id = request.json.get('transaction_id')
    logger.info(f"Received request for transaction ID: {transaction_id}")

    def get_transaction_data(transaction_id):
        # Placeholder function to simulate retrieving transaction data
        # In a real application, this would query a database or another data source
        # For demonstration, returning a sample transaction data
        sample_data = {
            'Price': 350,
            'Rating': 2.5,
            'Category_Electronics': 1,
            'Category_Clothing': 0,
            'Category_Books': 0,
            'Category_Fashion': 0,
            'Category_Home Appliances': 0,
            'Category_Toys': 0,
            'Stock_Availability_In_Stock': 1,
            'Stock_Availability_Out_of_Stock': 0,
            'Stock_Availability_Available': 0,
            'Stock_Availability_Out of Stock': 0
        }
        return sample_data if transaction_id == "12345" else None

    data = get_transaction_data(transaction_id)

    if data is None:
        return jsonify({'error': 'Transaction not found.'}), 404

    logger.info(f"Received request with data: {data}")
    logger.info("Processing the prediction.")

    missing_features = [feature for feature in X.columns if feature not in data]
    if missing_features:
        return jsonify({'error': f'Missing features: {", ".join(missing_features)}'}), 400

    input_data = pd.DataFrame([data])    
    input_data_encoded = pd.get_dummies(input_data)
    input_data_encoded = input_data_encoded.reindex(columns=X.columns, fill_value=0)
    
    try:
        prediction = model.predict(input_data_encoded)
        logger.info(f"Prediction result: {bool(prediction[0])} for input data: {data}")
        return jsonify({'fraud': bool(prediction[0])})
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({'error': 'Error processing transaction.'}), 500

@app.route('/chatbot', methods=['POST'])

def send_static(path):
    user_input = request.json.get('message')
    
    # Simulate a response based on user input
    if "fraud" in user_input.lower():
        response = "I can help you check if a transaction is fraudulent. Please provide the transaction details."
    else:
        response = "Hello! How can I assist you today?"

    return jsonify({'response': response})


@app.route('/')
def home():
    return send_from_directory('frontend', 'index.html')  # Serve the index.html file

if __name__ == '__main__':
    app.run(debug=True)
