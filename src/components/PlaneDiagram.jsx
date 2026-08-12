import useExplodeProgress from '../hooks/useExplodeProgress'

const t = (dx, dy, rot, p) =>
  `translate(${dx * p}px, ${dy * p}px) rotate(${rot * p}deg)`

const LABELS = [
  { x: 9, y: 55, text: 'PROPELLER' },
  { x: 50, y: 12, text: 'MAIN WING' },
  { x: 86, y: 24, text: 'VERTICAL STABILIZER' },
  { x: 86, y: 60, text: 'HORIZONTAL STABILIZER' },
  { x: 50, y: 84, text: 'LANDING GEAR' },
]

export default function PlaneDiagram() {
  const { scrollerRef, progress } = useExplodeProgress()
  const visible = progress > 0.4

  return (
    <div ref={scrollerRef} className="relative" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden bg-panel blueprint-grid-fine">
        <div className="relative w-[92vw] sm:w-[84vw] md:w-[78vw] max-w-[900px]" style={{ aspectRatio: '2 / 1' }}>
          <svg viewBox="0 0 800 400" className="w-full h-full overflow-visible">
            <g className="part" style={{ transform: t(0, 0, 0, progress) }}>
              <path d="M170 220 C 170 195, 230 190, 330 190 L 560 195 C 600 197, 630 205, 640 218 C 630 231, 600 239, 560 241 L 330 246 C 230 246, 170 241, 170 220 Z" />
            </g>
            <g className="part accent" style={{ transform: t(-60, 0, 0, progress) }}>
              <circle cx="150" cy="219" r="20" />
              <line x1="130" y1="219" x2="90" y2="219" />
              <line x1="90" y1="205" x2="90" y2="233" />
            </g>
            <g className="part accent" style={{ transform: t(0, -85, 0, progress) }}>
              <path d="M300 205 L 260 110 L 300 108 L 420 200 Z" />
            </g>
            <g className="part" style={{ transform: t(55, -55, -10, progress) }}>
              <path d="M590 210 L 620 130 L 645 132 L 625 213 Z" />
            </g>
            <g className="part" style={{ transform: t(65, 20, 8, progress) }}>
              <path d="M580 232 L 650 258 L 648 268 L 585 244 Z" />
            </g>
            <g className="part" style={{ transform: t(0, 80, 0, progress) }}>
              <line x1="260" y1="246" x2="252" y2="300" />
              <line x1="238" y1="300" x2="266" y2="300" />
              <line x1="470" y1="246" x2="462" y2="300" />
              <line x1="448" y1="300" x2="476" y2="300" />
            </g>
          </svg>

          <div className="part-label opacity-90" style={{ left: '24%', top: '55%' }}>
            FUSELAGE
          </div>
          {LABELS.map((l) => (
            <div
              key={l.text}
              className="part-label"
              style={{ left: `${l.x}%`, top: `${l.y}%`, opacity: visible ? 1 : 0 }}
            >
              {l.text}
            </div>
          ))}

          <div className="absolute left-6 bottom-6 font-mono text-[0.72rem] text-inkdim tracking-wide">
            EXPLODE <b className="text-brass">{Math.round(progress * 100)}%</b> — MODEL: GLIDER MK.EX (PLACEHOLDER)
          </div>
        </div>
      </div>
    </div>
  )
}
