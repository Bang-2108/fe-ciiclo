<template>
  <Header />
  <main class="pt-20"> 
    <router-view />
  </main>
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue"
</script>