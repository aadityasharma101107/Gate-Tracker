import { BarChart3, BookOpenCheck, GraduationCap, Target } from 'lucide-react';

const FEATURES = [
  { icon: BookOpenCheck, text: 'Track every subject and topic across the full GATE CS syllabus' },
  { icon: Target, text: 'Set daily goals and stay consistent with your study plan' },
  { icon: BarChart3, text: 'Analyse mock-test performance and spot weak areas early' },
];

/**
 * Split-screen auth shell.
 *  - Left (lg+): branding + feature highlights on a gradient background
 *  - Right: centered form slot (children)
 *
 * Props: title, subtitle, children (the form), footer (e.g. "Don't have an account?")
 */
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen bg-slate-50 dark:bg-slate-950 lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <GraduationCap className="h-6 w-6" />
          </span>
          <span className="text-xl font-bold tracking-tight">GATE CS Tracker</span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold leading-tight">Your all-in-one GATE CS preparation platform.</h2>
          <ul className="mt-8 space-y-5">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-indigo-100">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-indigo-200">
          &copy; {new Date().getFullYear()} GATE CS Tracker. Built for serious aspirants.
        </p>
      </aside>

      {/* Form panel */}
      <main className="relative flex items-center justify-center px-4 py-10 sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-100/60 to-transparent dark:from-indigo-500/10 lg:hidden"
        />

        <div className="relative w-full max-w-md">
          {/* Mobile brand */}
          <div className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">GATE CS Tracker</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8">
            <header className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
              {subtitle && <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
            </header>

            {children}
          </div>

          {footer && <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">{footer}</p>}
        </div>
      </main>
    </div>
  );
}