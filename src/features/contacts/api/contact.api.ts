import api from '@/shared/api/axios';
export const contactApi = {
  getAll: async () => {
    const response = await api.get('/admin/contacts');
    return response.data.data;
  },
  markAsRead: async (id: number) => {
    const response = await api.patch(`/admin/contacts/${id}/read`);
    return response.data.data;
  },
  delete: async (id: number) => {
    await api.delete(`/admin/contacts/${id}`);
  }
};