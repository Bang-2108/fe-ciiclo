import { defineStore } from 'pinia';
import * as skillService from '@/services/skill.service';
import type { Skill, GroupedSkills, SkillRequest } from '@/types/skill';

interface SkillState {
  groupedSkills: GroupedSkills | null;
  adminSkills: Skill[];
  loading: boolean;
  error: string | null;
}

export const useSkillStore = defineStore('skill', {
  state: (): SkillState => ({
    groupedSkills: null,
    adminSkills: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalSkills: (state) => state.adminSkills.length,
  },

  actions: {
    async fetchPublicSkills() {
      this.loading = true;
      this.error = null;
      try {
        const res = await skillService.getPublicSkills();
        this.groupedSkills = res.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Không thể tải danh sách kỹ năng public.';
      } finally {
        this.loading = false;
      }
    },
    async fetchAdminSkills() {
      this.loading = true;
      this.error = null;
      try {
        const res = await skillService.getAdminSkills();
        this.adminSkills = res.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Lỗi khi tải dữ liệu Admin.';
      } finally {
        this.loading = false;
      }
    },
    async addSkill(payload: SkillRequest) {
      this.loading = true;
      try {
        const res = await skillService.createSkill(payload);
        this.adminSkills.push(res.data);
        return res;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Lỗi khi thêm kỹ năng.';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async editSkill(id: number, payload: SkillRequest) {
      this.loading = true;
      try {
        const res = await skillService.updateSkill(id, payload);
        const index = this.adminSkills.findIndex(s => s.id === id);
        if (index !== -1) {
          this.adminSkills[index] = res.data;
        }
        return res;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Lỗi khi cập nhật kỹ năng.';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async removeSkill(id: number) {
      try {
        await skillService.deleteSkill(id);
        this.adminSkills = this.adminSkills.filter(s => s.id !== id);
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Lỗi khi xóa kỹ năng.';
        throw err;
      }
    }
  }
});