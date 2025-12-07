# React Boilerplates

React 프로젝트를 빠르게 시작할 수 있도록 도와주는 CLI 도구 모음입니다.

## 주요 기능

- 한 줄의 명령어로 프로젝트 생성
- App, Admin, Library 템플릿 제공
- React 19, Vite 6, TypeScript 5 기반
- ESLint, Prettier, Vitest 기본 설정

## 빠른 시작

```bash
# React App 생성
npx create-react-bp my-app

# React Library 생성
npx create-react-lib my-lib
```

## 프로젝트 구조

```
react-boilerplates/
├── apps/
│   └── docs/                 # Docusaurus 문서 사이트
├── packages/
│   ├── configs/              # 공유 설정 패키지
│   │   ├── eslint/           # ESLint 설정
│   │   ├── typescript/       # TypeScript 설정
│   │   ├── vite/             # Vite 설정
│   │   └── vitest/           # Vitest 설정
│   └── cli/                  # CLI 도구
│       ├── create-app/       # App 생성 CLI
│       └── create-lib/       # Library 생성 CLI
└── templates/                # 프로젝트 템플릿
    ├── admin/                # Admin 대시보드 템플릿
    ├── app/                  # App 템플릿
    └── lib/                  # Library 템플릿
```

## 템플릿

### App 템플릿
- React 19 + Chakra UI 3 + React Router 7
- 일반적인 웹 앱에 적합

### Admin 템플릿
- React 18 + Ant Design 5 + React Router 7
- 관리자 대시보드에 적합

### Library 템플릿
- React 18 (peer dependency)
- ES/CJS 듀얼 빌드 지원
- 컴포넌트 라이브러리 개발에 적합

## 개발환경 설정

```bash
# 의존성 설치
pnpm install

# 모든 패키지 빌드
pnpm build

# 개발 서버 실행
pnpm dev

# 린트 검사
pnpm lint
```

## 요구사항

- Node.js 20+
- pnpm 9+

## 라이선스

MIT
