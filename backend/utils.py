import unicodedata

import pycountry
from fastapi import HTTPException

from models import Coordinates


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


def get_country_alpha2(country_name):
    """
    Retrieves the ISO 3166-1 alpha-2 country code for a given country name,
    after removing any accents from the country name.

    Args:
        country_name (str): The name of the country.

    Returns:
        str: The ISO 3166-1 alpha-2 country code, or None if not found.
    """
    # Remove accents from the country name
    country_name = "".join(
        c
        for c in unicodedata.normalize("NFD", country_name or "")
        if unicodedata.category(c) != "Mn"
    )

    country = pycountry.countries.get(name=country_name)
    return country.alpha_2 if country else None
