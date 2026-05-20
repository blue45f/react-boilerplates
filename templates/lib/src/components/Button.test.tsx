import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('텍스트를 렌더링한다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('기본 type은 button이다', () => {
    render(<Button>버튼</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('클릭 이벤트를 처리한다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>클릭</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('variant 마다 다른 클래스가 적용된다', () => {
    const { rerender } = render(<Button>Primary</Button>);
    const primaryClass = screen.getByRole('button').className;
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button').className).not.toBe(primaryClass);
  });

  it('size 마다 다른 클래스가 적용된다', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    const sm = screen.getByRole('button').className;
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button').className).not.toBe(sm);
  });

  it('추가 className을 적용한다', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button').className).toContain('custom-class');
  });

  it('disabled 상태를 처리한다', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('disabled 상태에서 클릭이 무시된다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('loading 상태이면 스피너를 보여주고 비활성화된다', () => {
    render(<Button loading>저장</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('leftIcon/rightIcon을 렌더링한다', () => {
    render(
      <Button leftIcon={<span data-testid="left" />} rightIcon={<span data-testid="right" />}>
        Hi
      </Button>
    );
    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });

  it('fullWidth 클래스가 추가된다', () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole('button').className).toMatch(/fullWidth/);
  });

  it('type을 변경할 수 있다', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('aria-label을 전달할 수 있다', () => {
    render(<Button aria-label="닫기 버튼">X</Button>);
    expect(screen.getByLabelText('닫기 버튼')).toBeInTheDocument();
  });

  it('ref를 전달한다', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
