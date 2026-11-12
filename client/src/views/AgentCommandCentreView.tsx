import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  ArrowRight, 
  RotateCw, 
  AlertCircle,
  FileText,
  Activity,
  Layers,
  Sparkles
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
    <div className="space-y-6 pb-12">
      {/* Top Command Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#0d162b] to-[#0a0f1d] border border-cyan-500/25 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Autonomous AI Agent Command Centre
            </h1>
          </div>
          <p className="text-xs text-slate-300 font-mono">
            Orchestration engine coordinating six specialized cognitive agents in a closed-loop physical intelligence pipeline.
          </p>
        </div>

        {/* Master Execution Button */}
        <button
          onClick={onRunFullPipeline}
          disabled={isPipelineRunning}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50"
        >
          <Zap className={`w-4 h-4 ${isPipelineRunning ? 'animate-bounce' : ''}`} />
          <span>{isPipelineRunning ? 'AUTONOMOUS CYCLE ACTIVE...' : 'TRIGGER FULL INTELLIGENCE CYCLE'}</span>
        </button>
      </div>

      {/* Visual Pipeline Communication Flow */}
      <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Closed-Loop Cognitive Architecture (Observe → Act)</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">
            6 SYNCHRONIZED LOOPS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {agents.map((agent, index) => {
            const isCurrentlyActive = activeAgentId === agent.id;
            const isSelected = selectedAgentId === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`p-3 rounded-xl cursor-pointer border transition-all text-center relative ${
                  isCurrentlyActive
                    ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105 z-10'
                    : isSelected
                    ? 'bg-[#121c38] border-cyan-500/60'
                    : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                <div className="text-[9px] font-mono font-bold text-cyan-400">
                  STEP 0{agent.stepNumber}
                </div>
                <div className="text-xs font-bold text-white mt-1 font-mono truncate">
                  {agent.name.replace(' Agent', '')}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {agent.code}
                </div>

                <div className="mt-2 flex justify-center">
                  <AgentStatusBadge status={agent.status} />
                </div>

                {index < 5 && (
                  <ArrowRight className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 z-0 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Split View: Selected Agent Dossier + Live Stream Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected Agent Dossier (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/25 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    {selectedAgent.code}
                  </span>
                  <h2 className="text-lg font-bold text-white font-mono">
                    {selectedAgent.name}
                  </h2>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  Role: <span className="text-cyan-300 font-medium">{selectedAgent.role}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <AgentStatusBadge status={selectedAgent.status} />
                <button
                  onClick={() => onRunAgent(selectedAgent.id)}
                  disabled={isPipelineRunning}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Agent</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {selectedAgent.description}
            </p>

            {/* Input & Output Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  Ingestion / Input Vectors
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  {selectedAgent.inputDescription}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                  Synthesis / Structured Output
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  {selectedAgent.outputDescription}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-[10px] text-slate-500">Confidence Metric</div>
                <div className="text-base font-bold text-cyan-300 mt-1">{selectedAgent.confidence}%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-[10px] text-slate-500">Last Execution</div>
                <div className="text-base font-bold text-white mt-1">{selectedAgent.lastExecuted}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-[10px] text-slate-500">History Depth</div>
                <div className="text-base font-bold text-teal-300 mt-1">{selectedAgent.executionHistory.length} Runs</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="text-[10px] text-slate-500">Active Node SLA</div>
                <div className="text-base font-bold text-emerald-400 mt-1">&lt; 1500 ms</div>
              </div>
            </div>

            {/* Execution History Table */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Execution Audit Trail
              </div>

              <div className="rounded-xl border border-slate-800 overflow-hidden text-xs font-mono">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase">
                    <tr>
                      <th className="p-2.5">Time</th>
                      <th className="p-2.5">Duration</th>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5">Operational Summary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                    {selectedAgent.executionHistory.map((run) => (
                      <tr key={run.id} className="hover:bg-slate-900/40">
                        <td className="p-2.5 text-slate-400">{run.timestamp}</td>
                        <td className="p-2.5 text-slate-300">{run.durationMs}ms</td>
                        <td className="p-2.5">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            SUCCESS
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-200">{run.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Live Terminal Log Stream (1 Column) */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#080d17] border border-cyan-500/30 shadow-2xl flex flex-col h-[560px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Live Intelligence Stream</span>
              </div>
              <span className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE BUS</span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-[11px]">
              {logs.length === 0 ? (
                <div className="text-slate-600 text-center py-12">
                  [Awaiting agent pipeline execution...]
                </div>
              ) : (
                logs.map((log) => {
                  let badgeColor = 'text-cyan-400';
                  if (log.level === 'warning') badgeColor = 'text-amber-400';
                  if (log.level === 'alert') badgeColor = 'text-red-400';
                  if (log.level === 'success') badgeColor = 'text-emerald-400';

                  return (
                    <div key={log.id} className="p-2 rounded bg-slate-900/70 border border-slate-800/80 leading-relaxed">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1">
                        <span className="font-bold text-slate-400">[{log.agentName.replace(' Agent', '')}]</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <div className={badgeColor}>
                        &gt; {log.message}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Bus: WebSocket /dev/fieldsense/stream</span>
              <span>{logs.length} events logged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
