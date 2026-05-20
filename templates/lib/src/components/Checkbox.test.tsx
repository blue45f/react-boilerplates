import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('label과 함께 렌더링된다', () => {
    render(<Checkbox label="동의" />);
    expect(screen.getByLabelText('동의')).toBeInTheDocument();
  });

  it('클릭 시 체크된다', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="확인" onChange={onChange} />);
    await user.click(screen.getByLabelText('확인'));
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByLabelText('확인')).toBeChecked();
  });
});
