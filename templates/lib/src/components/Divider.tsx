import { forwardRef } from 'react';

import { cn } from '../utils/cn';

import styles from './Divider.module.css';

import type { HTMLAttributes, ReactNode } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: ReactNode;
}

/** 가로/세로 구분선, label 옵션 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = 'horizontal', label, className, ...props },
  ref
) {
  if (orientation === 'vertical') {
    return (
      <span
        ref={ref as unknown as React.Ref<HTMLSpanElement>}
        role="separator"
        aria-orientation="vertical"
        className={cn(styles.vertical, className)}
      />
    );
  }
  if (label) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(styles.horizontal, className)}
        {...props}
      >
        <span>{label}</span>
      </div>
    );
  }
  return (
    <hr
      ref={ref as unknown as React.Ref<HTMLHRElement>}
      className={cn(styles.horizontalBare, className)}
    />
  );
});
