import { test, expect } from '@playwright/test'

test.describe('Theme toggle', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies()
  })

  test('toggles theme from light to dark and persists across reload', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

    const toggle = page.getByRole('button', { name: '다크 모드로 전환' })
    await expect(toggle).toBeVisible()
    await toggle.click()

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    await expect(page.getByRole('button', { name: '라이트 모드로 전환' })).toBeVisible()

    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem('app-store')
      if (!raw) return null
      return (JSON.parse(raw) as { state?: { theme?: string } }).state?.theme ?? null
    })
    expect(stored).toBe('dark')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })
})
