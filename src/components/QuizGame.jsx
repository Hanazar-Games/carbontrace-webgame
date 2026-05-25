import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, RotateCcw, Heart, Zap, Timer, Trophy,
  Flame, Volume2, VolumeX, ChevronRight, Star, Sparkles, Skull,
  PartyPopper, Leaf, TreePine
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useSound } from '../context/SoundContext'
import { getQuizQuestions, getGradeInfo, worksCited, categories, failMemes, getTreeStage, CO2_PER_CORRECT, getKnowledgeLevel } from '../lib/quizData'
import Confetti from './ui/Confetti'
import ScreenFlash from './ui/ScreenFlash'
import ParticleBackground from './ui/ParticleBackground'
import Mascot from './ui/Mascot'

const MAX_LIVES = 3
const TOTAL_QUESTIONS = 15
const TIME_PER_QUESTION = 15

function Lives({ lives, maxLives }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: maxLives }).map((_, i) => (
        <div key={i}>
          {i < lives ? (
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          ) : (
            <Heart className="w-5 h-5 text-slate-700" />
          )}
        </div>
      ))}
    </div>
  )
}

function ComboDisplay({ combo }) {
  return (
    <AnimatePresence mode="wait">
      {combo >= 3 && (
        <motion.div
          key={combo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40"
        >
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-black text-orange-300 tracking-wider">x{combo}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ScorePopup({ value, x, y }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -80, scale: 1.5 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y }}
    >
      <div className="relative">
        <span className="text-3xl font-black text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">
          +{value}
        </span>
        <motion.div
          className="absolute inset-0 bg-emerald-400/30 blur-xl rounded-full"
          animate={{ scale: [1, 2, 2.5], opacity: [0.6, 0.3, 0] }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  )
}

function CarbonPopup({ kg, x, y }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -60, scale: 1.2 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y }}
    >
      <div className="flex items-center gap-1.5 bg-emerald-900/90 border border-emerald-500/40 px-3 py-1.5 rounded-full shadow-lg">
        <Leaf className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-black text-emerald-300">
          -{kg} kg CO₂
        </span>
      </div>
    </motion.div>
  )
}

function TimerBar({ timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100
  const isDanger = timeLeft <= 5
  return (
    <div className="flex items-center gap-3">
      <div>
        <Timer className={`w-5 h-5 ${isDanger ? 'text-rose-400' : 'text-slate-400'}`} />
      </div>
      <div className="flex-1 h-2.5 rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/50">
        <motion.div
          className={`h-full rounded-full ${isDanger ? 'bg-gradient-to-r from-rose-500 to-orange-500' : 'bg-gradient-to-r from-emerald-400 to-teal-300'}`}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
          style={isDanger ? { boxShadow: '0 0 12px rgba(244,63,94,0.5)' } : {}}
        />
      </div>
      <span
        className={`text-sm font-mono font-bold w-10 text-right ${isDanger ? 'text-rose-400' : 'text-slate-300'}`}
      >
        {timeLeft}s
      </span>
    </div>
  )
}

function FailMemeOverlay({ meme, lang, onDismiss }) {
  if (!meme) return null
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onDismiss()
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotate: 3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onDismiss}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={lang === 'zh' ? '点击关闭' : 'Tap to dismiss'}
      className="absolute inset-0 z-50 rounded-2xl overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
    >
      <div className="absolute inset-0">
        <img src={meme.bg} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between items-center p-6 sm:p-8">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
          className="text-center mt-2"
        >
          <h2
            className="text-3xl sm:text-4xl font-black text-white uppercase leading-tight"
            style={{ textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 20px rgba(0,0,0,0.8)' }}
          >
            {meme.top}
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 250, damping: 15 }}
        >
          <Mascot mood={meme.mascot} size={80} />
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
          className="text-center mb-2"
        >
          <p
            className="text-xl sm:text-2xl font-black text-white uppercase leading-tight"
            style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 15px rgba(0,0,0,0.8)' }}
          >
            {meme.bottom}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-4 text-xs text-white/60 font-medium tracking-wide"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
        >
          {lang === 'zh' ? '点击任意处继续 👇' : 'Tap anywhere to continue 👇'}
        </motion.p>
      </div>
    </motion.div>
  )
}

