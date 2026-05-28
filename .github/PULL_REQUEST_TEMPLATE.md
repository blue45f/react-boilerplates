<!-- 제목은 Conventional Commits 규칙을 따릅니다. 예: feat(app): add dark mode toggle -->

## 변경 사항 요약

<!-- 무엇을, 왜 바꿨는지 1~3줄 -->

## 변경 종류

- [ ] feat (새 기능)
- [ ] fix (버그 수정)
- [ ] docs (문서)
- [ ] refactor (리팩터링)
- [ ] perf (성능)
- [ ] test (테스트)
- [ ] chore (빌드/설정)

## 영향 범위

- [ ] templates/app
- [ ] templates/admin
- [ ] templates/lib
- [ ] packages/configs
- [ ] packages/cli
- [ ] apps/docs
- [ ] 루트 인프라(CI, scripts 등)

## 체크리스트

- [ ] `pnpm typecheck` 통과
- [ ] `pnpm lint` 통과
- [ ] `pnpm test` 통과
- [ ] `CodeRabbit review gate` 통과
- [ ] 영향이 있는 템플릿/패키지의 빌드 확인 (`pnpm build`)
- [ ] 필요한 경우 `pnpm changeset` 추가
- [ ] 문서(`apps/docs`) 업데이트 필요 여부 확인

## 스크린샷 / 데모 (UI 변경 시)

<!-- 다크모드 포함 -->
