"""
FastAPI application: REST API for Smart Farm (Sensors, Alerts).
CORS configured for React frontend at http://localhost:5173.
"""
import os
import json
import io
import random
from PIL import Image
from google import genai
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, Query, File, UploadFile, Form
import asyncio # We need this to simulate the AI "thinking" time without crashing the server
from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

# Added SessionLocal so we can talk to the database
from database import engine, SessionLocal 
import models  
from schemas import SensorCreate, SensorRead, AlertCreate, AlertRead
from models import Sensor, Alert

# --- MISSING FUNCTION ADDED ---
# This creates a fresh database session for each request and closes it after
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create DB tables on startup (for dev; use migrations in production)."""
    # Fixed this line so it knows where to find 'Base'
    models.Base.metadata.create_all(bind=engine)
    yield
    # shutdown cleanup if needed

# Cleaned up FastAPI initialization
app = FastAPI(
    title="AgriSense Smart Farm API",
    description="Backend API for sensor grid and alerts",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    # Allow all origins for testing. Later, you can change "*" to your specific Vercel URLs.
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {
        "message": "AgriSense Cloud Brain is LIVE! 🚀",
        "status": "Ready",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "database": "connected"}

# Allow React dev server and common origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://stitch-swart.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {"message": "AgriSense Cloud Brain is LIVE! 🚀", "status": "Ready to help the farm."}

# ---------- Sensors ----------
@app.get("/api/sensors", response_model=list[SensorRead])
def list_sensors(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    status: str | None = None,
    location_zone: str | None = None,
):
    """List sensors with optional filters and pagination."""
    q = db.query(Sensor)
    if status:
        q = q.filter(Sensor.status == status)
    if location_zone:
        q = q.filter(Sensor.location_zone.ilike(f"%{location_zone}%"))
    return q.offset(skip).limit(limit).all()

@app.get("/api/sensors/{sensor_id}", response_model=SensorRead)
def get_sensor(sensor_id: int, db: Session = Depends(get_db)):
    """Get a single sensor by ID."""
    sensor = db.query(Sensor).filter(Sensor.id == sensor_id).first()
    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")
    return sensor

@app.post("/api/sensors", response_model=SensorRead, status_code=201)
def create_sensor(sensor: SensorCreate, db: Session = Depends(get_db)):
    """Create a new sensor."""
    db_sensor = Sensor(
        type=sensor.type,
        status=sensor.status,
        location_zone=sensor.location_zone,
    )
    db.add(db_sensor)
    db.commit()
    db.refresh(db_sensor)
    return db_sensor

# ---------- Alerts ----------
@app.get("/api/alerts", response_model=list[AlertRead])
def list_alerts(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    resolved: bool | None = None,
    severity: str | None = None,
):
    """List alerts with optional filters and pagination."""
    q = db.query(Alert)
    if resolved is not None:
        q = q.filter(Alert.resolved_status == resolved)
    if severity:
        q = q.filter(Alert.severity == severity)
    q = q.order_by(Alert.triggered_at.desc())
    return q.offset(skip).limit(limit).all()

@app.get("/api/alerts/{alert_id}", response_model=AlertRead)
def get_alert(alert_id: int, db: Session = Depends(get_db)):
    """Get a single alert by ID."""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@app.post("/api/alerts", response_model=AlertRead, status_code=201)
def create_alert(alert: AlertCreate, db: Session = Depends(get_db)):
    """Create a new alert."""
    db_alert = Alert(
        severity=alert.severity,
        message=alert.message,
        resolved_status=alert.resolved_status,
    )
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

# ---------- AI Vision Models ----------
# Configure the Gemini API using the key from docker-compose
# ---------- AI Vision Models ----------
# ---------- AI Vision Models ----------
@app.post("/api/analyze-plant")
async def analyze_plant(file: UploadFile = File(...), language: str = Form("en")):
    """
    Receives an image and language preference, sends it to Google's GenAI Vision API,
    and returns a structured JSON diagnosis in the requested language.
    """
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
        
        # Map the 2-letter code to the full language name for better AI prompting
        lang_map = {"en": "English", "hi": "Hindi", "te": "Telugu", "ta": "Tamil", "kn": "Kannada", "ml": "Malayalam"}
        target_language = lang_map.get(language, "English")
        
        prompt = f"""
        You are an expert plant pathologist and agronomist. Analyze this image of a plant.
        Identify any diseases, pests, or nutrient deficiencies.
        
        You MUST return your response as a raw JSON object with EXACTLY these four keys:
        "status": (e.g., 'Healthy', 'Needs Attention', 'Critical'),
        "diagnosis": (A 1-2 sentence description of what you see),
        "confidence": (A percentage, e.g., '95%'),
        "treatment": (Actionable, step-by-step advice for the farmer to fix it)
        
        CRITICAL INSTRUCTION: You MUST write the actual advice and descriptions for "status", "diagnosis", and "treatment" in {target_language}. 
        However, the JSON keys themselves MUST remain in English exactly as written above.
        
        Do NOT include any markdown formatting like ```json. Just return the pure JSON bracket structure.
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt, image]
        )
        
        result_text = response.text.strip()
        if result_text.startswith("```json"):
            result_text = result_text.replace("```json", "").replace("```", "").strip()
            
        diagnosis_data = json.loads(result_text)
        return diagnosis_data

    except Exception as e:
        print(f"AI Vision Error: {e}")
        raise HTTPException(status_code=500, detail="The AI failed to analyze the image.")

