/** Accessible horizontal progress bar (value is 0-100). */
export default function ProgressBar({ value, label, className = '' }) {
  const pct = Math.min(100, Math.max(0, Math.round(value)))
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={`h-2 w-full overflow-hidden rounded-full bg-slate-900/70 ${className}`}
    >
      {/* Width is dynamic, so an inline style is the right tool here */}
      <div
        className="h-full rounded-full bg-slate-300 transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
