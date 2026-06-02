import LanguageToggle from '@components/common/LanguageToggle'
import ThemeToggle from '@components/common/ThemeToggle'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

import styles from './Header.module.css'

function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/todos', label: t('nav.todos') },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoWrap} aria-label={t('common.appName')}>
          <span className={styles.brandDot} aria-hidden="true" />
          <span className={styles.logo}>{t('common.appName')}</span>
        </Link>
        <div className={`${styles.actions} ${menuOpen ? styles.open : ''}`}>
          <nav aria-label={t('header.primaryNav')} className={styles.navWrap}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.path} className={styles.navItem}>
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${
                      location.pathname === item.path ? styles.active : ''
                    }`}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.controls}>
            <span className={styles.controlLabel} aria-hidden="true">
              {t('common.language')}
            </span>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
          aria-expanded={menuOpen}
          type="button"
        >
          <span className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`} />
        </button>
      </div>
    </header>
  )
}

export default Header
