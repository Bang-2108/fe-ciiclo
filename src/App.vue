<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style>
main {
  min-height: 100vh;
  background-color: black;
}
</style>