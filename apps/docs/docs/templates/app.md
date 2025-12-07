---
sidebar_position: 1
---

# App 템플릿

Chakra UI와 React Router를 사용한 일반적인 웹 앱 템플릿입니다.

## 기술 스택

- **React 19** - 최신 React
- **Vite 6** - 빠른 빌드 도구
- **Chakra UI 3** - 모던 UI 컴포넌트
- **React Router 7** - 라우팅
- **TypeScript 5** - 타입 안전성
- **Vitest** - 테스트 프레임워크

## 프로젝트 구조

```
my-app/
├── src/
│   ├── main.tsx            # 앱 진입점
│   ├── App.tsx             # 라우트 설정
│   ├── components/
│   │   └── Layout.tsx      # 레이아웃 컴포넌트
│   └── pages/
│       ├── Home.tsx
│       ├── About.tsx
│       └── NotFound.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── eslint.config.js
```

## 기본 페이지

- `/` - 홈 페이지
- `/about` - 소개 페이지
- `/*` - 404 페이지
