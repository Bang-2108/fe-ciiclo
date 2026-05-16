<template>
  <div class="flex flex-col min-h-screen bg-black">
    <main class="flex-grow pt-32 pb-20 px-6 font-poppins text-white">
      <div v-if="profileStore.profile" class="max-w-4xl mx-auto space-y-16">
        
        <h2 class="text-5xl font-bold text-center">
          About <span class="text-[#ff71b8]">Me</span>
        </h2>

        <div class="space-y-8">
          <div class="bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-6">
            <div class="flex items-center gap-4 text-[#ff71b8]">
              <i class="bi bi-person-badge text-2xl"></i>
              <h3 class="text-xl font-bold uppercase tracking-widest">Bio</h3>
            </div>
            <p class="text-gray-400 leading-relaxed text-lg whitespace-pre-line">
              {{ profileStore.profile.bio }}
            </p>
          </div>

          <div class="bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-6">
            <div class="flex items-center gap-4 text-[#ff71b8]">
              <i class="bi bi-mortarboard text-2xl"></i>
              <h3 class="text-xl font-bold uppercase tracking-widest">Education</h3>
            </div>
            <div class="space-y-2">
              <p class="text-gray-200 font-bold text-xl">{{ profileStore.profile.education }}</p>
              <p class="text-[#ff71b8] font-medium">2022 - 2026</p>
            </div>
          </div>

          <div class="bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-6">
            <div class="flex items-center gap-4 text-[#ff71b8]">
              <i class="bi bi-target text-2xl"></i>
              <h3 class="text-xl font-bold uppercase tracking-widest">Career Objective</h3>
            </div>
            <p class="text-gray-400 leading-relaxed italic">
              {{ profileStore.profile.objective }}
            </p>
          </div>
        </div>

        <div class="bg-[#111] p-10 rounded-[2.5rem] border border-[#ff71b8]/10 shadow-xl">
           <h3 class="text-center text-2xl font-bold mb-10 uppercase tracking-widest text-gray-300">Quick Stats</h3>
           <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div class="text-5xl font-black text-[#ff71b8] mb-2">{{ profileStore.profile.stats_projects }}+</div>
                <div class="text-gray-500 uppercase text-xs font-bold tracking-widest">Projects</div>
              </div>
              <div>
                <div class="text-5xl font-black text-white mb-2">{{ profileStore.profile.stats_internships }}</div>
                <div class="text-gray-500 uppercase text-xs font-bold tracking-widest">Internships</div>
              </div>
              <div>
                <div class="text-5xl font-black text-white mb-2">{{ profileStore.profile.stats_experience }}</div>
                <div class="text-gray-500 uppercase text-xs font-bold tracking-widest">Years Learning</div>
              </div>
           </div>
        </div>
      </div>

      <div v-else-if="profileStore.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-[#ff71b8]"></div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfileStore } from '@/stores/profile.store';
const profileStore = useProfileStore();

onMounted(async () => {
  await profileStore.fetchPublicProfile();
});
</script>