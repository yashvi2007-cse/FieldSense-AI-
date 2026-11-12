import { Agent, Anomaly, Investigation, RiskPrediction, ActionItem, EvidenceItem, BengaluruWeather } from '../types';

export const INITIAL_WEATHER: BengaluruWeather = {
  temperature: 24.8,
  precipitation: 14.2,
  relativeHumidity: 78,
  windSpeed: 16.5,
  apparentTemperature: 25.4,
  aqi: 68,
  pm25: 22.4,
  pm10: 54.1,
  isLive: false,
  lastUpdated: new Date().toLocaleTimeString(),
  forecastSummary: 'Scattered monsoon showers with localized intense spells over Mahadevapura and East corridors.'
};

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'observation',
    name: 'Observation Agent',
    code: 'FS-OBS-01',
    stepNumber: 1,
    role: 'Multi-Source Geospatial & Sensor Ingestion',
    description: 'Continuously aggregates live satellite multispectral bands (Sentinel-2, Landsat-9), Open-Meteo meteorological feeds, and 48 municipal IoT water-level telemetry nodes.',
    status: 'idle',
    lastExecuted: '4 mins ago',
    confidence: 97.4,
    inputDescription: 'Raw Sentinel-2 NDWI/NDVI tiles, Open-Meteo precipitation rasters, IoT telemetry streams.',
    outputDescription: 'Normalized spatial raster grids, lake capacity percentages, stormwater velocity vectors.',
    stats: { dataPointsIngested: 142850 },
    executionHistory: [
      { id: 'ex-101', timestamp: '10:45 AM', durationMs: 1420, status: 'success', summary: 'Ingested 14,200 telemetry records from 48 IoT nodes across 8 lakes.', metricsProcessed: 14200 },
      { id: 'ex-102', timestamp: '10:30 AM', durationMs: 1680, status: 'success', summary: 'Processed Sentinel-2 L2A tile for Bengaluru East catchment.', metricsProcessed: 8900 }
    ]
  },
  {
    id: 'change_detection',
    name: 'Change Detection Agent',
    code: 'FS-DET-02',
    stepNumber: 2,
    role: 'Spatial Anomaly & Threshold Analysis',
    description: 'Compares real-time physical observations against 10-year rolling baselines to identify water surface shrinkage, illicit effluent inflows, and drain siltation.',
    status: 'idle',
    lastExecuted: '3 mins ago',
    confidence: 94.8,
    inputDescription: 'Normalized spatial observation grids and historical baseline rasters.',
    outputDescription: 'Classified anomaly alerts with location bounding boxes, severity, and uncertainty bounds.',
    stats: { anomaliesFound: 6 },
    executionHistory: [
      { id: 'ex-201', timestamp: '10:46 AM', durationMs: 840, status: 'success', summary: 'Detected 14% water spread shrinkage and severe turbidity spike at Bellandur Lake.', metricsProcessed: 6 },
      { id: 'ex-202', timestamp: '10:31 AM', durationMs: 910, status: 'success', summary: 'Flagged stormwater obstruction at K-100 Koramangala Primary Valley.', metricsProcessed: 4 }
    ]
  },
  {
    id: 'investigation',
    name: 'Investigation Agent',
    code: 'FS-INV-03',
    stepNumber: 3,
    role: 'Multi-Modal Causal Attribution',
    description: 'Performs automated root cause analysis by cross-referencing anomalies with industrial zoning, drainage topology, drone orthomosaics, and citizen reports.',
    status: 'idle',
    lastExecuted: '2 mins ago',
    confidence: 91.2,
    inputDescription: 'Flagged anomaly clusters, municipal GIS zoning layers, drainage flow topology.',
    outputDescription: 'Structured investigation dossier, ranked causal hypotheses with probabilities.',
    stats: { reportsGenerated: 6 },
    executionHistory: [
      { id: 'ex-301', timestamp: '10:47 AM', durationMs: 2100, status: 'success', summary: 'Synthesized causal hypothesis for Bellandur froth surge: untreated detergent effluent + weir turbulence.', metricsProcessed: 3 },
      { id: 'ex-302', timestamp: '10:32 AM', durationMs: 1850, status: 'success', summary: 'Attributed Kaggadasapura buffer encroachment to unauthorized construction debris dumping.', metricsProcessed: 2 }
    ]
  },
  {
    id: 'prediction',
    name: 'Prediction Agent',
    code: 'FS-PRD-04',
    stepNumber: 4,
    role: 'Hydrological & Inundation Forecasting',
    description: 'Simulates fluid dynamics and runoff accumulation over 24h, 48h, and 7-day windows using hydrodynamic models coupled with meteorological precipitation forecasts.',
    status: 'idle',
    lastExecuted: '2 mins ago',
    confidence: 89.6,
    inputDescription: 'Investigation dossiers, precipitation forecast rasters, digital elevation models (DEM).',
    outputDescription: 'Probabilistic inundation maps, water quality decline curves, population impact metrics.',
    stats: { predictionsCalculated: 6 },
    executionHistory: [
      { id: 'ex-401', timestamp: '10:48 AM', durationMs: 3100, status: 'success', summary: 'Calculated 82% flash flood risk at Yamalur Junction if rainfall exceeds 45mm/hr.', metricsProcessed: 6 },
      { id: 'ex-402', timestamp: '10:33 AM', durationMs: 2800, status: 'success', summary: 'Projected 4-day toxic froth dispersion across Outer Ring Road tech corridor.', metricsProcessed: 4 }
    ]
  },
  {
    id: 'action',
    name: 'Action Agent',
    code: 'FS-ACT-05',
    stepNumber: 5,
    role: 'Resource Dispatch & Intervention Sequencing',
    description: 'Formulates prioritized operational directives mapped to municipal authority jurisdictions (BBMP, BWSSB, KSPCB, SDRF) with timeline estimates and resource needs.',
    status: 'idle',
    lastExecuted: '1 min ago',
    confidence: 93.1,
    inputDescription: 'Risk predictions, severity tiers, municipal asset availability registries.',
    outputDescription: 'Action tickets with priority flags, assigned teams, geo-coordinates, and automated alert dispatches.',
    stats: { actionsDispatched: 8 },
    executionHistory: [
      { id: 'ex-501', timestamp: '10:49 AM', durationMs: 1200, status: 'success', summary: 'Dispatched emergency desilting ticket to BBMP Mahadevapura Division.', metricsProcessed: 4 },
      { id: 'ex-502', timestamp: '10:34 AM', durationMs: 950, status: 'success', summary: 'Issued automated advisory to BWSSB for immediate industrial sluice gate throttling.', metricsProcessed: 3 }
    ]
  },
  {
    id: 'verification',
    name: 'Verification Agent',
    code: 'FS-VRF-06',
    stepNumber: 6,
    role: 'Post-Intervention Outcome Validation',
    description: 'Monitors post-action telemetry to verify whether field interventions successfully mitigated physical anomalies and restored baseline water indices.',
    status: 'idle',
    lastExecuted: 'Just now',
    confidence: 96.0,
    inputDescription: 'Action resolution tickets, subsequent IoT sensor cycles, satellite change passes.',
    outputDescription: 'Verification verdict (Verified / Sub-optimal / Ineffective), loopback feedback.',
    stats: { actionsVerified: 5 },
    executionHistory: [
      { id: 'ex-601', timestamp: '10:50 AM', durationMs: 1400, status: 'success', summary: 'Verified 40% reduction in K-100 drain backwater level following sluice clearance.', metricsProcessed: 5 },
      { id: 'ex-602', timestamp: '10:35 AM', durationMs: 1100, status: 'success', summary: 'Audit confirmed aerator activation at Ulsoor Lake restored dissolved oxygen to 6.4 mg/L.', metricsProcessed: 2 }
    ]
  }
];

