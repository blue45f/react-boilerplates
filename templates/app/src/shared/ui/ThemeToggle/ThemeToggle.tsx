import { useTranslation } from 'react-i18next'

import styles from './ThemeToggle.module.css'

import useTheme from '@/shared/lib/hooks/useTheme'

function ThemeToggle() {
  const { t } = useTranslation()
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.toLight') : t('theme.toDark')}
      title={isDark ? t('theme.lightMode') : t('theme.darkMode')}
      type="button"
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

export default ThemeToggle
