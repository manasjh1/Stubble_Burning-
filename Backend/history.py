from fastapi import APIRouter, Depends
from Backend.database import db
from Backend.auth import get_current_user

router = APIRouter()

@router.get("/detection-history/")
async def get_history(user: dict = Depends(get_current_user)):
    history = list(db.fire_detections.find({}, {"_id": 0}))
    return {"detections": history}
