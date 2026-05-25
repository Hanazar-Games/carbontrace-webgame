import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Leaf, Globe, Check, GitBranch } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { languages } from '../lib/translations'

export default function Navbar({ onOpenVersion }) {
  const { t, lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentLang = languages.find((l) => l.code === lang) || languages[0]

  const links = [
    { label: t.navbar.problem, href: '#problem' },
    { label: t.navbar.features, href: '#features' },
    { label: t.navbar.calculator || 'Quiz', href: '#quiz' },
    { label: t.navbar.impact, href: '#impact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            CarbonTrace
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}

            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-900/60 border border-slate-700 rounded-full hover:border-slate-500 hover:text-white transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag}</span>
                <span className="text-slate-400">{currentLang.code.toUpperCase()}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur-md shadow-2xl py-1.5"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-slate-800 ${
                          lang === l.code ? 'text-emerald-400' : 'text-slate-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.name}</span>
                        </span>
                        {lang === l.code && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={onOpenVersion}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-900/60 border border-slate-700 rounded-full hover:border-slate-500 hover:text-white transition-all"
              title="Changelog"
            >
              <GitBranch className="w-3.5 h-3.5" />
              v1.1.0
            </button>

            <a
              href="#quiz"
              className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-emerald-600 hover:bg-emerald-500 transition-colors"
            >
              {t.navbar.tryDemo || 'Play Now'}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {langOpen && (
        <div className="fixed inset-0 z-40 hidden md:block" onClick={() => setLangOpen(false)} />
      )}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b bg-slate-950/95 backdrop-blur-xl border-slate-800 md:hidden"
          >
            <div className="flex flex-col gap-1 p-6">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="py-3 text-base font-medium text-slate-300 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
              <div className="my-3 border-t border-slate-800" />
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Language</div>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMobileOpen(false) }}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
                      lang === l.code ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setMobileOpen(false); onOpenVersion() }}
                className="flex items-center justify-center gap-2 mt-2 py-3 text-base font-medium text-slate-300 rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-600 transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                Changelog v1.1.0
              </button>
              <a href="#quiz" onClick={() => setMobileOpen(false)} className="mt-3 text-center py-3 text-base font-semibold text-white rounded-full bg-emerald-600 hover:bg-emerald-500 transition-colors">
                {t.navbar.tryDemo || 'Play Now'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
