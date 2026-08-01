import PageHero from '../components/PageHero'

const TEAM = [
  { initial: 'A', name: 'Name Surname', role: 'Club Captain' },
  { initial: 'B', name: 'Name Surname', role: 'UAV Lead' },
  { initial: 'C', name: 'Name Surname', role: 'Fixed-Wing Lead' },
  { initial: 'D', name: 'Name Surname', role: 'Sponsorship Lead' },
  { initial: 'E', name: 'Name Surname', role: 'Avionics' },
  { initial: 'F', name: 'Name Surname', role: 'Structures' },
  { initial: 'G', name: 'Name Surname', role: 'Flight Test' },
  { initial: 'H', name: 'Name Surname', role: 'Events & Outreach' },
]

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Crew"
        title="Team"
        description="Placeholder roster — replace with your current committee and division leads."
      />

      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink/10">
          {TEAM.map((m) => (
            <div key={m.name + m.role} className="bg-hangar p-6">
              <div className="w-[52px] h-[52px] rounded-full border border-ink/25 flex items-center justify-center font-display font-bold text-brass mb-4">
                {m.initial}
              </div>
              <h4 className="font-medium text-base mb-1">{m.name}</h4>
              <div className="font-mono text-[0.7rem] text-linecyan uppercase tracking-wide">{m.role}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
