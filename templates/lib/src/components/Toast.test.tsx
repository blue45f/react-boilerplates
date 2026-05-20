import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { ToastProvider, useToast } from './Toast';

function Trigger() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ title: '저장 완료', description: '내용', variant: 'success' })}>
      알림
    </button>
  );
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('toast 호출 시 표시된다', () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: '알림' }));
    expect(screen.getByText('저장 완료')).toBeInTheDocument();
  });

  it('duration 이후 자동으로 닫힌다', () => {
    render(
      <ToastProvider defaultDuration={1000}>
        <Trigger />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: '알림' }));
    expect(screen.getByText('저장 완료')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.queryByText('저장 완료')).not.toBeInTheDocument();
  });
});
