import { useSyncExternalStore } from 'react';

import { resolveEffectiveTheme, useUiStore } from '@/stores/useUiStore';

export function useEffectiveTheme(): 'light' | 'dark' {
  const theme = useUiStore((s) => s.theme);
  const systemTheme = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemTheme,
    () => 'light' as const
  );

  return theme === 'system' ? systemTheme : theme;
}

function getSystemTheme(): 'light' | 'dark' {
  return resolveEffectiveTheme('system');
}

function subscribeSystemTheme(onStoreChange: () => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {};
  }
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}
