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
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 lg:p-8 rounded-3xl modern-card">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Risk Prediction & Hydrological Forecasts
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Hydrodynamic projections estimating inundation corridors, froth dispersion, and water quality deterioration.
          </p>
        </div>

        {/* Horizon Tabs */}
        <div className="flex rounded-full bg-slate-900/80 border border-white/10 p-1 text-xs font-mono">
          {(['all', '24 Hours', '48 Hours', '7 Days'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setSelectedHorizon(h)}
              className={`px-3.5 py-1.5 rounded-full capitalize transition-all ${
                selectedHorizon === h
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold'
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
        <div className="lg:col-span-2 space-y-6">
          {/* Comparative Risk Bar Chart */}
          <div className="p-6 lg:p-8 rounded-3xl modern-card space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-sm font-semibold text-white">
                Catchment Risk Severity (0 - 100 Index)
              </span>
              <span className="text-xs font-mono text-cyan-400">Hydrodynamic Mesh</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 100]} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0c1220',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="score" fill="#00e5ff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Cards */}
          <div className="space-y-4">
            {filteredRisks.map((risk) => {
              const isSelected = selectedRisk.id === risk.id;

              return (
                <div
                  key={risk.id}
                  onClick={() => setSelectedRisk(risk)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all space-y-3 modern-card ${
                    isSelected ? 'border-cyan-400/60 shadow-[0_0_20px_rgba(0,229,255,0.15)] bg-slate-900/90' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          risk.riskLevel === 'Critical'
                            ? 'bg-red-500/10 text-red-300 border border-red-500/30'
                            : risk.riskLevel === 'Elevated'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                            : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        }`}>
                          {risk.riskLevel}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{risk.horizon} Horizon</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-xs text-cyan-400 font-medium">{risk.riskCategory}</span>
                      </div>

                      <h3 className="text-base font-bold text-white pt-1">
                        {risk.locationName}
                      </h3>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-mono font-bold text-white">
                        {risk.riskScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
                      </div>
                      <div className="text-xs font-mono text-slate-400 flex items-center justify-end space-x-1 pt-0.5">
                        {risk.forecastTrend === 'increasing' ? (
                          <span className="text-red-400 flex items-center font-bold">
                            <ArrowUpRight className="w-3.5 h-3.5" /> Trend Rising
                          </span>
                        ) : (
                          <span className="text-emerald-400 flex items-center font-bold">
                            <ArrowDownRight className="w-3.5 h-3.5" /> Trend Declining
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
          <div className="p-6 lg:p-8 rounded-3xl modern-card space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Risk Horizon Assessment
              </span>
              <span className="text-xs font-mono text-slate-400">
                Certainty: {selectedRisk.confidence}%
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">
                {selectedRisk.locationName}
              </h2>
              <div className="text-xs text-slate-400">
                Primary Hazard: <span className="text-slate-200">{selectedRisk.riskCategory}</span>
              </div>
            </div>

            {/* 7-Day Curve */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400 font-mono">7-Day Trajectory Curve</div>
              <div className="h-40 w-full bg-slate-900/50 p-2 rounded-2xl border border-white/5">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 9, fill: '#94a3b8' }} domain={[0, 100]} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: '#0c1220',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        fontSize: '10px',
                      }}
                    />
                    <Line type="monotone" dataKey="riskScore" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onLaunchSimulation(selectedRisk.locationName)}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.25)] flex items-center justify-center space-x-2"
              >
                <span>Simulate Inundation Envelope</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
