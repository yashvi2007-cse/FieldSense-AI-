import React, { useState } from 'react';
import { 
  Globe2, 
  Search, 
  MapPin, 
  Droplets, 
  Activity, 
  ChevronRight,
  ExternalLink,
  Info,
  Sparkles
} from 'lucide-react';
import { InteractiveMap } from '../components/InteractiveMap';
import { MONITORED_WATERBODIES } from '../data/bengaluruGeo';
import { Anomaly, MonitoredWaterbody, BengaluruWeather } from '../types';

interface LiveEarthMonitorViewProps {
  anomalies: Anomaly[];
  weather: BengaluruWeather;
  isDemoMode: boolean;
  onSelectAnomaly: (anomaly: Anomaly) => void;
  onNavigate: (viewId: string) => void;
  onLaunchSimulationForWaterbody: (wb: MonitoredWaterbody) => void;
}

export const LiveEarthMonitorView: React.FC<LiveEarthMonitorViewProps> = ({
  anomalies,
  weather,
  isDemoMode,
  onSelectAnomaly,
  onNavigate,
  onLaunchSimulationForWaterbody,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWaterbody, setSelectedWaterbody] = useState<MonitoredWaterbody>(MONITORED_WATERBODIES[0]);
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'advisory' | 'normal'>('all');

  const filteredWaterbodies = MONITORED_WATERBODIES.filter((wb) => {
    const matchesSearch = wb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          wb.primaryIssue.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'critical') return matchesSearch && wb.status === 'Critical Warning';
    if (filterType === 'advisory') return matchesSearch && wb.status === 'Advisory';
    if (filterType === 'normal') return matchesSearch && wb.status === 'Normal';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 lg:p-8 rounded-3xl modern-card">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <Globe2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Live Earth & Catchment Monitor
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Geospatial surveillance grid tracking urban water bodies, stormwater drain networks, and IoT telemetry across Bengaluru.
          </p>
        </div>

        {/* Search Bar & Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search lakes or drains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex rounded-full bg-slate-900/80 border border-white/10 p-1 text-xs">
            {(['all', 'critical', 'advisory', 'normal'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterType(filter)}
                className={`px-3 py-1.5 rounded-full capitalize transition-all ${
                  filterType === filter 
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map + Selected Location Deep-Dive Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <InteractiveMap
            anomalies={anomalies}
            onSelectAnomaly={onSelectAnomaly}
            onSelectWaterbody={(wb) => setSelectedWaterbody(wb)}
            height="560px"
          />

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Spectral Sentinel-2 L2A Ingestion Active</span>
            </div>
            <span>EPSG:4326 PostGIS Spatial Layer</span>
          </div>
        </div>

        {/* Selected Waterbody Details Panel (1 Column) */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl modern-card space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  Catchment Target
                </span>
                <h2 className="text-lg font-bold text-white">
                  {selectedWaterbody.name}
                </h2>
              </div>
              <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full ${
                selectedWaterbody.status === 'Critical Warning'
                  ? 'bg-red-500/10 text-red-300 border border-red-500/30'
                  : selectedWaterbody.status === 'Advisory'
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
              }`}>
                {selectedWaterbody.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/50 border border-white/5 space-y-1">
                <div className="text-[11px] text-slate-400">Surface Area</div>
                <div className="text-lg font-bold text-white font-mono">{selectedWaterbody.areaHa} Ha</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/50 border border-white/5 space-y-1">
                <div className="text-[11px] text-slate-400">Current Stage</div>
                <div className="text-lg font-bold text-cyan-300 font-mono">{selectedWaterbody.currentLevelMeters}m <span className="text-xs font-normal text-slate-500">/ {selectedWaterbody.maxSafeCapacityMeters}m</span></div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/50 border border-white/5 space-y-1">
                <div className="text-[11px] text-slate-400">Water Quality Index</div>
                <div className={`text-lg font-bold font-mono ${
                  selectedWaterbody.waterQualityIndex < 40 ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {selectedWaterbody.waterQualityIndex} / 100
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/50 border border-white/5 space-y-1">
                <div className="text-[11px] text-slate-400">NDWI Delta</div>
                <div className={`text-lg font-bold font-mono ${
                  selectedWaterbody.recentNdwiDelta < 0 ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {selectedWaterbody.recentNdwiDelta > 0 ? `+${selectedWaterbody.recentNdwiDelta}` : selectedWaterbody.recentNdwiDelta}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 space-y-1.5">
              <span className="font-semibold text-slate-200">Environmental Diagnosis:</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {selectedWaterbody.primaryIssue}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onLaunchSimulationForWaterbody(selectedWaterbody)}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.25)] flex items-center justify-center space-x-2"
              >
                <span>Run Inundation Simulation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Basin Selector List */}
          <div className="p-4 rounded-3xl modern-card space-y-2">
            <div className="text-xs font-semibold text-slate-400 px-2 pb-1">
              Monitored Basins ({filteredWaterbodies.length})
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {filteredWaterbodies.map((wb) => (
                <div
                  key={wb.id}
                  onClick={() => setSelectedWaterbody(wb)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs ${
                    selectedWaterbody.id === wb.id
                      ? 'bg-slate-800 text-white font-medium border border-cyan-500/30'
                      : 'hover:bg-slate-900/60 text-slate-400'
                  }`}
                >
                  <span className="truncate">{wb.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    wb.status === 'Critical Warning' ? 'bg-red-500/10 text-red-300' : 'text-slate-500'
                  }`}>
                    {wb.status.replace(' Warning', '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
