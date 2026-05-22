import { defineStore } from 'pinia';
import { loginApi, logoutApi } from '../api/auth.api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: localStorage.getItem('token') || null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(payload: {
      email: string;
      password: string;
    }) {
      try {
        this.loading = true;

        const response = await loginApi(payload);
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', response.data.token);

        return response;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await logoutApi();
      } finally {
        this.user = null;
        this.token = null;
        localStorage.removeItem('token');
      }
    },
  },
});