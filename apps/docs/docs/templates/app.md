---
sidebar_position: 1
---

# App 템플릿

`react-scaffolding`의 앱 아키텍처를 기준으로 정렬한 일반 웹 앱 템플릿입니다. CSS Modules, React Router 7 Data Router, TanStack Query, Zustand, i18next, React Compiler, Storybook, Vitest, Playwright 테스트가 함께 구성됩니다.

## 기술 스택

| 기술                     | 버전  | 용도                       |
| ------------------------ | ----- | -------------------------- |
| React                    | 19    | UI 라이브러리              |
| TypeScript               | 6     | 엄격한 타입 안전성         |
| Vite                     | 8     | Rolldown 기반 빌드/HMR     |
| React Router Data Router | 7     | lazy route module 라우팅   |
| CSS Modules              | -     | 컴포넌트 스코프 스타일링   |
| TanStack Query           | 5     | 서버 상태                  |
| Zustand                  | 5     | 클라이언트 상태            |
| i18next + react-i18next  | 26/17 | 다국어 처리                |
| react-hook-form + zod    | 7/4   | 폼 상태 + 스키마 검증      |
| React Compiler           | 1     | 렌더링 최적화 컴파일러     |
| Vitest                   | 4     | 단위/통합 테스트           |
| Playwright               | 1     | E2E, 접근성, 반응형 테스트 |
| Storybook                | 10    | 컴포넌트 카탈로그          |

## 생성 방법

```bash
npx create-react-bp my-app
npx create-react-bp my-app --template app
```

## 디렉토리 구조

```
my-app/
├── src/
│   ├── app/                 # AppProviders, QueryClient factory
│   ├── assets/              # 글로벌 스타일과 정적 자원
│   ├── components/
│   │   ├── common/          # Button, Input, Modal, Toast 등 범용 컴포넌트
│   │   ├── layout/          # Header, Footer
│   │   └── route/           # ProtectedRoute
│   ├── features/            # 도메인 모듈 (schema, api, queries, store)
│   ├── hooks/               # 커스텀 훅
│   ├── i18n/                # i18next 설정과 ko/en 로케일
│   ├── pages/               # 라우트 단위 화면
│   ├── router/              # Data Router route object
│   ├── services/            # API 클라이언트
│   ├── store/               # Zustand 전역 상태
│   ├── test/                # Vitest setup
│   ├── types/               # 공유 타입
│   └── utils/               # 순수 유틸리티
├── e2e/                     # Playwright 테스트
├── .storybook/              # Storybook 설정
├── docs/                    # 아키텍처/기여 문서
├── vite.config.ts
├── playwright.config.ts
└── package.json
```

## 아키텍처 원칙

| 영역            | 원칙                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------- |
| 앱 조립         | `src/main.tsx`는 mount만 담당하고 Provider 조립은 `src/app/AppProviders.tsx`에 둡니다.    |
| 라우팅          | React Router Data Router의 route object와 `lazy` route module을 사용합니다.               |
| 서버 상태       | query key, query hook, mutation hook은 도메인별 `features/<domain>/queries.ts`에 둡니다.  |
| 클라이언트 상태 | 앱 전역 상태는 `src/store`, 도메인 UI 상태는 해당 feature 안의 작은 store로 분리합니다.   |
| 다국어          | ko/en 로케일 키 동기화를 `src/i18n/locales.test.ts`로 검증합니다.                         |
| 품질 게이트     | format, lint, typecheck, test, build, security audit을 `verify`/`verify:push`로 묶습니다. |

## 라우트

| 경로     | 페이지   | 설명                                           |
| -------- | -------- | ---------------------------------------------- |
| `/`      | Home     | 인트로와 주요 기능                             |
| `/about` | About    | 템플릿 구조 설명                               |
| `/todos` | Todos    | TanStack Query, zod schema, feature store 예시 |
| `*`      | NotFound | 404                                            |

## 테스트 자산

App 템플릿은 테스트 코드를 최대한 포함합니다.

| 범위     | 예시                                                                      |
| -------- | ------------------------------------------------------------------------- |
| 컴포넌트 | Button, Input, Modal, Toast, Header, Footer 등                            |
| 훅       | useDebounce, useLocalStorage, useMediaQuery, useTheme, useFetch 등        |
| 앱 조립  | QueryClient factory, AppProviders, 라우터                                 |
| 도메인   | todos api/schema/query/store                                              |
| i18n     | ko/en 로케일 키 동기화                                                    |
| E2E      | navigation, theme, accessibility, keyboard, responsive, visual regression |

## 명령어

| 명령어                 | 설명                                 |
| ---------------------- | ------------------------------------ |
| `pnpm dev`             | Vite 개발 서버                       |
| `pnpm build`           | 타입 체크 후 프로덕션 빌드           |
| `pnpm preview`         | 빌드 미리보기                        |
| `pnpm lint`            | ESLint 검사                          |
| `pnpm lint:security`   | ESLint 보안 규칙 + dependency audit  |
| `pnpm typecheck`       | TypeScript 타입 검사                 |
| `pnpm test`            | Vitest watch 모드                    |
| `pnpm test:run`        | Vitest 단일 실행                     |
| `pnpm test:coverage`   | 커버리지                             |
| `pnpm test:i18n`       | 로케일 키 동기화 테스트              |
| `pnpm test:e2e`        | Playwright E2E                       |
| `pnpm storybook`       | Storybook 개발 서버                  |
| `pnpm build-storybook` | Storybook 정적 빌드                  |
| `pnpm verify`          | format, lint, typecheck, test, build |
| `pnpm verify:push`     | verify + 보안 검사                   |

## 환경 변수

```bash
VITE_API_URL=http://localhost:8080/api
```

`src/services/api.ts`의 기본 API URL로 사용됩니다. 값이 없으면 `/api`를 사용합니다.
