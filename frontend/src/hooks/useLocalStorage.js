import { useEffect, useState } from 'react'

/**
 * useState that persists to localStorage.
 * Falls back silently if storage is unavailable (private mode, SSR, etc.).
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignore write errors */
    }
  }, [key, value])

  return [value, setValue]
}
