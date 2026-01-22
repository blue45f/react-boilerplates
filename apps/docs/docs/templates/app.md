---
sidebar_position: 1
---

# App 템플릿

Chakra UI와 React Router를 사용한 일반적인 웹 앱 템플릿입니다.

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19 | UI 라이브러리 |
| Vite | 6 | 빌드 도구 |
| Chakra UI | 3 | UI 컴포넌트 |
| React Router | 7 | 클라이언트 라우팅 |
| Tanstack Query | 5 | 서버 상태 관리 (데이터 페칭, 캐싱) |
| Zustand | 5 | 클라이언트 상태 관리 |
| TypeScript | 5 | 타입 안전성 |
| Vitest | 3 | 테스트 프레임워크 |

## 생성 방법

```bash
npx create-react-bp my-app
# 또는 템플릿 명시
npx create-react-bp my-app --template app
```

## 프로젝트 구조

```
my-app/
├── src/
│   ├── main.tsx              # 앱 진입점 (Providers 설정)
│   ├── App.tsx               # 라우트 설정 (코드 스플리팅)
│   ├── components/
│   │   ├── Layout.tsx        # 공통 레이아웃 (헤더, 푸터, 네비게이션)
│   │   └── ErrorBoundary.tsx # 에러 바운더리
│   ├── pages/
│   │   ├── Home.tsx          # 홈 페이지
│   │   ├── About.tsx         # 소개 페이지
│   │   └── NotFound.tsx      # 404 페이지
│   └── stores/
│       └── useAppStore.ts    # Zustand 전역 상태
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── eslint.config.js
```

## 아키텍처

### 상태 관리

- **서버 상태**: [Tanstack Query](https://tanstack.com/query)로 API 데이터 페칭, 캐싱, 리페칭
- **클라이언트 상태**: [Zustand](https://zustand.docs.pmnd.rs)로 UI 상태 관리

```tsx
// Zustand 스토어 사용 예시
import { useAppStore } from '@/stores/useAppStore';

function MyComponent() {
  const { theme, toggleTheme } = useAppStore();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

### 코드 스플리팅

모든 페이지가 `React.lazy`로 동적 임포트되어 초기 번들 크기를 최소화합니다.

### 에러 처리

`ErrorBoundary` 컴포넌트가 렌더링 에러를 캐치하여 사용자 친화적인 에러 화면을 표시합니다.

## 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | `Home` | 홈 페이지 |
| `/about` | `About` | 소개 페이지 |
| `/*` | `NotFound` | 404 페이지 |

새 페이지를 추가하려면:

```tsx
// 1. src/pages/Contact.tsx 생성
export default function Contact() {
  return <div>Contact Page</div>;
}

// 2. App.tsx에 lazy import + 라우트 추가
const Contact = lazy(() => import('@/pages/Contact'));

<Route path="contact" element={<Contact />} />
```

## 접근성

- 본문 건너뛰기 링크 (skip link)
- `aria-current="page"` 현재 페이지 네비게이션 표시
- 시맨틱 HTML (`header`, `main`, `footer`, `nav`)

## 사용 가능한 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 시작 (포트 3000) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm test` | 테스트 실행 |
| `pnpm test:coverage` | 테스트 커버리지 확인 |
| `pnpm lint` | ESLint 검사 |
