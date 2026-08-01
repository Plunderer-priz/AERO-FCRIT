import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const PRIMARY_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/drones', label: 'Drones' },
  { to: '/aircraft', label: 'Aircraft' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/team', label: 'Team' },
]

const MORE_LINKS = [
  { to: '/blog', label: 'Blog' },
  { to: '/news', label: 'News' },
  { to: '/alumni', label: 'Alumni' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar({ stickyTop = 0 }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus whenever the route changes.
  useEffect(() => {
    setOpen(false)
    setMoreOpen(false)
  }, [pathname])

  // Close the "More" dropdown on outside click / Escape.
  useEffect(() => {
    function onClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const linkClass = ({ isActive }) =>
    `relative pb-1 transition-colors ${isActive ? 'text-ink' : 'text-inkdim hover:text-ink'} after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-brass after:transition-all ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`

  return (
    <header
      style={{ top: stickyTop }}
      className={`sticky z-50 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? 'py-3 px-5 sm:px-6 md:px-7 bg-hangardeep/90 backdrop-blur-md border-b border-ink/10'
          : 'py-4 sm:py-5 px-5 sm:px-6 md:px-7 bg-hangardeep/60 backdrop-blur-sm'
      }`}
    >
      <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg sm:text-xl tracking-wide">
        <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6 sm:w-7 sm:h-7">
          <path d="M24 4 L28 20 L44 26 L28 28 L24 44 L20 28 L4 26 L20 20 Z" stroke="currentColor" strokeWidth="2" />
        </svg>
        AERO <span className="text-brass">FCRIT</span>
      </Link>

      <nav className="hidden md:flex items-center gap-7 lg:gap-8 font-mono text-[0.76rem] tracking-wider uppercase">
        {PRIMARY_LINKS.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClass}>
            {link.label}
          </NavLink>
        ))}

        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            className={`flex items-center gap-1.5 pb-1 transition-colors ${
              moreOpen || MORE_LINKS.some((l) => l.to === pathname) ? 'text-ink' : 'text-inkdim hover:text-ink'
            }`}
          >
            More
            <svg
              viewBox="0 0 12 8"
              className={`w-2.5 h-2.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`}
              fill="none"
            >
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          {moreOpen && (
            <div className="absolute right-0 mt-3 w-48 rounded border border-ink/15 bg-hangardeep/95 backdrop-blur-md shadow-xl py-2 normal-case tracking-normal">
              {MORE_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-xs uppercase tracking-wider transition-colors ${
                      isActive ? 'text-brass bg-panel/60' : 'text-inkdim hover:text-ink hover:bg-panel/40'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      <Link
        to="/contact"
        className="hidden md:inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-wider uppercase font-medium px-5 py-[11px] rounded-sm bg-signal text-[#171006] hover:bg-orange-400 transition-colors"
      >
        Join the squadron
      </Link>

      <button
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex flex-col gap-1.5 p-2"
      >
        <span className={`block w-6 h-px bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block w-6 h-px bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-hangardeep border-b border-ink/10 flex flex-col p-6 gap-5 font-mono text-sm uppercase tracking-wider max-h-[calc(100dvh-64px)] overflow-y-auto">
          {PRIMARY_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <div className="h-px bg-ink/10 my-1" />
          {MORE_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-sm bg-signal text-[#171006] mt-2"
          >
            Join the squadron
          </Link>
        </div>
      )}
    </header>
  )
}
