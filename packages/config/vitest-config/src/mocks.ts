import { vi } from 'vitest'
import '@testing-library/jest-dom'

/**
 * localStorage를 모킹합니다.
 * 테스트에서 localStorage 기능을 사용할 때 호출하세요.
 */
export const mockLocalStorage = (): void => {
  const storageMock: Storage = {
    length: 0,
    key: vi.fn(),
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }

  Object.defineProperty(window, 'localStorage', {
    value: storageMock,
    writable: true,
    configurable: true,
  })
}

/**
 * IntersectionObserver를 모킹합니다.
 * 무한 스크롤, lazy loading 등을 테스트할 때 사용하세요.
 */
export const mockIntersectionObserver = (): void => {
  const IntersectionObserverMock = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn().mockReturnValue([]),
  }))

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
  })
}

/**
 * ResizeObserver를 모킹합니다.
 * 요소 크기 변경 감지를 테스트할 때 사용하세요.
 */
export const mockResizeObserver = (): void => {
  const ResizeObserverMock = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserverMock,
  })
}

/**
 * matchMedia를 모킹합니다.
 * 반응형 디자인 테스트에 사용하세요.
 *
 * @param defaultMatches - 기본 matches 값 (기본: false)
 */
export const mockMatchMedia = (defaultMatches = false): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: defaultMatches,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

/**
 * window.location을 모킹합니다.
 * 페이지 이동 테스트에 사용하세요.
 */
export const mockLocation = (): void => {
  const locationMock = {
    href: 'http://localhost/',
    origin: 'http://localhost',
    pathname: '/',
    search: '',
    hash: '',
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  }

  Object.defineProperty(window, 'location', {
    value: locationMock,
    writable: true,
    configurable: true,
  })
}

/**
 * navigator를 모킹합니다.
 * navigator API 테스트에 사용하세요.
 */
export const mockNavigator = (): void => {
  Object.defineProperty(window, 'navigator', {
    value: {
      ...window.navigator,
      sendBeacon: vi.fn().mockReturnValue(true),
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue(''),
      },
    },
    writable: true,
    configurable: true,
  })
}

/**
 * 테스트에서 자주 사용되는 모든 브라우저 API를 한 번에 모킹합니다.
 *
 * @example
 * beforeEach(() => {
 *   setupCommonMocks()
 * })
 */
export const setupCommonMocks = (): void => {
  mockLocalStorage()
  mockIntersectionObserver()
  mockResizeObserver()
  mockMatchMedia()
  mockLocation()
  mockNavigator()
}
