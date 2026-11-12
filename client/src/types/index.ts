export type AgentId = 
  | 'observation'
  | 'change_detection'
  | 'investigation'
  | 'prediction'
  | 'action'
  | 'verification';

export type AgentStatus = 'idle' | 'running' | 'completed' | 'warning' | 'error';

export interface AgentExecutionRecord {
  id: string;
  timestamp: string;
  durationMs: number;
  status: 'success' | 'warning' | 'error';
  summary: string;
  metricsProcessed: number;
}

export interface Agent {
  id: AgentId;
  name: string;
  code: string;
  stepNumber: number;
  role: string;
  description: string;
  status: AgentStatus;
  lastExecuted: string;
  confidence: number;
  inputDescription: string;
  outputDescription: string;
  currentTask?: string;
  stats: {
    dataPointsIngested?: number;
    anomaliesFound?: number;
    reportsGenerated?: number;
    predictionsCalculated?: number;
    actionsDispatched?: number;
    actionsVerified?: number;
  };
  executionHistory: AgentExecutionRecord[];
}

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export interface Anomaly {
  id: string;
  title: string;
  category: 'Water Level Surge' | 'Chemical & Toxic Inflow' | 'Buffer Encroachment' | 'Stormwater Siltation' | 'Algal Bloom Surge';
  severity: SeverityLevel;
  location: {
    name: string;
    coordinates: [number, number];
    ward: string;
    subzone: string;
  };
  detectedAt: string;
  confidence: number;
  uncertainty: string;
  changeMetric: {
    label: string;
    baselineValue: string;
    observedValue: string;
    deltaPct: number;
  };
  evidenceIds: string[];
  status: 'detected' | 'investigating' | 'confirmed' | 'mitigating' | 'resolved';
  description: string;
}

export interface InvestigationHypothesis {
  cause: string;
  probability: number;
  rationale: string;
  evidenceRef: string;
}

export interface Investigation {
  id: string;
  anomalyId: string;
  title: string;
  status: 'in_progress' | 'completed' | 'escalated';
  timestamp: string;
  whatChanged: string;
  whereLocation: string;
  coordinates: [number, number];
  whenDetected: string;
  supportingEvidenceIds: string[];
  causalHypotheses: InvestigationHypothesis[];
  projectedConsequences: string[];
  recommendedResponses: string[];
  uncertaintyAssessment: string;
  assignedAgent: string;
  verifiedByFieldTeam: boolean;
}

export interface RiskPrediction {
  id: string;
  locationName: string;
  coordinates: [number, number];
  riskCategory: 'Flash Flood Inundation' | 'Toxic Froth Dispersion' | 'Groundwater Leaching' | 'Drinking Water Contamination';
  riskScore: number; // 0 - 100
  riskLevel: 'Critical' | 'Elevated' | 'Moderate' | 'Guarded';
  horizon: '24 Hours' | '48 Hours' | '7 Days';
  forecastTrend: 'increasing' | 'stable' | 'decreasing';
  primaryFactors: {
    factor: string;
    impactPct: number;
    direction: 'up' | 'down';
  }[];
  historicalComparison: string;
  confidence: number;
  simulatedDelta?: number;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: 'Drainage Clearance' | 'Sluice Gate Operation' | 'Effluent Interception' | 'Citizen Advisory' | 'Enforcement Citation';
  priority: 'P1 - Immediate' | 'P2 - High' | 'P3 - Standard';
  status: 'pending' | 'in_progress' | 'completed' | 'verified';
  assignedAgency: 'BBMP Stormwater Dept' | 'BWSSB Wastewater Unit' | 'KSPCB Enforcement' | 'State Disaster Response (SDRF)' | 'Citizen Lake Wardens';
  location: string;
  coordinates: [number, number];
  dueDate: string;
  createdAt: string;
  relatedAnomalyId?: string;
  verificationStatus: 'Unverified' | 'Pending Inspection' | 'Satellite Verified' | 'IoT Sensor Confirmed';
  activityLog: {
    id: string;
    timestamp: string;
    actor: string;
    action: string;
  }[];
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: 'Satellite Multispectral (Sentinel-2)' | 'IoT Ultrasonic Level Gauge' | 'Open-Meteo Weather Telemetry' | 'Citizen Geospatial Report' | 'KSPCB Spectrophotometry' | 'UAV High-Res Orthomosaic';
  source: string;
  timestamp: string;
  locationName: string;
  coordinates: [number, number];
  qualityScore: number;
  verified: boolean;
  metadata: {
    spectralBand?: string;
    sensorSerial?: string;
    cloudCoverPct?: number;
    samplingInterval?: string;
    readingUnit?: string;
    rawTelemetry?: string;
  };
  summary: string;
  relatedAnomalyIds: string[];
}

export interface SimulationParameters {
  rainfallMultiplier: number; // e.g. 1.0 = normal, 2.5 = 120mm downpour
  siltationPercentage: number; // 0 - 100%
  inletObstruction: number; // 0 - 100%
  selectedWaterbody: string;
  soilSaturation: number; // 0 - 100%
}

export interface SimulationResult {
  baselineInundationAreaHa: number;
  simulatedInundationAreaHa: number;
  affectedPopulationEstimate: number;
  peakSurgeTimeHours: number;
  waterQualityIndexShift: number; // negative is worse
  bufferOvertoppingProbability: number;
  hourlyProjection: {
    hour: number;
    runoffVolumeMld: number;
    waterLevelMeters: number;
    criticalCapacityPct: number;
  }[];
  criticalBottlenecks: string[];
}

export interface BengaluruWeather {
  temperature: number;
  precipitation: number;
  relativeHumidity: number;
  windSpeed: number;
  apparentTemperature: number;
  aqi: number;
  pm25: number;
  pm10: number;
  isLive: boolean;
  lastUpdated: string;
  forecastSummary: string;
}

export interface MonitoredWaterbody {
  id: string;
  name: string;
  coordinates: [number, number];
  areaHa: number;
  currentLevelMeters: number;
  maxSafeCapacityMeters: number;
  status: 'Normal' | 'Advisory' | 'Critical Warning';
  primaryIssue: string;
  recentNdwiDelta: number;
  waterQualityIndex: number;
}

