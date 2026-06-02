import Button from '@components/common/Button'
import Input from '@components/common/Input'
import { useToast } from '@components/common/Toast'
import { todoFormSchema, useAddTodo, type TodoFormValues } from '@features/todos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import styles from './Todos.module.css'

function TodoForm() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const addTodo = useAddTodo()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: { title: '' },
  })

  const onSubmit = handleSubmit(async ({ title }) => {
    await addTodo.mutateAsync(title)
    reset()
  })

  const errorKey = errors.title?.message
  const errorText = errorKey ? t(errorKey) : undefined
  const isBusy = isSubmitting || addTodo.isPending

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Input
        type="text"
        placeholder={t('todos.addPlaceholder')}
        aria-label={t('todos.addPlaceholder')}
        error={errorText}
        {...register('title')}
        disabled={isBusy}
      />
      <Button type="submit" isLoading={isBusy}>
        {t('todos.addButton')}
      </Button>
      {addTodo.isError && (
        <span role="alert" className={styles.error}>
          {t('common.error')}{' '}
          <button
            type="button"
            className={styles.retry}
            onClick={() => {
              addTodo.reset()
              toast(t('common.retry'), 'info')
            }}
          >
            {t('common.retry')}
          </button>
        </span>
      )}
    </form>
  )
}

export default TodoForm
