import React from 'react';
import { AgentStatus } from '../types';

interface AgentStatusBadgeProps {
  status: AgentStatus;
}

export const AgentStatusBadge: React.FC<AgentStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'running':
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>RUNNING</span>
        </span>
      );
    case 'completed':
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>NOMINAL</span>
        </span>
      );
    case 'warning':
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-orange-500/20 text-orange-300 border border-orange-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span>ADVISORY</span>
        </span>
      );
    case 'error':
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span>ALERT</span>
        </span>
      );
    case 'idle':
    default:
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-950/50 text-cyan-400 border border-cyan-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>STANDBY</span>
        </span>
      );
  }
};

