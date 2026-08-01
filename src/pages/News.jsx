import { useState } from 'react'
import PageHero from '../components/PageHero'

const CATEGORIES = ['All', 'Competitions', 'Builds', 'Sponsorship', 'Events']

const NEWS = [
  { title: 'Add your latest competition result here', category: 'Competitions', date: 'Placeholder date' },
  { title: 'New quadcopter frame cleared for test flights', category: 'Builds', date: 'Placeholder date' },
  { title: 'Placeholder — new sponsor announcement', category: 'Sponsorship', date: 'Placeholder date' },
  { title: 'Open workshop day announced for new members', category: 'Events', date: 'Placeholder date' },
  { title: 'Glider Mk.II completes first stable flight', category: 'Builds', date: 'Placeholder date' },
  { title: 'Placeholder — upcoming competition date', category: 'Competitions', date: 'Placeholder date' },
]

export default function News() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? NEWS : NEWS.filter((n) => n.category === active)

  return (
    <>
      <PageHero
        eyebrow="News Column"
        title="Latest updates"
        description="Placeholder news items — filter by category, or replace this list with your real feed."
      />

      <section className="py-16">
        <div className="max-w-[780px] mx-auto px-5 sm:px-7">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`font-mono text-[0.7rem] uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
                  active === c
                    ? 'bg-brass border-brass text-[#171006]'
                    : 'border-ink/20 text-inkdim hover:text-ink hover:border-ink/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-0">
            {filtered.map((n, i) => (
              <div
                key={n.title}
                className={`py-6 border-t border-ink/10 ${i === filtered.length - 1 ? 'border-b' : ''}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[0.66rem] uppercase tracking-wider text-linecyan">
                    {n.category}
                  </span>
                  <span className="text-inkdim text-xs">·</span>
                  <span className="font-mono text-[0.66rem] text-inkdim">{n.date}</span>
                </div>
                <h3 className="font-display font-bold uppercase text-xl">{n.title}</h3>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-inkdim py-10 text-center text-sm">No items in this category yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
