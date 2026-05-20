import { ChakraProvider } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { system } from '@/theme';

import { ColorModeProvider } from './color-mode';

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
