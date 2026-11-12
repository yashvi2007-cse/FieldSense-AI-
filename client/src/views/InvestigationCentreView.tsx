import React, { useState } from 'react';
import { 
  SearchCode, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
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
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 lg:p-8 rounded-3xl modern-card">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <SearchCode className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Investigation Centre & Root-Cause Dossier
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Multi-modal causal reasoning linking physical anomalies to upstream industrial, cadastral, and topological drivers.
          </p>
        </div>

        {/* Investigation Switcher Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {investigations.map((inv) => (
            <button
              key={inv.id}
              onClick={() => setActiveInvId(inv.id)}
              className={`px-3.5 py-1.5 rounded-full border transition-all ${
                activeInvId === inv.id
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              #{inv.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Investigation Dossier */}
      <div className="p-6 lg:p-10 rounded-3xl modern-card space-y-8">
        {/* Header Metadata */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                {activeInvestigation.assignedAgent}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase">
                {activeInvestigation.status.replace('_', ' ')}
              </span>
              <span className="text-slate-500 text-xs font-mono">{activeInvestigation.timestamp}</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              {activeInvestigation.title}
            </h2>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-xs font-mono transition-colors self-start lg:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Dossier</span>
          </button>
        </div>

        {/* 4 Quick Structured Q&A Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              1. What Changed? (Physical Delta)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeInvestigation.whatChanged}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              2. Where Did It Happen? (Location)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed flex items-center space-x-1.5 font-mono">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{activeInvestigation.whereLocation}</span>
            </p>
          </div>
        </div>

        {/* Ranked Causal Hypotheses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Ranked Causal Hypotheses (Bayesian Attribution)
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Confidence {activeInvestigation.uncertaintyAssessment}
            </span>
          </div>

          <div className="space-y-3">
            {activeInvestigation.causalHypotheses.map((hyp, index) => (
              <div key={index} className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {index + 1}. {hyp.cause}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30">
                    {hyp.probability}% PROBABILITY
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" 
                    style={{ width: `${hyp.probability}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Rationale: {hyp.rationale}</span>
                  <button
                    onClick={() => onInspectEvidence(hyp.evidenceRef)}
                    className="text-cyan-400 hover:text-cyan-300 font-mono text-xs flex items-center space-x-1"
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
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Recommended Municipal Directives
            </h3>
            <button
              onClick={() => onNavigate('action_centre')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>View in Action Centre</span>
              <ArrowRight className="w-3 h-3" />
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
