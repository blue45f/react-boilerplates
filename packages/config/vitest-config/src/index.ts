import { defineConfig, ViteUserConfig } from 'vitest/config'

/** Vitest 테스트 설정 옵션 타입 */
export type VitestOptions = NonNullable<ViteUserConfig['test']>

/** 기본 테스트 환경 설정 */
const DEFAULT_CONFIG = {
  globals: true,
  environment: 'jsdom',
} as const

/**
 * Boilerplate 프로젝트를 위한 Vitest 설정을 생성합니다.
 *
 * @param options - Vitest 테스트 설정 옵션
 * @returns Vite UserConfig 객체
 *
 * @example
 * // vitest.config.ts
 * import { boilerplateVitestConfig } from '@boilerplate/vitest-config'
 *
 * export default boilerplateVitestConfig({
 *   setupFiles: ['./src/test/setup.ts'],
 *   coverage: {
 *     reporter: ['text', 'html'],
 *   },
 * })
 */
export const boilerplateVitestConfig = (options: VitestOptions = {}): ViteUserConfig => {
  const { globals, environment, ...restOptions } = options

  return defineConfig({
    test: {
      globals: globals ?? DEFAULT_CONFIG.globals,
      environment: environment ?? DEFAULT_CONFIG.environment,
      ...restOptions,
    },
  })
}
