import prettierConfig from 'eslint-config-prettier';

/**
 * Prettier와 충돌하는 ESLint 룰을 비활성화하는 설정.
 * 항상 다른 설정의 가장 마지막에 spread 하여 사용해야 한다.
 *
 * 사용 예:
 *   import reactConfig from '@repo/eslint-config/react';
 *   import prettierOff from '@repo/eslint-config/prettier';
 *   export default [...reactConfig, ...prettierOff];
 *
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  {
    rules: {
      ...prettierConfig.rules,
    },
  },
];
