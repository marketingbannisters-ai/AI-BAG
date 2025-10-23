from .login import router as auth_router
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Auth API")

# IMPORTANT: allow_credentials=True, and don't put trailing slashes in origins
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8080",
    "https://marketingbannisters-ai.github.io",
    "https://ai-bag-716447624057.us-west1.run.app",
    # add your deployed frontend origin(s) here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,   # needed for cookies!
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_cookies(request: Request, call_next):
    # This fires for every request, even if dependencies fail
    print(f"[{request.method}] {request.url.path} cookies:", dict(request.cookies))
    resp = await call_next(request)
    return resp

app.include_router(auth_router)

# Optional: health
@app.get("/healthz")
def health():
    return {"ok": True}