from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client["stubble_detection"]
collection = db["fire_detections"]

def save_detection(detection_data):
    collection.insert_one({"detections": detection_data})
    print("Detection saved to database")
