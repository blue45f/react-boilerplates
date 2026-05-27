import { useQuery } from '@tanstack/react-query';

import { mockApi } from '@/infrastructure/mock';

export function useActivities() {
  return useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: () => mockApi.getActivities(),
  });
}
