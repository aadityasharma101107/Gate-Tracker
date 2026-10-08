import { useId, useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INITIAL = { name: '', email: '', topic: 'Feedback', message: '' }

/** Returns an object of { field: errorMessage } (empty when valid). */
function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Enter a valid email address.'
  if (values.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

const inputBase =
  'w-full rounded-lg bg-slate-900/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 ring-1 transition focus:outline-none focus:ring-2'

/**
 * Accessible contact / feedback form.
 * - Labels tied to inputs, errors announced via role="alert"
 * - Validation runs on blur and on submit
 * - No backend: wire handleSubmit to your API of choice
 */
export default function ContactForm() {
  const uid = useId()
  const [values, setValues] = useState(INITIAL)
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const errors = validate(values)
  const showError = (field) => touched[field] && errors[field]

  const handleChange = (e) => {
    setSent(false)
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(errors).length > 0) return
    // TODO: send `values` to your backend / email service here
    setSent(true)
    setValues(INITIAL)
    setTouched({})
  }

  const fieldClass = (field) =>
    `${inputBase} ${showError(field) ? 'ring-red-400/60 focus:ring-red-400' : 'ring-slate-100/10 focus:ring-slate-300'}`

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-1 block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(showError('name'))}
            aria-describedby={showError('name') ? `${uid}-name-err` : undefined}
            placeholder="Your name"
            className={fieldClass('name')}
          />
          {showError('name') && (
            <p id={`${uid}-name-err`} role="alert" className="mt-1 text-xs text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className="mb-1 block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(showError('email'))}
            aria-describedby={showError('email') ? `${uid}-email-err` : undefined}
            placeholder="you@example.com"
            className={fieldClass('email')}
          />
          {showError('email') && (
            <p id={`${uid}-email-err`} role="alert" className="mt-1 text-xs text-red-300">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-topic`} className="mb-1 block text-sm font-medium text-slate-300">
          Topic
        </label>
        <select
          id={`${uid}-topic`}
          name="topic"
          value={values.topic}
          onChange={handleChange}
          className={`${inputBase} ring-slate-100/10 focus:ring-slate-300`}
        >
          <option>Feedback</option>
          <option>Contact</option>
          <option>Report a bug</option>
          <option>Suggest a resource</option>
        </select>
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="mb-1 block text-sm font-medium text-slate-300">
          Message
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(showError('message'))}
          aria-describedby={showError('message') ? `${uid}-message-err` : undefined}
          placeholder="Tell us what's on your mind…"
          className={fieldClass('message')}
        />
        {showError('message') && (
          <p id={`${uid}-message-err`} role="alert" className="mt-1 text-xs text-red-300">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition duration-200 hover:bg-white hover:shadow-glow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send message
        </button>

        {/* Live region so screen readers announce success */}
        <p role="status" aria-live="polite" className="text-sm text-emerald-300">
          {sent && (
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Thanks! Your message has been recorded.
            </span>
          )}
        </p>
      </div>
    </form>
  )
}
