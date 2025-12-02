# 📱 Primary App 템플릿

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-3.x-319795?logo=chakraui)](https://chakra-ui.com/)

**React + Vite + Chakra UI**를 사용한 모바일 웹뷰 앱 템플릿입니다.  
**Primary 테마** 디자인이 적용되어 있습니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📱 **모바일 최적화** | WebView 환경에 최적화된 레이아웃 |
| 📍 **LNB** | Left Navigation Bar (좌측 네비게이션) |
| 🎨 **Primary 테마** | 파란색 계열의 깔끔한 디자인 |
| ⚡ **빠른 HMR** | Vite의 초고속 핫 모듈 교체 |
| 📦 **최신 React** | React 19 최신 기능 사용 |

---

## 📋 요구 사항

| 도구 | 버전 |
|------|------|
| **Node.js** | `>=20.0.0` |
| **pnpm** | `>=10.0.0` |

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
primaryApp/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── Header.tsx      # 🔝 상단 헤더 (메뉴, 타이틀, 검색)
│   │   ├── LNB.tsx         # 📍 좌측 네비게이션 바
│   │   └── Content.tsx     # 📄 메인 콘텐츠 영역
│   │
│   ├── 📂 pages/
│   │   └── Home.tsx        # 🏠 홈 페이지
│   │
│   ├── App.tsx             # 📱 앱 루트 컴포넌트
│   └── index.tsx           # 🚀 앱 진입점
│
├── index.html              # HTML 템플릿
├── package.json            # 패키지 설정
├── tsconfig.json           # TypeScript 설정
├── vite.config.ts          # Vite 설정
└── eslint.config.js        # ESLint 설정 (Flat Config)
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
| [React](https://react.dev/) | 19.x | UI 프레임워크 |
| [Vite](https://vitejs.dev/) | 6.x | 빌드 도구 |
| [TypeScript](https://www.typescriptlang.org/) | 5.8 | 타입 시스템 |
| [Chakra UI](https://chakra-ui.com/) | 3.x | UI 컴포넌트 |
| [Emotion](https://emotion.sh/) | 11.x | CSS-in-JS |
| [React Icons](https://react-icons.github.io/react-icons/) | 5.x | 아이콘 |

### 개발 도구

| 도구 | 버전 | 용도 |
|------|------|------|
| [ESLint](https://eslint.org/) | 9.x | 코드 린트 |
| [TypeScript ESLint](https://typescript-eslint.io/) | 8.x | TS 린트 규칙 |

---

## 🎨 컴포넌트 구조

### Header 컴포넌트

상단 네비게이션 바로 메뉴 버튼, 타이틀, 검색 버튼을 포함합니다.

```tsx
<Header />
```

**특징:**
- 🔵 Primary 색상 (blue.600) 배경
- 📌 상단 고정 (sticky)
- ☰ 메뉴 토글 버튼
- 🔍 검색 버튼

### LNB 컴포넌트

좌측 사이드 네비게이션으로 메뉴 항목들을 표시합니다.

```tsx
<LNB isOpen={isOpen} onClose={onClose} />
```

### Content 컴포넌트

메인 콘텐츠 영역을 감싸는 컨테이너입니다.

```tsx
<Content>
  <YourPageContent />
</Content>
```

---

## 🎨 테마 커스터마이징

### Chakra UI Provider 설정

`src/App.tsx`에서 테마를 커스터마이징할 수 있습니다:

```tsx
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f2ff' },
          100: { value: '#b3d9ff' },
          // ... 더 많은 색상
          600: { value: '#0066cc' },
        },
      },
    },
  },
})

function App() {
  return (
    <ChakraProvider value={system}>
      {/* ... */}
    </ChakraProvider>
  )
}
```

### 색상 변경

Header의 배경색을 변경하려면 `src/components/Header.tsx`를 수정:

```tsx
<Box bg="brand.600" color="white" /* ... */>
```

---

## 📱 반응형 디자인

Chakra UI의 반응형 유틸리티를 사용합니다:

```tsx
// 브레이크포인트별 값 설정
<Box
  width={{ base: '100%', md: '50%', lg: '33%' }}
  padding={{ base: 4, md: 6, lg: 8 }}
>
  콘텐츠
</Box>
```

### 브레이크포인트

| 이름 | 크기 | 설명 |
|------|------|------|
| `base` | 0px~ | 모바일 |
| `sm` | 480px~ | 작은 화면 |
| `md` | 768px~ | 태블릿 |
| `lg` | 992px~ | 데스크톱 |
| `xl` | 1280px~ | 큰 화면 |

---

## 📚 참고 자료

- [Chakra UI 컴포넌트](https://chakra-ui.com/docs/components)
- [Chakra UI 스타일링](https://chakra-ui.com/docs/styled-system/style-props)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Vite 가이드](https://vitejs.dev/guide/)

---

## 📄 라이선스

MIT
