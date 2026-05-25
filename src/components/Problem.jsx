import { motion } from 'framer-motion'
import { Globe, TrendingUp, Users } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import CountUp from './ui/CountUp'

const icons = [Globe, Users, TrendingUp]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' } }),
}

export default function Problem() {
  const { t } = useLanguage()
  const stats = [
    { icon: icons[0], value: 37, suffix: 'B', prefix: '~', label: t.problem.stat1, source: t.problem.source1 },
    { icon: icons[1], value: 4.7, suffix: '', prefix: '~', decimals: 1, label: t.problem.stat2, source: t.problem.source2 },
    { icon: icons[2], value: 1.1, suffix: '°C', prefix: '+', decimals: 1, label: t.problem.stat3, source: t.problem.source3 },
  ]

  return (
    <section id="problem" className="px-6 py-28 bg-slate-950">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.problem.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mt-4 text-lg text-slate-300">{t.problem.subtitle}</motion.p>

        <div className="grid grid-cols-1 gap-6 mt-16 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative p-8 overflow-hidden border rounded-2xl bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="w-10 h-10 mx-auto text-emerald-400" />
              <div className="mt-5 text-5xl font-extrabold text-white tracking-tight">
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </div>
              <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
              <div className="mt-3 text-[10px] text-slate-500 uppercase tracking-wide">{stat.source}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
