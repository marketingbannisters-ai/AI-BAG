import os
from typing import Any, Dict, Optional
from datetime import datetime, timedelta, timezone
import jwt
from fastapi import HTTPException, Request, Response
from .env import get_env

JWT_SECRET = os.environ.get("JWT_SECRET", "Bannister")  # set strong secret in prod
JWT_ALG = "HS256"
ACCESS_MIN = int(os.environ.get("JWT_ACCESS_MIN", "30"))      # 30 min
REFRESH_DAYS = int(os.environ.get("JWT_REFRESH_DAYS", "7"))   # 7 days


COOKIE_DOMAIN = os.getenv("COOKIE_DOMAIN")            # e.g. ".yourdomain.com" in prod
env = get_env(None)
if env == "local":
    COOKIE_SECURE = False
    COOKIE_SAMESITE = "Lax" 
else:
    COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"  # True on HTTPS
    COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "Lax")          # "Lax" | "Strict" | "None"

def _now() -> datetime:
    return datetime.now(timezone.utc)

def sign_jwt(sub: str, email: str, exp_delta: timedelta, token_type: str) -> str:
    now = _now()
    payload = {
        "sub": sub,
        "email": email,
        "type": token_type,   # "access" or "refresh"
        "iat": int(now.timestamp()),
        "exp": int((now + exp_delta).timestamp()),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def issue_tokens(user_id: str, email: str) -> Dict[str, str]:
    return {
        "access":  sign_jwt(user_id, email, timedelta(minutes=ACCESS_MIN), "access"),
        "refresh": sign_jwt(user_id, email, timedelta(days=REFRESH_DAYS), "refresh"),
    }

def set_cookie(resp: Response, name: str, value: str, max_age: int):
    kwargs = {
        "key": name,
        "value": value,
        "max_age": max_age,
        "httponly": True,
        "secure": COOKIE_SECURE,
        "samesite": COOKIE_SAMESITE,
        "domain": None,
        "path": "/",
    }
    # Only set domain if provided; otherwise browsers may reject on localhost
    if COOKIE_DOMAIN:
        kwargs["domain"] = COOKIE_DOMAIN

    resp.set_cookie(**kwargs)

def clear_cookie(resp: Response, name: str):
    resp.delete_cookie(key=name, domain=COOKIE_DOMAIN, path="/")

def _extract_bearer_token(auth_header: Optional[str]) -> Optional[str]:
    # Accept "Bearer <token>" in a case-insensitive way and trim spaces
    if not auth_header:
        return None
    parts = auth_header.strip().split()
    if len(parts) == 2 and parts[0].lower() == "bearer":
        return parts[1].strip()
    return None

def verify_token_from_request(request: Request, expected_type: str = "access") -> Dict[str, Any]:
    token = _extract_bearer_token(request.headers.get("Authorization"))
 
    if not token:
        raise HTTPException(status_code=401, detail="Missing Authorization bearer token")

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    if payload.get("type") != expected_type:
        raise HTTPException(status_code=401, detail="Invalid token type")

    return payload

def auth_required(request: Request) -> Dict[str, Any]:
    return verify_token_from_request(request, expected_type="access")