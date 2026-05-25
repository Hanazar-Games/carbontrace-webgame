import { motion } from 'framer-motion'
import { Mail, Globe, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { worksCited } from '../lib/quizData'

export default function Footer() {
  const { t, lang } = useLanguage()
  return (
    <footer className="px-6 py-16 border-t bg-slate-950 border-slate-900">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-white">CarbonTrace</div>
            <p className="mt-2 text-sm text-slate-400">{t.footer.tagline}</p>
          </div>
          <div className="flex gap-3">
            {[{ icon: Globe, label: 'Website' }, { icon: MessageCircle, label: 'Social' }, { icon: Mail, label: 'Email', href: 'mailto:hello@carbontrace.io' }].map((link) => (
              <a key={link.label} href={link.href || '#'}
                className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-all active:scale-95"
                aria-label={link.label}><link.icon className="w-5 h-5" /></a>
            ))}
          </div>
        </motion.div>

        {/* Works Cited */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 pt-6 border-t border-slate-900/50">
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2 text-center">
            {lang === 'zh' ? '参考文献' : 'Works Cited'}
          </div>
          <ul className="space-y-1 text-center">
            {worksCited.map((c, i) => (
              <li key={i} className="text-[9px] text-slate-600 leading-relaxed">
                [{i + 1}] {c}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} CarbonTrace. {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
