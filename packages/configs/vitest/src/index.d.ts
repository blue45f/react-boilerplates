import type { UserConfig } from 'vitest/config';

export interface VitestConfigOptions {
  /** 프로젝트 루트 경로. 기본: process.cwd() */
  root?: string;
  /** 테스트 환경. 기본: 'jsdom' */
  environment?: 'jsdom' | 'node' | 'happy-dom' | string;
  /** 테스트 파일 glob. 기본: ['src/**\/*.{test,spec}.{ts,tsx}'] */
  include?: string[];
  /** 추가 setup 파일 (기본 setup 뒤에 병합) */
  setupFiles?: string[];
  /** CSS import 처리 여부. 기본: true */
  css?: boolean;
}

export function createVitestConfig(options?: VitestConfigOptions): UserConfig;