export const INITIAL_ANOMALIES: Anomaly[] = [
  {
    id: 'anom-01',
    title: 'Bellandur Lake Toxic Frothing & Sluice Gate Overpressure',
    category: 'Chemical & Toxic Inflow',
    severity: 'critical',
    location: {
      name: 'Bellandur Lake Weir (Yamalur Outlet)',
      coordinates: [12.9352, 77.6698],
      ward: 'Ward 150 - Bellandur',
      subzone: 'Mahadevapura'
    },
    detectedAt: 'Today, 09:24 AM',
    confidence: 96.2,
    uncertainty: '±2.4%',
    changeMetric: {
      label: 'Surfactant & Phosphate Inflow',
      baselineValue: '1.2 mg/L',
      observedValue: '8.7 mg/L',
      deltaPct: 625
    },
    evidenceIds: ['ev-01', 'ev-02', 'ev-06'],
    status: 'investigating',
    description: 'Sudden spike in surfactant concentration at the downstream weir coupled with 18.4 m³/s discharge rate creates severe toxic froth formation across Yamalur bridge.'
  },
  {
    id: 'anom-02',
    title: 'K-100 Koramangala Drain Siltation & Backflow Spike',
    category: 'Stormwater Siltation',
    severity: 'critical',
    location: {
      name: 'K-100 Primary Stormwater Arterial',
      coordinates: [12.9430, 77.6250],
      ward: 'Ward 151 - Koramangala',
      subzone: 'South Zone'
    },
    detectedAt: 'Today, 08:45 AM',
    confidence: 93.8,
    uncertainty: '±3.1%',
    changeMetric: {
      label: 'Effective Drain Hydraulic Cross-Section',
      baselineValue: '42.0 m²',
      observedValue: '18.5 m²',
      deltaPct: -56
    },
    evidenceIds: ['ev-03', 'ev-07'],
    status: 'confirmed',
    description: 'Acoustic sonar profiling detected critical silt and construction debris accumulation reducing primary drainage capacity by over 56% ahead of forecasted evening downpours.'
  },
  {
    id: 'anom-03',
    title: 'Kaggadasapura 30m Buffer Zone Encroachment & Illegal Dumping',
    category: 'Buffer Encroachment',
    severity: 'high',
    location: {
      name: 'Kaggadasapura Lake Northern Shoreline',
      coordinates: [12.9806, 77.6845],
      ward: 'Ward 83 - CV Raman Nagar',
      subzone: 'East Zone'
    },
    detectedAt: 'Yesterday, 04:12 PM',
    confidence: 91.5,
    uncertainty: '±4.0%',
    changeMetric: {
      label: 'Protected Vegetated Buffer Surface',
      baselineValue: '14,800 m²',
      observedValue: '11,200 m²',
      deltaPct: -24.3
    },
    evidenceIds: ['ev-04', 'ev-09'],
    status: 'investigating',
    description: 'Sentinel-2 NDVI delta coupled with UAV high-res orthomosaic reveals 3,600 m² of native wetland vegetation replaced by unpermitted landfilling and construction staging.'
  },
  {
    id: 'anom-04',
    title: 'Varthur Lake Outlet Silt Bank Formation & Hyacinth Choke',
    category: 'Water Level Surge',
    severity: 'high',
    location: {
      name: 'Varthur Lake Spillway Channel',
      coordinates: [12.9568, 77.7471],
      ward: 'Ward 149 - Varthur',
      subzone: 'Mahadevapura'
    },
    detectedAt: 'Today, 07:15 AM',
    confidence: 94.1,
    uncertainty: '±2.8%',
    changeMetric: {
      label: 'Spillway Outflow Velocity',
      baselineValue: '2.4 m/s',
      observedValue: '0.8 m/s',
      deltaPct: -66.7
    },
    evidenceIds: ['ev-02', 'ev-08'],
    status: 'detected',
    description: 'Rapid hyacinth spread combined with sediment accretion at the spillway threshold blocks natural outflow towards Dakshina Pinakini basin, raising lake level to 3.9m.'
  },
  {
    id: 'anom-05',
    title: 'Hebbal Wetland Feeder Drain Turbidity Influx',
    category: 'Algal Bloom Surge',
    severity: 'medium',
    location: {
      name: 'Hebbal Inflow Wetland Sediment Basin',
      coordinates: [13.0458, 77.5916],
      ward: 'Ward 7 - Byatarayanapura',
      subzone: 'Yelahanka'
    },
    detectedAt: 'Today, 06:30 AM',
    confidence: 88.7,
    uncertainty: '±5.2%',
    changeMetric: {
      label: 'Water Turbidity Level',
      baselineValue: '28 NTU',
      observedValue: '142 NTU',
      deltaPct: 407
    },
    evidenceIds: ['ev-05'],
    status: 'detected',
    description: 'IoT turbidity sensors recorded fourfold surge in suspended solids following unseasonal highway drainage runoff near the Hebbal flyover junction.'
  },
  {
    id: 'anom-06',
    title: 'Yelahanka Lake Northern Canal Capacity Compression',
    category: 'Water Level Surge',
    severity: 'medium',
    location: {
      name: 'Yelahanka Lake North Feeder Sluice',
      coordinates: [13.1007, 77.5963],
      ward: 'Ward 1 - Kempegowda Ward',
      subzone: 'Yelahanka'
    },
    detectedAt: 'Yesterday, 11:40 PM',
    confidence: 90.2,
    uncertainty: '±3.6%',
    changeMetric: {
      label: 'Canal Head Freeboard',
      baselineValue: '1.4 m',
      observedValue: '0.5 m',
      deltaPct: -64.3
    },
    evidenceIds: ['ev-05', 'ev-10'],
    status: 'confirmed',
    description: 'Heavy localized runoff from Kempegowda International Airport catchment is rapidly exhausting the Yelahanka balancing reservoir buffer.'
  }
];

