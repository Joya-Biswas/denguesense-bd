import type { SeasonData, PipelineStage } from '../types';

export const seasonData: SeasonData[] = [
  {
    year: 2022,
    weeks: Array.from({ length: 52 }, (_, i) => ({
      week: i + 1,
      cases: Math.floor(400 + Math.sin(i * 0.12) * 200 + Math.random() * 100),
    })),
  },
  {
    year: 2023,
    weeks: Array.from({ length: 52 }, (_, i) => ({
      week: i + 1,
      cases: Math.floor(450 + Math.sin(i * 0.12) * 220 + Math.random() * 120),
    })),
  },
  {
    year: 2024,
    weeks: Array.from({ length: 52 }, (_, i) => ({
      week: i + 1,
      cases: Math.floor(500 + Math.sin(i * 0.12) * 250 + Math.random() * 150),
    })),
  },
  {
    year: 2025,
    weeks: Array.from({ length: 52 }, (_, i) => ({
      week: i + 1,
      cases: Math.floor(480 + Math.sin(i * 0.12) * 240 + Math.random() * 140),
    })),
  },
  {
    year: 2026,
    weeks: Array.from({ length: 20 }, (_, i) => ({
      week: i + 1,
      cases: Math.floor(520 + Math.sin(i * 0.12) * 260 + Math.random() * 160),
    })),
  },
];

export const demographicData = {
  ageGroups: [
    { group: '<5', percentage: 8, cases: 120 },
    { group: '5-14', percentage: 22, cases: 280 },
    { group: '15-44', percentage: 45, cases: 580 },
    { group: '45-64', percentage: 18, cases: 220 },
    { group: '65+', percentage: 7, cases: 85 },
  ],
};

export const cityComparisonData = [
  { city: 'Dhaka', values: [480, 520, 560, 640, 720, 680, 620, 580] },
  { city: 'Chattogram', values: [280, 300, 320, 380, 420, 400, 350, 320] },
  { city: 'Sylhet', values: [120, 140, 160, 200, 240, 220, 180, 150] },
];

export const modelDriftData = Array.from({ length: 12 }, (_, i) => ({
  month: `M${i + 1}`,
  auroc: 0.92 - Math.random() * 0.12,
  retrain: i > 7,
}));

export const pipelineStages: PipelineStage[] = [
  {
    name: 'Data Ingestion',
    status: 'healthy',
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    latency: '2.3s',
  },
  {
    name: 'Feature Engineering',
    status: 'healthy',
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    latency: '5.1s',
  },
  {
    name: 'ST-GNN Model',
    status: 'healthy',
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    latency: '8.4s',
  },
  {
    name: 'Ensemble Aggregation',
    status: 'healthy',
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    latency: '1.2s',
  },
  {
    name: 'Alert Generation',
    status: 'healthy',
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    latency: '0.8s',
  },
];
