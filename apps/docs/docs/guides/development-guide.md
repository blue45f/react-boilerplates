---
sidebar_position: 1
---

# 개발 가이드

이 저장소는 단순히 "React 프로젝트 하나를 복사해 주는 도구"가 아닙니다.
App, Admin, Library 템플릿을 계속 개선하고, 그 템플릿을 CLI로 배포하며, 공유 설정과 문서와 CI까지 함께 운영하는 React 프로젝트 표준 저장소입니다.

처음에는 아래 순서대로 보면 됩니다.

1. 새 프로젝트를 만들고 싶으면 `npx create-react-bp` 또는 `npx create-react-lib`를 사용합니다.
2. 템플릿 자체를 개선하고 싶으면 `templates/*`를 수정합니다.
3. 생성기 동작을 바꾸고 싶으면 `packages/cli/*`를 수정합니다.
4. ESLint, TypeScript, Vite, Vitest 기본값을 바꾸고 싶으면 `packages/configs/*`를 수정합니다.
5. 변경 후에는 템플릿 단위 검증과 전체 검증을 모두 통과시킵니다.

## 먼저 실행해 보기

로컬에서 저장소를 받았다면 이 순서로 확인합니다.

```bash
git clone https://github.com/blue45f/react-boilerplates.git
cd react-boilerplates
corepack enable
pnpm install
pnpm verify
```

`pnpm verify`는 워크스페이스와 템플릿의 lint, typecheck, test, build를 함께 실행합니다.
처음 환경에서는 템플릿 의존성 설치까지 포함하는 아래 명령이 더 확실합니다.

```bash
pnpm verify:templates:bootstrap
pnpm verify:push
```

E2E까지 확인하려면 브라우저 설치가 필요합니다.

```bash
pnpm --dir templates/app run test:e2e:install
pnpm --dir templates/admin run test:e2e:install
pnpm e2e:bootstrap
```

Storybook 정적 빌드는 Library 템플릿을 기준으로 확인합니다.

```bash
pnpm build-storybook:bootstrap
```

## React 빌드 도입 가이드

템플릿을 새로 추가하거나 기존 템플릿에 빌드 경로가 빠져 있을 때는 아래 기준으로 맞춘다.  
목표는 로컬/템플릿/CI 어디서도 같은 결과로 빌드가 통과되게 하는 것이다.

### 1) 템플릿 별 스크립트 표준

`templates/app`, `templates/admin`, `templates/lib`를 기준으로 아래가 최소 기준이다.

| 항목              | App / Admin                              | Library                                  |
| ----------------- | ---------------------------------------- | ---------------------------------------- |
| 빌드 스크립트     | `tsc -b && vite build`                   | `vite build`                             |
| 미리보기 스크립트 | `vite preview`                           | 생략 가능                                |
| 타입 검사         | `tsc -b --noEmit` 또는 `tsc -b` 기반     | `tsc --noEmit`                           |
| Storybook         | `pnpm storybook`, `pnpm build-storybook` | `pnpm storybook`, `pnpm build-storybook` |
| 필수 포맷         | `pnpm build`                             | `pnpm build`                             |

공통으로는 `pnpm verify`가 `format -> lint -> typecheck -> test:run -> build`를 묶기 때문에, 새 템플릿을 만들었다면 먼저 `verify` 스크립트에 빌드를 포함해야 한다.

### 2) Vite 설정 최소 조건

- `vite.config.ts`에 `@vitejs/plugin-react`를 넣고, React 19 기준이라면 `tsconfig`를 참조해 `jsx: react-jsx`가 동작하는지 확인한다.
- App/Admin은 단일 앱 번들 기준으로 `build.target` + `rollupOptions.manualChunks` 정도를 먼저 넣는다.
- Library는 패키지 소비자가 가져갈 수 있도록 `build.lib`, `formats: ['es', 'cjs']`, `vite-plugin-dts`를 둔다.
- 라이브러리에서 `peerDependencies`가 맞아야 `vite build` 산출물에서 런타임 번들이 늘어나는 일을 줄일 수 있다.

### 3) 템플릿별 실제 빌드 체크

템플릿 폴더를 직접 기준으로 실행해 CI와 동일한 동작을 재현한다.

