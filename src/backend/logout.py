from fastapi.responses import JSONResponse, Response
from fastapi import APIRouter
from .security import (
    clear_cookie
)

router = APIRouter()

@router.get("/logout")
def logout(response: Response):
    clear_cookie(response, "access_token")
    clear_cookie(response, "refresh_token")
    return {"ok": True}