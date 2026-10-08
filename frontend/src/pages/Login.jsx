import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Sparkles } from 'lucide-react'
import Card from '../components/Card'
import SubjectCard from '../components/SubjectCard'
import { AVATARS, SUBJECTS, THUMBS } from '../data/siteData'
import { useProgress } from '../context/ProgressContext'
// import { ProgressProvider } from '../context/ProgressProvider'
/**
 * Home: bento grid
 *  1. Hero + image tile
 *  2. GATE weightage by subject (one card)
 *  3. One card per subject with % covered and an expandable tick-list of subtopics
 */
export default function Home() {
  const { syllabusPercent } = useProgress()

  // Sort a copy so the original data order is untouched
  const byWeight = [...SUBJECTS].sort((a, b) => b.weightage - a.weightage)
  const maxWeight = byWeight[0].weightage

  return (
    <div className="space-y-12">
      {/* Hero bento */}
      <section aria-labelledby="hero-title" className="grid gap-4 md:grid-cols-3">
        <Card className="flex flex-col justify-between gap-8 md:col-span-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-100/10">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Your GATE preparation hub
            </span>
            <h1 id="hero-title" className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
              Study smarter. Track every topic.
            </h1>
            <p className="mt-3 max-w-xl text-slate-400">
              See where the marks are, tick off subtopics as you finish them, and watch your progress on the
              dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition duration-200 hover:bg-white hover:shadow-glow-lg"
            >
              Open dashboard
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-900"
                    style={{ zIndex: AVATARS.length - i }}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-400">Study with fellow aspirants</span>
            </div>
          </div>
        </Card>

        <Card padded={false} className="relative min-h-48 overflow-hidden">
          <img
            src={THUMBS.hero}
            alt="Laptop with code on a desk"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
          <div className="absolute bottom-0 p-5">
            <p className="text-sm text-slate-400">Syllabus completed</p>
            <p className="text-3xl font-semibold text-slate-100">{syllabusPercent}%</p>
          </div>
        </Card>
      </section>

      {/* GATE weightage by subject */}
      <section aria-labelledby="weightage-title">
        <Card>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/50 text-slate-200">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 id="weightage-title" className="text-lg font-semibold text-slate-100">
                GATE weightage by subject
              </h2>
              <p className="text-xs text-slate-400">Approximate share of total marks (sample values)</p>
            </div>
          </div>

          <ul className="grid gap-x-10 gap-y-3 md:grid-cols-2">
            {byWeight.map((s) => (
              <li key={s.id} className="group">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{s.name}</span>
                  <span className="font-medium text-slate-100">{s.weightage}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-900/70">
                  <div
                    className="h-full rounded-full bg-slate-400 transition-colors duration-300 group-hover:bg-slate-200"
                    style={{ width: `${(s.weightage / maxWeight) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Subject cards */}
      <section aria-labelledby="subjects-title">
        <h2 id="subjects-title" className="mb-4 text-xl font-semibold text-slate-100">
          Subjects &amp; syllabus
        </h2>
        <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SUBJECTS.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>
    </div>
  )
}
