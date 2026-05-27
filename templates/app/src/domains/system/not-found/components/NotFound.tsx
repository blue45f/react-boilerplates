import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import styles from './NotFound.module.css'

import useDocumentTitle from '@/shared/lib/hooks/useDocumentTitle'

function NotFound() {
  const { t } = useTranslation()
  useDocumentTitle(`${t('notFound.title')} - 404`)
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>{t('notFound.title')}</h2>
      <p className={styles.message}>{t('notFound.description')}</p>
      <Link to="/" className={styles.link}>
        {t('notFound.goHome')}
      </Link>
    </div>
  )
}

export default NotFound
