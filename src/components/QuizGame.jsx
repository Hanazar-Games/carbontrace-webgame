import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { getQuizQuestions, getGradeInfo, worksCited, categories, getTreeStage, CO2_PER_CORRECT, getKnowledgeLevel } from '../lib/quizData'
import Mascot from './ui/Mascot'
import {
  Play, RotateCcw, Zap, Timer, Trophy,
  Flame, ChevronRight, Star, Sparkles,
  PartyPopper, Leaf, TreePine
} from 'lucide-react'

const TOTAL_QUESTIONS = 15
const TIME_PER_QUESTION = 15

function ComboDisplay({ combo }) {
  if (combo < 3) return null
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30">
      <Flame className="w-4 h-4 text-orange-400" />
      <span className="text-sm font-black text-orange-300 tracking-wider">x{combo}</span>
    </div>
  )
}

function TimerBar({ timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100
  const isDanger = timeLeft <= 5
  return (
    <div className="flex items-center gap-3">
      <Timer className={`w-5 h-5 ${isDanger ? 'text-rose-400' : 'text-slate-500'}`} />
      <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isDanger ? 'bg-rose-500' : 'bg-emerald-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-sm font-mono font-bold w-10 text-right ${isDanger ? 'text-rose-400' : 'text-slate-400'}`}>
        {timeLeft}s
      </span>
    </div>
  )
}

function StarRating({ difficulty }) {
  return (
    <span className="inline-flex gap-0.5 ml-1.5">
      {[1, 2, 3].map(i => (
        <span key={i} className={`text-xs ${i <= difficulty ? 'text-amber-400' : 'text-slate-700'}`}>★</span>
      ))}
    </span>
  )
}

function TreeStageCard({ stage, carbonSaved, totalCarbonSaved, treesEquivalent, lang }) {
  return (
    <div className="mt-6 p-6 rounded-xl bg-slate-900 border border-slate-800 text-center">
      <div className="text-5xl mb-3">{stage.icon}</div>
      <div className="text-lg font-bold text-emerald-400">{stage.name}</div>
      <div className="text-sm text-slate-500 mt-1">{stage.desc}</div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-xs text-slate-600 mb-1">{lang === 'zh' ? '本次减排' : 'CO₂ Saved'}</div>
          <div className="text-lg font-bold text-emerald-400">{carbonSaved} kg</div>
        </div>
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-xs text-slate-600 mb-1">{lang === 'zh' ? '累计减排' : 'Total Saved'}</div>
          <div className="text-lg font-bold text-teal-400">{totalCarbonSaved} kg</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
        <TreePine className="w-3.5 h-3.5 text-emerald-600" />
        {lang === 'zh'
          ? `相当于种植了 ${treesEquivalent} 棵树`
          : `Equivalent to planting ${treesEquivalent} trees`}
      </div>
    </div>
  )
}

function KnowledgeLevelBar({ levelInfo, lang }) {
  return (
    <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-slate-400">
            {lang === 'zh' ? '知识等级' : 'Knowledge Level'}
          </span>
        </div>
        <span className="text-sm font-bold text-amber-500">{levelInfo.current.name}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-amber-500 transition-all duration-700"
          style={{ width: `${levelInfo.progressToNext}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-slate-600">{levelInfo.current.desc}</span>
        {levelInfo.next ? (
          <span className="text-[10px] text-slate-600">
            {levelInfo.totalCorrect} / {levelInfo.next.min} → {levelInfo.next.name}
          </span>
        ) : (
          <span className="text-[10px] text-amber-500 font-medium">
            {lang === 'zh' ? '最高等级！' : 'Max Level!'}
          </span>
        )}
      </div>
    </div>
  )
}

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

  const [gameState, setGameState] = useState('start')
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const timeLeftRef = useRef(TIME_PER_QUESTION)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const isRevealedRef = useRef(false)
  const [shake, setShake] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [mascotMood, setMascotMood] = useState('wave')
  const [feedbackText, setFeedbackText] = useState('')
  const [carbonSaved, setCarbonSaved] = useState(0)
  const [resultStats, setResultStats] = useState({ co2: 0, correct: 0 })
  const questionStartTime = useRef(null)
  const timerIntervalRef = useRef(null)

  const [highScores, setHighScores] = useState(() => {
    if (typeof window === 'undefined') return {}
    try { return JSON.parse(localStorage.getItem('carbontrace-highscores') || '{}') } catch { return {} }
  })
  const [totalCarbonSavedAllTime, setTotalCarbonSavedAllTime] = useState(() => {
    if (typeof window === 'undefined') return 0
    try { return parseInt(localStorage.getItem('carbontrace-total-co2') || '0', 10) } catch { return 0 }
  })
  const [totalCorrectAllTime, setTotalCorrectAllTime] = useState(() => {
    if (typeof window === 'undefined') return 0
    try { return parseInt(localStorage.getItem('carbontrace-total-correct') || '0', 10) } catch { return 0 }
  })

  const allQuestions = useMemo(() => getQuizQuestions(lang), [lang])

  const startGame = useCallback(() => {
    setQuestions(shuffleArray(allQuestions))
    setCurrentQ(0)
    setScore(0)
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
    setResultStats({ co2: 0, correct: 0 })
    questionStartTime.current = Date.now()
    setGameState('playing')
  }, [allQuestions])

  useEffect(() => {
    if (gameState !== 'playing' || isRevealed) {
      if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null }
      return
    }
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1
        timeLeftRef.current = next
        if (next <= 0) return 0
        return next
      })
    }, 1000)
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null } }
  }, [gameState, isRevealed])

  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing' && !isRevealedRef.current) {
      isRevealedRef.current = true
      setSelectedOption(-1)
      setIsRevealed(true)
      setQuestionsAnswered(prev => prev + 1)
      setCombo(0)
      setMascotMood('sad')
      setFeedbackText(lang === 'zh' ? '时间到！⏰' : 'Time\'s up! ⏰')
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }, [timeLeft, gameState, lang])

  const handleAnswer = useCallback((optionIndex) => {
    if (isRevealedRef.current) return
    isRevealedRef.current = true
    setSelectedOption(optionIndex)
    setIsRevealed(true)
    setQuestionsAnswered(prev => prev + 1)
    if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null }

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
      const points = 100 + timeBonus + comboBonus
      setScore(s => s + points)
      setCorrectCount(c => c + 1)
      setCarbonSaved(c => c + CO2_PER_CORRECT)
      setMascotMood(newCombo >= 5 ? 'excited' : 'happy')
      const fb = lang === 'zh'
        ? ['正确！', '太棒了！', '连连看！', '不可思议！', '大师级！']
        : ['Correct!', 'Nice!', 'On fire!', 'Amazing!', 'Legendary!']
      setFeedbackText(fb[Math.min(newCombo - 1, fb.length - 1)])
    } else {
      setCombo(0)
      setMascotMood('sad')
      const fbWrong = lang === 'zh'
        ? ['哎呀，不对', '再想想', '加油！', '别灰心']
        : ['Oops, not quite', 'Think again', 'Keep going!', 'Don\'t give up']
      setFeedbackText(fbWrong[Math.floor(Math.random() * fbWrong.length)])
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }, [questions, currentQ, combo, maxCombo, lang])

  const saveGameStats = useCallback(() => {
    const key = `${lang}`
    const prevHigh = highScores[key] || 0
    if (score > prevHigh) {
      const newHighs = { ...highScores, [key]: score }
      setHighScores(newHighs)
      if (typeof window !== 'undefined') localStorage.setItem('carbontrace-highscores', JSON.stringify(newHighs))
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
    if (currentQ + 1 >= TOTAL_QUESTIONS) {
      saveGameStats()
      setGameState('result')
      setMascotMood('happy')
      return
    }
    setCurrentQ(c => c + 1)
    setSelectedOption(null)
    setIsRevealed(false)
    isRevealedRef.current = false
    setTimeLeft(TIME_PER_QUESTION)
    timeLeftRef.current = TIME_PER_QUESTION
    setMascotMood('think')
    setFeedbackText('')
    questionStartTime.current = Date.now()
  }, [currentQ, saveGameStats])

  const progress = ((currentQ + 1) / TOTAL_QUESTIONS) * 100
  const accuracy = questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0
  const grade = useMemo(() => getGradeInfo(accuracy, lang), [accuracy, lang])
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
      <section id="quiz" className="px-6 py-24 bg-slate-950 min-h-[80vh] flex items-center">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-5xl mb-4">{prevStage.icon}</div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.quiz?.title || 'Carbon Quiz Challenge'}
          </h2>
          <p className="max-w-md mx-auto mt-4 text-base text-slate-400 leading-relaxed">
            {t.quiz?.subtitle || 'Test your carbon knowledge. Score points, build combos, and become a Planet Guardian!'}
          </p>
          {prevHigh > 0 && (
            <div className="mt-4 flex items-center justify-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                {lang === 'zh' ? `最高分: ${prevHigh}` : `Best: ${prevHigh}`}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                {lang === 'zh' ? `${prevTrees} 棵树` : `${prevTrees} trees`}
              </span>
            </div>
          )}
          <button
            onClick={startGame}
            className="mt-8 inline-flex items-center gap-2 px-10 py-4 text-lg font-bold text-white rounded-full bg-emerald-600 hover:bg-emerald-500 transition-colors"
          >
            <Play className="w-6 h-6 fill-white" />
            {t.quiz?.startBtn || 'Start Quiz'}
          </button>
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
      <section id="quiz" className="px-6 py-20 bg-slate-950 min-h-screen flex items-center">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Mascot mood={accuracy >= 90 ? 'excited' : accuracy >= 60 ? 'happy' : 'sad'} size={80} />
          </div>

          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-slate-900 border border-slate-800 mb-5">
            <span className={`text-5xl font-bold ${grade.color}`}>{grade.grade}</span>
          </div>

          <h2 className={`text-3xl font-bold ${grade.color}`}>{grade.title}</h2>
          <p className="mt-2 text-slate-400 text-base">{grade.desc}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              { label: t.quiz?.scoreLabel || 'Score', value: score, icon: Star, color: 'text-amber-500' },
              { label: t.quiz?.accuracyLabel || 'Accuracy', value: `${accuracy}%`, icon: Trophy, color: 'text-emerald-500' },
              { label: t.quiz?.maxComboLabel || 'Max Combo', value: `x${maxCombo}`, icon: Flame, color: 'text-orange-500' },
              { label: t.quiz?.correctLabel || 'Correct', value: `${correctCount}/${questionsAnswered}`, icon: Zap, color: 'text-cyan-500' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <item.icon className={`w-5 h-5 mx-auto ${item.color} mb-1.5`} />
                <div className="text-xl font-bold text-white">{item.value}</div>
                <div className="text-xs text-slate-600 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          <TreeStageCard
            stage={treeStage}
            carbonSaved={carbonSaved}
            totalCarbonSaved={resultTotalCO2}
            treesEquivalent={treesEquivalent}
            lang={lang}
          />

          <KnowledgeLevelBar levelInfo={knowledgeInfo} lang={lang} />

          {isNewHigh && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold">
              <PartyPopper className="w-4 h-4" />
              {lang === 'zh' ? '新纪录！' : 'New High Score!'}
            </div>
          )}

          <div className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-800 text-left">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 text-center">
              {lang === 'zh' ? '参考文献' : 'Works Cited'}
            </div>
            <ul className="space-y-1">
              {worksCited.map((citation, i) => (
                <li key={i} className="text-[10px] text-slate-600 leading-relaxed">[{i + 1}] {citation}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setGameState('start')}
            className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-white rounded-full bg-emerald-600 hover:bg-emerald-500 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            {t.quiz?.retryBtn || 'Play Again'}
          </button>
        </div>
      </section>
    )
  }

  // ---- PLAYING SCREEN ----
  return (
    <section id="quiz" className="px-6 py-12 bg-slate-950 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <ComboDisplay combo={combo} />
          </div>
          <div className="flex items-center gap-2 text-amber-500 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <Star className="w-4 h-4 fill-amber-500" />
            <span className="font-bold text-lg tabular-nums">{score}</span>
          </div>
        </div>

        {/* Carbon saved mini badge */}
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/20 border border-emerald-800/30 text-xs text-emerald-500 font-medium">
            <Leaf className="w-3 h-3" />
            {lang === 'zh' ? `已减排 ${carbonSaved} kg CO₂` : `${carbonSaved} kg CO₂ saved`}
          </span>
          {combo >= 3 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-900/20 border border-orange-800/30 text-xs text-orange-500 font-medium">
              {treeStage.icon} {treeStage.name}
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium uppercase tracking-wider">
            <span className="flex items-center">
              {t.quiz?.questionLabel || 'Question'} {currentQ + 1}/{TOTAL_QUESTIONS}
              {q?.difficulty !== undefined && <StarRating difficulty={q.difficulty} />}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Timer */}
        <div className="mb-5">
          <TimerBar timeLeft={timeLeft} maxTime={TIME_PER_QUESTION} />
        </div>

        {/* Mascot + Feedback */}
        <div className="flex items-center gap-3 mb-4">
          <Mascot mood={mascotMood} size={50} />
          <div className="min-h-[2rem]">
            {feedbackText && (
              <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${
                mascotMood === 'happy' || mascotMood === 'excited'
                  ? 'bg-emerald-900/30 border border-emerald-800/30 text-emerald-400'
                  : mascotMood === 'sad'
                  ? 'bg-rose-900/30 border border-rose-800/30 text-rose-400'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}>
                {feedbackText}
              </div>
            )}
          </div>
        </div>

        {/* Question Card */}
        <div className={`p-5 sm:p-6 rounded-xl border bg-slate-900 border-slate-800 ${shake ? 'animate-shake' : ''}`}>
          {/* Category badge */}
          {q?.category && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-500 font-medium">
                {(categories[lang] || categories['en'])[q.category] || q.category}
              </span>
            </div>
          )}

          {/* Question image */}
          {q?.image && (
            <div className="mb-4 rounded-lg overflow-hidden border border-slate-800">
              <img src={q.image} alt="" className="w-full h-40 sm:h-48 object-cover" onError={(e) => { e.target.style.display = 'none' }} />
            </div>
          )}

          <div className="flex items-start gap-3 mb-6">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-emerald-900/20 flex items-center justify-center border border-emerald-900/30">
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">{q?.question}</h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {q?.options.map((option, i) => {
              let btnClass = 'border-slate-700 bg-slate-800/50 hover:border-emerald-700 hover:bg-slate-800'
              if (isRevealed) {
                if (i === q.correct) btnClass = 'border-emerald-600 bg-emerald-900/20'
                else if (i === selectedOption && i !== q.correct) btnClass = 'border-rose-600 bg-rose-900/20'
                else btnClass = 'border-slate-800 bg-slate-900/50 opacity-50'
              } else if (selectedOption === i) {
                btnClass = 'border-emerald-600 bg-emerald-900/20'
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={isRevealed}
                  className={`w-full text-left px-4 py-3.5 rounded-lg border transition-colors duration-150 ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold
                      ${isRevealed && i === q.correct ? 'bg-emerald-600 text-white' :
                        isRevealed && i === selectedOption && i !== q.correct ? 'bg-rose-600 text-white' :
                        selectedOption === i ? 'bg-emerald-800 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className={`text-sm font-medium ${
                      isRevealed && i === q.correct ? 'text-emerald-400' :
                      isRevealed && i === selectedOption && i !== q.correct ? 'text-rose-400' : 'text-slate-300'
                    }`}>{option}</span>
                    {isRevealed && i === q.correct && (
                      <span className="ml-auto"><Sparkles className="w-4 h-4 text-emerald-500" /></span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Citation */}
          {q?.citation && (
            <div className="mt-3 text-[10px] text-slate-700 italic leading-relaxed border-t border-slate-800 pt-2.5">
              <span className="font-medium text-slate-600 not-italic">{lang === 'zh' ? '来源：' : 'Source: '}</span>
              {q.citation}
            </div>
          )}

          {/* Explanation */}
          {isRevealed && (
            <div className="mt-4 p-4 rounded-lg bg-slate-800/50 border border-emerald-900/20">
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="text-emerald-500 font-bold">{t.quiz?.didYouKnow || 'Did you know?'} </span>
                {q?.explanation}
              </p>
            </div>
          )}

          {/* Next button */}
          {isRevealed && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={nextQuestion}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-full bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                {currentQ + 1 >= TOTAL_QUESTIONS ? (t.quiz?.seeResults || 'See Results') : (t.quiz?.nextBtn || 'Next')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
