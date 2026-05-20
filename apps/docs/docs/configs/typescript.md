---
sidebar_position: 1
---

# TypeScript 설정

`@repo/typescript-config` 패키지는 공유 TypeScript 설정을 제공합니다.

## Exports

| Export                           | 용도                                                                      |
| -------------------------------- | ------------------------------------------------------------------------- |
| `@repo/typescript-config/base`   | 기본 (ES2022, strict, bundler resolution, noEmit)                         |
| `@repo/typescript-config/strict` | base + 추가 엄격 옵션 (`noUnusedLocals`, `exactOptionalPropertyTypes` 등) |
| `@repo/typescript-config/react`  | base + DOM lib + `jsx: react-jsx`                                         |
| `@repo/typescript-config/node`   | base + NodeNext module + emit on                                          |
| `@repo/typescript-config/lib`    | react + d.ts 출력 (라이브러리용)                                          |

## 설정 파일

### base.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
```

### strict.json

`base` 위에 더 엄격한 옵션을 얹습니다 — 신규/내부 코드베이스에 권장.

| 옵션                                    | 의미                           |
| --------------------------------------- | ------------------------------ |
| `noImplicitReturns`                     | 모든 분기에서 return 강제      |
| `noFallthroughCasesInSwitch`            | switch case 누락 방지          |
| `noUnusedLocals` / `noUnusedParameters` | 미사용 변수/매개변수 에러      |
| `exactOptionalPropertyTypes`            | `?:`와 `undefined` 구분        |
| `noPropertyAccessFromIndexSignature`    | 인덱스 시그니처에 점 접근 금지 |

### react.json

React 프로젝트용. DOM lib과 `jsx: "react-jsx"` 추가.

### node.json

Node.js 프로젝트용. `NodeNext` 모듈/리졸버, `noEmit: false`, `outDir: dist`.

### lib.json

`react` 위에 `declaration: true`, `emitDeclarationOnly: true`를 얹어 라이브러리에서 d.ts만 별도로 추출할 때 사용합니다 (번들은 Vite가 처리).

## 사용법

```json
// 일반 React 앱
{ "extends": "@repo/typescript-config/react" }
```

```json
// 라이브러리 (d.ts 추출 빌드용)
{ "extends": "@repo/typescript-config/lib" }
```

```json
// 더 엄격한 React 프로젝트
{
  "extends": "@repo/typescript-config/react",
  "compilerOptions": {
    "noUnusedLocals": true,
    "exactOptionalPropertyTypes": true
  }
}
```

```json
// Node CLI
{ "extends": "@repo/typescript-config/node" }
```
