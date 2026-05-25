import { motion } from 'framer-motion'
import { TreePine, Zap, Wind } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import CountUp from './ui/CountUp'

const icons = [TreePine, TreePine, Zap]
const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

export default function Impact() {
  const { t } = useLanguage()
  const impacts = [
    { icon: Wind, value: 50, suffix: 'K+', prefix: '', label: t.impact.impact1 },
    { icon: TreePine, value: 100, suffix: 'K+', prefix: '', label: t.impact.impact2 },
    { icon: Zap, value: 10, suffix: '+', prefix: '', label: t.impact.impact3 },
  ]

  return (
    <section id="impact" className="px-6 py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px]"
        />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.impact.title}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-300">{t.impact.subtitle}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-6 mt-16 sm:grid-cols-3">
          {impacts.map((impact) => (
            <motion.div key={impact.label} variants={item} whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative p-8 overflow-hidden border rounded-2xl bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <impact.icon className="w-10 h-10 mx-auto text-emerald-400" />
              <div className="mt-5 text-5xl font-extrabold text-white tracking-tight">
                <CountUp end={impact.value} prefix={impact.prefix} suffix={impact.suffix} />
              </div>
              <div className="mt-2 text-sm text-slate-400">{impact.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
