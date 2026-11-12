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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-5 lg:p-6 rounded-2xl surface-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FolderArchive className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Evidence Repository & Provable Observational Archive
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Immutable observational records grounding automated agent deductions in verifiable satellite, sonar, and chemical assays.
          </p>
        </div>

        <div className="flex rounded-lg bg-white/[0.04] border border-white/[0.08] p-1 text-xs font-mono">
          {['all', 'Satellite', 'IoT', 'Spectrophotometry'].map((typeKey) => (
            <button
              key={typeKey}
              onClick={() => setSelectedType(typeKey)}
              className={`px-3 py-1 rounded capitalize transition-colors ${
                selectedType === typeKey
                  ? 'bg-sky-500/20 text-sky-300 font-bold'
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
        <div className="lg:col-span-2 space-y-3">
          {filteredEvidence.map((ev) => {
            const isSelected = activeEvidence.id === ev.id;

            return (
              <div
                key={ev.id}
                onClick={() => setActiveEvidence(ev)}
                className={`p-5 rounded-xl cursor-pointer transition-colors space-y-2.5 surface-card ${
                  isSelected ? 'border-sky-400/50 bg-white/[0.05]' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/20">
                        #{ev.id.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400">{ev.type}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-[11px] text-slate-500 font-mono">{ev.timestamp}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white pt-0.5">
                      {ev.title}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {ev.qualityScore}% Verified
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {ev.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.06] pt-2">
                  <span className="flex items-center space-x-1.5">
                    <Database className="w-3.5 h-3.5 text-sky-400" />
                    <span>Source: {ev.source}</span>
                  </span>
                  <span className="text-sky-400 text-[11px] font-mono">
                    Linked: {ev.relatedAnomalyIds.map(a => `#${a.toUpperCase()}`).join(', ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Evidence Inspector */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl surface-card space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                Payload Inspector #{activeEvidence.id.toUpperCase()}
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                AUTHENTICATED
              </span>
            </div>

            <h2 className="text-base font-bold text-white">
              {activeEvidence.title}
            </h2>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 text-xs">
              <div className="text-[10px] text-sky-400 font-mono font-bold uppercase">Source Provenance</div>
              <div className="text-white font-medium">{activeEvidence.source}</div>
              <div className="text-slate-500 text-[11px] font-mono">{activeEvidence.locationName}</div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Raw Ingestion Telemetry</span>
                <Code className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-[11px] text-sky-200 overflow-x-auto max-h-52 border border-white/5">
                <pre>{JSON.stringify(activeEvidence.metadata, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
