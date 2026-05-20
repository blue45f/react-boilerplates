import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useFocusTrap } from './useFocusTrap';

function Trap() {
  const ref = useFocusTrap<HTMLDivElement>(true);
  return (
    <div ref={ref}>
      <button>first</button>
      <button>last</button>
    </div>
  );
}

describe('useFocusTrap', () => {
  it('초기 포커스가 첫 번째 요소에 위치한다', () => {
    const { getAllByRole } = render(<Trap />);
    const [first] = getAllByRole('button');
    expect(first).toHaveFocus();
  });

  it('마지막 요소에서 Tab 누르면 첫 번째로 순환한다', async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(<Trap />);
    const [first, last] = getAllByRole('button');
    last.focus();
    await user.tab();
    expect(first).toHaveFocus();
  });
});
