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
- 소스맵 생성
- 개발 서버 포트 3000

## 환경 변수

`VITE_` 접두사가 붙은 환경 변수는 클라이언트에서 `import.meta.env`로 접근 가능합니다:

```bash
# .env
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=My App
```

타입 안전한 사용을 위해 `src/vite-env.d.ts`에 타입을 선언하세요:

```ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
}
```

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
