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

import styles from './Tabs.module.css';

import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';

interface TabsContextValue {
  value: string;
  setValue: (next: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component}는 Tabs.Root 안에서 사용해야 합니다.`);
  return ctx;
}

export interface TabsRootProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(function TabsRoot(
  { defaultValue, value: controlled, onValueChange, children, className, ...props },
  ref
) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : internal;
  const baseId = useId();

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const ctx = useMemo<TabsContextValue>(
    () => ({ value, setValue, baseId }),
    [value, setValue, baseId]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div ref={ref} className={cn(styles.root, className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { children, className, ...props },
  ref
) {
  return (
    <div ref={ref} role="tablist" className={cn(styles.list, className)} {...props}>
      {children}
    </div>
  );
});

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { value, disabled, children, className, onKeyDown, ...props },
  ref
) {
  const ctx = useTabsContext('Tabs.Trigger');
  const selected = ctx.value === value;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const target = event.currentTarget;
    const list = target.parentElement;
    if (!list) return;
    const triggers = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
    );
    const idx = triggers.indexOf(target);
    if (idx === -1) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      triggers[(idx + 1) % triggers.length].focus();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      triggers[(idx - 1 + triggers.length) % triggers.length].focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      triggers[0].focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      triggers[triggers.length - 1].focus();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${ctx.baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={() => ctx.setValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(styles.trigger, selected && styles.active, className)}
      {...props}
    >
      {children}
    </button>
  );
});

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { value, children, className, ...props },
  ref
) {
  const ctx = useTabsContext('Tabs.Content');
  if (ctx.value !== value) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      tabIndex={0}
      className={cn(styles.content, className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
