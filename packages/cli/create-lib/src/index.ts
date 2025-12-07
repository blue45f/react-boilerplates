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

  const program = new Command();
  program
    .name('create-react-lib')
    .description('React 라이브러리 프로젝트 생성')
    .version('1.0.0')
    .argument('[name]', '라이브러리 이름')
    .parse();

  const args = program.args;
  let libName = args[0];

  // 라이브러리 이름 입력
  if (!libName) {
    const response = await prompts({
      type: 'text',
      name: 'name',
      message: '라이브러리 이름을 입력하세요:',
      validate: (value) => (value.trim() ? true : '라이브러리 이름은 필수입니다'),
    });
    libName = response.name;
  }

  if (!libName) {
    console.log(chalk.red('라이브러리 생성이 취소되었습니다.'));
    process.exit(1);
  }

  const targetDir = resolve(process.cwd(), libName);

  // 디렉토리 존재 확인
  if (existsSync(targetDir)) {
    console.log(chalk.red(`오류: '${libName}' 디렉토리가 이미 존재합니다.`));
    process.exit(1);
  }

  const spinner = ora('라이브러리 생성 중...').start();

  try {
    // 템플릿 복사
    const templateDir = resolve(__dirname, '..', 'templates', 'lib');
    await fs.copy(templateDir, targetDir);

    // package.json 업데이트
    const pkgPath = resolve(targetDir, 'package.json');
    const pkg = await fs.readJson(pkgPath);
    pkg.name = libName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });

    spinner.succeed(chalk.green('라이브러리가 성공적으로 생성되었습니다!'));

    console.log(`
${chalk.magenta('시작하기:')}

  ${chalk.yellow(`cd ${libName}`)}
  ${chalk.yellow('pnpm install')}
  ${chalk.yellow('pnpm dev')}

${chalk.magenta('사용 가능한 명령어:')}

  ${chalk.gray('pnpm dev')}      개발 모드
  ${chalk.gray('pnpm build')}    라이브러리 빌드
  ${chalk.gray('pnpm test')}     테스트 실행
  ${chalk.gray('pnpm lint')}     린트 검사
`);
  } catch (error) {
    spinner.fail(chalk.red('라이브러리 생성 중 오류가 발생했습니다.'));
    console.error(error);
    process.exit(1);
  }
}

main();
