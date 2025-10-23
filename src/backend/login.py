import os
import bcrypt
import jwt
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
from pathlib import Path
from dotenv import load_dotenv
from .security import (
    auth_required, issue_tokens, set_cookie, clear_cookie,
    verify_token_from_request, sign_jwt, JWT_SECRET, JWT_ALG,ACCESS_MIN, REFRESH_DAYS
)
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, HTTPException, APIRouter, Depends, Request, Response
from fastapi.responses import JSONResponse
from supabase import create_client, Client
"""
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"), override=False)

# Then overlay environment-specific file
env = os.getenv("ENV", "development")
env_file = ".env.production" if env == "production" else ".env.development"
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), env_file), ove
rride=True)"""

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
    #token: str
    user: dict

router = APIRouter()

@router.post("/auth/login", response_model=LoginResponse)
def login(payload: LoginRequest, response: Response):
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

    # 3) set HttpOnly cookies
    set_cookie(response, "access_token", tokens["access"], max_age=ACCESS_MIN * 60)
    set_cookie(response, "refresh_token", tokens["refresh"], max_age=REFRESH_DAYS * 24 * 3600)

    # You can include any non-sensitive fields you want the frontend to have
    public_user = {"id": user["user_id"], "email": user["email"]}

    return {"user": public_user}

@router.get("/auth/me")
def me(payload: Dict[str, Any] = Depends(auth_required)):
    return {"id": payload["sub"], "email": payload["email"]}

#post logout is for button click
@router.post("/auth/logout")
def logout(response: Response):
    clear_cookie(response, "access_token")
    clear_cookie(response, "refresh_token")
    return {"ok": True}

#post logout is for link click
"""
@router.get("/auth/logout")
def logout(response: Response):
    clear_cookie(response, "access_token")
    clear_cookie(response, "refresh_token")
    return {"ok": True}
"""

@router.post("/auth/refresh")
def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Missing refresh token")

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")

    # issue NEW access (rotation of refresh token is optional for beginners)
    new_access = sign_jwt(payload["sub"], payload["email"], timedelta(minutes=30), "access")
    set_cookie(response, "access_token", new_access, max_age=ACCESS_MIN * 60)
    return response

@router.get("/api/protected")
def protected(user=Depends(auth_required)):
    return {"message": f"Hello {user['email']}! This is protected data."}
