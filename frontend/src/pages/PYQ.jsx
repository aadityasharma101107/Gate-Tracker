import { CheckCircle2, Circle, FileText } from 'lucide-react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { PYQS } from '../data/siteData'
import { useProgress } from '../context/ProgressContext.js'

/** Previous-year papers. Marking one as solved feeds the PYQ Solved counter. */
export default function PYQ() {
  const { pyqs, togglePyq } = useProgress()

  return (
    <div>
      <PageHeader
        icon={FileText}
        title="Previous Year Questions"
        description="Solve papers year by year and mark them done. Link each row to your own PDF or solution source."
      />

      <ul className="grid gap-3">
        {PYQS.map((p) => {
          const solved = pyqs.includes(p.id)
          return (
            <li key={p.id}>
              <Card className="flex items-center justify-between gap-4 py-4 sm:py-4">
                <div>
                  <h2 className="font-semibold text-slate-100">{p.title}</h2>
                  <p className="text-sm text-slate-400">{p.questions} questions</p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePyq(p.id)}
                  aria-pressed={solved}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 ${
                    solved
                      ? 'bg-slate-200 text-slate-900 hover:bg-white'
                      : 'bg-slate-900/60 text-slate-200 ring-1 ring-slate-100/10 hover:bg-slate-900'
                  }`}
                >
                  {solved ? (
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Circle className="h-4 w-4" aria-hidden="true" />
                  )}
                  {solved ? 'Solved' : 'Mark solved'}
                </button>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
