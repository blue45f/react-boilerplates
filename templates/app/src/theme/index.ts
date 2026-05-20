import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  globalCss: {
    'html, body': {
      bg: 'bg',
      color: 'fg',
      transitionProperty: 'background-color, color',
      transitionDuration: '0.2s',
    },
    '*::placeholder': {
      color: 'fg.muted',
    },
    '*, *::before, *::after': {
      borderColor: 'border',
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#eef4ff' },
          100: { value: '#dbe6ff' },
          200: { value: '#bdd0ff' },
          300: { value: '#94b1ff' },
          400: { value: '#6987ff' },
          500: { value: '#4361ee' },
          600: { value: '#3043cc' },
          700: { value: '#2735a3' },
          800: { value: '#1f297d' },
          900: { value: '#161d5c' },
        },
      },
      fonts: {
        heading: {
          value: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        body: {
          value: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
      },
      radii: {
        l1: { value: '0.25rem' },
        l2: { value: '0.5rem' },
        l3: { value: '0.75rem' },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: { base: '{colors.brand.500}', _dark: '{colors.brand.400}' } },
          contrast: { value: '#ffffff' },
          fg: { value: { base: '{colors.brand.700}', _dark: '{colors.brand.200}' } },
          muted: { value: { base: '{colors.brand.100}', _dark: '{colors.brand.900}' } },
          subtle: { value: { base: '{colors.brand.50}', _dark: '{colors.brand.900}' } },
          emphasized: {
            value: { base: '{colors.brand.600}', _dark: '{colors.brand.300}' },
          },
          focusRing: {
            value: { base: '{colors.brand.500}', _dark: '{colors.brand.300}' },
          },
        },
        bg: {
          DEFAULT: { value: { base: '#ffffff', _dark: '#0d1117' } },
          subtle: { value: { base: '#f6f8fa', _dark: '#161b22' } },
          muted: { value: { base: '#eef1f4', _dark: '#1f242c' } },
        },
        fg: {
          DEFAULT: { value: { base: '#1a202c', _dark: '#e6edf3' } },
          muted: { value: { base: '#4a5568', _dark: '#9ba6b3' } },
          subtle: { value: { base: '#718096', _dark: '#6e7681' } },
        },
        border: {
          DEFAULT: { value: { base: '#e2e8f0', _dark: '#30363d' } },
          subtle: { value: { base: '#edf0f3', _dark: '#21262d' } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