export const INITIAL_INVESTIGATIONS: Investigation[] = [
  {
    id: 'inv-01',
    anomalyId: 'anom-01',
    title: 'Comprehensive Causal Investigation: Bellandur Froth Formation & Spillway Surge',
    status: 'in_progress',
    timestamp: 'Today, 09:35 AM',
    whatChanged: 'Drastic escalation in non-biodegradable surfactants (LAS) to 8.7 mg/L, triggering white foam plumes up to 2.8 meters height at Yamalur Weir.',
    whereLocation: 'Bellandur Lake Southern Spillway & Yamalur Bridge Corridor (12.9352°N, 77.6698°E)',
    coordinates: [12.9352, 77.6698],
    whenDetected: '2026-11-12 09:24:18 IST',
    supportingEvidenceIds: ['ev-01', 'ev-02', 'ev-06'],
    causalHypotheses: [
      {
        cause: 'Illegal midnight industrial effluent discharge from unpermitted chemical/garment washing units upstream in Challaghatta valley.',
        probability: 68,
        rationale: 'KSPCB in-situ spectrophotometer recorded sudden sharp chemical oxygen demand (COD) leap at 02:40 AM without corresponding domestic sewage increase.',
        evidenceRef: 'ev-06'
      },
      {
        cause: 'High hydraulic fall velocity across Yamalur weir agitating accumulated surfactant-laden sediments.',
        probability: 24,
        rationale: 'Continuous heavy inflow of 18.4 m³/s combined with narrow crest produces critical kinetic aeration.',
        evidenceRef: 'ev-02'
      },
      {
        cause: 'Partial failure or bypass of upstream BWSSB Sewage Treatment Plant (STP) at Agara.',
        probability: 8,
        rationale: 'Agara plant reported normal dissolved oxygen, making primary plant failure less probable.',
        evidenceRef: 'ev-01'
      }
    ],
    projectedConsequences: [
      'Foam spillover onto Outer Ring Road / Yamalur Link Road causing vehicular traffic paralysis within 3 hours.',
      'Aerosolized particulate irritation for estimated 45,000 residents in Yamalur, Kariyammana Agrahara, and Bellandur wards.',
      'Depletion of dissolved oxygen in downstream Varthur Lake system below 1.5 mg/L, endangering aquatic fauna.'
    ],
    recommendedResponses: [
      'Activate chemical anti-foaming spray nozzles along the Yamalur weir crest immediately.',
      'Deploy KSPCB flying squad to inspect textile and dye units along Challaghatta corridor.',
      'Operate automated diversion gates to throttle weir discharge rate to <12 m³/s.'
    ],
    uncertaintyAssessment: 'High confidence on surfactant source (±2.4%). Minor uncertainty remains regarding specific upstream industrial point source awaiting physical sample gas-chromatography results.',
    assignedAgent: 'Investigation Agent FS-INV-03',
    verifiedByFieldTeam: true
  },
  {
    id: 'inv-02',
    anomalyId: 'anom-02',
    title: 'Hydraulic Bottleneck Audit: K-100 Koramangala Stormwater Drain',
    status: 'completed',
    timestamp: 'Today, 08:58 AM',
    whatChanged: 'Cross-sectional flow capacity impaired by 56% due to consolidated sediment shoals and debris dams near 80 Feet Road underpass.',
    whereLocation: 'K-100 SWD Chainage 4+200, Koramangala 4th Block (12.9430°N, 77.6250°E)',
    coordinates: [12.9430, 77.6250],
    whenDetected: '2026-11-12 08:45:02 IST',
    supportingEvidenceIds: ['ev-03', 'ev-07'],
    causalHypotheses: [
      {
        cause: 'Accumulation of uncollected metro rail excavation spoil and construction debris washed into secondary drains.',
        probability: 76,
        rationale: 'Acoustic sonar reflectivity profiles show high density mineral aggregate rather than soft organic silt.',
        evidenceRef: 'ev-03'
      },
      {
        cause: 'Storm sewer collapse at secondary arterial junction near Sony World intersection.',
        probability: 24,
        rationale: 'Minor subsidence noticed in utility trench nearby.',
        evidenceRef: 'ev-07'
      }
    ],
    projectedConsequences: [
      'Backwater flooding of Koramangala 4th and 5th Blocks with 0.4m waterlogging if precipitation exceeds 30mm/hr.',
      'Inundation of low-lying residential basements along 80 Feet Road.'
    ],
    recommendedResponses: [
      'Deploy 2 long-arm amphibious excavators from BBMP Stormwater division for priority desilting.',
      'Deploy high-capacity dewatering pumps at 4th Block underpass.'
    ],
    uncertaintyAssessment: 'Very low uncertainty (±1.8%); sonar profiling confirmed obstruction coordinates within 3 meters.',
    assignedAgent: 'Investigation Agent FS-INV-03',
    verifiedByFieldTeam: true
  },
  {
    id: 'inv-03',
    anomalyId: 'anom-03',
    title: 'Catchment Integrity Assessment: Kaggadasapura 30m Buffer Zone Breach',
    status: 'in_progress',
    timestamp: 'Yesterday, 05:10 PM',
    whatChanged: 'Destruction of 3,600 m² of natural riparian wetland buffer and infilling with construction debris along survey no. 48/2.',
    whereLocation: 'Kaggadasapura Lake Northern Perimeter, CV Raman Nagar (12.9806°N, 77.6845°E)',
    coordinates: [12.9806, 77.6845],
    whenDetected: '2026-11-11 16:12:44 IST',
    supportingEvidenceIds: ['ev-04', 'ev-09'],
    causalHypotheses: [
      {
        cause: 'Unauthorized real estate site leveling and encroachment into designated National Green Tribunal (NGT) 30m buffer boundary.',
        probability: 88,
        rationale: 'Cadastral overlay on drone multispectral imagery clearly shows boundary marker displacement by 18 meters.',
        evidenceRef: 'ev-04'
      },
      {
        cause: 'Municipal contractor dumping road milling waste without permit.',
        probability: 12,
        rationale: 'Vehicle tire tracks match commercial tipper trucks rather than BBMP municipal vehicles.',
        evidenceRef: 'ev-09'
      }
    ],
    projectedConsequences: [
      'Loss of natural bio-filtration zone leading to immediate 40% hike in sediment and nutrient load entering the lake.',
      'Erosion of natural bund leading to embankment breach during high flood events.'
    ],
    recommendedResponses: [
      'Issue immediate work-stop citation and police FIR against unauthorized developer.',
      'Deploy earthmovers to impound dumped material and restore natural swale contour.'
    ],
    uncertaintyAssessment: 'Legal boundary verification matches Survey of India cadastral maps with 98.4% geometric alignment.',
    assignedAgent: 'Investigation Agent FS-INV-03',
    verifiedByFieldTeam: false
  }
];

