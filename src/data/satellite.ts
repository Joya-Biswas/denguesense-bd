import type { SatelliteData } from '../types';

export const satelliteData: SatelliteData[] = Array.from({ length: 12 }, (_, i) => {
  const baseTemp = 28 + Math.sin(i * 0.5) * 5;
  const anomaly = (Math.random() - 0.5) * 3;

  return {
    week: `W${i + 1}`,
    lst: baseTemp + anomaly,
    rainfall: Math.max(0, 120 + Math.sin(i * 0.8) * 80 + (Math.random() - 0.5) * 40),
    ndvi: 0.6 + Math.sin(i * 0.4) * 0.15 + (Math.random() - 0.5) * 0.05,
    waterBodyIndex: 0.5 + Math.sin(i * 0.3) * 0.2 + (Math.random() - 0.5) * 0.08,
  };
});

export const satelliteMetadata = {
  lst: {
    source: 'NASA MODIS MOD11A1',
    status: 'Live' as const,
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  rainfall: {
    source: 'TRMM GPM',
    status: 'Live' as const,
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  ndvi: {
    source: 'NOAA VIIRS',
    status: 'Live' as const,
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  waterBody: {
    source: 'JRC GFW',
    status: 'Live' as const,
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
};
