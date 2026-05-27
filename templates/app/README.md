# React App Template

프로덕션 수준의 React 애플리케이션을 빠르게 시작할 수 있는 App 템플릿입니다.  
최소한의 의존성으로 TypeScript, Vite, React Router 기반의 견고한 프로젝트 구조를 제공합니다.

## 주요 기능

- **React 19** - Actions, `useId`, `ref` as prop 등 최신 기능 지원
- **TypeScript 6** - 엄격한 타입 안전성 (`strict: true`)
- **Vite 8** - Rolldown 기반 초고속 빌드와 HMR
- **React Router 7 Data Router** - route-level lazy module 기반 라우팅
- **CSS Modules** - 컴포넌트 스코프 스타일링
- **TanStack Query + Zustand** - 서버 상태와 클라이언트 상태 분리
- **Vitest** - 빠른 단위 테스트 프레임워크
- **Path Aliases** - `@app`, `@domains`, `@infrastructure`, `@shared`, `@ui` 등 경계가 드러나는 import 경로
- **ESLint 10** - React Hooks, React Refresh 플러그인 포함
- **다크 모드** - 시스템 테마 감지 + 수동 토글, localStorage 영속화
- **접근성(a11y)** - Skip Link, focus-visible, aria 속성, reduced-motion 대응
- **Error Boundary** - 전역 에러 처리
- **코드 스플리팅** - React Router `lazy` route module + Vite 청크 분리
- **품질 게이트** - Husky, lint-staged, commitlint, 보안 audit, pre-push 검증

## 빠른 시작

### 요구 사항

- Node.js 22+
- pnpm 10+

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

### 사용 가능한 스크립트

| 스크립트             | 설명                                  |
| -------------------- | ------------------------------------- |
| `pnpm dev`           | Vite 개발 서버 실행 (HMR 지원)        |
| `pnpm build`         | TypeScript 타입 검사 후 프로덕션 빌드 |
| `pnpm lint`          | ESLint 코드 검사                      |
| `pnpm preview`       | 프로덕션 빌드 로컬 미리보기           |
| `pnpm test`          | Vitest 테스트 실행 (watch 모드)       |
| `pnpm test:run`      | Vitest 단일 테스트 실행               |
| `pnpm test:coverage` | 테스트 커버리지 리포트                |
| `pnpm test:i18n`     | i18n 로케일 키 동기화 테스트          |
| `pnpm lint:security` | ESLint 보안 규칙 + dependency audit   |
| `pnpm verify`        | 포맷, lint, typecheck, test, build    |
| `pnpm typecheck`     | TypeScript 타입 검사만 실행           |

## 프로젝트 구조

```
src/
├── app/                 # Provider, QueryClient, route, shell, i18n, global styles
│   ├── i18n/
│   ├── providers/
│   ├── routes/
│   ├── shell/
│   └── styles/
├── domains/             # 도메인/기능별 components, api, model, tests
│   ├── marketing/home/
│   ├── content/about/
│   ├── todos/list/
│   └── system/not-found/
├── infrastructure/      # HTTP client, MSW, browser storage adapter
├── shared/              # 도메인 중립 UI, hooks, config, lib
├── test/                # 테스트 설정
├── types/               # 공유 TypeScript 타입 정의
└── main.tsx             # 애플리케이션 진입점 (DOM mount only)
```

## 핵심 아키텍처

### 상태 관리

서버 상태와 클라이언트 상태를 분리합니다.
서버 상태는 **TanStack Query**, 앱 전역 클라이언트 상태는 **Zustand**로 관리합니다.

```typescript
import { useAppStore } from '@/infrastructure/storage'

const theme = useAppStore((state) => state.theme)
const setTheme = useAppStore((state) => state.setTheme)
setTheme('dark')
```

### 코드 스플리팅

페이지 라우트는 React Router Data Router의 `lazy` route module로 동적 import됩니다.
라우트 매칭 정보는 정적으로 유지하고, 화면 컴포넌트만 필요 시점에 로드합니다.

```tsx
{ index: true, lazy: lazyPage(() => import('@/domains/marketing/home')) }
{ path: 'about', lazy: lazyPage(() => import('@/domains/content/about')) }
```

### Error Boundary

전역 `ErrorBoundary`가 런타임 에러를 포착하여 사용자에게 복구 UI를 제공합니다.
커스텀 fallback을 제공하거나 기본 에러 UI를 사용할 수 있습니다.

### API 클라이언트

Fetch API 기반의 타입 안전한 HTTP 클라이언트를 제공합니다.

```typescript
import api from '@/infrastructure/http'

const { data } = await api.get<User[]>('/users')
const { data } = await api.post<User>('/users', { name: '홍길동' })
const { data } = await api.get<User[]>('/users', {
  params: { page: '1', limit: '10' },
})
```

