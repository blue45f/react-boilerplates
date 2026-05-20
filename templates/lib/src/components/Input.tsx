import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '../utils/cn';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

/** label/error/helperText, size, addon을 지원하는 입력 컴포넌트 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    className,
    id,
    disabled,
    size = 'md',
    leftAddon,
    rightAddon,
    ...props
  },
  ref
) {
  const reactId = useId();
  const inputId = id ?? `rl-input-${reactId}`;
  const sizeKey = `size${size.charAt(0).toUpperCase() + size.slice(1)}` as
    | 'sizeSm'
    | 'sizeMd'
    | 'sizeLg';

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={cn(
          styles.field,
          styles[sizeKey],
          error && styles.fieldError,
          disabled && styles.disabled
        )}
      >
        {leftAddon && <span className={cn(styles.addon, styles.leftAddon)}>{leftAddon}</span>}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn(styles.input, className)}
          {...props}
        />
        {rightAddon && <span className={cn(styles.addon, styles.rightAddon)}>{rightAddon}</span>}
      </div>
      {error && (
        <p id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className={styles.helper}>
          {helperText}
        </p>
      )}
    </div>
  );
});
