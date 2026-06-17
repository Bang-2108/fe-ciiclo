import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/features/auth/pages/LoginPage.vue';
import AdminLayout from "@/app/layouts/AdminLayout.vue";
import DashboardPage from '@/features/dashboard/pages/DashboardPage.vue';
import ProfilePage from '@/features/profile/pages/ProfilePage.vue';
import SkillPage from '@/features/skills/pages/SkillPage.vue';
import ProjectPage from '@/features/projects/pages/ProjectPage.vue';
import ContactPage from '@/features/contacts/pages/ContactPage.vue';
import { useAuthStore } from '@/features/auth/stores/auth.store';

const routes = [
  {
    path: '/auth/login',
    component: LoginPage,
    name: 'login',
    meta: { requiresGuest: true } 
  },
  {
    path: '/admin',
    component: AdminLayout, 
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true }, 
    children: [
      { path: 'dashboard', component: DashboardPage, name: 'dashboard' },
      { path: 'profile', component: ProfilePage, name: 'profile' },
      { path: 'skills', component: SkillPage, name: 'skills' },
      { path: 'projects', component: ProjectPage, name: 'projects' }, 
      { path: 'contacts', component: ContactPage, name: 'contacts' }, 
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem('token') || authStore.token;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      alert('Access Denied: Please log in first!');
      return next({ name: 'login' });
    }
  }

  if (to.matched.some(record => record.meta.requiresGuest)) {
    if (token) {
      return next({ name: 'dashboard' });
    }
  }

  next();
});

export default router;