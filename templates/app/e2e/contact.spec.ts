import { test, expect } from '@playwright/test';

test.describe('문의 폼', () => {
  test('필수 검증이 동작하고 제출 시 성공 토스트가 표시된다', async ({ page }) => {
    await page.goto('/contact');

    await page.getByRole('button', { name: /보내기|전송 중/ }).click();
    await expect(page.getByText('이름은 최소 2자')).toBeVisible();

    await page.getByLabel(/이름/).fill('홍길동');
    await page.getByLabel(/이메일/).fill('hong@example.com');
    await page.getByLabel(/메시지/).fill('안녕하세요. 보일러플레이트 잘 쓰고 있습니다.');

    await page.getByRole('button', { name: /보내기/ }).click();
    await expect(page.getByText('문의가 접수되었습니다')).toBeVisible({
      timeout: 5000,
    });
  });
});
