import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { App as AntdApp } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import Users from './Users';

function renderUsers() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={qc}>
        <AntdApp>
          <MemoryRouter>
            <Users />
          </MemoryRouter>
        </AntdApp>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

describe('Users 페이지', () => {
  it('타이틀과 추가 버튼이 렌더링된다', () => {
    renderUsers();
    expect(screen.getByRole('heading', { name: '사용자 관리' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '새 사용자 추가' })).toBeInTheDocument();
  });

  it('사용자 목록이 비동기로 로드된다', async () => {
    renderUsers();
    await waitFor(
      () => {
        const rows = document.querySelectorAll('.ant-table-row');
        expect(rows.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });
});
