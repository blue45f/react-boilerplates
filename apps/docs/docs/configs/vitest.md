---
sidebar_position: 4
---

# Vitest 설정

`@repo/vitest-config` 패키지는 React 프로젝트를 위한 Vitest 설정 유틸리티를 제공합니다.

## 설치

모노레포 내에서는 workspace dependency로 추가:

```json
{
  "devDependencies": {
    "@repo/vitest-config": "workspace:*"
  }
}
```

## 사용법

### createVitestConfig

```ts
import { createVitestConfig } from '@repo/vitest-config';
import { defineConfig } from 'vitest/config';

export default defineConfig(createVitestConfig());
```

커스텀 루트 경로 지정:

```ts
export default defineConfig(
  createVitestConfig({ root: __dirname })
);
```

## 포함 기능

| 기능 | 설명 |
|------|------|
| **jsdom 환경** | 브라우저 DOM 시뮬레이션 |
| **전역 테스트 함수** | `describe`, `it`, `expect` import 없이 사용 |
| **@testing-library/jest-dom** | `toBeInTheDocument()` 등 DOM 매처 확장 |
| **자동 cleanup** | 매 테스트 후 렌더링 자동 정리 |
| **커버리지 리포터** | text, json, html 형식 지원 |

## Setup 파일

`@repo/vitest-config/setup`을 통해 테스트 환경이 자동 설정됩니다:

- `@testing-library/jest-dom` 매처 등록
- 매 테스트 후 `cleanup()` 자동 호출

## 테스트 파일 패턴

```
src/**/*.{test,spec}.{ts,tsx}
```

## 사용 예시

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
  it('텍스트를 렌더링한다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('클릭 이벤트를 처리한다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>클릭</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

## 명령어

```bash
# 테스트 실행
pnpm test

# 워치 모드
pnpm test --watch

# 커버리지 확인
pnpm test:coverage
```
