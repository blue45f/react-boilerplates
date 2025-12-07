import type { UserConfig } from 'vite';

export interface AppConfigOptions {
  root?: string;
}

export interface LibConfigOptions {
  name?: string;
  entry?: string;
  root?: string;
}

export function createAppConfig(options?: AppConfigOptions): UserConfig;
export function createLibConfig(options?: LibConfigOptions): UserConfig;
