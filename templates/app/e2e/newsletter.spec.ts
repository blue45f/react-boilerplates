import { test, expect } from '@playwright/test'

test.describe('Newsletter subscription', () => {
  test('validates and submits newsletter form', async ({ page }) => {
    await page.goto('/')

    const newsletterHeading = page.getByRole('heading', { name: '뉴스레터 구독' })
    await newsletterHeading.scrollIntoViewIfNeeded()
    await expect(newsletterHeading).toBeVisible()

    const emailInput = page.locator('input[name="email"]')
    const submitButton = page.getByRole('button', { name: '구독하기' })

    await submitButton.click()
    await expect(page.getByText('이메일을 입력해주세요.')).toBeVisible()

    await emailInput.fill('not-an-email')
    await emailInput.blur()
    await expect(page.getByText('올바른 이메일 형식이 아닙니다.')).toBeVisible()

    await emailInput.fill('me@example.com')
    await submitButton.click()

    await expect(page.getByText('구독 신청이 완료되었습니다!')).toBeVisible({ timeout: 3000 })

    await expect(emailInput).toHaveValue('')
  })
})
