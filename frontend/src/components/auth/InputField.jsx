import { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Reusable form input.
 *
 * Props:
 *  - label, error, hint
 *  - icon:        Lucide icon component rendered on the left (e.g. Mail)
 *  - showToggle:  adds a show/hide button (only meaningful with type="password")
 *  - disabled, and any native input props (name, value, onChange, autoComplete, ...)
 */
const InputField = forwardRef(function InputField(
  { label, error, hint, icon: Icon, type = 'text', showToggle = false, disabled = false, className = '', id, ...rest },
  ref
) {
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const [visible, setVisible] = useState(false);

  const isPassword = type === 'password';
  const resolvedType = isPassword && showToggle && visible ? 'text' : type;

  const borderStyles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/30 dark:border-slate-700';

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={[
            'block w-full rounded-lg border bg-white py-2.5 text-sm text-slate-900 shadow-sm outline-none transition',
            'placeholder:text-slate-400 focus:ring-4',
            'dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
            'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60 dark:disabled:bg-slate-800',
            Icon ? 'pl-10' : 'pl-3',
            showToggle ? 'pr-11' : 'pr-3',
            borderStyles,
          ].join(' ')}
          {...rest}
        />

        {showToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            disabled={disabled}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed dark:hover:text-slate-200"
          >
            {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default InputField;