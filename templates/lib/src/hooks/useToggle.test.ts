import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('기본값은 false이다', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('초기값을 설정할 수 있다', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('toggle()로 값을 반전시킨다', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1](); // toggle
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](); // toggle
    });
    expect(result.current[0]).toBe(false);
  });

  it('set()으로 값을 직접 설정한다', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[2](true); // set
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[2](false); // set
    });
    expect(result.current[0]).toBe(false);
  });

  it('toggle과 set 함수의 참조가 안정적이다', () => {
    const { result, rerender } = renderHook(() => useToggle());

    const toggle1 = result.current[1];
    const set1 = result.current[2];

    rerender();

    expect(result.current[1]).toBe(toggle1);
    expect(result.current[2]).toBe(set1);
  });
});
