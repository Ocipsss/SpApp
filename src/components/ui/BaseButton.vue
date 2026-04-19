<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
});
</script>

<template>
  <button
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center font-medium transition-colors rounded-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100"
    :class="[
      variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : '',
      variant === 'secondary' ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : '',
      variant === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' : '',
      size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
    ]"
  >
    <span v-if="loading" class="mr-2 animate-spin">🌀</span>
    <slot />
  </button>
</template>
