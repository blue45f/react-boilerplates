# Contributing

React Boilerplates에 기여해 주셔서 감사합니다.

## 개발 환경

- Node.js **22 LTS 이상** (`.nvmrc` 참고)
- pnpm **10 이상** — `corepack enable`로 활성화하세요

```bash
git clone https://github.com/blue45f/react-boilerplates.git
cd react-boilerplates
corepack enable
pnpm install
```

처음 설치하면 Husky가 자동으로 활성화되어 다음 훅이 동작합니다.

- `pre-commit`: `lint-staged`(ESLint + Prettier)
- `commit-msg`: Commitlint (Conventional Commits 강제)
- `pre-push`: `pnpm typecheck`

## 모노레포 구조

```
apps/docs/            → Docusaurus 문서 사이트
packages/configs/*    → 공유 설정 (ESLint, TypeScript, Vite, Vitest)
packages/cli/*        → create-react-bp, create-react-lib
templates/{app,admin,lib}  → CLI가 복사하는 템플릿 소스 (workspace에서 분리)
```

`pnpm-workspace.yaml`의 `catalog:`에 공통 의존성 버전이 모여 있습니다. 워크스페이스 패키지는 `"react": "catalog:"` 형태로 참조하세요. **템플릿(`templates/*`)은 workspace에 포함되지 않으므로 catalog를 쓰지 않고 명시적 버전을 사용합니다.**

## 자주 쓰는 명령

```bash
pnpm dev            # 모든 패키지 dev 병렬
pnpm build          # 토폴로지 순서 빌드 (--workspace-concurrency=4)
pnpm typecheck
pnpm lint
pnpm test
pnpm test:coverage
pnpm storybook      # react-lib 스토리북
pnpm e2e            # Playwright (템플릿)
pnpm format
pnpm changeset      # 릴리스용 변경 노트 추가
```

특정 패키지만:

```bash
pnpm --filter @repo/eslint-config build
pnpm --filter react-lib storybook
```

## 커밋 컨벤션 (Conventional Commits)

`type(scope): subject` 형식을 따릅니다. Commitlint가 자동 검증합니다.

- 허용 type: `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `style`, `revert`
- 허용 scope: `app`, `admin`, `lib`, `configs`, `cli`, `docs`, `deps`, `ci`, `release`, `workspace`

예시:

```
feat(lib): add Tooltip component with focus trap
fix(app): handle empty posts state in Posts page
chore(deps): bump vite to 6.3
```

## PR 워크플로우

1. `main`에서 새 브랜치 생성
2. 변경 구현 → `pnpm typecheck && pnpm lint && pnpm test`
3. 사용자 영향이 있는 변경(CLI/configs 게시 패키지)이면 **`pnpm changeset`** 으로 changeset 추가
4. PR 생성 — 템플릿 체크리스트를 채워 주세요
5. CI(매트릭스 빌드, Playwright, Storybook 빌드, CodeQL) 통과 확인

### PR 규칙

- PR 본문은 템플릿의 체크리스트 기준으로 작성하고, 변경 증빙 링크(verify/lint/typecheck/build 로그)와 롤백 포인트를 남깁니다.
- PR 제목은 Conventional Commits(`type(scope): subject`) 형식을 따릅니다.
- CodeRabbit이 있는 경우 `CodeRabbit review gate`는 최신 head SHA에서 `APPROVED` 상태여야 병합 가능합니다.
- 자동 머지는 `automerge` / `auto-merge` 라벨 요청된 PR에서만 허용하고, 최소 하나의 사람 승인과 필수 상태 체크 통과를 함께 만족해야 합니다.

## 릴리스

`changesets/action` 워크플로우가 `main`에 머지될 때마다 "Version Packages" PR을 생성합니다. 이 PR을 머지하면 자동으로 npm에 배포됩니다 (npm provenance 포함). 게시 대상은 CLI 2개와 `@repo/*` configs이며, 템플릿(`react-app`/`react-admin`/`react-lib`)과 `docs`는 게시 대상이 아닙니다.

## 템플릿 수정 시 주의사항

- 템플릿은 **`npx create-*`로 받자마자 독립 실행**되어야 합니다 (워크스페이스 의존성, catalog 프로토콜 금지)
- 모든 의존성은 템플릿 자체 `package.json`에 명시
- ESLint 9 flat config 문법 사용
- 접근성(a11y) 가이드라인을 준수하고, 다크모드를 함께 검증
- UI 변경 시 PR에 라이트/다크 두 스크린샷 포함
