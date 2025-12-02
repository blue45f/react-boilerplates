# 🔧 Admin 템플릿

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.x-0170FE?logo=antdesign)](https://ant.design/)

**React + Vite + Ant Design**을 사용한 관리자 대시보드 애플리케이션 템플릿입니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📊 **사이드바 레이아웃** | 접을 수 있는 사이드바 네비게이션 |
| 👤 **사용자 메뉴** | 프로필 및 로그아웃 드롭다운 |
| 📱 **반응형 디자인** | 다양한 화면 크기 지원 |
| 🎨 **테마 커스터마이징** | Ant Design 테마 토큰 설정 |
| 🔀 **라우팅** | React Router 기반 페이지 네비게이션 |
| 📝 **폼 관리** | React Hook Form 통합 |

---

## 📋 요구 사항

| 도구 | 버전 |
|------|------|
| **Node.js** | `>=20.0.0` |
| **pnpm** | `>=8.0.0` (권장) |

---

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173)으로 접속합니다.

### 3. 프로덕션 빌드

```bash
pnpm build
```

---

## 📁 프로젝트 구조

```
admin/
├── 📂 src/
│   ├── 📂 components/
│   │   └── Layout.tsx          # 📐 메인 레이아웃 (사이드바 + 헤더 + 콘텐츠)
│   │
│   ├── 📂 constants/
│   │   └── routes.ts           # 🔀 라우트 경로 상수
│   │
│   ├── 📂 hooks/
│   │   └── useMenus.tsx        # 📋 사이드바 메뉴 데이터 훅
│   │
│   ├── 📂 pages/
│   │   └── Home.tsx            # 🏠 홈 페이지 (코드제너레이터 가이드)
│   │
│   └── index.tsx               # 🚀 앱 진입점 (라우팅 설정)
│
├── index.html                  # HTML 템플릿
├── package.json                # 패키지 설정
├── tsconfig.json               # TypeScript 설정
├── vite.config.ts              # Vite 설정
└── eslint.config.js            # ESLint 설정 (Flat Config)
```

---

## 📝 스크립트 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 (HMR 지원) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm preview` | 빌드 결과물 미리보기 |
| `pnpm lint` | ESLint 코드 검사 |

---

## 🛠️ 기술 스택

### 핵심 라이브러리

| 라이브러리 | 버전 | 용도 |
|------------|------|------|
| [React](https://react.dev/) | 18.x | UI 프레임워크 |
| [Vite](https://vitejs.dev/) | 6.x | 빌드 도구 |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 | 타입 시스템 |
| [Ant Design](https://ant.design/) | 5.x | UI 컴포넌트 |
| [React Router](https://reactrouter.com/) | 7.x | 라우팅 |
| [React Hook Form](https://react-hook-form.com/) | 7.x | 폼 상태 관리 |

### 개발 도구

| 도구 | 버전 | 용도 |
|------|------|------|
| [ESLint](https://eslint.org/) | 9.x | 코드 린트 |
| [Prettier](https://prettier.io/) | 3.x | 코드 포맷팅 |

---

## 🎨 테마 커스터마이징

### ConfigProvider 설정

`src/index.tsx`에서 Ant Design 테마를 수정할 수 있습니다:

```tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',    // 메인 색상
      borderRadius: 6,             // 모서리 둥글기
      // 더 많은 토큰: https://ant.design/docs/react/customize-theme
    },
  }}
>
  {/* ... */}
</ConfigProvider>
```

### 자주 사용하는 테마 토큰

| 토큰 | 설명 | 기본값 |
|------|------|--------|
| `colorPrimary` | 메인 색상 | `#1677ff` |
| `colorSuccess` | 성공 색상 | `#52c41a` |
| `colorWarning` | 경고 색상 | `#faad14` |
| `colorError` | 오류 색상 | `#ff4d4f` |
| `borderRadius` | 기본 모서리 둥글기 | `6` |
| `fontSize` | 기본 폰트 크기 | `14` |

---

## 📍 라우팅

### 라우트 구조

라우트는 `src/constants/routes.ts`에 정의되어 있습니다:

```typescript
export const ROUTES = {
  HOME: { ROOT: '/' },
  PRODUCT: {
    LIST: '/product/list',
    CREATE: '/product/create',
    BULK_CREATE: '/product/bulk-create',
    BRANCH: '/product/branch',
  },
  DISPLAY: {
    COLLECTION: '/display/collection',
  },
  SALES: {
    ORDER_LIST: '/sales/order-list',
    ORDER_MANAGEMENT: '/sales/order-management',
  },
}
```

### 새 페이지 추가

1. `src/pages/`에 새 페이지 컴포넌트 생성
2. `src/constants/routes.ts`에 라우트 추가
3. `src/index.tsx`에 Route 컴포넌트 추가
4. `src/hooks/useMenus.tsx`에 메뉴 항목 추가

---

## 🔧 코드 생성기 (Code Generator)

Admin 템플릿은 코드 생성기를 지원합니다:

```bash
npx @boilerplate/admin-codegen
```

### 지원 페이지 유형

| 유형 | 설명 |
|------|------|
| 입력형 | 데이터 등록 폼 |
| 보기/수정형 | 상세 보기 및 수정 |
| 조회형 | 검색 및 목록 |
| 일괄등록형 | 대량 데이터 등록 |
| List to List형 | 목록 간 데이터 이동 |
| 게시판형 | 게시판 스타일 목록 |
| 로그인형 | 인증 페이지 |
| 에러페이지형 | 오류 페이지 |
| 약관동의형 | 이용약관 동의 |

---

## 📚 참고 자료

- [Ant Design 컴포넌트](https://ant.design/components/overview)
- [Ant Design 테마 커스터마이징](https://ant.design/docs/react/customize-theme)
- [React Router 문서](https://reactrouter.com/en/main)
- [React Hook Form 문서](https://react-hook-form.com/get-started)

---

## 📄 라이선스

MIT
