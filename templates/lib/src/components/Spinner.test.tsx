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

  it('사이즈 별로 다른 클래스를 적용한다', () => {
    const { rerender } = render(<Spinner size="sm" />);
    const sm = screen.getByRole('status').className;
    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status').className).not.toBe(sm);
  });
});
