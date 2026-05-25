import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Features from './components/Features'
import QuizGame from './components/QuizGame'
import Impact from './components/Impact'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import VersionModal from './components/VersionModal'
import GlowCursor from './components/ui/GlowCursor'

function App() {
  const [versionOpen, setVersionOpen] = useState(false)

  return (
    <main className="antialiased bg-slate-950">
      <GlowCursor color="rgba(16,185,129,0.08)" size={350} />
      <Navbar onOpenVersion={() => setVersionOpen(true)} />
      <Hero />
      <Problem />
      <Features />
      <QuizGame />
      <Impact />
      <CTASection />
      <Footer />
      <VersionModal isOpen={versionOpen} onClose={() => setVersionOpen(false)} />
    </main>
  )
}

export default App
