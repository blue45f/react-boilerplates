---
sidebar_position: 3
---

# Library 템플릿

React 컴포넌트 라이브러리 개발을 위한 템플릿입니다. Vite 라이브러리 모드, 디자인 토큰, 다크모드, Storybook, Vitest를 기본 포함합니다.

## 기술 스택

| 기술            | 버전                    | 용도                           |
| --------------- | ----------------------- | ------------------------------ |
| React           | 18/19 (peer dependency) | UI 라이브러리                  |
| Vite            | 8                       | 라이브러리 빌드 모드           |
| vite-plugin-dts | 5                       | TypeScript 선언 파일 자동 생성 |
| TypeScript      | 6                       | 타입 안전성                    |
| Vitest          | 4                       | 단위 테스트                    |
| Testing Library | 16                      | 컴포넌트 테스트                |
| Storybook       | 10                      | 컴포넌트 카탈로그              |

## 생성 방법

```bash
npx create-react-lib my-lib

# 스코프 패키지
npx create-react-lib @my-org/ui
```

## 디렉토리 구조 (요약)

```
my-lib/
├── src/
│   ├── index.ts            # public API barrel export
│   ├── components/         # UI 컴포넌트 (+ 테스트 / 스토리)
│   ├── hooks/              # 커스텀 훅 (+ 테스트)
│   ├── utils/              # 유틸리티
│   ├── providers/          # ThemeProvider 등 컨텍스트 프로바이더
│   ├── styles/             # tokens.css / globals.css (디자인 토큰)
│   ├── demo/               # 개발용 데모 앱
│   └── test-setup.ts
├── .storybook/             # Storybook 설정 (있는 경우)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

:::tip
"실제 파일이 정확히 무엇이 들어 있는지"는 빠르게 진화합니다. 이 문서는 카탈로그 역할만 하며,
정확한 시그니처는 `src/index.ts` barrel을 import하여 IDE 자동완성으로 확인하는 것을 권장합니다.
:::

## UI 컴포넌트 카탈로그

기본/고도화 컴포넌트가 함께 포함됩니다. 모든 컴포넌트는 `src/index.ts`에서 named export 됩니다.

### 기본

| 컴포넌트  | 설명                                       |
| --------- | ------------------------------------------ |
| `Button`  | variant, size, disabled, focus ring        |
| `Input`   | label, error, helperText, ref forwarding   |
| `Card`    | `CardHeader`/`CardBody`/`CardFooter` 합성  |
| `Badge`   | default / success / warning / error / info |
| `Spinner` | sm/md/lg, `role="status"`                  |
| `Alert`   | info/success/warning/error, 닫기 버튼      |

### 추가 컴포넌트

| 컴포넌트               | 용도                                 |
| ---------------------- | ------------------------------------ |
| `Modal`                | 포커스 트랩, ESC 닫기, 오버레이      |
| `Tooltip`              | 포지셔닝, delay, 접근 가능한 trigger |
| `Tabs`                 | 키보드 네비게이션 (`role=tablist`)   |
| `Switch`               | on/off 토글, label 연동              |
| `Avatar`               | 이미지/이니셜 fallback               |
| `Toast`                | 알림 메시지, autoDismiss             |
| `Tag`                  | 색상/사이즈 variant                  |
| `Skeleton`             | 로딩 placeholder                     |
| `Divider`              | 가로/세로 구분선                     |
| `Checkbox`             | 단일 체크박스                        |
| `Radio` / `RadioGroup` | 단일 선택 그룹                       |
| `Select`               | 드롭다운 선택                        |
| `Progress`             | 진행률 바                            |

```tsx
import { Modal, Tabs, Toast, Select } from 'my-lib';
```

## 커스텀 훅 카탈로그

### 기본

| 훅                | 설명                   |
| ----------------- | ---------------------- |
| `useToggle`       | boolean 상태 토글      |
| `useDebounce`     | 값 디바운스            |
| `useLocalStorage` | localStorage 동기 상태 |
| `useMediaQuery`   | 미디어 쿼리 매치       |
| `useClickOutside` | 외부 클릭 감지         |

### 추가 훅

| 훅                        | 설명                                          |
| ------------------------- | --------------------------------------------- |
| `useIntersectionObserver` | 뷰포트 교차 감지 (lazy load, infinite scroll) |
| `useCopyToClipboard`      | 클립보드 복사 + 결과 상태                     |
| `useKeyPress`             | 특정 키 입력 감지                             |
| `usePrevious`             | 이전 렌더의 값 보관                           |
| `useEventListener`        | 이벤트 리스너 안전 등록/해제                  |
| `useTheme`                | 현재 테마 / 토글 (ThemeProvider 필요)         |
| `useFocusTrap`            | 모달/다이얼로그용 포커스 트랩                 |

```tsx
import { useIntersectionObserver, useCopyToClipboard, useTheme } from 'my-lib';

const { ref, isIntersecting } = useIntersectionObserver();
const [copied, copy] = useCopyToClipboard();
const { theme, toggle } = useTheme();
```

## 디자인 토큰

`src/styles/tokens.css`에 색상/타이포/spacing/radius 등 디자인 토큰이 CSS 커스텀 프로퍼티로 정의되어 있습니다.
컴포넌트는 토큰을 참조하므로, 토큰만 바꿔도 전체 룩앤필이 바뀝니다.

```css
/* 사용 예: 소비자 프로젝트의 global.css에서 토큰 override */
:root {
  --color-primary: #6366f1;
  --radius-md: 8px;
}
```

## 다크모드

`ThemeProvider`로 앱을 감싸면 라이트/다크 테마 토큰이 자동으로 적용됩니다.

```tsx
import { ThemeProvider, useTheme } from 'my-lib';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Root />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>{theme}</button>;
}
```

토큰은 `[data-theme="dark"]` 셀렉터에 다크 변형이 정의되어 있으며, `prefers-color-scheme`도 지원합니다.

## Storybook

```bash
pnpm storybook         # 개발 서버 (포트 6006)
pnpm build-storybook   # 정적 빌드 → storybook-static/
```

모든 컴포넌트에 `*.stories.tsx` 파일이 함께 제공되며 자동으로 카탈로그에 등록됩니다.

## 테스트

```bash
pnpm test              # 단위 테스트
pnpm test:run          # 단위 테스트 단일 실행
pnpm test:coverage     # 커버리지 포함
pnpm verify            # format/lint/typecheck/test/build
```

## 빌드

```bash
pnpm build
```

| 파일              | 포맷       | 용도        |
| ----------------- | ---------- | ----------- |
| `dist/index.mjs`  | ES Module  | `import`    |
| `dist/index.cjs`  | CommonJS   | `require()` |
| `dist/index.d.ts` | TypeScript | 타입 선언   |

## npm 배포

```bash
# 1. package.json에서 private 제거
# 2. 빌드 + 배포
pnpm build
npm publish --access public
```

:::tip Peer Dependencies
`react`, `react-dom`은 peer dependency입니다. 소비자 프로젝트에 React 18 또는 React 19가 있어야 합니다.
:::
