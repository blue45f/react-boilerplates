import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

const routes: Array<{ path: string; description: string }> = [
  { path: '/', description: 'home' },
  { path: '/about', description: 'about' },
  { path: '/todos', description: 'todos' },
  { path: '/this-route-does-not-exist', description: '404' },
]

test.describe('Accessibility audit (axe)', () => {
  for (const route of routes) {
    test(`${route.description} (${route.path}) has no axe violations`, async ({ page }) => {
      await page.goto(route.path)
      await page.locator('h1').first().waitFor({ state: 'visible' })

      const results = await new AxeBuilder({ page }).analyze()
      expect(results.violations).toEqual([])
    })

    test(`${route.description} (${route.path}) has exactly one <h1>`, async ({ page }) => {
      await page.goto(route.path)
      await page.locator('h1').first().waitFor({ state: 'visible' })
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)
    })
  }
})
