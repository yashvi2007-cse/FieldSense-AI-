import React from 'react';
import { 
  Droplet, 
  Cpu, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight,
  CloudRain,
  Wind,
  Zap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { InteractiveMap } from '../components/InteractiveMap';
import { Agent, Anomaly, ActionItem, BengaluruWeather, RiskPrediction, MonitoredWaterbody } from '../types';

interface OverviewViewProps {
  agents: Agent[];
  anomalies: Anomaly[];
  actions: ActionItem[];
  risks: RiskPrediction[];
  weather: BengaluruWeather;
  onNavigate: (viewId: string) => void;
  onSelectAnomaly: (anomaly: Anomaly) => void;
  onSelectWaterbody: (wb: MonitoredWaterbody) => void;
  onRunAutonomousPipeline: () => void;
  isPipelineRunning: boolean;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  agents,
  anomalies,
  actions,
  risks,
  weather,
  onNavigate,
  onSelectAnomaly,
  onSelectWaterbody,
  onRunAutonomousPipeline,
  isPipelineRunning,
}) => {
  // Smooth 24-Hour Catchment Hydrodynamics
  const hydrographData = [
    { time: '00:00', waterStage: 3.8, precipitation: 2.1 },
    { time: '04:00', waterStage: 4.0, precipitation: 4.5 },
    { time: '08:00', waterStage: 4.4, precipitation: 14.2 },
    { time: '12:00', waterStage: 5.1, precipitation: 28.0 },
    { time: '16:00', waterStage: 5.3, precipitation: 32.5 },
    { time: '20:00', waterStage: 4.8, precipitation: 16.4 },
    { time: '24:00', waterStage: 4.2, precipitation: 5.0 },
  ];

  const pendingActions = actions.filter(a => a.status !== 'completed');
  const criticalAnomalies = anomalies.filter(a => a.severity === 'critical');

  const pipelineStages = [
    { step: '01', title: 'Observe', desc: 'Sentinel-2 & 48 IoT Gauges', color: 'text-cyan-400' },
    { step: '02', title: 'Detect', desc: 'Baseline Anomaly Isolation', color: 'text-teal-400' },
    { step: '03', title: 'Investigate', desc: 'Causal Attribution & Zoning', color: 'text-blue-400' },
    { step: '04', title: 'Predict', desc: '2D Hydrodynamic Forecasting', color: 'text-purple-400' },
    { step: '05', title: 'Act', desc: 'Municipal Intervention Directives', color: 'text-amber-400' },
    { step: '06', title: 'Verify', desc: 'Post-Action Satellite Audit', color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Editorial Tech Hero Banner — YTU Startup House Inspired */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1324] via-[#080d19] to-[#060911] border border-white/10 p-8 lg:p-12 shadow-2xl">
        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide font-medium">BENGALURU ENVIRONMENTAL INTELLIGENCE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Reading the physical world <br />
            <span className="text-gradient-cyan">as closely as code.</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            An autonomous multi-agent intelligence platform that synthesizes satellite multispectral bands, municipal IoT sensors, and hydrological forecasting into verified physical actions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onRunAutonomousPipeline}
              disabled={isPipelineRunning}
              className="flex items-center space-x-2.5 px-6 py-3.5 rounded-full font-mono text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_25px_rgba(0,229,255,0.35)] transition-all disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 fill-current ${isPipelineRunning ? 'animate-bounce' : ''}`} />
              <span>{isPipelineRunning ? 'ORCHESTRATING PIPELINE...' : 'RUN AUTONOMOUS CYCLE'}</span>
            </button>

            <button
              onClick={() => onNavigate('simulation_lab')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-full font-mono text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 transition-all"
            >
              <span>Scenario Simulation Lab</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Ambient background glow decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Curated High-Impact KPI Highlights (Less Clutter, Maximum Impact) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl modern-card space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Active Water Basins</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight text-white">
            765 <span className="text-sm font-normal text-slate-400">Hectares</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Continuous Sentinel-2 surface water monitoring across Bellandur, Varthur, Ulsoor, and Hebbal basins.
          </p>
        </div>

        <div className="p-6 rounded-2xl modern-card space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Cognitive Multi-Agent Loop</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight text-white">
            6 / 6 <span className="text-sm font-normal text-emerald-400 font-sans">Active</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Observe, Detect, Investigate, Predict, Act, and Verify operating in automated continuous synchronization.
          </p>
        </div>

        <div className="p-6 rounded-2xl modern-card space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Priority Hotspots</span>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight text-white">
            {criticalAnomalies.length} <span className="text-sm font-normal text-red-400 font-sans">Critical</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bellandur spillway froth surge & K-100 SWD 56% drain constriction under active mitigation.
          </p>
        </div>
      </div>

      {/* Closed-Loop Pipeline Stages (Interactive Visual Story) */}
      <div className="p-6 lg:p-8 rounded-3xl modern-card space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-white tracking-tight">
              Autonomous Intelligence Pipeline
            </h2>
            <p className="text-xs text-slate-400">
              Closed-loop execution sequence bridging raw earth telemetry to physical verified outcomes
            </p>
          </div>
          <button
            onClick={() => onNavigate('agent_command_centre')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>Agent Orchestration Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStages.map((stage) => (
            <div 
              key={stage.step}
              onClick={() => onNavigate('agent_command_centre')}
              className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 font-bold">{stage.step}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className={`text-sm font-bold ${stage.color}`}>
                {stage.title}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-2">
                {stage.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Map & Hydrograph Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map takes 2 Columns */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-sm font-semibold text-white">
                Live Catchment Surveillance Grid
              </h3>
            </div>
            <button
              onClick={() => onNavigate('live_earth_monitor')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>Expand Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <InteractiveMap
            anomalies={anomalies}
            onSelectAnomaly={onSelectAnomaly}
            onSelectWaterbody={onSelectWaterbody}
            height="440px"
          />
        </div>

        {/* Catchment Hydrograph (1 Column) */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl modern-card space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                24-Hour Stage & Precipitation
              </span>
              <h3 className="text-base font-semibold text-white">
                Bellandur Catchment
              </h3>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hydrographData}>
                  <defs>
                    <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 6]} unit="m" />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0c1220',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '11px',
                    }}
                  />
                  <Area type="monotone" dataKey="waterStage" stroke="#00e5ff" strokeWidth={2.5} fillOpacity={1} fill="url(#stageGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Peak Water Stage:</span>
                <span className="text-white font-mono font-bold">5.3m / 5.2m Max</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Weir crest overpressure active; chemical anti-foamer deployed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prioritized Directives (Clean, uncluttered list) */}
      <div className="p-6 lg:p-8 rounded-3xl modern-card space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold text-white">
              Active Municipal Directives ({pendingActions.length})
            </h3>
            <p className="text-xs text-slate-400">
              Interventions formulated by Action Agent and assigned to municipal responders
            </p>
          </div>

          <button
            onClick={() => onNavigate('action_centre')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>Manage All Directives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.slice(0, 4).map((action) => (
            <div
              key={action.id}
              onClick={() => onNavigate('action_centre')}
              className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  action.priority === 'P1 - Immediate'
                    ? 'bg-red-500/10 text-red-300 border border-red-500/30'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                }`}>
                  {action.priority}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{action.dueDate}</span>
              </div>

              <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {action.title}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>{action.assignedAgency}</span>
                <span className="text-cyan-400 text-[11px] font-mono">{action.verificationStatus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
