import os
import bcrypt
import jwt
from datetime import datetime, timedelta, timezone
from typing import Dict, Any
from dotenv import load_dotenv
from .security import (
    auth_required, issue_tokens, sign_jwt, JWT_SECRET, JWT_ALG, ACCESS_MIN
)
from pydantic import BaseModel, EmailStr
from fastapi import HTTPException, APIRouter, Depends
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def now() -> datetime:
    return datetime.now(timezone.utc)

# -------- API --------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    user: dict
    access: str
    refresh: str

router = APIRouter()

@router.post("/auth/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    # 1) fetch user by email
    result = supabase.table("users").select("user_id,email,password,is_active").eq("email", payload.email).single().execute()
    user = result.data
    if not user:
        # Don’t reveal which field is wrong
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if user.get("is_active", False):
        raise HTTPException(status_code=403, detail="Account is disabled")

    stored_hash = user.get("password")
    if not stored_hash:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    payload_password_decoded = bcrypt.hashpw(payload.password.encode(), bcrypt.gensalt(rounds=6)).decode()
    # 2) verify password (bcrypt)
    try:
        ok = bcrypt.checkpw(payload.password.encode("utf-8"), payload_password_decoded.encode("utf-8"))
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not ok:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    tokens = issue_tokens(user_id=user["user_id"], email=user["email"])

    # You can include any non-sensitive fields you want the frontend to have
    public_user = {"id": user["user_id"], "email": user["email"]}

    return {"user": public_user, "access": tokens["access"], "refresh": tokens["refresh"]}

@router.get("/auth/me")
def me(payload: Dict[str, Any] = Depends(auth_required)):
    return {"id": payload["sub"], "email": payload["email"]}

class RefreshIn(BaseModel):
    refresh: str

@router.post("/auth/refresh")
def refresh(body: RefreshIn):
    try:
        payload = jwt.decode(body.refresh, JWT_SECRET, algorithms=[JWT_ALG])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")

    # short-lived new access token
    new_access = sign_jwt(payload["sub"], payload["email"], timedelta(minutes=ACCESS_MIN), "access")
    return {"access": new_access}

@router.get("/api/protected")
def protected(user=Depends(auth_required)):
    return {"message": f"Hello {user['email']}! This is protected data."}
