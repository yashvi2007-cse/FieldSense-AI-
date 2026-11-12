import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { RiskPrediction } from '../types';

interface RiskPredictionViewProps {
  risks: RiskPrediction[];
  onNavigate: (viewId: string) => void;
  onLaunchSimulation: (locationName: string) => void;
}

export const RiskPredictionView: React.FC<RiskPredictionViewProps> = ({
  risks,
  onNavigate,
  onLaunchSimulation,
}) => {
  const [selectedHorizon, setSelectedHorizon] = useState<'all' | '24 Hours' | '48 Hours' | '7 Days'>('all');
  const [selectedRisk, setSelectedRisk] = useState<RiskPrediction>(risks[0]);

  const filteredRisks = risks.filter((r) => {
    if (selectedHorizon === 'all') return true;
    return r.horizon === selectedHorizon;
  });

  // Risk Score comparison chart data
  const chartData = filteredRisks.map((r) => ({
    name: r.locationName.split(' ')[0],
    score: r.riskScore,
    confidence: r.confidence,
    fullName: r.locationName,
  }));

  // 7-Day simulated trend curve for the selected risk
  const forecastTrendData = [
    { day: 'Day 1 (Now)', riskScore: selectedRisk.riskScore, baseline: 35 },
    { day: 'Day 2', riskScore: Math.min(100, Math.round(selectedRisk.riskScore * 1.08)), baseline: 35 },
    { day: 'Day 3', riskScore: Math.min(100, Math.round(selectedRisk.riskScore * 1.15)), baseline: 36 },
    { day: 'Day 4', riskScore: Math.round(selectedRisk.riskScore * 0.92), baseline: 36 },
    { day: 'Day 5', riskScore: Math.round(selectedRisk.riskScore * 0.78), baseline: 34 },
    { day: 'Day 6', riskScore: Math.round(selectedRisk.riskScore * 0.65), baseline: 33 },
    { day: 'Day 7', riskScore: Math.round(selectedRisk.riskScore * 0.54), baseline: 32 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Hydrological & Environmental Risk Prediction
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Forward-looking physical projections combining 2D hydrodynamic simulations, Open-Meteo precipitation models, and drainage topological friction.
          </p>
        </div>

        {/* Horizon Tabs */}
        <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs font-mono">
          {(['all', '24 Hours', '48 Hours', '7 Days'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setSelectedHorizon(h)}
              className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                selectedHorizon === h
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Comparison Chart + Risk Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Risk Comparison Chart & Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Comparative Risk Bar Chart */}
          <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Spatial Risk Index By Catchment Corridor (0 - 100 Severity)
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">Hydrodynamic Projection</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[0, 100]} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: 'rgba(0, 229, 255, 0.3)',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontFamily: 'monospace'
                    }}
                  />
                  <Bar dataKey="score" fill="#00e5ff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Cards */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Active Risk Predictions ({filteredRisks.length})
            </div>

            {filteredRisks.map((risk) => {
              const isSelected = selectedRisk.id === risk.id;

              return (
                <div
                  key={risk.id}
                  onClick={() => setSelectedRisk(risk)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all space-y-3 ${
                    isSelected
                      ? 'bg-[#101b33] border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'bg-[#0c1324] border-cyan-500/15 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          risk.riskLevel === 'Critical'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : risk.riskLevel === 'Elevated'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        }`}>
                          {risk.riskLevel} Risk
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{risk.horizon} Horizon</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-[10px] font-mono text-cyan-400">{risk.riskCategory}</span>
                      </div>

                      <h3 className="text-sm font-bold text-white font-mono mt-1.5">
                        {risk.locationName}
                      </h3>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-mono font-bold text-white">
                        {risk.riskScore} <span className="text-xs text-slate-500">/ 100</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 flex items-center justify-end space-x-1">
                        {risk.forecastTrend === 'increasing' ? (
                          <span className="text-red-400 flex items-center font-bold">
                            <ArrowUpRight className="w-3 h-3" /> Trend Rising
                          </span>
                        ) : (
                          <span className="text-emerald-400 flex items-center font-bold">
                            <ArrowDownRight className="w-3 h-3" /> Trend Declining
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Factor Contribution mini bars */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono text-slate-400">Primary Driving Drivers:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {risk.primaryFactors.map((f, i) => (
                        <div key={i} className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[11px] font-mono">
                          <div className="flex justify-between text-slate-300 truncate">
                            <span className="truncate">{f.factor}</span>
                            <span className="font-bold text-cyan-300 ml-1">{f.impactPct}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Deep Dive on Selected Risk */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/25 shadow-xl space-y-4 sticky top-16">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Risk Forecast Decomposition
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Confidence: {selectedRisk.confidence}%
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-white font-mono">
                {selectedRisk.locationName}
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Category: <span className="text-cyan-300">{selectedRisk.riskCategory}</span>
              </div>
            </div>

            {/* 7-Day Projected Trajectory Curve */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                7-Day Inundation / Toxicity Trajectory
              </div>
              <div className="h-44 w-full bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 9, fill: '#94a3b8' }} domain={[0, 100]} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: 'rgba(0, 229, 255, 0.3)',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontFamily: 'monospace'
                      }}
                    />
                    <Line type="monotone" dataKey="riskScore" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="baseline" stroke="#64748b" strokeDasharray="4 4" strokeWidth={1} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Historical Analogue Benchmark */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                Historical Benchmark Analogue
              </div>
              <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                {selectedRisk.historicalComparison}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => onLaunchSimulation(selectedRisk.locationName)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center justify-center space-x-2"
              >
                <span>Simulate Inundation Scenario</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('action_centre')}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/20 text-cyan-300 text-xs font-mono transition-colors flex items-center justify-center space-x-1"
              >
                <span>Dispatch Preventive Intervention</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
