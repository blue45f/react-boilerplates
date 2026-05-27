import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import About from './About'

describe('About', () => {
  it('sets the document title via useDocumentTitle', () => {
    render(<About />)
    expect(document.title).toMatch(/소개/)
  })

  it('renders the intro section heading and description', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 1, name: '소개' })).toBeInTheDocument()
    expect(
      screen.getByText(/React Scaffolding은 현대적인 React 애플리케이션을/)
    ).toBeInTheDocument()
  })

  it('renders all top-level section headings', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2, name: '기술 스택' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: '팀 소개' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: '프로젝트 구조' })).toBeInTheDocument()
  })

  it('renders the tech stack list with all entries', () => {
    render(<About />)
    const techLabels = ['React 19', 'TypeScript', 'Vite', 'React Router', 'CSS Modules', 'ESLint']
    techLabels.forEach((label) => {
      const matches = screen.getAllByText(new RegExp(label))
      expect(matches.length).toBeGreaterThan(0)
    })
  })

  it('renders each team member with name, role and emoji', () => {
    render(<About />)
    const members = [
      { name: '김개발', role: 'Frontend Developer', emoji: '👨‍💻' },
      { name: '이디자인', role: 'UI/UX Designer', emoji: '🎨' },
      { name: '박백엔드', role: 'Backend Developer', emoji: '🔧' },
    ]
    members.forEach((m) => {
      expect(screen.getByRole('heading', { level: 3, name: m.name })).toBeInTheDocument()
      expect(screen.getByText(m.role)).toBeInTheDocument()
      expect(screen.getByText(m.emoji)).toBeInTheDocument()
    })
  })

  it('renders the project structure code block', () => {
    const { container } = render(<About />)
    const pre = container.querySelector('pre')
    expect(pre).not.toBeNull()
    expect(pre?.textContent).toContain('src/')
    expect(pre?.textContent).toContain('components/')
    expect(pre?.textContent).toContain('hooks/')
    expect(pre?.textContent).toContain('pages/')
  })
})
