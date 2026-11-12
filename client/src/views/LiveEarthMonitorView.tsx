import React, { useState } from 'react';
import { 
  Globe2, 
  Search, 
  MapPin, 
  Droplets, 
  Activity, 
  Layers, 
  ShieldAlert, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { InteractiveMap } from '../components/InteractiveMap';
import { MONITORED_WATERBODIES, STORMWATER_DRAIN_CORRIDORS, IOT_MONITORING_NODES } from '../data/bengaluruGeo';
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
    <div className="space-y-6 pb-12">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Globe2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Live Earth & Catchment Monitor
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            High-cadence geospatial surveillance of urban water bodies, stormwater drains, and sensor telemetry across Bengaluru.
          </p>
        </div>

        {/* Search Bar & Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search lakes, drains, wards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs font-mono">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterType === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({MONITORED_WATERBODIES.length})
            </button>
            <button
              onClick={() => setFilterType('critical')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterType === 'critical' ? 'bg-red-500/20 text-red-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilterType('advisory')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterType === 'advisory' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Advisory
            </button>
          </div>
        </div>
      </div>

      {/* Main Map + Selected Location Deep-Dive Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map takes 2 columns */}
        <div className="lg:col-span-2 space-y-3">
          <InteractiveMap
            anomalies={anomalies}
            onSelectAnomaly={onSelectAnomaly}
            onSelectWaterbody={(wb) => setSelectedWaterbody(wb)}
            height="580px"
          />

          {/* Data Sources and Integrity Notice */}
          <div className="p-3.5 rounded-xl bg-[#090e1b] border border-cyan-500/15 flex items-start space-x-3 text-xs font-mono">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-slate-400 space-y-0.5">
              <span className="text-slate-200 font-bold">Public Data Ingestion Pipeline: </span>
              Atmospheric telemetry powered by live Open-Meteo APIs. Cartography rendered via OpenStreetMap & CartoDB Dark Matter. Satellite layers reflect calibrated Sentinel-2 MSI multispectral reflectance tiles.
              {isDemoMode && <span className="text-amber-400 ml-1 font-bold">[DEMO CALIBRATION ENGAGED]</span>}
            </div>
          </div>
        </div>

        {/* Selected Waterbody Details Panel (1 Column) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/25 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  Hydrological Target Inspection
                </span>
                <h2 className="text-base font-bold text-white font-mono">
                  {selectedWaterbody.name}
                </h2>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                selectedWaterbody.status === 'Critical Warning'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : selectedWaterbody.status === 'Advisory'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {selectedWaterbody.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Total Spread Area</div>
                <div className="text-base font-bold text-cyan-300 mt-1">{selectedWaterbody.areaHa} Hectares</div>
                <div className="text-[10px] text-slate-500">Cadastral Boundary</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Current Water Stage</div>
                <div className="text-base font-bold text-white mt-1">{selectedWaterbody.currentLevelMeters} m</div>
                <div className="text-[10px] text-slate-500">Max safe: {selectedWaterbody.maxSafeCapacityMeters}m</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Water Quality Index</div>
                <div className={`text-base font-bold mt-1 ${
                  selectedWaterbody.waterQualityIndex < 40 ? 'text-red-400' : selectedWaterbody.waterQualityIndex < 70 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedWaterbody.waterQualityIndex} / 100
                </div>
                <div className="text-[10px] text-slate-500">WQI Assessment</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Recent NDWI Delta</div>
                <div className={`text-base font-bold mt-1 ${
                  selectedWaterbody.recentNdwiDelta < 0 ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {selectedWaterbody.recentNdwiDelta > 0 ? `+${selectedWaterbody.recentNdwiDelta}` : selectedWaterbody.recentNdwiDelta}
                </div>
                <div className="text-[10px] text-slate-500">Sentinel-2 MSI</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-slate-100 font-mono">Current Diagnosis:</span>
              <p className="text-[11px] leading-relaxed text-slate-400">
                {selectedWaterbody.primaryIssue}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => onLaunchSimulationForWaterbody(selectedWaterbody)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center justify-center space-x-2"
              >
                <span>Simulate Inundation & Cloudburst</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('change_detection')}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/20 text-cyan-300 text-xs font-mono transition-colors flex items-center justify-center space-x-1"
              >
                <span>Inspect Anomaly Signatures</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Waterbodies Selector List */}
          <div className="p-4 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800">
              Monitored Basin Index ({filteredWaterbodies.length})
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredWaterbodies.map((wb) => (
                <div
                  key={wb.id}
                  onClick={() => setSelectedWaterbody(wb)}
                  className={`p-2 rounded-lg cursor-pointer transition-all flex items-center justify-between text-xs font-mono ${
                    selectedWaterbody.id === wb.id
                      ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-200'
                      : 'hover:bg-slate-900 text-slate-400 border border-transparent'
                  }`}
                >
                  <div className="truncate mr-2">
                    <div className="font-semibold text-slate-200 truncate">{wb.name}</div>
                    <div className="text-[10px] text-slate-500">{wb.areaHa} Ha | {wb.currentLevelMeters}m</div>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    wb.status === 'Critical Warning' ? 'bg-red-500/20 text-red-300' : 'bg-slate-800 text-slate-400'
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
