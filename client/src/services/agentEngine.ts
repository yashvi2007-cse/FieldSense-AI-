import { Agent, AgentId } from '../types';

export interface AgentLogEntry {
  id: string;
  timestamp: string;
  agentId: AgentId;
  agentName: string;
  level: 'info' | 'warning' | 'success' | 'alert';
  message: string;
}

export interface RunAgentResult {
  updatedAgent: Agent;
  logs: AgentLogEntry[];
  generatedSummary: string;
}

export function executeAgentStep(
  agent: Agent,
  onLog?: (log: AgentLogEntry) => void
): RunAgentResult {
  const timestamp = new Date().toLocaleTimeString();
  const logs: AgentLogEntry[] = [];

  const addLog = (level: 'info' | 'warning' | 'success' | 'alert', message: string) => {
    const entry: AgentLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      agentId: agent.id,
      agentName: agent.name,
      level,
      message,
    };
    logs.push(entry);
    if (onLog) onLog(entry);
  };

  let summary = '';
  const updatedStats = { ...agent.stats };

  switch (agent.id) {
    case 'observation':
      addLog('info', 'Connecting to Sentinel-2 Multi-Spectral data ingestion pipeline...');
      addLog('info', 'Ingesting real-time stream from 48 IoT ultrasonic telemetry sensors across 8 lakes.');
      addLog('info', 'Synchronizing with Open-Meteo European Model (ECMWF) precipitation raster.');
      addLog('success', 'Normalized 14,280 geospatial telemetry vectors with 98.4% coordinate alignment.');
      updatedStats.dataPointsIngested = (updatedStats.dataPointsIngested || 140000) + 14280;
      summary = 'Ingested Sentinel-2 L2A tile and 48 municipal IoT gauge feeds. Atmospheric calibration nominal.';
      break;

    case 'change_detection':
      addLog('info', 'Running pixel-level NDWI delta differential against 10-year rolling seasonal baseline...');
      addLog('warning', 'Anomaly flag: -14% water surface spread shrinkage detected at Bellandur Lake.');
      addLog('warning', 'Hydraulic constriction: K-100 SWD 80ft Road cross-section dropped to 18.5 m² (-56%).');
      addLog('alert', 'Critical chemical indicator: Surfactant concentration surge (8.7 mg/L) at Yamalur Weir.');
      addLog('success', 'Isolated 6 distinct anomalies with spatial bounding boxes and uncertainty bounds.');
      updatedStats.anomaliesFound = (updatedStats.anomaliesFound || 0) + 1;
      summary = 'Detected 6 physical-world anomalies. Bellandur and K-100 SWD classified as CRITICAL severity.';
      break;

    case 'investigation':
      addLog('info', 'Retrieving cadastral boundaries and industrial zoning layers from Survey of India database...');
      addLog('info', 'Executing spatial topological graph traversal on Challaghatta stormwater feeder branches.');
      addLog('warning', 'Correlated KSPCB spectrophotometry COD spike (380 mg/L) with upstream textile washing units.');
      addLog('info', 'Evaluating drone orthomosaic (4cm GSD) for Kaggadasapura 30m buffer zone encroachment.');
      addLog('success', 'Generated multi-modal causal attribution dossier with 3 ranked hypotheses.');
      updatedStats.reportsGenerated = (updatedStats.reportsGenerated || 0) + 1;
      summary = 'Attributed Bellandur frothing to illicit midnight industrial surfactant discharge (68% probability).';
      break;

    case 'prediction':
      addLog('info', 'Initializing 2D shallow-water hydrodynamic simulation mesh (Saint-Venant equations)...');
      addLog('info', 'Incorporating 38.5mm forecasted cloudburst precipitation over Mahadevapura subzone.');
      addLog('alert', 'Model outputs: 82% flash flood risk at Yamalur underpass within next 4 hours.');
      addLog('warning', 'Projecting 2.8m toxic froth plume dispersion across Outer Ring Road tech corridor.');
      addLog('success', 'Generated 24h, 48h, and 7-day risk trajectories across 6 monitored zones.');
      updatedStats.predictionsCalculated = (updatedStats.predictionsCalculated || 0) + 1;
      summary = 'Hydrodynamic model predicts high waterlogging risk at Koramangala 4th Block and Yamalur within 4h.';
      break;

    case 'action':
      addLog('info', 'Querying BBMP, BWSSB, and SDRF emergency asset availability registries...');
      addLog('alert', 'Dispatched P1 Directive: Mobilize 2 amphibious excavators to K-100 SWD 80ft Road culvert.');
      addLog('alert', 'Dispatched P1 Directive: Activate chemical de-foamer nozzles at Bellandur Yamalur weir.');
      addLog('warning', 'Dispatched P2 Directive: Issue citizen waterlogging advisory to 18,400 residents.');
      addLog('success', 'Formatted 8 actionable municipal work tickets with GIS coordinates and SLAs.');
      updatedStats.actionsDispatched = (updatedStats.actionsDispatched || 0) + 2;
      summary = 'Dispatched 2 P1 emergency intervention tickets and notified municipal disaster response teams.';
      break;

    case 'verification':
      addLog('info', 'Querying post-intervention IoT sensor telemetry at K-100 SWD and Bellandur Weir...');
      addLog('info', 'Analyzing secondary drone pass at Kaggadasapura Lake Northern perimeter.');
      addLog('success', 'Observed 40% reduction in backwater elevation at Koramangala following initial dredging.');
      addLog('success', 'Verified BWSSB sluice gate closure dropped industrial discharge velocity by 45%.');
      updatedStats.actionsVerified = (updatedStats.actionsVerified || 0) + 1;
      summary = 'Post-intervention verification confirmed positive hydraulic response in 2 active sectors.';
      break;
  }

  const newHistoryRecord = {
    id: `ex-${Date.now()}`,
    timestamp,
    durationMs: Math.floor(Math.random() * 1200) + 800,
    status: 'success' as const,
    summary,
    metricsProcessed: Math.floor(Math.random() * 5000) + 2000,
  };

  const updatedAgent: Agent = {
    ...agent,
    status: 'completed',
    lastExecuted: 'Just now',
    stats: updatedStats,
    executionHistory: [newHistoryRecord, ...agent.executionHistory.slice(0, 9)],
  };

  return {
    updatedAgent,
    logs,
    generatedSummary: summary,
  };
}
