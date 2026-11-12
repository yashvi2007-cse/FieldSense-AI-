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
  ShieldCheck,
  Zap
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
      step: null,
    },
    {
      id: 'live_earth_monitor',
      label: 'Live Earth Monitor',
      icon: Globe2,
      badge: 'LIVE',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      step: null,
    },
    {
      id: 'agent_command_centre',
      label: 'Agent Command Centre',
      icon: Cpu,
      badge: isPipelineRunning ? 'EXEC' : '6/6',
      badgeColor: isPipelineRunning ? 'bg-amber-500/20 text-amber-300 animate-pulse' : 'bg-emerald-500/20 text-emerald-300',
      step: null,
    },
    {
      id: 'change_detection',
      label: 'Change Detection',
      icon: ScanSearch,
      badge: anomaliesCount > 0 ? `${anomaliesCount} NEW` : null,
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
      step: '02 DETECT',
    },
    {
      id: 'investigation_centre',
      label: 'Investigation Centre',
      icon: SearchCode,
      badge: null,
      step: '03 INVESTIGATE',
    },
    {
      id: 'risk_prediction',
      label: 'Risk Prediction',
      icon: TrendingUp,
      badge: '24H-7D',
      badgeColor: 'bg-purple-500/20 text-purple-300',
      step: '04 PREDICT',
    },
    {
      id: 'simulation_lab',
      label: 'Simulation Lab',
      icon: FlaskConical,
      badge: 'SCENARIO',
      badgeColor: 'bg-teal-500/20 text-teal-300',
      step: null,
    },
    {
      id: 'action_centre',
      label: 'Action Centre',
      icon: CheckSquare,
      badge: actionsCount > 0 ? `${actionsCount}` : null,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      step: '05 ACT',
    },
    {
      id: 'evidence_centre',
      label: 'Evidence Centre',
      icon: FolderArchive,
      badge: `${evidenceCount}`,
      badgeColor: 'bg-slate-700/50 text-slate-300',
      step: '01 OBSERVE',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      step: null,
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0a0f1d] border-r border-cyan-500/15 flex flex-col justify-between select-none">
      <div className="py-4">
        {/* Navigation Section */}
        <div className="px-4 mb-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
            Intelligence Modules
          </div>
        </div>

        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/80 to-[#101b33] border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'
                  } transition-colors`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Autonomous Pipeline Footprint */}
      <div className="p-3 m-3 rounded-xl bg-[#070b14] border border-cyan-500/20 text-xs">
        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
          <div className="flex items-center space-x-1.5">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Autonomous Pipeline</span>
          </div>
          <span className="text-slate-500">v2.4</span>
        </div>

        <div className="text-[10px] font-mono text-slate-400 leading-relaxed space-y-1">
          <div className="flex items-center space-x-1 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>OBSERVE → DETECT</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span>INVESTIGATE → PREDICT</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>VERIFY → ACT</span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Engine Status</span>
          <span className="text-emerald-400 font-bold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>NOMINAL</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
