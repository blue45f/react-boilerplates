import { test, expect } from '@playwright/test';

test.describe('네비게이션', () => {
  test('홈 페이지가 렌더링된다', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/React App/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('환영합니다');
  });

  test('소개 페이지로 이동한다', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: '소개' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('소개');
  });

  test('게시글 페이지로 이동한다', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: '게시글' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('게시글');
  });

  test('존재하지 않는 페이지는 404를 표시한다', async ({ page }) => {
    await page.goto('/nonexistent');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('페이지를 찾을 수 없습니다')).toBeVisible();
  });

  test('404 페이지에서 홈으로 돌아갈 수 있다', async ({ page }) => {
    await page.goto('/nonexistent');
    await page.getByRole('link', { name: '홈으로 돌아가기' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('환영합니다');
  });
});
