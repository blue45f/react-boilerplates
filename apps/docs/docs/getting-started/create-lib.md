---
sidebar_position: 3
---

# Library 생성하기

`create-react-lib` CLI로 React 컴포넌트 라이브러리를 생성합니다.

## 사용법

```bash
npx create-react-lib [라이브러리명]
```

### 대화형 모드

```bash
npx create-react-lib
```

### 스코프 패키지

```bash
npx create-react-lib @my-org/ui-lib
# → ui-lib/ 디렉토리에 생성
```

### 옵션

| 옵션            | 설명                                          |
| --------------- | --------------------------------------------- |
| `[name]`        | 라이브러리 npm 이름 (스코프 가능: `@org/foo`) |
| `-h, --help`    | 도움말                                        |
| `-V, --version` | 버전                                          |

## 포함 내용

| 항목        | 설명                                                                                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI 컴포넌트 | Button, Input, Card, Badge, Spinner, Alert + Modal, Tooltip, Tabs, Switch, Avatar, Toast, Tag, Skeleton, Divider, Checkbox, Radio(Group), Select, Progress                                |
| 커스텀 훅   | useToggle, useDebounce, useLocalStorage, useMediaQuery, useClickOutside + useIntersectionObserver, useCopyToClipboard, useKeyPress, usePrevious, useEventListener, useTheme, useFocusTrap |
| 유틸        | `cn` 등                                                                                                                                                                                   |
| 디자인 토큰 | `src/styles/tokens.css` (light/dark)                                                                                                                                                      |
| Storybook   | 모든 컴포넌트 `*.stories.tsx`                                                                                                                                                             |

(정확한 목록은 [Library 템플릿](/templates/lib) 참고)

## 디렉토리 (요약)

```
my-ui-lib/
├── src/
│   ├── index.ts            # barrel export
│   ├── components/         # + 테스트 + 스토리
│   ├── hooks/              # + 테스트
│   ├── utils/
│   ├── providers/          # ThemeProvider 등
│   ├── styles/             # tokens.css, globals.css
│   └── demo/               # 개발용 데모 앱
├── .storybook/             # Storybook 설정
├── vite.config.ts
└── package.json
```

## 명령어

| 명령어                 | 설명                              |
| ---------------------- | --------------------------------- |
| `pnpm dev`             | 데모 앱                           |
| `pnpm build`           | 라이브러리 빌드 (ES + CJS + d.ts) |
| `pnpm storybook`       | Storybook (포트 6006)             |
| `pnpm build-storybook` | 정적 Storybook 빌드               |
| `pnpm test`            | Vitest                            |
| `pnpm test:coverage`   | 커버리지                          |
| `pnpm lint`            | ESLint                            |

## 빌드 산출물

| 파일              | 포맷       | 용도        |
| ----------------- | ---------- | ----------- |
| `dist/index.mjs`  | ES Module  | `import`    |
| `dist/index.cjs`  | CommonJS   | `require()` |
| `dist/index.d.ts` | TypeScript | 타입 선언   |

## npm 배포

```bash
# 1. package.json에서 private 제거 (또는 false)
# 2. 빌드 후 배포
pnpm build
npm publish --access public
```
