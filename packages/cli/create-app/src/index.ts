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

interface Options {
  name: string;
  template: 'app' | 'admin';
}

const TEMPLATES = {
  app: 'React App (Chakra UI)',
  admin: 'Admin Dashboard (Ant Design)',
};

function isValidProjectName(name: string): boolean {
  return /^[a-zA-Z0-9@][a-zA-Z0-9._\-/]*$/.test(name);
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

  const program = new Command();
  program
    .name('create-react-bp')
    .description('React 보일러플레이트 프로젝트 생성')
    .version('1.0.0')
    .argument('[name]', '프로젝트 이름')
    .option('-t, --template <type>', '템플릿 타입 (app, admin)')
    .parse();

  const args = program.args;
  const opts = program.opts();

  let projectName = args[0];
  let template = opts.template as Options['template'];

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
    template = response.template;
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
    const templateDir = resolve(__dirname, '..', 'templates', template);
    if (!existsSync(templateDir)) {
      spinner.fail(chalk.red(`템플릿을 찾을 수 없습니다: ${template}`));
      process.exit(1);
    }

    // 템플릿 복사
    await fs.copy(templateDir, targetDir);

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

  ${chalk.gray('pnpm dev')}      개발 서버 시작
  ${chalk.gray('pnpm build')}    프로덕션 빌드
  ${chalk.gray('pnpm test')}     테스트 실행
  ${chalk.gray('pnpm lint')}     린트 검사
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

main();
