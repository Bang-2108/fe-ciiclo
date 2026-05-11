<template>
  <header :class="['header', { 'header--scrolled': isScrolled }]">
    <div class="container header-wrapper">

      <router-link to="/home" class="logo">
        <span class="logo-text">Băng Băng</span>
      </router-link>

      <nav class="nav">
        <ul class="nav-list">
          <li v-for="item in menuItems" :key="item.path">
            <router-link
              :to="item.path"
              active-class="active"
              class="nav-link"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

const menuItems = [
  { name: 'Home', path: '/home' },
  { name: 'About', path: '/about' },
  { name: 'Resume', path: '/resume' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/portfolio' },
  { name: 'Contact', path: '/contact' }
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  padding: 20px 0;
  background: transparent;
  transition: var(--transition);
}

.header--scrolled {
  padding: 12px 0;
  background-color: rgba(5, 13, 17, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  text-decoration: none;
}

.logo-text {
  color: var(--color-accent);
  font-size: 22px;
  font-weight: 700;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 25px;
  list-style: none;
}

.nav-link {
  position: relative;
  color: #fff;
  font-weight: 500;
  font-family: var(--font-nav);
  text-decoration: none;
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-accent);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 2px;
  background-color: var(--color-accent);
}
</style>