import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  let listeners: Map<string, (event: MediaQueryListEvent) => void>;

  beforeEach(() => {
    listeners = new Map();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn((_, handler) => {
          listeners.set(query, handler);
        }),
        removeEventListener: vi.fn((_, _handler) => {
          listeners.delete(query);
        }),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('초기값은 false이다', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('미디어 쿼리 변경을 감지한다', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    const handler = listeners.get('(min-width: 768px)');
    if (handler) {
      act(() => {
        handler({ matches: true } as MediaQueryListEvent);
      });
    }

    expect(result.current).toBe(true);
  });

  it('언마운트 시 리스너를 정리한다', () => {
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    unmount();
    expect(listeners.has('(min-width: 768px)')).toBe(false);
  });
});
