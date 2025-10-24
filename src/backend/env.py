from __future__ import annotations  # <-- helps Pylance avoid eval issues
from starlette.requests import Request  # prefer starlette for typing

def get_env(request: Request | None) -> str:  # Python 3.10+ union
    if request is not None:
        hostname = request.url.hostname or ""
        if "localhost" in hostname or hostname.startswith("127."):
            return "local"
        return "production"

    # Fallback when no request object exists
    import socket
    hostname = socket.gethostname()
    ip = socket.gethostbyname(hostname)
    return "local" if ip.startswith("127.") else "production"