import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('초기값을 반환한다', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('localStorage에 저장된 값을 읽는다', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored');
  });

  it('값을 설정하면 localStorage에 저장된다', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('updated');
  });

  it('함수 형태의 업데이트를 지원한다', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('removeValue로 값을 삭제한다', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('stored');
    });
    expect(result.current[0]).toBe('stored');

    act(() => {
      result.current[2](); // removeValue
    });
    expect(result.current[0]).toBe('initial');
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('객체 타입도 지원한다', () => {
    const { result } = renderHook(() =>
      useLocalStorage('obj-key', { name: 'test', count: 0 })
    );

    act(() => {
      result.current[1]({ name: 'updated', count: 1 });
    });

    expect(result.current[0]).toEqual({ name: 'updated', count: 1 });
  });
});
