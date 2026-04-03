# React Boilerplates

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-9%2B-orange.svg)](https://pnpm.io)

React 프로젝트를 빠르게 시작할 수 있도록 도와주는 CLI 도구 모음입니다.

> **[Documentation](https://github.com/blue45f/react-boilerplates)** | **[Issues](https://github.com/blue45f/react-boilerplates/issues)**

## 주요 기능

- **한 줄의 명령어로 프로젝트 생성** - `npx`로 즉시 시작
- **3가지 템플릿 제공** - App, Admin Dashboard, Component Library
- **최신 기술 스택** - React 19, Vite 6, TypeScript 5
- **통합 설정** - ESLint, Prettier, Vitest 사전 구성
- **모노레포 기반** - Turborepo + pnpm workspace로 관리

## 빠른 시작

```bash
# React App 생성 (Chakra UI 기반)
npx create-react-bp my-app

# React Admin Dashboard 생성 (Ant Design 기반)
npx create-react-bp my-admin --template admin

# React Component Library 생성
npx create-react-lib my-lib
```

## 템플릿

| 템플릿 | 기술 스택 | 용도 |
|--------|-----------|------|
| **App** | React 19 + Chakra UI 3 + React Router 7 | 일반 웹 애플리케이션 |
| **Admin** | React 18 + Ant Design 5 + React Router 7 | 관리자 대시보드 |
| **Library** | React 18+ (peer dep) + Vite library mode | 컴포넌트 라이브러리 (ES/CJS 듀얼 빌드) |

## 프로젝트 구조

```
react-boilerplates/
├── apps/
│   └── docs/                 # Docusaurus 문서 사이트
├── packages/
│   ├── configs/              # 공유 설정 패키지
│   │   ├── eslint/           # @repo/eslint-config
│   │   ├── typescript/       # @repo/typescript-config
│   │   ├── vite/             # @repo/vite-config
│   │   └── vitest/           # @repo/vitest-config
│   └── cli/                  # CLI 도구
│       ├── create-app/       # create-react-bp (App/Admin 생성)
│       └── create-lib/       # create-react-lib (Library 생성)
└── templates/                # CLI에서 사용하는 프로젝트 템플릿
    ├── app/                  # App 템플릿 소스
    ├── admin/                # Admin 대시보드 템플릿 소스
    └── lib/                  # Library 템플릿 소스
```

## 개발환경 설정

```bash
# 저장소 클론
git clone https://github.com/blue45f/react-boilerplates.git
cd react-boilerplates

# 의존성 설치
pnpm install

# 모든 패키지 빌드
pnpm build

# 개발 서버 실행
pnpm dev

# 린트 검사
pnpm lint

# 테스트 실행
pnpm test

# 코드 포맷팅
pnpm format
```

## 요구사항

- **Node.js** 20 이상
- **pnpm** 9 이상 ([설치 가이드](https://pnpm.io/installation))

## 기술 스택

| 분류 | 기술 |
|------|------|
| 빌드 | [Turborepo](https://turbo.build), [Vite 6](https://vite.dev) |
| 언어 | [TypeScript 5](https://www.typescriptlang.org) |
| UI | [React 19](https://react.dev), [Chakra UI 3](https://chakra-ui.com), [Ant Design 5](https://ant.design) |
| 라우팅 | [React Router 7](https://reactrouter.com) |
| 서버 상태 | [Tanstack Query 5](https://tanstack.com/query) |
| 클라이언트 상태 | [Zustand 5](https://zustand.docs.pmnd.rs) |
| HTTP | [ky](https://github.com/sindresorhus/ky) |
| SEO | [react-helmet-async](https://github.com/staylor/react-helmet-async) |
| 테스트 | [Vitest 3](https://vitest.dev), [Playwright](https://playwright.dev), [Testing Library](https://testing-library.com) |
| 코드 품질 | [ESLint 9](https://eslint.org), [Prettier 3](https://prettier.io) |
| 패키지 관리 | [pnpm 9](https://pnpm.io) |

## 라이선스

MIT