@app.post("/api/analyze-animal")
async def analyze_animal(file: UploadFile = File(...), language: str = Form("en")):
    """
    Receives an image of livestock and a language preference, sends it to GenAI,
    and returns a structured JSON veterinary diagnosis in the requested language.
    """
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
        
        lang_map = {"en": "English", "hi": "Hindi", "te": "Telugu", "ta": "Tamil", "kn": "Kannada", "ml": "Malayalam"}
        target_language = lang_map.get(language, "English")
        
        prompt = f"""
        You are an expert livestock veterinarian and animal care specialist. Analyze this image of a farm animal.
        Identify any visible injuries, skin conditions, signs of illness, or general health status.
        
        You MUST return your response as a raw JSON object with EXACTLY these four keys:
        "status": (e.g., 'Healthy', 'Needs Vet Attention', 'Critical'),
        "diagnosis": (A 1-2 sentence description of what you observe),
        "confidence": (A percentage, e.g., '90%'),
        "treatment": (Actionable, safe first-aid or care advice for the farmer)
        
        CRITICAL INSTRUCTION: You MUST write the actual advice and descriptions for "status", "diagnosis", and "treatment" in {target_language}. 
        However, the JSON keys themselves MUST remain in English exactly as written above.
        
        Do NOT include any markdown formatting like ```json. Just return the pure JSON bracket structure.
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt, image]
        )
        
        result_text = response.text.strip()
        if result_text.startswith("```json"):
            result_text = result_text.replace("```json", "").replace("```", "").strip()
            
        diagnosis_data = json.loads(result_text)
        return diagnosis_data

    except Exception as e:
        print(f"Animal Vision Error: {e}")
        raise HTTPException(status_code=500, detail="The AI failed to analyze the animal image.")
# ---------- GPS Tracking Models ----------
@app.get("/api/cows")
def get_cow_locations():
    """
    Simulates live GPS collar data from the herd.
    Returns grid coordinates, status, and health metrics.
    """
    cows = [
        {"id": "TAG-892", "name": "Bessie", "color": "bg-white"},
        {"id": "TAG-104", "name": "Daisy", "color": "bg-stone-800"},
        {"id": "TAG-443", "name": "Buttercup", "color": "bg-amber-600"},
        {"id": "TAG-991", "name": "Clarabelle", "color": "bg-white"},
        {"id": "TAG-007", "name": "Midnight", "color": "bg-stone-900"}
    ]
    
    live_data = []
    for cow in cows:
        # Generate random positions on our virtual farm grid (10% to 90% bounds)
        x_pos = round(random.uniform(10.0, 90.0), 1)
        y_pos = round(random.uniform(10.0, 90.0), 1)
        
        live_data.append({
            **cow,
            "position": {"x": x_pos, "y": y_pos},
            "status": "Grazing" if random.random() > 0.2 else "Resting",
            "battery": random.randint(45, 100),
            "heart_rate": random.randint(60, 85)
        })
        
    return live_data
# ---------- Weather API Models ----------
# ---------- Real weather (Open-Meteo: free, no API key) ----------
import time
import urllib.request
import urllib.parse
from datetime import datetime

_WEATHER_CACHE = {}          # {(lat, lon): (timestamp, payload)}
_WEATHER_TTL = 600           # cache for 10 minutes so we don't hammer the free API

# WMO weather codes -> readable text
_WMO = {
    0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Cloudy",
    45: "Fog", 48: "Fog",
    51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
    56: "Freezing Drizzle", 57: "Freezing Drizzle",
    61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
    66: "Freezing Rain", 67: "Freezing Rain",
    71: "Light Snow", 73: "Snow", 75: "Heavy Snow", 77: "Snow",
    80: "Rain Showers", 81: "Rain Showers", 82: "Heavy Showers",
    85: "Snow Showers", 86: "Snow Showers",
    95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm",
}


def _fetch_open_meteo(lat: float, lon: float) -> dict:
    """Blocking HTTP call to Open-Meteo (run it in a thread from async code)."""
    params = urllib.parse.urlencode({
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
        "daily": "weather_code,temperature_2m_max,precipitation_probability_max",
        "timezone": "auto",
        "forecast_days": 4,
    })
    url = f"https://api.open-meteo.com/v1/forecast?{params}"
    with urllib.request.urlopen(url, timeout=8) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _farm_advice(temp, humidity, wind, today_rain, next_rain_day):
    """Simple rule-based advice built from the real numbers."""
    tips = []
    if today_rain >= 60:
        tips.append("Rain is likely today - postpone spraying, harvesting and fertiliser application.")
    elif next_rain_day:
        when = "tomorrow" if next_rain_day == "Tomorrow" else f"on {next_rain_day}"
        tips.append(f"Rain is expected {when} - hold off on heavy irrigation until then.")
    else:
        tips.append("No rain expected soon - plan irrigation for your crops.")
    if temp >= 35:
        tips.append("It's very hot - water early morning or evening and give livestock shade and water.")
    elif temp <= 12:
        tips.append("It's cold - protect young plants and keep animals sheltered.")
    if wind >= 25:
        tips.append("Strong winds - avoid pesticide spraying today.")
    elif today_rain < 60 and wind < 20:
        tips.append("Good conditions for light field work.")
    if humidity >= 85:
        tips.append("High humidity - watch crops for fungal disease.")
    return " ".join(tips)


def _build_weather(data: dict) -> dict:
    """Turn the raw Open-Meteo response into the shape our frontend already uses."""
    cur = data["current"]
    daily = data["daily"]
    temp = round(cur["temperature_2m"])
    humidity = round(cur["relative_humidity_2m"])
    wind = round(cur["wind_speed_10m"])

    forecast = []
    next_rain_day = None
    for i in range(1, min(4, len(daily["time"]))):
        d = datetime.strptime(daily["time"][i], "%Y-%m-%d")
        label = "Tomorrow" if i == 1 else d.strftime("%A")
        cond = _WMO.get(daily["weather_code"][i], "Cloudy")
        rain_p = daily["precipitation_probability_max"][i] or 0
        if next_rain_day is None and rain_p >= 60:
            next_rain_day = label
        forecast.append({
            "day": label,
            "temp": round(daily["temperature_2m_max"][i]),
            "condition": cond,
            "rain_chance": rain_p,
        })

    today_rain = (daily["precipitation_probability_max"][0] or 0)
    return {
        "current": {
            "temperature": temp,
            "condition": _WMO.get(cur["weather_code"], "Cloudy"),
            "humidity": humidity,
            "wind_speed": wind,
            "rain_chance": today_rain,
        },
        "forecast": forecast,
        "advice": _farm_advice(temp, humidity, wind, today_rain, next_rain_day),
        "source": "Open-Meteo",
    }


@app.get("/api/weather")
async def get_weather(
    lat: float = Query(13.0827, ge=-90, le=90),     # default: Chennai
    lon: float = Query(80.2707, ge=-180, le=180),
):
    """Real weather for the given coordinates (defaults to Chennai)."""
    key = (round(lat, 2), round(lon, 2))
    cached = _WEATHER_CACHE.get(key)
    if cached and time.time() - cached[0] < _WEATHER_TTL:
        return cached[1]
    try:
        raw = await asyncio.to_thread(_fetch_open_meteo, key[0], key[1])
        payload = _build_weather(raw)
    except Exception as e:
        print(f"Weather fetch failed: {e}")
        raise HTTPException(status_code=502, detail="Weather service unavailable")
    _WEATHER_CACHE[key] = (time.time(), payload)
    return payload


# ---------- AI Chatbot Models ----------
@app.post("/api/chat")
async def chat_with_agri_ai(request: ChatRequest):
    """
    Receives a text message from the farmer, sends it to Gemini, 
    and returns an expert agricultural response.
    """
    try:
        client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
        
        # Give the AI its personality and instructions
        system_prompt = f"""
        You are 'Smart Farm AI', a friendly, highly knowledgeable agricultural expert and agronomist.
        Answer this farmer's question clearly, kindly, and accurately. 
        Keep your response concise (under 3 paragraphs) unless they ask for a detailed guide.
        
        Farmer's Question: {request.message}
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=system_prompt
        )
        
        return {"reply": response.text}

    except Exception as e:
        print(f"Chat AI Error: {e}")
        raise HTTPException(status_code=500, detail="The AI chatbot failed to respond.")
