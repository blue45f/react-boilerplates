import Loading from '@components/common/Loading'
import { useTodoFilterStore, useTodos, type Todo } from '@features/todos'
import useDocumentTitle from '@hooks/useDocumentTitle'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import TodoFilters from './TodoFilters'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import styles from './Todos.module.css'

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
  const completed = (data ?? []).filter((todo) => todo.completed).length
  const total = data?.length ?? 0

  const emptyAllState = !isPending && !isError && total === 0
  const emptyFilterState = !isPending && !isError && total > 0 && visible.length === 0

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>{t('todos.title')}</h1>
          <p className={styles.subtitle}>{t('todos.subtitle')}</p>
        </div>
        <div className={styles.stats}>
          <span>{t('todos.statsTotal', { count: total })}</span>
          <span>{t('todos.statsCompleted', { count: completed })}</span>
        </div>
      </header>

      <TodoForm />
      <TodoFilters />
      {!isPending && !isError && total > 0 && (
        <p className={styles.counter} aria-live="polite">
          {t('todos.remaining', { count: remaining })}
        </p>
      )}

      <div id="todo-list" role="tabpanel" aria-labelledby={`todo-filter-${filter}`}>
        {isPending && <Loading />}
        {isError && (
          <div role="alert" className={styles.errorBox}>
            <p>{error instanceof Error ? error.message : t('common.error')}</p>
            <button type="button" className={styles.retry} onClick={() => refetch()}>
              {t('common.retry')}
            </button>
          </div>
        )}

        {!isPending && !isError && emptyAllState && (
          <section className={styles.emptyState} role="status">
            <h2>{t('todos.empty')}</h2>
            <p>{t('todos.emptyHint')}</p>
          </section>
        )}

        {!isPending && !isError && emptyFilterState && (
          <section className={styles.emptyState} role="status">
            <h2>{t('todos.emptyFilterTitle')}</h2>
            <p>{t('todos.emptyFilterHint')}</p>
          </section>
        )}

        {visible.length > 0 && (
          <ul className={styles.list}>
            {visible.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Todos
