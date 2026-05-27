import { useTranslation } from 'react-i18next'

import styles from './Todos.module.css'

import { useTodoFilterStore, type TodoFilter } from '@/domains/todos/list'

const FILTERS: TodoFilter[] = ['all', 'pending', 'completed']

function TodoFilters() {
  const { t } = useTranslation()
  const filter = useTodoFilterStore((s) => s.filter)
  const setFilter = useTodoFilterStore((s) => s.setFilter)

  return (
    <div className={styles.filters} role="tablist" aria-label={t('todos.title')}>
      {FILTERS.map((value) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={filter === value}
          className={`${styles.filter} ${filter === value ? styles.filterActive : ''}`}
          onClick={() => setFilter(value)}
        >
          {t(`todos.${value}`)}
        </button>
      ))}
    </div>
  )
}

export default TodoFilters
