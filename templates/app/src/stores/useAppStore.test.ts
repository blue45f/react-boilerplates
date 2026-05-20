import { beforeEach, describe, expect, it } from 'vitest';

import { useAppStore } from './useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({
      theme: 'system',
      language: 'ko',
      notifications: true,
      sidebarOpen: true,
    });
  });

  it('초기 theme preference는 system이다', () => {
    expect(useAppStore.getState().theme).toBe('system');
  });

  it('setTheme으로 테마 변경이 가능하다', () => {
    useAppStore.getState().setTheme('dark');
    expect(useAppStore.getState().theme).toBe('dark');
    useAppStore.getState().setTheme('light');
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('toggleTheme은 light->dark->system->light 순으로 순환한다', () => {
    useAppStore.setState({ theme: 'light' });
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('dark');
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('system');
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('setLanguage로 언어를 변경한다', () => {
    useAppStore.getState().setLanguage('en');
    expect(useAppStore.getState().language).toBe('en');
  });

  it('toggleNotifications로 알림 상태를 전환한다', () => {
    expect(useAppStore.getState().notifications).toBe(true);
    useAppStore.getState().toggleNotifications();
    expect(useAppStore.getState().notifications).toBe(false);
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
