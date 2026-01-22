---
sidebar_position: 2
---

# ESLint 설정

`@repo/eslint-config` 패키지는 ESLint 9 flat config 기반의 공유 설정을 제공합니다.

## 설정 파일

### 기본 설정 (index.js)

TypeScript 프로젝트용 기본 설정:

- `@typescript-eslint` 규칙 (no-unused-vars, no-explicit-any, consistent-type-imports)
- `eslint-plugin-import` 규칙 (순서 자동 정렬, 중복 import 방지)

### React 설정 (react.js)

React 프로젝트용 설정 (기본 설정 포함):

- `eslint-plugin-react` 규칙 (jsx-key, self-closing-comp, no-deprecated 등)
- `eslint-plugin-react-hooks` 규칙 (rules-of-hooks, exhaustive-deps)
- React 버전 자동 감지

### Node.js 설정 (node.js)

Node.js 프로젝트용 설정 (기본 설정 포함):

- Node.js 전역 변수 (`process`, `__dirname` 등)
- `console` 사용 허용

## 사용법

```js
// eslint.config.js (React 프로젝트)
import reactConfig from '@repo/eslint-config/react';

export default reactConfig;
```

```js
// eslint.config.js (Node.js 프로젝트)
import nodeConfig from '@repo/eslint-config/node';

export default nodeConfig;
```

## 주요 규칙

| 규칙 | 설정 | 설명 |
|------|------|------|
| `@typescript-eslint/no-unused-vars` | error | 미사용 변수 금지 (`_` 접두사 제외) |
| `@typescript-eslint/no-explicit-any` | warn | `any` 타입 사용 경고 |
| `@typescript-eslint/consistent-type-imports` | error | `import type` 일관성 |
| `import/order` | error | import 그룹별 자동 정렬 |
| `import/no-duplicates` | error | 중복 import 방지 |
| `react/jsx-key` | error | 리스트 렌더링 시 key 필수 |
| `react/self-closing-comp` | error | 자식 없는 컴포넌트 자동 닫기 |
| `react/no-deprecated` | error | 더 이상 사용되지 않는 API 금지 |
| `react-hooks/rules-of-hooks` | error | Hooks 규칙 준수 |
| `react-hooks/exhaustive-deps` | warn | 의존성 배열 검사 |

## 커스터마이징

프로젝트별 규칙을 추가하거나 재정의할 수 있습니다:

```js
// eslint.config.js
import reactConfig from '@repo/eslint-config/react';

export default [
  ...reactConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
```
