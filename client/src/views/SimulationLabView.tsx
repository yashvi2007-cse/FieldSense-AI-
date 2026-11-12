import React, { useState } from 'react';
import { 
  FlaskConical, 
  Play, 
  RotateCcw, 
  CloudRain, 
  Sliders, 
  Layers, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Clock, 
  Droplet,
  Info,
  CheckCircle2
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
    rainfallMultiplier: 2.2, // 2.2x = ~85mm downpour
    siltationPercentage: 55, // 55% drain siltation
    inletObstruction: 40, // 40% inlet obstruction
    selectedWaterbody: initialLocation || 'Bellandur Lake Catchment',
    soilSaturation: 75, // 75% soil saturation
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
    }, 600);
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
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FlaskConical className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
              Hydrological Simulation Lab
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Interactive scenario modeling engine: stress-test urban catchments against extreme cloudbursts, drain blockages, and catchment hardening.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50"
          >
            <Play className={`w-4 h-4 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'COMPUTING MESH...' : 'RUN SIMULATION'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls (1 Col) + Simulation Results (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Parameter Controls (1 Col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/25 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Stress-Test Parameters
              </span>
              <Sliders className="w-4 h-4 text-cyan-400" />
            </div>

            {/* Target Waterbody Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-medium">
                Monitored Waterbody / Basin
              </label>
              <select
                value={params.selectedWaterbody}
                onChange={(e) => setParams({ ...params, selectedWaterbody: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                {MONITORED_WATERBODIES.map((wb) => (
                  <option key={wb.id} value={wb.name}>
                    {wb.name} ({wb.areaHa} Ha)
                  </option>
                ))}
              </select>
            </div>

            {/* Rainfall Multiplier Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Precipitation Surge (Rainfall)</span>
                <span className="text-cyan-400 font-bold">{params.rainfallMultiplier}x ({Math.round(params.rainfallMultiplier * 38)} mm/h)</span>
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
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0.5x (Light)</span>
                <span>2.0x (Monsoon)</span>
                <span>4.0x (Cloudburst)</span>
              </div>
            </div>

            {/* Drain Siltation Percentage Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Drain Siltation & Clogging</span>
                <span className="text-amber-400 font-bold">{params.siltationPercentage}% Cross-Section</span>
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
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0% (Desilted)</span>
                <span>50% (Constricted)</span>
                <span>90% (Blinded)</span>
              </div>
            </div>

            {/* Inlet / Sluice Obstruction Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Sluice Intake Obstruction</span>
                <span className="text-teal-400 font-bold">{params.inletObstruction}% Impairment</span>
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
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0% Free Flow</span>
                <span>100% Fully Blocked</span>
              </div>
            </div>

            {/* Soil Saturation Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Antecedent Soil Saturation</span>
                <span className="text-purple-400 font-bold">{params.soilSaturation}% Saturation</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={params.soilSaturation}
                onChange={(e) => setParams({ ...params, soilSaturation: parseInt(e.target.value) })}
                className="w-full accent-purple-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Disclaimer pill */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
              <div className="flex items-center space-x-1 text-slate-300 font-bold">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulation Mesh Note:</span>
              </div>
              <div>Simplified Saint-Venant 2D overland routing model. Calibrated against historical Bengaluru inundation benchmarks.</div>
            </div>
          </div>
        </div>

        {/* Scenario Outcome & Comparative Analytics (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Comparison KPI Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0c1324] border border-cyan-500/20 text-xs font-mono">
              <div className="text-[10px] text-slate-400">Baseline Inundation</div>
              <div className="text-xl font-bold text-slate-300 mt-1">
                {result.baselineInundationAreaHa} <span className="text-xs">Ha</span>
              </div>
              <div className="text-[10px] text-slate-500">Standard monsoon</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c1324] border border-red-500/30 text-xs font-mono">
              <div className="text-[10px] text-red-300">Scenario Inundation</div>
              <div className="text-xl font-bold text-red-400 mt-1">
                {result.simulatedInundationAreaHa} <span className="text-xs">Ha</span>
              </div>
              <div className="text-[10px] text-red-400 font-bold">
                +{Math.round(((result.simulatedInundationAreaHa - result.baselineInundationAreaHa) / result.baselineInundationAreaHa) * 100)}% Surge
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c1324] border border-cyan-500/20 text-xs font-mono">
              <div className="text-[10px] text-slate-400">Estimated Population</div>
              <div className="text-xl font-bold text-amber-300 mt-1">
                {result.affectedPopulationEstimate.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500">In flood envelope</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c1324] border border-cyan-500/20 text-xs font-mono">
              <div className="text-[10px] text-slate-400">Time to Peak Surge</div>
              <div className="text-xl font-bold text-cyan-300 mt-1">
                {result.peakSurgeTimeHours} <span className="text-xs">Hours</span>
              </div>
              <div className="text-[10px] text-slate-500">From rain onset</div>
            </div>
          </div>

          {/* 24-Hour Projected Hydrograph Timeline */}
          <div className="p-5 rounded-2xl bg-[#0c1324] border border-cyan-500/20 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  24-Hour Runoff Volume (MLD) & Hydraulic Stage (Meters)
                </span>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Dynamic simulation response for {params.selectedWaterbody}
                </div>
              </div>

              <div className="flex items-center space-x-3 text-[10px] font-mono">
                <span className="flex items-center space-x-1 text-cyan-300">
                  <span className="w-2.5 h-0.5 bg-cyan-400" />
                  <span>Runoff Volume (MLD)</span>
                </span>
                <span className="flex items-center space-x-1 text-amber-400">
                  <span className="w-2.5 h-0.5 bg-amber-400" />
                  <span>Water Stage (m)</span>
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.hourlyProjection}>
                  <defs>
                    <linearGradient id="runoffGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} unit="h" />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: 'rgba(0, 229, 255, 0.3)',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontFamily: 'monospace'
                    }}
                  />
                  <Area type="monotone" dataKey="runoffVolumeMld" stroke="#00e5ff" strokeWidth={2} fillOpacity={1} fill="url(#runoffGrad)" />
                  <Area type="monotone" dataKey="waterLevelMeters" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#stageGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Identified Critical Bottlenecks */}
          <div className="p-4 rounded-xl bg-[#0c1324] border border-cyan-500/20 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">
              Critical Hydraulic Bottlenecks Identified
            </div>

            <div className="space-y-2">
              {result.criticalBottlenecks.map((b, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="font-mono text-[11px]">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
