import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * React 앱/라이브러리를 위한 Vitest 설정 생성
 * @param {Object} options
 * @param {string} options.root - 프로젝트 루트 경로
 * @returns {import('vitest/config').UserConfig}
 */
export function createVitestConfig({ root = process.cwd() } = {}) {
  return {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [resolve(__dirname, 'setup.js')],
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      exclude: ['node_modules', 'dist'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: ['node_modules', 'dist', '**/*.d.ts', '**/*.config.*'],
      },
    },
  };
}
