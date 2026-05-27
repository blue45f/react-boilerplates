import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { __resetTodos, createTodo, deleteTodo, fetchTodos, updateTodo } from '../api/todosApi'

beforeEach(() => {
  __resetTodos()
})

afterEach(() => {
  __resetTodos()
})

describe('todos api (localStorage mock)', () => {
  it('fetchTodos returns an empty list initially', async () => {
    const todos = await fetchTodos()
    expect(todos).toEqual([])
  })

  it('createTodo prepends the new todo and persists', async () => {
    const created = await createTodo('첫번째')
    expect(created.title).toBe('첫번째')
    expect(created.completed).toBe(false)

    const todos = await fetchTodos()
    expect(todos).toHaveLength(1)
    expect(todos[0].id).toBe(created.id)
  })

  it('updateTodo patches title and completed', async () => {
    const created = await createTodo('a')
    const updated = await updateTodo(created.id, { completed: true })
    expect(updated.completed).toBe(true)
    const renamed = await updateTodo(created.id, { title: 'b' })
    expect(renamed.title).toBe('b')
  })

  it('deleteTodo removes the todo', async () => {
    const a = await createTodo('a')
    await createTodo('b')
    await deleteTodo(a.id)
    const todos = await fetchTodos()
    expect(todos.map((t) => t.title)).toEqual(['b'])
  })

  it('updateTodo throws when id not found', async () => {
    await expect(updateTodo('nonexistent', { completed: true })).rejects.toThrow(/not found/)
  })
})