function StarRating({ difficulty }) {
  return (
    <span className="inline-flex gap-0.5 ml-1.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-xs ${i <= difficulty ? 'text-amber-400' : 'text-slate-700'}`}>★</span>
      ))}
    </span>
  )
}

function TreeStageCard({ stage, carbonSaved, totalCarbonSaved, treesEquivalent, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-teal-900/20 border border-emerald-500/20 text-center"
    >
      <div className="text-6xl mb-3">{stage.icon}</div>
      <div className="text-xl font-black text-emerald-300">{stage.name}</div>
      <div className="text-sm text-emerald-400/70 mt-1">{stage.desc}</div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-xs text-slate-500 mb-1">{lang === 'zh' ? '本次减排' : 'CO₂ Saved'}</div>
          <div className="text-lg font-black text-emerald-400">{carbonSaved} kg</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="text-xs text-slate-500 mb-1">{lang === 'zh' ? '累计减排' : 'Total Saved'}</div>
          <div className="text-lg font-black text-teal-400">{totalCarbonSaved} kg</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
        <TreePine className="w-3.5 h-3.5 text-emerald-500" />
        {lang === 'zh'
          ? `相当于种植了 ${treesEquivalent} 棵树`
          : `Equivalent to planting ${treesEquivalent} trees`}
      </div>
    </motion.div>
  )
}

