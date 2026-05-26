import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../utils/cn';

import styles from './Toast.module.css';

import type { ReactNode } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  title?: string;
  description?: ReactNode;
  variant?: ToastVariant;
  /** ms, 0이면 자동 닫힘 비활성 */
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  /** 자동 닫힘 기본 시간(ms) */
  defaultDuration?: number;
}

let toastCounter = 0;

export function ToastProvider({ children, defaultDuration = 4000 }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = `rl-toast-${++toastCounter}`;
      const item: ToastItem = { id, ...options };
      setItems((prev) => [...prev, item]);
      const duration = options.duration ?? defaultDuration;
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [defaultDuration, dismiss]
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className={styles.region} role="region" aria-label="알림">
            {items.map((item) => (
              <div
                key={item.id}
                role="status"
                className={cn(styles.toast, styles[item.variant ?? 'info'])}
              >
                <div className={styles.content}>
                  {item.title && <div className={styles.title}>{item.title}</div>}
                  {item.description && <div className={styles.body}>{item.description}</div>}
                </div>
                <button
                  type="button"
                  aria-label="닫기"
                  className={styles.close}
                  onClick={() => dismiss(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

/** 토스트를 생성/해제하는 훅. ToastProvider 안에서만 사용 가능 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast는 ToastProvider 안에서만 사용할 수 있습니다.');
  return ctx;
}
