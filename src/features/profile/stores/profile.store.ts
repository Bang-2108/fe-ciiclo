import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProfileApi, updateProfileApi } from '../api/profile.api';
import type { Profile } from '../types/profile.type';

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null);
  const loading = ref<boolean>(false);

  const fetchProfile = async () => {
    try {
      loading.value = true;
      const response = await getProfileApi();
      profile.value = response.data;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (payload: FormData) => {
    try {
      loading.value = true;
      const response = await updateProfileApi(payload);
      profile.value = response.data;
    } finally {
      loading.value = false;
    }
  };

  return {
    profile,
    loading,
    fetchProfile,
    updateProfile,
  };
});