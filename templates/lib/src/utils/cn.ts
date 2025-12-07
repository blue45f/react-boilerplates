/**
 * 클래스명을 조건부로 결합하는 유틸리티 함수
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
