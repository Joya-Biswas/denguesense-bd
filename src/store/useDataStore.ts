import { create } from 'zustand';
import type {
  Ward, Forecast, SatelliteData, CHWReport, Alert, Intervention,
  SeasonData, PipelineStage,
} from '../types';
import { wards } from '../data/wards';
import { forecasts } from '../data/forecasts';
import { satelliteData } from '../data/satellite';
import { chwReports } from '../data/chw';
import { alerts } from '../data/alerts';
import { interventions } from '../data/interventions';
import {
  seasonData, demographicData, cityComparisonData,
  modelDriftData, pipelineStages,
} from '../data/analytics';

interface DataStore {
  // Data
  wards: Ward[];
  forecasts: Record<string, Forecast>;
  satelliteData: SatelliteData[];
  chwReports: CHWReport[];
  alerts: Alert[];
  interventions: Intervention[];
  seasonData: SeasonData[];
  pipelineStages: PipelineStage[];

  // Forecast state
  selectedForecastHorizon: '7day' | '14day' | '21day';
  setSelectedForecastHorizon: (horizon: '7day' | '14day' | '21day') => void;

  // Alert actions
  acknowledgeAlert: (alertId: string) => void;
  deployAlert: (alertId: string) => void;

  // CHW actions
  addCHWReport: (report: CHWReport) => void;

  // Intervention actions
  addIntervention: (intervention: Intervention) => void;

  // Data refresh
  refreshData: () => void;
}

export const useDataStore = create<DataStore>((set) => ({
  wards,
  forecasts,
  satelliteData,
  chwReports,
  alerts,
  interventions,
  seasonData,
  pipelineStages,

  selectedForecastHorizon: '7day',
  setSelectedForecastHorizon: (horizon) =>
    set({ selectedForecastHorizon: horizon }),

  acknowledgeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: 'acknowledged' as const }
          : alert
      ),
    })),

  deployAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: 'deployed' as const,
              responseHours: alert.responseHours || Math.floor(Math.random() * 8) + 1,
            }
          : alert
      ),
    })),

  addCHWReport: (report) =>
    set((state) => ({
      chwReports: [report, ...state.chwReports],
    })),

  addIntervention: (intervention) =>
    set((state) => ({
      interventions: [intervention, ...state.interventions],
    })),

  refreshData: () => {
    set({
      wards: wards.map((w) => ({
        ...w,
        casesThisWeek: Math.floor(w.casesThisWeek * (0.9 + Math.random() * 0.2)),
      })),
    });
  },
}));
