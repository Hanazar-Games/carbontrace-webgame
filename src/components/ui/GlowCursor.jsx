import { useEffect, useRef } from 'react'

export default function GlowCursor({ color = 'rgba(16,185,129,0.15)', size = 300 }) {
  const glowRef = useRef(null)
  const posRef = useRef({ x: -1000, y: -1000 })
  const targetRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    function animate() {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.1
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.1
      glow.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [size])

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
        willChange: 'transform',
      }}
    />
  )
}
