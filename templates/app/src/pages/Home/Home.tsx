import Button from '@components/common/Button'
import Input from '@components/common/Input'
import { useToast } from '@components/common/Toast'
import { zodResolver } from '@hookform/resolvers/zod'
import useDocumentTitle from '@hooks/useDocumentTitle'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import styles from './Home.module.css'

const newsletterSchema = z.object({
  email: z.string().trim().min(1, 'home.errors.emailRequired').email('home.errors.emailInvalid'),
})

type NewsletterValues = z.infer<typeof newsletterSchema>

function Home() {
  const { t } = useTranslation()
  useDocumentTitle(t('home.title'))
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast(t('home.subscribeSuccess'), 'success')
    reset()
  })

  const emailErrorKey = errors.email?.message
  const emailError = emailErrorKey ? t(emailErrorKey) : undefined

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{t('home.title')}</h1>
        <p className={styles.description}>{t('home.description')}</p>
        <div className={styles.buttons}>
          <Button variant="primary" size="lg">
            {t('home.getStarted')}
          </Button>
          <Button variant="outline" size="lg">
            {t('home.learnMore')}
          </Button>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>{t('home.featuresTitle')}</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>TypeScript</h3>
            <p>타입 안정성으로 버그를 사전에 방지하세요.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Vite</h3>
            <p>빠른 HMR과 빌드 속도를 경험하세요.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>React Router</h3>
            <p>클라이언트 사이드 라우팅이 설정되어 있습니다.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>CSS Modules</h3>
            <p>스코프된 스타일링으로 충돌을 방지합니다.</p>
          </div>
        </div>
      </section>

      <section className={styles.newsletter}>
        <h2 className={styles.sectionTitle}>{t('home.newsletterTitle')}</h2>
        <p className={styles.newsletterDesc}>{t('home.newsletterDesc')}</p>
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <Input
            type="email"
            placeholder={t('home.emailPlaceholder')}
            error={emailError}
            aria-required="true"
            {...register('email')}
          />
          <Button type="submit" isLoading={isSubmitting}>
            {t('home.subscribe')}
          </Button>
        </form>
      </section>
    </div>
  )
}

export default Home