export const INITIAL_RISK_PREDICTIONS: RiskPrediction[] = [
  {
    id: 'risk-01',
    locationName: 'Bellandur & Yamalur Tech Corridor',
    coordinates: [12.9352, 77.6698],
    riskCategory: 'Toxic Froth Dispersion',
    riskScore: 92,
    riskLevel: 'Critical',
    horizon: '24 Hours',
    forecastTrend: 'increasing',
    primaryFactors: [
      { factor: 'Surfactant Concentration in Inflow', impactPct: 48, direction: 'up' },
      { factor: 'Forecasted Wind Gusts (18 km/h)', impactPct: 28, direction: 'up' },
      { factor: 'Discharge Velocity Across Crest', impactPct: 24, direction: 'up' }
    ],
    historicalComparison: 'Matches peak toxicity indicators recorded during the August 2022 monsoon event.',
    confidence: 94.6
  },
  {
    id: 'risk-02',
    locationName: 'Koramangala 4th & 5th Blocks (K-100 SWD)',
    coordinates: [12.9430, 77.6250],
    riskCategory: 'Flash Flood Inundation',
    riskScore: 88,
    riskLevel: 'Critical',
    horizon: '24 Hours',
    forecastTrend: 'increasing',
    primaryFactors: [
      { factor: 'Severe Siltation in SWD (-56% capacity)', impactPct: 54, direction: 'up' },
      { factor: 'Forecast Rainfall (45mm in 2hr window)', impactPct: 34, direction: 'up' },
      { factor: 'Impervious Surface Runoff Coefficient (0.85)', impactPct: 12, direction: 'up' }
    ],
    historicalComparison: 'Waterlogging probability is 3.4x higher than standard seasonal threshold.',
    confidence: 92.1
  },
  {
    id: 'risk-03',
    locationName: 'Varthur Lake Spillway & Gunjur Lowlands',
    coordinates: [12.9568, 77.7471],
    riskCategory: 'Flash Flood Inundation',
    riskScore: 78,
    riskLevel: 'Elevated',
    horizon: '48 Hours',
    forecastTrend: 'increasing',
    primaryFactors: [
      { factor: 'Outlet Silt Bank & Water Hyacinth Obstruction', impactPct: 45, direction: 'up' },
      { factor: 'Cumulative Bellandur Outflow Pressure', impactPct: 38, direction: 'up' },
      { factor: 'Downstream Dakshina Pinakini High Baseflow', impactPct: 17, direction: 'up' }
    ],
    historicalComparison: 'Similar to October 2023 pre-overflow condition.',
    confidence: 90.4
  },
  {
    id: 'risk-04',
    locationName: 'Kaggadasapura Lake Catchment',
    coordinates: [12.9806, 77.6845],
    riskCategory: 'Drinking Water Contamination',
    riskScore: 74,
    riskLevel: 'Elevated',
    horizon: '7 Days',
    forecastTrend: 'increasing',
    primaryFactors: [
      { factor: 'Raw Sewage Diversion Weir Breach', impactPct: 52, direction: 'up' },
      { factor: 'Riparian Wetland Buffer Loss (-24%)', impactPct: 32, direction: 'up' },
      { factor: 'Shallow Borewell Density in 500m Vicinity', impactPct: 16, direction: 'up' }
    ],
    historicalComparison: 'Groundwater coliform index trending towards unpotable range.',
    confidence: 88.2
  },
  {
    id: 'risk-05',
    locationName: 'Hebbal Flyover & Nagavara Junction',
    coordinates: [13.0458, 77.5916],
    riskCategory: 'Flash Flood Inundation',
    riskScore: 58,
    riskLevel: 'Moderate',
    horizon: '48 Hours',
    forecastTrend: 'stable',
    primaryFactors: [
      { factor: 'Elevated Feeder Drain Silt Load', impactPct: 40, direction: 'up' },
      { factor: 'Catchment Runoff from Yelahanka', impactPct: 35, direction: 'up' },
      { factor: 'Wetland Buffer Absorption Capacity', impactPct: 25, direction: 'down' }
    ],
    historicalComparison: 'Within safe margins if desilting operations proceed as scheduled.',
    confidence: 87.0
  },
  {
    id: 'risk-06',
    locationName: 'Sankey Tank Basin (Sadashivanagar)',
    coordinates: [13.0105, 77.5750],
    riskCategory: 'Flash Flood Inundation',
    riskScore: 22,
    riskLevel: 'Guarded',
    horizon: '7 Days',
    forecastTrend: 'decreasing',
    primaryFactors: [
      { factor: 'Operational Sluice Bypass & Aerators', impactPct: 60, direction: 'down' },
      { factor: 'High Soil Permeability in Park Buffer', impactPct: 30, direction: 'down' },
      { factor: 'Controlled Stormwater Inflow Siphon', impactPct: 10, direction: 'down' }
    ],
    historicalComparison: 'Historical baseline optimal. Minimal flood or pollution risk.',
    confidence: 96.5
  }
];

