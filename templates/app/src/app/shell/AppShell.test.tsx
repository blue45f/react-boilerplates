import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { Suspense } from 'react'
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import styles from './AppShell.module.css'

import Footer from '@/app/shell/Footer'
import Header from '@/app/shell/Header'
import About from '@/domains/content/about'
import Home from '@/domains/marketing/home'
import NotFound from '@/domains/system/not-found'
import { useAppStore } from '@/infrastructure/storage'
import ErrorBoundary from '@/shared/ui/ErrorBoundary'
import Loading from '@/shared/ui/Loading'
import SkipLink from '@/shared/ui/SkipLink'
import { ToastProvider } from '@/shared/ui/Toast'

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState(useAppStore.getInitialState(), true)
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })
})

function AppShell() {
  return (
    <div className={styles.app}>
      <SkipLink />
      <Header />
      <main id="main-content" className={styles.main} role="main">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

function renderApp(initial = '/') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppShell />,
        children: [
          { index: true, element: <Home /> },
          { path: 'about', element: <About /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
    { initialEntries: [initial] }
  )
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  )
}

describe('App', () => {
  it('renders the Home page at "/"', async () => {
    renderApp('/')
    expect(
      await screen.findByRole('heading', { level: 1, name: /React 프로젝트를/ })
    ).toBeInTheDocument()
  })

  it('renders the About page at "/about"', async () => {
    renderApp('/about')
    expect(await screen.findByRole('heading', { name: '기술 스택' })).toBeInTheDocument()
  })

  it('renders the NotFound page at an unknown path', async () => {
    renderApp('/unknown-path')
    expect(await screen.findByText('404')).toBeInTheDocument()
    expect(await screen.findByText('페이지를 찾을 수 없습니다')).toBeInTheDocument()
  })

  it('renders the SkipLink as the first focusable element', async () => {
    const { container } = renderApp('/')
    const skip = container.querySelector('a.skip-link')
    expect(skip).not.toBeNull()
    expect(skip).toHaveAttribute('href', '#main-content')
    const firstAnchor = container.querySelector('a')
    expect(firstAnchor).toBe(skip)
  })

  it('renders the Header logo "React App"', async () => {
    renderApp('/')
    expect(screen.getByRole('link', { name: 'React App' })).toBeInTheDocument()
  })

  it('renders the Footer copyright', async () => {
    renderApp('/')
    const year = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(`${year} React App\\. All rights reserved\\.`))
    ).toBeInTheDocument()
  })
})
