// import React from 'react';
// import "tailwindcss";
// import { 
//   BookOpen, 
//   CheckCircle2, 
//   BarChart3, 
//   ArrowRight, 
//   Layers, 
//   Award, 
//   Zap, 
//   LogIn 
// } from 'lucide-react';


// export default function Home({ onOpenLogin, onOpenRegister }) {
//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
//       {/* 1. TOP NAVIGATION BAR */}
//       <nav style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '1.25rem 2rem',
//         maxWidth: '1100px',
//         margin: '0 auto',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700', fontSize: '1.25rem', color: '#1e293b' }}>
//           <div style={{ backgroundColor: '#2563eb', padding: '0.4rem', borderRadius: '8px', color: '#fff', display: 'flex' }}>
//             <BookOpen size={20} />
//           </div>
//           GATE CS Tracker
//         </div>

//         <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
//           <button
//             onClick={onOpenLogin}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.4rem',
//               padding: '0.55rem 1.1rem',
//               backgroundColor: 'transparent',
//               color: '#334155',
//               border: '1px solid #cbd5e1',
//               borderRadius: '6px',
//               fontWeight: '600',
//               fontSize: '0.9rem',
//               cursor: 'pointer',
//             }}
//           >
//             <LogIn size={16} /> Sign In
//           </button>
          
//           <button
//             onClick={onOpenRegister}
//             style={{
//               padding: '0.55rem 1.2rem',
//               backgroundColor: '#2563eb',
//               color: '#ffffff',
//               border: 'none',
//               borderRadius: '6px',
//               fontWeight: '600',
//               fontSize: '0.9rem',
//               cursor: 'pointer',
//               boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
//             }}
//           >
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* 2. HERO SECTION */}
//       <header style={{
//         maxWidth: '900px',
//         margin: '3.5rem auto 2rem auto',
//         padding: '0 1.5rem',
//         textAlign: 'center',
//       }}>
//         <div style={{
//           display: 'inline-flex',
//           alignItems: 'center',
//           gap: '0.5rem',
//           padding: '0.35rem 0.85rem',
//           backgroundColor: '#eff6ff',
//           color: '#2563eb',
//           borderRadius: '9999px',
//           fontSize: '0.85rem',
//           fontWeight: '600',
//           marginBottom: '1.5rem',
//           border: '1px solid #dbeafe',
//         }}>
//           <Zap size={15} /> Built for GATE CSE Aspirants
//         </div>

//         <h1 style={{
//           fontSize: 'clamp(2.1rem, 5vw, 3.25rem)',
//           fontWeight: '800',
//           letterSpacing: '-0.03em',
//           lineHeight: '1.2',
//           margin: '0 0 1.25rem 0',
//           color: '#0f172a',
//         }}>
//           Track Every Subject. <br />
//           <span style={{ color: '#2563eb' }}>Crack GATE with Confidence.</span>
//         </h1>

//         <p style={{
//           fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
//           color: '#475569',
//           maxWidth: '620px',
//           margin: '0 auto 2.25rem auto',
//           lineHeight: '1.6',
//         }}>
//           A syllabus checklist covering Algorithms, OS, DBMS, Networks, and Aptitude. 
//           Check topics off in real time and stay consistent till exam day.
//         </p>

//         {/* Primary Action Buttons */}
//         <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
//           <button
//             onClick={onOpenRegister}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem',
//               padding: '0.85rem 1.8rem',
//               backgroundColor: '#2563eb',
//               color: '#ffffff',
//               border: 'none',
//               borderRadius: '8px',
//               fontSize: '1.05rem',
//               fontWeight: '600',
//               cursor: 'pointer',
//               boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
//             }}
//           >
//             Start Tracking Free <ArrowRight size={18} />
//           </button>
          
//           <button
//             onClick={onOpenLogin}
//             style={{
//               padding: '0.85rem 1.8rem',
//               backgroundColor: '#ffffff',
//               color: '#334155',
//               border: '1px solid #cbd5e1',
//               borderRadius: '8px',
//               fontSize: '1.05rem',
//               fontWeight: '600',
//               cursor: 'pointer',
//             }}
//           >
//             I Already Have an Account
//           </button>
//         </div>
//       </header>

//       {/* 3. CORE HIGHLIGHT CARDS (RESPONSIVE GRID) */}
//       <section style={{
//         maxWidth: '1000px',
//         margin: '4rem auto',
//         padding: '0 1.5rem',
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
//         gap: '1.5rem',
//       }}>
//         {/* Card 1 */}
//         <div style={{
//           backgroundColor: '#ffffff',
//           padding: '1.75rem',
//           borderRadius: '12px',
//           border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
//         }}>
//           <div style={{ width: '42px', height: '42px', backgroundColor: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', marginBottom: '1rem' }}>
//             <CheckCircle2 size={24} />
//           </div>
//           <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Granular Checklists</h3>
//           <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748b', lineHeight: '1.5' }}>
//             Every subject mapped directly into sub-topics so you never lose track of what to study next.
//           </p>
//         </div>

