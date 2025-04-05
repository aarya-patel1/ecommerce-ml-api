import requests

def test_predict_valid_data_with_full_features_and_chatbot():

    url = 'http://127.0.0.1:5000/predict'
    valid_data_full = {
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
    
    valid_data_partial = {
        'Price': 200,
        'Rating': 4.5,
        'Category_Electronics': 0,
        'Category_Clothing': 1,
        'Category_Books': 0,
        'Category_Fashion': 0,
        'Category_Home Appliances': 0,
        'Category_Toys': 0,
        'Stock_Availability_In_Stock': 0,
        'Stock_Availability_Out_of_Stock': 1,
        'Stock_Availability_Available': 0,
        'Stock_Availability_Out of Stock': 0
    }

    response_full = requests.post(url, json=valid_data_full)    
    print("Chatbot Response: Hello! How can I assist you today?")

    print("Full Data Response:", response_full.json())
    
    response_partial = requests.post(url, json=valid_data_partial)
    print("Partial Data Response:", response_partial.json())

def test_predict_invalid_data_missing_features_and_chatbot():

    url = 'http://127.0.0.1:5000/predict'
    invalid_data_missing = {
        'Price': 350
        # Missing other required features
    }
    
    invalid_data_extra = {
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
        'Stock_Availability_Out of Stock': 0,
        'Extra_Feature': 1  # Extra feature not in model
    }

    response_missing = requests.post(url, json=invalid_data_missing)    
    print("Chatbot Response: I'm sorry, I didn't understand that.")

    print("Missing Features Response:", response_missing.json())
    
    response_extra = requests.post(url, json=invalid_data_extra)
    print("Extra Features Response:", response_extra.json())

if __name__ == "__main__":
    test_predict_valid_data_with_full_features_and_chatbot()

    test_predict_invalid_data_missing_features_and_chatbot()
