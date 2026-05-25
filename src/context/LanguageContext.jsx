import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { getTranslation } from '../lib/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('carbontrace-lang')
      if (saved) return saved
      const browserLang = navigator.language?.split('-')[0]
      const supported = ['en','zh','es','hi','fr','ar','pt','bn','ru','ur','id','de','ja','tr','ko','it','vi','th','pl','nl']
      if (supported.includes(browserLang)) return browserLang
    }
    return 'en'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('carbontrace-lang', lang)
      document.documentElement.lang = lang
      document.documentElement.dir = (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr'
    }
  }, [lang])

  const t = getTranslation(lang)

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
