import api from './api';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/login', data);
  return res.data; 
};

export const logoutApi = async () => {
  return await api.post('/logout');
};