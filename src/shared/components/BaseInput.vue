<template>
  <div class="flex flex-col gap-[10px]">
    <label v-if="label" class="text-[15px] font-semibold text-white">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="w-full px-[18px] py-2 rounded-[16px] border border-white/10 bg-white/5 text-white text-[15px] outline-none transition-all hover:border-white/20 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[rgba(255,133,187,0.12)]"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    type?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
  }>(),
  {
    type: 'text',
    required: false
  }
);

defineEmits(['update:modelValue']);
</script>