import { describe, expect, it, beforeEach } from 'vitest'

import { useTodoFilterStore } from '../model/todoFilterStore'

const initial = useTodoFilterStore.getState()

beforeEach(() => {
  useTodoFilterStore.setState(initial, true)
})

describe('useTodoFilterStore', () => {
  it('defaults to all', () => {
    expect(useTodoFilterStore.getState().filter).toBe('all')
  })

  it('setFilter updates the filter value', () => {
    useTodoFilterStore.getState().setFilter('pending')
    expect(useTodoFilterStore.getState().filter).toBe('pending')
  })
})
