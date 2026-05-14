import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/public/HomeView.vue'),
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('@/views/public/SkillsView.vue'),
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'skills',
        name: 'admin-skills',
        component: () => import('@/views/admin/SkillManagementView.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token || localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    return next('/auth/login');
  }
  if (token && to.meta.guestOnly) {
    return next('/admin'); 
  }
  next();
});

export default router;