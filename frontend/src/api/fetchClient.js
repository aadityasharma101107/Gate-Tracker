// import axios, { mergeConfig } from 'axios';

// const api = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api',
//     headers:{
//         'Content-Type': 'application.json',
//     },
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('access_token');
//     if(token){
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export default api;   

const BASE_URL = 'http://localhost:8000/api';

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newAccessToken) {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
}

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

function getAccessToken() {
  return localStorage.getItem('access');
}

function getRefreshToken() {
  return localStorage.getItem('refresh');
}

function setTokens({ access, refresh }) {
  if (access) localStorage.setItem('access', access);
  if (refresh) localStorage.setItem('refresh', refresh);
}

function clearTokens() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}

// Called on hard logout (refresh invalid/expired). App.jsx subscribes to this.
let onAuthFailure = () => {};
export function registerAuthFailureHandler(handler) {
  onAuthFailure = handler;
}

async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    throw new Error('Refresh token invalid or expired');
  }

  const data = await response.json();
  setTokens({ access: data.access, refresh: data.refresh });
  return data.access;
}

/**
 * Core fetch wrapper.
 * @param {string} endpoint - path relative to BASE_URL, e.g. '/tracker/topics/'
 * @param {object} options - standard fetch options (method, body, headers, etc.)
 * @param {boolean} isRetry - internal flag to prevent infinite retry loops
 */
export async function apiFetch(endpoint, options = {}, isRetry = false) {
  const accessToken = getAccessToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Not a 401 -> return response as-is (caller handles ok/not-ok)
  if (response.status !== 401) {
    return response;
  }

  // Already retried once -> give up, force logout
  if (isRetry) {
    clearTokens();
    onAuthFailure();
    throw new Error('Session expired. Please log in again.');
  }

  // No refresh token at all -> force logout immediately
  if (!getRefreshToken()) {
    clearTokens();
    onAuthFailure();
    throw new Error('Session expired. Please log in again.');
  }

  // If a refresh is already in-flight, queue this request until it resolves
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh((newAccessToken) => {
        if (!newAccessToken) {
          reject(new Error('Session expired. Please log in again.'));
          return;
        }
        resolve(apiFetch(endpoint, options, true));
      });
    });
  }

  isRefreshing = true;

  try {
    const newAccessToken = await refreshAccessToken();
    isRefreshing = false;
    onRefreshed(newAccessToken);
    return apiFetch(endpoint, options, true);
  } catch  {
    isRefreshing = false;
    onRefreshed(null);
    clearTokens();
    onAuthFailure();
    throw new Error('Session expired. Please log in again.');
  }
}

export { getAccessToken, getRefreshToken, setTokens, clearTokens };
