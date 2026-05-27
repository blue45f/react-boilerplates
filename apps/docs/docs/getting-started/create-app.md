---
sidebar_position: 2
---

# App 생성하기

`create-react-bp` CLI로 일반 React 앱 또는 관리자 대시보드 (Ant Design)를 생성합니다.

## 사용법

```bash
npx create-react-bp [프로젝트명]
```

### 대화형 모드

```bash
npx create-react-bp
```

### 옵션

| 옵션                    | 설명                         |
| ----------------------- | ---------------------------- |
| `[name]`                | 프로젝트 폴더명 (positional) |
| `-t, --template <type>` | 템플릿: `app` \| `admin`     |
| `-h, --help`            | 도움말                       |
| `-V, --version`         | 버전                         |

### 예시

```bash
# App 템플릿 (CSS Modules + Data Router)
npx create-react-bp my-app -t app

# Admin 템플릿 (Ant Design)
npx create-react-bp my-admin -t admin
```

## 생성된 프로젝트 실행

```bash
cd my-app
pnpm install
pnpm dev
```

## 사용 가능한 명령어

| 명령어               | 설명                             |
| -------------------- | -------------------------------- |
| `pnpm dev`           | Vite 개발 서버                   |
| `pnpm build`         | 프로덕션 빌드                    |
| `pnpm preview`       | 빌드 미리보기                    |
| `pnpm test`          | 단위 테스트 (Vitest)             |
| `pnpm test:run`      | 단위 테스트 단일 실행            |
| `pnpm test:coverage` | 커버리지                         |
| `pnpm test:e2e`      | E2E 테스트 (Playwright)          |
| `pnpm lint`          | ESLint 검사                      |
| `pnpm typecheck`     | TypeScript 타입 검사             |
| `pnpm verify`        | format/lint/typecheck/test/build |

:::tip 테스트 코드
App 템플릿은 컴포넌트, 훅, 라우터, i18n, feature 모듈, Playwright E2E 테스트를 함께 제공합니다.
:::

## 환경 변수

```bash
# .env
VITE_API_URL=http://localhost:8080/api
```

`VITE_` 접두사가 붙은 변수만 클라이언트에 노출됩니다. 타입은 `src/vite-env.d.ts`에 선언하세요.

## 데이터 페칭 (TanStack Query)

```tsx
// src/domains/todos/list/model/todosQueries.ts
import { useQuery } from '@tanstack/react-query';

import { fetchTodos } from '../api/todosApi';

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
}
```

자세한 앱 아키텍처와 테스트 구성은 [App 템플릿](/templates/app) 또는 [Admin 템플릿](/templates/admin) 문서를 참고하세요.
