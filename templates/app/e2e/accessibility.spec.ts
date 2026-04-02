import { test, expect } from '@playwright/test';

test.describe('접근성', () => {
  test('skip link이 존재한다', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByText('본문으로 건너뛰기');
    await expect(skipLink).toBeAttached();
  });

  test('메인 네비게이션에 aria-label이 있다', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: '메인 네비게이션' });
    await expect(nav).toBeVisible();
  });

  test('현재 페이지에 aria-current가 설정된다', async ({ page }) => {
    await page.goto('/');
    const homeLink = page.getByRole('link', { name: '홈' });
    await expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  test('main 랜드마크가 존재한다', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('#main-content');
    await expect(main).toBeVisible();
  });
});
