import { test, expect } from '@playwright/test'

test.describe('Responsive header behavior', () => {
  test('hamburger menu button is hidden at desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')

    const hamburger = page.getByRole('button', { name: '메뉴 열기' })
    await expect(hamburger).toBeHidden()
  })

  test('hamburger menu toggles nav links at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const hamburger = page.getByRole('button', { name: '메뉴 열기' })
    await expect(hamburger).toBeVisible()

    // Nav links hidden by default on mobile.
    const aboutLink = page.getByRole('link', { name: '소개' })
    await expect(aboutLink).toBeHidden()

    // Click hamburger -> nav links become visible.
    await hamburger.click()
    await expect(aboutLink).toBeVisible()

    // Click 소개 -> URL changes and menu closes (button label returns to '메뉴 열기').
    await aboutLink.click()
    await expect(page).toHaveURL(/\/about$/)
    await expect(page.getByRole('button', { name: '메뉴 열기' })).toBeVisible()
  })
})
