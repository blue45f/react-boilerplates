import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useCopyToClipboard } from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('텍스트를 복사하고 copied 상태가 true가 된다', async () => {
    const { result } = renderHook(() => useCopyToClipboard(0));
    let success = false;
    await act(async () => {
      success = await result.current.copy('hello');
    });
    expect(success).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
    expect(result.current.copied).toBe(true);
  });
});
