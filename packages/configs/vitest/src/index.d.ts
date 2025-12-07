import type { UserConfig } from 'vitest/config';

export interface VitestConfigOptions {
  root?: string;
}

export function createVitestConfig(options?: VitestConfigOptions): UserConfig;
