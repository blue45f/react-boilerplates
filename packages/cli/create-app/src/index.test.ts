import { describe, expect, it } from 'vitest';

import {
  isValidProjectName,
  parseArgs,
  resolveTemplateDir,
  TEMPLATES,
  type TemplateName,
} from './index';

describe('isValidProjectName', () => {
  it('영문/숫자/대시/언더스코어/점/스코프를 허용한다', () => {
    expect(isValidProjectName('my-app')).toBe(true);
    expect(isValidProjectName('my_app')).toBe(true);
    expect(isValidProjectName('my.app')).toBe(true);
    expect(isValidProjectName('@scope/app')).toBe(true);
    expect(isValidProjectName('App123')).toBe(true);
  });

  it('빈 문자열, 공백, 한글, 특수문자는 거부한다', () => {
    expect(isValidProjectName('')).toBe(false);
    expect(isValidProjectName(' name')).toBe(false);
    expect(isValidProjectName('한글')).toBe(false);
    expect(isValidProjectName('name!')).toBe(false);
  });
});

describe('TEMPLATES', () => {
  it('app과 admin 두 종류를 노출한다', () => {
    const keys = Object.keys(TEMPLATES) as TemplateName[];
    expect(keys).toContain('app');
    expect(keys).toContain('admin');
  });
});

describe('parseArgs', () => {
  it('인자 없으면 name/template 모두 undefined', () => {
    const result = parseArgs(['node', 'cli']);
    expect(result.name).toBeUndefined();
    expect(result.template).toBeUndefined();
  });

  it('name positional 인자를 파싱한다', () => {
    const result = parseArgs(['node', 'cli', 'my-app']);
    expect(result.name).toBe('my-app');
  });

  it('--template 옵션을 파싱한다', () => {
    const result = parseArgs(['node', 'cli', 'my-admin', '--template', 'admin']);
    expect(result.name).toBe('my-admin');
    expect(result.template).toBe('admin');
  });

  it('-t 짧은 옵션을 파싱한다', () => {
    const result = parseArgs(['node', 'cli', 'my-app', '-t', 'app']);
    expect(result.template).toBe('app');
  });
});

describe('resolveTemplateDir', () => {
  it('baseDir 기준 ../templates/<template> 경로를 반환한다', () => {
    const dir = resolveTemplateDir('app', '/tmp/dist');
    expect(dir).toBe('/tmp/templates/app');
  });

  it('admin 템플릿 경로를 반환한다', () => {
    const dir = resolveTemplateDir('admin', '/foo/bar/dist');
    expect(dir).toBe('/foo/bar/templates/admin');
  });
});
