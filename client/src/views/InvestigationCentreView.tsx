import React, { useState } from 'react';
import { 
  SearchCode, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Download
} from 'lucide-react';
import { Investigation, Anomaly, EvidenceItem } from '../types';

interface InvestigationCentreViewProps {
  investigations: Investigation[];
  anomalies: Anomaly[];
  evidenceList: EvidenceItem[];
  selectedInvestigationId?: string;
  onNavigate: (viewId: string) => void;
  onInspectEvidence: (evidenceId: string) => void;
}

export const InvestigationCentreView: React.FC<InvestigationCentreViewProps> = ({
  investigations,
  anomalies,
  evidenceList,
  selectedInvestigationId,
  onNavigate,
  onInspectEvidence,
}) => {
  const [activeInvId, setActiveInvId] = useState<string>(
    selectedInvestigationId || investigations[0]?.id || 'inv-01'
  );

  const activeInvestigation = 
    investigations.find(inv => inv.id === activeInvId) || investigations[0];

  const supportingEvidence = evidenceList.filter(e => 
    activeInvestigation.supportingEvidenceIds.includes(e.id)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-5 lg:p-6 rounded-2xl enterprise-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <SearchCode className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Investigation Centre & Root-Cause Dossier
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Multi-modal causal attribution linking physical anomalies to upstream industrial and cadastral drivers.
          </p>
        </div>

        {/* Investigation Switcher Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {investigations.map((inv) => (
            <button
              key={inv.id}
              onClick={() => setActiveInvId(inv.id)}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                activeInvId === inv.id
                  ? 'bg-sky-500/20 border-sky-500/40 text-sky-300 font-bold'
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
              }`}
            >
              #{inv.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Investigation Dossier */}
      <div className="p-6 lg:p-8 rounded-2xl enterprise-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-bold">
                {activeInvestigation.assignedAgent}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-semibold">
                {activeInvestigation.status.replace('_', ' ')}
              </span>
              <span className="text-slate-500 text-xs font-mono">{activeInvestigation.timestamp}</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {activeInvestigation.title}
            </h2>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 text-xs font-mono transition-colors self-start lg:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>

        {/* 2 Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
              Physical Deviation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeInvestigation.whatChanged}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
              Spatial Coordinates & Boundary
            </div>
            <p className="text-xs text-slate-300 leading-relaxed flex items-center space-x-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <span>{activeInvestigation.whereLocation}</span>
            </p>
          </div>
        </div>

        {/* Ranked Causal Hypotheses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Bayesian Causal Attribution
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Confidence {activeInvestigation.uncertaintyAssessment}
            </span>
          </div>

          <div className="space-y-2.5">
            {activeInvestigation.causalHypotheses.map((hyp, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {index + 1}. {hyp.cause}
                  </span>
                  <span className="text-xs font-mono font-bold text-sky-300 px-2.5 py-0.5 rounded bg-sky-950/60 border border-sky-500/25">
                    {hyp.probability}% PROBABILITY
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-sky-400" 
                    style={{ width: `${hyp.probability}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5">
                  <span>Rationale: {hyp.rationale}</span>
                  <button
                    onClick={() => onInspectEvidence(hyp.evidenceRef)}
                    className="text-sky-400 hover:text-sky-300 font-mono text-xs flex items-center space-x-1"
                  >
                    <span>Inspect #{hyp.evidenceRef.toUpperCase()}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Directives */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Recommended Municipal Directives
            </h3>
            <button
              onClick={() => onNavigate('action_centre')}
              className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center space-x-1"
            >
              <span>View in Action Centre</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {activeInvestigation.recommendedResponses.map((res, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{res}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
