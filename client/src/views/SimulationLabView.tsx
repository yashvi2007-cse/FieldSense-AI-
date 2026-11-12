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
  ChevronRight
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
    }, 400);
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-5 lg:p-6 rounded-2xl enterprise-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FlaskIcon className="w-4 h-4 text-sky-400" />
            <h1 className="text-lg font-bold text-white tracking-tight">
              Hydrological Scenario Simulation Lab
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Stress-test urban water bodies against precipitation bursts, drain siltation, and antecedent soil moisture.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 font-mono text-xs transition-colors"
          >
            <ResetIcon className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-black transition-colors disabled:opacity-50 shadow-md shadow-sky-500/20"
          >
            <PlayIcon className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Computing Mesh...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls (1 Col) + Simulation Results (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls (1 Col) */}
        <div className="p-5 rounded-2xl enterprise-card space-y-5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono border-b border-white/[0.08] pb-3">
            Simulation Parameters
          </div>

          {/* Waterbody Selector */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">Target Waterbody</label>
            <select
              value={params.selectedWaterbody}
              onChange={(e) => setParams({ ...params, selectedWaterbody: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-mono"
            >
              {MONITORED_WATERBODIES.map((wb) => (
                <option key={wb.id} value={wb.name} className="bg-slate-900 text-white">
                  {wb.name} ({wb.areaHa} Ha)
                </option>
              ))}
            </select>
          </div>

          {/* Sliders */}
          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300">Precipitation Multiplier</span>
                <span className="text-sky-400 font-bold">{params.rainfallMultiplier}x ({Math.round(params.rainfallMultiplier * 38)} mm/h)</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={params.rainfallMultiplier}
                onChange={(e) => setParams({ ...params, rainfallMultiplier: parseFloat(e.target.value) })}
                className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300">Drain Siltation / Choke</span>
                <span className="text-amber-400 font-bold">{params.siltationPercentage}%</span>
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

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300">Inlet Obstruction</span>
                <span className="text-emerald-400 font-bold">{params.inletObstruction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={params.inletObstruction}
                onChange={(e) => setParams({ ...params, inletObstruction: parseInt(e.target.value) })}
                className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results & Comparison (2 Cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Comparison Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl enterprise-card space-y-1">
              <div className="text-[11px] text-slate-400 font-mono">Baseline Inundation</div>
              <div className="text-xl font-bold font-mono text-slate-300">
                {result.baselineInundationAreaHa} <span className="text-xs font-normal">Ha</span>
              </div>
            </div>

            <div className="p-4 rounded-xl enterprise-card space-y-1">
              <div className="text-[11px] text-red-400 font-mono">Scenario Inundation</div>
              <div className="text-xl font-bold font-mono text-red-400">
                {result.simulatedInundationAreaHa} <span className="text-xs font-normal">Ha</span>
              </div>
            </div>

            <div className="p-4 rounded-xl enterprise-card space-y-1">
              <div className="text-[11px] text-slate-400 font-mono">Population at Risk</div>
              <div className="text-xl font-bold font-mono text-amber-300">
                {result.affectedPopulationEstimate.toLocaleString()}
              </div>
            </div>
          </div>

          {/* 24h Hydrodynamic Curve */}
          <div className="p-5 rounded-2xl enterprise-card space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Projected 24-Hour Runoff Hydrograph
              </span>
              <span className="text-xs font-mono text-sky-400">
                Peak Arrival: {result.peakSurgeTimeHours}h
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.hourlyProjection}>
                  <defs>
                    <linearGradient id="simRunoff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} unit="h" />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0f1624',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Area type="monotone" dataKey="runoffVolumeMld" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#simRunoff)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
