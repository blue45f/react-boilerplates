# 🚀 React Boilerplates

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8.x-F69220?logo=pnpm)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React 애플리케이션을 빠르게 생성할 수 있는 **모던 보일러플레이트 생성기**입니다.

> 📖 **문서 사이트**: [Boilerplate Guide](./apps/website)

---

## ✨ 주요 특징

| 특징 | 설명 |
|------|------|
| 🚀 **빠른 설정** | 프로덕션 수준의 React 앱을 몇 초 만에 생성 |
| ⚡ **Vite 기반** | 초고속 개발 서버 및 최적화된 빌드 환경 |
| 📦 **TypeScript** | 완벽한 타입 안전성과 IDE 지원 |
| 🎨 **다양한 템플릿** | Admin, App(Primary/Secondary) 템플릿 제공 |
| 🔧 **사전 구성** | ESLint, Prettier, Git hooks 등 모범 사례 적용 |
| 📚 **공유 설정** | 재사용 가능한 설정 패키지 제공 |
| 🏗️ **모노레포** | Turborepo 기반의 효율적인 빌드 시스템 |

---

## 📋 요구 사항

| 도구 | 버전 | 설명 |
|------|------|------|
| **Node.js** | `>=20.0.0` | JavaScript 런타임 |
| **pnpm** | `>=8.0.0` | 패키지 매니저 |

```bash
# Node.js 버전 확인
node --version

# pnpm 설치 (없는 경우)
npm install -g pnpm
```

---

## 🚀 빠른 시작

### 방법 1: CLI로 새 프로젝트 생성 (권장)

```bash
npx create-boilerplate-app
```

대화형 CLI가 실행되어 프로젝트 설정을 안내합니다:

```
? 프로젝트 이름을 입력하세요 (영문): my-awesome-app
? 프로젝트 표시 이름을 입력하세요: My Awesome App
? 프로젝트 타입을 선택하세요: App (웹뷰 앱)
? 디자인 테마를 선택하세요: Primary
```

### 방법 2: 저장소 클론 및 개발

```bash
# 저장소 클론
git clone <repository-url>
cd react-boilerplates

# 의존성 설치
pnpm install

# 모든 패키지 빌드
pnpm build

# 개발 서버 실행 (문서 사이트)
pnpm --filter boilerplate-docs start
```

---

## 📁 프로젝트 구조

```
react-boilerplates/
├── 📂 apps/
│   └── website/                    # 📖 Docusaurus 문서 사이트
│
├── 📂 packages/
│   ├── 📂 config/                  # 🔧 공유 설정 패키지
│   │   ├── browserslist-config/    #    브라우저 지원 설정
│   │   ├── rollup-config/          #    Rollup 번들러 설정
│   │   ├── sentry-config/          #    Sentry 에러 트래킹 설정
│   │   ├── ts-config/              #    TypeScript 설정
│   │   ├── vite-config/            #    Vite 빌드 도구 설정
│   │   ├── vitest-config/          #    Vitest 테스트 설정
│   │   └── webpack-config/         #    Webpack 설정 (예약)
│   │
│   ├── 📂 internal/                # 🔒 내부 전용 패키지
│   │   └── eslint-config/          #    ESLint 린트 설정
│   │
│   └── 📂 scaffolding/             # 🏗️ 스캐폴딩 도구
│       ├── codegen/                #    Admin 코드 생성기
│       ├── create-boilerplate-app/ #    앱 생성 CLI
│       └── create-boilerplate-lib/ #    라이브러리 생성 CLI
│
├── 📂 scripts/                     # 🛠️ 유틸리티 스크립트
│   └── turbo.sh                    #    Turbo 실행 래퍼
│
├── turbo.json                      # Turborepo 설정
├── pnpm-workspace.yaml             # pnpm 워크스페이스 설정
└── package.json                    # 루트 패키지 설정
```

---

## 📦 지원 템플릿

### 🔹 Admin 템플릿

관리자 대시보드 애플리케이션을 위한 템플릿입니다.

