import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import Home from './Home'

import { ToastProvider } from '@/shared/ui/Toast'

function renderHome() {
  return render(
    <ToastProvider>
      <Home />
    </ToastProvider>
  )
}

describe('Home', () => {
  it('sets the document title via useDocumentTitle', () => {
    renderHome()
    expect(document.title).toMatch(/빠르게 시작하세요/)
  })

  it('renders the hero section with title and description', () => {
    renderHome()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toMatch(/React 프로젝트를/)
    expect(screen.getByText(/TypeScript, Vite, React Router/)).toBeInTheDocument()
  })

  it('renders the two CTA buttons', () => {
    renderHome()
    expect(screen.getByRole('button', { name: '시작하기' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '더 알아보기' })).toBeInTheDocument()
  })

  it('renders the features section with all four feature cards', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 2, name: '주요 기능' })).toBeInTheDocument()
    const headings = ['TypeScript', 'Vite', 'React Router', 'CSS Modules']
    headings.forEach((title) => {
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument()
    })
  })

  it('renders the newsletter section with form, input and submit button', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 2, name: '뉴스레터 구독' })).toBeInTheDocument()
    expect(screen.getByText('최신 업데이트와 팁을 받아보세요.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('이메일 주소를 입력하세요')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '구독하기' })).toBeInTheDocument()
  })

  it('shows an email-required error when the form is submitted empty', async () => {
    const user = userEvent.setup()
    renderHome()
    await user.click(screen.getByRole('button', { name: '구독하기' }))
    expect(await screen.findByText('이메일을 입력해주세요.')).toBeInTheDocument()
  })

  it('shows an invalid-email-format error when an invalid email is submitted', async () => {
    const user = userEvent.setup()
    renderHome()
    const input = screen.getByPlaceholderText('이메일 주소를 입력하세요')
    await user.type(input, 'not-an-email')
    await user.click(screen.getByRole('button', { name: '구독하기' }))
    expect(await screen.findByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument()
  })

  it('shows the success toast and resets the field on valid submission', async () => {
    const user = userEvent.setup()
    renderHome()
    const input = screen.getByPlaceholderText('이메일 주소를 입력하세요') as HTMLInputElement
    await user.type(input, 'valid@example.com')
    expect(input.value).toBe('valid@example.com')

    await user.click(screen.getByRole('button', { name: '구독하기' }))

    await waitFor(
      () => {
        expect(screen.getByText('구독 신청이 완료되었습니다!')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
    expect(
      (screen.getByPlaceholderText('이메일 주소를 입력하세요') as HTMLInputElement).value
    ).toBe('')
  })
})
