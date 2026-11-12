import React from 'react';
import { 
  ShieldAlert, 
  Droplet, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Play, 
  ArrowRight,
  CloudRain,
  Wind,
  Layers,
  Thermometer,
  Zap,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { StatCard } from '../components/StatCard';
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
  // Environmental Trends 24-Hour Telemetry Mock/Sim
  const trendData = [
    { time: '00:00', precipitation: 2.1, waterLevel: 3.8, surfactant: 1.4, floodRisk: 22 },
    { time: '03:00', precipitation: 1.8, waterLevel: 3.9, surfactant: 7.8, floodRisk: 34 },
    { time: '06:00', precipitation: 8.4, waterLevel: 4.1, surfactant: 8.5, floodRisk: 48 },
    { time: '09:00', precipitation: 14.2, waterLevel: 4.8, surfactant: 8.7, floodRisk: 88 },
    { time: '12:00', precipitation: 24.5, waterLevel: 5.1, surfactant: 6.9, floodRisk: 92 },
    { time: '15:00', precipitation: 32.0, waterLevel: 5.3, surfactant: 5.4, floodRisk: 95 },
    { time: '18:00', precipitation: 18.2, waterLevel: 4.9, surfactant: 4.2, floodRisk: 82 },
    { time: '21:00', precipitation: 6.5, waterLevel: 4.4, surfactant: 3.1, floodRisk: 64 },
  ];

  // Risk distribution for doughnut visualization
  const riskDistribution = [
    { name: 'Critical (P1)', count: anomalies.filter(a => a.severity === 'critical').length, color: '#ef4444' },
    { name: 'High (P2)', count: anomalies.filter(a => a.severity === 'high').length, color: '#f59e0b' },
    { name: 'Medium (P3)', count: anomalies.filter(a => a.severity === 'medium').length, color: '#00e5ff' },
    { name: 'Nominal', count: 18, color: '#10b981' },
  ];

  const pendingActions = actions.filter(a => a.status !== 'completed');
  const criticalRisks = risks.filter(r => r.riskLevel === 'Critical');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d162b] via-[#09101f] to-[#070b14] border border-cyan-500/25 p-5 lg:p-6 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Continuous Environmental Intelligence
              </span>
              <span className="text-slate-400 text-xs font-mono">| Bengaluru Metropolitan Basin</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              Physical-World Intelligence Command Centre
            </h1>
            <p className="text-slate-300 text-xs lg:text-sm leading-relaxed">
              Synthesizing Sentinel-2 satellite multispectral indices, Open-Meteo precipitation rasters, and 48 municipal IoT gauge telemetry through six specialized autonomous AI agents.
            </p>
          </div>

          {/* Quick Action: Trigger Full Cycle */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRunAutonomousPipeline}
              disabled={isPipelineRunning}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 ${isPipelineRunning ? 'animate-bounce' : ''}`} />
              <span>{isPipelineRunning ? 'ORCHESTRATING PIPELINE...' : 'RUN AUTONOMOUS CYCLE'}</span>
            </button>

            <button
              onClick={() => onNavigate('simulation_lab')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-[#111c38] hover:bg-[#16254a] text-cyan-300 border border-cyan-500/30 transition-all"
            >
              <span>Launch Sim Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ambient background glow decoration */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monitored Water Spread"
          value="765 Ha"
          subtitle="8 Priority Bengaluru Catchments"
          icon={Droplet}
          change="-4.8% NDWI Delta"
          isPositive={false}
          accentColor="cyan"
        />

        <StatCard
          title="Detected Anomalies"
          value={`${anomalies.length} Active`}
          subtitle="2 Critical, 2 High, 2 Medium"
          icon={ShieldAlert}
          change="+2 New Today"
          isPositive={false}
          accentColor="red"
        />

        <StatCard
          title="High-Risk Hotspots"
          value={`${criticalRisks.length} Corridors`}
          subtitle="Bellandur, Yamalur, Koramangala"
          icon={AlertTriangle}
          change="92/100 Peak Risk"
          isPositive={false}
          accentColor="amber"
        />

        <StatCard
          title="Autonomous Agents"
          value="6 / 6"
          subtitle="All Cognitive Loops Active"
          icon={Cpu}
          change="94.2% Avg Confidence"
          isPositive={true}
          accentColor="teal"
        />
      </div>

      {/* Geospatial Map + Quick Telemetry Hotspots */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-sm font-mono font-bold tracking-wider text-slate-200 uppercase">
                Geospatial Surveillance Grid
              </h2>
            </div>
            <button
              onClick={() => onNavigate('live_earth_monitor')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>Full Screen Earth Monitor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <InteractiveMap
            anomalies={anomalies}
            onSelectAnomaly={onSelectAnomaly}
            onSelectWaterbody={onSelectWaterbody}
            height="460px"
          />
        </div>

        {/* Right Column: Environmental Indicators & Risk Distribution */}
        <div className="space-y-6">
          {/* Micro Weather & Sensor Telemetry Card */}
          <div className="p-4 rounded-xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Atmospheric Inflow Conditions
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {weather.isLive ? 'LIVE' : 'BASELINE'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1">
                  <Thermometer className="w-3 h-3 text-cyan-400" />
                  <span>Ambient Temp</span>
                </div>
                <div className="text-lg font-bold text-white mt-1">{weather.temperature}°C</div>
                <div className="text-[10px] text-slate-500">Feels {weather.apparentTemperature}°C</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1">
                  <CloudRain className="w-3 h-3 text-blue-400" />
                  <span>Precipitation</span>
                </div>
                <div className="text-lg font-bold text-cyan-300 mt-1">{weather.precipitation} mm/h</div>
                <div className="text-[10px] text-slate-500">Relative Hum: {weather.relativeHumidity}%</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1">
                  <Wind className="w-3 h-3 text-teal-400" />
                  <span>Wind Speed</span>
                </div>
                <div className="text-lg font-bold text-teal-300 mt-1">{weather.windSpeed} km/h</div>
                <div className="text-[10px] text-slate-500">Direction: South-West</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400 text-[10px] flex items-center space-x-1">
                  <Activity className="w-3 h-3 text-amber-400" />
                  <span>Air Quality</span>
                </div>
                <div className="text-lg font-bold text-amber-300 mt-1">AQI {weather.aqi}</div>
                <div className="text-[10px] text-slate-500">PM2.5: {weather.pm25} µg/m³</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-cyan-500/15 text-[11px] text-slate-300">
              <span className="font-bold text-cyan-400 font-mono">Microclimate Forecast: </span>
              {weather.forecastSummary}
            </div>
          </div>

          {/* Anomaly Severity Breakdown */}
          <div className="p-4 rounded-xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Anomaly Severity Ratio
              </span>
              <span className="text-[10px] font-mono text-slate-400">Total 24 Sites</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {riskDistribution.map((r, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">{r.name}</span>
                    <span className="text-white font-bold">{r.count}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(r.count / 24) * 100}%`,
                        backgroundColor: r.color 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Trends Hydrograph + Recommended Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hydrograph (2 Columns) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
                  24-Hour Catchment Hydrodynamics & Chemical Dispersion
                </h3>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Correlation between rainfall intensity, Bellandur water stage, and surfactant plume concentration
              </div>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-mono">
              <span className="flex items-center space-x-1 text-cyan-300">
                <span className="w-2.5 h-0.5 bg-cyan-400" />
                <span>Water Level (m)</span>
              </span>
              <span className="flex items-center space-x-1 text-blue-400">
                <span className="w-2.5 h-0.5 bg-blue-500" />
                <span>Precipitation (mm)</span>
              </span>
              <span className="flex items-center space-x-1 text-red-400">
                <span className="w-2.5 h-0.5 bg-red-400" />
                <span>Surfactant (mg/L)</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="waterLevelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="precipGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="surfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(0, 229, 255, 0.3)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontFamily: 'monospace'
                  }}
                />
                <Area type="monotone" dataKey="waterLevel" stroke="#00e5ff" strokeWidth={2} fillOpacity={1} fill="url(#waterLevelGrad)" />
                <Area type="monotone" dataKey="precipitation" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#precipGrad)" />
                <Area type="monotone" dataKey="surfactant" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#surfGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest High-Priority Actions (1 Column) */}
        <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
                Directives & Actions ({pendingActions.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigate('action_centre')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {actions.slice(0, 4).map((action) => (
              <div
                key={action.id}
                onClick={() => onNavigate('action_centre')}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    action.priority === 'P1 - Immediate' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {action.priority}
                  </span>
                  <span className={`text-[10px] font-mono capitalize ${
                    action.status === 'completed' ? 'text-emerald-400' : 'text-cyan-400'
                  }`}>
                    {action.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {action.title}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{action.assignedAgency}</span>
                  <span className="text-slate-500">{action.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
