```vue
<template>
  <section class="hero">

    <div v-if="profileStore.loading" class="hero-message">
      Loading...
    </div>

    <div v-else-if="profileStore.error" class="hero-message">
      {{ profileStore.error }}
    </div>

    <div v-else class="container hero-grid">

      <div class="hero-content">

        <h1 class="hero-title">
          Hello, I'm <br>

          <span class="hero-name">
            {{ profileStore.profile?.name }}
          </span>
        </h1>

        <h2 class="hero-role">
          {{ profileStore.profile?.role }}
        </h2>

        <p class="hero-desc">
          {{ profileStore.profile?.description }}
        </p>

        <div class="hero-actions">

          <router-link
            to="/portfolio"
            class="btn-base btn--primary"
          >
            View My Work
          </router-link>

          <router-link
            to="/contact"
            class="btn-base btn--outline"
          >
            Get In Touch
          </router-link>

        </div>

        <div class="socials">

          <a
            v-for="social in profileStore.profile?.socials"
            :key="social.id"
            :href="social.url"
            target="_blank"
            :class="['bi', social.icon]"
          ></a>

        </div>

      </div>

      <div class="hero-visual">

        <div class="image-box">

          <img
            :src="profileStore.profile?.avatar"
            alt="Profile"
            class="image-box-main"
          >

          <div
            v-for="badge in badges"
            :key="badge.label"
            :class="['badge', `badge--${badge.id}`]"
          >
            <i :class="['bi', badge.icon]"></i>

            <span>
              {{ badge.label }}
            </span>
          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();

const badges = [
  {
    id: 'design',
    label: 'Design',
    icon: 'bi-palette'
  },
  {
    id: 'code',
    label: 'Code',
    icon: 'bi-code-slash'
  },
  {
    id: 'ideas',
    label: 'Ideas',
    icon: 'bi-lightbulb'
  }
];

onMounted(async () => {
  await profileStore.fetchProfile();
});
</script>

<style scoped>
.hero {
  max-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--header-height);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.hero-message {
  text-align: center;
  padding: 100px 0;
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.2;
}

.hero-name {
  color: var(--color-primary);
}

.hero-role {
  margin-top: 20px;
}

.hero-desc {
  color: var(--color-text-muted);
  margin: 20px 0 40px;
  max-width: 480px;
}

.hero-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.btn--primary {
  background: var(--color-primary);
  color: #fff;
  border: 2px solid var(--color-primary);
}

.btn--outline {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.socials {
  display: flex;
  gap: 15px;
}

.socials a {
  width: 45px;
  height: 45px;
  background: var(--color-bg-surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-box {
  position: relative;
  width: 100%;
  max-width: 420px;
  margin-left: auto;
}

.image-box-main {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.badge {
  position: absolute;
  background: var(--color-bg-surface);
  padding: 10px 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: float 3s ease-in-out infinite;
}

.badge--design {
  top: 10%;
  right: -10%;
}

.badge--code {
  bottom: 40%;
  left: -15%;
}

.badge--ideas {
  bottom: 10%;
  right: -5%;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}
</style>

