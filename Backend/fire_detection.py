import torch
from PIL import Image
import io

# Load YOLO v11 model
model = torch.hub.load("ultralytics/yolov11", "yolov11", pretrained=True)

async def detect_fire(file):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    # Run detection
    results = model(image)
    detections = results.pandas().xyxy[0].to_dict(orient="records")

    return detections
