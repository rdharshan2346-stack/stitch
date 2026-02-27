"""
SQLAlchemy ORM models for the Smart Farm.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

from database import Base


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    FIELD_MANAGER = "field_manager"
    VIEWER = "viewer"


class SensorStatus(str, enum.Enum):
    ACTIVE = "active"
    WARNING = "warning"
    INACTIVE = "inactive"
    ERROR = "error"


class AlertSeverity(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), nullable=False, default=UserRole.VIEWER)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Sensor(Base):
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    type = Column(String(64), nullable=False)  # e.g. "moisture", "temperature"
    status = Column(SQLEnum(SensorStatus), nullable=False, default=SensorStatus.ACTIVE)
    location_zone = Column(String(128), nullable=False)  # e.g. "Sector B-4"
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    telemetry_data = relationship("TelemetryData", back_populates="sensor", cascade="all, delete-orphan")


class TelemetryData(Base):
    __tablename__ = "telemetry_data"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sensor_id = Column(Integer, ForeignKey("sensors.id", ondelete="CASCADE"), nullable=False, index=True)
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)
    reading_value = Column(Float, nullable=True)  # null for "no data" or error
    created_at = Column(DateTime, default=datetime.utcnow)

    sensor = relationship("Sensor", back_populates="telemetry_data")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    severity = Column(SQLEnum(AlertSeverity), nullable=False)
    message = Column(String(512), nullable=False)
    triggered_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    resolved_status = Column(Boolean, nullable=False, default=False)
    resolved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
