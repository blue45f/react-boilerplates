import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './Select';

describe('Select', () => {
  it('options 배열을 렌더링한다', () => {
    render(
      <Select
        label="과일"
        options={[
          { value: 'apple', label: '사과' },
          { value: 'banana', label: '바나나' },
        ]}
      />
    );
    expect(screen.getByLabelText('과일')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '사과' })).toBeInTheDocument();
  });

  it('선택 변경 시 onChange가 호출된다', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select
        label="과일"
        defaultValue="apple"
        onChange={onChange}
        options={[
          { value: 'apple', label: '사과' },
          { value: 'banana', label: '바나나' },
        ]}
      />
    );
    await user.selectOptions(screen.getByLabelText('과일'), 'banana');
    expect(onChange).toHaveBeenCalled();
  });

  it('error가 있으면 aria-invalid가 true이다', () => {
    render(<Select label="X" error="필수" options={[]} />);
    expect(screen.getByLabelText('X')).toHaveAttribute('aria-invalid', 'true');
  });
});
