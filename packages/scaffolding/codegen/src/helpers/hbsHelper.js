import { pascalCase } from 'change-case'

/**
 * Handlebars 템플릿 헬퍼 함수들
 */
const hbsHelper = {
  /**
   * 컴포넌트 이름을 변환합니다.
   * name이 '_'인 경우 feature명을 사용하고, 그 외에는 PascalCase로 변환합니다.
   *
   * @example
   * {{convertName name feature}}
   * // name="_", feature="seller" → "Seller"
   * // name="basicInfo", feature="seller" → "BasicInfo"
   */
  convertName(plop) {
    plop.setHelper('convertName', (name, feature) => {
      return name === '_' ? pascalCase(feature) : pascalCase(name)
    })
  },

  /**
   * 에러 페이지 이름을 컴포넌트명으로 변환합니다.
   *
   * @example
   * {{convertErrorPageName "404"}} → "Error404"
   * {{convertErrorPageName "maintenance"}} → "Maintenance"
   */
  convertErrorPageName(plop) {
    plop.setHelper('convertErrorPageName', (errorPage) => {
      // 숫자로 시작하는 경우 Error 접두사 추가
      if (/^\d/.test(errorPage)) {
        return `Error${errorPage}`
      }
      return pascalCase(errorPage)
    })
  },
}

export default hbsHelper
