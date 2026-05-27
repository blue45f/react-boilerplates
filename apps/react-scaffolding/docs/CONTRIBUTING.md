# 기여 가이드

React Scaffolding 프로젝트에 기여해 주셔서 감사합니다.

## 개발 환경 설정

```bash
# 저장소 포크 후 클론
git clone https://github.com/<your-username>/react-scaffolding.git
cd react-scaffolding

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 개발 워크플로우

### 브랜치 전략

```
main ─── 안정적인 릴리스 브랜치
  └── feature/* ─── 기능 개발
  └── fix/* ─── 버그 수정
  └── docs/* ─── 문서 수정
```

### 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다. 커밋 메시지는
`commit-msg` 훅에서 commitlint로 자동 검증됩니다.

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 리팩토링 (기능 변경 없음)
test: 테스트 추가 또는 수정
chore: 빌드, 설정 파일 수정
```

예시:

```
feat: 다크 모드 토글 컴포넌트 추가
fix: Header 네비게이션 활성 상태 버그 수정
docs: API 클라이언트 사용법 문서화
```

허용되는 타입은 `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`,
`revert`, `style`, `test`입니다. 제목은 100자를 넘기지 않습니다.

## 코딩 컨벤션

### TypeScript

- `strict: true` 모드 준수
- `any` 타입 사용 지양, 불가피한 경우 `unknown` 사용 후 타입 가드 적용
- 인터페이스는 `src/types/`에 정의하여 공유

### 컴포넌트

- 함수형 컴포넌트 + 훅 패턴만 사용
- 컴포넌트별 독립 폴더 구조 유지 (`ComponentName/index.ts` 패턴)
- Props 인터페이스는 컴포넌트 파일 내에 정의

### 스타일

- CSS Modules (`.module.css`) 사용
- 글로벌 변수는 `src/assets/styles/global.css`에 정의
- 인라인 스타일 지양

### Import 순서

```typescript
// 1. React 및 외부 라이브러리
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. 내부 모듈 (path alias 사용)
import Button from '@components/common/Button'
import { useAppContext } from '@store'

// 3. 타입
import type { User } from '@types'

// 4. 스타일
import styles from './Component.module.css'
```

## Pull Request 가이드

1. 최신 `main` 브랜치에서 새 브랜치 생성
2. 변경사항 구현 후 전체 검증 통과 확인 (`pnpm verify`)
3. 보안 검사 통과 확인 (`pnpm lint:security`)
4. 필요 시 e2e 통과 확인 (`pnpm test:e2e`)
5. PR 제출 시 변경 내용과 이유를 명확히 기술

`pre-push` 훅은 `pnpm verify:push`를 실행합니다. 포맷, lint, 타입 검사, 단위 테스트,
프로덕션 빌드, 보안 audit 중 하나라도 실패하면 푸시가 중단됩니다.

## 새 컴포넌트 추가 체크리스트

- [ ] 독립 폴더 생성 (`ComponentName/`)
- [ ] 컴포넌트 파일 (`ComponentName.tsx`)
- [ ] CSS Modules 파일 (`ComponentName.module.css`)
- [ ] index 파일 (`index.ts`)
- [ ] TypeScript Props 인터페이스 정의
- [ ] 테스트 파일 (`ComponentName.test.tsx`) - 권장
- [ ] 테스트 통과 확인
- [ ] 빌드 통과 확인
