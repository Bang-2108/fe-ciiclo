import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      const isAdminRoute =
        window.location.pathname.startsWith('/admin');

      if (isAdminRoute) {
        await authStore.logout(false);

        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;