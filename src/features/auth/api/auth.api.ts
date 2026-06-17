import api from '@/shared/api/axios';

export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post('/login', payload);
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post('/admin/logout');
  return response.data;
};