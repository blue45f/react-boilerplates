import { boilerplateViteConfig } from '@boilerplate/vite-config'
import { boilerplateVitestConfig } from '@boilerplate/vitest-config'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, mergeConfig } from 'vite'

export default defineConfig(() => {
  const isLibraryMode = process.env.BUILD_LIB === 'true'
  return mergeConfig(
    boilerplateVitestConfig({}),
    mergeConfig(
      {
        plugins: [
          react(),
          !isLibraryMode && legacy({ targets: ['defaults', 'not IE 11'] }),
        ].filter(Boolean),
      },
      boilerplateViteConfig({ entry: 'src/main.tsx', srcDir: 'src', isLibraryMode })
    )
  )
})
