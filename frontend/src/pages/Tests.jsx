import { CheckCircle2, Circle, ClipboardList, Clock, ListChecks } from 'lucide-react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { TESTS } from '../data/siteData'
import { useProgress } from '../context/ProgressContext.js'

/** Mock tests list. "Mark as given" feeds the Tests Given counter on the dashboard. */
export default function Tests() {
  const { tests, toggleTest } = useProgress()

  return (
    <div>
      <PageHeader
        icon={ClipboardList}
        title="Tests"
        description="Full-length mocks and sectional tests. Mark a test as given once you finish it."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TESTS.map((t) => {
          const given = tests.includes(t.id)
          return (
            <Card key={t.id} className="flex flex-col justify-between gap-5">
              <div>
                <h2 className="font-semibold text-slate-100">{t.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{t.scope}</p>
                <div className="mt-4 flex gap-4 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.questions} questions
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.minutes} min
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleTest(t.id)}
                aria-pressed={given}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 ${
                  given
                    ? 'bg-slate-200 text-slate-900 hover:bg-white'
                    : 'bg-slate-900/60 text-slate-200 ring-1 ring-slate-100/10 hover:bg-slate-900'
                }`}
              >
                {given ? (
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Circle className="h-4 w-4" aria-hidden="true" />
                )}
                {given ? 'Given' : 'Mark as given'}
              </button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
