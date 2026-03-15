import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../utils/cn';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

const variantStyles = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
};

const iconMap = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="text-lg flex-shrink-0" aria-hidden="true">
        {iconMap[variant]}
      </span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium mb-1">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="닫기"
        >
          ✕
        </button>
      )}
    </div>
  );
}
