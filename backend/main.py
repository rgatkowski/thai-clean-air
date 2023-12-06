from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse, PlainTextResponse


app = FastAPI()


@app.get("/")
async def home() -> Response:
    return Response(status_code=200)


@app.get("/version")
async def version() -> JSONResponse:
    return JSONResponse(content={"version": "0.0.1"})


@app.get("/robots.txt", response_class=PlainTextResponse)
def robots() -> str:
    return "User-agent: *\nDisallow: /"
