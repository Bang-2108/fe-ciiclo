import { defineStore } from 'pinia';
import {
  getProfileApi,
  updateProfileApi,
} from '../api/profile.api';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null as any,
    loading: false,
  }),

  actions: {
    async fetchProfile() {
      try {
        this.loading = true;
        const response = await getProfileApi();
        this.profile = response.data;
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(payload: any) {
      try {
        this.loading = true;
        const response = await updateProfileApi(payload);
        this.profile = response.data;
      } finally {
        this.loading = false;
      }
    },
  },
});