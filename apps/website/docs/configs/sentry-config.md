---
sidebar_position: 2
id: sentry-config
title: '@boilerplate/sentry-config'
---

Sentry를 통합하기 위한 설정 패키지입니다. 에러 모니터링과 성능 추적을 위해 다양한 옵션을 제공하여, 안정적인 운영을 지원합니다.

### 설치

```bash
pnpm add @boilerplate/sentry-config @sentry/react
```

### 사용 방법

```typescript
import { initSentry } from '@boilerplate/sentry-config/react'

initSentry({
  dsn: 'YOUR_SENTRY_DSN',
  environment: process.env.NODE_ENV,
})
```

### 기본 설정

```typescript
const MAX_SAMPLE_RATE = process.env.NODE_ENV === 'production' ? 0.05 : 0.5;

const DEFAULT_OPTIONS = {
  integrations: [
    browserTracingIntegration(),
    browserProfilingIntegration(),
    replayIntegration()
  ],
  sampleRate: MAX_SAMPLE_RATE,
  tracesSampleRate: MAX_SAMPLE_RATE,
  profilesSampleRate: MAX_SAMPLE_RATE,
  replaysSessionSampleRate: MAX_SAMPLE_RATE,
  replaysOnErrorSampleRate: 1.0,
};
```

### 옵션

| 옵션 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `dsn` | string | ✅ | Sentry 프로젝트 DSN |
| `environment` | string | - | 환경 구분 (production, development 등) |
| `sampleRate` | number | - | 이벤트 샘플링 비율 |
| `tracesSampleRate` | number | - | 트레이스 샘플링 비율 |

### 주의 사항

- **DSN 필수**: Sentry 통합을 위해 `DSN` 값이 필수이며, 누락 시 오류가 발생합니다.
- **샘플링 비율 경고**: 지정된 샘플링 비율이 `MAX_SAMPLE_RATE`를 초과하면 경고가 발생합니다.
- **프로덕션 환경**: 프로덕션에서는 낮은 샘플링 비율(0.05)을 사용하여 비용을 절감합니다.
