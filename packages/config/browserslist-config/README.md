# 📱 @boilerplate/browserslist-config

[![npm version](https://img.shields.io/npm/v/@boilerplate/browserslist-config.svg)](https://www.npmjs.com/package/@boilerplate/browserslist-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

모바일 WebView 애플리케이션을 위한 **공유 browserslist 설정** 패키지입니다.

---

## 📋 지원 브라우저

이 설정은 모바일 WebView 환경에 최적화되어 있습니다.

| 브라우저 | 최소 버전 | 설명 |
|----------|-----------|------|
| **iOS Safari** | `>=12` | iPhone 5s 이상 지원 |
| **Chrome** | `>=107` | Android WebView 포함 |
| **Opera Mini** | ❌ 제외 | 제한된 기능으로 제외 |

### 브라우저 점유율

```bash
# 지원 브라우저 확인
npx browserslist "ios >= 12, chrome >= 107, not op_mini all"
```

---

## 📦 설치

```bash
# npm
npm install --save-dev @boilerplate/browserslist-config

# yarn
yarn add -D @boilerplate/browserslist-config

# pnpm
pnpm add -D @boilerplate/browserslist-config
```

---

## 🚀 사용 방법

### 방법 1: package.json에서 사용 (권장)

```json
{
  "browserslist": [
    "extends @boilerplate/browserslist-config"
  ]
}
```

### 방법 2: .browserslistrc 파일에서 사용

프로젝트 루트에 `.browserslistrc` 파일을 생성하고:

```
extends @boilerplate/browserslist-config
```

### 방법 3: JavaScript 설정 파일에서 사용

#### CommonJS

```javascript
const browsers = require('@boilerplate/browserslist-config');

module.exports = {
  // Babel 설정 예시
  presets: [
    ['@babel/preset-env', { targets: browsers }]
  ]
};
```

#### ESM

```javascript
import browsers from '@boilerplate/browserslist-config';

export default {
  // Vite 설정 예시
  build: {
    target: browsers
  }
};
```

---

## 🔧 Vite와 함께 사용

### vite.config.ts

```typescript
import browsers from '@boilerplate/browserslist-config';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: browsers,
  },
});
```

### @boilerplate/vite-config 사용 시

`@boilerplate/vite-config`는 이미 이 패키지를 포함하고 있습니다:

```typescript
import { boilerplateViteConfig } from '@boilerplate/vite-config';

export default boilerplateViteConfig({
  entry: './src/index.ts',
  srcDir: './src',
});
```

---

## 📘 TypeScript 지원

타입 정의가 포함되어 있습니다:

```typescript
import browsers from '@boilerplate/browserslist-config';

// browsers: string[]
console.log(browsers);
// ['ios >= 12', 'chrome >= 107', 'not op_mini all']
```

---

## 🔍 설정 확인

현재 설정이 어떤 브라우저를 지원하는지 확인:

```bash
# 프로젝트 디렉토리에서 실행
npx browserslist
```

출력 예시:
```
chrome 120
chrome 119
chrome 118
...
ios_saf 17.2
ios_saf 17.1
ios_saf 17.0
ios_saf 16.6-16.7
...
ios_saf 12.0-12.1
```

---

## ⚙️ 설정 커스터마이징

기본 설정을 확장하거나 재정의할 수 있습니다:

### package.json에서 확장

```json
{
  "browserslist": [
    "extends @boilerplate/browserslist-config",
    "not chrome < 110"
  ]
}
```

### 환경별 설정

```json
{
  "browserslist": {
    "production": [
      "extends @boilerplate/browserslist-config"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

---

## 🔗 연관 도구

이 browserslist 설정은 다음 도구들과 호환됩니다:

| 도구 | 용도 |
|------|------|
| [Autoprefixer](https://github.com/postcss/autoprefixer) | CSS 벤더 프리픽스 자동 추가 |
| [Babel](https://babeljs.io/) | JavaScript 트랜스파일링 |
| [postcss-preset-env](https://preset-env.cssdb.org/) | 최신 CSS 기능 폴리필 |
| [ESLint compat](https://github.com/amilajack/eslint-plugin-compat) | 브라우저 호환성 린트 |
| [Vite](https://vitejs.dev/) | 빌드 타겟 설정 |
| [Webpack](https://webpack.js.org/) | 빌드 타겟 설정 |

---

## 📚 참고 자료

- [Browserslist 공식 문서](https://github.com/browserslist/browserslist)
- [Can I Use](https://caniuse.com/) - 브라우저 호환성 확인
- [Browserslist 쿼리 문법](https://github.com/browserslist/browserslist#queries)

---

## 📄 라이선스

MIT © [Boilerplate Team]
