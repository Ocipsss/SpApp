<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  amount: number;
  symbol?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  symbol: 'Rp',
  size: 'md',
  color: 'text-orange-600'
});

const formattedParts = computed(() => {
  // Format angka ke string Indonesia, misal: 150.000
  const formatted = new Intl.NumberFormat('id-ID').format(props.amount);
  const parts = formatted.split('.');
  
  if (parts.length <= 1) {
    return { main: parts[0], sub: '' };
  }

  // Ambil bagian terakhir (ratusan/ribuan terakhir)
  const sub = parts.pop(); 
  // Gabungkan sisanya sebagai angka utama
  const main = parts.join('.');

  return { main, sub };
});

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
  xl: 'text-3xl'
};
</script>

<template>
  <div 
    class="inline-flex items-baseline font-bold tracking-tight"
    :class="[sizeClasses[size], color]"
  >
    <span class="text-[0.6em] mr-0.5 font-medium opacity-70 uppercase">
      {{ symbol }}
    </span>

    <span>{{ formattedParts.main }}</span>

    <span v-if="formattedParts.sub" class="text-[0.75em] opacity-85">
      .{{ formattedParts.sub }}
    </span>
  </div>
</template>

<style scoped>
/* Memastikan angka tidak terpotong saat scaling di HP */
.inline-flex {
  line-height: 1;
}
</style>
