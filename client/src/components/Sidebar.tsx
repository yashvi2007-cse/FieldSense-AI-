import React from 'react';
import { 
  LayoutDashboard, 
  Globe2, 
  Cpu, 
  ScanSearch, 
  SearchCode, 
  TrendingUp, 
  FlaskConical, 
  CheckSquare, 
  FolderArchive, 
  Settings,
  ChevronRight,
  Zap,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (viewId: string) => void;
  anomaliesCount: number;
  actionsCount: number;
  evidenceCount: number;
  isPipelineRunning: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  anomaliesCount,
  actionsCount,
  evidenceCount,
  isPipelineRunning
}) => {
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'live_earth_monitor',
      label: 'Live Earth Monitor',
      icon: Globe2,
      badge: 'LIVE',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'agent_command_centre',
      label: 'Agent Command Centre',
      icon: Cpu,
      badge: isPipelineRunning ? 'EXEC' : '6/6',
      badgeColor: isPipelineRunning ? 'bg-amber-500/20 text-amber-300 animate-pulse' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'change_detection',
      label: 'Change Detection',
      icon: ScanSearch,
      badge: anomaliesCount > 0 ? `${anomaliesCount}` : null,
      badgeColor: 'bg-red-500/10 text-red-300 border-red-500/30',
    },
    {
      id: 'investigation_centre',
      label: 'Investigation Centre',
      icon: SearchCode,
      badge: null,
    },
    {
      id: 'risk_prediction',
      label: 'Risk Prediction',
      icon: TrendingUp,
      badge: null,
    },
    {
      id: 'simulation_lab',
      label: 'Simulation Lab',
      icon: FlaskConical,
      badge: 'SCENARIO',
      badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    },
    {
      id: 'action_centre',
      label: 'Action Centre',
      icon: CheckSquare,
      badge: actionsCount > 0 ? `${actionsCount}` : null,
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'evidence_centre',
      label: 'Evidence Centre',
      icon: FolderArchive,
      badge: null,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#060911]/95 border-r border-white/[0.07] flex flex-col justify-between select-none p-4">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div className="px-3 pt-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
            Intelligence Platform
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900/90 text-white border border-white/10 shadow-lg shadow-black/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className={`p-1 rounded-lg ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  {item.badge && (
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Autonomous Pipeline Footprint Box */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 font-semibold tracking-wide">
          <div className="flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autonomous Loop</span>
          </div>
          <span className="text-[10px] text-slate-500">v2.4</span>
        </div>

        <div className="text-[10px] font-mono text-slate-400 space-y-1">
          <div className="text-slate-300 flex items-center space-x-1.5">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            <span>Observe → Detect</span>
          </div>
          <div className="text-slate-300 flex items-center space-x-1.5">
            <span className="w-1 h-1 rounded-full bg-teal-400" />
            <span>Investigate → Predict</span>
          </div>
          <div className="text-slate-300 flex items-center space-x-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span>Verify → Act</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Engine Status</span>
          <span className="text-emerald-400 font-bold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONAL</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
