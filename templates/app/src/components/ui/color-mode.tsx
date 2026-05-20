import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react';
import { Moon, Sun } from 'lucide-react';
import { ThemeProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import { forwardRef, useEffect } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { useAppStore } from '@/stores/useAppStore';

export type ColorMode = 'light' | 'dark';
export type ColorModePreference = 'light' | 'dark' | 'system';

export function ColorModeProvider(props: ThemeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange enableSystem {...props} />;
}

export interface UseColorModeReturn {
  colorMode: ColorMode;
  preference: ColorModePreference;
  setColorMode: (mode: ColorModePreference) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const storePreference = useAppStore((state) => state.theme);
  const setStoreTheme = useAppStore((state) => state.setTheme);

  // Keep zustand store and next-themes in sync on mount and when theme changes.
  useEffect(() => {
    if (theme && theme !== storePreference) {
      setStoreTheme(theme as ColorModePreference);
    }
  }, [theme, storePreference, setStoreTheme]);

  const setColorMode = (mode: ColorModePreference) => {
    setTheme(mode);
    setStoreTheme(mode);
  };

  const toggleColorMode = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setColorMode(next);
  };

  return {
    colorMode: (resolvedTheme as ColorMode) ?? 'light',
    preference: (theme as ColorModePreference) ?? 'system',
    setColorMode,
    toggleColorMode,
  };
}

export function useColorModeValue<L, D>(light: L, dark: D): L | D {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}

export function ColorModeIcon(props: { size?: number }) {
  const { colorMode } = useColorMode();
  const Icon = colorMode === 'dark' ? Sun : Moon;
  return <Icon size={props.size ?? 18} aria-hidden="true" />;
}

interface ColorModeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'outline' | 'solid' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const ColorModeButton = forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton({ variant = 'ghost', size = 'sm', ...rest }, ref) {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
      <ClientOnly fallback={<Skeleton boxSize="8" />}>
        <IconButton
          ref={ref}
          variant={variant}
          size={size}
          onClick={toggleColorMode}
          aria-label={colorMode === 'dark' ? '라이트모드 전환' : '다크모드 전환'}
          {...rest}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    );
  }
);

export function LightMode(props: { children: React.ReactNode }) {
  return (
    <Span color="fg" colorPalette="gray" colorScheme="light" className="chakra-theme light">
      {props.children}
    </Span>
  );
}

export function DarkMode(props: { children: React.ReactNode }) {
  return (
    <Span color="fg" colorPalette="gray" colorScheme="dark" className="chakra-theme dark">
      {props.children}
    </Span>
  );
}
