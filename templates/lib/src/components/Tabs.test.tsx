import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tabs } from './Tabs';

function Example() {
  return (
    <Tabs defaultValue="a">
      <Tabs.List>
        <Tabs.Trigger value="a">A</Tabs.Trigger>
        <Tabs.Trigger value="b">B</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="a">패널 A</Tabs.Content>
      <Tabs.Content value="b">패널 B</Tabs.Content>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('초기 활성 탭의 패널만 표시한다', () => {
    render(<Example />);
    expect(screen.getByText('패널 A')).toBeInTheDocument();
    expect(screen.queryByText('패널 B')).not.toBeInTheDocument();
  });

  it('탭 클릭 시 활성이 바뀐다', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByText('패널 B')).toBeInTheDocument();
    expect(screen.queryByText('패널 A')).not.toBeInTheDocument();
  });

  it('ArrowRight 키로 다음 탭 포커스 이동', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const tabA = screen.getByRole('tab', { name: 'A' });
    tabA.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();
  });
});
