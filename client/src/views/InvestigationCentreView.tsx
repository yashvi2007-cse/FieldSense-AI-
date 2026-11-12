import React, { useState } from 'react';
import { 
  SearchCode, 
  MapPin, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Share2, 
  Download, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowRight
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
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <SearchCode className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Investigation Centre & Root-Cause Dossier
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Autonomous multi-modal causal attribution linking anomalous physical observations to legal, cadastral, and industrial drivers.
          </p>
        </div>

        {/* Investigation Switcher Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {investigations.map((inv) => (
            <button
              key={inv.id}
              onClick={() => setActiveInvId(inv.id)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeInvId === inv.id
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              #{inv.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Investigation Dossier */}
      <div className="p-6 rounded-2xl bg-[#0a0f1d] border border-cyan-500/25 shadow-2xl space-y-6">
        {/* Header Metadata */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {activeInvestigation.assignedAgent}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                {activeInvestigation.status.replace('_', ' ')}
              </span>
              <span className="text-slate-500 text-xs font-mono">| {activeInvestigation.timestamp}</span>
            </div>
            <h2 className="text-lg lg:text-xl font-bold text-white font-mono">
              {activeInvestigation.title}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>

        {/* 7 Core Investigation Questions (Structured Report) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1: What Changed? */}
          <div className="p-4 rounded-xl bg-[#0d1527] border border-cyan-500/15 space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              1. What Changed? (Physical Delta)
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {activeInvestigation.whatChanged}
            </p>
          </div>

          {/* Question 2: Where did it happen? */}
          <div className="p-4 rounded-xl bg-[#0d1527] border border-cyan-500/15 space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              2. Where Did It Happen? (Spatial Coordinates)
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{activeInvestigation.whereLocation}</span>
            </p>
          </div>

          {/* Question 3: When was it detected? */}
          <div className="p-4 rounded-xl bg-[#0d1527] border border-cyan-500/15 space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              3. When Was It Detected? (Temporal Sequence)
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{activeInvestigation.whenDetected}</span>
            </p>
          </div>

          {/* Question 4: Uncertainty & Confidence Rating */}
          <div className="p-4 rounded-xl bg-[#0d1527] border border-cyan-500/15 space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              4. Evidence Certainty & Confidence Bounds
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {activeInvestigation.uncertaintyAssessment}
            </p>
          </div>
        </div>

        {/* Question 5: What might have caused it? (Causal Hypotheses) */}
        <div className="p-5 rounded-xl bg-[#0d1527] border border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              5. What Might Have Caused It? (Ranked Causal Hypotheses)
            </div>
            <span className="text-[10px] font-mono text-slate-400">Bayesian Likelihood Engine</span>
          </div>

          <div className="space-y-3">
            {activeInvestigation.causalHypotheses.map((hyp, index) => (
              <div key={index} className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center border border-cyan-500/40">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">
                      {hyp.cause}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                    {hyp.probability}% PROBABILITY
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" 
                    style={{ width: `${hyp.probability}%` }}
                  />
                </div>

                <div className="text-xs text-slate-300 font-sans flex items-start justify-between gap-3 pt-1">
                  <span>Rationale: {hyp.rationale}</span>
                  <button
                    onClick={() => onInspectEvidence(hyp.evidenceRef)}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 flex-shrink-0"
                  >
                    <span>Inspect #{hyp.evidenceRef.toUpperCase()}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question 6: What could happen next? (Projected Consequences) */}
        <div className="p-5 rounded-xl bg-[#0d1527] border border-cyan-500/20 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 border-b border-slate-800 pb-2">
            6. What Could Happen Next? (Projected Consequences & Risk Horizon)
          </div>

          <div className="space-y-2">
            {activeInvestigation.projectedConsequences.map((consequence, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{consequence}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Question 7: What should be done? (Recommended Responses) */}
        <div className="p-5 rounded-xl bg-[#0d1527] border border-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
              7. What Should Be Done? (Action Agent Directives)
            </div>
            <button
              onClick={() => onNavigate('action_centre')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>View In Action Centre</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {activeInvestigation.recommendedResponses.map((response, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{response}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Associated Supporting Evidence Strip */}
        <div className="pt-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            Supporting Evidence Dossier ({supportingEvidence.length} Datasets)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {supportingEvidence.map((ev) => (
              <div
                key={ev.id}
                onClick={() => onInspectEvidence(ev.id)}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">#{ev.id.toUpperCase()}</span>
                  <span className="text-[10px] font-mono text-emerald-400">{ev.qualityScore}% Quality</span>
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">{ev.title}</div>
                <div className="text-[10px] text-slate-400 font-mono line-clamp-1">{ev.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
