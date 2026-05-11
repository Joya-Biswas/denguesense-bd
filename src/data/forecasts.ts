import type { Forecast, ForecastPoint } from '../types';

function generateForecastData(weeks: number, startCases: number = 500): ForecastPoint[] {
  const data: ForecastPoint[] = [];
  let current = startCases;

  for (let i = 0; i < weeks; i++) {
    const isActual = i < 4;
    const trend = Math.sin(i * 0.5) * 0.15 + 0.1;
    current = Math.max(100, current * (1 + trend + (Math.random() - 0.5) * 0.2));

    const predicted = current * (1 + (Math.random() - 0.5) * 0.1);
    const lower = predicted * 0.85;
    const upper = predicted * 1.15;

    data.push({
      week: `W${i + 1}`,
      actual: isActual ? Math.floor(current) : null,
      predicted: Math.floor(predicted),
      lower95: Math.floor(lower),
      upper95: Math.floor(upper),
    });
  }

  return data;
}

export const forecasts: Record<string, Forecast> = {
  '7day': {
    horizon: '7day',
    data: generateForecastData(7),
    auroc: 0.91,
    sensitivity: 87.3,
    specificity: 82.6,
    f1Score: 0.84,
  },
  '14day': {
    horizon: '14day',
    data: generateForecastData(14),
    auroc: 0.88,
    sensitivity: 84.2,
    specificity: 80.1,
    f1Score: 0.81,
  },
  '21day': {
    horizon: '21day',
    data: generateForecastData(21),
    auroc: 0.85,
    sensitivity: 81.5,
    specificity: 78.3,
    f1Score: 0.79,
  },
};

export const modelPerformance = {
  auroc: 0.91,
  sensitivity: 87.3,
  specificity: 82.6,
  f1Score: 0.84,
};
