<template>
  <div class="auth-page">
    <div class="auth-card">

      <!-- LEFT -->
      <div class="auth-left">
        <div class="overlay"></div>

        <div class="left-content">
          <h1>
            Tạo tài khoản <span>mới!</span>
          </h1>

          <p>
            Đăng ký để bắt đầu hành trình
            khám phá những dự án tuyệt vời.
          </p>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="auth-right">
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

            <!-- EMAIL -->
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

            <!-- PASSWORD -->
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

            <!-- CONFIRM PASSWORD -->
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

            <!-- BUTTON -->
            <button
              type="submit"
              class="btn-login"
              :disabled="loading"
            >
              {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
            </button>

          </form>

          <!-- FOOTER -->
          <p class="register-text">
            Đã có tài khoản?

            <router-link to="/auth/login">
              Đăng nhập
            </router-link>
          </p>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

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

<style scoped>
.auth-page {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px 20px;

  background:
    radial-gradient(
      circle at top left,
      rgba(255, 133, 187, 0.2),
      transparent 30%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(255, 133, 187, 0.15),
      transparent 30%
    ),
    var(--color-bg);
}

.auth-card {
  width: 100%;
  max-width: 1200px;
  max-height: 720px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  background: rgba(20, 31, 38, 0.82);

  border: 1px solid rgba(255,255,255,0.08);

  border-radius: 30px;

  overflow: hidden;

  backdrop-filter: blur(12px);

  box-shadow:
    0 20px 60px rgba(0,0,0,0.45);
}

/* LEFT */

.auth-left {
  position: relative;

  display: flex;
  align-items: center;

  padding: 60px;

  background:
    linear-gradient(
      135deg,
      rgba(255,133,187,0.18),
      rgba(255,255,255,0.02)
    );
}

.overlay {
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      circle at top,
      rgba(255,255,255,0.08),
      transparent 50%
    );
}

.left-content {
  position: relative;
  z-index: 2;
}

.left-content h1 {
  font-size: 56px;
  line-height: 1.1;

  margin-bottom: 20px;

  font-weight: 700;
}

.left-content span {
  color: var(--color-primary);
}

.left-content p {
  max-width: 400px;

  color: var(--color-text-muted);

  font-size: 18px;

  line-height: 1.7;
}

/* RIGHT */

.auth-right {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 60px;
}

.auth-form-wrapper {
  width: 100%;
  max-width: 420px;
}

/* HEADER */

.auth-header {
  text-align: center;

  margin-bottom: 5px;
}

.auth-header h2 {
  font-size: 42px;

  margin-bottom: 5px;

  font-weight: 700;
}

.auth-header p {
  color: var(--color-text-muted);

  font-size: 15px;
}

/* FORM */

.auth-form {
  display: flex;
  flex-direction: column;

  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;

  gap: 5px;
}

.input-group label {
  font-size: 15px;
  font-weight: 600;
}

.input-group input {
  width: 100%;

  padding: 16px 18px;

  border-radius: 16px;

  border: 1px solid rgba(255,255,255,0.08);

  background: rgba(255,255,255,0.03);

  color: white;

  font-size: 15px;

  outline: none;

  transition: all 0.3s ease;
}

.input-group input::placeholder {
  color: rgba(255,255,255,0.4);
}

.input-group input:hover {
  border-color: rgba(255,255,255,0.16);
}

.input-group input:focus {
  border-color: var(--color-primary);

  box-shadow:
    0 0 0 4px rgba(255,133,187,0.12);
}

/* ERROR */

.error-text {
  color: #ff8c94;

  font-size: 13px;

  margin-top: -2px;
}

/* BUTTON */

.btn-login {
  margin-top: 10px;

  padding: 16px;

  border: none;
  border-radius: 18px;

  background:
    linear-gradient(
      135deg,
      #ff85bb,
      #ff6fae
    );

  color: white;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  transition: all 0.3s ease;
}

.btn-login:hover {
  transform: translateY(-3px);

  box-shadow:
    0 10px 25px rgba(255,133,187,0.35);
}

.btn-login:active {
  transform: scale(0.98);
}

.btn-login:disabled {
  opacity: 0.7;

  cursor: not-allowed;
}

/* FOOTER */

.register-text {
  margin-top: 32px;

  text-align: center;

  color: var(--color-text-muted);

  font-size: 15px;
}

.register-text a {
  color: var(--color-primary);

  font-weight: 700;

  transition: 0.3s ease;
}

.register-text a:hover {
  text-decoration: underline;
}
</style>