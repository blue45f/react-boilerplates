import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import { cn } from '../utils/cn';
import styles from './Spinner.module.css';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

/** 접근성 라벨이 포함된 로딩 스피너 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  { size = 'md', className, label = '로딩 중', ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(styles.spinner, styles[size], className)}
      {...props}
    >
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
});
