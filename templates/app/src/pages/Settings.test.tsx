import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import Settings from './Settings';
import { useAppStore } from '@/stores/useAppStore';
import { renderWithProviders, screen } from '@/test-utils';

describe('Settings 페이지', () => {
  beforeEach(() => {
    useAppStore.setState({
      theme: 'system',
      language: 'ko',
      notifications: true,
      sidebarOpen: true,
    });
  });

  it('언어 옵션이 표시된다', () => {
    renderWithProviders(<Settings />);
    expect(screen.getByText('한국어')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('알림 토글이 zustand 상태를 변경한다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Settings />);

    expect(useAppStore.getState().notifications).toBe(true);

    const toggle = screen.getByLabelText(/이메일 알림/);
    await user.click(toggle);

    expect(useAppStore.getState().notifications).toBe(false);
  });
});
