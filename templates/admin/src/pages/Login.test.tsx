import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App as AntdApp } from 'antd';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import Login from './Login';

import { useAuthStore } from '@/stores/useAuthStore';

function renderLogin() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <AntdApp>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AntdApp>
    </QueryClientProvider>
  );
}

describe('Login 페이지', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  });

  it('이메일/비밀번호 입력 필드가 렌더링된다', () => {
    renderLogin();
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
  });

  it('잘못된 이메일은 검증 오류를 표시한다', async () => {
    const user = userEvent.setup();
    renderLogin();
    const emailInput = screen.getByLabelText('이메일');
    await user.clear(emailInput);
    await user.type(emailInput, 'not-an-email');
    await user.click(screen.getByRole('button', { name: '로그인' }));
    await waitFor(() => {
      expect(screen.getByText('올바른 이메일을 입력하세요')).toBeInTheDocument();
    });
  });

  it('유효한 자격증명으로 로그인하면 인증 상태가 갱신된다', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.click(screen.getByRole('button', { name: '로그인' }));
    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
  });
});
