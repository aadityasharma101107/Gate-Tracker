// src/api/auth.js

const BASE_URL = 'http://localhost:8000/api';

export async function loginRequest(username, password) {
  const response = await fetch(`${BASE_URL}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data.detail || 'Invalid username or password. Please try again.';
    throw new Error(message);
  }

  return data; // { access, refresh, username, email, user_id }
}