<template>
  <div class="w-full max-h-screen flex items-center justify-center px-5 py-10 
              bg-[var(--color-bg)] relative overflow-hidden
              before:absolute before:top-0 before:left-0 before:w-full before:h-full
              before:bg-[radial-gradient(circle_at_top_left,rgba(255,133,187,0.2),transparent_30%)]
              after:absolute after:bottom-0 after:right-0 after:w-full after:h-full
              after:bg-[radial-gradient(circle_at_bottom_right,rgba(255,133,187,0.15),transparent_30%)]">
    
    <div class="w-full max-w-[1200px] h-[600px] grid grid-cols-1 md:grid-cols-2 
                bg-[#141f26]/82 border border-white/10 rounded-[30px] overflow-hidden z-10">
      
      <div class="relative flex items-center p-5 md:p-[60px] 
                  bg-gradient-to-br from-[rgba(255,133,187,0.18)] to-[rgba(255,255,255,0.02)]">
        <div class="relative z-10">
          <h1 class="text-[40px] md:text-[56px] font-bold leading-[1.1] mb-5 text-white">
            {{ title }}
            <span class="text-[var(--color-primary)]">{{ highlight }}</span>
          </h1>
          <p class="max-w-[400px] text-[18px] leading-[1.7] text-[var(--color-text-muted)]">
            {{ description }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center p-10 md:p-[60px] h-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  highlight: string;
  description: string;
}>();
</script>