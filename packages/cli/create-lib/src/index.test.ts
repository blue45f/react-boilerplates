import { describe, expect, it } from 'vitest';

import {
  getDirNameFromPackageName,
  isValidPackageName,
  parseArgs,
  resolveTemplateDir,
} from './index';

describe('isValidPackageName', () => {
  it('일반 패키지명을 허용한다', () => {
    expect(isValidPackageName('my-lib')).toBe(true);
    expect(isValidPackageName('my_lib')).toBe(true);
    expect(isValidPackageName('foo.bar')).toBe(true);
  });

  it('스코프 패키지명을 허용한다', () => {
    expect(isValidPackageName('@scope/lib')).toBe(true);
    expect(isValidPackageName('@my-org/ui-kit')).toBe(true);
  });

  it('대문자, 공백, 한글은 거부한다', () => {
    expect(isValidPackageName('MyLib')).toBe(false);
    expect(isValidPackageName('my lib')).toBe(false);
    expect(isValidPackageName('한글')).toBe(false);
  });
});

describe('getDirNameFromPackageName', () => {
  it('스코프가 없으면 그대로 반환', () => {
    expect(getDirNameFromPackageName('my-lib')).toBe('my-lib');
  });

  it('스코프가 있으면 스코프를 제거', () => {
    expect(getDirNameFromPackageName('@scope/my-lib')).toBe('my-lib');
    expect(getDirNameFromPackageName('@org/ui-kit')).toBe('ui-kit');
  });
});

describe('parseArgs', () => {
  it('이름 없으면 undefined', () => {
    expect(parseArgs(['node', 'cli']).name).toBeUndefined();
  });

  it('이름 positional 인자 파싱', () => {
    expect(parseArgs(['node', 'cli', 'my-lib']).name).toBe('my-lib');
  });

  it('스코프 패키지명 파싱', () => {
    expect(parseArgs(['node', 'cli', '@scope/lib']).name).toBe('@scope/lib');
  });
});

describe('resolveTemplateDir', () => {
  it('baseDir 기준 ../templates/lib 경로를 반환한다', () => {
    expect(resolveTemplateDir('/tmp/dist')).toBe('/tmp/templates/lib');
  });
});
