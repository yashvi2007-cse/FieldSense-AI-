import React from 'react';
import { 
  Droplet, 
  Cpu, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Layers,
  ChevronRight,
  ExternalLink
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
    { step: '01', title: 'Observation', desc: 'Sentinel-2 L2A + 48 IoT Nodes', status: 'Active' },
    { step: '02', title: 'Change Detection', desc: 'Seasonal Baseline Deviation', status: 'Active' },
    { step: '03', title: 'Investigation', desc: 'Bayesian Causal Attribution', status: 'Active' },
    { step: '04', title: 'Prediction', desc: '2D Hydrodynamic Modeling', status: 'Active' },
    { step: '05', title: 'Action Planning', desc: 'Municipal Resource Routing', status: 'Active' },
    { step: '06', title: 'Verification', desc: 'Post-Event Satellite Audit', status: 'Active' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Executive Command Briefing Bar */}
      <div className="p-6 lg:p-7 rounded-2xl enterprise-card flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>METROPOLITAN SURVEILLANCE RUNNING</span>
            <span className="text-white/[0.2]">|</span>
            <span>BENGALURU CORE & EAST DRAINAGE VALLEYS</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Urban Water & Catchment Intelligence Center
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Automated environmental intelligence pipeline reading physical catchment dynamics through satellite multi-spectral telemetry, IoT sensor networks, and hydrodynamic forecasting.
          </p>
        </div>

        {/* Master Execution CTA */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            onClick={onRunAutonomousPipeline}
            disabled={isPipelineRunning}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-black transition-colors disabled:opacity-50 shadow-md shadow-sky-500/20"
          >
            <Zap className={`w-3.5 h-3.5 fill-current ${isPipelineRunning ? 'animate-bounce' : ''}`} />
            <span>{isPipelineRunning ? 'Orchestrating Cycle...' : 'Run Autonomous Cycle'}</span>
          </button>

          <button
            onClick={() => onNavigate('simulation_lab')}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.1] transition-colors"
          >
            <span>Scenario Lab</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Professional KPI Metrics (High-Signal, Clean Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl enterprise-card space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Surface Water Area</span>
            <Droplet className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white">
            765 <span className="text-xs font-normal text-slate-400 font-sans">Ha Monitored</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Across 8 Major Catchments
          </div>
        </div>

        <div className="p-5 rounded-xl enterprise-card space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Active Incidents</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white">
            {anomalies.length} <span className="text-xs font-normal text-amber-400 font-sans font-bold">({criticalAnomalies.length} Critical)</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Bellandur & K-100 SWD
          </div>
        </div>

        <div className="p-5 rounded-xl enterprise-card space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Cognitive Agents</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white">
            6 / 6 <span className="text-xs font-normal text-emerald-400 font-sans font-bold">Synchronized</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Avg Confidence: 94.8%
          </div>
        </div>

        <div className="p-5 rounded-xl enterprise-card space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Precipitation Inflow</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white">
            {weather.precipitation} <span className="text-xs font-normal text-slate-400 font-sans">mm/h</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {weather.isLive ? 'Live Open-Meteo API' : 'Calibrated Baseline'}
          </div>
        </div>
      </div>

      {/* Autonomous Pipeline Sequence (Clean Architecture View) */}
      <div className="p-6 rounded-2xl enterprise-card space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold tracking-wider uppercase text-slate-300 font-mono">
              Autonomous Intelligence Loop
            </span>
          </div>
          <button
            onClick={() => onNavigate('agent_command_centre')}
            className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center space-x-1"
          >
            <span>Agent Orchestrator</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStages.map((stage) => (
            <div 
              key={stage.step}
              onClick={() => onNavigate('agent_command_centre')}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-sky-500/30 hover:bg-white/[0.04] cursor-pointer transition-colors space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>PHASE {stage.step}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-bold text-slate-100">
                {stage.title}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-2">
                {stage.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geospatial Surveillance & Catchment Hydrograph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map takes 2 Columns */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="font-semibold text-white">Geospatial Surveillance Grid</span>
              <span className="text-slate-500">• EPSG:4326 PostGIS</span>
            </div>
            <button
              onClick={() => onNavigate('live_earth_monitor')}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center space-x-1"
            >
              <span>Full GIS Workspace</span>
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

        {/* 24h Catchment Hydrograph (1 Column) */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl enterprise-card space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                24h Catchment Hydrograph
              </span>
              <span className="text-xs font-mono text-sky-400">Bellandur</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hydrographData}>
                  <defs>
                    <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 6]} unit="m" />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0f1624',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Area type="monotone" dataKey="waterStage" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#stageGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs space-y-1">
              <div className="flex justify-between text-slate-300 font-medium">
                <span>Current Stage:</span>
                <span className="text-white font-mono font-bold">4.82m <span className="text-slate-500 font-normal">/ 5.2m Max Capacity</span></span>
              </div>
              <p className="text-[11px] text-slate-400">
                Sluice gate diversion active; weir spillway under automated monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Field Directives Queue */}
      <div className="p-6 rounded-2xl enterprise-card space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-semibold text-white">
              Operational Directives Queue ({pendingActions.length} Pending)
            </h3>
            <p className="text-xs text-slate-400">
              Interventions prioritized by Action Agent and routed to BBMP, BWSSB, and KSPCB
            </p>
          </div>

          <button
            onClick={() => onNavigate('action_centre')}
            className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center space-x-1"
          >
            <span>Action Management</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actions.slice(0, 4).map((action) => (
            <div
              key={action.id}
              onClick={() => onNavigate('action_centre')}
              className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  action.priority === 'P1 - Immediate'
                    ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                }`}>
                  {action.priority}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{action.dueDate}</span>
              </div>

              <div className="text-xs font-semibold text-slate-200">
                {action.title}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>{action.assignedAgency}</span>
                <span className="text-sky-400 font-mono">{action.verificationStatus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
