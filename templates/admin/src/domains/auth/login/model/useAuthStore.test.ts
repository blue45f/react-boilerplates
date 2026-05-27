import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from './useAuthStore';

const mockUser = { id: '1', name: '관리자', email: 'admin@test.com', role: 'admin' as const };

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  });

  it('초기 상태는 미인증이다', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('login으로 사용자를 설정한다', () => {
    useAuthStore.getState().login(mockUser);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  it('logout으로 상태를 초기화한다', () => {
    useAuthStore.getState().login(mockUser);
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
