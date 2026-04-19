<script setup lang="ts">
// Komponen ini menggunakan pola "Slot" agar bisa fleksibel 
// digunakan untuk Produk, Member, atau Transaksi.
defineProps<{
  title: string;
  subtitle?: string;
  status?: string;
  statusColor?: string;
}>();

defineEmits(['click']);
</script>

<template>
  <div 
    @click="$emit('click')"
    class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-all mb-3"
  >
    <div class="flex justify-between items-start mb-2">
      <div class="flex-1">
        <h3 class="font-bold text-gray-800 leading-tight">{{ title }}</h3>
        <p v-if="subtitle" class="text-xs text-gray-500 mt-0.5">{{ subtitle }}</p>
      </div>
      
      <div v-if="status" 
        :class="[statusColor || 'bg-blue-50 text-blue-600', 'px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider']">
        {{ status }}
      </div>
    </div>

    <div class="mt-3 pt-3 border-t border-dashed border-gray-100 flex justify-between items-center">
      <slot name="footer" />
    </div>
  </div>
</template>
