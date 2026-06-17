<template>
  <header class="fixed top-0 right-0 left-0 md:left-64 z-50 flex justify-between items-center px-8 py-5 bg-[#0b0f19] border-b border-white/5">
    <div>
      <h2 class="text-sm text-gray-400 uppercase tracking-widest font-semibold">Workspace</h2>
      <p class="text-2xl font-bold">
        Manage your <span class="text-[#ff71b8]">{{ currentModuleTitle }}</span>
      </p>
    </div>
    
    <div class="flex items-center gap-4">
      <a 
        href="/" 
        target="_blank" 
        class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition font-medium"
      >
        View Site ↗
      </a>
      <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff71b8] to-[#ffc2d1] flex items-center justify-center font-bold text-black text-xs select-none">
        ZB
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentModuleTitle = computed(() => {
  const path = route.path;
  if (path.includes('/admin/dashboard')) return 'Dashboard';
  if (path.includes('/admin/profile')) return 'Profile';
  if (path.includes('/admin/skills')) return 'Skills';
  if (path.includes('/admin/projects')) return 'Projects';
  if (path.includes('/admin/contacts')) return 'Contacts';
  return 'Portfolio';
});
</script>