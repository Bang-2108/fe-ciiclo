import api from '@/shared/api/axios';

export const getSkillsApi = async () => {
  const response = await api.get('/admin/skills');
  return response.data;
};

export const createSkillApi = async (payload: any) => {
  const response = await api.post('/admin/skills', payload);
  return response.data;
};

export const updateSkillApi = async (
  id: number,
  payload: any
) => {
  const response = await api.put(
    `/admin/skills/${id}`,
    payload
  );
  return response.data;
};

export const deleteSkillApi = async (id: number) => {
  const response = await api.delete(
    `/admin/skills/${id}`
  );
  return response.data;
};