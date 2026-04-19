<script setup lang="ts">
defineProps<{
  label?: string;
  modelValue: string | number;
  type?: string;
  error?: string;
  placeholder?: string;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium mb-1">{{ label }}</label>
    <input
      :type="type || 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      :class="error ? 'border-red-500' : 'border-gray-300'"
      :placeholder="placeholder"
    />
    <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
  </div>
</template>
