import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';

describe('Badge', () => {
  it('텍스트를 렌더링한다', () => {
    render(<Badge>활성</Badge>);
    expect(screen.getByText('활성')).toBeInTheDocument();
  });

  it.each(['success', 'warning', 'error', 'info'] as const)(
    '%s variant 별로 다른 클래스를 적용한다',
    (variant) => {
      const { rerender } = render(<Badge>기본</Badge>);
      const baseClass = screen.getByText('기본').className;
      rerender(<Badge variant={variant}>뱃지</Badge>);
      expect(screen.getByText('뱃지').className).not.toBe(baseClass);
    }
  );

  it('추가 className을 적용한다', () => {
    render(<Badge className="custom">뱃지</Badge>);
    expect(screen.getByText('뱃지').className).toContain('custom');
  });
});
