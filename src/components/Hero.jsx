import { motion } from 'framer-motion'
import { ArrowDown, Leaf } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function FloatingParticle({ delay, size, left, duration }) {
  return (
    <motion.div
      initial={{ y: '110vh', opacity: 0 }}
      animate={{ y: '-10vh', opacity: [0, 0.5, 0.5, 0] }}
      transition={{ duration: duration || 12, repeat: Infinity, delay: delay || 0, ease: 'linear' }}
      className="absolute rounded-full pointer-events-none bg-emerald-400/15 blur-sm"
      style={{ left: `${left}%`, width: size, height: size }}
    />
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const particles = [
    { delay: 0, size: 6, left: 10, duration: 14 },
    { delay: 2, size: 8, left: 25, duration: 16 },
    { delay: 4, size: 4, left: 40, duration: 12 },
    { delay: 1, size: 10, left: 55, duration: 18 },
    { delay: 5, size: 5, left: 70, duration: 13 },
    { delay: 3, size: 7, left: 85, duration: 15 },
    { delay: 6, size: 4, left: 15, duration: 11 },
    { delay: 8, size: 6, left: 90, duration: 14 },
    { delay: 7, size: 5, left: 5, duration: 17 },
    { delay: 9, size: 3, left: 50, duration: 13 },
    { delay: 11, size: 7, left: 75, duration: 15 },
    { delay: 13, size: 4, left: 35, duration: 12 },
  ]

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden text-center bg-slate-950">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/4 w-[700px] h-[700px] rounded-full bg-emerald-500/20 blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/15 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px]"
        />
        {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium border rounded-full backdrop-blur-sm bg-emerald-500/10 border-emerald-400/20 text-emerald-300"
        >
          <Leaf className="w-4 h-4" />
          <span>{t.hero.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl"
        >
          <span className="block">{t.hero.title1}</span>
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            {t.hero.title2}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row"
        >
          <motion.a
            href="#quiz"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(16,185,129,0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 text-base font-bold text-white transition-all rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 bg-[length:200%_100%] hover:bg-right shadow-[0_0_30px_rgba(16,185,129,0.25)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{t.hero.cta1 || 'Play Carbon Quiz'}</span>
            </span>
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-base font-semibold transition-all border rounded-full text-slate-200 border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800 hover:border-slate-500"
          >
            {t.hero.cta2}
          </motion.a>
        </motion.div>
      </div>

      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        href="#problem"
        className="absolute z-10 flex flex-col items-center gap-2 text-sm font-medium transition-colors bottom-10 text-slate-500 hover:text-emerald-400"
      >
        {t.hero.scroll}<ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
