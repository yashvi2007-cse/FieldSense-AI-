import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  FlaskConical as FlaskIcon, 
  RotateCcw as ResetIcon, 
  Play as PlayIcon,
  Sliders,
  ChevronRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { MONITORED_WATERBODIES } from '../data/bengaluruGeo';
import { SimulationParameters, SimulationResult } from '../types';
import { runHydrologicalSimulation } from '../services/simulationEngine';

interface SimulationLabViewProps {
  initialLocation?: string;
}

export const SimulationLabView: React.FC<SimulationLabViewProps> = ({
  initialLocation,
}) => {
  const [params, setParams] = useState<SimulationParameters>({
    rainfallMultiplier: 2.2, // ~85mm downpour
    siltationPercentage: 55, // 55% drain siltation
    inletObstruction: 40,
    selectedWaterbody: initialLocation || 'Bellandur Lake Catchment',
    soilSaturation: 75,
  });

  const [result, setResult] = useState<SimulationResult>(() => 
    runHydrologicalSimulation(params)
  );

  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const res = runHydrologicalSimulation(params);
      setResult(res);
      setIsSimulating(false);
    }, 500);
  };

  const handleResetDefaults = () => {
    const defaults: SimulationParameters = {
      rainfallMultiplier: 1.0,
      siltationPercentage: 20,
      inletObstruction: 10,
      selectedWaterbody: 'Bellandur Lake Catchment',
      soilSaturation: 40,
    };
    setParams(defaults);
    setResult(runHydrologicalSimulation(defaults));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 lg:p-8 rounded-3xl modern-card">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <FlaskIcon className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Hydrological Simulation Lab
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Interactive scenario modeling: test urban catchments against cloudbursts, drain blockages, and catchment hardening.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 font-mono text-xs transition-colors"
          >
            <ResetIcon className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-full font-mono text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all disabled:opacity-50"
          >
            <PlayIcon className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'COMPUTING...' : 'RUN SIMULATION'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls (1 Col) + Simulation Results (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls (1 Col) */}
        <div className="p-6 rounded-3xl modern-card space-y-6">
          <div className="text-sm font-semibold text-white border-b border-white/[0.08] pb-3">
            Scenario Parameters
          </div>

          {/* Waterbody Selector */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400">Target Basin</label>
            <select
              value={params.selectedWaterbody}
              onChange={(e) => setParams({ ...params, selectedWaterbody: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              {MONITORED_WATERBODIES.map((wb) => (
                <option key={wb.id} value={wb.name}>
                  {wb.name} ({wb.areaHa} Ha)
                </option>
              ))}
            </select>
          </div>

          {/* Sliders */}
          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Rainfall Intensity</span>
                <span className="text-cyan-400 font-mono font-bold">{params.rainfallMultiplier}x ({Math.round(params.rainfallMultiplier * 38)} mm/h)</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={params.rainfallMultiplier}
                onChange={(e) => setParams({ ...params, rainfallMultiplier: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Drain Siltation / Choke</span>
                <span className="text-amber-400 font-mono font-bold">{params.siltationPercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={params.siltationPercentage}
                onChange={(e) => setParams({ ...params, siltationPercentage: parseInt(e.target.value) })}
                className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Inlet Obstruction</span>
                <span className="text-teal-400 font-mono font-bold">{params.inletObstruction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={params.inletObstruction}
                onChange={(e) => setParams({ ...params, inletObstruction: parseInt(e.target.value) })}
                className="w-full accent-teal-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results & Comparison (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Comparison Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl modern-card space-y-1">
              <div className="text-xs text-slate-400">Baseline Inundation</div>
              <div className="text-2xl font-bold font-mono text-slate-300">
                {result.baselineInundationAreaHa} <span className="text-xs font-normal">Ha</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl modern-card space-y-1 border-red-500/20">
              <div className="text-xs text-red-300">Scenario Inundation</div>
              <div className="text-2xl font-bold font-mono text-red-400">
                {result.simulatedInundationAreaHa} <span className="text-xs font-normal">Ha</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl modern-card space-y-1">
              <div className="text-xs text-slate-400">Population at Risk</div>
              <div className="text-2xl font-bold font-mono text-amber-300">
                {result.affectedPopulationEstimate.toLocaleString()}
              </div>
            </div>
          </div>

          {/* 24h Hydrodynamic Curve */}
          <div className="p-6 rounded-3xl modern-card space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-sm font-semibold text-white">
                Projected 24-Hour Hydrograph (Runoff & Stage)
              </span>
              <span className="text-xs font-mono text-cyan-400">
                Peak Surge in {result.peakSurgeTimeHours}h
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.hourlyProjection}>
                  <defs>
                    <linearGradient id="simRunoff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} unit="h" />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0c1220',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '11px',
                    }}
                  />
                  <Area type="monotone" dataKey="runoffVolumeMld" stroke="#00e5ff" strokeWidth={2.5} fillOpacity={1} fill="url(#simRunoff)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
