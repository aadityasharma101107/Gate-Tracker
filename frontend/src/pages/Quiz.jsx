import { useState } from 'react'
import { HelpCircle, RotateCcw } from 'lucide-react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import ProgressBar from '../components/ProgressBar'
import { QUIZ_QUESTIONS } from '../data/siteData'
import { useProgress } from '../context/ProgressContext.js'

/** Quick multiple-choice quiz. Finishing it increments the Quizzes Given counter once. */
export default function Quiz() {
  const { addQuiz } = useProgress()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = QUIZ_QUESTIONS.length
  const question = QUIZ_QUESTIONS[index]
  const answered = selected !== null

  const choose = (i) => {
    if (answered) return
    setSelected(i)
    if (i === question.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (index + 1 < total) {
      setIndex(index + 1)
      setSelected(null)
    } else {
      setFinished(true)
      addQuiz() // counted exactly once, in an event handler
    }
  }

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  // Style for each option depending on the answer state
  const optionClass = (i) => {
    const base =
      'w-full rounded-lg px-4 py-3 text-left text-sm ring-1 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300'
    if (!answered) return `${base} bg-slate-900/50 text-slate-200 ring-slate-100/10 hover:bg-slate-900`
    if (i === question.answer) return `${base} bg-emerald-400/10 text-emerald-200 ring-emerald-400/60`
    if (i === selected) return `${base} bg-red-400/10 text-red-200 ring-red-400/60`
    return `${base} bg-slate-900/30 text-slate-500 ring-slate-100/5`
  }

  return (
    <div>
      <PageHeader
        icon={HelpCircle}
        title="Quiz"
        description="A short concept check. Complete all questions to add one to your quiz count."
      />

      <Card className="mx-auto max-w-2xl">
        {finished ? (
          <div className="text-center">
            <p className="text-sm text-slate-400">Quiz complete</p>
            <p className="mt-2 text-5xl font-semibold tabular-nums text-slate-100">
              {score}/{total}
            </p>
            <button
              type="button"
              onClick={restart}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white hover:shadow-glow-lg"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <div className="mb-2 flex justify-between text-xs text-slate-400">
                <span>
                  Question {index + 1} of {total}
                </span>
                <span>Score: {score}</span>
              </div>
              <ProgressBar value={((index + (answered ? 1 : 0)) / total) * 100} label="Quiz progress" />
            </div>

            <h2 className="mb-4 text-lg font-semibold text-slate-100">{question.q}</h2>

            <div className="grid gap-2">
              {question.options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={answered}
                  className={optionClass(i)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={next}
                disabled={!answered}
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {index + 1 === total ? 'Finish' : 'Next'}
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
