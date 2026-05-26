import { forwardRef, useEffect, useId, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

import { useFocusTrap } from '../hooks/useFocusTrap';
import { cn } from '../utils/cn';

import styles from './Modal.module.css';

import type { HTMLAttributes, ReactNode } from 'react';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
  /** 마운트 컨테이너 (기본 document.body) */
  container?: Element | null;
  children: ReactNode;
}

/** 접근성 다이얼로그 (포커스 트랩 + ESC + 백드롭 클릭으로 닫힘) */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    onClose,
    title,
    footer,
    size = 'md',
    closeOnEsc = true,
    closeOnBackdrop = true,
    container,
    className,
    children,
    ...props
  },
  ref
) {
  const trapRef = useFocusTrap<HTMLDivElement>(open);
  const titleId = useId();
  useImperativeHandle(ref, () => trapRef.current as HTMLDivElement, [trapRef]);

  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (!open || typeof document === 'undefined') return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;
  const target = container ?? document.body;

  return createPortal(
    <div className={styles.overlay}>
      {closeOnBackdrop && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="모달 닫기"
          onClick={onClose}
          data-testid="modal-overlay"
        />
      )}
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cn(styles.dialog, styles[size], className)}
        {...props}
      >
        {title && (
          <div className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <button type="button" className={styles.close} aria-label="닫기" onClick={onClose}>
              ✕
            </button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    target
  );
});
