---
sidebar_position: 1
---

# 설치

## 요구사항

| 도구    | 최소 버전 | 확인 명령어 |
| ------- | --------- | ----------- |
| Node.js | 20 이상   | `node -v`   |
| pnpm    | 9 이상    | `pnpm -v`   |

## CLI 도구 설치

### npx 사용 (권장)

별도의 설치 없이 바로 사용할 수 있습니다:

```bash
# React App 생성
npx create-react-bp my-app

# Admin Dashboard 생성
npx create-react-bp my-admin --template admin

# React Library 생성
npx create-react-lib my-lib
```

### 전역 설치

자주 사용한다면 전역으로 설치할 수 있습니다:

```bash
npm install -g create-react-bp create-react-lib

# 이후 npx 없이 사용
create-react-bp my-app
create-react-lib my-lib
```

## 패키지 매니저 설치

생성된 프로젝트는 pnpm을 사용합니다. pnpm이 설치되어 있지 않다면:

```bash
# npm으로 설치
npm install -g pnpm

# 또는 corepack 사용 (Node.js 내장)
corepack enable
corepack prepare pnpm@latest --activate
```

자세한 설치 방법은 [pnpm 공식 문서](https://pnpm.io/installation)를 참고하세요.

## 설치 확인

```bash
# 버전 확인
node -v    # v20.x.x 이상
pnpm -v    # 9.x.x 이상
```

## 공통 명령어

생성된 모든 프로젝트(App / Admin / Library)에서 공통으로 제공되는 명령어:

| 명령어               | 설명                                         |
| -------------------- | -------------------------------------------- |
| `pnpm install`       | 의존성 설치                                  |
| `pnpm dev`           | 개발 서버 (App/Admin) 또는 데모 앱 (Library) |
| `pnpm build`         | 프로덕션/라이브러리 빌드                     |
| `pnpm test`          | Vitest 단위 테스트                           |
| `pnpm test:coverage` | 커버리지                                     |
| `pnpm lint`          | ESLint                                       |

App/Admin 추가:

| 명령어             | 설명               |
| ------------------ | ------------------ |
| `pnpm preview`     | 빌드 미리보기      |
| `pnpm test:e2e`    | Playwright E2E     |
| `pnpm test:e2e:ui` | Playwright UI 모드 |

Library 추가:

| 명령어                 | 설명                  |
| ---------------------- | --------------------- |
| `pnpm storybook`       | Storybook (포트 6006) |
| `pnpm build-storybook` | 정적 Storybook 빌드   |

## 문제 해결

### Node.js 버전이 낮은 경우

[nvm](https://github.com/nvm-sh/nvm)을 사용하여 Node.js 버전을 관리할 수 있습니다:

```bash
nvm install 20
nvm use 20
```

### npx 실행 시 캐시 문제

이전 버전이 캐시되어 있을 경우:

```bash
npx --yes create-react-bp@latest my-app
```
