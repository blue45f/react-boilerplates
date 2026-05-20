import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { useInfinitePosts, usePosts } from './usePosts';

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('usePosts', () => {
  it('게시글 목록을 가져온다', async () => {
    const { result } = renderHook(() => usePosts(3), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true), {
      timeout: 5000,
    });
    expect(Array.isArray(result.current.data)).toBe(true);
    expect(result.current.data?.length).toBeGreaterThan(0);
  });
});

describe('useInfinitePosts', () => {
  it('첫 페이지를 가져온다', async () => {
    const { result } = renderHook(() => useInfinitePosts(3), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true), {
      timeout: 5000,
    });
    expect(result.current.data?.pages.length).toBe(1);
    expect(result.current.data?.pages[0].length).toBeGreaterThan(0);
  });
});
