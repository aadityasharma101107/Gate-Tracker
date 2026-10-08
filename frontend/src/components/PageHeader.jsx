/** Consistent page title block with icon. */
export default function PageHeader({ icon: Icon, title, description }) {
  return (
    <header className="mb-8 flex items-start gap-4">
      {Icon && (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/50 text-slate-200 shadow-glow">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      )}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-slate-400 sm:text-base">{description}</p>}
      </div>
    </header>
  )
}
