import React, { useState } from 'react';
import { 
  Globe2, 
  Search, 
  MapPin, 
  Droplets, 
  Activity, 
  ChevronRight,
  ExternalLink,
  Layers,
  ArrowRight
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="p-5 lg:p-6 rounded-2xl surface-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Globe2 className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Live Earth & Catchment GIS Monitor
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Geospatial surveillance grid tracking urban water bodies, stormwater drain networks, and IoT telemetry across Bengaluru.
          </p>
        </div>

        {/* Search Bar & Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search lakes or drains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
            />
          </div>

          <div className="flex rounded-lg bg-white/[0.04] border border-white/[0.08] p-1 text-xs">
            {(['all', 'critical', 'advisory', 'normal'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterType(filter)}
                className={`px-2.5 py-1 rounded capitalize transition-colors ${
                  filterType === filter 
                    ? 'bg-sky-500/20 text-sky-300 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: GIS Map + Selected Target Inspection Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <InteractiveMap
            anomalies={anomalies}
            onSelectAnomaly={onSelectAnomaly}
            onSelectWaterbody={(wb) => setSelectedWaterbody(wb)}
            height="560px"
          />

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Spectral Sentinel-2 L2A Ingestion Active</span>
            </div>
            <span>EPSG:4326 PostGIS Spatial Layer</span>
          </div>
        </div>

        {/* Selected Waterbody Details Panel */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl surface-card space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider font-bold">
                  Catchment Target
                </span>
                <h2 className="text-base font-bold text-white">
                  {selectedWaterbody.name}
                </h2>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                selectedWaterbody.status === 'Critical Warning'
                  ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                  : selectedWaterbody.status === 'Advisory'
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
              }`}>
                {selectedWaterbody.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-[11px] text-slate-400">Surface Area</div>
                <div className="text-base font-bold text-white font-mono">{selectedWaterbody.areaHa} Ha</div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-[11px] text-slate-400">Current Stage</div>
                <div className="text-base font-bold text-sky-300 font-mono">
                  {selectedWaterbody.currentLevelMeters}m <span className="text-xs font-normal text-slate-500">/ {selectedWaterbody.maxSafeCapacityMeters}m</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-[11px] text-slate-400">Water Quality (WQI)</div>
                <div className={`text-base font-bold font-mono ${
                  selectedWaterbody.waterQualityIndex < 40 ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {selectedWaterbody.waterQualityIndex} / 100
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-[11px] text-slate-400">NDWI Variance</div>
                <div className={`text-base font-bold font-mono ${
                  selectedWaterbody.recentNdwiDelta < 0 ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {selectedWaterbody.recentNdwiDelta > 0 ? `+${selectedWaterbody.recentNdwiDelta}` : selectedWaterbody.recentNdwiDelta}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-slate-200">Environmental Assessment:</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {selectedWaterbody.primaryIssue}
              </p>
            </div>

            <button
              onClick={() => onLaunchSimulationForWaterbody(selectedWaterbody)}
              className="w-full py-2.5 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-black text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Simulate Catchment Inundation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Basin List */}
          <div className="p-4 rounded-2xl surface-card space-y-2">
            <div className="text-xs font-semibold text-slate-400 px-2 pb-1 border-b border-white/[0.06]">
              Monitored Basins ({filteredWaterbodies.length})
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {filteredWaterbodies.map((wb) => (
                <div
                  key={wb.id}
                  onClick={() => setSelectedWaterbody(wb)}
                  className={`p-2 rounded-lg cursor-pointer transition-colors flex items-center justify-between text-xs ${
                    selectedWaterbody.id === wb.id
                      ? 'bg-sky-500/10 text-white font-medium border border-sky-500/25'
                      : 'hover:bg-white/[0.04] text-slate-400'
                  }`}
                >
                  <span className="truncate">{wb.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
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
