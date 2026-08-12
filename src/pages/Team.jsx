import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'

// Real team roster with detailed aeronautical divisions.
const TEAM_ROSTER = [
  // --- LEADERSHIP ---
  { name: 'Yuvraj Nalavde', role: 'Garuda Captain', division: 'Leadership', team: 'Garuda', image: '/team/kunal.jpg', bio: 'Directs overall club vision, technical operations, and national competition readiness.' },
  { name: 'Vedang Vaishampayan', role: 'Garuda Vice Captain', division: 'Avionics', team: 'Garuda', image: '/team/yash.jpg', bio: 'Leads flight control firmware integration, custom PCB hardware, and autonomous navigation.' },
  { name: 'Vinay Desai', role: 'Thestral Captain', division: 'Leadership', team: 'Thestral', image: '/team/aditya-s.jpg', bio: 'Oversees structural safety, multi-system integration, and flight telemetry analysis.' },
  { name: 'Aditya Salgaonkar', role: 'Thestral Vice Captain', division: 'Leadership', team: 'Thestral', image: '/team/vinay.jpg', bio: 'Coordinates aerostructure design and mission payload delivery for fixed-wing aircraft.' },

  // --- GARUDA (PLANES) ---
  { name: 'Kaustubh Prabhu', role: 'Aerodynamics & CFD Lead', division: 'Design & Aero Dynamics', team: 'Team Garuda', image: '/team/kaustubh.jpg', bio: 'Performs airflow simulations, airfoil selection, and computational fluid dynamics analysis.' },
  { name: 'Atharva Thakur', role: 'CFD Engineer', division: 'Design & Aero Dynamics', team: 'Team Garuda', image: '/team/atharva.jpg', bio: 'Analyzes lift-to-drag ratios and stability parameters under variable wind conditions.' },
  { name: 'Varad Kurhekar', role: 'Wing Geometry Engineer', division: 'Design & Aero Dynamics', team: 'Team Garuda', image: '/team/varad.jpg', bio: 'Optimizes wing sweep, dihedral angles, and structural ribs for max payload capacity.' },

  { name: 'Devesh Pathak', role: 'Structural Engineer', division: 'Structural', team: 'Team Garuda', image: '/team/devesh.jpg', bio: 'Engineers lightweight airframe spars and stress-resistant fuselage joints.' },
  { name: 'Dhruv Pancholi', role: 'Airframe CAD Designer', division: 'Structural', team: 'Team Garuda', image: '/team/dhruv-p.jpg', bio: 'Models parametric 3D CAD assemblies and performs structural FEA simulations.' },
  { name: 'Mithila Mane', role: 'Structural Analyst', division: 'Structural', team: 'Team Garuda', image: '/team/mithila.jpg', bio: 'Validates static structural loads and carbon-fiber reinforcement zones.' },

  { name: 'Sanskar Jagdish Gharal', role: 'Composite Fabrication Lead', division: 'Fabrication', team: 'Team Garuda', image: '/team/sanskar.jpg', bio: 'Specializes in carbon-fiber vacuum bagging, balsa cutting, and precision layup.' },
  { name: 'Sashank Upadhyay', role: 'Materials Fabrication', division: 'Fabrication', team: 'Team Garuda', image: '/team/sashank.jpg', bio: 'Executes composite mold forming, precision joining, and surface finishing.' },

  { name: 'Ved Yadav', role: 'Fixed-Wing Avionics', division: 'Avionics', team: 'Team Garuda', image: '/team/ved.jpg', bio: 'Configures flight controllers, power distribution, and fail-safe return protocols.' },
  { name: 'Sahil Patil', role: 'Propulsion Systems Engineer', division: 'Propulsion', team: 'Team Garuda', image: '/team/sahil.jpg', bio: 'Tests brushless motor thrust curves, ESC tuning, and optimal propeller pitch selection.' },

  // --- THESTRAL (DRONES) ---
  { name: 'Samuel Moses Christian', role: 'Flight Control Lead', division: 'Avionics', team: 'Team Thestral', image: '/team/samuel.jpg', bio: 'Develops autonomous flight software, GPS lock algorithms, and telemetry links.' },
  { name: 'Amay Shetty', role: 'Embedded Systems Engineer', division: 'Avionics', team: 'Team Thestral', image: '/team/amay.jpg', bio: 'Integrates real-time sensor fusion for IMUs, optical flow, and obstacle avoidance.' },
  { name: 'Chinmayee Ambrale', role: 'Avionics Hardware Tech', division: 'Avionics', team: 'Team Thestral', image: '/team/chinmayee.jpg', bio: 'Designs onboard power distribution boards and noise-filtered signal lines.' },

  { name: 'Naman Sharma', role: 'Drone Airframe Lead', division: 'Design', team: 'Team Thestral', image: '/team/naman.jpg', bio: 'Engineers custom carbon-fiber quadcopter frames for optimized strength-to-weight ratio.' },
  { name: 'Vedant Harjai', role: 'Mechanical Systems CAD', division: 'Design', team: 'Team Thestral', image: '/team/vedant.jpg', bio: 'Models custom 3D-printed vibration isolation mounts and payload drop mechanisms.' },

  { name: 'Sameera Chinchmalatpure', role: 'GCS & Telemetry Specialist', division: 'GCS', team: 'Team Thestral', image: '/team/sameera.jpg', bio: 'Configures ground station telemetry dashboards, mission planning, and live video feed.' },
  { name: 'Aditya Roman', role: 'Multirotor Systems & Pilot', division: 'Propulsion', team: 'Team Thestral', image: '/team/aditya-r.jpg', bio: 'Calibrates high-KV motor thrust setups and executes high-agility test maneuvers.' },
]

