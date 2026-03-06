import { createContext, useContext, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

function getNestedValue(obj, key) {
  return key.split('.').reduce((acc, part) => acc?.[part], obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(
    () => localStorage.getItem('kanazawa-lang') || 'en'
  )

  function setLang(newLang) {
    localStorage.setItem('kanazawa-lang', newLang)
    setLangState(newLang)
  }

  function t(key) {
    const value = getNestedValue(translations[lang], key)
    if (value === undefined) {
      return getNestedValue(translations['en'], key) ?? key
    }
    return value
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
