import fs from 'fs'
import path from 'path'

import spawn from 'cross-spawn'
import { copySync } from 'fs-extra'

import { UserInput } from '../../constants/prompts'
import { tryGitInit } from '../../helpers/git'
import Logger from '../../helpers/logger'

/** 스캐폴딩 생성기 인터페이스 */
export interface IScaffoldingMaker {
  /** 스캐폴딩을 생성합니다 */
  make: () => Promise<void>
}

/**
 * 앱 스캐폴딩 생성기
 *
 * 사용자 입력을 기반으로 React 앱 템플릿을 생성합니다.
 */
export class AppScaffoldingMaker implements IScaffoldingMaker {
  protected readonly userInput: UserInput
  protected readonly sourcePath: string
  protected readonly targetPath: string

  constructor(userInput: UserInput) {
    this.userInput = userInput
    this.sourcePath = this.resolveSourcePath()
    this.targetPath = this.resolveTargetPath()

    this.validateTargetPath()
  }

  /**
   * 스캐폴딩 생성 프로세스를 실행합니다.
   *
   * 1. 템플릿 복사
   * 2. package.json 수정
   * 3. 의존성 설치
   * 4. Git 초기화
   */
  public async make(): Promise<void> {
    await this.copyScaffolding()
    this.updatePackageJson()
    await this.installDependencies()
    this.initializeGit()
  }

  /** 템플릿 소스 경로를 결정합니다 */
  private resolveSourcePath(): string {
    const { projectType, themeType } = this.userInput
    const templatePath = projectType === 'admin' ? projectType : `${projectType}/${themeType}App`

    return path.join(__dirname, `../../../templates/${templatePath}`)
  }

  /** 프로젝트 대상 경로를 결정합니다 */
  private resolveTargetPath(): string {
    const projectRoot = process.cwd()
    return path.join(projectRoot, this.userInput.projectNameEn)
  }

  /** 대상 경로가 이미 존재하는지 확인합니다 */
  private validateTargetPath(): void {
    if (fs.existsSync(this.targetPath)) {
      throw new Error(`'${this.userInput.projectNameEn}' 디렉토리가 이미 존재합니다.`)
    }
  }

  /** 템플릿 파일을 복사합니다 */
  protected async copyScaffolding(): Promise<void> {
    copySync(this.sourcePath, this.targetPath)
    Logger.info('템플릿 파일을 복사했습니다.')
  }

  /** package.json 파일을 수정합니다 */
  protected updatePackageJson(): void {
    const packageJsonPath = path.join(this.targetPath, 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    packageJson.name = this.userInput.projectNameEn

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  }

  /** 의존성 패키지를 설치합니다 */
  protected installDependencies(): Promise<void> {
    return new Promise((resolve, reject) => {
      Logger.info('패키지를 설치하고 있습니다...')

      const child = spawn('pnpm', ['install'], {
        stdio: 'inherit',
        cwd: this.targetPath,
      })

      child.on('close', (code) => {
        if (code !== 0) {
          Logger.error('패키지 설치에 실패했습니다.')
          reject(new Error('패키지 설치 실패'))
          return
        }
        Logger.info('패키지를 성공적으로 설치했습니다.\n')
        resolve()
      })
    })
  }

  /** Git 저장소를 초기화합니다 */
  protected initializeGit(): void {
    const initialized = tryGitInit(this.targetPath)
    if (initialized) {
      Logger.info('Git 저장소를 초기화했습니다.')
    }
  }
}
