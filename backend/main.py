from fastapi import FastAPI, Query, Response
from fastapi.responses import JSONResponse, PlainTextResponse
from services import (
        get_articles_from_location,
        get_city_country_from_coordinates
    )
from utils import validate_coordinates

version = "0.0.1"

app = FastAPI(
    title="STX Next - Thailand clean air network.",
    description="Backend API that serves NextJS application data. \
        Developed by STX Next Team for the HTTR Challenge.",
    version=version
)


@app.get("/")
async def home() -> Response:
    return Response(status_code=200)


@app.get("/version")
async def version() -> JSONResponse:
    return JSONResponse(content={"version": version})


@app.get("/robots.txt", response_class=PlainTextResponse)
def robots() -> str:
    return "User-agent: *\nDisallow: /"


@app.get("/articles")
async def get_articles(
    location: str = Query(
            ...,
            description="Get articles list",
            example="Lat,Long")
        ):
    # Check location input is a valid coordinate tuple
    coordinates = validate_coordinates(location) if location else None
    # Retrieve city and country
    location = get_city_country_from_coordinates(
        coordinates.lat, coordinates.lon)

    return get_articles_from_location(location)
