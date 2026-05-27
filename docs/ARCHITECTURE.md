# React Boilerplates Architecture

이 문서는 `react-boilerplates` 저장소의 패키지 역할과 확장 규칙을 정리합니다. 이 저장소는 재사용 가능한 React 템플릿, 스캐폴딩 앱, 공통 설정 패키지, 문서를 한 곳에서 관리하는 pnpm workspace입니다.

## 설계 원칙

1. **템플릿과 도구 분리** - 실제 생성 결과물은 `templates/`에 두고, 생성/검증 도구는 `packages/cli`와 `apps/react-scaffolding`에서 관리합니다.
2. **공통 설정 패키지화** - ESLint, TypeScript, Vite, Vitest 설정은 `packages/configs/*`에 두고 템플릿은 이를 소비합니다.
3. **검증 가능한 템플릿** - 각 템플릿은 독립 설치 후 `verify`가 동작해야 하며, 루트 `verify`는 workspace 검증과 템플릿 bootstrap 검증을 모두 포함합니다.
4. **문서와 코드 동기화** - `apps/docs`는 템플릿 사용법과 설정 정책을 설명하고, 변경 시 템플릿/문서를 함께 갱신합니다.

## Workspace 구조

```text
apps/
├── docs/                 문서 사이트
└── react-scaffolding/    스캐폴딩 검증 앱
packages/
├── cli/                  create-app, create-lib CLI
└── configs/              eslint, typescript, vite, vitest 공유 설정
templates/
├── app/                  일반 React 앱 템플릿
├── admin/                관리자 앱 템플릿
└── lib/                  라이브러리 템플릿
```

## 품질 게이트

| 명령                                  | 목적                                                   |
| ------------------------------------- | ------------------------------------------------------ |
| `pnpm run ci`                         | 루트 format, secret lint, lint, typecheck, test, build |
| `pnpm run verify`                     | 루트 CI와 템플릿 bootstrap 검증                        |
| `pnpm run verify:templates:bootstrap` | 템플릿별 독립 설치 후 verify                           |
| `pnpm run e2e:bootstrap`              | app/admin/react-scaffolding Playwright 검증            |

## 확장 규칙

새 템플릿은 `templates/<name>`에 독립 `package.json`, `verify`, `lint`, `typecheck`, `test`, `build` 스크립트를 가져야 합니다. 루트 `package.json`에는 새 템플릿의 install, verify, e2e 명령을 추가하고, GitHub Actions에는 기존 matrix 또는 별도 job으로 연결합니다.

공통 설정 변경은 `packages/configs/*`에서 먼저 반영하고, 템플릿에는 최소한의 소비 설정만 둡니다. 템플릿 내부에서 설정을 복제해야 할 때는 문서에 이유를 남깁니다.
