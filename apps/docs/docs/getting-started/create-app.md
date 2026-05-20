---
sidebar_position: 2
---

# App 생성하기

`create-react-bp` CLI로 React 앱 (Chakra UI) 또는 관리자 대시보드 (Ant Design)를 생성합니다.

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
# App 템플릿 (Chakra UI)
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

| 명령어               | 설명                                 |
| -------------------- | ------------------------------------ |
| `pnpm dev`           | 개발 서버 (포트 3000, MSW 자동 시작) |
| `pnpm build`         | 프로덕션 빌드                        |
| `pnpm preview`       | 빌드 미리보기                        |
| `pnpm test`          | 단위 테스트 (Vitest)                 |
| `pnpm test:coverage` | 커버리지                             |
| `pnpm test:e2e`      | E2E 테스트 (Playwright)              |
| `pnpm test:e2e:ui`   | Playwright UI 모드                   |
| `pnpm lint`          | ESLint 검사                          |

:::tip MSW 워커
처음 실행 전 한 번 `npx msw init public/ --save`로 service worker를 등록해야 브라우저에서 mocking이 동작합니다. (템플릿이 자동 설정한 경우 스킵)
:::

## 환경 변수

```bash
# .env
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=My App
```

`VITE_` 접두사가 붙은 변수만 클라이언트에 노출됩니다. 타입은 `src/vite-env.d.ts`에 선언하세요.

## 데이터 페칭 (Tanstack Query)

```tsx
// src/hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then((r) => r.json()),
  });
}
```

자세한 페이지/MSW/폼 검증 패턴은 [App 템플릿](/templates/app) 또는 [Admin 템플릿](/templates/admin) 문서를 참고하세요.
