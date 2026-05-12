<template>
  <section class="min-h-screen bg-black text-white flex items-center justify-center pt-28">
    <div
      v-if="profileStore.profile"
      class="max-w-5xl mx-auto px-6 text-center"
    >
      <div class="flex justify-center mb-10">
        <div
          class="w-32 h-32 rounded-full bg-[#ff71b8] p-2 flex items-center justify-center"
        >
          <img
            :src="profileStore.profile.avatar"
            class="w-24 h-24 object-cover rounded-full"
          />
        </div>
      </div>

      <h1
        class="text-5xl md:text-7xl font-bold leading-tight mb-5"
      >
        Hi, I'm
        <span class="text-[#ff71b8]">
          {{ profileStore.profile.name }}
        </span>
      </h1>

      <h2 class="text-[#ff71b8] text-3xl md:text-4xl font-bold mb-8">
        {{ profileStore.profile.role }}
      </h2>

      <p
        class="text-white/75 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
      >
        {{ profileStore.profile.description }}
      </p>

      <div class="flex flex-wrap justify-center gap-5 mb-14">
        <router-link
          to="/project"
          class="bg-[#ff71b8] hover:bg-[#ff5daa] transition px-10 py-4 rounded-2xl font-semibold"
        >
          View Projects
        </router-link>

        <router-link
          to="/contact"
          class="bg-[#1d2a44] hover:bg-[#263655] transition px-10 py-4 rounded-2xl font-semibold"
        >
          Contact Me
        </router-link>

        <button
          class="border border-[#ff71b8] text-[#ff71b8] hover:bg-[#ff71b8]/10 transition px-10 py-4 rounded-2xl font-semibold"
        >
          Download CV
        </button>
      </div>

      <div class="flex justify-center gap-5 mb-14">
        <a
          v-for="social in profileStore.profile.socials"
          :key="social.id"
          :href="social.url"
          target="_blank"
          class="w-14 h-14 rounded-full bg-[#172338] flex items-center justify-center hover:bg-[#22314d] transition"
        >
          <i
            :class="['bi', social.icon]"
            class="text-white text-xl"
          ></i>
        </a>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <span
          v-for="tech in techs"
          :key="tech"
          class="px-6 py-3 rounded-full border border-[#ff71b8]/40 bg-[#141827] text-white/90"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfileStore } from '@/stores/home';

const profileStore = useProfileStore();

const techs = [
  'React',
  'Node.js',
  'TypeScript',
  'MongoDB',
  'Tailwind',
  'Docker'
];

onMounted(async () => {
  await profileStore.fetchProfile();
});
</script>