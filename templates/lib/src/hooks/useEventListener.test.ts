import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useEventListener } from './useEventListener';

describe('useEventListener', () => {
  it('window 이벤트를 처리한다', () => {
    const handler = vi.fn();
    renderHook(() => useEventListener('click', handler));
    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });
    expect(handler).toHaveBeenCalled();
  });

  it('언마운트 시 리스너가 제거된다', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useEventListener('click', handler));
    unmount();
    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });
    expect(handler).not.toHaveBeenCalled();
  });
});
