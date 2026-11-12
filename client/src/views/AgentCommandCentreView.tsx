import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  Zap, 
  ArrowRight, 
  Activity,
  Terminal,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="p-5 lg:p-6 rounded-2xl surface-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Autonomous Multi-Agent Orchestration Hub
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Closed-loop cognitive architecture synchronizing six specialized physical-world intelligence agents.
          </p>
        </div>

        {/* Master Execution Button */}
        <button
          onClick={onRunFullPipeline}
          disabled={isPipelineRunning}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-black transition-colors disabled:opacity-50 shadow-md shadow-sky-500/20"
        >
          <Zap className={`w-3.5 h-3.5 fill-current ${isPipelineRunning ? 'animate-bounce' : ''}`} />
          <span>{isPipelineRunning ? 'Executing Cycle...' : 'Run Autonomous Cycle'}</span>
        </button>
      </div>

      {/* Connected Cognitive Graph (6 Clean Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-xs">
          <span className="font-mono font-semibold uppercase tracking-wider text-slate-400">
            Cognitive Pipeline (Observe → Verify)
          </span>
          <span className="text-emerald-400 font-mono text-[11px]">
            6 Agents Synchronized
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
                className={`p-3.5 rounded-xl cursor-pointer transition-colors space-y-1.5 border ${
                  isCurrentlyActive
                    ? 'bg-sky-950/40 border-sky-400'
                    : isSelected
                    ? 'bg-white/[0.06] border-sky-500/40'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-sky-400">
                  STEP 0{agent.stepNumber}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {agent.name.replace(' Agent', '')}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {agent.code}
                </div>
                <div className="pt-1 flex">
                  <AgentStatusBadge status={agent.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Agent Dossier + Terminal Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl surface-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-bold">
                    {selectedAgent.code}
                  </span>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    {selectedAgent.name}
                  </h2>
                </div>
                <div className="text-xs text-slate-400">
                  Specialization: <span className="text-slate-200">{selectedAgent.role}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <AgentStatusBadge status={selectedAgent.status} />
                <button
                  onClick={() => onRunAgent(selectedAgent.id)}
                  disabled={isPipelineRunning}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-300 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute Step</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedAgent.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider">
                  Input Telemetry Channels
                </div>
                <div className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedAgent.inputDescription}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Synthesized Directives & Output
                </div>
                <div className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedAgent.outputDescription}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] text-slate-500">Certainty Metric</div>
                <div className="text-base font-bold text-sky-300 mt-1">{selectedAgent.confidence}%</div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] text-slate-500">Last Execution</div>
                <div className="text-base font-bold text-white mt-1">{selectedAgent.lastExecuted}</div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] text-slate-500">Execution SLA</div>
                <div className="text-base font-bold text-emerald-400 mt-1">&lt; 1.2s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Stream Terminal (1 Column) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl surface-card flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-300">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>Live Event Stream</span>
              </div>
              <span className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE</span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-[11px]">
              {logs.map((log) => {
                let badgeColor = 'text-sky-400';
                if (log.level === 'warning') badgeColor = 'text-amber-400';
                if (log.level === 'alert') badgeColor = 'text-red-400';
                if (log.level === 'success') badgeColor = 'text-emerald-400';

                return (
                  <div key={log.id} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] leading-relaxed space-y-1">
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
