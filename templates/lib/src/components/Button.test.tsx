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

  it('primary 변형이 기본값이다', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-blue-500');
  });

  it('secondary 변형을 적용한다', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-gray-500');
  });

  it('outline 변형을 적용한다', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border');
    expect(button.className).toContain('text-blue-500');
  });

  it('sm 사이즈를 적용한다', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('px-3');
    expect(button.className).toContain('text-sm');
  });

  it('lg 사이즈를 적용한다', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('px-6');
    expect(button.className).toContain('text-lg');
  });

  it('추가 className을 적용한다', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
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

  it('focus ring 스타일이 포함된다', () => {
    render(<Button>Focus</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('focus:ring-2');
    expect(button.className).toContain('focus:ring-offset-2');
  });

  it('type을 변경할 수 있다', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('aria-label을 전달할 수 있다', () => {
    render(<Button aria-label="닫기 버튼">X</Button>);
    expect(screen.getByLabelText('닫기 버튼')).toBeInTheDocument();
  });
});
