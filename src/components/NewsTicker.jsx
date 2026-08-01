import { Link } from 'react-router-dom'

// Placeholder headlines — wire these to your real news items later
// (or pull them from the same data source as the News page).
const HEADLINES = [
  'Add your latest club headline here',
  'Placeholder — new sponsor announcement goes here',
  'Placeholder — upcoming competition date goes here',
  'Placeholder — recent flight-test result goes here',
]

export default function NewsTicker({ onClose }) {
  const loopItems = [...HEADLINES, ...HEADLINES]

  return (
    <div className="sticky top-0 z-[60] h-9 bg-hangardeep border-b border-ink/10 flex items-stretch overflow-hidden">
      <div className="flex items-center gap-2 pl-4 pr-3 bg-signal shrink-0">
        <span className="font-mono text-[0.62rem] sm:text-[0.65rem] tracking-wider uppercase text-[#171006] font-semibold">
          News
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden flex items-center">
        <div className="ticker-track flex items-center gap-10 whitespace-nowrap font-mono text-[0.7rem] text-inkdim pr-10 pl-6">
          {loopItems.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>{item}</span>
              <span className="text-brass">◆</span>
            </span>
          ))}
        </div>
      </div>

      <Link
        to="/news"
        className="hidden sm:flex items-center shrink-0 px-4 font-mono text-[0.66rem] uppercase tracking-wider text-brass hover:text-ink transition-colors"
      >
        All news →
      </Link>
      <button
        aria-label="Dismiss news bar"
        onClick={onClose}
        className="shrink-0 px-3 text-inkdim hover:text-ink transition-colors"
      >
        ✕
      </button>
    </div>
  )
}
