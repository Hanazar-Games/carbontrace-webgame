import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Brain, Zap, Flame, Trophy, Target, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

function TiltCard({ children, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Features() {
  const { t } = useLanguage()
  const features = [
    { icon: Brain, title: t.features?.feat1Title || 'Knowledge Challenge', description: t.features?.feat1Desc || '15 carefully crafted questions about carbon footprints, climate science, and sustainability.' },
    { icon: Zap, title: t.features?.feat2Title || 'Speed Scoring', description: t.features?.feat2Desc || 'Answer faster to earn time bonuses. Every second counts towards your final score.' },
    { icon: Flame, title: t.features?.feat3Title || 'Combo System', description: t.features?.feat3Desc || 'Build streaks of correct answers for massive combo multipliers. Chain them up!' },
    { icon: Target, title: t.features?.feat4Title || '3 Lives', description: t.features?.feat4Desc || 'Wrong answers cost a life. Strategize carefully and aim for perfection.' },
    { icon: Trophy, title: t.features?.feat5Title || 'Rank System', description: t.features?.feat5Desc || 'Earn grades from D to S. Only true climate masters achieve Planet Guardian rank.' },
    { icon: Sparkles, title: t.features?.feat6Title || 'Visual FX', description: t.features?.feat6Desc || 'Particle explosions, screen shakes, score popups, and smooth transitions.' },
  ]

  return (
    <section id="features" className="px-6 py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[100px]" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.features?.title || 'Game Features'}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-300">{t.features?.subtitle || 'A fully interactive carbon knowledge challenge with maximum polish.'}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-6 mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div key={feature.title} variants={item}>
              <TiltCard className="h-full">
                <div className="relative p-6 h-full border rounded-2xl bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] group overflow-hidden transition-colors duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all group-hover:scale-110">
                    <feature.icon className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{feature.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
