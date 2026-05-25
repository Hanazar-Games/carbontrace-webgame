import { createContext, useContext, useRef, useCallback, useState } from 'react'

const SoundContext = createContext()

export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(false)
  const audioCtxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (muted) return null
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new AudioContext()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [muted])

  const playTone = useCallback((freq, duration, type = 'sine', volume = 0.15, delay = 0) => {
    const ctx = getCtx()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
    gain.gain.setValueAtTime(volume, ctx.currentTime + delay)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime + delay)
    osc.stop(ctx.currentTime + delay + duration)
  }, [getCtx])

  const playCorrect = useCallback(() => {
    playTone(523.25, 0.12, 'sine', 0.2, 0)
    playTone(659.25, 0.12, 'sine', 0.2, 0.08)
    playTone(783.99, 0.18, 'sine', 0.25, 0.16)
  }, [playTone])

  const playWrong = useCallback(() => {
    playTone(200, 0.25, 'sawtooth', 0.12, 0)
    playTone(150, 0.35, 'sawtooth', 0.1, 0.18)
  }, [playTone])

  const playCombo = useCallback((combo) => {
    const base = 440 + Math.min(combo * 30, 400)
    playTone(base, 0.1, 'sine', 0.18, 0)
    playTone(base * 1.25, 0.1, 'sine', 0.18, 0.08)
    playTone(base * 1.5, 0.15, 'sine', 0.22, 0.16)
  }, [playTone])

  const playStart = useCallback(() => {
    [523.25, 587.33, 659.25, 783.99, 1046.5].forEach((f, i) => {
      playTone(f, 0.15, 'sine', 0.15, i * 0.06)
    })
  }, [playTone])

  const playGameOver = useCallback(() => {
    [783.99, 659.25, 523.25, 392.00].forEach((f, i) => {
      playTone(f, 0.4, 'triangle', 0.18, i * 0.18)
    })
  }, [playTone])

  const playClick = useCallback(() => {
    playTone(800, 0.05, 'sine', 0.08, 0)
  }, [playTone])

  const playTick = useCallback(() => {
    playTone(1200, 0.03, 'square', 0.05, 0)
  }, [playTone])

  return (
    <SoundContext.Provider value={{
      muted, setMuted,
      playCorrect, playWrong, playCombo, playStart, playGameOver, playClick, playTick
    }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within SoundProvider')
  return ctx
}
