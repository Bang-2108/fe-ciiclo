<template>
  <AuthLayout
    title="Welcome "
    highlight="back!"
    description="Log in to continue exploring amazing projects."
  >
    <LoginForm />
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '@/app/layouts/AuthLayout.vue';
import LoginForm from '../components/LoginForm.vue';
</script>