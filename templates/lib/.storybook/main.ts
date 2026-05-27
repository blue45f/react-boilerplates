import type { StorybookConfig } from '@storybook/react-vite';
import type { PluginOption } from 'vite';

const removeDeclarationPlugins = (
  plugins: PluginOption[] | undefined
): PluginOption[] | undefined =>
  plugins?.filter((plugin) => {
    if (!plugin || Array.isArray(plugin) || typeof plugin === 'string') return true;
    return plugin.name !== 'unplugin-dts' && plugin.name !== 'unplugin:dts';
  });

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return {
      ...config,
      plugins: removeDeclarationPlugins(config.plugins),
      build: {
        ...config.build,
        chunkSizeWarningLimit: 1200,
      },
    };
  },
};

export default config;
