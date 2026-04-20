<template>
  <div class="auth-view">
    <h2>Chào mừng trở lại!</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Mật khẩu" required />
      <button type="submit" class="btn-pastel">Đăng nhập</button>
    </form>
    <p>Chưa có tài khoản? <router-link to="/auth/register">Đăng ký ngay</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const form = ref({ email: '', password: '' });

const handleLogin = async () => {
  try {
    await authStore.login(form.value);
    router.push('/home');
  } catch (error) {
    alert('Đăng nhập thất bại, kiểm tra lại thông tin!');
  }
};
</script>

<style scoped>
.auth-view { padding: 40px; text-align: center; }
input { 
  display: block; width: 100%; padding: 15px; margin-bottom: 20px;
  border: 2px solid var(--color-border); border-radius: var(--radius-md);
}
button { width: 100%; }
</style>