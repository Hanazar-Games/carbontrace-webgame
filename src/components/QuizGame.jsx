import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, Play, RotateCcw, Heart, Zap, Timer, Trophy,
  Flame, Volume2, VolumeX, ChevronRight, Star, Sparkles, Skull,
  Lock, Unlock, Lightbulb, Frown, Smile, PartyPopper
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useSound } from '../context/SoundContext'
import { getQuizQuestions, getGradeInfo, difficultySettings, funFacts, achievements, categories } from '../lib/quizData'
import Confetti from './ui/Confetti'
import ScreenFlash from './ui/ScreenFlash'
import ParticleBackground from './ui/ParticleBackground'
import Mascot from './ui/Mascot'

const MAX_LIVES = 3

function Lives({ lives, maxLives }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: maxLives }).map((_, i) => (
        <motion.div
          key={i}
          initial={i >= lives ? { scale: 1.5, rotate: -20 } : {}}
          animate={i < lives ? { scale: [1, 1.25, 1] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, type: 'spring' }}
        >
          {i < lives ? (
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
          ) : (
            <Heart className="w-5 h-5 text-slate-700" />
          )}
        </motion.div>
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
          initial={{ scale: 0, opacity: 0, y: 20, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
        >
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
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

function TimerBar({ timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100
  const isDanger = timeLeft <= 5
  return (
    <div className="flex items-center gap-3">
      <motion.div animate={isDanger ? { scale: [1, 1.2, 1] } : {}} transition={{ repeat: isDanger ? Infinity : 0, duration: 0.5 }}>
        <Timer className={`w-5 h-5 ${isDanger ? 'text-rose-400' : 'text-slate-400'}`} />
      </motion.div>
      <div className="flex-1 h-2.5 rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/50">
        <motion.div
          className={`h-full rounded-full ${isDanger ? 'bg-gradient-to-r from-rose-500 to-orange-500' : 'bg-gradient-to-r from-emerald-400 to-teal-300'}`}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
          style={isDanger ? { boxShadow: '0 0 12px rgba(244,63,94,0.5)' } : {}}
        />
      </div>
      <motion.span
        animate={isDanger ? { scale: [1, 1.15, 1] } : {}}
        transition={{ repeat: isDanger ? Infinity : 0, duration: 0.4 }}
        className={`text-sm font-mono font-bold w-10 text-right ${isDanger ? 'text-rose-400' : 'text-slate-300'}`}
      >
        {timeLeft}s
      </motion.span>
    </div>
  )
}

function AchievementPopup({ achievement, id, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(id), 2500)
    return () => clearTimeout(t)
  }, [id, onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-slate-900/95 border border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.2)] backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{achievement.icon}</span>
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Achievement Unlocked!</div>
          <div className="text-sm font-bold text-white">{achievement.name}</div>
          <div className="text-xs text-slate-400">{achievement.desc}</div>
        </div>
      </div>
    </motion.div>
  )
}

function DifficultyBadge({ diff }) {
  const colors = {
    easy: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    medium: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    hard: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border bg-gradient-to-r ${colors[diff] || colors.medium}`}>
      {diff === 'easy' ? '★' : diff === 'medium' ? '★★' : '★★★'}
    </span>
  )
}

export default function QuizGame() {
  const { t, lang } = useLanguage()
  const sound = useSound()

  // Game config
  const [difficulty, setDifficulty] = useState('medium')
  const config = difficultySettings[difficulty]

  // Game state
  const [gameState, setGameState] = useState('start') // start, playing, result
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(MAX_LIVES)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0, trigger: 0 })
  const [resultConfettiTrigger, setResultConfettiTrigger] = useState(0)
  const [scorePopup, setScorePopup] = useState(null)
  const [shake, setShake] = useState(false)
  const [flash, setFlash] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [mascotMood, setMascotMood] = useState('wave')
  const [feedbackText, setFeedbackText] = useState('')
  const [newAchievements, setNewAchievements] = useState([])
  const [answerTime, setAnswerTime] = useState(null)
  const questionStartTime = useRef(null)
  const timerIntervalRef = useRef(null)

  // High scores from localStorage
  const [highScores, setHighScores] = useState(() => {
    if (typeof window === 'undefined') return {}
    try {
      return JSON.parse(localStorage.getItem('carbontrace-highscores') || '{}')
    } catch { return {} }
  })
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('carbontrace-achievements') || '[]')
    } catch { return [] }
  })

  const gameConfig = useMemo(() => ({ questions: config.questions, time: config.time }), [config])

  const allQuestions = useMemo(() => getQuizQuestions(lang), [lang])

  const startGame = useCallback(() => {
    sound.playStart()
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, gameConfig.questions)
    setQuestions(selected)
    setCurrentQ(0)
    setScore(0)
    setLives(MAX_LIVES)
    setCombo(0)
    setMaxCombo(0)
    setTimeLeft(gameConfig.time)
    setSelectedOption(null)
    setIsRevealed(false)
    setCorrectCount(0)
    setMascotMood('think')
    setFeedbackText('')
    setNewAchievements([])
    setAnswerTime(null)
    questionStartTime.current = Date.now()
    setGameState('playing')
  }, [allQuestions, sound, gameConfig])

  // Timer - CLEAN implementation, no nested setState
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
        if (prev <= 1) {
          // Time's up - handle in separate effect
          return 0
        }
        if (prev <= 5) sound.playTick()
        return prev - 1
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
    if (timeLeft === 0 && gameState === 'playing' && !isRevealed) {
      setSelectedOption(-1)
      setIsRevealed(true)
      setCombo(0)
      setMascotMood('sad')
      setFeedbackText(lang === 'zh' ? '时间到！⏰' : 'Time\'s up! ⏰')
      setLives(l => {
        const newLives = l - 1
        if (newLives <= 0) {
          sound.playGameOver()
          setMascotMood('shock')
        } else {
          sound.playWrong()
        }
        return newLives
      })
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }, [timeLeft, gameState, isRevealed, sound, lang])

  const unlockAchievement = useCallback((id) => {
    if (!unlockedAchievements.includes(id)) {
      const newList = [...unlockedAchievements, id]
      setUnlockedAchievements(newList)
      setNewAchievements(prev => [...prev, id])
      if (typeof window !== 'undefined') {
        localStorage.setItem('carbontrace-achievements', JSON.stringify(newList))
      }
    }
  }, [unlockedAchievements])

  const dismissAchievement = useCallback((id) => {
    setNewAchievements(prev => prev.filter(x => x !== id))
  }, [])

  const handleAnswer = useCallback((optionIndex, event) => {
    if (isRevealed) return

    const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000)
    setAnswerTime(timeSpent)
    setSelectedOption(optionIndex)
    setIsRevealed(true)

    const q = questions[currentQ]
    const isCorrect = optionIndex === q.correct

    if (isCorrect) {
      const newCombo = combo + 1
      setCombo(newCombo)
      if (newCombo > maxCombo) setMaxCombo(newCombo)

      const timeBonus = Math.round((timeLeft / gameConfig.time) * 50)
      const comboBonus = newCombo >= 3 ? (newCombo - 2) * 20 : 0
      const basePoints = 100
      const points = basePoints + timeBonus + comboBonus

      setScore(s => s + points)
      setCorrectCount(c => c + 1)
      sound.playCorrect()
      if (newCombo >= 3) sound.playCombo(newCombo)

      // Flash
      setFlash(true)
      setTimeout(() => setFlash(false), 150)

      // Mascot & feedback
      if (newCombo >= 5) {
        setMascotMood('excited')
        unlockAchievement('combo_5')
      } else if (newCombo >= 3) {
        setMascotMood('happy')
      } else {
        setMascotMood('happy')
      }

      const fb = lang === 'zh'
        ? ['正确！🎉', '太棒了！✨', '连连看！🔥', '不可思议！🌟', '大师级！🏆']
        : ['Correct! 🎉', 'Nice! ✨', 'On fire! 🔥', 'Amazing! 🌟', 'Legendary! 🏆']
      setFeedbackText(fb[Math.min(newCombo - 1, fb.length - 1)])

      // Speed demon achievement
      if (timeSpent <= 3) unlockAchievement('speed_demon')

      // Score popup
      const rect = event?.currentTarget?.getBoundingClientRect()
      if (rect) {
        setScorePopup({ value: points, x: rect.left + rect.width / 2, y: rect.top })
        setTimeout(() => setScorePopup(null), 1000)
      }

      // Confetti
      const rect2 = event?.currentTarget?.getBoundingClientRect()
      if (rect2) {
        setConfettiOrigin({ x: rect2.left + rect2.width / 2, y: rect2.top + rect2.height / 2, trigger: Date.now() })
      }
    } else {
      setCombo(0)
      setMascotMood('sad')
      const fbWrong = lang === 'zh'
        ? ['哎呀，不对 😅', '再想想 🤔', '加油！💪', '别灰心 🍀']
        : ['Oops, not quite 😅', 'Think again 🤔', 'Keep going! 💪', 'Don\'t give up 🍀']
      setFeedbackText(fbWrong[Math.floor(Math.random() * fbWrong.length)])

      setLives(l => {
        const newLives = l - 1
        if (newLives <= 0) {
          sound.playGameOver()
          setMascotMood('shock')
        } else {
          sound.playWrong()
        }
        return newLives
      })
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
  }, [isRevealed, questions, currentQ, combo, maxCombo, timeLeft, sound, lang, unlockAchievement, gameConfig])

  const nextQuestion = useCallback(() => {
    if (currentQ + 1 >= gameConfig.questions || lives <= 0) {
      // Game over / results
      const finalScore = score
      const diff = difficulty
      const key = `${diff}-${lang}`
      const prevHigh = highScores[key] || 0
      if (finalScore > prevHigh) {
        const newHighs = { ...highScores, [key]: finalScore }
        setHighScores(newHighs)
        if (typeof window !== 'undefined') {
          localStorage.setItem('carbontrace-highscores', JSON.stringify(newHighs))
        }
      }

      // Check achievements
      if (correctCount === gameConfig.questions) unlockAchievement('perfect')
      if (correctCount / gameConfig.questions >= 0.9) unlockAchievement('s_rank')
      if (diff === 'hard') unlockAchievement('hard_mode')
      unlockAchievement('first_game')

      setGameState('result')
      if (lives > 0) {
        sound.playGameOver()
        setMascotMood('happy')
      }
      return
    }
    setCurrentQ(c => c + 1)
    setSelectedOption(null)
    setIsRevealed(false)
    setTimeLeft(gameConfig.time)
    setMascotMood('think')
    setFeedbackText('')
    questionStartTime.current = Date.now()
  }, [currentQ, lives, score, difficulty, lang, highScores, correctCount, sound, unlockAchievement, gameConfig])

  useEffect(() => {
    if (gameState === 'result') {
      setResultConfettiTrigger(Date.now())
    }
  }, [gameState])

  const progress = ((currentQ) / gameConfig.questions) * 100
  const accuracy = correctCount > 0 ? Math.round((correctCount / gameConfig.questions) * 100) : 0
  const grade = useMemo(() => getGradeInfo(accuracy, lang), [accuracy, lang])
  const isWin = lives > 0
  const q = questions[currentQ]

  const currentAchievements = achievements[lang] || achievements['en']

  // ---- START SCREEN ----
  if (gameState === 'start') {
    return (
      <section id="quiz" className="px-6 py-28 bg-slate-950 relative overflow-hidden min-h-[90vh] flex items-center">
        <ParticleBackground color="#10b981" density={45} speed={0.25} />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute top-1/3 -right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[100px]" />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">

            {/* Mascot */}
            <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <Mascot mood="wave" size={100} />
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              {t.quiz?.title || 'Carbon Quiz Challenge'}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="max-w-xl mx-auto mt-4 text-lg text-slate-300 leading-relaxed">
              {t.quiz?.subtitle || 'Test your carbon knowledge. Score points, build combos, and become a Planet Guardian!'}
            </motion.p>

            {/* Difficulty selector */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mt-8 flex justify-center gap-3">
              {['easy', 'medium', 'hard'].map((d) => (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { sound.playClick(); setDifficulty(d) }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                    difficulty === d
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                      : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {difficulty === d ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    {difficultySettings[d].label[lang] || d}
                  </div>
                  <div className="text-[10px] font-normal opacity-70 mt-0.5">
                    {difficultySettings[d].questions} {lang === 'zh' ? '题' : 'Q'} / {difficultySettings[d].time}s
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Fun fact */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="italic">{(funFacts[lang] || funFacts['en'])[Math.floor(Math.random() * (funFacts[lang] || funFacts['en']).length)]}</span>
            </motion.div>

            {/* High score */}
            {highScores[`${difficulty}-${lang}`] > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs text-emerald-400 font-medium">
                <Trophy className="w-3.5 h-3.5 inline mr-1" />
                {lang === 'zh' ? '最高分' : 'High Score'}: {highScores[`${difficulty}-${lang}`]}
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 60px rgba(16,185,129,0.4)' }}
              whileTap={{ scale: 0.92 }}
              onClick={() => { sound.playClick(); startGame() }}
              className="mt-8 inline-flex items-center gap-3 px-12 py-5 text-xl font-black text-white rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 bg-[length:200%_100%] hover:bg-right transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              <Play className="w-7 h-7 fill-white" />
              {t.quiz?.startBtn || 'Start Challenge'}
            </motion.button>

            {/* Achievements preview */}
            {unlockedAchievements.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-center gap-2 flex-wrap">
                {currentAchievements.filter(a => unlockedAchievements.includes(a.id)).map(a => (
                  <span key={a.id} className="text-lg" title={a.name}>{a.icon}</span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  // ---- RESULT SCREEN ----
  if (gameState === 'result') {
    const randomFunFact = (funFacts[lang] || funFacts['en'])[Math.floor(Math.random() * (funFacts[lang] || funFacts['en']).length)]
    return (
      <section id="quiz" className="px-6 py-28 bg-slate-950 relative overflow-hidden min-h-screen flex items-center">
        {isWin && <Confetti originX={typeof window !== 'undefined' ? window.innerWidth / 2 : 0} originY={typeof window !== 'undefined' ? window.innerHeight / 3 : 0} trigger={resultConfettiTrigger} />}
        <ParticleBackground color={isWin ? '#10b981' : '#f43f5e'} density={35} speed={0.15} />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
            className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r ${grade.bg} blur-[150px]`} />
        </div>

        <div className="max-w-xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 150, damping: 15 }}>

            {/* Mascot */}
            <motion.div initial={{ y: 20 }} animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex justify-center mb-4">
              <Mascot mood={isWin ? (accuracy >= 90 ? 'excited' : 'happy') : 'sad'} size={90} />
            </motion.div>

            <motion.div initial={{ rotateY: -180, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
              className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-slate-900/80 border-2 border-slate-700 mb-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]" style={{ perspective: 1000 }}>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                className={`text-6xl font-black ${grade.color} drop-shadow-[0_0_20px_currentColor]`}>
                {isWin ? grade.grade : <Skull className="w-14 h-14 text-rose-400" />}
              </motion.span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className={`text-4xl font-black ${isWin ? grade.color : 'text-rose-400'}`}>
              {isWin ? grade.title : (t.quiz?.gameOver || 'Game Over!')}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-3 text-slate-300 text-lg">
              {isWin ? grade.desc : (t.quiz?.outOfLives || 'You ran out of lives.')}
            </motion.p>

            {/* Difficulty badge */}
            <div className="mt-4">
              <DifficultyBadge diff={difficulty} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: t.quiz?.scoreLabel || 'Score', value: score, icon: Star, color: 'text-amber-400' },
                { label: t.quiz?.accuracyLabel || 'Accuracy', value: `${accuracy}%`, icon: Trophy, color: 'text-emerald-400' },
                { label: t.quiz?.maxComboLabel || 'Max Combo', value: `x${maxCombo}`, icon: Flame, color: 'text-orange-400' },
                { label: t.quiz?.correctLabel || 'Correct', value: `${correctCount}/${gameConfig.questions}`, icon: Zap, color: 'text-cyan-400' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, type: 'spring' }} whileHover={{ scale: 1.05, y: -3 }}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-center backdrop-blur-sm hover:border-slate-700 transition-colors">
                  <motion.div initial={{ rotate: -20, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}>
                    <item.icon className={`w-6 h-6 mx-auto ${item.color} mb-2`} />
                  </motion.div>
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* New high score */}
            {score > 0 && score >= (highScores[`${difficulty}-${lang}`] || 0) && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold">
                <PartyPopper className="w-4 h-4" />
                {lang === 'zh' ? '新纪录！' : 'New High Score!'}
              </motion.div>
            )}

            {/* Fun fact */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 text-sm text-slate-400 italic">
              <Lightbulb className="w-4 h-4 inline text-amber-400 mr-1" />
              {randomFunFact}
            </motion.div>

            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(16,185,129,0.4)' }} whileTap={{ scale: 0.92 }}
              onClick={() => { sound.playClick(); setGameState('start') }}
              className="mt-8 inline-flex items-center gap-3 px-10 py-4 text-lg font-black text-white rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
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

      {/* Achievement popups */}
      <AnimatePresence>
        {newAchievements.map(id => {
          const ach = currentAchievements.find(a => a.id === id)
          if (!ach) return null
          return <AchievementPopup key={id} id={id} achievement={ach} onDismiss={dismissAchievement} />
        })}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Top bar */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200 }}
          className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Lives lives={lives} maxLives={MAX_LIVES} />
            <ComboDisplay combo={combo} />
          </div>
          <div className="flex items-center gap-4">
            <motion.div key={score} initial={{ scale: 1.3 }} animate={{ scale: 1 }}
              className="flex items-center gap-2 text-amber-400 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700/50">
              <Star className="w-5 h-5 fill-amber-400" />
              <span className="font-black text-xl tabular-nums">{score}</span>
            </motion.div>
            <motion.button whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}
              onClick={() => { sound.setMuted(!sound.muted); sound.playClick() }}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
              {sound.muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
            <span>{t.quiz?.questionLabel || 'Question'} {currentQ + 1}/{gameConfig.questions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/30">
            <motion.div className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400"
              animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 80, damping: 15 }} />
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <TimerBar timeLeft={timeLeft} maxTime={gameConfig.time} />
        </div>

        {/* Mascot + Feedback */}
        <div className="flex items-center gap-4 mb-4">
          <Mascot mood={mascotMood} size={60} />
          <AnimatePresence mode="wait">
            {feedbackText && (
              <motion.div key={feedbackText} initial={{ opacity: 0, x: -20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20 }} transition={{ type: 'spring', stiffness: 300 }}
                className={`px-4 py-2 rounded-xl text-sm font-bold ${
                  mascotMood === 'happy' || mascotMood === 'excited'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : mascotMood === 'sad' || mascotMood === 'shock'
                    ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                    : 'bg-slate-800/50 border border-slate-700 text-slate-300'
                }`}>
                {feedbackText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQ}
            initial={{ opacity: 0, x: 80, scale: 0.95, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -80, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 25 }}
            className={`relative p-6 sm:p-8 rounded-2xl border bg-slate-900/60 backdrop-blur-sm border-slate-700/50 shadow-[0_0_60px_rgba(0,0,0,0.3)] ${shake ? 'animate-shake' : ''}`}>

            {/* Glow borders */}
            {isRevealed && selectedOption === q?.correct && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 rounded-2xl border-2 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] pointer-events-none" />
            )}
            {isRevealed && selectedOption !== q?.correct && selectedOption !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 rounded-2xl border-2 border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.1)] pointer-events-none" />
            )}

            {/* Category badge */}
            {q?.category && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/50 text-xs text-slate-400 font-medium">
                  {(categories[lang] || categories['en'])[q.category] || q.category}
                </span>
              </div>
            )}

            <div className="flex items-start gap-4 mb-8">
              <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.1, type: 'spring' }}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </motion.div>
              <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {q?.question}
              </motion.h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q?.options.map((option, i) => {
                let btnClass = 'border-slate-700/60 bg-slate-900/40 hover:border-emerald-500/40 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                if (isRevealed) {
                  if (i === q.correct) btnClass = 'border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  else if (i === selectedOption && i !== q.correct) btnClass = 'border-rose-500/60 bg-rose-500/10'
                  else btnClass = 'border-slate-800/60 bg-slate-900/20 opacity-40'
                } else if (selectedOption === i) {
                  btnClass = 'border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                }

                return (
                  <motion.button key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 300 }}
                    whileHover={!isRevealed ? { scale: 1.02, x: 6 } : {}}
                    whileTap={!isRevealed ? { scale: 0.97 } : {}}
                    onClick={(e) => handleAnswer(i, e)} disabled={isRevealed}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${btnClass}`}>
                    <div className="flex items-center gap-3">
                      <span className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black transition-all
                        ${isRevealed && i === q.correct ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                          isRevealed && i === selectedOption && i !== q.correct ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]' :
                          selectedOption === i ? 'bg-emerald-500/30 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className={`text-sm sm:text-base font-medium ${
                        isRevealed && i === q.correct ? 'text-emerald-300' :
                        isRevealed && i === selectedOption && i !== q.correct ? 'text-rose-300' : 'text-slate-200'
                      }`}>{option}</span>
                      {isRevealed && i === q.correct && (
                        <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }} className="ml-auto">
                          <Sparkles className="w-5 h-5 text-emerald-400" />
                        </motion.span>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div initial={{ opacity: 0, height: 0, y: 10 }} animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, type: 'spring' }}
                  className="mt-5 p-5 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-800/30 border border-emerald-500/10">
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
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="mt-5 flex justify-end">
                  <motion.button whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}
                    onClick={() => { sound.playClick(); nextQuestion() }}
                    className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-shadow">
                    {currentQ + 1 >= gameConfig.questions || lives <= 0
                      ? (t.quiz?.seeResults || 'See Results')
                      : (t.quiz?.nextBtn || 'Next')}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {lives <= 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-5 rounded-xl bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/30 text-center backdrop-blur-sm">
            <Skull className="w-8 h-8 mx-auto text-rose-400 mb-2" />
            <p className="text-rose-300 font-bold text-lg">{t.quiz?.gameOver || 'Game Over!'}</p>
            <p className="text-rose-400/70 text-sm mt-1">{t.quiz?.outOfLives || 'You ran out of lives.'}</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
