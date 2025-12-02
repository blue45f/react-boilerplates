---
sidebar_position: 2
id: vite-config
title: '@boilerplate/vite-config'
---

`@boilerplate/vite-config`는 Vite 기반의 프로젝트를 위한 공통 빌드 설정 패키지입니다. 이 패키지를 통해 프로젝트 설정을 단순화하고, 손쉽게 애플리케이션 및 라이브러리를 빌드할 수 있습니다.

## 특징

- 공통 Vite 플러그인 내장:
  - tsconfigPaths를 통해 TypeScript 경로 별칭을 바로 사용 가능
  - externalizeDeps를 통해 지정한 의존성을 번들에서 제외 가능
  - preserveDirectives를 통해 라이브러리 빌드 시 Rollup의 use client와 같은 디렉티브를 유지
- 라이브러리 모드 지원:
  - isLibraryMode 옵션으로 라이브러리 빌드와 일반 앱 빌드를 손쉽게 전환할 수 있습니다.
- 유연한 옵션 설정:
  - 빌드 출력 경로(outDir), tsconfig 경로(tsconfigPath), 외부 의존성(externalDeps) 등을 손쉽게 커스터마이즈할 수 있습니다.

## 설치

아래 패키지들이 프로젝트에 설치되어 있어야 합니다.

```bash
npm i -D vite rollup-plugin-preserve-directives vite-plugin-externalize-deps vite-tsconfig-paths
```

```bash
yarn add -D vite rollup-plugin-preserve-directives vite-plugin-externalize-deps vite-tsconfig-paths
```

```bash
pnpm add -D vite rollup-plugin-preserve-directives vite-plugin-externalize-deps vite-tsconfig-paths
```

## Options 인터페이스

```ts
export interface Options {
  isLibraryMode?: boolean    // 라이브러리 모드 활성화 여부
  entry?: string             // 라이브러리 빌드 시 진입 파일 경로 (예: 'src/index.ts')
  externalDeps?: string[]    // 외부 의존성으로 처리할 모듈 리스트
  tsconfigPath?: string      // 특정 tsconfig.json 경로 지정
  outDir?: string            // 빌드 결과물 디렉토리 (기본값: 'dist')
}
```

## 사용 방법

### 1. 라이브러리 빌드 예시

아래는 boilerplateViteConfig를 사용하여 라이브러리 형태로 빌드하는 vite.config.ts 예시입니다.

```typescript
// vite.config.ts
import { boilerplateViteConfig } from '@boilerplate/vite-config'

export default boilerplateViteConfig({
  isLibraryMode: true,
  entry: 'src/index.ts',
  externalDeps: ['react', 'react-dom'],
  tsconfigPath: './tsconfig.json',
  outDir: 'dist-lib',
})
```

빌드 실행 시 dist-lib 디렉토리에 esm 및 cjs 포맷으로 번들이 생성됩니다.
react와 react-dom은 번들에서 제외되어, 외부 의존성으로 처리됩니다.

### 2. 일반 애플리케이션 빌드 예시

라이브러리가 아닌 일반 웹 애플리케이션을 빌드하는 경우, isLibraryMode를 false로 설정합니다.

```ts
// vite.config.ts
import { boilerplateViteConfig } from '@boilerplate/vite-config'

export default boilerplateViteConfig({
  isLibraryMode: false,
  tsconfigPath: './tsconfig.json',
})
```

해당 설정은 일반적인 Vite 프로젝트 설정과 유사하게 동작하지만, tsconfigPaths 지원과 externalizeDeps를 통한 번들 최적화 옵션 등을 쉽게 활용할 수 있습니다.

### 주의사항

- externalDeps로 지정한 의존성들은 최종 번들에서 제외됩니다.
- 런타임 시 CDN 또는 별도 로더를 통해 해당 의존성을 주입하는 전략이 필요할 수 있습니다.
- isLibraryMode가 true일 경우 entry 옵션을 반드시 명시해 주어야 합니다.
- tsconfigPaths 플러그인을 사용하면 빌드 환경과 에디터 환경에서 동일한 경로 별칭을 사용할 수 있어 유지보수 및 협업에 유리합니다.
