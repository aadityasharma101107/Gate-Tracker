import { Loader2 } from 'lucide-react';

/**
 * Primary action button with a built-in loading state.
 * While `loading` is true the button is disabled and shows a spinner.
 */
export default function AuthButton({
  children,
  loading = false,
  loadingText = 'Please wait...',
  disabled = false,
  type = 'submit',
  className = '',
  ...rest
  }) {

    const isDisabled = disabled || loading;

    return (
      <button
        type={type}
        disabled={isDisabled}
        aria-busy={loading}
        className={[
          'inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition',
          'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500',
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/40',
          'disabled:cursor-not-allowed disabled:opacity-60',
          className,
        ].join(' ')}
        {...rest}
      >
        {loading && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        <span>{loading ? loadingText : children}</span>
      </button>
    );
  }