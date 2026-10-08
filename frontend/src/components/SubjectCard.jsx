import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Card from './Card'
import ProgressBar from './ProgressBar'
import { useProgress } from '../context/ProgressContext.js'

/**
 * One subject card: shows % of subtopics covered and expands to a checklist.
 * Ticking a topic updates shared progress (used by the Dashboard too).
 */
export default function SubjectCard({ subject }) {
  const { topics, toggleTopic } = useProgress()
  const [open, setOpen] = useState(false)
  const listId = useId()

  const completed = subject.topics.filter((t) => topics.includes(t.id)).length
  const percent = Math.round((completed / subject.topics.length) * 100)

  return (
    <Card padded={false}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listId}
        className="flex w-full flex-col gap-3 rounded-2xl p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 sm:p-6"
      >
        <span className="flex items-start justify-between gap-3">
          <span className="font-semibold text-slate-100">{subject.name}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </span>

        <span className="flex items-center justify-between text-xs text-slate-400">
          <span>{percent}% covered</span>
          <span>
            {completed}/{subject.topics.length} topics
          </span>
        </span>
        <ProgressBar value={percent} label={`${subject.name} syllabus covered`} />
      </button>

      {open && (
        <ul id={listId} className="grid gap-1 px-5 pb-5 sm:px-6 sm:pb-6">
          {subject.topics.map((topic) => (
            <li key={topic.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-900/40">
                <input
                  type="checkbox"
                  checked={topics.includes(topic.id)}
                  onChange={() => toggleTopic(topic.id)}
                  className="h-4 w-4 cursor-pointer rounded accent-slate-300"
                />
                <span className={topics.includes(topic.id) ? 'text-slate-500 line-through' : ''}>
                  {topic.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
