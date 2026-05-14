<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm py-4 border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <router-link to="/home" class="text-white text-xl font-semibold tracking-tight">
        Zoan Thi Bang
      </router-link>

      <nav class="hidden lg:block ml-10">
        <ul class="flex items-center gap-8">
          <li v-for="item in filteredMenuItems" :key="item.path">
            <router-link :to="item.path" 
              class="text-sm font-medium transition-colors hover:text-[#ff85bb]"
              :class="[route.path === item.path ? 'text-[#ff85bb]' : 'text-gray-300']">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-6">
        <div class="flex items-center gap-4 text-lg text-gray-400">
          <i class="bi bi-github cursor-pointer hover:text-white"></i>
          <i class="bi bi-linkedin cursor-pointer hover:text-white"></i>
          <i class="bi bi-envelope cursor-pointer hover:text-white"></i>
        </div>
        
        <div class="h-6 w-[1px] bg-white/20"></div>

        <template v-if="authStore.isAuthenticated">
          <div class="flex items-center gap-2 text-sm text-gray-300 mr-2">
            <i class="bi bi-person-circle"></i>
            <span>Admin</span>
          </div>

          <button @click="handleLogout" class="bg-[#ff0000] hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
            <i class="bi bi-box-arrow-right"></i>
            Đăng xuất
          </button>
        </template>

        <router-link v-else to="/auth/login" class="text-gray-400 hover:text-white text-sm font-medium">
          Admin Login
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // Import thêm computed
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const route = useRoute();
const authStore = useAuthStore();

const filteredMenuItems = computed(() => {
  return [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { 
      name: 'Skills', 
      path: authStore.isAuthenticated ? '/admin/skills' : '/skills' 
    },
    { name: 'Projects', path: '/project' },
    { name: 'Contact', path: '/contact' }
  ];
});

const handleLogout = async () => {
  if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
    await authStore.logout();
  }
};
</script>