from hashlib import sha256
from os import getenv
from typing import Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, Query, Response
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis
from services import cached_get_articles, cached_get_measures

# Load environment variables from .env file
load_dotenv()

# Application version
version = "0.0.1"

# Initialize FastAPI application with metadata
app = FastAPI(
    title="STX Next - Thailand Clean Air Network",
    description=(
        "Backend API that serves NextJS application data. "
        "Developed by STX Next Team for the HTTR Challenge."
    ),
    version=version,
)

allowedOrigins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowedOrigins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to generate SHA-256 hash
def generate_api_key(secret_text: str, secret_key: str) -> str:
    return sha256(f"{secret_text}{secret_key}".encode()).hexdigest()


# Generate API Key
SECRET_TEXT = getenv("SECRET_TEXT")
SECRET_KEY = getenv("SECRET_KEY")
API_KEY = generate_api_key(SECRET_TEXT, SECRET_KEY)


def api_key_dependency(x_api_key: str = Header(...)):
    """
    Dependency function to authenticate API key in request headers.
    """
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key


@app.on_event("startup")
async def startup():
    """
    Application startup event handler to initialize the Redis cache.
    """
    redis = aioredis.from_url(
        "redis://redis:6379", encoding="utf8", decode_responses=True
    )
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")


@app.get("/")
async def home() -> Response:
    """
    Root endpoint for basic health check.
    """
    return Response(status_code=200)


@app.get("/version")
async def get_version() -> JSONResponse:
    """
    Endpoint to retrieve the application version.
    """
    return JSONResponse(content={"version": version})


@app.get("/robots.txt", response_class=PlainTextResponse)
def robots() -> str:
    """
    Endpoint to provide robots.txt for web crawlers.
    """
    return "User-agent: *\nDisallow: /"


@app.get("/test-redis")
async def test_redis():
    """
    Endpoint to test Redis connectivity and functionality.
    """
    try:
        cache = FastAPICache.get_backend()
        await cache.set("test_key", "test_value", 60)
        value = await cache.get("test_key")
        return {"test_key": value}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/articles")
async def get_articles(
    location: str = Query(
        ..., description="Host location coordinates", example="Lat,Long"
    ),
    language: Optional[str] = Query(
        "english", description="Desired articles language", example="english"
    ),
    x_api_key: str = Depends(api_key_dependency),
):
    """
    Endpoint to retrieve articles based on location coordinates and language.
    Applies caching to improve performance on repeated requests.
    """
    return await cached_get_articles(location, language)


@app.get("/measures")
async def get_measures(
    location: str = Query(
        ..., description="Host location coordinates", example="Lat,Long"
    ),
    limit: str = Query(..., description="Max results limit", example="100"),
    x_api_key: str = Depends(api_key_dependency),
):
    """
    Endpoint to retrieve pollution measures based on location coordinates.
    Applies caching to improve performance on repeated requests.
    """
    return await cached_get_measures(location, limit)
