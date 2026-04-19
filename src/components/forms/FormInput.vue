<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
}>();

// Integrasi otomatis dengan Vee-Validate + Zod
const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <div class="flex flex-col gap-1 mb-4">
    <label v-if="label" :for="name" class="text-sm font-semibold text-gray-700">{{ label }}</label>
    <input
      v-model="value"
      :id="name"
      :type="type || 'text'"
      :placeholder="placeholder"
      class="border rounded-xl px-4 py-2.5 outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
      :class="errorMessage ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'"
    />
    <span v-if="errorMessage" class="text-xs text-red-500 font-medium italic">
      {{ errorMessage }}
    </span>
  </div>
</template>
