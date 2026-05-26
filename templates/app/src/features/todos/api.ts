import { todoSchema, type Todo } from './schema'

const STORAGE_KEY = 'react-app.todos'
const LATENCY_MS = 120

function delay<T>(value: T, ms = LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms)
  })
}

function readStorage(): Todo[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is Todo => todoSchema.safeParse(item).success)
  } catch {
    return []
  }
}

function writeStorage(todos: Todo[]) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export async function fetchTodos(): Promise<Todo[]> {
  return delay(readStorage())
}

export async function createTodo(title: string): Promise<Todo> {
  const todos = readStorage()
  const next: Todo = {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  }
  writeStorage([next, ...todos])
  return delay(next)
}

export async function updateTodo(id: string, patch: Partial<Pick<Todo, 'title' | 'completed'>>) {
  const todos = readStorage()
  const idx = todos.findIndex((t) => t.id === id)
  if (idx === -1) throw new Error(`Todo ${id} not found`)
  const updated: Todo = { ...todos[idx], ...patch }
  const next = [...todos.slice(0, idx), updated, ...todos.slice(idx + 1)]
  writeStorage(next)
  return delay(updated)
}

export async function deleteTodo(id: string): Promise<void> {
  const todos = readStorage().filter((t) => t.id !== id)
  writeStorage(todos)
  await delay(undefined)
}

export function __resetTodos() {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
