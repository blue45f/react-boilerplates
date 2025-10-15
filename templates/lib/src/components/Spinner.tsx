import { cn } from '../utils/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeStyles = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4',
};

export function Spinner({ size = 'md', className, label = '로딩 중' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'inline-block animate-spin rounded-full border-solid border-blue-500 border-t-transparent',
        sizeStyles[size],
        className
      )}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}
