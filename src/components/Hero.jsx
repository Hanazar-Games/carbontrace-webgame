import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-slate-950">
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium border rounded-full bg-emerald-500/10 border-emerald-400/20 text-emerald-300"
        >
          <Leaf className="w-4 h-4" />
          <span>{t.hero.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
        >
          <span className="block">{t.hero.title1}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            {t.hero.title2}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-base leading-relaxed text-slate-400 max-w-lg mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          href="#quiz"
          className="inline-block mt-8 px-8 py-3.5 text-base font-bold text-white rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-shadow"
        >
          {t.hero.cta1 || 'Play Carbon Quiz'}
        </motion.a>
      </div>
    </section>
  )
}
