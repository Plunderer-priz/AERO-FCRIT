import PageHero from '../components/PageHero'

const LOG = [
  { year: '2023', title: 'First maiden flight', text: "Club's first fixed-wing airframe completed a stable maiden flight after two design iterations." },
  { year: '2024', title: 'UAV payload trials', text: 'Quadcopter platform certified for stable camera-gimbal payload carry during survey trials.' },
  { year: '2024', title: 'Inter-college competition', text: 'Placed at a national-level aeromodelling competition with an endurance glider entry.' },
  { year: '2025', title: 'New hangar space', text: 'Moved into a dedicated workshop bay for airframe assembly and testing.' },
  { year: '2025', title: 'Drone division launched', text: 'Formalized the Unmanned Systems division and began quadcopter build cycles.' },
  { year: '2026', title: 'Ongoing builds', text: 'Current cycle in progress — replace with your latest milestone.' },
]

export default function Achievements() {
  return (
    <>
      <PageHero
        eyebrow="Flight Log"
        title="Milestones"
        description="A running log of builds, competitions, and firsts. Placeholder entries — replace with your real history."
      />

      <section className="py-20">
        <div className="max-w-[780px] mx-auto px-5 sm:px-7">
          {LOG.map((row, i) => (
            <div
              key={row.title}
              className={`grid grid-cols-[56px_1fr] sm:grid-cols-[90px_1fr] gap-4 sm:gap-6 py-6 border-t border-ink/10 ${
                i === LOG.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="font-mono text-brass text-sm pt-0.5">{row.year}</div>
              <div>
                <h3 className="font-display font-bold uppercase text-xl mb-1.5">{row.title}</h3>
                <p className="text-inkdim text-[0.96rem]">{row.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
