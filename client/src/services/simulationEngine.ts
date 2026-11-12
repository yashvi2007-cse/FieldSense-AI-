import { SimulationParameters, SimulationResult } from '../types';

export function runHydrologicalSimulation(params: SimulationParameters): SimulationResult {
  const { rainfallMultiplier, siltationPercentage, inletObstruction, selectedWaterbody, soilSaturation } = params;

  // Hydrodynamic scaling factors
  const precipFactor = Math.pow(rainfallMultiplier, 1.4);
  const drainChokeFactor = 1 + (siltationPercentage / 100) * 1.8;
  const inletBlockFactor = 1 + (inletObstruction / 100) * 0.9;
  const saturationFactor = 1 + (soilSaturation / 100) * 0.6;

  // Base metrics dependent on waterbody
  let baseAreaHa = 14.5;
  let basePopPerHa = 1450;
  let baseSurgeHour = 4.2;

  if (selectedWaterbody.includes('Bellandur')) {
    baseAreaHa = 28.4;
    basePopPerHa = 1850;
    baseSurgeHour = 3.5;
  } else if (selectedWaterbody.includes('Koramangala') || selectedWaterbody.includes('K-100')) {
    baseAreaHa = 22.0;
    basePopPerHa = 2400;
    baseSurgeHour = 2.1;
  } else if (selectedWaterbody.includes('Varthur')) {
    baseAreaHa = 24.2;
    basePopPerHa = 1200;
    baseSurgeHour = 5.0;
  } else if (selectedWaterbody.includes('Kaggadasapura')) {
    baseAreaHa = 11.8;
    basePopPerHa = 1650;
    baseSurgeHour = 2.8;
  } else if (selectedWaterbody.includes('Hebbal')) {
    baseAreaHa = 16.2;
    basePopPerHa = 1350;
    baseSurgeHour = 4.0;
  }

  const baselineInundationAreaHa = Math.round(baseAreaHa * 10) / 10;
  
  // Simulated compound impact
  const totalSeverityMultiplier = precipFactor * drainChokeFactor * (inletBlockFactor * 0.7 + 0.3) * (saturationFactor * 0.5 + 0.5);
  const simulatedInundationAreaHa = Math.round(baselineInundationAreaHa * totalSeverityMultiplier * 10) / 10;
  
  const affectedPopulationEstimate = Math.round(simulatedInundationAreaHa * basePopPerHa);
  const peakSurgeTimeHours = Math.max(1.0, Math.round((baseSurgeHour / (precipFactor * 0.8 + 0.2)) * 10) / 10);
  
  const wqiDrop = Math.min(65, Math.round((siltationPercentage * 0.35 + rainfallMultiplier * 8.5 + inletObstruction * 0.2)));
  const bufferOvertoppingProbability = Math.min(99, Math.round((totalSeverityMultiplier / 3.2) * 85));

  // Generate 24-hour hydrodynamic progression
  const hourlyProjection = [];
  for (let h = 1; h <= 24; h++) {
    // Hydrograph bell curve peaking around peakSurgeTimeHours
    const distanceToPeak = Math.abs(h - peakSurgeTimeHours * 2.2);
    const bellFactor = Math.exp(-Math.pow(distanceToPeak / 4.5, 2));

    const runoffVolumeMld = Math.round((80 + 350 * totalSeverityMultiplier * bellFactor) * 10) / 10;
    const waterLevelMeters = Math.round((2.4 + 2.8 * totalSeverityMultiplier * 0.6 * bellFactor) * 100) / 100;
    const criticalCapacityPct = Math.min(145, Math.round((waterLevelMeters / 4.8) * 100));

    hourlyProjection.push({
      hour: h,
      runoffVolumeMld,
      waterLevelMeters,
      criticalCapacityPct
    });
  }

  // Determine critical bottlenecks
  const criticalBottlenecks: string[] = [];
  if (siltationPercentage > 40) {
    criticalBottlenecks.push(`Stormwater Drain Silt Deposition (>40% restriction) creates severe backwater head.`);
  }
  if (rainfallMultiplier >= 2.0) {
    criticalBottlenecks.push(`Precipitation exceeding 75mm/h surpasses standard secondary culvert capacity.`);
  }
  if (inletObstruction > 50) {
    criticalBottlenecks.push(`Feeder sluice intake trash screens blinded by debris and hyacinth biomass.`);
  }
  if (soilSaturation > 70) {
    criticalBottlenecks.push(`Antecedent soil moisture at near-saturation, resulting in 92% direct surface runoff.`);
  }
  if (criticalBottlenecks.length === 0) {
    criticalBottlenecks.push(`Hydraulic discharge within nominal buffer safety margin.`);
  }

  return {
    baselineInundationAreaHa,
    simulatedInundationAreaHa,
    affectedPopulationEstimate,
    peakSurgeTimeHours,
    waterQualityIndexShift: -wqiDrop,
    bufferOvertoppingProbability,
    hourlyProjection,
    criticalBottlenecks
  };
}

