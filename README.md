# React Boilerplates

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-green.svg)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-10%2B-orange.svg)](https://pnpm.io)
[![CI](https://github.com/blue45f/react-boilerplates/actions/workflows/ci.yml/badge.svg)](https://github.com/blue45f/react-boilerplates/actions)

프로덕션에 그대로 쓸 수 있을 정도로 폴리싱된 React 보일러플레이트 CLI 모음입니다. App / Admin / Library 세 가지 템플릿과 공유 설정, Storybook, CI/CD까지 한 번에 받습니다.

> **[Documentation](https://github.com/blue45f/react-boilerplates)** · **[Issues](https://github.com/blue45f/react-boilerplates/issues)** · **[Discussions](https://github.com/blue45f/react-boilerplates/discussions)**

`react-scaffolding`은 App 템플릿의 기준 아키텍처이고, `react-boilerplates`는 App/Admin/Library 템플릿과 CLI, 공유 설정, 검증 파이프라인을 함께 운영하는 상위 보일러플레이트 플랫폼입니다.

## 한눈에

- 🟢 **Node 22 LTS · pnpm 10 · TypeScript 6 · Vite 8**
- 📦 **pnpm workspace + pnpm catalog** 로 의존성 버전을 한곳에서 관리 (Turborepo 의존 제거)
- 🎨 **CSS Modules/다크 모드/디자인 토큰** 기본 탑재 — `lib` 템플릿은 CSS 변수 기반 토큰 시스템
- 🧪 **Vitest 4 + Testing Library + Playwright + i18n/a11y 테스트** 사전 구성
- 📚 **Storybook 10** (a11y / themes addon) 포함
- 🤖 **CI: 매트릭스 빌드 + Playwright + Storybook 빌드 + CodeQL + Dependabot**
- 🧷 **Husky + lint-staged + Commitlint (Conventional Commits) + Changesets**

## 빠른 시작

```bash
# React App 생성 (CSS Modules + Data Router 기반)
npx create-react-bp my-app

# React Admin Dashboard 생성 (Ant Design 기반)
npx create-react-bp my-admin --template admin

# React Component Library 생성 (Vite library mode + Storybook)
npx create-react-lib my-lib
```

## 템플릿

| 템플릿      | 기술 스택                                                       | 용도                        |
| ----------- | --------------------------------------------------------------- | --------------------------- |
| **App**     | React 19 + CSS Modules + React Router Data Router + React Query | 일반 웹 애플리케이션        |
| **Admin**   | React 19 + Ant Design 5 + React Router 7 + recharts             | 관리자 대시보드             |
| **Library** | React 18/19 peer + Vite library mode + Storybook 10             | 디자인 시스템·UI 라이브러리 |

각 템플릿은 **워크스페이스에서 분리**되어 있어서 `npx create-*`로 받자마자 그대로 독립 실행됩니다.

## 모노레포 구조

```
react-boilerplates/
├── apps/
│   └── docs/                 # Docusaurus 문서 사이트
├── packages/
│   ├── configs/              # 공유 설정 (npm 게시 대상)
│   │   ├── eslint/
│   │   ├── typescript/
│   │   ├── vite/
│   │   └── vitest/
│   └── cli/
│       ├── create-app/       # create-react-bp
│       └── create-lib/       # create-react-lib
├── templates/                # CLI가 복사하는 템플릿 소스 (workspace 비참여)
│   ├── app/
│   ├── admin/
│   └── lib/
├── .changeset/               # Changesets 릴리스
├── .husky/                   # pre-commit / commit-msg / pre-push
├── .github/                  # CI, dependabot, 이슈/PR 템플릿, CodeQL
└── pnpm-workspace.yaml       # catalog 정의
```

## 개발

```bash
git clone https://github.com/blue45f/react-boilerplates.git
cd react-boilerplates
corepack enable                 # pnpm 10 활성화 (Node 22 권장)
pnpm install

pnpm dev                        # 모든 워크스페이스 dev 병렬 실행
pnpm build                      # 워크스페이스 토폴로지 빌드
pnpm typecheck
pnpm lint
pnpm test
pnpm test:coverage
pnpm storybook                  # templates/lib 스토리북
pnpm build-storybook:bootstrap  # templates/lib 의존성 설치 + 정적 Storybook 빌드
pnpm install:templates         # 템플릿 의존성 설치 (워크스페이스 제외)
pnpm e2e                        # 템플릿 E2E 테스트 실행(기존 템플릿 node_modules가 존재할 때)
pnpm e2e:app                    # App 템플릿 E2E만 실행
pnpm e2e:admin                  # Admin 템플릿 E2E만 실행
pnpm e2e:bootstrap              # App/Admin E2E 실행 전 템플릿 의존성 설치 포함
pnpm verify:templates           # 템플릿(App/Admin/Lib) 전체 품질 게이트(의존성 선행 가정)
pnpm verify:templates:bootstrap  # 템플릿 의존성 설치 + 품질 게이트
pnpm verify                     # 워크스페이스 + 템플릿 전체 품질 게이트
pnpm verify:push                # verify + 템플릿 보안 감사
pnpm format                     # prettier
pnpm changeset                  # 변경 사항 기록
```

> 모노레포 빌드는 `pnpm -r --workspace-concurrency=4 run build`로 의존성 그래프 토폴로지 빌드를 합니다. 원격 캐시가 정말 필요하다면 Turborepo를 다시 얹어도 되지만, 현재 규모에서는 pnpm만으로 충분합니다.

## 요구사항

- **Node.js** 22 이상 (LTS)
- **pnpm** 10 이상 — `corepack enable`만으로 활성화 가능

## 기술 스택

| 분류              | 기술                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| 빌드              | [Vite 8](https://vite.dev), [pnpm 10 workspace + catalog](https://pnpm.io)                                           |
| 언어              | [TypeScript 6](https://www.typescriptlang.org)                                                                       |
| UI 프레임워크     | CSS Modules, [Ant Design 5](https://ant.design), 자체 디자인 토큰                                                    |
| 라우팅            | [React Router 7](https://reactrouter.com)                                                                            |
| 서버 상태         | [TanStack Query 5](https://tanstack.com/query)                                                                       |
| 클라이언트 상태   | [Zustand 5](https://zustand.docs.pmnd.rs)                                                                            |
| HTTP              | [ky](https://github.com/sindresorhus/ky) (대안: [ofetch](https://github.com/unjs/ofetch))                            |
| 폼                | [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev)                                              |
| i18n/접근성       | [i18next](https://www.i18next.com), Playwright a11y/keyboard/responsive checks                                       |
| 차트              | [recharts](https://recharts.org) (admin)                                                                             |
| 컴포넌트 카탈로그 | [Storybook 10](https://storybook.js.org) + a11y/themes addon                                                         |
| 테스트            | [Vitest 4](https://vitest.dev), [Playwright](https://playwright.dev), [Testing Library](https://testing-library.com) |
| 코드 품질         | [ESLint 10 flat config](https://eslint.org), React Compiler, Prettier 3, Commitlint                                  |
| 릴리스            | [Changesets](https://github.com/changesets/changesets) (Provenance 지원)                                             |
| 보안              | CodeQL, Dependabot grouped updates                                                                                   |

## 라이선스

MIT
