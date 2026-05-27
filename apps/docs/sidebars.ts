import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: '시작하기',
      items: [
        'getting-started/installation',
        'guides/development-guide',
        'getting-started/create-app',
        'getting-started/create-lib',
      ],
    },
    {
      type: 'category',
      label: '개념',
      items: ['concepts/scaffolding-vs-boilerplates'],
    },
    {
      type: 'category',
      label: '템플릿',
      items: ['templates/app', 'templates/admin', 'templates/lib'],
    },
    {
      type: 'category',
      label: '설정',
      items: ['configs/typescript', 'configs/eslint', 'configs/vite', 'configs/vitest'],
    },
  ],
};

export default sidebars;
