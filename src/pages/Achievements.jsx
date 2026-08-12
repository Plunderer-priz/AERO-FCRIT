import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'

const TIMELINE_DATA = [
  {
    year: '2026',
    entries: [
      { team: 'Garuda', title: 'AmiTech 2026 Project Competition', rank: 'AIR 1 (1st Place)', prize: '₹20,000 INR', isMajorVictory: true, category: 'Fixed-Wing Design', text: 'Secured Rank 1 overall for custom fixed-wing aircraft platform design and flight testing.' },
      { team: 'Thestral', title: 'SAEISS Autonomous Drone Development Competition (ADDC)', rank: 'AIR 5 Overall', subRanks: ['AIR 1 in Safe Design System'], prize: '₹5,000 INR', isMajorVictory: true, category: 'Autonomous Multirotors', text: 'Awarded Rank 1 in Safe Design System alongside a top-5 overall national finish in autonomous delivery challenges.' },
      { team: 'Garuda', title: 'SAEISS Drone Development Competition (DDC)', rank: 'AIR 7 Overall', isMajorVictory: false, category: 'Fixed Wings', text: 'Achieved 7th All India Rank in overall national competition standings.' },
      { team: 'Thestral', title: 'Datta Meghe ElectroWiz Competition', rank: '1st Place', isMajorVictory: true, category: 'Avionics & Signal Processing', text: 'Won 1st Place for custom autonomous flight control hardware and signal processing.' },
    ],
  },
  {
    year: '2025',
    entries: [
      { team: 'Thestral', title: 'SAEISS Autonomous Drone Development Competition (ADDC)', rank: 'AIR 1 Overall', subRanks: ['AIR 3 in Safe Design System'], prize: '₹50,000 INR', isMajorVictory: true, category: 'Autonomous Multirotors', text: 'National Champions — Claimed All India Rank 1 Overall along with the Safe Design System podium award.' },
      { team: 'Garuda', title: 'SAEISS Drone Development Competition (DDC)', rank: 'AIR 5 Overall', subRanks: ['AIR 3 in Best CFD Analysis', 'AIR 4 in Technical Presentation', 'AIR 8 in Innovation'], isMajorVictory: false, category: 'Fixed Wings', text: 'Secured top rankings across Aerodynamic CFD Analysis, Technical Presentation, and Innovation.' },
    ],
  },
  {
    year: '2024',
    entries: [
      { team: 'Garuda', title: 'SAEISS Drone Development Competition (DDC)', rank: 'AIR 9 Overall', subRanks: ['AIR 2 in Best CFD Analysis'], isMajorVictory: false, category: 'Fixed Wings', text: 'Secured All India Rank 2 in Aerodynamic CFD Analysis and AIR 9 in Overall Performance.' },
      { team: 'Thestral', title: 'SAEISS Autonomous Drone Development Competition (ADDC)', rank: 'AIR 7 Overall', isMajorVictory: false, category: 'Autonomous Multirotors', text: 'Ranked 7th nationally in autonomous multirotor delivery and mission tests.' },
      { team: 'Thestral', title: 'IIT Roorkee Cognizance', rank: 'AIR 3 Overall', isMajorVictory: false, category: 'Aeromodelling', text: 'Podium rank (3rd Place overall) at the IIT Roorkee national technical festival.' },
    ],
  },
  {
    year: '2023',
    entries: [
      { team: 'Thestral', title: 'SAEISS Autonomous Drone Development Competition (ADDC)', rank: 'AIR 1 Overall', prize: '₹1,00,000 INR', isMajorVictory: true, category: 'Autonomous Multirotors', text: "Inaugural Season Champions — Took All India Rank 1 Overall and Grand Prize during Team Thestral's debut season." },
      { team: 'Garuda', title: 'SAEISS Drone Development Competition (DDC)', rank: 'AIR 6 Overall', subRanks: ['AIR 3 in Technical Report Presentation'], isMajorVictory: false, category: 'Fixed Wings', text: 'Secured AIR 3 in Technical Report Presentation and AIR 6 in Best Overall Performance.' },
    ],
  },
  {
    year: '2022',
    entries: [
      { team: 'Garuda', title: 'SAEISS Drone Development Competition (DDC)', rank: 'AIR 10 Overall', isMajorVictory: false, category: 'Fixed Wings', text: 'Broke into the national top 10 with All India Rank 10 in Overall Performance.' },
    ],
  },
  {
    year: '2021',
    entries: [
      { team: 'Garuda', title: 'SAEISS Drone Development Competition (DDC)', rank: '2nd Runner-Up', isMajorVictory: false, category: 'Fixed Wings', text: 'Awarded 2nd Runner-Up in the Technical Report Presentation round.' },
    ],
  },
  {
    year: '2020',
    entries: [
      { team: 'Garuda', title: 'SAEISS Drone Development Competition (DDC)', rank: '47th Overall', subRanks: ['5th in Technical Presentation', '16th in Design Report'], isMajorVictory: false, category: 'Fixed Wings', text: 'Club inaugural competition run — Built foundational performance data across presentation and design reports.' },
    ],
  },
]

