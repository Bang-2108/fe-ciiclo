<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm py-4 border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <router-link to="/home" class="text-white text-xl font-semibold tracking-tight">
        Zoan Thi Bang
      </router-link>

      <nav class="hidden lg:block ml-10">
        <ul class="flex items-center gap-8">
          <li v-for="item in menuItems" :key="item.path">
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

        <div class="flex items-center gap-2 text-sm text-gray-300">
          <i class="bi bi-person"></i>
          <span>Zoãn Thị Băng</span>
        </div>

        <button @click="handleLogout" class="bg-[#ff0000] hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
          <i class="bi bi-box-arrow-right"></i>
          Đăng xuất
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const menuItems = [
  { name: 'Home', path: '/home' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/project' },
  { name: 'Contact', path: '/contact' }
];
</script>