import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (notify: () => void) => {
      if (typeof window === 'undefined') return () => {};
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', notify);
      return () => mediaQuery.removeEventListener('change', notify);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
