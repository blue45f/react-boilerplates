import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** true면 한 번 교차된 뒤 관찰을 중단한다 */
  freezeOnceVisible?: boolean;
}

/** 요소의 뷰포트 진입 여부를 추적하는 훅 */
export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, IntersectionObserverEntry | null] {
  const { root = null, rootMargin = '0px', threshold = 0, freezeOnceVisible = false } = options;
  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = ref.current;
    if (!node || frozen || typeof IntersectionObserver !== 'function') return;
    const observer = new IntersectionObserver(
      ([newEntry]) => {
        setEntry(newEntry);
      },
      { root, rootMargin, threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold, frozen]);

  return [ref, entry];
}