환경 변수 `VITE_API_URL`로 API 기본 URL을 설정합니다 (기본값: `/api`).

### Path Aliases

`tsconfig.json`과 `vite.config.ts`에 동기화된 path alias가 설정되어 있습니다.

| Alias               | 경로                   |
| ------------------- | ---------------------- |
| `@/*`               | `src/*`                |
| `@app/*`            | `src/app/*`            |
| `@domains/*`        | `src/domains/*`        |
| `@infrastructure/*` | `src/infrastructure/*` |
| `@shared/*`         | `src/shared/*`         |
| `@ui/*`             | `src/shared/ui/*`      |
| `@types/*`          | `src/types/*`          |

### 커스텀 훅

| 훅                                   | 설명                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| `useDebounce(value, delay)`          | 값 변경을 지정된 시간만큼 지연                               |
| `useLocalStorage(key, initialValue)` | localStorage와 동기화되는 상태 (탭 간 동기화 지원)           |
| `useFetch<T>(url, options)`          | Fetch API 기반 데이터 페칭 (상태 관리 포함)                  |
| `useMediaQuery(query)`               | CSS 미디어 쿼리 매칭 상태                                    |
| `useTheme()`                         | 다크/라이트 테마 토글, 시스템 테마 감지, localStorage 영속화 |
| `useForm(options)`                   | 폼 상태 관리, 유효성 검사, 제출 처리                         |
| `useDocumentTitle(title)`            | 페이지별 문서 타이틀 관리 (SEO)                              |
| `useClickOutside(handler)`           | 엘리먼트 외부 클릭 감지                                      |
| `useScrollLock(locked)`              | 스크롤 잠금 (모달 등에 사용)                                 |
| `usePrevious(value)`                 | 이전 렌더링 시의 값 기억                                     |
| `useOnlineStatus()`                  | 네트워크 온/오프라인 상태 감지                               |
| `useInterval(callback, delay)`       | setInterval 선언적 래퍼 (null로 일시정지)                    |
| `useKeyPress(key)`                   | 특정 키 누름 상태 감지                                       |
| `useClipboard(resetDelay)`           | 클립보드 복사 + 복사 완료 상태 관리                          |
| `useWindowSize()`                    | 윈도우 크기 변경 감지 (rAF 최적화)                           |
| `useIntersectionObserver(opts)`      | 뷰포트 교차 감지 (lazy loading, 무한 스크롤)                 |
| `useReducedMotion()`                 | 사용자의 모션 감소 선호 감지                                 |
| `useAppContext()`                    | 앱 전역 상태 접근을 위한 타입 안전 훅                        |

### 유틸리티 함수

| 함수                     | 설명                           |
| ------------------------ | ------------------------------ |
| `cn(...classes)`         | 조건부 클래스명 결합           |
| `formatDate(date)`       | 한국어 날짜 포맷팅             |
| `formatCurrency(amount)` | KRW 통화 포맷팅                |
| `truncate(text, length)` | 말줄임 텍스트 처리             |
| `deepClone(obj)`         | structuredClone 기반 깊은 복사 |
| `chunk(array, size)`     | 배열 분할                      |
| `isValidEmail(email)`    | 이메일 유효성 검사             |
| `generateId()`           | crypto.randomUUID 기반 ID 생성 |
| `sleep(ms)`              | Promise 기반 지연              |
| `throttle(fn, delay)`    | 함수 실행 빈도 제한            |
| `clamp(value, min, max)` | 숫자 범위 제한                 |

## 컴포넌트

### Button

다양한 변형과 크기를 지원하는 버튼 컴포넌트입니다.

```tsx
<Button variant="primary" size="lg">시작하기</Button>
<Button variant="outline" isLoading>처리 중...</Button>
<Button variant="ghost" fullWidth>전체 너비</Button>
```

**Props:** `variant` (primary | secondary | outline | ghost), `size` (sm | md | lg), `fullWidth`, `isLoading`

### Input

레이블, 에러 상태, 도움말을 지원하는 입력 컴포넌트입니다. React 19의 `ref` as prop을 사용합니다.

```tsx
<Input label="이메일" error="올바른 이메일을 입력하세요" />
<Input label="이름" helperText="한글 또는 영문" />
```

**Props:** `label`, `error`, `helperText`, `ref` + 모든 HTML input 속성

### Textarea

여러 줄 텍스트 입력 컴포넌트입니다. Input과 동일한 API를 제공합니다.

```tsx
<Textarea label="메시지" placeholder="내용을 입력하세요" />
<Textarea label="비고" error="필수 항목입니다" />
```

**Props:** `label`, `error`, `helperText`, `ref` + 모든 HTML textarea 속성

### Toast

알림 메시지를 표시하는 토스트 시스템입니다. `ToastProvider`로 감싸고 `useToast()`로 사용합니다.

