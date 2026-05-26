import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * React 앱/라이브러리를 위한 Vitest 설정 생성
 *
 * @param {Object} [options]
 * @param {string} [options.root]            - 프로젝트 루트 경로 (기본: process.cwd())
 * @param {string} [options.environment]     - 테스트 환경. 기본: 'jsdom'
 * @param {string[]} [options.include]       - 테스트 파일 glob (기본: src/**\/*.{test,spec}.{ts,tsx})
 * @param {string[]} [options.setupFiles]    - 추가 setup 파일 (기본 setup 뒤에 병합)
 * @param {boolean} [options.css]            - CSS import 처리 여부 (기본: true)
 * @returns {import('vitest/config').UserConfig}
 */
export function createVitestConfig({
  root = process.cwd(),
  environment = 'jsdom',
  include = ['src/**/*.{test,spec}.{ts,tsx}'],
  setupFiles = [],
  css = true,
} = {}) {
  return {
    test: {
      globals: true,
      environment,
      css,
      setupFiles: [resolve(__dirname, 'setup.js'), ...setupFiles],
      include,
      exclude: ['node_modules', 'dist', 'coverage', '.storybook-out', 'storybook-static'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules',
          'dist',
          '**/*.d.ts',
          '**/*.config.*',
          '**/*.stories.*',
          '**/test-setup.*',
          '**/demo/**',
          '**/mocks/**',
          '**/.storybook/**',
          '**/e2e/**',
        ],
      },
    },
  };
}
