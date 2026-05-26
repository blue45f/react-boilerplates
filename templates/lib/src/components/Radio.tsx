import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';

import { cn } from '../utils/cn';

import styles from './Checkbox.module.css';

import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (next: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  value: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, className, id, value, name: nameProp, checked: checkedProp, onChange, ...props },
  ref
) {
  const ctx = useContext(RadioGroupContext);
  const reactId = useId();
  const inputId = id ?? `rl-radio-${reactId}`;
  const name = ctx?.name ?? nameProp;
  const checked = ctx ? ctx.value === value : checkedProp;
  const input = (
    <input
      ref={ref}
      id={inputId}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={(e) => {
        onChange?.(e);
        ctx?.onChange?.(value);
      }}
      className={cn(styles.input, styles.radioInput, className)}
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

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
}

/** Radio들을 묶는 그룹 컴포넌트 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    name,
    value: controlled,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    className,
    children,
    ...props
  },
  ref
) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : internal;

  const onChange = useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const ctx = useMemo<RadioGroupContextValue>(
    () => ({ name, value, onChange }),
    [name, value, onChange]
  );

  return (
    <RadioGroupContext.Provider value={ctx}>
      <div
        ref={ref}
        role="radiogroup"
        className={cn(styles.group, orientation === 'vertical' && styles.groupVertical, className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});
