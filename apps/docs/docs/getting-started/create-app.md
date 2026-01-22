---
sidebar_position: 2
---

# App 생성하기

`create-react-bp` CLI를 사용하여 React 앱을 생성합니다.

## 사용법

```bash
npx create-react-bp [프로젝트명]
```

### 대화형 모드

프로젝트명 없이 실행하면 대화형 모드로 진입합니다:

```bash
npx create-react-bp
```

### 옵션

| 옵션 | 설명 |
|------|------|
| `-t, --template <type>` | 템플릿 타입 (app, admin) |

### 예시

```bash
# App 템플릿으로 생성
npx create-react-bp my-app -t app

# Admin 템플릿으로 생성
npx create-react-bp my-admin -t admin
```

## 생성된 프로젝트 실행

```bash
cd my-app
pnpm install
pnpm dev
```

## 사용 가능한 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 시작 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm preview` | 빌드 미리보기 |
| `pnpm test` | 테스트 실행 |
| `pnpm lint` | ESLint 검사 |
