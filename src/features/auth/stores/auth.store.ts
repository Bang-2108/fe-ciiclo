import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { loginApi, logoutApi } from '../api/auth.api';
import type { LoginResponse } from '../types/auth.type';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null);
  const token = ref<string | null>(localStorage.getItem('token') || null);
  const loading = ref<boolean>(false);
  const isAuthenticated = computed(() => !!token.value);

  const login = async (payload: { email: string; password: string }) => {
    try {
      loading.value = true;
      const response = await loginApi(payload) as unknown as LoginResponse;

      if (response && response.success && response.data) {
        token.value = response.data.token;
        user.value = response.data.user;
        localStorage.setItem('token', response.data.token);
      }

      return response;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      user.value = null;
      token.value = null;
      localStorage.removeItem('token');
    }
  };

  return { user, token, loading, isAuthenticated, login, logout };
});