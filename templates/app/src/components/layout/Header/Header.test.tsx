import { useAppStore } from '@store/index'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import Header from './Header'

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState(useAppStore.getInitialState(), true)
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })
})

function renderHeader(initial = '/') {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <Header />
    </MemoryRouter>
  )
}

describe('Header', () => {
  it('renders logo and nav items', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'React App' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '홈' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '소개' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '할 일' })).toBeInTheDocument()
  })

  it('marks the active route with aria-current', () => {
    renderHeader('/about')
    const aboutLink = screen.getByRole('link', { name: '소개' })
    expect(aboutLink).toHaveAttribute('aria-current', 'page')
  })

  it('toggles the mobile menu via the hamburger button', () => {
    renderHeader()
    const btn = screen.getByLabelText('메뉴 열기')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(screen.getByLabelText('메뉴 닫기')).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the menu when a nav link is clicked', () => {
    renderHeader()
    fireEvent.click(screen.getByLabelText('메뉴 열기'))
    fireEvent.click(screen.getByRole('link', { name: '홈' }))
    expect(screen.getByLabelText('메뉴 열기')).toHaveAttribute('aria-expanded', 'false')
  })

  it('changes the displayed language via the language toggle', () => {
    renderHeader()
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('ko')
    fireEvent.change(select, { target: { value: 'en' } })
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
  })
})
