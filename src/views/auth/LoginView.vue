# `src/views/auth/LoginView.vue`
<template>
  <AuthLayout
    title="Chào mừng "
    highlight="trở lại!"
    description="Đăng nhập để tiếp tục hành trình khám phá những dự án tuyệt vời."
  >
    <div class="auth-form-wrapper">
      <div class="auth-header">
        <h2>Đăng nhập</h2>
        <p>Nhập thông tin tài khoản để tiếp tục</p>
      </div>
      <form
        @submit.prevent="handleLogin"
        class="auth-form"
      >
        <div class="input-group">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Nhập email của bạn"
            autocomplete="email"
            required
          />
        </div>
        <div class="input-group">
          <label>Mật khẩu</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Nhập mật khẩu"
            autocomplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          class="btn-login"
          :disabled="loading"
        >
          {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </button>
      </form>
      <p class="register-text">
        Chưa có tài khoản?
        <router-link to="/auth/register">
          Đăng ký ngay
        </router-link>
      </p>
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

