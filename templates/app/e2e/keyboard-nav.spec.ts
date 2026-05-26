import { test, expect } from '@playwright/test'

test.describe('Keyboard navigation', () => {
  test('Tab order visits SkipLink, logo, nav links, LanguageToggle, ThemeToggle in order', async ({
    page,
  }) => {
    await page.goto('/')
    await page.locator('h1').first().waitFor({ state: 'visible' })

    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveText('본문으로 건너뛰기')

    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveText('React App')

    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveText('홈')

    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveText('소개')

    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveText('할 일')

    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveJSProperty('tagName', 'SELECT')

    await page.keyboard.press('Tab')
    const themeToggle = page.locator(':focus')
    await expect(themeToggle).toHaveAttribute('aria-label', /다크 모드로 전환|라이트 모드로 전환/)

    let reachedPageInteractive = false
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab')
      const role = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null
        if (!el) return null
        return {
          tag: el.tagName,
          type: (el as HTMLInputElement).type ?? null,
          text: el.textContent?.trim().slice(0, 80) ?? '',
        }
      })
      if (!role) continue
      if (
        role.tag === 'BUTTON' &&
        (role.text === '시작하기' || role.text === '더 알아보기' || role.text === '구독하기')
      ) {
        reachedPageInteractive = true
        break
      }
      if (role.tag === 'INPUT') {
        reachedPageInteractive = true
        break
      }
    }
    expect(reachedPageInteractive).toBe(true)
  })

  test('Tab + Enter on "소개" link navigates to /about', async ({ page }) => {
    await page.goto('/')
    await page.locator('h1').first().waitFor({ state: 'visible' })

    await page.keyboard.press('Tab') // SkipLink
    await page.keyboard.press('Tab') // logo
    await page.keyboard.press('Tab') // 홈
    await page.keyboard.press('Tab') // 소개

    await expect(page.locator(':focus')).toHaveText('소개')

    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/\/about$/)
    await expect(page.getByRole('heading', { name: '기술 스택' })).toBeVisible()
  })

  test('does not trap focus on /about page', async ({ page }) => {
    await page.goto('/about')

    const seen: string[] = []
    let stuckCount = 0
    let lastKey = ''

    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab')
      const key = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null
        if (!el || el === document.body) return 'BODY'
        const tag = el.tagName
        const text = el.textContent?.trim().slice(0, 40) ?? ''
        const id = el.id ?? ''
        const aria = el.getAttribute('aria-label') ?? ''
        return `${tag}|${id}|${aria}|${text}`
      })
      if (key === lastKey) {
        stuckCount++
      } else {
        stuckCount = 0
      }
      lastKey = key
      seen.push(key)
      if (stuckCount > 2 && key !== 'BODY') {
        throw new Error(`Focus appears trapped on: ${key}`)
      }
    }

    const uniqueFocusables = new Set(seen.filter((s) => s !== 'BODY'))
    expect(uniqueFocusables.size).toBeGreaterThan(2)
  })
})
