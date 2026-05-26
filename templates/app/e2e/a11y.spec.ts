import { test, expect } from '@playwright/test'

test.describe('Accessibility smoke tests', () => {
  test('first Tab focuses the SkipLink', async ({ page }) => {
    await page.goto('/')
    await page.locator('h1').first().waitFor({ state: 'visible' })
    await page.keyboard.press('Tab')

    const focused = page.locator(':focus')
    await expect(focused).toHaveText('본문으로 건너뛰기')
  })

  test('all images have an alt attribute', async ({ page }) => {
    await page.goto('/')

    const images = page.locator('img')
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).not.toBeNull()
    }
  })
})
