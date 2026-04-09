import axios from 'axios';
import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor to attach the Supabase access token manually
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Helper functions for our API
export const apiProjects = {
  getProjects: () => api.get('/projects'),
  getProject: (id) => api.get(`/projects/${id}`),
  createProject: (name) => api.post('/projects', { name }),
  updateProject: (id, name) => api.put(`/projects/${id}`, { name }),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  getVersions: (id) => api.get(`/projects/${id}/versions`),
  saveVersion: (id, content, prompt) => api.post(`/projects/${id}/versions`, { content, prompt }),
  exportProject: (id) => api.get(`/projects/${id}/export`, { responseType: 'blob' }),
};

export const apiCredits = {
  getCredits: () => api.get('/credits'),
  purchaseCredits: (amount) => api.post('/credits/purchase', { amount }),
};

export const apiAuth = {
  syncProfile: () => api.post('/auth/sync'),
  getProfile: () => api.get('/auth/me'),
};

export const apiGenerate = {
  // Since generation uses Server-Sent Events, we typically use the native EventSource or fetch
  // This helper will just return the URL and headers needed for standard fetch requests for streaming.
  getGenerateConfig: async (prompt) => {
      const { data: { session } } = await supabase.auth.getSession();
      return {
          url: `${API_URL}/generate`,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.access_token}`,
              'Accept': 'text/event-stream'
          },
          body: JSON.stringify({ prompt })
      };
  },
  getIterateConfig: async (previousCode, changes) => {
      const { data: { session } } = await supabase.auth.getSession();
      return {
          url: `${API_URL}/iterate`,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.access_token}`,
              'Accept': 'text/event-stream'
          },
          body: JSON.stringify({ previous_code: previousCode, changes })
      };
  }
};
