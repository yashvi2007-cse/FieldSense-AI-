import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  Database, 
  Code, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { EvidenceItem } from '../types';

interface EvidenceCentreViewProps {
  evidenceList: EvidenceItem[];
  selectedEvidenceId?: string;
  onNavigate: (viewId: string) => void;
  onInspectAnomaly: (anomalyId: string) => void;
}

export const EvidenceCentreView: React.FC<EvidenceCentreViewProps> = ({
  evidenceList,
  selectedEvidenceId,
  onNavigate,
  onInspectAnomaly,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEvidence, setActiveEvidence] = useState<EvidenceItem>(
    evidenceList.find(e => e.id === selectedEvidenceId) || evidenceList[0]
  );

  const filteredEvidence = evidenceList.filter((e) => {
    const matchesType = selectedType === 'all' || e.type.includes(selectedType);
    const matchesSearch = 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 lg:p-8 rounded-3xl modern-card">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <FolderArchive className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Evidence Repository & Provable Telemetry
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Immutable observational records grounding automated agent deductions in verifiable satellite, sonar, and chemical assays.
          </p>
        </div>

        <div className="flex rounded-full bg-slate-900/80 border border-white/10 p-1 text-xs font-mono">
          {['all', 'Satellite', 'IoT', 'Spectrophotometry'].map((typeKey) => (
            <button
              key={typeKey}
              onClick={() => setSelectedType(typeKey)}
              className={`px-3.5 py-1.5 rounded-full capitalize transition-all ${
                selectedType === typeKey
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {typeKey}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredEvidence.map((ev) => {
            const isSelected = activeEvidence.id === ev.id;

            return (
              <div
                key={ev.id}
                onClick={() => setActiveEvidence(ev)}
                className={`p-6 rounded-3xl cursor-pointer transition-all space-y-3 modern-card ${
                  isSelected ? 'border-cyan-400/60 shadow-[0_0_20px_rgba(0,229,255,0.15)] bg-slate-900/90' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        #{ev.id.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400">{ev.type}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-[11px] text-slate-500 font-mono">{ev.timestamp}</span>
                    </div>

                    <h3 className="text-base font-bold text-white pt-1">
                      {ev.title}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    {ev.qualityScore}% Verified
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {ev.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-2">
                  <span className="flex items-center space-x-1.5">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Source: {ev.source}</span>
                  </span>
                  <span className="text-cyan-400 text-[11px] font-mono">
                    Linked: {ev.relatedAnomalyIds.map(a => `#${a.toUpperCase()}`).join(', ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Evidence Inspector */}
        <div className="space-y-4">
          <div className="p-6 lg:p-8 rounded-3xl modern-card space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Payload Inspector #{activeEvidence.id.toUpperCase()}
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                AUTHENTICATED
              </span>
            </div>

            <h2 className="text-lg font-bold text-white">
              {activeEvidence.title}
            </h2>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1 text-xs">
              <div className="text-[10px] text-cyan-400 font-mono font-bold uppercase">Source Provenance</div>
              <div className="text-white font-medium">{activeEvidence.source}</div>
              <div className="text-slate-500 text-[11px] font-mono">{activeEvidence.locationName}</div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Raw Ingestion Telemetry</span>
                <Code className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 font-mono text-[11px] text-cyan-200 overflow-x-auto max-h-52 border border-white/5">
                <pre>{JSON.stringify(activeEvidence.metadata, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
