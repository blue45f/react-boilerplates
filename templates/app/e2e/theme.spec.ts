import { test, expect } from '@playwright/test';

test.describe('다크모드 토글', () => {
  test('토글 버튼이 클릭 시 html 클래스를 변경한다', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initialClass = (await html.getAttribute('class')) ?? '';

    const toggle = page.getByRole('button', { name: /다크모드|라이트모드/ }).first();
    await toggle.click();

    await expect
      .poll(async () => (await html.getAttribute('class')) ?? '', {
        timeout: 3000,
      })
      .not.toBe(initialClass);
  });
});
