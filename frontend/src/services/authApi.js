/**
 * Auth API service.
 *
 * - Set VITE_API_URL (e.g. http://localhost:5000/api) to hit your real backend.
 * - When it is not set, a mock implementation is used so the UI works out of the box.
 *
 * Expected backend contract (adjust to your API):
 *   POST /auth/login     { identifier, password }                 -> { token, user }
 *   POST /auth/register  { fullName, email, targetYear, password } -> { token, user }
 */

const API_URL = import.meta.env?.VITE_API_URL || "http://127.0.0.1:8000/api";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export class ApiError extends Error {
  constructor(message, { status = 500, fieldErrors = {} } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request(path, body) {
  let res;
  const cleanPath = path.endsWith('/') ? path : `${path}`;
  const url = `${API_URL}${cleanPath}`;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError('Unable to reach the server. Check your connection.', { status: 0 });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.message || 'Something went wrong. Please try again.', {
      status: res.status,
      fieldErrors: data.errors || {},
    });
  }
  return data;
}



// ---- Mock implementation (remove once the backend is ready) ----
async function mockLogin({ identifier, password }) {
  await sleep(1000);
  if (password === 'wrongpass') {
    throw new ApiError('Invalid credentials', { status: 401 });
  }
  return {
    token: 'mock.jwt.token',
    user: { id: 'u_1', fullName: 'GATE Aspirant', email: identifier },
  };
}

async function mockRegister({ fullName, email, targetYear }) {
  await sleep(1200);
  return {
    token: 'mock.jwt.token',
    user: { id: 'u_2', fullName, email, targetYear },
  };
}

export const authApi = {
  login: (payload) => (API_URL ? request('/login', payload) : mockLogin(payload)),
  register: (payload) => (API_URL ? request('/register', payload) : mockRegister(payload)),
};