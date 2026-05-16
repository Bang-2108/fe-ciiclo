<template>
  <section class="min-h-screen bg-black text-white flex items-center justify-center pt-28">
    <div v-if="profileStore.profile" class="max-w-5xl mx-auto px-6 text-center">
      <div class="flex justify-center mb-10">
        <div class="w-38 h-38 rounded-full bg-[#ff71b8] p-1 flex items-center justify-center overflow-hidden">
          <img :src="profileStore.profile.avatar" class="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-5">
        Hi, I'm <span class="text-[#ff71b8]">{{ profileStore.profile.name }}</span>
      </h1>
      <h2 class="text-[#ff71b8] text-3xl md:text-4xl font-bold mb-8">
        {{ profileStore.profile.role }}
      </h2>
      <p class="text-white/75 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
        {{ profileStore.profile.objective }}
      </p>
      <div class="flex flex-wrap justify-center gap-5 mb-14">
        <router-link to="/project" class="bg-[#ff71b8] hover:bg-[#ff5daa] transition px-10 py-4 rounded-2xl font-semibold">
          View Projects
        </router-link>
        <button @click="handleDownloadCV" class="border border-[#ff71b8] text-[#ff71b8] hover:bg-[#ff71b8]/10 transition px-10 py-4 rounded-2xl font-semibold">
          Download CV
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfileStore } from '@/stores/profile.store'; 

const profileStore = useProfileStore();
onMounted(async () => {
  await profileStore.fetchPublicProfile();
});
const handleDownloadCV = () => {
  if (profileStore.profile?.cv_path) {
    window.open(profileStore.profile.cv_path, '_blank');
  } else {
    alert('CV hiện đang được cập nhật!');
  }
};
</script>
