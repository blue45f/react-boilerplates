import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import { cn } from '../utils/cn';
import styles from './Progress.module.css';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  label?: string;
}

/** 진행 상태 바 (결정/미결정 모두 지원) */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = 0, max = 100, indeterminate = false, label, className, ...props },
  ref
) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      aria-label={label}
      className={cn(styles.track, indeterminate && styles.indeterminate, className)}
      {...props}
    >
      <div className={styles.bar} style={indeterminate ? undefined : { width: `${percent}%` }} />
    </div>
  );
});
