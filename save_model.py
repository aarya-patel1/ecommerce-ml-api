import pickle

# Example: Define hybrid_recommend (Replace this with your actual data)
hybrid_recommend = {"item1": "Book", "item2": "Laptop", "item3": "Phone"}

# Save the object
with open("hybrid_recommend.pkl", "wb") as file:
    pickle.dump(hybrid_recommend, file)

print("Pickle file saved successfully!")
