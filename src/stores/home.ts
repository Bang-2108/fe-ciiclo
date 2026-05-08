import { defineStore } from 'pinia';

import { getProfile } from '@/services/home.service';

import type { Profile } from '@/types/home';

interface State {
  profile: Profile | null;

  loading: boolean;

  error: string | null;
}

export const useProfileStore = defineStore('profile', {
  state: (): State => ({
    profile: null,

    loading: false,

    error: null
  }),

  actions: {
    async fetchProfile() {
      try {
        this.loading = true;

        this.error = null;

        this.profile = await getProfile();
      } catch (error) {
        this.error = 'Failed to fetch profile';
      } finally {
        this.loading = false;
      }
    }
  }
});