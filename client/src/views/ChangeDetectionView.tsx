import React, { useState } from 'react';
import { 
  ScanSearch, 
  Search, 
  Filter, 
  AlertTriangle, 
  ShieldAlert, 
  ExternalLink, 
  TrendingUp, 
  FileText, 
  MapPin, 
  Layers,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Anomaly, SeverityLevel } from '../types';

interface ChangeDetectionViewProps {
  anomalies: Anomaly[];
  onSelectAnomaly: (anomaly: Anomaly) => void;
  onNavigate: (viewId: string) => void;
}

export const ChangeDetectionView: React.FC<ChangeDetectionViewProps> = ({
  anomalies,
  onSelectAnomaly,
  onNavigate,
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAnomaly, setActiveAnomaly] = useState<Anomaly>(anomalies[0]);

  const categories = [
    'all',
    'Water Level Surge',
    'Chemical & Toxic Inflow',
    'Buffer Encroachment',
    'Stormwater Siltation',
    'Algal Bloom Surge'
  ];

  const filteredAnomalies = anomalies.filter((a) => {
    const matchesSeverity = selectedSeverity === 'all' || a.severity === selectedSeverity;
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch = 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ScanSearch className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Change & Anomaly Detection Grid
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Autonomous identification of physical environmental discrepancies against 10-year rolling hydrological baselines.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs font-bold">
            {anomalies.filter(a => a.severity === 'critical').length} CRITICAL ANOMALIES ACTIVE
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between p-4 rounded-xl bg-[#0d1424] border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search anomalies, lakes, or wards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Severity Filters */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {['all', 'critical', 'high', 'medium'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg border capitalize transition-all ${
                selectedSeverity === sev
                  ? sev === 'critical'
                    ? 'bg-red-500/20 border-red-500/50 text-red-300 font-bold'
                    : sev === 'high'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                    : 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Split Grid: Anomaly Cards (2 Cols) + Deep-Dive Inspector (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Anomaly Cards List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredAnomalies.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-500 font-mono text-xs">
              No anomalies found matching your search filter.
            </div>
          ) : (
            filteredAnomalies.map((anom) => {
              const isSelected = activeAnomaly.id === anom.id;

              return (
                <div
                  key={anom.id}
                  onClick={() => setActiveAnomaly(anom)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all space-y-3 ${
                    isSelected
                      ? 'bg-[#101b33] border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'bg-[#0c1324] border-cyan-500/15 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          anom.severity === 'critical'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : anom.severity === 'high'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        }`}>
                          {anom.severity}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {anom.category}
                        </span>
                        <span className="text-slate-600">|</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {anom.detectedAt}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white font-mono mt-1">
                        {anom.title}
                      </h3>
                      <div className="text-xs text-slate-400 font-mono flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{anom.location.name} ({anom.location.ward})</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-[10px] font-mono text-slate-500">Confidence</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">
                        {anom.confidence}%
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">{anom.uncertainty}</div>
                    </div>
                  </div>

                  {/* Delta Metric Pill */}
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-slate-400 text-[11px]">{anom.changeMetric.label}: </span>
                      <span className="text-slate-200">{anom.changeMetric.baselineValue} → </span>
                      <span className="text-white font-bold">{anom.changeMetric.observedValue}</span>
                    </div>

                    <div className={`font-bold px-2 py-0.5 rounded text-xs ${
                      anom.changeMetric.deltaPct > 0 ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {anom.changeMetric.deltaPct > 0 ? `+${anom.changeMetric.deltaPct}%` : `${anom.changeMetric.deltaPct}%`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Deep-Dive Anomaly Inspector (1 Col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/25 shadow-xl space-y-4 sticky top-16">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Anomaly Dossier #{activeAnomaly.id.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {activeAnomaly.status.toUpperCase()}
              </span>
            </div>

            <h2 className="text-base font-bold text-white font-mono">
              {activeAnomaly.title}
            </h2>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {activeAnomaly.description}
            </p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-[10px] text-cyan-400 font-bold uppercase">Geospatial Bounds</div>
              <div className="text-slate-300">{activeAnomaly.location.name}</div>
              <div className="text-slate-500 text-[11px]">
                Coordinates: [{activeAnomaly.location.coordinates[0].toFixed(4)}°N, {activeAnomaly.location.coordinates[1].toFixed(4)}°E]
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-[10px] text-teal-400 font-bold uppercase">Evidence Association</div>
              <div className="text-slate-300">Linked to {activeAnomaly.evidenceIds.length} multi-modal evidence items:</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeAnomaly.evidenceIds.map((evId) => (
                  <span key={evId} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px] border border-slate-700">
                    #{evId.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => onSelectAnomaly(activeAnomaly)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center justify-center space-x-2"
              >
                <span>Proceed to Investigation Centre</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('action_centre')}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/20 text-cyan-300 text-xs font-mono transition-colors flex items-center justify-center space-x-1"
              >
                <span>Dispatch Municipal Action Ticket</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
