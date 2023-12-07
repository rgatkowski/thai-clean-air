import requests
from datetime import datetime, timedelta
from fastapi_cache.decorator import cache
from requests.exceptions import RequestException
from utils import get_country_alpha2, validate_coordinates


def get_city_country_from_coordinates(lat: float, lon: float) -> dict:
    """
    Retrieve city and country information from latitude and longitude using
    Nominatim's reverse geocoding.

    Args:
    lat (float): Latitude of the location.
    lon (float): Longitude of the location.

    Returns:
    dict: Dictionary containing city and country of the given coordinates.
    Returns None for both if not found or in case of an error.
    """
    url = (
        "https://nominatim.openstreetmap.org/reverse?"
        f"lat={lat}&lon={lon}&format=json"
    )

    try:
        response = requests.get(url)
        # Check if the response status code is 200 (OK)
        if response.status_code == 200:
            data = response.json()
            city = data.get("address", {}).get("city")
            country = data.get("address", {}).get("country")
            return {"city": city, "country": country}
        else:
            # Handle non-200 responses
            return {"city": None, "country": None}

    except RequestException:
        return {"city": None, "country": None}


@cache(expire=60)
async def cached_get_articles(location: str, language: str) -> dict:
    """
    Fetches and caches articles based on location and language.

    Args:
        location (str): Location as a string.
        language (str): Language of the articles.

    Returns:
        dict: A dictionary containing cached articles.
    """
    coordinates = validate_coordinates(location)
    lat = coordinates.lat
    lon = coordinates.lon
    location_info = get_city_country_from_coordinates(lat, lon)
    return get_articles_from_location(location_info, language)


@cache(expire=60)
async def cached_get_measures(location: str, limit: str) -> list:
    """
    Fetches and caches pollution measures based on location.

    Args:
        location (str): Location coordinates as string.
        limit (str): Max results limit

    Returns:
        list: A list of objects of pollution measures
    """
    coordinates = validate_coordinates(location)
    lat = coordinates.lat
    lon = coordinates.lon
    location_info = get_city_country_from_coordinates(lat, lon)
    try:
        limit = int(limit)
    except (TypeError, ValueError):
        limit = 100
        pass
    return get_measures_from_location(location_info, limit)


def get_articles_from_location(location, language):
    """
    Retrieves pollution-related articles based on a specified location.

    Parameters:
    location (dict): A dictionary containing the 'city' and 'country' keys.
    language (str): String that will be used for articles language

    Returns:
    dict: A dictionary containing pollution-related articles for each category.
    """
    # Default values for city and country if not provided in location dict
    city = location.get("city", "Poznan")
    country = location.get("country", "Poland")

    # Call to a function that generates responses based on city and country
    return get_bedrock_response(city, country, language)


def get_bedrock_response(city, country, language):
    """
    Generates pollution impact-related articles for a given city and country.

    Parameters:
    city (str): The name of the city.
    country (str): The name of the country.
    language (str): The name of the language.

    Returns:
    dict: A dictionary containing detailed responses for each impact category.
    """
    # TODO: Implement the logic to customize responses based on
    # city and country. Consulted in query language.
    # Currently, the responses are static and specific to Poland.

    # Articles describing the impacts of PM2.5 pollution in various categories
    return {
        "short-term": (
            "In Poland, PM2.5 pollution can quickly cause "
            "breathing difficulties, triggering asthma and "
            "allergies. It's like an invisible fog that can make "
            "our cities smell bad and turn our daily walks or "
            "outdoor activities into unhealthy."
            "experiences."
        ),
        "long-term": (
            "Over time, PM2.5 pollution in Poland can lead to "
            "serious long-term health issues. It's not just about "
            "coughs or colds; these tiny particles can "
            "contribute to heart diseases and affect the health of "
            "unborn children, impacting future generations."
        ),
        "environment": (
            "PM2.5 affects not just us, but also Poland's natural "
            "beauty. It can harm animals, weaken plants, and "
            "damage crops. Imagine our beautiful forests and "
            "fields suffering under a cloud of pollution, leading "
            "to issues like acid rain that harm our environment."
        ),
        "global-warming": (
            "These tiny PM2.5 particles in Poland also "
            "contribute to global warming. They might seem "
            "small, but they have a big impact on our climate, "
            "leading to more extreme weather like hotter "
            "summers and colder winters, changing the way we "
            "experience our seasons."
        ),
    }


def get_measures_from_location(location, limit):
    """
    Retrieves pollution measures based on a specified location
    (city and country).

    Parameters:
    location (dict): A dictionary containing the 'city' and 'country' keys.
    limit (int): Max results limit

    Returns:
    list: A list of dicts with the measured parameter and measured value.
    """
    # Default values for city and country if not provided in location dict
    city = location.get("city", "Poznan")
    country = location.get("country", "Poland")

    return get_measures_from_openaq(city, country, limit)


def get_measures_from_openaq(city: str, country: str, limit: int) -> dict:
    """
    Fetches air quality measurements from the OpenAQ API for a given
    city and country.

    Args:
        city (str): The name of the city.
        country (str): The name of the country.
        limit (int): The maximum number of records to fetch.

    Returns:
        dict: A dictionary containing the air quality measurements.
    """

    def fetch_data(city):
        response = requests.get(
            "https://api.openaq.org/v2/measurements",
            params={
                "date_from": date_5_years_ago,
                "date_to": current_date,
                "limit": limit,
                "page": "1",
                "offset": "0",
                "sort": "desc",
                "radius": "1000",
                "country": country_alpha,
                "city": city,
                "order_by": "datetime",
            },
        )
        return response.json()

    current_date = datetime.now().strftime("%Y-%m-%d")
    date_5_years_ago = (datetime.now() - timedelta(days=5 * 365)).strftime(
        "%Y-%m-%d"
    )
    country_alpha = get_country_alpha2(country)

    data = fetch_data(city)
    measures = process_results(data.get("results", []))

    # Retry with city=None if no measures found
    if not measures:
        data = fetch_data(None)
        measures = process_results(data.get("results", []))

    return {
        "country": country,
        "country_alpha": country_alpha,
        "city": city,
        "date_from": date_5_years_ago,
        "date_to": current_date,
        "results": measures,
    }


def process_results(results):
    """
    Processes the results from the OpenAQ API response.

    Args:
        results (list): The list of measurement results.

    Returns:
        dict: A dictionary of processed measurements.
    """
    measures = {}
    for result in results:
        parameter = result.get("parameter", "")
        if parameter:
            measures.setdefault(parameter, []).append(
                {
                    "value": result.get("value", ""),
                    "date": result.get("date", {}).get("utc", ""),
                }
            )
    return measures
