import { useMemo } from 'react'
import { BarChart3, CalendarClock, ClipboardCheck, FileCheck2, HelpCircle } from 'lucide-react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import ProgressBar from '../components/ProgressBar'
import { GATE_EXAM_DATE } from '../data/siteData'
import { useProgress } from '../context/ProgressContext.js'
import { ProgressProvider } from '../context/ProgressProvider'
// import { ProgressProvider } from '../context/ProgressProvider'
import "../App.css";

/** Small stat tile: icon + label, big number underneath. */
function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-900/50 p-4 ring-1 ring-slate-100/5 transition duration-300 hover:shadow-glow-lg">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-2 text-4xl font-semibold tabular-nums text-slate-100">{value}</p>
    </div>
  )
}

/**
 * Analytical dashboard: one card containing
 *  tests given, quizzes given, PYQ solved,
 *  then a syllabus-completed progress line,
 *  then days remaining until the exam.
 */
export default function Dashboard() {
  const { tests, quizzes, pyqs, syllabusPercent } = useProgress()

  const daysLeft = useMemo(() => {
    const ms = new Date(GATE_EXAM_DATE).getTime() - Date.now()
    return Math.max(0, Math.ceil(ms / 86_400_000))
  }, [])

  return (
    <ProgressProvider>
    <div>
      <PageHeader
        icon={BarChart3}
        title="Dashboard"
        description="Your numbers update automatically as you take tests, finish quizzes and tick topics."
      />

      <Card className="mx-auto max-w-3xl">
        <h2 className="mb-5 text-lg font-semibold text-slate-100">Analytical Dashboard</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat icon={ClipboardCheck} label="Tests given" value={tests.length} />
          <Stat icon={HelpCircle} label="Quizzes given" value={quizzes} />
          <Stat icon={FileCheck2} label="PYQ solved" value={pyqs.length} />
        </div>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-300">Syllabus completed</span>
            <span className="font-medium text-slate-100">{syllabusPercent}%</span>
          </div>
          <ProgressBar value={syllabusPercent} label="Syllabus completed" />
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-xl bg-slate-900/50 p-4 ring-1 ring-slate-100/5">
          <CalendarClock className="h-8 w-8 text-slate-400" aria-hidden="true" />
          <div>
            <p className="text-sm text-slate-400">Remaining days to GATE exam</p>
            <p className="text-3xl font-semibold tabular-nums text-slate-100">{daysLeft}</p>
          </div>
        </div>
      </Card>
    </div>
    </ProgressProvider>
  )
}
