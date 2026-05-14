<template>
  <AuthLayout
    title="Chào mừng "
    highlight="trở lại!"
    description="Đăng nhập để tiếp tục hành trình khám phá những dự án tuyệt vời."
  >
    <div class="w-full max-w-[360px] flex flex-col justify-center">
      <div class="text-center mb-[10px]">
        <h2 class="text-[28px] md:text-[32px] font-bold mb-[10px] text-white">Đăng nhập</h2>
        <p class="text-[15px] text-[var(--color-text-muted)]">Nhập thông tin tài khoản để tiếp tục</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-[15px]">
        <div class="flex flex-col gap-[10px]">
          <label class="text-[15px] font-semibold text-white">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Nhập email của bạn"
            class="w-full px-[18px] py-2 rounded-[16px] border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all hover:border-white/20 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[rgba(255,133,187,0.12)]"
            required
          />
        </div>

        <div class="flex flex-col gap-[10px]">
          <label class="text-[15px] font-semibold text-white">Mật khẩu</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Nhập mật khẩu"
            class="w-full px-[18px] py-2 rounded-[16px] border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all hover:border-white/20 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[rgba(255,133,187,0.12)]"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="mt-[10px] py-3 rounded-[18px] bg-gradient-to-r from-[#ff85bb] to-[#ff6fae] text-white font-bold text-[16px] transition-all hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(255,133,187,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </button>
      </form>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useAuthStore } from '@/stores/auth.store';
import type { LoginRequest } from '@/types/auth';

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

    router.push('/home');
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      'Đăng nhập thất bại!';

    alert(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>

