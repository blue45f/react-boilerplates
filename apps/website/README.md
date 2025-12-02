# 📖 Boilerplate 가이드 문서

[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.x-3ECC5F?logo=docusaurus)](https://docusaurus.io/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)

[Docusaurus](https://docusaurus.io/)를 사용하여 구축된 **Boilerplate 프로젝트 가이드 문서** 사이트입니다.

---

## ✨ 특징

| 특징 | 설명 |
|------|------|
| 📚 **문서화** | Markdown/MDX 기반 문서 작성 |
| 🌙 **다크 모드** | 라이트/다크 테마 자동 지원 |
| 🔍 **검색** | 내장 검색 기능 |
| 🌐 **i18n** | 다국어 지원 (한국어 기본) |
| 📱 **반응형** | 모바일 최적화 레이아웃 |

---

## 📋 요구 사항

| 도구 | 버전 |
|------|------|
| **Node.js** | `>=18.0.0` |
| **pnpm** | `>=8.0.0` |

---

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

### 3. 프로덕션 빌드

```bash
pnpm build
```

빌드된 결과물은 `build/` 폴더에 생성됩니다.

### 4. 빌드 결과물 미리보기

```bash
pnpm serve
```

---

## 📁 프로젝트 구조

```
website/
├── 📂 docs/                    # 📄 문서 콘텐츠
│   ├── getting-started.md      #    시작하기 가이드
│   ├── ci.md                   #    CI/CD 가이드
│   └── 📂 configs/             #    설정 패키지 문서
│       ├── sentry-config.md
│       ├── ts-config.md
│       ├── vite-config.md
│       └── vitest-config.md
│
├── 📂 src/
│   ├── 📂 css/
│   │   └── custom.css          # 🎨 커스텀 스타일
│   └── 📂 pages/
│       ├── index.tsx           # 🏠 홈 페이지
│       └── index.module.css
│
├── 📂 static/
│   └── 📂 img/                 # 🖼️ 정적 이미지
│
├── docusaurus.config.ts        # ⚙️ Docusaurus 설정
├── sidebars.ts                 # 📑 사이드바 설정
├── package.json
└── tsconfig.json
```

---

## 📝 스크립트 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm start` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm serve` | 빌드 결과물 미리보기 |
| `pnpm clear` | 캐시 및 빌드 폴더 정리 |
| `pnpm typecheck` | TypeScript 타입 검사 |
| `pnpm swizzle` | Docusaurus 컴포넌트 커스터마이징 |

---

## 📄 문서 작성 가이드

### 새 문서 추가

1. `docs/` 폴더에 새 `.md` 또는 `.mdx` 파일 생성
2. Front matter 추가:

```markdown
---
id: my-doc
title: 문서 제목
sidebar_label: 사이드바 레이블
sidebar_position: 1
---

# 문서 내용

여기에 내용을 작성합니다.
```

3. `sidebars.ts`에 문서 추가 (필요한 경우)

### 문서 Front Matter 옵션

| 옵션 | 설명 |
|------|------|
| `id` | 문서 고유 ID |
| `title` | 문서 제목 |
| `sidebar_label` | 사이드바에 표시될 레이블 |
| `sidebar_position` | 사이드바 내 위치 |
| `description` | SEO 설명 |
| `keywords` | SEO 키워드 |
| `image` | OG 이미지 |

### MDX 사용

React 컴포넌트를 문서에 포함할 수 있습니다:

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm">
    npm install package-name
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    pnpm add package-name
  </TabItem>
</Tabs>
```

---

## 🎨 스타일 커스터마이징

### CSS 변수

`src/css/custom.css`에서 테마를 커스터마이징할 수 있습니다:

```css
:root {
  --ifm-color-primary: #4b9d63;
  --ifm-color-primary-dark: #448b58;
  --ifm-color-primary-darker: #3b7a4c;
  --ifm-code-font-size: 95%;
}

[data-theme='dark'] {
  --ifm-color-primary: #62b87c;
}
```

### 폰트 변경

현재 **Spoqa Han Sans Neo** 폰트를 사용합니다:

```css
@import url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/css/SpoqaHanSansNeo.css');

* {
  font-family: 'Spoqa Han Sans Neo', sans-serif;
}
```

---

## ⚙️ Docusaurus 설정

### docusaurus.config.ts 주요 설정

```typescript
const config: Config = {
  title: 'Boilerplates',
  tagline: 'Boilerplate Generator Guide',
  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',
  
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    ['classic', {
      docs: {
        sidebarPath: './sidebars.ts',
      },
      theme: {
        customCss: './src/css/custom.css',
      },
    }],
  ],

  themeConfig: {
    navbar: { /* ... */ },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
}
```

---

## 🚀 배포

### 정적 파일 배포

빌드된 `build/` 폴더의 내용을 정적 호스팅 서비스에 배포합니다:

- **GitHub Pages**
- **Vercel**
- **Netlify**
- **AWS S3 + CloudFront**

### GitHub Pages 배포

```bash
# gh-pages 브랜치로 배포
pnpm deploy
```

### Vercel/Netlify 설정

| 설정 | 값 |
|------|------|
| **Build Command** | `pnpm build` |
| **Output Directory** | `build` |
| **Install Command** | `pnpm install` |

---

## 📚 참고 자료

- [Docusaurus 공식 문서](https://docusaurus.io/docs)
- [Docusaurus 블로그](https://docusaurus.io/blog)
- [MDX 문법](https://mdxjs.com/)
- [Infima CSS 프레임워크](https://infima.dev/)

---

## 📄 라이선스

MIT
