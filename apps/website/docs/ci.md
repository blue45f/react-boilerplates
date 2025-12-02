---
sidebar_position: 3
id: ci
title: CI 파이프라인
---

웹프론트 프로젝트를 위한 CI 파이프라인 가이드입니다.

## GitLab CI/CD 설정

### 기본 설정

프로젝트 루트에 `.gitlab-ci.yml` 파일을 생성하고 다음과 같이 설정합니다:

```yaml
image: node:20

stages:
  - install
  - build
  - test
  - deploy

variables:
  PNPM_VERSION: "8.11.0"

.pnpm-setup: &pnpm-setup
  before_script:
    - corepack enable
    - corepack prepare pnpm@$PNPM_VERSION --activate
    - pnpm config set store-dir .pnpm-store

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - .pnpm-store
    - node_modules/

install:
  stage: install
  <<: *pnpm-setup
  script:
    - pnpm install --frozen-lockfile

build:
  stage: build
  <<: *pnpm-setup
  needs:
    - install
  script:
    - pnpm run build
  artifacts:
    paths:
      - dist/
```

### 캐시 설정

pnpm의 store를 캐싱하여 빌드 시간을 단축할 수 있습니다.

```yaml
cache:
  key:
    files:
      - pnpm-lock.yaml
  paths:
    - .pnpm-store
    - node_modules/
```

### 배포 설정

#### Staging 배포

```yaml
deploy-staging:
  stage: deploy
  needs:
    - build
  script:
    - echo "Deploy to staging"
  only:
    - develop
```

#### Production 배포

```yaml
deploy-production:
  stage: deploy
  needs:
    - build
  script:
    - echo "Deploy to production"
  only:
    - main
  when: manual
```

## GitHub Actions 설정

GitHub를 사용하는 경우 `.github/workflows/ci.yml` 파일을 생성합니다:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
      - run: pnpm run test
```

## 주의사항

1. `pnpm-lock.yaml` 파일을 커밋하여 의존성 버전을 고정합니다.
2. CI 환경에서는 `--frozen-lockfile` 옵션을 사용하여 lock 파일과 일치하는 의존성만 설치합니다.
3. 캐시 키에 lock 파일을 포함하여 의존성 변경 시 캐시가 무효화되도록 합니다.
