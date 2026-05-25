import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, GitBranch, Clock, Sparkles, Layers, Globe, Zap, BarChart3, Gamepad2, Trophy, Palette, Music } from 'lucide-react'

const versions = [
  {
    version: '1.1.0',
    date: '2026-05-25',
    current: true,
    changes: [
      { icon: Gamepad2, text: 'Carbon Quiz Game — 30 bilingual questions across 5 categories with difficulty levels' },
      { icon: Trophy, text: 'Achievement system with 6 unlockable badges + high score leaderboard (per difficulty)' },
      { icon: Sparkles, text: 'Mascot "Leafy" — animated SVG companion with 7 expressions reacting to gameplay' },
      { icon: Zap, text: 'Difficulty selector: Easy (8Q/20s), Medium (10Q/15s), Hard (15Q/10s)' },
      { icon: Music, text: 'SFX system: correct/wrong/combo/gameover sounds via Web Audio API' },
      { icon: Palette, text: 'Maximized UI/UX: particle backgrounds, screen flash, confetti, 3D card tilt, glow cursor' },
    ],
  },
  {
    version: '1.0.2',
    date: '2026-04-17',
    current: false,
    changes: [
      { icon: Globe, text: 'Added 20-language i18n support with real-time switching' },
      { icon: BarChart3, text: 'Added IPCC / Global Carbon Project citations to Problem stats' },
      { icon: Layers, text: 'Rewrote Impact section as projected forward-looking estimates' },
      { icon: Zap, text: 'UI/UX polish: floating particles, animated numbers, custom sliders' },
    ],
  },
  {
    version: '1.0.1',
    date: '2026-04-17',
    current: false,
    changes: [
      { icon: Sparkles, text: 'Full UI/UX overhaul with Framer Motion animations' },
      { icon: Layers, text: 'Added interactive Carbon Calculator with live gauge' },
      { icon: Zap, text: 'Added animated number counter on result card' },
      { icon: Clock, text: 'Added CTA waitlist section with email subscription' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-04-17',
    current: false,
    changes: [
      { icon: Layers, text: 'Initial multi-section layout: Hero, Problem, Features, Calculator, Impact, Footer' },
      { icon: Zap, text: 'Added custom-styled range sliders in Calculator' },
      { icon: Globe, text: 'Built with Vite + React + Tailwind CSS' },
    ],
  },
]

export default function VersionModal({ isOpen, onClose }) {
  const [expanded, setExpanded] = useState('1.1.0')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-[10vh] z-[70] mx-auto max-w-lg max-h-[80vh] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Changelog</h3>
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 rounded-full border border-emerald-500/20">v1.1.0</span>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="overflow-y-auto max-h-[calc(80vh-64px)] px-6 py-4 space-y-3">
              {versions.map((v) => (
                <div key={v.version} className={`rounded-xl border transition-all ${v.current ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 bg-slate-900/40'}`}>
                  <button onClick={() => setExpanded(expanded === v.version ? '' : v.version)} className="w-full flex items-center justify-between px-4 py-3 text-left">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${v.current ? 'text-emerald-400' : 'text-white'}`}>v{v.version}</span>
                      {v.current && <span className="px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 rounded border border-emerald-500/20">Current</span>}
                    </div>
                    <span className="text-xs text-slate-500">{v.date}</span>
                  </button>
                  <AnimatePresence>
                    {expanded === v.version && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="px-4 pb-4 space-y-2">
                          {v.changes.map((c, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <c.icon className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                              <span className="text-sm text-slate-300">{c.text}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
