import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id ?? (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={cn(
            'rounded border px-3 py-2 text-base transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1',
            'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300',
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
