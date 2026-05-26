import prettier from 'eslint-config-prettier/flat';
import storybookPlugin from 'eslint-plugin-storybook';

import reactConfig from './react.js';

/**
 * Storybook 작성용 ESLint 설정
 * - eslint-plugin-storybook 권장 룰 적용
 * - *.stories.tsx / *.stories.ts 파일을 명시적으로 처리
 *
 * 사용 예:
 *   import storybookConfig from '@repo/eslint-config/storybook';
 *   export default storybookConfig;
 *
 * 또는 react 설정과 함께 spread 하여 사용:
 *   import reactConfig from '@repo/eslint-config/react';
 *   import storybookConfig from '@repo/eslint-config/storybook';
 *   export default [...reactConfig, ...storybookConfig];
 *
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  ...reactConfig,
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...(storybookPlugin.configs?.recommended?.rules ?? {}),
      // 스토리 args 타입은 자주 any로 처리되므로 경고 완화
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // .storybook 설정 디렉토리 - main.ts / preview.ts 등은 default export + side effect 허용
    files: ['.storybook/**/*.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettier,
];
