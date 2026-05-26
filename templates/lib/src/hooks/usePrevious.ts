import { useState } from 'react';

/** 이전 렌더의 값을 반환하는 훅 */
export function usePrevious<T>(value: T): T | undefined {
  const [state, setState] = useState<{ current: T; previous: T | undefined }>(() => ({
    current: value,
    previous: undefined,
  }));

  if (!Object.is(state.current, value)) {
    setState({ current: value, previous: state.current });
  }

  return state.previous;
}
