import api from './api';
import type { ProfileResponse } from '@/types/profile';

const profileService = {
  getPublicProfile() {
    return api.get<ProfileResponse>('/profile');
  },

  getAdminProfile() {
    return api.get<ProfileResponse>('/admin/profile');
  },

  updateProfile(data: FormData) {
    return api.post<ProfileResponse>('/admin/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default profileService;