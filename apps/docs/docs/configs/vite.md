---
sidebar_position: 3
---

# Vite 설정

`@repo/vite-config` 패키지는 두 가지 프리셋을 제공합니다 — **앱 모드**(`createAppConfig`)와 **라이브러리 모드**(`createLibConfig`).

## createAppConfig

React SPA용 Vite 설정.

```ts
import { defineConfig } from 'vite';
import { createAppConfig } from '@repo/vite-config';

export default defineConfig(createAppConfig());
```

**옵션**

| 옵션   | 기본값          | 설명                       |
| ------ | --------------- | -------------------------- |
| `root` | `process.cwd()` | 프로젝트 루트              |
| `port` | `5173`          | 개발 서버 포트             |
| `open` | `true`          | 시작 시 브라우저 자동 오픈 |

**포함 기능**

- `@vitejs/plugin-react`
- React Compiler preset (`@rolldown/plugin-babel`)
- `@/`, `@components`, `@features`, `@router`, `@i18n` 등 앱 표준 별칭
- vendor/router/query/form/i18n 청크 분리
- 소스맵

## createLibConfig

React 컴포넌트 라이브러리용 (ES + CJS 듀얼 빌드 + d.ts 자동 생성).

```ts
import { defineConfig } from 'vite';
import { createLibConfig } from '@repo/vite-config';

export default defineConfig(
  createLibConfig({
    name: 'MyLib',
    entry: 'src/index.ts',
  })
);
```

**옵션**

| 옵션       | 기본값           | 설명                         |
| ---------- | ---------------- | ---------------------------- |
| `name`     | —                | 라이브러리 글로벌 이름 (UMD) |
| `entry`    | `'src/index.ts'` | 엔트리 파일                  |
| `root`     | `process.cwd()`  | 프로젝트 루트                |
| `external` | `[]`             | 추가 external 의존성         |
| `aliases`  | `{}`             | 기본 alias에 추가/덮어쓰기   |
| `compiler` | `true`           | React Compiler preset 사용   |

기본적으로 `react`, `react-dom`, `react/jsx-runtime`이 external로 처리됩니다. `external` 옵션은 추가로 묶지 않을 패키지(예: `clsx`, `chakra-ui` 등)를 지정할 때 사용합니다.

**산출물**

| 파일              | 포맷                                 |
| ----------------- | ------------------------------------ |
| `dist/index.mjs`  | ES Module                            |
| `dist/index.cjs`  | CommonJS                             |
| `dist/index.d.ts` | TypeScript 선언 (rollup된 단일 파일) |

## 환경 변수

`VITE_` 접두사가 붙은 변수만 클라이언트에서 `import.meta.env`로 접근 가능합니다.

```bash
# .env
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=My App
```

`src/vite-env.d.ts`에 타입 선언:

```ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
}
```

## 커스터마이징

```ts
import { defineConfig, mergeConfig } from 'vite';
import { createAppConfig } from '@repo/vite-config';

export default defineConfig(
  mergeConfig(createAppConfig({ port: 5173 }), {
    server: { proxy: { '/api': 'http://localhost:8080' } },
  })
);
```
