// src/api/syllabus.js

import { apiFetch } from './fetchClient';

export async function fetchSyllabus() {
  const response = await apiFetch('/tracker/syllabus/', { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Failed to load syllabus (status ${response.status})`);
  }
  return response.json();
}

export async function toggleTopic(topicId) {
  const response = await apiFetch(`/tracker/topics/${topicId}/toggle/`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to toggle topic (status ${response.status})`);
  }
  return response.json();
}