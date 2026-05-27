import { useQuery } from '@tanstack/react-query';

import { mockApi, type DashboardStats } from '@/infrastructure/mock';

export type { DashboardStats };

export function useDashboardStats(options?: { refetchInterval?: number | false }) {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => mockApi.getDashboardStats(),
    refetchInterval: options?.refetchInterval ?? false,
  });
}
