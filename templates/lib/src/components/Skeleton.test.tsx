import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('width/height가 인라인 스타일로 적용된다', () => {
    const { container } = render(<Skeleton width={120} height={20} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('120px');
    expect(el.style.height).toBe('20px');
  });

  it('circle=true이면 width=height로 동기화된다', () => {
    const { container } = render(<Skeleton width={40} circle />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.height).toBe('40px');
    expect(el.className).toMatch(/circle/);
  });
});
