---
sidebar_position: 3
---

# Library 템플릿

React 컴포넌트 라이브러리 개발을 위한 템플릿입니다.

## 기술 스택

- **React 18** - peerDependency로 설정
- **Vite 6** - 라이브러리 빌드 모드
- **vite-plugin-dts** - TypeScript 선언 파일 생성
- **TypeScript 5** - 타입 안전성

## 프로젝트 구조

```
my-lib/
├── src/
│   ├── index.ts           # 라이브러리 진입점
│   ├── components/        # 컴포넌트
│   │   └── Button.tsx
│   ├── hooks/             # 커스텀 훅
│   │   ├── useToggle.ts
│   │   └── useDebounce.ts
│   ├── utils/             # 유틸리티
│   │   └── cn.ts
│   └── demo/              # 개발용 데모
│       ├── main.tsx
│       └── App.tsx
├── dist/                  # 빌드 결과물
│   ├── index.mjs
│   ├── index.cjs
│   └── index.d.ts
└── ...
```

## 포함된 예시

### Button 컴포넌트

```tsx
import { Button } from 'my-lib';

<Button variant="primary" size="lg">
  클릭
</Button>
```

### useToggle 훅

```tsx
import { useToggle } from 'my-lib';

const [isOpen, toggle] = useToggle(false);
```

### useDebounce 훅

```tsx
import { useDebounce } from 'my-lib';

const debouncedValue = useDebounce(searchTerm, 300);
```

## 배포하기

```bash
pnpm build
npm publish
```
