import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card, CardHeader, CardBody, CardFooter } from './Card';

describe('Card', () => {
  it('children을 렌더링한다', () => {
    render(<Card>카드 내용</Card>);
    expect(screen.getByText('카드 내용')).toBeInTheDocument();
  });

  it('추가 className을 적용한다', () => {
    const { container } = render(<Card className="custom">내용</Card>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('CardHeader, CardBody, CardFooter를 함께 사용한다', () => {
    render(
      <Card>
        <CardHeader>헤더</CardHeader>
        <CardBody>본문</CardBody>
        <CardFooter>푸터</CardFooter>
      </Card>
    );
    expect(screen.getByText('헤더')).toBeInTheDocument();
    expect(screen.getByText('본문')).toBeInTheDocument();
    expect(screen.getByText('푸터')).toBeInTheDocument();
  });

  it('HTML 속성을 전달한다', () => {
    render(<Card data-testid="my-card">내용</Card>);
    expect(screen.getByTestId('my-card')).toBeInTheDocument();
  });
});
