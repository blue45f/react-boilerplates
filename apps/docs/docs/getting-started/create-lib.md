---
sidebar_position: 3
---

# Library 생성하기

`create-react-lib` CLI를 사용하여 React 라이브러리를 생성합니다.

## 사용법

```bash
npx create-react-lib [라이브러리명]
```

### 대화형 모드

```bash
npx create-react-lib
```

### 예시

```bash
npx create-react-lib my-ui-lib
```

## 생성된 프로젝트 구조

```
my-ui-lib/
├── src/
│   ├── index.ts          # 라이브러리 진입점
│   ├── components/       # React 컴포넌트
│   ├── hooks/            # 커스텀 훅
│   ├── utils/            # 유틸리티 함수
│   └── demo/             # 데모 앱
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 개발하기

```bash
cd my-ui-lib
pnpm install
pnpm dev
```

## 빌드하기

```bash
pnpm build
```

빌드 결과물:
- `dist/index.mjs` - ES Module
- `dist/index.cjs` - CommonJS
- `dist/index.d.ts` - TypeScript 타입 정의
