/**
 * DengueSense BD – API Service
 * =============================
 * Connects the mobile app to the live FastAPI backend.
 *
 * Backend data sources:
 *   - Open-Meteo (https://open-meteo.com)   → real weather data
 *   - NASA POWER (https://power.larc.nasa.gov) → satellite climate data
 *   - Scikit-Learn ML model                  → risk predictions
 *
 * URL priority:
 *   1. EXPO_PUBLIC_API_URL env variable (set in .env)
 *   2. Deployed Railway URL (production default)
 *   3. localhost:8000 (local dev fallback)
 */

import Constants from 'expo-constants';

// ─── Base URL ────────────────────────────────────────────────────────────────
const ENV_URL    = process.env.EXPO_PUBLIC_API_URL;
const CONFIG_URL = Constants.expoConfig?.extra?.apiUrl as string | undefined;
const PROD_URL   = 'https://denguesense-api.up.railway.app';   // update after deploy
const DEV_URL    = 'http://localhost:8000';

export const API_BASE =
  ENV_URL    ||
  CONFIG_URL ||
  (__DEV__ ? DEV_URL : PROD_URL);

// ─── Timeout helper ──────────────────────────────────────────────────────────
const TIMEOUT_MS = 15000;

async function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// ─── Generic GET ─────────────────────────────────────────────────────────────
async function get<T>(path: string): Promise<T> {
  const res = await fetchWithTimeout(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

// ─── Generic POST ────────────────────────────────────────────────────────────
async function post<T>(path: string, body: unknown, token?: string): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetchWithTimeout(`${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error((detail as any).detail || `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════════

/** Health check + current live weather from Open-Meteo */
export const apiHealth = () => get<{
  status: string;
  live_weather: {
    temperature_c: number;
    rainfall_7day_mm: number;
    humidity_pct: number;
    source: string;
  };
}>('/api/health');

/**
 * 48 Dhaka ward risk scores.
 * Computed by ML model from real Open-Meteo weather data.
 */
export const apiRiskMap = () => get<{
  total_wards: number;
  critical_wards: number;
  high_wards: number;
  system_accuracy_auroc: number;
  wards: ApiWard[];
  data_source_note: string;
}>('/api/risk-map');

/**
 * AI forecast (7 | 14 | 84 days).
 * Past = real Open-Meteo history. Future = ML model over 14-day forecast.
 */
export const apiForecasts = (horizon: 7 | 14 | 84) => get<{
  horizon_days: number;
  forecast: ApiForecastPoint[];
  metrics: ApiMetrics;
  feature_importance: ApiFeatureImportance[];
  data_source_note: string;
}>(`/api/forecasts/${horizon}`);

/**
 * 12-week satellite timeseries.
 * LST & precipitation: NASA POWER. NDVI & WBI: estimated.
 */
export const apiSatellite = () => get<{
  weeks: ApiSatelliteWeek[];
  data_sources: Record<string, string>;
}>('/api/satellite-data');

/** Current Dhaka weather (Open-Meteo real-time) */
export const apiWeather = () => get<{
  temp_avg_c: number;
  temp_max_c: number;
  rainfall_today_mm: number;
  rainfall_7day_mm: number;
  humidity_pct: number;
  data_source: string;
  source_url: string;
}>('/api/current-weather');

/** AI-generated alerts (based on live ward risk scores) */
export const apiAlerts = () => get<{
  total_alerts: number;
  alerts: ApiAlert[];
}>('/api/alerts');

/** Hospital list */
export const apiHospitals = () => get<{ hospitals: ApiHospital[] }>('/api/hospitals');

// ═══════════════════════════════════════════════════════════════════════════════
// HEALTHCARE ENDPOINTS (require JWT)
// ═══════════════════════════════════════════════════════════════════════════════

export const apiLogin = (hospital_id: number, password: string) =>
  post<{ access_token: string; hospital_id: number; hospital_name: string }>(
    '/api/auth/login',
    { hospital_id, password },
  );

export const apiCHWReports = (token: string) =>
  get<{ reports: ApiCHWReport[]; reports_today: number; average_fever_rate: number }>(
    '/api/healthcare/chw-reports',
  );

export const apiSubmitCHWReport = (
  token: string,
  data: { fever_cases: number; suspected_dengue: number; confirmed_dengue: number },
) => post('/api/healthcare/chw-report', data, token);

export const apiInterventions = (token: string) =>
  get<{ interventions: ApiIntervention[]; total_cost_bdt: number }>(
    '/api/healthcare/interventions',
  );

// ═══════════════════════════════════════════════════════════════════════════════
// RESPONSE TYPES (matching backend JSON shapes)
// ═══════════════════════════════════════════════════════════════════════════════

export interface ApiWard {
  ward_id: string;
  ward_name: string;
  risk_score: number;
  risk_level: 'Critical' | 'High' | 'Moderate' | 'Low';
  confidence: number;
  cases_this_week: number;
  cases_last_week: number;
  trend: 'rising' | 'stable' | 'falling';
  sparkline: number[];
  weekly_history: { week: string; cases: number }[];
  factors: { name: string; weight: number; icon: string }[];
  population: number;
  chw_count: number;
  last_fogging: string;
  coordinates: { lat: number; lng: number };
  weather_input: {
    temperature_c: number;
    rainfall_7day_mm: number;
    humidity_pct: number;
    data_source: string;
    source_url: string;
  };
}

export interface ApiForecastPoint {
  date: string;
  actual_cases: number | null;
  forecast_cases: number | null;
  upper_bound: number;
  lower_bound: number;
  risk_score: number;
  weather: { temp_c: number; rainfall_mm: number; humidity_pct: number };
  data_source: string;
}

export interface ApiMetrics {
  auroc: number;
  sensitivity: number;
  specificity: number;
  f1_score: number;
}

export interface ApiFeatureImportance {
  feature: string;
  importance: number;
}

export interface ApiSatelliteWeek {
  week: string;
  lst: number;
  rainfall: number;
  humidity: number;
  ndvi: number;
  water_body_index: number;
  data_source: string;
  source_url: string;
}

export interface ApiAlert {
  alert_id: string;
  ward_name: string;
  risk_level: string;
  trigger_reason: string;
  issued_at: string;
  status: string;
  assigned_officer: string;
  response_time_hours: number | null;
}

export interface ApiHospital {
  hospital_id: number;
  name: string;
  location: string;
}

export interface ApiCHWReport {
  report_id: string;
  hospital_name: string;
  fever_cases: number;
  suspected_dengue: number;
  confirmed_dengue: number;
  timestamp: string;
  status: string;
  alert_triggered: boolean;
}

export interface ApiIntervention {
  operation_id: string;
  ward_name: string;
  operation_type: string;
  date: string;
  status: string;
  area_covered_km2: number;
  coverage_percentage: number;
  assigned_team: string;
  cost_bdt: number;
}
