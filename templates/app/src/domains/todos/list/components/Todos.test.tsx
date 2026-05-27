import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import Todos from './Todos'

import { __resetTodos, useTodoFilterStore } from '@/domains/todos/list'
import { ToastProvider } from '@/shared/ui/Toast'

const initialFilter = useTodoFilterStore.getState()

function renderTodos() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <ToastProvider>
        <Todos />
      </ToastProvider>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  __resetTodos()
  useTodoFilterStore.setState(initialFilter, true)
})

afterEach(() => {
  __resetTodos()
})

describe('Todos page', () => {
  it('shows empty state initially', async () => {
    renderTodos()
    expect(await screen.findByText('아직 할 일이 없습니다.')).toBeInTheDocument()
  })

  it('adds a new todo via the form', async () => {
    const user = userEvent.setup()
    renderTodos()
    await screen.findByText('아직 할 일이 없습니다.')

    const input = screen.getByPlaceholderText('할 일을 입력하세요')
    await user.type(input, '책 읽기')
    await user.click(screen.getByRole('button', { name: '추가' }))

    expect(await screen.findByText('책 읽기')).toBeInTheDocument()
  })

  it('toggles completion and shows remaining count', async () => {
    const user = userEvent.setup()
    renderTodos()
    const input = screen.getByPlaceholderText('할 일을 입력하세요')
    await user.type(input, '운동')
    await user.click(screen.getByRole('button', { name: '추가' }))
    await screen.findByText('운동')

    await waitFor(() => {
      expect(screen.getByText(/1개 남음/)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('checkbox', { name: '완료 상태 토글' }))
    await waitFor(() => {
      expect(screen.getByText(/0개 남음/)).toBeInTheDocument()
    })
  })

  it('deletes a todo via the delete button', async () => {
    const user = userEvent.setup()
    renderTodos()
    const input = screen.getByPlaceholderText('할 일을 입력하세요')
    await user.type(input, '청소')
    await user.click(screen.getByRole('button', { name: '추가' }))
    await screen.findByText('청소')

    await user.click(screen.getByRole('button', { name: '삭제' }))
    await waitFor(() => {
      expect(screen.queryByText('청소')).not.toBeInTheDocument()
    })
  })

  it('shows validation error for empty title submit', async () => {
    const user = userEvent.setup()
    renderTodos()
    await user.click(screen.getByRole('button', { name: '추가' }))
    expect(await screen.findByText('제목을 입력해주세요.')).toBeInTheDocument()
  })
})
