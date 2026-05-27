<template>
  <div class="p-6 text-white min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Projects Management</h1>
        <p class="text-sm text-gray-400">
          Manage your personal products and project portfolio
        </p>
      </div>

      <button
        @click="openModal()"
        class="bg-pink-500 hover:bg-pink-600 text-black font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
      >
        <i class="bi bi-plus-circle"></i> Add New Project
      </button>
    </div>

    <div
      v-if="projectStore.isLoading && !projectStore.projects.length"
      class="text-center py-10"
    >
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"
      ></div>
    </div>

    <div
      v-else
      class="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-xl"
    >
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="bg-white/5 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider"
          >
            <th class="p-4">Project Title</th>
            <th class="p-4">Tech Stack</th>
            <th class="p-4">Links</th>
            <th class="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="project in projectStore.projects"
            :key="project.id"
            class="border-b border-white/5 hover:bg-white/5 transition-colors"
          >
            <td class="p-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden"
                >
                  <img
                    v-if="project.image"
                    :src="project.image"
                    class="w-full h-full object-cover"
                  />
                  <i
                    v-else
                    class="bi bi-folder-fill text-xl text-gray-500"
                  ></i>
                </div>

                <div>
                  <div class="font-semibold text-white">
                    {{ project.title }}
                  </div>

                  <div class="text-xs text-gray-400 max-w-xs truncate">
                    {{ project.description }}
                  </div>
                </div>
              </div>
            </td>

            <td class="p-4">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tech in project.tech_stack"
                  :key="tech"
                  class="bg-pink-500/10 text-pink-400 text-[10px] font-medium px-2 py-0.5 rounded-full"
                >
                  {{ tech }}
                </span>
              </div>
            </td>

            <td class="p-4 text-sm space-x-3">
              <a
                v-if="project.github_url"
                :href="project.github_url"
                target="_blank"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <i class="bi bi-github"></i> GitHub
              </a>

              <a
                v-if="project.demo_url"
                :href="project.demo_url"
                target="_blank"
                class="text-pink-400 hover:underline transition-colors"
              >
                <i class="bi bi-box-arrow-up-right"></i> Live
              </a>
            </td>

            <td class="p-4 text-right space-x-2">
              <button
                @click="openModal(project)"
                class="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors"
              >
                <i class="bi bi-pencil-square"></i>
              </button>

              <button
                @click="handleDelete(project.id)"
                class="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg transition-colors"
              >
                <i class="bi bi-trash3-fill"></i>
              </button>
            </td>
          </tr>

          <tr v-if="!projectStore.projects.length">
            <td colspan="4" class="p-8 text-center text-gray-500 text-sm">
              No projects have been added to the system yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <div
        class="bg-[#181818] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div
          class="p-6 border-b border-white/10 flex justify-between items-center"
        >
          <h3 class="text-lg font-bold text-white">
            {{ isEditMode ? 'Edit Project' : 'Create Project' }}
          </h3>

          <button
            @click="closeModal"
            class="text-gray-400 hover:text-white"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="p-6 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          <div>
            <label
              class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              Project Title *
            </label>

            <input
              v-model="form.title"
              type="text"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors text-sm"
              placeholder="e.g. Wearly Styles AI App"
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              Program Location *
            </label>

            <input
              v-model="form.type"
              type="text"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors text-sm"
              placeholder="e.g. Internship, Academic - PNV, Personal, Freelance..."
            />
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              Description *
            </label>

            <textarea
              v-model="form.description"
              rows="3"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors text-sm"
              placeholder="Briefly describe the project's functionality and goals..."
            ></textarea>
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              Tech Stack (Separated by commas) *
            </label>

            <input
              v-model="form.tech_stack"
              type="text"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors text-sm"
              placeholder="e.g. React Native, Expo, NestJS"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
              >
                GitHub URL
              </label>

              <input
                v-model="form.github_url"
                type="url"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors text-sm"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label
                class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
              >
                Demo / Live URL
              </label>

              <input
                v-model="form.demo_url"
                type="url"
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors text-sm"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label
              class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              Cover Image
            </label>

            <input
              type="file"
              @change="handleFileChange"
              accept="image/*"
              class="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-500/10 file:text-pink-400 hover:file:bg-pink-500/20"
            />
          </div>

          <div
            class="flex justify-end gap-3 pt-4 border-t border-white/10"
          >
            <button
              type="button"
              @click="closeModal"
              class="bg-white/5 hover:bg-white/10 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="projectStore.isLoading"
              class="bg-pink-500 hover:bg-pink-600 text-black font-bold px-5 py-2 rounded-xl text-sm transition-colors flex items-center gap-2"
            >
              <span
                v-if="projectStore.isLoading"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-black"
              ></span>

              {{ isEditMode ? 'Save Changes' : 'Create Project' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useProjectStore } from '../stores/project.store';
import type { Project } from '../types/project.type';

const projectStore = useProjectStore();
const isModalOpen = ref(false);
const isEditMode = ref(false);
const currentId = ref<number | null>(null);
const selectedFile = ref<File | null>(null);

const form = reactive({
  title: '',
  description: '',
  type: '',
  tech_stack: '',
  github_url: '',
  demo_url: '',
});

onMounted(() => {
  projectStore.fetchProjects();
});

const openModal = (project: Project | null = null) => {
  selectedFile.value = null;

  if (project) {
    isEditMode.value = true;
    currentId.value = project.id;
    form.title = project.title;
    form.description = project.description || '';
    form.type = project.type || '';
    form.tech_stack = project.tech_stack
      ? project.tech_stack.join(', ')
      : '';
    form.github_url = project.github_url || '';
    form.demo_url = project.demo_url || '';
  } else {
    isEditMode.value = false;
    currentId.value = null;
    form.title = '';
    form.description = '';
    form.type = '';
    form.tech_stack = '';
    form.github_url = '';
    form.demo_url = '';
  }

  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};

const handleSubmit = async () => {
  const formData = new FormData();

  formData.append('title', form.title);
  formData.append('description', form.description);
  formData.append('type', form.type.trim());
  formData.append('tech_stack', form.tech_stack);
  formData.append('github_url', form.github_url);
  formData.append('demo_url', form.demo_url);

  if (selectedFile.value) {
    formData.append('image', selectedFile.value);
  }

  try {
    if (isEditMode.value && currentId.value) {
      await projectStore.updateProject(currentId.value, formData);
    } else {
      await projectStore.addProject(formData);
    }

    closeModal();
  } catch (err) {
    alert(err);
  }
};

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this project?')) {
    await projectStore.deleteProject(id);
  }
};
</script>