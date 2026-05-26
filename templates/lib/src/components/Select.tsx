import { forwardRef, useId } from 'react';

import { cn } from '../utils/cn';

import styles from './Select.module.css';

import type { ReactNode, SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options?: SelectOption[];
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  children?: ReactNode;
}

/** 네이티브 select 기반의 셀렉트 컴포넌트 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, error, size = 'md', className, id, placeholder, children, ...props },
  ref
) {
  const reactId = useId();
  const selectId = id ?? `rl-select-${reactId}`;
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={error ? true : undefined}
        className={cn(
          styles.select,
          size === 'sm' && styles.sm,
          size === 'lg' && styles.lg,
          error && styles.error,
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {error && (
        <p className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
