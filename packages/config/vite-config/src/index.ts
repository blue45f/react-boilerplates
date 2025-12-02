import browsers from '@boilerplate/browserslist-config'
import preserveDirectives from 'rollup-plugin-preserve-directives'
import { defineConfig, UserConfig } from 'vite'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import tsconfigPaths from 'vite-tsconfig-paths'

import { Options } from './types'

/** 기본 빌드 출력 디렉토리 */
const DEFAULT_OUT_DIR = 'dist'

/** 기본 진입점 파일 */
const DEFAULT_ENTRY = 'src/index.ts'

/**
 * 라이브러리 모드일 때의 빌드 설정을 생성합니다.
 */
const createLibraryConfig = (entry: Options['entry']) => ({
  entry: entry ?? DEFAULT_ENTRY,
  formats: ['es', 'cjs'] as ('es' | 'cjs')[],
  fileName: (format: string) => (format === 'cjs' ? 'cjs/[name].cjs' : 'esm/[name].js'),
})

/**
 * Boilerplate 프로젝트를 위한 Vite 설정을 생성합니다.
 *
 * @param options - Vite 설정 옵션
 * @returns Vite UserConfig 객체
 *
 * @example
 * // vite.config.ts
 * import { boilerplateViteConfig } from '@boilerplate/vite-config'
 *
 * export default boilerplateViteConfig({
 *   entry: './src/index.ts',
 *   srcDir: './src',
 *   isLibraryMode: true,
 * })
 */
export const boilerplateViteConfig = (options: Options): UserConfig => {
  const { isLibraryMode, externalDeps = [], tsconfigPath, entry, build } = options

  const plugins = [
    externalizeDeps({ include: externalDeps }),
    isLibraryMode && preserveDirectives(),
    tsconfigPaths({
      projects: tsconfigPath ? [tsconfigPath] : undefined,
    }),
  ].filter(Boolean)

  return defineConfig({
    plugins,
    build: {
      outDir: build?.outDir ?? DEFAULT_OUT_DIR,
      sourcemap: true,
      target: build?.target ?? browsers,
      lib: isLibraryMode ? createLibraryConfig(entry) : undefined,
      rollupOptions: isLibraryMode
        ? {
            output: {
              preserveModules: true,
            },
          }
        : undefined,
    },
  })
}

export type { Options } from './types'
