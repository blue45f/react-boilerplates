---
sidebar_position: 2
---

# Admin 템플릿

Ant Design을 사용한 관리자 대시보드 템플릿입니다.

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 18 | UI 라이브러리 |
| Vite | 6 | 빌드 도구 |
| Ant Design | 5 | 엔터프라이즈급 UI 컴포넌트 |
| React Router | 7 | 클라이언트 라우팅 |
| Tanstack Query | 5 | 서버 상태 관리 (데이터 페칭, 캐싱) |
| Zustand | 5 | 클라이언트 상태 관리 (인증 등) |
| TypeScript | 5 | 타입 안전성 |
| Vitest | 3 | 테스트 프레임워크 |

## 생성 방법

```bash
npx create-react-bp my-admin --template admin
```

## 프로젝트 구조

```
my-admin/
├── src/
│   ├── main.tsx               # 앱 진입점 (Providers 설정)
│   ├── App.tsx                # 라우트 설정 (코드 스플리팅)
│   ├── components/
│   │   ├── AdminLayout.tsx    # 사이드바 + 헤더 + 콘텐츠 레이아웃
│   │   └── ErrorBoundary.tsx  # 에러 바운더리
│   ├── pages/
│   │   ├── Dashboard.tsx      # 대시보드 (통계 카드)
│   │   ├── Users.tsx          # 사용자 관리 (테이블)
│   │   └── Settings.tsx       # 설정 (폼)
│   ├── stores/
│   │   └── useAuthStore.ts   # 인증 상태 관리 (Zustand)
│   └── styles/
│       └── global.css         # 전역 스타일
├── index.html
├── package.json
├── vite.config.ts
└── eslint.config.js
```

## 아키텍처

### 상태 관리

- **서버 상태**: Tanstack Query로 API 데이터 관리
- **인증 상태**: Zustand `useAuthStore` (login, logout, user 정보)

```tsx
import { useAuthStore } from '@/stores/useAuthStore';

function Header() {
  const { user, logout } = useAuthStore();
  return <span>{user?.name} <button onClick={logout}>로그아웃</button></span>;
}
```

### 에러 처리

`ErrorBoundary`가 에러 발생 시 Ant Design `Result` 컴포넌트로 에러 화면을 표시합니다.

## 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | `Dashboard` | 통계 카드가 있는 대시보드 |
| `/users` | `Users` | 사용자 목록 테이블 (정렬, 필터) |
| `/settings` | `Settings` | 사이트 설정 폼 |

## 접근성

- 본문 건너뛰기 링크 (skip link)
- 사이드바, 메뉴, 테이블 ARIA 라벨
- 액션 버튼별 사용자 이름 포함 aria-label

## 주요 기능

- **접이식 사이드바** - 메뉴를 접어 넓은 작업 공간 확보
- **한국어 로케일** - Ant Design 컴포넌트 한국어 적용
- **코드 스플리팅** - 페이지별 React.lazy 동적 임포트
- **데이터 테이블** - 정렬, 필터, 페이지네이션 지원
- **타입 안전한 폼** - SettingsFormValues 인터페이스 기반

## 사용 가능한 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 시작 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm test` | 테스트 실행 |
| `pnpm lint` | ESLint 검사 |
