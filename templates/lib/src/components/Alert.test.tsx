import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Alert } from './Alert';

describe('Alert', () => {
  it('내용을 렌더링한다', () => {
    render(<Alert>알림 메시지입니다.</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('알림 메시지입니다.');
  });

  it('제목을 표시한다', () => {
    render(<Alert title="주의">내용</Alert>);
    expect(screen.getByText('주의')).toBeInTheDocument();
  });

  it('variant 별로 클래스가 변경된다', () => {
    const { rerender } = render(<Alert variant="info">기본</Alert>);
    const info = screen.getByRole('alert').className;
    for (const v of ['success', 'warning', 'error'] as const) {
      rerender(<Alert variant={v}>{v}</Alert>);
      expect(screen.getByRole('alert').className).not.toBe(info);
    }
  });

  it('닫기 버튼을 클릭하면 onClose를 호출한다', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<Alert onClose={onClose}>메시지</Alert>);
    await user.click(screen.getByLabelText('닫기'));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('onClose가 없으면 닫기 버튼이 없다', () => {
    render(<Alert>메시지</Alert>);
    expect(screen.queryByLabelText('닫기')).not.toBeInTheDocument();
  });
});
