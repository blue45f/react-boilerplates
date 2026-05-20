---
sidebar_position: 1
---

# App 템플릿

Chakra UI 3 + React Router 7 기반의 일반 웹 앱 템플릿입니다. 다크모드, react-hook-form + zod 폼 검증, MSW 브라우저 워커가 사전 구성되어 있습니다.

## 기술 스택

| 기술                  | 버전  | 용도                         |
| --------------------- | ----- | ---------------------------- |
| React                 | 19    | UI 라이브러리                |
| Vite                  | 6     | 빌드 도구                    |
| Chakra UI             | 3     | UI 컴포넌트 + 디자인 토큰    |
| React Router          | 7     | 클라이언트 라우팅            |
| Tanstack Query        | 5     | 서버 상태 (데이터 페칭/캐싱) |
| Zustand               | 5     | 클라이언트 상태              |
| react-hook-form + zod | 7 / 3 | 폼 상태 + 스키마 검증        |
| MSW                   | 2     | API mocking (브라우저/노드)  |
| Vitest                | 3     | 단위 테스트                  |
| Playwright            | 1     | E2E 테스트                   |

## 생성 방법

```bash
npx create-react-bp my-app
npx create-react-bp my-app --template app
```

## 디렉토리 구조 (요약)

```
my-app/
├── src/
│   ├── main.tsx              # Providers (Chakra / Query / Router) 설정
│   ├── App.tsx               # 라우트 (코드 스플리팅)
│   ├── components/           # Layout, ErrorBoundary 등
│   ├── pages/                # Home, About, Posts, Contact, Settings, NotFound
│   ├── hooks/                # usePosts 등 query 훅
│   ├── stores/               # Zustand (useAppStore)
│   ├── theme/                # 디자인 토큰, 다크모드 설정
│   ├── mocks/                # MSW handlers + browser worker
│   └── lib/                  # api 클라이언트 등
├── e2e/                      # Playwright 스펙
├── public/                   # 정적 자산
├── index.html
├── vite.config.ts
└── playwright.config.ts
```

## 페이지

| 경로        | 페이지   | 설명                                           |
| ----------- | -------- | ---------------------------------------------- |
| `/`         | Home     | 인트로                                         |
| `/about`    | About    | 소개                                           |
| `/posts`    | Posts    | Tanstack Query 데이터 페칭 예시 (MSW로 mocked) |
| `/contact`  | Contact  | **react-hook-form + zod** 폼 검증 예시         |
| `/settings` | Settings | 사용자 설정 (테마 토글 포함)                   |
| `*`         | NotFound | 404                                            |

## 다크모드

Chakra UI 3의 color mode를 사용합니다.

```tsx
import { useColorMode } from '@chakra-ui/react';

const { colorMode, toggleColorMode } = useColorMode();
```

테마 토큰은 `src/theme/`에서 확장합니다. 사용자 선택은 localStorage에 보존됩니다.

## react-hook-form + zod

`/contact` 페이지에 입력 검증을 위한 패턴이 포함되어 있습니다.

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  message: z.string().min(1, '내용은 필수입니다'),
});
type FormValues = z.infer<typeof schema>;

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({
  resolver: zodResolver(schema),
});
```

스키마는 단일 소스로 두어 클라이언트 검증과 서버 응답 파싱 모두에 재사용할 수 있습니다.

## MSW (API Mocking)

`src/mocks/` 디렉토리에 핸들러와 워커가 정의되어 있습니다.

- **브라우저(개발용)**: `src/mocks/browser.ts` — `worker.start()`로 dev에서 네트워크 가로채기
- **노드(테스트용)**: `src/mocks/server.ts` — Vitest setup에서 `server.listen()`

```bash
# MSW 서비스 워커 (한 번만 실행)
npx msw init public/ --save
```

`main.tsx`에서 dev 모드일 때만 워커를 시작합니다.

```ts
if (import.meta.env.DEV) {
  const { worker } = await import('@/mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}
```

## 데이터 페칭 (Tanstack Query)

```ts
// src/hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then((r) => r.json()),
  });
}
```

`QueryClientProvider`는 `main.tsx`에 이미 구성되어 있습니다.

## 명령어

| 명령어               | 설명                                 |
| -------------------- | ------------------------------------ |
| `pnpm dev`           | 개발 서버 (포트 3000, MSW 자동 시작) |
| `pnpm build`         | 프로덕션 빌드                        |
| `pnpm preview`       | 빌드 미리보기                        |
| `pnpm test`          | 단위 테스트 (Vitest)                 |
| `pnpm test:coverage` | 커버리지                             |
| `pnpm test:e2e`      | E2E (Playwright headless)            |
| `pnpm test:e2e:ui`   | Playwright UI 모드                   |
| `pnpm lint`          | ESLint                               |

## 환경 변수

`.env`로 관리하며 `VITE_` 접두사가 붙은 변수만 클라이언트에서 노출됩니다.

```bash
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=My App
```

`src/vite-env.d.ts`에 `ImportMetaEnv` 타입을 선언해 타입 안전하게 사용하세요.
