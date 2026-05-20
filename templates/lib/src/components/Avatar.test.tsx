import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('name으로부터 이니셜을 표시한다', () => {
    render(<Avatar name="홍 길동" />);
    expect(screen.getByText('홍길')).toBeInTheDocument();
  });

  it('src가 있으면 img를 렌더링한다', () => {
    render(<Avatar src="/me.png" name="Foo" alt="me" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/me.png');
  });

  it('name이 없으면 ?를 표시한다', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
