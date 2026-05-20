import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useKeyPress } from './useKeyPress';

describe('useKeyPress', () => {
  it('지정된 키를 누르면 true가 된다', () => {
    const { result } = renderHook(() => useKeyPress('a'));
    expect(result.current).toBe(false);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    });
    expect(result.current).toBe(true);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    });
    expect(result.current).toBe(false);
  });

  it('onKey 콜백을 호출한다', () => {
    const onKey = vi.fn();
    renderHook(() => useKeyPress('Escape', { onKey }));
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(onKey).toHaveBeenCalled();
  });
});
