---
sidebar_position: 2
---

# ESLint 설정

`@repo/eslint-config` 패키지는 공유 ESLint 설정을 제공합니다.

## 설정 파일

### 기본 설정 (index.js)

TypeScript 프로젝트용 기본 설정:

- `@typescript-eslint` 규칙
- `eslint-plugin-import` 규칙
- import 순서 자동 정렬

### React 설정 (react.js)

React 프로젝트용 설정:

- `eslint-plugin-react` 규칙
- `eslint-plugin-react-hooks` 규칙
- JSX 지원

### Node.js 설정 (node.js)

Node.js 프로젝트용 설정:

- Node.js 전역 변수
- `console` 사용 허용

## 사용법

```js
// eslint.config.js
import reactConfig from '@repo/eslint-config/react';

export default reactConfig;
```

## 주요 규칙

| 규칙 | 설명 |
|------|------|
| `@typescript-eslint/no-unused-vars` | 사용하지 않는 변수 금지 |
| `@typescript-eslint/consistent-type-imports` | type import 일관성 |
| `import/order` | import 순서 정렬 |
| `react-hooks/rules-of-hooks` | Hooks 규칙 |