// Prop-blur / vapor accent — a warm cream tied to the brass family rather
// than a generic bright color, so it stays in the site's palette.
const GLOW = '#E9C77E'

function reduceMotionPreferred() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Animates a number toward `target` whenever it changes (e.g. switching the
// squad filter). Skips the animation entirely if the user prefers reduced motion.
function useCountUp(target, duration = 0.7) {
  const [value, setValue] = useState(target)
  const prevRef = useRef(target)

  useEffect(() => {
    if (reduceMotionPreferred()) {
      setValue(target)
      prevRef.current = target
      return
    }
    const start = prevRef.current
    const startTime = performance.now()
    let raf
    function tick(now) {
      const elapsed = (now - startTime) / 1000
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(start + (target - start) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    prevRef.current = target
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

function parsePrize(prizeStr) {
  if (!prizeStr) return 0
  const digits = prizeStr.replace(/[^\d]/g, '')
  return digits ? parseInt(digits, 10) : 0
}

const inr = new Intl.NumberFormat('en-IN')

function StatBlock({ label, value, format }) {
  const animated = useCountUp(value)
  return (
    <div className="p-6 sm:p-8 text-left">
      <div className="font-display font-bold text-3xl sm:text-4xl leading-none text-brass tabular-nums">
        {format ? format(animated) : animated}
      </div>
      <div className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-inkdim mt-2">{label}</div>
    </div>
  )
}

// Soft vapor puffs on takeoff — tinted with the site's parchment "ink" color
// instead of stark white so it doesn't flash against the dark background.
function TakeoffLandingSmoke({ isFlying }) {
  const smokePuffs = [
    { x: -30, y: 8, size: 18, delay: 0 },
    { x: -18, y: 12, size: 15, delay: 0.08 },
    { x: -6, y: 15, size: 12, delay: 0.15 },
    { x: 6, y: 15, size: 12, delay: 0.15 },
    { x: 18, y: 12, size: 15, delay: 0.08 },
    { x: 30, y: 8, size: 18, delay: 0 },
  ]

  return (
    <AnimatePresence>
      {isFlying && (
        <motion.div
          key="smoke-cloud"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none z-10 w-28 h-10 flex items-center justify-center"
        >
          {smokePuffs.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ x: 0, y: 0, scale: 0.3, opacity: 0.85 }}
              animate={{
                x: p.x * 1.4,
                y: p.y * 0.8,
                scale: [0.4, 1.8, 2.4],
                opacity: [0.85, 0.4, 0],
              }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: p.delay }}
              style={{ width: p.size, height: p.size }}
              className="absolute rounded-full bg-gradient-to-r from-ink/60 via-ink/25 to-transparent blur-[4px]"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Compact landing-pad reticle, recolored to brass. Gets a soft pulsing ring
// while its year is expanded, so the open item reads clearly at a glance.
function TacticalLandingPad({ isOpen }) {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center bg-transparent drop-shadow-[0_0_6px_rgba(206,158,82,0.45)] pointer-events-none">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 2.2 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border border-brass/60"
        />
      )}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-[2px] border-l-[2px] border-brass/80" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-[2px] border-r-[2px] border-brass/80" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[2px] border-l-[2px] border-brass/80" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[2px] border-r-[2px] border-brass/80" />

      <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-[2px] h-1.5 bg-brass/80" />
      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[2px] h-1.5 bg-brass/80" />
      <div className="absolute top-1/2 -left-0.5 -translate-y-1/2 h-[2px] w-1.5 bg-brass/80" />
      <div className="absolute top-1/2 -right-0.5 -translate-y-1/2 h-[2px] w-1.5 bg-brass/80" />
    </div>
  )
}

// Year-specific UAV silhouettes with animated propellers.
function YearSpecificDroneSVG({ year }) {
  switch (year) {
    case '2026':
      return (
        <svg width="42" height="32" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <motion.ellipse cx="7" cy="5" rx="6" ry="1.5" stroke={GLOW} strokeWidth="2" fill="none" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.08 }} />
          <motion.ellipse cx="29" cy="5" rx="6" ry="1.5" stroke={GLOW} strokeWidth="2" fill="none" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.08 }} />
          <line x1="7" y1="5" x2="7" y2="10" />
          <line x1="29" y1="5" x2="29" y2="10" />
          <path d="M7 10 L18 14 L29 10" strokeWidth="2.2" />
          <rect x="13" y="11" width="10" height="7" rx="1" fill="currentColor" fillOpacity="0.3" />
          <circle cx="18" cy="14.5" r="1.5" fill={GLOW} />
          <path d="M12 18 L9 23 H27 L24 18" strokeWidth="1.8" />
        </svg>
      )

    case '2025':
      return (
        <svg width="42" height="32" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <motion.ellipse cx="6" cy="4" rx="5" ry="1.2" stroke={GLOW} strokeWidth="1.8" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.08 }} />
          <motion.ellipse cx="18" cy="2" rx="5" ry="1.2" stroke={GLOW} strokeWidth="1.8" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.08 }} />
          <motion.ellipse cx="30" cy="4" rx="5" ry="1.2" stroke={GLOW} strokeWidth="1.8" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.08 }} />
          <path d="M6 4 L18 12 L30 4" strokeWidth="2" />
          <path d="M18 2 L18 12" strokeWidth="2" />
          <circle cx="18" cy="12" r="3.5" fill="currentColor" fillOpacity="0.4" />
          <path d="M10 20 L13 13 H23 L26 20" strokeWidth="1.8" />
        </svg>
      )

    case '2024':
      return (
        <svg width="42" height="32" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 3 L22 13 L34 16 L22 18 L18 25 L14 18 L2 16 L14 13 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="2" />
          <motion.ellipse cx="8" cy="15" rx="4" ry="1" stroke={GLOW} strokeWidth="1.8" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.08 }} />
          <motion.ellipse cx="28" cy="15" rx="4" ry="1" stroke={GLOW} strokeWidth="1.8" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.08 }} />
          <motion.line x1="15" y1="25" x2="21" y2="25" stroke={GLOW} strokeWidth="2" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.06 }} />
        </svg>
      )

    case '2023':
      return (
        <svg width="40" height="30" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <motion.ellipse cx="7" cy="7" rx="5.5" ry="1.5" stroke={GLOW} strokeWidth="2" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.08 }} />
          <motion.ellipse cx="29" cy="7" rx="5.5" ry="1.5" stroke={GLOW} strokeWidth="2" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.08 }} />
          <line x1="7" y1="7" x2="18" y2="13" strokeWidth="2.2" />
          <line x1="29" y1="7" x2="18" y2="13" strokeWidth="2.2" />
          <path d="M14 10 L18 5 L22 10 L18 18 Z" fill="currentColor" fillOpacity="0.4" />
          <path d="M11 21 H25" strokeWidth="2" />
        </svg>
      )

    case '2022':
      return (
        <svg width="42" height="30" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="12" x2="34" y2="12" strokeWidth="2.5" />
          <path d="M18 4 L21 23 L18 25 L15 23 Z" fill="currentColor" fillOpacity="0.3" />
          <motion.ellipse cx="10" cy="12" rx="1.5" ry="5" stroke={GLOW} strokeWidth="1.8" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.07 }} />
          <motion.ellipse cx="26" cy="12" rx="1.5" ry="5" stroke={GLOW} strokeWidth="1.8" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.07 }} />
          <line x1="12" y1="23" x2="24" y2="23" strokeWidth="2" />
        </svg>
      )

    case '2021':
      return (
        <svg width="42" height="30" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="8" x2="34" y2="8" strokeWidth="2.8" />
          <path d="M18 5 L21 22 L18 25 L15 22 Z" fill="currentColor" fillOpacity="0.3" />
          <motion.line x1="13" y1="4" x2="23" y2="4" stroke={GLOW} strokeWidth="2.2" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.06 }} />
          <circle cx="12" cy="22" r="1.5" />
          <circle cx="24" cy="22" r="1.5" />
        </svg>
      )

    case '2020':
    default:
      return (
        <svg width="42" height="30" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10 L18 6 L32 10 L18 14 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="2" />
          <line x1="18" y1="14" x2="18" y2="24" strokeWidth="2" />
          <path d="M13 24 L18 19 L23 24" strokeWidth="1.8" />
          <motion.ellipse cx="18" cy="15" rx="4.5" ry="1.2" stroke={GLOW} strokeWidth="1.8" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.07 }} />
        </svg>
      )
  }
}

