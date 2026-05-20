import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Radio, RadioGroup } from './Radio';

describe('RadioGroup', () => {
  it('초기 defaultValue가 선택된다', () => {
    render(
      <RadioGroup name="g1" defaultValue="b">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('B')).toBeChecked();
  });

  it('선택 변경 시 onValueChange가 호출된다', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup name="g2" defaultValue="a" onValueChange={onValueChange}>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>
    );
    await user.click(screen.getByLabelText('B'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });
});
