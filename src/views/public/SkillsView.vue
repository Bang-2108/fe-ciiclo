<template>
  <div class="flex flex-col min-h-screen bg-[#0f172a]">
    
    <Header />

    <main class="flex-grow pt-24 pb-12 text-white">
      <div class="max-w-7xl mx-auto px-6">
        
        <div class="text-center mb-16">
          <h1 class="text-4xl font-bold mb-4">My <span class="text-[#ff71b8]">Skills</span></h1>
          <p class="text-gray-400 max-w-2xl mx-auto italic">
            "Học vấn là những gì còn lại sau khi người ta đã quên hết những gì đã học ở trường."
          </p>
        </div>

        <div v-if="skillStore.loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-[#ff71b8]"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(skills, category) in skillStore.groupedSkills" 
            :key="category"
            class="bg-[#1e293b]/50 border border-white/10 rounded-3xl p-8 hover:border-[#ff71b8]/30 transition-all shadow-xl"
          >
            <div class="flex items-center gap-3 mb-8">
              <div class="w-1.5 h-6 bg-[#ff71b8] rounded-full"></div>
              <h3 class="text-xl font-bold uppercase tracking-widest">{{ category }}</h3>
            </div>

            <div class="space-y-6">
              <div v-for="skill in skills" :key="skill.id" class="group">
                <div class="flex justify-between mb-2">
                  <span class="text-gray-300 group-hover:text-white transition-colors font-medium">
                    {{ skill.name }}
                  </span>
                  <span class="text-[#ff71b8] font-bold">{{ skill.percentage }}%</span>
                </div>
                <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                  <div 
                    class="bg-[#ff71b8] h-full rounded-full shadow-[0_0_10px_rgba(255,113,184,0.5)] transition-all duration-1000 ease-out"
                    :style="{ width: skill.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSkillStore } from '@/stores/skill.store';

import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

const skillStore = useSkillStore();

onMounted(() => {
  skillStore.fetchPublicSkills();
});
</script>