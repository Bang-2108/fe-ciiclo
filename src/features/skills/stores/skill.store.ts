import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getSkillsApi,
  createSkillApi,
  updateSkillApi,
  deleteSkillApi,
} from '../api/skill.api';
import type { Skill } from '../types/skill.type';

export const useSkillStore = defineStore('skill', () => {
  const skills = ref<Skill[]>([]);
  const loading = ref<boolean>(false);

  const fetchSkills = async () => {
    try {
      loading.value = true;
      const response = await getSkillsApi();
      skills.value = response.data;
    } finally {
      loading.value = false;
    }
  };

  const createSkill = async (payload: any) => {
    try {
      loading.value = true;
      const response = await createSkillApi(payload);
      skills.value.push(response.data);
    } finally {
      loading.value = false;
    }
  };

  const updateSkill = async (id: number, payload: any) => {
    try {
      loading.value = true;
      const response = await updateSkillApi(id, payload);
      skills.value = skills.value.map((skill) =>
        skill.id === id ? response.data : skill
      );
    } finally {
      loading.value = false;
    }
  };

  const deleteSkill = async (id: number) => {
    try {
      loading.value = true;
      await deleteSkillApi(id);
      skills.value = skills.value.filter((skill) => skill.id !== id);
    } finally {
      loading.value = false;
    }
  };

  return {
    skills,
    loading,
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
  };
});