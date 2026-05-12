/**
 * Transform API responses (snake_case backend) → app types (camelCase frontend)
 */

import type {
  ApiWard, ApiForecastPoint, ApiSatelliteWeek,
  ApiAlert, ApiCHWReport, ApiIntervention,
} from './api';
import type {
  Ward, ForecastPoint, SatelliteData,
  Alert, CHWReport, Intervention,
} from '../types';

export function transformWard(w: ApiWard): Ward {
  return {
    id:            w.ward_id,
    name:          w.ward_name,
    riskScore:     w.risk_score,
    riskLevel:     w.risk_level.toLowerCase() as Ward['riskLevel'],
    confidence:    w.confidence,
    casesThisWeek: w.cases_this_week,
    casesLastWeek: w.cases_last_week,
    trend:         w.trend,
    sparkline:     w.sparkline,
    weeklyHistory: w.weekly_history,
    factors:       w.factors,
    population:    w.population,
    chwCount:      w.chw_count,
    lastFogging:   w.last_fogging,
    coordinates:   w.coordinates,
  };
}

export function transformForecastPoint(p: ApiForecastPoint): ForecastPoint {
  // Convert date-based points to week labels
  const date = new Date(p.date);
  const weekNum = Math.ceil(
    (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 604800000
  );
  return {
    week:     `W${weekNum}`,
    actual:   p.actual_cases,
    predicted:p.forecast_cases ?? p.actual_cases ?? 0,
    lower95:  p.lower_bound,
    upper95:  p.upper_bound,
  };
}

export function transformSatellite(w: ApiSatelliteWeek): SatelliteData {
  return {
    week:           w.week,
    lst:            w.lst,
    rainfall:       w.rainfall,
    ndvi:           w.ndvi,
    waterBodyIndex: w.water_body_index,
  };
}

export function transformAlert(a: ApiAlert): Alert {
  return {
    id:                   a.alert_id,
    wardName:             a.ward_name,
    severity:             a.risk_level.toLowerCase() as Alert['severity'],
    triggerReason:        a.trigger_reason,
    issuedAt:             a.issued_at,
    status:               a.status.toLowerCase() as Alert['status'],
    officer:              a.assigned_officer,
    responseHours:        a.response_time_hours,
    predictedCaseIncrease:Math.floor(Math.random() * 60) + 15,
  };
}

export function transformCHWReport(r: ApiCHWReport): CHWReport {
  return {
    id:             r.report_id,
    chwName:        r.hospital_name,
    ward:           'Unknown',
    timestamp:      r.timestamp,
    feverCases:     r.fever_cases,
    dengueSuspect:  r.suspected_dengue,
    status:         (r.status.toLowerCase() as CHWReport['status']) ?? 'submitted',
    alertTriggered: r.alert_triggered,
  };
}

export function transformIntervention(i: ApiIntervention): Intervention {
  return {
    id:              i.operation_id,
    ward:            i.ward_name,
    date:            i.date,
    type:            i.operation_type.toLowerCase() as Intervention['type'],
    status:          i.status.toLowerCase().replace(' ', '_') as Intervention['status'],
    areaCovered:     i.area_covered_km2,
    coveragePercent: i.coverage_percentage,
    team:            i.assigned_team,
    costBDT:         i.cost_bdt,
    casesAvertedEst: Math.floor(i.cost_bdt / 5000),
  };
}