```bash
# 템플릿 기준 프로덕션 빌드
pnpm --dir templates/app build
pnpm --dir templates/admin build
pnpm --dir templates/lib build

# 번들 결과 점검(필요 시 로컬 검증)
pnpm --dir templates/app run preview -- --host 127.0.0.1 --port 4173
```

루트에서 템플릿 의존성까지 포함해 한 번에 확인하려면 아래를 쓴다.

```bash
pnpm build:react:bootstrap
```

### 4) 템플릿 저장소로 반영할 때의 CI 연결

새로운 템플릿 혹은 빌드 스크립트를 추가한 경우 루트 스크립트 연동도 함께 한다.

1. `build:react` 또는 `verify:templates` 안에 템플릿 빌드 경로를 넣는다.
2. 템플릿 전용 `pnpm --dir templates/... run verify`가 실패하지 않으면 root 스크립트에도 동등하게 반영한다.
3. `.github/workflows/ci.yml`에 `verify`/`build-storybook:bootstrap` 연계가 있는지 확인한다.
4. 문서(개발 가이드/템플릿 가이드)에 `build`/`preview` 명령과 산출물 경로를 반영한다.

이 흐름을 지키면 템플릿 생성기(CLI)로 새 프로젝트를 만들었을 때도 동일하게 작동한다.

## 어디를 수정해야 할까

| 하고 싶은 일                         | 주로 수정하는 위치                        | 같이 확인할 것                                  |
| ------------------------------------ | ----------------------------------------- | ----------------------------------------------- |
| 일반 웹 앱 구조 개선                 | `templates/app`                           | App 단위 테스트, App E2E, App 문서              |
| 관리자 대시보드 개선                 | `templates/admin`                         | Admin 단위 테스트, Admin E2E, 접근성 라벨       |
| 컴포넌트 라이브러리 개선             | `templates/lib`                           | 컴포넌트 테스트, Storybook, public export       |
| 새 CLI 옵션 추가                     | `packages/cli/create-app`, `create-lib`   | CLI 테스트, 생성 결과의 package/scripts/files   |
| 공통 ESLint/TS/Vite/Vitest 설정 변경 | `packages/configs/*`                      | 해당 config를 쓰는 템플릿 전체 verify           |
| 의존성 버전 정렬                     | `pnpm-workspace.yaml`, 각 템플릿 lockfile | `pnpm install`, `pnpm outdated`, security audit |
| 사용자 문서 개선                     | `apps/docs/docs/*`, `README.md`           | `pnpm --filter @repo/docs run build`            |
| CI에서 빠진 검증 추가                | `.github/workflows/ci.yml`, root scripts  | 로컬에서 같은 명령을 먼저 실행                  |
| PR 리뷰 기준 조정                    | `.coderabbit.yaml`                        | 경로별 리뷰 지침과 개발가이드 링크              |

템플릿은 루트 workspace에 직접 포함하지 않습니다.
`templates/**`는 CLI가 복사할 원본이므로, 독립 프로젝트처럼 설치되고 빌드되어야 합니다.
그래서 루트 명령에는 `pnpm --dir templates/app ...` 형태가 많습니다.

## App 기능을 추가하는 흐름

새 화면이나 도메인을 추가할 때는 "페이지부터 만들고 나중에 정리"하기보다 아래 순서를 권장합니다.

1. `src/domains/<domain>/<feature>`를 만들고, 외부에서 쓸 항목은 public `index.ts`로만 노출합니다.
2. 화면은 해당 feature의 `components`에 두고, API 함수와 query hook은 같은 feature의 `api`/`model`에 둡니다.
3. route는 `src/app/routes/index.tsx`에 lazy route로 추가합니다.
4. 서버 상태는 TanStack Query, 브라우저 앱 상태는 `src/infrastructure/storage`, 도메인 UI 상태는 feature `model`로 나눕니다.
5. 새 문구는 `src/app/i18n/locales/ko.json`, `en.json`에 같은 key로 추가합니다.
6. 컴포넌트/훅/도메인 로직 단위 테스트를 먼저 추가하고, 중요한 사용자 흐름은 `e2e`에 추가합니다.

