import { forwardRef, useId, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../utils/cn';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
}

/** hover/focus 시 표시되는 간단한 툴팁 */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { content, placement = 'top', children, className, ...props },
  ref
) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  return (
    <span
      ref={ref}
      className={cn(styles.wrapper, className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      aria-describedby={visible ? id : undefined}
      {...props}
    >
      {children}
      {visible && (
        <span role="tooltip" id={id} className={cn(styles.tooltip, styles[placement])}>
          {content}
        </span>
      )}
    </span>
  );
});
