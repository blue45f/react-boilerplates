import { clsx } from 'clsx';

import type { ClassValue } from 'clsx';

/**
 * 클래스명을 조건부로 결합하는 유틸리티 함수 (clsx 래퍼)
 *
 * @example
 * cn('px-4', 'py-2')                                    // 'px-4 py-2'
 * cn('px-4', false && 'hidden')                          // 'px-4'
 * cn('px-4', { 'text-red': true, 'bg-blue': false })    // 'px-4 text-red'
 */
export function cn(...classes: ClassValue[]): string {
  return clsx(...classes);
}