export const INITIAL_ACTIONS: ActionItem[] = [
  {
    id: 'act-01',
    title: 'Deploy High-Volume Chemical De-Foamer at Yamalur Weir',
    description: 'Activate automated perimeter spray nozzles with organic bio-surfactant neutralizer along the 120m crest to suppress airborne toxic froth plumes.',
    category: 'Sluice Gate Operation',
    priority: 'P1 - Immediate',
    status: 'in_progress',
    assignedAgency: 'BBMP Stormwater Dept',
    location: 'Bellandur Lake Yamalur Spillway',
    coordinates: [12.9352, 77.6698],
    dueDate: 'Today, 12:00 PM',
    createdAt: 'Today, 09:40 AM',
    relatedAnomalyId: 'anom-01',
    verificationStatus: 'IoT Sensor Confirmed',
    activityLog: [
      { id: 'log-1', timestamp: '09:40 AM', actor: 'Action Agent FS-ACT-05', action: 'Created emergency priority action ticket based on Risk-01 alert.' },
      { id: 'log-2', timestamp: '09:55 AM', actor: 'BBMP Control Room', action: 'Dispatched emergency chemical unit #4 to Yamalur bridge site.' }
    ]
  },
  {
    id: 'act-02',
    title: 'Emergency Desilting of K-100 Koramangala Drain (Chainage 4+200)',
    description: 'Mobilize 2 long-arm amphibious hydraulic excavators to clear 240 metric tonnes of consolidated construction spoil and debris obstructing the main conduit.',
    category: 'Drainage Clearance',
    priority: 'P1 - Immediate',
    status: 'in_progress',
    assignedAgency: 'BBMP Stormwater Dept',
    location: 'Koramangala 4th Block, 80 Feet Road Culvert',
    coordinates: [12.9430, 77.6250],
    dueDate: 'Today, 03:00 PM',
    createdAt: 'Today, 09:00 AM',
    relatedAnomalyId: 'anom-02',
    verificationStatus: 'Pending Inspection',
    activityLog: [
      { id: 'log-3', timestamp: '09:00 AM', actor: 'Action Agent FS-ACT-05', action: 'Generated P1 desilting directive.' },
      { id: 'log-4', timestamp: '09:20 AM', actor: 'Excavation Contractor Team', action: 'Arrived at site; commenced silt extraction on south bank.' }
    ]
  },
  {
    id: 'act-03',
    title: 'Issue Stop-Work Notice & Buffer Encroachment Citation',
    description: 'Serve statutory cessation directive under Section 33A of Water Act against unauthorized commercial landfilling inside the 30-meter lake buffer.',
    category: 'Enforcement Citation',
    priority: 'P2 - High',
    status: 'pending',
    assignedAgency: 'KSPCB Enforcement',
    location: 'Kaggadasapura Lake North Perimeter',
    coordinates: [12.9806, 77.6845],
    dueDate: 'Today, 06:00 PM',
    createdAt: 'Yesterday, 05:30 PM',
    relatedAnomalyId: 'anom-03',
    verificationStatus: 'Unverified',
    activityLog: [
      { id: 'log-5', timestamp: 'Yesterday, 05:30 PM', actor: 'Action Agent FS-ACT-05', action: 'Drafted regulatory notice referencing Sentinel-2 & UAV evidence.' }
    ]
  },
  {
    id: 'act-04',
    title: 'Clear Silt Bank & Aquatic Weed at Varthur Spillway Channel',
    description: 'Deploy floating weed harvesters to remove water hyacinth blanket and open secondary discharge culverts towards Dakshina Pinakini basin.',
    category: 'Drainage Clearance',
    priority: 'P2 - High',
    status: 'pending',
    assignedAgency: 'BBMP Stormwater Dept',
    location: 'Varthur Lake Spillway Channel',
    coordinates: [12.9568, 77.7471],
    dueDate: 'Tomorrow, 10:00 AM',
    createdAt: 'Today, 07:45 AM',
    relatedAnomalyId: 'anom-04',
    verificationStatus: 'Unverified',
    activityLog: [
      { id: 'log-6', timestamp: '07:45 AM', actor: 'Action Agent FS-ACT-05', action: 'Queued operational action ticket.' }
    ]
  },
  {
    id: 'act-05',
    title: 'Throttle Upstream Industrial Inflow Sluice Gate at Challaghatta',
    description: 'Reduce industrial branch inflow by 60% and redirect flow into BWSSB holding lagoon to prevent secondary foam surge in Bellandur Lake.',
    category: 'Sluice Gate Operation',
    priority: 'P1 - Immediate',
    status: 'completed',
    assignedAgency: 'BWSSB Wastewater Unit',
    location: 'Challaghatta Valley Interceptor Gate 3',
    coordinates: [12.9450, 77.6600],
    dueDate: 'Today, 10:30 AM',
    createdAt: 'Today, 09:15 AM',
    relatedAnomalyId: 'anom-01',
    verificationStatus: 'Satellite Verified',
    activityLog: [
      { id: 'log-7', timestamp: '09:15 AM', actor: 'Action Agent FS-ACT-05', action: 'Auto-triggered hydraulic command sequence.' },
      { id: 'log-8', timestamp: '10:12 AM', actor: 'BWSSB SCADA Operator', action: 'Hydraulic gate lowered to 40% open; flow diverted.' },
      { id: 'log-9', timestamp: '10:35 AM', actor: 'Verification Agent FS-VRF-06', action: 'Verified 45% drop in discharge velocity.' }
    ]
  },
  {
    id: 'act-06',
    title: 'Issue Citizen High-Water Advisory for Yamalur Low-Lying Residences',
    description: 'Broadcast SMS and digital billboard notification warning residents of potential localized road waterlogging and toxic foam spray near Yamalur bridge.',
    category: 'Citizen Advisory',
    priority: 'P2 - High',
    status: 'completed',
    assignedAgency: 'State Disaster Response (SDRF)',
    location: 'Yamalur & Kariyammana Agrahara',
    coordinates: [12.9370, 77.6750],
    dueDate: 'Today, 10:00 AM',
    createdAt: 'Today, 09:30 AM',
    relatedAnomalyId: 'anom-01',
    verificationStatus: 'IoT Sensor Confirmed',
    activityLog: [
      { id: 'log-10', timestamp: '09:30 AM', actor: 'Action Agent FS-ACT-05', action: 'Generated citizen warning payload.' },
      { id: 'log-11', timestamp: '09:42 AM', actor: 'SDRF Emergency Broadcast', action: 'Dispatched alert to 18,400 mobile handsets in cell-tower polygon.' }
    ]
  },
  {
    id: 'act-07',
    title: 'Inspect Silt Trap & Wetland Reed Bed at Hebbal Lake Inflow',
    description: 'Inspect physical sedimentation screen at NH-44 highway runoff culvert and clear coarse floating refuse.',
    category: 'Drainage Clearance',
    priority: 'P3 - Standard',
    status: 'pending',
    assignedAgency: 'Citizen Lake Wardens',
    location: 'Hebbal Lake Inflow Wetland',
    coordinates: [13.0458, 77.5916],
    dueDate: 'Tomorrow, 04:00 PM',
    createdAt: 'Today, 07:00 AM',
    relatedAnomalyId: 'anom-05',
    verificationStatus: 'Unverified',
    activityLog: [
      { id: 'log-12', timestamp: '07:00 AM', actor: 'Action Agent FS-ACT-05', action: 'Routine scheduled maintenance notification issued.' }
    ]
  },
  {
    id: 'act-08',
    title: 'Routine Microbiological Sampling & Potability Testing',
    description: 'Collect water samples from 12 public borewells within 500m perimeter of Kaggadasapura Lake to test for E. coli and heavy metal leaching.',
    category: 'Effluent Interception',
    priority: 'P2 - High',
    status: 'pending',
    assignedAgency: 'BWSSB Wastewater Unit',
    location: 'Kaggadasapura Ward 83',
    coordinates: [12.9806, 77.6845],
    dueDate: 'Nov 14, 05:00 PM',
    createdAt: 'Yesterday, 06:00 PM',
    relatedAnomalyId: 'anom-03',
    verificationStatus: 'Unverified',
    activityLog: [
      { id: 'log-13', timestamp: 'Yesterday, 06:00 PM', actor: 'Action Agent FS-ACT-05', action: 'Scheduled proactive laboratory water audit.' }
    ]
  }
];

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'ev-01',
    title: 'Sentinel-2 L2A Multispectral Water Index (NDWI) Tile',
    type: 'Satellite Multispectral (Sentinel-2)',
    source: 'Copernicus Open Access Hub / ESA',
    timestamp: 'Today, 06:14 AM UTC',
    locationName: 'Bellandur Lake Basin',
    coordinates: [12.9352, 77.6698],
    qualityScore: 98,
    verified: true,
    metadata: {
      spectralBand: 'B03 (Green 560nm) / B08 (NIR 842nm)',
      cloudCoverPct: 4.2,
      readingUnit: 'Normalized Difference Index (-1.0 to +1.0)',
      rawTelemetry: '{"mean_ndwi": 0.42, "baseline_ndwi": 0.56, "delta": -0.14, "water_spread_ha": 318}'
    },
    summary: 'High-resolution surface water reflectance confirms 14% contraction in clear water body boundary and widespread high-reflectance foam mats on downstream weir.',
    relatedAnomalyIds: ['anom-01']
  },
  {
    id: 'ev-02',
    title: 'Yamalur Outflow Sonar Flowmeter & Level Telemetry',
    type: 'IoT Ultrasonic Level Gauge',
    source: 'BBMP Smart Water IoT Sensor Node #102',
    timestamp: 'Today, 09:18 AM IST',
    locationName: 'Yamalur Spillway Outflow Gauge',
    coordinates: [12.9450, 77.6830],
    qualityScore: 99,
    verified: true,
    metadata: {
      sensorSerial: 'SN-BBMP-FLW-102-A',
      samplingInterval: '15 seconds',
      readingUnit: 'Discharge: m³/s, Level: meters',
      rawTelemetry: '{"discharge_rate_mps": 18.42, "water_depth_m": 4.82, "velocity_mps": 2.84, "battery_pct": 94}'
    },
    summary: 'Acoustic Doppler flowmeter logged abnormal discharge surge of 18.42 m³/s with water level at 4.82m (92.6% of maximum safe flood capacity).',
    relatedAnomalyIds: ['anom-01', 'anom-04']
  },
  {
    id: 'ev-03',
    title: 'K-100 SWD Ultrasonic Silt Sonar Cross-Section Profile',
    type: 'IoT Ultrasonic Level Gauge',
    source: 'BBMP Smart City SWD Telemetry Network',
    timestamp: 'Today, 08:32 AM IST',
    locationName: 'K-100 SWD 80 Feet Road Culvert',
    coordinates: [12.9430, 77.6250],
    qualityScore: 95,
    verified: true,
    metadata: {
      sensorSerial: 'SN-SWD-SONAR-044',
      samplingInterval: '5 minutes',
      readingUnit: 'Cross-section area: m²',
      rawTelemetry: '{"effective_area_m2": 18.5, "baseline_area_m2": 42.0, "silt_bed_height_m": 1.45, "clogging_factor": 0.56}'
    },
    summary: 'Dual-frequency bottom echo profiling reveals 1.45m of hardened silt and debris sediment bank, choking more than half the hydraulic conduit.',
    relatedAnomalyIds: ['anom-02']
  },
  {
    id: 'ev-04',
    title: 'UAV High-Resolution Orthomosaic & NDVI Map',
    type: 'UAV High-Res Orthomosaic',
    source: 'Karnataka State Remote Sensing Applications Centre (KSRSAC)',
    timestamp: 'Yesterday, 03:45 PM IST',
    locationName: 'Kaggadasapura Lake Northern Buffer',
    coordinates: [12.9806, 77.6845],
    qualityScore: 96,
    verified: true,
    metadata: {
      spectralBand: 'RGB + RedEdge 705nm (Ground Resolution: 4cm/pixel)',
      readingUnit: 'Area in square meters',
      rawTelemetry: '{"disturbed_vegetation_m2": 3620, "encroachment_depth_m": 18.2, "centroid": [12.9812, 77.6848]}'
    },
    summary: 'Centimeter-precision drone survey maps 3,620 m² of cleared wetland reeds filled with construction debris inside the mandatory NGT 30m conservation buffer.',
    relatedAnomalyIds: ['anom-03']
  },
  {
    id: 'ev-05',
    title: 'Hebbal Basin Real-Time Optical Turbidity Inflow Feed',
    type: 'IoT Ultrasonic Level Gauge',
    source: 'BWSSB Water Quality Telemetry Node #104',
    timestamp: 'Today, 06:22 AM IST',
    locationName: 'Hebbal Inflow Wetland Sediment Basin',
    coordinates: [13.0458, 77.5916],
    qualityScore: 94,
    verified: true,
    metadata: {
      sensorSerial: 'SN-BWSSB-TURB-104',
      samplingInterval: '1 minute',
      readingUnit: 'Nephelometric Turbidity Units (NTU)',
      rawTelemetry: '{"turbidity_ntu": 142.6, "baseline_ntu": 28.0, "temp_c": 23.4, "conductivity_us": 840}'
    },
    summary: 'Turbidity spiked from nominal 28 NTU to 142.6 NTU in 35 minutes following sudden highway runoff discharge.',
    relatedAnomalyIds: ['anom-05', 'anom-06']
  },
  {
    id: 'ev-06',
    title: 'KSPCB Continuous Online Water Quality Spectrophotometry',
    type: 'KSPCB Spectrophotometry',
    source: 'Karnataka State Pollution Control Board Real-Time Station',
    timestamp: 'Today, 02:40 AM IST',
    locationName: 'Bellandur Inflow Siphon (Challaghatta Branch)',
    coordinates: [12.9385, 77.6630],
    qualityScore: 97,
    verified: true,
    metadata: {
      sensorSerial: 'SN-KSPCB-SPEC-08',
      readingUnit: 'mg/L for chemical parameters',
      rawTelemetry: '{"las_surfactant_mgl": 8.7, "cod_mgl": 380, "bod_mgl": 145, "phosphate_mgl": 4.2, "ammoniacal_n": 22}'
    },
    summary: 'Automated wet chemistry analyzer detected midnight chemical spike: Linear Alkylbenzene Sulfonate (LAS) surge to 8.7 mg/L, proving industrial detergent dumping.',
    relatedAnomalyIds: ['anom-01']
  },
  {
    id: 'ev-07',
    title: 'Open-Meteo High-Resolution Precipitation Telemetry',
    type: 'Open-Meteo Weather Telemetry',
    source: 'Open-Meteo European Model ECMWF Ensemble',
    timestamp: 'Today, 09:00 AM IST',
    locationName: 'Bengaluru Urban District (12.9716°N, 77.5946°E)',
    coordinates: [12.9716, 77.5946],
    qualityScore: 99,
    verified: true,
    metadata: {
      readingUnit: 'mm precipitation, km/h wind speed',
      rawTelemetry: '{"hourly_precip_mm": 14.2, "cumulative_24h_mm": 62.8, "forecast_next_6h_mm": 38.5, "humidity_pct": 78}'
    },
    summary: 'Monsoon convergence zone over East Bengaluru with heavy rain burst of 38.5mm predicted between 14:00 and 18:00 IST.',
    relatedAnomalyIds: ['anom-01', 'anom-02']
  },
  {
    id: 'ev-08',
    title: 'Varthur Lake Satellite Infrared False-Color Composite',
    type: 'Satellite Multispectral (Sentinel-2)',
    source: 'ESA Copernicus Sentinel-2 MSI (Band 8-4-3)',
    timestamp: 'Today, 06:14 AM UTC',
    locationName: 'Varthur Lake Spillway Basin',
    coordinates: [12.9568, 77.7471],
    qualityScore: 93,
    verified: true,
    metadata: {
      spectralBand: 'NIR / Red / Green False Color Composite',
      cloudCoverPct: 3.8,
      readingUnit: 'Vegetation Cover Index',
      rawTelemetry: '{"hyacinth_canopy_ha": 44.2, "coverage_pct": 24.5, "delta_7d": +12.4}'
    },
    summary: 'False-color infrared imagery demonstrates 12.4% expansion of water hyacinth biomass directly across the southern spillway throat.',
    relatedAnomalyIds: ['anom-04']
  },
  {
    id: 'ev-09',
    title: 'Citizen Geospatial Geotagged Anomaly Report #CR-882',
    type: 'Citizen Geospatial Report',
    source: 'FieldSense Mobile Community Reporter App',
    timestamp: 'Yesterday, 04:02 PM IST',
    locationName: 'Kaggadasapura Lake Bund Road',
    coordinates: [12.9806, 77.6845],
    qualityScore: 88,
    verified: true,
    metadata: {
      readingUnit: 'Geotagged Photo & GPS telemetry',
      rawTelemetry: '{"reporter_credibility": 0.92, "attachments_count": 3, "gps_accuracy_m": 3.2, "category": "illegal_dumping"}'
    },
    summary: 'Local resident submitted 3 timestamped photos documenting tipper trucks dumping construction concrete waste into the lake buffer zone.',
    relatedAnomalyIds: ['anom-03']
  },
  {
    id: 'ev-10',
    title: 'Yelahanka Lake Automated Pressure Transmitter Gauge',
    type: 'IoT Ultrasonic Level Gauge',
    source: 'BBMP Minor Irrigation Hydrological Station',
    timestamp: 'Today, 08:10 AM IST',
    locationName: 'Yelahanka Lake Northern Bund',
    coordinates: [13.1007, 77.5963],
    qualityScore: 96,
    verified: true,
    metadata: {
      sensorSerial: 'SN-BBMP-LVL-018',
      readingUnit: 'Meters above bed datum',
      rawTelemetry: '{"stage_level_m": 4.12, "freeboard_remaining_m": 0.48, "rate_of_rise_cm_hr": 6.2}'
    },
    summary: 'Water level climbed to 4.12m with only 0.48m freeboard remaining before crest spillway overtopping.',
    relatedAnomalyIds: ['anom-06']
  }
];

