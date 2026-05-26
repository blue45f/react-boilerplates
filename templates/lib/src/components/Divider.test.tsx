import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Divider } from './Divider';

describe('Divider', () => {
  it('horizontal separator role을 가진다', () => {
    render(<Divider />);
    const sep = screen.getByRole('separator');
    expect(sep.tagName).toBe('HR');
  });

  it('label이 있으면 텍스트를 표시한다', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('vertical orientation을 적용한다', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });
});
