<template>
  <footer class="footer">
    <div class="container">
      <p class="footer__copy">© {{ new Date().getFullYear() }} {{ name }} - All Rights Reserved</p>
    </div>
  </footer>
</template>

<script setup>
const name = "Băng Băng";
</script>

<style scoped>
.footer {
  padding: 20px 0;
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.footer__copy {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 14px;
}
</style>