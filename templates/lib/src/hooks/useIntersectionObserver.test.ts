import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { useIntersectionObserver } from './useIntersectionObserver';

class MockIO {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [];
  constructor(public callback: IntersectionObserverCallback) {}
}

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    (
      globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }
    ).IntersectionObserver = MockIO as unknown as typeof IntersectionObserver;
  });
  afterEach(() => {
    (globalThis as Record<string, unknown>).IntersectionObserver = undefined;
  });

  it('ref와 entry를 반환한다', () => {
    const { result } = renderHook(() => useIntersectionObserver<HTMLDivElement>());
    const [ref, entry] = result.current;
    expect(ref).toBeDefined();
    expect(entry).toBeNull();
  });
});
