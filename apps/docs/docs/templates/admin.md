---
sidebar_position: 2
---

# Admin 템플릿

Ant Design 5 기반의 관리자 대시보드 템플릿입니다. 보호 라우트(인증 가드), recharts 기반 대시보드 차트, 사용자 관리 테이블/모달, 로그인 페이지가 포함됩니다.

## 기술 스택

| 기술                  | 버전  | 용도                            |
| --------------------- | ----- | ------------------------------- |
| React                 | 19    | UI 라이브러리                   |
| Vite                  | 8     | 빌드 도구                       |
| Ant Design            | 5     | 엔터프라이즈 UI 컴포넌트        |
| recharts              | 2     | 대시보드 차트                   |
| React Router          | 7     | 클라이언트 라우팅 (보호 라우트) |
| Tanstack Query        | 5     | 서버 상태 (API 데이터)          |
| Zustand               | 5     | 인증/UI 상태                    |
| react-hook-form + zod | 7 / 4 | 로그인/설정 폼 검증             |
| TypeScript            | 6     | 타입 안전성                     |
| Vitest                | 4     | 단위 테스트                     |
| Playwright            | 1     | E2E 테스트 (로그인 플로우 등)   |

## 생성 방법

```bash
npx create-react-bp my-admin --template admin
```

## 디렉토리 구조 (요약)

```
my-admin/
├── src/
│   ├── main.tsx                # Providers (AntD ConfigProvider / Query / Router)
│   ├── App.tsx                 # 라우트 (보호 라우트 포함)
│   ├── components/
│   │   ├── AdminLayout.tsx     # 사이드바 + 헤더
│   │   ├── ProtectedRoute.tsx  # 인증 가드
│   │   └── ErrorBoundary.tsx
│   ├── pages/
│   │   ├── Login.tsx           # 로그인 페이지 (rhf + zod)
│   │   ├── Dashboard.tsx       # 통계 카드 + recharts
│   │   ├── Users.tsx           # 사용자 테이블 + 생성/수정 모달
│   │   ├── Settings.tsx        # 시스템 설정
│   │   └── NotFound.tsx
│   ├── stores/                 # useAuthStore 등
│   ├── styles/                 # global.css
│   └── lib/                    # api 클라이언트
├── e2e/                        # Playwright (로그인 → 대시보드 시나리오)
└── playwright.config.ts
```

## 보호 라우트

`ProtectedRoute` 컴포넌트가 `useAuthStore`를 확인하고, 인증되지 않은 경우 `/login`으로 리다이렉트합니다.

```tsx
import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/useAuthStore';

export function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

// App.tsx
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<Dashboard />} />
  <Route path="/users" element={<Users />} />
  <Route path="/settings" element={<Settings />} />
</Route>
<Route path="/login" element={<Login />} />
```

## Dashboard (recharts)

`Dashboard.tsx`는 AntD `Statistic` 카드와 함께 recharts의 `LineChart` / `BarChart` / `PieChart` 등을 조합한 패널을 보여줍니다.

```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={280}>
  <LineChart data={series}>
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="users" stroke="#1677ff" />
  </LineChart>
</ResponsiveContainer>;
```

## Users 페이지

- AntD `Table`: 정렬, 필터, 페이지네이션
- "추가" 버튼 → `Modal` 안에 react-hook-form + zod로 검증되는 사용자 생성 폼
- 행 액션(`Edit` / `Delete`)에는 사용자 이름이 포함된 `aria-label`을 적용

## Login

`/login` 페이지는 react-hook-form + zod로 검증하며, 성공 시 `useAuthStore.login(user)`로 상태를 채우고 `/`로 이동합니다.

```tsx
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

## 라우트 요약

| 경로        | 페이지    | 인증 |
| ----------- | --------- | ---- |
| `/login`    | Login     | 공개 |
| `/`         | Dashboard | 보호 |
| `/users`    | Users     | 보호 |
| `/settings` | Settings  | 보호 |
| `*`         | NotFound  | 공개 |

## 접근성

- skip link (본문 건너뛰기)
- 사이드바/메뉴/테이블 ARIA 라벨
- 모달은 ESC 닫기, 포커스 트랩

## 명령어

| 명령어             | 설명               |
| ------------------ | ------------------ |
| `pnpm dev`         | 개발 서버          |
| `pnpm build`       | 프로덕션 빌드      |
| `pnpm test`        | 단위 테스트        |
| `pnpm test:e2e`    | Playwright E2E     |
| `pnpm test:e2e:ui` | Playwright UI 모드 |
| `pnpm lint`        | ESLint             |
| `pnpm typecheck`   | TypeScript 검사    |
| `pnpm verify`      | 전체 품질 게이트   |
