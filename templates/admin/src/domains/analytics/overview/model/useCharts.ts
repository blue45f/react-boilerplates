import { useQuery } from '@tanstack/react-query';

import { mockApi } from '@/infrastructure/mock';

export function useChartSeries(rangeDays: number) {
  return useQuery({
    queryKey: ['charts', 'series', rangeDays],
    queryFn: () => mockApi.getChartSeries(rangeDays),
  });
}

export function useCategoryBreakdown() {
  return useQuery({
    queryKey: ['charts', 'categories'],
    queryFn: () => mockApi.getCategoryBreakdown(),
  });
}
