// import { createContext, useCallback, useContext, useMemo, useState } from 'react';
// import { authApi } from '../services/authApi';

// const TOKEN_KEY = 'gate_tracker_token';
// const USER_KEY = 'gate_tracker_user';

// const AuthContext = createContext(null);

// function readStored() {
//   try {
//     const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
//     const token = storage.getItem(TOKEN_KEY);
//     const user = storage.getItem(USER_KEY);
//     return { token, user: user ? JSON.parse(user) : null };
//   } catch {
//     return { token: null, user: null };
//   }
// }

// function persist({ token, user }, remember) {
//   try {
//     // "Remember me" -> survives browser restarts; otherwise cleared when the tab closes.
//     const storage = remember ? localStorage : sessionStorage;
//     const other = remember ? sessionStorage : localStorage;
//     other.removeItem(TOKEN_KEY);
//     other.removeItem(USER_KEY);
//     storage.setItem(TOKEN_KEY, token);
//     storage.setItem(USER_KEY, JSON.stringify(user));
//   } catch {
//     /* storage unavailable (private mode) - session stays in memory only */
//   }
// }

// function clearStored() {
//   try {
//     [localStorage, sessionStorage].forEach((s) => {
//       s.removeItem(TOKEN_KEY);
//       s.removeItem(USER_KEY);
//     });
//   } catch {
//     /* ignore */
//   }
// }

// export function AuthProvider({ children }) {
//   const [session, setSession] = useState(readStored);

//   const login = useCallback(async ({ identifier, password, remember }) => {
//     const data = await authApi.login({ identifier, password });
//     persist(data, remember);
//     setSession({ token: data.token, user: data.user });
//     return data.user;
//   }, []);

//   const register = useCallback(async (payload) => {
//     const data = await authApi.register(payload);
//     persist(data, true);
//     setSession({ token: data.token, user: data.user });
//     return data.user;
//   }, []);

//   const logout = useCallback(() => {
//     clearStored();
//     setSession({ token: null, user: null });
//   }, []);

//   // const isAuthenticated = Boolean(token && user);
//   const value = useMemo(
//     () => ({
//       user: session.user,
//       token: session.token,
//       isAuthenticated: Boolean(session.token),
//       login,
//       register,
//       logout,
//     }),
//     [session, login, register, logout]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
//   return ctx;
// }