
// import  { useState, useEffect, useCallback } from 'react';
// // import api from './api';
// import Login from './pages/Login';
// import { CheckCircle2, Circle, ChevronDown, ChevronRight, BookOpen, LogOut } from 'lucide-react';
// import Home from './pages/Home';
// import Register from './pages/Register';
// import './App.css'
// import {
//   getAccessToken,
//   clearTokens,
//   registerAuthFailureHandler,
// } from './api/fetchClient';
// import { fetchSyllabus, toggleTopic } from './api/syllabus';



// export default function App() {
//   // 1. Initial auth read directly in state (Runs ONCE on mount)
//   // const [token, setToken] = useState(() => localStorage.getItem('access_token'));
//   const [authView, setAuthView] = useState('home');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isCheckingSession, setIsCheckingSession] = useState(true);

//   const [syllabus, setSyllabus] = useState([]);
//   const [openSubjects, setOpenSubjects] = useState({});
//   const [isLoadingData, setIsLoadingData] = useState(false);
//   const [dataError, setDataError] = useState('');


//   const handleLogout = useCallback(() => {
//     clearTokens();
//     setIsAuthenticated(false);
//     setToken(null);
//     setUser(null);
//     setAuthView('login');
//     setSyllabus([]);

//   }, []);

//   useEffect(() => {
//     const existingAccess = getAccessToken();
//     if(existingAccess){
//       setToken(existingAccess);
//       setIsAuthenticated(true);
//     }
//     setIsCheckingSession(false);

//     registerAuthFailureHandler(handleLogout);

//   }, [handleLogout]);

//   // 3. Mount Effect: Runs ONCE per page reload
//   // useEffect(() => {
//   //   const isMountedRef = { current: true };
  
//   //   const savedToken = localStorage.getItem('access_token');
//   //   if (savedToken) {
//   //     (async () => {
//   //       setLoading(true);
//   //       await loadData(isMountedRef);
//   //     })();
//   //   }

//   useEffect(() => {
//     if (!isAuthenticated) return ;

//     let isMounted = true;
//     setIsLoadingData(true);
//     setDataError('');

//     fetchSyllabus()
//       .then((data) => {
//         if (isMounted) setSyllabus(Array.isArray(data) ? data : []);

//       })
//       .catch((err) => {
//         if (isMounted) setDataError(err.message || 'Failed to load syllabus. ');

//       })
//       .finally(() => {
//         if (isMounted) setIsLoadingData(false);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [isAuthenticated]);

//   if(!token){
//     if(authView === 'login'){
//       return <Login onLoginSuccess={() => setToken(localStorage.getItem('access_token'))} onSwitchToRegister={() => setAuthView('register')} />;
//     }
//     if(authView === 'register'){
//       return <Register onRegisterSuccess={() => setToken(localStorage.getItem('access_token'))} onSwitchToLogin={() => setAuthView('login')} />;
//     }
//     return <Home onOpenLogin={() => setAuthView('login')} onOpenRegister={() => setAuthView('register')} />;
//   }
  

 



//   function handleLoginSuccess({ username, email, userId, access }) {
//     setUser({ username, email, userId });
//     setToken(access);
//     setIsAuthenticated(true);
//   }
//   function handleRegisterSuccess({ username, email, userId, access }) {
//     setUser({ username, email, userId });
//     setToken(access);
//     setIsAuthenticated(true);
//   }

//   // 2. Fetcher — accepts a mounted-ref check so it never sets state after unmount
//   // const loadData = async (isMountedRef) => {
//   //   try {
//   //     const response = await api.get('/syllabus/');
//   //     if (!isMountedRef.current) return;
//   //     setSyllabus(Array.isArray(response.data) ? response.data : []);
//   //   } catch (err) {
//   //     console.error('Error loading syllabus:', err);
//   //     if (err.response?.status === 401) {
//   //       handleLogout();
//   //     }
//   //   } finally {
//   //     if (isMountedRef.current) setLoading(false);
//   //   }
//   // };


//   //   return () => {
//   //     isMountedRef.current = false;
//   //   };
//   // }, []); // Empty dependency array ensures it never loops

//   // 4. Called only when the Login form is submitted successfully
//   // const handleLoginSuccess = () => {
//   //   const savedToken = localStorage.getItem('access_token');
//   //   setToken(savedToken);
//   //   setLoading(true);
//   //   loadData({ current: true });
//   // };


//   const toggleSubject = (subjectId) => {
//     setOpenSubjects((prev) => ({
//       ...prev,
//       [subjectId]: !prev[subjectId],
//     }));
//   };

//   async function handleToggleTopic(topicId) {
//     setSyllabus((prev) =>
//       prev.map((subject) => ({
//         ...subject,
//         topics: (subject.topics || []).map((t) =>
//           t.id === topicId ? { ...t, is_completed: !t.is_completed } : t
//         ),
//       }))
//     );

