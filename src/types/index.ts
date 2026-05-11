export type RiskLevel = 'critical' | 'high' | 'moderate' | 'low';
export type Trend = 'rising' | 'stable' | 'falling';
export type AlertStatus = 'pending' | 'acknowledged' | 'deployed' | 'resolved';
export type AlertSeverity = 'critical' | 'high' | 'moderate';
export type InterventionType = 'fogging' | 'larvicide' | 'awareness';
export type InterventionStatus = 'scheduled' | 'in_progress' | 'completed';
export type CHWReportStatus = 'submitted' | 'pending' | 'overdue';

export interface Factor {
  name: string;
  weight: number;
  icon: string;
}

export interface Ward {
  id: string;
  name: string;
  riskScore: number;
  riskLevel: RiskLevel;
  casesThisWeek: number;
  casesLastWeek: number;
  trend: Trend;
  sparkline: number[];
  weeklyHistory: { week: string; cases: number }[];
  factors: Factor[];
  confidence: number;
  population: number;
  chwCount: number;
  lastFogging: string;
  coordinates: { lat: number; lng: number };
}

export interface ForecastPoint {
  week: string;
  actual: number | null;
  predicted: number;
  lower95: number;
  upper95: number;
}

export interface Forecast {
  horizon: '7day' | '14day' | '21day';
  data: ForecastPoint[];
  auroc: number;
  sensitivity: number;
  specificity: number;
  f1Score: number;
}

export interface SatelliteData {
  week: string;
  lst: number;
  rainfall: number;
  ndvi: number;
  waterBodyIndex: number;
}

export interface CHWReport {
  id: string;
  chwName: string;
  ward: string;
  timestamp: string;
  feverCases: number;
  dengueSuspect: number;
  status: CHWReportStatus;
  alertTriggered: boolean;
}

export interface Alert {
  id: string;
  wardName: string;
  severity: AlertSeverity;
  triggerReason: string;
  issuedAt: string;
  status: AlertStatus;
  officer: string;
  responseHours: number | null;
  predictedCaseIncrease: number;
}

export interface Intervention {
  id: string;
  ward: string;
  date: string;
  type: InterventionType;
  status: InterventionStatus;
  areaCovered: number;
  coveragePercent: number;
  team: string;
  costBDT: number;
  casesAvertedEst: number;
}

export interface SeasonData {
  year: number;
  weeks: { week: number; cases: number }[];
}

export interface PipelineStage {
  name: string;
  status: 'checking' | 'healthy' | 'warning';
  lastRun: string;
  latency: string;
}