예를 들어 `orders` 기능을 만든다면 구조는 이렇게 시작합니다.

```text
src/domains/commerce/orders/
├── api/
│   └── ordersApi.ts
├── components/
│   ├── Orders.tsx
│   ├── Orders.module.css
│   └── Orders.test.tsx
├── model/
│   ├── orderSchema.ts
│   ├── ordersQueries.ts
│   └── ordersStore.ts
├── tests/
│   └── ordersApi.test.ts
└── index.ts
```

라우터에는 화면 구현만 lazy로 연결합니다.

```tsx
{
  path: 'orders',
  lazy: lazyPage(() => import('@/domains/commerce/orders')),
}
```

API 응답은 바로 컴포넌트에 흘려보내지 말고 zod schema로 한 번 검증합니다.
테스트에서는 API 함수, query hook, 화면 렌더링을 분리해서 검증하면 실패 원인을 찾기 쉽습니다.

## Admin 기능을 추가하는 흐름

Admin 템플릿은 Ant Design을 기반으로 하므로, 페이지 단위 작업의 기준은 "업무 화면"입니다.

1. 메뉴에 노출할 페이지인지 먼저 정합니다.
2. 보호 페이지라면 `ProtectedRoute` 아래에 라우트를 추가합니다.
3. 테이블, 폼, 모달은 AntD 컴포넌트를 사용하되 label, aria-label, loading, empty 상태를 빠뜨리지 않습니다.
4. mock API를 바꿀 때는 실제 API 교체가 쉬운 형태로 `src/infrastructure/mock`와 domain hook 사이의 경계를 유지합니다.
5. 로그인, 권한, 생성/수정/삭제처럼 실패 비용이 큰 흐름은 Playwright로 확인합니다.

테이블을 추가할 때 최소로 챙길 항목은 다음과 같습니다.

| 항목      | 확인 내용                                          |
| --------- | -------------------------------------------------- |
| 정렬/필터 | 컬럼 key, sorter, filter가 의도대로 동작하는지     |
| 빈 상태   | 데이터가 없을 때 사용자가 다음 행동을 알 수 있는지 |
| 로딩 상태 | skeleton/spinner가 레이아웃을 흔들지 않는지        |
| 행 액션   | 버튼 이름만으로 대상 사용자를 알 수 있는지         |
| 폼 검증   | zod 메시지가 실제 입력 위치와 연결되는지           |

## Library 컴포넌트를 추가하는 흐름

Library 템플릿에서는 public API가 가장 중요합니다.
컴포넌트를 만든 뒤 `src/index.ts`에서 export하지 않으면 사용자 프로젝트에서 쓸 수 없습니다.

새 컴포넌트는 이 단위를 맞춥니다.

```text
src/components/MyComponent/
├── MyComponent.tsx
├── MyComponent.module.css
├── MyComponent.test.tsx
├── MyComponent.stories.tsx
└── index.ts
```

추가할 때 체크할 기준입니다.

| 기준      | 설명                                                                    |
| --------- | ----------------------------------------------------------------------- |
| 타입      | props는 외부 사용자가 이해할 이름으로 export합니다.                     |
| 접근성    | interactive 요소는 role, label, keyboard 동작을 테스트합니다.           |
| 스타일    | 고정 색상보다 `tokens.css`의 CSS custom property를 우선 사용합니다.     |
| Storybook | 기본 상태, 비활성 상태, 에러/로딩 상태를 story로 보여줍니다.            |
| 테스트    | 렌더링, 이벤트, 접근성 속성, controlled/uncontrolled 동작을 검증합니다. |
| export    | `src/index.ts` barrel에 추가합니다.                                     |

Storybook에서만 필요한 설정은 `.storybook` 안에 두고, 라이브러리 빌드 산출물에는 들어가지 않게 합니다.

## 테스트를 어디에 추가할까

테스트는 "많이"보다 "변경 이유를 막아 주는 위치"가 중요합니다.

