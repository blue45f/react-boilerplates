---
sidebar_position: 4
---

# Vitest 설정

`@repo/vitest-config` 패키지는 React 프로젝트를 위한 Vitest 설정 유틸리티를 제공합니다.

## Exports

| Export                      | 용도                                       |
| --------------------------- | ------------------------------------------ |
| `@repo/vitest-config`       | `createVitestConfig`                       |
| `@repo/vitest-config/setup` | `@testing-library/jest-dom` + cleanup 등록 |

## 설치

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
import { defineConfig } from 'vitest/config';
import { createVitestConfig } from '@repo/vitest-config';

export default defineConfig(createVitestConfig());
```

**옵션**

| 옵션          | 기본값                              | 설명                                  |
| ------------- | ----------------------------------- | ------------------------------------- |
| `root`        | `process.cwd()`                     | 프로젝트 루트                         |
| `environment` | `'jsdom'`                           | `jsdom` / `node` / `happy-dom`        |
| `include`     | `['src/**/*.{test,spec}.{ts,tsx}']` | 테스트 파일 glob                      |
| `setupFiles`  | `[]`                                | 추가 setup (기본 setup **뒤**에 병합) |
| `css`         | `true`                              | CSS import 처리 여부                  |

### 커스터마이징

```ts
import { defineConfig } from 'vitest/config';
import { createVitestConfig } from '@repo/vitest-config';

export default defineConfig(
  createVitestConfig({
    setupFiles: ['./src/test-setup.ts'], // MSW server.listen() 등을 추가
  })
);
```

## 포함 기능

| 기능                          | 설명                                                                     |
| ----------------------------- | ------------------------------------------------------------------------ |
| **jsdom 환경**                | 브라우저 DOM 시뮬레이션                                                  |
| **전역 테스트 함수**          | `describe` / `it` / `expect`를 import 없이 사용                          |
| **@testing-library/jest-dom** | `toBeInTheDocument()` 등 DOM 매처                                        |
| **자동 cleanup**              | 매 테스트 후 React 렌더 정리                                             |
| **커버리지 리포터**           | text / json / html (v8 provider)                                         |
| **카탈로그 파일 제외**        | `*.stories.*`, `demo/`, `mocks/`, `.storybook/`을 커버리지에서 자동 제외 |

## Setup 파일

`@repo/vitest-config/setup`은 기본 setup 파일로 자동 등록되며 다음을 수행합니다:

- `@testing-library/jest-dom` 매처 등록
- 매 테스트 후 `cleanup()` 호출

추가 setup이 필요한 경우(MSW 서버, custom matchers 등)는 `setupFiles` 옵션으로 추가합니다.

## 테스트 작성 예시

```tsx
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
pnpm test              # 단일 실행
pnpm test --watch      # 워치 모드
pnpm test:coverage     # 커버리지
```