const GARUDA_DIVISIONS = ['ALL', 'Structural', 'Design & Aero Dynamics', 'Fabrication', 'Avionics', 'Propulsion']
const THESTRAL_DIVISIONS = ['ALL', 'GCS', 'Design', 'Avionics', 'Propulsion']

function initials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2)
}

function MemberPhoto({ member, className = '', imgClassName = '' }) {
  return (
    <>
      <img
        src={member.image}
        alt={member.name}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextSibling.style.display = 'flex'
        }}
        className={`w-full h-full object-cover object-center ${imgClassName}`}
      />
      <div className="hidden w-full h-full bg-gradient-to-br from-panel via-hangar to-panel2 flex-col items-center justify-center p-4 text-center absolute inset-0">
        <span className="font-display text-4xl font-extrabold text-brass">{initials(member.name)}</span>
        <span className="font-mono text-[0.6rem] text-inkdim mt-2 tracking-wide">Photo coming soon</span>
      </div>
    </>
  )
}

export default function Team() {
  const [mainTab, setMainTab] = useState('ALL')
  const [subTab, setSubTab] = useState('ALL')
  const [query, setQuery] = useState('')
  const [selectedMember, setSelectedMember] = useState(null)

  const handleMainTabChange = (tabId) => {
    setMainTab(tabId)
    setSubTab('ALL')
  }

  const filteredMembers = useMemo(() => {
    let list = TEAM_ROSTER.filter((member) => {
      if (mainTab === 'GARUDA') {
        if (member.team !== 'Team Garuda' && member.team !== 'AeroFCRIT') return false
        if (subTab !== 'ALL' && member.division !== subTab) return false
      } else if (mainTab === 'THESTRAL') {
        if (member.team !== 'Team Thestral' && member.team !== 'AeroFCRIT') return false
        if (subTab !== 'ALL' && member.division !== subTab) return false
      }
      return true
    })

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((m) =>
        [m.name, m.role, m.division, m.team].some((field) => field.toLowerCase().includes(q))
      )
    }
    return list
  }, [mainTab, subTab, query])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setSelectedMember(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <PageHero
        eyebrow="AeroFCRIT Roster"
        title="Meet the Engineers"
        description="The researchers, designers, pilots, and fabricators powering Team Garuda and Team Thestral."
      />

      <section className="py-16 md:py-24 bg-hangardeep/40 relative min-h-screen">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6">

          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 mb-10 border-b border-ink/10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-ink">Active Personnel</h2>
              <p className="text-sm text-inkdim mt-1">Fr. Conceicao Rodrigues Institute of Technology, Vashi</p>
            </div>

            <div className="flex gap-4 sm:gap-8 font-mono text-xs">
              <div className="bg-panel px-4 py-3 rounded-lg border border-ink/10">
                <span className="block text-inkdim uppercase font-medium">Total Engineers</span>
                <span className="text-xl font-bold text-brass">{TEAM_ROSTER.length} Active</span>
              </div>
              <div className="bg-panel px-4 py-3 rounded-lg border border-ink/10">
                <span className="block text-inkdim uppercase font-medium">Divisions</span>
                <span className="text-xl font-bold text-ink">Fixed-Wing &amp; Drone</span>
              </div>
            </div>
          </div>

          <div className="relative max-w-md mx-auto mb-8">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-inkdim pointer-events-none"
            >
              <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <line x1="14" y1="14" x2="18" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role, or division…"
              className="w-full bg-panel border border-ink/10 focus:border-brass/50 rounded-full pl-11 pr-10 py-3 text-sm placeholder:text-inkdim outline-none transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-ink/5 hover:bg-ink/10 text-inkdim hover:text-ink flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            {[
              { id: 'ALL', label: 'Entire Team' },
              { id: 'GARUDA', label: 'Team Garuda (Planes)' },
              { id: 'THESTRAL', label: 'Team Thestral (Drones)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleMainTabChange(tab.id)}
                className={`relative px-5 sm:px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  mainTab === tab.id ? 'text-[#171006]' : 'text-inkdim hover:text-ink bg-panel border border-ink/10 hover:border-ink/20'
                }`}
              >
                {mainTab === tab.id && (
                  <motion.div
                    layoutId="mainTabPill"
                    className="absolute inset-0 bg-brass rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {mainTab !== 'ALL' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none"
            >
              <span className="font-mono text-[0.7rem] text-inkdim uppercase font-bold mr-2 shrink-0">
                {mainTab} sub-teams:
              </span>
              {(mainTab === 'GARUDA' ? GARUDA_DIVISIONS : THESTRAL_DIVISIONS).map((division) => (
                <button
                  key={division}
                  onClick={() => setSubTab(division)}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    subTab === division
                      ? 'bg-linecyan/15 text-linecyan border border-linecyan/40'
                      : 'bg-ink/5 hover:bg-ink/10 text-inkdim hover:text-ink border border-transparent'
                  }`}
                >
                  {division === 'ALL' ? 'All divisions' : division}
                </button>
              ))}
            </motion.div>
          )}

          {filteredMembers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-inkdim">No one matches “{query}” in this division.</p>
              <button
                onClick={() => setQuery('')}
                className="mt-4 font-mono text-xs uppercase tracking-wider text-brass hover:text-ink transition-colors"
              >
                Clear search
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              <AnimatePresence mode="popLayout">
                {filteredMembers.map((member) => (
                  <motion.button
                    key={member.name}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    onClick={() => setSelectedMember(member)}
                    className="group relative text-left bg-panel rounded-2xl overflow-hidden ring-1 ring-black/25 hover:ring-brass/50 shadow-md hover:shadow-2xl hover:shadow-black/30 transition-shadow duration-300 cursor-pointer flex flex-col"
                  >
                    <motion.div layoutId={`photo-${member.name}`} className="relative w-full aspect-[4/5] overflow-hidden bg-panel2">
                      <MemberPhoto member={member} imgClassName="group-hover:scale-[1.06] transition-transform duration-500 ease-out" />

                      <div className="absolute top-3 left-3 bg-hangardeep/85 backdrop-blur-md px-2.5 py-1 rounded-md font-mono text-[0.62rem] font-bold text-brass">
                        {member.team}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-gradient-to-t from-hangardeep via-hangardeep/95 to-transparent pt-10 pb-3 px-4">
                        <p className="text-[0.72rem] leading-snug text-ink/85 line-clamp-3">{member.bio}</p>
                        <span className="mt-2 inline-flex items-center gap-1 font-mono text-[0.64rem] uppercase tracking-wider text-brass">
                          View profile
                          <svg viewBox="0 0 12 10" className="w-2.5 h-2.5" fill="none">
                            <path d="M1 5H11M11 5L7 1M11 5L7 9" stroke="currentColor" strokeWidth="1.4" />
                          </svg>
                        </span>
                      </div>
                    </motion.div>

                    <div className="p-4">
                      <h3 className="font-display font-bold text-base sm:text-lg text-ink leading-snug">
                        {member.name}
                      </h3>
                      <p className="font-mono text-[0.7rem] text-linecyan mt-1 font-medium">{member.role}</p>
                      <div className="mt-3 pt-3 border-t border-ink/10">
                        <span className="font-mono text-[0.66rem] uppercase tracking-wider text-inkdim">
                          {member.division}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-hangardeep/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-panel rounded-2xl overflow-hidden my-auto text-ink shadow-2xl ring-1 ring-black/30"
            >
              <button
                onClick={() => setSelectedMember(null)}
                aria-label="Close profile"
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-hangardeep/70 hover:bg-hangardeep text-inkdim hover:text-ink flex items-center justify-center transition-colors"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-5">
                <motion.div layoutId={`photo-${selectedMember.name}`} className="relative md:col-span-2 aspect-[4/5] md:aspect-auto bg-panel2 overflow-hidden">
                  <MemberPhoto member={selectedMember} />
                </motion.div>

                <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="font-mono text-[0.66rem] font-bold text-brass bg-brass/10 px-2.5 py-1 rounded uppercase tracking-wider">
                      {selectedMember.team}
                    </span>
                    <span className="font-mono text-[0.66rem] font-bold text-linecyan bg-linecyan/10 px-2.5 py-1 rounded uppercase tracking-wider">
                      {selectedMember.division}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl leading-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="font-mono text-sm text-linecyan font-medium mt-1">{selectedMember.role}</p>

                  <p className="text-[0.95rem] text-inkdim leading-relaxed mt-5 max-w-md">{selectedMember.bio}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}