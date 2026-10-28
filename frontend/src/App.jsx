// import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import ScrollToTop from './components/ScrollToTop'
// import Home from './pages/Home'
// import Dashboard from './pages/Dashboard'
// import Tests from './pages/Tests'
// import Quiz from './pages/Quiz'
// import Jobs from './pages/Jobs'
// import PYQ from './pages/PYQ'
// import PsuRoadmap from './pages/PsuRoadmap'
// import Resources from './pages/Resources'
// // import Login from './pages/Login'
// import { ProgressProvider } from './context/ProgressProvider'
// import { AuthProvider, useAuth } from './context/authProvider'
// import LoginPage from './pages/auth/LoginPage'
// import RegisterPage from './pages/auth/RegisterPage'
// // import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { ProtectedRoute } from './components/ProtectedRoute'

// // function ProtectedRoute({ children }) {
// //   const { isAuthenticated } = useAuth();
// //   const location = useLocation();
// //   if(!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
// //   return children;
// // }

// // function GuestRoute({ children }) {
// //   const { isAuthenticated } = useAuth();
// //   if(isAuthenticated) return <Navigate to="/dashboard" replace />;
// //   return children;
// // }

// // const Routes = () => {
// //   const { token } = useAuth();

// //   const routesForPublic = [
// //     {
// //       path: "/service",
// //       element: <div>Service Page</div>,
// //     },
// //   ];

// //   const routesForAuthenticatedOnly = [
// //     {
// //       path: "/",
// //       element: <ProtectedRoute />,
// //       children: [
// //         {
// //           path: "/",
// //           element: <div>User Home Page</div>,
// //         },
// //       ],
// //     },

// //   ];

// //   const routesForNotAuthenticatedOnly = [
// //     {
// //       path: "/",
// //       element: <div>Home Page</div>,
// //     },
// //     {
// //       path: "/login",
// //       element: <div>Login</div>,
// //     },
// //   ];

// //   const router = createBrowserRouter([
// //     ...routesForPublic,
// //     ...(!token ? routesForNotAuthenticatedOnly : []),
// //     ...routesForAuthenticatedOnly,
// //   ]);

// //   return <RouterProvider router={router} />;
// // };


// // export default Routes;

// // /** App shell: sticky navbar, routed page content, footer with contact form. */
// export default function App() {
//   return (
//     <ProgressProvider>
//     <BrowserRouter>
//     <AuthProvider>
//     <div className="flex min-h-screen flex-col">
//       <ScrollToTop />

//       {/* Soft decorative glow behind the content */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-slate-700/20 to-transparent"
//       />

//       <Navbar />

//       <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//           <Route path="/tests" element={<Tests />} />
//           <Route path="/quiz" element={<Quiz />} />
//           <Route path="/jobs" element={<Jobs />} />
//           <Route path="/pyq" element={<PYQ />} />
//           <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
//           <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

//           <Route path="/psu-roadmap" element={<PsuRoadmap />} />
//           <Route path="/resources" element={<Resources />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//     </AuthProvider>
//     </BrowserRouter>
//     </ProgressProvider>
//   )
// }



import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Tests from './pages/Tests';
import Quiz from './pages/Quiz';
import Jobs from './pages/Jobs';
import PYQ from './pages/PYQ';
import PsuRoadmap from './pages/PsuRoadmap';
import Resources from './pages/Resources';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Context
import { ProgressProvider } from './context/ProgressProvider';
import {  useAuth } from './context/authProvider';
import AuthProvider from './context/authProvider';


function ProtectedRoute({ children }) {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();
  const isUserLoggedIn = isAuthenticated ?? Boolean(token);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function GuestRoute({ children }) {
  const { isAuthenticated, token } = useAuth();
  const isUserLoggedIn = isAuthenticated ?? Boolean(token);

  if (isUserLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <ScrollToTop />

            {/* Soft decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-slate-700/20 to-transparent"
            />

            <Navbar />

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
              <Routes>
                {/* Public Routes (Accessible by anyone) */}
                <Route path="/" element={<Home />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/pyq" element={<PYQ />} />
                <Route path="/psu-roadmap" element={<PsuRoadmap />} />
                <Route path="/resources" element={<Resources />} />

                {/* Guest-Only Routes (Redirects to /dashboard if logged in) */}
                <Route
                  path="/login"
                  element={
                    <GuestRoute>
                      <LoginPage />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <GuestRoute>
                      <RegisterPage />
                    </GuestRoute>
                  }
                />

                {/* Protected Routes (Redirects to /login if not logged in) */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ProgressProvider>
  );
}