---
sidebar_position: 2
id: vitest-config
title: '@boilerplate/vitest-config'
---

Vitest 테스트 환경을 설정하는 파일입니다. 테스트 실행 및 설정 관련 옵션을 지정하여, 효율적인 테스트 환경을 구성합니다.

### 설치

```bash
pnpm add --save-dev @boilerplate/vitest-config
```

### 사용 방법

```typescript
// vitest.config.ts
import { boilerplateVitestConfig } from '@boilerplate/vitest-config'
import { mergeConfig } from 'vitest/config'

export default mergeConfig(
  boilerplateVitestConfig({
    // 추가 옵션
  }),
  {
    // 프로젝트별 추가 설정
  }
)
```

### 기본 설정

```typescript
{
  globals: true,          // 전역 테스트 API 사용
  environment: 'jsdom',   // 브라우저 환경 시뮬레이션
}
```

### 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `globals` | boolean | `true` | 전역 테스트 API 사용 여부 |
| `environment` | string | `'jsdom'` | 테스트 환경 (`jsdom`, `node` 등) |
