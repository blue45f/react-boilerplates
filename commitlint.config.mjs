/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'refactor',
        'perf',
        'test',
        'chore',
        'build',
        'ci',
        'style',
        'revert',
      ],
    ],
    'scope-enum': [
      1,
      'always',
      ['app', 'admin', 'lib', 'configs', 'cli', 'docs', 'deps', 'ci', 'release', 'workspace'],
    ],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
};
