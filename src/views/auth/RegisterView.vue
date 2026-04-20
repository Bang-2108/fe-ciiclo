<template>
  <div class="auth-view">
    <h2>Tạo tài khoản mới</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="form.name" type="text" placeholder="Tên" required />
      
      <input v-model="form.email" type="email" placeholder="Email" required />
      <p v-if="errors.email" class="error-text">{{ errors.email[0] }}</p>

      <input v-model="form.password" type="password" placeholder="Mật khẩu" required />
      <input v-model="form.password_confirmation" type="password" placeholder="Nhập lại mật khẩu" required />
      
      <button type="submit" class="btn-pastel">Đăng ký</button>
    </form>
    <p>Đã có tài khoản? <router-link to="/auth/login">Đăng nhập</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const form = ref({ name: '', email: '', password: '', password_confirmation: '' });
const errors = ref<any>({}); 

const handleRegister = async () => {
  errors.value = {}; 
  try {
    await authStore.register(form.value);
    alert('Đăng ký thành công! Hãy đăng nhập nhé.');
    router.push('/auth/login');
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors;
    } else {
      alert('Đăng ký thất bại!');
    }
  }
};
</script>

<style scoped>
.auth-view { padding: 40px; text-align: center; }
input { display: block; width: 100%; padding: 15px; margin-bottom: 15px; border: 2px solid var(--color-border); border-radius: var(--radius-md); }
button { width: 100%; }

.error-text { 
  color: #ff8c94; 
  font-size: 0.85rem; 
  margin-top: -10px; 
  margin-bottom: 10px; 
  text-align: left; 
}
</style>