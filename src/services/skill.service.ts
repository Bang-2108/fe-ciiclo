import api from './api';
import type { ApiResponse } from '@/types/api';
import type { Skill, GroupedSkills, SkillRequest } from '@/types/skill';

export const getPublicSkills = async (): Promise<ApiResponse<GroupedSkills>> => {
  const res = await api.get<ApiResponse<GroupedSkills>>('/skills');
  return res.data;
};

export const getAdminSkills = async (): Promise<ApiResponse<Skill[]>> => {
  const res = await api.get<ApiResponse<Skill[]>>('/admin/skills');
  return res.data;
};

export const createSkill = async (data: SkillRequest): Promise<ApiResponse<Skill>> => {
  const res = await api.post<ApiResponse<Skill>>('/admin/skills', data);
  return res.data;
};

export const updateSkill = async (id: number, data: SkillRequest): Promise<ApiResponse<Skill>> => {
  const res = await api.put<ApiResponse<Skill>>(`/admin/skills/${id}`, data);
  return res.data;
};

export const deleteSkill = async (id: number): Promise<ApiResponse<null>> => {
  const res = await api.delete<ApiResponse<null>>(`/admin/skills/${id}`);
  return res.data;
};