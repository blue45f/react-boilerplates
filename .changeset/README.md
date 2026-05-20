# Changesets

이 디렉토리는 [Changesets](https://github.com/changesets/changesets)가 사용합니다.

릴리스 워크플로우:

1. 변경을 만든다.
2. `pnpm changeset`을 실행해 변경 종류(patch/minor/major)와 설명을 적는다.
3. PR을 올리고 머지한다.
4. `Release` 워크플로우가 자동으로 "Version Packages" PR을 만들고, 그 PR을 머지하면 npm에 게시한다.

템플릿 패키지(`react-app`, `react-admin`, `react-lib`)와 `docs`는 게시 대상이 아니므로 `config.json`의 `ignore`에 들어 있다. CLI(`create-react-bp`, `create-react-lib`)와 공유 configs만 npm에 배포된다.
