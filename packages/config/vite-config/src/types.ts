import { UserConfig } from 'vite'

export type Options = UserConfig & {
  /** 진입점 파일, 예: `./src/index.ts` */
  entry: string | string[] | Record<string, string>
  /** 타입 생성에 사용되는 소스 디렉토리, 예: `./src` */
  srcDir: string
  /** 타입 생성에서 제외할 항목, 예: `[./src/tests]` */
  exclude?: Array<string>
  /** 사용자 정의 tsconfig 파일의 선택적 경로, 기본값은 `./tsconfig.json` */
  tsconfigPath?: string
  /** `vite-plugin-externalize-deps`에 의해 감지되지 않은 경우 외부화할 추가 의존성 */
  externalDeps?: Array<string | RegExp>
  /** 라이브러리 모드인지 여부 */
  isLibraryMode?: boolean
}
