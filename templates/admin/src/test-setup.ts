import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './test/mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });

  if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  }

  if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
    class ResizeObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    (window as unknown as { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver =
      ResizeObserverMock;
  }

  if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
    const original = window.getComputedStyle.bind(window);
    window.getComputedStyle = ((el: Element, pseudo?: string | null) => {
      if (pseudo) {
        return {
          getPropertyValue: () => '',
          getPropertyPriority: () => '',
          item: () => '',
          removeProperty: () => '',
          setProperty: () => {},
          getPropertyValueAsString: () => '',
          getPropertyShorthand: () => '',
          setPropertyPriority: () => '',
          length: 0,
        } as unknown as CSSStyleDeclaration;
      }

      try {
        return original(el, pseudo ?? undefined);
      } catch {
        return {
          getPropertyValue: () => '',
        } as unknown as CSSStyleDeclaration;
      }
    }) as typeof window.getComputedStyle;
  }
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
