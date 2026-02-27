"""
Pydantic schemas for request/response validation.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field

from models import SensorStatus, AlertSeverity, UserRole


# ----- Users -----
class UserBase(BaseModel):
    name: str
    role: UserRole = UserRole.VIEWER
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserRead(UserBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# ----- Sensors -----
class SensorBase(BaseModel):
    type: str = Field(..., max_length=64)
    status: SensorStatus = SensorStatus.ACTIVE
    location_zone: str = Field(..., max_length=128)


class SensorCreate(SensorBase):
    pass


class SensorRead(SensorBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# ----- Telemetry -----
class TelemetryDataBase(BaseModel):
    sensor_id: int
    timestamp: datetime
    reading_value: Optional[float] = None


class TelemetryDataCreate(TelemetryDataBase):
    pass


class TelemetryDataRead(TelemetryDataBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# ----- Alerts -----
class AlertBase(BaseModel):
    severity: AlertSeverity
    message: str = Field(..., max_length=512)
    resolved_status: bool = False


class AlertCreate(AlertBase):
    pass


class AlertRead(AlertBase):
    id: int
    triggered_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
