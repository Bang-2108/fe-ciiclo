<template>
  <div class="w-full max-w-[360px] flex flex-col justify-center">
    <div class="text-center mb-[10px]">
      <h2 class="text-[28px] md:text-[32px] font-bold mb-[10px] text-white">Sign In</h2>
      <p class="text-[15px] text-[var(--color-text-muted)]">Enter your account details to continue</p>
    </div>

    <form @submit.prevent="handleLogin" class="flex flex-col gap-[15px]">
      <BaseInput
        v-model="form.email"
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        required
      />

      <BaseInput
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        required
      />

      <BaseButton type="submit" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/shared/components/BaseInput.vue';
import BaseButton from '@/shared/components/BaseButton.vue';
import { useAuthStore } from '../stores/auth.store';
import type { LoginRequest } from '../types/auth.type';

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);

const form = ref<LoginRequest>({
  email: '',
  password: '',
});

const handleLogin = async () => {
  try {
    loading.value = true;
    await authStore.login(form.value);
    if (authStore.token) {
      alert('Login successful!');
      router.push('/admin/dashboard'); 
    } else {
      alert('Login failed: Token not found.');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Login failed! Please try again.';
    alert(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>