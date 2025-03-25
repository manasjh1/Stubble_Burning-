from fastapi import FastAPI, File, UploadFile
from fire_detection import detect_fire
from Backend.database import save_detection
import logging

app = FastAPI()

logging.basicConfig(level=logging.INFO)

@app.post("/detect-fire/")
async def detect_fire_endpoint(file: UploadFile = File(...)):
    logging.info("Received file for fire detection")
    
    result = await detect_fire(file)
    
    if result:
        save_detection(result)
    
    return {"detections": result}
