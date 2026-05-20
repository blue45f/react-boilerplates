import type { ReactNode } from 'react';

export interface AppRoute {
  path: string;
  label: string;
  iconKey?: 'dashboard' | 'users' | 'settings' | 'analytics';
  showInNav?: boolean;
  showInBreadcrumb?: boolean;
}

export const appRoutes: AppRoute[] = [
  { path: '/', label: '대시보드', iconKey: 'dashboard', showInNav: true, showInBreadcrumb: true },
  {
    path: '/users',
    label: '사용자 관리',
    iconKey: 'users',
    showInNav: true,
    showInBreadcrumb: true,
  },
  {
    path: '/analytics',
    label: '분석',
    iconKey: 'analytics',
    showInNav: true,
    showInBreadcrumb: true,
  },
  {
    path: '/settings',
    label: '설정',
    iconKey: 'settings',
    showInNav: true,
    showInBreadcrumb: true,
  },
];

export const routeLabelMap: Record<string, string> = Object.fromEntries(
  appRoutes.map((r) => [r.path, r.label])
);

// helper type re-exports for consumers
export type { ReactNode };
