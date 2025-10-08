import { useState, useEffect } from 'react';
import sheetsService from '../services/googleSheets';

const CACHE_KEY = 'sheet_data_cache';
const CACHE_TIME_KEY = 'sheet_data_cache_time';
const CACHE_VERSION_KEY = 'sheet_data_cache_version';
const CACHE_VERSION = '2';
const CACHE_DURATION = 10 * 60 * 1000; // 10 phút - Tối ưu cho data ít thay đổi

export function useSheetData() {
  const [data, setData] = useState({ profile: {}, products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      if (!forceRefresh) {
        const cached = localStorage.getItem(CACHE_KEY);
        const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
        const cacheVersion = localStorage.getItem(CACHE_VERSION_KEY);

        // Validate cache version
        if (cacheVersion !== CACHE_VERSION) {
          localStorage.removeItem(CACHE_KEY);
          localStorage.removeItem(CACHE_TIME_KEY);
          localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION);
        } else if (cached && cacheTime) {
          const timeDiff = Date.now() - parseInt(cacheTime);
          if (timeDiff < CACHE_DURATION) {
            setData(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }
      }

      // Fetch fresh data
      const freshData = await sheetsService.getAllData();

      // Update cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION);

      setData(freshData);
    } catch (err) {
      setError(err.message);
      console.error('Error in useSheetData:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Không auto-refresh vì data ít thay đổi - tiết kiệm API quota
  }, []);

  return {
    data,
    loading,
    error,
    refresh: () => fetchData(true),
  };
}

export default useSheetData;
