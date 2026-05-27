import { describe, expect, it } from 'vitest'

const sourceFiles = import.meta.glob('./**/*', { query: '?raw', import: 'default' })
const sourcePaths = Object.keys(sourceFiles).map((path) => path.replace(/^\.\//, ''))

function hasPath(path: string) {
  const normalized = path.replace(/\/$/, '')
  return (
    sourcePaths.includes(normalized) ||
    sourcePaths.some((sourcePath) => sourcePath.startsWith(`${normalized}/`))
  )
}

describe('feature-oriented architecture layout', () => {
  it('uses app/domains/shared/infrastructure boundaries with public APIs', () => {
    const expectedPaths = [
      'app/i18n',
      'app/providers',
      'app/routes',
      'app/shell',
      'app/styles',
      'domains/content/about/index.ts',
      'domains/marketing/home/index.ts',
      'domains/system/not-found/index.ts',
      'domains/todos/list/index.ts',
      'domains/todos/list/api',
      'domains/todos/list/components',
      'domains/todos/list/model',
      'domains/todos/list/tests',
      'infrastructure/http/index.ts',
      'infrastructure/http/mocks',
      'infrastructure/storage/index.ts',
      'shared/config/index.ts',
      'shared/lib/index.ts',
      'shared/lib/hooks/index.ts',
      'shared/ui/index.ts',
    ]

    expect(expectedPaths.filter((path) => !hasPath(path))).toEqual([])
  })

  it('does not keep legacy type-based top-level folders in the app template', () => {
    const legacyFolders = [
      'components',
      'features',
      'hooks',
      'pages',
      'router',
      'services',
      'store',
      'utils',
    ]

    expect(legacyFolders.filter(hasPath)).toEqual([])
  })
})
