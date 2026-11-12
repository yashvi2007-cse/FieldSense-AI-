import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight,
  ArrowRight
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

  const chartData = filteredRisks.map((r) => ({
    name: r.locationName.split(' ')[0],
    score: r.riskScore,
    confidence: r.confidence,
    fullName: r.locationName,
  }));

  const forecastTrendData = [
    { day: 'Day 1', riskScore: selectedRisk.riskScore, baseline: 35 },
    { day: 'Day 2', riskScore: Math.min(100, Math.round(selectedRisk.riskScore * 1.08)), baseline: 35 },
    { day: 'Day 3', riskScore: Math.min(100, Math.round(selectedRisk.riskScore * 1.15)), baseline: 36 },
    { day: 'Day 4', riskScore: Math.round(selectedRisk.riskScore * 0.92), baseline: 36 },
    { day: 'Day 5', riskScore: Math.round(selectedRisk.riskScore * 0.78), baseline: 34 },
    { day: 'Day 6', riskScore: Math.round(selectedRisk.riskScore * 0.65), baseline: 33 },
    { day: 'Day 7', riskScore: Math.round(selectedRisk.riskScore * 0.54), baseline: 32 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-5 lg:p-6 rounded-2xl enterprise-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Hydrodynamic Risk Forecasts & Modeling
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Hydrodynamic projections estimating inundation corridors, froth dispersion, and water quality deterioration.
          </p>
        </div>

        {/* Horizon Tabs */}
        <div className="flex rounded-lg bg-white/[0.04] border border-white/[0.08] p-1 text-xs font-mono">
          {(['all', '24 Hours', '48 Hours', '7 Days'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setSelectedHorizon(h)}
              className={`px-3 py-1 rounded capitalize transition-colors ${
                selectedHorizon === h
                  ? 'bg-sky-500/20 text-sky-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Comparative Risk Bar Chart */}
          <div className="p-5 rounded-2xl enterprise-card space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Catchment Risk Severity (0 - 100 Index)
              </span>
              <span className="text-xs font-mono text-sky-400">Saint-Venant 2D Mesh</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 100]} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0f1624',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="score" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Cards */}
          <div className="space-y-3">
            {filteredRisks.map((risk) => {
              const isSelected = selectedRisk.id === risk.id;

              return (
                <div
                  key={risk.id}
                  onClick={() => setSelectedRisk(risk)}
                  className={`p-5 rounded-xl cursor-pointer transition-colors space-y-2.5 enterprise-card ${
                    isSelected ? 'border-sky-400/50 bg-white/[0.05]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          risk.riskLevel === 'Critical'
                            ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                            : risk.riskLevel === 'Elevated'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-sky-500/10 text-sky-300 border border-sky-500/20'
                        }`}>
                          {risk.riskLevel}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{risk.horizon}</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-xs text-sky-400 font-medium">{risk.riskCategory}</span>
                      </div>

                      <h3 className="text-sm font-bold text-white pt-0.5">
                        {risk.locationName}
                      </h3>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-mono font-bold text-white">
                        {risk.riskScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-end space-x-1">
                        {risk.forecastTrend === 'increasing' ? (
                          <span className="text-red-400 flex items-center font-bold">
                            <ArrowUpRight className="w-3 h-3" /> Rising
                          </span>
                        ) : (
                          <span className="text-emerald-400 flex items-center font-bold">
                            <ArrowDownRight className="w-3 h-3" /> Decreasing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Risk Deep-Dive (1 Col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl enterprise-card space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                Risk Horizon Analysis
              </span>
              <span className="text-xs font-mono text-slate-400">
                Confidence: {selectedRisk.confidence}%
              </span>
            </div>

            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-white">
                {selectedRisk.locationName}
              </h2>
              <div className="text-xs text-slate-400">
                Primary Hazard: <span className="text-slate-200">{selectedRisk.riskCategory}</span>
              </div>
            </div>

            {/* 7-Day Curve */}
            <div className="space-y-1.5">
              <div className="text-xs text-slate-400 font-mono">7-Day Trajectory Curve</div>
              <div className="h-40 w-full bg-white/[0.02] p-2 rounded-xl border border-white/[0.06]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 9, fill: '#94a3b8' }} domain={[0, 100]} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: '#0f1624',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        fontSize: '10px',
                      }}
                    />
                    <Line type="monotone" dataKey="riskScore" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <button
              onClick={() => onLaunchSimulation(selectedRisk.locationName)}
              className="w-full py-2.5 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-black text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Simulate Catchment Dynamics</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
