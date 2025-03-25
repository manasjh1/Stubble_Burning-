from fastapi import APIRouter, Depends, HTTPException
from Backend.database import db
from passlib.context import CryptContext
from jose import JWTError, jwt
import os
from datetime import datetime, timedelta

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("JWT_SECRET", "mysecretkey")

def create_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

@router.post("/register/")
async def register_user(username: str, password: str):
    hashed_password = pwd_context.hash(password)
    db.users.insert_one({"username": username, "password": hashed_password})
    return {"message": "User registered"}

@router.post("/login/")
async def login(username: str, password: str):
    user = db.users.find_one({"username": username})
    if not user or not pwd_context.verify(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token({"sub": username}, timedelta(hours=12))
    return {"access_token": token}
