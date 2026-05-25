import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function Particle({ x, y, color, delay, duration, angle, distance, rot, size, type }) {
  const tx = Math.cos(angle) * distance
  const ty = Math.sin(angle) * distance

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
      animate={{
        x: tx,
        y: ty,
        opacity: [1, 1, 0],
        scale: [1, 1.2, 0.3],
        rotate: rot
      }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
    >
      {type === 'star' ? (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
        </svg>
      ) : type === 'circle' ? (
        <div className="rounded-full" style={{ width: size, height: size, backgroundColor: color }} />
      ) : (
        <div className="rounded-sm" style={{ width: size * 0.6, height: size * 1.5, backgroundColor: color }} />
      )}
    </motion.div>
  )
}

export default function Confetti({ originX, originY, trigger, colors = ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b', '#60a5fa'] }) {
  const [particles, setParticles] = useState([])
  const [visible, setVisible] = useState(false)
  const [lastTrigger, setLastTrigger] = useState(0)

  useEffect(() => {
    if (trigger > 0 && trigger !== lastTrigger) {
      setLastTrigger(trigger)
      const rand = seededRandom(trigger + Math.floor(originX) + Math.floor(originY))
      const newParticles = Array.from({ length: 40 }, (_, i) => {
        const r = rand()
        const typeIdx = Math.floor(r * 3)
        return {
          id: i,
          x: originX,
          y: originY,
          color: colors[Math.floor(r * colors.length)],
          delay: r * 0.15,
          duration: 0.8 + r * 0.4,
          type: ['star', 'circle', 'rect'][typeIdx],
          angle: r * Math.PI * 2,
          distance: 60 + r * 150,
          rot: r * 360 - 180,
          size: typeIdx === 0 ? 6 + r * 6 : 4 + r * 4,
        }
      })
      setParticles(newParticles)
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setParticles([])
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [trigger, lastTrigger, originX, originY, colors])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={trigger}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        >
          {particles.map(p => (
            <Particle key={p.id} {...p} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
