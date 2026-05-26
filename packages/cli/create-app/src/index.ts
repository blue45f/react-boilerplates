#!/usr/bin/env node
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';
import ora from 'ora';
import prompts from 'prompts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export type TemplateName = 'app' | 'admin';

export interface ParsedArgs {
  name: string | undefined;
  template: TemplateName | undefined;
}

export const TEMPLATES: Record<TemplateName, string> = {
  app: 'React App (CSS Modules + React Router Data Router + Tanstack Query + Zustand)',
  admin: 'Admin Dashboard (Ant Design + React Router + Tanstack Query + Zustand)',
};

export function isValidProjectName(name: string): boolean {
  return /^[a-zA-Z0-9@][a-zA-Z0-9._\-/]*$/.test(name);
}

/**
 * 빌드 결과물 기준 templates 디렉토리 경로를 해석한다.
 * dist/index.js 기준 ../templates/<template> 위치를 반환.
 */
export function resolveTemplateDir(template: TemplateName, baseDir: string = __dirname): string {
  return resolve(baseDir, '..', 'templates', template);
}

/**
 * commander 옵션 파싱 (테스트 가능하도록 분리)
 */
export function parseArgs(argv: string[]): ParsedArgs {
  const program = new Command();
  program
    .name('create-react-bp')
    .description(
      [
        'React 보일러플레이트 프로젝트를 생성합니다.',
        '',
        'Create a new React project from a curated boilerplate.',
        '',
        '템플릿 (Templates):',
        '  app    - 일반 웹 앱 (CSS Modules 기반, 다크모드/i18n/테스트 포함)',
        '  admin  - 관리자 대시보드 (Ant Design 기반, 보호 라우트/차트/사용자 관리 포함)',
      ].join('\n')
    )
    .version('1.1.0')
    .argument('[name]', '프로젝트 이름 (project name, 폴더로 생성됨)')
    .option('-t, --template <type>', '템플릿 타입: app | admin')
    .addHelpText(
      'after',
      `
${chalk.cyan('예시 (Examples):')}
  $ npx create-react-bp my-app
  $ npx create-react-bp my-app --template app
  $ npx create-react-bp my-admin -t admin
  $ npx create-react-bp                # 대화형 모드 (interactive)

${chalk.cyan('생성 후 (After scaffolding):')}
  $ cd <project>
  $ pnpm install
  $ pnpm dev
`
    )
    .parse(argv);

  const args = program.args;
  const opts = program.opts<{ template?: string }>();

  return {
    name: args[0],
    template: opts.template as TemplateName | undefined,
  };
}

async function main() {
  console.log(
    chalk.cyan(`
╔═══════════════════════════════════════════╗
║     React Boilerplate Generator           ║
║                                           ║
║     빠르게 React 프로젝트를 시작하세요      ║
╚═══════════════════════════════════════════╝
`)
  );

  const parsed = parseArgs(process.argv);

  let projectName = parsed.name;
  let template = parsed.template;

  // 프로젝트 이름 입력
  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'name',
      message: '프로젝트 이름을 입력하세요:',
      validate: (value: string) => {
        if (!value.trim()) return '프로젝트 이름은 필수입니다';
        if (!isValidProjectName(value.trim()))
          return '유효하지 않은 프로젝트 이름입니다 (영문, 숫자, -, _, .만 사용 가능)';
        return true;
      },
    });
    projectName = response.name;
  }

  if (!projectName) {
    console.log(chalk.red('프로젝트 생성이 취소되었습니다.'));
    process.exit(1);
  }

  if (!isValidProjectName(projectName)) {
    console.log(chalk.red('유효하지 않은 프로젝트 이름입니다.'));
    process.exit(1);
  }

  // 템플릿 선택
  if (!template) {
    const response = await prompts({
      type: 'select',
      name: 'template',
      message: '템플릿을 선택하세요:',
      choices: Object.entries(TEMPLATES).map(([value, title]) => ({
        title,
        value,
      })),
    });
    template = response.template as TemplateName | undefined;
  }

  if (!template) {
    console.log(chalk.red('프로젝트 생성이 취소되었습니다.'));
    process.exit(1);
  }

  if (!(template in TEMPLATES)) {
    console.log(chalk.red(`알 수 없는 템플릿입니다: ${template}`));
    console.log(chalk.gray(`사용 가능한 템플릿: ${Object.keys(TEMPLATES).join(', ')}`));
    process.exit(1);
  }

  const targetDir = resolve(process.cwd(), projectName);

  // 디렉토리 존재 확인
  if (existsSync(targetDir)) {
    console.log(chalk.red(`오류: '${projectName}' 디렉토리가 이미 존재합니다.`));
    process.exit(1);
  }

  const spinner = ora('프로젝트 생성 중...').start();

  try {
    // 템플릿 디렉토리 확인
    const templateDir = resolveTemplateDir(template);
    if (!existsSync(templateDir)) {
      spinner.fail(chalk.red(`템플릿을 찾을 수 없습니다: ${template}`));
      process.exit(1);
    }

    // 템플릿 전체 복사 (디렉토리 통째로 — 신규 파일 누락 없음)
    await fs.copy(templateDir, targetDir, {
      filter: (src) => {
        // node_modules / dist / 빌드/캐시 산출물은 제외
        const skipPatterns = [
          '/node_modules',
          '/dist',
          '/build',
          '/.turbo',
          '/coverage',
          '/.docusaurus',
          '/storybook-static',
          '/playwright-report',
          '/test-results',
          '/.next',
        ];
        return !skipPatterns.some((pattern) => src.includes(pattern));
      },
    });

    // package.json 업데이트
    const pkgPath = resolve(targetDir, 'package.json');
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });

    spinner.succeed(chalk.green('프로젝트가 성공적으로 생성되었습니다!'));

    console.log(`
${chalk.cyan('시작하기:')}

  ${chalk.yellow(`cd ${projectName}`)}
  ${chalk.yellow('pnpm install')}
  ${chalk.yellow('pnpm dev')}

${chalk.cyan('사용 가능한 명령어:')}

  ${chalk.gray('pnpm dev')}            개발 서버 시작
  ${chalk.gray('pnpm build')}          프로덕션 빌드
  ${chalk.gray('pnpm test')}           단위 테스트 (Vitest)
  ${chalk.gray('pnpm test:e2e')}       E2E 테스트 (Playwright)
  ${chalk.gray('pnpm lint')}           린트 검사
`);
  } catch (error) {
    spinner.fail(chalk.red('프로젝트 생성 중 오류가 발생했습니다.'));
    console.error(error);
    // 실패 시 생성된 디렉토리 정리
    try {
      if (existsSync(targetDir)) {
        await fs.remove(targetDir);
      }
    } catch {
      // 정리 실패는 무시
    }
    process.exit(1);
  }
}

// CLI 실행 (테스트 import 시에는 실행되지 않음)
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMainModule) {
  main();
}
