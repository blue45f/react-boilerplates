import { useEffect, useRef } from 'react';

/** 이전 렌더의 값을 반환하는 훅 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
