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
  isPipelineRunning
}) => {
  const sections = [
    {
      label: 'MONITORING & SURVEILLANCE',
      items: [
        { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard, badge: null },
        { id: 'live_earth_monitor', label: 'Live Earth Monitor', icon: Globe2, badge: 'GIS' },
        { id: 'change_detection', label: 'Change Detection', icon: ScanSearch, badge: anomaliesCount > 0 ? `${anomaliesCount}` : null },
      ]
    },
    {
      label: 'INTELLIGENCE & MODELING',
      items: [
        { id: 'agent_command_centre', label: 'Agent Command Centre', icon: Cpu, badge: isPipelineRunning ? 'EXEC' : '6/6' },
        { id: 'investigation_centre', label: 'Investigation Dossiers', icon: SearchCode, badge: null },
        { id: 'risk_prediction', label: 'Hydrodynamic Risk', icon: TrendingUp, badge: null },
        { id: 'simulation_lab', label: 'Simulation Lab', icon: FlaskConical, badge: null },
      ]
    },
    {
      label: 'OPERATIONS & EVIDENCE',
      items: [
        { id: 'action_centre', label: 'Field Directives', icon: CheckSquare, badge: actionsCount > 0 ? `${actionsCount}` : null },
        { id: 'evidence_centre', label: 'Evidence Repository', icon: FolderArchive, badge: null },
        { id: 'settings', label: 'System Architecture', icon: Settings, badge: null },
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#070a10]/95 border-r border-white/[0.08] flex flex-col justify-between select-none p-3.5">
      <div className="space-y-6">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <div className="px-3 text-[10px] font-mono tracking-wider text-slate-500 font-semibold uppercase">
              {section.label}
            </div>

            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = activeView === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-sky-500/10 text-white border border-sky-500/25 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        isActive 
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/30 font-bold' 
                          : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Autonomous Closed-Loop Health Box */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs">
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-slate-400">
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span>Autonomous Loop</span>
          </div>
          <span className="text-emerald-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>NOMINAL</span>
          </span>
        </div>

        <div className="text-[10px] text-slate-500 font-mono space-y-0.5">
          <div>Ingestion: Sentinel-2 & 48 Nodes</div>
          <div>Cycle Latency: 42ms</div>
        </div>
      </div>
    </aside>
  );
};
