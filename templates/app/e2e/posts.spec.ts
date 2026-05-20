import { test, expect } from '@playwright/test';

test.describe('게시글 검색', () => {
  test('검색어 입력 시 결과가 필터링된다', async ({ page }) => {
    await page.goto('/posts');

    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible({ timeout: 7000 });

    await page.getByLabel('게시글 검색').fill('zzzznotfoundzzzz');
    await expect(page.getByText('검색 결과가 없습니다')).toBeVisible();

    await page.getByLabel('검색어 지우기').click();
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
  });
});
