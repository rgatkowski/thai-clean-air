from constants import BEDROCK_TEMPLATES


def test_get_template_wrong_type(bedrock_service):
    prompt_template = bedrock_service._get_template("wrong")
    assert (
        prompt_template.template == "The current air quality in {city}, "
        "{country} is: {pn25}"
    )


def test_get_template_correct_type(bedrock_service):
    prompt_template = bedrock_service._get_template("short-term")
    assert prompt_template.template == BEDROCK_TEMPLATES["short-term"]
