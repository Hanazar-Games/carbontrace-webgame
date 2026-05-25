import { motion, AnimatePresence } from 'framer-motion'

export default function ScreenFlash({ active, color = 'rgba(16,185,129,0.15)' }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 pointer-events-none z-40"
          style={{ backgroundColor: color }}
        />
      )}
    </AnimatePresence>
  )
}
