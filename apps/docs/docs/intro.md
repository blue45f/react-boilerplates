---
slug: /
sidebar_position: 1
---

# React Boilerplates

**React Boilerplates**는 React 프로젝트를 빠르게 만들고 같은 기준으로 유지하기 위한 템플릿 플랫폼입니다.

App / Admin / Library 템플릿, 생성 CLI, 공유 설정, 문서, CI 검증을 한 저장소에서 함께 관리합니다.
새 프로젝트를 만드는 사용자와 템플릿을 운영하는 팀 모두를 대상으로 합니다.

## 주요 기능

- **빠른 프로젝트 생성** - `npx` 한 줄로 즉시 프로젝트 시작, 복잡한 설정 불필요
- **3가지 템플릿** - 웹 앱, 관리자 대시보드, 컴포넌트 라이브러리 용도별 제공
- **현재 검증된 기술 스택** - React 19, Vite 8, TypeScript 6, TanStack Query 5, Zustand 5
- **디자인 토큰 + 다크 모드** - 라이트/다크 테마, CSS 커스텀 프로퍼티 기반 토큰
- **폼 검증** - react-hook-form + zod 사전 구성 (App: Contact, Admin: Login/Users 등)
- **i18n + 접근성 테스트** - App 템플릿에 ko/en 로케일 동기화, a11y, keyboard, responsive 테스트 포함
- **차트** - recharts 기반 대시보드 (Admin)
- **컴포넌트 카탈로그** - 모든 라이브러리 컴포넌트에 Storybook 스토리 포함
- **서버/클라이언트 상태 관리** - TanStack Query (데이터 페칭) + Zustand (UI 상태)
- **테스트** - Vitest 단위 테스트 + Playwright E2E 테스트 사전 구성
- **라이브러리 빌드** - ES Module / CommonJS 듀얼 빌드 및 타입 자동 생성
- **문서 타이틀 관리** - App/Admin 템플릿 모두 hook 기반 타이틀 관리 제공

## 템플릿

| 템플릿                        | 기술 스택                                         | 용도                     |
| ----------------------------- | ------------------------------------------------- | ------------------------ |
| **[App](/templates/app)**     | React 19 + CSS Modules + React Router Data Router | 일반 웹 애플리케이션     |
| **[Admin](/templates/admin)** | React 19 + Ant Design 5 + React Router 7          | 관리자 대시보드          |
| **[Library](/templates/lib)** | React 18/19 peer + Vite library mode              | 컴포넌트 라이브러리 개발 |

## 빠른 시작

### 요구사항

- **Node.js** 22 이상
- **pnpm** 10 이상 ([설치 가이드](https://pnpm.io/installation))

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

템플릿을 직접 수정하거나 운영하려면 [개발 가이드](/guides/development-guide)를 먼저 읽는 것이 좋습니다.
