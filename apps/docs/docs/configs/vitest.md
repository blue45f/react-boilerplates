---
sidebar_position: 4
---

# Vitest 설정

`@repo/vitest-config` 패키지는 Vitest 설정 유틸리티를 제공합니다.

## 함수

### createVitestConfig

React 테스트를 위한 Vitest 설정을 생성합니다:

```ts
import { createVitestConfig } from '@repo/vitest-config';
import { defineConfig } from 'vitest/config';

export default defineConfig(createVitestConfig());
```

## 포함 기능

- **jsdom 환경** - DOM 시뮬레이션
- **전역 테스트 함수** - `describe`, `it`, `expect` 전역 사용
- **@testing-library/jest-dom** - DOM 매처 확장
- **커버리지 리포터** - text, json, html 형식

## 테스트 파일 패턴

기본적으로 다음 패턴의 파일을 테스트합니다:

```
src/**/*.{test,spec}.{ts,tsx}
```

## 사용 예시

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## 명령어

```bash
# 테스트 실행
pnpm test

# 워치 모드
pnpm test --watch

# 커버리지
pnpm test --coverage
```
