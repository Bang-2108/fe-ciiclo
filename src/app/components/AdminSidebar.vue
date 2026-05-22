<template>
  <aside class="w-64 bg-[#141f26] border-r border-white/5 flex flex-col fixed h-full z-20">
    <div class="p-6">
      <h2 class="text-xl font-bold tracking-wider text-white">
        ADMIN <span class="text-[#ff71b8]">PANEL</span>
      </h2>
    </div>

    <nav class="flex-1 px-4 space-y-2 mt-4">
      <router-link 
        v-for="item in menuItems" 
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
        :class="[$route.path === item.path ? 'bg-[#ff71b8]/10 text-[#ff71b8]' : 'text-gray-400 hover:bg-white/5 hover:text-white']"
      >
        <span class="text-xl">{{ item.icon }}</span>
        <span class="font-medium text-sm">{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="p-4 border-t border-white/5">
      <button 
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
      >
        <span>🚪</span>
        <span class="text-sm font-medium">Sign Out</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/features/auth/stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
  { name: 'Profile Info', path: '/admin/profile', icon: '👤' },
  { name: 'Skills List', path: '/admin/skills', icon: '⚡' },
  { name: 'Projects', path: '/admin/projects', icon: '📁' },
  { name: 'Contact Messages', path: '/admin/messages', icon: '✉️' },
];

const handleLogout = async () => {
  if (confirm('Are you sure you want to sign out?')) {
    await authStore.logout();
    router.push('/auth/login');
  }
};
</script>

<style scoped>
.router-link-active {
  border-right: 3px solid #ff71b8;
}
</style>