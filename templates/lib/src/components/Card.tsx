import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../utils/cn';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** 헤더/바디/푸터로 구성 가능한 카드 컨테이너 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, interactive = false, tabIndex, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(styles.card, interactive && styles.interactive, className)}
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn(styles.header, className)} {...props}>
      {children}
    </div>
  );
});

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn(styles.body, className)} {...props}>
      {children}
    </div>
  );
});

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn(styles.footer, className)} {...props}>
      {children}
    </div>
  );
});