function TacticalDrone({ year, isFlying }) {
  return (
    <div className="relative flex items-center justify-center">
      <TakeoffLandingSmoke isFlying={isFlying} />
      <motion.div
        initial={false}
        animate={
          isFlying
            ? { x: 230, y: -70, rotate: 12, opacity: 0, scale: 0.5 }
            : { x: 0, y: 0, rotate: 0, opacity: 0.85, scale: 1 }
        }
        transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex items-center justify-center text-brass drop-shadow-[0_0_8px_rgba(212,175,55,0.55)] z-30 pointer-events-none"
      >
        <YearSpecificDroneSVG year={year} />
      </motion.div>
    </div>
  )
}

const FILTERS = [
  { id: 'ALL', label: 'Entire Team' },
  { id: 'GARUDA', label: 'Team Garuda' },
  { id: 'THESTRAL', label: 'Team Thestral' },
]

export default function Achievements() {
  const [openYear, setOpenYear] = useState('2026')
  const [activeFilter, setActiveFilter] = useState('ALL')

  const handleToggleYear = (year) => {
    setOpenYear((prev) => (prev === year ? null : year))
  }

  // Squad-aware, so the stats visibly recount whenever you switch filters.
  const filteredGroups = useMemo(() => {
    return TIMELINE_DATA.map((group) => ({
      year: group.year,
      entries: group.entries.filter((item) => activeFilter === 'ALL' || item.team.toUpperCase() === activeFilter),
    })).filter((group) => group.entries.length > 0)
  }, [activeFilter])

  const stats = useMemo(() => {
    const all = filteredGroups.flatMap((g) => g.entries)
    return {
      totalRecords: all.length,
      majorVictories: all.filter((e) => e.isMajorVictory).length,
      totalPrize: all.reduce((sum, e) => sum + parsePrize(e.prize), 0),
      yearsCompeting: filteredGroups.length,
    }
  }, [filteredGroups])

  return (
    <>
      <PageHero
        eyebrow="Flight Record"
        title="Achievements"
        description="A competitive chronology of national ranks, titles, and engineering recognitions earned by Team Garuda (Fixed Wings) and Team Thestral (Multirotors)."
      />

      {/* Stats strip — recounts live as the squad filter changes below */}
      <section className="border-y border-ink/10 bg-hangardeep">
        <div className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10">
          <StatBlock label="Total Records" value={stats.totalRecords} />
          <StatBlock label="Major Victories" value={stats.majorVictories} />
          <StatBlock label="Prize Money Won" value={stats.totalPrize} format={(v) => `₹${inr.format(v)}`} />
          <StatBlock label="Years Competing" value={stats.yearsCompeting} />
        </div>
      </section>

      <section className="py-16 md:py-24 overflow-x-hidden">
        <div className="max-w-[800px] mx-auto px-5 sm:px-6">

          {/* Squad filter */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 pb-6 mb-12 border-b border-ink/10">
            <span className="font-mono text-xs font-semibold text-inkdim tracking-widest uppercase hidden sm:inline">
              Filter squad
            </span>
            <div className="flex gap-2 font-mono text-xs flex-wrap justify-center">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`relative px-4 py-2 rounded-lg uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                    activeFilter === f.id ? 'text-[#171006]' : 'text-inkdim hover:text-ink bg-panel border border-ink/10 hover:border-ink/20'
                  }`}
                >
                  {activeFilter === f.id && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-brass rounded-lg z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative space-y-12">
            {/* Flight path — a slow-moving dashed line rather than a static rule */}
            <div
              className="flight-path-line absolute top-0 bottom-0 left-6 sm:left-8 w-px -translate-x-1/2 z-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(206,158,82,0.4) 0 6px, transparent 6px 16px)',
                animation: 'flow-line 1.6s linear infinite',
              }}
            />

            <AnimatePresence mode="popLayout">
              {filteredGroups.map((group) => {
                const isOpen = openYear === group.year
                const victoryCount = group.entries.filter((e) => e.isMajorVictory).length

                return (
                  <motion.div
                    key={group.year}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ layout: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.2 } }}
                    className="relative flex items-start group"
                  >
                    <div className="absolute left-6 sm:left-8 top-1.5 -translate-x-1/2 z-10 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <TacticalLandingPad isOpen={isOpen} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <TacticalDrone year={group.year} isFlying={isOpen} />
                        </div>
                      </div>
                    </div>

                    <div className="w-full pl-16 sm:pl-20">
                      <button
                        onClick={() => handleToggleYear(group.year)}
                        className="w-full flex items-center justify-between gap-3 pb-3 text-left border-b border-ink/10 focus:outline-none group/btn cursor-pointer"
                      >
                        <div className="flex items-baseline gap-4 flex-wrap">
                          <h2 className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-brass group-hover/btn:text-brass/80 transition-colors">
                            {group.year}
                          </h2>

                          {!isOpen && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="font-mono text-xs text-inkdim hidden sm:inline-block"
                            >
                              {victoryCount > 0 && (
                                <span className="text-brass font-semibold mr-2">
                                  ★ {victoryCount} Major {victoryCount === 1 ? 'Victory' : 'Victories'}
                                </span>
                              )}
                              • {group.entries.length} {group.entries.length === 1 ? 'Record' : 'Records'}
                            </motion.span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 font-mono text-xs text-inkdim group-hover/btn:text-ink transition-colors uppercase tracking-wider font-medium shrink-0">
                          <span>{isOpen ? 'Close' : 'Expand'}</span>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="inline-block text-brass font-bold"
                          >
                            ↓
                          </motion.span>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-8 pb-4 space-y-8">
                              {group.entries.map((row, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.05 }}
                                  whileHover={{ y: -2 }}
                                  className={`group/card relative space-y-2.5 transition-colors p-4 rounded-md ${
                                    row.isMajorVictory
                                      ? 'border-l-4 border-brass bg-brass/[0.05]'
                                      : 'border-l-2 border-transparent hover:border-brass/30 hover:bg-ink/[0.03]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-3 flex-wrap font-mono text-xs">
                                    <span className="text-brass font-bold tracking-wider uppercase flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-brass/80" />
                                      Team {row.team} <span className="text-inkdim font-normal">/ {row.category}</span>
                                    </span>

                                    <span
                                      className={`font-mono text-xs font-bold tracking-wider px-2.5 py-0.5 rounded ${
                                        row.isMajorVictory ? 'bg-brass text-[#171006] font-extrabold uppercase' : 'bg-ink/10 text-ink'
                                      }`}
                                    >
                                      {row.isMajorVictory && '★ '}
                                      {row.rank}
                                    </span>
                                  </div>

                                  <h3 className="font-display font-bold text-xl sm:text-2xl text-ink leading-tight tracking-tight">
                                    {row.title}
                                  </h3>

                                  {(row.subRanks || row.prize) && (
                                    <div className="flex flex-wrap gap-2 pt-0.5">
                                      {row.prize && (
                                        <span className="font-mono text-[0.75rem] font-bold text-brass bg-brass/10 px-2.5 py-0.5 rounded border border-brass/25">
                                          Prize: {row.prize}
                                        </span>
                                      )}
                                      {row.subRanks?.map((sub, idx) => (
                                        <span key={idx} className="font-mono text-[0.75rem] font-medium text-inkdim bg-ink/5 px-2 py-0.5 rounded border border-ink/10">
                                          {sub}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  <p className="text-inkdim text-[0.98rem] leading-relaxed max-w-[680px]">{row.text}</p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}