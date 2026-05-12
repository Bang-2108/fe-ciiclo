<template>
  <AuthLayout
    title="Tạo tài khoản "
    highlight="mới!"
    description="Đăng ký để bắt đầu hành trình khám phá những dự án tuyệt vời."
  >
    <div class="w-full max-w-[420px] flex flex-col justify-center">
      <div class="text-center mb-[2px]">
        <h2 class="text-[30px] md:text-[38px] font-bold mb-[2px] text-white">Đăng ký</h2>
        <p class="text-[15px] text-[var(--color-text-muted)]">Tạo tài khoản để tiếp tục</p>
      </div>

      <form @submit.prevent="handleRegister" class="flex flex-col gap-[8px]">
        <div class="flex flex-col gap-[5px]">
          <label class="text-[15px] font-semibold text-white">Họ và tên</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-[18px] py-2 rounded-[16px] border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all hover:border-white/20 focus:border-[var(--color-primary)]"
            required
          />
        </div>

        <div class="flex flex-col gap-[5px]">
          <label class="text-[15px] font-semibold text-white">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-[18px] py-2 rounded-[16px] border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all focus:border-[var(--color-primary)]"
            required
          />
          <p v-if="errors.email" class="text-[#ff8c94] text-[13px] -mt-2.5">{{ errors.email[0] }}</p>
        </div>

        <div class="flex flex-col gap-[5px]">
          <label class="text-[15px] font-semibold text-white">Mật khẩu</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-[18px] py-2 rounded-[16px] border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all focus:border-[var(--color-primary)]"
            required
          />
          <p v-if="errors.password" class="text-[#ff8c94] text-[13px] -mt-2.5">{{ errors.password[0] }}</p>
        </div>

        <div class="flex flex-col gap-[5px]">
          <label class="text-[15px] font-semibold text-white">Nhập lại mật khẩu</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            class="w-full px-[18px] py-2 rounded-[16px] border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all focus:border-[var(--color-primary)]"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="mt-[10px] py-3 rounded-[18px] bg-gradient-to-r from-[#ff85bb] to-[#ff6fae] text-white font-bold text-[16px] transition-all hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(255,133,187,0.35)] active:scale-[0.98]"
        >
          {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
        </button>
      </form>

      <p class="mt-8 text-center text-[15px] text-[var(--color-text-muted)]">
        Đã có tài khoản?
        <router-link to="/auth/login" class="text-[var(--color-primary)] font-bold hover:underline transition-all">
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

