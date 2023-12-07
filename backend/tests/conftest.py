import pytest
from bedrock import BedrockService


@pytest.fixture
def bedrock_service() -> BedrockService:
    return BedrockService()
