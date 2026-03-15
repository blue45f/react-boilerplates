import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  it('ref를 반환한다', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside(handler));
    expect(result.current).toHaveProperty('current');
  });

  it('외부 클릭 시 핸들러를 호출한다', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    const element = document.createElement('div');
    document.body.appendChild(element);
    (result.current as { current: HTMLDivElement | null }).current = element;

    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledOnce();
    document.body.removeChild(element);
  });

  it('내부 클릭 시 핸들러를 호출하지 않는다', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    const element = document.createElement('div');
    document.body.appendChild(element);
    (result.current as { current: HTMLDivElement | null }).current = element;

    act(() => {
      element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(element);
  });
});
