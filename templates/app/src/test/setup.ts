import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { afterAll, afterEach, beforeAll } from 'vitest'

import en from '@/app/i18n/locales/en.json'
import ko from '@/app/i18n/locales/ko.json'
import { server } from '@/infrastructure/http/mocks/server'

const passthroughUnhandledRequestPaths = new Set(['/api/down'])

beforeAll(() => {
  server.listen({
    onUnhandledRequest(request, print) {
      if (passthroughUnhandledRequestPaths.has(new URL(request.url).pathname)) {
        return
      }

      print.error()
    },
  })
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => {
  server.close()
})

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
    },
    lng: 'ko',
    fallbackLng: 'ko',
    interpolation: { escapeValue: false },
    returnNull: false,
  })
}
