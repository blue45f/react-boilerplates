import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * React 앱을 위한 Vite 설정 생성
 * @param {Object} options
 * @param {string} options.root - 프로젝트 루트 경로
 * @returns {import('vite').UserConfig}
 */
export function createAppConfig({ root = process.cwd() } = {}) {
  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': resolve(root, 'src'),
      },
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
}

/**
 * React 라이브러리를 위한 Vite 설정 생성
 * @param {Object} options
 * @param {string} options.name - 라이브러리 이름
 * @param {string} options.entry - 엔트리 파일 경로
 * @param {string} options.root - 프로젝트 루트 경로
 * @returns {import('vite').UserConfig}
 */
export function createLibConfig({ name, entry = 'src/index.ts', root = process.cwd() } = {}) {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      dts({
        insertTypesEntry: true,
        rollupTypes: true,
      }),
    ],
    build: {
      lib: {
        entry: resolve(root, entry),
        name,
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
        },
      },
      sourcemap: true,
    },
  };
}
