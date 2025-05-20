import globals from 'globals';

import baseConfig from './index.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Node.js 특화 규칙
      'no-console': 'off',
    },
  },
];
