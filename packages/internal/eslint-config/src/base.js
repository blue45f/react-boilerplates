module.exports = (__dirname) => ({
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['node_modules', 'dist', '*.js', '*.cjs', '*.mjs', 'boilerplates'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/member-ordering': 'off',
    'sort-keys': 'off',
  },
})
