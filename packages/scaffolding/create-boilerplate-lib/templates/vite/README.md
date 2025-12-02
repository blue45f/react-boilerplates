# ⚡ React + TypeScript + Vite 템플릿

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-1.x-6E9F18?logo=vitest)](https://vitest.dev/)

**Vite**를 사용하여 **HMR**(Hot Module Replacement)과 **ESLint** 규칙이 적용된 React 개발 환경을 제공하는 템플릿입니다.

---

## ✨ 특징

| 특징 | 설명 |
|------|------|
| ⚡ **초고속 HMR** | Vite의 즉각적인 핫 리로드 |
| 📘 **TypeScript** | 완벽한 타입 안전성 |
| 🧪 **Vitest** | Vite 네이티브 테스트 프레임워크 |
| 🔍 **ESLint** | 코드 품질 검사 |
| 📦 **최적화된 빌드** | Rollup 기반 프로덕션 번들링 |

---

## 📋 요구 사항

| 도구 | 버전 |
|------|------|
| **Node.js** | `>=20.0.0` |
| **pnpm** | `>=8.0.0` |

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

### 4. 테스트 실행

```bash
pnpm test
```

---

## 📁 프로젝트 구조

```
vite-template/
├── 📂 src/
│   ├── App.tsx             # 메인 앱 컴포넌트
│   ├── App.css             # 앱 스타일
│   ├── main.tsx            # 앱 진입점
│   ├── index.css           # 전역 스타일
│   ├── sum.ts              # 예제 유틸리티
│   ├── vite-env.d.ts       # Vite 타입 정의
│   └── 📂 assets/
│       └── react.svg       # React 로고
│
├── 📂 tests/
│   └── sum.test.ts         # 예제 테스트
│
├── 📂 public/
│   └── vite.svg            # Vite 로고
│
├── index.html              # HTML 템플릿
├── package.json            # 패키지 설정
├── tsconfig.json           # TypeScript 메인 설정
├── tsconfig.app.json       # 앱 TypeScript 설정
├── tsconfig.node.json      # Node.js TypeScript 설정
├── vite.config.ts          # Vite 설정
└── eslint.config.js        # ESLint 설정 (Flat Config)
```

---

## 📝 스크립트 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm preview` | 빌드 결과물 미리보기 |
| `pnpm test` | Vitest 테스트 실행 |
| `pnpm lint` | ESLint 코드 검사 |

---

## 🛠️ 기술 스택

### 핵심 라이브러리

| 라이브러리 | 용도 |
|------------|------|
| [React](https://react.dev/) | UI 프레임워크 |
| [Vite](https://vitejs.dev/) | 빌드 도구 |
| [TypeScript](https://www.typescriptlang.org/) | 타입 시스템 |
| [Vitest](https://vitest.dev/) | 테스트 프레임워크 |

### 개발 도구

| 도구 | 용도 |
|------|------|
| [ESLint](https://eslint.org/) | 코드 린트 |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | React Fast Refresh |

---

## 🧪 테스트

### Vitest 사용

Vitest는 Vite 기반의 빠른 테스트 프레임워크입니다.

```typescript
// tests/sum.test.ts
import { describe, expect, it } from 'vitest'
import { sum } from '../src/sum'

describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

### 테스트 실행

```bash
# 일반 실행
pnpm test

# Watch 모드
pnpm test --watch

# 커버리지 포함
pnpm test --coverage
```

---

## ⚡ Vite 플러그인

### 사용 가능한 공식 플러그인

| 플러그인 | 설명 |
|----------|------|
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | Babel 기반 Fast Refresh |
| [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) | SWC 기반 Fast Refresh (더 빠름) |

### SWC로 전환하기

```bash
# SWC 플러그인 설치
pnpm add -D @vitejs/plugin-react-swc

# @vitejs/plugin-react 제거
pnpm remove @vitejs/plugin-react
```

```typescript
// vite.config.ts
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})
```

---

## 🔧 ESLint 설정 확장

### 타입 인식 린트 규칙 활성화

프로덕션 애플리케이션에서는 더 엄격한 타입 검사를 권장합니다.

#### 1. parserOptions 설정

```javascript
// eslint.config.js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

#### 2. 권장 설정으로 업그레이드

```javascript
// Before
...tseslint.configs.recommended,

// After
...tseslint.configs.recommendedTypeChecked,
// 또는 더 엄격하게
...tseslint.configs.strictTypeChecked,
```

#### 3. 스타일 규칙 추가 (선택)

```javascript
...tseslint.configs.stylisticTypeChecked,
```

#### 4. React 플러그인 추가

```bash
pnpm add -D eslint-plugin-react
```

```javascript
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: { react },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

---

## 📦 빌드 최적화

### Vite 빌드 설정

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    // 청크 분할
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // 소스맵 생성
    sourcemap: true,
    // 최소 청크 크기 (KB)
    chunkSizeWarningLimit: 500,
  },
})
```

### 번들 분석

```bash
# 번들 분석기 설치
pnpm add -D rollup-plugin-visualizer
```

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
})
```

---

## 📚 참고 자료

- [Vite 공식 문서](https://vitejs.dev/)
- [React 공식 문서](https://react.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Vitest 공식 문서](https://vitest.dev/)
- [ESLint 공식 문서](https://eslint.org/)

---

## 📄 라이선스

MIT
