---
sidebar_position: 3
---

# Library 템플릿

React 컴포넌트 라이브러리 개발을 위한 템플릿입니다.

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 18+ (peer dependency) | UI 라이브러리 |
| Vite | 6 | 라이브러리 빌드 모드 |
| vite-plugin-dts | 4 | TypeScript 선언 파일 자동 생성 |
| TypeScript | 5 | 타입 안전성 |
| Vitest | 2 | 테스트 프레임워크 |
| Testing Library | 16 | 컴포넌트 테스트 |

## 생성 방법

```bash
npx create-react-lib my-lib
```

## 프로젝트 구조

```
my-lib/
├── src/
│   ├── index.ts              # 라이브러리 진입점 (public API)
│   ├── components/           # 컴포넌트
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   ├── hooks/                # 커스텀 훅
│   │   ├── useToggle.ts
│   │   ├── useToggle.test.ts
│   │   ├── useDebounce.ts
│   │   └── useDebounce.test.ts
│   ├── utils/                # 유틸리티
│   │   ├── cn.ts
│   │   └── cn.test.ts
│   ├── test-setup.ts         # 테스트 환경 설정
│   └── demo/                 # 개발용 데모 앱
│       ├── main.tsx
│       └── App.tsx
├── dist/                     # 빌드 결과물
│   ├── index.mjs             # ES Module
│   ├── index.cjs             # CommonJS
│   └── index.d.ts            # TypeScript 타입 선언
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 포함된 예시

### Button 컴포넌트

다양한 variant와 size를 지원하는 버튼 컴포넌트:

```tsx
import { Button } from 'my-lib';

<Button>클릭</Button>
<Button variant="outline" size="lg">Outline Large</Button>
<Button disabled>비활성</Button>
```

### Input 컴포넌트

라벨, 에러, 도움말을 지원하는 접근성 있는 입력 필드:

```tsx
import { Input } from 'my-lib';

<Input label="이메일" type="email" helperText="example@mail.com" />
<Input label="비밀번호" error="8자 이상 입력하세요" />
```

### Card 컴포넌트

Header, Body, Footer로 구성되는 카드 레이아웃:

```tsx
import { Card, CardHeader, CardBody, CardFooter } from 'my-lib';

<Card>
  <CardHeader>제목</CardHeader>
  <CardBody>내용</CardBody>
  <CardFooter><Button>확인</Button></CardFooter>
</Card>
```

### useToggle 훅

boolean 상태를 쉽게 관리하는 훅:

```tsx
import { useToggle } from 'my-lib';

const [isOpen, toggle, setIsOpen] = useToggle(false);

// toggle() - 값 반전
// setIsOpen(true) - 직접 설정
```

### useDebounce 훅

입력값의 디바운스 처리:

```tsx
import { useDebounce } from 'my-lib';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);

// debouncedSearch는 300ms 후에 업데이트
```

### useLocalStorage 훅

localStorage 기반 상태 관리:

```tsx
import { useLocalStorage } from 'my-lib';

const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');

setTheme('dark');       // localStorage에 저장
setTheme(prev => prev === 'dark' ? 'light' : 'dark'); // 함수형 업데이트
removeTheme();          // localStorage에서 삭제
```

### useMediaQuery 훅

반응형 미디어 쿼리 감지:

```tsx
import { useMediaQuery } from 'my-lib';

const isMobile = useMediaQuery('(max-width: 768px)');
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
```

### cn 유틸리티

조건부 클래스명 결합 (clsx와 유사):

```tsx
import { cn } from 'my-lib';

cn('base', { active: isActive, hidden: !visible });
// isActive=true, visible=true → 'base active'
```

## 개발 모드

`src/demo/` 폴더에 개발용 데모 앱이 포함되어 있습니다:

```bash
pnpm dev    # 데모 앱 실행 (포트 3000)
```

## 빌드 결과물

`pnpm build` 실행 시 `dist/` 폴더에 다음 파일이 생성됩니다:

| 파일 | 포맷 | 용도 |
|------|------|------|
| `index.mjs` | ES Module | `import` 사용 시 |
| `index.cjs` | CommonJS | `require()` 사용 시 |
| `index.d.ts` | TypeScript | 타입 선언 |

## Storybook

컴포넌트를 독립적으로 개발하고 문서화할 수 있습니다:

```bash
pnpm storybook         # Storybook 개발 서버 (포트 6006)
pnpm build-storybook   # 정적 Storybook 빌드
```

모든 컴포넌트에 `*.stories.tsx` 파일이 포함되어 있어 자동으로 Storybook에 등록됩니다.

## 테스트

```bash
pnpm test              # 테스트 실행
pnpm test:coverage     # 커버리지 포함 테스트
```

## npm 배포

```bash
# 1. package.json에서 name, version 확인
# 2. private: true → 제거 또는 false로 변경
# 3. 빌드 및 배포
pnpm build
npm publish
```

:::tip Peer Dependencies
이 라이브러리는 `react`와 `react-dom`을 peer dependency로 사용합니다.
소비자(consumer) 프로젝트에 React 18 이상이 설치되어 있어야 합니다.
:::
