/**
 * Central place for all site content.
 * Edit this file to change subjects, tests, jobs, resources, etc. without touching components.
 */
import {
  Home,
  LayoutDashboard,
  ClipboardList,
  HelpCircle,
  Briefcase,
  FileText,
  Route,
  Library,
  BookOpen,
  Target,
  UserPlus,
  Send,
  Users,
  BadgeCheck,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Exam date (PLACEHOLDER: replace with the official GATE date)         */
/* ------------------------------------------------------------------ */
export const GATE_EXAM_DATE = '2027-02-06T09:00:00+05:30'

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */
export const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tests', label: 'Tests', icon: ClipboardList },
  { to: '/quiz', label: 'Quiz', icon: HelpCircle },
  { to: '/jobs', label: 'Job Notifications', icon: Briefcase },
  { to: '/pyq', label: 'PYQ', icon: FileText },
  { to: '/psu-roadmap', label: 'PSU Roadmap', icon: Route },
  { to: '/resources', label: 'Free Resources', icon: Library },
]

/* ------------------------------------------------------------------ */
/* Unsplash placeholders                                                */
/* ------------------------------------------------------------------ */
const unsplash = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const AVATARS = [
  unsplash('photo-1535713875002-d1d0cf377fde', 120),
  unsplash('photo-1494790108377-be9c29b29330', 120),
  unsplash('photo-1507003211169-0a1dd7228f2d', 120),
]

export const THUMBS = {
  hero: unsplash('photo-1517694712202-14dd9538aa97', 900),
  books: unsplash('photo-1456513080510-7bf3a84b82f1', 700),
  learning: unsplash('photo-1501504905252-473c47e087f8', 700),
}

/* ------------------------------------------------------------------ */
/* Syllabus: weightage (approximate, % of total marks) + subtopics      */
/* Replace with your own branch / paper. Weightages are placeholders.   */
/* ------------------------------------------------------------------ */
const subject = (id, name, weightage, topics) => ({
  id,
  name,
  weightage,
  topics: topics.map((t, i) => ({ id: `${id}-${i}`, name: t })),
})

export const SUBJECTS = [
  subject('ga', 'General Aptitude', 15, [
    'Verbal Ability',
    'Numerical Ability',
    'Data Interpretation',
    'Analytical Reasoning',
  ]),
  subject('em', 'Engineering Mathematics', 13, [
    'Discrete Mathematics',
    'Linear Algebra',
    'Calculus',
    'Probability & Statistics',
  ]),
  subject('dl', 'Digital Logic', 6, [
    'Boolean Algebra',
    'Combinational Circuits',
    'Sequential Circuits',
    'Number Representation',
  ]),
  subject('coa', 'Computer Organization', 8, [
    'Machine Instructions',
    'Pipelining',
    'Cache & Memory',
    'I/O Interface',
  ]),
  subject('pds', 'Programming & Data Structures', 10, [
    'C Programming',
    'Recursion',
    'Arrays & Linked Lists',
    'Trees & Graphs',
  ]),
  subject('algo', 'Algorithms', 9, [
    'Asymptotic Analysis',
    'Divide & Conquer',
    'Dynamic Programming',
    'Graph Algorithms',
  ]),
  subject('toc', 'Theory of Computation', 7, [
    'Finite Automata',
    'Regular Languages',
    'Context-Free Languages',
    'Turing Machines',
  ]),
  subject('cd', 'Compiler Design', 6, [
    'Lexical Analysis',
    'Parsing',
    'Syntax-Directed Translation',
    'Code Optimization',
  ]),
  subject('os', 'Operating Systems', 8, [
    'Process Scheduling',
    'Synchronization',
    'Deadlocks',
    'Memory Management',
  ]),
  subject('db', 'Databases', 8, [
    'ER Model',
    'Relational Algebra & SQL',
    'Normalization',
    'Transactions & Indexing',
  ]),
  subject('cn', 'Computer Networks', 10, [
    'OSI & TCP/IP',
    'Routing',
    'Transport Layer',
    'Application Protocols',
  ]),
]

export const TOTAL_TOPICS = SUBJECTS.reduce((n, s) => n + s.topics.length, 0)

/* ------------------------------------------------------------------ */
/* Mock tests                                                           */
/* ------------------------------------------------------------------ */
export const TESTS = [
  { id: 't1', title: 'Full-Length Mock 1', scope: 'Full syllabus', questions: 65, minutes: 180 },
  { id: 't2', title: 'Full-Length Mock 2', scope: 'Full syllabus', questions: 65, minutes: 180 },
  { id: 't3', title: 'Operating Systems Sectional', scope: 'Operating Systems', questions: 25, minutes: 60 },
  { id: 't4', title: 'Algorithms Sectional', scope: 'Algorithms', questions: 25, minutes: 60 },
  { id: 't5', title: 'Databases Sectional', scope: 'Databases', questions: 25, minutes: 60 },
  { id: 't6', title: 'Aptitude & Maths Speed Test', scope: 'GA + Engg. Maths', questions: 30, minutes: 45 },
]

