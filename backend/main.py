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
@app.get("/api/weather")
def get_weather():
    """
    Simulates a live weather API returning current conditions and farm advice.
    """
    return {
        "current": {
            "temperature": 24,
            "condition": "Partly Cloudy",
            "humidity": 65,
            "wind_speed": 12,
            "soil_moisture": "Adequate"
        },
        "forecast": [
            {"day": "Tomorrow", "temp": 26, "condition": "Sunny"},
            {"day": "Wednesday", "temp": 22, "condition": "Rain"},
            {"day": "Thursday", "temp": 21, "condition": "Cloudy"}
        ],
        "advice": "Perfect conditions for light tractor work. Hold off on heavy crop watering since rain is expected on Wednesday."
    }
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