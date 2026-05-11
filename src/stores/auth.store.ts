import { defineStore } from 'pinia';
import { loginApi, registerApi } from '@/services/auth.service';
import type { LoginRequest, RegisterRequest } from '@/types/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(data: LoginRequest) {
      try {
        const res = await loginApi(data);

        this.user = res.user;
        this.token = res.token;

        localStorage.setItem('token', res.token);

        return res;
      } catch (error) {
        console.error('Store login error:', error);
        throw error;
      }
    },

    async register(data: RegisterRequest) {
      try {
        const res = await registerApi(data);
        return res;
      } catch (error) {
        console.error('Store register error:', error);
        throw error;
      }
    },

    logout() {
      this.user = null;
      this.token = null;

      localStorage.removeItem('token');
    },
  },
});