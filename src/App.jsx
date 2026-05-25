import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import QuizGame from './components/QuizGame'
import Footer from './components/Footer'
import VersionModal from './components/VersionModal'

function App() {
  const [versionOpen, setVersionOpen] = useState(false)

  return (
    <main className="antialiased bg-slate-950">
      <Navbar onOpenVersion={() => setVersionOpen(true)} />
      <Hero />
      <QuizGame />
      <Footer />
      <VersionModal isOpen={versionOpen} onClose={() => setVersionOpen(false)} />
    </main>
  )
}

export default App
