<script setup lang="ts">
import { useCurrency } from '@/composables/useCurrency';

const { formatRupiah } = useCurrency();

defineProps<{
  nama: string;
  harga: number;
  stok: number;
  kategori: string;
}>();

defineEmits(['add-to-cart']);
</script>

<template>
  <div 
    @click="$emit('add-to-cart')"
    class="p-3 bg-white rounded-xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
  >
    <div class="text-xs text-blue-500 font-semibold mb-1 uppercase tracking-wider">
      {{ kategori }}
    </div>
    <h3 class="font-bold text-gray-800 text-sm line-clamp-2 mb-2">{{ nama }}</h3>
    <div class="flex justify-between items-end">
      <span class="text-orange-600 font-bold">{{ formatRupiah(harga) }}</span>
      <span class="text-[10px] text-gray-400">Stok: {{ stok }}</span>
    </div>
  </div>
</template>
