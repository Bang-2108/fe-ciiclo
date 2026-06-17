<template>
  <button
    :type="type"
    :disabled="disabled"
    class="mt-[10px] py-3 rounded-[18px] bg-gradient-to-r from-[#ff85bb] to-[#ff6fae] text-white font-bold text-[16px] transition-all hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(255,133,187,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }>(),
  {
    type: 'button',
    disabled: false
  }
);
</script>