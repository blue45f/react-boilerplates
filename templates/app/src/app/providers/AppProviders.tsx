import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router'

import { appQueryClient } from './queryClient'

import { router as defaultRouter } from '@/app/routes'
import ToastProvider from '@/shared/ui/Toast'

interface AppProvidersProps {
  queryClient?: QueryClient
  router?: typeof defaultRouter
  showDevtools?: boolean
}

function AppProviders({
  queryClient = appQueryClient,
  router = defaultRouter,
  showDevtools = import.meta.env.DEV,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
      {showDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default AppProviders
