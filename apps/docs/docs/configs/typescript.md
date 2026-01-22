---
sidebar_position: 1
---

# TypeScript 설정

`@repo/typescript-config` 패키지는 공유 TypeScript 설정을 제공합니다.

## 설정 파일

### base.json

기본 TypeScript 설정:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true
  }
}
```

### react.json

React 프로젝트용 설정:

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx"
  }
}
```

### node.json

Node.js 프로젝트용 설정:

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

## 사용법

```json
{
  "extends": "@repo/typescript-config/react"
}
```
