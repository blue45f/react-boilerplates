import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('문자열 클래스를 결합한다', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('falsy 값을 무시한다', () => {
    expect(cn('px-4', false, null, undefined, '', 'py-2')).toBe('px-4 py-2');
  });

  it('조건부 문자열을 처리한다', () => {
    const isActive = true;
    const isHidden = false;
    expect(cn('base', isActive && 'active', isHidden && 'hidden')).toBe('base active');
  });

  it('객체 문법을 지원한다', () => {
    expect(cn('base', { active: true, hidden: false, visible: true })).toBe(
      'base active visible'
    );
  });

  it('배열을 지원한다', () => {
    expect(cn('base', ['nested-1', 'nested-2'])).toBe('base nested-1 nested-2');
  });

  it('복합 사용을 지원한다', () => {
    expect(cn('base', { active: true }, ['extra'], false, 'last')).toBe(
      'base active extra last'
    );
  });

  it('인자가 없으면 빈 문자열을 반환한다', () => {
    expect(cn()).toBe('');
  });

  it('모든 값이 falsy이면 빈 문자열을 반환한다', () => {
    expect(cn(false, null, undefined)).toBe('');
  });
});
