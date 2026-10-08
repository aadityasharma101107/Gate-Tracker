import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { GraduationCap, Mail, Menu, X } from 'lucide-react'
import { AVATARS, NAV_LINKS } from '../data/siteData'

/**
 * Sticky, blurred navbar.
 * - Full link row from the xl breakpoint up
 * - Hamburger menu below xl (closes on route change, Escape, or link click)
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close with the Escape key
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const linkClass = ({ isActive }) =>
    `rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-accent/60 text-slate-100'
        : 'text-slate-400 hover:bg-accent/30 hover:text-slate-100'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/5 bg-slate-900/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-2 text-slate-100">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/60 shadow-glow transition duration-300 group-hover:shadow-glow-lg">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">GatePrep</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={linkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-lg bg-accent/50 px-3 py-2 text-sm font-medium text-slate-100 transition duration-200 hover:bg-accent/80 hover:shadow-glow sm:inline-flex"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact
          </a>

          <img
            src={AVATARS[0]}
            alt="Your profile"
            className="hidden h-9 w-9 rounded-full object-cover ring-2 ring-accent sm:block"
            loading="lazy"
          />

          {/* Hamburger button (below xl) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-300 transition hover:bg-accent/40 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 xl:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div id="mobile-menu" className="border-t border-slate-100/5 bg-slate-900/95 xl:hidden">
          <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:grid-cols-2 sm:px-6">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent/60 text-slate-100'
                        : 'text-slate-300 hover:bg-accent/30 hover:text-slate-100'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-accent/30 hover:text-slate-100"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact / Feedback
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
