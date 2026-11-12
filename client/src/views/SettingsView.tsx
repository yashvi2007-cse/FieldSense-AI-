import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  Radio, 
  ShieldCheck, 
  Key,
  Sparkles
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
  const [sentinelAtmosphericCorrection, setSentinelAtmosphericCorrection] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 lg:p-8 rounded-3xl modern-card">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Settings & Platform Architecture
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Configure agent sensitivity thresholds, API gateway telemetry, and real-time public observation feeds.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 rounded-full font-mono text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
        >
          {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{savedSuccess ? 'SAVED' : 'SAVE CONFIGURATION'}</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ingestion Mode */}
        <div className="p-6 lg:p-8 rounded-3xl modern-card space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center space-x-2 text-sm font-semibold text-white">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Data Ingestion Environment</span>
            </div>
            <span className={`text-[10px] font-mono px-3 py-1 rounded-full font-bold uppercase ${
              isDemoMode ? 'bg-amber-500/10 text-amber-300' : 'bg-emerald-500/10 text-emerald-300'
            }`}>
              {isDemoMode ? 'Demo Mode' : 'Live Feeds'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Toggle between live public API queries (Open-Meteo European Model ECMWF, OpenStreetMap CartoDB, Nominatim) and deterministic calibrated Bengaluru monsoon emergency benchmarks.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Public Telemetry Mode</div>
              <div className="text-[11px] text-slate-400">{isDemoMode ? 'Calibrated simulation scenario' : 'Streaming live Open-Meteo API'}</div>
            </div>

            <button
              onClick={onToggleDemoMode}
              className="px-4 py-2 rounded-full font-mono text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-white/10 transition-all"
            >
              {isDemoMode ? 'SWITCH TO LIVE' : 'SWITCH TO DEMO'}
            </button>
          </div>
        </div>

        {/* Anomaly Thresholds */}
        <div className="p-6 lg:p-8 rounded-3xl modern-card space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center space-x-2 text-sm font-semibold text-white">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Anomaly Sensitivity</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">NDWI Variance Trigger</span>
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
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Cloudburst Precip Alarm</span>
                <span className="text-amber-400 font-bold">{precipThreshold} mm/h</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
