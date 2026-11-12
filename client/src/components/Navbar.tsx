import React, { useState } from 'react';
import { 
  Radio, 
  MapPin, 
  Bell, 
  RefreshCw, 
  CloudRain, 
  Wind, 
  ShieldCheck, 
  Cpu, 
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ChevronDown
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
    <header className="sticky top-0 z-40 bg-[#080c14]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-6 py-2.5 flex items-center justify-between text-xs lg:text-sm">
      {/* Left: Brand & Monitored Region */}
      <div className="flex items-center space-x-3 lg:space-x-6">
        <div 
          onClick={() => onNavigate('overview')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,229,255,0.4)] transition-all">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-wider text-white text-base">FIELDSENSE</span>
              <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded">AI</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-tight -mt-0.5">Physical-World Intelligence Engine</div>
          </div>
        </div>

        {/* Region Selector */}
        <div className="relative hidden md:block">
          <button 
            onClick={() => setShowRegionMenu(!showRegionMenu)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#0d1424] border border-cyan-500/20 hover:border-cyan-500/50 text-slate-300 transition-all font-mono text-xs"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium text-slate-200">Bengaluru Metropolitan Catchment</span>
            <span className="text-slate-500">12.9716°N, 77.5946°E</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {showRegionMenu && (
            <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#0d1424] border border-cyan-500/30 shadow-2xl p-2 z-50">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1">Active Drainage Basins</div>
              <div className="space-y-1 mt-1 text-xs">
                <div className="px-2.5 py-1.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex items-center justify-between">
                  <span>Mahadevapura & East Basin</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">PRIMARY</span>
                </div>
                <div className="px-2.5 py-1.5 rounded hover:bg-slate-800 text-slate-300 flex items-center justify-between cursor-pointer">
                  <span>K-100 Koramangala Valley</span>
                  <span className="text-[10px] font-mono text-slate-500">ACTIVE</span>
                </div>
                <div className="px-2.5 py-1.5 rounded hover:bg-slate-800 text-slate-300 flex items-center justify-between cursor-pointer">
                  <span>Hebbal & Yelahanka North</span>
                  <span className="text-[10px] font-mono text-slate-500">ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Live Weather & Environmental Pulse */}
      <div className="hidden xl:flex items-center space-x-3 px-3 py-1 rounded-full bg-[#0d1424]/80 border border-cyan-500/20 text-xs font-mono">
        <div className="flex items-center space-x-1.5 text-slate-300">
          <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
          <span>{weather.precipitation} mm/h</span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="flex items-center space-x-1.5 text-slate-300">
          <Wind className="w-3.5 h-3.5 text-teal-400" />
          <span>{weather.windSpeed} km/h</span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="flex items-center space-x-1.5 text-slate-300">
          <span className="text-slate-400">AQI:</span>
          <span className={`font-bold ${weather.aqi > 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {weather.aqi}
          </span>
        </div>
        <span className="text-slate-700">|</span>
        <span className="text-[10px] text-slate-400">
          {weather.isLive ? 'Open-Meteo Live API' : 'Calibrated Baseline'}
        </span>
      </div>

      {/* Right: Mode Toggle, Notifications & Refresh */}
      <div className="flex items-center space-x-3">
        {/* Live / Demo Mode Toggle */}
        <button
          onClick={onToggleDemoMode}
          title="Toggle between Live Public API ingestion and Calibrated Demo Scenario"
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all ${
            isDemoMode 
              ? 'bg-amber-950/30 border-amber-500/40 text-amber-300 hover:bg-amber-900/30'
              : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/30'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 animate-pulse'}`} />
          <span className="hidden sm:inline">{isDemoMode ? 'DEMO SIMULATION' : 'LIVE TELEMETRY'}</span>
          <span className="sm:hidden">{isDemoMode ? 'DEMO' : 'LIVE'}</span>
        </button>

        {/* Sync/Refresh Button */}
        <button
          onClick={onRefreshData}
          disabled={isRefreshing}
          title="Sync with latest satellite passes & sensor nodes"
          className="p-2 rounded-lg bg-[#0d1424] border border-cyan-500/20 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-[#0d1424] border border-cyan-500/20 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all"
          >
            <Bell className="w-4 h-4" />
            {criticalAnomaliesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold font-mono text-white flex items-center justify-center animate-pulse">
                {criticalAnomaliesCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#0d1424] border border-cyan-500/30 shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                  System Alerts ({anomalies.length})
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Autonomous Feed</span>
              </div>
              <div className="space-y-2 mt-2 max-h-72 overflow-y-auto pr-1">
                {anomalies.slice(0, 4).map(a => (
                  <div 
                    key={a.id}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('change_detection');
                    }}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                        a.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {a.severity}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{a.detectedAt}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">{a.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{a.location.name}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 text-center">
                <button 
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('action_centre');
                  }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-center space-x-1 mx-auto"
                >
                  <span>View All Actions ({pendingActionsCount} pending)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Autonomous Agent Status Indicator */}
        <div 
          onClick={() => onNavigate('agent_command_centre')}
          className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 cursor-pointer transition-all text-xs font-mono"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>6 AGENTS ONLINE</span>
        </div>
      </div>
    </header>
  );
};
