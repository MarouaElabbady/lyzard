/// <reference types="vite/client" />
import axios from 'axios';

// Create a configured axios instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor to inject the JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('supabase_jwt');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401s universally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('supabase_jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
