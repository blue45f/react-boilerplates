import { describe, expect, it, beforeEach } from 'vitest';
import { useAppStore } from './useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({ theme: 'light', sidebarOpen: true });
  });

  it('초기 테마는 light이다', () => {
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('toggleTheme으로 테마를 전환한다', () => {
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('dark');

    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('toggleSidebar로 사이드바를 전환한다', () => {
    expect(useAppStore.getState().sidebarOpen).toBe(true);

    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it('setSidebarOpen으로 사이드바를 직접 설정한다', () => {
    useAppStore.getState().setSidebarOpen(false);
    expect(useAppStore.getState().sidebarOpen).toBe(false);

    useAppStore.getState().setSidebarOpen(true);
    expect(useAppStore.getState().sidebarOpen).toBe(true);
  });
});
