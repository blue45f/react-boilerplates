---
sidebar_position: 2
id: ts-config
title: '@boilerplate/ts-config'
---

TypeScript 컴파일 옵션을 관리하는 설정 패키지입니다.

### 설치

```bash
pnpm add --save-dev @boilerplate/ts-config
```

### 사용 방법

`tsconfig.json` 파일에서 extends를 사용하여 설정을 상속받습니다:

```json
{
  "extends": "@boilerplate/ts-config",
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### 주요 옵션

```json
{
  "target": "ES2020",
  "useDefineForClassFields": true,
  "lib": ["ES2020", "DOM", "DOM.Iterable"],
  "module": "ESNext",
  "jsx": "react-jsx"
}
```

### 추가 옵션

```json
{
  "moduleResolution": "bundler",
  "strict": true,
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### 옵션 설명

| 옵션 | 설명 |
|------|------|
| `target` | 컴파일된 코드의 ECMAScript 타겟 버전 |
| `lib` | 사용할 라이브러리 정의 |
| `module` | 모듈 시스템 설정 |
| `jsx` | JSX 처리 방식 |
| `strict` | 엄격한 타입 검사 활성화 |
