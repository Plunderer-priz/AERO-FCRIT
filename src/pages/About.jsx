import PageHero from '../components/PageHero'

const VALUES = [
  { title: 'Build first', text: 'We learn aerodynamics and controls by building airframes, not just simulating them.' },
  { title: 'Student run', text: 'Every design, test flight, and repair is planned and executed by club members.' },
  { title: 'Open knowledge', text: 'Build logs, failures, and fixes are documented so the next batch starts ahead.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About the club"
        title="Mission &amp; history"
        description="Placeholder copy — replace with your club's real founding story and mission statement."
      />

      <section className="py-20">
        <div className="max-w-[780px] mx-auto px-7 space-y-6 text-inkdim text-[1.02rem]">
          <p>
            Aero FCRIT is the aeromodelling and UAV design club at FCRIT, bringing together students
            interested in flight — from fixed-wing gliders to multirotor drones. This paragraph is a
            placeholder; replace it with your club's actual history, founding year, and mission.
          </p>
          <p>
            The club is organized into two build divisions — Unmanned Systems and Fixed Wing — each
            running its own design, fabrication, and test-flight cycle across the academic year.
          </p>
        </div>
      </section>

      <section className="py-20 bg-panel border-y border-ink/10">
        <div className="max-w-[1180px] mx-auto px-7 grid md:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="border border-ink/10 rounded p-8 bg-hangardeep">
              <h3 className="font-display font-bold uppercase text-xl mb-3">{v.title}</h3>
              <p className="text-inkdim text-sm">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
