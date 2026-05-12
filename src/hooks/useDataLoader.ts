/**
 * useDataLoader — fetches live API data once on app startup.
 * Use this in the root layout so all screens get live data automatically.
 */

import { useEffect } from 'react';
import { useDataStore } from '../store/useDataStore';

export function useDataLoader() {
  const fetchAllData = useDataStore((s) => s.fetchAllData);
  const isLoading    = useDataStore((s) => s.isLoading);
  const apiOnline    = useDataStore((s) => s.apiOnline);
  const dataSource   = useDataStore((s) => s.dataSource);
  const lastFetched  = useDataStore((s) => s.lastFetched);

  useEffect(() => {
    // Fetch on mount
    fetchAllData();

    // Auto-refresh every 10 minutes
    const interval = setInterval(fetchAllData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  return { isLoading, apiOnline, dataSource, lastFetched };
}