/* ------------------------------------------------------------------ */
/* Quiz questions (answer = index into options)                         */
/* ------------------------------------------------------------------ */
export const QUIZ_QUESTIONS = [
  {
    q: 'What is the worst-case time complexity of binary search on a sorted array of n elements?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    answer: 1,
  },
  {
    q: 'Which data structure follows the LIFO principle?',
    options: ['Queue', 'Stack', 'Heap', 'Graph'],
    answer: 1,
  },
  {
    q: 'Which normal form removes transitive dependencies?',
    options: ['1NF', '2NF', '3NF', 'BCNF only'],
    answer: 2,
  },
  {
    q: 'Which of these is a necessary condition for deadlock?',
    options: ['Preemption', 'Hold and wait', 'Aging', 'Paging'],
    answer: 1,
  },
  {
    q: 'Which OSI layer is responsible for routing packets between networks?',
    options: ['Data Link', 'Transport', 'Network', 'Session'],
    answer: 2,
  },
  {
    q: 'Which of the following is NOT a phase of a compiler?',
    options: ['Lexical analysis', 'Parsing', 'Page replacement', 'Code generation'],
    answer: 2,
  },
]

/* ------------------------------------------------------------------ */
/* Job notifications (SAMPLE DATA: replace with a live feed / API)      */
/* ------------------------------------------------------------------ */
export const JOBS = [
  { id: 'j1', org: 'ONGC', role: 'Graduate Trainee via GATE', lastDate: 'TBA', url: 'https://www.ongcindia.com' },
  { id: 'j2', org: 'NTPC', role: 'Engineering Executive Trainee', lastDate: 'TBA', url: 'https://www.ntpc.co.in' },
  { id: 'j3', org: 'IOCL', role: 'Graduate Engineer Trainee', lastDate: 'TBA', url: 'https://iocl.com' },
  { id: 'j4', org: 'BHEL', role: 'Engineer Trainee', lastDate: 'TBA', url: 'https://www.bhel.com' },
  { id: 'j5', org: 'Power Grid', role: 'Executive Trainee', lastDate: 'TBA', url: 'https://www.powergrid.in' },
  { id: 'j6', org: 'GAIL', role: 'Executive Trainee', lastDate: 'TBA', url: 'https://gailonline.com' },
  { id: 'j7', org: 'SAIL', role: 'Management Trainee (Technical)', lastDate: 'TBA', url: 'https://sail.co.in' },
  { id: 'j8', org: 'Coal India', role: 'Management Trainee', lastDate: 'TBA', url: 'https://www.coalindia.in' },
]

/* ------------------------------------------------------------------ */
/* Previous-year question papers (placeholders)                         */
/* ------------------------------------------------------------------ */
export const PYQS = [2025, 2024, 2023, 2022, 2021, 2020].map((year) => ({
  id: `pyq-${year}`,
  year,
  title: `GATE ${year} Paper`,
  questions: 65,
}))

/* ------------------------------------------------------------------ */
/* PSU roadmap                                                          */
/* ------------------------------------------------------------------ */
export const ROADMAP = [
  {
    title: 'Build your fundamentals',
    text: 'Finish core subjects and keep short notes. Strong basics matter more than speed early on.',
    icon: BookOpen,
  },
  {
    title: 'Prepare for GATE',
    text: 'Follow the syllabus tracker, take mock tests, and solve previous-year questions regularly.',
    icon: Target,
  },
  {
    title: 'Register on PSU portals',
    text: 'Keep documents ready and follow official PSU websites for recruitment notifications.',
    icon: UserPlus,
  },
  {
    title: 'Apply when notified',
    text: 'Fill forms carefully before the last date. Many PSUs shortlist on GATE score.',
    icon: Send,
  },
  {
    title: 'GD / Interview rounds',
    text: 'Prepare technical fundamentals, current affairs, and communication skills.',
    icon: Users,
  },
  {
    title: 'Document verification & offer',
    text: 'Verify certificates, complete medicals, and accept the offer.',
    icon: BadgeCheck,
  },
]

/* ------------------------------------------------------------------ */
/* Free resources                                                       */
/* ------------------------------------------------------------------ */
export const RESOURCES = [
  {
    id: 'r1',
    title: 'NPTEL Video Lectures',
    text: 'Free university-level video courses across every GATE subject.',
    tag: 'Video',
    url: 'https://nptel.ac.in',
    img: THUMBS.learning,
  },
  {
    id: 'r2',
    title: 'GATE Overflow',
    text: 'Community-curated solutions for previous-year questions.',
    tag: 'PYQ',
    url: 'https://gateoverflow.in',
    img: THUMBS.books,
  },
  {
    id: 'r3',
    title: 'GeeksforGeeks',
    text: 'Concept articles and practice problems for core CS topics.',
    tag: 'Articles',
    url: 'https://www.geeksforgeeks.org',
    img: THUMBS.hero,
  },
  {
    id: 'r4',
    title: 'Open Textbooks',
    text: 'Free, legal textbooks and lecture notes shared by universities.',
    tag: 'Books',
    url: 'https://openstax.org',
    img: THUMBS.books,
  },
]
