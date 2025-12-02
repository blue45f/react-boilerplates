import {
  BrowserOptions,
  browserProfilingIntegration,
  browserTracingIntegration,
  init,
  replayIntegration,
} from '@sentry/react'

/** 환경에 따른 최대 샘플링 레이트 */
const MAX_SAMPLE_RATE = process.env.NODE_ENV === 'production' ? 0.05 : 0.5

/** 기본 Sentry 옵션 */
const DEFAULT_OPTIONS: BrowserOptions = {
  integrations: [browserTracingIntegration(), browserProfilingIntegration(), replayIntegration()],
  sampleRate: MAX_SAMPLE_RATE,
  tracesSampleRate: MAX_SAMPLE_RATE,
  profilesSampleRate: MAX_SAMPLE_RATE,
  replaysSessionSampleRate: MAX_SAMPLE_RATE,
  replaysOnErrorSampleRate: 1.0,
}

/**
 * 샘플 레이트가 최대값을 초과하는지 확인합니다.
 */
const validateSampleRates = (options: BrowserOptions): void => {
  const ratesToCheck = [
    { name: 'sampleRate', value: options.sampleRate },
    { name: 'tracesSampleRate', value: options.tracesSampleRate },
    { name: 'profilesSampleRate', value: options.profilesSampleRate },
    { name: 'replaysSessionSampleRate', value: options.replaysSessionSampleRate },
  ]

  const exceededRates = ratesToCheck.filter(({ value }) => (value ?? 0) > MAX_SAMPLE_RATE)

  if (exceededRates.length > 0) {
    const rateNames = exceededRates.map((r) => r.name).join(', ')
    console.warn(
      `[Boilerplate] Sentry sample rate(s) too high: ${rateNames}. ` +
        `Maximum allowed in ${process.env.NODE_ENV ?? 'development'} is ${MAX_SAMPLE_RATE}`,
    )
  }
}

/**
 * Sentry를 초기화합니다.
 *
 * @param options - Sentry 브라우저 옵션
 * @throws {Error} DSN이 제공되지 않은 경우
 *
 * @example
 * initSentry({
 *   dsn: 'https://your-dsn@sentry.io/project',
 *   environment: 'production',
 * })
 */
export const initSentry = (options: BrowserOptions): void => {
  if (!options.dsn) {
    throw new Error('Sentry DSN is required')
  }

  validateSampleRates(options)

  const defaultIntegrations = Array.isArray(DEFAULT_OPTIONS.integrations) ? DEFAULT_OPTIONS.integrations : []
  const userIntegrations = Array.isArray(options.integrations) ? options.integrations : []

  init({
    ...DEFAULT_OPTIONS,
    ...options,
    integrations: [...defaultIntegrations, ...userIntegrations],
  })
}
