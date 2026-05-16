import { defineStore } from 'pinia';
import { ref } from 'vue';
import profileService from '@/services/profile.service';
import type { Profile } from '@/types/profile';

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPublicProfile = async () => {
    loading.value = true;
    try {
      const res = await profileService.getPublicProfile();
      profile.value = res.data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch profile';
    } finally {
      loading.value = false;
    }
  };

  const fetchAdminProfile = async () => {
    loading.value = true;
    try {
      const res = await profileService.getAdminProfile();
      profile.value = res.data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch admin profile';
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (formData: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await profileService.updateProfile(formData);
      profile.value = res.data.data;
      return { success: true, message: res.data.message };
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Update failed';
      return { success: false, errors: err.response?.data?.errors };
    } finally {
      loading.value = false;
    }
  };

  return {
    profile,
    loading,
    error,
    fetchPublicProfile,
    fetchAdminProfile,
    updateProfile
  };
});