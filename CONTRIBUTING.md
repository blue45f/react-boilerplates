# Contributing

React Boilerplates에 기여해 주셔서 감사합니다.

## 개발 환경 설정

```bash
git clone https://github.com/blue45f/react-boilerplates.git
cd react-boilerplates
pnpm install
pnpm build
```

## 프로젝트 구조

```
packages/configs/   → 공유 설정 (ESLint, TypeScript, Vite, Vitest)
packages/cli/       → CLI 도구 (create-react-bp, create-react-lib)
templates/          → 프로젝트 템플릿 (app, admin, lib)
apps/docs/          → Docusaurus 문서 사이트
```

## 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 변경
refactor: 리팩터링
chore: 빌드/설정 변경
test: 테스트 추가/수정
improve: 기존 기능 개선
```

## 개발 워크플로우

1. `main` 브랜치에서 새 브랜치 생성
2. 변경 사항 구현
3. `pnpm lint` 로 코드 검사
4. `pnpm test` 로 테스트 통과 확인
5. Pull Request 생성

## 템플릿 수정 시 주의사항

- 템플릿은 독립 실행 가능해야 합니다 (워크스페이스 의존성 없이)
- `package.json`에 사용하는 모든 의존성이 포함되어야 합니다
- ESLint 9 flat config 문법을 사용합니다
- 접근성(a11y) 가이드라인을 준수합니다
