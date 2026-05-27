import { Suspense } from 'react'
import { Outlet } from 'react-router'

import styles from './AppShell.module.css'

import Footer from '@/app/shell/Footer'
import Header from '@/app/shell/Header'
import ErrorBoundary from '@/shared/ui/ErrorBoundary'
import Loading from '@/shared/ui/Loading'
import SkipLink from '@/shared/ui/SkipLink'

function AppShell() {
  return (
    <div className={styles.app}>
      <SkipLink />
      <Header />
      <main id="main-content" className={styles.main} role="main">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

export default AppShell
