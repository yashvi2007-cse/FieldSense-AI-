# FieldSense AI — Autonomous Physical-World Intelligence Platform

> **“What if the physical world could be read as closely as code?”**

FieldSense AI is an autonomous physical-world intelligence command centre that continuously observes environmental and urban conditions, detects meaningful changes against historical baselines, investigates root causes through multi-modal evidence attribution, predicts future risk trajectories, and dispatches verified municipal interventions.

The demonstration domain is **urban water and environmental intelligence**, using **Bengaluru** as the demonstration region.

---

## 🌊 The Autonomous Intelligence Pipeline

FieldSense AI implements a closed-loop cognitive pipeline:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   OBSERVE   │ ──► │   DETECT    │ ──► │ INVESTIGATE │
│ Agent 01    │     │ Agent 02    │     │ Agent 03    │
└─────────────┘     └─────────────┘     └─────────────┘
       ▲                                       │
       │                                       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   VERIFY    │ ◄── │     ACT     │ ◄── │   PREDICT   │
│ Agent 06    │     │ Agent 05    │     │ Agent 04    │
└─────────────┘     └─────────────┘     └─────────────┘
```

1. **OBSERVE (Observation Agent FS-OBS-01)**: Aggregates real-time satellite multispectral rasters (Sentinel-2 L2A NDWI/NDVI), live Open-Meteo European Model meteorological observations, and 48 municipal IoT gauge telemetry feeds.
2. **DETECT (Change Detection Agent FS-DET-02)**: Compares physical observations against 10-year rolling seasonal baselines to isolate water spread shrinkage, toxic effluent discharges, and drain cross-section siltation.
3. **INVESTIGATE (Investigation Agent FS-INV-03)**: Traverses drainage topology, cadastral boundaries, and industrial zoning to generate ranked causal hypotheses with probabilistic certainty and evidence citations.
4. **PREDICT (Prediction Agent FS-PRD-04)**: Computes 2D hydrodynamic simulations (Saint-Venant models) across 24h, 48h, and 7-day horizons, projecting flash flood inundation envelopes and toxic froth dispersion.
5. **ACT (Action Agent FS-ACT-05)**: Formulates prioritized operational directives (P1 Immediate, P2 High, P3 Standard) mapped to municipal jurisdictions (BBMP, BWSSB, KSPCB, SDRF).
6. **VERIFY (Verification Agent FS-VRF-06)**: Validates post-intervention sensor readings and subsequent satellite passes to verify whether anomalies were resolved or require escalation.

---

## 🏛️ Application Architecture & Views

The platform is organized into 10 specialized intelligence modules:

1. **Overview Dashboard**: High-level command centre with environmental KPI cards, live geospatial surveillance grid, atmospheric telemetry, 24h catchment hydrodynamics, and active directives.
2. **Live Earth Monitor**: Interactive geospatial monitoring map powered by Leaflet and CartoDB Dark Matter tiles, featuring layers for water bodies, stormwater drain networks (K-100 SWD, Vrishabhavathi Valley, Challaghatta), IoT nodes, anomaly radars, and Sentinel NDWI overlays.
3. **Agent Command Centre**: Visual orchestration graph displaying all six specialized agents, live execution status, audit logs, individual agent trigger buttons, and a master trigger for the entire autonomous cycle.
4. **Change Detection**: Filterable catalog of detected anomalies categorized by severity (Critical, High, Medium) with baseline vs. observed deltas, confidence ratings, and uncertainty bounds.
5. **Investigation Centre**: Deep-dive causal dossier answering the 7 core forensic questions: What changed? Where did it happen? When was it detected? What evidence supports it? What might have caused it? What could happen next? What should be done?
6. **Risk Prediction**: Multi-horizon predictive dashboard (24h, 48h, 7d) showing spatial risk scores, 7-day inundation trajectories, and primary driving factor contribution breakdowns.
7. **Simulation Lab**: Interactive scenario stress-testing sandbox where users can adjust rainfall multipliers (cloudburst simulation up to 120mm/h), drain siltation %, inlet obstruction %, and soil saturation to view real-time inundation area deltas and 24h hydrographs.
8. **Action Centre**: Operational ticket management system with priority filters, municipal agency routing, working completion toggles, activity logs, and a modal to dispatch custom field directives.
9. **Evidence Centre**: Provable telemetry archive containing raw JSON payloads, sensor serials, and spectral band metadata (Sentinel-2, IoT Ultrasonic Sonar, KSPCB Spectrophotometry, Drone Orthomosaics) directly traceable back to anomalies.
10. **Settings**: Configuration suite for toggling between Live Public Telemetry (Open-Meteo) and Calibrated Demo Scenario mode, adjusting anomaly sensitivity thresholds, and inspecting system health.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended)
- Python (v3.10+ recommended)

### 1. Install & Launch Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`.

### 2. Launch FastAPI Backend (Optional)

```bash
# In project root:
source .venv/bin/activate
uvicorn backend.main:app --reload --port 8000
```

Backend API documentation (Swagger UI) is available at `http://localhost:8000/docs`.

---

## 🛰️ Public Data Sources Integrated

- **Open-Meteo Forecast API**: Live hourly precipitation, ambient temperature, apparent temperature, relative humidity, and wind velocity for Bengaluru (`12.9716°N, 77.5946°E`).
- **Open-Meteo Air Quality API**: European Air Quality Index (AQI), PM2.5, and PM10 metrics.
- **CartoDB & OpenStreetMap**: High-contrast Dark Matter cartography and geospatial base tiles.
- **Sentinel-2 Multispectral MSI & IoT Network**: Calibrated multispectral reflectance and ultrasonic telemetry data representing Bengaluru's premier water bodies (Bellandur Lake, Varthur Lake, Ulsoor Lake, Sankey Tank, Hebbal Lake, Kaggadasapura Lake).

---

## 🛡️ License

MIT License. Built for the autonomous physical-world intelligence challenge.

