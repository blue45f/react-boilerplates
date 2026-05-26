import js from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import importX from 'eslint-plugin-import-x';
import security from 'eslint-plugin-security';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/.docusaurus/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/node_modules/**',
      '**/*.tsbuildinfo',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.es2022,
      },
    },
    plugins: {
      'import-x': importX,
      security,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      ...security.configs.recommended.rules,
      'security/detect-object-injection': 'off',
      'import-x/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-duplicates': 'error',
      'import-x/first': 'warn',
      'import-x/newline-after-import': 'warn',
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/no-conditional-expect': 'off',
      'security/detect-non-literal-regexp': 'off',
    },
  }
);