| 변경 내용                    | 우선 추가할 테스트                                |
| ---------------------------- | ------------------------------------------------- |
| 순수 함수, schema, formatter | Vitest unit test                                  |
| 컴포넌트 상태와 이벤트       | Testing Library component test                    |
| Query/mutation hook          | MSW handler + QueryClient test                    |
| i18n 문구 추가               | locale key sync test                              |
| 라우팅, 인증, 테마, 반응형   | Playwright E2E                                    |
| Library public API           | component/hook test + Storybook story             |
| CLI 파일 생성 결과           | CLI package test에서 생성 파일/스크립트/assertion |

작업 중에는 좁게 실행합니다.

```bash
pnpm --dir templates/app run test:run
pnpm --dir templates/admin run test:run
pnpm --dir templates/lib run test:run
```

마무리 전에는 넓게 실행합니다.

```bash
pnpm lint:secrets
pnpm verify:push
pnpm e2e:bootstrap
pnpm build-storybook:bootstrap
```

## 의존성 업그레이드 원칙

루트의 `pnpm-workspace.yaml`에는 workspace catalog가 있습니다.
여러 패키지가 같은 도구를 쓰면 각 `package.json`에 직접 버전을 흩뿌리기보다 `catalog:`로 맞춥니다.

업그레이드는 아래 순서로 진행합니다.

1. `pnpm outdated --recursive`로 후보를 확인합니다.
2. 루트 catalog 또는 해당 템플릿 `package.json`을 수정합니다.
3. 루트는 `pnpm install`, 템플릿은 `pnpm --dir templates/<name> install --ignore-workspace`로 lockfile을 갱신합니다.
4. peer dependency 경고가 있으면 패키지 공식 지원 범위를 확인하고, 억지로 무시하지 않습니다.
5. `pnpm verify:push`와 template security audit을 통과시킵니다.

템플릿의 lockfile은 사용자가 `npx create-*`로 받은 뒤 바로 설치할 수 있는지를 보장하는 자료입니다.
루트 lockfile만 맞고 템플릿 lockfile이 오래되면 생성된 프로젝트에서 다른 결과가 나올 수 있습니다.

## 자주 막히는 지점

| 증상                                      | 먼저 볼 것                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `pnpm install`에서 Node 버전 오류         | `node -v`, `corepack enable`, Node 22 이상 사용 여부                                              |
| 템플릿 명령이 workspace package를 못 찾음 | 템플릿은 workspace 제외 대상이므로 `pnpm --dir templates/app ...` 사용                            |
| Storybook build가 아무 것도 하지 않음     | root script가 `templates/lib`를 직접 가리키는지 확인                                              |
| Playwright 브라우저가 없다고 나옴         | `pnpm --dir templates/app run test:e2e:install` 실행                                              |
| Docusaurus 링크 오류                      | sidebar id와 실제 `apps/docs/docs/**.md` 경로 일치 여부 확인                                      |
| secretlint가 fixture를 오탐함             | 실제 secret인지 먼저 확인하고, fixture라면 `.secretlintignore`보다 테스트 데이터 구조를 우선 수정 |
| Vite chunk 경고                           | 실제 사용자 chunk인지, Storybook/테스트 런타임 chunk인지 먼저 구분                                |
| security audit 실패                       | 취약 패키지가 직접 의존성인지 transitive인지 보고 override 범위 결정                              |

## 변경 전 체크리스트

작업을 시작하기 전에 세 가지만 확인하면 시행착오가 줄어듭니다.

- 이 변경은 템플릿 사용자에게 필요한가, 저장소 운영자에게 필요한가?
- 생성된 프로젝트에도 같은 파일/스크립트가 들어가야 하는가?
- 단위 테스트, E2E, Storybook, 문서 중 어디에서 사용자가 이 변경을 확인할 수 있는가?

## 변경 후 체크리스트

PR이나 푸시 전에 아래 순서로 확인합니다.

```bash
pnpm format:check
pnpm lint:secrets
pnpm verify:push
pnpm e2e:bootstrap
pnpm build-storybook:bootstrap
pnpm outdated --recursive
```

문서만 바꿨더라도 Docusaurus build는 실행합니다.

```bash
pnpm --filter @repo/docs run build
```

마지막으로 `git diff --check`로 공백 오류를 확인합니다.
검증 결과가 통과하더라도 문서가 실제 파일 구조와 맞지 않으면 사용자에게는 실패한 가이드가 됩니다.