| 항목 | 기술 |
|------|------|
| **UI 프레임워크** | [Ant Design](https://ant.design/) 5.x |
| **라우팅** | React Router 7 |
| **폼 관리** | React Hook Form |
| **아이콘** | @ant-design/icons |
| **React** | 18.x |

**주요 기능:**
- 📊 사이드바 네비게이션
- 👤 사용자 메뉴 드롭다운
- 📱 반응형 레이아웃
- 🎨 Ant Design 테마 커스터마이징

### 🔹 App 템플릿 (Primary)

모바일 웹뷰 앱을 위한 Primary 테마 템플릿입니다.

| 항목 | 기술 |
|------|------|
| **UI 프레임워크** | [Chakra UI](https://chakra-ui.com/) 3.x |
| **아이콘** | React Icons |
| **React** | 19.x |

**주요 기능:**
- 📱 모바일 최적화 레이아웃
- 🎨 Primary 테마 디자인
- 📍 LNB (Left Navigation Bar)

### 🔹 App 템플릿 (Secondary)

모바일 웹뷰 앱을 위한 Secondary 테마 템플릿입니다.

| 항목 | 기술 |
|------|------|
| **UI 프레임워크** | [Chakra UI](https://chakra-ui.com/) 3.x |
| **아이콘** | React Icons |
| **React** | 19.x |

**주요 기능:**
- 📱 모바일 최적화 레이아웃
- 🎨 Secondary 테마 디자인
- 📑 탭 네비게이션

---

## 📚 공유 설정 패키지

모든 설정 패키지는 `@boilerplate/*` 네임스페이스를 사용합니다.

| 패키지 | 버전 | 설명 |
|--------|------|------|
| `@boilerplate/browserslist-config` | 0.1.0 | 브라우저 지원 범위 설정 |
| `@boilerplate/rollup-config` | 0.1.0 | Rollup 번들러 공통 설정 |
| `@boilerplate/sentry-config` | 0.0.1 | Sentry 에러 트래킹 설정 |
| `@boilerplate/ts-config` | 1.0.1 | TypeScript 컴파일러 설정 |
| `@boilerplate/vite-config` | 0.0.1 | Vite 빌드 도구 설정 |
| `@boilerplate/vitest-config` | 1.0.0 | Vitest 테스트 프레임워크 설정 |

### 사용 예시

```typescript
// vite.config.ts
import { boilerplateViteConfig } from '@boilerplate/vite-config'

export default boilerplateViteConfig({
  entry: './src/index.ts',
  srcDir: './src',
  isLibraryMode: true,
})
```

```typescript
// vitest.config.ts
import { boilerplateVitestConfig } from '@boilerplate/vitest-config'

export default boilerplateVitestConfig({
  setupFiles: ['./src/test/setup.ts'],
})
```

---

## 🛠️ 스캐폴딩 도구

| 도구 | 설명 | 사용법 |
|------|------|--------|
| `create-boilerplate-app` | React 앱 생성 CLI | `npx create-boilerplate-app` |
| `create-boilerplate-lib` | 라이브러리 생성 CLI | `npx create-boilerplate-lib` |
| `@boilerplate/admin-codegen` | Admin 페이지 코드 생성기 | `npx @boilerplate/admin-codegen` |

---

## 📝 개발 가이드

### 스크립트 명령어

```bash
# 모든 패키지 빌드
pnpm build

# 모든 패키지 린트
pnpm lint

# 불필요한 파일 정리
pnpm clean

# 미사용 코드 분석
pnpm knip
```

### 특정 패키지 작업

```bash
# 문서 사이트 개발 서버 실행
pnpm --filter boilerplate-docs start

# create-boilerplate-app 빌드 (watch 모드)
pnpm --filter create-boilerplate-app build:dev

# 특정 패키지만 빌드
pnpm --filter @boilerplate/vite-config build
```

### 새 패키지 추가

1. `packages/` 디렉토리에 새 패키지 생성
2. `package.json`에 워크스페이스 참조 추가
3. 필요한 의존성 설치
4. `turbo.json`에 빌드 파이프라인 추가

---

## 🤝 기여하기

기여는 언제나 환영합니다! 다음 단계를 따라주세요:

1. 이 저장소를 Fork 합니다
2. 새 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 설정, 패키지 매니저 등
```

---

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

---

## 🔗 관련 링크

- [Vite 공식 문서](https://vitejs.dev/)
- [React 공식 문서](https://react.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Turborepo 공식 문서](https://turbo.build/)
- [pnpm 공식 문서](https://pnpm.io/)
