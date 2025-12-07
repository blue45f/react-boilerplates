---
sidebar_position: 3
---

# Vite 설정

`@repo/vite-config` 패키지는 Vite 설정 유틸리티를 제공합니다.

## 함수

### createAppConfig

React 앱을 위한 Vite 설정을 생성합니다:

```ts
import { createAppConfig } from '@repo/vite-config';
import { defineConfig } from 'vite';

export default defineConfig(createAppConfig());
```

**옵션:**
- `root` - 프로젝트 루트 경로

**포함 기능:**
- `@vitejs/plugin-react`
- `vite-tsconfig-paths`
- `@/` 경로 별칭
- 자동 vendor 청크 분리

### createLibConfig

React 라이브러리를 위한 Vite 설정을 생성합니다:

```ts
import { createLibConfig } from '@repo/vite-config';
import { defineConfig } from 'vite';

export default defineConfig(createLibConfig({
  name: 'MyLib',
  entry: 'src/index.ts'
}));
```

**옵션:**
- `name` - 라이브러리 이름
- `entry` - 진입점 파일
- `root` - 프로젝트 루트 경로

**포함 기능:**
- ES/CJS 듀얼 빌드
- TypeScript 선언 파일 생성
- React를 외부 의존성으로 처리
