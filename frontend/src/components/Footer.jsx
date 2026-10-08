import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import Card from './Card'
import ContactForm from './ContactForm'
import { NAV_LINKS } from '../data/siteData'

/** Footer with quick links and the Contact us / Feedback form (anchor: #contact). */
export default function Footer() {
  return (
    <footer id="contact" className="mt-16 border-t border-slate-100/5 bg-slate-900/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-slate-100">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/60">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-tight">GatePrep</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-slate-400">
            Track your syllabus, practice with tests and quizzes, and plan your path to a PSU career.
            Have an idea or found a bug? Send us a note.
          </p>

          <nav aria-label="Footer" className="mt-6">
            <ul className="grid grid-cols-2 gap-2 text-sm sm:max-w-sm">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 transition-colors hover:text-slate-100">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Card>
          <h2 className="mb-1 text-xl font-semibold text-slate-100">Contact us / Feedback</h2>
          <p className="mb-5 text-sm text-slate-400">We read every message.</p>
          <ContactForm />
        </Card>
      </div>

      <div className="border-t border-slate-100/5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} GatePrep. All rights reserved.
      </div>
    </footer>
  )
}
