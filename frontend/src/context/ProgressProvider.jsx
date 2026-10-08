/**
 * Shared progress state (ticked topics, tests given, quizzes taken, PYQs solved).
 * Persisted in localStorage so the Home and Dashboard pages stay in sync.
 */
import {  useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { TOTAL_TOPICS } from '../data/siteData'
import { ProgressContext } from './ProgressContext'


// const ProgressContext = createContext(null)

// Add the id if missing, remove it if present
const toggleId = (list, id) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id]

export function ProgressProvider({ children }) {
  const [topics, setTopics] = useLocalStorage('gp:topics', [])
  const [tests, setTests] = useLocalStorage('gp:tests', [])
  const [pyqs, setPyqs] = useLocalStorage('gp:pyqs', [])
  const [quizzes, setQuizzes] = useLocalStorage('gp:quizzes', 0)

  const value = useMemo(
    () => ({
      topics,
      tests,
      pyqs,
      quizzes,
      syllabusPercent: Math.round((topics.length / TOTAL_TOPICS) * 100),
      toggleTopic: (id) => setTopics((prev) => toggleId(prev, id)),
      toggleTest: (id) => setTests((prev) => toggleId(prev, id)),
      togglePyq: (id) => setPyqs((prev) => toggleId(prev, id)),
      addQuiz: () => setQuizzes((n) => n + 1),
    }),
    [topics, tests, pyqs, quizzes, setTopics, setTests, setPyqs, setQuizzes],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}