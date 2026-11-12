import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  Zap, 
  ArrowRight, 
  Activity,
  Terminal,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Agent, AgentId } from '../types';
import { AgentStatusBadge } from '../components/AgentStatusBadge';
import { AgentLogEntry } from '../services/agentEngine';

interface AgentCommandCentreViewProps {
  agents: Agent[];
  onRunAgent: (agentId: AgentId) => void;
  onRunFullPipeline: () => void;
  isPipelineRunning: boolean;
  activeAgentId: AgentId | null;
  logs: AgentLogEntry[];
}

export const AgentCommandCentreView: React.FC<AgentCommandCentreViewProps> = ({
  agents,
  onRunAgent,
  onRunFullPipeline,
  isPipelineRunning,
  activeAgentId,
  logs,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId>('observation');

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 lg:p-8 rounded-3xl modern-card">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Autonomous Agent Command Centre
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Closed-loop cognitive architecture orchestrating six specialized physical-world intelligence agents.
          </p>
        </div>

        {/* Master Execution Button */}
        <button
          onClick={onRunFullPipeline}
          disabled={isPipelineRunning}
          className="flex items-center space-x-2 px-6 py-3 rounded-full font-mono text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all disabled:opacity-50"
        >
          <Zap className={`w-4 h-4 fill-current ${isPipelineRunning ? 'animate-bounce' : ''}`} />
          <span>{isPipelineRunning ? 'RUNNING CYCLE...' : 'TRIGGER FULL CYCLE'}</span>
        </button>
      </div>

      {/* Connected Cognitive Graph (6 Clean Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Cognitive Pipeline (Observe → Act)
          </span>
          <span className="text-xs text-emerald-400 font-mono font-medium">
            All 6 Agents Synchronized
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {agents.map((agent) => {
            const isCurrentlyActive = activeAgentId === agent.id;
            const isSelected = selectedAgentId === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all space-y-2 border text-center ${
                  isCurrentlyActive
                    ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.35)] scale-[1.02]'
                    : isSelected
                    ? 'bg-slate-900 border-cyan-500/50 shadow-md'
                    : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-cyan-400">
                  STEP 0{agent.stepNumber}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {agent.name.replace(' Agent', '')}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {agent.code}
                </div>
                <div className="pt-1 flex justify-center">
                  <AgentStatusBadge status={agent.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Agent Dossier + Terminal Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected Agent Dossier (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 lg:p-8 rounded-3xl modern-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                    {selectedAgent.code}
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {selectedAgent.name}
                  </h2>
                </div>
                <div className="text-xs text-slate-400">
                  Specialization: <span className="text-slate-200">{selectedAgent.role}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <AgentStatusBadge status={selectedAgent.status} />
                <button
                  onClick={() => onRunAgent(selectedAgent.id)}
                  disabled={isPipelineRunning}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Step</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {selectedAgent.description}
            </p>

            {/* Input & Output Clean Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
                <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Input Observation Streams
                </div>
                <div className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedAgent.inputDescription}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
                <div className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider">
                  Synthesized Directives & Output
                </div>
                <div className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedAgent.outputDescription}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-slate-900/40 border border-white/5">
                <div className="text-[10px] text-slate-500">Certainty Score</div>
                <div className="text-lg font-bold text-cyan-300 mt-1">{selectedAgent.confidence}%</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/40 border border-white/5">
                <div className="text-[10px] text-slate-500">Last Execution</div>
                <div className="text-lg font-bold text-white mt-1">{selectedAgent.lastExecuted}</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/40 border border-white/5">
                <div className="text-[10px] text-slate-500">Target Latency</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">&lt; 1.2s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Terminal Log Stream (1 Column) */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl modern-card flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Live Event Stream</span>
              </div>
              <span className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE</span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 font-mono text-[11px]">
              {logs.map((log) => {
                let badgeColor = 'text-cyan-400';
                if (log.level === 'warning') badgeColor = 'text-amber-400';
                if (log.level === 'alert') badgeColor = 'text-red-400';
                if (log.level === 'success') badgeColor = 'text-emerald-400';

                return (
                  <div key={log.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 leading-relaxed space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="font-bold text-slate-400">[{log.agentName.replace(' Agent', '')}]</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <div className={badgeColor}>
                      {log.message}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
