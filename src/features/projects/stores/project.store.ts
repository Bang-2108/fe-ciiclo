import { defineStore } from 'pinia';
import { ref } from 'vue';
import { projectApi } from '../api/project.api';
import type { Project } from '../types/project.type';

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchProjects = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      projects.value = await projectApi.getAll();
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        'Unable to load project list';
    } finally {
      isLoading.value = false;
    }
  };

  const addProject = async (formData: FormData) => {
    isLoading.value = true;

    try {
      const newProject = await projectApi.create(formData);
      projects.value.push(newProject);
    } catch (err: any) {
      throw (
        err.response?.data?.message ||
        'Failed to add new project'
      );
    } finally {
      isLoading.value = false;
    }
  };

  const updateProject = async (
    id: number,
    formData: FormData
  ) => {
    isLoading.value = true;

    try {
      const updated = await projectApi.update(id, formData);
      const index = projects.value.findIndex(
        (p) => p.id === id
      );

      if (index !== -1) {
        projects.value[index] = updated;
      }
    } catch (err: any) {
      throw (
        err.response?.data?.message ||
        'Failed to update project'
      );
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProject = async (id: number) => {
    isLoading.value = true;

    try {
      await projectApi.delete(id);
      projects.value = projects.value.filter(
        (p) => p.id !== id
      );
    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        'Failed to delete project';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  };
});