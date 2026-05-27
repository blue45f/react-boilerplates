import { createBrowserRouter, type RouteObject } from 'react-router'

import type { ComponentType } from 'react'

import App from '@/app/shell'
import Loading from '@/shared/ui/Loading'
import RouteError from '@/shared/ui/RouteError'

interface PageModule {
  default: ComponentType
}

function lazyPage(loadPage: () => Promise<PageModule>) {
  return async () => {
    const { default: Component } = await loadPage()
    return { Component }
  }
}

export const routes = [
  {
    path: '/',
    Component: App,
    ErrorBoundary: RouteError,
    children: [
      {
        index: true,
        HydrateFallback: Loading,
        lazy: lazyPage(() => import('@/domains/marketing/home')),
      },
      {
        path: 'about',
        HydrateFallback: Loading,
        lazy: lazyPage(() => import('@/domains/content/about')),
      },
      {
        path: 'todos',
        HydrateFallback: Loading,
        lazy: lazyPage(() => import('@/domains/todos/list')),
      },
      {
        path: '*',
        HydrateFallback: Loading,
        lazy: lazyPage(() => import('@/domains/system/not-found')),
      },
    ],
  },
] satisfies RouteObject[]

export const router = createBrowserRouter(routes)
