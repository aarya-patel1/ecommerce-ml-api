import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

import pandas as pd

# Load the ecommerce dataset
df = pd.read_csv('frontend/ecommerce_dataset.csv')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get('message')
    
    # Check for product inquiries
    product_info = df[df['Name'].str.contains(user_input, case=False, na=False)]
    if not product_info.empty:
        response = product_info.to_json(orient='records')
    else:
        response = "I'm sorry, I couldn't find any products matching your query."
    if "product" in user_input.lower():

        product_info = df[df['Name'].str.contains(user_input, case=False, na=False)]
        if not product_info.empty:
            response = product_info.to_json(orient='records')
        else:
            response = "I'm sorry, I couldn't find any products matching your query."
    elif "details" in user_input.lower():
        product_info = df[df['Name'].str.contains(user_input, case=False, na=False)]
        if not product_info.empty:
            details = product_info[['Price', 'Quantity', 'Availability']].to_json(orient='records')
            response = f"Here are the details: {details}"
        else:
            response = "I'm sorry, I couldn't find any products matching your query."
    elif "fraud" in user_input.lower():

        response = "I can help you check if a transaction is fraudulent. Please provide the transaction details."
    else:
        response = "Hello! How can I assist you today?"


    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
