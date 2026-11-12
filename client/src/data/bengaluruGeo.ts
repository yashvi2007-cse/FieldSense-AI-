import { MonitoredWaterbody } from '../types';

export const BENGALURU_CENTER: [number, number] = [12.9716, 77.5946];

export const MONITORED_WATERBODIES: MonitoredWaterbody[] = [
  {
    id: 'wb-bellandur',
    name: 'Bellandur Lake Catchment',
    coordinates: [12.9352, 77.6698],
    areaHa: 361,
    currentLevelMeters: 4.8,
    maxSafeCapacityMeters: 5.2,
    status: 'Critical Warning',
    primaryIssue: 'Severe untreated effluent surge & foaming risk at downstream weir',
    recentNdwiDelta: -0.14,
    waterQualityIndex: 28, // out of 100
  },
  {
    id: 'wb-varthur',
    name: 'Varthur Lake Basin',
    coordinates: [12.9568, 77.7471],
    areaHa: 180,
    currentLevelMeters: 3.9,
    maxSafeCapacityMeters: 4.5,
    status: 'Advisory',
    primaryIssue: 'Sediment accumulation in outlet channels and hyacinth bloom',
    recentNdwiDelta: -0.08,
    waterQualityIndex: 35,
  },
  {
    id: 'wb-ulsoor',
    name: 'Ulsoor Lake',
    coordinates: [12.9829, 77.6200],
    areaHa: 50,
    currentLevelMeters: 3.1,
    maxSafeCapacityMeters: 4.0,
    status: 'Normal',
    primaryIssue: 'Stormwater inlet screens require scheduled silt clearing',
    recentNdwiDelta: +0.02,
    waterQualityIndex: 72,
  },
  {
    id: 'wb-sankey',
    name: 'Sankey Tank',
    coordinates: [13.0105, 77.5750],
    areaHa: 15,
    currentLevelMeters: 2.7,
    maxSafeCapacityMeters: 3.5,
    status: 'Normal',
    primaryIssue: 'Aerators operational; steady groundwater recharge level',
    recentNdwiDelta: +0.01,
    waterQualityIndex: 84,
  },
  {
    id: 'wb-hebbal',
    name: 'Hebbal Lake & Wetland',
    coordinates: [13.0458, 77.5916],
    areaHa: 65,
    currentLevelMeters: 3.6,
    maxSafeCapacityMeters: 4.2,
    status: 'Advisory',
    primaryIssue: 'Upstream feeder drain siltation detected via UAV pass',
    recentNdwiDelta: -0.05,
    waterQualityIndex: 61,
  },
  {
    id: 'wb-kaggadasapura',
    name: 'Kaggadasapura Lake',
    coordinates: [12.9806, 77.6845],
    areaHa: 20,
    currentLevelMeters: 2.9,
    maxSafeCapacityMeters: 3.2,
    status: 'Critical Warning',
    primaryIssue: 'Encroachment in 30m buffer zone and sewage diversion breach',
    recentNdwiDelta: -0.19,
    waterQualityIndex: 31,
  },
  {
    id: 'wb-madiwala',
    name: 'Madiwala Lake Ecosystem',
    coordinates: [12.9157, 77.6186],
    areaHa: 114,
    currentLevelMeters: 3.4,
    maxSafeCapacityMeters: 4.0,
    status: 'Normal',
    primaryIssue: 'Automated hydraulic gates functioning within nominal tolerance',
    recentNdwiDelta: +0.03,
    waterQualityIndex: 68,
  },
  {
    id: 'wb-yelahanka',
    name: 'Yelahanka Lake Buffer',
    coordinates: [13.1007, 77.5963],
    areaHa: 120,
    currentLevelMeters: 4.1,
    maxSafeCapacityMeters: 4.6,
    status: 'Advisory',
    primaryIssue: 'Storm runoff inflow surge expected from North corridor rainfall',
    recentNdwiDelta: +0.06,
    waterQualityIndex: 59,
  }
];

export const STORMWATER_DRAIN_CORRIDORS = [
  {
    id: 'swd-k100',
    name: 'K-100 Koramangala Primary Valley Drain',
    coordinates: [
      [12.9750, 77.6150],
      [12.9550, 77.6230],
      [12.9430, 77.6250],
      [12.9370, 77.6450],
      [12.9352, 77.6698],
    ] as [number, number][],
    status: 'Partial Blockage (74% capacity)',
    color: '#00e5ff',
  },
  {
    id: 'swd-v-valley',
    name: 'Vrishabhavathi Valley Interceptor',
    coordinates: [
      [12.9900, 77.5400],
      [12.9600, 77.5300],
      [12.9200, 77.5100],
      [12.8700, 77.4900],
    ] as [number, number][],
    status: 'Industrial Discharge Surveillance Active',
    color: '#f59e0b',
  },
  {
    id: 'swd-challaghatta',
    name: 'Challaghatta Valley Feeder to Bellandur',
    coordinates: [
      [12.9600, 77.6500],
      [12.9450, 77.6600],
      [12.9380, 77.6680],
    ] as [number, number][],
    status: 'Elevated Flow Velocity (+38%)',
    color: '#ef4444',
  }
];

export const IOT_MONITORING_NODES = [
  { id: 'node-101', name: 'Bellandur West Sluice IoT', coords: [12.9385, 77.6630] as [number, number], reading: '4.82m', status: 'Warning', parameter: 'Water Level' },
  { id: 'node-102', name: 'Yamalur Outflow Flowmeter', coords: [12.9450, 77.6830] as [number, number], reading: '18.4 m³/s', status: 'Critical', parameter: 'Discharge Rate' },
  { id: 'node-103', name: 'Kaggadasapura Buffer Sonar', coords: [12.9810, 77.6870] as [number, number], reading: '2.95m', status: 'Warning', parameter: 'Sediment Depth' },
  { id: 'node-104', name: 'Hebbal Inflow Turbidity Unit', coords: [13.0480, 77.5950] as [number, number], reading: '142 NTU', status: 'Normal', parameter: 'Turbidity' },
  { id: 'node-105', name: 'Ulsoor Automated Dissolved O₂', coords: [12.9830, 77.6240] as [number, number], reading: '6.4 mg/L', status: 'Good', parameter: 'DO Level' },
  { id: 'node-106', name: 'Sankey Groundwater Piezometer', coords: [13.0120, 77.5740] as [number, number], reading: '-8.2m', status: 'Good', parameter: 'Water Table' }
];

