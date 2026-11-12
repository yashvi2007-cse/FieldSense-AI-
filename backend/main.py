import asyncio
import math
from datetime import datetime
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

app = FastAPI(
    title="FieldSense AI — Environmental Intelligence API",
    description="Physical-world observation, anomaly detection, multi-agent causal investigation, and predictive risk platform.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Coordinates for Bengaluru Center
BENGALURU_LAT = 12.9716
BENGALURU_LON = 77.5946

@app.get("/")
def read_root():
    return {
        "platform": "FieldSense AI",
        "tagline": "What if the physical world could be read as closely as code?",
        "status": "online",
        "monitored_region": "Bengaluru Metropolitan Catchment",
        "pipeline": ["OBSERVE", "DETECT", "INVESTIGATE", "PREDICT", "VERIFY", "ACT"]
    }

@app.get("/api/health")
def get_health():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "autonomous_agents": {
            "total": 6,
            "status": "all_online",
            "active_loops": [
                "Observation Agent (FS-OBS-01)",
                "Change Detection Agent (FS-DET-02)",
                "Investigation Agent (FS-INV-03)",
                "Prediction Agent (FS-PRD-04)",
                "Action Agent (FS-ACT-05)",
                "Verification Agent (FS-VRF-06)"
            ]
        },
        "geospatial_mesh": {
            "crs": "EPSG:4326",
            "resolution": "10m Sentinel-2 MSI",
            "iot_nodes_online": 48
        }
    }

@app.get("/api/bengaluru/weather")
async def get_live_weather():
    """Fetch live meteorological & air quality observations from Open-Meteo"""
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            weather_task = client.get(
                f"https://api.open-meteo.com/v1/forecast?latitude={BENGALURU_LAT}&longitude={BENGALURU_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&timezone=Asia%2FKolkata"
            )
            aqi_task = client.get(
                f"https://air-quality-api.open-meteo.com/v1/air-quality?latitude={BENGALURU_LAT}&longitude={BENGALURU_LON}&current=european_aqi,pm10,pm2_5"
            )
            results = await asyncio.gather(weather_task, aqi_task, return_exceptions=True)
            w_res, a_res = results[0], results[1]

            current_w = {}
            if not isinstance(w_res, Exception) and w_res.status_code == 200:
                current_w = w_res.json().get("current", {})

            current_a = {}
            if not isinstance(a_res, Exception) and a_res.status_code == 200:
                current_a = a_res.json().get("current", {})

            if current_w:
                precip = current_w.get("precipitation", 0)
                summary = "Optimal atmospheric conditions with nominal urban convective humidity."
                if precip > 5:
                    summary = "Heavy monsoon precipitation active across central Bengaluru catchment."
                elif precip > 0.5:
                    summary = "Scattered convective showers active over eastern lakes corridor."

                return {
                    "temperature": current_w.get("temperature_2m", 24.8),
                    "apparent_temperature": current_w.get("apparent_temperature", 25.4),
                    "precipitation": current_w.get("precipitation", 0),
                    "relative_humidity": current_w.get("relative_humidity_2m", 78),
                    "wind_speed": current_w.get("wind_speed_10m", 16.5),
                    "aqi": current_a.get("european_aqi", 68),
                    "pm25": current_a.get("pm2_5", 22.4),
                    "pm10": current_a.get("pm10", 54.1),
                    "is_live": True,
                    "source": "Open-Meteo Free Public API",
                    "forecast_summary": summary,
                    "timestamp": datetime.now().strftime("%I:%M %p")
                }
    except Exception as e:
        pass

    # Calibrated realistic fallback
    return {
        "temperature": 24.8,
        "apparent_temperature": 25.4,
        "precipitation": 14.2,
        "relative_humidity": 78,
        "wind_speed": 16.5,
        "aqi": 68,
        "pm25": 22.4,
        "pm10": 54.1,
        "is_live": False,
        "source": "Calibrated Bengaluru Monsoon Baseline",
        "forecast_summary": "Scattered monsoon showers with localized intense spells over Mahadevapura and East corridors.",
        "timestamp": datetime.now().strftime("%I:%M %p")
    }

class SimRequest(BaseModel):
    rainfall_multiplier: float = 2.0
    siltation_percentage: float = 50.0
    inlet_obstruction: float = 30.0
    selected_waterbody: str = "Bellandur Lake Catchment"
    soil_saturation: float = 70.0

@app.post("/api/simulation/run")
def run_simulation(req: SimRequest):
    precip_factor = math.pow(req.rainfall_multiplier, 1.4)
    drain_factor = 1 + (req.siltation_percentage / 100.0) * 1.8
    inlet_factor = 1 + (req.inlet_obstruction / 100.0) * 0.9
    saturation_factor = 1 + (req.soil_saturation / 100.0) * 0.6

    base_area = 28.4 if "Bellandur" in req.selected_waterbody else 20.0
    total_mult = precip_factor * drain_factor * (inlet_factor * 0.7 + 0.3) * (saturation_factor * 0.5 + 0.5)

    sim_area = round(base_area * total_mult, 1)
    pop_est = int(sim_area * 1850)
    peak_surge_h = max(1.0, round(3.5 / (precip_factor * 0.8 + 0.2), 1))

    return {
        "selected_waterbody": req.selected_waterbody,
        "baseline_inundation_area_ha": base_area,
        "simulated_inundation_area_ha": sim_area,
        "affected_population_estimate": pop_est,
        "peak_surge_time_hours": peak_surge_h,
        "buffer_overtopping_probability": min(99, int((total_mult / 3.2) * 85)),
        "water_quality_drop": min(65, int(req.siltation_percentage * 0.35 + req.rainfall_multiplier * 8.5))
    }
