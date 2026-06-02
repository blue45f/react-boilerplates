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
  const quickActions = [t('home.getStarted'), t('home.learnMore')]
  const coreBenefits = [
    { title: 'TypeScript', description: t('home.benefits.typescript') },
    { title: 'Vite', description: t('home.benefits.vite') },
    { title: 'React Router', description: t('home.benefits.router') },
    { title: 'CSS Modules', description: t('home.benefits.cssModules') },
  ]

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
        <p className={styles.kicker}>{t('home.kicker')}</p>
        <h1 className={styles.title}>{t('home.title')}</h1>
        <p className={styles.description}>{t('home.description')}</p>
        <div className={styles.buttons} role="group" aria-label={t('home.heroActions')}>
          {quickActions.map((label) => (
            <Button
              key={label}
              variant={label === t('home.getStarted') ? 'primary' : 'outline'}
              size="lg"
            >
              {label}
            </Button>
          ))}
        </div>
        <dl className={styles.heroMetrics} aria-label={t('home.metricsTitle')}>
          <div className={styles.metric}>
            <dt>{t('home.metrics.qualityTerm')}</dt>
            <dd>{t('home.metrics.qualityValue')}</dd>
          </div>
          <div className={styles.metric}>
            <dt>{t('home.metrics.a11yTerm')}</dt>
            <dd>{t('home.metrics.a11yValue')}</dd>
          </div>
          <div className={styles.metric}>
            <dt>{t('home.metrics.opsTerm')}</dt>
            <dd>{t('home.metrics.opsValue')}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>{t('home.featuresTitle')}</h2>
        <div className={styles.featureGrid}>
          {coreBenefits.map((benefit) => (
            <article key={benefit.title} className={styles.featureCard}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
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
          <Button type="submit" isLoading={isSubmitting} variant="primary">
            {t('home.subscribe')}
          </Button>
        </form>
      </section>

      <section className={styles.quickStart} aria-label={t('home.quickStartAria')}>
        <h2 className={styles.sectionTitle}>{t('home.quickStartTitle')}</h2>
        <ol className={styles.steps}>
          <li>{t('home.quickStart.step1')}</li>
          <li>{t('home.quickStart.step2')}</li>
          <li>{t('home.quickStart.step3')}</li>
        </ol>
      </section>
    </div>
  )
}

export default Home
