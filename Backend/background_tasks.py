from celery import Celery
import os

celery = Celery(__name__, broker=os.getenv("REDIS_URL", "redis://localhost:6379"))

@celery.task
def process_fire_detection(image_data):
    # This function will process detection asynchronously
    return {"status": "Processing completed"}
