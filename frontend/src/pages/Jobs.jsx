import { Briefcase, ExternalLink } from 'lucide-react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { JOBS } from '../data/siteData'

/** PSU recruitment notifications. Sample entries: replace JOBS with a live feed. */
export default function Jobs() {
  return (
    <div>
      <PageHeader
        icon={Briefcase}
        title="Job Notifications"
        description="PSUs that recruit through GATE. Always confirm dates and eligibility on the official website."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {JOBS.map((job) => (
          <Card key={job.id} className="flex flex-col justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">{job.org}</h2>
              <p className="mt-1 text-sm text-slate-400">{job.role}</p>
              <p className="mt-4 text-xs text-slate-400">
                Last date: <span className="font-medium text-slate-200">{job.lastDate}</span>
              </p>
            </div>
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              Official website
              <ExternalLink
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Card>
        ))}
      </div>
    </div>
  )
}
