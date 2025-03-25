from fastapi import APIRouter, Depends
from Backend.database import db
from Backend.auth import get_current_user

router = APIRouter()

@router.get("/admin/analytics/")
async def analytics(user: dict = Depends(get_current_user)):
    if user["role"] != "admin":
        return {"error": "Unauthorized"}

    total_detections = db.fire_detections.count_documents({})
    return {"total_detections": total_detections}
