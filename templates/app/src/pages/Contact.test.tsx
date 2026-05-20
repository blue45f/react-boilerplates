import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Contact from './Contact';
import { renderWithProviders, screen, waitFor } from '@/test-utils';

describe('Contact 페이지', () => {
  it('빈 폼 제출 시 zod 검증 에러가 표시된다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.click(screen.getByRole('button', { name: /보내기/ }));

    await waitFor(() => {
      expect(screen.getByText(/이름은 최소 2자/)).toBeInTheDocument();
    });
    expect(screen.getByText(/올바른 이메일/)).toBeInTheDocument();
    expect(screen.getByText(/메시지는 최소 10자/)).toBeInTheDocument();
  });

  it('잘못된 이메일은 검증 에러를 표시한다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText(/이메일/), 'not-an-email');
    await user.tab();
    await user.click(screen.getByRole('button', { name: /보내기/ }));

    await waitFor(() => {
      expect(screen.getByText(/올바른 이메일/)).toBeInTheDocument();
    });
  });
});