function KnowledgeLevelBar({ levelInfo, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="mt-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold text-slate-300">
            {lang === 'zh' ? '知识等级' : 'Knowledge Level'}
          </span>
        </div>
        <span className="text-sm font-black text-amber-400">{levelInfo.current.name}</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
          initial={{ width: 0 }}
          animate={{ width: `${levelInfo.progressToNext}%` }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-slate-500">{levelInfo.current.desc}</span>
        {levelInfo.next ? (
          <span className="text-[10px] text-slate-500">
            {levelInfo.totalCorrect} / {levelInfo.next.min} → {levelInfo.next.name}
          </span>
        ) : (
          <span className="text-[10px] text-amber-400 font-medium">
            {lang === 'zh' ? '最高等级！' : 'Max Level!'}
          </span>
        )}
      </div>
    </motion.div>
  )
}

// Fisher-Yates shuffle
function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function QuizGame() {
  const { t, lang } = useLanguage()
  const sound = useSound()

  // Game state
  const [gameState, setGameState] = useState('start')
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(MAX_LIVES)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const timeLeftRef = useRef(TIME_PER_QUESTION)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const isRevealedRef = useRef(false)
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0, trigger: 0 })
  const [resultConfettiTrigger, setResultConfettiTrigger] = useState(0)
  const [scorePopup, setScorePopup] = useState(null)
  const [carbonPopup, setCarbonPopup] = useState(null)
  const [shake, setShake] = useState(false)
  const [flash, setFlash] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [mascotMood, setMascotMood] = useState('wave')
  const [feedbackText, setFeedbackText] = useState('')
  const [showFailMeme, setShowFailMeme] = useState(false)
  const [currentFailMeme, setCurrentFailMeme] = useState(null)
  const [carbonSaved, setCarbonSaved] = useState(0)
  const [resultStats, setResultStats] = useState({ co2: 0, correct: 0 })
  const questionStartTime = useRef(null)
  const timerIntervalRef = useRef(null)
  const timeoutRefs = useRef([])

  // High scores from localStorage
  const [highScores, setHighScores] = useState(() => {
    if (typeof window === 'undefined') return {}
    try {
      return JSON.parse(localStorage.getItem('carbontrace-highscores') || '{}')
    } catch { return {} }
  })
  const [totalCarbonSavedAllTime, setTotalCarbonSavedAllTime] = useState(() => {
    if (typeof window === 'undefined') return 0
    try {
      return parseInt(localStorage.getItem('carbontrace-total-co2') || '0', 10)
    } catch { return 0 }
  })
  const [totalCorrectAllTime, setTotalCorrectAllTime] = useState(() => {
    if (typeof window === 'undefined') return 0
    try {
      return parseInt(localStorage.getItem('carbontrace-total-correct') || '0', 10)
    } catch { return 0 }
  })

  const allQuestions = useMemo(() => getQuizQuestions(lang), [lang])

  const startGame = useCallback(() => {
    sound.playStart()
    const shuffled = shuffleArray(allQuestions)
    setQuestions(shuffled)
    setCurrentQ(0)
    setScore(0)
    setLives(MAX_LIVES)
    setCombo(0)
    setMaxCombo(0)
    setTimeLeft(TIME_PER_QUESTION)
    timeLeftRef.current = TIME_PER_QUESTION
    setSelectedOption(null)
    setIsRevealed(false)
    isRevealedRef.current = false
    setCorrectCount(0)
    setQuestionsAnswered(0)
    setMascotMood('think')
    setFeedbackText('')
    setCarbonSaved(0)
    setShowFailMeme(false)
    setCurrentFailMeme(null)
    setResultStats({ co2: 0, correct: 0 })
    questionStartTime.current = Date.now()
    setGameState('playing')
  }, [allQuestions, sound])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(id => clearTimeout(id))
      timeoutRefs.current = []
    }
  }, [])

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || isRevealed) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
      return
    }

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1
        timeLeftRef.current = next
        if (next <= 0) {
          return 0
        }
        if (next <= 5) sound.playTick()
        return next
      })
    }, 1000)

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
    }
  }, [gameState, isRevealed, sound])

  // Handle time out
  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing' && !isRevealedRef.current) {
      isRevealedRef.current = true
      setSelectedOption(-1)
      setIsRevealed(true)
      setQuestionsAnswered(prev => prev + 1)
      setCombo(0)
      setMascotMood('sad')
      setFeedbackText(lang === 'zh' ? '时间到！⏰' : 'Time\'s up! ⏰')

      const newLives = lives - 1
      setLives(newLives)
      if (newLives <= 0) {
        sound.playGameOver()
        setMascotMood('shock')
      } else {
        sound.playWrong()
      }

      setShake(true)
      const t1 = setTimeout(() => setShake(false), 500)
      timeoutRefs.current.push(t1)

      const memes = failMemes[lang] || failMemes['en']
      setCurrentFailMeme(memes[Math.floor(Math.random() * memes.length)])
      setShowFailMeme(true)
    }
  }, [timeLeft, gameState, lives, sound, lang])

  const handleAnswer = useCallback((optionIndex, event) => {
    if (isRevealedRef.current) return
    isRevealedRef.current = true

    setSelectedOption(optionIndex)
    setIsRevealed(true)
    setQuestionsAnswered(prev => prev + 1)

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }

    const q = questions[currentQ]
    if (!q) return
    const isCorrect = optionIndex === q.correct

    if (isCorrect) {
      const newCombo = combo + 1
      setCombo(newCombo)
      if (newCombo > maxCombo) setMaxCombo(newCombo)

      const currentTimeLeft = timeLeftRef.current
      const timeBonus = Math.round((currentTimeLeft / TIME_PER_QUESTION) * 50)
      const comboBonus = newCombo >= 3 ? (newCombo - 2) * 20 : 0
      const basePoints = 100
      const points = basePoints + timeBonus + comboBonus

      setScore(s => s + points)
      setCorrectCount(c => c + 1)
      setCarbonSaved(c => c + CO2_PER_CORRECT)
      sound.playCorrect()
      if (newCombo >= 3) sound.playCombo(newCombo)

      setFlash(true)
      const t2 = setTimeout(() => setFlash(false), 150)
      timeoutRefs.current.push(t2)

      setMascotMood(newCombo >= 5 ? 'excited' : 'happy')

      const fb = lang === 'zh'
        ? ['正确！🎉', '太棒了！✨', '连连看！🔥', '不可思议！🌟', '大师级！🏆']
        : ['Correct! 🎉', 'Nice! ✨', 'On fire! 🔥', 'Amazing! 🌟', 'Legendary! 🏆']
      setFeedbackText(fb[Math.min(newCombo - 1, fb.length - 1)])

      const rect = event?.currentTarget?.getBoundingClientRect()
      if (rect) {
        setScorePopup({ value: points, x: rect.left + rect.width / 2, y: rect.top })
        const t3 = setTimeout(() => setScorePopup(null), 1000)
        timeoutRefs.current.push(t3)

        setCarbonPopup({ kg: CO2_PER_CORRECT, x: rect.left + rect.width / 2, y: rect.top - 30 })
        const t4 = setTimeout(() => setCarbonPopup(null), 1200)
        timeoutRefs.current.push(t4)

        setConfettiOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, trigger: Date.now() })
      }
    } else {
      setCombo(0)
      setMascotMood('sad')
      const fbWrong = lang === 'zh'
        ? ['哎呀，不对 😅', '再想想 🤔', '加油！💪', '别灰心 🍀']
        : ['Oops, not quite 😅', 'Think again 🤔', 'Keep going! 💪', 'Don\'t give up 🍀']
      setFeedbackText(fbWrong[Math.floor(Math.random() * fbWrong.length)])

      const newLives = lives - 1
      setLives(newLives)
      if (newLives <= 0) {
        setMascotMood('shock')
      } else {
        sound.playWrong()
      }

      setShake(true)
      const t5 = setTimeout(() => setShake(false), 500)
      timeoutRefs.current.push(t5)

      const memes = failMemes[lang] || failMemes['en']
      setCurrentFailMeme(memes[Math.floor(Math.random() * memes.length)])
      setShowFailMeme(true)
    }
  }, [questions, currentQ, combo, maxCombo, lives, sound, lang])

  const saveGameStats = useCallback(() => {
    const finalScore = score
    const key = `${lang}`
    const prevHigh = highScores[key] || 0
    const isNewHigh = finalScore > prevHigh
    if (isNewHigh) {
      const newHighs = { ...highScores, [key]: finalScore }
      setHighScores(newHighs)
      if (typeof window !== 'undefined') {
        localStorage.setItem('carbontrace-highscores', JSON.stringify(newHighs))
      }
    }

    const newTotalCO2 = totalCarbonSavedAllTime + carbonSaved
    const newTotalCorrect = totalCorrectAllTime + correctCount
    setTotalCarbonSavedAllTime(newTotalCO2)
    setTotalCorrectAllTime(newTotalCorrect)
    if (typeof window !== 'undefined') {
      localStorage.setItem('carbontrace-total-co2', String(newTotalCO2))
      localStorage.setItem('carbontrace-total-correct', String(newTotalCorrect))
    }
    setResultStats({ co2: newTotalCO2, correct: newTotalCorrect })
  }, [score, lang, highScores, carbonSaved, totalCarbonSavedAllTime, correctCount, totalCorrectAllTime])

  const nextQuestion = useCallback(() => {
    if (lives <= 0) {
      saveGameStats()
      setGameState('result')
      sound.playGameOver()
      setMascotMood('sad')
      return
    }

    if (currentQ + 1 >= TOTAL_QUESTIONS) {
      saveGameStats()
      setGameState('result')
      sound.playWin()
      setMascotMood('happy')
      return
    }

    setCurrentQ(c => c + 1)
    setSelectedOption(null)
    setIsRevealed(false)
    isRevealedRef.current = false
    setShowFailMeme(false)
    setCurrentFailMeme(null)
    setTimeLeft(TIME_PER_QUESTION)
    timeLeftRef.current = TIME_PER_QUESTION
    setMascotMood('think')
    setFeedbackText('')
    questionStartTime.current = Date.now()
  }, [currentQ, lives, sound, saveGameStats])

  useEffect(() => {
    if (gameState === 'result') {
      setResultConfettiTrigger(Date.now())
    }
  }, [gameState])

  const progress = ((currentQ + 1) / TOTAL_QUESTIONS) * 100
  const accuracy = questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0
  const grade = useMemo(() => getGradeInfo(accuracy, lang), [accuracy, lang])
  const isWin = lives > 0 && currentQ + 1 >= TOTAL_QUESTIONS
  const q = questions[currentQ]
  const treeStage = useMemo(() => getTreeStage(score, lang), [score, lang])
  const resultTotalCO2 = resultStats.co2
  const resultTotalCorrect = resultStats.correct
  const knowledgeInfo = useMemo(() => getKnowledgeLevel(resultTotalCorrect, lang), [resultTotalCorrect, lang])
  const treesEquivalent = Math.max(1, Math.round(resultTotalCO2 / 22))

  // ---- START SCREEN ----
  if (gameState === 'start') {
    const prevHigh = highScores[`${lang}`] || 0
    const prevStage = getTreeStage(prevHigh, lang)
    const prevTrees = Math.max(1, Math.round(totalCarbonSavedAllTime / 22))

    return (
      <section id="quiz" className="px-6 py-28 bg-slate-950 relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute top-1/3 -right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[100px]" />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl mb-4"
            >
              {prevStage.icon}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-black tracking-tight text-white sm:text-5xl"
            >
              {t.quiz?.title || 'Carbon Quiz Challenge'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="max-w-xl mx-auto mt-4 text-lg text-slate-300 leading-relaxed"
            >
              {t.quiz?.subtitle || 'Test your carbon knowledge. Score points, build combos, and become a Planet Guardian!'}
            </motion.p>

            {prevHigh > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-400"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  {lang === 'zh' ? `最高分: ${prevHigh}` : `Best: ${prevHigh}`}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50">
                  <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'zh' ? `${prevTrees} 棵树` : `${prevTrees} trees`}
                </span>
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              onClick={() => { sound.playClick(); startGame() }}
              className="mt-8 inline-flex items-center gap-3 px-12 py-5 text-xl font-black text-white rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 bg-[length:200%_100%] hover:bg-right transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              <Play className="w-7 h-7 fill-white" />
              {t.quiz?.startBtn || 'Start Quiz'}
            </motion.button>
          </motion.div>
        </div>
      </section>
    )
  }

  // ---- RESULT SCREEN ----
  if (gameState === 'result') {
    const key = `${lang}`
    const prevHigh = highScores[key] || 0
    const isNewHigh = score > 0 && score > prevHigh

    return (
      <section id="quiz" className="px-6 py-28 bg-slate-950 relative overflow-hidden min-h-screen flex items-center">
        {isWin && <Confetti originX={typeof window !== 'undefined' ? window.innerWidth / 2 : 0} originY={typeof window !== 'undefined' ? window.innerHeight / 3 : 0} trigger={resultConfettiTrigger} />}
        <ParticleBackground color={isWin ? '#10b981' : '#f43f5e'} density={35} speed={0.15} />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r ${grade.bg} blur-[150px]`} />
        </div>

        <div className="max-w-xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center mb-4">
              <Mascot mood={isWin ? (accuracy >= 90 ? 'excited' : 'happy') : 'sad'} size={90} />
            </div>

            <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-slate-900/80 border-2 border-slate-700 mb-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <span className={`text-6xl font-black ${grade.color} drop-shadow-[0_0_20px_currentColor]`}>
                {isWin ? grade.grade : <Skull className="w-14 h-14 text-rose-400" />}
              </span>
            </div>

            <h2 className={`text-4xl font-black ${isWin ? grade.color : 'text-rose-400'}`}>
              {isWin ? grade.title : (t.quiz?.gameOver || 'Game Over!')}
            </h2>
            <p className="mt-3 text-slate-300 text-lg">
              {isWin ? grade.desc : (t.quiz?.outOfLives || 'You ran out of lives.')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: t.quiz?.scoreLabel || 'Score', value: score, icon: Star, color: 'text-amber-400' },
                { label: t.quiz?.accuracyLabel || 'Accuracy', value: `${accuracy}%`, icon: Trophy, color: 'text-emerald-400' },
                { label: t.quiz?.maxComboLabel || 'Max Combo', value: `x${maxCombo}`, icon: Flame, color: 'text-orange-400' },
                { label: t.quiz?.correctLabel || 'Correct', value: `${correctCount}/${questionsAnswered}`, icon: Zap, color: 'text-cyan-400' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-center backdrop-blur-sm"
                >
                  <item.icon className={`w-6 h-6 mx-auto ${item.color} mb-2`} />
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Carbon Seedling Stage */}
            <TreeStageCard
              stage={treeStage}
              carbonSaved={carbonSaved}
              totalCarbonSaved={resultTotalCO2}
              treesEquivalent={treesEquivalent}
              lang={lang}
            />

            {/* Knowledge Level */}
            <KnowledgeLevelBar levelInfo={knowledgeInfo} lang={lang} />

            {/* New high score */}
            {isNewHigh && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold"
              >
                <PartyPopper className="w-4 h-4" />
                {lang === 'zh' ? '新纪录！' : 'New High Score!'}
              </motion.div>
            )}

            {/* Works Cited */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-6 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 text-left"
            >
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                {lang === 'zh' ? '参考文献' : 'Works Cited'}
              </div>
              <ul className="space-y-1">
                {worksCited.map((citation, i) => (
                  <li key={i} className="text-[10px] text-slate-500 leading-relaxed">
                    [{i + 1}] {citation}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              onClick={() => { sound.playClick(); setGameState('start') }}
              className="mt-8 inline-flex items-center gap-3 px-10 py-4 text-lg font-black text-white rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-shadow"
            >
              <RotateCcw className="w-6 h-6" />
              {t.quiz?.retryBtn || 'Play Again'}
            </motion.button>
          </motion.div>
        </div>
      </section>
    )
  }

  // ---- PLAYING SCREEN ----
  return (
    <section id="quiz" className="px-6 py-16 bg-slate-950 min-h-screen relative overflow-hidden">
      <ParticleBackground color="#10b981" density={30} speed={0.15} />
      <ScreenFlash active={flash} color="rgba(16,185,129,0.12)" />
      <Confetti originX={confettiOrigin.x} originY={confettiOrigin.y} trigger={confettiOrigin.trigger} />
      {scorePopup && <ScorePopup {...scorePopup} />}
      {carbonPopup && <CarbonPopup {...carbonPopup} />}

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <Lives lives={lives} maxLives={MAX_LIVES} />
            <ComboDisplay combo={combo} />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-amber-400 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700/50">
              <Star className="w-5 h-5 fill-amber-400" />
              <span className="font-black text-xl tabular-nums">{score}</span>
            </div>
            <button
              onClick={() => { sound.setMuted(!sound.muted); sound.playClick() }}
              aria-label={sound.muted ? (lang === 'zh' ? '开启音效' : 'Unmute') : (lang === 'zh' ? '静音' : 'Mute')}
              aria-pressed={sound.muted}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            >
              {sound.muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Carbon saved mini badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
            <Leaf className="w-3 h-3" />
            {lang === 'zh' ? `已减排 ${carbonSaved} kg CO₂` : `${carbonSaved} kg CO₂ saved`}
          </span>
          {combo >= 3 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-900/30 border border-orange-500/20 text-xs text-orange-400 font-medium">
              {treeStage.icon} {treeStage.name}
            </span>
          )}
        </motion.div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
            <span className="flex items-center">
              {t.quiz?.questionLabel || 'Question'} {currentQ + 1}/{TOTAL_QUESTIONS}
              {q?.difficulty !== undefined && <StarRating difficulty={q.difficulty} />}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div
            className="h-2.5 w-full rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/30"
            role="progressbar"
            aria-valuenow={currentQ + 1}
            aria-valuemin={0}
            aria-valuemax={TOTAL_QUESTIONS}
            aria-label={lang === 'zh' ? '答题进度' : 'Quiz progress'}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <TimerBar timeLeft={timeLeft} maxTime={TIME_PER_QUESTION} />
        </div>

        {/* Mascot + Feedback */}
        <div className="flex items-center gap-4 mb-4">
          <Mascot mood={mascotMood} size={60} />
          <div aria-live="polite" aria-atomic="true" className="min-h-[2.5rem]">
            <AnimatePresence mode="wait">
              {feedbackText && (
                <motion.div
                  key={feedbackText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold ${
                    mascotMood === 'happy' || mascotMood === 'excited'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                      : mascotMood === 'sad' || mascotMood === 'shock'
                      ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                      : 'bg-slate-800/50 border border-slate-700 text-slate-300'
                  }`}
                >
                  {feedbackText}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative p-6 sm:p-8 rounded-2xl border bg-slate-900/60 backdrop-blur-sm border-slate-700/50 shadow-[0_0_60px_rgba(0,0,0,0.3)] ${shake ? 'animate-shake' : ''}`}
          >
            {/* Fail Meme Overlay */}
            <AnimatePresence>
              {showFailMeme && currentFailMeme && (
                <FailMemeOverlay meme={currentFailMeme} lang={lang} onDismiss={() => setShowFailMeme(false)} />
              )}
            </AnimatePresence>

            {/* Category badge */}
            {q?.category && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/50 text-xs text-slate-400 font-medium">
                  {(categories[lang] || categories['en'])[q.category] || q.category}
                </span>
              </div>
            )}

            {/* Question image */}
            {q?.image && (
              <div className="mb-5 rounded-xl overflow-hidden border border-slate-700/40 shadow-lg">
                <img
                  src={q.image}
                  alt=""
                  className="w-full h-44 sm:h-52 object-cover"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
            )}

            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {q?.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q?.options.map((option, i) => {
                let btnClass = 'border-slate-700/60 bg-slate-900/40 hover:border-emerald-500/40 hover:bg-slate-800/60'
                if (isRevealed) {
                  if (i === q.correct) btnClass = 'border-emerald-500/60 bg-emerald-500/10'
                  else if (i === selectedOption && i !== q.correct) btnClass = 'border-rose-500/60 bg-rose-500/10'
                  else btnClass = 'border-slate-800/60 bg-slate-900/20 opacity-40'
                } else if (selectedOption === i) {
                  btnClass = 'border-emerald-500/60 bg-emerald-500/10'
                }

                return (
                  <button
                    key={i}
                    onClick={(e) => handleAnswer(i, e)}
                    disabled={isRevealed}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${btnClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black transition-all
                        ${isRevealed && i === q.correct ? 'bg-emerald-500 text-white' :
                          isRevealed && i === selectedOption && i !== q.correct ? 'bg-rose-500 text-white' :
                          selectedOption === i ? 'bg-emerald-500/30 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className={`text-sm sm:text-base font-medium ${
                        isRevealed && i === q.correct ? 'text-emerald-300' :
                        isRevealed && i === selectedOption && i !== q.correct ? 'text-rose-300' : 'text-slate-200'
                      }`}>{option}</span>
                      {isRevealed && i === q.correct && (
                        <span className="ml-auto">
                          <Sparkles className="w-5 h-5 text-emerald-400" />
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Citation */}
            {q?.citation && (
              <div className="mt-4 text-[10px] text-slate-600 italic leading-relaxed border-t border-slate-800/50 pt-3">
                <span className="font-medium text-slate-500 not-italic">{lang === 'zh' ? '来源：' : 'Source: '}</span>
                {q.citation}
              </div>
            )}

            {/* Explanation */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 p-5 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-800/30 border border-emerald-500/10"
                >
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="text-emerald-400 font-bold">{t.quiz?.didYouKnow || 'Did you know?'} </span>
                    {q?.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mt-5 flex justify-end"
                >
                  <button
                    onClick={() => { sound.playClick(); nextQuestion() }}
                    className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-shadow"
                  >
                    {currentQ + 1 >= TOTAL_QUESTIONS || lives <= 0
                      ? (t.quiz?.seeResults || 'See Results')
                      : (t.quiz?.nextBtn || 'Next')}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {lives <= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 p-5 rounded-xl bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/30 text-center backdrop-blur-sm"
          >
            <Skull className="w-8 h-8 mx-auto text-rose-400 mb-2" />
            <p className="text-rose-300 font-bold text-lg">{t.quiz?.gameOver || 'Game Over!'}</p>
            <p className="text-rose-400/70 text-sm mt-1">{t.quiz?.outOfLives || 'You ran out of lives.'}</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
