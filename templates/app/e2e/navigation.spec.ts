import { test, expect } from '@playwright/test'

test.describe('Navigation smoke tests', () => {
  test('loads home page with hero heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /React 프로젝트를/ })).toBeVisible()
  })

  test('navigates to About page via header link', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: '소개' }).click()
    await expect(page).toHaveURL(/\/about$/)
    await expect(page.getByRole('heading', { name: '기술 스택' })).toBeVisible()
  })

  test('renders 404 page on unknown route and links home', async ({ page }) => {
    await page.goto('/non-existent-path')
    await expect(page.getByText('페이지를 찾을 수 없습니다')).toBeVisible()

    await page.getByRole('link', { name: '홈으로 이동' }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  test('navigates to Todos page and adds a todo', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.removeItem('react-app.todos'))
    await page.getByRole('link', { name: '할 일' }).click()
    await expect(page).toHaveURL(/\/todos$/)

    const input = page.getByPlaceholder('할 일을 입력하세요')
    await input.fill('Playwright 시나리오 작성')
    await page.getByRole('button', { name: '추가', exact: true }).click()
    await expect(page.getByText('Playwright 시나리오 작성')).toBeVisible()

    await page.getByRole('button', { name: '삭제' }).first().click()
    await expect(page.getByText('아직 할 일이 없습니다.')).toBeVisible()
  })
})
