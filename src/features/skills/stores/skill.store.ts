import { defineStore } from 'pinia';

import {
  getSkillsApi,
  createSkillApi,
  updateSkillApi,
  deleteSkillApi,
} from '../api/skill.api';

export const useSkillStore = defineStore('skill', {
  state: () => ({
    skills: [] as any[],
    loading: false,
  }),

  actions: {
    async fetchSkills() {
      try {
        this.loading = true;
        const response = await getSkillsApi();
        this.skills = response.data;
      } finally {
        this.loading = false;
      }
    },

    async createSkill(payload: any) {
      const response = await createSkillApi(payload);
      this.skills.push(response.data);
    },

    async updateSkill(id: number, payload: any) {
      const response = await updateSkillApi(id, payload);
      this.skills = this.skills.map((skill) =>
        skill.id === id ? response.data : skill
      );
    },

    async deleteSkill(id: number) {
      await deleteSkillApi(id);
      this.skills = this.skills.filter(
        (skill) => skill.id !== id
      );
    },
  },
});