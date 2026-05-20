import { useEffect, useState } from 'react';

import { resolveEffectiveTheme, useUiStore } from '@/stores/useUiStore';

export function useEffectiveTheme(): 'light' | 'dark' {
  const theme = useUiStore((s) => s.theme);
  const [effective, setEffective] = useState<'light' | 'dark'>(() => resolveEffectiveTheme(theme));

  useEffect(() => {
    setEffective(resolveEffectiveTheme(theme));
    if (theme !== 'system') return;
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setEffective(resolveEffectiveTheme('system'));
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return effective;
}
