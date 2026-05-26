import { forwardRef } from 'react';

import { cn } from '../utils/cn';

import styles from './Tag.module.css';

import type { HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** 제공 시 닫기 버튼이 표시된다 */
  onRemove?: () => void;
  removeLabel?: string;
}

/** 닫기 버튼을 가질 수 있는 태그/칩 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { children, className, onRemove, removeLabel = '제거', ...props },
  ref
) {
  return (
    <span ref={ref} className={cn(styles.tag, className)} {...props}>
      {children}
      {onRemove && (
        <button type="button" className={styles.close} aria-label={removeLabel} onClick={onRemove}>
          ✕
        </button>
      )}
    </span>
  );
});
