import React, { useState } from 'react';
import { 
  ScanSearch, 
  Search, 
  MapPin, 
  ChevronRight,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Anomaly } from '../types';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAnomaly, setActiveAnomaly] = useState<Anomaly>(anomalies[0]);

  const filteredAnomalies = anomalies.filter((a) => {
    const matchesSeverity = selectedSeverity === 'all' || a.severity === selectedSeverity;
    const matchesSearch = 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-5 lg:p-6 rounded-2xl surface-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ScanSearch className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Change & Anomaly Detection Ledger
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-time differential analysis isolating deviations against 10-year rolling seasonal baselines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filter anomalies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="flex rounded-lg bg-white/[0.04] border border-white/[0.08] p-1 text-xs font-mono">
            {(['all', 'critical', 'high', 'medium'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-1 rounded capitalize transition-colors ${
                  selectedSeverity === sev
                    ? 'bg-sky-500/20 text-sky-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {filteredAnomalies.map((anom) => {
            const isSelected = activeAnomaly.id === anom.id;

            return (
              <div
                key={anom.id}
                onClick={() => setActiveAnomaly(anom)}
                className={`p-5 rounded-xl cursor-pointer transition-colors space-y-3 surface-card ${
                  isSelected ? 'border-sky-400/50 bg-white/[0.05]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        anom.severity === 'critical'
                          ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                          : anom.severity === 'high'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          : 'bg-sky-500/10 text-sky-300 border border-sky-500/20'
                      }`}>
                        {anom.severity}
                      </span>
                      <span className="text-xs text-slate-400">{anom.category}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-[11px] text-slate-500 font-mono">{anom.detectedAt}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white pt-1">
                      {anom.title}
                    </h3>

                    <div className="text-xs text-slate-400 flex items-center space-x-1.5 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                      <span>{anom.location.name}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] text-slate-500 font-mono">Certainty</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">{anom.confidence}%</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <div className="text-slate-300">
                    <span className="text-slate-400">{anom.changeMetric.label}: </span>
                    <span className="text-white font-bold">{anom.changeMetric.baselineValue} → {anom.changeMetric.observedValue}</span>
                  </div>

                  <span className={`font-bold px-1.5 py-0.2 rounded text-xs ${
                    anom.changeMetric.deltaPct > 0 ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {anom.changeMetric.deltaPct > 0 ? `+${anom.changeMetric.deltaPct}%` : `${anom.changeMetric.deltaPct}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Anomaly Inspector */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl surface-card space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                Anomaly #{activeAnomaly.id.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/20">
                {activeAnomaly.status.toUpperCase()}
              </span>
            </div>

            <h2 className="text-base font-bold text-white">
              {activeAnomaly.title}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeAnomaly.description}
            </p>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 text-xs">
              <div className="text-[10px] text-sky-400 font-mono font-bold uppercase">Geographic Anchor</div>
              <div className="text-slate-200">{activeAnomaly.location.name}</div>
              <div className="text-slate-500 text-[11px] font-mono">
                {activeAnomaly.location.coordinates[0].toFixed(4)}°N, {activeAnomaly.location.coordinates[1].toFixed(4)}°E
              </div>
            </div>

            <button
              onClick={() => onSelectAnomaly(activeAnomaly)}
              className="w-full py-2.5 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-black text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Launch Forensic Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
