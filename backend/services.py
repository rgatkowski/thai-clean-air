import requests
from requests.exceptions import RequestException


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
    url = ("https://nominatim.openstreetmap.org/reverse?"
           f"lat={lat}&lon={lon}&format=json")

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


def get_articles_from_location(location):
    """
    Retrieves pollution-related articles based on a specified location.

    Parameters:
    location (dict): A dictionary containing the 'city' and 'country' keys.

    Returns:
    dict: A dictionary containing pollution-related articles for each category.
    """
    # Default values for city and country if not provided in location dict
    city = location.get('city', 'Poznan')
    country = location.get('country', 'Poland')

    # Call to a function that generates responses based on city and country
    return get_bedrock_response(city, country)


def get_bedrock_response(city, country):
    """
    Generates pollution impact-related articles for a given city and country.

    Parameters:
    city (str): The name of the city.
    country (str): The name of the country.

    Returns:
    dict: A dictionary containing detailed responses for each impact category.
    """
    # TODO: Implement the logic to customize responses based on
    # city and country.
    # Currently, the responses are static and specific to Poland.

    # Articles describing the impacts of PM2.5 pollution in various categories
    return {
        'short-term': ("In Poland, PM2.5 pollution can quickly cause "
                       "breathing difficulties, triggering asthma and "
                       "allergies. It's like an invisible fog that can make "
                       "our cities smell bad and turn our daily walks or "
                       "outdoor activities into unhealthy "
                       "experiences."),
        'long-term': ("Over time, PM2.5 pollution in Poland can lead to "
                      "serious long-term health issues. It's not just about "
                      "coughs or colds; these tiny particles can "
                      "contribute to heart diseases and affect the health of "
                      "unborn children, impacting future generations."),
        'environment': ("PM2.5 affects not just us, but also Poland's natural "
                        "beauty. It can harm animals, weaken plants, and "
                        "damage crops. Imagine our beautiful forests and "
                        "fields suffering under a cloud of pollution, leading "
                        "to issues like acid rain that harm our environment."),
        'global-warming': ("These tiny PM2.5 particles in Poland also "
                           "contribute to global warming. They might seem "
                           "small, but they have a big impact on our climate, "
                           "leading to more extreme weather like hotter "
                           "summers and colder winters, changing the way we "
                           "experience our seasons.")
    }
