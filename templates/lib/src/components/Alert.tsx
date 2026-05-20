import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../utils/cn';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

const iconMap: Record<AlertVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

/** 알림 메시지 박스 (info/success/warning/error) */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'info', title, children, onClose, className, ...props },
  ref
) {
  return (
    <div ref={ref} role="alert" className={cn(styles.alert, styles[variant], className)} {...props}>
      <span className={styles.icon} aria-hidden="true">
        {iconMap[variant]}
      </span>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.body}>{children}</div>
      </div>
      {onClose && (
        <button type="button" onClick={onClose} className={styles.close} aria-label="닫기">
          ✕
        </button>
      )}
    </div>
  );
});
