import PageHero from '../components/PageHero'
import DroneDiagram from '../components/DroneDiagram'

const SPECS = [
  { label: 'Frame class', value: '450mm quadcopter' },
  { label: 'Motors', value: '4x brushless, placeholder KV' },
  { label: 'Flight controller', value: 'Placeholder — e.g. Pixhawk / F4' },
  { label: 'Payload', value: '2-axis gimbal camera' },
  { label: 'Endurance', value: 'Placeholder — fill with test data' },
  { label: 'Status', value: 'In development' },
]

export default function Drones() {
  return (
    <>
      <PageHero
        eyebrow="Division 01 — Unmanned Systems"
        title="Drones"
        description="Quadcopter platforms built for aerial survey and payload delivery. Scroll to break the airframe below into its working parts."
      />

      <DroneDiagram />

      <p className="max-w-[640px] mx-auto px-5 sm:px-7 mt-6 font-mono text-[0.78rem] text-inkdim">
        <span className="text-signal">⚠ </span>
        Exemplar schematic — this is a placeholder line-diagram. Swap in your team's own CAD render or
        photograph when ready.
      </p>

      <section className="py-24">
        <div className="max-w-[780px] mx-auto px-5 sm:px-7">
          <h2 className="font-display font-extrabold uppercase text-3xl mb-8">Spec sheet</h2>
          <div className="border-t border-ink/10">
            {SPECS.map((s) => (
              <div key={s.label} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-5 py-4 border-b border-ink/10">
                <div className="font-mono text-[0.78rem] text-brass uppercase tracking-wide">{s.label}</div>
                <div className="text-inkdim">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
