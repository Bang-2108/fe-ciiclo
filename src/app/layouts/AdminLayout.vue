<template>
  <div class="flex min-h-screen bg-[#0b1115] text-white font-sans">
    <AdminSidebar />

    <main class="flex-1 ml-64 p-8">
      <AdminHeader />

      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from '../components/AdminSidebar.vue';
import AdminHeader from '../components/AdminHeader.vue';
</script>