---
slug: /
sidebar_position: 1
---

# React Boilerplates

**React Boilerplates**는 React 프로젝트를 빠르게 시작할 수 있도록 도와주는 CLI 도구 모음입니다.

프로젝트 세팅에 시간을 쏟지 않고, 검증된 기술 스택과 설정으로 즉시 개발을 시작하세요.

## 주요 기능

- **빠른 프로젝트 생성** - `npx` 한 줄로 즉시 프로젝트 시작, 복잡한 설정 불필요
- **3가지 템플릿** - 웹 앱, 관리자 대시보드, 컴포넌트 라이브러리 용도별 제공
- **최신 기술 스택** - React 19, Vite 6, TypeScript 5, Tanstack Query 5, Zustand 5
- **디자인 토큰 + 다크 모드** - 라이트/다크 테마, CSS 커스텀 프로퍼티 기반 토큰
- **폼 검증** - react-hook-form + zod 사전 구성 (App: Contact, Admin: Login/Users 등)
- **API Mocking** - MSW 브라우저 워커 (App), 노드 서버 (Vitest)
- **차트** - recharts 기반 대시보드 (Admin)
- **컴포넌트 카탈로그** - 모든 라이브러리 컴포넌트에 Storybook 스토리 포함
- **서버/클라이언트 상태 관리** - Tanstack Query (데이터 페칭) + Zustand (UI 상태)
- **테스트** - Vitest 단위 테스트 + Playwright E2E 테스트 사전 구성
- **라이브러리 빌드** - ES Module / CommonJS 듀얼 빌드 및 타입 자동 생성
- **SEO** - react-helmet-async 페이지별 메타 태그 관리

## 템플릿

| 템플릿                        | 기술 스택                                | 용도                     |
| ----------------------------- | ---------------------------------------- | ------------------------ |
| **[App](/templates/app)**     | React 19 + Chakra UI 3 + React Router 7  | 일반 웹 애플리케이션     |
| **[Admin](/templates/admin)** | React 18 + Ant Design 5 + React Router 7 | 관리자 대시보드          |
| **[Library](/templates/lib)** | React 18+ + Vite library mode            | 컴포넌트 라이브러리 개발 |

## 빠른 시작

### 요구사항

- **Node.js** 20 이상
- **pnpm** 9 이상 ([설치 가이드](https://pnpm.io/installation))

### App / Admin 생성

```bash
# 기본 App 템플릿
npx create-react-bp my-app

# Admin 템플릿 지정
npx create-react-bp my-admin --template admin
```

### Component Library 생성

```bash
npx create-react-lib my-lib
```

### 생성 후

```bash
cd my-app
pnpm install
pnpm dev
```

다음 단계: [설치 가이드](/getting-started/installation)에서 자세한 설정 방법을 확인하세요.
