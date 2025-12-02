'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.boilerplateViteConfig = void 0
var rollup_plugin_preserve_directives_1 = require('rollup-plugin-preserve-directives')
var vite_1 = require('vite')
var vite_plugin_externalize_deps_1 = require('vite-plugin-externalize-deps')
var vite_tsconfig_paths_1 = require('vite-tsconfig-paths')
var boilerplateViteConfig = function (options) {
  var _a, _b
  return (0, vite_1.defineConfig)({
    plugins: [
      (0, vite_plugin_externalize_deps_1.externalizeDeps)({
        include: (_a = options.externalDeps) !== null && _a !== void 0 ? _a : [],
      }),
      (0, rollup_plugin_preserve_directives_1.default)(),
      (0, vite_tsconfig_paths_1.default)({
        projects: options.tsconfigPath ? [options.tsconfigPath] : undefined,
      }),
    ],
    build: {
      outDir: (_b = options.outDir) !== null && _b !== void 0 ? _b : 'dist',
      sourcemap: true,
      lib: {
        entry: options.entry,
        formats: ['es', 'cjs'],
        fileName: function (format) {
          if (format === 'cjs') return 'cjs/[name].cjs'
          return 'esm/[name].js'
        },
      },
      rollupOptions: {
        output: {
          preserveModules: true,
        },
      },
    },
  })
}
exports.boilerplateViteConfig = boilerplateViteConfig
