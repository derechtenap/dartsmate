import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: process.env.NODE_ENV === 'development',
    defaultNS: 'common',
    ns: 'common',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // Not needed for react as it escapes by default
    },
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json'
    }
  })

export default i18n

export const locales = ['de', 'en']
