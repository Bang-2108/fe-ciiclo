import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/features/auth/pages/LoginPage.vue';
import AdminLayout from "@/app/layouts/AdminLayout.vue";
import DashboardPage from '@/features/dashboard/pages/DashboardPage.vue';
import ProfilePage from '@/features/profile/pages/ProfilePage.vue';
import SkillPage from '@/features/skills/pages/SkillPage.vue';
import ProjectPage from '@/features/projects/pages/ProjectPage.vue';
const routes = [
  {
    path: '/auth/login',
    component: LoginPage,
  },
  {
    path: '/admin',
    component: AdminLayout, 
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', component: DashboardPage },
      { path: 'profile', component: ProfilePage },
      { path: 'skills', component: SkillPage },
      { path: 'projects', component: ProjectPage }, 
      // { path: 'messages', component: MessagePage }, 
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

export default router;