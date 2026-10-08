import { ExternalLink, Library } from 'lucide-react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { RESOURCES } from '../data/siteData'

/** Free resources in a bento layout: the first tile spans two columns on large screens. */
export default function Resources() {
  return (
    <div>
      <PageHeader
        icon={Library}
        title="Free Resources"
        description="Hand-picked sites for lectures, practice questions and notes."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r, i) => (
          <Card
            key={r.id}
            as="a"
            href={r.url}
            target="_blank"
            rel="noreferrer"
            padded={false}
            className={`group block overflow-hidden ${i === 0 ? 'lg:col-span-2' : ''}`}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={r.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
              />
              <span className="absolute left-4 top-4 rounded-full bg-slate-900/70 px-3 py-1 text-xs text-slate-200 backdrop-blur">
                {r.tag}
              </span>
            </div>
            <div className="p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-semibold text-slate-100">
                {r.title}
                <ExternalLink
                  className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </h2>
              <p className="mt-2 text-sm text-slate-400">{r.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
