import React, { useState } from 'react';
import { 
  Activity, 
  MapPin, 
  Bell, 
  RefreshCw, 
  CloudRain, 
  Wind, 
  Cpu, 
  ChevronDown, 
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import { BengaluruWeather, Anomaly, ActionItem } from '../types';

interface NavbarProps {
  weather: BengaluruWeather;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
  activeView: string;
  onNavigate: (viewId: string) => void;
  anomalies: Anomaly[];
  actions: ActionItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  weather,
  isDemoMode,
  onToggleDemoMode,
  onRefreshData,
  isRefreshing,
  onNavigate,
  anomalies,
  actions,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRegionMenu, setShowRegionMenu] = useState(false);

  const pendingActionsCount = actions.filter(a => a.status !== 'completed').length;
  const criticalAnomaliesCount = anomalies.filter(a => a.severity === 'critical').length;

  return (
    <header className="sticky top-0 z-40 bg-[#070a10]/95 backdrop-blur-xl border-b border-white/[0.08] px-6 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Brand Identity & Active Catchment */}
      <div className="flex items-center space-x-6">
        <div 
          onClick={() => onNavigate('overview')}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 group-hover:border-sky-400/40 transition-colors">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-tight text-white text-sm">FieldSense AI</span>
            </div>
            <div className="text-[11px] text-slate-400 font-normal">
              Autonomous Environmental Intelligence
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-white/[0.08] hidden md:block" />

        {/* Region Picker Dropdown */}
        <div className="relative hidden md:block">
          <button 
            onClick={() => setShowRegionMenu(!showRegionMenu)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 text-xs transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium text-slate-200">Bengaluru Metropolitan Catchment</span>
            <span className="text-slate-500 text-[11px]">12.97°N, 77.59°E</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {showRegionMenu && (
            <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#0f1523] border border-white/[0.1] shadow-2xl p-2 z-50">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1.5 font-semibold">
                Operational Basins
              </div>
              <div className="space-y-1 text-xs">
                <div className="px-3 py-2 rounded-lg bg-sky-950/40 border border-sky-500/20 text-sky-300 flex items-center justify-between">
                  <span>Mahadevapura & East Basin</span>
                  <span className="text-[10px] font-mono text-sky-400 font-bold">PRIMARY</span>
                </div>
                <div className="px-3 py-2 rounded-lg hover:bg-white/[0.04] text-slate-300 flex items-center justify-between cursor-pointer">
                  <span>Koramangala Valley SWD</span>
                  <span className="text-[10px] font-mono text-slate-500">ACTIVE</span>
                </div>
                <div className="px-3 py-2 rounded-lg hover:bg-white/[0.04] text-slate-300 flex items-center justify-between cursor-pointer">
                  <span>Hebbal & Yelahanka North</span>
                  <span className="text-[10px] font-mono text-slate-500">ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Live Environmental Status Indicators */}
      <div className="hidden lg:flex items-center space-x-5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs">
        <div className="flex items-center space-x-1.5 text-slate-300">
          <CloudRain className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-mono">{weather.precipitation} mm/h</span>
        </div>
        <span className="text-white/[0.1]">|</span>
        <div className="flex items-center space-x-1.5 text-slate-300">
          <Wind className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono">{weather.windSpeed} km/h</span>
        </div>
        <span className="text-white/[0.1]">|</span>
        <div className="flex items-center space-x-1.5 text-slate-300">
          <span className="text-slate-500">AQI</span>
          <span className={`font-mono font-bold ${weather.aqi > 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {weather.aqi}
          </span>
        </div>
      </div>

      {/* Right: Operational Controls */}
      <div className="flex items-center space-x-3">
        {/* Real-time Telemetry Stream Indicator */}
        <button
          onClick={onToggleDemoMode}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors border bg-emerald-500/10 border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/15"
          title="Streaming live environmental observation vectors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE TELEMETRY STREAM</span>
        </button>

        {/* Sync Button */}
        <button
          onClick={onRefreshData}
          disabled={isRefreshing}
          title="Refresh spatial ingestion pipelines"
          className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            {criticalAnomaliesCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#0f1523] border border-white/[0.1] shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                  Operational Incidents ({anomalies.length})
                </span>
                <span className="text-[10px] text-sky-400 font-mono">Real-Time</span>
              </div>
              <div className="space-y-2 mt-3 max-h-72 overflow-y-auto pr-1">
                {anomalies.slice(0, 4).map(a => (
                  <div 
                    key={a.id}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('change_detection');
                    }}
                    className="p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] cursor-pointer transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                        a.severity === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {a.severity}
                      </span>
                      <span className="text-slate-500">{a.detectedAt}</span>
                    </div>
                    <div className="text-xs font-medium text-slate-200 line-clamp-1">{a.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{a.location.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Agency Responder Badge */}
        <div className="hidden xl:flex items-center space-x-2 pl-3 border-l border-white/[0.08] text-xs text-slate-400">
          <Building2 className="w-3.5 h-3.5 text-slate-500" />
          <span>BBMP Command • Water Division</span>
        </div>
      </div>
    </header>
  );
};
