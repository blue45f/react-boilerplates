import path from 'path'
import fs from 'fs/promises'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import builtins from 'builtin-modules'

/**
 * Rollup 설정을 생성하는 함수입니다.
 * @param {Object} options - 옵션 객체
 * @param {string} options.baseUrl - 패키지 디렉토리 경로
 * @returns {Promise<Array>} - Rollup 설정 배열
 */
export async function boilerplateRollupConfig({ baseUrl }) {
  // package.json 파일의 경로를 설정합니다.
  const packageJSONPath = path.join(baseUrl, 'package.json')

  // package.json 파일을 비동기로 읽어옵니다.
  const packageJSON = JSON.parse(await fs.readFile(packageJSONPath, 'utf-8'))

  // exports 필드가 정의되어 있는지 확인합니다.
  if (packageJSON.exports == null) {
    throw new Error('package.json의 exports 필드를 정의해주세요.')
  }

  // 엔트리 포인트 목록을 가져옵니다.
  const entrypoints = Object.keys(packageJSON.exports).filter((x) => x !== './package.json')

  // 외부 모듈로 처리할 패키지를 설정합니다.
  const external = (pkg) => {
    const dependencies = Object.keys(packageJSON.dependencies || {})
    const peerDependencies = Object.keys(packageJSON.peerDependencies || {})
    const externals = [...dependencies, ...peerDependencies, ...builtins]

    return externals.some((externalPkg) => {
      return pkg.startsWith(externalPkg)
    })
  }

  // 처리할 파일 확장자를 설정합니다.
  const extensions = ['.js', '.jsx', '.ts', '.tsx']

  /**
   * 공통 JS 빌드 설정을 생성하는 함수입니다.
   * @param {string} input - 입력 파일 경로
   * @param {string} output - 출력 파일 경로
   * @param {string} format - 모듈 형식 ('cjs' 또는 'es')
   * @returns {Object} - Rollup 설정 객체
   */
  function buildJS(input, output, format) {
    const isESMFormat = format === 'es'

    return {
      input,
      external,
      output: [
        {
          format,
          ...(isESMFormat
            ? {
                dir: path.dirname(output),
                entryFileNames: `[name]${path.extname(output)}`,
                preserveModules: true,
                preserveModulesRoot: path.dirname(input),
              }
            : { file: output }),
          sourcemap: true,
        },
      ],
      plugins: [
        nodeResolve({
          extensions,
        }),
        commonjs(),
        babel({
          extensions,
          babelHelpers: 'bundled',
          rootMode: 'upward',
        }),
        json(),
      ],
    }
  }

  /**
   * CommonJS 빌드 설정을 생성하는 함수입니다.
   * @param {string} input - 입력 파일 경로
   * @param {string} output - 출력 파일 경로
   * @returns {Object} - Rollup 설정 객체
   */
  function buildCJS(input, output) {
    return buildJS(input, output, 'cjs')
  }

  /**
   * ESM 빌드 설정을 생성하는 함수입니다.
   * @param {string} input - 입력 파일 경로
   * @param {string} output - 출력 파일 경로
   * @returns {Object} - Rollup 설정 객체
   */
  function buildESM(input, output) {
    return buildJS(input, output, 'es')
  }

  const hasPublishConfig = packageJSON.publishConfig != null

  // 엔트리 포인트마다 빌드 설정을 생성합니다.
  return entrypoints.flatMap((entrypoint) => {
    // publishConfig 필드가 있는 경우, 해당 필드를 사용합니다.
    const paths = hasPublishConfig
      ? {
          input: packageJSON.exports,
          output: packageJSON.publishConfig.exports,
        }
      : packageJSON.exports

    // CJS 엔트리 포인트를 처리합니다.
    const cjsEntrypoint = path.resolve(
      baseUrl,
      ensure(handleBuildPath(paths.input, entrypoint, 'cjs'), 'CJS 엔트리 포인트를 찾을 수 없습니다.'),
    )
    // CJS 출력 경로를 설정합니다.
    const cjsOutput = path.resolve(
      baseUrl,
      ensure(paths.output[entrypoint]?.require, 'CJS 출력 파일을 찾을 수 없습니다.'),
    )

    // ESM 엔트리 포인트를 처리합니다.
    const esmEntrypoint = path.resolve(
      baseUrl,
      ensure(handleBuildPath(paths.input, entrypoint, 'es'), 'ESM 엔트리 포인트를 찾을 수 없습니다.'),
    )
    // ESM 출력 경로를 설정합니다.
    const esmOutput = path.resolve(
      baseUrl,
      ensure(paths.output[entrypoint]?.import, 'ESM 출력 파일을 찾을 수 없습니다.'),
    )

    // 각 엔트리 포인트에 대한 CJS와 ESM 빌드 설정을 반환합니다.
    return [buildCJS(cjsEntrypoint, cjsOutput), buildESM(esmEntrypoint, esmOutput)]
  })
}

/**
 * 엔트리 포인트를 처리하는 함수입니다.
 * @param {Object} exports - package.json의 exports 필드
 * @param {string} entrypoint - 엔트리 포인트 경로
 * @param {string} moduleType - 모듈 타입 ('cjs' 또는 'es')
 * @returns {string|undefined} - CJS 엔트리 포인트 경로 또는 undefined
 */
function handleBuildPath(exports, entrypoint, moduleType) {
  const modulePath = moduleType === 'cjs' ? 'require' : 'import'

  if (exports?.[entrypoint]?.[modulePath] != null) {
    return exports?.[entrypoint]?.[modulePath]
  }

  if (typeof exports?.[entrypoint] === 'string') {
    return exports?.[entrypoint]
  }

  return undefined
}

/**
 * 값이 존재하는지 확인하고, 없을 경우 에러를 발생시킵니다.
 * @param {any} value - 확인할 값
 * @param {string} message - 에러 메시지
 * @returns {any} - 존재하는 값
 * @throws {Error} - 값이 null 또는 undefined일 경우 에러를 발생시킵니다.
 */
function ensure(value, message) {
  if (value == null) {
    throw new Error(message)
  }

  return value
}
