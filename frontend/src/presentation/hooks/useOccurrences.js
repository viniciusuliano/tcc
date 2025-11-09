import { useState, useEffect } from 'react';

export const useOccurrences = (getOccurrencesUseCase, getStatsUseCase) => {
  const [occurrences, setOccurrences] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [occurrencesData, statsData] = await Promise.all([
        getOccurrencesUseCase.execute(),
        getStatsUseCase.execute()
      ]);
      setOccurrences(occurrencesData);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { occurrences, stats, loading, error };
};

