import requests

url = "http://localhost:5000/predict_chatbot"
headers = {"Content-Type": "application/json"}
data = {"message": "What are your return policies?"}

try:
    response = requests.post(url, json=data, headers=headers)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("Error:", str(e))
