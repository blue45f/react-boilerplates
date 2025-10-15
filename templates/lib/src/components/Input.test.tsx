import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('기본 입력 필드를 렌더링한다', () => {
    render(<Input placeholder="입력하세요" />);
    expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument();
  });

  it('라벨을 렌더링하고 연결한다', () => {
    render(<Input label="이메일" />);
    const input = screen.getByLabelText('이메일');
    expect(input).toBeInTheDocument();
  });

  it('에러 메시지를 표시한다', () => {
    render(<Input label="이메일" error="필수 항목입니다" />);
    expect(screen.getByRole('alert')).toHaveTextContent('필수 항목입니다');
    expect(screen.getByLabelText('이메일')).toHaveAttribute('aria-invalid', 'true');
  });

  it('도움말 텍스트를 표시한다', () => {
    render(<Input label="이메일" helperText="example@mail.com 형식" />);
    expect(screen.getByText('example@mail.com 형식')).toBeInTheDocument();
  });

  it('에러가 있으면 도움말 대신 에러를 표시한다', () => {
    render(<Input label="이메일" error="잘못된 형식" helperText="이 텍스트는 안 보임" />);
    expect(screen.getByText('잘못된 형식')).toBeInTheDocument();
    expect(screen.queryByText('이 텍스트는 안 보임')).not.toBeInTheDocument();
  });

  it('값 변경을 처리한다', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');

    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('disabled 상태를 처리한다', () => {
    render(<Input disabled label="비활성" />);
    expect(screen.getByLabelText('비활성')).toBeDisabled();
  });

  it('ref를 전달한다', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
