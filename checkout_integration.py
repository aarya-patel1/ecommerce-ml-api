import requests

def process_payment(transaction_data):
    # Call the fraud detection API
    try:
        response = requests.post('http://localhost:5000/predict', json=transaction_data)
        response.raise_for_status()  # Raise an error for bad responses
        prediction = response.json()['fraud']
    except requests.exceptions.RequestException as e:
        return f"Error processing transaction: {e}. Please check the API server."



    
    logger.info("Checking if the transaction is fraudulent.")

    if prediction:

        return "Transaction declined due to fraud detection."
    else:
        return "Transaction approved."

# Example transaction data with necessary features, including all required fields

transaction_data = {
    "Price": 100.00,  # Price of the transaction
    "Rating": 4.5,    # Rating associated with the product
    "transaction_date": "2023-01-01"
}



# Process the payment and log the result
result = process_payment(transaction_data)
print(result)
logger.info(f"Transaction result: {result}")
