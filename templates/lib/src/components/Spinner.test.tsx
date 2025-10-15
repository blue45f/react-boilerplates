import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('status role을 가진다', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('기본 라벨은 "로딩 중"이다', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('로딩 중')).toBeInTheDocument();
  });

  it('커스텀 라벨을 설정할 수 있다', () => {
    render(<Spinner label="데이터 불러오는 중" />);
    expect(screen.getByLabelText('데이터 불러오는 중')).toBeInTheDocument();
  });

  it('사이즈별 스타일이 적용된다', () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByRole('status').className).toContain('h-4');

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status').className).toContain('h-12');
  });
});
