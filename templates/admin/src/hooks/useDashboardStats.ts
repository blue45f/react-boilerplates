import { useQuery } from '@tanstack/react-query';

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  growthRate: number;
}

// 데모용 mock 데이터 (실제 프로젝트에서는 API 호출로 대체)
async function fetchDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    totalUsers: 1128,
    totalOrders: 93,
    totalRevenue: 1250000,
    growthRate: 11.28,
  };
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,
  });
}
