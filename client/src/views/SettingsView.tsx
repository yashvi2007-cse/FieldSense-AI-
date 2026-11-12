import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  Radio, 
  ShieldCheck, 
  Key
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
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-5 lg:p-6 rounded-2xl surface-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Settings & Platform Architecture
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Configure agent sensitivity thresholds, API gateway telemetry, and real-time public observation feeds.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-black transition-colors"
        >
          {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{savedSuccess ? 'Configuration Saved' : 'Save Configuration'}</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ingestion Mode */}
        <div className="p-5 lg:p-6 rounded-2xl surface-card space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              <Radio className="w-4 h-4 text-sky-400" />
              <span>Telemetry Ingestion Network</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Active Stream
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Continuous meteorological and multispectral telemetry feeds synchronized with Open-Meteo European Model ECMWF, Sentinel-2 L2A tiles, and 48 municipal IoT sensor nodes.
          </p>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Ingestion Pipeline State</div>
              <div className="text-[11px] text-slate-400">Streaming real-time municipal telemetry array</div>
            </div>

            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              className="px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-sky-300 border border-white/[0.08] transition-colors"
            >
              {isRefreshing ? 'Syncing...' : 'Sync Pipeline'}
            </button>
          </div>
        </div>

        {/* Anomaly Thresholds */}
        <div className="p-5 lg:p-6 rounded-2xl surface-card space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              <Sliders className="w-4 h-4 text-sky-400" />
              <span>Anomaly Sensitivity</span>
            </div>
          </div>

          <div className="space-y-3.5 text-xs font-mono">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300">NDWI Variance Trigger</span>
                <span className="text-sky-400 font-bold">±{ndwiThreshold}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.30"
                step="0.01"
                value={ndwiThreshold}
                onChange={(e) => setNdwiThreshold(parseFloat(e.target.value))}
                className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5 pt-1">
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
