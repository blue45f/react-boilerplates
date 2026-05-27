import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import ThemedProviders from './ThemedProviders';

import type { QueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { adminQueryClient } from '@/app/providers/queryClient';
import AdminRoutes from '@/app/routes';

interface AppProvidersProps {
  children?: ReactNode;
  queryClient?: QueryClient;
  showDevtools?: boolean;
}

function AppProviders({
  children,
  queryClient = adminQueryClient,
  showDevtools = import.meta.env.DEV,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemedProviders>
        <BrowserRouter>{children ?? <AdminRoutes />}</BrowserRouter>
      </ThemedProviders>
      {showDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default AppProviders;
