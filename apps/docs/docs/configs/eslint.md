---
sidebar_position: 2
---

# ESLint 설정

`@repo/eslint-config` 패키지는 ESLint 9 flat config 기반의 공유 설정을 제공합니다.

## Exports

| Export                          | 용도                                                      |
| ------------------------------- | --------------------------------------------------------- |
| `@repo/eslint-config`           | base (TS + import 순서)                                   |
| `@repo/eslint-config/react`     | base + React + React Hooks                                |
| `@repo/eslint-config/node`      | base + Node globals                                       |
| `@repo/eslint-config/storybook` | react + `eslint-plugin-storybook` 권장 룰 (`*.stories.*`) |
| `@repo/eslint-config/prettier`  | Prettier와 충돌하는 룰 비활성 (가장 마지막에 spread)      |

## 설정 파일

### 기본 (index.js)

TypeScript 프로젝트용 기본 설정:

- `@typescript-eslint` 룰 (no-unused-vars, no-explicit-any, consistent-type-imports)
- `eslint-plugin-import` (그룹별 순서 정렬, 중복 import 방지)

### React (react.js)

위 + React, React Hooks 룰.

### Node.js (node.js)

위 + Node 전역 변수, `console` 허용.

### Storybook (storybook.js)

위(React) + `eslint-plugin-storybook`의 recommended 룰을 `*.stories.@(ts|tsx|js|jsx)`와 `.storybook/**`에 적용합니다.
스토리 파일에서는 default export와 `any`가 흔하므로 해당 룰을 완화합니다.

### Prettier (prettier.js)

`eslint-config-prettier`로 포매팅 관련 ESLint 룰을 비활성화합니다. **반드시 가장 마지막**에 spread 하세요.

## 사용법

### React 앱

```js
// eslint.config.js
import reactConfig from '@repo/eslint-config/react';
import prettierOff from '@repo/eslint-config/prettier';

export default [...reactConfig, ...prettierOff];
```

### Storybook이 있는 라이브러리

```js
// eslint.config.js
import reactConfig from '@repo/eslint-config/react';
import storybookConfig from '@repo/eslint-config/storybook';
import prettierOff from '@repo/eslint-config/prettier';

export default [...reactConfig, ...storybookConfig, ...prettierOff];
```

### Node CLI

```js
import nodeConfig from '@repo/eslint-config/node';
import prettierOff from '@repo/eslint-config/prettier';

export default [...nodeConfig, ...prettierOff];
```

## 주요 규칙

| 규칙                                         | 설정    | 설명                               |
| -------------------------------------------- | ------- | ---------------------------------- |
| `@typescript-eslint/no-unused-vars`          | error   | 미사용 변수 금지 (`_` 접두사 제외) |
| `@typescript-eslint/no-explicit-any`         | warn    | `any` 타입 사용 경고               |
| `@typescript-eslint/consistent-type-imports` | error   | `import type` 일관성               |
| `import/order`                               | error   | import 그룹별 자동 정렬            |
| `import/no-duplicates`                       | error   | 중복 import 방지                   |
| `react/jsx-key`                              | error   | 리스트 렌더링 시 key 필수          |
| `react/self-closing-comp`                    | error   | 자식 없는 컴포넌트 자동 닫기       |
| `react/no-deprecated`                        | error   | 더 이상 사용되지 않는 API 금지     |
| `react-hooks/rules-of-hooks`                 | error   | Hooks 규칙 준수                    |
| `react-hooks/exhaustive-deps`                | warn    | 의존성 배열 검사                   |
| `storybook/*` (recommended)                  | various | 스토리 파일 베스트 프랙티스        |

## 커스터마이징

```js
import reactConfig from '@repo/eslint-config/react';
import prettierOff from '@repo/eslint-config/prettier';

export default [
  ...reactConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  ...prettierOff,
];
```