//     try {
//       await toggleTopic(topicId);
//     } catch (err) {
//       try {
//         const fresh = await fetchSyllabus();
//         setSyllabus(Array.isArray(fresh) ? fresh : []);
//       } catch {
//         setDataError('Failed to sync topic state. Please refresh.');
//       }
      
//     }
//   };

//   if (isCheckingSession) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <p className="text-slate-400 text-sm">Loading...</p>
//       </div>
//     );
//   }

//   // If no token exists, return Login screen directly
//   // if (!token) {
//   //   return <Login onLoginSuccess={handleLoginSuccess} />;
//   // }

//   if (!isAuthenticated) {
//     if (authView === 'login') {
//       return <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setAuthView('register')} />;
//     }
//     if (authView === 'register') {
//       return <Register onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={() => setAuthView('login')} />;
//     }
//     return <Home onOpenLogin={() => setAuthView('login')} onOpenRegister={() => setAuthView('register')} />;
//   }

//   // if (loading && syllabus.length === 0) {
//   //   return (
//   //     <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
//   //       Loading GATE Tracker...
//   //     </div>
//   //   );
//   // }

//   const allTopics = syllabus.flatMap((s) => s.topics || []);
//   const completedTopics = allTopics.filter((t) => t.is_completed).length;
//   const totalTopics = allTopics.length;
//   const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
//       <header style={{ marginBottom: '2rem' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
//             <BookOpen /> GATE CS Tracker
//           </h1>
//           <button
//             onClick={handleLogout}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.25rem',
//               padding: '0.4rem 0.8rem',
//               background: '#f3f4f6',
//               border: '1px solid #d1d5db',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             <LogOut size={16} /> Logout
//           </button>
//         </div>

//         {/* Progress Bar */}
//         <div style={{ marginTop: '1.5rem' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
//             <span><strong>Overall Progress:</strong> {progressPercent}%</span>
//             <span>{completedTopics} / {totalTopics} Completed</span>
//           </div>
//           <div style={{ width: '100%', height: '10px', backgroundColor: '#e5e7eb', borderRadius: '5px' }}>
//             <div
//               style={{
//                 width: `${progressPercent}%`,
//                 height: '100%',
//                 backgroundColor: '#2563eb',
//                 borderRadius: '5px',
//                 transition: 'width 0.3s ease',
//               }}
//             />
//           </div>
//         </div>
//       </header>

//       {/* Accordion */}
//       <main>
//         {syllabus.map((subject) => {
//           const isOpen = openSubjects[subject.id];
//           const topics = subject.topics || [];
//           const subCompleted = topics.filter((t) => t.is_completed).length;
//           const subTotal = topics.length;

//           return (
//             <div
//               key={subject.id}
//               style={{
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '8px',
//                 marginBottom: '1rem',
//                 overflow: 'hidden',
//               }}
//             >
//               <button
//                 onClick={() => toggleSubject(subject.id)}
//                 style={{
//                   width: '100%',
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   padding: '1rem',
//                   backgroundColor: '#f9fafb',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: '1rem',
//                   fontWeight: '600',
//                 }}
//               >
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                   {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//                   {subject.name}
//                 </div>
//                 <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
//                   {subCompleted}/{subTotal}
//                 </span>
//               </button>

//               {isOpen && (
//                 <ul style={{ listStyle: 'none', padding: '0 1rem', margin: 0 }}>
//                   {topics.map((topic) => (
//                     <li
//                       key={topic.id}
//                       onClick={() => handleToggleTopic(topic.id)}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '0.75rem',
//                         padding: '0.75rem 0',
//                         borderBottom: '1px solid #f3f4f6',
//                         cursor: 'pointer',
//                       }}
//                     >
//                       {topic.is_completed ? (
//                         <CheckCircle2 color="#16a34a" size={20} />
//                       ) : (
//                         <Circle color="#9ca3af" size={20} />
//                       )}
//                       <span
//                         style={{
//                           textDecoration: topic.is_completed ? 'line-through' : 'none',
//                           color: topic.is_completed ? '#9ca3af' : '#111827',
//                         }}
//                       >
//                         {topic.name}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </main>
//     </div>
//   );
// }



import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Tests from './pages/Tests'
import Quiz from './pages/Quiz'
import Jobs from './pages/Jobs'
import PYQ from './pages/PYQ'
import PsuRoadmap from './pages/PsuRoadmap'
import Resources from './pages/Resources'
// import Login from './pages/Login'
import { ProgressProvider } from './context/ProgressProvider'


/** App shell: sticky navbar, routed page content, footer with contact form. */
export default function App() {
  return (
    <ProgressProvider>
    <BrowserRouter>
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />

      {/* Soft decorative glow behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-slate-700/20 to-transparent"
      />

      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/pyq" element={<PYQ />} />
          <Route path="/psu-roadmap" element={<PsuRoadmap />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
    </BrowserRouter>
    </ProgressProvider>
  )
}
