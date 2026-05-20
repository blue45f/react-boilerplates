import { useQuery } from '@tanstack/react-query';

import { mockApi, type DashboardStats } from '@/lib/mock';

export type { DashboardStats };

export function useDashboardStats(options?: { refetchInterval?: number | false }) {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => mockApi.getDashboardStats(),
    refetchInterval: options?.refetchInterval ?? false,
  });
}
