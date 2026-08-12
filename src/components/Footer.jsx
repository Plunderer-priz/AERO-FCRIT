import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="pt-14 pb-10 bg-hangardeep">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 flex justify-between items-start flex-wrap gap-7">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          AERO <span className="text-brass">FCRIT</span>
        </Link>

        <div className="flex gap-10 sm:gap-14 flex-wrap">
          <div className="min-w-[110px]">
            <h5 className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim mb-3.5">
              Explore
            </h5>
            <ul className="flex flex-col gap-2">
              <li><Link to="/drones" className="text-sm hover:text-brass transition-colors">Drones</Link></li>
              <li><Link to="/aircraft" className="text-sm hover:text-brass transition-colors">Aircraft</Link></li>
              <li><Link to="/achievements" className="text-sm hover:text-brass transition-colors">Achievements</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-brass transition-colors">Blog</Link></li>
              <li><Link to="/news" className="text-sm hover:text-brass transition-colors">News</Link></li>
            </ul>
          </div>
          <div className="min-w-[110px]">
            <h5 className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim mb-3.5">
              Club
            </h5>
            <ul className="flex flex-col gap-2">
              <li><Link to="/about" className="text-sm hover:text-brass transition-colors">About</Link></li>
              <li><Link to="/team" className="text-sm hover:text-brass transition-colors">Team</Link></li>
              <li><Link to="/alumni" className="text-sm hover:text-brass transition-colors">Alumni</Link></li>
              <li><Link to="/sponsors" className="text-sm hover:text-brass transition-colors">Sponsors</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-brass transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-brass transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="min-w-[110px]">
            <h5 className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim mb-3.5">
              Follow
            </h5>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm hover:text-brass transition-colors">Instagram</a></li>
              <li><a href="#" className="text-sm hover:text-brass transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="font-mono text-[0.72rem] text-inkdim mt-10">
          © 2026 Aero FCRIT. Placeholder draft — content and imagery to be replaced with the club's own.
        </div>
      </div>
    </footer>
  )
}
