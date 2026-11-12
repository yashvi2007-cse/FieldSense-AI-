import React, { useState } from 'react';
import { 
  Radio, 
  MapPin, 
  Bell, 
  RefreshCw, 
  CloudRain, 
  Wind, 
  Cpu, 
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Sparkles
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
    <header className="sticky top-0 z-40 bg-[#060911]/90 backdrop-blur-xl border-b border-white/[0.07] px-5 lg:px-8 py-3 flex items-center justify-between">
      {/* Brand & Monitored Region */}
      <div className="flex items-center space-x-6">
        <div 
          onClick={() => onNavigate('overview')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-all">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-tight text-white text-base">FIELDSENSE</span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
                AI
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-normal tracking-wide">
              Autonomous Physical-World Intelligence
            </div>
          </div>
        </div>

        {/* Region Chip */}
        <div className="relative hidden md:block">
          <button 
            onClick={() => setShowRegionMenu(!showRegionMenu)}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 text-slate-300 text-xs transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium text-slate-200">Bengaluru Catchment</span>
            <span className="text-slate-500 text-[11px]">12.97°N, 77.59°E</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {showRegionMenu && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#0c1220] border border-white/10 shadow-2xl p-2 z-50">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1.5 font-bold">
                Monitored Water Basins
              </div>
              <div className="space-y-1 text-xs">
                <div className="px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex items-center justify-between">
                  <span>Mahadevapura & East Basin</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">PRIMARY</span>
                </div>
                <div className="px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-300 flex items-center justify-between cursor-pointer">
                  <span>Koramangala K-100 Valley</span>
                  <span className="text-[10px] font-mono text-slate-500">ACTIVE</span>
                </div>
                <div className="px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-300 flex items-center justify-between cursor-pointer">
                  <span>Hebbal & Yelahanka North</span>
                  <span className="text-[10px] font-mono text-slate-500">ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Atmospheric Indicator Chip */}
      <div className="hidden lg:flex items-center space-x-4 px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/10 text-xs font-mono">
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
        <div className="flex items-center space-x-1.5">
          <span className="text-slate-400">AQI:</span>
          <span className={`font-bold ${weather.aqi > 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {weather.aqi}
          </span>
        </div>
      </div>

      {/* Mode Toggle & Actions */}
      <div className="flex items-center space-x-3">
        {/* Live / Demo Mode Switcher Pill */}
        <button
          onClick={onToggleDemoMode}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all border ${
            isDemoMode 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
          <span>{isDemoMode ? 'DEMO MODE' : 'LIVE TELEMETRY'}</span>
        </button>

        {/* Sync/Refresh Button */}
        <button
          onClick={onRefreshData}
          disabled={isRefreshing}
          title="Sync with latest satellite & sensor passes"
          className="p-2 rounded-xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all"
          >
            <Bell className="w-4 h-4" />
            {criticalAnomaliesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold font-mono text-white flex items-center justify-center">
                {criticalAnomaliesCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0c1220] border border-white/10 shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                  Priority Alerts ({anomalies.length})
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Autonomous Stream</span>
              </div>
              <div className="space-y-2 mt-3 max-h-72 overflow-y-auto pr-1">
                {anomalies.slice(0, 4).map(a => (
                  <div 
                    key={a.id}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('change_detection');
                    }}
                    className="p-3 rounded-xl bg-slate-900/80 border border-white/5 hover:border-cyan-500/40 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        a.severity === 'critical' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {a.severity}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{a.detectedAt}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-1.5 line-clamp-1">{a.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{a.location.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Autonomous Agents Online Indicator */}
        <div 
          onClick={() => onNavigate('agent_command_centre')}
          className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 cursor-pointer transition-all text-xs font-mono"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>6 AGENTS READY</span>
        </div>
      </div>
    </header>
  );
};
