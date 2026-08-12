import { useEffect, useRef, useState } from 'react'

// Tracks scroll progress (0 -> 1) through a tall "scroller" wrapper element
// while its inner content stays pinned via CSS `position: sticky`.
export default function useExplodeProgress() {
  const scrollerRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ticking = false

    function update() {
      const el = scrollerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      let p = total > 0 ? scrolled / total : 0
      p = Math.min(Math.max(p, 0), 1)
      if (reduceMotion) p = 0.85
      setProgress(p)
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          update()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return { scrollerRef, progress }
}
