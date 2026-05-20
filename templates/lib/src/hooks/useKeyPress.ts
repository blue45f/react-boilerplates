import { useEffect, useRef, useState } from 'react';

export interface UseKeyPressOptions {
  /** 이벤트 타깃 (기본: window) */
  target?: Window | Document | HTMLElement | null;
  /** keydown만 처리하고 누름 상태를 추적할지 여부 */
  event?: 'keydown' | 'keyup';
  /** 매칭 시 호출되는 콜백 */
  onKey?: (event: KeyboardEvent) => void;
}

/** 특정 키 또는 키 배열의 눌림 상태를 추적하는 훅 */
export function useKeyPress(
  targetKey: string | string[],
  options: UseKeyPressOptions = {}
): boolean {
  const { target, event = 'keydown', onKey } = options;
  const [pressed, setPressed] = useState(false);
  const callbackRef = useRef(onKey);

  useEffect(() => {
    callbackRef.current = onKey;
  }, [onKey]);

  useEffect(() => {
    const node = (target ?? (typeof window !== 'undefined' ? window : null)) as EventTarget | null;
    if (!node) return;
    const keys = Array.isArray(targetKey) ? targetKey : [targetKey];
    const downHandler = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (keys.includes(ke.key)) {
        if (event === 'keydown') setPressed(true);
        callbackRef.current?.(ke);
      }
    };
    const upHandler = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (keys.includes(ke.key)) {
        setPressed(false);
        if (event === 'keyup') callbackRef.current?.(ke);
      }
    };
    node.addEventListener('keydown', downHandler);
    node.addEventListener('keyup', upHandler);
    return () => {
      node.removeEventListener('keydown', downHandler);
      node.removeEventListener('keyup', upHandler);
    };
  }, [targetKey, target, event]);

  return pressed;
}
