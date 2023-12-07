import pytest
import utils
from fastapi import HTTPException
from models import Coordinates


def test_validate_coordinates_positive():
    coordinates_string = "1.1, 1.2"
    result = utils.validate_coordinates(coordinates_string)
    assert result == Coordinates(lat=1.1, lon=1.2)


def test_validate_coordinates_negative():
    with pytest.raises(HTTPException):
        utils.validate_coordinates("wrong string")
