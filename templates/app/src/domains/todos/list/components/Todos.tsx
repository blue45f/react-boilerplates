import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import TodoFilters from './TodoFilters'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import styles from './Todos.module.css'

import { useTodoFilterStore, useTodos, type Todo } from '@/domains/todos/list'
import useDocumentTitle from '@/shared/lib/hooks/useDocumentTitle'
import Loading from '@/shared/ui/Loading'

function filterTodos(todos: Todo[], filter: 'all' | 'pending' | 'completed') {
  if (filter === 'pending') return todos.filter((t) => !t.completed)
  if (filter === 'completed') return todos.filter((t) => t.completed)
  return todos
}

function Todos() {
  const { t } = useTranslation()
  useDocumentTitle(t('todos.title'))

  const { data, isPending, isError, error, refetch } = useTodos()
  const filter = useTodoFilterStore((s) => s.filter)

  const visible = useMemo(() => filterTodos(data ?? [], filter), [data, filter])
  const remaining = (data ?? []).filter((todo) => !todo.completed).length

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('todos.title')}</h1>
        <p className={styles.subtitle}>{t('todos.subtitle')}</p>
      </header>

      <TodoForm />
      <TodoFilters />

      {isPending && <Loading />}
      {isError && (
        <div role="alert" className={styles.errorBox}>
          <p>{error instanceof Error ? error.message : t('common.error')}</p>
          <button type="button" onClick={() => refetch()}>
            {t('common.retry')}
          </button>
        </div>
      )}

      {!isPending && !isError && visible.length === 0 && (
        <p className={styles.empty}>{t('todos.empty')}</p>
      )}

      {visible.length > 0 && (
        <>
          <ul className={styles.list}>
            {visible.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
          <p className={styles.counter} aria-live="polite">
            {t('todos.remaining', { count: remaining })}
          </p>
        </>
      )}
    </div>
  )
}

export default Todos
