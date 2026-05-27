import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'

import NotFound from './NotFound'

function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )
}

describe('NotFound', () => {
  it('sets the document title via useDocumentTitle', () => {
    renderNotFound()
    expect(document.title).toMatch(/페이지를 찾을 수 없습니다 - 404/)
  })

  it('renders the 404 code heading', () => {
    renderNotFound()
    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument()
  })

  it('renders the title and description text', () => {
    renderNotFound()
    expect(
      screen.getByRole('heading', { level: 2, name: '페이지를 찾을 수 없습니다' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('요청하신 페이지가 존재하지 않거나 이동되었습니다.')
    ).toBeInTheDocument()
  })

  it('renders a home link pointing to "/"', () => {
    renderNotFound()
    const link = screen.getByRole('link', { name: '홈으로 이동' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
