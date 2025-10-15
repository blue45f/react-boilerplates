type ClassValue = string | undefined | null | false | Record<string, boolean> | ClassValue[];

/**
 * 클래스명을 조건부로 결합하는 유틸리티 함수
 *
 * @example
 * cn('px-4', 'py-2')                           // 'px-4 py-2'
 * cn('px-4', false && 'hidden')                 // 'px-4'
 * cn('px-4', { 'text-red': true, 'bg-blue': false }) // 'px-4 text-red'
 */
export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const cls of classes) {
    if (!cls) continue;

    if (typeof cls === 'string') {
      result.push(cls);
    } else if (Array.isArray(cls)) {
      const nested = cn(...cls);
      if (nested) result.push(nested);
    } else if (typeof cls === 'object') {
      for (const [key, active] of Object.entries(cls)) {
        if (active) result.push(key);
      }
    }
  }

  return result.join(' ');
}
