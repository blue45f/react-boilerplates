import chalk from 'chalk'
import prompts from 'prompts'

import { COMMAND_LINE_COLOR } from './constants'
import { QUESTIONS, UserInput } from './constants/prompts'
import Logger from './helpers/logger'
import { AppScaffoldingMaker } from './logic/ScaffoldingMaker/AppScaffoldingMaker'

const BANNER = `
 ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗
██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝
██║     ██████╔╝█████╗  ███████║   ██║   █████╗  
██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝  
╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗
 ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
██████╗  ██████╗ ██╗██╗     ███████╗██████╗ ██████╗ ██╗      █████╗ ████████╗███████╗
██╔══██╗██╔═══██╗██║██║     ██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝
██████╔╝██║   ██║██║██║     █████╗  ██████╔╝██████╔╝██║     ███████║   ██║   █████╗  
██╔══██╗██║   ██║██║██║     ██╔══╝  ██╔══██╗██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  
██████╔╝╚██████╔╝██║███████╗███████╗██║  ██║██║     ███████╗██║  ██║   ██║   ███████╗
╚═════╝  ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
`

async function run() {
  try {
    console.log(chalk.hex(COMMAND_LINE_COLOR.INFO)(BANNER))

    const userInput = (await prompts(QUESTIONS, {
      onCancel: () => {
        Logger.error('보일러플레이트 생성이 취소되었습니다.')
        process.exit(1)
      },
    })) as UserInput

    const scaffoldingMaker = new AppScaffoldingMaker(userInput)
    await scaffoldingMaker.make()

    const { projectNameEn, projectNameKo, projectType, themeType } = userInput

    Logger.info('=============== 프로젝트 정보 ===============')
    Logger.info(`표시 이름: ${projectNameKo}`)
    Logger.info(`패키지 이름: ${projectNameEn}`)
    Logger.info(`프로젝트 타입: ${projectType === 'admin' ? 'Admin' : 'WebView App'}`)
    Logger.info(
      `디자인 시스템: ${projectType === 'admin' ? 'Ant Design' : themeType === 'primary' ? 'Primary Theme' : 'Secondary Theme'}`,
    )
    Logger.info('=============================================\n')

    Logger.success('프로젝트가 성공적으로 생성되었습니다.')
  } catch (e) {
    if (e instanceof Error) {
      Logger.error('프로젝트 생성 실패: ' + e.message)
    }
  }
}

run()
