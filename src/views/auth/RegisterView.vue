# `src/views/auth/RegisterView.vue`
<template>
  <AuthLayout
    title="Tạo tài khoản "
    highlight="mới!"
    description="Đăng ký để bắt đầu hành trình khám phá những dự án tuyệt vời."
  >
    <div class="auth-form-wrapper">
      <div class="auth-header">
        <h2>Đăng ký</h2>
        <p>Tạo tài khoản để tiếp tục</p>
      </div>
      <form
        @submit.prevent="handleRegister"
        class="auth-form"
      >
        <!-- NAME -->
        <div class="input-group">
          <label>Họ và tên</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Nhập tên của bạn"
            autocomplete="name"
            required
          />
        </div>
        <div class="input-group">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Nhập email của bạn"
            autocomplete="email"
            required
          />
          <p
            v-if="errors.email"
            class="error-text"
          >
            {{ errors.email[0] }}
          </p>
        </div>
        <div class="input-group">
          <label>Mật khẩu</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Nhập mật khẩu"
            autocomplete="new-password"
            required
          />
          <p
            v-if="errors.password"
            class="error-text"
          >
            {{ errors.password[0] }}
          </p>
        </div>
        <div class="input-group">
          <label>Nhập lại mật khẩu</label>

          <input
            v-model="form.password_confirmation"
            type="password"
            placeholder="Nhập lại mật khẩu"
            autocomplete="new-password"
            required
          />
        </div>
        <button
          type="submit"
          class="btn-login"
          :disabled="loading"
        >
          {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
        </button>

      </form>
      <p class="register-text">
        Đã có tài khoản?
        <router-link to="/auth/login">
          Đăng nhập
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

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);
const errors = ref<any>({});
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const handleRegister = async () => {
  errors.value = {};
  try {
    loading.value = true;
    await authStore.register(form.value);
    alert('Đăng ký thành công!');
    router.push('/auth/login');
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors;
    } else {
      alert('Đăng ký thất bại!');
    }
  } finally {
    loading.value = false;
  }
};
</script>

