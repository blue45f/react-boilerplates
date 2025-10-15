import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';

describe('Badge', () => {
  it('텍스트를 렌더링한다', () => {
    render(<Badge>활성</Badge>);
    expect(screen.getByText('활성')).toBeInTheDocument();
  });

  it('기본 variant는 default이다', () => {
    render(<Badge>기본</Badge>);
    expect(screen.getByText('기본').className).toContain('bg-gray-100');
  });

  it.each([
    ['success', 'bg-green-100'],
    ['warning', 'bg-yellow-100'],
    ['error', 'bg-red-100'],
    ['info', 'bg-blue-100'],
  ] as const)('%s variant를 적용한다', (variant, expectedClass) => {
    render(<Badge variant={variant}>뱃지</Badge>);
    expect(screen.getByText('뱃지').className).toContain(expectedClass);
  });

  it('추가 className을 적용한다', () => {
    render(<Badge className="custom">뱃지</Badge>);
    expect(screen.getByText('뱃지').className).toContain('custom');
  });
});
