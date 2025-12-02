import chalk from 'chalk'

import { COMMAND_LINE_COLOR } from '../constants'

/**
 * 로깅 유틸리티 클래스
 *
 * @example
 * // 플레이스홀더 사용법: {0}, {1} 형식으로 slot 지정
 * Logger.info('{0}, {1}!', 'Hello', 'World') // 출력: Hello, World!
 */
class Logger {
  /**
   * 메시지의 플레이스홀더를 실제 값으로 치환합니다.
   * @param msg - 포맷팅할 메시지 (플레이스홀더 포함)
   * @param keywords - 플레이스홀더를 대체할 값들
   * @returns 포맷팅된 메시지
   */
  static #formatMessage(msg: string, keywords: string[]): string {
    if (!keywords || keywords.length === 0) {
      return msg
    }

    return keywords.reduce((formattedMsg, keyword, index) => {
      return formattedMsg.replace(`{${index}}`, keyword)
    }, msg)
  }

  public static success(msg: string, ...keywords: string[]): void {
    console.log(this.#formatMessage(chalk.hex(COMMAND_LINE_COLOR.SUCCESS)(msg), keywords))
  }

  public static info(msg: string, ...keywords: string[]): void {
    console.log(this.#formatMessage(chalk.hex(COMMAND_LINE_COLOR.INFO)(msg), keywords))
  }

  public static error(msg: string, ...keywords: string[]): void {
    console.error(this.#formatMessage(chalk.hex(COMMAND_LINE_COLOR.ERROR)(msg), keywords))
  }
}

export default Logger
