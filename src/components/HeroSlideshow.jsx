import { useEffect, useRef, useState } from 'react'

// Placeholder slides — swap `title`/`caption` and drop real photos/video
// into the dashed frame once you have them (see README).
const SLIDES = [
  { id: 1, title: 'Build days in the hangar', caption: 'Add a photo or video of your workshop sessions.' },
  { id: 2, title: 'First flights', caption: 'Add footage from a recent test flight.' },
  { id: 3, title: 'Competition day', caption: 'Add photos from your last competition.' },
  { id: 4, title: 'The crew', caption: 'Add a team photo here.' },
]

const SLIDE_DURATION = 5000

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const containerRef = useRef(null)
  const lockRef = useRef(false)
  const touchStart = useRef({ x: 0, y: 0 })
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const go = (dir) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length)

  // Autoplay — restarts whenever the slide changes or pause state flips.
  useEffect(() => {
    if (paused || reduceMotion.current) return
    const t = setInterval(() => go(1), SLIDE_DURATION)
    return () => clearInterval(t)
  }, [paused, index])

  // Native listeners (not React's synthetic ones) so preventDefault reliably
  // stops the page from also scrolling horizontally while we swipe slides.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onWheel(e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 12) {
        e.preventDefault()
        if (lockRef.current) return
        lockRef.current = true
        go(e.deltaX > 0 ? 1 : -1)
        setTimeout(() => (lockRef.current = false), 700)
      }
      // Vertical wheel movement is ignored here, so the page scrolls normally.
    }

    function onTouchStart(e) {
      const t = e.touches[0]
      touchStart.current = { x: t.clientX, y: t.clientY }
    }

    function onTouchMove(e) {
      const t = e.touches[0]
      const dx = t.clientX - touchStart.current.x
      const dy = t.clientY - touchStart.current.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        e.preventDefault()
      }
      // Predominantly-vertical touch moves are left alone -> normal page scroll.
    }

    function onTouchEnd(e) {
      const t = e.changedTouches[0]
      const dx = t.clientX - touchStart.current.x
      const dy = t.clientY - touchStart.current.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        go(dx < 0 ? 1 : -1)
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="absolute inset-0 overflow-hidden touch-pan-y"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-panel2 border border-dashed border-ink/15 m-3 md:m-6 rounded flex flex-col items-center justify-center text-center gap-2 px-6">
            <span className="font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-inkdim">
              Slide {String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')} — placeholder
            </span>
            <h3 className="font-display font-bold uppercase text-xl sm:text-2xl md:text-3xl">{slide.title}</h3>
            <p className="text-inkdim text-xs sm:text-sm max-w-xs">{slide.caption}</p>
          </div>
        </div>
      ))}

      {/* legibility gradients — keep once real photos/video replace the placeholders */}
      <div className="absolute inset-0 bg-gradient-to-t from-hangar via-hangar/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-hangar/70 via-transparent to-transparent pointer-events-none" />

      <button
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full border border-ink/25 bg-hangardeep/60 hover:border-brass hover:text-brass transition-colors z-20"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(1)}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full border border-ink/25 bg-hangardeep/60 hover:border-brass hover:text-brass transition-colors z-20"
      >
        ›
      </button>

      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${
              i === index ? 'w-8 bg-ink/25' : 'w-4 bg-ink/15 hover:bg-ink/25'
            }`}
          >
            {i === index && (
              <span
                key={`${index}-${paused}`}
                className="absolute inset-y-0 left-0 bg-brass"
                style={{
                  animation: paused ? 'none' : `fillbar ${SLIDE_DURATION}ms linear forwards`,
                  width: paused ? '100%' : undefined,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
