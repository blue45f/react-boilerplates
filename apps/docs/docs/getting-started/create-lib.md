---
sidebar_position: 3
---

# Library 생성하기

`create-react-lib` CLI를 사용하여 React 컴포넌트 라이브러리를 생성합니다.

## 사용법

```bash
npx create-react-lib [라이브러리명]
```

### 대화형 모드

```bash
npx create-react-lib
```

### npm 스코프 패키지 지원

```bash
npx create-react-lib @my-org/ui-lib
```

## 포함 내용

### UI 컴포넌트 (6개)

| 컴포넌트 | 설명 |
|----------|------|
| `Button` | variant, size, disabled, focus ring |
| `Input` | label, error, helperText, ref forwarding |
| `Card` | CardHeader, CardBody, CardFooter 합성 패턴 |
| `Badge` | default, success, warning, error, info |
| `Spinner` | sm/md/lg, role=status, 접근성 라벨 |
| `Alert` | info/success/warning/error, 닫기 버튼 |

### 커스텀 훅 (5개)

| 훅 | 설명 |
|----|------|
| `useToggle` | boolean 상태 토글/직접 설정 |
| `useDebounce` | 값 디바운스 |
| `useLocalStorage` | localStorage 기반 상태 (함수형 업데이트, remove) |
| `useMediaQuery` | 반응형 미디어 쿼리 감지 |
| `useClickOutside` | 외부 클릭 감지 |

### 유틸리티

| 유틸리티 | 설명 |
|----------|------|
| `cn` | 조건부 클래스명 결합 (clsx 래퍼) |

## 생성된 프로젝트 구조

```
my-ui-lib/
├── src/
│   ├── index.ts          # 라이브러리 public API
│   ├── components/       # UI 컴포넌트 + 테스트
│   ├── hooks/            # 커스텀 훅 + 테스트
│   ├── utils/            # 유틸리티 + 테스트
│   └── demo/             # 개발용 데모 앱
├── package.json
├── vite.config.ts        # 빌드 + 테스트 설정
└── tsconfig.json
```

## 사용 가능한 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 데모 앱 실행 |
| `pnpm build` | 라이브러리 빌드 |
| `pnpm test` | 단위 테스트 실행 |
| `pnpm test:coverage` | 커버리지 확인 |
| `pnpm lint` | ESLint 검사 |

## 빌드 결과물

```bash
pnpm build
```

| 파일 | 포맷 | 용도 |
|------|------|------|
| `dist/index.mjs` | ES Module | `import` |
| `dist/index.cjs` | CommonJS | `require()` |
| `dist/index.d.ts` | TypeScript | 타입 선언 |

## npm 배포

```bash
# 1. package.json에서 private: true 제거
# 2. 빌드 및 배포
pnpm build
npm publish
```
