import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  Filter, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Database, 
  Calendar, 
  MapPin, 
  Code, 
  ChevronRight,
  ShieldCheck,
  Cpu
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

  const evidenceTypes = [
    'all',
    'Satellite Multispectral (Sentinel-2)',
    'IoT Ultrasonic Level Gauge',
    'Open-Meteo Weather Telemetry',
    'Citizen Geospatial Report',
    'KSPCB Spectrophotometry',
    'UAV High-Res Orthomosaic'
  ];

  const filteredEvidence = evidenceList.filter((e) => {
    const matchesType = selectedType === 'all' || e.type === selectedType;
    const matchesSearch = 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FolderArchive className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Evidence Repository & Telemetry Archive
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Immutable provenance logs grounding every automated agent deduction in verifiable satellite passes, physical sensors, and lab assays.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
            {evidenceList.length} PRIMARY OBSERVATIONAL DATASETS
          </span>
        </div>
      </div>

      {/* Search & Type Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between p-4 rounded-xl bg-[#0d1424] border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search evidence records, sensors, datasets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {['all', 'Satellite', 'IoT Sensor', 'Open-Meteo', 'Chemical / UAV'].map((typeKey) => {
            const isMatch = 
              (typeKey === 'all' && selectedType === 'all') ||
              (typeKey === 'Satellite' && selectedType.includes('Satellite')) ||
              (typeKey === 'IoT Sensor' && selectedType.includes('IoT')) ||
              (typeKey === 'Open-Meteo' && selectedType.includes('Open-Meteo')) ||
              (typeKey === 'Chemical / UAV' && (selectedType.includes('KSPCB') || selectedType.includes('UAV')));

            return (
              <button
                key={typeKey}
                onClick={() => {
                  if (typeKey === 'all') setSelectedType('all');
                  else if (typeKey === 'Satellite') setSelectedType('Satellite Multispectral (Sentinel-2)');
                  else if (typeKey === 'IoT Sensor') setSelectedType('IoT Ultrasonic Level Gauge');
                  else if (typeKey === 'Open-Meteo') setSelectedType('Open-Meteo Weather Telemetry');
                  else setSelectedType('KSPCB Spectrophotometry');
                }}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  isMatch
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {typeKey}
              </button>
            );
          })}
        </div>
      </div>

      {/* Split Grid: Evidence Records (2 Cols) + Deep Telemetry Inspector (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence Items List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredEvidence.map((ev) => {
            const isSelected = activeEvidence.id === ev.id;

            return (
              <div
                key={ev.id}
                onClick={() => setActiveEvidence(ev)}
                className={`p-4 rounded-xl cursor-pointer border transition-all space-y-2.5 ${
                  isSelected
                    ? 'bg-[#101b33] border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'bg-[#0c1324] border-cyan-500/15 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                        #{ev.id.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {ev.type}
                      </span>
                      <span className="text-slate-600">|</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {ev.timestamp}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white font-mono mt-1">
                      {ev.title}
                    </h3>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] font-mono text-slate-500">Integrity Score</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">
                      {ev.qualityScore}% Verified
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans line-clamp-2">
                  {ev.summary}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
                  <div className="flex items-center space-x-1.5">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Source: {ev.source}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500">Linked Anomalies:</span>
                    {ev.relatedAnomalyIds.map((aId) => (
                      <span key={aId} className="text-cyan-300 font-bold">
                        #{aId.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Telemetry Payload Inspector (1 Col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/25 shadow-xl space-y-4 sticky top-16">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Payload Inspector #{activeEvidence.id.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                VERIFIED SOURCE
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-white font-mono">
                {activeEvidence.title}
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Source: <span className="text-slate-200">{activeEvidence.source}</span>
              </div>
            </div>

            {/* Spatial Location */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-[10px] text-cyan-400 font-bold uppercase">Geographic Anchor</div>
              <div className="text-slate-200">{activeEvidence.locationName}</div>
              <div className="text-slate-500 text-[11px]">
                [{activeEvidence.coordinates[0].toFixed(4)}°N, {activeEvidence.coordinates[1].toFixed(4)}°E]
              </div>
            </div>

            {/* Raw Ingestion Payload / Metadata View */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="font-bold uppercase tracking-wider">Raw Ingestion Telemetry</span>
                <span className="text-cyan-400 flex items-center space-x-1">
                  <Code className="w-3 h-3" />
                  <span>JSON Payload</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#080d17] border border-cyan-500/30 font-mono text-[11px] text-cyan-200 overflow-x-auto max-h-52 leading-relaxed">
                <pre>{JSON.stringify(activeEvidence.metadata, null, 2)}</pre>
              </div>
            </div>

            {/* Traceability Link to Anomaly */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Trace Back To Cognitive Pipeline
              </div>

              {activeEvidence.relatedAnomalyIds.map((anomId) => (
                <button
                  key={anomId}
                  onClick={() => onInspectAnomaly(anomId)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/20 text-cyan-300 text-xs font-mono transition-colors flex items-center justify-between"
                >
                  <span>Trace to Anomaly #{anomId.toUpperCase()}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
