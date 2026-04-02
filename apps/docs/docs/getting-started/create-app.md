---
sidebar_position: 2
---

# App 생성하기

`create-react-bp` CLI를 사용하여 React 앱을 생성합니다.

## 사용법

```bash
npx create-react-bp [프로젝트명]
```

### 대화형 모드

프로젝트명 없이 실행하면 대화형 모드로 진입합니다:

```bash
npx create-react-bp
```

### 옵션

| 옵션 | 설명 |
|------|------|
| `-t, --template <type>` | 템플릿 타입 (app, admin) |

### 예시

```bash
# App 템플릿으로 생성
npx create-react-bp my-app -t app

# Admin 템플릿으로 생성
npx create-react-bp my-admin -t admin
```

## 생성된 프로젝트 실행

```bash
cd my-app
pnpm install
pnpm dev
```

## 사용 가능한 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 시작 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm preview` | 빌드 미리보기 |
| `pnpm test` | 단위 테스트 실행 (Vitest) |
| `pnpm test:coverage` | 테스트 커버리지 확인 |
| `pnpm test:e2e` | E2E 테스트 실행 (Playwright) |
| `pnpm test:e2e:ui` | E2E 테스트 UI 모드 |
| `pnpm lint` | ESLint 검사 |

## 환경 변수

프로젝트 루트에 `.env` 파일을 생성하여 환경 변수를 설정합니다:

```bash
# .env.example 참고
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=My App
```

`VITE_` 접두사가 붙은 변수만 클라이언트에서 접근 가능합니다. 타입 안전한 사용을 위해 `src/vite-env.d.ts`에 타입이 선언되어 있습니다.

## 데이터 페칭 (Tanstack Query)

생성된 프로젝트에 `게시글` 페이지가 포함되어 있어 Tanstack Query 사용법을 확인할 수 있습니다:

```tsx
// src/hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => api.get('posts').json(),
  });
}

// 컴포넌트에서 사용
const { data, isLoading, error } = usePosts();
```
