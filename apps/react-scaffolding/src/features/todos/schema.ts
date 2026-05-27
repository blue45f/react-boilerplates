import { z } from 'zod'

export const todoSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(80),
  completed: z.boolean(),
  createdAt: z.string(),
})

export type Todo = z.infer<typeof todoSchema>

export const todoFormSchema = z.object({
  title: z.string().trim().min(1, 'todos.errors.titleRequired').max(80, 'todos.errors.titleMax'),
})

export type TodoFormValues = z.infer<typeof todoFormSchema>

export const todoFilterSchema = z.enum(['all', 'pending', 'completed'])
export type TodoFilter = z.infer<typeof todoFilterSchema>
