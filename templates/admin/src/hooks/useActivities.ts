import { useQuery } from '@tanstack/react-query';

import { mockApi } from '@/lib/mock';

export function useActivities() {
  return useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: () => mockApi.getActivities(),
  });
}
