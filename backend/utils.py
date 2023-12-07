from models import Coordinates
from fastapi import HTTPException


def validate_coordinates(location_str: str) -> Coordinates:
    try:
        lat_str, lon_str = location_str.split(",")
        return Coordinates(lat=float(lat_str), lon=float(lon_str))
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid format for coordinates. "
                "Expected format: 'latitude,longitude'"
            ),
        )
