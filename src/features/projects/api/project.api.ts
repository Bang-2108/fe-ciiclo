import axiosInstance from '@/shared/api/axios';
import type { Project } from '../types/project.type';

export const projectApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await axiosInstance.get('/admin/projects');
    return response.data.data;
  },

  create: async (data: FormData): Promise<Project> => {
    const response = await axiosInstance.post('/admin/projects', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
  },
  update: async (id: number, data: FormData): Promise<Project> => {
    const response = await axiosInstance.post(`/admin/projects/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/projects/${id}`);
  }
};