# ---------- Community Board Models ----------
@app.get("/api/stories")
def get_soil_stories():
    """
    Returns a list of community farming stories, tips, and soil health logs.
    """
    return [
        {
            "id": 1, 
            "author": "Maria V.", 
            "crop": "Heirloom Tomatoes", 
            "date": "2 days ago",
            "title": "Beating Blossom End Rot!", 
            "content": "I started adding finely crushed eggshells to my compost bins last season to boost calcium. Just got my first soil test back for the spring, and the calcium levels are perfect. Highly recommend this trick!", 
            "likes": 24,
            "tags": ["Composting", "Tomatoes", "Calcium"]
        },
        {
            "id": 2, 
            "author": "David K.", 
            "crop": "Sweet Corn", 
            "date": "1 week ago",
            "title": "Moisture Retention with No-Till", 
            "content": "Switched a 5-acre test plot to no-till farming this year. Even during that massive dry spell last month, the soil moisture probes read 30% higher than the tilled fields. The worms are doing all the aeration work for me!", 
            "likes": 89,
            "tags": ["No-Till", "Water Saving", "Corn"]
        },
        {
            "id": 3, 
            "author": "Sarah J.", 
            "crop": "Winter Wheat", 
            "date": "2 weeks ago",
            "title": "Crimson Clover as a Cover Crop", 
            "content": "Planted crimson clover over the winter to stop erosion on the east hill. The nitrogen fix was incredible—the soil looks rich and dark, and I'm going to save a fortune on synthetic fertilizer this season.", 
            "likes": 56,
            "tags": ["Cover Crops", "Nitrogen", "Sustainability"]
        }
    ]
    
@app.get("/health")
def health():
    """Health check for load balancers and Docker."""
    return {"status": "ok"}
