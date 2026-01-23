import { useState, useEffect } from 'react';

export const useOccurrencesWithFilters = (getOccurrencesUseCase, getStatsUseCase, filters, refreshKey = 0) => {
  const [occurrences, setOccurrences] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [filters.status, filters.prioridade, filters.page, refreshKey]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [occurrencesData, statsData] = await Promise.all([
        getOccurrencesUseCase.execute(filters),
        getStatsUseCase.execute()
      ]);
      setOccurrences(occurrencesData.occurrences);
      setTotalPages(occurrencesData.totalPages);
      setTotal(occurrencesData.total);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { occurrences, totalPages, total, stats, loading, error };
};

