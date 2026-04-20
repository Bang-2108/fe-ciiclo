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
      const res = await loginApi(data);
      this.user = res.data.user;
      this.token = res.data.token;
      localStorage.setItem('token', res.data.token);
    },
    async register(data: RegisterRequest) {
      await registerApi(data);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});