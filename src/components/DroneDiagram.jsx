import useExplodeProgress from '../hooks/useExplodeProgress'

const t = (dx, dy, rot, p) =>
  `translate(${dx * p}px, ${dy * p}px) rotate(${rot * p}deg)`

const LABELS = [
  { x: 50, y: 18, text: 'LIPO BATTERY PACK' },
  { x: 50, y: 80, text: 'GIMBAL CAMERA' },
  { x: 12, y: 12, text: 'MOTOR + PROP 01' },
  { x: 88, y: 12, text: 'MOTOR + PROP 02' },
  { x: 12, y: 88, text: 'MOTOR + PROP 03' },
  { x: 88, y: 88, text: 'MOTOR + PROP 04' },
]

export default function DroneDiagram() {
  const { scrollerRef, progress } = useExplodeProgress()
  const visible = progress > 0.4

  return (
    <div ref={scrollerRef} className="relative" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden bg-panel blueprint-grid-fine">
        <div className="relative w-[86vw] sm:w-[70vw] md:w-[64vw] max-w-[660px] aspect-square">
          <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible">
            <g className="part" style={{ transform: t(0, 0, 0, progress) }}>
              <rect x="255" y="255" width="90" height="90" rx="16" />
            </g>
            <g className="part accent" style={{ transform: t(0, -95, 0, progress) }}>
              <rect x="252" y="205" width="96" height="34" rx="6" />
            </g>
            <g className="part accent" style={{ transform: t(0, 95, 0, progress) }}>
              <circle cx="300" cy="382" r="26" />
              <rect x="288" y="405" width="24" height="16" rx="3" />
            </g>
            <g className="part" style={{ transform: t(-95, -95, -8, progress) }}>
              <line x1="300" y1="300" x2="150" y2="150" />
              <circle cx="150" cy="150" r="24" />
              <ellipse cx="150" cy="150" rx="46" ry="7" />
            </g>
            <g className="part" style={{ transform: t(95, -95, 8, progress) }}>
              <line x1="300" y1="300" x2="450" y2="150" />
              <circle cx="450" cy="150" r="24" />
              <ellipse cx="450" cy="150" rx="46" ry="7" />
            </g>
            <g className="part" style={{ transform: t(-95, 95, 8, progress) }}>
              <line x1="300" y1="300" x2="150" y2="450" />
              <circle cx="150" cy="450" r="24" />
              <ellipse cx="150" cy="450" rx="46" ry="7" />
            </g>
            <g className="part" style={{ transform: t(95, 95, -8, progress) }}>
              <line x1="300" y1="300" x2="450" y2="450" />
              <circle cx="450" cy="450" r="24" />
              <ellipse cx="450" cy="450" rx="46" ry="7" />
            </g>
          </svg>

          <div className="part-label opacity-90" style={{ left: '50%', top: '50%' }}>
            FLIGHT CONTROLLER
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
            EXPLODE <b className="text-brass">{Math.round(progress * 100)}%</b> — MODEL: QUADCOPTER MK.EX (PLACEHOLDER)
          </div>
        </div>
      </div>
    </div>
  )
}
