# 🚀 create-boilerplate-app

[![npm version](https://img.shields.io/npm/v/create-boilerplate-app.svg)](https://www.npmjs.com/package/create-boilerplate-app)
[![Node.js](https://img.shields.io/badge/Node.js->=16-339933?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React 애플리케이션을 빠르게 생성할 수 있는 **대화형 CLI 도구**입니다.

```
 ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗
██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝
██║     ██████╔╝█████╗  ███████║   ██║   █████╗  
██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝  
╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗
 ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
██████╗  ██████╗ ██╗██╗     ███████╗██████╗ ██████╗ ██╗      █████╗ ████████╗███████╗
██╔══██╗██╔═══██╗██║██║     ██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝
██████╔╝██║   ██║██║██║     █████╗  ██████╔╝██████╔╝██║     ███████║   ██║   █████╗  
██╔══██╗██║   ██║██║██║     ██╔══╝  ██╔══██╗██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  
██████╔╝╚██████╔╝██║███████╗███████╗██║  ██║██║     ███████╗██║  ██║   ██║   ███████╗
╚═════╝  ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
```

---

## ✨ 특징

| 특징 | 설명 |
|------|------|
| 🚀 **빠른 설정** | 프로덕션 수준의 React 앱을 몇 초 만에 생성 |
| ⚡ **Vite 기반** | 초고속 개발 서버 및 최적화된 빌드 환경 |
| 📦 **TypeScript** | 완벽한 타입 안전성 지원 |
| 🎨 **다양한 템플릿** | Admin, App(Primary/Secondary) 템플릿 제공 |
| 🔧 **사전 구성** | ESLint, Prettier, Git 등 이미 설정됨 |
| 📱 **모바일 최적화** | WebView 앱을 위한 최적화된 설정 |

---

## 📋 요구 사항

- **Node.js** `>=16.0.0`
- **pnpm** `>=8.0.0` (권장)

---

## 🚀 빠른 시작

### npx로 직접 실행 (권장)

```bash
npx create-boilerplate-app
```

### npm/yarn/pnpm으로 설치 후 실행

```bash
# npm
npm create boilerplate-app

# yarn
yarn create boilerplate-app

# pnpm
pnpm create boilerplate-app
```

---

## 💬 CLI 프롬프트

CLI를 실행하면 대화형 프롬프트가 표시됩니다:

```
? 프로젝트 이름을 입력하세요 (영문): my-awesome-app
? 프로젝트 표시 이름을 입력하세요: My Awesome App
? 프로젝트 타입을 선택하세요: 
  ❯ App (웹뷰 앱)
    Admin (관리자)
? 디자인 테마를 선택하세요:
  ❯ Primary
    Secondary
```

### 프롬프트 설명

| 프롬프트 | 설명 | 예시 |
|----------|------|------|
| **프로젝트 이름 (영문)** | npm 패키지명 및 디렉토리명으로 사용 | `my-awesome-app` |
| **프로젝트 표시 이름** | 화면에 표시될 이름 (한글 가능) | `마이 어썸 앱` |
| **프로젝트 타입** | 애플리케이션 유형 선택 | `App` 또는 `Admin` |
| **디자인 테마** | App 타입 선택 시 테마 선택 | `Primary` 또는 `Secondary` |

---

## 📦 지원 템플릿

### 🔹 Admin 템플릿

관리자 대시보드 애플리케이션을 위한 템플릿입니다.

**기술 스택:**
- ⚛️ React 18
- ⚡ Vite 6
- 📘 TypeScript 5.7
- 🎨 [Ant Design](https://ant.design/) 5.x
- 🔀 React Router 7
- 📝 React Hook Form
- 🔍 ESLint 9 (Flat Config)

**주요 기능:**
- 📊 사이드바 네비게이션 레이아웃
- 👤 사용자 프로필 드롭다운
- 📱 반응형 디자인
- 🎨 Ant Design 테마 커스터마이징

**디렉토리 구조:**
```
admin/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # 메인 레이아웃 컴포넌트
│   ├── constants/
│   │   └── routes.ts           # 라우트 상수
│   ├── hooks/
│   │   └── useMenus.tsx        # 메뉴 훅
│   ├── pages/
│   │   └── Home.tsx            # 홈 페이지
│   └── index.tsx               # 앱 진입점
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

### 🔹 App 템플릿 (Primary)

모바일 웹뷰 앱을 위한 Primary 테마 템플릿입니다.

**기술 스택:**
- ⚛️ React 19
- ⚡ Vite 6
- 📘 TypeScript 5.8
- 🎨 [Chakra UI](https://chakra-ui.com/) 3.x
- 🔣 React Icons

**주요 기능:**
- 📱 모바일 최적화 레이아웃
- 📍 LNB (Left Navigation Bar)
- 🎨 Primary 색상 테마

### 🔹 App 템플릿 (Secondary)

모바일 웹뷰 앱을 위한 Secondary 테마 템플릿입니다.

**기술 스택:**
- ⚛️ React 19
- ⚡ Vite 6
- 📘 TypeScript 5.8
- 🎨 [Chakra UI](https://chakra-ui.com/) 3.x
- 🔣 React Icons

**주요 기능:**
- 📱 모바일 최적화 레이아웃
- 📑 탭 네비게이션
- 🎨 Secondary 색상 테마

---

## 🛠️ 개발 가이드

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd react-boilerplates/packages/scaffolding/create-boilerplate-app

# 의존성 설치
pnpm install

# 개발 모드로 빌드 (watch 모드)
pnpm build:dev

# 다른 터미널에서 CLI 실행
pnpm dev
```

### 스크립트 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 빌드된 CLI 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm build:dev` | 개발 모드 빌드 (watch) |
| `pnpm lint` | ESLint 실행 |
| `pnpm copy-templates` | 템플릿 파일 복사 |

---

## 📁 프로젝트 구조

```
create-boilerplate-app/
├── 📂 src/
│   ├── index.ts                    # CLI 진입점
│   ├── 📂 constants/
│   │   ├── index.ts                # 색상, 상수 정의
│   │   └── prompts.ts              # CLI 프롬프트 설정
│   ├── 📂 helpers/
│   │   ├── git.ts                  # Git 초기화 유틸리티
│   │   └── logger.ts               # 콘솔 로거 유틸리티
│   └── 📂 logic/
│       └── ScaffoldingMaker/
│           └── AppScaffoldingMaker.ts  # 스캐폴딩 생성 로직
│
├── 📂 templates/                   # 프로젝트 템플릿
│   ├── 📂 admin/                   # Admin 템플릿
│   └── 📂 app/
│       ├── 📂 primaryApp/          # Primary 테마 템플릿
│       └── 📂 secondaryApp/        # Secondary 테마 템플릿
│
├── 📂 scripts/
│   └── copy-templates.js           # 템플릿 복사 스크립트
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ 생성된 프로젝트 사용법

CLI로 프로젝트를 생성한 후:

```bash
# 프로젝트 디렉토리로 이동
cd my-awesome-app

# 의존성은 자동 설치됨

# 개발 서버 실행
pnpm dev
```

### 생성된 프로젝트의 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 (http://localhost:5173) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm preview` | 빌드 결과물 미리보기 |
| `pnpm lint` | 코드 린트 검사 |

---

## 🔧 고급 설정

### 프로젝트 이름 규칙

프로젝트 이름은 [npm 패키지 이름 규칙](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#name)을 따릅니다:

- ✅ 소문자만 사용
- ✅ 하이픈(`-`) 허용
- ✅ 최대 214자
- ❌ 대문자 불가
- ❌ 공백 불가
- ❌ 특수문자 불가 (`-` 제외)

### 자동화 기능

프로젝트 생성 시 자동으로 수행되는 작업:

1. ✅ 템플릿 파일 복사
2. ✅ `package.json` 이름 업데이트
3. ✅ 의존성 설치 (`pnpm install`)
4. ✅ Git 저장소 초기화 및 초기 커밋

---

## 🐛 문제 해결

### 일반적인 문제

**Q: `pnpm: command not found` 오류가 발생해요**
```bash
# pnpm 설치
npm install -g pnpm
```

**Q: Node.js 버전이 맞지 않아요**
```bash
# nvm 사용 시
nvm install 20
nvm use 20
```

**Q: 이미 존재하는 디렉토리에 생성하려고 해요**
- 다른 프로젝트 이름을 사용하거나
- 기존 디렉토리를 삭제/이동 후 다시 시도하세요

---

## 📄 라이선스

MIT © [Boilerplate Team]

---

## 🔗 관련 링크

- [Vite 공식 문서](https://vitejs.dev/)
- [React 공식 문서](https://react.dev/)
- [Ant Design 공식 문서](https://ant.design/)
- [Chakra UI 공식 문서](https://chakra-ui.com/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
