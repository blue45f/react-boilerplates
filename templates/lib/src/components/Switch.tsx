import { forwardRef, useCallback, useState } from 'react';

import { cn } from '../utils/cn';

import styles from './Switch.module.css';

import type { ButtonHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/** role="switch"인 토글 컴포넌트 (controlled/uncontrolled 모두 지원) */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked: controlled,
    defaultChecked = false,
    onCheckedChange,
    disabled,
    className,
    onClick,
    onKeyDown,
    ...props
  },
  ref
) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = controlled !== undefined;
  const checked = isControlled ? controlled : internal;

  const toggle = useCallback(() => {
    if (disabled) return;
    if (!isControlled) setInternal(!checked);
    onCheckedChange?.(!checked);
  }, [checked, disabled, isControlled, onCheckedChange]);

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cn(styles.switch, checked && styles.checked, className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggle();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggle();
        }
      }}
      {...props}
    >
      <span className={styles.thumb} aria-hidden="true" />
    </button>
  );
});