```tsx
import { useToast } from '@/shared/ui'

const { toast } = useToast()
toast('저장되었습니다', 'success')
toast('오류가 발생했습니다', 'error')
toast('주의가 필요합니다', 'warning')
toast('안내 메시지', 'info', 5000) // 5초 후 자동 닫힘
```

**타입:** `success` | `error` | `warning` | `info`

### ErrorBoundary

런타임 에러를 포착하는 에러 경계 컴포넌트입니다.

```tsx
<ErrorBoundary fallback={<p>오류 발생</p>}>
  <MyComponent />
</ErrorBoundary>
```

### ThemeToggle

다크/라이트 모드를 전환하는 토글 버튼입니다. Header에 기본 포함됩니다.

```tsx
<ThemeToggle />
```

시스템 테마를 자동 감지하며, 사용자 선택을 localStorage에 저장합니다.

### SkipLink

키보드 사용자를 위한 본문 건너뛰기 링크입니다. Tab 키로 포커스 시 화면에 표시됩니다.

```tsx
<SkipLink targetId="main-content" text="본문으로 건너뛰기" />
```

### Modal

포탈 기반 모달 다이얼로그입니다. ESC 키 닫기, 오버레이 클릭 닫기, 스크롤 잠금을 지원합니다.

```tsx
<Modal isOpen={isOpen} onClose={close} title="확인" size="md">
  <p>정말 삭제하시겠습니까?</p>
</Modal>
```

**Props:** `isOpen`, `onClose`, `title`, `size` (sm | md | lg), `closeOnOverlay`

### Badge

상태나 카테고리를 표시하는 배지 컴포넌트입니다.

```tsx
<Badge variant="success">활성</Badge>
<Badge variant="error">오류</Badge>
<Badge variant="warning">경고</Badge>
```

**Props:** `variant` (default | primary | success | warning | error)

### Card

컨텐츠를 구조화하는 카드 컴포넌트입니다. Header, Body, Footer 서브컴포넌트를 제공합니다.

```tsx
<Card hoverable>
  <Card.Header>제목</Card.Header>
  <Card.Body>내용</Card.Body>
  <Card.Footer>
    <Button>확인</Button>
  </Card.Footer>
</Card>
```

**Props:** `padding` (none | sm | md | lg), `hoverable`

### Tabs

WAI-ARIA 탭 패턴을 준수하는 접근성 탭 컴포넌트입니다. 키보드 화살표 네비게이션을 지원합니다.

```tsx
<Tabs
  tabs={[
    { id: 'info', label: '정보', content: <InfoPanel /> },
    { id: 'settings', label: '설정', content: <SettingsPanel /> },
  ]}
  defaultTab="info"
  onChange={(tabId) => console.log(tabId)}
/>
```

**Props:** `tabs`, `defaultTab`, `onChange`

### Avatar

사용자 프로필 이미지 또는 이름 이니셜을 표시하는 아바타 컴포넌트입니다.

```tsx
<Avatar src="/photo.jpg" alt="홍길동" size="lg" />
<Avatar name="홍 길동" />  {/* 이니셜 "홍길" 표시 */}
```

**Props:** `src`, `alt`, `name`, `size` (sm | md | lg | xl)

### ProtectedRoute

인증되지 않은 사용자를 리다이렉트하는 라우트 가드입니다.

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute redirectTo="/login">
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Select

네이티브 select를 스타일링한 드롭다운 컴포넌트입니다. Input과 동일한 레이블/에러 API를 제공합니다.

```tsx
<Select
  label="국가"
  options={[
    { value: 'kr', label: '한국' },
    { value: 'us', label: '미국' },
  ]}
  placeholder="선택하세요"
/>
```

### Tooltip

마우스 호버/포커스 시 설명을 표시하는 툴팁 컴포넌트입니다.

```tsx
<Tooltip content="삭제합니다" position="top">
  <Button variant="ghost">삭제</Button>
</Tooltip>
```

**Props:** `content`, `position` (top | bottom | left | right), `delay`

### Pagination

페이지 네비게이션 컴포넌트입니다. 줄임표, 이전/다음, aria 속성을 지원합니다.

```tsx
<Pagination currentPage={3} totalPages={10} onPageChange={setPage} />
```

**Props:** `currentPage`, `totalPages`, `onPageChange`, `siblingCount`

### Skeleton

콘텐츠 로딩 자리 표시 컴포넌트입니다. 시머 애니메이션으로 로딩 상태를 표시합니다.

```tsx
<Skeleton variant="text" lines={3} />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="rectangular" width="100%" height={200} />
```

**Props:** `variant` (text | circular | rectangular), `width`, `height`, `lines`

### Breadcrumb

