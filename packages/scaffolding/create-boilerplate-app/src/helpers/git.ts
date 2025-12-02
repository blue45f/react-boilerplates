import { execSync, ExecSyncOptions } from 'child_process'
import fs from 'fs'
import path from 'path'

/** Git 명령어 실행 옵션 */
const EXEC_OPTIONS: ExecSyncOptions = { stdio: 'ignore' }

/**
 * Git 명령어를 실행합니다.
 *
 * @param command - 실행할 Git 명령어
 * @param cwd - 작업 디렉토리 (선택)
 */
const execGit = (command: string, cwd?: string): void => {
  execSync(command, { ...EXEC_OPTIONS, cwd })
}

/**
 * 기본 브랜치가 설정되어 있는지 확인합니다.
 */
const isDefaultBranchConfigured = (): boolean => {
  try {
    execSync('git config init.defaultBranch', EXEC_OPTIONS)
    return true
  } catch {
    return false
  }
}

/**
 * .git 디렉토리를 정리합니다.
 *
 * @param root - 프로젝트 루트 경로
 */
const cleanupGitDirectory = (root: string): void => {
  try {
    fs.rmSync(path.join(root, '.git'), { recursive: true, force: true })
  } catch {
    // .git 폴더 삭제 실패 시 무시 (권한 문제 등)
  }
}

/**
 * Git 저장소를 초기화하고 초기 커밋을 생성합니다.
 *
 * @param root - 프로젝트 루트 경로
 * @returns 초기화 성공 여부
 *
 * @example
 * const success = tryGitInit('/path/to/project')
 * if (success) {
 *   console.log('Git 저장소가 초기화되었습니다.')
 * }
 */
export function tryGitInit(root: string): boolean {
  let didInit = false

  try {
    // Git이 설치되어 있는지 확인
    execGit('git --version', root)

    // Git 저장소 초기화
    execGit('git init', root)
    didInit = true

    // 기본 브랜치가 설정되어 있지 않으면 main 브랜치 생성
    if (!isDefaultBranchConfigured()) {
      execGit('git checkout -b main', root)
    }

    // 모든 파일 스테이징 및 초기 커밋
    execGit('git add -A', root)
    execGit('git commit -m "Initial commit from create-boilerplate-app"', root)

    return true
  } catch {
    // 초기화 실패 시 .git 디렉토리 정리
    if (didInit) {
      cleanupGitDirectory(root)
    }
    return false
  }
}
