import type { UserConfig } from 'vite';

export interface AppConfigOptions {
  /** 프로젝트 루트 경로. 기본: process.cwd() */
  root?: string;
  /** 개발 서버 포트. 기본: 5173 */
  port?: number;
  /** 개발 서버 자동 오픈. 기본: true */
  open?: boolean;
  /** 기본 alias에 추가하거나 덮어쓸 alias */
  aliases?: Record<string, string>;
  /** React Compiler preset 활성화 여부. 기본: true */
  compiler?: boolean;
}

export interface LibConfigOptions {
  /** 라이브러리 글로벌 이름 (UMD 빌드에서 사용) */
  name?: string;
  /** 엔트리 파일 경로 (라이브러리 루트 기준 상대). 기본: 'src/index.ts' */
  entry?: string;
  /** 프로젝트 루트 경로. 기본: process.cwd() */
  root?: string;
  /** 추가 external 의존성 */
  external?: string[];
  /** 기본 alias에 추가하거나 덮어쓸 alias */
  aliases?: Record<string, string>;
  /** React Compiler preset 활성화 여부. 기본: true */
  compiler?: boolean;
}

export function createAppConfig(options?: AppConfigOptions): UserConfig;
export function createLibConfig(options?: LibConfigOptions): UserConfig;
