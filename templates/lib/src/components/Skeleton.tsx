import { forwardRef } from 'react';

import { cn } from '../utils/cn';

import styles from './Skeleton.module.css';

import type { CSSProperties, HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
}

/** 로딩 자리표시용 스켈레톤 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { width = '100%', height = 16, circle = false, className, style, ...props },
  ref
) {
  const inlineStyle: CSSProperties = {
    width,
    height: circle ? width : height,
    ...style,
  };
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(styles.skeleton, circle && styles.circle, className)}
      style={inlineStyle}
      {...props}
    />
  );
});
