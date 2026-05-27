import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createTodo, deleteTodo, fetchTodos, updateTodo } from '../api/todosApi'

import type { Todo } from './todoSchema'

export const todosKeys = {
  all: ['todos'] as const,
  list: () => [...todosKeys.all, 'list'] as const,
}

export function useTodos() {
  return useQuery({
    queryKey: todosKeys.list(),
    queryFn: fetchTodos,
  })
}

export function useAddTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (title: string) => createTodo(title),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todosKeys.list() }),
  })
}

export function useToggleTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTodo(id, { completed }),
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: todosKeys.list() })
      const previous = queryClient.getQueryData<Todo[]>(todosKeys.list()) ?? []
      queryClient.setQueryData<Todo[]>(todosKeys.list(), (prev) =>
        prev?.map((t) => (t.id === id ? { ...t, completed } : t))
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(todosKeys.list(), context.previous)
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: todosKeys.list() }),
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todosKeys.list() })
      const previous = queryClient.getQueryData<Todo[]>(todosKeys.list()) ?? []
      queryClient.setQueryData<Todo[]>(todosKeys.list(), (prev) => prev?.filter((t) => t.id !== id))
      return { previous }
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(todosKeys.list(), context.previous)
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: todosKeys.list() }),
  })
}
