import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * React 앱을 위한 Vite 설정 생성 (SPA 모드)
 *
 * @param {Object} [options]
 * @param {string} [options.root]  - 프로젝트 루트 경로 (기본: process.cwd())
 * @param {number} [options.port]  - 개발 서버 포트 (기본: 3000)
 * @param {boolean} [options.open] - 개발 서버 자동 오픈 (기본: true)
 * @returns {import('vite').UserConfig}
 */
export function createAppConfig({ root = process.cwd(), port = 3000, open = true } = {}) {
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
} = {}) {
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
