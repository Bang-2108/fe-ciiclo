# `src/layouts/AuthLayout.vue`
<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-left">
        <div class="left-content">
          <h1>
            {{ title }}
            <span>{{ highlight }}</span>
          </h1>

          <p>
            {{ description }}
          </p>
        </div>
      </div>
      <div class="auth-right">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  highlight: string;
  description: string;
}>();
</script>

