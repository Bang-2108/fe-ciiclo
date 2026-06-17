<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-[#141f26]/40 border border-white/5 rounded-3xl p-6 shadow-xl">
        <div class="flex items-center gap-4">
          <div class="p-4 bg-pink-500/10 rounded-2xl text-pink-500 text-2xl">📁</div>
          <div>
            <p class="text-gray-400 text-sm">Total Projects</p>
            <h3 class="text-3xl font-bold text-white">{{ projectStore.projects.length }}</h3>
          </div>
        </div>
      </div>
      
      <div class="bg-[#141f26]/40 border border-white/5 rounded-3xl p-6 shadow-xl">
        <div class="flex items-center gap-4">
          <div class="p-4 bg-blue-500/10 rounded-2xl text-blue-500 text-2xl">⚡</div>
          <div>
            <p class="text-gray-400 text-sm">Total Skills</p>
            <h3 class="text-3xl font-bold text-white">{{ skillStore.skills.length }}</h3>
          </div>
        </div>
      </div>

      <div class="bg-[#141f26]/40 border border-white/5 rounded-3xl p-6 shadow-xl">
        <div class="flex items-center gap-4">
          <div class="p-4 bg-yellow-500/10 rounded-2xl text-yellow-500 text-2xl">✉️</div>
          <div>
            <p class="text-gray-400 text-sm">New Messages</p>
            <h3 class="text-3xl font-bold text-white">{{ unreadContactsCount }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#141f26]/40 border border-white/5 rounded-3xl p-8 shadow-xl">
      <h3 class="text-xl font-bold text-white mb-2">Welcome Back, {{ authStore.user?.name || 'Admin' }}!</h3>
      <p class="text-gray-400 text-sm">You are logged in as administrator. Use the sidebar to manage your portfolio content.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useProjectStore } from '@/features/projects/stores/project.store';
import { useSkillStore } from '@/features/skills/stores/skill.store';
import { useContactStore } from '@/features/contacts/stores/contact.store';
import { useAuthStore } from '@/features/auth/stores/auth.store';

const projectStore = useProjectStore();
const skillStore = useSkillStore();
const contactStore = useContactStore();
const authStore = useAuthStore();

const unreadContactsCount = computed(() => 
  contactStore.contacts.filter(c => c.status !== 'read').length
);

onMounted(() => {
  projectStore.fetchProjects();
  skillStore.fetchSkills();
  contactStore.fetchContacts();
});
</script>