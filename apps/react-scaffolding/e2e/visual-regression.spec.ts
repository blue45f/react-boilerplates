// Visual regression snapshots.
//
// The first run of these tests writes baseline screenshots to
// `e2e/visual-regression.spec.ts-snapshots/`. Subsequent runs compare new
// screenshots against those baselines. To intentionally refresh the
// baselines after a UI change, run:
//
//   pnpm exec playwright test --update-snapshots
//
import { test, expect } from '@playwright/test'

test.describe('Visual regression', () => {
  test('home page light theme matches baseline', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator('h1').first().waitFor({ state: 'visible' })
    // Ensure fonts are fully loaded for stable snapshots.
    await page.evaluate(() => document.fonts?.ready)
    await expect(page).toHaveScreenshot('home-light.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    })
  })

  test('home page dark theme matches baseline', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator('h1').first().waitFor({ state: 'visible' })

    // Switch to dark mode using the visible theme toggle button.
    const darkToggle = page.getByRole('button', { name: '다크 모드로 전환' })
    await darkToggle.click()

    // Wait for the html data-theme attribute to update before snapshotting.
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    await page.evaluate(() => document.fonts?.ready)
    await expect(page).toHaveScreenshot('home-dark.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    })
  })
})
