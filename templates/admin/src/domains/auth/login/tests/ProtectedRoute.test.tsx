import { render, screen } from '@testing-library/react';
import { App as AntdApp } from 'antd';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import ProtectedRoute from '../components/ProtectedRoute';
import { useAuthStore } from '../model/useAuthStore';

function renderApp(initialEntry: string) {
  return render(
    <AntdApp>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/login" element={<div>로그인 페이지</div>} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>보호된 컨텐츠</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AntdApp>
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  });

  it('미인증 시 /login으로 리다이렉트한다', () => {
    renderApp('/');
    expect(screen.getByText('로그인 페이지')).toBeInTheDocument();
  });

  it('인증된 사용자는 보호된 컨텐츠를 본다', () => {
    useAuthStore.setState({
      user: { id: '1', name: '관리자', email: 'a@b.com', role: 'admin' },
      isAuthenticated: true,
    });
    renderApp('/');
    expect(screen.getByText('보호된 컨텐츠')).toBeInTheDocument();
  });
});
