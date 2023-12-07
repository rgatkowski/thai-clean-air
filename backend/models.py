from pydantic import BaseModel, validator


class Coordinates(BaseModel):
    lat: float
    lon: float

    @validator('lat')
    def check_latitude(cls, v):
        if not -90 <= v <= 90:
            raise ValueError('Latitude must be between -90 and 90.')
        return v

    @validator('lon')
    def check_longitude(cls, v):
        if not -180 <= v <= 180:
            raise ValueError('Longitude must be between -180 and 180.')
        return v
