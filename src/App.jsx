import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NewsTicker from './components/NewsTicker'
import Home from './pages/Home'
import About from './pages/About'
import Drones from './pages/Drones'
import Aircraft from './pages/Aircraft'
import Achievements from './pages/Achievements'
import Sponsors from './pages/Sponsors'
import Team from './pages/Team'
import Blog from './pages/Blog'
import News from './pages/News'
import Alumni from './pages/Alumni'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [newsOpen, setNewsOpen] = useState(true)

  return (
    <div className="min-h-screen bg-hangar text-ink font-body">
      <ScrollToTop />
      {newsOpen && <NewsTicker onClose={() => setNewsOpen(false)} />}
      <Navbar stickyTop={newsOpen ? 36 : 0} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/drones" element={<Drones />} />
          <Route path="/aircraft" element={<Aircraft />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/news" element={<News />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
