import axios from 'axios';
import { supabase } from '../lib/supabase';

/**
 * Story 1.9 — Axios API client that auto-attaches the Supabase JWT
 * to every request to the Laravel backend.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30_000,
});

// ── Attach Supabase JWT to every outgoing request ─────────────────────────
apiClient.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  return config;
});

// ── Handle response errors — do NOT auto-sign-out on 401 ─────────────────
// A 401 from the Laravel backend means the backend rejected the token,
// but that doesn't mean the Supabase session is invalid. Let each page
// decide how to handle the error (show a message, retry, etc.).
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;
