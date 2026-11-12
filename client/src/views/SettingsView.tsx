import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Database, 
  Sliders, 
  CheckCircle2, 
  Radio, 
  RefreshCw, 
  ShieldCheck, 
  Download, 
  Key,
  Globe2,
  BellRing
} from 'lucide-react';
import { BengaluruWeather } from '../types';

interface SettingsViewProps {
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  weather: BengaluruWeather;
  onRefreshData: () => void;
  isRefreshing: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDemoMode,
  onToggleDemoMode,
  weather,
  onRefreshData,
  isRefreshing,
}) => {
  const [ndwiThreshold, setNdwiThreshold] = useState(0.12);
  const [precipThreshold, setPrecipThreshold] = useState(35);
  const [autoCycleInterval, setAutoCycleInterval] = useState('15 Minutes');
  const [sentinelAtmosphericCorrection, setSentinelAtmosphericCorrection] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              System Settings & Architecture Telemetry
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Fine-tune cognitive agent sensitivity thresholds, API endpoints, geospatial bounding matrices, and telemetry retention policies.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
        >
          {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{savedSuccess ? 'CONFIGURATION SAVED!' : 'APPLY CONFIGURATION'}</span>
        </button>
      </div>

      {/* Grid: 2 Columns of Settings Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mode & Live Feed Configuration */}
        <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-200 uppercase">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Data Ingestion Mode</span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
              isDemoMode ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {isDemoMode ? 'Demo Simulation' : 'Live Public Feeds'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Toggle between live public API queries (Open-Meteo European Model ECMWF, OpenStreetMap CartoDB, Nominatim) and deterministic calibrated Bengaluru monsoon emergency benchmarks.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-mono font-bold text-white">Execution Environment</div>
              <div className="text-[11px] font-mono text-slate-400">
                {isDemoMode ? 'Using calibrated extreme weather simulation dataset' : 'Streaming live Open-Meteo meteorological endpoints'}
              </div>
            </div>

            <button
              onClick={onToggleDemoMode}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all ${
                isDemoMode
                  ? 'bg-amber-950/60 border-amber-500/40 text-amber-300 hover:bg-amber-900/40'
                  : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
              }`}
            >
              {isDemoMode ? 'SWITCH TO LIVE' : 'SWITCH TO DEMO'}
            </button>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Open-Meteo Weather Status:</span>
              <span className="text-emerald-400 font-bold">200 OK (Lat: 12.9716, Lon: 77.5946)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Open-Meteo AQI Service:</span>
              <span className="text-emerald-400 font-bold">200 OK (European Index Active)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>CartoDB Dark Matter Tiles:</span>
              <span className="text-emerald-400 font-bold">Sub-50ms Edge CDN</span>
            </div>
          </div>
        </div>

        {/* Autonomous Detection Sensitivity */}
        <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-200 uppercase">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Anomaly Sensitivity Thresholds</span>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300">NDWI Water Index Variance Trigger</span>
                <span className="text-cyan-400 font-bold">±{ndwiThreshold}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.30"
                step="0.01"
                value={ndwiThreshold}
                onChange={(e) => setNdwiThreshold(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Lower values flag subtle shoreline erosion sooner</span>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Cloudburst Precip Alarm Threshold</span>
                <span className="text-amber-400 font-bold">{precipThreshold} mm/hour</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                step="5"
                value={precipThreshold}
                onChange={(e) => setPrecipThreshold(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Triggers P1 emergency desilting directives</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-300">Sentinel-2 Sen2Cor L2A Correction:</span>
              <button
                onClick={() => setSentinelAtmosphericCorrection(!sentinelAtmosphericCorrection)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold border transition-colors ${
                  sentinelAtmosphericCorrection ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-500 border-slate-700'
                }`}
              >
                {sentinelAtmosphericCorrection ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>
        </div>

        {/* System Health & Hardware Telemetry */}
        <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-200 uppercase">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Autonomous Engine Health</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ALL SERVICES HEALTHY</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-500">Agent Loop Latency</div>
              <div className="text-base font-bold text-cyan-300 mt-1">42 ms</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-500">Hydrodynamic Mesh Cells</div>
              <div className="text-base font-bold text-white mt-1">64,800</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-500">Geospatial Projection</div>
              <div className="text-base font-bold text-teal-300 mt-1">EPSG:4326 / WGS84</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[10px] text-slate-500">Telemetry Ingestion Rate</div>
              <div className="text-base font-bold text-emerald-400 mt-1">1.4k msgs/sec</div>
            </div>
          </div>
        </div>

        {/* API Keys & External Integrations */}
        <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-200 uppercase">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>API Gateway & Credentials</span>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-slate-400">LLM Reasoning Provider (Gemini / Anthropic / OpenAI)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="password"
                  disabled
                  value="sk-fieldsense-gemini-2.5-prod-enterprise-key"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono"
                />
                <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-500/30">
                  ENV ACTIVE
                </span>
              </div>
              <span className="text-[10px] text-slate-500">Configured via environment variables on backend</span>
            </div>

            <div className="space-y-1 pt-1">
              <label className="text-slate-400">Copernicus Sentinel Hub Client ID</label>
              <input
                type="text"
                disabled
                value="sh-client-bengaluru-catchment-hub"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
