import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tag } from './Tag';

describe('Tag', () => {
  it('children을 렌더링한다', () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('onRemove가 있으면 닫기 버튼이 보이고 클릭 시 호출된다', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    render(<Tag onRemove={onRemove}>React</Tag>);
    await user.click(screen.getByLabelText('제거'));
    expect(onRemove).toHaveBeenCalled();
  });
});
