import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { pascalCase } from 'change-case'

import hbsHelper from './helpers/hbsHelper.js'

/** 페이지 유형 매핑 */
const PAGE_TYPE_MAP = {
  '1. 입력형': 'inputType',
  '2. 보기/수정형': 'viewEditType',
  '3. 조회형': 'searchType',
  '4. 일괄등록형': 'bulkRegisterType',
  '5. List to List형': 'listToListType',
  '6. 게시판형': 'noticeType',
  '7. 로그인형': 'loginType',
  '8. 에러페이지형': 'errorType',
  '9. 약관동의형': 'termsAgreeType',
}

/** 에러 페이지 유형 */
const ERROR_PAGES = ['401', '403', '404', '500', 'maintenance']

/** 기본 디렉토리 설정 */
const DEFAULT_DIRS = {
  page: 'src/pages',
  component: 'src/components',
}

/** 프롬프트 간 상태 공유 (filter → validate 간 데이터 전달용) */
let currentFeature = ''

/**
 * 현재 스크립트 디렉토리 경로를 가져옵니다.
 */
const getScriptDir = () => {
  const __filename = fileURLToPath(import.meta.url)
  return path.dirname(__filename)
}

/**
 * cliconfig.json 설정을 로드합니다.
 */
const loadConfig = (rootPath) => {
  const configPath = path.join(rootPath, 'cliconfig.json')
  try {
    const configFile = fs.readFileSync(configPath, 'utf-8')
    return JSON.parse(configFile)
  } catch {
    // 설정 파일이 없으면 빈 객체 반환
    return {}
  }
}

/**
 * 폴더 존재 여부를 검증합니다.
 */
const validateFolderNotExists = (rootPath, relativePath) => {
  const fullPath = path.join(rootPath, relativePath)
  if (fs.existsSync(fullPath)) {
    return '동일한 폴더명이 존재합니다.'
  }
  return true
}

export default function (plop) {
  const rootPath = process.cwd()
  const scriptDir = getScriptDir()

  // Handlebars 헬퍼 등록
  hbsHelper.convertName(plop)
  hbsHelper.convertErrorPageName(plop)

  plop.setGenerator('웹 서비스 & 브릿지 레이어 생성', {
    description: 'Create a web service and a bridge layer following the mold-admin guidelines',

    prompts: [
      {
        type: 'list',
        name: 'pageType',
        message: '생성할 페이지 유형을 선택해주세요.',
        choices: Object.keys(PAGE_TYPE_MAP),
        filter: (input) => PAGE_TYPE_MAP[input],
      },
      {
        type: 'input',
        name: 'feature',
        message: 'feature명을 입력해주세요. (ex. Seller)',
        when: (answers) => answers.pageType !== 'errorType',
        filter: (feature) => {
          currentFeature = feature
          return pascalCase(feature)
        },
        validate: (name) => {
          return validateFolderNotExists(rootPath, `src/services/${currentFeature}/pages/${name}`)
        },
      },
      {
        type: 'input',
        name: 'name',
        message: '컴포넌트명을 입력해주세요. (ex. BasicInfo)',
        default: '_',
        when: (answers) => answers.pageType !== 'errorType',
        filter: (name) => (name === '_' ? name : pascalCase(name)),
        validate: (name) => {
          return validateFolderNotExists(rootPath, `src/services/${currentFeature}/pages/${name}`)
        },
      },
    ],

    actions: (data) => {
      const { pageType } = data || {}
      const config = loadConfig(rootPath)
      const pageDir = config.pageDir || DEFAULT_DIRS.page
      const componentDir = config.componentDir || DEFAULT_DIRS.component

      // 에러 페이지 생성
      if (pageType === 'errorType') {
        return ERROR_PAGES.flatMap((errorPage) => [
          {
            type: 'add',
            path: `${rootPath}/${pageDir}/error/${errorPage}.tsx`,
            templateFile: path.join(scriptDir, `templates/web_service_bridge_layer/${pageType}/index.hbs`),
            data: { ...data, errorPage },
          },
          {
            type: 'add',
            path: `${rootPath}/${componentDir}/error/${errorPage}.tsx`,
            templateFile: path.join(scriptDir, `templates/web_service_bridge_layer/${pageType}/${errorPage}/index.hbs`),
            data: { ...data, errorPage },
          },
        ])
      }

      // 일반 페이지 생성
      const servicePath = config.pageDir
        ? `${rootPath}/${pageDir}/{{feature}}/{{name}}/index.tsx`
        : `${rootPath}/src/services/{{feature}}/pages/{{name}}/index.tsx`

      return [
        {
          type: 'add',
          path: servicePath,
          templateFile: path.join(scriptDir, `templates/web_service_bridge_layer/${pageType}/index.hbs`),
        },
      ]
    },
  })
}
