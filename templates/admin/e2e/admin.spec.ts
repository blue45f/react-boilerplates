import { test, expect } from '@playwright/test';

test.describe('Admin 대시보드', () => {
  test('대시보드가 렌더링된다', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: '대시보드' })).toBeVisible();
  });

  test('통계 카드가 표시된다', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('총 사용자')).toBeVisible();
    await expect(page.getByText('총 주문')).toBeVisible();
    await expect(page.getByText('총 매출')).toBeVisible();
    await expect(page.getByText('성장률')).toBeVisible();
  });

  test('사이드바 메뉴로 페이지 이동한다', async ({ page }) => {
    await page.goto('/');
    await page.getByText('사용자 관리').click();
    await expect(page.getByRole('heading', { name: '사용자 관리' })).toBeVisible();
  });

  test('사용자 테이블이 렌더링된다', async ({ page }) => {
    await page.goto('/users');
    await expect(page.getByText('홍길동')).toBeVisible();
    await expect(page.getByText('김철수')).toBeVisible();
  });

  test('설정 폼이 렌더링된다', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByText('기본 설정')).toBeVisible();
    await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  });

  test('존재하지 않는 페이지는 404를 표시한다', async ({ page }) => {
    await page.goto('/nonexistent');
    await expect(page.getByText('404')).toBeVisible();
  });

  test('사이드바를 접을 수 있다', async ({ page }) => {
    await page.goto('/');
    const collapseButton = page.locator('.ant-layout-sider-trigger');
    await collapseButton.click();
    await expect(page.locator('.ant-layout-sider-collapsed')).toBeVisible();
  });
});

test.describe('접근성', () => {
  test('skip link이 존재한다', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByText('본문으로 건너뛰기');
    await expect(skipLink).toBeAttached();
  });

  test('사이드바에 aria-label이 있다', async ({ page }) => {
    await page.goto('/');
    const sider = page.locator('[aria-label="사이드바 네비게이션"]');
    await expect(sider).toBeVisible();
  });
});
