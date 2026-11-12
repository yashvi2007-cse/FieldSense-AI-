import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  AlertTriangle, 
  Droplets, 
  Activity, 
  Maximize2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MONITORED_WATERBODIES, STORMWATER_DRAIN_CORRIDORS, IOT_MONITORING_NODES } from '../data/bengaluruGeo';
import { Anomaly, MonitoredWaterbody } from '../types';

// Fix Leaflet standard icons in modern bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Create custom futuristic SVG HTML markers
const createPulsingIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
        <span style="position: absolute; width: 28px; height: 28px; border-radius: 50%; background: ${color}; opacity: 0.3; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <span style="position: relative; width: 14px; height: 14px; border-radius: 50%; background: ${color}; border: 2px solid #080c14; box-shadow: 0 0 10px ${color};"></span>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

const anomalyIconCritical = createPulsingIcon('#ef4444', 'CRIT');
const anomalyIconHigh = createPulsingIcon('#f59e0b', 'WARN');
const waterbodyIcon = createPulsingIcon('#00e5ff', 'LAKE');
const sensorIcon = createPulsingIcon('#10b981', 'IOT');

interface InteractiveMapProps {
  anomalies: Anomaly[];
  onSelectAnomaly?: (anomaly: Anomaly) => void;
  onSelectWaterbody?: (wb: MonitoredWaterbody) => void;
  height?: string;
  showControls?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  anomalies,
  onSelectAnomaly,
  onSelectWaterbody,
  height = '540px',
  showControls = true,
}) => {
  const [showWaterbodies, setShowWaterbodies] = useState(true);
  const [showDrains, setShowDrains] = useState(true);
  const [showSensors, setShowSensors] = useState(true);
  const [showAnomalies, setShowAnomalies] = useState(true);
  const [satelliteOverlay, setSatelliteOverlay] = useState(false);

  const bengaluruCenter: [number, number] = [12.9716, 77.6200];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl bg-[#060a12]">
      {/* Map Layer Controls floating bar */}
      {showControls && (
        <div className="absolute top-3 left-3 z-[1000] flex flex-wrap gap-2 p-2 rounded-xl bg-[#0b1220]/90 backdrop-blur-md border border-cyan-500/30 text-xs font-mono shadow-xl">
          <button
            onClick={() => setShowWaterbodies(!showWaterbodies)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              showWaterbodies ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300' : 'bg-slate-900/50 border-slate-700 text-slate-400'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Waterbodies ({MONITORED_WATERBODIES.length})</span>
          </button>

          <button
            onClick={() => setShowDrains(!showDrains)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              showDrains ? 'bg-blue-950/70 border-blue-500/50 text-blue-300' : 'bg-slate-900/50 border-slate-700 text-slate-400'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Storm Drains</span>
          </button>

          <button
            onClick={() => setShowSensors(!showSensors)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              showSensors ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300' : 'bg-slate-900/50 border-slate-700 text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>IoT Gauges ({IOT_MONITORING_NODES.length})</span>
          </button>

          <button
            onClick={() => setShowAnomalies(!showAnomalies)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              showAnomalies ? 'bg-red-950/70 border-red-500/50 text-red-300' : 'bg-slate-900/50 border-slate-700 text-slate-400'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Anomalies ({anomalies.length})</span>
          </button>

          <button
            onClick={() => setSatelliteOverlay(!satelliteOverlay)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              satelliteOverlay ? 'bg-purple-950/70 border-purple-500/50 text-purple-300' : 'bg-slate-900/50 border-slate-700 text-slate-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sentinel NDWI</span>
          </button>
        </div>
      )}

      {/* Main Map */}
      <div style={{ height }}>
        <MapContainer
          center={bengaluruCenter}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', backgroundColor: '#060a12' }}
        >
          {/* High-Tech Dark Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />

          {/* Stormwater Drain Polyline Corridors */}
          {showDrains &&
            STORMWATER_DRAIN_CORRIDORS.map((drain) => (
              <Polyline
                key={drain.id}
                positions={drain.coordinates}
                pathOptions={{
                  color: drain.color,
                  weight: 3.5,
                  opacity: 0.85,
                  dashArray: '6, 6',
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                  <div className="font-mono text-xs">
                    <div className="font-bold text-cyan-300">{drain.name}</div>
                    <div className="text-slate-300 text-[10px]">{drain.status}</div>
                  </div>
                </Tooltip>
              </Polyline>
            ))}

          {/* Monitored Water Bodies */}
          {showWaterbodies &&
            MONITORED_WATERBODIES.map((wb) => {
              const radius = Math.min(1800, Math.max(600, Math.sqrt(wb.areaHa) * 80));
              const circleColor = wb.status === 'Critical Warning' ? '#ef4444' : wb.status === 'Advisory' ? '#f59e0b' : '#00e5ff';

              return (
                <React.Fragment key={wb.id}>
                  <Circle
                    center={wb.coordinates}
                    radius={radius}
                    pathOptions={{
                      color: circleColor,
                      fillColor: circleColor,
                      fillOpacity: satelliteOverlay ? 0.45 : 0.2,
                      weight: 1.5,
                    }}
                  />
                  <Marker
                    position={wb.coordinates}
                    icon={waterbodyIcon}
                  >
                    <Popup>
                      <div className="p-1 space-y-2 font-sans">
                        <div className="flex items-center justify-between border-b border-slate-700 pb-1">
                          <span className="font-bold text-sm text-cyan-300">{wb.name}</span>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            wb.status === 'Critical Warning' ? 'bg-red-500/20 text-red-300' : 'bg-cyan-500/20 text-cyan-300'
                          }`}>
                            {wb.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 space-y-1 font-mono">
                          <div>Surface Area: <span className="text-white font-bold">{wb.areaHa} Hectares</span></div>
                          <div>Current Stage: <span className="text-white font-bold">{wb.currentLevelMeters}m</span> / {wb.maxSafeCapacityMeters}m max</div>
                          <div>Water Quality Index: <span className="text-white font-bold">{wb.waterQualityIndex}/100</span></div>
                          <div>NDWI Shift: <span className={wb.recentNdwiDelta < 0 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>{wb.recentNdwiDelta}</span></div>
                        </div>
                        <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">
                          {wb.primaryIssue}
                        </div>
                        {onSelectWaterbody && (
                          <button
                            onClick={() => onSelectWaterbody(wb)}
                            className="w-full mt-2 py-1 px-2 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-900 transition-colors flex items-center justify-center space-x-1"
                          >
                            <span>Simulate Scenario for this Catchment</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}

          {/* IoT Telemetry Sensor Nodes */}
          {showSensors &&
            IOT_MONITORING_NODES.map((sensor) => (
              <Marker
                key={sensor.id}
                position={sensor.coords}
                icon={sensorIcon}
              >
                <Popup>
                  <div className="p-1 space-y-1.5 font-mono text-xs">
                    <div className="font-bold text-emerald-300 border-b border-slate-700 pb-1">
                      {sensor.name}
                    </div>
                    <div>Parameter: <span className="text-slate-200">{sensor.parameter}</span></div>
                    <div>Telemetry Reading: <span className="text-white font-bold text-sm">{sensor.reading}</span></div>
                    <div>Node Health: <span className="text-emerald-400 font-bold">{sensor.status}</span></div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Anomaly Alerts */}
          {showAnomalies &&
            anomalies.map((anom) => {
              const icon = anom.severity === 'critical' ? anomalyIconCritical : anomalyIconHigh;

              return (
                <Marker
                  key={anom.id}
                  position={anom.location.coordinates}
                  icon={icon}
                >
                  <Popup>
                    <div className="p-1 space-y-2 font-sans">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-1">
                        <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                          anom.severity === 'critical' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {anom.severity} Anomaly
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{anom.detectedAt}</span>
                      </div>
                      <div className="font-bold text-sm text-slate-100">{anom.title}</div>
                      <div className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800 font-mono">
                        <div>Metric: <span className="text-cyan-300">{anom.changeMetric.label}</span></div>
                        <div>Delta: <span className="text-red-400 font-bold">{anom.changeMetric.deltaPct > 0 ? `+${anom.changeMetric.deltaPct}%` : `${anom.changeMetric.deltaPct}%`}</span> ({anom.changeMetric.baselineValue} → {anom.changeMetric.observedValue})</div>
                        <div>Confidence: <span className="text-emerald-400">{anom.confidence}%</span> (Uncertainty {anom.uncertainty})</div>
                      </div>
                      {onSelectAnomaly && (
                        <button
                          onClick={() => onSelectAnomaly(anom)}
                          className="w-full mt-2 py-1.5 px-2 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-900 transition-colors flex items-center justify-center space-x-1"
                        >
                          <span>Launch Investigation Dossier</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>

      {/* Bottom telemetry overlay pill */}
      <div className="absolute bottom-3 right-3 z-[1000] px-3 py-1.5 rounded-xl bg-[#0b1220]/90 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-slate-300 shadow-xl flex items-center space-x-3">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>PostGIS EPSG:4326</span>
        </div>
        <span className="text-slate-600">|</span>
        <span>Resolution: 10m Sentinel-2 MSI</span>
      </div>
    </div>
  );
};
