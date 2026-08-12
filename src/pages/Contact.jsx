import { useState } from 'react'
import PageHero from '../components/PageHero'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // UI placeholder only — wire this up to a real backend or a service
    // like Formspree / Netlify Forms before going live.
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Fly with us"
        description="Sponsors, mentors, and new members welcome. Placeholder contact details — swap in your real ones."
      />

      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-7 grid md:grid-cols-2 gap-14">
          <div>
            <h3 className="font-display font-extrabold uppercase text-2xl mb-6">Reach us</h3>
            <ul className="space-y-4 text-inkdim">
              <li>
                <span className="block font-mono text-[0.7rem] text-brass uppercase tracking-wide mb-1">Email</span>
                <a href="mailto:hello@aerofcrit.example" className="hover:text-ink transition-colors">
                  hello@aerofcrit.example
                </a>
              </li>
              <li>
                <span className="block font-mono text-[0.7rem] text-brass uppercase tracking-wide mb-1">Workshop</span>
                Hangar Bay, FCRIT Campus (placeholder address)
              </li>
              <li>
                <span className="block font-mono text-[0.7rem] text-brass uppercase tracking-wide mb-1">Social</span>
                <div className="flex gap-4 mt-1">
                  <a href="#" className="hover:text-ink transition-colors">Instagram</a>
                  <a href="#" className="hover:text-ink transition-colors">LinkedIn</a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-extrabold uppercase text-2xl mb-6">Send a message</h3>
            {submitted ? (
              <p className="text-linecyan font-mono text-sm">
                Thanks — this form UI works, but isn't wired to a backend yet. Connect it to your
                email service to make it live.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  className="w-full bg-panel border border-ink/15 rounded px-4 py-3 text-sm placeholder:text-inkdim focus:outline-none focus:border-brass"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full bg-panel border border-ink/15 rounded px-4 py-3 text-sm placeholder:text-inkdim focus:outline-none focus:border-brass"
                />
                <textarea
                  required
                  rows="4"
                  placeholder="Message"
                  className="w-full bg-panel border border-ink/15 rounded px-4 py-3 text-sm placeholder:text-inkdim focus:outline-none focus:border-brass"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-wider uppercase font-medium px-5 py-3 rounded-sm bg-signal text-[#171006] hover:bg-orange-400 transition-colors"
                >
                  Send
                </button>
                <p className="font-mono text-[0.7rem] text-inkdim">
                  ⚠ UI placeholder — connect to a form backend (e.g. Formspree) to make this live.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
