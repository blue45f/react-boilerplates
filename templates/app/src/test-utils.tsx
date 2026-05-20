import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

interface ProvidersProps {
  children: ReactNode;
  route?: string;
}

function AllProviders({ children, route = '/' }: ProvidersProps) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: RenderOptions & { route?: string }
) {
  const { route, ...rest } = options ?? {};
  return render(ui, {
    wrapper: ({ children }) => <AllProviders route={route}>{children}</AllProviders>,
    ...rest,
  });
}

export * from '@testing-library/react';
