import { forwardRef, useId } from 'react';

import { cn } from '../utils/cn';

import styles from './Checkbox.module.css';

import type { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

/** label과 함께 사용하는 체크박스 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, ...props },
  ref
) {
  const reactId = useId();
  const inputId = id ?? `rl-checkbox-${reactId}`;
  const input = (
    <input
      ref={ref}
      id={inputId}
      type="checkbox"
      className={cn(styles.input, className)}
      {...props}
    />
  );
  if (!label) return input;
  return (
    <label htmlFor={inputId} className={styles.label}>
      {input}
      <span>{label}</span>
    </label>
  );
});
