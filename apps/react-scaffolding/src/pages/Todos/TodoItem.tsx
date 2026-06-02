import { useDeleteTodo, useToggleTodo, type Todo } from '@features/todos'
import { useTranslation } from 'react-i18next'

import styles from './Todos.module.css'

interface TodoItemProps {
  todo: Todo
}

function TodoItem({ todo }: TodoItemProps) {
  const { t } = useTranslation()
  const toggleTodo = useToggleTodo()
  const deleteTodo = useDeleteTodo()

  return (
    <li className={styles.item}>
      <label className={styles.itemLabel}>
        <input
          type="checkbox"
          checked={todo.completed}
          aria-label={t('todos.actions.toggle')}
          aria-describedby={`todo-${todo.id}-label`}
          onChange={(e) => toggleTodo.mutate({ id: todo.id, completed: e.target.checked })}
          disabled={toggleTodo.isPending}
        />
        <span
          id={`todo-${todo.id}-label`}
          className={`${styles.todoTitle} ${todo.completed ? styles.titleDone : ''}`}
        >
          {todo.title}
        </span>
      </label>
      <button
        type="button"
        className={styles.delete}
        aria-label={t('todos.actions.delete')}
        onClick={() => deleteTodo.mutate(todo.id)}
        disabled={deleteTodo.isPending || toggleTodo.isPending}
      >
        ×
      </button>
    </li>
  )
}

export default TodoItem
