import { Route } from 'lucide-react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { ROADMAP } from '../data/siteData'

/** Vertical timeline for the GATE → PSU journey. */
export default function PsuRoadmap() {
  return (
    <div>
      <PageHeader
        icon={Route}
        title="PSU Roadmap"
        description="From fundamentals to the offer letter: the steps most aspirants follow."
      />

      <ol className="relative mx-auto max-w-3xl space-y-4 border-l border-slate-100/10 pl-8">
        {ROADMAP.map(({ title, text, icon: Icon }, i) => (
          <li key={title} className="relative">
            {/* Timeline marker */}
            <span className="absolute -left-12 grid h-8 w-8 place-items-center rounded-full bg-accent text-slate-100 shadow-glow ring-4 ring-slate-900">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <Card>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Step {i + 1}</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-100">{title}</h2>
              <p className="mt-2 text-sm text-slate-400">{text}</p>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  )
}
