import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';

describe('Switch', () => {
  it('role=switch와 aria-checked가 있다', () => {
    render(<Switch />);
    const sw = screen.getByRole('switch');
    expect(sw).toHaveAttribute('aria-checked', 'false');
  });

  it('클릭하면 토글된다', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Switch onCheckedChange={handler} />);
    await user.click(screen.getByRole('switch'));
    expect(handler).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('Space 키로 토글된다', async () => {
    const user = userEvent.setup();
    render(<Switch />);
    const sw = screen.getByRole('switch');
    sw.focus();
    await user.keyboard(' ');
    expect(sw).toHaveAttribute('aria-checked', 'true');
  });

  it('disabled면 변경되지 않는다', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Switch disabled onCheckedChange={handler} />);
    await user.click(screen.getByRole('switch'));
    expect(handler).not.toHaveBeenCalled();
  });
});
