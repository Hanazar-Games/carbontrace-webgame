import { motion } from 'framer-motion'

const expressions = {
  idle: { rotate: 0, scale: 1, y: 0 },
  happy: { rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1], y: [0, -10, 0] },
  sad: { rotate: 0, scale: 0.9, y: 5 },
  think: { rotate: [0, 5, -5, 0], scale: 1, y: 0 },
  excited: { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.15, 1], y: [0, -15, 0, -10, 0] },
  shock: { rotate: 0, scale: 1.2, y: -5 },
  wave: { rotate: [0, -10, 10, -10, 0], scale: 1, y: 0 },
}

const stemPaths = {
  idle: 'M 50 85 Q 50 92 50 95',
  happy: ['M 50 85 Q 50 92 50 95', 'M 50 85 Q 48 92 46 95', 'M 50 85 Q 52 92 54 95', 'M 50 85 Q 50 92 50 95'],
  excited: ['M 50 85 Q 50 92 50 95', 'M 50 85 Q 48 92 46 95', 'M 50 85 Q 52 92 54 95', 'M 50 85 Q 50 92 50 95'],
  sad: 'M 50 85 Q 50 92 50 95',
  think: 'M 50 85 Q 50 92 50 95',
  shock: 'M 50 85 Q 50 92 50 95',
  wave: ['M 50 85 Q 50 92 50 95', 'M 50 85 Q 48 92 46 95', 'M 50 85 Q 52 92 54 95', 'M 50 85 Q 50 92 50 95'],
}

export default function Mascot({ mood = 'idle', size = 80 }) {
  const eyeVariant = {
    idle: { ry: 4 },
    happy: { ry: 1, rx: 5 },
    sad: { ry: 3, rx: 3 },
    think: { ry: 4, rx: 4 },
    excited: { ry: 5, rx: 5 },
    shock: { ry: 6, rx: 6 },
    wave: { ry: 4, rx: 4 },
  }

  const mouthPath = {
    idle: 'M 35 55 Q 50 60 65 55',
    happy: 'M 35 52 Q 50 68 65 52',
    sad: 'M 38 62 Q 50 55 62 62',
    think: 'M 45 58 Q 50 55 55 58',
    excited: 'M 38 50 Q 50 70 62 50',
    shock: 'M 45 55 Q 50 65 55 55 Q 50 45 45 55',
    wave: 'M 35 55 Q 50 60 65 55',
  }

  const cheekOpacity = {
    idle: 0.2,
    happy: 0.4,
    sad: 0,
    think: 0.15,
    excited: 0.5,
    shock: 0.1,
    wave: 0.2,
  }

  const isAnimatedStem = mood === 'happy' || mood === 'excited' || mood === 'wave'
  const stemTarget = stemPaths[mood]

  return (
    <motion.div
      animate={expressions[mood]}
      transition={{ duration: mood === 'excited' ? 0.4 : 0.6, repeat: mood === 'happy' || mood === 'excited' || mood === 'wave' ? Infinity : 0, repeatType: 'reverse' }}
      style={{ width: size, height: size }}
      className="relative"
    >
      <svg viewBox="0 0 100 100" width={size} height={size} className="drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
        <defs>
          <linearGradient id={`leafGrad-${mood}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Stem */}
        <motion.path
          d="M 50 85 Q 50 92 50 95"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={isAnimatedStem ? { d: stemTarget } : { d: 'M 50 85 Q 50 92 50 95' }}
          transition={{ duration: 0.5, repeat: isAnimatedStem ? Infinity : 0 }}
        />

        {/* Main leaf shape */}
        <motion.path
          d="M 50 85 Q 20 60 20 40 Q 20 15 50 10 Q 80 15 80 40 Q 80 60 50 85"
          fill={`url(#leafGrad-${mood})`}
          stroke="#059669"
          strokeWidth="2"
          animate={mood === 'sad' ? { d: 'M 50 85 Q 25 65 25 45 Q 25 20 50 15 Q 75 20 75 45 Q 75 65 50 85' } : { d: 'M 50 85 Q 20 60 20 40 Q 20 15 50 10 Q 80 15 80 40 Q 80 60 50 85' }}
          transition={{ duration: 0.3 }}
        />

        {/* Vein */}
        <path d="M 50 20 Q 50 50 50 80" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M 50 35 Q 35 30 28 38" stroke="#059669" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M 50 45 Q 65 40 72 48" stroke="#059669" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M 50 55 Q 35 52 30 58" stroke="#059669" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M 50 65 Q 65 62 70 68" stroke="#059669" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />

        {/* Left eye */}
        <motion.ellipse cx="38" cy="42" rx="4" animate={eyeVariant[mood]} transition={{ duration: 0.2 }} fill="#064e3b" />
        {/* Right eye */}
        <motion.ellipse cx="62" cy="42" rx="4" animate={eyeVariant[mood]} transition={{ duration: 0.2 }} fill="#064e3b" />

        {/* Eye shine */}
        {mood !== 'shock' && (
          <>
            <circle cx="36" cy="40" r="1.5" fill="white" opacity="0.8" />
            <circle cx="60" cy="40" r="1.5" fill="white" opacity="0.8" />
          </>
        )}

        {/* Mouth */}
        <motion.path d={mouthPath[mood]} stroke="#064e3b" strokeWidth="2.5" strokeLinecap="round" fill="none"
          animate={{ d: mouthPath[mood] }} transition={{ duration: 0.2 }} />

        {/* Cheeks */}
        <circle cx="30" cy="52" r="5" fill="#f472b6" opacity={cheekOpacity[mood]} />
        <circle cx="70" cy="52" r="5" fill="#f472b6" opacity={cheekOpacity[mood]} />

        {/* Sweat drop for shock */}
        {mood === 'shock' && (
          <motion.path initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 5 }}
            d="M 72 35 Q 72 30 75 30 Q 78 30 78 35 Q 78 40 75 40 Q 72 40 72 35" fill="#60a5fa" />
        )}
      </svg>
    </motion.div>
  )
}
