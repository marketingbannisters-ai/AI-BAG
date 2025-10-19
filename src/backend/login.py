import os
import bcrypt
import jwt
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Get credentials from environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

JWT_SECRET = os.environ.get("JWT_SECRET", "change-me")  # set a strong secret in prod
JWT_ALG = "HS256"
JWT_EXPIRE_MIN = int(os.environ.get("JWT_EXPIRE_MIN", "60"))

# -------- API --------
app = FastAPI(title="Auth API")

# Update this list to match your front-end origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8000/",
        "http://127.0.0.1:8000/",
        "http://localhost:8080/",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://marketingbannisters-ai.github.io/AI-BAG/",
    ],
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    token: str
    user: dict

def _create_jwt(user_id: str, email: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": user_id,
        "email": email,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=JWT_EXPIRE_MIN)).timestamp()),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

@app.post("/", response_model=LoginResponse)
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

    # 3) issue JWT
    token = _create_jwt(user_id=user["user_id"], email=user["email"])

    # You can include any non-sensitive fields you want the frontend to have
    public_user = {"id": user["user_id"], "email": user["email"]}

    return {"token": token, "user": public_user}

