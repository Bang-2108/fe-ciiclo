import api from '@/shared/api/axios';

export const getProfileApi = async () => {
  const response = await api.get('/admin/profile');
  return response.data;
};

export const updateProfileApi = async (payload: FormData) => {
  const response = await api.post('/admin/profile', payload);
  return response.data;
};