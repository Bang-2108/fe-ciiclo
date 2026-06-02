import axiosInstance from '@/shared/api/axios';

export const contactApi = {
  getAll: async () => {
    const response = await axiosInstance.get('/admin/contacts');
    return response.data.data;
  },
  markAsRead: async (id: number) => {
    const response = await axiosInstance.patch(`/admin/contacts/${id}/read`);
    return response.data.data;
  },
  delete: async (id: number) => {
    await axiosInstance.delete(`/admin/contacts/${id}`);
  }
};