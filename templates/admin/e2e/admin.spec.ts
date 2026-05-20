import { test, expect } from '@playwright/test';

test.describe('인증', () => {
  test('미인증 시 /login으로 리다이렉트', async ({ page }) => {
    await page.context().clearCookies();
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    await page.goto('/');
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  });

  test('로그인 → 대시보드 → 사용자 추가 시나리오', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.clear());
    await page.goto('/login');

    await page.getByLabel('이메일').fill('admin@example.com');
    await page.getByLabel('비밀번호').fill('admin1234');
    await page.getByRole('button', { name: '로그인' }).click();

    await expect(page.getByRole('heading', { name: '대시보드' })).toBeVisible();

    await page.getByRole('menuitem', { name: '사용자 관리' }).click();
    await expect(page.getByRole('heading', { name: '사용자 관리' })).toBeVisible();

    await page.getByRole('button', { name: '새 사용자 추가' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByLabel('이름').fill('e2e테스터');
    await dialog.getByLabel('이메일').fill('e2e@example.com');
    await dialog.getByRole('button', { name: '저장' }).click();

    await expect(page.getByText('e2e테스터')).toBeVisible();
  });
});

test.describe('Admin 대시보드 (인증된 상태)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      const auth = {
        state: {
          user: { id: 'usr_self', name: '관리자', email: 'admin@example.com', role: 'admin' },
          isAuthenticated: true,
        },
        version: 1,
      };
      window.localStorage.setItem('admin-auth-store', JSON.stringify(auth));
    });
  });

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
    await page.getByRole('menuitem', { name: '사용자 관리' }).click();
    await expect(page.getByRole('heading', { name: '사용자 관리' })).toBeVisible();
  });

  test('Analytics 페이지로 이동', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('menuitem', { name: '분석' }).click();
    await expect(page.getByRole('heading', { name: '분석' })).toBeVisible();
  });

  test('설정 탭이 렌더링된다', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: '설정' })).toBeVisible();
    await expect(page.getByRole('tab', { name: '일반' })).toBeVisible();
  });

  test('존재하지 않는 페이지는 404를 표시한다', async ({ page }) => {
    await page.goto('/nonexistent');
    await expect(page.getByText('404')).toBeVisible();
  });
});

test.describe('접근성', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      const auth = {
        state: {
          user: { id: 'usr_self', name: '관리자', email: 'admin@example.com', role: 'admin' },
          isAuthenticated: true,
        },
        version: 1,
      };
      window.localStorage.setItem('admin-auth-store', JSON.stringify(auth));
    });
  });

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
