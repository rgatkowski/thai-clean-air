from fastapi import FastAPI, HTTPException, Query, Response
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis
from typing import Optional
from services import cached_get_articles

# Application version
version = "0.0.1"

# Initialize FastAPI application with metadata
app = FastAPI(
    title="STX Next - Thailand Clean Air Network",
    description=("Backend API that serves NextJS application data. "
                 "Developed by STX Next Team for the HTTR Challenge."),
    version=version
)


@app.on_event("startup")
async def startup():
    """
    Application startup event handler to initialize the Redis cache.
    """
    redis = aioredis.from_url("redis://redis:6379", encoding="utf8",
                              decode_responses=True)
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
            ...,
            description="Host location coordinates",
            example="Lat,Long"),
    language: Optional[str] = Query(
            'english',
            description="Desired articles language",
            example="english")
        ):
    """
    Endpoint to retrieve articles based on location coordinates and language.
    Applies caching to improve performance on repeated requests.
    """
    return await cached_get_articles(location, language)
