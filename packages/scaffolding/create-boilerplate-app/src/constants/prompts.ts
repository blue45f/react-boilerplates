import prompts from 'prompts'
import validateProjectName from 'validate-npm-package-name'

/** 프로젝트 타입 */
export type ProjectType = 'app' | 'admin'

/** 테마 타입 */
export type ThemeType = 'primary' | 'secondary'

/**
 * 사용자 입력 인터페이스
 */
export interface UserInput {
  /** 프로젝트 한글 이름 (Service Header에서 사용) */
  projectNameKo: string
  /** 프로젝트 영문 이름 (패키지명, 디렉토리명으로 사용) */
  projectNameEn: string
  /** 프로젝트 타입 */
  projectType: ProjectType
  /** 디자인 테마 타입 (app 타입일 때만 사용) */
  themeType?: ThemeType
}

/**
 * npm 패키지 이름 유효성을 검사합니다.
 *
 * @param name - 검사할 이름
 * @returns 유효하면 true, 유효하지 않으면 오류 메시지
 */
const validatePackageName = (name: string): boolean | string => {
  const validation = validateProjectName(name)

  if (validation.validForNewPackages) {
    return true
  }

  const errorMessage = validation.errors?.[0] || validation.warnings?.[0] || '알 수 없는 오류'
  return `유효하지 않은 이름: ${errorMessage}`
}

/**
 * CLI 프롬프트 질문 목록
 *
 * 순서:
 * 1. 프로젝트 영문 이름
 * 2. 프로젝트 표시 이름
 * 3. 프로젝트 타입
 * 4. 테마 타입 (app 타입 선택 시에만)
 */
export const QUESTIONS: prompts.PromptObject[] = [
  {
    type: 'text',
    name: 'projectNameEn',
    message: '프로젝트 이름을 입력하세요 (영문):',
    initial: 'my-app',
    validate: validatePackageName,
  },
  {
    type: 'text',
    name: 'projectNameKo',
    message: '프로젝트 표시 이름을 입력하세요:',
    initial: 'My App',
  },
  {
    type: 'select',
    name: 'projectType',
    message: '프로젝트 타입을 선택하세요:',
    initial: 0,
    choices: [
      { title: 'App (웹뷰 앱)', value: 'app' },
      { title: 'Admin (관리자)', value: 'admin' },
    ],
  },
  {
    type: (prev: ProjectType) => (prev === 'app' ? 'select' : null),
    name: 'themeType',
    message: '디자인 테마를 선택하세요:',
    initial: 0,
    choices: [
      { title: 'Primary', value: 'primary' },
      { title: 'Secondary', value: 'secondary' },
    ],
  },
]
