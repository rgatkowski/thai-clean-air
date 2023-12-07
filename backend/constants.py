DEFAULT_BEDROCK_TEMPLATE = (
    "The current air quality in {city}, " "{country} is: {pn25}"
)
BEDROCK_TEMPLATES = {
    "short-term": """
The current air quality in {city}, {country} is:
 -pm25: {pm25}

Based on the current Air quality, what is the short term impact to my health?
The response should be in 3 sentences.
Start with: "The air quality in your location is ..."
        """,
    "long-term": """
The current air quality in {city}, {country} is:
 -pm25: {pm25}

Based on the current Air quality, what is the long term impact to my health?
The response should be in 3 sentences.
Start with: "The long-term impact of air quality on health can be"
        """,
    "environment": """
The current air quality in {city}, {country} is:
 -pm25: {pm25}

Based on the current Air quality, what is the impact to the environment?
The response should be in 3 sentences.
Start with: "The impact to the environment is"
        """,
    "global-warming": """
The current air quality in {city}, {country} is:
 -pm25: {pm25}

Based on the current Air quality, what is the impact to global warming?
The response should be in 3 sentences.
Start with: "The impact to the global warming is"
        """,
}
