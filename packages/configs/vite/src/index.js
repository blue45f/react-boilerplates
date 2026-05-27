import { resolve } from 'path';

import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const createAlias = (root, aliases = {}) => ({
  '@': resolve(root, 'src'),
  '@components': resolve(root, 'src/components'),
  '@pages': resolve(root, 'src/pages'),
  '@hooks': resolve(root, 'src/hooks'),
  '@services': resolve(root, 'src/services'),
  '@utils': resolve(root, 'src/utils'),
  '@types': resolve(root, 'src/types'),
  '@store': resolve(root, 'src/store'),
  '@assets': resolve(root, 'src/assets'),
  '@features': resolve(root, 'src/features'),
  '@router': resolve(root, 'src/router'),
  '@i18n': resolve(root, 'src/i18n'),
  ...aliases,
});

const createReactPlugins = ({ compiler = true } = {}) =>
  compiler ? [react(), babel({ presets: [reactCompilerPreset()] })] : [react()];

/**
 * React 앱을 위한 Vite 설정 생성 (SPA 모드)
 *
 * @param {Object} [options]
 * @param {string} [options.root]  - 프로젝트 루트 경로 (기본: process.cwd())
 * @param {number} [options.port]  - 개발 서버 포트 (기본: 5173)
 * @param {boolean} [options.open] - 개발 서버 자동 오픈 (기본: true)
 * @returns {import('vite').UserConfig}
 */
export function createAppConfig({
  root = process.cwd(),
  port = 5173,
  open = true,
  aliases = {},
  compiler = true,
} = {}) {
  return {
    plugins: createReactPlugins({ compiler }),
    resolve: {
      alias: createAlias(root, aliases),
    },
    build: {
      target: 'es2022',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'vendor';
            }
            if (id.includes('node_modules/react-router')) {
              return 'router';
            }
            if (id.includes('node_modules/@tanstack/react-query')) {
              return 'query';
            }
            if (
              id.includes('node_modules/react-hook-form') ||
              id.includes('node_modules/@hookform/') ||
              id.includes('node_modules/zod')
            ) {
              return 'form';
            }
            if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
              return 'i18n';
            }
          },
        },
      },
    },
    server: {
      port,
      open,
    },
  };
}

/**
 * React 라이브러리를 위한 Vite 설정 생성 (Library 모드, ES/CJS 듀얼 빌드 + d.ts)
 *
 * @param {Object} options
 * @param {string} options.name        - 라이브러리 글로벌 이름 (UMD에서 사용)
 * @param {string} [options.entry]     - 엔트리 파일 경로 (기본: src/index.ts)
 * @param {string} [options.root]      - 프로젝트 루트 경로 (기본: process.cwd())
 * @param {string[]} [options.external] - 추가 external 의존성
 * @returns {import('vite').UserConfig}
 */
export function createLibConfig({
  name,
  entry = 'src/index.ts',
  root = process.cwd(),
  external = [],
  aliases = {},
  compiler = true,
} = {}) {
  return {
    plugins: [
      ...createReactPlugins({ compiler }),
      dts({
        insertTypesEntry: true,
        rollupTypes: true,
      }),
    ],
    resolve: {
      alias: createAlias(root, aliases),
    },
    build: {
      lib: {
        entry: resolve(root, entry),
        name,
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      rollupOptions: {
        checks: {
          pluginTimings: false,
        },
        external: ['react', 'react-dom', 'react/jsx-runtime', ...external],
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
