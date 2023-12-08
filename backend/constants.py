DEFAULT_BEDROCK_TEMPLATE = (
    "The current air quality in {city}, " "{country} is: {pn25}"
)
BEDROCK_TEMPLATES = {
    "healthiness": """
The current air quality in {city}, {country} is:
 -pm25: {pm25}

Based on the current Air quality, what is the impact to my health?
The response should be in 3 sentences.
Start with: "The impact of air quality on your health can be"
        """,

    "environment": """
The current air quality in {city}, {country} is:
 -pm25: {pm25}

Based on the current Air quality, what is the impact to the environment?
The response should be in 3 sentences.
Start with: "The impact of air quality to the environment is"
        """,
        
    "solutions": """
The current air quality in {city}, {country} is:
 -pm25: {pm25}

Based on the current Air quality, why do we need solutions?
The response should be in 3 sentences.
Start with: "We need solutions to the air quality status because"
        """,

    "justice": """
The current air quality in {city}, {country} is:
 -pm25: {pm25}

Based on the current Air quality, how can we obtain justice?
The response should be in 3 sentences.
Start with: "We can aim to obtain justice via"
        """,
}
