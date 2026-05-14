import { defineStore } from 'pinia';
import { loginApi, logoutApi } from '@/services/auth.service';
import type { User, LoginRequest } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(data: LoginRequest) {
      try {
        const res = await loginApi(data);
        const { token, user } = res.data;

        if (!token) throw new Error('Token not found');
        localStorage.setItem('token', token);
        this.token = token;
        this.user = user;

        return res;
      } catch (error) {
        console.error('Store login error:', error);
        this.logout();
        throw error;
      }
    },

   async logout(redirect = true) {
  try {
    if (this.token) {
      await logoutApi();
    }
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    this.user = null;
    this.token = null;

    localStorage.removeItem('token');

    if (redirect) {
      window.location.href = '/auth/login';
    }
  }
}
  },
});