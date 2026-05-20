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

export interface ParsedLibArgs {
  name: string | undefined;
}

export function isValidPackageName(name: string): boolean {
  return /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name);
}

/**
 * 스코프 패키지(@scope/foo)에서 디렉토리명만 추출 (foo)
 */
export function getDirNameFromPackageName(libName: string): string {
  return libName.startsWith('@') ? (libName.split('/')[1] ?? libName) : libName;
}

/**
 * 빌드 결과물 기준 templates 디렉토리 경로 해석.
 */
export function resolveTemplateDir(baseDir: string = __dirname): string {
  return resolve(baseDir, '..', 'templates', 'lib');
}

export function parseArgs(argv: string[]): ParsedLibArgs {
  const program = new Command();
  program
    .name('create-react-lib')
    .description(
      [
        'React 컴포넌트 라이브러리 프로젝트를 생성합니다.',
        '',
        'Scaffold a new React component library with Vite library mode,',
        'TypeScript declarations, Vitest tests, and (optionally) Storybook.',
      ].join('\n')
    )
    .version('1.1.0')
    .argument('[name]', '라이브러리 이름 (npm 패키지명 규칙, 스코프 가능: @org/ui)')
    .addHelpText(
      'after',
      `
${chalk.magenta('예시 (Examples):')}
  $ npx create-react-lib my-ui-lib
  $ npx create-react-lib @my-org/ui
  $ npx create-react-lib                  # 대화형 모드 (interactive)

${chalk.magenta('생성 후 (After scaffolding):')}
  $ cd <lib>
  $ pnpm install
  $ pnpm dev         # 데모 앱
  $ pnpm storybook   # 스토리북 (있는 경우)
  $ pnpm build       # ES + CJS + d.ts 라이브러리 빌드
`
    )
    .parse(argv);

  return {
    name: program.args[0],
  };
}

async function main() {
  console.log(
    chalk.magenta(`
╔═══════════════════════════════════════════╗
║     React Library Generator               ║
║                                           ║
║     빠르게 React 라이브러리를 시작하세요    ║
╚═══════════════════════════════════════════╝
`)
  );

  const parsed = parseArgs(process.argv);
  let libName = parsed.name;

  // 라이브러리 이름 입력
  if (!libName) {
    const response = await prompts({
      type: 'text',
      name: 'name',
      message: '라이브러리 이름을 입력하세요:',
      validate: (value: string) => {
        if (!value.trim()) return '라이브러리 이름은 필수입니다';
        if (!isValidPackageName(value.trim()))
          return '유효하지 않은 패키지 이름입니다 (npm 패키지 네이밍 규칙을 따라야 합니다)';
        return true;
      },
    });
    libName = response.name;
  }

  if (!libName) {
    console.log(chalk.red('라이브러리 생성이 취소되었습니다.'));
    process.exit(1);
  }

  if (!isValidPackageName(libName)) {
    console.log(chalk.red('유효하지 않은 패키지 이름입니다.'));
    process.exit(1);
  }

  // 스코프가 있는 경우 디렉토리명은 스코프 제외
  const dirName = getDirNameFromPackageName(libName);
  const targetDir = resolve(process.cwd(), dirName);

  // 디렉토리 존재 확인
  if (existsSync(targetDir)) {
    console.log(chalk.red(`오류: '${dirName}' 디렉토리가 이미 존재합니다.`));
    process.exit(1);
  }

  const spinner = ora('라이브러리 생성 중...').start();

  try {
    const templateDir = resolveTemplateDir();
    if (!existsSync(templateDir)) {
      spinner.fail(chalk.red('라이브러리 템플릿을 찾을 수 없습니다.'));
      process.exit(1);
    }

    // 템플릿 전체 복사 (디렉토리 통째로 — 신규 컴포넌트/훅/스토리/스타일 누락 없음)
    await fs.copy(templateDir, targetDir, {
      filter: (src) => {
        const skipPatterns = [
          '/node_modules',
          '/dist',
          '/build',
          '/.turbo',
          '/coverage',
          '/storybook-static',
          '/.storybook-out',
          '/playwright-report',
          '/test-results',
        ];
        return !skipPatterns.some((pattern) => src.includes(pattern));
      },
    });

    // package.json 업데이트
    const pkgPath = resolve(targetDir, 'package.json');
    const pkg = await fs.readJson(pkgPath);
    pkg.name = libName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });

    spinner.succeed(chalk.green('라이브러리가 성공적으로 생성되었습니다!'));

    console.log(`
${chalk.magenta('시작하기:')}

  ${chalk.yellow(`cd ${dirName}`)}
  ${chalk.yellow('pnpm install')}
  ${chalk.yellow('pnpm dev')}

${chalk.magenta('사용 가능한 명령어:')}

  ${chalk.gray('pnpm dev')}            데모 앱
  ${chalk.gray('pnpm build')}          라이브러리 빌드 (ES + CJS + d.ts)
  ${chalk.gray('pnpm storybook')}      Storybook (있는 경우)
  ${chalk.gray('pnpm test')}           Vitest 단위 테스트
  ${chalk.gray('pnpm lint')}           ESLint 검사
`);
  } catch (error) {
    spinner.fail(chalk.red('라이브러리 생성 중 오류가 발생했습니다.'));
    console.error(error);
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

const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMainModule) {
  main();
}
