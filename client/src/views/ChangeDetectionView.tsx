import React, { useState } from 'react';
import { 
  ScanSearch, 
  Search, 
  MapPin, 
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Sparkles
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
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 lg:p-8 rounded-3xl modern-card">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <ScanSearch className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Change & Anomaly Detection
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-time differential analysis detecting deviations against 10-year rolling seasonal baselines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search anomalies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex rounded-full bg-slate-900/80 border border-white/10 p-1 text-xs font-mono">
            {(['all', 'critical', 'high', 'medium'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3 py-1 rounded-full capitalize transition-all ${
                  selectedSeverity === sev
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Split Grid: Anomaly Cards (2 Cols) + Detail Inspector (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Anomaly Cards List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAnomalies.map((anom) => {
            const isSelected = activeAnomaly.id === anom.id;

            return (
              <div
                key={anom.id}
                onClick={() => setActiveAnomaly(anom)}
                className={`p-6 rounded-3xl cursor-pointer transition-all space-y-3 modern-card ${
                  isSelected ? 'border-cyan-400/60 shadow-[0_0_20px_rgba(0,229,255,0.15)] bg-slate-900/90' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        anom.severity === 'critical'
                          ? 'bg-red-500/10 text-red-300 border border-red-500/30'
                          : anom.severity === 'high'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {anom.severity}
                      </span>
                      <span className="text-xs text-slate-400">{anom.category}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-[11px] text-slate-500 font-mono">{anom.detectedAt}</span>
                    </div>

                    <h3 className="text-base font-bold text-white pt-1">
                      {anom.title}
                    </h3>

                    <div className="text-xs text-slate-400 flex items-center space-x-1.5 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{anom.location.name}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] text-slate-500 font-mono">Confidence</div>
                    <div className="text-base font-bold text-emerald-400 font-mono">{anom.confidence}%</div>
                  </div>
                </div>

                {/* Baseline vs Observed Delta */}
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="text-slate-300">
                    <span className="text-slate-400">{anom.changeMetric.label}: </span>
                    <span className="text-white font-bold">{anom.changeMetric.baselineValue} → {anom.changeMetric.observedValue}</span>
                  </div>

                  <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                    anom.changeMetric.deltaPct > 0 ? 'bg-red-500/10 text-red-300' : 'bg-amber-500/10 text-amber-300'
                  }`}>
                    {anom.changeMetric.deltaPct > 0 ? `+${anom.changeMetric.deltaPct}%` : `${anom.changeMetric.deltaPct}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Anomaly Inspector (1 Col) */}
        <div className="space-y-4">
          <div className="p-6 lg:p-8 rounded-3xl modern-card space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Anomaly #{activeAnomaly.id.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {activeAnomaly.status.toUpperCase()}
              </span>
            </div>

            <h2 className="text-lg font-bold text-white">
              {activeAnomaly.title}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeAnomaly.description}
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1 text-xs">
              <div className="text-[10px] text-cyan-400 font-mono font-bold uppercase">Geographic Anchor</div>
              <div className="text-slate-200">{activeAnomaly.location.name}</div>
              <div className="text-slate-500 text-[11px] font-mono">
                {activeAnomaly.location.coordinates[0].toFixed(4)}°N, {activeAnomaly.location.coordinates[1].toFixed(4)}°E
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectAnomaly(activeAnomaly)}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.25)] flex items-center justify-center space-x-2"
              >
                <span>Launch Forensic Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
