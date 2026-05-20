import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('hover 전에는 보이지 않는다', () => {
    render(
      <Tooltip content="도움말">
        <button>버튼</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('hover 시 표시된다', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="도움말">
        <button>버튼</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toHaveTextContent('도움말');
  });
});