현재 위치를 계층적으로 표시하는 네비게이션 컴포넌트입니다.

```tsx
<Breadcrumb
  items={[
    { label: '홈', href: '/' },
    { label: '카테고리', href: '/category' },
    { label: '현재 페이지' },
  ]}
/>
```

**Props:** `items`, `separator`

### Accordion

접었다 펼 수 있는 콘텐츠 섹션 컴포넌트입니다. 다중 열기를 지원합니다.

```tsx
<Accordion
  items={[
    { id: 'faq1', title: '질문 1', content: <p>답변 1</p> },
    { id: 'faq2', title: '질문 2', content: <p>답변 2</p> },
  ]}
  allowMultiple
  defaultOpen={['faq1']}
/>
```

**Props:** `items`, `allowMultiple`, `defaultOpen`

### Loading

로딩 상태를 표시하는 스피너 컴포넌트입니다.

```tsx
<Loading size="lg" text="데이터를 불러오는 중..." />
```

**Props:** `size` (sm | md | lg), `text`

### Switch

온/오프 토글 스위치 컴포넌트입니다. WAI-ARIA `role="switch"`를 사용합니다.

```tsx
<Switch checked={isEnabled} onChange={setIsEnabled} label="알림 수신" />
<Switch checked={isDark} onChange={toggleDark} size="sm" />
```

**Props:** `checked`, `onChange`, `label`, `disabled`, `size` (sm | md)

### Alert

정보, 성공, 경고, 에러 알림 배너 컴포넌트입니다.

```tsx
<Alert variant="success" title="완료">저장되었습니다.</Alert>
<Alert variant="error" dismissible>오류가 발생했습니다.</Alert>
```

**Props:** `variant` (info | success | warning | error), `title`, `dismissible`, `onDismiss`

### Progress

진행 상태를 표시하는 프로그레스 바 컴포넌트입니다.

```tsx
<Progress value={75} showLabel />
<Progress value={3} max={10} variant="success" label="3/10 완료" showLabel />
```

**Props:** `value`, `max`, `variant`, `size` (sm | md | lg), `showLabel`, `label`

### Divider

구분선 컴포넌트입니다. 수평/수직, 레이블 포함을 지원합니다.

```tsx
<Divider />
<Divider label="또는" />
<Divider orientation="vertical" />
```

### EmptyState

데이터가 없을 때 표시하는 빈 상태 컴포넌트입니다.

```tsx
<EmptyState
  title="결과 없음"
  description="검색 결과가 없습니다."
  icon="📭"
  action={<Button>추가</Button>}
/>
```

### LazyImage

Intersection Observer 기반 지연 로딩 이미지 컴포넌트입니다. 시머 플레이스홀더와 에러 처리를 포함합니다.

```tsx
<LazyImage src="/photo.jpg" alt="설명" width={400} height={300} />
```

## 테스트

Vitest + React Testing Library로 테스트를 작성합니다.

```bash
pnpm test        # watch 모드
pnpm test:run    # 단일 실행
```

```typescript
// helpers.test.ts
import { describe, it, expect } from 'vitest'
import { cn } from './helpers'

describe('cn', () => {
  it('여러 클래스를 결합한다', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })
})
```

## 환경 변수

프로젝트 루트에 `.env` 파일을 생성하여 환경 변수를 설정합니다.

```env
VITE_API_URL=https://api.example.com
```

`VITE_` 접두사가 붙은 변수만 클라이언트 코드에서 접근 가능합니다.

## 커스터마이징

이 프로젝트를 기반으로 새 프로젝트를 시작할 때:

1. `package.json`의 `name`, `version` 수정
2. `src/domains/<domain>/<feature>/` 아래에 화면/도메인 로직 추가 후 `src/app/routes/index.tsx`에 lazy 라우트 등록
3. `src/shared/ui/`에 도메인 중립 공통 컴포넌트 추가
4. `src/app/styles/global.css`의 CSS 변수로 테마 커스터마이징
5. 필요시 `.env` 파일로 API URL 등 환경 변수 설정

## 기술 스택

| 카테고리        | 기술                     | 버전      |
| --------------- | ------------------------ | --------- |
| UI 프레임워크   | React                    | ^19.2.6   |
| 언어            | TypeScript               | ^6.0.3    |
| 빌드 도구       | Vite (Rolldown)          | ^8.0.14   |
| 라우팅          | React Router             | ^7.15.1   |
| 스타일링        | CSS Modules              | -         |
| 서버 상태       | TanStack Query           | ^5.100.14 |
| 클라이언트 상태 | Zustand                  | ^5.0.13   |
| i18n            | i18next + react-i18next  | ^26 / ^17 |
| 테스트          | Vitest + Testing Library | ^4.1.7    |
| 린팅            | ESLint                   | ^10.4.0   |

## 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.
