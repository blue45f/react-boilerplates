const base = require('@internal/eslint-config/base')

module.exports = {
  ...base(__dirname),
  ignorePatterns: ['node_modules', 'dist', '*.js', '*.cjs', '*.mjs', 'templates'],
}
