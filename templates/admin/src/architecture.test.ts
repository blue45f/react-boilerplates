import { describe, expect, it } from 'vitest';

const sourceFiles = import.meta.glob('./**/*', { query: '?raw', import: 'default' });
const sourcePaths = Object.keys(sourceFiles).map((path) => path.replace(/^\.\//, ''));

function hasPath(path: string) {
  const normalized = path.replace(/\/$/, '');
  return (
    sourcePaths.includes(normalized) ||
    sourcePaths.some((sourcePath) => sourcePath.startsWith(`${normalized}/`))
  );
}

describe('feature-oriented architecture layout', () => {
  it('uses app/domains/shared/infrastructure boundaries with public APIs', () => {
    const expectedPaths = [
      'app/model/index.ts',
      'app/providers/index.ts',
      'app/routes/index.tsx',
      'app/shell/index.ts',
      'app/styles/global.css',
      'domains/analytics/overview/index.ts',
      'domains/auth/login/index.ts',
      'domains/dashboard/overview/index.ts',
      'domains/settings/preferences/index.ts',
      'domains/system/not-found/index.ts',
      'domains/users/list/index.ts',
      'domains/users/list/components',
      'domains/users/list/model',
      'infrastructure/http/index.ts',
      'infrastructure/mock/index.ts',
      'shared/config/index.ts',
      'shared/lib/index.ts',
      'shared/lib/hooks/index.ts',
      'shared/ui/index.ts',
    ];

    expect(expectedPaths.filter((path) => !hasPath(path))).toEqual([]);
  });

  it('does not keep legacy type-based top-level folders in the admin template', () => {
    const legacyFolders = ['components', 'hooks', 'lib', 'pages', 'providers', 'stores', 'styles'];

    expect(legacyFolders.filter(hasPath)).toEqual([]);
  });
});