//         {/* Card 2 */}
//         <div style={{
//           backgroundColor: '#ffffff',
//           padding: '1.75rem',
//           borderRadius: '12px',
//           border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
//         }}>
//           <div style={{ width: '42px', height: '42px', backgroundColor: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: '1rem' }}>
//             <BarChart3 size={24} />
//           </div>
//           <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Real-Time Progress</h3>
//           <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748b', lineHeight: '1.5' }}>
//             Interactive progress bars that calculate your total syllabus completion percentage instantly.
//           </p>
//         </div>

//         {/* Card 3 */}
//         <div style={{
//           backgroundColor: '#ffffff',
//           padding: '1.75rem',
//           borderRadius: '12px',
//           border: '1px solid #e2e8f0',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
//         }}>
//           <div style={{ width: '42px', height: '42px', backgroundColor: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', marginBottom: '1rem' }}>
//             <Layers size={24} />
//           </div>
//           <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Persistent Cloud Sync</h3>
//           <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748b', lineHeight: '1.5' }}>
//             Your completed topics sync with your account so you can track your preparation across any device.
//           </p>
//         </div>
//       </section>

//       {/* 4. FOOTER */}
//       <footer style={{
//         textAlign: 'center',
//         padding: '2.5rem 1.5rem',
//         borderTop: '1px solid #e2e8f0',
//         color: '#64748b',
//         fontSize: '0.875rem',
//       }}>
//         <p style={{ margin: 0 }}>GATE CS Syllabus & Progress Tracker • Designed for Exam Prep</p>
//       </footer>

//     </div>
//   );
// }



import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Sparkles } from 'lucide-react'
import Card from '../components/Card'
import SubjectCard from '../components/SubjectCard'
import { AVATARS, SUBJECTS, THUMBS } from '../data/siteData'
import { useProgress } from '../context/ProgressContext.js'
import { ProgressProvider } from '../context/ProgressProvider'

import '../App.css'



/**
 * Home: bento grid
 *  1. Hero + image tile
 *  2. GATE weightage by subject (one card)
 *  3. One card per subject with % covered and an expandable tick-list of subtopics
 */
export default function Home() {
  const { syllabusPercent } = useProgress()
  
    

  // Sort a copy so the original data order is untouched
  const byWeight = [...SUBJECTS].sort((a, b) => b.weightage - a.weightage)
  const maxWeight = byWeight[0].weightage

  return (
    <ProgressProvider>
    <div className="space-y-12">
      {/* Hero bento */}
      <section aria-labelledby="hero-title" className="grid gap-4 md:grid-cols-3">
        <Card className="flex flex-col justify-between gap-8 md:col-span-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-100/10">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Your GATE preparation hub
            </span>
            <h1 id="hero-title" className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
              Study smarter. Track every topic.
            </h1>
            <p className="mt-3 max-w-xl text-slate-400">
              See where the marks are, tick off subtopics as you finish them, and watch your progress on the
              dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition duration-200 hover:bg-white hover:shadow-glow-lg"
            >
              Open dashboard
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-900"
                    style={{ zIndex: AVATARS.length - i }}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-400">Study with fellow aspirants</span>
            </div>
          </div>
        </Card>

        <Card padded={false} className="relative min-h-48 overflow-hidden">
          <img
            src={THUMBS.hero}
            alt="Laptop with code on a desk"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
          <div className="absolute bottom-0 p-5">
            <p className="text-sm text-slate-400">Syllabus completed</p>
            <p className="text-3xl font-semibold text-slate-100">{syllabusPercent}%</p>
          </div>
        </Card>
      </section>

      {/* GATE weightage by subject */}
      <section aria-labelledby="weightage-title">
        <Card>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/50 text-slate-200">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 id="weightage-title" className="text-lg font-semibold text-slate-100">
                GATE weightage by subject
              </h2>
              <p className="text-xs text-slate-400">Approximate share of total marks (sample values)</p>
            </div>
          </div>

          <ul className="grid gap-x-10 gap-y-3 md:grid-cols-2">
            {byWeight.map((s) => (
              <li key={s.id} className="group">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{s.name}</span>
                  <span className="font-medium text-slate-100">{s.weightage}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-900/70">
                  <div
                    className="h-full rounded-full bg-slate-400 transition-colors duration-300 group-hover:bg-slate-200"
                    style={{ width: `${(s.weightage / maxWeight) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Subject cards */}
      <section aria-labelledby="subjects-title">
        <h2 id="subjects-title" className="mb-4 text-xl font-semibold text-slate-100">
          Subjects &amp; syllabus
        </h2>
        <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SUBJECTS.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>
    </div>
    </ProgressProvider>
  )
}
